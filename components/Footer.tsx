import Link from 'next/link';
import { site } from '@/lib/site';

const cols = [
  {
    title: 'Product',
    items: [
      { label: 'Download', href: '#download' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Status', href: 'https://status.filemayor.com' },
    ],
  },
  {
    title: 'Develop',
    items: [
      { label: 'Documentation', href: '/docs' },
      { label: 'CLI reference', href: '/docs/cli' },
      { label: 'GitHub (app)', href: site.github.app },
      { label: 'GitHub (web)', href: site.github.landing },
      { label: 'npm', href: site.npm },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Security', href: '/docs/security' },
      { label: `Contact ${site.author.handle}`, href: `mailto:${site.author.email}` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-16 md:py-20">
      <div className="container-prose">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr,3fr]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[28px] tracking-tight text-text">
                {site.name}
              </span>
              <span aria-hidden className="font-mono text-[18px] text-text-3">
                —
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
                by {site.by}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-text-2">
              {site.tagline} Built for builders who refuse to let digital rot win.
            </p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
              v{site.version} · {site.metrics.testsPassing} passing · 0 vulns
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            {cols.map((col) => (
              <div key={col.title}>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
                  {col.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <Link
                        href={it.href}
                        className="text-[14px] text-text-2 transition-colors hover:text-accent"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-3">
            © {new Date().getFullYear()} {site.author.name} ({site.author.handle}). All rights
            reserved.
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-3">
            Built in Lesotho · privacy-first by default
          </div>
        </div>
      </div>
    </footer>
  );
}
