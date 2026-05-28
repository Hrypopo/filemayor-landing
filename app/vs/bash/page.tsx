import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FileMayor vs Shell Scripts / Bash — Which is better for organising files?',
  description:
    'Shell scripts are powerful but brittle, require upfront knowledge, and have no undo. FileMayor gives you the same control — in plain English, with a full journal and one-command rollback.',
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'FileMayor vs Shell Scripts / Bash for file organisation',
  description: 'A direct comparison of FileMayor vs writing Bash or shell scripts for organising your filesystem.',
  author: { '@type': 'Organization', name: 'FileMayor' },
  publisher: { '@type': 'Organization', name: 'FileMayor', url: 'https://filemayor.com' },
};

const rows = [
  { label: 'Learning curve', fm: 'None — plain English', bash: 'High — requires scripting knowledge' },
  { label: 'Undo a session', fm: 'filemayor undo --all', bash: 'Not built in — manual or impossible' },
  { label: 'Works on existing mess', fm: 'Yes — AI reads what\'s there', bash: 'You must describe the structure first' },
  { label: 'Cross-platform', fm: 'Mac · Windows · Linux', bash: 'Linux/Mac; Windows requires WSL or PowerShell rewrite' },
  { label: 'Safe for bulk operations', fm: 'Guardrail layer blocks destructive batches', bash: 'rm -rf is one typo away' },
  { label: 'Readable plan before execution', fm: 'Always shown before anything runs', bash: 'No — the script is the plan' },
  { label: 'AI assistance', fm: 'Built-in, local-only', bash: 'None — you write it yourself' },
  { label: 'Crash recovery', fm: 'Journal-based, auto-rollback on restart', bash: 'None' },
  { label: 'Non-technical users', fm: 'Yes', bash: 'No' },
];

export default function VsBashPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <main id="main">

        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">FileMayor vs Shell Scripts</div>
            <h1 className="h-display text-[clamp(36px,5.5vw,72px)]">
              Shell scripts are powerful.<br />
              <em className="not-italic text-accent italic">They have no undo.</em>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-text-2">
              If you know Bash, shell scripts are the most flexible tool for file organisation.
              But flexibility has a cost: no safety net, no preview, no recovery when something goes wrong.
              FileMayor gives you the same expressive power in plain English — with a full audit trail
              and one-command rollback.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose">
            <div className="section-label">Direct comparison</div>
            <h2 className="font-display text-[clamp(26px,3vw,38px)] font-normal leading-tight tracking-tight">
              Side by side.
            </h2>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-[14.5px]">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-6 py-4 text-left font-normal text-text-3"></th>
                    <th className="px-6 py-4 text-left font-semibold text-accent">FileMayor</th>
                    <th className="px-6 py-4 text-left font-normal text-text-3">Bash / shell scripts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map((row) => (
                    <tr key={row.label}>
                      <td className="px-6 py-4 font-medium text-text-2">{row.label}</td>
                      <td className="px-6 py-4 text-text">{row.fm}</td>
                      <td className="px-6 py-4 text-text-2">{row.bash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* When to use each */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Honest verdict</div>
            <h2 className="font-display text-[clamp(26px,3vw,38px)] font-normal leading-tight tracking-tight">
              When to use each.
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent mb-4">Use FileMayor when</p>
                <ul className="space-y-3 text-[14.5px] text-text-2">
                  {[
                    'You want to clean up a folder without writing code',
                    'You need to undo the operation if it goes wrong',
                    'The folder structure is organic and you don\'t know what\'s in it',
                    'You want a readable plan before anything moves',
                    'You\'re on Windows and don\'t want to write PowerShell',
                    'You want the same tool to work across your whole team',
                  ].map((i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-3 mb-4">Use shell scripts when</p>
                <ul className="space-y-3 text-[14.5px] text-text-2">
                  {[
                    'You need to integrate file operations into a larger automation pipeline',
                    'You\'re manipulating file contents, not just structure',
                    'You need to run in an environment with no Node.js',
                    'You\'re comfortable with Bash and already have a working script',
                    'You need cron-level automation without any UI',
                  ].map((i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-border-strong" aria-hidden />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-8 text-[15px] leading-relaxed text-text-2">
              FileMayor and shell scripts are not mutually exclusive. Many users run FileMayor for
              the interactive, plan-and-approve workflow, then export the resulting structure to a
              config file that a script can reproduce elsewhere. They solve different parts of the problem.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="container-prose max-w-3xl">
            <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-normal leading-tight tracking-tight">
              The power of a script. The safety of a journal.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-text-2">
              FileMayor is free to start. Download and run it on a folder in the next five minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/download" className="btn btn-primary">
                Download FileMayor free <span aria-hidden>→</span>
              </Link>
              <Link href="/vs" className="btn btn-mono">
                All comparisons
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
