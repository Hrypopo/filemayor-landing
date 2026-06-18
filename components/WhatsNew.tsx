import { site } from '@/lib/site';
import { Reveal, Stagger, StaggerItem } from './Reveal';

const items = [
  {
    tag: '⌘K',
    title: 'Command bar',
    desc: 'Press ⌘K from anywhere in the app. Type what you want done. FileMayor runs it.',
  },
  {
    tag: 'HomeView',
    title: 'Active workspace at a glance',
    desc: 'See your current folder, recent moves, files categorized, and security status on one screen.',
  },
  {
    tag: 'MCP',
    title: 'filemayor-mcp',
    desc: 'Install one MCP server. Claude Desktop and other MCP clients can now diagnose folders and apply moves.',
  },
  {
    tag: 'Skill',
    title: 'Claude Code Skill',
    desc: 'Install the FileMayor skill once. Claude Code can run diagnose, cure, and undo on demand.',
  },
  {
    tag: 'Plan cards',
    title: 'Review before apply',
    desc: 'Proposed moves appear as cards. Accept, reject, or rewrite each one before anything touches disk.',
  },
  {
    tag: 'Status bar',
    title: 'Always-on status',
    desc: 'Operation count, undo depth, and security checks shown at the bottom of every view.',
  },
];

export function WhatsNew() {
  return (
    <section
      id="whats-new"
      className="border-t border-border py-20 md:py-24"
      aria-labelledby="whats-new-heading"
    >
      <div className="container-prose">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <div className="section-label">v{site.version} · what&apos;s new</div>
              <h2
                id="whats-new-heading"
                className="h-display mt-3 text-[clamp(36px,5vw,56px)]"
              >
                Six things v4 does that v3 <em className="not-italic text-accent italic">didn&apos;t</em>.
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-text-2">
              Same engine. Same rollback. New ways to summon it — from the keyboard, from
              Claude, or from any MCP-aware client.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <StaggerItem key={it.tag}>
              <article className="group relative h-full overflow-hidden bg-surface p-7 transition-colors duration-300 hover:bg-surface-2 md:p-8">
                <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {it.tag}
                </div>
                <h3 className="mt-4 font-display text-[22px] font-normal leading-tight tracking-tight transition-colors duration-300 group-hover:text-accent">
                  {it.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-text-2">{it.desc}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
