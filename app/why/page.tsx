import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Why FileMayor · The case for a different kind of file tool',
  description:
    'The filesystem is the original productivity layer. Every other tool builds on top of it. Why FileMayor exists, what it refuses to do, and why that matters.',
};

const pillars = [
  {
    n: '01',
    title: 'The mess is not your fault.',
    body: `You do not lack discipline. You lack a tool that works with how humans actually accumulate files — in bursts, across contexts, without a predetermined taxonomy. Every productivity system that requires consistent upfront labelling is asking you to be a different person. FileMayor doesn't. It diagnoses what's already there and proposes a structure that fits what you made, not what you planned.`,
  },
  {
    n: '02',
    title: 'Reversibility is not a feature. It is the product.',
    body: `The reason people don't clean up is not laziness. It's the cost of being wrong. A file moved to the wrong place — or a folder restructured in a way that breaks something downstream — is expensive to undo. So the rational response is to not touch it at all. FileMayor inverts this: the journal makes every session fully reversible, and undo --all costs exactly one command. When the cost of being wrong approaches zero, people act.`,
  },
  {
    n: '03',
    title: 'The AI proposes. You decide. The machine executes.',
    body: `FileMayor is not autonomous. It will never run without approval. The AI reads your folder structure, reasons about it, and presents a plan in plain English. You read it, change whatever you want, and approve. Then the engine — not the AI — executes it, under six layers of safety checks. This is the right division of labour: AI for pattern recognition, human for judgement, software for precision.`,
  },
  {
    n: '04',
    title: 'Your files belong to you.',
    body: `File contents never leave the machine. Not for analysis, not for training, not for any reason. The AI sees only what you'd see in a file listing: names, sizes, paths, extensions. That is enough to reason about structure. It is not enough to read your documents. This is a deliberate constraint, not a limitation.`,
  },
  {
    n: '05',
    title: 'Six layers is not paranoia.',
    body: `An AI with write access to your filesystem is not a toy. We built the Chevza Doctrine — six independent safety layers, each with a single responsibility — because every previous design we tried put too much trust in a single check. Jail constrains scope. Guardrail inspects batches. Halt makes crashes safe. Architect validates semantic coherence. Security hardens input. These are not bullet points on a marketing page. They are the code that runs before anything moves.`,
  },
  {
    n: '06',
    title: 'Built by one person, in South Africa.',
    body: `FileMayor is not a VC-backed startup optimising for growth metrics. It is a product built to be genuinely useful, priced to sustain the person who builds it, and designed to last. The code is the founding document: every decision in it is a decision about what kind of tool this is and what kind of relationship it has with the people who use it.`,
  },
];

export default function WhyPage() {
  return (
    <>
      <Nav />
      <main id="main">

        {/* Hero */}
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">Why FileMayor</div>
            <h1 className="h-display text-[clamp(44px,7vw,96px)]">
              The filesystem is the foundation.<br />
              <em className="not-italic text-accent italic">Treat it like one.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-2 md:text-xl">
              Every document, project, photo, and piece of work you have ever made lives somewhere
              on a filesystem. It is the oldest and most personal layer of computing. And for most
              people it is an unmanaged pile. FileMayor exists to fix that — carefully.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <ol className="space-y-20">
              {pillars.map((p) => (
                <li key={p.n} className="grid grid-cols-1 gap-8 md:grid-cols-[120px,1fr]">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent pt-1">
                    {p.n}
                  </div>
                  <div>
                    <h2 className="font-display text-[clamp(24px,3vw,36px)] font-normal leading-tight tracking-tight text-text">
                      {p.title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-[16.5px] leading-[1.75] text-text-2">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What we refused to build */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">What we refused to build</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-normal leading-tight tracking-tight">
              The things we said no to.
            </h2>
            <ul className="mt-10 space-y-5">
              {[
                ['Cloud sync', 'Your files stay on your machine. FileMayor is not a sync tool. It will never be a sync tool. The value is local-first, and that is not negotiable.'],
                ['Autonomous background organisation', 'Watch mode monitors folders and can trigger actions — but never without your approval. An AI that moves things without asking is not a tool you can trust.'],
                ['Opaque black-box AI decisions', 'The plan is always shown in plain English before anything runs. You can read it, edit it, and reject it. The AI is an advisor, not a decision-maker.'],
                ['Freemium dark patterns', 'The Free tier is genuinely useful. Pro unlocks more power, not basic functionality that was hobbled to force an upgrade. The pricing page says exactly what each plan includes.'],
                ['Growth over quality', 'There is no VC timeline, no growth-at-all-costs mandate. Features ship when they are right, not when they are good enough.'],
              ].map(([title, desc]) => (
                <li key={title as string} className="flex gap-5 rounded-xl border border-border bg-surface p-5">
                  <span className="mt-0.5 font-mono text-[20px] text-text-3 leading-none shrink-0">—</span>
                  <div>
                    <p className="font-medium text-[15px] text-text">{title}</p>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-text-2">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Founder note */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-2xl">
            <div className="section-label">From the founder</div>
            <blockquote className="mt-6 space-y-5 text-[17px] leading-[1.75] text-text-2">
              <p>
                I built FileMayor because I kept putting off cleaning up my own filesystem — not
                because I didn't care, but because every previous attempt cost me more in mistakes
                than it saved in time. A script I wrote once moved the wrong folder and I spent an
                afternoon recovering. After that I didn't touch it for six months.
              </p>
              <p>
                The real problem wasn't the script. It was that there was no undo. FileMayor started
                as a journal. Everything else — the AI, the command bar, the MCP server — came after
                the journal was solid. That's still the order of priority: safety first, power second.
              </p>
              <p>
                If you find something wrong with it, email me. I read every message.
              </p>
              <footer className="mt-8 font-mono text-[13px] text-text-3">
                — {site.author.name} ({site.author.handle}),{' '}
                <a href={`mailto:${site.author.email}`} className="text-accent hover:underline">
                  {site.author.email}
                </a>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="container-prose max-w-3xl">
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-normal leading-tight tracking-tight">
              If this sounds like the tool you wanted,{' '}
              <em className="not-italic text-accent italic">it is.</em>
            </h2>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/download" className="btn btn-primary">
                Download FileMayor <span aria-hidden>→</span>
              </Link>
              <Link href="/docs/security" className="btn btn-mono">
                Read the security policy
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
