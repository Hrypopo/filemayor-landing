# Development — FileMayor marketing site

The new site is a Next.js 15 (App Router) project hosted on Vercel. This file covers local
setup. The product README at the repo root remains for the public GitHub page.

## Branches

| Branch | What it is |
|---|---|
| `main` | Currently the live GitHub Pages site. **Hotfixes only** until cutover. |
| `legacy` | Frozen snapshot of the static HTML site before redesign. Read-only. |
| `redesign` | This branch — Next.js 15 rebuild. Will become `main` at cutover. |

## Prerequisites

- Node.js ≥ 20
- npm (or pnpm — lockfile not committed yet)

## Get running locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Hot reload is on. The home page composes nine sections from
`components/`. Edits are reflected immediately.

## Scripts

```bash
npm run dev         # next dev — hot reload
npm run build       # production build
npm run start       # serve the production build (used by Lighthouse CI)
npm run lint        # ESLint with next/core-web-vitals
npm run typecheck   # tsc --noEmit
npm run format      # prettier write
```

## Project layout

```
app/
├── layout.tsx          Root layout, fonts (Newsreader, Geist, Geist Mono), metadata
├── globals.css         Design tokens, Tailwind base
├── page.tsx            Home — FOUR sections: Hero, RealOutput, ProofStrip, Pricing
├── privacy/            /privacy route
├── terms/              /terms route
├── docs/               /docs route (stub)
├── changelog/          /changelog route (stub)
├── robots.ts           Generated robots.txt
├── sitemap.ts          Generated sitemap.xml
└── not-found.tsx       404 page
components/
ON HOME
├── Nav.tsx             Sticky top nav (Run, Pricing, Docs)
├── Hero.tsx            Eyebrow, serif headline, prose subhead, verb chain, CTAs, surfaces line, terminal
├── LiveTerminal.tsx    Hero terminal block
├── InstallButton.tsx   Click-to-copy CLI install button (client)
├── RealOutput.tsx      Five verbs with real terminal output (the conversion section)
├── ProofStrip.tsx      Compact band: 4 live metrics + the Chevza Doctrine layer list (client)
├── Pricing.tsx         Free / Pro / Enterprise + 3-question purchase FAQ folded inline
└── Footer.tsx          Three-column footer with "FileMayor — by Chevza" wordmark
RESERVED FOR SUB-PAGES (not imported from home)
├── CurativeTriad.tsx   Reserved for /docs or feature page if needed
├── ThreeSurfaces.tsx   Reserved for /download
├── WhyFileMayor.tsx    Folded into Hero copy + Doctrine line
├── ChevzaDoctrine.tsx  Long-form version reserved for /docs/security
├── OpenMetrics.tsx     Long-form version reserved for /open
└── FAQ.tsx             Long-form version reserved for /faq if needed
lib/
├── site.ts             Single source of truth for site metadata, version, pricing
└── utils.ts            cn() helper
public/
├── favicon.png
├── filemayor-logo-dark.png
├── robots.txt          (legacy — superseded by app/robots.ts on build)
└── sitemap.xml         (legacy — superseded by app/sitemap.ts on build)
```

### Why four sections

The first scaffold had ten. Confidence reads as restraint, not volume.
Reduced to: **Hero · RealOutput · ProofStrip · Pricing**. Hero promises;
RealOutput proves; ProofStrip validates without making a fuss; Pricing
transacts. Cut sections live in `components/` for sub-page reuse.

## Design tokens

Defined as RGB triplets in `app/globals.css`, mapped into Tailwind via `tailwind.config.ts`:

| Token | Color | Use |
|---|---|---|
| `--bg` | `#08080a` | Page background |
| `--surface` | `#111114` | Cards, terminals |
| `--surface-2` | `#18181b` | Raised surfaces |
| `--border` | `#27272a` | Hairlines |
| `--border-strong` | `#3f3f46` | Hover borders |
| `--text` | `#fafafa` | Primary text |
| `--text-2` | `#a1a1aa` | Secondary text |
| `--text-3` | `#71717a` | Tertiary text, mono labels |
| `--accent` | `#d4af37` | Gold accent — version badges, single CTAs, accent serifs |
| `--ok` | `#4ade80` | Terminal success |
| `--warn` | `#f59e0b` | Terminal warning |
| `--danger` | `#f87171` | Terminal error |

Use `bg-bg`, `text-accent`, `border-border`, `font-display`, etc.

## Typography

Three faces, all from Google Fonts via `next/font/google`:

- **Newsreader** (display) — hero, section titles, blockquotes
- **Geist Sans** (body) — paragraphs, UI, buttons
- **Geist Mono** (mono) — CLI snippets, version badges, file paths

## CI

`.github/workflows/web-ci.yml` runs on every PR to `main` or `redesign`:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build`
5. Lighthouse CI against `/`, `/pricing`, `/docs` with budgets defined in `.lighthouserc.json`:
   - Performance ≥ 0.90
   - Accessibility ≥ 0.95
   - SEO ≥ 0.95
   - LCP ≤ 1800ms
   - CLS ≤ 0.05

Failing budgets fail CI.

## Deploying

Currently `main` deploys to GitHub Pages via the `CNAME`. When the redesign is ready:

1. Provision a Vercel project pointing at this repo, branch `redesign`.
2. Set `staging.filemayor.com` as a Vercel custom domain.
3. Validate against the live FileMayor product (download links, npm copy, pricing CTAs all
   resolve correctly).
4. Cutover: merge `redesign` → `main`; switch Vercel production domain to `filemayor.com`;
   update DNS at the registrar away from GitHub Pages to Vercel anycast.
5. The `legacy` branch is preserved permanently — no force-pushes.

## Pending Phase-2 items

- [ ] OG image generation route (`app/og/route.tsx` with `@vercel/og`)
- [ ] MDX-driven `/docs` content (replace stubs)
- [ ] Auto-sync changelog from private FileMayor repo on release
- [ ] `release-landing-sync.yml` workflow to mirror release artifacts to this repo
- [ ] Plausible analytics
- [ ] Light theme toggle
- [ ] WebGL Curative Triad scene (lazy-loaded, ≤80kb gz, reduced-motion fallback already in place)
- [ ] Phase 1 hotfix: fix broken download links on `main` while redesign progresses

## Voice and copy notes

- Brand-first: **FileMayor** is the brand. **by Chevza** appears in the nav, footer, and
  doctrine section as the personal signature.
- Sentence case throughout — never Title Case.
- Mono-for-metadata: every version, command, file path, status sits in `font-mono` so the
  serif headings stay editorial.
- Pricing in USD primary. ZAR or EUR conversion is added in Phase 2 via a geo-detect script.
