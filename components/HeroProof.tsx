import { site } from '@/lib/site';

/**
 * Compact trust band directly under the hero — fast, specific credibility
 * signals (the "why this is worth it" glance). The fuller animated ProofStrip
 * lives lower on the page; this is the above-the-fold reassurance.
 */

const fmt = (n: number) =>
  n >= 1000 ? `${Math.round(n / 1000)}k+` : n.toLocaleString();

const stats: { value: string; label: string }[] = [
  { value: fmt(site.metrics.npmInstalls), label: 'installs' },
  { value: String(site.metrics.runtimeVulns), label: 'vulnerabilities' },
  { value: String(site.metrics.testsPassing), label: 'tests passing' },
  { value: `${site.metrics.securityLayers}-layer`, label: 'hardened runtime' },
];

export function HeroProof() {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="container-prose flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-5">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="font-mono text-[15px] font-medium tabular-nums text-accent">
                {s.value}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
          <span>Runs in</span>
          <span className="text-text-2">Claude</span>
          <span aria-hidden className="text-border-strong">·</span>
          <span className="text-text-2">Cursor</span>
          <span aria-hidden className="text-border-strong">·</span>
          <span className="text-text-2">Zed</span>
        </div>
      </div>
    </section>
  );
}
