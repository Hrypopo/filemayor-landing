import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { loadChangelog, type ChangelogBodyBlock } from '@/lib/changelog';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Changelog',
  description: `${site.name} release notes.`,
  alternates: { canonical: '/changelog' },
};

const fallbackEntries = [
  {
    version: '4.0.5',
    date: '2026.06.09',
    blocks: [
      { type: 'heading' as const, text: 'Everything is free.' },
      { type: 'bullet' as const, text: 'Watch Mode, AI SOP Engine, unlimited bulk organize, and CSV export now ship in the free tier. No license required.' },
      { type: 'bullet' as const, text: 'Removed upgrade modal and all checkout links.' },
      { type: 'heading' as const, text: 'Distribution.' },
      { type: 'bullet' as const, text: 'Intel Mac support — macOS now ships both x64 and arm64 DMGs.' },
      { type: 'bullet' as const, text: 'CI on every PR — typecheck, Vite build, core tests, and the 35-step e2e pipeline gate every PR.' },
      { type: 'bullet' as const, text: 'npm publish pipeline wired into the release workflow.' },
      { type: 'heading' as const, text: 'MCP.' },
      { type: 'bullet' as const, text: 'smithery.yaml added for Smithery auto-indexing. .mcp/server.json added for official MCP registry submission.' },
      { type: 'bullet' as const, text: 'npx -y filemayor-mcp --audit prints a machine-readable trust report without starting a session.' },
    ],
  },
  {
    version: '4.0.0',
    date: '2026.05.16',
    blocks: [
      { type: 'heading' as const, text: 'Global ⌘K Command Bar.' },
      { type: 'bullet' as const, text: 'Single command surface available from any view. Keyboard-first, fuzzy-matched, recent-action memory.' },
      { type: 'bullet' as const, text: 'Mission Control Home — workspace-centric home with live activity counter and quick actions.' },
      { type: 'bullet' as const, text: 'MCP server (filemayor-mcp) — 14 tools over stdio. Drops into Claude Desktop, Cursor, Zed via one JSON snippet.' },
      { type: 'bullet' as const, text: 'Multi-model AI — Gemini, OpenAI, Claude, Ollama, or the built-in free tier. Keys stored in the OS keychain.' },
      { type: 'bullet' as const, text: 'Bundle −53% — lazy-loaded views and code-split heavy deps. Entry dropped from 518 KB to 244 KB.' },
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
        text: 'i18n: 10 locales — Arabic, German, English, Spanish, French, Hindi, Japanese, Korean, Portuguese, Chinese.',
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
                  href="https://github.com/Hrypopo/FileMayor/blob/main/CHANGELOG.md"
                  className="text-text-2 hover:text-accent"
                >
                  CHANGELOG.md
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
