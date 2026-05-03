import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'FileMayor CLI reference, SOP format, security architecture.',
};

const sections = [
  {
    href: '/docs/cli',
    label: 'CLI reference',
    desc: 'All 14 commands. Flags, examples, exit codes.',
  },
  {
    href: '/docs/sop',
    label: 'SOP format',
    desc: 'Write filing rules in plain English. Parser turns them into deterministic actions.',
  },
  {
    href: '/docs/security',
    label: 'Security architecture',
    desc: 'The Chevza Doctrine in long form. Six layers, named, audited.',
  },
];

export default function DocsIndex() {
  return (
    <>
      <Nav />
      <main id="main" className="container-prose py-24 md:py-32">
        <div className="section-label">Documentation</div>
        <h1 className="h-display text-[clamp(40px,6vw,72px)]">Read it like a book.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-text-2">
          Documentation rendered with editorial weight. Stub pages today; MDX content lands in
          Phase 2.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {sections.map((s) => (
            <li key={s.href} className="bg-surface p-7">
              <Link href={s.href} className="group block">
                <h2 className="font-display text-2xl text-text transition-colors group-hover:text-accent">
                  {s.label} <span aria-hidden>→</span>
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-text-2">{s.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
