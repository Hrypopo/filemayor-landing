const pillars = [
  {
    h: 'Local-first.',
    p: 'Files never leave your machine. No cloud, no uploads, no tracking. The privacy posture is provable, not promised.',
  },
  {
    h: 'Supply-chain secure.',
    p: 'Three runtime dependencies. No hidden npm vulnerabilities. No bloated node_modules in your trust boundary.',
  },
  {
    h: 'Rollback safety.',
    p: 'Every move is journaled. One command undoes the whole session. Explore aggressively without losing data.',
  },
  {
    h: 'Extensible SOPs.',
    p: 'Write your filing rules in plain English. The SOP parser turns them into deterministic system actions.',
  },
];

export function WhyFileMayor() {
  return (
    <section
      id="why"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="why-heading"
    >
      <div className="container-prose">
        <div className="section-label">Why FileMayor</div>
        <h2 id="why-heading" className="h-display text-[clamp(36px,5vw,56px)]">
          The middle ground between Finder and rm.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.h} className="bg-surface p-8">
              <h3 className="font-display text-[26px] font-normal leading-tight tracking-tight text-accent">
                {p.h}
              </h3>
              <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-text-2">{p.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
