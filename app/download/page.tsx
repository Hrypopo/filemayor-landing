import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EmailCapture } from '@/components/EmailCapture';
import { DownloadPlatforms } from '@/components/DownloadPlatforms';
export const metadata: Metadata = {
  title: 'Download',
  description:
    'Download FileMayor free for macOS, Windows, and Linux — or install via npm. AI-powered file organization with full rollback. No subscription required.',
};


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

            <div className="mt-10 rounded-2xl border border-border bg-surface p-7 md:p-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                Stay current
              </div>
              <h2 className="mt-3 font-display text-[22px] font-normal tracking-tight text-text">
                Get notified when we ship.
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-text-2">
                Release notes, security patches, new platform drops. One email per release. No marketing.
              </p>
              <div className="mt-5">
                <EmailCapture />
              </div>
            </div>

            <DownloadPlatforms />

            <div className="mt-10 rounded-2xl border border-border bg-surface p-7 md:p-8">
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
