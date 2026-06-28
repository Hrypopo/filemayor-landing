import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Press Kit',
  description:
    'FileMayor press kit — product description, brand assets, colors, founder bio, and media contact for journalists and directory listings.',
  alternates: { canonical: '/press' },
};

const brandColors = [
  { name: 'Gold', hex: '#D4AF37', rgb: '212 175 55', usage: 'Primary accent, CTAs, highlights' },
  { name: 'Dark Gold', hex: '#B8860B', rgb: '184 134 11', usage: 'Gradient base, hover states' },
  { name: 'Background', hex: '#0A0C14', rgb: '10 12 20', usage: 'Page background' },
  { name: 'Surface', hex: '#111420', rgb: '17 20 32', usage: 'Cards, code blocks' },
  { name: 'Text Primary', hex: '#FFFFFF', rgb: '255 255 255', usage: 'Headings, primary copy' },
  { name: 'Text Secondary', hex: 'rgba(255,255,255,0.70)', rgb: '255 255 255 / 70%', usage: 'Body copy, descriptions' },
];

const typography = [
  { label: 'Display', value: 'Editorial New (licensed) · fallback: Georgia, serif' },
  { label: 'Body', value: 'Helvetica Neue, Arial, system-ui, sans-serif' },
  { label: 'Mono', value: 'JetBrains Mono, Menlo, monospace' },
];

const facts = [
  ['Founded', '2025'],
  ['Headquarters', 'South Africa'],
  ['Category', 'Developer tools / AI productivity'],
  ['Platforms', 'macOS · Windows · Linux'],
  ['Distribution', 'Direct download · npm'],
  ['License model', 'Free — open to everyone, no subscription'],
  ['npm downloads', site.metrics.npmInstalls.toLocaleString() + '+'],
  ['Security layers', String(site.metrics.securityLayers)],
];

