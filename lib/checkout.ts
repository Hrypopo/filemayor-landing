// Paddle Billing (v2) — overlay checkout
// Set NEXT_PUBLIC_PADDLE_CLIENT_TOKEN, NEXT_PUBLIC_PADDLE_PRO_PRICE_ID,
// NEXT_PUBLIC_PADDLE_TEAM_PRICE_ID in Vercel environment variables.
// Falls back to LemonSqueezy direct links when Paddle is not configured.

export const PADDLE_CLIENT_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? null;

export const PADDLE_PRICE_IDS = {
  pro:  process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID  ?? null,
  team: process.env.NEXT_PUBLIC_PADDLE_TEAM_PRICE_ID ?? null,
} as const;

export const PADDLE_ENABLED = Boolean(PADDLE_CLIENT_TOKEN && PADDLE_PRICE_IDS.pro && PADDLE_PRICE_IDS.team);

// LemonSqueezy fallback (existing traffic never broken)
const LS_PRO  = 'https://filemayor.lemonsqueezy.com/checkout/buy/7fdcc87f-0660-4c1c-b3db-99f94773b71a';
const LS_TEAM = 'https://filemayor.lemonsqueezy.com/checkout/buy/d2795526-eb05-4272-8084-98b6c7a118bb';

export const CHECKOUT_LINKS = {
  pro:  LS_PRO,
  team: LS_TEAM,
} as const;
