import { random } from 'remotion';

export type FileFlag = 'dup' | 'stale' | null;

export type FileDatum = {
  id: number;
  label: string;
  textureIndex: number;
  chaosPos: [number, number, number];
  chaosRot: [number, number, number];
  orderPos: [number, number, number];
  orderRot: [number, number, number];
  cluster: number;
  flag: FileFlag;
  driftPhase: number;
  driftAmp: number;
  // Per-file stagger (in frames) for the execution / undo choreography.
  delay: number;
};

export const FILE_LABELS = [
  'Screenshot 2024-03-14 at 09.12.33.png',
  'invoice_FINAL_v3.pdf',
  'Untitled Document copy (2)',
  'IMG_4821.HEIC',
  'report-draft-old.docx',
  'download (7).zip',
  'Resume_new_FINAL2.pdf',
  'notes copy.txt',
  'tax_2022_scan.pdf',
  'voice memo 23.m4a',
  'data-export (3).csv',
  'photo - Copy.jpg',
  'Untitled-1.psd',
  'setup-installer (1).dmg',
] as const;

export const CLUSTERS = [
  'Documents',
  'Images',
  'Finance',
  'Media',
  'Archives',
  'Projects',
] as const;

export const FILE_COUNT = 96;

// Cluster anchor positions for the "perfect order" layout (scene 4/5):
// 3 columns x 2 rows facing the camera.
const clusterAnchor = (cluster: number): [number, number, number] => {
  const col = cluster % 3;
  const row = Math.floor(cluster / 3);
  return [(col - 1) * 7.4, row === 0 ? 2.9 : -3.1, 0];
};

export const buildFiles = (): FileDatum[] => {
  const files: FileDatum[] = [];
  const perCluster = FILE_COUNT / CLUSTERS.length;

  for (let i = 0; i < FILE_COUNT; i++) {
    const cluster = Math.floor(i / perCluster);
    const indexInCluster = i % perCluster;
    const anchor = clusterAnchor(cluster);

    // Chaotic field: spread across a wide, deep volume.
    const chaosPos: [number, number, number] = [
      (random(`cx-${i}`) - 0.5) * 27,
      (random(`cy-${i}`) - 0.5) * 14,
      (random(`cz-${i}`) - 0.5) * 16 - 3,
    ];
    const chaosRot: [number, number, number] = [
      (random(`crx-${i}`) - 0.5) * 0.9,
      (random(`cry-${i}`) - 0.5) * 1.1,
      (random(`crz-${i}`) - 0.5) * 0.7,
    ];

    // Ordered stack: tidy fanned pile per cluster, slight per-card offset.
    const orderPos: [number, number, number] = [
      anchor[0] + (random(`ox-${i}`) - 0.5) * 0.18,
      anchor[1] - 1.5 + indexInCluster * 0.07,
      anchor[2] - 0.2 - indexInCluster * 0.12,
    ];
    const orderRot: [number, number, number] = [0, 0, (random(`or-${i}`) - 0.5) * 0.05];

    const flagRoll = random(`flag-${i}`);
    const flag: FileFlag = flagRoll < 0.13 ? 'dup' : flagRoll < 0.3 ? 'stale' : null;

    files.push({
      id: i,
      label: FILE_LABELS[i % FILE_LABELS.length],
      textureIndex: i % FILE_LABELS.length,
      chaosPos,
      chaosRot,
      orderPos,
      orderRot,
      cluster,
      flag,
      driftPhase: random(`ph-${i}`) * Math.PI * 2,
      driftAmp: 0.25 + random(`amp-${i}`) * 0.45,
      delay: cluster * 16 + random(`del-${i}`) * 70,
    });
  }
  return files;
};
