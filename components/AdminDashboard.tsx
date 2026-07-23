'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Owner analytics dashboard (key-gated, noindex).
 * Data: /api/admin/stats — npm downloads, GitHub, Resend subscribers, and
 * CLI telemetry (when KV is configured). Charts are inline SVG following
 * the dataviz spec: thin marks, 2px lines, direct labels, hover tooltips,
 * table fallbacks, and a CVD-validated categorical palette.
 */

// Categorical palette — validated (lightness band, chroma, CVD ≥ 12, contrast)
// against the dark surface. Identity only; magnitude charts use one hue.
const CAT = ['#0284c7', '#d97706', '#059669', '#8b5cf6'];
const GOLD = '#d4af37';

interface Stats {
  generatedAt: string;
  npm: {
    latest: string | null; versions: number | null; lastPublish: string | null;
    week: number | null; month: number | null; year: number | null; mcpMonth: number | null;
    daily: { day: string; n: number }[];
  };
  github: { stars: number; forks: number; issues: number } | null;
  subscribers: { configured: boolean; count?: number | null; active?: number };
  telemetry: {
    configured: boolean; unavailable?: boolean; total?: number;
    byCommand?: { cmd: string; n: number }[];
    byOs?: { os: string; n: number }[];
    byDay?: { day: string; n: number }[];
  };
}

const fmt = (n: number | null | undefined) =>
  n === null || n === undefined ? '—' : n >= 10000 ? `${(n / 1000).toFixed(1)}k` : n.toLocaleString();

function Tile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-3">{label}</p>
      <p className="mt-2 font-display text-[30px] leading-none tracking-tight text-text">{value}</p>
      {hint && <p className="mt-2 text-[11px] text-text-3">{hint}</p>}
    </div>
  );
}

