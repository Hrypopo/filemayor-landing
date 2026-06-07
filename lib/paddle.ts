// Paddle Billing v2 overlay helper.
// Call openPaddleCheckout('pro') or openPaddleCheckout('team') from any client component.
// Falls back to a direct LemonSqueezy link if Paddle is not configured or not loaded.

import { PADDLE_ENABLED, PADDLE_PRICE_IDS, CHECKOUT_LINKS } from './checkout';

type PlanKey = 'pro' | 'team';

interface PaddleInstance {
  Checkout: { open: (opts: { items: Array<{ priceId: string; quantity: number }> }) => void };
  Setup?: (opts: { token: string }) => void;
}

declare global {
  interface Window { Paddle?: PaddleInstance }
}

export function openPaddleCheckout(plan: PlanKey): void {
  const paddle = (typeof window !== 'undefined') ? window.Paddle : null;

  if (PADDLE_ENABLED && paddle?.Checkout?.open && PADDLE_PRICE_IDS[plan]) {
    paddle.Checkout.open({
      items: [{ priceId: PADDLE_PRICE_IDS[plan]!, quantity: 1 }],
    });
    return;
  }

  // Fallback: redirect to LemonSqueezy
  window.open(CHECKOUT_LINKS[plan], '_blank', 'noopener');
}
