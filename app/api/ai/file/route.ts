/**
 * POST /api/ai/file
 *
 * SOP filing proxy. The desktop app / CLI sends one batch of files (name,
 * relative path, size, date, short content excerpt) plus the filing SOP;
 * this returns where each file belongs under the SOP. The client validates
 * every proposal again before moving anything.
 *
 * Auth and tiers mirror /api/ai/plan. Filing a folder takes one call per
 * ~40 files, so it has its own, larger free quota.
 *
 * Needs ANTHROPIC_API_KEY (preferred) or GEMINI_API_KEY in Vercel env.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyLicenseJwt } from '@/lib/license';
import { checkRateLimit } from '@/lib/rate-limit';
import { completeJson, aiConfigured } from '@/lib/ai-json';
import {
  SOP_SYSTEM_PROMPT,
  SOP_RESULT_SCHEMA,
  buildSopBlock,
  buildBatchMessage,
  type SopFileEvidence,
} from '@/lib/sop-prompt';

const FREE_MONTHLY_BATCHES = 200; // ≈ 8,000 files a month
const MAX_BODY_CHARS = 400_000;

interface FileDecision {
  id: number;
  action: 'move' | 'keep';
  to: string;
  rule: string;
  confidence: number;
}

function isJwt(token: string): boolean {
  const parts = token.split('.');
  return parts.length === 3 && parts.every((p) => /^[A-Za-z0-9_-]+$/.test(p) && p.length > 0);
}

function str(v: unknown, max: number): string | null {
  return typeof v === 'string' && v.length <= max ? v : null;
}

function parseFiles(v: unknown): SopFileEvidence[] | null {
  if (!Array.isArray(v) || v.length === 0 || v.length > 50) return null;
  const out: SopFileEvidence[] = [];
  for (const f of v) {
    if (!f || typeof f !== 'object') return null;
    const o = f as Record<string, unknown>;
    if (!Number.isInteger(o.id)) return null;
    const p = str(o.path, 600);
    if (!p) return null;
    out.push({
      id: o.id as number,
      path: p,
      size: str(o.size, 24) ?? '',
      modified: str(o.modified, 24) ?? '',
      excerpt: str(o.excerpt, 1500) ?? '',
    });
  }
  return out;
}

function parseStrings(v: unknown, maxItems: number, maxLen: number): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((s): s is string => typeof s === 'string' && s.length <= maxLen).slice(0, maxItems);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const headers: HeadersInit = { 'Cache-Control': 'no-store' };

  const raw = await req.text();
  if (raw.length > MAX_BODY_CHARS) {
    return NextResponse.json({ error: 'Request too large' }, { status: 413, headers });
  }
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400, headers });
  }

  const sop = typeof body.sop === 'string' ? body.sop.trim() : '';
  if (sop.length < 20 || sop.length > 100_000) {
    return NextResponse.json({ error: '`sop` must be 20–100,000 characters' }, { status: 400, headers });
  }
  const files = parseFiles(body.files);
  if (!files) {
    return NextResponse.json({ error: '`files` must be 1–50 file records' }, { status: 400, headers });
  }
  const folders = parseStrings(body.folders, 300, 400);
  const recent = parseStrings(body.recent, 100, 400);

  // ── Tier ────────────────────────────────────────────────────────────────────
  const authHeader = req.headers.get('authorization') ?? '';
  const token = authHeader.match(/^Bearer\s+(.+)$/i)?.[1]?.trim() ?? null;
  let tier: 'free' | 'pro' | 'enterprise' = 'free';
  let identifier = typeof body.deviceId === 'string' ? body.deviceId.slice(0, 64) : 'anonymous';
  if (token) {
    if (isJwt(token)) {
      const verified = await verifyLicenseJwt(token);
      if (verified) {
        tier = verified.tier === 'owner' ? 'enterprise' : (verified.tier as 'pro' | 'enterprise');
        identifier = verified.sub ?? verified.email ?? token.slice(-16);
      } else {
        identifier = token.slice(-16);
      }
    } else {
      identifier = token.slice(0, 64);
    }
  }

  if (!aiConfigured()) {
    return NextResponse.json(
      { error: 'FileMayor AI is not configured on the server yet. Add your own AI key in Settings to continue.' },
      { status: 503, headers },
    );
  }

  if (tier === 'free') {
    const rl = await checkRateLimit(identifier, {
      namespace: 'ai-file',
      monthlyLimit: FREE_MONTHLY_BATCHES,
      burstLimit: 8,
      burstWindowSeconds: 10,
    });
    if (!rl.allowed) {
      return NextResponse.json(
        {
          error: rl.reason === 'burst'
            ? 'Too many requests. Please wait a moment.'
            : 'Free filing limit reached for this month. Upgrade to Pro or add your own AI key in Settings.',
        },
        { status: 429, headers },
      );
    }
  }

  // ── Classify ────────────────────────────────────────────────────────────────
  let result: unknown;
  try {
    result = await completeJson({
      system: SOP_SYSTEM_PROMPT,
      context: buildSopBlock(sop),
      user: buildBatchMessage(files, folders, recent),
      schema: SOP_RESULT_SCHEMA as unknown as Record<string, unknown>,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'AI service error', details: err instanceof Error ? err.message : String(err) },
      { status: 502, headers },
    );
  }

  const decisions = (result as { files?: unknown })?.files;
  if (!Array.isArray(decisions)) {
    return NextResponse.json({ error: 'AI service error', details: 'Unexpected response shape' }, { status: 502, headers });
  }

  const ids = new Set(files.map((f) => f.id));
  const clean: FileDecision[] = decisions
    .filter((d): d is Record<string, unknown> => !!d && typeof d === 'object')
    .filter((d) => Number.isInteger(d.id) && ids.has(d.id as number))
    .map((d) => ({
      id: d.id as number,
      action: d.action === 'move' ? 'move' : 'keep',
      to: typeof d.to === 'string' ? d.to.slice(0, 600) : '',
      rule: typeof d.rule === 'string' ? d.rule.slice(0, 300) : '',
      confidence: Math.max(0, Math.min(100, Math.round(Number(d.confidence) || 0))),
    }));

  return NextResponse.json({ files: clean, tier }, { status: 200, headers });
}
