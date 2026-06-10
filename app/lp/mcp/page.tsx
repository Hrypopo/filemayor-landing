import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'FileMayor for Claude — Clean your folders from chat',
  description:
    'Add FileMayor to Claude Desktop, Claude Code, or Cursor in 30 seconds. Tell Claude to organise your filesystem. Every move is reversible.',
  robots: { index: false, follow: false },
};

const steps = [
  { n: '01', title: 'Add one entry to your config', code: `{\n  "mcpServers": {\n    "filemayor": {\n      "command": "npx",\n      "args": ["-y", "@filemayor/mcp"]\n    }\n  }\n}` },
  { n: '02', title: 'Restart Claude', body: 'Claude Desktop or Claude Code picks up the FileMayor tools on next launch. No API keys. No accounts.' },
  { n: '03', title: 'Ask in plain English', body: '"Clean up my Downloads", "Dedupe this folder", "Archive anything older than a year." Claude plans it, FileMayor executes it safely.' },
  { n: '04', title: 'Undo if you want', body: 'Every move is journaled. One command — filemayor undo --all — reverses the entire session.' },
];

const proof = [
  'Files never leave your machine',
  'Nothing runs without your approval',
  'Full session undo, any time',
  'Works with Claude Code, Claude Desktop, Cursor, Zed',
  'Free to start — no card required',
];

export default function LPMCPPage() {
  return (
    <main className="min-h-screen bg-bg text-text" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>

      {/* Nav — minimal */}
      <nav className="border-b border-border px-6 py-4 md:px-12">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <span className="font-display text-[20px] tracking-tight">{site.name}</span>
          <Link href="/download" className="btn btn-primary text-[13px]">
            Get started free <span aria-hidden>→</span>
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-20 md:px-12 md:py-28">

        {/* Hero */}
        <div className="mb-20 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.06] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            Works with Claude · Cursor · Zed
          </div>
          <h1 className="font-display text-[clamp(40px,6vw,72px)] font-normal leading-[1.08] tracking-tight">
            Tell Claude to clean<br />your folders.{' '}
            <em className="not-italic text-accent italic">It already<br />knows how.</em>
          </h1>
          <p className="mt-7 text-[18px] leading-relaxed text-text-2">
            One config entry and Claude Desktop, Claude Code, or Cursor can diagnose
            your folders, propose a plan, and execute it — with FileMayor running
            underneath so nothing irreversible ever happens.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/download" className="btn btn-primary">
              Download FileMayor free <span aria-hidden>→</span>
            </Link>
            <Link href="/mcp" className="btn btn-mono">
              Read the full guide
            </Link>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
            {proof.map((p) => (
              <li key={p} className="flex items-center gap-2 font-mono text-[12px] text-text-3">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="mb-20">
          <h2 className="mb-10 font-display text-[clamp(24px,3vw,36px)] font-normal tracking-tight">
            Up in 30 seconds.
          </h2>
          <ol className="space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="rounded-2xl border border-border bg-surface p-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{s.n}</div>
                <h3 className="mt-2 text-[18px] font-medium text-text">{s.title}</h3>
                {s.code && (
                  <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-bg p-4 font-mono text-[13px] leading-relaxed text-text-2">
                    <code>{s.code}</code>
                  </pre>
                )}
                {s.body && <p className="mt-3 text-[15px] leading-relaxed text-text-2">{s.body}</p>}
              </li>
            ))}
          </ol>
        </div>

        {/* Social proof strip */}
        <div className="mb-20 rounded-2xl border border-accent/20 bg-accent/[0.04] p-8">
          <p className="font-display text-[22px] font-normal italic leading-snug text-text">
            "The AI proposes. FileMayor executes. Nothing moves without your say-so — and everything can be undone."
          </p>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-text-3">
            The Chevza Doctrine · 6 safety layers
          </p>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="font-display text-[clamp(28px,4vw,48px)] font-normal leading-tight tracking-tight">
            Your AI already knows what to do.<br />
            <em className="not-italic text-accent italic">Give it the tools.</em>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/download" className="btn btn-primary">
              Download FileMayor free <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="mt-4 font-mono text-[12px] text-text-3">
            Free forever · No card required · Mac · Windows · Linux
          </p>
        </div>
      </div>

      {/* Minimal footer */}
      <div className="border-t border-border px-6 py-6 text-center font-mono text-[11px] text-text-3">
        <Link href="/" className="hover:text-text-2">{site.name}</Link>
        {' · '}
        <Link href="/docs/security" className="hover:text-text-2">Security</Link>
        {' · '}
        <Link href="/privacy" className="hover:text-text-2">Privacy</Link>
      </div>
    </main>
  );
}
