// Brand palette — mirrors app/globals.css dark-theme tokens.
export const COLORS = {
  bg: '#0d0b0a',
  surface: '#171310',
  text: '#fafaf8',
  text2: '#a8a59e',
  text3: '#8e8a82',
  accent: '#d4af37',
  warn: '#f59e0b',
  danger: '#f87171',
  ok: '#4ade80',
} as const;

export const FONT_DISPLAY = 'Newsreader';
export const FONT_SANS = 'Geist';
export const FONT_MONO = 'Geist Mono';

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Scene durations in frames (30fps) — per VIDEO_SCRIPT.md timings.
export const SCENES = {
  chaos: 300, // 0:00–0:10
  scan: 300, // 0:10–0:20
  plan: 300, // 0:20–0:30
  execution: 360, // 0:30–0:42
  undo: 240, // 0:42–0:50
  logo: 300, // 0:50–1:00
} as const;

export const TOTAL_FRAMES =
  SCENES.chaos + SCENES.scan + SCENES.plan + SCENES.execution + SCENES.undo + SCENES.logo;