/** Single-series daily line (gold) with crosshair tooltip + table fallback. */
function DailyLine({ title, data }: { title: string; data: { day: string; n: number }[] }) {
  const [hover, setHover] = useState<number | null>(null);
  if (data.length === 0) return null;
  const W = 640, H = 160, PAD = 8;
  const max = Math.max(...data.map((d) => d.n), 1);
  const x = (i: number) => PAD + (i * (W - 2 * PAD)) / Math.max(data.length - 1, 1);
  const y = (n: number) => H - PAD - (n / max) * (H - 2 * PAD);
  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.n).toFixed(1)}`).join(' ');
  const area = `${path} L${x(data.length - 1).toFixed(1)},${H - PAD} L${x(0).toFixed(1)},${H - PAD} Z`;

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-3">{title}</p>
      <div className="relative mt-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          role="img"
          aria-label={`${title}: ${data.length} days, peak ${fmt(max)}`}
          onMouseLeave={() => setHover(null)}
          onMouseMove={(e) => {
            const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
            const px = ((e.clientX - r.left) / r.width) * W;
            const i = Math.round(((px - PAD) / (W - 2 * PAD)) * (data.length - 1));
            setHover(Math.max(0, Math.min(data.length - 1, i)));
          }}
        >
          <path d={area} fill={GOLD} opacity={0.12} />
          <path d={path} fill="none" stroke={GOLD} strokeWidth={2} strokeLinejoin="round" />
          {hover !== null && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={PAD} y2={H - PAD} stroke="currentColor" opacity={0.25} strokeWidth={1} />
              <circle cx={x(hover)} cy={y(data[hover].n)} r={4} fill={GOLD} stroke="rgb(22 19 17)" strokeWidth={2} />
            </g>
          )}
        </svg>
        {hover !== null && (
          <div className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 rounded-md border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-text">
            {data[hover].day} · {data[hover].n.toLocaleString()}
          </div>
        )}
      </div>
      <details className="mt-2">
        <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.12em] text-text-3">table</summary>
        <table className="mt-2 w-full text-left font-mono text-[11px] text-text-2">
          <tbody>
            {data.map((d) => (
              <tr key={d.day}><td className="pr-4">{d.day}</td><td>{d.n}</td></tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}

/** Horizontal bars, one measure → one hue; direct labels; hover highlight. */
function Bars({
  title, rows, color = CAT[1], colorByIndex = false,
}: {
  title: string;
  rows: { label: string; n: number }[];
  color?: string;
  colorByIndex?: boolean;
}) {
  const [hover, setHover] = useState<number | null>(null);
  if (rows.length === 0) return null;
  const max = Math.max(...rows.map((r) => r.n), 1);
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-3">{title}</p>
      <div className="mt-3 space-y-2" onMouseLeave={() => setHover(null)}>
        {rows.map((r, i) => (
          <div key={r.label} className="flex items-center gap-3" onMouseEnter={() => setHover(i)}>
            <span className="w-24 shrink-0 truncate font-mono text-[11px] text-text-2">{r.label}</span>
            <div className="h-3 flex-1 overflow-hidden rounded-[4px] bg-white/[0.05]">
              <div
                className="h-full rounded-[4px] transition-opacity"
                style={{
                  width: `${(r.n / max) * 100}%`,
                  background: colorByIndex ? CAT[i % CAT.length] : color,
                  opacity: hover === null || hover === i ? 1 : 0.45,
                }}
              />
            </div>
            <span className="w-14 shrink-0 text-right font-mono text-[11px] text-text-3">{r.n.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const [key, setKey] = useState('');
  const [saved, setSaved] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const k = localStorage.getItem('fm-admin-key');
    if (k) setSaved(k);
  }, []);

  const load = useCallback(async (k: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/stats', { headers: { 'x-admin-key': k } });
      if (res.status === 401) { setError('Wrong key.'); localStorage.removeItem('fm-admin-key'); setSaved(null); return; }
      if (res.status === 503) { setError('ADMIN_KEY is not configured on the server (Vercel env).'); return; }
      if (!res.ok) { setError(`Stats request failed (${res.status}).`); return; }
      setStats(await res.json());
      localStorage.setItem('fm-admin-key', k);
      setSaved(k);
    } catch {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (saved && !stats && !loading && !error) void load(saved); }, [saved, stats, loading, error, load]);

  if (!saved || !stats) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6">
        <div className="section-label">Admin</div>
        <h1 className="h-display text-[40px]">Analytics.</h1>
        {!stats && saved && loading && <p className="mt-4 text-text-2">Loading…</p>}
        {(!saved || error) && (
          <form
            className="mt-6 flex gap-2"
            onSubmit={(e) => { e.preventDefault(); if (key) void load(key.trim()); }}
          >
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Admin key"
              className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 font-mono text-sm text-text outline-none focus:border-accent"
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '…' : 'Open'}
            </button>
          </form>
        )}
        {error && <p className="mt-3 text-sm text-danger">{error}</p>}
      </main>
    );
  }

  const t = stats.telemetry;
  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="section-label">Admin · live analytics</div>
          <h1 className="h-display text-[44px]">FileMayor.</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-3">
            v{stats.npm.latest ?? '?'} · {new Date(stats.generatedAt).toLocaleTimeString()}
          </span>
          <button className="btn btn-mono text-xs" onClick={() => void load(saved)} disabled={loading}>
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Refresh errors are surfaced here — otherwise a failed refresh would
          silently show stale data with a stale timestamp. */}
      {error && (
        <div className="mb-6 rounded-lg border border-danger/40 bg-danger/[0.06] px-4 py-3 text-sm text-danger">
          Last refresh failed: {error} — showing the previous snapshot.
        </div>
      )}

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Tile label="npm · 30 days" value={fmt(stats.npm.month)} hint={`week ${fmt(stats.npm.week)} · year ${fmt(stats.npm.year)}`} />
        <Tile label="MCP installs · 30 days" value={fmt(stats.npm.mcpMonth)} hint="filemayor-mcp" />
        <Tile
          label="Subscribers"
          value={stats.subscribers.configured ? fmt(stats.subscribers.active ?? stats.subscribers.count) : 'n/a'}
          hint={stats.subscribers.configured ? 'Resend audience (active)' : 'Resend env not set'}
        />
        <Tile
          label="GitHub"
          value={stats.github ? fmt(stats.github.stars) : '—'}
          hint={stats.github ? `${stats.github.forks} forks · ${stats.github.issues} open issues` : 'unavailable'}
        />
      </div>

      {/* Downloads over time */}
      <div className="mt-6">
        <DailyLine title="npm downloads · daily, last 30 days" data={stats.npm.daily} />
      </div>

      {/* Telemetry */}
      <div className="mt-6">
        {t.configured && t.unavailable ? (
          <div className="rounded-xl border border-warn/40 bg-warn/[0.06] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-warn">CLI telemetry — store unreachable</p>
            <p className="mt-3 text-sm leading-relaxed text-text-2">
              KV is configured but the read timed out or errored. Counters are still being
              written; hit Refresh, or check the Upstash dashboard.
            </p>
          </div>
        ) : t.configured ? (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <DailyLine title={`CLI pings · daily (total ${fmt(t.total)})`} data={t.byDay ?? []} />
            </div>
            <Bars title="CLI pings by command" rows={(t.byCommand ?? []).map((c) => ({ label: c.cmd, n: c.n }))} />
            <Bars title="CLI pings by OS" rows={(t.byOs ?? []).map((o) => ({ label: o.os, n: o.n }))} colorByIndex />
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-surface/50 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-warn">CLI telemetry — storage not configured</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-2">
              Pings reach <code className="font-mono">/api/ping</code> but only land in Vercel logs.
              To unlock per-command / per-OS / per-day analytics here:{' '}
              <strong className="text-text">the one-click way</strong> — in Vercel, open{' '}
              <span className="font-mono">Storage → Create → KV</span>, connect it to this project,
              and redeploy; Vercel injects <code className="font-mono">KV_REST_API_URL</code> and{' '}
              <code className="font-mono">KV_REST_API_TOKEN</code>, which this endpoint already reads.
              Or add <code className="font-mono">UPSTASH_REDIS_REST_URL</code> /{' '}
              <code className="font-mono">UPSTASH_REDIS_REST_TOKEN</code> from any Upstash database by hand.
              Either way, counting starts immediately — no code changes needed.
            </p>
          </div>
        )}
      </div>

      <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.12em] text-text-3">
        Sources: npm registry + downloads API · GitHub · Resend · FileMayor telemetry (aggregate counters only — no PII).
      </p>
    </main>
  );
}
