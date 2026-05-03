import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Download',
  description: `Get ${site.name} for macOS, Windows, or Linux. Or install via npm.`,
};

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

export default function DownloadPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">Download</div>
            <h1 className="h-display text-[clamp(40px,6vw,80px)]">
              Pick your surface.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-2 md:text-xl">
              The download links below always resolve to the latest release. No version
              numbers to remember, no broken links after a release.
            </p>

            <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
              {platforms.map((p) => (
                <li key={p.key} className="bg-surface p-7">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    {p.label}
                  </div>
                  <h2 className="mt-3 font-display text-[26px] font-normal leading-tight tracking-tight text-text">
                    {p.subtitle}
                  </h2>
                  <p className="mt-3 font-mono text-[12px] text-text-3">{p.note}</p>
                  <Link href={p.href} className="btn btn-primary mt-7 w-full justify-center">
                    Download {p.label} <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-14 rounded-2xl border border-border bg-surface p-7 md:p-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                CLI
              </div>
              <h2 className="mt-3 font-display text-[24px] font-normal tracking-tight text-text">
                Or install via npm.
              </h2>
              <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-text-2">
                The CLI is the canonical surface — every command, every flag, on every
                platform. Requires Node.js ≥ 20.
              </p>
              <code className="mt-5 block rounded-lg border border-border bg-bg px-4 py-3 font-mono text-[14px] text-text">
                npm install -g filemayor
              </code>
            </div>

            <p className="mt-10 max-w-2xl text-[14px] text-text-3">
              Code-signing certificates are in progress. Until they ship, Windows users may
              see a SmartScreen warning on first install — click <span className="font-mono">More info → Run anyway</span> to proceed. macOS users may need to right-click → Open the
              first time. The binaries are unmodified and identical to the GitHub release
              artifacts.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
