'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'framer-motion';
import { Reveal } from './Reveal';

const stats = [
  { k: 'Reversible moves', v: 14892, format: (n: number) => Math.round(n).toLocaleString(), sub: 'all journaled · undo any' },
  { k: 'Files categorized', v: 128441, format: (n: number) => Math.round(n).toLocaleString(), sub: 'last 30 days' },
  { k: 'Security layers', v: 6, format: (n: number) => `${Math.round(n)} / 6`, sub: 'Chevza Doctrine green' },
];

const actions = [
  { label: 'Diagnose', sub: '⌘D · explain folder' },
  { label: 'Cure', sub: '⌘E · plan + dry-run' },
  { label: 'Apply', sub: '⌘↵ · journaled' },
  { label: 'Undo', sub: '⌘Z · last operation' },
];

interface CountProps {
  to: number;
  format: (n: number) => string;
  inView: boolean;
  delay?: number;
}

function Count({ to, format, inView, delay = 0 }: CountProps) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? to : 0);
  const display = useTransform(mv, format);
  const [shown, setShown] = useState(format(reduce ? to : 0));

  useEffect(() => {
    const unsub = display.on('change', setShown);
    return () => unsub();
  }, [display]);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(mv, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay });
    return () => c.stop();
  }, [inView, to, mv, delay, reduce]);

  return <>{shown}</>;
}

export function MissionControl() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="mission-control"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="mc-heading"
    >
      <div className="container-prose">
        <Reveal>
          <div className="section-label">HomeView</div>
          <h2 id="mc-heading" className="h-display text-[clamp(36px,5vw,56px)]">
            The new <em className="not-italic text-accent italic">home</em> screen.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-2 md:text-lg">
            Active folder, recent activity, and security status on one screen. Diagnose, cure,
            apply, and undo are one keystroke each.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            ref={ref}
            className="relative mt-12 overflow-hidden rounded-2xl border border-border bg-surface/60 shadow-[0_40px_120px_-40px_rgba(212,175,55,0.18)]"
          >
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

            <div className="flex items-center gap-2 border-b border-border/70 bg-bg/40 px-5 py-3">
              <span className="size-2.5 rounded-full bg-danger/70" />
              <span className="size-2.5 rounded-full bg-warn/70" />
              <span className="size-2.5 rounded-full bg-ok/70" />
              <div className="ml-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-2">
                FileMayor
              </div>
              <div className="ml-auto hidden font-mono text-[11px] text-text-2 md:block">
                ⌘K to summon
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 md:p-8 lg:grid-cols-[1.3fr,1fr]">
              <div className="relative overflow-hidden rounded-xl border border-border bg-bg/40 p-6 md:p-7">
                <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-accent/10 blur-3xl" />
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-2">
                  Active workspace
                </div>
                <div className="mt-2 font-display text-[26px] leading-tight tracking-tight md:text-[30px]">
                  ~/Projects/filemayor
                </div>
                <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-text-2">
                  Good morning, Chevza. The workspace looks healthy. 4 cures pending review.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-md border border-accent/40 bg-accent/[0.1] px-3 py-1.5 font-mono text-[12px] text-accent transition-colors hover:bg-accent/[0.15]">
                    Change workspace
                  </span>
                  <span className="rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-[12px] text-text-2 transition-colors hover:border-border-strong hover:text-text">
                    Diagnose now
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.k}
                    initial={{ opacity: 0, x: 16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-center justify-between rounded-xl border border-border bg-bg/40 px-5 py-4 transition-colors hover:border-border-strong"
                  >
                    <div>
                      <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-text-2">
                        {s.k}
                      </div>
                      <div className="mt-0.5 text-[12.5px] text-text-2">{s.sub}</div>
                    </div>
                    <div className="font-display text-[26px] leading-none text-text tabular-nums">
                      <Count to={s.v} format={s.format} inView={inView} delay={0.2 + i * 0.08} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px border-t border-border bg-border md:grid-cols-4">
              {actions.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative cursor-default overflow-hidden bg-surface p-5 transition-colors duration-300 hover:bg-bg/30"
                >
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-accent/0 transition-colors duration-300 group-hover:bg-accent/50" />
                  <div className="font-display text-[20px] leading-tight tracking-tight transition-colors duration-300 group-hover:text-accent">
                    {a.label}
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-text-2">
                    {a.sub}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-border bg-bg/40 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-2">
              {['jailer', 'vault', 'guardrail'].map((layer, i) => (
                <span key={layer} className="flex items-center gap-1.5 text-ok">
                  <span className="relative inline-block size-1.5 rounded-full bg-ok">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: [0, 0.6, 0] } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.8 + i * 0.4,
                        ease: 'easeOut',
                      }}
                      className="absolute inset-0 rounded-full bg-ok"
                    />
                  </span>
                  {layer} · ok
                </span>
              ))}
              <span>undo depth · 42</span>
              <span className="ml-auto hidden md:inline">last cure · 2m ago</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
