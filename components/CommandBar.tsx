'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const queries = [
  'diagnose my Downloads',
  'cure ~/Projects --dry-run',
  'find duplicates in ~/Desktop',
  'undo last operation',
  'organize ~/Downloads by type',
  'explain why this folder is messy',
];

interface CommandBarProps {
  className?: string;
}

export function CommandBar({ className }: CommandBarProps) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = queries[phraseIdx];
    const atEnd = !deleting && text === current;
    const atStart = deleting && text === '';

    if (atEnd) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    }
    if (atStart) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % queries.length);
      return;
    }

    const delay = deleting ? 28 : 58;
    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1),
      );
    }, delay);
    return () => clearTimeout(t);
  }, [text, phraseIdx, deleting]);

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border bg-surface/80 backdrop-blur',
        'shadow-[0_30px_80px_-30px_rgba(212,175,55,0.18)]',
        className,
      )}
      role="img"
      aria-label="FileMayor command bar — press ⌘K and type a request"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="flex items-center gap-4 px-5 py-4 md:px-6 md:py-5">
        <kbd className="hidden shrink-0 rounded-md border border-border bg-bg/70 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-text-2 md:inline-block">
          ⌘ K
        </kbd>
        <div className="min-w-0 flex-1 font-mono text-[15px] leading-snug text-text md:text-[17px]">
          <span className="text-text-3">›</span>{' '}
          <span>{text}</span>
          <span className="ml-0.5 inline-block h-[1.05em] w-[2px] -translate-y-[1px] animate-pulse bg-accent align-middle" />
        </div>
        <span className="hidden shrink-0 rounded-full border border-accent/30 bg-accent/[0.08] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent md:inline-block">
          jarvis
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-border/60 bg-bg/30 px-5 py-3 font-mono text-[11px] text-text-3 md:px-6">
        <span>local · offline-first · journaled · undo-anything</span>
      </div>
    </div>
  );
}
