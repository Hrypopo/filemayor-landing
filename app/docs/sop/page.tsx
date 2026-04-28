import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'SOP format',
  description:
    'Write filing rules in plain English. The SOP parser turns them into deterministic actions.',
};

const example = `# Personal Filing SOP

Move every screenshot to ~/Pictures/Screenshots, organized by year.
Move installers (.exe, .dmg, .pkg) to ~/Software.
Archive any .zip or .tar.gz older than 6 months to ~/Archive.

Documents:
- Receipts (PDFs with "receipt" or "invoice" in the name) → ~/Documents/Receipts
- Anything from "scanner" → ~/Documents/Scans
- Resumes → ~/Documents/Career

Never touch ~/Downloads/Inbox — it's my staging area.
Trash anything in ~/Downloads/Trash older than 30 days.
`;

export default function SopPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">Documentation · SOP format</div>
            <h1 className="h-display text-[clamp(40px,6vw,80px)]">
              Filing rules in plain English.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-2 md:text-xl">
              Standard Operating Procedures are markdown files that describe how you want
              files organized. The SOP parser converts them into deterministic operations
              that flow through the Curative Triad like any other plan.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Example</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              An SOP file is a markdown file.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-text-2">
              No special syntax. Headings group rules. Bullet lists enumerate cases. The
              parser handles ambiguity by surfacing it for confirmation rather than
              guessing.
            </p>
            <pre className="term-block mt-8 overflow-x-auto rounded-xl border border-border p-6 font-mono text-[13px] leading-relaxed">
              <code>{example}</code>
            </pre>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">How it works</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Three steps.
            </h2>
            <ol className="mt-8 space-y-6 text-[16px] leading-relaxed text-text-2">
              <li>
                <strong className="font-display text-[20px] font-normal text-text">
                  1. Parse.
                </strong>
                <span className="ml-2">
                  The SOP file is sent to the configured AI provider (Gemini 2.0 Flash by
                  default) along with the directory inventory. The provider returns a
                  structured plan.
                </span>
              </li>
              <li>
                <strong className="font-display text-[20px] font-normal text-text">
                  2. Doctrine.
                </strong>
                <span className="ml-2">
                  The plan flows through the same six layers as any other Curative plan —
                  Jail, Vault, Guardrail, Halt, Architect, Security. SOPs cannot bypass the
                  safety architecture.
                </span>
              </li>
              <li>
                <strong className="font-display text-[20px] font-normal text-text">
                  3. Apply.
                </strong>
                <span className="ml-2">
                  Run <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">filemayor apply</code> to execute. Run <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">filemayor undo --all</code> to reverse if you change your
                  mind.
                </span>
              </li>
            </ol>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-prose max-w-3xl">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-3">
              Status
            </p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-text-2">
              SOP parsing is a Pro feature. Free tier supports manual organization via
              the <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">organize</code> command.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
