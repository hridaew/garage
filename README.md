# Garage 1880

Marketing website for [Garage 1880](https://garage1880.com), a personal training gym in Sunnyside, Denver. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Wix Headless CMS for blog content. Deployed on Netlify.

---

## Quick start

```bash
git clone https://github.com/hridaew/garage.git
cd garage
cp .env.example .env.local      # then fill in the 5 values below
npm install
npm run dev                     # http://localhost:3000
```

Scripts:

```bash
npm run dev              # Dev server with hot reload
npm run build            # Production build (run before deploy to catch type errors)
npm run start            # Serve the production build locally
npm run lint             # ESLint (next/core-web-vitals + typescript)
npm run qa:screenshots   # Playwright screenshot sweep across viewports
```

---

## Environment variables

All live in `.env.local` (local) and Netlify's Site Settings → Environment variables (prod). `.env.local` is gitignored — never commit it.

| Variable | Scope | Where to get it | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_WIX_CLIENT_ID` | public | Wix dashboard → Settings → Headless Settings → OAuth apps | Reads blog posts from Wix CMS. Safe to expose (OAuth client ID). |
| `WIX_SITE_ID` | server | Wix dashboard → Settings → Business Info → Site ID | Identifies which Wix site the contact form belongs to. |
| `WIX_API_KEY` | server | Wix dashboard → Settings → API Keys Manager → new key with **Wix Forms** permissions | Submits contact form payloads. **Keep secret.** |
| `WIX_CONTACT_FORM_ID` | server | Wix dashboard → Contacts → Forms → open the form → URL contains the form ID | Target form for submissions. |
| `NEXT_PUBLIC_GA_ID` | public, optional | Google Analytics → Admin → Data Streams → Measurement ID (`G-XXXXXXXXXX`) | Enables GA page view tracking. Omit to disable. |

The contact form will throw a clear error on submission if any of the four Wix variables are missing (see [`src/lib/wix-forms.ts`](src/lib/wix-forms.ts)).

---

## External services

| Service | What it powers | How to access |
|---|---|---|
| **Wix Headless CMS** | Blog posts at `/fitnessblog/*` (rich content + SEO metadata) | Client logs in at wix.com → Garage 1880 site → Blog |
| **Wix Forms** | Contact form submissions | Wix dashboard → Contacts → submissions appear there, emails go to the form's notification settings |
| **Netlify** | Hosting + builds | netlify.com → Garage 1880 site. Build logs under "Deploys" tab. |
| **Google Analytics 4** | Traffic analytics | analytics.google.com with the property tied to `NEXT_PUBLIC_GA_ID` |
| **Google Search Console** | SEO indexing + sitemap submission | search.google.com/search-console. Property is the verified domain. |
| **Instagram** | Static feed on homepage | Photos in `public/images/instagram/*.jpg` (not live-synced — see "Editing content") |
| **Google Maps** | Embed on Contact page | No key needed — uses the public `/maps/embed` iframe |

---

## Deploy

Push to `main` on GitHub (`hridaew/garage`) → Netlify auto-builds and deploys. No manual deploy step. Build logs live in Netlify's "Deploys" tab.

Do NOT deploy to Vercel. The environment is set up for Netlify only.

---

## Editing content

| Content | Where |
|---|---|
| Blog posts | **Wix dashboard** → Blog. Changes propagate on next ISR revalidation (1 hour) or next deploy. |
| Blog SEO (title, description, OG image) per post | **Wix dashboard** → Blog → post → SEO panel. The site reads these tags automatically ([`src/lib/wix-blog.ts`](src/lib/wix-blog.ts) → `readSeoTags`). |
| Trainers (grid + modals) | [`src/components/services/trainers-data.ts`](src/components/services/trainers-data.ts) + images in `public/images/trainers/` |
| Testimonials | [`src/components/home/Testimonials.tsx`](src/components/home/Testimonials.tsx) — edit the `testimonials` array at the top |
| Instagram feed | Replace files in `public/images/instagram/*.jpg` (1.jpg through 6.jpg). Static — no Instagram API integration. |
| Homepage / About / service copy | Edit the `.tsx` files in `src/app/*/page.tsx` directly |
| Contact info (phone, email, address, hours, social) | [`src/config/site.ts`](src/config/site.ts) — single source of truth, consumed by footer, JSON-LD, contact page, toast, Instagram widget |
| Favicon | [`src/app/icon.png`](src/app/icon.png) — Next.js serves this automatically |
| OG / Twitter share image | [`public/og-image.jpg`](public/og-image.jpg) — 1200×630 |

---

## Architecture

- **Next.js 14 App Router.** Routes are files in `src/app/`. Mostly server components; `"use client"` only on interactive pieces.
- **Hybrid SSG + ISR.** Blog posts are pre-rendered at build time via `generateStaticParams` and revalidate every hour (`revalidate = 3600`).
- **Wix CMS integration.** [`src/lib/wix-client.ts`](src/lib/wix-client.ts) creates the OAuth client; [`src/lib/wix-blog.ts`](src/lib/wix-blog.ts) fetches posts with `RICH_CONTENT` + `SEO` fieldsets. Rich content renders via `@wix/ricos`'s official `RicosViewer` ([`src/components/blog/RichContent.tsx`](src/components/blog/RichContent.tsx)).
- **Contact form.** Posts to `/api/contact` ([`src/app/api/contact/route.ts`](src/app/api/contact/route.ts)), which forwards to Wix Forms via [`src/lib/wix-forms.ts`](src/lib/wix-forms.ts).
- **Design tokens.** Colors are CSS custom properties in `globals.css`, exposed to Tailwind as `garage-*` classes (`bg-garage-canvas`, `text-garage-blue`, etc.). Fonts: DM Sans (body), Instrument Sans (display).
- **Animation.** GSAP + ScrollTrigger for scroll reveals and magnetic hover. All respect `prefers-reduced-motion`.
- **SEO.** `metadataBase` in root layout resolves relative URLs. Every page sets `alternates.canonical` and `openGraph`. Blog posts emit `BlogPosting` JSON-LD; home emits `GymOrFitnessFacility` JSON-LD. Legacy Wix URLs (`/post/*`, `/blog/*`) 301-redirect to `/fitnessblog/*` via [`next.config.mjs`](next.config.mjs).

---

## Known quirks

- **Sitemap `lastModified`** for static pages in [`src/app/sitemap.ts`](src/app/sitemap.ts) uses a hardcoded date. Bump it manually when static page content meaningfully changes (not required for blog posts — those use their own Wix timestamps).
- **Wix form field keys** in [`src/lib/wix-forms.ts`](src/lib/wix-forms.ts) are tied to the current Wix form schema. If the client edits field names/order in the Wix form builder, update the keys here.
- **Instagram feed is static.** If you want live Instagram sync, add the Instagram Basic Display API — not currently integrated. For now, swap files in `public/images/instagram/` when refreshing.
- **Wix CMS outages don't break builds.** Both [`src/app/sitemap.ts`](src/app/sitemap.ts) and [`src/app/fitnessblog/[slug]/page.tsx`](src/app/fitnessblog/[slug]/page.tsx) wrap Wix calls in try/catch. On failure, the sitemap falls back to static-pages-only and blog posts render on-demand via ISR instead of pre-rendering.
- **Blog listing fallback.** If `getAllPosts` returns empty or fails, [`src/app/fitnessblog/page.tsx`](src/app/fitnessblog/page.tsx) shows hardcoded placeholder posts with a "Wix disconnected" notice. Useful for local dev without Wix credentials; harmless in prod when Wix is reachable.
- **Google Search Console resubmission.** After a significant deploy, optionally re-submit `sitemap.xml` in GSC → Sitemaps to accelerate re-crawl. Not required — Google crawls on its own cadence.
- **Dev server crashes on Wix gallery posts.** Posts containing a Wix Gallery node (e.g. "Mastering Movement") crash `npm run dev` with `Jest worker encountered 2 child process exceptions`. **Production build, Netlify deploys, and ISR revalidation are unaffected** — the `npm run build` pipeline SSRs all 58 pages cleanly, same code path as prod. Restart `npm run dev` after hitting the crash, or test those posts against a production build (`npm run build && npm run start`). We prefer full SSR over a client-only workaround because Googlebot indexes server-rendered HTML more reliably.
- **Author attribution is organization-level.** BlogPosting JSON-LD attributes every post to `Garage 1880` rather than an individual author. Wix's Blog API returns only `post.memberId`; resolving to a display name requires a per-post call to the Wix Members API, which would break the static/ISR build model and add a failure mode for low SEO benefit. Leave as-is unless the client requests author pages.

---

## Future improvements (not blockers)

- Migrate trainers / testimonials / Instagram to Wix CMS collections so non-developers can edit.
- GDPR consent banner for GA (only needed if targeting EU visitors).
- Pre-commit hooks / CI (currently no automated lint or build on push; Netlify's build is the gate).
- Image compression sweep on `public/images/` (~7.9 MB total, could halve).
- Pin `@wix/sdk` and `@wix/ricos` to exact versions on next dependency review.
