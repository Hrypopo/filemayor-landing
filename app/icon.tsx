/* Generated favicon — Next.js will serve this as /icon and /favicon.ico.
   Keeps the favicon in lockstep with the brand tokens by generating it from
   the same source as the rest of the design. */

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0d0b0a',
          borderRadius: 7,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <div style={{ width: 18, height: 2.5, background: '#d4af37', borderRadius: 2 }} />
        <div style={{ width: 10, height: 2.5, background: '#d4af37', borderRadius: 2 }} />
        <div style={{ width: 18, height: 2.5, background: '#d4af37', borderRadius: 2 }} />
      </div>
    ),
    { ...size },
  );
}
