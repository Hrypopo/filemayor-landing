'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Self-playing hero demo: types a PARA command, then "sorts" a messy folder
 * into the four buckets with growing bars, then confirms — and loops.
 * Pure motion, no external images. Honors prefers-reduced-motion.
 */

const CMD = 'filemayor para ~/Downloads';

const BUCKETS = [
  { name: 'Projects', count: 14, color: '#38bdf8', pct: 34, reason: 'active work' },
  { name: 'Areas', count: 6, color: '#f59e0b', pct: 16, reason: 'finances · health' },
  { name: 'Resources', count: 23, color: '#34d399', pct: 52, reason: 'reference · books' },
  { name: 'Archives', count: 41, color: '#a78bfa', pct: 88, reason: 'untouched 12+ mo' },
];

interface HeroDemoProps {
  className?: string;
}

export function HeroDemo({ className }: HeroDemoProps) {
  const reduce = useReducedMotion();
  const [loop, setLoop] = useState(0);
  const [typed, setTyped] = useState(reduce ? CMD : '');
  const [phase, setPhase] = useState<'typing' | 'sorting' | 'done'>(reduce ? 'done' : 'typing');

  useEffect(() => {
    if (reduce) return; // static, fully-revealed state
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    setTyped('');
    setPhase('typing');

    // 1. type the command
    let i = 0;
    const typeTick = () => {
      if (cancelled) return;
      i += 1;
      setTyped(CMD.slice(0, i));
      if (i < CMD.length) at(45, typeTick);
      else at(450, () => setPhase('sorting')); // 2. sort into buckets
    };
    at(500, typeTick);

    // 3. confirm, then 4. restart the loop
    at(500 + CMD.length * 45 + 450 + 1900, () => !cancelled && setPhase('done'));
    at(500 + CMD.length * 45 + 450 + 1900 + 2600, () => !cancelled && setLoop((n) => n + 1));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [loop, reduce]);

  const sorting = phase === 'sorting' || phase === 'done';

  return (
    <div className={cn('relative', className)}>
      {/* Gold glow behind the window — depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 rounded-[2rem] opacity-70 blur-2xl"
        style={{
          background:
            'radial-gradient(60% 55% at 60% 30%, rgb(212 175 55 / 0.22), transparent 70%)',
        }}
      />

      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="term-block overflow-hidden rounded-2xl border border-border-strong shadow-[0_40px_120px_-40px_rgb(212_175_55_/_0.35)]"
        role="img"
        aria-label="FileMayor sorting a Downloads folder into PARA buckets: Projects, Areas, Resources, and Archives, then applying the plan reversibly."
      >
        {/* top sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-black/40 px-4 py-3">
          <span className="size-3 rounded-full bg-white/15" />
          <span className="size-3 rounded-full bg-white/15" />
          <span className="size-3 rounded-full bg-white/15" />
          <span className="ml-2 font-mono text-[11px] text-text-3">~/Downloads — filemayor</span>
        </div>

        <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed md:p-6">
          {/* command line */}
          <div className="flex items-center gap-2 text-text">
            <span className="text-ok">$</span>
            <span>
              {typed}
              {phase === 'typing' && (
                <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-[2px] animate-pulse bg-accent" />
              )}
            </span>
          </div>

          {/* diagnosis line */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: sorting ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-text-3"
          >
            Scanned 84 files · sorting by actionability…
          </motion.div>

          {/* buckets */}
          <div className="space-y-2.5 pt-1">
            {BUCKETS.map((b, idx) => (
              <div key={b.name} className="space-y-1">
                <motion.div
                  className="flex items-center justify-between"
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: sorting ? 1 : 0, x: sorting ? 0 : -8 }}
                  transition={{ duration: 0.35, delay: sorting && !reduce ? idx * 0.28 : 0 }}
                >
                  <span className="flex items-center gap-2" style={{ color: b.color }}>
                    <span className="size-2 rounded-[3px]" style={{ background: b.color }} />
                    {b.name}
                  </span>
                  <span className="text-text-3">
                    <span className="text-text-2">{b.count}</span> · {b.reason}
                  </span>
                </motion.div>
                {/* growing bar */}
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: b.color }}
                    initial={reduce ? false : { width: 0 }}
                    animate={{ width: sorting ? `${b.pct}%` : 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.7,
                      delay: sorting && !reduce ? 0.15 + idx * 0.28 : 0,
                      ease: 'easeOut',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* confirm chip */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: phase === 'done' ? 1 : 0, y: phase === 'done' ? 0 : 6 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 pt-1 text-ok"
          >
            <span>✓ 84 moves applied</span>
            <span className="text-text-3">· journaled · reversible with</span>
            <span className="text-text-2">filemayor undo</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
