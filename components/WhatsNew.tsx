import { site } from '@/lib/site';

const items = [
  {
    tag: '⌘K',
    title: 'Global command bar',
    desc: 'Press ⌘K anywhere. Ask in plain English. Jarvis answers — and acts.',
  },
  {
    tag: 'Mission Control',
    title: 'New HomeView',
    desc: 'Workspace at a glance: active folder, reversible moves, files categorized, security layers.',
  },
  {
    tag: 'MCP',
    title: '@filemayor/mcp',
    desc: 'Drop FileMayor into Claude Desktop or any MCP client. Your filesystem becomes a tool.',
  },
  {
    tag: 'Skill',
    title: 'Claude Code Skill',
    desc: 'Install the FileMayor skill once. Claude Code can diagnose, cure, and undo on demand.',
  },
  {
    tag: 'Assistant',
    title: 'Inline plan cards',
    desc: 'The Polished Assistant proposes moves as cards you accept, reject, or rewrite.',
  },
  {
    tag: 'Status Bar',
    title: 'Always-on telemetry',
    desc: 'Live ops, undo depth, and security posture at the bottom of every view.',
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
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <div className="section-label">v{site.version} · the jarvis release</div>
            <h2
              id="whats-new-heading"
              className="h-display mt-3 text-[clamp(36px,5vw,56px)]"
            >
              Six new surfaces. <em className="not-italic text-accent italic">One</em> instinct.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-text-2">
            v4 is the release where FileMayor stops being a tool and starts being a presence.
            Same engine. Same safety. New reflexes.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <article key={it.tag} className="bg-surface p-7 md:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.06] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                {it.tag}
              </div>
              <h3 className="mt-4 font-display text-[22px] font-normal leading-tight tracking-tight">
                {it.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-text-2">{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
