import React, { useMemo } from 'react';
import { ThreeCanvas } from '@remotion/three';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import * as THREE from 'three';
import { CameraRig } from '../three/CameraRig';
import { makeOpCardTexture } from '../three/textures';
import { SerifLines } from '../overlays/Overlays';
import { COLORS, SCENES } from '../theme';

const OPS = [
  { verb: 'MOVE', src: '~/Downloads/invoice_FINAL_v3.pdf', dst: 'Documents/Finance/2024/', reason: 'Three versions of the same invoice' },
  { verb: 'MOVE', src: 'Screenshot 2024-03-14 at 09.12.33.png', dst: 'Pictures/Screenshots/2024-03/', reason: '147 screenshots loose in Downloads' },
  { verb: 'MOVE', src: '~/Desktop/report-draft-old.docx', dst: 'Documents/Drafts/', reason: 'Untouched for 14 months' },
  { verb: 'ARCHIVE', src: '~/Downloads/download (7).zip', dst: 'Archives/2024/', reason: 'Duplicate of download (1).zip' },
  { verb: 'MOVE', src: '~/Desktop/IMG_4821.HEIC', dst: 'Pictures/Camera/2024/', reason: 'Camera import left on Desktop' },
  { verb: 'RENAME', src: 'Untitled Document copy (2)', dst: 'meeting-notes-2024-03.md', reason: 'Name says nothing about contents' },
  { verb: 'MOVE', src: '~/Downloads/tax_2022_scan.pdf', dst: 'Documents/Finance/Tax/2022/', reason: 'Sensitive document in Downloads' },
  { verb: 'MOVE', src: 'voice memo 23.m4a', dst: 'Media/Voice Memos/', reason: 'Scattered across three folders' },
  { verb: 'ARCHIVE', src: 'data-export (3).csv', dst: 'Archives/exports/', reason: 'Superseded by export (4)' },
  { verb: 'MOVE', src: 'Resume_new_FINAL2.pdf', dst: 'Documents/Career/', reason: 'Newest of 5 resume copies' },
  { verb: 'RENAME', src: 'photo - Copy.jpg', dst: 'lisbon-trip-032.jpg', reason: 'Restore original capture name' },
  { verb: 'MOVE', src: 'Untitled-1.psd', dst: 'Projects/Design/scratch/', reason: 'Working file far from its project' },
] as const;

const CARD_W = 4.3;
const CARD_H = CARD_W * (432 / 768);

// Grid: 4 columns x 3 rows, each row pushed deeper so the camera can
// travel through the plan.
const cardPosition = (i: number): [number, number, number] => {
  const col = i % 4;
  const row = Math.floor(i / 4);
  return [(col - 1.5) * 4.9, (1 - row) * 2.6 - 0.3, -row * 4.2];
};

export const Scene3Plan: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const textures = useMemo(() => OPS.map((op) => makeOpCardTexture(op)), []);
  const geometry = useMemo(() => new THREE.PlaneGeometry(CARD_W, CARD_H), []);
  const materials = useMemo(
    () =>
      textures.map(
        (map) =>
          new THREE.MeshBasicMaterial({
            map,
            transparent: true,
            side: THREE.DoubleSide,
          }),
      ),
    [textures],
  );

  // Slow push forward through the grid.
  const camZ = interpolate(frame, [0, SCENES.plan], [14, 2.5], {
    easing: Easing.bezier(0.35, 0, 0.45, 1),
  });
  const camY = interpolate(frame, [0, SCENES.plan], [0.3, -0.1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <ThreeCanvas width={width} height={height} gl={{ antialias: true }}>
        <fog attach="fog" args={[COLORS.bg, 10, 26]} />
        <ambientLight intensity={0.5} color="#fff4dd" />
        <pointLight position={[0, 4, 10]} intensity={140} color="#d4af37" distance={40} />
        <CameraRig pose={{ position: [0, camY, camZ], lookAt: [0, -0.1, camZ - 10], fov: 38 }} />
        {OPS.map((op, i) => {
          const appear = 14 + i * 9;
          const p = interpolate(frame, [appear, appear + 24], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          });
          if (p === 0) {
            return null;
          }
          const [x, y, z] = cardPosition(i);
          const mat = materials[i];
          mat.opacity = p;
          const s = 0.85 + 0.15 * p;
          return (
            <mesh
              key={op.src}
              geometry={geometry}
              material={mat}
              position={[x, y, z + (1 - p) * -1.2]}
              scale={[s, s, 1]}
            />
          );
        })}
      </ThreeCanvas>
      <SerifLines
        lines={['A plan, not a guess.', 'Every move explained. Nothing applied.']}
        start={150}
        fontSize={48}
        bottom={100}
      />
    </AbsoluteFill>
  );
};
