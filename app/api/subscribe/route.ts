import { NextRequest, NextResponse } from 'next/server';
import { resend, EMAIL_FROM } from '@/lib/resend';

// ─── Email 1: Welcome (Day 0) ────────────────────────────────────────────────
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

// ─── Email 2: The Undo Story (Day 2) ────────────────────────────────────────
const UNDO_HTML = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>The one thing no file tool does</title></head>
<body style="margin:0;padding:0;background:#0a0c14;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0c14;padding:48px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr><td style="padding-bottom:28px;">
          <p style="margin:0;font-size:20px;font-weight:600;color:#ffffff;">FileMayor</p>
        </td></tr>
        <tr><td style="background:#111420;border:1px solid rgba(212,175,55,0.12);border-radius:16px;padding:40px;">
          <p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#d4af37;font-weight:600;">Day 2</p>
          <h1 style="margin:0 0 20px;font-size:24px;font-weight:600;color:#ffffff;line-height:1.3;letter-spacing:-0.02em;">The one thing no other file tool does.</h1>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.72);">
            Most tools that move files — Hazel, Better Rename, shell scripts — have no memory. Once they run, they're done. There's no going back unless you kept a backup.
          </p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.72);">
            FileMayor journals every single move before it happens. The old path, the new path, the timestamp. A complete record of the session.
          </p>
          <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.72);">
            So when you regret something — and at some point you will — you type one command:
          </p>
          <div style="background:#0a0c14;border:1px solid rgba(212,175,55,0.2);border-radius:10px;padding:16px 20px;margin-bottom:28px;">
            <code style="font-family:Menlo,Monaco,'Courier New',monospace;font-size:14px;color:#d4af37;">filemayor undo --all</code>
          </div>
          <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.72);">
            Everything goes back. Exactly where it was. In reverse order.
          </p>
          <table cellpadding="0" cellspacing="0">
            <tr><td style="background:linear-gradient(135deg,#b8860b,#d4af37);border-radius:10px;">
              <a href="https://filemayor.com/download" style="display:block;padding:13px 26px;font-size:14px;font-weight:700;color:#050510;text-decoration:none;">
                Try it &rarr;
              </a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding-top:20px;">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);line-height:1.6;">
            <a href="https://filemayor.com" style="color:rgba(255,255,255,0.35);text-decoration:none;">filemayor.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

// ─── Email 3: Activation Nudge (Day 5) ──────────────────────────────────────
const ACTIVATION_HTML = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>60 seconds in your Downloads folder</title></head>
<body style="margin:0;padding:0;background:#0a0c14;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0c14;padding:48px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr><td style="padding-bottom:28px;">
          <p style="margin:0;font-size:20px;font-weight:600;color:#ffffff;">FileMayor</p>
        </td></tr>
        <tr><td style="background:#111420;border:1px solid rgba(212,175,55,0.12);border-radius:16px;padding:40px;">
          <p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#d4af37;font-weight:600;">Day 5</p>
          <h1 style="margin:0 0 20px;font-size:24px;font-weight:600;color:#ffffff;line-height:1.3;letter-spacing:-0.02em;">60 seconds in your Downloads folder.</h1>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.72);">
            Here's the fastest way to see what FileMayor can do. Open it, point it at Downloads, and watch:
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td style="padding:12px 16px;background:#0a0c14;border:1px solid rgba(255,255,255,0.06);border-radius:8px 8px 0 0;">
                <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);">Step 1</p>
                <p style="margin:4px 0 0;font-size:14px;color:#ffffff;">Open FileMayor &rarr; click <strong>Diagnose</strong></p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 16px;background:#0a0c14;border:1px solid rgba(255,255,255,0.06);border-top:none;">
                <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);">Step 2</p>
                <p style="margin:4px 0 0;font-size:14px;color:#ffffff;">Select your Downloads folder</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 16px;background:#0a0c14;border:1px solid rgba(255,255,255,0.06);border-top:none;border-radius:0 0 8px 8px;">
                <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);">Step 3</p>
                <p style="margin:4px 0 0;font-size:14px;color:#ffffff;">Read what it finds. Approve if it looks right.</p>
              </td>
            </tr>
          </table>
          <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.72);">
            That's it. Nothing moves until you say so. And everything can be undone.
          </p>
          <table cellpadding="0" cellspacing="0">
            <tr><td style="background:linear-gradient(135deg,#b8860b,#d4af37);border-radius:10px;">
              <a href="https://filemayor.com/download" style="display:block;padding:13px 26px;font-size:14px;font-weight:700;color:#050510;text-decoration:none;">
                Download FileMayor &rarr;
              </a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding-top:20px;">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);line-height:1.6;">
            <a href="https://filemayor.com" style="color:rgba(255,255,255,0.35);text-decoration:none;">filemayor.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

