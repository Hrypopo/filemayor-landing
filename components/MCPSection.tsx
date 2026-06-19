'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { track } from '@vercel/analytics';
import { Reveal } from './Reveal';

const snippet = `{
  "mcpServers": {
    "filemayor": {
      "command": "npx",
      "args": ["-y", "filemayor-mcp"]
    }
  }
}`;

const benefits = [
  'Nothing leaves your machine',
  'Every move is reversible',
  'Ask in plain English',
  'Works with Claude Code Skill',
];

export function MCPSection() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      track('mcp_config_copy');
    } catch {
      /* clipboard may be blocked in some contexts */
    }
  };

  return (
    <section
      id="mcp"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="mcp-heading"
    >
      <div className="container-prose">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr,1.1fr] lg:items-center">
          <Reveal>
            <div className="section-label">Works with Claude</div>
            <h2 id="mcp-heading" className="h-display mt-3 text-[clamp(36px,5vw,56px)]">
              Tell Claude to clean your folders.{' '}
              <em className="not-italic text-accent italic">It already knows how.</em>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-2 md:text-lg">
              One config entry and Claude Desktop, Claude Code, or Cursor can audit your
              folders, propose a plan, and apply it — while FileMayor keeps a full record
              of every move so you can take it all back.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/skill" className="btn btn-primary">
                Read the guide
                <span aria-hidden>→</span>
              </Link>
              <Link href="/mcp" className="btn btn-secondary">
                Learn more
                <span aria-hidden>→</span>
              </Link>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {benefits.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-2.5 text-[14px] leading-snug text-text-2"
                >
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
                  {b}
                </motion.li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-[0_40px_120px_-40px_rgba(212,175,55,0.18)]">
              <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
              <div className="flex items-center gap-2 border-b border-border/70 bg-bg/40 px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <div className="ml-3 truncate font-mono text-[11px] uppercase tracking-[0.14em] text-text-2">
                  claude_desktop_config.json
                </div>
                <button
                  type="button"
                  onClick={copy}
                  aria-label={copied ? 'Copied' : 'Copy configuration to clipboard'}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-border bg-bg/60 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-text-2 transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {copied ? '✓ copied' : 'copy'}
                </button>
              </div>
              <pre className="overflow-x-auto bg-bg/40 p-5 font-mono text-[13px] leading-relaxed text-text-2">
                <code>{snippet}</code>
              </pre>
              <div className="border-t border-border/70 bg-bg/40 px-5 py-3 font-mono text-[12px] text-text-2">
                Restart Claude. Ask:{' '}
                <span className="text-accent">&ldquo;clean up my Downloads&rdquo;</span>.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
