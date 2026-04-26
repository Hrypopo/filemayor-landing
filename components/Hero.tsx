import Link from 'next/link';
import { site } from '@/lib/site';
import { LiveTerminal } from './LiveTerminal';
import { InstallButton } from './InstallButton';

export function Hero() {
  return (
    <section className="grid-bg relative overflow-hidden pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="container-prose">
        <span className="mb-9 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[0.06] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          <span className="relative inline-block size-1.5 rounded-full bg-accent">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
          </span>
          v{site.version} · hardened runtime
        </span>

        <h1 className="h-display max-w-[16ch] text-[clamp(56px,9vw,128px)]">
          The doctor for your <em className="not-italic text-accent italic">filesystem</em>.
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-text-2 md:text-xl">
          {site.description}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link href="#download" className="btn btn-primary">
            Download {site.name}
            <span aria-hidden>→</span>
          </Link>
          <InstallButton />
        </div>

        <LiveTerminal className="mt-16 max-w-[760px]" />
      </div>
    </section>
  );
}
