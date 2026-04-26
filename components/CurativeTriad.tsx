const steps = [
  {
    n: '01 · Diagnose',
    cmd: 'filemayor explain',
    title: 'Read the room.',
    desc: 'A health score (0–100) for your folder. Counts duplicates, dead files, install bloat, and surfaces the actual problem before any action.',
  },
  {
    n: '02 · Plan',
    cmd: 'filemayor cure',
    title: 'Make a treatment plan.',
    desc: 'AI proposes the moves before any move happens. You read the plan in plain English. Nothing is touched yet.',
  },
  {
    n: '03 · Apply',
    cmd: 'filemayor apply',
    title: 'Execute. Reversibly.',
    desc: 'Every move is journaled. One command undoes everything. Psychological safety is the feature.',
  },
];

export function CurativeTriad() {
  return (
    <section
      id="triad"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="triad-heading"
    >
      <div className="container-prose">
        <div className="section-label">The Curative Triad</div>
        <h2 id="triad-heading" className="h-display text-[clamp(36px,5vw,56px)]">
          Three commands. Total order.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-2 md:text-lg">
          Most file tools either do too little (Finder, Explorer) or too much without asking
          (<code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-text">
            rm -rf
          </code>
          ). FileMayor sits between — diagnose first, plan second, apply with rollback. This is
          the spine of the product.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {steps.map((s) => (
            <article key={s.n} className="bg-surface p-8 md:p-9">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
                {s.n}
              </div>
              <div className="mt-3 font-mono text-[13px] text-accent">{s.cmd}</div>
              <h3 className="mt-5 font-display text-[28px] font-normal leading-tight tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-text-2">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
