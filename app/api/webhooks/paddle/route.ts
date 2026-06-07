import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { signLicense } from '@/lib/license';
import { resend, EMAIL_FROM } from '@/lib/resend';

// Required Vercel environment variables:
//   NEXT_PUBLIC_PADDLE_CLIENT_TOKEN   # public — safe in browser
//   NEXT_PUBLIC_PADDLE_PRO_PRICE_ID   # public
//   NEXT_PUBLIC_PADDLE_TEAM_PRICE_ID  # public
//   PADDLE_API_KEY                    # server-side only
//   PADDLE_WEBHOOK_SECRET             # server-side only — from Paddle dashboard → Webhooks

// Paddle sends a SHA-256 HMAC signature in the Paddle-Signature header.
// Set PADDLE_WEBHOOK_SECRET in your environment to the secret shown in the
// Paddle dashboard under Notifications → your endpoint.

const WEBHOOK_SECRET = process.env.PADDLE_WEBHOOK_SECRET ?? '';

function verifyPaddleSignature(rawBody: string, header: string | null): boolean {
  if (!WEBHOOK_SECRET || !header) return false;
  // Header format: ts=<timestamp>;h1=<hmac>
  const parts = Object.fromEntries(
    header.split(';').map((p) => p.split('=')),
  );
  const ts = parts['ts'];
  const receivedHmac = parts['h1'];
  if (!ts || !receivedHmac) return false;
  const signed = `${ts}:${rawBody}`;
  const expected = crypto.createHmac('sha256', WEBHOOK_SECRET).update(signed).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(receivedHmac));
}

interface PaddleWebhookEvent {
  event_type: string;
  data: {
    id?: string;
    customer_id?: string;
    customer?: { email?: string };
    billing_details?: { email?: string };
    items?: Array<{ price?: { id?: string } }>;
    custom_data?: Record<string, string>;
    status?: string;
    [key: string]: unknown;
  };
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('Paddle-Signature');

  if (WEBHOOK_SECRET && !verifyPaddleSignature(rawBody, signature)) {
    console.warn('[paddle] webhook signature verification failed');
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: PaddleWebhookEvent;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const event = body as PaddleWebhookEvent;

  if (
    event.event_type === 'transaction.completed' ||
    event.event_type === 'subscription.activated' ||
    event.event_type === 'subscription.created'
  ) {
    const email = event.data?.customer?.email ?? event.data?.billing_details?.email;
    const priceId = event.data?.items?.[0]?.price?.id;

    if (!email || !priceId) {
      console.log('[paddle] missing email or priceId, skipping license delivery', {
        event_type: event.event_type,
        hasEmail: Boolean(email),
        hasPriceId: Boolean(priceId),
      });
      return NextResponse.json({ received: true });
    }

    const proPriceId = process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID;
    const teamPriceId = process.env.NEXT_PUBLIC_PADDLE_TEAM_PRICE_ID;

    let tier: 'pro' | 'enterprise' | null = null;
    if (priceId === proPriceId) tier = 'pro';
    else if (priceId === teamPriceId) tier = 'enterprise';

    if (tier) {
      const orderId = event.data?.id ?? 'paddle-unknown';
      const licenseKey = await signLicense({
        email,
        orderId,
        tier,
        iat: Math.floor(Date.now() / 1000),
      });

      await resend.emails.send({
        from: EMAIL_FROM,
        to: email,
        subject: 'Your FileMayor license key',
        html: `<p>Thank you for purchasing FileMayor ${tier === 'pro' ? 'Pro' : 'Team'}.</p>
               <p>Your license key:</p>
               <pre style="background:#f5f5f5;padding:12px;border-radius:6px;font-family:monospace">${licenseKey}</pre>
               <p>Activate it: <code>filemayor license activate ${licenseKey}</code></p>
               <p>Or paste it in the app under Settings → License.</p>`,
      });

      console.log('[paddle] license delivered', { event_type: event.event_type, tier, email });
    } else {
      console.log('[paddle] unrecognised price ID, no license issued', { priceId });
    }
  } else if (event.event_type === 'subscription.canceled') {
    console.log('[paddle] subscription canceled:', event.data?.id);
    // TODO: revoke license in DB when license storage is in place
  } else {
    // Unhandled event types are acknowledged but not processed
    console.log('[paddle] unhandled event type:', event.event_type);
  }

  return NextResponse.json({ received: true });
}
