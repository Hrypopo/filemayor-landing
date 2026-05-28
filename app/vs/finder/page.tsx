import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FileMayor vs macOS Finder — AI file organisation vs drag and drop',
  description:
    'Finder is fine for individual files. FileMayor handles the folders you have been ignoring for years — with AI planning, bulk operations, and a full undo.',
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'FileMayor vs macOS Finder for file organisation',
  description: 'A direct comparison of FileMayor vs macOS Finder for organising large, messy folder structures.',
  author: { '@type': 'Organization', name: 'FileMayor' },
  publisher: { '@type': 'Organization', name: 'FileMayor', url: 'https://filemayor.com' },
};

const rows = [
  { label: 'Bulk reorganisation', fm: 'AI plans and executes hundreds of moves', finder: 'Manual drag and drop only' },
  { label: 'Undo a session', fm: 'filemayor undo --all — entire session reversed', finder: 'Cmd+Z — one move at a time, session-scoped' },
  { label: 'Find duplicates', fm: 'Built-in deduplication with preview', finder: 'Not supported' },
  { label: 'Natural language commands', fm: '"Archive everything older than 6 months"', finder: 'Not supported' },
  { label: 'Diagnose a messy folder', fm: 'AI analysis with a plain-English summary', finder: 'Not supported' },
  { label: 'Cross-platform', fm: 'Mac · Windows · Linux', finder: 'macOS only' },
  { label: 'Works in terminal / CLI', fm: 'Yes — full CLI', finder: 'No' },
  { label: 'MCP / AI assistant integration', fm: 'Claude Desktop, Claude Code, Cursor, Zed', finder: 'No' },
  { label: 'Safe for large operations', fm: 'Guardrail layer + journal before execution', finder: 'No safety net for bulk operations' },
];

export default function VsFinderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <main id="main">

        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">FileMayor vs Finder</div>
            <h1 className="h-display text-[clamp(36px,5.5vw,72px)]">
              Finder is for one file.<br />
              <em className="not-italic text-accent italic">FileMayor is for<br />the whole mess.</em>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-text-2">
              Finder is the right tool for navigating your filesystem and moving individual items.
              It is the wrong tool for the folder that has been silently accumulating for three years.
              FileMayor handles the bulk work — with an AI that diagnoses the structure, a plan you
              approve before anything moves, and a full undo if you change your mind.
            </p>
          </div>
        </section>

        {/* Comparison */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose">
            <div className="section-label">Direct comparison</div>
            <h2 className="font-display text-[clamp(26px,3vw,38px)] font-normal leading-tight tracking-tight">
              What each tool actually does.
            </h2>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-[14.5px]">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-6 py-4 text-left font-normal text-text-3"></th>
                    <th className="px-6 py-4 text-left font-semibold text-accent">FileMayor</th>
                    <th className="px-6 py-4 text-left font-normal text-text-3">macOS Finder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map((row) => (
                    <tr key={row.label}>
                      <td className="px-6 py-4 font-medium text-text-2">{row.label}</td>
                      <td className="px-6 py-4 text-text">{row.fm}</td>
                      <td className="px-6 py-4 text-text-2">{row.finder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* The actual use case */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">The real use case</div>
            <h2 className="font-display text-[clamp(26px,3vw,38px)] font-normal leading-tight tracking-tight">
              These tools are not competitors.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-text-2">
              Finder is your filesystem's window. You will always use it. FileMayor is the tool you
              reach for when the window reveals something that needs more than drag and drop — a
              Downloads folder with 847 files, a Desktop full of screenshots, a project directory
              where every naming convention ever tried is represented simultaneously.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-text-2">
              The workflow is: FileMayor does the heavy reorganisation, Finder is how you navigate
              the result. They operate at different scales.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="container-prose max-w-3xl">
            <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-normal leading-tight tracking-tight">
              The folders you've been ignoring. Fixed.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-text-2">
              Free to start. Point it at Downloads and see what it finds.
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
