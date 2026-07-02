import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="grid-bg relative overflow-hidden">
        <div className="container-prose relative z-[1] grid min-h-[70vh] items-center gap-14 py-24 md:py-32 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="section-label">404 · diagnosis</div>
            <h1 className="h-display text-[clamp(44px,7vw,96px)]">
              Path <em className="text-accent-gradient italic">not found.</em>
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-text-2">
              This URL doesn&rsquo;t resolve to anything — the one kind of mess
              FileMayor can&rsquo;t organise. Fortunately, everything here is
              reversible too.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/" className="btn btn-primary">
                filemayor undo <span aria-hidden>→</span>
              </Link>
              <Link href="/docs" className="btn btn-mono">
                Read the docs
              </Link>
            </div>
          </div>

          {/* Terminal diagnosis of the missing page */}
          <div
            className="term-block overflow-hidden rounded-2xl border border-border-strong shadow-[0_40px_120px_-40px_rgb(212_175_55_/_0.25)]"
            role="img"
            aria-label="Terminal output: filemayor explain reports this page does not exist, health score 0 of 100, and suggests undo to return home."
          >
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-black/40 px-4 py-3">
              <span className="size-3 rounded-full bg-white/15" />
              <span className="size-3 rounded-full bg-white/15" />
              <span className="size-3 rounded-full bg-white/15" />
              <span className="ml-2 font-mono text-[11px] text-text-3">/this-page — filemayor</span>
            </div>
            <div className="space-y-1.5 p-5 font-mono text-[13px] leading-relaxed md:p-6">
              <div className="text-ok">$ filemayor explain /this-page</div>
              <div className="pt-1 text-text-2">Scanned 0 files (0 B) in 0.001s</div>
              <div className="text-text-3">────────────────────────────────</div>
              <div className="text-danger">Diagnosis: 0/100 · POOR</div>
              <div className="text-text-2">
                Issue: path does not exist <span className="text-text-3">(HTTP 404)</span>
              </div>
              <div className="text-text-3">────────────────────────────────</div>
              <div className="pt-1 text-warn">Suggested cure:</div>
              <div className="text-text-2">
                <span className="text-ok">→</span> filemayor undo{'  '}
                <span className="text-text-3"># back to safety</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
