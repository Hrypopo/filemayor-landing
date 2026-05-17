import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Compare',
  description:
    'Honest comparisons between FileMayor and other file organization tools.',
};

export const comparisons = [
  {
    slug: 'hazel',
    name: 'Hazel',
    summary:
      'Mac-only rules engine. Powerful for automation experts. FileMayor adds AI planning, cross-platform reach, and the Curative Triad safety model.',
    available: true,
  },
  {
    slug: 'spaceapp',
    name: 'SpaceApp',
    summary: 'Coming soon — comparison in progress.',
    available: false,
  },
  {
    slug: 'finder',
    name: 'Finder + Explorer',
    summary: 'Coming soon — comparison in progress.',
    available: false,
  },
];

export default function VsIndex() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">Compare</div>
            <h1 className="h-display text-[clamp(40px,6vw,80px)]">
              Honest comparisons.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-2 md:text-xl">
              We will not pretend to be the only tool worth using. These pages compare
              FileMayor against alternatives we respect, and surface the trade-offs
              honestly.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-prose max-w-3xl">
            <ol className="divide-y divide-border border-y border-border">
              {comparisons.map((c) => (
                <li key={c.slug}>
                  {c.available ? (
                    <Link
                      href={`/vs/${c.slug}`}
                      className="group block py-8 transition-colors"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                          FileMayor
                        </span>
                        <span aria-hidden className="text-text-3">vs</span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-2">
                          {c.name}
                        </span>
                      </div>
                      <h2 className="mt-3 font-display text-[24px] font-normal leading-tight tracking-tight text-text transition-colors group-hover:text-accent">
                        FileMayor vs {c.name}
                        <span aria-hidden className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                      </h2>
                      <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-text-2">
                        {c.summary}
                      </p>
                    </Link>
                  ) : (
                    <div className="block py-8 opacity-60">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
                          FileMayor
                        </span>
                        <span aria-hidden className="text-text-3">vs</span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
                          {c.name}
                        </span>
                      </div>
                      <h2 className="mt-3 font-display text-[24px] font-normal leading-tight tracking-tight text-text-3">
                        FileMayor vs {c.name}
                      </h2>
                      <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-text-3">
                        {c.summary}
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
