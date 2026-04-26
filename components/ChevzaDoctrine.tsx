const layers = [
  {
    name: 'Jail',
    file: 'jailer.js',
    purpose: 'Symlink-aware sandbox. Blocks system directories. Refuses moves outside the declared workspace.',
  },
  {
    name: 'Vault',
    file: 'vault.js',
    purpose: 'OS keychain integration for license keys and AI credentials. Never written to disk in plaintext.',
  },
  {
    name: 'Guardrail',
    file: 'guardrail.js',
    purpose: 'Inspects every AI-generated batch before execution. Blocks destructive patterns even when planned.',
  },
  {
    name: 'Halt',
    file: 'emergency-halt.js',
    purpose: 'Crash-safe journal persistence. Forced shutdown mid-operation always rolls back cleanly.',
  },
  {
    name: 'Architect',
    file: 'validator.js',
    purpose: 'Refuses domain-scattering moves. Enforces structural coherence even on imprecise prompts.',
  },
  {
    name: 'Security',
    file: 'security.js',
    purpose: 'Path traversal, null bytes, rate limiting, input validation. The boring layer that matters.',
  },
];

export function ChevzaDoctrine() {
  return (
    <section
      id="doctrine"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="doctrine-heading"
    >
      <div className="container-prose">
        <div className="section-label">The Chevza Doctrine</div>
        <h2 id="doctrine-heading" className="h-display text-[clamp(36px,5vw,56px)]">
          Six layers. Each named.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-2 md:text-lg">
          Most file utilities have one security layer — a path check. FileMayor has six,
          arranged so a failure in any single one cannot reach your filesystem. The doctrine is
          the name. The code is the proof.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {layers.map((l, i) => (
            <li key={l.name} className="bg-surface p-7">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-[24px] font-normal tracking-tight text-text">
                  {l.name}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
                  L{(i + 1).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="mt-1 font-mono text-[12px] text-accent">{l.file}</div>
              <p className="mt-4 text-[14px] leading-relaxed text-text-2">{l.purpose}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
