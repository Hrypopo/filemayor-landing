import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Security Policy · FileMayor',
  description:
    'FileMayor Security Policy — scope, data handling, the six-layer Chevza Doctrine, responsible disclosure, and contact information.',
};

const EFFECTIVE_DATE = 'May 2025';

const layers = [
  {
    n: 'L01',
    name: 'Jail',
    role: 'Scope containment.',
    detail: [
      'All paths are canonically resolved before any operation executes. Symlinks are followed to their real targets and re-validated against the declared workspace boundary.',
      'Any proposed operation outside the workspace — including indirect traversal through symlinks pointing to system directories — is refused before it reaches the execution engine.',
      'Protected paths include, but are not limited to: ~/Library/Keychains, /System, %WINDIR%, /etc, ~/.ssh, .gitconfig, .npmrc, and any $TMPDIR entry not explicitly declared in-scope by the user.',
    ],
  },
  {
    n: 'L02',
    name: 'Vault',
    role: 'Credential isolation.',
    detail: [
      'License keys, AI-provider credentials, and webhook signing secrets are stored exclusively in the OS-native keychain (Apple Keychain on macOS, Windows Credential Manager, libsecret on Linux).',
      'No credential, key, or signing secret is written to disk in plaintext at any time. An encrypted on-disk fallback is used only when the OS keychain is unavailable; the application logs a visible warning when this fallback is active.',
      'Vault does not participate in the plan-execution pipeline. It only answers credential queries and is not accessible to the AI planning component.',
    ],
  },
  {
    n: 'L03',
    name: 'Guardrail',
    role: 'Batch inspection.',
    detail: [
      'Every AI-generated plan is pattern-matched against a deny-list of destructive operation shapes before it reaches the plan validator.',
      'Mass-delete thresholds, recursive renames involving protected paths, ambiguous overwrites, and batches exceeding configured size limits are all blocked at this layer.',
      'When Guardrail blocks a plan, it emits a structured diagnostic identifying the rule that fired. The user can inspect this diagnostic and reformulate their request.',
    ],
  },
  {
    n: 'L04',
    name: 'Halt',
    role: 'Crash-safe execution.',
    detail: [
      'The operation journal is treated as durable state. Each move writes its intent to the journal before executing and marks completion after. There is no window in which a partial operation is unrecoverable.',
      'On any unclean termination — OS signal, power loss, forced kill — the engine detects the incomplete journal entry on next start and rolls back automatically.',
      'Halt is implemented inside the execution pipeline, not as a UI affordance. All termination paths — user-initiated stops, SIGTERM, SIGKILL, and crashes — converge on the same recovery logic.',
    ],
  },
  {
    n: 'L05',
    name: 'Architect',
    role: 'Semantic plan validation.',
    detail: [
      'The proposed plan is treated as a dependency graph. Operations that would scatter semantically cohesive files — photographs from the same session, documents from a single project — are rejected.',
      'Circular dependencies between operations are detected and the plan is refused.',
      'Plans that fail Architect validation never reach the execution engine. The validation result is reported to the user so the plan can be revised.',
    ],
  },
  {
    n: 'L06',
    name: 'Security',
    role: 'Input hardening.',
    detail: [
      'Path traversal defenses are applied to all user-supplied strings: ../ sequences, URL-encoded variants, and null-byte injection attempts are rejected.',
      'AI API calls and filesystem write operations are rate-limited per session. Limits are configurable and enforced server-side when an API key is in use.',
      'All user-supplied input — workspace paths, natural-language prompts, configuration values — is validated before any downstream component processes it.',
    ],
  },
];

