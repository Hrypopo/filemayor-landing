import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AI File Organiser — FileMayor',
  description:
    'FileMayor uses AI to diagnose your messy folders, propose a reorganisation plan in plain English, and execute it — with a full undo if you change your mind.',
  robots: { index: false, follow: false },
};

const problems = [
  { label: 'Downloads folder', desc: '847 files. 3 years. Zero structure.' },
  { label: 'Desktop chaos', desc: 'Screenshot-2024-03-... × 94.' },
  { label: 'Project folders', desc: 'final_v2_FINAL_use-this.docx' },
  { label: 'Photo dumps', desc: '12,000 photos. No dates. No albums.' },
];

const howItWorks = [
  { n: '01', title: 'Describe what you want', desc: '"Organise my Downloads by project", "archive everything older than 6 months", "find and remove duplicates." Natural language. No syntax.' },
  { n: '02', title: 'FileMayor diagnoses and plans', desc: 'The AI scans the folder structure — not file contents — and proposes a reorganisation in plain English. You can read every move before it happens.' },
  { n: '03', title: 'You approve. It executes.', desc: 'Nothing moves until you say so. When you approve, the engine executes the plan with a safety layer checking every operation.' },
  { n: '04', title: 'Undo if anything is wrong', desc: 'Every move is journaled. One command reverses everything — in order, back to exactly where it was.' },
];

const comparison = [
  { label: 'Requires upfront rules', you: false, hazel: true, script: true },
  { label: 'Works on any folder structure', you: true, hazel: false, script: false },
  { label: 'Shows plan before executing', you: true, hazel: false, script: false },
  { label: 'Full session undo', you: true, hazel: false, script: false },
  { label: 'Plain English instructions', you: true, hazel: false, script: false },
  { label: 'File contents stay local', you: true, hazel: true, script: true },
  { label: 'Free to start', you: true, hazel: false, script: true },
];

export default function LPAIOrganiserPage() {
  return (
    <main className="min-h-screen bg-bg text-text" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>

      {/* Nav — minimal */}
      <nav className="border-b border-border px-6 py-4 md:px-12">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <span className="font-display text-[20px] tracking-tight">{site.name}</span>
          <Link href="/download" className="btn btn-primary text-[13px]">
            Try it free <span aria-hidden>→</span>
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-20 md:px-12 md:py-28">

        {/* Hero */}
        <div className="mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.06] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            AI-powered · fully reversible · local-only
          </div>
          <h1 className="font-display text-[clamp(40px,6vw,72px)] font-normal leading-[1.08] tracking-tight">
            Your filesystem, finally organised.{' '}
            <em className="not-italic text-accent italic">With one undo<br />if anything is wrong.</em>
          </h1>
          <p className="mt-7 max-w-2xl text-[18px] leading-relaxed text-text-2">
            FileMayor uses AI to diagnose any folder, propose a reorganisation plan in plain
            English, and execute it — safely, locally, and completely reversibly.
            No rules to write. No syntax to learn.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/download" className="btn btn-primary">
              Download free for Mac · Windows · Linux <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Problem illustrations */}
        <div className="mb-20">
          <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.14em] text-text-3">Sound familiar?</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {problems.map((p) => (
              <div key={p.label} className="rounded-xl border border-border bg-surface p-5">
                <p className="font-medium text-text">{p.label}</p>
                <p className="mt-1 font-mono text-[13px] text-text-3">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mb-20">
          <h2 className="mb-10 font-display text-[clamp(24px,3vw,40px)] font-normal leading-tight tracking-tight">
            How it works.
          </h2>
          <ol className="space-y-5">
            {howItWorks.map((s) => (
              <li key={s.n} className="flex gap-6 rounded-2xl border border-border bg-surface p-6">
                <div className="font-mono text-[13px] text-accent shrink-0 pt-0.5">{s.n}</div>
                <div>
                  <h3 className="text-[17px] font-medium text-text">{s.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-text-2">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Comparison */}
        <div className="mb-20">
          <h2 className="mb-8 font-display text-[clamp(24px,3vw,36px)] font-normal leading-tight tracking-tight">
            How FileMayor compares.
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-5 py-4 text-left font-normal text-text-3"></th>
                  <th className="px-5 py-4 text-center font-semibold text-accent">FileMayor</th>
                  <th className="px-5 py-4 text-center font-normal text-text-3">Hazel</th>
                  <th className="px-5 py-4 text-center font-normal text-text-3">Shell scripts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparison.map((row) => (
                  <tr key={row.label}>
                    <td className="px-5 py-4 text-text-2">{row.label}</td>
                    <td className="px-5 py-4 text-center">{row.you ? <span className="text-accent font-semibold">✓</span> : <span className="text-text-3">—</span>}</td>
                    <td className="px-5 py-4 text-center">{row.hazel ? <span className="text-text-2">✓</span> : <span className="text-text-3">—</span>}</td>
                    <td className="px-5 py-4 text-center">{row.script ? <span className="text-text-2">✓</span> : <span className="text-text-3">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-10 text-center">
          <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-normal leading-tight tracking-tight">
            Start with Downloads.<br />
            <em className="not-italic text-accent italic">See what happens.</em>
          </h2>
          <p className="mt-4 text-[16px] text-text-2">
            Free to install. No account required.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/download" className="btn btn-primary">
              Download FileMayor free <span aria-hidden>→</span>
            </Link>
            <Link href="/docs" className="btn btn-mono">
              Read the docs
            </Link>
          </div>
          <p className="mt-5 font-mono text-[11px] text-text-3">
            Mac · Windows · Linux · No account required
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
