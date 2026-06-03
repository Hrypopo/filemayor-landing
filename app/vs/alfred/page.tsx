import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FileMayor vs Alfred — 2025 Comparison',
  description:
    'Alfred is a Mac launcher with workflows. FileMayor is a cross-platform filesystem organiser with AI planning and full rollback. Honest comparison — features, pricing, when to use each.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is FileMayor an alternative to Alfred?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Only partially. Alfred is a launcher and productivity layer — it finds files, launches apps, and runs custom workflows triggered by keystrokes. FileMayor is a dedicated filesystem organiser — it scans folders, plans bulk reorganisation with AI, and applies it with rollback. They overlap on "find and act on files" but solve different core problems. Many users run both.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Alfred organise files like FileMayor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Alfred can move or rename individual files via its File Actions and custom workflows, and power users build workflows that sort files. But it has no bulk-planning engine, no AI diagnosis, and no rollback journal. For organising thousands of files in one reversible session, FileMayor is purpose-built; Alfred is not.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does FileMayor work on Windows and Linux like a launcher?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FileMayor runs on macOS, Windows, and Linux, plus a PWA and CLI — Alfred is macOS-only. FileMayor is not a launcher, though: it has a command bar focused on filesystem operations, not app launching or system-wide hotkey workflows.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use Alfred or FileMayor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use Alfred for fast launching, clipboard history, snippets, and keystroke-triggered workflows. Use FileMayor when a folder needs real reorganisation — bulk sorting, deduplication, archiving — with an AI-generated plan and a full undo. They are complementary, not competing.',
      },
    },
  ],
};

const matrix = [
  { row: 'Platforms', fm: 'macOS · Windows · Linux · CLI · PWA', al: 'macOS only' },
  { row: 'Pricing', fm: 'Free · Pro $19/mo · Team $99/mo', al: 'Free · Powerpack £34 one-time / £59 lifetime' },
  { row: 'Primary function', fm: 'Filesystem organisation, bulk ops, AI planning', al: 'App launcher, search, clipboard, custom workflows' },
  { row: 'Bulk file organisation', fm: '✓ Thousands of files, AI-curated', al: '△ Workflow scripts only, no planning engine' },
  { row: 'AI planning', fm: '✓ Curative Triad — explain → cure → apply', al: '✗' },
  { row: 'Rollback', fm: '✓ Full session journal · undo --all', al: '✗' },
  { row: 'App launching / search', fm: '✗ Filesystem command bar only', al: '✓ Core feature' },
  { row: 'CLI access', fm: '✓ 14 commands, --json everywhere', al: 'Via workflows / shell scripts' },
  { row: 'MCP / AI tool integration', fm: '✓ Claude Desktop, Cursor, Zed', al: '✗' },
  { row: 'Best for', fm: 'Organising and curating folders at scale, safely', al: 'Launching, searching, and keystroke automation' },
];

const alsoCompare = [
  { href: '/vs/hazel', label: 'FileMayor vs Hazel', desc: 'AI intent vs rules engine. Cross-platform vs Mac-only.' },
  { href: '/vs/forklift', label: 'FileMayor vs ForkLift', desc: 'AI bulk organisation vs manual dual-pane management.' },
  { href: '/vs/cleanmymac', label: 'FileMayor vs CleanMyMac', desc: 'System junk removal vs filesystem organisation.' },
];

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://filemayor.com' },
    { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://filemayor.com/vs' },
    { '@type': 'ListItem', position: 3, name: 'Alfred vs FileMayor', item: 'https://filemayor.com/vs/alfred' },
  ],
};

export default function VsAlfred() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Nav />
      <main id="main">

        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <Link href="/vs" className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3 transition-colors hover:text-accent">
              ← All comparisons
            </Link>
            <div className="section-label mt-8">Compare</div>
            <h1 className="h-display text-[clamp(40px,6vw,80px)]">
              FileMayor <span className="text-text-3">vs</span> Alfred.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-2 md:text-xl">
              Alfred is the reference Mac launcher — search, clipboard history, snippets,
              and a deep workflow system that power users love. FileMayor is not a launcher.
              It is a filesystem organiser: it scans a folder, plans a reorganisation with
              AI, and applies it with a full undo. The overlap is small, and the two work
              well side by side.
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
                    <th className="w-3/8 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-2">Alfred</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((m, i) => (
                    <tr key={m.row} className={i < matrix.length - 1 ? 'border-b border-border' : ''}>
                      <th scope="row" className="bg-surface px-5 py-4 font-mono text-[12px] uppercase tracking-[0.12em] text-text-3">{m.row}</th>
                      <td className="px-5 py-4 align-top text-text">{m.fm}</td>
                      <td className="px-5 py-4 align-top text-text-2">{m.al}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When Alfred is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Speed at the keyboard.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              If you want to launch apps, search files, manage a clipboard history, expand
              snippets, and trigger custom automations without lifting your hands from the
              keyboard, Alfred is exceptional. The Powerpack workflow system is one of the
              most powerful automation environments on macOS, and the one-time price is
              fair. Nothing here replaces that.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When FileMayor is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              When finding the file is not the problem.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              Alfred helps you find and open one file fast. FileMayor helps when the
              problem is structural: a Downloads folder with thousands of files, duplicates
              scattered across drives, a project tree that needs flattening. You could build
              an Alfred workflow to nibble at this — but there is no planning engine, no AI
              diagnosis, and no rollback if the script does the wrong thing.
            </p>
            <p className="mt-4 text-[16.5px] leading-relaxed text-text-2">
              FileMayor scans the whole tree, explains what it found, proposes a structured
              cure, and applies it in one journaled session that{' '}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">undo --all</code>{' '}
              can reverse completely.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Why people add FileMayor</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Workflows scale to one file. Not to ten thousand.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              Alfred power users come to FileMayor when they realise they have been
              hand-building file-sorting workflows that a planning engine should handle —
              and that those workflows have no undo.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Describe the goal in plain English instead of scripting a workflow per file type.',
                'Process an entire directory tree in one reversible session — every move journaled.',
                'Run the same workflow on Windows and Linux, or pipe JSON output into any automation.',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[15.5px] text-text-2">
                  <span className="mt-0.5 shrink-0 font-mono text-accent">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">See it in action</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              No workflow to build. Just describe it.
            </h2>
            <pre className="mt-8 overflow-x-auto rounded-2xl border border-border bg-surface p-6 font-mono text-[13px] leading-relaxed text-text-2">
              <code>{`$ filemayor cure ~/Downloads "sort by type, dedupe, archive anything older than a year"

  Scanned 3,847 files in 1.4s

  ◆ Plan
    [1] Sort 2,545 files into PDFs/ Images/ Code/ Archives/ Other/
    [2] Deduplicate 412 files, keep newest → saves 2.1 GB
    [3] Archive 890 files (12+ months) to _archive/2024/

  Apply? [y/N] y

  ✓ 3,847 operations journaled. Run \`filemayor undo --all\` to reverse.`}</code>
            </pre>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Common questions</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              FileMayor vs Alfred — FAQ.
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

        <section className="py-16 md:py-20">
          <div className="container-prose max-w-3xl">
            <div className="section-label">The short answer</div>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              Alfred to move fast at the keyboard. FileMayor to reorganise folders at scale,
              safely. They do not compete — they cover different jobs.
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
                  <Link key={c.href} href={c.href} className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent">
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
