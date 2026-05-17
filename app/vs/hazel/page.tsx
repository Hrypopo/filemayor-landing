import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FileMayor vs Hazel',
  description:
    'A long-respected Mac-only rules engine versus a cross-platform tool with AI planning and rollback safety. Honest comparison.',
};

const matrix = [
  { row: 'Platforms', fm: 'macOS · Windows · Linux · CLI · PWA', hz: 'macOS only' },
  { row: 'Pricing', fm: 'Free · Pro $5.99/mo · Enterprise $24.99/mo', hz: '$42 one-time' },
  { row: 'Interaction model', fm: 'Curative Triad — explain, cure, apply, undo', hz: 'Rules engine — write IF/THEN rules per folder' },
  { row: 'AI planning', fm: 'Yes — Gemini 2.0 Flash, optional, local-first', hz: 'No' },
  { row: 'Rollback', fm: 'Full session journal · `undo --all`', hz: 'No native undo for batched moves' },
  { row: 'Watch mode', fm: 'Yes (Pro)', hz: 'Yes — core feature' },
  { row: 'Scripting', fm: '14 CLI commands · `--json` everywhere', hz: 'AppleScript / shell scripts via rules' },
  { row: 'Telemetry', fm: 'None', hz: 'None' },
  { row: 'Open source', fm: 'CLI engine on npm · UI proprietary', hz: 'Proprietary' },
  { row: 'Best for', fm: 'Anyone who wants AI + safety + rollback, on any OS', hz: 'Mac power users who like writing explicit rules' },
];

export default function VsHazel() {
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
              FileMayor <span className="text-text-3">vs</span> Hazel.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-2 md:text-xl">
              Hazel has been the reference Mac file automation tool for over a decade. It is
              respected, mature, and well-designed. FileMayor is a different shape: AI
              planning, cross-platform reach, and the Curative Triad safety model. Both
              tools are good at what they do. They are good at different things.
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
                    <th className="w-1/4 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
                      &nbsp;
                    </th>
                    <th className="w-3/8 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      FileMayor
                    </th>
                    <th className="w-3/8 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-2">
                      Hazel
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((m, i) => (
                    <tr
                      key={m.row}
                      className={i < matrix.length - 1 ? 'border-b border-border' : ''}
                    >
                      <th
                        scope="row"
                        className="bg-surface px-5 py-4 font-mono text-[12px] uppercase tracking-[0.12em] text-text-3"
                      >
                        {m.row}
                      </th>
                      <td className="px-5 py-4 align-top text-text">{m.fm}</td>
                      <td className="px-5 py-4 align-top text-text-2">{m.hz}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When Hazel is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Mac-only and rules-first.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              If you are on macOS exclusively, prefer writing explicit IF/THEN rules over
              describing intent in natural language, and want a one-time-purchase tool with
              a long maintenance history, Hazel is excellent. The rules engine is mature,
              and AppleScript integration unlocks anything macOS exposes.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When FileMayor is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Cross-platform, AI-planned, reversible.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              FileMayor exists for the cases Hazel does not cover well: Windows and Linux
              machines, teams that want a shared CLI workflow, anyone who would rather
              describe what they want in plain English than write rules, and anyone who
              wants the safety net of a full-session undo on every operation.
            </p>
            <p className="mt-4 text-[16.5px] leading-relaxed text-text-2">
              The Curative Triad — <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">explain → cure → apply</code> — separates planning
              from execution by design. The Chevza Doctrine ensures that even when an AI
              proposes a destructive plan, six layers of safety architecture sit between
              the proposal and your filesystem.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-prose max-w-3xl">
            <div className="section-label">If you want to try both</div>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              They do not conflict. Hazel can govern a watched folder while FileMayor
              handles the larger session organization. Many teams run them side by side.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/download" className="btn btn-primary">
                Download FileMayor <span aria-hidden>→</span>
              </Link>
              <Link href="/blog/curative-triad" className="btn btn-mono">
                Read about the Triad
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
