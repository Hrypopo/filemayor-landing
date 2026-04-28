import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Security · The Chevza Doctrine',
  description:
    'Six layers between an AI plan and your filesystem. The architecture document for FileMayor security.',
};

const layers = [
  {
    n: 'L01',
    name: 'Jail',
    file: 'cli/core/jailer.js',
    role: 'Constrains scope.',
    detail: [
      'Symlink-aware sandbox. Resolves every path before any operation runs.',
      'Refuses any move outside the declared workspace, including indirect paths through symlinks pointing to system directories.',
      'Hard-blocked targets: ~/Library/Keychains, /System, %WINDIR%, /etc, ~/.ssh, .gitconfig, .npmrc, anything in $TMPDIR not explicitly opted in.',
    ],
  },
  {
    n: 'L02',
    name: 'Vault',
    file: 'cli/core/vault.js',
    role: 'Holds secrets.',
    detail: [
      'OS keychain integration: Apple Keychain on macOS, Credential Manager on Windows, libsecret on Linux.',
      'License keys, AI provider credentials, and webhook signing secrets never touch disk in plaintext.',
      'Falls back to an encrypted on-disk store only if the OS keychain is unavailable, with a clear console warning.',
    ],
  },
  {
    n: 'L03',
    name: 'Guardrail',
    file: 'cli/core/guardrail.js',
    role: 'Inspects every batch.',
    detail: [
      'Runs after the AI returns a plan, before the validator. Pattern-matches the proposed batch against a deny-list of destructive shapes.',
      'Mass-delete thresholds, recursive renames touching protected paths, ambiguous overwrites, batches that exceed configured maxima — all blocked at this layer.',
      'A failed Guardrail check produces a diagnostic that explains which rule fired and what to ask the AI for instead.',
    ],
  },
  {
    n: 'L04',
    name: 'Halt',
    file: 'cli/core/emergency-halt.js',
    role: 'Crash-safe persistence.',
    detail: [
      'Treats the journal as durable state. Every move writes its intent to disk before the move happens, and writes its completion after.',
      'Forced shutdown mid-operation always rolls back cleanly on next start. There is no "half-applied" state.',
      'Halt is not a UI feature — it sits inside the execution pipeline so that user-initiated stops, OS signals, and process crashes all converge on the same recovery path.',
    ],
  },
  {
    n: 'L05',
    name: 'Architect',
    file: 'cli/core/validator.js',
    role: 'Validates the plan.',
    detail: [
      'Refuses domain-scattering moves. Treats the proposed plan as a graph and rejects it if it would split semantically related files (e.g. screenshots from the same session, photos from a single trip).',
      'Detects circular dependencies between operations.',
      'Plans that fail validation never reach the execution engine.',
    ],
  },
  {
    n: 'L06',
    name: 'Security',
    file: 'cli/core/security.js',
    role: 'The boring layer that matters.',
    detail: [
      'Path traversal checks (rejects ../ escape attempts, encoded variants, NUL bytes).',
      'Rate limiting on AI calls and on filesystem writes per session.',
      'Input validation on every user-supplied string — workspace paths, prompts, configuration values.',
      'The layer with the fewest interesting decisions and the most consequential bugs if it ever fails.',
    ],
  },
];

export default function SecurityPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">Security · architecture reference</div>
            <h1 className="h-display text-[clamp(40px,6vw,80px)]">
              The Chevza Doctrine.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-2 md:text-xl">
              Six named layers between an AI plan and your filesystem. The principle: no
              single component decides, validates, and executes. Responsibility is split
              along the path so a failure in any one layer is caught by the next.
            </p>
            <p className="mt-6 max-w-2xl font-mono text-[13px] leading-relaxed text-text-3">
              This page is the canonical reference. For a narrative version, see{' '}
              <Link href="/blog/chevza-doctrine" className="text-text-2 underline decoration-text-3 underline-offset-4 hover:text-accent">
                the essay
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Principle</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Defense in depth, by name.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-text-2">
              An AI proposing filesystem operations is a powerful tool and a credible threat.
              Useful because it generalizes; risky for the same reason. The Doctrine is the
              answer: the AI can propose, but cannot directly execute. There is always a
              boundary, and the boundary is layered, named, and inspectable.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-text-2">
              When a plan flows from intent to execution, it passes through six checks. Each
              has a single responsibility, a code home, and a failure mode you can read.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">The layers</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Six checks, in order.
            </h2>

            <ol className="mt-12 space-y-12">
              {layers.map((l) => (
                <li
                  key={l.n}
                  className="grid grid-cols-1 gap-6 border-t border-border pt-10 md:grid-cols-[180px,1fr]"
                >
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      {l.n}
                    </div>
                    <h3 className="mt-2 font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                      {l.name}
                    </h3>
                    <code className="mt-2 block font-mono text-[12px] text-text-3">
                      {l.file}
                    </code>
                  </div>
                  <div>
                    <p className="font-display text-[20px] font-normal italic leading-snug text-accent">
                      {l.role}
                    </p>
                    <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-text-2">
                      {l.detail.map((d, i) => (
                        <li key={i} className="flex gap-3">
                          <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">What this is not</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Honest scope.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-text-2">
              The Doctrine is an architecture, not a certification. {site.name} has not been
              third-party audited at the time of writing. We treat that as a planned
              milestone, not an accomplished one. The 128-test suite covers Doctrine layers
              extensively (see <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">tests/test-security.js</code> and{' '}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">tests/MASTER_TEST_V3.js</code>) and a third-party security review will
              update this page when complete.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-text-2">
              Found a vulnerability? Email{' '}
              <a className="text-accent" href={`mailto:${site.author.email}`}>
                {site.author.email}
              </a>{' '}
              with the subject line <span className="font-mono">[security]</span>. Disclosure window: 90 days for
              high-severity reports. Coordinated disclosure preferred; we will credit you in
              the changelog if you wish.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
