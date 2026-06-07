/**
 * POST /api/ai/plan
 *
 * AI planning proxy — authenticates FileMayor desktop clients via their
 * license key, applies per-tier rate limiting, then forwards the request
 * to Gemini and returns a structured plan.
 *
 * Required env vars:
 *   GEMINI_API_KEY          — server-side Gemini key (NEVER exposed to client)
 *   FM_LICENSE_PUBLIC_KEY   — Ed25519 public key PEM for license JWT validation
 *                             (or FM_LICENSE_PUBLIC_KEY_<kid> for key rotation)
 *
 * Optional env vars (rate limiting — fail-open if absent):
 *   KV_REST_API_URL         — Vercel KV / Upstash Redis REST endpoint
 *   KV_REST_API_TOKEN       — Vercel KV / Upstash Redis REST token
 */

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { verifyLicenseJwt } from '@/lib/license';

// ─── Constants ────────────────────────────────────────────────────────────────

const FREE_MONTHLY_LIMIT = 10;

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

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

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: {
    message?: string;
    code?: number;
  };
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

/** Returns YYYY-MM for the current UTC month. */
function currentMonthKey(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

/** Returns remaining calls (null if KV not configured), increments counter. */
async function checkAndIncrementRateLimit(identifier: string): Promise<{
  allowed: boolean;
  remaining: number | null;
}> {
  // Fail open if KV env vars are absent
  const hasKv = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;
  if (!hasKv) return { allowed: true, remaining: null };

  const key = `ai:rl:${identifier}:${currentMonthKey()}`;
  try {
    // Atomic increment — creates the key at 0 and then increments
    const newCount = await kv.incr(key);

    // Set expiry on first write so the key auto-cleans after ~60 days
    if (newCount === 1) {
      await kv.expire(key, 60 * 24 * 60 * 60); // 60 days
    }

    const remaining = Math.max(0, FREE_MONTHLY_LIMIT - newCount);
    const allowed = newCount <= FREE_MONTHLY_LIMIT;

    // If over limit, we already incremented — that's acceptable; the user is
    // already blocked and it avoids a read-then-write race condition.
    return { allowed, remaining };
  } catch {
    // KV error — fail open
    return { allowed: true, remaining: null };
  }
}

/** Strip markdown code fences from Gemini's response text. */
function stripCodeFences(text: string): string {
  return text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim();
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  // ── Security headers ────────────────────────────────────────────────────────
  const headers: HeadersInit = { 'Cache-Control': 'no-store' };

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

  // ── Auth & tier resolution ──────────────────────────────────────────────────
  const authHeader = req.headers.get('authorization') ?? '';
  const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
  const token = bearerMatch ? bearerMatch[1].trim() : null;

  type Tier = 'free' | 'pro' | 'enterprise';
  let tier: Tier = 'free';
  let identifier: string = body.deviceId ?? 'anonymous';

  if (token) {
    if (isJwt(token)) {
      // Validate as Ed25519 FileMayor license JWT
      const verified = await verifyLicenseJwt(token);
      if (verified) {
        // Map 'owner' (internal tier) to 'enterprise' for API consumers
        tier =
          verified.tier === 'owner'
            ? 'enterprise'
            : (verified.tier as 'pro' | 'enterprise');
        identifier = verified.sub ?? verified.email ?? token.slice(-16);
      }
      // If verification fails, fall through to free tier with token as identifier
      // so failed JWTs don't accumulate under 'anonymous'
      else {
        identifier = token.slice(-16);
      }
    } else {
      // Old-style FM-XXX-XXXX license key → free tier
      identifier = token;
    }
  }
  // No auth header → use deviceId from body (already set above)

  // ── Rate limiting (free tier only) ─────────────────────────────────────────
  let remainingCalls: number | null = null;

  if (tier === 'free') {
    const { allowed, remaining } = await checkAndIncrementRateLimit(identifier);
    remainingCalls = remaining;
    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Monthly AI limit reached. Upgrade to Pro for unlimited access.',
          upgradeUrl: 'https://filemayor.com/#pricing',
        },
        { status: 429, headers },
      );
    }
  }

  // ── Gemini API key check ────────────────────────────────────────────────────
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    return NextResponse.json(
      { error: 'AI service temporarily unavailable' },
      { status: 503, headers },
    );
  }

  // ── Call Gemini ─────────────────────────────────────────────────────────────
  let geminiRes: Response;
  try {
    geminiRes = await fetch(`${GEMINI_URL}?key=${geminiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: SYSTEM_PROMPT },
              {
                text: `User request: ${body.prompt}\n\nFolder context: ${JSON.stringify(body.context)}`,
              },
            ],
          },
        ],
      }),
    });
  } catch {
    return NextResponse.json({ error: 'AI service temporarily unavailable' }, { status: 503, headers });
  }

  if (!geminiRes.ok) {
    let geminiError: unknown = null;
    try {
      geminiError = (await geminiRes.json()) as unknown;
    } catch {
      geminiError = await geminiRes.text().catch(() => null);
    }
    return NextResponse.json(
      { error: 'AI service error', details: geminiError },
      { status: 502, headers },
    );
  }

  // ── Parse Gemini response ───────────────────────────────────────────────────
  let geminiData: GeminiResponse;
  try {
    geminiData = (await geminiRes.json()) as GeminiResponse;
  } catch {
    return NextResponse.json({ error: 'AI service error', details: 'Unreadable response' }, { status: 502, headers });
  }

  const rawText =
    geminiData.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

  if (!rawText) {
    return NextResponse.json(
      { error: 'AI service error', details: 'Empty response from model' },
      { status: 502, headers },
    );
  }

  // ── Parse the plan JSON ─────────────────────────────────────────────────────
  let plan: AIPlan | null = null;
  try {
    plan = JSON.parse(stripCodeFences(rawText)) as AIPlan;
  } catch {
    return NextResponse.json(
      {
        plan: null,
        rawResponse: rawText,
        error: 'Could not parse plan as JSON',
      },
      { status: 200, headers },
    );
  }

  // ── Success ─────────────────────────────────────────────────────────────────
  return NextResponse.json(
    {
      plan,
      tier,
      remainingCalls: tier === 'free' ? remainingCalls : null,
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
