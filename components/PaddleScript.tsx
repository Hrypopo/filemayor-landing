'use client';

import Script from 'next/script';

/**
 * Loads Paddle.js and initialises it with the public client token.
 *
 * Must be a Client Component: the <Script onLoad> handler is a function,
 * and functions cannot be passed as props from a Server Component (it
 * crashes prerendering with "Event handlers cannot be passed to Client
 * Component props"). Rendering nothing when the token is absent keeps the
 * script out of builds that don't use Paddle.
 */
export function PaddleScript() {
  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
  if (!token) return null;

  return (
    <Script
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined' && window.Paddle) {
          window.Paddle.Setup?.({ token });
        }
      }}
    />
  );
}
