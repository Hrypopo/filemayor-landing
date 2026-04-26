import Link from 'next/link';
import { site } from '@/lib/site';

const links = [
  { href: '#run', label: 'Run' },
  { href: '#triad', label: 'Triad' },
  { href: '#doctrine', label: 'Doctrine' },
  { href: '#pricing', label: 'Pricing' },
  { href: '/docs', label: 'Docs' },
];

export function Nav() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-border/80 backdrop-blur-md backdrop-saturate-150"
      style={{ background: 'rgba(8,8,10,0.85)' }}
    >
      <div className="container-prose flex h-14 items-center justify-between gap-6">
        <Link href="/" className="group inline-flex items-baseline gap-2">
          <span className="font-display text-[20px] tracking-tight text-text">
            {site.name}
          </span>
          <span aria-hidden className="font-mono text-[14px] text-text-3">
            —
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-3 transition-colors group-hover:text-accent">
            by {site.by}
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-2 transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={site.github.app}
            className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-text-2 transition-colors hover:text-accent sm:inline"
          >
            GitHub
          </a>
          <Link href="#download" className="btn btn-primary text-xs">
            Download
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
