const items = [
  {
    q: 'Does FileMayor send my files anywhere?',
    a: 'No. The core engine runs entirely on your machine. The optional AI features call out to a model only with file metadata (names, sizes, paths) — never file contents. You can disable AI entirely and the rest still works.',
  },
  {
    q: 'How does Undo work?',
    a: 'Every move is recorded in a journal kept inside the workspace. Running `filemayor undo` reverses the most recent operation; `undo --all` reverses the entire session. Undo persists across crashes and reboots.',
  },
  {
    q: 'Can I script it?',
    a: 'Yes. The CLI is the canonical surface. All 14 commands accept --json, so you can pipe to jq, integrate with shell scripts, or wire into CI. The Desktop and PWA surfaces are visual layers over the same engine.',
  },
  {
    q: 'What happens if the AI proposes a bad plan?',
    a: 'The Curative Triad separates planning from execution. `filemayor cure` outputs a plan; nothing is touched until you run `filemayor apply`. The Guardrail layer additionally refuses destructive batches even when planned.',
  },
  {
    q: 'Is there a trial?',
    a: 'Free tier covers individual use indefinitely. Pro features (watch, unlimited bulk, AI SOPs) require a license. Refund within 14 days, no questions, via the checkout provider.',
  },
  {
    q: 'How are licenses delivered?',
    a: 'After checkout you receive an activation link by email. Click it and the desktop app activates automatically. Offline activation also works — paste the key into the license command. License validation runs locally with a 30-day offline grace period.',
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="container-prose">
        <div className="section-label">FAQ</div>
        <h2 id="faq-heading" className="h-display text-[clamp(36px,5vw,56px)]">
          Six honest answers.
        </h2>

        <ul className="mt-12 divide-y divide-border rounded-2xl border border-border bg-surface">
          {items.map((it) => (
            <li key={it.q} className="p-7 md:p-9">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <h3 className="font-display text-[22px] font-normal leading-snug tracking-tight text-text">
                    {it.q}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-2 inline-block size-3 shrink-0 rounded-full border border-border-strong transition-all group-open:bg-accent group-open:border-accent"
                  />
                </summary>
                <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-text-2">{it.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
