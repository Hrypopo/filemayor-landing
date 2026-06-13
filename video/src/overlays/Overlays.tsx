import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONT_DISPLAY, FONT_MONO } from '../theme';

// Serif lower-third lines, staggered fade-and-rise. Matches the site's
// Newsreader italic display style.
export const SerifLines: React.FC<{
  lines: string[];
  start: number;
  stagger?: number;
  fontSize?: number;
  bottom?: number;
}> = ({ lines, start, stagger = 45, fontSize = 54, bottom = 120 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
      <div style={{ marginBottom: bottom, textAlign: 'center' }}>
        {lines.map((line, i) => {
          const f = frame - start - i * stagger;
          const opacity = interpolate(f, [0, 28], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const y = interpolate(f, [0, 32], [22, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: (t) => 1 - (1 - t) ** 3,
          });
          return (
            <div
              key={line}
              style={{
                fontFamily: `'${FONT_DISPLAY}', Georgia, serif`,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize,
                lineHeight: 1.35,
                color: COLORS.text,
                opacity,
                transform: `translateY(${y}px)`,
                textShadow: '0 2px 24px rgba(0,0,0,0.8)',
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Terminal-style typed monospace line with a blinking caret.
export const TypedMono: React.FC<{
  text: string;
  start: number;
  charsPerFrame?: number;
  fontSize?: number;
  bottom?: number;
  left?: number;
  center?: boolean;
}> = ({ text, start, charsPerFrame = 0.8, fontSize = 34, bottom = 96, left = 120, center }) => {
  const frame = useCurrentFrame();
  const shown = Math.max(0, Math.floor((frame - start) * charsPerFrame));
  if (frame < start) {
    return null;
  }
  const visible = text.slice(0, shown);
  const done = shown >= text.length;
  const caretOn = done ? Math.floor(frame / 16) % 2 === 0 : true;
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: center ? 'center' : 'flex-start',
      }}
    >
      <div
        style={{
          marginBottom: bottom,
          marginLeft: center ? 0 : left,
          fontFamily: `'${FONT_MONO}', monospace`,
          fontSize,
          color: COLORS.text2,
          textShadow: '0 2px 16px rgba(0,0,0,0.9)',
        }}
      >
        <span style={{ color: COLORS.accent }}>$ </span>
        <span style={{ color: COLORS.text }}>{visible}</span>
        <span style={{ opacity: caretOn ? 1 : 0, color: COLORS.accent }}>▍</span>
      </div>
    </AbsoluteFill>
  );
};

// Cinematic vignette — constant.
export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      background:
        'radial-gradient(ellipse 75% 62% at 50% 46%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.52) 100%)',
    }}
  />
);

// Subtle animated film grain.
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', opacity }}>
      <svg width="100%" height="100%">
        <filter id="fm-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed={frame % 120}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#fm-grain)" />
      </svg>
    </AbsoluteFill>
  );
};

// Dip-to-black shell: every scene fades in from and out to pure black,
// approximating the 8-frame cross-dissolves from the script.
export const SceneShell: React.FC<{
  duration: number;
  fadeIn?: number;
  fadeOut?: number;
  children: React.ReactNode;
}> = ({ duration, fadeIn = 10, fadeOut = 10, children }) => {
  const frame = useCurrentFrame();
  const opacity = Math.min(
    fadeIn === 0 ? 1 : Math.min(1, frame / fadeIn),
    fadeOut === 0 ? 1 : Math.min(1, (duration - frame) / fadeOut),
  );
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
