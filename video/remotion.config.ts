import { Config } from '@remotion/cli/config';

// Software WebGL renderer — required for Three.js in headless/CI environments
// without a GPU.
Config.setChromiumOpenGlRenderer('swangle');
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setConcurrency(4);
