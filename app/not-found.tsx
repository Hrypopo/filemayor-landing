import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="container-prose flex min-h-[60vh] flex-col items-start justify-center py-24 md:py-32">
        <div className="section-label">404</div>
        <h1 className="h-display text-[clamp(40px,7vw,96px)]">Path not found.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-text-2">
          The URL you followed does not match a route. The CLI handles this kind of thing
          better.
        </p>
        <div className="mt-10 flex gap-3">
          <Link href="/" className="btn btn-primary">
            Back home <span aria-hidden>→</span>
          </Link>
          <Link href="/docs" className="btn btn-mono">
            Read the docs
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
