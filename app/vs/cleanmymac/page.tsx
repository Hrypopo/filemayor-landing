import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FileMayor vs CleanMyMac X',
  description:
    'CleanMyMac X cleans system junk. FileMayor organises your filesystem with AI planning and full rollback. Honest comparison.',
};

const matrix = [
  { row: 'Platforms', fm: 'macOS · Windows · Linux · CLI · PWA', cmm: 'macOS · Windows (limited)' },
  { row: 'Pricing', fm: 'Free · Pro $19/mo · Team $99/mo', cmm: '$39.95/yr or $9.99/mo (MacPaw)' },
  { row: 'Primary function', fm: 'Filesystem organisation, bulk ops, AI planning', cmm: 'System junk removal, app uninstaller, malware scan' },
  { row: 'AI planning', fm: 'Yes — Curative Triad (explain → cure → apply)', cmm: 'No' },
  { row: 'Rollback', fm: 'Full session journal · undo --all', cmm: 'No undo for cleaned files' },
  { row: 'File organisation', fm: 'Yes — sort, move, rename, dedupe at scale', cmm: 'Limited — focuses on system files, not user folders' },
  { row: 'CLI access', fm: 'Yes — 14 commands, --json everywhere', cmm: 'No' },
  { row: 'MCP / AI tool integration', fm: 'Yes — Claude Desktop, Cursor, Zed', cmm: 'No' },
  { row: 'Safety architecture', fm: 'Chevza Doctrine — 6-layer hardened runtime', cmm: 'Standard app sandboxing' },
  { row: 'Telemetry', fm: 'None', cmm: 'Usage analytics (opt-out available)' },
  { row: 'Best for', fm: 'Organising folders, managing projects, AI-driven curation', cmm: 'Freeing disk space, removing app leftovers, quick system scan' },
];

export default function VsCleanMyMac() {
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
              FileMayor <span className="text-text-3">vs</span> CleanMyMac X.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-2 md:text-xl">
              They sound similar — both touch your files. They are not the same tool.
              CleanMyMac is excellent at one thing: removing system junk and app remnants.
              FileMayor is a different shape entirely: it organises your working filesystem,
              plans moves with AI, and provides a full undo journal for every operation.
              Most people who use one end up using both.
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
                    <th className="w-3/8 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-2">CleanMyMac X</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((m, i) => (
                    <tr key={m.row} className={i < matrix.length - 1 ? 'border-b border-border' : ''}>
                      <th scope="row" className="bg-surface px-5 py-4 font-mono text-[12px] uppercase tracking-[0.12em] text-text-3">{m.row}</th>
                      <td className="px-5 py-4 align-top text-text">{m.fm}</td>
                      <td className="px-5 py-4 align-top text-text-2">{m.cmm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When CleanMyMac is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              System cleanup, not folder work.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              If your goal is to reclaim gigabytes from caches, remove app remnants after
              uninstalling software, or run a quick malware scan, CleanMyMac X is a polished
              and well-maintained solution. The UI is thoughtful, and MacPaw has a long
              track record on macOS. It does what it does very well.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When FileMayor is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              When the mess is in your folders, not the system.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              Downloads folder with 4,000 files. A project directory that grew without
              a plan. A media library that spans three drives. These are not CleanMyMac
              problems — they are FileMayor problems. FileMayor scans the structure,
              explains what it finds, proposes a cure, and applies it only after you
              approve, with every move journaled so undo is always one command away.
            </p>
            <p className="mt-4 text-[16.5px] leading-relaxed text-text-2">
              Add the fact that FileMayor runs on Windows and Linux and exposes a full
              CLI and MCP server, and the two tools occupy completely different niches.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-prose max-w-3xl">
            <div className="section-label">The short answer</div>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              Run CleanMyMac monthly to clear system debris. Use FileMayor whenever you
              need to actually restructure, organise, or make sense of a folder. They
              do not compete.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/download" className="btn btn-primary">
                Download FileMayor <span aria-hidden>→</span>
              </Link>
              <Link href="/blog/curative-triad" className="btn btn-mono">
                How the Curative Triad works
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
