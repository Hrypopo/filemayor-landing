import { NextRequest, NextResponse } from 'next/server';

// Anonymous CLI telemetry endpoint.
// Payload: { v: string, os: string, arch: string, cmd: string }
// No IP addresses stored. No file names or paths. No PII.
//
// Storage: aggregate counters in Upstash Redis / Vercel KV when configured
// (UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_URL/TOKEN). Without those env
// vars the endpoint still accepts pings and logs the structured line —
// nothing breaks, the /admin telemetry panel just shows "not configured".

const ALLOWED_CMDS = new Set([
  'scan', 'analyze', 'organize', 'para', 'clean', 'watch', 'undo', 'init',
  'info', 'license', 'mcp', 'explain', 'plan', 'apply', 'cure',
  'duplicates', 'dedupe', 'sop',
]);

const ALLOWED_OS = new Set(['darwin', 'linux', 'win32']);

function kvConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

/** Fire a Redis pipeline over the Upstash REST API. Failures are swallowed —
 *  telemetry storage must never break the CLI's ping. */
async function kvIncrement(cmd: string, osName: string, v: string) {
  const kv = kvConfig();
  if (!kv) return;
  const day = new Date().toISOString().slice(0, 10);
  const pipeline = [
    ['INCR', 'fm:t:total'],
    ['INCR', `fm:t:cmd:${cmd}`],
    ['INCR', `fm:t:os:${osName}`],
    ['INCR', `fm:t:v:${v}`],
    ['INCR', `fm:t:day:${day}`],
    // Bounded key space: day keys expire after 100 days.
    ['EXPIRE', `fm:t:day:${day}`, String(100 * 24 * 3600)],
  ];
  try {
    await fetch(`${kv.url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${kv.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(pipeline),
      signal: AbortSignal.timeout(2000),
    });
  } catch {
    /* never let telemetry storage break the ping */
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const v = typeof body.v === 'string' ? body.v.slice(0, 20) : 'unknown';
  const osName = typeof body.os === 'string' && ALLOWED_OS.has(body.os) ? body.os : 'other';
  const arch = typeof body.arch === 'string' ? body.arch.slice(0, 16) : 'unknown';
  const cmd = typeof body.cmd === 'string' && ALLOWED_CMDS.has(body.cmd) ? body.cmd : 'other';

  // Structured log line — captured by Vercel log drain / runtime logs
  console.log(JSON.stringify({
    event: 'cli_ping',
    v,
    os: osName,
    arch,
    cmd,
    ts: new Date().toISOString(),
  }));

  await kvIncrement(cmd, osName, v);

  return new NextResponse(null, { status: 204 });
}

// No GET — only POST accepted
export async function GET() {
  return new NextResponse(null, { status: 405 });
}
