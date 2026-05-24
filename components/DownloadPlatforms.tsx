'use client';

import Link from 'next/link';
import { track } from '@vercel/analytics';

const platforms = [
  {
    key: 'mac',
    label: 'macOS',
    subtitle: 'Universal · Apple Silicon · Intel',
    href: '/download/mac',
    note: '.dmg · auto-updates via electron-updater',
  },
  {
    key: 'windows',
    label: 'Windows',
    subtitle: 'Windows 10, 11',
    href: '/download/windows',
    note: '.exe · NSIS installer · code-signing pending',
  },
  {
    key: 'linux',
    label: 'Linux',
    subtitle: 'AppImage · Debian · Fedora',
    href: '/download/linux',
    note: '.AppImage preferred · .deb / .rpm available',
  },
];

export function DownloadPlatforms() {
  return (
    <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
      {platforms.map((p) => (
        <li key={p.key} className="bg-surface p-7">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            {p.label}
          </div>
          <h2 className="mt-3 font-display text-[26px] font-normal leading-tight tracking-tight text-text">
            {p.subtitle}
          </h2>
          <p className="mt-3 font-mono text-[12px] text-text-3">{p.note}</p>
          <Link
            href={p.href}
            onClick={() => track('download_click', { platform: p.key })}
            className="btn btn-primary mt-7 w-full justify-center"
          >
            Download {p.label} <span aria-hidden>→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
