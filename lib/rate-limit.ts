/**
 * Two-layer rate limiter for /api/ai/plan (free tier only).
 *
 * Layer 1 — burst: 3 requests per 10 seconds (per identifier)
 *   Stops rapid-fire abuse / retry storms before they consume the monthly quota.
 *
 * Layer 2 — monthly quota: 10 requests per calendar month (UTC)
 *   The hard limit for free users. Key auto-expires after 60 days.
 *
 * Both layers fail-open: if Redis is not configured or throws, all checks pass.
 */

import { Redis } from '@upstash/redis';

// ─── Config ───────────────────────────────────────────────────────────────────

const BURST_LIMIT = 3;
const BURST_WINDOW_SECONDS = 10;

const MONTHLY_LIMIT = 10;
const MONTHLY_KEY_TTL_SECONDS = 60 * 24 * 60 * 60; // 60 days

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getRedisConfig(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

function currentMonthKey(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

// ─── Layer 1: burst check ─────────────────────────────────────────────────────

async function checkBurst(identifier: string, redis: Redis): Promise<boolean> {
  const key = `ai:burst:${identifier}`;
  try {
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, BURST_WINDOW_SECONDS);
    return count <= BURST_LIMIT;
  } catch {
    return true; // fail-open
  }
}

// ─── Layer 2: monthly quota ───────────────────────────────────────────────────

async function checkMonthlyQuota(identifier: string, redis: Redis): Promise<{
  allowed: boolean;
  remaining: number;
}> {
  const key = `ai:rl:${identifier}:${currentMonthKey()}`;
  try {
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, MONTHLY_KEY_TTL_SECONDS);
    return {
      allowed: count <= MONTHLY_LIMIT,
      remaining: Math.max(0, MONTHLY_LIMIT - count),
    };
  } catch {
    return { allowed: true, remaining: MONTHLY_LIMIT }; // fail-open
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export type RateLimitResult =
  | { allowed: true; remaining: number | null }
  | { allowed: false; reason: 'burst' | 'quota'; remaining: number };

export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  const config = getRedisConfig();
  if (!config) return { allowed: true, remaining: null };

  const redis = new Redis(config);

  const burstOk = await checkBurst(identifier, redis);
  if (!burstOk) {
    return { allowed: false, reason: 'burst', remaining: 0 };
  }

  const { allowed, remaining } = await checkMonthlyQuota(identifier, redis);
  if (!allowed) {
    return { allowed: false, reason: 'quota', remaining: 0 };
  }

  return { allowed: true, remaining };
}
