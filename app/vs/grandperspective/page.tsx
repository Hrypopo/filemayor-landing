import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FileMayor vs GrandPerspective',
  description:
    'GrandPerspective shows you where your disk space went. FileMayor shows you — then fixes it, with AI planning and full rollback.',
};

const matrix = [
  { row: 'Platforms', fm: 'macOS · Windows · Linux · CLI · PWA', gp: 'macOS only' },
  { row: 'Pricing', fm: 'Free · Pro $19/mo · Team $99/mo', gp: 'Free (donation-ware)' },
  { row: 'Primary function', fm: 'Filesystem diagnosis + AI-planned organisation + rollback', gp: 'Disk space visualisation (treemap)' },
  { row: 'Takes action', fm: 'Yes — move, rename, delete, organise', gp: 'No — visualise only' },
  { row: 'AI planning', fm: 'Yes — Curative Triad (explain → cure → apply)', gp: 'No' },
  { row: 'Rollback', fm: 'Full session journal · undo --all', gp: 'N/A — no actions taken' },
  { row: 'Duplicate detection', fm: 'Yes — content-hash deduplication', gp: 'No' },
  { row: 'CLI access', fm: 'Yes — 14 commands, --json everywhere', gp: 'No' },
  { row: 'Watch mode', fm: 'Yes (Pro) — real-time folder monitoring', gp: 'No' },
  { row: 'Best for', fm: 'Finding the problem and fixing it, safely', gp: 'Understanding where disk space is consumed' },
];

export default function VsGrandPerspective() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <Link
              href="/vs"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3 transition-colors hover:text-accent"
            >
              ← All comparisons
            </Link>
            <div className="section-label mt-8">Compare</div>
            <h1 className="h-display text-[clamp(40px,6vw,80px)]">
              FileMayor <span className="text-text-3">vs</span> GrandPerspective.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-2 md:text-xl">
              GrandPerspective is a beloved free Mac utility that visualises disk usage
              as a treemap. It is excellent at answering one question: where did my space
              go? FileMayor answers that question too — and then does something about it.
              The distinction matters: one is a diagnostic, the other is a full treatment.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-4xl">
            <div className="section-label">At a glance</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              The decision matrix.
            </h2>
            <div className="mt-10 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-left text-[14.5px]">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="w-1/4 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">&nbsp;</th>
                    <th className="w-3/8 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">FileMayor</th>
                    <th className="w-3/8 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-2">GrandPerspective</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((m, i) => (
                    <tr key={m.row} className={i < matrix.length - 1 ? 'border-b border-border' : ''}>
                      <th scope="row" className="bg-surface px-5 py-4 font-mono text-[12px] uppercase tracking-[0.12em] text-text-3">{m.row}</th>
                      <td className="px-5 py-4 align-top text-text">{m.fm}</td>
                      <td className="px-5 py-4 align-top text-text-2">{m.gp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When GrandPerspective is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              You want a map. Nothing more.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              GrandPerspective is free, fast, and makes a beautiful treemap. If you
              just want to understand the shape of your disk usage — not act on it —
              it is hard to beat. It has been around since 2005 and the codebase is
              solid. Some people open it, identify the large files manually, and delete
              them in Finder. That workflow is perfectly valid.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When FileMayor is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              You want to fix it, not just see it.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              FileMayor starts where GrandPerspective ends. Once FileMayor scans a
              directory, it doesn't just show you a chart — it explains what it found
              in plain language, proposes a structured cure (merge duplicates, archive
              old files, flatten unnecessary nesting), and applies the plan only after
              you approve it. Every single move is logged. If you change your mind,{' '}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">
                filemayor undo --all
              </code>{' '}
              reverses the session completely.
            </p>
            <p className="mt-4 text-[16.5px] leading-relaxed text-text-2">
              FileMayor also runs on Windows and Linux — GrandPerspective is macOS-only —
              and detects content-level duplicates that a treemap view would never surface.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-prose max-w-3xl">
            <div className="section-label">The short answer</div>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              GrandPerspective shows you the problem. FileMayor cures it. Use
              GrandPerspective when you just want a quick audit. Use FileMayor when
              you are ready to act.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/download" className="btn btn-primary">
                Download FileMayor <span aria-hidden>→</span>
              </Link>
              <Link href="/blog/chevza-doctrine" className="btn btn-mono">
                Read the Chevza Doctrine
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
