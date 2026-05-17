/* Ed25519 license signing for the LemonSqueezy webhook.
 *
 * The private key lives in Vercel env (LICENSE_PRIVATE_KEY).
 * The matching public key is embedded in FileMayor's cli/core/license.js
 * for offline verification on the user's machine.
 *
 * The env var accepts either format:
 *   1. Raw PEM with newlines (works if your provider preserves multi-line vars)
 *   2. Base64-encoded PEM (recommended — survives any provider's UI mangling)
 *
 * Output is a JWT with header { alg: 'EdDSA', typ: 'JWT', kid: '<keyId>' },
 * the payload below, and an Ed25519 signature over header.payload.
 *
 * Generate the keypair once with: node scripts/generate-license-keypair.mjs
 * Rotate by generating a new keypair and bumping LICENSE_KEY_ID — older
 * licenses keep verifying via FileMayor's BUILTIN_PUBLIC_KEYS map.
 */

export type Tier = 'pro' | 'enterprise' | 'owner';

export interface LicensePayload {
  /** Customer email at time of issue. Used for support lookup. */
  email: string;
  /** LemonSqueezy order id. */
  orderId: string;
  /** Granted tier. */
  tier: Tier;
  /** Issued-at unix seconds. */
  iat: number;
  /** Optional expiry unix seconds. Omit for perpetual licenses. */
  exp?: number;
  /** Optional product variant id captured for support diagnostics. */
  variantId?: string;
}

const enc = new TextEncoder();

const b64url = (input: ArrayBuffer | Uint8Array | string): string => {
  const bytes =
    typeof input === 'string'
      ? enc.encode(input)
      : input instanceof Uint8Array
        ? input
        : new Uint8Array(input);
  let bin = '';
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

/** Decode either raw PEM or base64-wrapped PEM into a DER buffer. */
const normalizePemEnv = (raw: string): string => {
  const trimmed = raw.trim();
  // Already-formatted PEM
  if (trimmed.startsWith('-----BEGIN')) return trimmed;
  // Otherwise assume the entire env var is the base64 of a PEM file
  try {
    const decoded = atob(trimmed.replace(/\s+/g, ''));
    if (decoded.startsWith('-----BEGIN')) return decoded;
  } catch {
    /* fall through to error */
  }
  throw new Error('LICENSE_PRIVATE_KEY is neither raw PEM nor base64-wrapped PEM');
};

const pemToDer = (pem: string): Uint8Array => {
  const cleaned = pem
    .replace(/-----BEGIN [^-]+-----/g, '')
    .replace(/-----END [^-]+-----/g, '')
    .replace(/\s+/g, '');
  const bin = atob(cleaned);
  const der = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) der[i] = bin.charCodeAt(i);
  return der;
};

let cachedPrivateKey: CryptoKey | null = null;

async function getPrivateKey(): Promise<CryptoKey> {
  if (cachedPrivateKey) return cachedPrivateKey;
  const raw = process.env.LICENSE_PRIVATE_KEY;
  if (!raw) throw new Error('LICENSE_PRIVATE_KEY env var is not set');
  const pem = normalizePemEnv(raw);
  const der = pemToDer(pem);
  cachedPrivateKey = await crypto.subtle.importKey(
    'pkcs8',
    der as BufferSource,
    { name: 'Ed25519' } as AlgorithmIdentifier,
    false,
    ['sign'],
  );
  return cachedPrivateKey;
}

const getKeyId = (): string => process.env.LICENSE_KEY_ID || 'v1';

export async function signLicense(payload: LicensePayload): Promise<string> {
  const header = { alg: 'EdDSA', typ: 'JWT', kid: getKeyId() };
  const headerB64 = b64url(JSON.stringify(header));
  const payloadB64 = b64url(JSON.stringify(payload));
  const data = `${headerB64}.${payloadB64}`;

  const key = await getPrivateKey();
  const sig = await crypto.subtle.sign(
    { name: 'Ed25519' } as AlgorithmIdentifier,
    key,
    enc.encode(data),
  );
  return `${data}.${b64url(sig)}`;
}

/** Constant-time HMAC verify for inbound LemonSqueezy webhook signatures. */
export async function verifyHmacSignature(
  body: string,
  signatureHex: string,
  secret: string,
): Promise<boolean> {
  if (!signatureHex || !secret) return false;
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(body));
  const expected = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  if (expected.length !== signatureHex.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ signatureHex.charCodeAt(i);
  }
  return diff === 0;
}
