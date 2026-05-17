import Link from 'next/link';
import { Nav } from './Nav';
import { Footer } from './Footer';

interface ArticleHeader {
  kicker: string;
  title: string;
  dek: string;
  date: string;
  readTime: string;
}

export function Article({
  header,
  children,
}: {
  header: ArticleHeader;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main id="main">
        <article>
          <header className="border-b border-border py-24 md:py-32">
            <div className="container-prose max-w-3xl">
              <Link
                href="/blog"
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3 transition-colors hover:text-accent"
              >
                ← Back to writing
              </Link>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {header.kicker}
              </p>
              <h1 className="mt-3 h-display text-[clamp(40px,6vw,80px)]">
                {header.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-text-2 md:text-xl">
                {header.dek}
              </p>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
                {header.date} · {header.readTime}
              </p>
            </div>
          </header>

          <section className="py-20 md:py-24">
            <div className="prose-article container-prose max-w-prose">{children}</div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}

export const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-6 text-[17px] leading-relaxed text-text-2">{children}</p>
);

export const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-14 font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight text-text">
    {children}
  </h2>
);

export const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mt-10 font-display text-[24px] font-normal tracking-tight text-text">
    {children}
  </h3>
);

export const Pull = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="my-10 border-l-2 border-accent pl-6 font-display text-[22px] italic leading-snug text-text">
    {children}
  </blockquote>
);

export const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px] text-text">
    {children}
  </code>
);

export const Pre = ({ children }: { children: React.ReactNode }) => (
  <pre className="term-block mt-6 overflow-x-auto rounded-xl border border-border p-5 font-mono text-[13px] leading-relaxed">
    <code>{children}</code>
  </pre>
);

export const Ul = ({ children }: { children: React.ReactNode }) => (
  <ul className="mt-4 space-y-2 text-[16.5px] text-text-2">{children}</ul>
);

export const Li = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-3 leading-relaxed">
    <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
    <span>{children}</span>
  </li>
);
