import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FileMayor vs — Comparisons',
  description:
    'Honest comparisons of FileMayor against Hazel, CleanMyMac, Dropzone, GrandPerspective, and more.',
};

const comparisons = [
  {
    slug: 'hazel',
    name: 'Hazel',
    tagline: 'Mac-only rules engine. FileMayor is cross-platform with AI planning.',
    verdict: 'Different tools for different workflows.',
  },
  {
    slug: 'cleanmymac',
    name: 'CleanMyMac X',
    tagline: 'System cleaner vs filesystem organiser. FileMayor adds rollback and AI.',
    verdict: 'Complementary, not competing.',
  },
  {
    slug: 'dropzone',
    name: 'Dropzone 4',
    tagline: 'Drag-and-drop destinations vs AI-planned bulk operations.',
    verdict: 'FileMayor wins on scale and safety.',
  },
  {
    slug: 'grandperspective',
    name: 'GrandPerspective',
    tagline: 'Visualise disk usage. FileMayor visualises and then acts.',
    verdict: 'One shows the problem. The other fixes it.',
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
              FileMayor vs the alternatives.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-2 md:text-xl">
              Honest comparisons. We call out where the other tool is genuinely better.
              The goal is to help you pick the right one, not to win an argument.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-prose">
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {comparisons.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/vs/${c.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
                      FileMayor vs
                    </div>
                    <h2 className="mt-2 font-display text-[28px] font-normal leading-tight tracking-tight text-text group-hover:text-accent">
                      {c.name}
                    </h2>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-text-2">
                      {c.tagline}
                    </p>
                    <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
                      {c.verdict} →
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
