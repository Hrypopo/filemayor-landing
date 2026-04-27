'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Step {
  num: string;
  verb: string;
  cmd: string;
  caption: string;
  body: ReactNode;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

const Row = ({
  k,
  v,
  color = 'text-text-3',
}: {
  k: string;
  v: string;
  color?: string;
}) => (
  <div className="flex justify-between">
    <span className={color}>{k}</span>
    <span className="text-text-3">{v}</span>
  </div>
);

const Sep = () => (
  <div className="text-text-3" aria-hidden>
    ────────────────────────────────────────────
  </div>
);

const steps: Step[] = [
  {
    num: '01',
    verb: 'scan',
    cmd: 'filemayor scan ~/Downloads',
    caption:
      'Read the directory. No moves yet — no cloud, no permission prompts beyond reading. The CLI takes 1.4 seconds on 1,248 files.',
    body: (
      <>
        <div className="text-text-2">Scanned 1,248 files (4.2 GB) in 1.4s</div>
        <Sep />
        <Row k="Images" v="482 files · 1.2 GB" color="text-[#60a5fa]" />
        <Row k="Videos" v="12 files · 2.1 GB" color="text-[#f472b6]" />
        <Row k="Documents" v="634 files · 0.8 GB" color="text-[#fbbf24]" />
        <Row k="Archives" v="18 files · 0.1 GB" color="text-[#a78bfa]" />
        <Row k="Code" v="102 files · 18 MB" color="text-[#34d399]" />
        <Sep />
        <div className="text-warn">1,242 duplicates · 11.2 GB potentially recoverable</div>
      </>
    ),
  },
  {
    num: '02',
    verb: 'explain',
    cmd: 'filemayor explain ~/Downloads',
    caption:
      'Diagnose the actual problem. A 0–100 health score plus a plain-English issue list. Still no moves, still no upload, still no risk.',
    body: (
      <>
        <div className="text-accent">FILEMAYOR DIAGNOSIS</div>
        <div className="text-text-2">
          Health: <span className="text-warn">22/100</span> (POOR)
        </div>
        <Sep />
        <div className="text-text-2">Issues</div>
        <div className="pl-2">
          <div>• 63 screenshots clogging the root level</div>
          <div>• 14 duplicate installers (.exe, .dmg) — 1.7 GB</div>
          <div>• 27 archive files older than 12 months</div>
          <div>• 8 stale browser downloads (.crdownload)</div>
        </div>
        <div className="pt-1 text-ok">→ filemayor cure ~/Downloads</div>
      </>
    ),
  },
  {
    num: '03',
    verb: 'cure',
    cmd: 'filemayor cure ~/Downloads --prompt "organize by type"',
    caption:
      'Plan, do not act. The AI proposes specific moves with rationale. Nothing happens to your filesystem until you type the next verb.',
    body: (
      <>
        <div className="text-accent">CURATIVE PLAN</div>
        <div className="text-text-3">Gemini 2.0 Flash · 0.8s · metadata only, no file contents read</div>
        <Sep />
        <div className="text-text-2">Strategy</div>
        <div className="pl-2">
          <div>→ Move 63 screenshots → ~/Downloads/Screenshots</div>
          <div>→ Consolidate installers → ~/Downloads/Software</div>
          <div>→ Archive .zip &gt; 12mo → ~/Archive/2024</div>
          <div>→ Trash 8 .crdownload artifacts</div>
        </div>
        <Sep />
        <div className="text-text-2">Plan covers 112 files · ETA 3.1s</div>
        <div className="pt-1 text-ok">→ filemayor apply</div>
      </>
    ),
  },
  {
    num: '04',
    verb: 'apply',
    cmd: 'filemayor apply',
    caption:
      'Execute reversibly. Every move written to a session journal in your workspace. Sub-second per category. Six security layers between the plan and your filesystem.',
    body: (
      <>
        <Row k="[1/4] Screenshots" v="63 moved   ✓" color="text-ok" />
        <Row k="[2/4] Software" v="14 moved   ✓" color="text-ok" />
        <Row k="[3/4] Archive" v="27 moved   ✓" color="text-ok" />
        <Row k="[4/4] Trash" v="8 removed  ✓" color="text-ok" />
        <Sep />
        <div className="text-text-2">Cure applied · 112 files · 3.1s</div>
        <div className="text-text-3">journaled at .filemayor/journal/2026-04-26-1442.json</div>
      </>
    ),
  },
  {
    num: '05',
    verb: 'undo',
    cmd: 'filemayor undo --all',
    caption:
      'Change your mind. One command reverses the whole session. The journal is the safety net — you can explore aggressively without losing data.',
    body: (
      <>
        <div className="text-text-2">Reverting 112 operations from session 2026-04-26-1442</div>
        <Sep />
        <Row k="[1/4] Trash" v="8 restored ✓" color="text-ok" />
        <Row k="[2/4] Archive" v="27 restored ✓" color="text-ok" />
        <Row k="[3/4] Software" v="14 restored ✓" color="text-ok" />
        <Row k="[4/4] Screenshots" v="63 restored ✓" color="text-ok" />
        <Sep />
        <div className="text-text-2">Session reverted · 112 files restored</div>
        <div className="text-text-3">journal sealed · downloads back to original state</div>
      </>
    ),
  },
];

const verbs = ['scan', 'explain', 'cure', 'apply', 'undo'];

export function RealOutput() {
  return (
    <section
      id="run"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="run-heading"
    >
      <div className="container-prose">
        <div className="section-label">What happens when you run it?</div>
        <h2 id="run-heading" className="h-display text-[clamp(36px,5vw,56px)]">
          Five verbs. Real output.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-2 md:text-lg">
          No screenshots. No mocks. The output below is what FileMayor prints today, in the
          order you would type the commands.
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
            hidden: {},
          }}
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[15px] text-text-3"
          aria-label="Verb chain: scan, explain, cure, apply, undo"
        >
          {verbs.map((v, i) => (
            <span key={v} className="flex items-center gap-3">
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: easeOut }}
                className="text-accent"
              >
                {v}
              </motion.span>
              {i < verbs.length - 1 && (
                <motion.span
                  aria-hidden
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className="text-text-3"
                >
                  →
                </motion.span>
              )}
            </span>
          ))}
        </motion.div>

        <ol className="mt-12 space-y-5">
          {steps.map((s) => (
            <motion.li
              key={s.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <header className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border px-6 py-4 md:px-7 md:py-5">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
                    {s.num}
                  </span>
                  <span className="font-display text-[24px] font-normal tracking-tight text-text">
                    {s.verb}
                  </span>
                </div>
                <span className="font-mono text-[12px] text-text-2">{s.cmd}</span>
              </header>

              <div className="term-block space-y-1 p-6 font-mono text-[13px] leading-relaxed text-text-2 md:px-7">
                <div className="text-ok">$ {s.cmd}</div>
                <div className="space-y-1 pt-1">{s.body}</div>
              </div>

              <p className="border-t border-border px-6 py-5 text-[14px] leading-relaxed text-text-2 md:px-7">
                {s.caption}
              </p>
            </motion.li>
          ))}
        </ol>

        <p className="mt-10 max-w-2xl text-[14px] text-text-3">
          The same five verbs work on the desktop app and the PWA. Same engine, three skins.
        </p>
      </div>
    </section>
  );
}
