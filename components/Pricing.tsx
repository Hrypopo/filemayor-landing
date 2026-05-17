import { site } from '@/lib/site';

const tiers = [
  {
    key: 'free' as const,
    desc: 'For individuals.',
    bullets: [
      'Directory scanning',
      'File organization',
      'Junk cleanup',
      'Undo operations',
      'Config file support',
      'Up to 50 files per operation',
    ],
    cta: { label: 'Install free', href: site.npm },
    featured: false,
  },
  {
    key: 'pro' as const,
    desc: 'For power users.',
    bullets: [
      'Everything in Free',
      'Watch mode (real-time)',
      'AI SOP parsing',
      'Curative Triad — explain, cure, apply',
      'Unlimited bulk operations',
      'CSV / JSON export',
      'Priority support',
    ],
    cta: {
      label: 'Get Pro',
      href: 'https://filemayor.lemonsqueezy.com/checkout/buy/7fdcc87f-0660-4c1c-b3db-99f94773b71a',
    },
    featured: true,
  },
  {
    key: 'enterprise' as const,
    desc: 'For small teams.',
    bullets: [
      'Everything in Pro',
      'Up to 5 seats per license',
      'Custom categories',
      'CSV / JSON / API access',
      'Priority support',
    ],
    cta: {
      label: 'Get Team',
      href: 'https://filemayor.lemonsqueezy.com/checkout/buy/d2795526-eb05-4272-8084-98b6c7a118bb',
    },
    featured: false,
  },
];

const formatPrice = (usd: number) =>
  usd === 0
    ? 'Free'
    : usd
        .toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
        .replace('US', '');

const purchaseFaq = [
  {
    q: 'How is the license delivered?',
    a: 'After checkout you receive an activation link by email. One click activates the desktop app. Offline activation also works — paste the key into the license command. License validation runs locally with a 30-day offline grace period.',
  },
  {
    q: 'Refunds?',
    a: '14 days, no questions, processed by the checkout provider. No retention tactics.',
  },
  {
    q: "What's the actual difference between Pro and Team?",
    a: 'Pro is one seat. Team is up to five seats per license, plus CSV/JSON/API access and priority support. We are deliberately not calling it Enterprise yet — real enterprise features (SSO, audit logs, large-fleet seat management) ship later. If you need those, email us first.',
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="section-divider section-pad"
      aria-labelledby="pricing-heading"
    >
      <div className="container-prose">
        <div className="section-label">Pricing</div>
        <h2 id="pricing-heading" className="h-display text-[clamp(36px,5vw,56px)]">
          Free forever. Pro when ready.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-2">
          Core features stay free. Pro unlocks the AI Curative Triad, watch mode, and unlimited
          bulk operations. USD pricing — local currency conversion shown automatically.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {tiers.map((t) => {
            const tier = site.pricing[t.key];
            return (
              <article
                key={t.key}
                className={
                  'relative rounded-2xl bg-surface p-8 ' +
                  (t.featured
                    ? 'border-2 border-accent'
                    : 'border border-border')
                }
              >
                {t.featured && (
                  <div className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bg">
                    Most popular
                  </div>
                )}
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
                  {tier.name}
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display text-[44px] font-normal leading-none tracking-tight">
                    {formatPrice(tier.priceUsd)}
                  </span>
                  {tier.period && (
                    <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-3">
                      {tier.period}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[14px] text-text-2">{t.desc}</p>

                <ul className="my-7 space-y-2.5 text-[14px] text-text-2">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span aria-hidden className="mt-[7px] inline-block size-1 rounded-full bg-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={t.cta.href}
                  className={
                    'btn block w-full justify-center text-center ' +
                    (t.featured ? 'btn-primary' : 'btn-mono')
                  }
                >
                  {t.cta.label} <span aria-hidden>→</span>
                </a>
              </article>
            );
          })}
        </div>

        <ul className="mt-16 divide-y divide-border border-y border-border">
          {purchaseFaq.map((it) => (
            <li key={it.q}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 md:py-7">
                  <h3 className="font-display text-[20px] font-normal leading-snug tracking-tight text-text">
                    {it.q}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-2 inline-block size-2.5 shrink-0 rounded-full border border-border-strong transition-all group-open:border-accent group-open:bg-accent"
                  />
                </summary>
                <p className="-mt-2 max-w-prose pb-7 text-[15px] leading-relaxed text-text-2">
                  {it.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
