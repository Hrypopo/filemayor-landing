import React from 'react';
import { Composition } from 'remotion';
import { Cut15, Cut6, Master60 } from './Master';
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from './theme';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Master60"
      component={Master60}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    <Composition
      id="Cut15"
      component={Cut15}
      durationInFrames={450}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    <Composition
      id="Cut6"
      component={Cut6}
      durationInFrames={180}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  </>
);
