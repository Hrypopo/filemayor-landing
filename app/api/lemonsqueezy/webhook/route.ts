/* LemonSqueezy webhook handler — receives order events and issues
 * Ed25519-signed license JWTs to customers via email.
 *
 * Required env vars (set in Vercel):
 *   LEMONSQUEEZY_WEBHOOK_SECRET            — configured at the LS webhook
 *   LICENSE_PRIVATE_KEY                     — Ed25519 PKCS8 PEM (raw or base64)
 *   LICENSE_KEY_ID                          — short id like "v1" (default: v1)
 *   RESEND_API_KEY                          — for activation email delivery
 *   LEMONSQUEEZY_PRO_VARIANT_ID             — variant id for Pro tier
 *   LEMONSQUEEZY_ENTERPRISE_VARIANT_ID      — variant id for Enterprise tier
 *
 * Webhook URL to register at LemonSqueezy:
 *   https://filemayor.com/api/lemonsqueezy/webhook
 */

import { signLicense, verifyHmacSignature, type Tier } from '@/lib/license';
import { site } from '@/lib/site';

export const runtime = 'edge';

interface LemonSqueezyOrderAttributes {
  user_email?: string;
  customer_email?: string;
  status?: string;
  created_at?: string;
  first_order_item?: {
    variant_id?: number | string;
    product_name?: string;
  };
  [k: string]: unknown;
}

interface LemonSqueezyEvent {
  data?: {
    id?: string;
    type?: string;
    attributes?: LemonSqueezyOrderAttributes;
  };
}

/* We only ISSUE on these events:
 *   order_created          — one-time purchase. Must also have status === 'paid'.
 *   subscription_created   — first successful payment of a subscription.
 * subscription_updated is intentionally NOT here — renewals reuse the
 * existing license. Issuing a new one on every renewal would spam customers
 * and force re-activation. Cancellations/refunds go through a separate flow. */
const HANDLED_EVENTS = new Set(['order_created', 'subscription_created']);

/** Statuses that authorize license issuance on order_created. */
const PAID_ORDER_STATUSES = new Set(['paid']);

/** Statuses that authorize license issuance on subscription_created. */
const ACTIVE_SUBSCRIPTION_STATUSES = new Set(['active', 'on_trial']);

/** Reject webhook events whose `created_at` is older than this. Replay protection. */
const MAX_EVENT_AGE_MINUTES = 10;

function tierFromVariant(variantId?: number | string): Tier {
  const proId = process.env.LEMONSQUEEZY_PRO_VARIANT_ID;
  const enterpriseId = process.env.LEMONSQUEEZY_ENTERPRISE_VARIANT_ID;
  const v = variantId !== undefined ? String(variantId) : '';
  if (enterpriseId && v === enterpriseId) return 'enterprise';
  if (proId && v === proId) return 'pro';
  return 'pro';
}

const renderActivationEmail = (
  key: string,
  tier: Tier,
): { subject: string; html: string; text: string } => {
  const deepLink = `filemayor://activate?key=${encodeURIComponent(key)}`;
  const tierLabel = tier === 'enterprise' ? 'Enterprise' : 'Pro';
  const subject = `Your ${site.name} ${tierLabel} license`;
  const text = `Welcome to ${site.name}.

Your license key:
${key}

One-click activation (open on the machine where ${site.name} is installed):
${deepLink}

Or paste the key into the desktop app: Settings → License → Activate.
Or via the CLI: filemayor license activate <key>

Thank you for supporting independent software.
— Chevza
`;
  const html = `<!doctype html><html><body style="margin:0;background:#0d0b0a;color:#fafaf8;font-family:ui-sans-serif,system-ui,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:48px 32px;">
    <p style="font-family:ui-monospace,monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#a8a59e;">FileMayor — by Chevza</p>
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:36px;line-height:1.1;letter-spacing:-.02em;margin:24px 0;">Your license is ready.</h1>
    <p style="color:#a8a59e;line-height:1.6;font-size:16px;">Welcome to ${site.name} ${tierLabel}. One click activates the desktop app on this machine — no key to copy.</p>
    <p style="margin:32px 0;">
      <a href="${deepLink}" style="display:inline-block;background:#fafaf8;color:#0d0b0a;padding:14px 28px;border-radius:8px;font-weight:500;text-decoration:none;font-size:14px;">Activate ${site.name} →</a>
    </p>
    <p style="color:#a8a59e;line-height:1.6;font-size:14px;margin-top:40px;">If the button does not work — paste this key into <strong style="color:#fafaf8;">Settings → License → Activate</strong>:</p>
    <pre style="background:#161311;color:#fafaf8;padding:16px;border-radius:8px;font-family:ui-monospace,monospace;font-size:11px;line-height:1.5;overflow-x:auto;word-break:break-all;white-space:pre-wrap;">${key}</pre>
    <p style="color:#71746e;line-height:1.6;font-size:13px;margin-top:48px;">Thank you for supporting independent software.<br>— Chevza</p>
    <p style="color:#71746e;line-height:1.6;font-size:11px;font-family:ui-monospace,monospace;letter-spacing:.08em;margin-top:32px;">FILEMAYOR.COM · BUILT IN SOUTH AFRICA</p>
  </div>
</body></html>`;
  return { subject, html, text };
};

