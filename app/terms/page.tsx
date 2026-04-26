import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms',
  description: `Terms of service for ${site.name}.`,
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="container-prose max-w-prose py-24 md:py-32">
        <div className="section-label">Terms</div>
        <h1 className="h-display text-[clamp(40px,6vw,72px)]">Plain terms.</h1>
        <p className="mt-6 text-lg leading-relaxed text-text-2">
          By using {site.name} you agree to the terms below. They are written to be read.
        </p>

        <div className="mt-16 space-y-10 text-text-2">
          <section>
            <h2 className="font-display text-3xl text-text">License</h2>
            <p className="mt-4 text-[15.5px] leading-relaxed">
              {site.name} is proprietary software. The Free tier is licensed for individual,
              non-commercial use. The Pro and Enterprise tiers are licensed per seat or per
              organization respectively. License keys are personal — do not share them.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-text">Refunds</h2>
            <p className="mt-4 text-[15.5px] leading-relaxed">
              14-day refund window from the date of purchase, no questions asked, processed by
              the checkout provider.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-text">Liability</h2>
            <p className="mt-4 text-[15.5px] leading-relaxed">
              {site.name} ships with extensive safeguards (the Chevza Doctrine) but ultimately
              operates on your filesystem. We are not liable for data loss arising from misuse,
              hardware failure, or unforeseen interactions with third-party software. Use Undo
              early and often.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-text">Reverse engineering</h2>
            <p className="mt-4 text-[15.5px] leading-relaxed">
              The desktop and CLI binaries are closed-source. Reverse engineering, decompiling,
              or removing license checks is not permitted under the proprietary license.
            </p>
          </section>
          <p className="pt-12 font-mono text-xs uppercase tracking-[0.14em] text-text-3">
            Last updated: 2026.04.26 · This page replaces the legacy /terms.html.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
