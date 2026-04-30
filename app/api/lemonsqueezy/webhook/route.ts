/* LemonSqueezy webhook handler — receives order events and issues
 * Ed25519-signed license JWTs to customers via email.
 *
 * Required env vars (set in Vercel):
 *   LEMONSQUEEZY_WEBHOOK_SECRET           — configured at the LS webhook
 *   LICENSE_PRIVATE_KEY                    — Ed25519 PKCS8 PEM, used to sign
 *   RESEND_API_KEY                         — for activation email delivery
 *   LEMONSQUEEZY_PRO_VARIANT_ID            — variant id for Pro tier
 *   LEMONSQUEEZY_ENTERPRISE_VARIANT_ID     — variant id for Enterprise tier
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

const HANDLED_EVENTS = new Set([
  'order_created',
  'subscription_created',
  'subscription_updated',
]);

function tierFromVariant(variantId?: number | string): Tier {
  const proId = process.env.LEMONSQUEEZY_PRO_VARIANT_ID;
  const enterpriseId = process.env.LEMONSQUEEZY_ENTERPRISE_VARIANT_ID;
  const v = variantId !== undefined ? String(variantId) : '';
  if (enterpriseId && v === enterpriseId) return 'enterprise';
  if (proId && v === proId) return 'pro';
  // Sensible default — keeps bad-config from accidentally minting Owner keys.
  return 'pro';
}

const renderActivationEmail = (key: string, tier: Tier): { subject: string; html: string; text: string } => {
  const deepLink = `filemayor://activate?key=${encodeURIComponent(key)}`;
  const subject = `Your ${site.name} ${tier === 'enterprise' ? 'Enterprise' : 'Pro'} license`;
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
    <p style="color:#a8a59e;line-height:1.6;font-size:16px;">Welcome to ${site.name} ${tier === 'enterprise' ? 'Enterprise' : 'Pro'}. One click activates the desktop app on this machine — no key to copy.</p>
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

async function sendActivationEmail(email: string, key: string, tier: Tier): Promise<void> {
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
    return new Response('Webhook secret not configured', { status: 500 });
  }

  const valid = await verifyHmacSignature(body, signature, secret);
  if (!valid) {
    return new Response('Invalid signature', { status: 401 });
  }

  if (!HANDLED_EVENTS.has(eventName)) {
    // Acknowledge but skip — keeps LS happy and prevents retries.
    return new Response('Event ignored', { status: 200 });
  }

  let event: LemonSqueezyEvent;
  try {
    event = JSON.parse(body) as LemonSqueezyEvent;
  } catch {
    return new Response('Malformed JSON', { status: 400 });
  }

  const attrs = event?.data?.attributes ?? {};
  const email = attrs.user_email ?? attrs.customer_email ?? '';
  const orderId = String(event?.data?.id ?? '');
  const variantId = attrs.first_order_item?.variant_id;

  if (!email || !orderId) {
    return new Response('Missing email or order id', { status: 400 });
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

  // Fire-and-await — if email fails we still return 200 so LS doesn't retry
  // (we have the order id and can resend manually). Logged for ops visibility.
  await sendActivationEmail(email, licenseKey, tier);

  return new Response(JSON.stringify({ ok: true, orderId, tier }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(): Promise<Response> {
  // Health check — useful for Vercel deploy verification.
  return new Response('FileMayor LemonSqueezy webhook · POST only', { status: 200 });
}
