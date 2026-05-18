import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}));

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    // Silently succeed in dev/preview so the UI doesn't break
    console.warn('RESEND_API_KEY or RESEND_AUDIENCE_ID not set');
    return NextResponse.json({ ok: true });
  }

  const res = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    },
  );

  if (!res.ok) {
    const body = await res.text();
    console.error('Resend error:', res.status, body);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
