#!/usr/bin/env node
/* One-shot Ed25519 keypair generator for the FileMayor license system.
 *
 * Run once:
 *   node scripts/generate-license-keypair.mjs
 *
 * Then:
 *   1. Copy the printed PRIVATE KEY into Vercel env as LICENSE_PRIVATE_KEY
 *      (Project Settings → Environment Variables → New).
 *   2. Copy the printed PUBLIC KEY into FileMayor's cli/core/license.js,
 *      replacing the current FILEMAYOR_PUBLIC_KEY constant.
 *   3. Ship the FileMayor update via the normal release pipeline.
 *
 * The private key never lives in any repo. The public key in source is
 * intentional — it can verify but not forge signatures.
 */

import { generateKeyPairSync } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const { publicKey, privateKey } = generateKeyPairSync('ed25519');

const privatePem = privateKey.export({ type: 'pkcs8', format: 'pem' });
const publicPem = publicKey.export({ type: 'spki', format: 'pem' });

const generatedAt = new Date().toISOString();

console.log('═══════════════════════════════════════════════════════════════');
console.log('FILEMAYOR LICENSE KEYPAIR · GENERATED ' + generatedAt);
console.log('═══════════════════════════════════════════════════════════════');
console.log();
console.log('1️⃣  PRIVATE KEY (server-only — Vercel env LICENSE_PRIVATE_KEY)');
console.log('───────────────────────────────────────────────────────────────');
console.log(String(privatePem).trim());
console.log();
console.log('2️⃣  PUBLIC KEY (commit to FileMayor cli/core/license.js)');
console.log('───────────────────────────────────────────────────────────────');
console.log(String(publicPem).trim());
console.log();
console.log('═══════════════════════════════════════════════════════════════');

// Also write to local files (gitignored) for convenient copy-paste.
const outDir = resolve(process.cwd(), '.keypair-out');
try {
  const fs = await import('node:fs');
  fs.mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, 'license-private.pem'), privatePem);
  writeFileSync(resolve(outDir, 'license-public.pem'), publicPem);
  writeFileSync(
    resolve(outDir, 'README.txt'),
    `Ed25519 license keypair for FileMayor.
Generated ${generatedAt}.

  license-private.pem  →  Vercel env LICENSE_PRIVATE_KEY
  license-public.pem   →  FileMayor cli/core/license.js (FILEMAYOR_PUBLIC_KEY)

Delete this directory after you have transferred the keys to their
destinations. The directory is gitignored.
`,
  );
  console.log(`Files also written to: ${outDir}`);
  console.log('Delete that directory after transfer — it is gitignored.');
} catch (err) {
  console.warn('Could not write files (display output above is sufficient):', err.message);
}
