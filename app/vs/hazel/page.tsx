import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FileMayor vs Hazel — 2025 Comparison',
  description:
    'Hazel is a respected Mac rules engine. FileMayor is a cross-platform AI-planned filesystem tool with full rollback. Honest comparison — features, pricing, when to use each.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is FileMayor better than Hazel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'They have different philosophies. Hazel is a mature Mac rules engine — you define explicit IF/THEN conditions per folder and it acts automatically. FileMayor takes a different approach: describe your intent in plain English, receive an AI-generated plan, approve it, and apply it with full rollback. Neither is universally better; the right choice depends on whether you want rules or intent, and whether you need cross-platform support.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does FileMayor work on Windows and Linux?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. FileMayor runs on macOS, Windows, Linux, and as a PWA. Hazel is macOS-only. If your team spans operating systems or you manage files across machines, FileMayor provides a consistent CLI and MCP interface everywhere.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can FileMayor replace Hazel for folder watching?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, for most use cases. FileMayor includes watch mode — it monitors specified folders and applies configured rules whenever new files arrive. Unlike Hazel\'s rules engine, FileMayor\'s watch mode logs every action and supports undo. For complex, condition-heavy automation on macOS with AppleScript integration, Hazel\'s rules engine is more powerful.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the main difference between FileMayor and Hazel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Intent model. Hazel requires you to write explicit IF/THEN rules for each folder and condition. FileMayor lets you describe what you want ("archive files older than 6 months, deduplicate the rest") and generates a plan from that intent. FileMayor also adds a review step before applying anything, and logs every operation for rollback — safety guarantees Hazel does not provide.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use FileMayor and Hazel together?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. They do not conflict. A common pattern: Hazel governs a watched inbox folder with precise rules (rename downloads by date, move invoices to Dropbox), while FileMayor handles the larger periodic organisation sessions — quarterly cleanup, project archiving, deduplication across drives. Many users run both side by side.',
      },
    },
  ],
};

const matrix = [
  { row: 'Platforms', fm: 'macOS · Windows · Linux · CLI · PWA', hz: 'macOS only' },
  { row: 'Pricing', fm: 'Free', hz: '$42 one-time' },
  { row: 'Interaction model', fm: 'Describe intent → AI plans → approve → apply → undo', hz: 'Write IF/THEN rules per folder' },
  { row: 'AI planning', fm: '✓ Curative Triad — explain → cure → apply', hz: '✗' },
  { row: 'Rollback', fm: '✓ Full session journal · undo --all', hz: '✗ No native undo for batched moves' },
  { row: 'Watch mode', fm: '✓ Yes — free', hz: '✓ Yes — core feature' },
  { row: 'AppleScript integration', fm: '✗', hz: '✓ Yes — full macOS automation' },
  { row: 'CLI access', fm: '✓ 14 commands, --json everywhere', hz: 'Shell scripts via rules only' },
  { row: 'MCP / AI tool integration', fm: '✓ Claude Desktop, Cursor, Zed', hz: '✗' },
  { row: 'Telemetry', fm: '✓ None', hz: '✓ None' },
  { row: 'Best for', fm: 'AI-planned ops on any OS, with safety + rollback', hz: 'Mac power users who want precise explicit rules' },
];

const alsoCompare = [
  { href: '/vs/cleanmymac', label: 'FileMayor vs CleanMyMac', desc: 'System junk removal vs user filesystem organisation.' },
  { href: '/vs/dropzone', label: 'FileMayor vs Dropzone 4', desc: 'Bulk AI curation vs one-shot drag-and-drop routing.' },
  { href: '/vs/grandperspective', label: 'FileMayor vs GrandPerspective', desc: 'One shows the problem. The other fixes it.' },
];

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://filemayor.com' },
    { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://filemayor.com/vs' },
    { '@type': 'ListItem', position: 3, name: 'Hazel vs FileMayor', item: 'https://filemayor.com/vs/hazel' },
  ],
};

export default function VsHazel() {
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
                    <th className="w-3/8 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-2">Hazel</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((m, i) => (
                    <tr key={m.row} className={i < matrix.length - 1 ? 'border-b border-border' : ''}>
                      <th scope="row" className="bg-surface px-5 py-4 font-mono text-[12px] uppercase tracking-[0.12em] text-text-3">{m.row}</th>
                      <td className="px-5 py-4 align-top text-text">{m.fm}</td>
                      <td className="px-5 py-4 align-top text-text-2">{m.hz}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* When Hazel is right */}
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

        {/* When FileMayor is right */}
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
              The Curative Triad —{' '}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">explain → cure → apply</code>
              {' '}— separates planning from execution by design. The Chevza Doctrine ensures
              that even when an AI proposes a destructive plan, six layers of safety
              architecture sit between the proposal and your filesystem.
            </p>
          </div>
        </section>

        {/* Why switch */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Why people switch</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Rules are great. Until you have to maintain them.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              Hazel users come to FileMayor when the rules library grows unwieldy, when
              a new machine is Windows or Linux, or when they want AI to handle the
              decisions rather than pre-specifying every condition. The two tools
              complement each other well for power users who want both.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'No per-folder rule configuration — describe the goal once, FileMayor generates the plan.',
                'Works identically on macOS, Windows, and Linux — one CLI, one workflow, any machine.',
                'Every operation is logged and reversible — Hazel has no equivalent undo for batched moves.',
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
              Continuous watching — no rules to write.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              FileMayor watches a folder and applies a consistent policy to every
              new file that arrives — with a full audit log.
            </p>
            <pre className="mt-8 overflow-x-auto rounded-2xl border border-border bg-surface p-6 font-mono text-[13px] leading-relaxed text-text-2">
              <code>{`$ filemayor watch ~/Downloads --policy "sort by type, archive if older than 90 days"

  ◆ Watch mode active on ~/Downloads
    Policy: sort by type · archive after 90 days
    Journal: ~/.filemayor/journal/downloads.log

  [10:14:02] NEW   report-q4.pdf      → PDFs/
  [10:14:02] NEW   photo-2026-05.heic → Images/
  [10:15:30] NEW   setup.dmg          → Installers/
  [10:41:00] AGED  brief-jan.docx     → _archive/2026-01/  (92 days old)

  All operations logged. Run \`filemayor undo --session latest\` to reverse.`}</code>
            </pre>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Common questions</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              FileMayor vs Hazel — FAQ.
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
            <div className="section-label">If you want to try both</div>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              They do not conflict. Hazel can govern a watched folder while FileMayor
              handles the larger session organisation. Many teams run them side by side.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/download" className="btn btn-primary">
                Download FileMayor <span aria-hidden>→</span>
              </Link>
              <Link href="/blog/curative-triad" className="btn btn-mono">
                Read about the Triad
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
