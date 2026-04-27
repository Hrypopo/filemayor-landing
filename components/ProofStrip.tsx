'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef } from 'react';
import { site } from '@/lib/site';

const formatBig = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 10_000) return `${Math.round(n / 1000)}k+`;
  if (n >= 1_000) return `${(n / 1000).toFixed(1)}k+`;
  return n.toLocaleString();
};

const layers = ['jail', 'vault', 'guardrail', 'halt', 'architect', 'security'];

interface CountProps {
  to: number;
  format?: (n: number) => string;
  fallback?: string;
  inView: boolean;
  delay?: number;
}

function Count({ to, format = (n) => Math.round(n).toLocaleString(), fallback, inView, delay = 0 }: CountProps) {
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => format(v));
  const [shown, setShown] = useState<string>(fallback ?? format(0));

  useEffect(() => {
    const unsub = display.on('change', (v) => setShown(v));
    return () => unsub();
  }, [display]);

  useEffect(() => {
    if (!inView || to <= 0) return;
    const controls = animate(mv, to, { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay });
    return () => controls.stop();
  }, [inView, to, mv, delay]);

  return <>{shown}</>;
}

export function ProofStrip() {
  const [npmTotal, setNpmTotal] = useState<number | null>(null);
  const [stars, setStars] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

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

  const easeOut = [0.16, 1, 0.3, 1] as const;
  const npm = npmTotal ?? site.metrics.npmInstalls;

  return (
    <section
      ref={ref}
      className="border-y border-border bg-surface/30"
      aria-label="Proof: live metrics and security architecture"
    >
      <div className="container-prose">
        <dl className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut }}
            className="px-6 py-7 first:border-l-0 md:px-7 md:py-8"
          >
            <dd className="font-display text-[36px] font-normal leading-none tracking-tight text-text">
              <Count to={npm} format={formatBig} fallback={formatBig(npm)} inView={inView} />
            </dd>
            <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
              npm installs
            </dt>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
            className="px-6 py-7 md:px-7 md:py-8"
          >
            <dd className="font-display text-[36px] font-normal leading-none tracking-tight text-text">
              {stars !== null ? (
                <Count to={stars} inView={inView} delay={0.08} />
              ) : (
                '—'
              )}
            </dd>
            <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
              GitHub stars
            </dt>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.16 }}
            className="px-6 py-7 md:px-7 md:py-8"
          >
            <dd className="font-display text-[36px] font-normal leading-none tracking-tight text-text">
              <Count to={site.metrics.testsPassing} inView={inView} delay={0.16} />
            </dd>
            <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
              tests passing
            </dt>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.24 }}
            className="px-6 py-7 md:px-7 md:py-8"
          >
            <dd className="font-display text-[36px] font-normal leading-none tracking-tight text-text">
              {site.metrics.vulnerabilities}
            </dd>
            <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
              vulnerabilities
            </dt>
          </motion.div>
        </dl>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.4 }}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border px-1 py-5 font-mono text-[12px] text-text-2 md:py-6"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
