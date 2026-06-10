import { NextRequest, NextResponse } from 'next/server';

// Anonymous CLI telemetry endpoint.
// Payload: { v: string, os: string, arch: string, cmd: string }
// No IP addresses stored. No file names or paths. No PII.
// Vercel's log drain captures the structured JSON lines for dashboarding.

const ALLOWED_CMDS = new Set([
  'scan', 'analyze', 'organize', 'clean', 'watch', 'undo', 'init',
  'info', 'license', 'mcp', 'explain', 'plan', 'apply', 'cure',
  'duplicates', 'dedupe', 'sop',
]);

const ALLOWED_OS = new Set(['darwin', 'linux', 'win32']);

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

  return new NextResponse(null, { status: 204 });
}

// No GET — only POST accepted
export async function GET() {
  return new NextResponse(null, { status: 405 });
}
