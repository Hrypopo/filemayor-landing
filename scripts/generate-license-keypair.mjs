#!/usr/bin/env node
/* Ed25519 keypair generator for the FileMayor license system.
 *
 *   node scripts/generate-license-keypair.mjs [keyId]
 *
 *   keyId — optional short version id. Default: v1.
 *           Use v2, v3, ... when rotating.
 *
 * Outputs:
 *   1. PRIVATE KEY in two forms (raw PEM and base64-wrapped) — pick one
 *      to paste into Vercel as LICENSE_PRIVATE_KEY. Base64 form is safer
 *      because it survives any provider's UI mangling of newlines.
 *   2. PUBLIC KEY as a JS constant ready to paste into FileMayor's
 *      cli/core/license.js BUILTIN_PUBLIC_KEYS map.
 *   3. Files in .keypair-out/ for convenient transfer.
 *
 * After transfer:
 *   • Set Vercel env LICENSE_PRIVATE_KEY (paste the BASE64 form).
 *   • Set Vercel env LICENSE_KEY_ID = the keyId you used (default v1).
 *   • Update FileMayor cli/core/license.js BUILTIN_PUBLIC_KEYS[<keyId>].
 *   • DELETE .keypair-out/ immediately after transfer.
 */

import { generateKeyPairSync } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const keyId = (process.argv[2] || 'v1').trim();
if (!/^[a-zA-Z0-9_-]+$/.test(keyId)) {
  console.error('Invalid key id. Use letters, digits, hyphens, or underscores only.');
  process.exit(1);
}

const { publicKey, privateKey } = generateKeyPairSync('ed25519');

const privatePem = String(privateKey.export({ type: 'pkcs8', format: 'pem' })).trim();
const publicPem = String(publicKey.export({ type: 'spki', format: 'pem' })).trim();
const privateBase64 = Buffer.from(privatePem, 'utf8').toString('base64');
const generatedAt = new Date().toISOString();

const banner = '═══════════════════════════════════════════════════════════════';
const subline = '───────────────────────────────────────────────────────────────';

console.log(banner);
console.log(`FILEMAYOR LICENSE KEYPAIR · keyId=${keyId} · ${generatedAt}`);
console.log(banner);

console.log('\n1. PRIVATE KEY (raw PEM) — paste if your provider preserves newlines');
console.log(subline);
console.log(privatePem);

console.log('\n2. PRIVATE KEY (base64-wrapped, recommended)');
console.log(subline);
console.log('Set Vercel env LICENSE_PRIVATE_KEY to:');
console.log();
console.log(privateBase64);

console.log('\n3. LICENSE_KEY_ID');
console.log(subline);
console.log(`Set Vercel env LICENSE_KEY_ID to: ${keyId}`);

console.log('\n4. PUBLIC KEY — paste into FileMayor cli/core/license.js');
console.log(subline);
console.log('Replace the placeholder PEM under BUILTIN_PUBLIC_KEYS["' + keyId + '"]:');
console.log();
console.log(publicPem);

console.log('\n5. SECURITY CHECKLIST');
console.log(subline);
console.log('  [ ] Pasted base64 private key into Vercel as LICENSE_PRIVATE_KEY');
console.log(`  [ ] Set Vercel LICENSE_KEY_ID = ${keyId}`);
console.log('  [ ] Pasted public PEM into FileMayor cli/core/license.js');
console.log('  [ ] Deleted .keypair-out/ from this machine');
console.log('  [ ] Verified the keypair file is NOT in any cloud sync folder');
console.log('  [ ] Verified the keypair did not get committed to git');
console.log();
console.log(banner);

// Write out files for convenient transfer.
const outDir = resolve(process.cwd(), '.keypair-out');
try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, `license-private-${keyId}.pem`), privatePem + '\n', { mode: 0o600 });
  writeFileSync(resolve(outDir, `license-private-${keyId}.b64`), privateBase64 + '\n', { mode: 0o600 });
  writeFileSync(resolve(outDir, `license-public-${keyId}.pem`), publicPem + '\n', { mode: 0o644 });
  writeFileSync(
    resolve(outDir, 'README.txt'),
    `Ed25519 license keypair for FileMayor (keyId=${keyId})
Generated ${generatedAt}.

  license-private-${keyId}.pem  →  reference copy of raw PEM
  license-private-${keyId}.b64  →  PASTE THIS into Vercel LICENSE_PRIVATE_KEY
  license-public-${keyId}.pem   →  PASTE THIS into FileMayor cli/core/license.js

DELETE THIS DIRECTORY IMMEDIATELY AFTER TRANSFER.

Anyone who obtains the private key can mint valid FileMayor licenses
forever. Treat it like cash. The directory is gitignored, but make sure
it is not in OneDrive, Google Drive, Dropbox, or any cloud sync folder.

To delete on Windows:
  Remove-Item -Recurse -Force .keypair-out

To delete on macOS / Linux:
  rm -rf .keypair-out
`,
  );
  console.log(`Files written to: ${outDir}`);
  console.log();
  console.log('AFTER TRANSFER, delete the directory:');
  console.log('  Windows:  Remove-Item -Recurse -Force .keypair-out');
  console.log('  Unix:     rm -rf .keypair-out');
} catch (err) {
  console.warn('Could not write files (display output above is sufficient):', err.message);
}
