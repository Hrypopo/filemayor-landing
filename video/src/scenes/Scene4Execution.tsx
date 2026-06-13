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
import { buildFiles, CLUSTERS, type FileDatum } from '../data/files';
import { CameraRig } from '../three/CameraRig';
import { FileCards, type CardState } from '../three/FileCards';
import { makeFolderTexture } from '../three/textures';
import { SerifLines } from '../overlays/Overlays';
import { COLORS, SCENES } from '../theme';

const MOVE_DURATION = 80;

const easeMove = Easing.bezier(0.45, 0, 0.18, 1);

export const lerp3 = (
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

// Choreographed move: chaos → order with a gentle arc and a golden pulse
// on landing. `progress` is 0..1 per file.
export const executionCardState = (file: FileDatum, progress: number, frame: number): CardState => {
  const t = easeMove(Math.min(1, Math.max(0, progress)));
  const position = lerp3(file.chaosPos, file.orderPos, t);
  // Arc: lift slightly mid-flight like a choreographed toss.
  position[1] += Math.sin(t * Math.PI) * 1.6;
  const rotation = lerp3(file.chaosRot, file.orderRot, t);

  // Landing pulse — bright then decaying.
  let glow = 0;
  if (progress >= 1) {
    const sinceLanding = (progress - 1) * MOVE_DURATION;
    glow = Math.exp(-sinceLanding / 9) * 2.6;
  } else if (t > 0.05 && t < 1) {
    glow = 0.3; // faint warmth while in motion
  }
  void frame;
  return { position, rotation, glow };
};

export const folderPlates = (clusterOpacity: (cluster: number) => number) =>
  CLUSTERS.map((name, c) => ({ name, cluster: c, opacity: clusterOpacity(c) }));

export const FolderPlates: React.FC<{ opacityFor: (cluster: number) => number }> = ({
  opacityFor,
}) => {
  const textures = useMemo(() => CLUSTERS.map((n) => makeFolderTexture(n)), []);
  const geometry = useMemo(() => new THREE.PlaneGeometry(3.9, 3.9 * (192 / 512)), []);
  const materials = useMemo(
    () =>
      textures.map(
        (map) =>
          new THREE.MeshBasicMaterial({ map, transparent: true, side: THREE.DoubleSide }),
      ),
    [textures],
  );
  return (
    <group>
      {CLUSTERS.map((name, c) => {
        const opacity = opacityFor(c);
        if (opacity <= 0) {
          return null;
        }
        const col = c % 3;
        const row = Math.floor(c / 3);
        materials[c].opacity = opacity;
        return (
          <mesh
            key={name}
            geometry={geometry}
            material={materials[c]}
            position={[(col - 1) * 7.4, (row === 0 ? 2.9 : -3.1) - 2.0, 0.4]}
          />
        );
      })}
    </group>
  );
};

export const Scene4Execution: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const files = useMemo(() => buildFiles(), []);

  const getState = (file: FileDatum): CardState =>
    executionCardState(file, (frame - 20 - file.delay) / MOVE_DURATION, frame);

  // Camera: wide sweep from above, settling into a frontal push-in.
  const sweep = interpolate(frame, [0, 200], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const push = interpolate(frame, [200, SCENES.execution], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });
  const camPos: [number, number, number] = [
    interpolate(sweep, [0, 1], [-6, 0]),
    interpolate(sweep, [0, 1], [15, 2]) - push * 1.2,
    interpolate(sweep, [0, 1], [10, 17]) - push * 4.5,
  ];
  const lookY = interpolate(sweep, [0, 1], [-2, 0]);

  const plateOpacity = (cluster: number) =>
    interpolate(frame, [40 + cluster * 16, 70 + cluster * 16], [0, 0.95], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <ThreeCanvas width={width} height={height} gl={{ antialias: true }}>
        <fog attach="fog" args={[COLORS.bg, 16, 40]} />
        <ambientLight intensity={0.42} color="#fff4dd" />
        <directionalLight position={[5, 10, 6]} intensity={1.6} color="#f5d98b" />
        <pointLight position={[0, 3, 9]} intensity={170} color="#d4af37" distance={40} />
        <CameraRig pose={{ position: camPos, lookAt: [0, lookY, 0], fov: 36 }} />
        <FileCards files={files} getState={getState} />
        <FolderPlates opacityFor={plateOpacity} />
      </ThreeCanvas>
      <SerifLines lines={['You approved it.', 'FileMayor applied it.']} start={235} />
    </AbsoluteFill>
  );
};
