import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONT_DISPLAY, FONT_MONO } from '../theme';

const fadeUp = (frame: number, start: number, dur = 30) => ({
  opacity: interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }),
  transform: `translateY(${interpolate(frame, [start, start + dur + 6], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })}px)`,
});

export const Scene6Logo: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow-breathing ambient glow.
  const breath = 0.55 + 0.2 * Math.sin(frame / 38);
  const logoIn = interpolate(frame, [12, 64], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const tracking = interpolate(logoIn, [0, 1], [0.06, -0.02]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Warm under-light */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 46% 34% at 50% 62%, rgba(212,175,55,${
            0.16 * breath
          }) 0%, rgba(212,175,55,0) 70%)`,
        }}
      />
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: `'${FONT_DISPLAY}', Georgia, serif`,
            fontWeight: 500,
            fontSize: 150,
            lineHeight: 1.05,
            color: COLORS.text,
            opacity: logoIn,
            letterSpacing: `${tracking}em`,
            textShadow: `0 14px 90px rgba(212,175,55,${0.45 * breath}), 0 4px 30px rgba(212,175,55,${
              0.25 * breath
            })`,
          }}
        >
          FileMayor
        </div>
        <div
          style={{
            ...fadeUp(frame, 78),
            fontFamily: `'${FONT_DISPLAY}', Georgia, serif`,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 42,
            color: COLORS.text2,
            marginTop: 26,
          }}
        >
          Free. Local-first. Reversible.
        </div>
        <div
          style={{
            ...fadeUp(frame, 116),
            display: 'inline-block',
            fontFamily: `'${FONT_MONO}', monospace`,
            fontSize: 32,
            color: COLORS.text,
            marginTop: 54,
            padding: '18px 36px',
            borderRadius: 14,
            border: '1px solid rgba(212,175,55,0.35)',
            background: 'rgba(212,175,55,0.06)',
          }}
        >
          npm install -g filemayor
        </div>
        <div
          style={{
            ...fadeUp(frame, 150),
            fontFamily: `'${FONT_MONO}', monospace`,
            fontSize: 26,
            color: COLORS.text3,
            marginTop: 40,
          }}
        >
          filemayor.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
