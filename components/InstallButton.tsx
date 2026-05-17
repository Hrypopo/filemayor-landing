'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface InstallButtonProps {
  command?: string;
  className?: string;
}

export function InstallButton({
  command = 'npm install -g filemayor',
  className,
}: InstallButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard might be blocked in non-https sandbox preview — silent fail */
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? 'Copied' : `Copy ${command}`}
      className={cn('btn btn-mono group relative', className)}
    >
      <span className="text-accent" aria-hidden>
        $
      </span>
      <span>{command}</span>
      <span
        className="ml-2 font-sans text-[10px] uppercase tracking-[0.14em] text-text-3 transition-colors group-hover:text-text-2"
        aria-hidden
      >
        {copied ? 'copied' : 'click to copy'}
      </span>
    </button>
  );
}
