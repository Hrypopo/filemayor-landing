import { useThree } from '@react-three/fiber';
import { useLayoutEffect } from 'react';
import type { PerspectiveCamera } from 'three';

export type CameraPose = {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov?: number;
};

export const CameraRig: React.FC<{ pose: CameraPose }> = ({ pose }) => {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;

  useLayoutEffect(() => {
    camera.position.set(...pose.position);
    camera.lookAt(...pose.lookAt);
    if (pose.fov && camera.fov !== pose.fov) {
      camera.fov = pose.fov;
      camera.updateProjectionMatrix();
    }
  }, [camera, pose]);

  return null;
};