// ─── Email 4: MCP / Claude Upsell (Day 9) ───────────────────────────────────
const MCP_HTML = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>FileMayor + Claude</title></head>
<body style="margin:0;padding:0;background:#0a0c14;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0c14;padding:48px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr><td style="padding-bottom:28px;">
          <p style="margin:0;font-size:20px;font-weight:600;color:#ffffff;">FileMayor</p>
        </td></tr>
        <tr><td style="background:#111420;border:1px solid rgba(212,175,55,0.12);border-radius:16px;padding:40px;">
          <p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#d4af37;font-weight:600;">Day 9</p>
          <h1 style="margin:0 0 20px;font-size:24px;font-weight:600;color:#ffffff;line-height:1.3;letter-spacing:-0.02em;">Tell Claude to clean your folders. It already knows how.</h1>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.72);">
            FileMayor ships an MCP server — which means Claude Desktop, Claude Code, and Cursor can organise your folders directly from chat.
          </p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.72);">
            One entry in your config file and Claude gets access to <strong style="color:#ffffff;">scan</strong>, <strong style="color:#ffffff;">plan</strong>, and <strong style="color:#ffffff;">execute</strong> — with FileMayor's safety layer running underneath so the AI can't overstep.
          </p>
          <div style="background:#0a0c14;border:1px solid rgba(212,175,55,0.2);border-radius:10px;padding:16px 20px;margin-bottom:28px;">
            <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.4);">claude_desktop_config.json</p>
            <code style="font-family:Menlo,Monaco,'Courier New',monospace;font-size:13px;color:rgba(255,255,255,0.8);white-space:pre;">{
  "mcpServers": {
    "filemayor": {
      "command": "npx",
      "args": ["filemayor", "mcp"]
    }
  }
}</code>
          </div>
          <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.72);">
            Restart Claude. Ask: "clean up my Downloads." Watch it work.
          </p>
          <table cellpadding="0" cellspacing="0">
            <tr><td style="background:linear-gradient(135deg,#b8860b,#d4af37);border-radius:10px;">
              <a href="https://filemayor.com/mcp" style="display:block;padding:13px 26px;font-size:14px;font-weight:700;color:#050510;text-decoration:none;">
                Read the MCP guide &rarr;
              </a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding-top:20px;">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);line-height:1.6;">
            <a href="https://filemayor.com" style="color:rgba(255,255,255,0.35);text-decoration:none;">filemayor.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

// ─── Email 5: 50-file Limit Nudge (Day 14) ──────────────────────────────────
const LIMIT_HTML = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Are you hitting the 50-file limit?</title></head>
<body style="margin:0;padding:0;background:#0a0c14;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0c14;padding:48px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr><td style="padding-bottom:28px;">
          <p style="margin:0;font-size:20px;font-weight:600;color:#ffffff;">FileMayor</p>
        </td></tr>
        <tr><td style="background:#111420;border:1px solid rgba(212,175,55,0.12);border-radius:16px;padding:40px;">
          <p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#d4af37;font-weight:600;">Day 14</p>
          <h1 style="margin:0 0 20px;font-size:24px;font-weight:600;color:#ffffff;line-height:1.3;letter-spacing:-0.02em;">Are you hitting the 50-file limit?</h1>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.72);">
            The Free plan processes up to 50 files per operation. For a small project folder, that's fine. For Downloads, a Documents root, or anything that's been accumulating for years — it's not enough.
          </p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.72);">
            Pro removes the limit entirely. Every file in the folder. One operation.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr>
              <td style="padding:14px 18px;background:#0a0c14;border:1px solid rgba(255,255,255,0.08);border-radius:8px 8px 0 0;">
                <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.4);font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">Free</p>
                <p style="margin:6px 0 0;font-size:14px;color:rgba(255,255,255,0.6);">50 files per operation &middot; 1 workspace</p>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 18px;background:rgba(212,175,55,0.06);border:1px solid rgba(212,175,55,0.25);border-top:none;border-radius:0 0 8px 8px;">
                <p style="margin:0;font-size:13px;color:#d4af37;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">Pro &mdash; $19/mo</p>
                <p style="margin:6px 0 0;font-size:14px;color:rgba(255,255,255,0.72);">Unlimited files &middot; unlimited workspaces &middot; SOP automation &middot; AI Curative Triad</p>
              </td>
            </tr>
          </table>
          <table cellpadding="0" cellspacing="0">
            <tr><td style="background:linear-gradient(135deg,#b8860b,#d4af37);border-radius:10px;">
              <a href="https://filemayor.com/pricing" style="display:block;padding:13px 26px;font-size:14px;font-weight:700;color:#050510;text-decoration:none;">
                Upgrade to Pro &rarr;
              </a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding-top:20px;">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);line-height:1.6;">
            <a href="https://filemayor.com" style="color:rgba(255,255,255,0.35);text-decoration:none;">filemayor.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

