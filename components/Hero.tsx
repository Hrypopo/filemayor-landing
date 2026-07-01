import Link from 'next/link';
import { site } from '@/lib/site';
import { HeroDemo } from './HeroDemo';
import { InstallButton } from './InstallButton';

export function Hero() {
  return (
    <section className="grid-bg relative overflow-hidden pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="container-prose relative z-[1]">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Left — copy, trimmed to the essentials */}
          <div>
            <span className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[0.06] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              <span className="relative inline-block size-1.5 rounded-full bg-accent">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
              </span>
              v{site.version} · 100% free · reversible
            </span>

            <h1 className="h-display text-[clamp(52px,7.5vw,104px)]">
              Your folders,{' '}
              <em className="text-accent-gradient italic">on command.</em>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-2 md:text-xl">
              The AI file organiser that shows you the plan before it moves a
              thing — then undoes the whole session with one command.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/download" className="btn btn-primary">
                Download {site.name}
                <span aria-hidden>→</span>
              </Link>
              <InstallButton />
            </div>

            <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
              Free forever · Mac · Windows · Linux
              <span className="mx-2 text-border-strong" aria-hidden>·</span>
              CLI · Desktop · <span className="text-text-2">MCP for Claude</span>
            </p>
          </div>

          {/* Right — self-playing product demo (the attention engager) */}
          <HeroDemo className="w-full" />
        </div>
      </div>
    </section>
  );
}
