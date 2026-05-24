// Checkout link configuration.
// Set NEXT_PUBLIC_PADDLE_PRO_LINK and NEXT_PUBLIC_PADDLE_TEAM_LINK in your
// environment to activate Paddle. While those vars are absent the site falls
// back to the LemonSqueezy links so existing traffic is never broken.

const PADDLE_PRO  = process.env.NEXT_PUBLIC_PADDLE_PRO_LINK;
const PADDLE_TEAM = process.env.NEXT_PUBLIC_PADDLE_TEAM_LINK;

const LS_PRO  = 'https://filemayor.lemonsqueezy.com/checkout/buy/7fdcc87f-0660-4c1c-b3db-99f94773b71a';
const LS_TEAM = 'https://filemayor.lemonsqueezy.com/checkout/buy/d2795526-eb05-4272-8084-98b6c7a118bb';

export const CHECKOUT_LINKS = {
  pro:  PADDLE_PRO  ?? LS_PRO,
  team: PADDLE_TEAM ?? LS_TEAM,
} as const;
