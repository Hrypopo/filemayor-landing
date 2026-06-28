import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'PARA Method, Automated — Sort Your Files by Actionability',
  description:
    'Automate the PARA method on your filesystem. FileMayor scaffolds Projects, Areas, Resources, Archives and sorts files by actionability — one reversible command.',
  alternates: { canonical: `${site.url}/para` },
};

const INSTALL = `# scaffold Projects / Areas / Resources / Archives + config
filemayor init --para

# sort this folder by actionability (preview, with reasons)
filemayor para .

# execute — every move journaled and reversible
filemayor apply`;

const buckets = [
  ['Projects', 'Active efforts with a goal and an end. One folder per project. When it ships, it leaves.', 'Recently modified work, and folders named like client-*, *-launch, project/. Code & media projects move intact.'],
  ['Areas', 'Ongoing responsibilities you maintain with no end date — Finances, Health, Home, a role.', 'Files whose names or folders match maintained domains: taxes, invoices, insurance, health, contracts…'],
  ['Resources', 'Topics and reference material you may want later. Templates, manuals, books, assets.', 'Reference-type files (books, fonts, design) and anything under reference/, templates/, docs/.'],
  ['Archives', 'Inactive items from the other three. Cold storage — nothing is deleted, everything recoverable.', 'Anything you have not touched in 12+ months (configurable). The chore PARA users hate — done for you.'],
];

const steps = [
  { n: '01', t: 'Scaffold', d: 'filemayor init --para creates the four folders, each with a plain-English README that teaches the method, plus a tuned config.' },
  { n: '02', t: 'Sort by actionability', d: 'filemayor para . classifies every file from recency, type, folder names, and project markers — and shows the reason for each move.' },
  { n: '03', t: 'Review the plan', d: 'Nothing moves until you say so. Active projects move intact; ambiguous files are set aside for review, not guessed.' },
  { n: '04', t: 'Apply with an undo', d: 'filemayor apply executes and journals every move. Changed your mind? filemayor undo reverses the whole session.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the PARA method?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PARA is an organizing framework by Tiago Forte that sorts everything by actionability into four buckets: Projects (active efforts with a deadline), Areas (ongoing responsibilities), Resources (reference material), and Archives (inactive items). FileMayor automates it for the files on your computer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there an app that automates PARA for my files?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. FileMayor is a free, local-first tool that scaffolds the four PARA folders and sorts files into them by actionability signals — recency, file type, folder names, and project markers — auto-archiving anything you have not touched in months. Every move is reversible via a journal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does FileMayor send my files anywhere to do PARA sorting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The deterministic PARA sorter runs entirely on your machine and makes no network calls. Optional AI refinement (via Claude through the MCP server) shares only file metadata — names, sizes, paths — never file contents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is FileMayor affiliated with Tiago Forte or Building a Second Brain?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. PARA is a method created by Tiago Forte. FileMayor is an independent tool that automates it for files on disk and is not affiliated with, sponsored by, or endorsed by Tiago Forte or Forte Labs.',
      },
    },
  ],
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    { '@type': 'ListItem', position: 2, name: 'PARA method', item: `${site.url}/para` },
  ],
};

export default function ParaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Nav />
      <main id="main">

        {/* Hero */}
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">The PARA method</div>
            <h1 className="h-display text-[clamp(40px,7vw,92px)]">
              PARA, <em className="not-italic text-accent italic">automated</em>.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-2 md:text-xl">
              Projects, Areas, Resources, Archives — the method that organizes everything by
              actionability instead of topic. FileMayor builds it into the engine: scaffold the four
              folders, sort by actionability, and auto-archive what&rsquo;s gone stale. One command.
              Fully reversible. Nothing leaves your machine.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/download" className="btn btn-primary">
                Get FileMayor free <span aria-hidden>→</span>
              </Link>
              <Link href="/blog/automate-para-method" className="btn btn-mono">
                Read the guide
              </Link>
            </div>
            <p className="mt-6 text-[13px] text-text-3">
              PARA is a method by Tiago Forte. FileMayor automates it — not affiliated or endorsed.
            </p>
          </div>
        </section>

        {/* The four buckets */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose">
            <div className="section-label">The four buckets</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Sort by <em className="italic text-accent">actionability</em>, not file type.
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
              {buckets.map(([name, what, how]) => (
                <article key={name} className="rounded-2xl border border-border bg-surface p-6">
                  <h3 className="font-display text-[22px] font-normal tracking-tight text-text">{name}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-text-2">{what}</p>
                  <p className="mt-3 border-t border-border pt-3 font-mono text-[12px] leading-relaxed text-text-3">
                    FileMayor routes here: {how}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Install */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Three commands</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              From mess to PARA, reversibly.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              Install once with <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">npm install -g filemayor</code>{' '}
              (Node ≥20), or grab the <Link href="/download" className="text-accent underline underline-offset-4">desktop app</Link>.
            </p>
            <pre className="mt-8 overflow-x-auto rounded-2xl border border-border bg-surface p-6 font-mono text-[13px] leading-relaxed text-text-2">
              <code>{INSTALL}</code>
            </pre>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose">
            <div className="section-label">How it works</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              It shows its reasoning, then asks.
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <article key={s.n} className="rounded-2xl border border-border bg-surface p-6">
                  <div className="font-mono text-[12px] text-accent">{s.n}</div>
                  <h3 className="mt-3 font-display text-[19px] font-normal leading-tight tracking-tight text-text">{s.t}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-text-2">{s.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Deterministic vs semantic */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Two modes</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Honest about what a tool can infer.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              Whether a file is an active <em>Project</em> or an ongoing <em>Area</em> is sometimes a
              real judgement call. FileMayor doesn&rsquo;t fake certainty it doesn&rsquo;t have.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <li className="rounded-xl border border-border bg-surface p-5">
                <p className="text-[14.5px] font-medium text-text">Deterministic</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-text-2">
                  The <code className="font-mono text-[12px]">filemayor para</code> command. Fast, free,
                  private, transparent — every move labelled with its reason. Ideal for the bulk pass
                  and auto-archiving.
                </p>
              </li>
              <li className="rounded-xl border border-border bg-surface p-5">
                <p className="text-[14.5px] font-medium text-text">Semantic</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-text-2">
                  Through <Link href="/mcp" className="text-accent underline underline-offset-4">Claude via the MCP server</Link>,
                  the AI judges true actionability per file and proposes buckets — then hands moves to
                  the same reversible engine. You confirm; it applies.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Common questions</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              PARA, answered.
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
              Give your files a system that stays tidy.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-text-2">
              The buckets are easy. The upkeep is what defeats people — so let FileMayor do it.
              Free on Mac, Windows, and Linux.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/download" className="btn btn-primary">
                Download FileMayor <span aria-hidden>→</span>
              </Link>
              <Link href="/blog/automate-para-method" className="btn btn-mono">
                Read the full guide
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
