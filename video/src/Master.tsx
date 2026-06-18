import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Sequence, continueRender, delayRender } from 'remotion';
import { ensureFonts } from './fonts';
import { Grain, SceneShell, Vignette } from './overlays/Overlays';
import { Scene1Chaos } from './scenes/Scene1Chaos';
import { Scene2Scan } from './scenes/Scene2Scan';
import { Scene3Plan } from './scenes/Scene3Plan';
import { Scene4Execution } from './scenes/Scene4Execution';
import { Scene5Undo } from './scenes/Scene5Undo';
import { Scene6Logo } from './scenes/Scene6Logo';
import { COLORS, SCENES } from './theme';

// Fonts must be ready before any canvas texture bakes a filename.
const useBrandFonts = () => {
  const [loaded, setLoaded] = useState(false);
  const [handle] = useState(() => delayRender('brand-fonts'));
  useEffect(() => {
    ensureFonts().then(() => {
      setLoaded(true);
      continueRender(handle);
    });
  }, [handle]);
  return loaded;
};

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
    {children}
    <Vignette />
    <Grain />
  </AbsoluteFill>
);

export const Master60: React.FC = () => {
  const loaded = useBrandFonts();
  if (!loaded) {
    return <AbsoluteFill style={{ backgroundColor: COLORS.bg }} />;
  }

  const s1 = 0;
  const s2 = s1 + SCENES.chaos;
  const s3 = s2 + SCENES.scan;
  const s4 = s3 + SCENES.plan;
  const s5 = s4 + SCENES.execution;
  const s6 = s5 + SCENES.undo;

  return (
    <Shell>
      <Sequence from={s1} durationInFrames={SCENES.chaos} name="1 — The Problem">
        <SceneShell duration={SCENES.chaos} fadeIn={0}>
          <Scene1Chaos />
        </SceneShell>
      </Sequence>
      <Sequence from={s2} durationInFrames={SCENES.scan} name="2 — The Scan">
        <SceneShell duration={SCENES.scan}>
          <Scene2Scan />
        </SceneShell>
      </Sequence>
      <Sequence from={s3} durationInFrames={SCENES.plan} name="3 — The Plan">
        <SceneShell duration={SCENES.plan}>
          <Scene3Plan />
        </SceneShell>
      </Sequence>
      <Sequence from={s4} durationInFrames={SCENES.execution} name="4 — The Execution">
        <SceneShell duration={SCENES.execution}>
          <Scene4Execution />
        </SceneShell>
      </Sequence>
      <Sequence from={s5} durationInFrames={SCENES.undo} name="5 — The Undo">
        <SceneShell duration={SCENES.undo}>
          <Scene5Undo />
        </SceneShell>
      </Sequence>
      <Sequence from={s6} durationInFrames={SCENES.logo} name="6 — Logo Reveal">
        <SceneShell duration={SCENES.logo} fadeOut={0}>
          <Scene6Logo />
        </SceneShell>
      </Sequence>
    </Shell>
  );
};

// 15s cut: the problem → the fix → the brand.
export const Cut15: React.FC = () => {
  const loaded = useBrandFonts();
  if (!loaded) {
    return <AbsoluteFill style={{ backgroundColor: COLORS.bg }} />;
  }
  return (
    <Shell>
      <Sequence from={0} durationInFrames={150}>
        <SceneShell duration={150} fadeIn={0}>
          <Sequence from={-60}>
            <Scene1Chaos />
          </Sequence>
        </SceneShell>
      </Sequence>
      <Sequence from={150} durationInFrames={180}>
        <SceneShell duration={180}>
          <Sequence from={-110}>
            <Scene4Execution />
          </Sequence>
        </SceneShell>
      </Sequence>
      <Sequence from={330} durationInFrames={120}>
        <SceneShell duration={120} fadeOut={0}>
          <Sequence from={-20}>
            <Scene6Logo />
          </Sequence>
        </SceneShell>
      </Sequence>
    </Shell>
  );
};

// 6s cut: the transformation only — for paid ads.
export const Cut6: React.FC = () => {
  const loaded = useBrandFonts();
  if (!loaded) {
    return <AbsoluteFill style={{ backgroundColor: COLORS.bg }} />;
  }
  return (
    <Shell>
      <Sequence from={0} durationInFrames={180}>
        <SceneShell duration={180} fadeIn={0} fadeOut={12}>
          <Sequence from={-90}>
            <Scene4Execution />
          </Sequence>
        </SceneShell>
      </Sequence>
    </Shell>
  );
};
