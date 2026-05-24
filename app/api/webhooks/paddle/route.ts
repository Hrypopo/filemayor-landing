import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

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

type PaddleEventType =
  | 'subscription.created'
  | 'subscription.activated'
  | 'subscription.canceled'
  | 'transaction.completed';

interface PaddleWebhookPayload {
  event_type: PaddleEventType;
  data: {
    id: string;
    customer_id?: string;
    items?: Array<{ price: { id: string } }>;
    custom_data?: Record<string, string>;
    status?: string;
  };
}

async function activateLicense(payload: PaddleWebhookPayload) {
  // TODO: When you add a license DB (e.g. Supabase, PlanetScale), generate a
  // JWT here and store it keyed by customer_id / email. For now we log the
  // event so you can see the shape coming through in Vercel logs.
  console.log('[paddle] license event:', {
    type: payload.event_type,
    customerId: payload.data.customer_id,
    items: payload.data.items?.map((i) => i.price.id),
    customData: payload.data.custom_data,
  });
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('Paddle-Signature');

  if (WEBHOOK_SECRET && !verifyPaddleSignature(rawBody, signature)) {
    console.warn('[paddle] webhook signature verification failed');
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let payload: PaddleWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  switch (payload.event_type) {
    case 'subscription.activated':
    case 'transaction.completed':
      await activateLicense(payload);
      break;

    case 'subscription.canceled':
      console.log('[paddle] subscription canceled:', payload.data.id);
      // TODO: revoke license in DB when license storage is in place
      break;

    default:
      // Unhandled event types are acknowledged but not processed
      break;
  }

  return NextResponse.json({ received: true });
}
