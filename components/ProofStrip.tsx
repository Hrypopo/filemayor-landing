'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { site } from '@/lib/site';

const formatBig = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 10_000) return `${Math.round(n / 1000)}k+`;
  if (n >= 1_000) return `${(n / 1000).toFixed(1)}k+`;
  return n.toLocaleString();
};

const layers = ['jail', 'vault', 'guardrail', 'halt', 'architect', 'security'];

export function ProofStrip() {
  const [npmTotal, setNpmTotal] = useState<number | null>(null);
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('https://api.npmjs.org/downloads/range/last-year/filemayor')
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        const sum = (d?.downloads ?? []).reduce(
          (acc: number, x: { downloads: number }) => acc + x.downloads,
          0,
        );
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

  const cells = [
    { v: formatBig(npmTotal ?? site.metrics.npmInstalls), k: 'npm installs' },
    { v: stars !== null ? stars.toLocaleString() : '—', k: 'GitHub stars' },
    { v: site.metrics.testsPassing.toString(), k: 'tests passing' },
    { v: site.metrics.vulnerabilities.toString(), k: 'vulnerabilities' },
  ];

  return (
    <section
      className="border-y border-border bg-surface/30"
      aria-label="Proof: live metrics and security architecture"
    >
      <div className="container-prose">
        <dl className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
          {cells.map((c) => (
            <div key={c.k} className="px-6 py-7 first:border-l-0 md:px-7 md:py-8">
              <dd className="font-display text-[36px] font-normal leading-none tracking-tight text-text">
                {c.v}
              </dd>
              <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
                {c.k}
              </dt>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border px-1 py-5 font-mono text-[12px] text-text-2 md:py-6">
          <span className="text-text-3">Under the hood —</span>
          <span className="text-text">Chevza Doctrine</span>
          <span aria-hidden className="text-text-3">
            ·
          </span>
          {layers.map((l, i) => (
            <span key={l} className="flex items-center gap-3">
              <span className="text-text-2">{l}</span>
              {i < layers.length - 1 && (
                <span aria-hidden className="text-text-3">
                  ·
                </span>
              )}
            </span>
          ))}
          <Link
            href="/docs/security"
            className="ml-auto text-text-2 transition-colors hover:text-accent"
          >
            Read the architecture <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
