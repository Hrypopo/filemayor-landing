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
      <main id="main">
        <section className="section-divider section-pad">
          <div className="container-prose max-w-prose">
            <div className="section-label">Terms</div>
            <h1 className="h-display text-[clamp(40px,6vw,72px)]">Plain terms.</h1>
            <p className="mt-6 text-lg leading-relaxed text-text-2">
              By installing or using {site.name} you accept the terms below. They are
              written to be read.
            </p>
            <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-text-3">
              Effective: 2026.04.26 · Last updated: 2026.04.26
            </p>
          </div>
        </section>

        <section className="section-divider section-pad-sm">
          <div className="container-prose max-w-prose space-y-12 text-text-2">
            <div>
              <h2 className="font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                License grant
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed">
                {site.name} is proprietary software owned by {site.author.name} (Chevza).
                The Free tier is licensed for individual, non-commercial use. The Pro tier
                is licensed for one user across that user's personal devices. The
                Enterprise tier is licensed per organization for the seat count specified
                at purchase.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed">
                The CLI engine{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">filemayor</code> distributed
                via npm is governed by the same proprietary license. You may install and
                run it without restriction; you may not redistribute, fork, or relicense
                it. Source-available components, where present, are individually licensed
                and noted in their README files.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed">
                License keys are personal. Sharing a key with a third party violates this
                agreement and may result in deactivation.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                What you may not do
              </h2>
              <ul className="mt-5 space-y-2 text-[15.5px] leading-relaxed">
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                  <span>
                    Reverse engineer, decompile, or disassemble the desktop binaries or
                    the CLI, except where mandatory rights under law cannot be waived.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                  <span>Bypass, remove, or modify license validation.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                  <span>
                    Use the software to violate other people's privacy or rights, including
                    operating on filesystems you do not have authorization to modify.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                  <span>
                    Resell, sublicense, or distribute the software without written
                    permission.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                Refunds
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed">
                14 days from purchase, no questions asked. Refunds are processed by our
                payment provider (LemonSqueezy). Email support to initiate; we will not
                attempt retention tactics.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                Liability and warranty
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed">
                {site.name} ships with extensive safeguards: the Curative Triad separates
                planning from execution, the Chevza Doctrine layers six independent safety
                checks between an AI plan and your filesystem, and every operation is
                journaled and reversible. With that said: software runs on your hardware,
                operates on your filesystem, and can interact unexpectedly with other tools
                installed on your machine.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed">
                The software is provided <strong className="text-text">as-is</strong>{' '}
                without warranty of any kind, express or implied, including but not limited
                to merchantability and fitness for a particular purpose. To the maximum
                extent permitted by law, our total liability for any claim relating to the
                software is limited to the amount you paid for it in the prior twelve
                months, or USD 50, whichever is greater.
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed">
                These limitations do not exclude or limit liability for fraud, gross
                negligence, or anything else that cannot be limited under applicable law.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                Termination
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed">
                We may suspend or terminate your license if you materially breach these
                terms. You may stop using {site.name} at any time. Termination does not
                revive past payments — refunds are governed by the policy above.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                Changes to these terms
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed">
                We may update these terms. Material changes will be announced on{' '}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">{site.domain}</code> at
                least 30 days before they take effect. Continued use after the effective
                date constitutes acceptance.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                Governing law
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed">
                These terms are governed by the laws of the Republic of South Africa.
                Disputes will be resolved in the appropriate South African courts unless we
                agree in writing to another forum.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                Contact
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed">
                Questions about these terms:{' '}
                <a className="text-accent" href={`mailto:${site.author.email}`}>
                  {site.author.email}
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
