import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'FileMayor for Teams',
  description:
    'A shared, reversible filesystem workflow for engineering and ops teams. Local-only execution, audit-ready operation logs. Cross-platform CLI, MCP, and desktop.',
  alternates: { canonical: '/teams' },
};

const CONTACT = `mailto:${site.author.email}?subject=FileMayor%20for%20Teams`;

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does FileMayor offer for teams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FileMayor is free to install and use. For teams, it offers shared rule libraries, audit-ready operation logs, CSV/JSON/API access, and cross-platform CLI and MCP support. Email us to discuss larger deployments.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does FileMayor send our files or data anywhere?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The core engine runs entirely on the machine. Optional AI planning sends only file metadata — names, sizes, paths, extensions — never file contents, and can be disabled entirely. The CLI sends one anonymous version+OS+command ping per version (no file names or paths); disable it with FILEMAYOR_NO_TELEMETRY=1. License validation runs locally with a 30-day offline grace period.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there an audit trail for compliance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every operation is journaled — what changed, when, and by which session — and exportable to CSV or JSON. The journal is the same durable record that powers undo, so the audit log and the rollback mechanism are one and the same.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you support SSO and centralised fleet management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not yet — SSO, SCIM provisioning, and centralised fleet management are on the roadmap. Today, Team licenses cover up to 5 seats with shared rule libraries and offline activation. If you need larger seat counts or SSO now, email us and we will work with you directly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I deploy FileMayor across a team?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Install via npm (npm install -g filemayor) or download the desktop app for each machine. For larger deployments, shared rule libraries, or SSO requirements, email us directly.',
      },
    },
  ],
};

const pillars = [
  {
    label: 'Local-only by default',
    title: 'Files never leave the machine.',
    body: 'The engine runs locally on macOS, Windows, and Linux. Optional AI planning sends only metadata — never contents — and disables cleanly. The CLI sends one anonymous version+command ping per version; disable with FILEMAYOR_NO_TELEMETRY=1.',
  },
  {
    label: 'Audit-ready operation log',
    title: 'Every change, journaled and exportable.',
    body: 'The same durable journal that powers undo doubles as your audit trail. Export to CSV or JSON for reviews, compliance, and incident response.',
  },
  {
    label: 'Reversible by design',
    title: 'One undo for the whole session.',
    body: 'The Curative Triad separates planning from execution: nothing is touched until approved, and undo --all rolls back an entire session. Mistakes are recoverable, not catastrophic.',
  },
  {
    label: 'Built for automation',
    title: 'A CLI and MCP your stack can drive.',
    body: 'Every command speaks --json, so FileMayor drops into CI, cron, and runbooks. The MCP server lets your team’s AI assistants plan and apply filesystem work under the same guardrails.',
  },
];

const useCases = [
  {
    k: 'Engineering',
    t: 'Reclaim build and artifact sprawl',
    d: 'Deduplicate and archive gigabytes of stale build output, exports, and caches across a fleet — with a log of exactly what was removed and a one-command rollback.',
  },
  {
    k: 'Data & ML',
    t: 'Tame dataset directories',
    d: 'Sort, dedupe, and structure sprawling dataset folders consistently across machines using shared rule libraries, so every workstation organises the same way.',
  },
  {
    k: 'IT & Ops',
    t: 'Standardise shared drives',
    d: 'Apply one organising policy across team storage and prove what changed. The audit log answers “who moved this file and when” without guesswork.',
  },
];

export default function TeamsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <main id="main">

        {/* Hero */}
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">For Teams</div>
            <h1 className="h-display text-[clamp(40px,7vw,92px)]">
              Filesystem work,{' '}
              <em className="not-italic text-accent italic">with a paper trail.</em>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-2 md:text-xl">
              FileMayor gives engineering, data, and ops teams one reversible workflow for
              organising files at scale — local-only execution, an audit-ready operation
              log on every change, and opt-out anonymous telemetry (FILEMAYOR_NO_TELEMETRY=1).
              Cross-platform CLI, MCP, and desktop.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/download" className="btn btn-primary">
                Download FileMayor free <span aria-hidden>→</span>
              </Link>
              <a href={CONTACT} className="btn btn-mono">
                Talk to us about team use
              </a>
            </div>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
              Free to install · local-only · shared rule libraries · audit log
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose">
            <div className="section-label">Why teams choose FileMayor</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Safe enough to run on shared storage.
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
              {pillars.map((p) => (
                <article key={p.label} className="rounded-2xl border border-border bg-surface p-7">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{p.label}</div>
                  <h3 className="mt-3 font-display text-[22px] font-normal leading-tight tracking-tight text-text">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-text-2">{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose">
            <div className="section-label">Where it fits</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Built for the work, not the demo.
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
              {useCases.map((u) => (
                <article key={u.t} className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">{u.k}</div>
                  <h3 className="mt-3 font-display text-[20px] font-normal leading-tight tracking-tight text-text">{u.t}</h3>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-text-2">{u.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Security posture */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Security posture</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              What is true today — stated plainly.
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                ['Available now', 'Local-only execution · opt-out CLI telemetry (FILEMAYOR_NO_TELEMETRY=1) · OS-keychain secret storage · six-layer Chevza Doctrine runtime · journaled, exportable audit log · offline activation with 30-day grace.'],
                ['Team workflow', 'Shared rule libraries · CSV / JSON / API access · cross-platform CLI and MCP · email support.'],
                ['On the roadmap', 'SSO and SCIM provisioning · centralised fleet management · larger seat tiers · SOC 2. Not claimed as shipped — email us if you need any of these now.'],
              ].map(([k, v]) => (
                <li key={k} className="rounded-xl border border-border bg-surface p-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{k}</span>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-2">{v}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] leading-relaxed text-text-3">
              Full architecture detail lives in the{' '}
              <Link href="/docs/security" className="text-text-2 underline-offset-2 hover:text-accent hover:underline">
                security documentation
              </Link>{' '}
              and the{' '}
              <Link href="/blog/chevza-doctrine" className="text-text-2 underline-offset-2 hover:text-accent hover:underline">
                Chevza Doctrine
              </Link>.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Common questions</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Team plan — FAQ.
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

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="container-prose max-w-3xl">
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-normal leading-tight tracking-tight">
              Bring a reversible workflow to your team.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-text-2">
              Free to install and use. If you're evaluating FileMayor for your team or have
              questions about larger deployments and SSO, email directly — no sales funnel.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/download" className="btn btn-primary">
                Download FileMayor free <span aria-hidden>→</span>
              </Link>
              <a href={CONTACT} className="btn btn-mono">
                Email {site.author.handle}
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
