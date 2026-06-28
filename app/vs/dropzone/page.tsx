import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FileMayor vs Dropzone 4 — 2025 Comparison',
  description:
    'Dropzone routes drag-and-drop files. FileMayor runs bulk AI-planned operations with a full rollback journal. Compare features, pricing, and when to use each.',
  alternates: { canonical: '/vs/dropzone' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is FileMayor an alternative to Dropzone 4?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For bulk folder organisation, yes. If you need to sort, move, rename, or deduplicate hundreds or thousands of files, FileMayor is the better tool. If you need quick one-shot routing of individual files to preset destinations via drag-and-drop, Dropzone\'s model is faster for that specific workflow. They serve different use cases.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the main difference between FileMayor and Dropzone 4?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Scale and intent model. Dropzone is designed for quickly routing individual files or small groups to preset destinations. FileMayor is designed for bulk operations on entire directory trees — it scans a folder, explains what it finds, proposes a structured cure, and applies it with full rollback. Dropzone works one file at a time. FileMayor works at thousands.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does FileMayor work on Windows and Linux?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. FileMayor runs on macOS, Windows, Linux, and as a PWA. Dropzone 4 is macOS-only. If your workflow spans operating systems or you work on a team with mixed environments, FileMayor provides a consistent CLI interface everywhere.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can FileMayor automate file moves like Dropzone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, via watch mode, scheduled scans, and SOP scripts. FileMayor can monitor a folder continuously and apply rules whenever new files arrive. The CLI also integrates with cron, launchd, or any automation system. Unlike Dropzone, every automated operation is logged and undoable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is FileMayor more expensive than Dropzone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FileMayor is free with no time limit. Dropzone 4 is $4.99 one-time for the base app, with some actions sold separately. If you only need simple file routing, Dropzone\'s one-time price is hard to beat. If you need AI-planned bulk operations and rollback, FileMayor is the right tool.',
      },
    },
  ],
};

const matrix = [
  { row: 'Platforms', fm: 'macOS · Windows · Linux · CLI · PWA', dz: 'macOS only' },
  { row: 'Pricing', fm: 'Free', dz: '$4.99 one-time (base) · actions sold separately' },
  { row: 'Interaction model', fm: 'Describe intent → AI plans → approve → apply → undo', dz: 'Drag files to destination droplets' },
  { row: 'Bulk operations', fm: '✓ Thousands of files, AI-curated', dz: '✗ One file / group at a time via drag' },
  { row: 'AI planning', fm: '✓ Curative Triad — explain → cure → apply', dz: '✗' },
  { row: 'Rollback', fm: '✓ Full session journal · undo --all', dz: '✗' },
  { row: 'CLI access', fm: '✓ 15 commands, --json everywhere', dz: '✗' },
  { row: 'MCP / AI tool integration', fm: '✓ Claude Desktop, Cursor, Zed', dz: '✗' },
  { row: 'Custom automation', fm: 'Watch mode, scheduled scans, SOP scripts, cron', dz: 'Custom actions (Python / JS) per droplet' },
  { row: 'Best for', fm: 'Organising and curating folders at scale, safely', dz: 'Quick one-shot file routing to preset destinations' },
];

const alsoCompare = [
  { href: '/vs/cleanmymac', label: 'FileMayor vs CleanMyMac', desc: 'System junk removal vs user filesystem organisation.' },
  { href: '/vs/hazel', label: 'FileMayor vs Hazel', desc: 'AI intent vs rules engine. Cross-platform vs Mac-only.' },
  { href: '/vs/grandperspective', label: 'FileMayor vs GrandPerspective', desc: 'One shows the problem. The other fixes it.' },
];

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://filemayor.com' },
    { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://filemayor.com/vs' },
    { '@type': 'ListItem', position: 3, name: 'Dropzone vs FileMayor', item: 'https://filemayor.com/vs/dropzone' },
  ],
};

export default function VsDropzone() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Nav />
      <main id="main">

        {/* Hero */}
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

        {/* Decision matrix */}
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

        {/* When Dropzone is right */}
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

        {/* When FileMayor is right */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When FileMayor is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Bulk curation, AI-planned, reversible.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              The moment you are dealing with hundreds or thousands of files — the
              Downloads folder you have ignored for two years, a project directory after
              a long sprint, a media library that sprawls across drives — Dropzone&apos;s
              drag-and-drop model does not scale. FileMayor scans the entire tree,
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

        {/* Why switch */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Why people switch</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Drag-and-drop stops working at 500 files.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              Dropzone users reach FileMayor when the scope of the problem outgrows
              the tool. Sorting individual files into droplets is fine for a daily
              inbox. It does not work for the project archive that has been growing
              for three years.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Describe the goal in plain English — no droplets, no rules to write, no per-folder configuration.',
                'Process an entire directory tree in one session, with every move journaled and reversible.',
                'Use the same workflow on macOS, Windows, and Linux — or pipe the JSON output into any script.',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[15.5px] text-text-2">
                  <span className="mt-0.5 shrink-0 font-mono text-accent">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CLI demo */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">See it in action</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              One command. Thousands of files. Full rollback.
            </h2>
            <pre className="mt-8 overflow-x-auto rounded-2xl border border-border bg-surface p-6 font-mono text-[13px] leading-relaxed text-text-2">
              <code>{`$ filemayor scan ~/Desktop --sort

  Scanned 1,204 files in 0.8s

  ◆ Diagnosis
    • 1,204 files in a flat root dump (no folder structure)
    • 3 file types dominant: PDFs (34%), images (29%), code (18%)
    • 87 duplicates by content hash

  ◆ Proposed cure
    [1] Sort into subfolders: PDFs/ Images/ Code/ Archives/ Other/
    [2] Deduplicate 87 files → saves 340 MB
    [3] Move 156 stale files (12+ months) to _archive/

  Apply? [y/N] y

  ✓ 1,204 operations journaled. Run \`filemayor undo --all\` to reverse.`}</code>
            </pre>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Common questions</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              FileMayor vs Dropzone — FAQ.
            </h2>
            <dl className="mt-10 divide-y divide-border">
              {faqSchema.mainEntity.map((q) => (
                <div key={q.name} className="py-6">
                  <dt className="text-[15.5px] font-medium text-text">{q.name}</dt>
                  <dd className="mt-3 text-[15px] leading-relaxed text-text-2">{q.acceptedAnswer.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA + Also compare */}
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

            <div className="mt-16 border-t border-border pt-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">Also compare</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {alsoCompare.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent"
                  >
                    <p className="text-[14px] font-medium text-text transition-colors group-hover:text-accent">{c.label}</p>
                    <p className="mt-1.5 text-[13px] leading-snug text-text-3">{c.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
