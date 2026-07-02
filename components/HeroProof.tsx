import { site } from '@/lib/site';

/**
 * Slim credibility strip directly under the hero — specific numbers and
 * recognizable client names, one glance. Static (from site.ts) so it renders
 * instantly with zero layout shift; the live-counting ProofStrip lower on the
 * page carries the animated versions.
 */

const stats: [string, string][] = [
  [`${Math.round(site.metrics.npmInstalls / 1000)}k+`, 'npm installs'],
  [`${site.metrics.testsPassing}`, 'tests passing'],
  [`${site.metrics.runtimeVulns}`, 'runtime vulns'],
  [`${site.metrics.securityLayers}`, 'safety layers'],
];

export function HeroProof() {
  return (
    <section aria-label="Trust and compatibility" className="section-divider">
      <div className="container-prose flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-6">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {stats.map(([value, label]) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="font-display text-[22px] tracking-tight text-text">{value}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-3">
                {label}
              </span>
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-3">
          Runs in <span className="text-text-2">Claude Desktop</span> ·{' '}
          <span className="text-text-2">Cursor</span> ·{' '}
          <span className="text-text-2">Zed</span> — via MCP
        </p>
      </div>
    </section>
  );
}
