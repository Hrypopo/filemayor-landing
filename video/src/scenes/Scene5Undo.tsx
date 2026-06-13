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
import { buildFiles, type FileDatum } from '../data/files';
import { CameraRig } from '../three/CameraRig';
import { FileCards, type CardState } from '../three/FileCards';
import { CARD_W, CARD_H } from '../three/FileCards';
import { SerifLines, TypedMono } from '../overlays/Overlays';
import { COLORS, SCENES } from '../theme';
import { executionCardState, lerp3 } from './Scene4Execution';

const REWIND_START = 55;
const REWIND_DURATION = 130;

const easeRewind = Easing.inOut(Easing.cubic);

// Per-file reverse progress: 1 (ordered) → 0 (original chaos), with a
// slight stagger so the reversal flows rather than snaps.
const reverseProgress = (file: FileDatum, frame: number) => {
  const offset = (file.delay / 86) * 24;
  const p = (frame - REWIND_START - offset) / REWIND_DURATION;
  return 1 - easeRewind(Math.min(1, Math.max(0, p)));
};

export const Scene5Undo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const files = useMemo(() => buildFiles(), []);
  const ghostGeometry = useMemo(() => new THREE.PlaneGeometry(CARD_W, CARD_H), []);
  const ghostMaterials = useMemo(
    () => [
      new THREE.MeshBasicMaterial({
        color: '#d4af37',
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshBasicMaterial({
        color: '#d4af37',
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    ],
    [],
  );

  const getState = (file: FileDatum): CardState => {
    const u = reverseProgress(file, frame);
    const state = executionCardState(file, u, frame);
    // While rewinding, files carry a faint amber charge.
    const moving = u > 0.02 && u < 0.98;
    return { ...state, glow: moving ? 0.7 : 0 };
  };

  // Amber light trails: ghost copies trailing behind each moving card.
  const ghosts = files.flatMap((file) => {
    const u = reverseProgress(file, frame);
    if (u <= 0.03 || u >= 0.97) {
      return [];
    }
    return [0.045, 0.09].map((lag, gi) => {
      const ug = Math.min(1, u + lag); // trail toward the ordered position
      const pos = lerp3(file.chaosPos, file.orderPos, easeRewind(ug));
      pos[1] += Math.sin(easeRewind(ug) * Math.PI) * 1.6;
      return { key: `${file.id}-${gi}`, pos, gi };
    });
  });

  // Camera pulls back to a wide shot as everything returns home.
  const camZ = interpolate(frame, [0, SCENES.undo], [13, 21], {
    easing: Easing.inOut(Easing.quad),
  });
  const camY = interpolate(frame, [0, SCENES.undo], [0.8, 1.8]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <ThreeCanvas width={width} height={height} gl={{ antialias: true }}>
        <fog attach="fog" args={[COLORS.bg, 15, 38]} />
        <ambientLight intensity={0.3} color="#fff4dd" />
        <directionalLight position={[6, 8, -6]} intensity={1.3} color="#f59e0b" />
        <pointLight position={[-4, 2, 8]} intensity={110} color="#d4af37" distance={40} />
        <CameraRig pose={{ position: [-0.5, camY, camZ], lookAt: [0, 0, -2], fov: 36 }} />
        <FileCards files={files} getState={getState} />
        {ghosts.map((g) => (
          <mesh
            key={g.key}
            geometry={ghostGeometry}
            material={ghostMaterials[g.gi]}
            position={g.pos}
          />
        ))}
      </ThreeCanvas>
      <TypedMono text="filemayor undo --all" start={12} charsPerFrame={1} center bottom={210} />
      <SerifLines
        lines={['Every operation reversible.', 'Always.']}
        start={120}
        stagger={40}
        fontSize={48}
        bottom={90}
      />
    </AbsoluteFill>
  );
};
