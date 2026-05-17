/**
 * Dynamic download contract.
 *
 *   /download/mac     → 302 → latest .dmg (prefers Apple Silicon)
 *   /download/windows → 302 → latest .exe
 *   /download/linux   → 302 → latest .AppImage (or .deb fallback)
 *
 * Source of truth: GitHub Releases on the public `filemayor-landing` repo.
 * The release-landing-sync workflow keeps that repo's releases in lockstep
 * with the private `FileMayor` repo's build pipeline.
 *
 * Why query the PUBLIC repo: assets on a private repo's releases are auth-
 * gated, so a redirect would land on a 404 for unauthenticated visitors.
 * Mirroring to the public landing repo gives us unauthenticated browser_
 * download_urls that work for everyone.
 *
 * If a sync hasn't happened yet (no releases on landing repo), the route
 * falls back to the GitHub releases UI so the visitor still gets somewhere
 * useful instead of a 404.
 */

import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 600; // re-fetch release metadata every 10 minutes

type Asset = {
  name: string;
  browser_download_url: string;
  size: number;
};

type Release = {
  tag_name: string;
  html_url: string;
  assets: Asset[];
  prerelease: boolean;
  draft: boolean;
};

const RELEASES_API =
  'https://api.github.com/repos/Hrypopo/filemayor-landing/releases/latest';

const RELEASES_UI = 'https://github.com/Hrypopo/filemayor-landing/releases/latest';

type Platform = 'mac' | 'macos' | 'darwin' | 'windows' | 'win' | 'linux';

const PLATFORM_MATCHERS: Record<string, (name: string) => number> = {
  /** Higher score wins. Apple Silicon DMG > universal DMG > anything mac-tagged. */
  mac: (n) => {
    const lower = n.toLowerCase();
    if (!lower.endsWith('.dmg')) return 0;
    if (lower.includes('arm64') || lower.includes('aarch64')) return 100;
    if (lower.includes('universal')) return 80;
    if (lower.includes('x64') || lower.includes('intel')) return 60;
    return 70;
  },
  windows: (n) => {
    const lower = n.toLowerCase();
    if (lower.endsWith('.exe') && lower.includes('setup')) return 100;
    if (lower.endsWith('.exe')) return 80;
    if (lower.endsWith('.msi')) return 70;
    return 0;
  },
  linux: (n) => {
    const lower = n.toLowerCase();
    if (lower.endsWith('.appimage')) return 100;
    if (lower.endsWith('.deb')) return 80;
    if (lower.endsWith('.rpm')) return 60;
    if (lower.endsWith('.tar.gz')) return 40;
    return 0;
  },
};

const aliasFor = (platform: string): keyof typeof PLATFORM_MATCHERS | null => {
  const p = platform.toLowerCase() as Platform;
  if (p === 'mac' || p === 'macos' || p === 'darwin') return 'mac';
  if (p === 'windows' || p === 'win') return 'windows';
  if (p === 'linux') return 'linux';
  return null;
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ platform: string }> },
) {
  const { platform } = await params;
  const key = aliasFor(platform);

  if (!key) {
    return NextResponse.redirect(RELEASES_UI, 302);
  }

  let release: Release | null = null;
  try {
    const res = await fetch(RELEASES_API, {
      headers: {
        'User-Agent': 'filemayor-landing',
        Accept: 'application/vnd.github+json',
      },
      next: { revalidate: 600 },
    });
    if (res.ok) {
      release = (await res.json()) as Release;
    }
  } catch {
    /* fall through to UI fallback */
  }

  if (!release || !release.assets?.length) {
    return NextResponse.redirect(RELEASES_UI, 302);
  }

  const matcher = PLATFORM_MATCHERS[key];
  let best: { url: string; score: number } | null = null;
  for (const asset of release.assets) {
    const score = matcher(asset.name);
    if (score > 0 && (!best || score > best.score)) {
      best = { url: asset.browser_download_url, score };
    }
  }

  if (!best) {
    return NextResponse.redirect(RELEASES_UI, 302);
  }

  return NextResponse.redirect(best.url, 302);
}
