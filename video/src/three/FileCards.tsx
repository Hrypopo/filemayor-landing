import React, { useMemo } from 'react';
import * as THREE from 'three';
import { FILE_LABELS, type FileDatum } from '../data/files';
import { makeFileCardTexture } from './textures';

export type CardState = {
  position: [number, number, number];
  rotation: [number, number, number];
  // 0..1 — amber emissive boost (scan glow, landing pulse).
  glow?: number;
  glowColor?: string;
  opacity?: number;
};

export const CARD_W = 3.2;
export const CARD_H = 1.8;

let textureCache: THREE.CanvasTexture[] | null = null;
const getTextures = () => {
  if (!textureCache) {
    textureCache = FILE_LABELS.map((l) => makeFileCardTexture(l));
  }
  return textureCache;
};

export const FileCards: React.FC<{
  files: FileDatum[];
  getState: (file: FileDatum) => CardState;
}> = ({ files, getState }) => {
  const textures = useMemo(() => getTextures(), []);
  const geometry = useMemo(() => new THREE.PlaneGeometry(CARD_W, CARD_H), []);
  const materials = useMemo(
    () =>
      files.map(
        (f) =>
          new THREE.MeshStandardMaterial({
            map: textures[f.textureIndex],
            emissiveMap: textures[f.textureIndex],
            transparent: true,
            side: THREE.DoubleSide,
            roughness: 0.85,
            metalness: 0.1,
            emissive: new THREE.Color('#d4af37'),
            emissiveIntensity: 0,
          }),
      ),
    [files, textures],
  );

  return (
    <group>
      {files.map((file, i) => {
        const state = getState(file);
        const mat = materials[i];
        mat.emissiveIntensity = state.glow ?? 0;
        if (state.glowColor) {
          mat.emissive.set(state.glowColor);
        } else {
          mat.emissive.set('#d4af37');
        }
        mat.opacity = state.opacity ?? 1;
        return (
          <mesh
            key={file.id}
            geometry={geometry}
            material={mat}
            position={state.position}
            rotation={state.rotation}
          />
        );
      })}
    </group>
  );
};