async function sendActivationEmail(
  email: string,
  key: string,
  tier: Tier,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[license-webhook] RESEND_API_KEY not set — skipping email send');
    return;
  }
  const { subject, html, text } = renderActivationEmail(key, tier);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${site.name} <hello@${site.domain}>`,
      to: [email],
      subject,
      html,
      text,
    }),
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error('[license-webhook] Resend send failed:', res.status, errorBody);
  }
}

export async function POST(req: Request): Promise<Response> {
  const body = await req.text();
  const signature = req.headers.get('x-signature') ?? '';
  const eventName = req.headers.get('x-event-name') ?? '';
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

  if (!secret) {
    console.error('[license-webhook] LEMONSQUEEZY_WEBHOOK_SECRET not configured');
    return new Response('Webhook secret not configured', { status: 500 });
  }

  const valid = await verifyHmacSignature(body, signature, secret);
  if (!valid) {
    console.warn('[license-webhook] Invalid signature on inbound webhook');
    return new Response('Invalid signature', { status: 401 });
  }

  if (!HANDLED_EVENTS.has(eventName)) {
    return new Response('Event ignored', { status: 200 });
  }

  let event: LemonSqueezyEvent;
  try {
    event = JSON.parse(body) as LemonSqueezyEvent;
  } catch {
    return new Response('Malformed JSON', { status: 400 });
  }

  const attrs = event?.data?.attributes ?? {};

  // Replay protection — reject events with a stale created_at.
  if (attrs.created_at) {
    const createdMs = Date.parse(String(attrs.created_at));
    if (!Number.isFinite(createdMs)) {
      return new Response('Malformed created_at', { status: 400 });
    }
    const ageMinutes = (Date.now() - createdMs) / 60_000;
    if (ageMinutes > MAX_EVENT_AGE_MINUTES) {
      console.warn(`[license-webhook] Rejecting stale event (age ${ageMinutes.toFixed(1)}m)`);
      return new Response('Event too old', { status: 400 });
    }
  }

  const email = attrs.user_email ?? attrs.customer_email ?? '';
  const orderId = String(event?.data?.id ?? '');
  const variantId = attrs.first_order_item?.variant_id;
  const status = String(attrs.status ?? '').toLowerCase();

  if (!email || !orderId) {
    return new Response('Missing email or order id', { status: 400 });
  }

  // Status gate — only issue a license when the buyer has actually paid.
  // LemonSqueezy fires order_created before payment confirmation; without
  // this gate we would mint licenses for unpaid orders.
  const statusOk =
    eventName === 'order_created'
      ? PAID_ORDER_STATUSES.has(status)
      : ACTIVE_SUBSCRIPTION_STATUSES.has(status);

  if (!statusOk) {
    console.log(
      `[license-webhook] skip event=${eventName} status=${status || 'missing'} order=${orderId} — awaiting payment confirmation`,
    );
    // 200 keeps LS happy. We will receive a follow-up event when status flips.
    return new Response(JSON.stringify({ ok: true, skipped: true, reason: 'status-not-paid' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const tier = tierFromVariant(variantId);

  let licenseKey: string;
  try {
    licenseKey = await signLicense({
      email,
      orderId,
      tier,
      iat: Math.floor(Date.now() / 1000),
      variantId: variantId !== undefined ? String(variantId) : undefined,
    });
  } catch (err) {
    console.error('[license-webhook] signLicense failed:', err);
    return new Response('License signing failed', { status: 500 });
  }

  await sendActivationEmail(email, licenseKey, tier);

  console.log(
    `[license-webhook] issued tier=${tier} order=${orderId} email=${email.replace(/(.).+(@.+)/, '$1***$2')}`,
  );

  return new Response(JSON.stringify({ ok: true, orderId, tier }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(): Promise<Response> {
  return new Response(
    JSON.stringify({
      service: 'filemayor-license-webhook',
      method: 'POST only',
      keyId: process.env.LICENSE_KEY_ID || 'v1',
      configured: {
        webhookSecret: Boolean(process.env.LEMONSQUEEZY_WEBHOOK_SECRET),
        privateKey: Boolean(process.env.LICENSE_PRIVATE_KEY),
        resendApiKey: Boolean(process.env.RESEND_API_KEY),
      },
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  );
}
