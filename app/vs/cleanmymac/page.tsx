import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FileMayor vs CleanMyMac X — 2025 Comparison',
  description:
    'CleanMyMac X cleans system junk. FileMayor organises your filesystem with AI planning and full rollback. Compare features, pricing, and when to use each.',
  alternates: { canonical: '/vs/cleanmymac' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is FileMayor better than CleanMyMac X?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'They solve different problems. CleanMyMac X removes system junk, app remnants, and macOS clutter. FileMayor organises your working folders — Downloads, project directories, media libraries — with AI-planned bulk operations and a full undo journal. Most people benefit from both, not one or the other.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can FileMayor replace CleanMyMac?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, and it is not trying to. CleanMyMac handles system caches, malware scans, and app uninstallation — none of which FileMayor touches. FileMayor focuses entirely on organising your user filesystem. Run CleanMyMac monthly for system hygiene; use FileMayor whenever a folder needs structure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does FileMayor remove system junk or caches?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. FileMayor never touches system directories, app caches, or macOS internals. Its scope is your user filesystem: the folders you create and manage. The Chevza Doctrine — FileMayor\'s six-layer safety architecture — explicitly prohibits operations on protected system paths.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is FileMayor free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. FileMayor is completely free with no time limit. CleanMyMac X starts at $39.95/year with no free tier (trial only).',
      },
    },
    {
      '@type': 'Question',
      name: 'Does FileMayor work on Windows and Linux?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — macOS, Windows, Linux, and a PWA. CleanMyMac X is macOS-focused (Windows version has limited features). If your team spans operating systems, FileMayor gives a consistent CLI and MCP interface everywhere.',
      },
    },
  ],
};

const matrix = [
  { row: 'Platforms', fm: 'macOS · Windows · Linux · CLI · PWA', cmm: 'macOS · Windows (limited)' },
  { row: 'Pricing', fm: 'Free', cmm: '$39.95/yr or $9.99/mo (MacPaw)' },
  { row: 'Primary function', fm: 'Filesystem organisation, bulk ops, AI planning', cmm: 'System junk removal, app uninstaller, malware scan' },
  { row: 'AI planning', fm: '✓ Curative Triad — explain → cure → apply', cmm: '✗' },
  { row: 'Rollback', fm: '✓ Full session journal · undo --all', cmm: '✗ No undo for cleaned files' },
  { row: 'File organisation', fm: '✓ Sort, move, rename, dedupe at scale', cmm: '△ Limited — focuses on system files, not user folders' },
  { row: 'CLI access', fm: '✓ 15 commands, --json everywhere', cmm: '✗' },
  { row: 'MCP / AI tool integration', fm: '✓ Claude Desktop, Cursor, Zed', cmm: '✗' },
  { row: 'Safety architecture', fm: 'Chevza Doctrine — 6-layer hardened runtime', cmm: 'Standard app sandboxing' },
  { row: 'Telemetry', fm: '✓ None', cmm: 'Usage analytics (opt-out available)' },
  { row: 'Best for', fm: 'Organising folders, managing projects, AI-driven curation', cmm: 'Freeing disk space, removing app leftovers, quick system scan' },
];

const alsoCompare = [
  { href: '/vs/hazel', label: 'FileMayor vs Hazel', desc: 'AI intent vs rules engine. Cross-platform vs Mac-only.' },
  { href: '/vs/grandperspective', label: 'FileMayor vs GrandPerspective', desc: 'One shows the problem. The other fixes it.' },
  { href: '/vs/dropzone', label: 'FileMayor vs Dropzone 4', desc: 'Bulk AI curation vs one-shot drag-and-drop routing.' },
];

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://filemayor.com' },
    { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://filemayor.com/vs' },
    { '@type': 'ListItem', position: 3, name: 'CleanMyMac vs FileMayor', item: 'https://filemayor.com/vs/cleanmymac' },
  ],
};

export default function VsCleanMyMac() {
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

        {/* When CleanMyMac is right */}
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

        {/* When FileMayor is right */}
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

        {/* Why switch */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Why people add FileMayor</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              CleanMyMac tidied the system. The folders are still a mess.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              CleanMyMac users often reach FileMayor the same way: the system is clean,
              the app is happy, but the Downloads folder still has 3,000 files and no
              structure. CleanMyMac cannot help there — and it should not try. That is
              what FileMayor is for.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'No guesswork — FileMayor explains every proposed change before touching a file.',
                'Any mistake is undoable — the full session journal means undo --all is always available.',
                'Works where you work — macOS, Windows, Linux, and inside your AI assistant via MCP.',
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
              From chaos to structure in one session.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              CleanMyMac freed 4 GB from caches. Now FileMayor handles the Downloads folder
              that has been accumulating for two years.
            </p>
            <pre className="mt-8 overflow-x-auto rounded-2xl border border-border bg-surface p-6 font-mono text-[13px] leading-relaxed text-text-2">
              <code>{`$ filemayor scan ~/Downloads

  Scanned 3,847 files in 1.4s

  ◆ Diagnosis
    • 412 duplicate files (2.1 GB recoverable)
    • 890 files unmodified for 18+ months → archive candidates
    • 1,204 files with no folder structure (flat root dump)
    • 23 broken symlinks

  ◆ Proposed cure
    [1] Archive 890 stale files to ~/Downloads/_archive/2023/
    [2] Deduplicate 412 files, keeping newest → saves 2.1 GB
    [3] Sort remaining 2,545 files by type into subfolders
    [4] Remove 23 broken symlinks

  Apply? [y/N] y

  ✓ 3,847 operations journaled. Run \`filemayor undo --all\` to reverse.`}</code>
            </pre>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Common questions</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              FileMayor vs CleanMyMac — FAQ.
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
