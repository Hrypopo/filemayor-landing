import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FileMayor vs Marta — 2025 Comparison',
  description:
    'Marta is a fast keyboard-driven dual-pane Mac file manager. FileMayor is a cross-platform AI-planned filesystem organiser with rollback. Honest comparison — features, pricing, when to use each.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is FileMayor an alternative to Marta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'They solve different problems. Marta is a fast, keyboard-driven dual-pane file manager in the Norton Commander tradition — built for navigating and manipulating files quickly by hand. FileMayor automates organisation: it scans a folder, plans a reorganisation with AI, and applies it with rollback. Marta is for manual control; FileMayor is for bulk automation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does FileMayor have a dual-pane interface like Marta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. FileMayor uses a command bar and plan-review model, not a dual-pane navigator. If you specifically want a fast keyboard-driven two-pane file manager, Marta is excellent and free. FileMayor is the right tool when you want the organising done for you rather than driving each move yourself.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Marta or FileMayor better for organising a messy folder?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a large messy folder, FileMayor. Marta lets you move and rename files quickly, but you still decide and execute every action. FileMayor diagnoses the folder, proposes a complete plan (sort, dedupe, archive), and applies it in one reversible session. For surgical manual edits, Marta is faster; for bulk cleanup, FileMayor is.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does FileMayor work on Windows and Linux?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — macOS, Windows, Linux, plus a CLI and PWA. Marta is macOS-only. If you want one consistent organising workflow across operating systems, FileMayor provides it; Marta does not.',
      },
    },
  ],
};

const matrix = [
  { row: 'Platforms', fm: 'macOS · Windows · Linux · CLI · PWA', ma: 'macOS only' },
  { row: 'Pricing', fm: 'Free', ma: 'Free (Pro tier for some features)' },
  { row: 'Primary function', fm: 'AI-planned bulk organisation + rollback', ma: 'Keyboard-driven dual-pane file manager' },
  { row: 'Bulk organisation', fm: '✓ Thousands of files, AI-curated', ma: '△ Manual — you drive every move' },
  { row: 'AI planning', fm: '✓ Curative Triad — explain → cure → apply', ma: '✗' },
  { row: 'Rollback', fm: '✓ Full session journal · undo --all', ma: '✗' },
  { row: 'Interface', fm: 'Command bar + plan review', ma: '✓ Fast dual-pane, fully keyboard-driven' },
  { row: 'Duplicate detection', fm: '✓ Content-hash deduplication', ma: '✗' },
  { row: 'CLI access', fm: '✓ 14 commands, --json everywhere', ma: 'Scriptable via config / VFS' },
  { row: 'MCP / AI tool integration', fm: '✓ Claude Desktop, Cursor, Zed', ma: '✗' },
  { row: 'Best for', fm: 'Organising and curating folders at scale, safely', ma: 'Fast manual navigation and file manipulation' },
];

const alsoCompare = [
  { href: '/vs/forklift', label: 'FileMayor vs ForkLift', desc: 'AI bulk organisation vs dual-pane + remote transfers.' },
  { href: '/vs/alfred', label: 'FileMayor vs Alfred', desc: 'Filesystem planning vs launcher and workflows.' },
  { href: '/vs/grandperspective', label: 'FileMayor vs GrandPerspective', desc: 'One shows the problem. The other fixes it.' },
];

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://filemayor.com' },
    { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://filemayor.com/vs' },
    { '@type': 'ListItem', position: 3, name: 'Marta vs FileMayor', item: 'https://filemayor.com/vs/marta' },
  ],
};

export default function VsMarta() {
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
              FileMayor <span className="text-text-3">vs</span> Marta.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-2 md:text-xl">
              Marta is a fast, elegant dual-pane file manager for macOS — keyboard-driven,
              in the Norton Commander tradition, and beloved by people who want to fly
              through their filesystem by hand. FileMayor takes the opposite stance: rather
              than helping you move files faster, it figures out how a folder should be
              organised and does it for you, reversibly.
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
                    <th className="w-3/8 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-2">Marta</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((m, i) => (
                    <tr key={m.row} className={i < matrix.length - 1 ? 'border-b border-border' : ''}>
                      <th scope="row" className="bg-surface px-5 py-4 font-mono text-[12px] uppercase tracking-[0.12em] text-text-3">{m.row}</th>
                      <td className="px-5 py-4 align-top text-text">{m.fm}</td>
                      <td className="px-5 py-4 align-top text-text-2">{m.ma}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When Marta is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Flying through files by hand.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              If you want a fast, keyboard-first dual-pane manager — jump between folders,
              compare two locations, move and rename with muscle memory — Marta is a joy
              and it is free. For surgical, hands-on file work it is faster than any
              plan-and-approve tool, FileMayor included. That niche belongs to Marta.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When FileMayor is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              When the folder is too big to drive by hand.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              A dual-pane manager is precise but manual — every move is a decision you make
              and execute. That is fine for ten files and exhausting for ten thousand.
              FileMayor scans the whole tree, explains what it found, proposes a structured
              cure, and applies it in a single journaled session that{' '}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">undo --all</code>{' '}
              can reverse completely.
            </p>
            <p className="mt-4 text-[16.5px] leading-relaxed text-text-2">
              It also detects content-level duplicates, runs on Windows and Linux, and
              integrates with AI assistants via MCP — capabilities outside Marta&apos;s scope.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Why people add FileMayor</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Manual is precise. It is also slow at scale.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              Marta users add FileMayor for the jobs that are not worth doing by hand —
              the quarterly cleanup, the duplicate sweep, the archive of everything older
              than a year — where a planning engine and an undo journal beat raw speed.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Describe the goal once — FileMayor plans the entire reorganisation for you.',
                'Every operation is reversible — Marta has no session-level undo for batched moves.',
                'Content-hash dedupe and cross-platform support — beyond a dual-pane navigator’s scope.',
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
              The cleanup you keep putting off, in one command.
            </h2>
            <pre className="mt-8 overflow-x-auto rounded-2xl border border-border bg-surface p-6 font-mono text-[13px] leading-relaxed text-text-2">
              <code>{`$ filemayor scan ~/Documents --dedupe

  Scanned 9,540 files · 31.2 GB

  ◆ Diagnosis
    • 2,140 duplicate files (7.8 GB recoverable)
    • 3,300 files unmodified for 12+ months
    • Deeply nested folders (up to 11 levels)

  ◆ Proposed cure
    [1] Deduplicate 2,140 files, keep newest → saves 7.8 GB
    [2] Archive 3,300 stale files to _archive/
    [3] Flatten nesting deeper than 4 levels

  Apply? [y/N] y

  ✓ 5,440 operations journaled. Run \`filemayor undo --all\` to reverse.`}</code>
            </pre>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Common questions</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              FileMayor vs Marta — FAQ.
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
              Marta for fast manual navigation. FileMayor for automated, reversible bulk
              organisation. They cover different jobs — keep both.
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
