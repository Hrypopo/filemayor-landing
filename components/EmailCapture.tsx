'use client';
import { useState, FormEvent } from 'react';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <p className="font-mono text-[13px] text-accent">
        ✓ You&apos;re in. We&apos;ll email you when a new release ships.
      </p>
    );
  }

  return (
    <div>
      <form onSubmit={submit} className="flex max-w-md flex-wrap gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="min-w-0 flex-1 rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-[13px] text-text placeholder:text-text-3 outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn btn-primary shrink-0"
        >
          {state === 'loading' ? '…' : 'Notify me →'}
        </button>
      </form>
      {state === 'error' && (
        <p className="mt-2 font-mono text-[12px] text-red-400">
          Something went wrong — try again.
        </p>
      )}
    </div>
  );
}
