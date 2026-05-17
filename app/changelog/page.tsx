import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { loadChangelog, type ChangelogBodyBlock } from '@/lib/changelog';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Changelog',
  description: `${site.name} release notes.`,
};

const fallbackEntries = [
  {
    version: '3.6.1',
    date: '2026.04.20',
    blocks: [
      { type: 'heading' as const, text: 'Hardened runtime.' },
      {
        type: 'bullet' as const,
        text: 'Validator layer now refuses domain-scattering moves on imprecise prompts.',
      },
      {
        type: 'bullet' as const,
        text: 'Crash-safe journal persistence verified across forced shutdowns.',
      },
      { type: 'bullet' as const, text: 'Tests: 128 passing, 0 vulnerabilities.' },
    ],
  },
  {
    version: '3.6.0',
    date: '2026.04.06',
    blocks: [
      { type: 'heading' as const, text: 'The Curative Triad.' },
      { type: 'bullet' as const, text: 'New verbs: explain, cure, apply.' },
      { type: 'bullet' as const, text: 'Gemini 2.0 Flash integration for the SOP parser.' },
      {
        type: 'bullet' as const,
        text: 'i18n: shipped 10 locales — Arabic, German, English, Spanish, French, Hindi, Japanese, Korean, Portuguese, Chinese.',
      },
    ],
  },
];

const renderBlock = (b: ChangelogBodyBlock, i: number) => {
  if (b.type === 'heading') {
    return (
      <h3
        key={i}
        className="mt-8 font-display text-[20px] font-normal leading-tight tracking-tight text-text first:mt-0"
      >
        {b.text}
      </h3>
    );
  }
  if (b.type === 'bullet') {
    return (
      <li key={i} className="mt-2 flex gap-3 text-[15px] leading-relaxed text-text-2 first:mt-0">
        <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
        <span>{b.text}</span>
      </li>
    );
  }
  return (
    <p key={i} className="mt-4 text-[15px] leading-relaxed text-text-2 first:mt-0">
      {b.text}
    </p>
  );
};

const groupBlocks = (blocks: ChangelogBodyBlock[]) => {
  const groups: { kind: 'list' | 'flow'; items: ChangelogBodyBlock[] }[] = [];
  for (const b of blocks) {
    const last = groups[groups.length - 1];
    if (b.type === 'bullet') {
      if (last?.kind === 'list') {
        last.items.push(b);
      } else {
        groups.push({ kind: 'list', items: [b] });
      }
    } else {
      if (last?.kind === 'flow') {
        last.items.push(b);
      } else {
        groups.push({ kind: 'flow', items: [b] });
      }
    }
  }
  return groups;
};

export default async function ChangelogPage() {
  const loaded = await loadChangelog();
  const entries = loaded && loaded.length > 0 ? loaded : fallbackEntries;
  const isLive = !!loaded && loaded.length > 0;

  return (
    <>
      <Nav />
      <main id="main">
        <section className="section-divider section-pad">
          <div className="container-prose">
            <div className="section-label">Changelog</div>
            <h1 className="h-display text-[clamp(40px,6vw,80px)]">
              Every version, dated.
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-text-2 md:text-xl">
              {isLive
                ? 'Synced from the FileMayor app repo on every release. Nothing is hand-edited here.'
                : 'Below is a hand-authored preview. Once the release-landing-sync workflow ships its first release, this page reads from CHANGELOG.md automatically.'}
            </p>
            {isLive && (
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
                Source:{' '}
                <Link
                  href="https://github.com/Hrypopo/filemayor-landing/blob/main/content/CHANGELOG.md"
                  className="text-text-2 hover:text-accent"
                >
                  content/CHANGELOG.md
                </Link>
              </p>
            )}
          </div>
        </section>

        <section className="section-pad-sm">
          <div className="container-prose">
            <ol className="space-y-16">
              {entries.map((r) => (
                <li
                  key={r.version}
                  className="grid grid-cols-1 gap-6 border-t border-border pt-10 md:grid-cols-[160px,1fr]"
                >
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      v{r.version}
                    </div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-text-3">
                      {r.date}
                    </div>
                  </div>
                  <div>
                    {groupBlocks(r.blocks).map((group, gi) =>
                      group.kind === 'list' ? (
                        <ul key={gi} className="mt-4 space-y-2 first:mt-0">
                          {group.items.map(renderBlock)}
                        </ul>
                      ) : (
                        <div key={gi}>{group.items.map(renderBlock)}</div>
                      ),
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
