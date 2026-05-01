import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Use FileMayor through your LLM',
  description:
    'Install the FileMayor skill in Claude, Cowork, or any LLM agent. Lets your assistant organize files for you, safely, with the full Curative Triad workflow intact.',
};

const triggers = [
  '"organize my Downloads folder"',
  '"clean up disk space"',
  '"find duplicate photos"',
  '"what is eating my disk"',
  '"file my receipts in Documents"',
  '"declutter my desktop"',
];

const steps = [
  {
    n: '01',
    label: 'scan',
    cmd: 'filemayor scan ~/Downloads --json',
    desc: 'Read-only inventory.',
  },
  {
    n: '02',
    label: 'explain',
    cmd: 'filemayor explain ~/Downloads',
    desc: 'Health score + plain-English issues.',
  },
  {
    n: '03',
    label: 'cure',
    cmd: 'filemayor cure ~/Downloads --prompt "..."',
    desc: 'AI proposes the plan. Nothing touched.',
  },
  {
    n: '04',
    label: 'apply',
    cmd: 'filemayor apply',
    desc: 'Execute. Journaled per move.',
  },
  {
    n: '05',
    label: 'undo',
    cmd: 'filemayor undo --all',
    desc: 'Reverse the session at any time.',
  },
];

export default function SkillPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="section-divider section-pad">
          <div className="container-prose">
            <div className="section-label">Use through your LLM</div>
            <h1 className="h-display text-[clamp(40px,6vw,80px)]">
              Talk to your filesystem. Through Claude.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-2 md:text-xl">
              Install {site.name} as a skill in Claude, Cowork, or any LLM agent
              that supports system prompts. From then on, prompts like{' '}
              <em className="not-italic text-accent">{triggers[0]}</em> route through{' '}
              {site.name}'s Curative Triad — your assistant runs the right
              commands in the right order, with the safety rails intact.
            </p>
            <p className="mt-4 max-w-2xl font-mono text-[12px] uppercase tracking-[0.14em] text-text-3">
              Files never leave your machine · the LLM only orchestrates · undo always works
            </p>
          </div>
        </section>

        <section className="section-divider section-pad-sm">
          <div className="container-prose">
            <div className="section-label">Install · ~30 seconds</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Three commands.
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
              <div className="bg-surface p-7">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  Step 1
                </div>
                <h3 className="mt-3 font-display text-[22px] font-normal leading-tight tracking-tight">
                  Install the CLI.
                </h3>
                <code className="mt-5 block rounded-md border border-border bg-bg px-3 py-2.5 font-mono text-[13px] text-text">
                  npm install -g filemayor
                </code>
                <p className="mt-3 text-[13.5px] leading-relaxed text-text-3">
                  Requires Node 20+. Or grab the desktop app — same engine, no Node needed.
                </p>
              </div>

              <div className="bg-surface p-7">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  Step 2
                </div>
                <h3 className="mt-3 font-display text-[22px] font-normal leading-tight tracking-tight">
                  Drop in the skill.
                </h3>
                <code className="mt-5 block whitespace-pre-wrap break-all rounded-md border border-border bg-bg px-3 py-2.5 font-mono text-[12px] leading-relaxed text-text">
{`git clone https://github.com/Hrypopo/filemayor-landing.git /tmp/fm-skill
mkdir -p ~/.claude/skills
cp -r /tmp/fm-skill/skill ~/.claude/skills/filemayor
rm -rf /tmp/fm-skill`}
                </code>
                <p className="mt-3 text-[13.5px] leading-relaxed text-text-3">
                  Restart Claude Code. The skill auto-loads from{' '}
                  <code className="font-mono text-[12px]">~/.claude/skills</code>.
                </p>
              </div>

              <div className="bg-surface p-7">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  Step 3
                </div>
                <h3 className="mt-3 font-display text-[22px] font-normal leading-tight tracking-tight">
                  Just ask.
                </h3>
                <ul className="mt-5 space-y-2 text-[13.5px] leading-relaxed text-text-2">
                  {triggers.slice(0, 4).map((t) => (
                    <li key={t} className="flex gap-2.5">
                      <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                      <span className="font-mono text-[12.5px]">{t}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[13.5px] leading-relaxed text-text-3">
                  The skill triggers automatically. No prefix needed.
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-2xl text-[14px] leading-relaxed text-text-2">
              Cowork users: install via plugin marketplace (search FileMayor), or copy the
              skill folder into your local Cowork skills directory using the same pattern.
              Other MCP-compatible clients can paste the SKILL.md contents into a system
              prompt — a dedicated MCP server is in progress.
            </p>
          </div>
        </section>

        <section className="section-divider section-pad-sm">
          <div className="container-prose">
            <div className="section-label">What the skill teaches your LLM</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              The Curative Triad. With safety rails.
            </h2>
            <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-text-2">
              The skill is one markdown file. It teaches the LLM five verbs and five
              non-negotiable rules — never apply without a plan, never touch system
              directories, always offer undo, etc. Even a misbehaving LLM can't bypass the
              CLI's Doctrine layers — those are enforced inside the binary.
            </p>

            <ol className="mt-10 space-y-4">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-surface p-5 md:grid-cols-[80px,160px,1fr] md:items-center md:gap-6 md:p-6"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
                    {s.n}
                  </div>
                  <div className="font-display text-[22px] font-normal tracking-tight text-accent">
                    {s.label}
                  </div>
                  <div>
                    <code className="block font-mono text-[13px] text-text">{s.cmd}</code>
                    <p className="mt-1.5 text-[13.5px] text-text-2">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-divider section-pad-sm">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Privacy posture</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              The LLM orchestrates. The CLI executes. Your files stay local.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-text-2">
              Your assistant's role is the conductor — it picks which command to run, parses
              the JSON output, asks you to confirm. The actual file work happens inside the{' '}
              <Link href="/docs/security" className="text-accent">
                Chevza Doctrine
              </Link>{' '}
              on your machine. AI metadata-only calls only fire when you explicitly use a
              command that involves them (<code className="font-mono text-[14px]">explain</code>,{' '}
              <code className="font-mono text-[14px]">cure</code>); the rest of the verbs are
              fully offline.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-text-2">
              Disable all AI with{' '}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13.5px]">
                FILEMAYOR_AI=off
              </code>
              . The skill still works — your assistant just falls back to{' '}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13.5px]">
                organize
              </code>{' '}
              and the deterministic verbs.
            </p>
          </div>
        </section>

        <section className="section-pad-sm">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Sources</div>
            <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-text-2">
              <li>
                <Link
                  href="https://github.com/Hrypopo/filemayor-landing/tree/main/skill"
                  className="font-mono text-[14px] text-accent hover:underline"
                >
                  github.com/Hrypopo/filemayor-landing/tree/main/skill
                </Link>{' '}
                — the skill source. Inspect <code className="font-mono text-[14px]">SKILL.md</code> before installing.
              </li>
              <li>
                <Link href="/docs/cli" className="text-accent hover:underline">
                  /docs/cli
                </Link>{' '}
                — every command the skill teaches your LLM to use, with examples and exit codes.
              </li>
              <li>
                <Link href="/blog/curative-triad" className="text-accent hover:underline">
                  /blog/curative-triad
                </Link>{' '}
                — the why behind the workflow.
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
