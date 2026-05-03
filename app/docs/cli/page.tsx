import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'CLI reference',
  description:
    'All 14 FileMayor CLI commands with syntax, examples, and exit codes.',
};

interface Command {
  name: string;
  signature: string;
  description: string;
  example?: string;
  notes?: string;
  pro?: boolean;
}

const triad: Command[] = [
  {
    name: 'scan',
    signature: 'filemayor scan <dir>',
    description:
      'Recursive file inventory. Categorizes by extension, surfaces duplicates and bloat. Read-only — never moves a file. Output is machine-friendly with --json.',
    example: 'filemayor scan ~/Downloads --json | jq ".duplicates"',
  },
  {
    name: 'explain',
    signature: 'filemayor explain <dir>',
    description:
      'AI health diagnosis. Returns a 0–100 score plus a plain-English issue list (screenshot clutter, dupe installers, stale archives). Read-only.',
    example: 'filemayor explain ~/Downloads',
    notes: 'Sends file metadata to the configured AI provider. No file contents.',
  },
  {
    name: 'cure',
    signature: 'filemayor cure <dir> [--prompt "..."]',
    description:
      'Generate a curative plan. Proposes specific moves with rationale. Writes nothing — outputs the plan only. Apply it with `filemayor apply` or discard.',
    example: 'filemayor cure ~/Downloads --prompt "organize by type"',
  },
  {
    name: 'apply',
    signature: 'filemayor apply',
    description:
      'Execute the most recent plan. Every move is journaled. Atomic per category — a failure in one category does not corrupt the others. Reversible with `filemayor undo`.',
    example: 'filemayor apply',
  },
  {
    name: 'undo',
    signature: 'filemayor undo [--all]',
    description:
      'Reverse moves. Without flags, reverses the most recent operation. `--all` reverses the entire session. Persists across crashes.',
    example: 'filemayor undo --all',
  },
];

const tools: Command[] = [
  {
    name: 'organize',
    signature: 'filemayor organize <dir> [--dry-run]',
    description:
      'Deterministic auto-organize. Sorts files into 12 smart categories (Code, Images, Archives, Documents, Configs, Media, etc.). No AI involved.',
    example: 'filemayor organize ~/Downloads --dry-run',
  },
  {
    name: 'clean',
    signature: 'filemayor clean <dir> [--yes]',
    description:
      'Remove junk: temp files, .DS_Store, Thumbs.db, .crdownload, node_modules artifacts, OS caches. Prompts before deletion unless --yes.',
    example: 'filemayor clean /tmp --yes',
  },
  {
    name: 'analyze',
    signature: 'filemayor analyze <dir>',
    description:
      'Deep directory intelligence. Surfaces top largest files, duplicate clusters, deep nests, file-age distribution, and bloat sources.',
    example: 'filemayor analyze ~/Downloads',
  },
  {
    name: 'duplicates',
    signature: 'filemayor duplicates <dir>',
    description: 'Find duplicate files by content hash. Read-only.',
    example: 'filemayor duplicates ~/Photos --json',
  },
  {
    name: 'dedupe',
    signature: 'filemayor dedupe <dir>',
    description:
      'Remove duplicates safely. Keeps the canonical copy (oldest, or matching a heuristic), trashes the rest. Journaled.',
    example: 'filemayor dedupe ~/Photos',
  },
  {
    name: 'watch',
    signature: 'filemayor watch <dir>',
    description:
      'Live auto-organize. Monitors a folder; routes new arrivals to their correct homes in real-time. Pro feature.',
    example: 'filemayor watch ~/Downloads',
    pro: true,
  },
];

const meta: Command[] = [
  {
    name: 'init',
    signature: 'filemayor init',
    description:
      'Create a `.filemayor.json` config in the current directory. Defines categories, watch rules, AI provider, and locale.',
    example: 'filemayor init',
  },
  {
    name: 'info',
    signature: 'filemayor info',
    description:
      'System info, version, license status, AI provider connectivity, journal location.',
    example: 'filemayor info',
  },
  {
    name: 'license',
    signature: 'filemayor license [activate|deactivate] [<key>]',
    description:
      'Activate or deactivate a Pro license. Validates locally with a 30-day offline grace period.',
    example: 'filemayor license activate FM-XXXX-XXXX',
  },
];

const Section = ({ title, label, items }: { title: string; label: string; items: Command[] }) => (
  <section className="border-t border-border py-20 md:py-24">
    <div className="container-prose">
      <div className="section-label">{label}</div>
      <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
        {title}
      </h2>
      <ol className="mt-12 space-y-10">
        {items.map((c) => (
          <li
            key={c.name}
            className="grid grid-cols-1 gap-6 border-t border-border pt-8 md:grid-cols-[200px,1fr]"
          >
            <div>
              <h3 className="font-display text-[26px] font-normal leading-tight tracking-tight text-text">
                {c.name}{' '}
                {c.pro && (
                  <span className="ml-2 inline-block rounded bg-accent/20 px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    Pro
                  </span>
                )}
              </h3>
              <code className="mt-2 block font-mono text-[12px] text-text-3">
                {c.signature}
              </code>
            </div>
            <div>
              <p className="text-[15px] leading-relaxed text-text-2">{c.description}</p>
              {c.example && (
                <code className="mt-4 block rounded-md border border-border bg-surface px-3 py-2 font-mono text-[12.5px] text-text">
                  {c.example}
                </code>
              )}
              {c.notes && (
                <p className="mt-3 font-mono text-[12px] text-text-3">{c.notes}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default function CliPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">Documentation · CLI reference</div>
            <h1 className="h-display text-[clamp(40px,6vw,80px)]">
              Fourteen verbs.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-2 md:text-xl">
              The CLI is the canonical surface. Every command takes <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">--json</code> for shell integration. Requires Node.js ≥ 20.
            </p>
            <code className="mt-8 inline-block rounded-md border border-border bg-surface px-3 py-2 font-mono text-[14px] text-text">
              npm install -g filemayor
            </code>
          </div>
        </section>

        <Section label="The Curative Triad · core verbs" title="Diagnose, plan, apply." items={triad} />
        <Section label="Tools" title="Direct operations." items={tools} />
        <Section label="Meta" title="Configuration and status." items={meta} />

        <section className="border-t border-border py-16 md:py-20">
          <div className="container-prose max-w-3xl">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-3">
              Exit codes
            </p>
            <ul className="mt-4 space-y-2 text-[14.5px] text-text-2">
              <li>
                <code className="font-mono text-text">0</code> — success
              </li>
              <li>
                <code className="font-mono text-text">1</code> — generic error
              </li>
              <li>
                <code className="font-mono text-text">2</code> — invalid arguments
              </li>
              <li>
                <code className="font-mono text-text">3</code> — Doctrine block (Guardrail, Validator, or Security layer refused)
              </li>
              <li>
                <code className="font-mono text-text">4</code> — license required for Pro feature
              </li>
              <li>
                <code className="font-mono text-text">5</code> — AI provider unreachable (with --offline-fail)
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
