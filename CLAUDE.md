# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Garage 1880 — a marketing website for a Denver-based personal training gym. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Wix Headless CMS for blog content.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # ESLint (next/core-web-vitals + typescript)
npm run qa:screenshots  # Playwright screenshot capture across viewports
```

## Architecture

### Routing & Rendering
- **Next.js App Router** with file-based routes in `src/app/`
- Hybrid server/client components — `"use client"` directive used for interactive components
- Path alias: `@/*` maps to `./src/*`

### Key Routes
- `/` — Home (hero, philosophy, gallery, services, testimonials)
- `/about-us` — About page
- `/personal-training` — Services with trainer grid
- `/contact-us-about-fitness` — Contact form
- `/fitnessblog` and `/fitnessblog/[slug]` — Blog listing and posts

### CMS Integration (Wix Headless)
- `src/lib/wix-client.ts` — OAuth client setup using `@wix/sdk`
- `src/lib/wix-blog.ts` — Blog API functions (`getAllPosts`, `getPostBySlug`, etc.)
- Rich content rendered via `@wix/ricos` in `src/components/blog/RichContent.tsx`
- Requires `NEXT_PUBLIC_WIX_CLIENT_ID` env variable
- Blog functions include graceful fallback when Wix API is unavailable

### Animation System
- **GSAP** (with ScrollTrigger) — scroll-triggered reveals, magnetic hover effects, parallax, modal animations. Core components in `src/components/motion/` (`Reveal.tsx`, `Magnetic.tsx`, `ParallaxLayer.tsx`)
- **CSS transitions** — page/route transitions (`RouteTransitionLayer.tsx`), popover animations (`ConsultPopover.tsx`)
- All animation components respect `prefers-reduced-motion`

### Design System
- Colors defined as CSS custom properties (RGB channel values) in `globals.css`, consumed via Tailwind's `garage-*` namespace (e.g., `bg-garage-canvas`, `text-garage-blue`)
- Fonts: DM Sans (body via `font-sans`), Instrument Sans (headings via `font-display`)
- Custom shadows: `shadow-soft`, `shadow-hover`, `shadow-dock`, `shadow-lilac`

### Component Organization
```
src/components/
  layout/    — SiteShell, Navbar, Footer, ContentContainer
  home/      — HomeHero, Testimonials
  motion/    — Reveal, Magnetic, ParallaxLayer, RouteTransitionLayer
  ui/        — PremiumButton, GlassCard, ConsultPopover, SectionHeading
  services/  — TrainerGrid, TrainerCard, TrainerModal
  contact/   — ContactForm
  blog/      — BlogCard, RichContent
```

### Image Sources
Remote images allowed from `static.wixstatic.com` and `images.unsplash.com` (configured in `next.config.mjs`). Always use Next.js `<Image>` for remote images.

### SEO
- Metadata and JSON-LD schema configured in root layout
- `robots.ts` and `sitemap.ts` generate SEO files dynamically
- Legacy URL redirects configured in `next.config.mjs`
