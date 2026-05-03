const items = [
  {
    q: 'Does FileMayor send my files anywhere?',
    a: 'No. The core engine runs entirely on your machine. The optional AI features (the Curative Triad) call out to a model only with file metadata — names, sizes, paths, extensions — never file contents. Disable AI entirely and the rest still works.',
  },
  {
    q: 'How does Undo work?',
    a: 'Every move is recorded in a journal kept inside the workspace. `filemayor undo` reverses the most recent operation; `undo --all` reverses the entire session. The journal persists across crashes and reboots, so you can roll back even after closing the laptop.',
  },
  {
    q: 'Can I script it?',
    a: 'Yes. The CLI is the canonical surface. Every command accepts `--json`, so you can pipe to jq, integrate with shell scripts, or wire it into CI. The Desktop app and the PWA are visual layers over the same engine — anything you script with the CLI works identically in the others.',
  },
  {
    q: 'What if the AI proposes a bad plan?',
    a: 'The Curative Triad separates planning from execution by design. `cure` outputs a plan; nothing is touched until you run `apply`. The Guardrail layer additionally refuses destructive batches even when planned. And if a plan slips through that you regret, `undo --all` rolls it back.',
  },
];

export function FAQ() {
  return (
    <section
      id="answers"
      className="section-divider section-pad-sm"
      aria-labelledby="answers-heading"
    >
      <div className="container-prose max-w-prose">
        <div className="section-label">Answers</div>
        <h2
          id="answers-heading"
          className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight text-text"
        >
          Honest answers.
        </h2>

        <ul className="mt-10 divide-y divide-border border-y border-border">
          {items.map((it) => (
            <li key={it.q}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6">
                  <h3 className="font-display text-[19px] font-normal leading-snug tracking-tight text-text">
                    {it.q}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-2 inline-block size-2.5 shrink-0 rounded-full border border-border-strong transition-all group-open:border-accent group-open:bg-accent"
                  />
                </summary>
                <p className="-mt-2 max-w-prose pb-7 text-[15px] leading-relaxed text-text-2">
                  {it.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
