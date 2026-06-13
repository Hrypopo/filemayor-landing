import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';
import { FONT_DISPLAY, FONT_MONO, FONT_SANS } from './theme';

let promise: Promise<void> | null = null;

export const ensureFonts = (): Promise<void> => {
  if (promise) {
    return promise;
  }
  promise = Promise.all([
    loadFont({
      family: FONT_DISPLAY,
      url: staticFile('fonts/Newsreader-400.ttf'),
      weight: '400',
      style: 'normal',
    }),
    loadFont({
      family: FONT_DISPLAY,
      url: staticFile('fonts/Newsreader-500.ttf'),
      weight: '500',
      style: 'normal',
    }),
    loadFont({
      family: FONT_DISPLAY,
      url: staticFile('fonts/Newsreader-600.ttf'),
      weight: '600',
      style: 'normal',
    }),
    loadFont({
      family: FONT_DISPLAY,
      url: staticFile('fonts/Newsreader-Italic-400.ttf'),
      weight: '400',
      style: 'italic',
    }),
    loadFont({
      family: FONT_DISPLAY,
      url: staticFile('fonts/Newsreader-Italic-500.ttf'),
      weight: '500',
      style: 'italic',
    }),
    loadFont({
      family: FONT_SANS,
      url: staticFile('fonts/Geist-400.ttf'),
      weight: '400',
      style: 'normal',
    }),
    loadFont({
      family: FONT_SANS,
      url: staticFile('fonts/Geist-500.ttf'),
      weight: '500',
      style: 'normal',
    }),
    loadFont({
      family: FONT_MONO,
      url: staticFile('fonts/GeistMono-400.ttf'),
      weight: '400',
      style: 'normal',
    }),
    loadFont({
      family: FONT_MONO,
      url: staticFile('fonts/GeistMono-500.ttf'),
      weight: '500',
      style: 'normal',
    }),
  ]).then(() => undefined);
  return promise;
};
