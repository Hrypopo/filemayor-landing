import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy',
  description: `${site.name}'s privacy policy. Files never leave your machine.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="section-divider section-pad">
          <div className="container-prose max-w-prose">
            <div className="section-label">Privacy</div>
            <h1 className="h-display text-[clamp(40px,6vw,72px)]">
              Files never leave your machine.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-2">
              {site.name} is a local-first application. The core engine runs entirely on
              your computer. The optional AI features in the Curative Triad call out to a
              configured AI provider with file metadata only — never file contents, and
              only when you explicitly invoke them. Disable AI entirely and the rest of
              the product still works.
            </p>

            <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-text-3">
              Effective: 2026.04.26 · Last updated: 2026.04.26
            </p>
          </div>
        </section>

        <section className="section-divider section-pad-sm">
          <div className="container-prose max-w-prose space-y-12 text-text-2">
            <div>
              <h2 className="font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                What we never collect
              </h2>
              <ul className="mt-5 space-y-2.5 text-[15.5px] leading-relaxed">
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                  <span>File contents. Not by the desktop app, not by the CLI, not by the PWA.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                  <span>Telemetry. There is no usage tracker inside the desktop app or the CLI.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                  <span>Cookies on the marketing site beyond what is required for the theme toggle. No cross-site tracking.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                  <span>Personal data beyond what you explicitly provide for licensing.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                What we do collect (and why)
              </h2>
              <dl className="mt-5 space-y-6 text-[15.5px] leading-relaxed">
                <div>
                  <dt className="font-display text-[19px] font-normal text-text">Email address</dt>
                  <dd className="mt-1.5">
                    Collected only when you purchase a Pro or Enterprise license. Used for
                    license delivery and customer support. Stored by our payment provider
                    (LemonSqueezy) and forwarded to us for fulfillment. Never sold, never
                    used for marketing without explicit opt-in.
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-[19px] font-normal text-text">License activation events</dt>
                  <dd className="mt-1.5">
                    When you activate a license, a one-line record is stored containing the
                    license key, activation timestamp, and an opaque machine identifier
                    (hashed). This enables the offline grace period and lets us recover
                    your license if you reinstall.
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-[19px] font-normal text-text">Crash reports</dt>
                  <dd className="mt-1.5">
                    Crash reporting is <strong className="text-text">not enabled</strong> in the desktop app at the
                    time of writing. When it ships, it will be opt-in by default, and file
                    paths will be redacted client-side before any report is sent. We will
                    update this paragraph the day it ships.
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-[19px] font-normal text-text">Marketing-site analytics</dt>
                  <dd className="mt-1.5">
                    We use a privacy-first analytics provider (Plausible, when enabled) to
                    measure aggregate page views and CTA clicks on{' '}
                    <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">filemayor.com</code>. No
                    cookies, no personal identifiers, no cross-site tracking. The data is
                    aggregate-only and we cannot link page views to individuals.
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                AI feature data flow
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed">
                When you run{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">filemayor explain</code>,{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">filemayor cure</code>, or
                use the SOP parser, file metadata is sent to the configured AI provider
                (Gemini 2.0 Flash by default). What this includes:
              </p>
              <ul className="mt-4 space-y-2 text-[15.5px] leading-relaxed">
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                  <span>File names, paths, extensions, sizes, and modification timestamps.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                  <span>Your prompt text, when you provide one.</span>
                </li>
              </ul>
              <p className="mt-4 text-[15.5px] leading-relaxed">
                What this <strong className="text-text">never</strong> includes:
              </p>
              <ul className="mt-4 space-y-2 text-[15.5px] leading-relaxed">
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                  <span>The contents of any file.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                  <span>Any data from outside the directory you point it at.</span>
                </li>
              </ul>
              <p className="mt-4 text-[15.5px] leading-relaxed">
                The AI provider's own privacy policy applies to the metadata they receive.
                You can disable AI features entirely in settings or by setting{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">FILEMAYOR_AI=off</code> in
                your environment. The non-AI commands (
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">scan</code>,{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">organize</code>,{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">clean</code>,{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">analyze</code>,{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">duplicates</code>,{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">dedupe</code>,{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">undo</code>) operate entirely
                on your machine.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                Your rights
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed">
                You can request a copy of any data we hold about you (essentially: your
                email and your license activation log) at any time by writing to{' '}
                <a className="text-accent" href={`mailto:${site.author.email}`}>
                  {site.author.email}
                </a>
                . You can request deletion of the same. License keys are deactivated
                server-side on request; the local copy clears at next start.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed">
                If you are in the EEA or UK, GDPR rights apply. If you are in California,
                CCPA rights apply. We honor both regardless of where you are based, because
                they are the right way to handle data.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                Children
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed">
                {site.name} is not directed at users under 16. We do not knowingly collect
                data from minors. If you believe a minor has provided us with personal
                data, contact us and we will delete it.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                Contact
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed">
                Privacy questions:{' '}
                <a className="text-accent" href={`mailto:${site.author.email}`}>
                  {site.author.email}
                </a>
                . For security reports, see{' '}
                <Link href="/docs/security" className="text-accent">
                  /docs/security
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
