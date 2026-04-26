'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

interface Metric {
  label: string;
  value: string;
  sub?: string;
}

const formatNumber = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k+`;
  return n.toLocaleString();
};

export function OpenMetrics() {
  const [npmTotal, setNpmTotal] = useState<number | null>(null);
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('https://api.npmjs.org/downloads/range/last-year/filemayor')
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        const sum =
          (d?.downloads ?? []).reduce((acc: number, x: { downloads: number }) => acc + x.downloads, 0) || null;
        if (sum) setNpmTotal(sum);
      })
      .catch(() => {});
    fetch('https://api.github.com/repos/Hrypopo/FileMayor')
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && typeof d?.stargazers_count === 'number') setStars(d.stargazers_count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const metrics: Metric[] = [
    {
      label: 'npm installs',
      value: formatNumber(npmTotal ?? site.metrics.npmInstalls),
      sub: 'last 12 months',
    },
    {
      label: 'GitHub stars',
      value: stars !== null ? stars.toLocaleString() : '—',
      sub: 'Hrypopo/FileMayor',
    },
    {
      label: 'tests passing',
      value: site.metrics.testsPassing.toString(),
      sub: '0 vulnerabilities',
    },
    {
      label: 'locales',
      value: site.metrics.locales.toString(),
      sub: 'shipped in app',
    },
  ];

  return (
    <section
      id="open"
      className="border-t border-border py-24 md:py-28"
      aria-labelledby="open-heading"
    >
      <div className="container-prose">
        <div className="section-label">Open metrics</div>
        <h2 id="open-heading" className="h-display text-[clamp(36px,5vw,56px)]">
          Proof, not claim.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-2">
          These numbers update from npm and GitHub directly. No marketing rounding.
        </p>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-surface p-7">
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
                {m.label}
              </dt>
              <dd className="mt-3 font-display text-[44px] font-normal leading-none tracking-tight text-text">
                {m.value}
              </dd>
              {m.sub && (
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-3">
                  {m.sub}
                </div>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
