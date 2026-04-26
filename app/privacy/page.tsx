import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy',
  description: `${site.name}'s privacy policy. Files never leave your machine.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="container-prose max-w-prose py-24 md:py-32">
        <div className="section-label">Privacy</div>
        <h1 className="h-display text-[clamp(40px,6vw,72px)]">
          Files never leave your machine.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-2">
          {site.name} is a local-first application. We do not collect, transmit, or store the
          contents of your files. The optional AI features (the Curative Triad) call out to a
          model with file metadata only — names, sizes, paths, and extensions — and only when
          you explicitly invoke them.
        </p>

        <div className="prose-divider mt-16 space-y-10 text-text-2">
          <section>
            <h2 className="font-display text-3xl text-text">What we don&apos;t collect</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15.5px] leading-relaxed">
              <li>File contents (ever).</li>
              <li>Telemetry, analytics, or usage tracking inside the desktop or CLI.</li>
              <li>Personally identifiable information beyond what you provide for licensing.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl text-text">What we do collect</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15.5px] leading-relaxed">
              <li>Email address — only when you purchase a license, used for delivery and support.</li>
              <li>License activation events — to enable cross-device offline grace periods.</li>
              <li>Crash reports — only with your explicit consent, with file paths automatically redacted before send.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl text-text">AI feature data flow</h2>
            <p className="mt-4 text-[15.5px] leading-relaxed">
              When you run <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm">filemayor cure</code>{' '}
              or <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm">filemayor explain</code>, file
              metadata is sent to the configured AI provider (Gemini 2.0 Flash by default). No
              file contents are sent. You can disable AI features and the rest of the product
              continues to work.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-text">Contact</h2>
            <p className="mt-4 text-[15.5px] leading-relaxed">
              Privacy questions: <a className="text-accent" href={`mailto:${site.author.email}`}>{site.author.email}</a>.
            </p>
          </section>

          <p className="pt-12 font-mono text-xs uppercase tracking-[0.14em] text-text-3">
            Last updated: 2026.04.26 · This page replaces the legacy /privacy.html.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
