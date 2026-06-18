import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FileMayor MCP Server — Let your AI organise your filesystem, safely',
  description:
    'The FileMayor MCP server lets Claude, Cursor, Zed, and any MCP-aware client diagnose folders, plan moves, and apply them with full rollback. Local-only execution, no data leaves the machine.',
};

const SNIPPET = `{
  "mcpServers": {
    "filemayor": {
      "command": "npx",
      "args": ["-y", "filemayor-mcp"]
    }
  }
}`;

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the FileMayor MCP server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "It is a Model Context Protocol server that exposes FileMayor's filesystem operations to AI assistants. Once installed, an MCP-aware client like Claude Desktop can diagnose folders, propose reorganisation plans, and apply them — using the same journaled, reversible engine as the FileMayor CLI and desktop app.",
      },
    },
    {
      '@type': 'Question',
      name: 'Which AI clients support the FileMayor MCP server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Any client that speaks the Model Context Protocol. That includes Claude Desktop, Claude Code, Cursor, and Zed. You add one entry to the client's MCP configuration pointing at the filemayor CLI, restart, and the FileMayor tools become available in chat.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to let an AI move my files?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The MCP server runs under the same six-layer Chevza Doctrine guardrails as the rest of FileMayor. The AI proposes a plan; nothing is touched until it is applied, the Guardrail layer refuses destructive batches, and every operation is journaled so undo --all reverses the whole session. Execution is local-only — no file contents leave the machine.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the MCP server send my files to the model?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Only metadata — names, sizes, paths, extensions — is shared so the model can reason about structure. File contents never leave your machine, and all execution happens locally.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does the FileMayor MCP server cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The MCP server is included and free. Every FileMayor feature — bulk operations, the AI Curative Triad, full rollback — is available at no cost.',
      },
    },
  ],
};

const steps = [
  { n: '01', t: 'Add the server', d: "Drop one entry into your client's MCP config. No build step, no glue code — npx -y filemayor-mcp starts the server on demand." },
  { n: '02', t: 'Restart the client', d: 'Claude Desktop, Cursor, or Zed picks up the FileMayor tools automatically on the next launch.' },
  { n: '03', t: 'Ask in plain language', d: '"Diagnose my Downloads", "dedupe this folder", "archive anything older than a year." The model plans; you approve.' },
  { n: '04', t: 'Apply with rollback', d: 'Approved plans run locally and journal every move. Changed your mind? undo --all reverses the entire session.' },
];

const clients = ['Claude Desktop', 'Claude Code', 'Cursor', 'Zed'];

const benefits = [
  ['Local-only execution', 'The engine runs on your machine. No file contents are uploaded — ever.'],
  ['Same guardrails', 'Identical Chevza Doctrine safety layers as the CLI and desktop app.'],
  ['Journaled & reversible', 'Every operation is logged; undo from chat or the command line.'],
  ['Zero glue code', 'One config entry. npx handles the rest. Nothing to maintain.'],
];

export default function MCPPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <main id="main">

        {/* Hero */}
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">Model Context Protocol</div>
            <h1 className="h-display text-[clamp(40px,7vw,92px)]">
              Let your AI <em className="not-italic text-accent italic">act</em> on your filesystem.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-2 md:text-xl">
              The FileMayor MCP server gives Claude, Cursor, Zed, and any MCP-aware client the
              power to diagnose folders, plan moves, and apply them — under the same journaled,
              reversible guardrails as the CLI. One config entry. No data leaves the machine.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/skill" className="btn btn-primary">
                Read the Skill guide <span aria-hidden>→</span>
              </Link>
              <Link href="https://www.npmjs.com/package/filemayor" className="btn btn-mono">
                filemayor on npm
              </Link>
            </div>
          </div>
        </section>

        {/* Install */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Install in 30 seconds</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              One entry in your MCP config.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              Add this to <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">claude_desktop_config.json</code>{' '}
              (or your client's equivalent), then restart.
            </p>
            <pre className="mt-8 overflow-x-auto rounded-2xl border border-border bg-surface p-6 font-mono text-[13px] leading-relaxed text-text-2">
              <code>{SNIPPET}</code>
            </pre>
            <div className="mt-6 flex flex-wrap gap-2">
              {clients.map((c) => (
                <span key={c} className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-text-2">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose">
            <div className="section-label">How it works</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Plan in chat. Apply with an undo.
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

        {/* Benefits */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Why it is safe</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              An AI with hands — and a leash.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-text-2">
              Giving a model write access to your filesystem sounds reckless. It is not —
              because the model only ever proposes. The FileMayor engine, not the AI, decides
              what is allowed, executes locally, and keeps a reversible record of every move.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map(([t, d]) => (
                <li key={t} className="rounded-xl border border-border bg-surface p-5">
                  <p className="text-[14.5px] font-medium text-text">{t}</p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-text-2">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Common questions</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              FileMayor MCP — FAQ.
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
              Connect FileMayor to your AI.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-text-2">
              Install the server, restart your client, and ask it to clean up a folder.
              The full walkthrough — including the Claude Code Skill — is in the guide.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/skill" className="btn btn-primary">
                Read the Skill guide <span aria-hidden>→</span>
              </Link>
              <Link href="/download" className="btn btn-mono">
                Download FileMayor
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
