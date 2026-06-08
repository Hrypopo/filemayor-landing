import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FileMayor vs ForkLift — 2025 Comparison',
  description:
    'ForkLift is a dual-pane Mac file manager and remote client. FileMayor is a cross-platform AI-planned filesystem organiser with rollback. Honest comparison — features, pricing, when to use each.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is FileMayor an alternative to ForkLift?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For bulk organisation, yes. ForkLift is a dual-pane file manager and remote (FTP/SFTP/S3/cloud) client — it excels at manual navigation, transfers, and remote connections. FileMayor automates the organising itself: it scans a folder, plans a reorganisation with AI, and applies it with rollback. If your work is manual transfer and browsing, ForkLift wins; if it is bulk reorganisation, FileMayor does.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does FileMayor connect to remote servers like ForkLift?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. FileMayor works on local and mounted filesystems. ForkLift\'s strength is remote connectivity — SFTP, WebDAV, S3, Backblaze, and cloud mounts. If you need to manage remote servers directly, ForkLift is the right tool. FileMayor focuses on intelligently reorganising the files you already have locally.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does FileMayor work on Windows and Linux?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — macOS, Windows, Linux, plus a CLI and PWA. ForkLift is macOS-only. If you manage files across operating systems, FileMayor gives you one consistent workflow everywhere.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between FileMayor and ForkLift?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ForkLift is a manual tool: you drive every move with two panes and your mouse or keyboard. FileMayor is an automated one: you describe intent, it generates a plan, you approve, and it executes thousands of operations in a single reversible session. ForkLift moves files where you point; FileMayor decides where they should go and does it for you.',
      },
    },
  ],
};

const matrix = [
  { row: 'Platforms', fm: 'macOS · Windows · Linux · CLI · PWA', fl: 'macOS only' },
  { row: 'Pricing', fm: 'Free', fl: '$19.95 one-time (or Setapp)' },
  { row: 'Primary function', fm: 'AI-planned bulk organisation + rollback', fl: 'Dual-pane file manager + remote client' },
  { row: 'Bulk organisation', fm: '✓ Thousands of files, AI-curated', fl: '△ Manual — you drive every move' },
  { row: 'AI planning', fm: '✓ Curative Triad — explain → cure → apply', fl: '✗' },
  { row: 'Rollback', fm: '✓ Full session journal · undo --all', fl: '✗' },
  { row: 'Remote connections', fm: '✗ Local / mounted only', fl: '✓ SFTP, WebDAV, S3, cloud mounts' },
  { row: 'Duplicate detection', fm: '✓ Content-hash deduplication', fl: '△ Has a dedicated dupe finder' },
  { row: 'CLI access', fm: '✓ 14 commands, --json everywhere', fl: '✗' },
  { row: 'MCP / AI tool integration', fm: '✓ Claude Desktop, Cursor, Zed', fl: '✗' },
  { row: 'Best for', fm: 'Organising and curating folders at scale, safely', fl: 'Manual file management and remote transfers' },
];

const alsoCompare = [
  { href: '/vs/marta', label: 'FileMayor vs Marta', desc: 'AI bulk organisation vs keyboard dual-pane navigation.' },
  { href: '/vs/alfred', label: 'FileMayor vs Alfred', desc: 'Filesystem planning vs launcher and workflows.' },
  { href: '/vs/hazel', label: 'FileMayor vs Hazel', desc: 'AI intent vs rules engine. Cross-platform vs Mac-only.' },
];

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://filemayor.com' },
    { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://filemayor.com/vs' },
    { '@type': 'ListItem', position: 3, name: 'ForkLift vs FileMayor', item: 'https://filemayor.com/vs/forklift' },
  ],
};

export default function VsForkLift() {
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
              FileMayor <span className="text-text-3">vs</span> ForkLift.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-2 md:text-xl">
              ForkLift is a polished dual-pane file manager with first-class remote support —
              SFTP, S3, WebDAV, cloud mounts. It is built for people who move files manually
              and connect to servers. FileMayor is built for the opposite: it decides how a
              folder should be organised, plans it with AI, and applies it with a full undo.
              One is a manual cockpit; the other is an autopilot.
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
                    <th className="w-3/8 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-2">ForkLift</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((m, i) => (
                    <tr key={m.row} className={i < matrix.length - 1 ? 'border-b border-border' : ''}>
                      <th scope="row" className="bg-surface px-5 py-4 font-mono text-[12px] uppercase tracking-[0.12em] text-text-3">{m.row}</th>
                      <td className="px-5 py-4 align-top text-text">{m.fm}</td>
                      <td className="px-5 py-4 align-top text-text-2">{m.fl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When ForkLift is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Manual control and remote servers.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              If you live in a dual-pane layout, drag files between local and remote
              locations, sync to an S3 bucket, or mount a WebDAV share as a drive,
              ForkLift is excellent and well worth its one-time price. Its remote
              connectivity is genuinely best-in-class on macOS — FileMayor does not
              attempt to compete there.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">When FileMayor is the right call</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              When you do not want to drive every move.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              A dual-pane manager is precise — and slow when the job is large. Reorganising
              thousands of files by hand, even with two panes and good keyboard shortcuts,
              is hours of work. FileMayor collapses that into one command: it diagnoses the
              folder, proposes a structured plan, and executes it once you approve, with
              every operation journaled.
            </p>
            <p className="mt-4 text-[16.5px] leading-relaxed text-text-2">
              And it runs on Windows and Linux, exposes a full CLI, and integrates with AI
              assistants via MCP — none of which ForkLift offers.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Why people switch</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Two panes do not scale to a real cleanup.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              ForkLift users reach FileMayor when the manual approach stops being worth it —
              when the folder is too big, the moves too repetitive, and a single mistake
              has no undo.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Describe the goal once — FileMayor plans the whole reorganisation, no manual dragging.',
                'Every operation is reversible — ForkLift has no session-level undo for batched moves.',
                'Cross-platform and scriptable — the same workflow on macOS, Windows, and Linux.',
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
              One command instead of an hour of dragging.
            </h2>
            <pre className="mt-8 overflow-x-auto rounded-2xl border border-border bg-surface p-6 font-mono text-[13px] leading-relaxed text-text-2">
              <code>{`$ filemayor scan ~/Projects/exports --dedupe --sort

  Scanned 6,210 files · 24.8 GB

  ◆ Diagnosis
    • 1,880 duplicate files (9.4 GB recoverable)
    • Flat dump — no folder structure
    • Mixed types: renders, source, archives

  ◆ Proposed cure
    [1] Deduplicate 1,880 files, keep newest → saves 9.4 GB
    [2] Sort remaining into Renders/ Source/ Archives/
    [3] Move 240 stale files (12+ months) to _archive/

  Apply? [y/N] y

  ✓ 4,330 operations journaled. Run \`filemayor undo --all\` to reverse.`}</code>
            </pre>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Common questions</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              FileMayor vs ForkLift — FAQ.
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
              ForkLift for manual management and remote transfers. FileMayor for automated,
              reversible bulk organisation. Many people keep both.
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
