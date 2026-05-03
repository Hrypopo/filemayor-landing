const surfaces = [
  {
    label: 'CLI',
    title: 'In your terminal.',
    desc: '14 commands. Pure Node.js. Three runtime dependencies. Pipes to jq.',
    code: 'npm install -g filemayor',
  },
  {
    label: 'Desktop',
    title: 'On every OS.',
    desc: 'Electron app for macOS, Windows, Linux. Drag, drop, undo. Same engine.',
    code: 'filemayor.com/download',
  },
  {
    label: 'PWA',
    title: 'In your browser.',
    desc: 'Installable web app. File System Access API. No upload, ever.',
    code: 'app.filemayor.com',
  },
];

export function ThreeSurfaces() {
  return (
    <section
      id="surfaces"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="surfaces-heading"
    >
      <div className="container-prose">
        <div className="section-label">Three surfaces · one engine</div>
        <h2 id="surfaces-heading" className="h-display text-[clamp(36px,5vw,56px)]">
          Same scan. Three skins.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-2 md:text-lg">
          The core engine is one library — written once, audited once. The three surfaces are
          thin clients on top.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {surfaces.map((s) => (
            <article
              key={s.label}
              className="rounded-xl border border-border bg-surface p-7"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {s.label}
              </div>
              <h3 className="mt-4 font-display text-[26px] font-normal leading-tight tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-text-2">{s.desc}</p>
              <div className="mt-6 rounded-md border border-border bg-bg/60 px-3 py-2 font-mono text-[12px] text-text-2">
                {s.code}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
