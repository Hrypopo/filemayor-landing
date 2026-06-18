import React, { useMemo } from 'react';
import { ThreeCanvas } from '@remotion/three';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { buildFiles } from '../data/files';
import { CameraRig } from '../three/CameraRig';
import { FileCards, type CardState } from '../three/FileCards';
import { makeBeamTexture } from '../three/textures';
import { TypedMono } from '../overlays/Overlays';
import { COLORS, FONT_DISPLAY, FONT_SANS, SCENES } from '../theme';
import { chaosCardState } from './Scene1Chaos';

const BEAM_START = 30;
const BEAM_END = 235;

export const Scene2Scan: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const files = useMemo(() => buildFiles(), []);
  const beamTexture = useMemo(() => makeBeamTexture(), []);

  const beamX = interpolate(frame, [BEAM_START, BEAM_END], [-15, 15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  // Slow orbit around the field while the beam works.
  const angle = interpolate(frame, [0, SCENES.scan], [-0.16, 0.2]);
  const radius = 17;
  const camPos: [number, number, number] = [
    Math.sin(angle) * radius,
    1.8,
    Math.cos(angle) * radius,
  ];

  const getState = (file: ReturnType<typeof buildFiles>[number]): CardState => {
    const base = chaosCardState(file, frame);
    const x = base.position[0];
    // Amber glow as the beam passes.
    const proximity = Math.exp(-((x - beamX) ** 2) / 2.4);
    let glow = proximity * 2.2;
    let glowColor: string | undefined;
    // After the beam has passed: duplicates pulse red, stale files orange.
    if (beamX > x + 2 && file.flag) {
      const pulse =
        0.8 + 0.7 * Math.sin(frame * (file.flag === 'dup' ? 0.28 : 0.16) + file.driftPhase);
      if (pulse > glow) {
        glow = pulse;
        glowColor = file.flag === 'dup' ? COLORS.danger : COLORS.warn;
      }
    }
    return { ...base, glow, glowColor };
  };

  // Health score counts up as the scan completes.
  const scoreProgress = interpolate(frame, [150, 235], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const score = Math.round(scoreProgress * 34);
  const scoreOpacity = interpolate(frame, [150, 178], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <ThreeCanvas width={width} height={height} gl={{ antialias: true }}>
        <fog attach="fog" args={[COLORS.bg, 14, 36]} />
        <ambientLight intensity={0.26} color="#fff4dd" />
        <directionalLight position={[6, 8, -6]} intensity={1.2} color="#f59e0b" />
        <CameraRig pose={{ position: camPos, lookAt: [0, 0, -2], fov: 36 }} />
        <FileCards files={files} getState={getState} />
        {frame >= BEAM_START && frame <= BEAM_END + 15 ? (
          <group position={[beamX, 0, -2]}>
            {/* Core beam */}
            <mesh>
              <planeGeometry args={[0.7, 30]} />
              <meshBasicMaterial
                map={beamTexture}
                transparent
                opacity={0.95}
                blending={2 /* AdditiveBlending */}
                depthWrite={false}
              />
            </mesh>
            {/* Wide volumetric halo */}
            <mesh>
              <planeGeometry args={[6, 30]} />
              <meshBasicMaterial
                map={beamTexture}
                transparent
                opacity={0.22}
                blending={2}
                depthWrite={false}
              />
            </mesh>
            <pointLight intensity={260} color="#ffd96a" distance={26} decay={1.6} />
          </group>
        ) : null}
      </ThreeCanvas>

      {/* Translucent health score */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', opacity: scoreOpacity }}>
          <div
            style={{
              fontFamily: `'${FONT_SANS}', sans-serif`,
              fontSize: 26,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: COLORS.text2,
              marginBottom: 18,
            }}
          >
            Health score
          </div>
          <div
            style={{
              fontFamily: `'${FONT_DISPLAY}', Georgia, serif`,
              fontWeight: 600,
              fontSize: 200,
              lineHeight: 1,
              color: COLORS.text,
              textShadow: `0 0 80px rgba(212,175,55,0.55), 0 0 26px rgba(212,175,55,0.35)`,
            }}
          >
            {score}
            <span style={{ fontSize: 76, color: COLORS.text2, fontWeight: 400 }}> / 100</span>
          </div>
        </div>
      </AbsoluteFill>

      <TypedMono text="filemayor explain ~/Downloads" start={18} />
    </AbsoluteFill>
  );
};
