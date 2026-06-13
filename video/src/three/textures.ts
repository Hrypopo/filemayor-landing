import * as THREE from 'three';
import { COLORS, FONT_MONO, FONT_SANS } from '../theme';

const roundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

const makeCanvas = (w: number, h: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('2d context unavailable');
  }
  return { canvas, ctx };
};

const toTexture = (canvas: HTMLCanvasElement) => {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
};

const truncate = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  if (ctx.measureText(text).width <= maxWidth) {
    return text;
  }
  let t = text;
  while (t.length > 4 && ctx.measureText(`${t}…`).width > maxWidth) {
    t = t.slice(0, -1);
  }
  return `${t}…`;
};

// A "file card": dark rounded sheet with a doc glyph, faux content lines,
// and the messy filename in monospace at the bottom.
export const makeFileCardTexture = (label: string): THREE.CanvasTexture => {
  const W = 512;
  const H = 288;
  const { canvas, ctx } = makeCanvas(W, H);

  ctx.clearRect(0, 0, W, H);
  roundedRect(ctx, 4, 4, W - 8, H - 8, 26);
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#1b1714');
  bg.addColorStop(1, '#13100d');
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.22)';
  ctx.stroke();

  // Doc glyph with folded corner.
  const gx = 36;
  const gy = 34;
  const gw = 58;
  const gh = 74;
  const fold = 18;
  ctx.beginPath();
  ctx.moveTo(gx, gy);
  ctx.lineTo(gx + gw - fold, gy);
  ctx.lineTo(gx + gw, gy + fold);
  ctx.lineTo(gx + gw, gy + gh);
  ctx.lineTo(gx, gy + gh);
  ctx.closePath();
  ctx.fillStyle = 'rgba(212, 175, 55, 0.13)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(gx + gw - fold, gy);
  ctx.lineTo(gx + gw - fold, gy + fold);
  ctx.lineTo(gx + gw, gy + fold);
  ctx.stroke();

  // Faux content lines.
  ctx.fillStyle = 'rgba(168, 165, 158, 0.28)';
  const lines: Array<[number, number]> = [
    [120, 350],
    [120, 280],
    [120, 320],
    [36, 430],
    [36, 360],
  ];
  lines.forEach(([lx, lw], i) => {
    const ly = i < 3 ? 44 + i * 24 : 134 + (i - 3) * 26;
    roundedRect(ctx, lx, ly, lw, 10, 5);
    ctx.fill();
  });

  // Filename.
  ctx.font = `500 27px '${FONT_MONO}', monospace`;
  ctx.fillStyle = COLORS.text2;
  ctx.textBaseline = 'middle';
  ctx.fillText(truncate(ctx, label, W - 80), 36, H - 46);

  return toTexture(canvas);
};

// An "operation card" for the plan scene: MOVE badge, source path,
// arrow, destination path, and a one-line reason.
export const makeOpCardTexture = (
  op: { verb: string; src: string; dst: string; reason: string },
): THREE.CanvasTexture => {
  const W = 768;
  const H = 432;
  const { canvas, ctx } = makeCanvas(W, H);

  ctx.clearRect(0, 0, W, H);
  roundedRect(ctx, 5, 5, W - 10, H - 10, 30);
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#1d1813');
  bg.addColorStop(1, '#120f0c');
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.38)';
  ctx.stroke();

  // Verb badge.
  ctx.font = `500 26px '${FONT_MONO}', monospace`;
  const badgeW = ctx.measureText(op.verb).width + 44;
  roundedRect(ctx, 44, 40, badgeW, 52, 12);
  ctx.fillStyle = 'rgba(212, 175, 55, 0.16)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = COLORS.accent;
  ctx.textBaseline = 'middle';
  ctx.fillText(op.verb, 66, 68);

  // Source path.
  ctx.font = `400 31px '${FONT_MONO}', monospace`;
  ctx.fillStyle = COLORS.text;
  ctx.fillText(truncate(ctx, op.src, W - 110), 44, 158);

  // Arrow.
  ctx.strokeStyle = COLORS.accent;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(58, 196);
  ctx.lineTo(58, 232);
  ctx.lineTo(96, 232);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(86, 222);
  ctx.lineTo(100, 232);
  ctx.lineTo(86, 242);
  ctx.stroke();

  // Destination path.
  ctx.fillStyle = COLORS.accent;
  ctx.fillText(truncate(ctx, op.dst, W - 170), 116, 234);

  // Reason.
  ctx.font = `400 26px '${FONT_SANS}', sans-serif`;
  ctx.fillStyle = COLORS.text3;
  ctx.fillText(truncate(ctx, op.reason, W - 110), 44, 330);

  return toTexture(canvas);
};

// Folder plate used as the base of each tidy stack in the execution scene.
export const makeFolderTexture = (name: string): THREE.CanvasTexture => {
  const W = 512;
  const H = 192;
  const { canvas, ctx } = makeCanvas(W, H);

  ctx.clearRect(0, 0, W, H);
  // Folder body with tab.
  const r = 18;
  ctx.beginPath();
  ctx.moveTo(16 + r, 56);
  ctx.lineTo(170, 56);
  ctx.lineTo(200, 24);
  ctx.lineTo(330, 24);
  ctx.lineTo(360, 56);
  ctx.lineTo(W - 16 - r, 56);
  ctx.arcTo(W - 16, 56, W - 16, H - 16, r);
  ctx.arcTo(W - 16, H - 16, 16, H - 16, r);
  ctx.arcTo(16, H - 16, 16, 56, r);
  ctx.arcTo(16, 56, 16 + r, 56, r);
  ctx.closePath();
  const bg = ctx.createLinearGradient(0, 24, 0, H);
  bg.addColorStop(0, 'rgba(212, 175, 55, 0.22)');
  bg.addColorStop(1, 'rgba(212, 175, 55, 0.08)');
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.55)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.font = `500 44px '${FONT_SANS}', sans-serif`;
  ctx.fillStyle = COLORS.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name, W / 2, 122);

  return toTexture(canvas);
};

// Soft vertical gradient strip for the scan beam / light shafts.
export const makeBeamTexture = (): THREE.CanvasTexture => {
  const W = 64;
  const H = 256;
  const { canvas, ctx } = makeCanvas(W, H);
  const g = ctx.createLinearGradient(0, 0, W, 0);
  g.addColorStop(0, 'rgba(212, 175, 55, 0)');
  g.addColorStop(0.5, 'rgba(255, 226, 140, 1)');
  g.addColorStop(1, 'rgba(212, 175, 55, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  return toTexture(canvas);
};

// Radial glow sprite (amber).
export const makeGlowTexture = (): THREE.CanvasTexture => {
  const S = 256;
  const { canvas, ctx } = makeCanvas(S, S);
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, 'rgba(255, 226, 140, 0.9)');
  g.addColorStop(0.35, 'rgba(212, 175, 55, 0.35)');
  g.addColorStop(1, 'rgba(212, 175, 55, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  return toTexture(canvas);
};
