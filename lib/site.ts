export const site = {
  name: 'FileMayor',
  by: 'Chevza',
  domain: 'filemayor.com',
  url: 'https://filemayor.com',
  version: '4.0.0',
  tagline: 'Think Jarvis, for your folders.',
  description:
    'FileMayor v4 — press ⌘K and your filesystem answers. Diagnose, cure, and undo across every folder you own. Locally. Reversibly. On every OS you use.',
  npm: 'https://www.npmjs.com/package/filemayor',
  github: {
    org: 'Hrypopo',
    landing: 'https://github.com/Hrypopo/filemayor-landing',
    app: 'https://github.com/Hrypopo/FileMayor',
    releases: 'https://github.com/Hrypopo/filemayor-landing/releases/latest',
  },
  author: {
    name: 'Lehlohonolo Goodwill Nchefu',
    handle: 'Chevza',
    email: 'hloninchefu@gmail.com',
  },
  pricing: {
    free: { name: 'Free', priceUsd: 0, period: '' },
    pro: { name: 'Pro', priceUsd: 5.99, period: '/mo' },
    // Internal key remains 'enterprise' (matches Tier type in lib/license.ts
    // and TIERS in cli/core/license.js — preserves the JWT contract). The
    // user-facing label is "Team" until we ship real enterprise features
    // (SSO, audit logs, true team seat management).
    enterprise: { name: 'Team', priceUsd: 24.99, period: '/mo' },
  },
  hook: 'Your AI can suggest. FileMayor can act — safely. Now with ⌘K.',
  metrics: {
    npmInstalls: 25000,
    testsPassing: 128,
    runtimeVulns: 0,
    runtimeDeps: 3,
    locales: 10,
    securityLayers: 6,
  },
} as const;

export type Site = typeof site;
