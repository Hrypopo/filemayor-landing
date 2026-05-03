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

## Environment variables (Vercel)

| Var | Required when | Purpose |
|---|---|---|
| `LEMONSQUEEZY_WEBHOOK_SECRET` | Selling Pro | Verify inbound webhook signatures |
| `LEMONSQUEEZY_PRO_VARIANT_ID` | Selling Pro | LS variant id for Pro tier |
| `LEMONSQUEEZY_ENTERPRISE_VARIANT_ID` | Selling Enterprise | LS variant id for Enterprise |
| `LICENSE_PRIVATE_KEY` | Selling | Ed25519 PKCS8 — accepts raw PEM or base64-wrapped PEM. Base64 form recommended (survives Vercel UI). Generated by `scripts/generate-license-keypair.mjs`. |
| `LICENSE_KEY_ID` | Selling | Short version id. Default `v1`. Bump on rotation. |
| `RESEND_API_KEY` | Selling | Sends activation emails |
| `LANDING_PAT` | Never (here) | The release-sync flow lives in FileMayor, not here |

**None of these are required for the marketing site to function.** Signal-flow: the homepage, blog, docs, comparisons, dynamic download routes, and changelog all work without any of these set. The webhook just returns 500 when called without secrets configured, which is fine — LemonSqueezy is not calling it until you wire it up.

## License system setup (one-time, when ready to sell)

1. **Generate the Ed25519 keypair**:

   ```bash
   node scripts/generate-license-keypair.mjs
   ```

   The script prints the private key in two forms (raw PEM and base64-wrapped) plus the public key, and writes everything to `.keypair-out/` (gitignored, mode 0600).

2. **Vercel env vars** — Project Settings → Environment Variables → New:
   - `LICENSE_PRIVATE_KEY` ← paste the **base64-wrapped** value from `.keypair-out/license-private-v1.b64`. The base64 form has no newlines and survives Vercel's UI; raw PEM occasionally gets corrupted.
   - `LICENSE_KEY_ID` ← `v1` (or whatever id you passed to the generator).

3. **FileMayor public key** — open `~/fm/FileMayor/cli/core/license.js`, find `BUILTIN_PUBLIC_KEYS`, replace the placeholder under `v1` with the contents of `.keypair-out/license-public-v1.pem`. Commit on `redesign`.

4. **DELETE the keypair output IMMEDIATELY after transfer**:

   ```powershell
   Remove-Item -Recurse -Force .keypair-out
   ```

   Anyone who obtains the private key can mint valid licenses forever. Treat it like cash. The directory is gitignored, but ensure it is not in OneDrive / Google Drive / Dropbox / any cloud-sync folder.

5. **LemonSqueezy webhook** → admin → Settings → Webhooks → Add: `https://filemayor.com/api/lemonsqueezy/webhook`. Copy the signing secret into Vercel as `LEMONSQUEEZY_WEBHOOK_SECRET`. Subscribe to: `order_created`, `subscription_created`, `subscription_updated`.

6. **LemonSqueezy variant ids** — find them in the admin checkout pages. Add as `LEMONSQUEEZY_PRO_VARIANT_ID` and `LEMONSQUEEZY_ENTERPRISE_VARIANT_ID`.

7. **Resend** — verify the `filemayor.com` domain (DKIM, SPF, DMARC). Get the API key, add as `RESEND_API_KEY`.

8. **Smoke-test**: hit `GET https://filemayor.com/api/lemonsqueezy/webhook` — the response shows which env vars are configured. Then place a test order (LemonSqueezy supports test mode). The webhook signs a JWT, emails the buyer with a `filemayor://activate?key=...` deep link. Click the link, the desktop app activates.

### Key rotation (when needed)

```bash
node scripts/generate-license-keypair.mjs v2
```

Then:
1. Update Vercel: paste new base64 private key, change `LICENSE_KEY_ID` to `v2`.
2. Add the new public key to FileMayor's `BUILTIN_PUBLIC_KEYS` under `v2`. **Keep the v1 entry** — older customers' licenses verify against the old key.
3. Ship the FileMayor update. New purchases sign under v2; old licenses keep working.

### Replay protection

The webhook rejects events whose `created_at` is more than 10 minutes old. LemonSqueezy retries automatically; in normal operation events arrive within seconds. The window is configurable via `MAX_EVENT_AGE_MINUTES` in `app/api/lemonsqueezy/webhook/route.ts`.

### What we do NOT do

- **No machine fingerprinting.** Tying licenses to a hardware id would conflict with the local-first/privacy-first positioning. We accept that licenses can be shared between a customer's own devices; we trust the buyer.
- **No online activation check.** The desktop app verifies the JWT signature locally using the embedded public key. No phone-home. Works offline forever.
- **No license revocation.** A leaked private key means re-issuing public keys via a rotation. We accept this trade-off in exchange for the privacy posture.

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
