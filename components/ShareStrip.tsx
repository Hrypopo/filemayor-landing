'use client';

import { useState } from 'react';
import { track } from '@vercel/analytics';

const SHARE_URL = 'https://filemayor.com';
const SHARE_TEXT =
  'FileMayor organises your folders with an AI plan you approve first — and can undo entirely. Free, local-only, works on Mac/Windows/Linux.';

const channels = [
  {
    key: 'x',
    label: 'X / Twitter',
    href: `https://x.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT + '\n\n' + SHARE_URL)}`,
  },
  {
    key: 'hn',
    label: 'Hacker News',
    href: `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(SHARE_URL)}&t=${encodeURIComponent('FileMayor – AI file organiser with plan-first + full undo')}`,
  },
  {
    key: 'reddit',
    label: 'Reddit',
    href: `https://www.reddit.com/submit?url=${encodeURIComponent(SHARE_URL)}&title=${encodeURIComponent('FileMayor – AI file organiser with plan-first + full undo (free, local-only)')}`,
  },
];

export function ShareStrip() {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      track('referral_copy_link');
    } catch {
      /* clipboard may be blocked */
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-7 md:p-8">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
        Know someone who&apos;d use this?
      </div>
      <h2 className="mt-3 font-display text-[22px] font-normal tracking-tight text-text">
        Share FileMayor.
      </h2>
      <p className="mt-2 text-[14px] leading-relaxed text-text-2">
        It&apos;s free and always will be. Word of mouth from a real user is worth more than any ad.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copyLink}
          className="btn btn-mono text-[13px]"
        >
          {copied ? '✓ Copied' : 'Copy link'}
        </button>
        {channels.map((c) => (
          <a
            key={c.key}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('referral_share', { channel: c.key })}
            className="btn btn-mono text-[13px]"
          >
            Share on {c.label}
          </a>
        ))}
      </div>
    </div>
  );
}
