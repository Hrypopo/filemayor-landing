import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FileMayor vs Dropzone 4',
  description:
    'Dropzone handles drag-and-drop to destinations. FileMayor handles bulk AI-planned operations with a full rollback journal. Honest comparison.',
};

const matrix = [
  { row: 'Platforms', fm: 'macOS · Windows · Linux · CLI · PWA', dz: 'macOS only' },
  { row: 'Pricing', fm: 'Free · Pro $19/mo · Team $99/mo', dz: '$4.99 one-time (basic) · Actions sold separately' },
  { row: 'Interaction model', fm: 'Describe intent → AI plans → approve → apply → undo', dz: 'Drag files to destination droplets' },
  { row: 'Bulk operations', fm: 'Yes — thousands of files, AI-curated', dz: 'One file / group at a time via drag' },
  { row: 'AI planning', fm: 'Yes — Curative Triad (explain → cure → apply)', dz: 'No' },
  { row: 'Rollback', fm: 'Full session journal · undo --all', dz: 'No' },
  { row: 'CLI access', fm: 'Yes — 14 commands, --json everywhere', dz: 'No' },
  { row: 'MCP / AI tool integration', fm: 'Yes — Claude Desktop, Cursor, Zed', dz: 'No' },
  { row: 'Automation', fm: 'Watch mode, scheduled scans, SOP scripts', dz: 'Custom actions (Python / JS) per droplet' },
  { row: 'Best for', fm: 'Organising and curating folders at scale, safely', dz: 'Quick one-shot file routing to preset destinations' },
];

export default function VsDropzone() {
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
              FileMayor <span className="text-text-3">vs</span> Dropzone 4.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-2 md:text-xl">
              Dropzone is a clever Mac utility for routing individual files to preset
              destinations via drag-and-drop. It is fast for a specific workflow: you
              know where a file goes and want a shortcut to get it there. FileMayor
              works at a different scale — it handles thousands of files at once,
              explains what it plans to do, and gives you a full undo if anything
              goes wrong.
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
                    <th className="w-3/8 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-2">Dropzone 4</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((m, i) => (
                    <tr key={m.row} className={i < matrix.length - 1 ? 'border-b border-border' : ''}>
                      <th scope="row" className="bg-surface px-5 py-4 font-mono text-[12px] uppercase tracking-[0.12em] text-text-3">{m.row}</th>
                      <td className="px-5 py-4 align-top text-text">{m.fm}</td>
                      <td className="px-5 py-4 align-top text-text-2">{m.dz}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When Dropzone is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Manual routing, one file at a time.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              If your workflow involves grabbing individual files from Finder and sending
              them to a specific cloud folder, FTP server, or script, Dropzone is extremely
              good at that. The droplet model is intuitive and the one-time price is hard
              to argue with. The custom action API (Python or JavaScript) is genuinely
              powerful for technical users who want bespoke file routing.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When FileMayor is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Bulk curation, AI-planned, reversible.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              The moment you are dealing with hundreds or thousands of files — the
              Downloads folder you've ignored for two years, a project directory after
              a long sprint, a media library that sprawls across drives — Dropzone's
              drag-and-drop model doesn't scale. FileMayor scans the entire tree,
              surfaces a diagnosis, proposes a structured cure, and applies it in a
              single journaled session. Undo is always available.
            </p>
            <p className="mt-4 text-[16.5px] leading-relaxed text-text-2">
              FileMayor also runs on Windows and Linux, exposes every operation as a
              CLI command, and integrates with AI assistants via MCP — none of which
              Dropzone supports.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-prose max-w-3xl">
            <div className="section-label">The short answer</div>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              Dropzone for one-shot file routing. FileMayor for everything that needs
              a plan.
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
