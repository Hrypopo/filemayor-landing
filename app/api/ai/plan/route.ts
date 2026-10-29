/**
 * POST /api/ai/plan
 *
 * AI planning proxy — authenticates FileMayor desktop clients via their
 * license key, applies per-tier rate limiting, then forwards the request
 * to Gemini and returns a structured plan.
 *
 * Key resolution (in priority order):
 *   1. X-Gemini-Key header — user-supplied BYOK key (no rate limiting applied)
 *   2. ANTHROPIC_API_KEY, else GEMINI_API_KEY env var — server-side hosted key
 *      (rate limited, free tier only). See lib/ai-json.ts.
 *
 * When a user supplies their own key the request is forwarded directly;
 * no server-side API costs are incurred and the monthly quota is not consumed.
 *
 * Optional env vars (rate limiting — fail-open if absent):
 *   KV_REST_API_URL / KV_REST_API_TOKEN          — legacy Vercel-KV names, OR
 *   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN — Upstash native names
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyLicenseJwt } from '@/lib/license';
import { checkRateLimit } from '@/lib/rate-limit';
import { completeJson, aiConfigured } from '@/lib/ai-json';

// ─── Constants ────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are FileMayor's AI planning engine. Given a description of a messy folder and a user's intent, output a structured JSON plan.

Respond ONLY with valid JSON in this exact format:
{
  "summary": "one sentence describing what the plan does",
  "operations": [
    { "action": "move", "from": "relative/path/file.ext", "to": "Category/file.ext" },
    { "action": "rename", "from": "old_name.ext", "to": "new_name.ext" },
    { "action": "delete", "path": "junk_file.tmp" }
  ],
  "warnings": ["optional list of things user should review"]
}`;

// ─── Types ────────────────────────────────────────────────────────────────────

interface PlanRequestBody {
  prompt: string;
  context: Record<string, unknown>;
  deviceId?: string;
}

interface PlanOperation {
  action: 'move' | 'rename' | 'delete';
  from?: string;
  to?: string;
  path?: string;
}

interface AIPlan {
  summary: string;
  operations: PlanOperation[];
  warnings?: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isJwt(token: string): boolean {
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  return parts.every((p) => /^[A-Za-z0-9_-]+$/.test(p) && p.length > 0);
}

/** Validate a user-supplied Gemini key: must start with AIza and be ≥ 20 chars. */
function isValidGeminiKey(key: string): boolean {
  return /^AIza[A-Za-z0-9_-]{20,}$/.test(key.trim());
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  // ── Security headers ────────────────────────────────────────────────────────
  const headers: HeadersInit = { 'Cache-Control': 'no-store' };

  // ── BYOK key check ──────────────────────────────────────────────────────────
  // If the client passes their own Gemini key we use it directly and skip all
  // server-side rate limiting — the cost is on their account, not ours.
  const byokKey = req.headers.get('x-gemini-key')?.trim() ?? null;
  const usingByok = byokKey !== null && isValidGeminiKey(byokKey);

  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: PlanRequestBody;
  try {
    body = (await req.json()) as PlanRequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400, headers });
  }

  // ── Input validation ────────────────────────────────────────────────────────
  if (typeof body.prompt !== 'string' || body.prompt.trim().length === 0) {
    return NextResponse.json(
      { error: '`prompt` must be a non-empty string' },
      { status: 400, headers },
    );
  }
  if (body.prompt.length > 2000) {
    return NextResponse.json(
      { error: '`prompt` must be under 2000 characters' },
      { status: 400, headers },
    );
  }
  if (typeof body.context !== 'object' || body.context === null || Array.isArray(body.context)) {
    return NextResponse.json({ error: '`context` must be an object' }, { status: 400, headers });
  }

  // ── Auth & tier resolution (hosted-key path only) ───────────────────────────
  const authHeader = req.headers.get('authorization') ?? '';
  const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
  const token = bearerMatch ? bearerMatch[1].trim() : null;

  type Tier = 'free' | 'pro' | 'enterprise';
  let tier: Tier = 'free';
  let identifier: string = body.deviceId ?? 'anonymous';

  if (token) {
    if (isJwt(token)) {
      const verified = await verifyLicenseJwt(token);
      if (verified) {
        tier =
          verified.tier === 'owner'
            ? 'enterprise'
            : (verified.tier as 'pro' | 'enterprise');
        identifier = verified.sub ?? verified.email ?? token.slice(-16);
      } else {
        identifier = token.slice(-16);
      }
    } else {
      identifier = token;
    }
  }

  // ── Rate limiting (hosted key, free tier only) ──────────────────────────────
  let remainingCalls: number | null = null;

  if (!usingByok && tier === 'free') {
    const result = await checkRateLimit(identifier);
    if (!result.allowed) {
      const isBurst = result.reason === 'burst';
      return NextResponse.json(
        {
          error: isBurst
            ? 'Too many requests. Please wait a moment.'
            : 'Monthly AI request limit reached. Set your own Gemini key in app settings for unlimited access.',
        },
        { status: 429, headers },
      );
    }
    remainingCalls = result.remaining;
  }

  // ── Call the model (user's Gemini key, else server Claude/Gemini key) ──────
  if (!usingByok && !aiConfigured()) {
    return NextResponse.json(
      { error: 'AI service temporarily unavailable' },
      { status: 503, headers },
    );
  }

  let plan: AIPlan;
  try {
    plan = (await completeJson(
      {
        system: SYSTEM_PROMPT,
        user: `User request: ${body.prompt}\n\nFolder context: ${JSON.stringify(body.context)}`,
      },
      usingByok ? byokKey : null,
    )) as AIPlan;
  } catch (err) {
    return NextResponse.json(
      { error: 'AI service error', details: err instanceof Error ? err.message : String(err) },
      { status: 502, headers },
    );
  }

  // ── Success ─────────────────────────────────────────────────────────────────
  return NextResponse.json(
    {
      plan,
      tier,
      byok: usingByok,
      remainingCalls: (!usingByok && tier === 'free') ? remainingCalls : null,
    },
    { status: 200, headers },
  );
}

// Return 405 for every other HTTP method
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
export async function PUT(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
export async function PATCH(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