export default function SecurityPage() {
  return (
    <>
      <Nav />
      <main id="main">

        {/* Header */}
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">Security Policy</div>
            <h1 className="h-display text-[clamp(40px,6vw,80px)]">
              FileMayor Security Policy.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-2 md:text-xl">
              This document describes how {site.name} protects user data and filesystems,
              the technical controls in place, our responsible disclosure process,
              and how to contact the security team.
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 font-mono text-[12px] text-text-3">
              <div>
                <dt className="uppercase tracking-[0.12em]">Effective</dt>
                <dd className="mt-1 text-text-2">{EFFECTIVE_DATE}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.12em]">Maintained by</dt>
                <dd className="mt-1 text-text-2">{site.by} ({site.author.name})</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.12em]">Contact</dt>
                <dd className="mt-1">
                  <a href={`mailto:${site.author.email}?subject=[security]`} className="text-accent hover:underline">
                    {site.author.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Scope */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Scope</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              What this policy covers.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-text-2">
              This policy applies to all {site.name} software: the desktop application
              (macOS, Windows, Linux), the CLI package published to npm, the MCP server
              exposed via <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">filemayor mcp</code>,
              and the filemayor.com web properties.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-text-2">
              It does not cover third-party AI providers (OpenAI, Google Gemini, Anthropic)
              or payment processors. Those services are governed by their own security
              policies. Links to their trust pages are available on request.
            </p>
          </div>
        </section>

        {/* Data handling */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Data handling</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              What leaves your machine. What does not.
            </h2>
            <div className="mt-8 space-y-5">
              {[
                {
                  label: 'File contents',
                  policy: 'Never transmitted.',
                  detail: 'File contents — text, images, binaries — are read locally for metadata extraction and are never sent to any remote service, including the AI provider.',
                },
                {
                  label: 'File metadata',
                  policy: 'Sent to AI provider when you request AI assistance.',
                  detail: 'Names, sizes, paths, extensions, and modification dates may be included in prompts to the configured AI provider. This data is subject to the AI provider\'s data retention policy.',
                },
                {
                  label: 'License keys',
                  policy: 'Stored in OS keychain only.',
                  detail: 'License keys are verified against our licensing API at activation. After activation, they are stored in the OS-native keychain and the local JWT is used for all subsequent feature checks.',
                },
                {
                  label: 'Email address',
                  policy: 'Stored with Resend for product communications.',
                  detail: 'If you sign up at filemayor.com, your email is stored with our email provider (Resend) and is used only for product updates and transactional messages. You may unsubscribe at any time.',
                },
                {
                  label: 'Usage analytics',
                  policy: 'Aggregated, anonymous, opt-out.',
                  detail: 'The web properties use Vercel Analytics for aggregated page-view data. No personal identifiers are collected. The desktop application does not transmit telemetry.',
                },
              ].map(({ label, policy, detail }) => (
                <div key={label} className="rounded-xl border border-border bg-surface p-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-medium text-text">{label}</p>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">{policy}</span>
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-text-2">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Doctrine */}
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose">
            <div className="section-label">Technical controls — The Chevza Doctrine</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Six layers between intent and execution.
            </h2>
            <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-text-2">
              The Chevza Doctrine is the architectural principle that no single component
              both validates and executes filesystem operations. Every plan produced by the
              AI passes through six independent control layers before any file is touched.
              Each layer has a single defined responsibility and a distinct failure mode.
            </p>

            <ol className="mt-12 space-y-12">
              {layers.map((l) => (
                <li
                  key={l.n}
                  className="grid grid-cols-1 gap-6 border-t border-border pt-10 md:grid-cols-[180px,1fr]"
                >
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      {l.n}
                    </div>
                    <h3 className="mt-2 font-display text-[28px] font-normal leading-tight tracking-tight text-text">
                      {l.name}
                    </h3>
                  </div>
                  <div>
                    <p className="font-display text-[20px] font-normal italic leading-snug text-accent">
                      {l.role}
                    </p>
                    <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-text-2">
                      {l.detail.map((d, i) => (
                        <li key={i} className="flex gap-3">
                          <span aria-hidden className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Runtime vulnerabilities */}
        <section id="vulnerabilities" className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Dependency security</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Runtime dependencies: {site.metrics.runtimeVulns} known vulnerabilities.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-text-2">
              {site.name} ships four runtime dependencies to user machines:{' '}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">electron-updater</code>,{' '}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">tar</code>,{' '}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">yauzl</code>, and{' '}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">framer-motion</code>.
              At their pinned versions, none have published advisories in the GitHub Advisory Database or npm audit.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-text-2">
              Build-time tooling (Electron, Vite, esbuild, TypeScript) runs only on the build machine
              and is not shipped to users. Advisories against build tools are monitored and patched
              as part of routine maintenance; they are not counted in the runtime metric.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-text-2">
              This metric is verified on every release. You may reproduce it independently:
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-[13px]">
              <code>npm audit --production</code>
            </pre>
            <p className="mt-4 text-[14px] leading-relaxed text-text-3">
              If a runtime advisory is published against a pinned dependency, this page and the
              homepage metric are updated on the same business day as the patched release.
            </p>
          </div>
        </section>

        {/* Responsible disclosure */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Responsible disclosure</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              How to report a vulnerability.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-text-2">
              If you discover a security vulnerability in any {site.name} product, please report
              it privately before public disclosure. We are committed to responding promptly and
              crediting researchers who follow this process.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { step: '01', title: 'Email the security team', body: <>Send details to <a href={`mailto:${site.author.email}?subject=[security]`} className="text-accent hover:underline">{site.author.email}</a> with the subject line <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[12px]">[security]</code>. Include a description, reproduction steps, and your assessment of severity.</> },
                { step: '02', title: 'Acknowledgement within 48 hours', body: 'We will confirm receipt and open a private tracking issue within two business days. If you do not receive a response, follow up to the same address.' },
                { step: '03', title: 'Remediation timeline', body: 'Critical and high-severity vulnerabilities are targeted for a patch within 14 days. Medium and low severity within 60 days. We will keep you informed of progress.' },
                { step: '04', title: 'Coordinated disclosure', body: 'We ask for a 90-day embargo for high-severity reports to allow a patched release to reach users before public disclosure. We will work with you on timing if that window needs adjustment.' },
                { step: '05', title: 'Credit', body: 'Researchers who follow this process are credited in the release changelog by name or handle, at their preference.' },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-5 rounded-xl border border-border bg-surface p-5">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent shrink-0 pt-0.5">{step}</div>
                  <div>
                    <p className="font-medium text-[15px] text-text">{title}</p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-text-2">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Honest scope */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Certifications and audits</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-normal leading-tight tracking-tight">
              Current status.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-text-2">
              {site.name} has not undergone third-party security audit at the time of writing.
              A formal audit is on the product roadmap and this page will be updated when complete.
              The {site.metrics.testsPassing}-test suite covers all six Doctrine layers
              extensively — including boundary conditions, recovery paths, and adversarial inputs.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-text-2">
              The Chevza Doctrine is an architectural control, not a compliance certification.
              {site.name} does not currently hold SOC 2, ISO 27001, or similar certifications.
              If your organisation requires a certification before deployment, contact us
              to discuss timelines.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 md:py-20">
          <div className="container-prose max-w-3xl">
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-normal leading-tight tracking-tight">
              Questions about this policy?
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-text-2">
              For security issues, email{' '}
              <a href={`mailto:${site.author.email}?subject=[security]`} className="text-accent hover:underline">
                {site.author.email}
              </a>{' '}
              with <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">[security]</code> in the subject.
              For general policy questions, use the same address without the subject prefix.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/docs" className="btn btn-primary">
                All documentation <span aria-hidden>→</span>
              </Link>
              <Link href="/download" className="btn btn-mono">
                Download FileMayor
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
