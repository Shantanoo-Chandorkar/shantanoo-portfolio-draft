# Shantanoo Portfolio

Personal portfolio website built with Next.js and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15 (App Router, RSC enabled)
- **Language**: TypeScript 5.2
- **Styling**: Tailwind CSS 3.3 + shadcn/ui (Radix primitives)
- **Animation**: Framer Motion
- **Email**: Resend (API route at `app/api/send-email/route.ts`)
- **UI Components**: shadcn/ui (configured in `components.json`)
- **Image Optimization**: sharp

## Project Structure

```
app/                  # Next.js App Router pages and API routes
  api/send-email/     # Email sending endpoint
  globals.css         # Global styles + Tailwind directives
  layout.tsx          # Root layout
  page.tsx            # Home page
components/           # Page-level components
  ui/                 # shadcn/ui primitives (do not edit manually)
contexts/             # React context providers (ThemeContext)
lib/                  # Utility functions (utils, social-links, animation)
public/               # Static assets (images, resume PDF)
```

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint (next lint)
```

## Path Aliases

- `@/*` maps to project root (e.g., `@/components/About`, `@/lib/utils`)

## Conventions

- Components in `components/ui/` are shadcn/ui generated -- avoid manual edits
- Use `cn()` from `@/lib/utils` for conditional class merging (clsx + tailwind-merge)
- Tailwind CSS variables are configured (`cssVariables: true` in components.json)
- Images use Next.js `<Image>` with sharp for optimization
- Remote images allowed from `images.pexels.com` (configured in next.config.js)

## Gotchas

<!-- Update these as you discover project-specific issues -->
- `package-lock.json` is gitignored -- dependency versions may drift
- The project uses `@next/swc-wasm-nodejs` as a dependency (WASM fallback for SWC)
- ESLint extends `next/core-web-vitals` only -- no additional rules configured

## Current Focus

Refactoring complete. All 5 phases done. Plan: `.claude/plans/luminous-napping-lecun.md`

- [x] Phase 1: Dead Code Removal (42 unused shadcn/ui files, unused hooks, MascotCanvas, dead CSS)
- [x] Phase 2: Code Reduction via Extraction (SectionHeader, TechBadge, ExperienceCard, social-links, animation constants)
- [x] Phase 3: React Best Practices (variable shadowing, logic bug, memory leak, useMemo for random data)
- [x] Phase 4: Accessibility (sr-only h1, ARIA on modal/toggle/decorative elements, keyboard nav)
- [x] Phase 5: Minor Optimizations & Content Fixes (LCP priority, Button asChild, API sanitization, typo fix)
