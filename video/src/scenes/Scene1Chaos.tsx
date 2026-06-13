import React, { useMemo } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { AbsoluteFill } from 'remotion';
import { buildFiles, type FileDatum } from '../data/files';
import { CameraRig } from '../three/CameraRig';
import { FileCards } from '../three/FileCards';
import { SerifLines } from '../overlays/Overlays';
import { COLORS, SCENES } from '../theme';

const drift = (file: FileDatum, frame: number): [number, number, number] => {
  const t = frame / 30;
  return [
    file.chaosPos[0] + Math.sin(t * 0.5 + file.driftPhase) * file.driftAmp,
    file.chaosPos[1] + Math.cos(t * 0.4 + file.driftPhase * 1.7) * file.driftAmp * 0.8,
    file.chaosPos[2] + Math.sin(t * 0.3 + file.driftPhase * 0.6) * file.driftAmp * 0.5,
  ];
};

export const chaosCardState = (file: FileDatum, frame: number) => {
  const t = frame / 30;
  return {
    position: drift(file, frame),
    rotation: [
      file.chaosRot[0] + Math.sin(t * 0.25 + file.driftPhase) * 0.06,
      file.chaosRot[1] + Math.cos(t * 0.2 + file.driftPhase) * 0.08,
      file.chaosRot[2],
    ] as [number, number, number],
  };
};

export const Scene1Chaos: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const files = useMemo(() => buildFiles(), []);

  // Slow macro pull-back revealing the scale of the chaos.
  const camZ = interpolate(frame, [0, SCENES.chaos], [4.5, 19], {
    easing: Easing.bezier(0.3, 0, 0.4, 1),
  });
  const camY = interpolate(frame, [0, SCENES.chaos], [0.4, 1.6]);
  const camX = interpolate(frame, [0, SCENES.chaos], [0.8, -0.6]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <ThreeCanvas width={width} height={height} gl={{ antialias: true }}>
        <fog attach="fog" args={[COLORS.bg, 14, 34]} />
        <ambientLight intensity={0.32} color="#fff4dd" />
        <directionalLight position={[6, 8, -6]} intensity={1.6} color="#f59e0b" />
        <pointLight position={[-4, 2, 8]} intensity={120} color="#d4af37" distance={40} />
        <CameraRig pose={{ position: [camX, camY, camZ], lookAt: [0, 0, -2], fov: 36 }} />
        <FileCards files={files} getState={(f) => chaosCardState(f, frame)} />
      </ThreeCanvas>
      <SerifLines lines={['Your filesystem.', 'Quietly out of control.']} start={75} />
    </AbsoluteFill>
  );
};
