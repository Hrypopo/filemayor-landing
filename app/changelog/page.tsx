import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'FileMayor release notes.',
};

const releases = [
  {
    version: '3.6.1',
    date: '2026.04.20',
    title: 'Hardened runtime.',
    notes: [
      'Validator layer now refuses domain-scattering moves on imprecise prompts.',
      'Crash-safe journal persistence verified across forced shutdowns.',
      'Tests: 128 passing, 0 vulnerabilities.',
    ],
  },
  {
    version: '3.6.0',
    date: '2026.04.06',
    title: 'The Curative Triad.',
    notes: [
      'New verbs: explain, cure, apply.',
      'Gemini 2.0 Flash integration for the SOP parser.',
      'i18n: shipped 10 locales — Arabic, German, English, Spanish, French, Hindi, Japanese, Korean, Portuguese, Chinese.',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Nav />
      <main id="main" className="container-prose py-24 md:py-32">
        <div className="section-label">Changelog</div>
        <h1 className="h-display text-[clamp(40px,6vw,72px)]">Every version, dated.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-text-2">
          Phase 2 wires this page to <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm">CHANGELOG.md</code>{' '}
          in the private repo via a release-sync workflow. Below is a hand-authored preview.
        </p>

        <div className="mt-16 space-y-14">
          {releases.map((r) => (
            <article key={r.version} className="grid grid-cols-1 gap-6 md:grid-cols-[160px,1fr]">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  v{r.version}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-text-3">
                  {r.date}
                </div>
              </div>
              <div>
                <h2 className="font-display text-3xl text-text">{r.title}</h2>
                <ul className="mt-5 space-y-2 text-[15px] text-text-2">
                  {r.notes.map((n) => (
                    <li key={n} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 inline-block size-1 rounded-full bg-accent" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
