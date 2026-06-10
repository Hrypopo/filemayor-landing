import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Essays on filesystem trust, AI safety, and how FileMayor is built.',
};

export const posts = [
  {
    slug: ‘mcp-server-filesystem’,
    kicker: ‘Tutorial · MCP’,
    title: ‘MCP server for filesystem access: how to give Claude safe file operations.’,
    dek: ‘How to wire a filesystem MCP server into Claude Desktop — with a rollback journal instead of raw shell access.’,
    date: ‘2026.06.10’,
    readTime: ‘6 min read’,
  },
  {
    slug: ‘ai-file-organizer’,
    kicker: ‘Analysis · AI tools’,
    title: ‘AI file organizers in 2025: which ones actually work?’,
    dek: ‘An honest look at AI-powered file organizers — what they promise, where they fall short, and what to look for.’,
    date: ‘2026.06.03’,
    readTime: ‘7 min read’,
  },
  {
    slug: ‘best-file-organizer-mac-2025’,
    kicker: ‘Guide · comparison’,
    title: ‘The best file organizer for Mac in 2025.’,
    dek: ‘There is no single best tool — there is a best tool for your problem. Here is how to tell them apart.’,
    date: ‘2026.05.22’,
    readTime: ‘8 min read’,
  },
  {
    slug: ‘automate-file-organization-mac’,
    kicker: ‘Guide · automation’,
    title: ‘How to automate file organization on Mac.’,
    dek: ‘Three approaches — from simple Automator rules to AI-planned sessions. How to choose the right one.’,
    date: ‘2026.05.22’,
    readTime: ‘7 min read’,
  },
  {
    slug: ‘how-to-organize-downloads-folder’,
    kicker: ‘Guide · workflow’,
    title: ‘How to organize your Downloads folder (and keep it that way).’,
    dek: ‘A repeatable system for cleaning up the folder everyone ignores — and the one command that keeps it clean.’,
    date: ‘2026.05.22’,
    readTime: ‘7 min read’,
  },
  {
    slug: ‘best-cli-file-organizer’,
    kicker: ‘Guide · CLI’,
    title: ‘The best CLI file organizers in 2025.’,
    dek: ‘An honest comparison of command-line tools for file organization — fdupes, rmlint, organize-tool, and FileMayor.’,
    date: ‘2026.05.15’,
    readTime: ‘8 min read’,
  },
  {
    slug: ‘three-dependencies’,
    kicker: ‘Engineering · trust’,
    title: ‘Why FileMayor has three dependencies (and you don\’t need more).’,
    dek: ‘Most modern tools are dependency forests. FileMayor was built with a different constraint.’,
    date: ‘2026.04.26’,
    readTime: ‘5 min read’,
  },
  {
    slug: ‘curative-triad’,
    kicker: ‘Architecture · pattern’,
    title: ‘The Curative Triad: separating planning from execution.’,
    dek: ‘Most file tools act immediately. FileMayor introduces a boundary between understanding, planning, and action.’,
    date: ‘2026.04.26’,
    readTime: ‘6 min read’,
  },
  {
    slug: ‘chevza-doctrine’,
    kicker: ‘Security · architecture’,
    title: ‘Inside the Chevza Doctrine: six layers between an AI plan and your filesystem.’,
    dek: ‘How FileMayor allows intelligent planning without risking uncontrolled execution.’,
    date: ‘2026.04.26’,
    readTime: ‘7 min read’,
  },
];

export default function BlogIndex() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">Writing</div>
            <h1 className="h-display text-[clamp(40px,6vw,80px)]">
              Notes from the build.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-2 md:text-xl">
              Essays on filesystem trust, AI safety, and the architecture decisions behind
              FileMayor.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-prose max-w-3xl">
            <ol className="divide-y divide-border border-y border-border">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group block py-10 transition-colors"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      {p.kicker}
                    </div>
                    <h2 className="mt-3 font-display text-[clamp(24px,3vw,32px)] font-normal leading-tight tracking-tight text-text transition-colors group-hover:text-accent">
                      {p.title}
                    </h2>
                    <p className="mt-3 max-w-prose text-[15.5px] leading-relaxed text-text-2">
                      {p.dek}
                    </p>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
                      {p.date} · {p.readTime}
                    </p>
                  </Link>
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
