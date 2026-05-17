const stats = [
  { k: 'Reversible moves', v: '14,892', sub: 'all journaled · undo any' },
  { k: 'Files categorized', v: '128,441', sub: 'last 30 days' },
  { k: 'Security layers', v: '6 / 6', sub: 'Chevza Doctrine green' },
];

const actions = [
  { label: 'Diagnose', sub: '⌘D · explain folder' },
  { label: 'Cure', sub: '⌘E · plan + dry-run' },
  { label: 'Apply', sub: '⌘↵ · journaled' },
  { label: 'Undo', sub: '⌘Z · last operation' },
];

export function MissionControl() {
  return (
    <section
      id="mission-control"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="mc-heading"
    >
      <div className="container-prose">
        <div className="section-label">Mission Control</div>
        <h2 id="mc-heading" className="h-display text-[clamp(36px,5vw,56px)]">
          Your workspace, <em className="not-italic text-accent italic">at a glance</em>.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-2 md:text-lg">
          The new HomeView is the cockpit. Active folder front and center. Live posture below.
          Every action one keystroke away.
        </p>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface/60 shadow-[0_40px_120px_-40px_rgba(212,175,55,0.18)]">
          <div className="flex items-center gap-2 border-b border-border/70 bg-bg/40 px-5 py-3">
            <span className="size-2.5 rounded-full bg-danger/70" />
            <span className="size-2.5 rounded-full bg-warn/70" />
            <span className="size-2.5 rounded-full bg-ok/70" />
            <div className="ml-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
              FileMayor · Jarvis
            </div>
            <div className="ml-auto hidden font-mono text-[11px] text-text-3 md:block">
              ⌘K to summon
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 p-6 md:p-8 lg:grid-cols-[1.3fr,1fr]">
            <div className="rounded-xl border border-border bg-bg/40 p-6 md:p-7">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
                Active workspace
              </div>
              <div className="mt-2 font-display text-[26px] leading-tight tracking-tight md:text-[30px]">
                ~/Projects/filemayor
              </div>
              <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-text-2">
                Good morning, Chevza. The workspace looks healthy. 4 cures pending review.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-md border border-accent/30 bg-accent/[0.08] px-3 py-1.5 font-mono text-[12px] text-accent">
                  Change workspace
                </span>
                <span className="rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-[12px] text-text-2">
                  Diagnose now
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {stats.map((s) => (
                <div
                  key={s.k}
                  className="flex items-center justify-between rounded-xl border border-border bg-bg/40 px-5 py-4"
                >
                  <div>
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-text-3">
                      {s.k}
                    </div>
                    <div className="mt-0.5 text-[12.5px] text-text-3">{s.sub}</div>
                  </div>
                  <div className="font-display text-[26px] leading-none text-text">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px border-t border-border bg-border md:grid-cols-4">
            {actions.map((a) => (
              <div
                key={a.label}
                className="bg-surface p-5 transition-colors hover:bg-bg/30"
              >
                <div className="font-display text-[20px] leading-tight tracking-tight">
                  {a.label}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
                  {a.sub}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-border bg-bg/40 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
            <span className="text-ok">● jailer · ok</span>
            <span className="text-ok">● vault · ok</span>
            <span className="text-ok">● guardrail · ok</span>
            <span className="text-text-3">undo depth · 42</span>
            <span className="ml-auto hidden md:inline">last cure · 2m ago</span>
          </div>
        </div>
      </div>
    </section>
  );
}
