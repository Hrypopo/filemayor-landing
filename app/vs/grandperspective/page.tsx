import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FileMayor vs GrandPerspective — 2025 Comparison',
  description:
    'GrandPerspective shows you where your disk space went. FileMayor shows you — then fixes it, with AI planning and full rollback. Honest comparison — features, pricing, when to use each.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is FileMayor better than GrandPerspective?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'They do different jobs. GrandPerspective visualises disk usage as a treemap — it is excellent for understanding where your space went. FileMayor acts on that information: it scans a folder, proposes a structured cure (archive stale files, deduplicate, reorganise), and applies it with full rollback. GrandPerspective is a diagnostic. FileMayor is the treatment. Many people use both.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can FileMayor show disk usage like GrandPerspective?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FileMayor surfaces disk usage in its diagnosis step — it reports total size, largest files, and wasted space from duplicates — but does not produce a treemap visualisation. If a visual treemap is what you need, GrandPerspective does it better. If you want to act on what you find, FileMayor is the right tool.',
      },
    },
    {
      '@type': 'Question',
      name: 'What can FileMayor do that GrandPerspective cannot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FileMayor takes action. It can move, rename, archive, and deduplicate files. GrandPerspective only shows. Beyond that: FileMayor runs on Windows and Linux (GrandPerspective is macOS-only), exposes a full CLI, detects duplicate files by content hash (not just size), and logs every operation for full rollback.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need both GrandPerspective and FileMayor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Possibly, but often no. FileMayor\'s diagnosis step covers the same insight GrandPerspective provides — what is taking space, what is old, what is duplicated. If you only want a quick visual overview without taking action, GrandPerspective is free and fast. If you want to actually clean up, FileMayor handles discovery and action in one session.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is GrandPerspective still a good tool in 2025?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, for its specific purpose. GrandPerspective has been maintained since 2005 and the treemap is a genuinely useful way to see disk layout at a glance. It is free (donation-ware). It does not take action on files, and it is macOS-only — but for pure disk visualisation, it remains a strong choice.',
      },
    },
  ],
};

const matrix = [
  { row: 'Platforms', fm: 'macOS · Windows · Linux · CLI · PWA', gp: 'macOS only' },
  { row: 'Pricing', fm: 'Free · Pro $19/mo · Team $99/mo', gp: 'Free (donation-ware)' },
  { row: 'Primary function', fm: 'Filesystem diagnosis + AI-planned organisation + rollback', gp: 'Disk space visualisation (treemap)' },
  { row: 'Takes action', fm: '✓ Move, rename, delete, organise', gp: '✗ Visualise only' },
  { row: 'AI planning', fm: '✓ Curative Triad — explain → cure → apply', gp: '✗' },
  { row: 'Rollback', fm: '✓ Full session journal · undo --all', gp: 'N/A — no actions taken' },
  { row: 'Duplicate detection', fm: '✓ Content-hash deduplication', gp: '✗' },
  { row: 'CLI access', fm: '✓ 14 commands, --json everywhere', gp: '✗' },
  { row: 'Disk visualisation', fm: 'Text diagnosis (size, age, duplicates)', gp: '✓ Interactive treemap' },
  { row: 'Watch mode', fm: '✓ Yes (Pro) — real-time folder monitoring', gp: '✗' },
  { row: 'Best for', fm: 'Finding the problem and fixing it, safely', gp: 'Understanding where disk space is consumed' },
];

const alsoCompare = [
  { href: '/vs/cleanmymac', label: 'FileMayor vs CleanMyMac', desc: 'System junk removal vs user filesystem organisation.' },
  { href: '/vs/hazel', label: 'FileMayor vs Hazel', desc: 'AI intent vs rules engine. Cross-platform vs Mac-only.' },
  { href: '/vs/dropzone', label: 'FileMayor vs Dropzone 4', desc: 'Bulk AI curation vs one-shot drag-and-drop routing.' },
];

export default function VsGrandPerspective() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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

        {/* When GrandPerspective is right */}
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

        {/* When FileMayor is right */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When FileMayor is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              You want to fix it, not just see it.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              FileMayor starts where GrandPerspective ends. Once FileMayor scans a
              directory, it does not just show you a chart — it explains what it found
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

        {/* Why switch */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Why people switch</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              You found the problem. Now fix it.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              The typical path: open GrandPerspective, see a 40 GB block labelled
              &quot;Downloads&quot;, close it, and do nothing — because manually sorting
              thousands of files is worse than the original problem. FileMayor collapses
              that gap. Scan, read the diagnosis, approve the plan, done.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'No manual file-by-file decisions — FileMayor proposes a complete plan you approve in one step.',
                'Duplicate detection by content hash catches exact copies that different filenames hide from a treemap.',
                'Runs on Windows and Linux — the same workflow wherever your files are.',
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
              Diagnosis and cure in one session.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              GrandPerspective showed you that 40 GB block. Here is what FileMayor does with it.
            </p>
            <pre className="mt-8 overflow-x-auto rounded-2xl border border-border bg-surface p-6 font-mono text-[13px] leading-relaxed text-text-2">
              <code>{`$ filemayor scan ~/Downloads --top 10

  Scanned 5,120 files · 38.7 GB

  ◆ Top space consumers
    1.  Videos/       12.4 GB  (32%)  — 847 files
    2.  Installers/    8.1 GB  (21%)  — 203 .dmg / .pkg / .exe
    3.  Duplicates     6.2 GB  (16%)  — 1,041 duplicate file pairs

  ◆ Proposed cure
    [1] Archive 203 old installers to _archive/installers/ → saves 8.1 GB
    [2] Deduplicate 1,041 pairs, keep newest → saves 6.2 GB
    [3] Move 847 videos to ~/Movies/Downloads/

  Estimated reclaim: 14.3 GB

  Apply? [y/N] y

  ✓ 2,091 operations journaled. Run \`filemayor undo --all\` to reverse.`}</code>
            </pre>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Common questions</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              FileMayor vs GrandPerspective — FAQ.
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
