import { NextRequest, NextResponse } from 'next/server';
import { resend, EMAIL_FROM } from '@/lib/resend';

const WELCOME_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
<title>Welcome to FileMayor</title>
</head>
<body style="margin:0;padding:0;background:#0a0c14;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0c14;padding:48px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <tr><td style="padding-bottom:32px;">
          <p style="margin:0;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:-0.02em;">FileMayor</p>
          <p style="margin:4px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:rgba(255,255,255,0.4);">Your folders, on command.</p>
        </td></tr>

        <tr><td style="background:#111420;border:1px solid rgba(212,175,55,0.15);border-radius:16px;padding:40px;">
          <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#d4af37;font-weight:600;">You&rsquo;re in.</p>
          <h1 style="margin:0 0 20px;font-size:26px;font-weight:600;color:#ffffff;line-height:1.25;letter-spacing:-0.02em;">Stop fighting your filesystem.<br/>Let FileMayor handle it.</h1>
          <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.72);">
            Every folder you&rsquo;ve been putting off. Every download pile that grew into something embarrassing.
            FileMayor scans it, proposes a plan in plain English, and moves everything &mdash;
            with a full undo if you change your mind.
          </p>

          <table cellpadding="0" cellspacing="0">
            <tr><td style="background:linear-gradient(135deg,#b8860b,#d4af37);border-radius:10px;">
              <a href="https://filemayor.com/download"
                 style="display:block;padding:14px 28px;font-size:14px;font-weight:700;color:#050510;text-decoration:none;letter-spacing:-0.01em;">
                Download FileMayor &rarr;
              </a>
            </td></tr>
          </table>

          <hr style="margin:32px 0;border:none;border-top:1px solid rgba(255,255,255,0.08);" />

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="33%" style="padding-right:16px;vertical-align:top;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#ffffff;">Ask it anything</p>
                <p style="margin:0;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.5);">&ldquo;Dedupe my Downloads&rdquo; works in chat, the terminal, or the desktop app.</p>
              </td>
              <td width="33%" style="padding-right:16px;vertical-align:top;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#ffffff;">Always reversible</p>
                <p style="margin:0;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.5);">Every move is journaled. One command and your folders go back exactly as they were.</p>
              </td>
              <td width="33%" style="vertical-align:top;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#ffffff;">Stays on your machine</p>
                <p style="margin:0;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.5);">Files never leave. Only metadata is read &mdash; names, sizes, paths. Nothing else.</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <tr><td style="padding-top:24px;">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.28);line-height:1.6;">
            You&rsquo;re receiving this because you signed up at filemayor.com.<br/>
            <a href="https://filemayor.com" style="color:rgba(255,255,255,0.4);text-decoration:none;">filemayor.com</a>
            &nbsp;&middot;&nbsp;
            Built in South Africa by <a href="https://github.com/Hrypopo" style="color:rgba(255,255,255,0.4);text-decoration:none;">Chevza</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}));

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.warn('RESEND_API_KEY or RESEND_AUDIENCE_ID not set');
    return NextResponse.json({ ok: true });
  }

  // Add to audience
  const contactRes = await fetch(
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

  if (!contactRes.ok) {
    const body = await contactRes.text();
    console.error('Resend contact error:', contactRes.status, body);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 502 });
  }

  // Welcome email via Resend SDK — fire-and-forget
  resend.emails.send({
    from: EMAIL_FROM,
    to: [email],
    subject: 'Your folders, on command.',
    html: WELCOME_HTML,
  }).catch((err) => console.error('Welcome email failed (non-fatal):', err));

  return NextResponse.json({ ok: true });
}