// ─── Email 6: Pro Feature Showcase (Day 21) ─────────────────────────────────
const PRO_HTML = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>What Pro looks like</title></head>
<body style="margin:0;padding:0;background:#0a0c14;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0c14;padding:48px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr><td style="padding-bottom:28px;">
          <p style="margin:0;font-size:20px;font-weight:600;color:#ffffff;">FileMayor</p>
        </td></tr>
        <tr><td style="background:#111420;border:1px solid rgba(212,175,55,0.12);border-radius:16px;padding:40px;">
          <p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#d4af37;font-weight:600;">Day 21</p>
          <h1 style="margin:0 0 20px;font-size:24px;font-weight:600;color:#ffffff;line-height:1.3;letter-spacing:-0.02em;">What Pro looks like in practice.</h1>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.72);">
            Here's what changes when you move to Pro:
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border-collapse:collapse;">
            <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
              <td style="padding:11px 0;font-size:14px;color:rgba(255,255,255,0.5);">File limit per operation</td>
              <td style="padding:11px 0;font-size:14px;color:rgba(255,255,255,0.4);text-align:right;">50</td>
              <td style="padding:11px 0 11px 16px;font-size:14px;color:#d4af37;font-weight:600;text-align:right;">Unlimited</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
              <td style="padding:11px 0;font-size:14px;color:rgba(255,255,255,0.5);">Workspaces</td>
              <td style="padding:11px 0;font-size:14px;color:rgba(255,255,255,0.4);text-align:right;">1</td>
              <td style="padding:11px 0 11px 16px;font-size:14px;color:#d4af37;font-weight:600;text-align:right;">Unlimited</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
              <td style="padding:11px 0;font-size:14px;color:rgba(255,255,255,0.5);">SOP automation</td>
              <td style="padding:11px 0;font-size:14px;color:rgba(255,255,255,0.4);text-align:right;">&mdash;</td>
              <td style="padding:11px 0 11px 16px;font-size:14px;color:#d4af37;font-weight:600;text-align:right;">&check;</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
              <td style="padding:11px 0;font-size:14px;color:rgba(255,255,255,0.5);">AI Curative Triad</td>
              <td style="padding:11px 0;font-size:14px;color:rgba(255,255,255,0.4);text-align:right;">&mdash;</td>
              <td style="padding:11px 0 11px 16px;font-size:14px;color:#d4af37;font-weight:600;text-align:right;">&check;</td>
            </tr>
            <tr>
              <td style="padding:11px 0;font-size:14px;color:rgba(255,255,255,0.5);">Priority support</td>
              <td style="padding:11px 0;font-size:14px;color:rgba(255,255,255,0.4);text-align:right;">&mdash;</td>
              <td style="padding:11px 0 11px 16px;font-size:14px;color:#d4af37;font-weight:600;text-align:right;">&check;</td>
            </tr>
          </table>
          <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.72);">
            $19/month. Cancel any time.
          </p>
          <table cellpadding="0" cellspacing="0">
            <tr><td style="background:linear-gradient(135deg,#b8860b,#d4af37);border-radius:10px;">
              <a href="https://filemayor.com/pricing" style="display:block;padding:13px 26px;font-size:14px;font-weight:700;color:#050510;text-decoration:none;">
                Upgrade to Pro &rarr;
              </a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding-top:20px;">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);line-height:1.6;">
            <a href="https://filemayor.com" style="color:rgba(255,255,255,0.35);text-decoration:none;">filemayor.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

// ─── Email 7: Plain-text Check-in (Day 30) ──────────────────────────────────
const CHECKIN_TEXT = `Hi,

A month ago you signed up for FileMayor. I wanted to check in.

Did it help? Is there something that isn't working the way you expected?

I read every reply personally. If the tool hasn't clicked yet, I'd like to know why.

— Lehlohonolo (Chevza)
Founder, FileMayor
hloninchefu@gmail.com`;

// ─── Schedule helpers ────────────────────────────────────────────────────────
function daysFromNow(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
}

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

  // Schedule the full nurture sequence — fire-and-forget
  const sequence: Array<{ subject: string; html?: string; text?: string; scheduledAt?: string }> = [
    { subject: 'Your folders, on command.', html: WELCOME_HTML },
    { subject: 'The one thing no file tool does.', html: UNDO_HTML, scheduledAt: daysFromNow(2) },
    { subject: '60 seconds in your Downloads folder.', html: ACTIVATION_HTML, scheduledAt: daysFromNow(5) },
    { subject: 'FileMayor + Claude.', html: MCP_HTML, scheduledAt: daysFromNow(9) },
    { subject: 'Are you hitting the 50-file limit?', html: LIMIT_HTML, scheduledAt: daysFromNow(14) },
    { subject: 'What Pro looks like.', html: PRO_HTML, scheduledAt: daysFromNow(21) },
    { subject: 'A question.', text: CHECKIN_TEXT, scheduledAt: daysFromNow(30) },
  ];

  Promise.all(
    sequence.map(({ subject, html, text, scheduledAt }) => {
      const base = { from: EMAIL_FROM, to: [email], subject, ...(scheduledAt ? { scheduledAt } : {}) };
      const send = html
        ? resend.emails.send({ ...base, html })
        : resend.emails.send({ ...base, text: text! });
      return send.catch((err) => console.error(`Email "${subject}" failed (non-fatal):`, err));
    }),
  ).catch(() => {});

  return NextResponse.json({ ok: true });
}