export default function PressPage() {
  return (
    <>
      <Nav />
      <main id="main">

        {/* Header */}
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">Press Kit</div>
            <h1 className="h-display text-[clamp(40px,6vw,80px)]">
              FileMayor press resources.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-2 md:text-xl">
              Product descriptions, brand colors, founder information, and approved copy
              for journalists, directories, and analysts. For interview requests or
              additional assets, use the contact below.
            </p>
            <a
              href={`mailto:${site.author.email}?subject=Press inquiry — FileMayor`}
              className="mt-6 inline-block font-mono text-[13px] text-accent hover:underline"
            >
              {site.author.email} → subject: Press inquiry
            </a>
          </div>
        </section>

        {/* Company facts */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">At a glance</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Company facts.
            </h2>
            <dl className="mt-8 divide-y divide-border">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-4 text-[15px]">
                  <dt className="text-text-3">{k}</dt>
                  <dd className="text-right font-medium text-text">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Boilerplate */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Approved copy</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Product descriptions.
            </h2>

            <div className="mt-8 space-y-6">
              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">One sentence</p>
                <blockquote className="text-[17px] leading-relaxed text-text">
                  FileMayor is an AI-powered filesystem organiser that scans your folders, proposes a plain-English reorganisation plan, and executes it with a full undo if you change your mind.
                </blockquote>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">Short paragraph (100 words)</p>
                <blockquote className="text-[15.5px] leading-relaxed text-text-2">
                  FileMayor is a command-bar filesystem organiser built for people who have given up on staying tidy. Point it at a folder — your Downloads, your Desktop, a project root full of naming accidents — and it diagnoses what's there, proposes a reorganisation in plain English, and executes it with a single undo if you regret anything. It works on Mac, Windows, and Linux; runs entirely local so no file ever leaves the machine; and connects to Claude, Cursor, and other AI tools via the Model Context Protocol. Free for everyone — no subscription required.
                </blockquote>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">Extended (200 words)</p>
                <blockquote className="text-[15.5px] leading-relaxed text-text-2">
                  FileMayor is an AI-powered filesystem tool that turns the vague intention of "I should clean this up" into a concrete, reversible action. Users describe what they want in plain English — "organise my downloads by project", "archive anything older than a year", "deduplicate this folder" — and the software scans the target directory, reasons over its structure, and proposes a reorganisation plan. Nothing moves until the user approves.<br /><br />
                  The execution engine is built on the Chevza Doctrine, a six-layer security architecture that enforces workspace scope, inspects every batch for destructive patterns, and journals every operation so a single command can reverse an entire session. File contents never leave the machine; only metadata is read during the AI reasoning phase.<br /><br />
                  FileMayor ships as a desktop application (macOS, Windows, Linux), a CLI available via npm, and an MCP server that connects to Claude Desktop, Claude Code, Cursor, and Zed. It is built and maintained by Lehlohonolo Goodwill Nchefu (Chevza) in South Africa.
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Founder bio */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Founder</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              {site.author.name}.
            </h2>

            <div className="mt-8 space-y-6">
              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">Short bio</p>
                <blockquote className="text-[15.5px] leading-relaxed text-text-2">
                  Lehlohonolo Goodwill Nchefu (known as Chevza) is the founder and developer of FileMayor, an AI-powered filesystem organiser. Based in South Africa, he builds tools at the intersection of AI and developer workflow. FileMayor is his first commercial software product.
                </blockquote>
              </div>

              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-surface p-5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-3">Full name</dt>
                  <dd className="mt-1.5 text-[15px] text-text">{site.author.name}</dd>
                </div>
                <div className="rounded-xl border border-border bg-surface p-5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-3">Handle</dt>
                  <dd className="mt-1.5 font-mono text-[15px] text-text">{site.author.handle}</dd>
                </div>
                <div className="rounded-xl border border-border bg-surface p-5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-3">Location</dt>
                  <dd className="mt-1.5 text-[15px] text-text">South Africa</dd>
                </div>
                <div className="rounded-xl border border-border bg-surface p-5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-3">GitHub</dt>
                  <dd className="mt-1.5 font-mono text-[15px] text-text">
                    <a href={`https://github.com/${site.github.org}`} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                      github.com/{site.github.org}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Brand */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Brand</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Colors and typography.
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {brandColors.map((c) => (
                <div key={c.name} className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
                  <div
                    className="size-10 shrink-0 rounded-lg border border-white/10"
                    style={{ background: c.hex }}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-text">{c.name}</p>
                    <p className="font-mono text-[12px] text-text-3">{c.hex}</p>
                    <p className="mt-0.5 text-[12px] text-text-3">{c.usage}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-10 font-display text-[22px] font-normal tracking-tight text-text">Typography</h3>
            <dl className="mt-4 divide-y divide-border">
              {typography.map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-6 py-4 text-[14px]">
                  <dt className="text-text-3">{label}</dt>
                  <dd className="text-right font-mono text-[13px] text-text">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Usage guidelines */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Usage guidelines</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              How to refer to FileMayor.
            </h2>
            <ul className="mt-8 space-y-3 text-[15px] leading-relaxed text-text-2">
              {[
                'Write "FileMayor" as one word, with capital F and M. Do not write "File Mayor", "filemayor", or "File Mayor".',
                'On first mention, use the full product name: FileMayor. Subsequent mentions may use "the app" or "the tool".',
                'Do not describe FileMayor as a "file manager" — it is a filesystem organiser. The distinction matters: it proposes and applies, rather than browsing and managing.',
                'The Chevza Doctrine is the security architecture. It may be mentioned by name in technical coverage.',
                'MCP (Model Context Protocol) is an open standard. FileMayor implements it; we do not own or maintain it.',
                'Do not attribute AI behaviour to FileMayor itself. The AI (Claude, Gemini, etc.) proposes; FileMayor validates and executes.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="container-prose max-w-3xl">
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-normal leading-tight tracking-tight">
              Need something not here?
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-text-2">
              For interview requests, additional assets, product briefings, or inclusion in
              roundups and directories, contact the founder directly.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`mailto:${site.author.email}?subject=Press inquiry — FileMayor`} className="btn btn-primary">
                Email {site.author.email} <span aria-hidden>→</span>
              </a>
              <Link href="/docs/security" className="btn btn-mono">
                Security policy
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
