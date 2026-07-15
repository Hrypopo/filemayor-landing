import { NextRequest, NextResponse } from 'next/server';
import { createHash, timingSafeEqual } from 'node:crypto';

// Admin analytics aggregator. Server-side so API secrets (Resend) never
// reach the browser. Gated by the ADMIN_KEY env var — requests must send
// the same value in the `x-admin-key` header.

export const dynamic = 'force-dynamic';

const PKGS = ['filemayor', 'filemayor-mcp'] as const;
// The PUBLIC repo — FileMayor is private, so an unauthenticated GitHub API
// call against it 404s. The landing repo is the public one.
const GH_REPO = 'Hrypopo/filemayor-landing';

/** Constant-time key check that also hides length (compares SHA-256 digests). */
function keyMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false;
  const a = createHash('sha256').update(provided).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

const CLI_CMDS = [
  'scan', 'analyze', 'organize', 'para', 'clean', 'watch', 'undo', 'init',
  'info', 'license', 'mcp', 'explain', 'plan', 'apply', 'cure',
  'duplicates', 'dedupe', 'sop', 'other',
];
const OSES = ['darwin', 'win32', 'linux', 'other'];

async function json(url: string, headers: Record<string, string> = {}) {
  try {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(8000), cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function kvConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

/** MGET over the Upstash REST API; returns numbers keyed by the input names. */
async function kvGetNumbers(keys: string[]): Promise<Record<string, number> | null> {
  const kv = kvConfig();
  if (!kv) return null;                 // not configured
  if (keys.length === 0) return {};
  try {
    const res = await fetch(`${kv.url}/mget/${keys.map(encodeURIComponent).join('/')}`, {
      headers: { Authorization: `Bearer ${kv.token}` },
      signal: AbortSignal.timeout(4000),
      cache: 'no-store',
    });
    if (!res.ok) return null;           // reachable-but-error → surface as unavailable
    const data = await res.json(); // { result: (string|null)[] }
    const out: Record<string, number> = {};
    keys.forEach((k, i) => {
      const v = Array.isArray(data?.result) ? data.result[i] : null;
      out[k] = v ? parseInt(v, 10) || 0 : 0;
    });
    return out;
  } catch {
    return null;                        // timeout/network → unavailable, not "all zeros"
  }
}

async function npmStats() {
  const [pkg, week, month, year, range, mcpMonth] = await Promise.all([
    json(`https://registry.npmjs.org/filemayor`),
    json(`https://api.npmjs.org/downloads/point/last-week/filemayor`),
    json(`https://api.npmjs.org/downloads/point/last-month/filemayor`),
    json(`https://api.npmjs.org/downloads/point/last-year/filemayor`),
    json(`https://api.npmjs.org/downloads/range/last-month/filemayor`),
    json(`https://api.npmjs.org/downloads/point/last-month/filemayor-mcp`),
  ]);
  return {
    latest: pkg?.['dist-tags']?.latest ?? null,
    versions: pkg?.versions ? Object.keys(pkg.versions).length : null,
    lastPublish: pkg?.time?.modified ?? null,
    week: week?.downloads ?? null,
    month: month?.downloads ?? null,
    year: year?.downloads ?? null,
    mcpMonth: mcpMonth?.downloads ?? null,
    daily: Array.isArray(range?.downloads)
      ? range.downloads.map((d: { day: string; downloads: number }) => ({ day: d.day, n: d.downloads }))
      : [],
  };
}

async function githubStats() {
  const repo = await json(`https://api.github.com/repos/${GH_REPO}`, {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'filemayor-admin',
  });
  return repo
    ? { stars: repo.stargazers_count ?? 0, forks: repo.forks_count ?? 0, issues: repo.open_issues_count ?? 0 }
    : null;
}

async function subscriberStats() {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) return { configured: false as const };
  const data = await json(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    Authorization: `Bearer ${apiKey}`,
  });
  if (!data?.data) return { configured: true as const, count: null };
  const contacts = data.data as { unsubscribed?: boolean }[];
  return {
    configured: true as const,
    count: contacts.length,
    active: contacts.filter((c) => !c.unsubscribed).length,
  };
}

async function telemetryStats() {
  const kv = kvConfig();
  if (!kv) return { configured: false as const };

  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    days.push(new Date(Date.now() - i * 24 * 3600 * 1000).toISOString().slice(0, 10));
  }
  const keys = [
    'fm:t:total',
    ...CLI_CMDS.map((c) => `fm:t:cmd:${c}`),
    ...OSES.map((o) => `fm:t:os:${o}`),
    ...days.map((d) => `fm:t:day:${d}`),
  ];
  const nums = await kvGetNumbers(keys);
  // kv is set (checked above) but the read failed → distinct "unavailable" state,
  // not silent all-zeros that looks like "no pings yet".
  if (!nums) return { configured: true as const, unavailable: true as const };

  return {
    configured: true as const,
    total: nums['fm:t:total'] ?? 0,
    byCommand: CLI_CMDS
      .map((c) => ({ cmd: c, n: nums[`fm:t:cmd:${c}`] ?? 0 }))
      .filter((x) => x.n > 0)
      .sort((a, b) => b.n - a.n),
    byOs: OSES
      .map((o) => ({ os: o, n: nums[`fm:t:os:${o}`] ?? 0 }))
      .filter((x) => x.n > 0),
    byDay: days.map((d) => ({ day: d, n: nums[`fm:t:day:${d}`] ?? 0 })),
  };
}

export async function GET(req: NextRequest) {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) {
    return NextResponse.json({ error: 'ADMIN_KEY not configured on the server' }, { status: 503 });
  }
  if (!keyMatches(req.headers.get('x-admin-key'), adminKey)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const [npm, github, subscribers, telemetry] = await Promise.all([
    npmStats(),
    githubStats(),
    subscriberStats(),
    telemetryStats(),
  ]);

  return NextResponse.json(
    { generatedAt: new Date().toISOString(), packages: PKGS, npm, github, subscribers, telemetry },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
