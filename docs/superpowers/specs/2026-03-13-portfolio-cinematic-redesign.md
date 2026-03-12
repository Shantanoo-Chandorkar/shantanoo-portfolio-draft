# Portfolio Cinematic Redesign — Design Spec

## Overview

Reimagine the portfolio as a "Cinematic Hybrid" experience that gives recruiters a dramatic first impression while keeping the rest of the site practical and easy to browse. The existing "Classic" design is preserved and accessible via a design toggle.

**Target audience:** Recruiters and hiring managers
**Impression goal:** Creative engineer — personality + technical skill, memorable but not gimmicky
**Priority content:** Work experience first, with quantified impact metrics

## Architecture: Dual Design System

The site supports two design modes: **Classic** (existing) and **Cinematic** (new). A `DesignContext` (modeled after the existing `ThemeContext`) manages the active mode.

### Landing Choice Screen

- Full-viewport overlay on first visit
- Two side-by-side cards: "Classic — Clean & Minimal" and "Cinematic — Interactive & Bold"
- Each card shows a small wireframe/preview thumbnail of its design
- Heading: user's name at top, "Choose your experience" below
- On click: overlay fades out, chosen design loads
- Choice persisted to `localStorage` under key `design-mode`
- Skipped on return visits (loads saved preference)

**SSR / Hydration strategy:** The `DesignContext` initializes with `designMode: null` (not `'classic'` or `'cinematic'`). On mount, a `useEffect` reads `localStorage`. While `designMode` is `null`, `page.tsx` renders nothing (returns `null`) to prevent flash. Once the `useEffect` resolves:
- If no saved preference → show LandingChoice overlay
- If saved preference exists → render the chosen design immediately

This avoids the overlay flashing on return visits. The brief blank frame before hydration is acceptable (same pattern as the existing `ThemeContext` dark mode initialization).

### Persistent Design Toggle

- Small icon button **next to the existing ThemeToggle at the top-left** (`fixed top-6 left-20 z-50` — offset to sit beside the theme toggle which is `w-10` at `fixed top-6 left-6`, leaving a small gap)
- In Cinematic mode with the sticky navbar visible: both the theme toggle and design toggle migrate into the navbar's far-right slot (the fixed-position versions hide)
- Always visible after landing choice is made
- Swaps between Classic and Cinematic instantly
- Respects `localStorage` for persistence

### Classic Mode

Renders the existing components unchanged:
- `HeroBanner` → `Experience` → `Projects` → `TechStack` → `About` → `DownloadCV` → `Contact`
- `ThemeToggle` and `DecorativeElements` function as they do today

### Cinematic Mode

Renders the new component set described below. `DecorativeElements` is rendered outside the mode-conditional block (always present in both modes). `ThemeToggle` is rendered in both modes but repositions into the sticky navbar in Cinematic mode.

**Note:** `app/page.tsx` must remain a `'use client'` component because `DesignContext` requires `localStorage` (client-only). Do not attempt to refactor it to a Server Component.

---

## Cinematic Design — Section by Section

### 1. Cinematic Hero (100vh)

**Section ID:** `id="hero"` (scroll target)

**Keeps from Classic:**
- Letter-by-letter name animation with staggered reveal
- Rotating title words ("Developer", "Engineer", "Designer", "Creator")
- Circular profile photo with gradient border glow
- Orbiting social link icons around the photo
- "Mumbai, India" location badge

**Adds:**
- **3 Impact Stats** — animated counters that count up when the hero is in view, displayed in a horizontal row below the title:
  - `2+` Years Experience
  - `100K+` Users Impacted
  - `5+` Products Shipped
- **"Scroll to explore"** cue at bottom with animated bouncing chevron. Clicking scrolls to `#experience`.
- **Cinematic staggered entrance** — all delays are absolute from page load (parallel offsets, not sequential waits):
  - Name: 0ms
  - Title: 200ms
  - Photo + orbiting icons: 400ms
  - Impact stats: 600ms
  - Scroll cue: 1000ms

**Changes from Classic:**
- Name text is significantly larger and bolder — the dramatic centerpiece
- Bio text tightened to one punchy sentence (not a paragraph)
- Overall layout remains two-column (text left, photo right) on desktop

**ImpactStat implementation:** Use Framer Motion's `useMotionValue` + `useTransform` + `animate()` to count from 0 to the target number when the stat scrolls into view. No external counting library needed.

### 2. Sticky Navbar

**Section ID:** N/A (not a content section — it's a persistent UI element)

Appears when the user scrolls past the hero section. Not present in Classic mode.

**Layout:**
- **Left:** Name (compact text, clickable — scrolls to `#hero`)
- **Center/Right:** Section links — Experience | Projects | Tech Stack | Contact
  - Link text matches section headings exactly
  - Each link scrolls to the corresponding section ID: `#experience`, `#projects`, `#tech-stack`, `#contact`
- **Far Right:** Download CV button (small, accent-colored) + Theme toggle + Design toggle

**Behavior:**
- Transparent background initially
- Gains frosted-glass (`bg-background/80 backdrop-blur-sm`) solid background once sticky
- Current section link highlights via Intersection Observer watching section IDs
- Smooth scroll on link click
- **Mobile:** Hamburger menu icon that opens a slide-down or slide-in panel with the section links. Not a horizontal scrollable row — hamburger is the standard mobile pattern.

### 3. Experience Section

**Section ID:** `id="experience"`

**Keeps from Classic:**
- Center timeline on desktop (alternating left/right cards)
- Left-aligned timeline on mobile
- Scroll-triggered entrance animations
- Technology badges on cards

**Changes:**
- Each card gets a **highlighted impact callout** — a large, bold number displayed prominently at the top of the card before the bullet points. This is the first thing the eye catches.
- Bullet points remain below the callout for detail
- Cards animate with smoother staggered delays

**Impact numbers are hardcoded fields** on the experience data objects (not parsed from description text). Each experience entry gets a new `highlights` array:

```ts
highlights: [
  { metric: '+200%', label: 'KPIs expanded' },
  { metric: '90%', label: 'ticket reduction' },
]
```

**Highlight values:**
- Brainstorm Force: `+200%` (KPIs expanded), `90%` (ticket reduction), `From Scratch` (Canvas Builder)
- Hummingbird: `+18pts` (Core Web Vitals), `50+` (components revamped), `10K+` (users secured)

The `ImpactStat` component is shared between `CinematicHero` (for the 3 hero stats) and `CinematicExperience` (for per-card highlights). It lives at `components/cinematic/ImpactStat.tsx`.

### 4. Projects Section

**Section ID:** `id="projects"`

**Replaces** the swipeable card deck entirely.

**New design:**
- **Grid layout** — 2 columns on desktop, 1 column on mobile
- Each project card: large screenshot image, project title, short description, 3-4 tech badges
- **Hover effect:** Card lifts (`translateY(-4px)` + enhanced shadow), gradient overlay appears with "View Details" prompt
- **GitHub + Live Demo** icon buttons directly on card surface (visible without hover)
  - When `liveUrl` is empty: **hide the Live Demo button entirely** — both on the card surface and inside the modal (do not show a disabled button — it clutters the UI for no benefit)
- **Click to open modal** — reuse the existing accessible modal (role="dialog", aria-modal, Escape key handler, AnimatePresence). The modal markup from `Projects.tsx` can be extracted into a shared `ProjectModal` component or duplicated in `CinematicProjects.tsx`.
- No swipe mechanics, no card dismissal, no "Reset Cards" button
- Scroll-triggered entrance: cards fade in with slight stagger

### 5. Tech Stack Section

**Section ID:** `id="tech-stack"`

**Replaces** the flat grid of 11 cards.

**New design:**
- **Grouped by domain** with clear headings. All technologies from the existing `TechStack.tsx` data are included:
  - **Frontend:** React.js, Next.js, TypeScript, JavaScript (ES6+), jQuery
  - **Backend:** PHP, Node.js, C#, .NET
  - **Languages:** JavaScript, PHP, C#, TypeScript, C++, Java, Go
  - **Database:** MySQL, MS-SQL, MongoDB
  - **CMS & E-commerce:** WordPress, WooCommerce, Magento
  - **Tools & DevOps:** Linux, Docker, Nginx, Apache, Git, GitHub, Bitbucket, SVN, Postman, VS Code
  - **Build Tools:** Webpack, ESLint, Babel, Grunt, PhpCodeSniffer
  - **Core Concepts:** Data Structures & Algorithms, System Design, Technical SEO, Core Web Vitals, Lighthouse, Accessibility
  - **Web Technologies:** REST APIs, GraphQL
  - **WordPress Ecosystem:** WooCommerce, WPForms, Yoast SEO, ACF, Elementor
- Each group: heading + horizontal row of compact **chip/badge** elements (not individual cards)
- Groups animate in staggered on scroll
- No individual card hover/rotate animations — clean and scannable

Note: Some technologies appear in multiple groups where it makes sense (e.g., JavaScript in both Frontend and Languages). The developer may deduplicate or keep overlaps — either is acceptable.

### 6. Contact Section (merged with CV + personality)

**Section ID:** `id="contact"`

**Keeps from Classic:**
- Contact form (left side) with name, email, subject, message fields
- Contact info sidebar (right side) with email, phone, location links
- Social links in sidebar
- Form submission via `/api/send-email` route

**Adds:**
- **CV download banner** above the form: "Want the full picture?" with Download CV button. Replaces the standalone DownloadCV section.
- **Personality strip** — compact horizontal row below the social links: three items with icons and short labels (e.g., "Avid Reader", "Trekker", "Anime Fan"). On click, each item expands to show a **one-sentence description** from the existing `About.tsx` hobby data (the `description` field, not the full `items` list). This keeps it lightweight.

**Removes:**
- DownloadCV as a standalone section
- About as a standalone section (content condensed into personality strip)

### 7. Floating CV Button

- Small floating button in bottom-right corner (`fixed bottom-6 right-6 z-40`)
- Appears after scrolling past the hero (controlled by scroll position or Intersection Observer)
- Accent-colored with download icon
- Always accessible regardless of scroll position
- **Only rendered in Cinematic mode** (Classic has its own DownloadCV section)

---

## Component Architecture

### New Files (Cinematic mode)

```
components/cinematic/
  CinematicHero.tsx        — Full-viewport hero with stats + scroll cue
  StickyNavbar.tsx          — Scroll-aware navigation bar with section highlighting
  CinematicExperience.tsx   — Timeline with impact callouts
  CinematicProjects.tsx     — Grid showcase with hover effects + modal
  CinematicTechStack.tsx    — Grouped domain chips
  CinematicContact.tsx      — Merged contact + CV banner + personality strip
  FloatingCVButton.tsx      — Persistent download button (bottom-right)
  ImpactStat.tsx            — Animated counter component (shared: hero + experience)
```

### New Shared Files

```
components/LandingChoice.tsx    — Design selection overlay
components/DesignToggle.tsx     — Persistent toggle button (top-left, near ThemeToggle)
contexts/DesignContext.tsx      — Design mode state + localStorage persistence
```

### Modified Files

```
app/page.tsx               — Conditionally render Classic or Cinematic based on DesignContext
                              Must remain 'use client' (DesignContext requires localStorage)
app/layout.tsx             — Wrap children with DesignProvider (alongside existing ThemeProvider)
```

### Unchanged Files (Classic mode)

All existing components remain untouched:
- `components/HeroBanner.tsx`
- `components/Experience.tsx`
- `components/Projects.tsx`
- `components/TechStack.tsx`
- `components/About.tsx`
- `components/DownloadCV.tsx`
- `components/Contact.tsx`
- `components/ThemeToggle.tsx`
- `components/DecorativeElements.tsx`
- `components/SectionHeader.tsx`
- `components/TechBadge.tsx`
- `components/ExperienceCard.tsx`

---

## Page Layout (Cinematic Mode)

```tsx
// Simplified render structure in page.tsx for Cinematic mode:
<main>
  <DecorativeElements />          {/* Always rendered, both modes */}
  <ThemeToggle />                  {/* Always rendered, repositions in Cinematic */}
  <DesignToggle />                 {/* Always rendered after landing choice */}
  <CinematicHero />                {/* id="hero" */}
  <StickyNavbar />                 {/* Appears on scroll past hero */}
  <CinematicExperience />          {/* id="experience" */}
  <CinematicProjects />            {/* id="projects" */}
  <CinematicTechStack />           {/* id="tech-stack" */}
  <CinematicContact />             {/* id="contact" */}
  <FloatingCVButton />             {/* Fixed position, appears on scroll */}
</main>
```

---

## Data / Content

Content sources remain unchanged. New data structures are added alongside existing ones:

- **Hero impact stats:** Hardcoded constants in `CinematicHero.tsx` (3 stat objects with `value`, `suffix`, and `label`)
- **Experience highlights:** New `highlights` field added to the experience data array in `CinematicExperience.tsx` (separate copy from Classic, not modifying the existing `Experience.tsx` data)
- **Tech stack groupings:** New grouped data structure in `CinematicTechStack.tsx`
- **Personality strip:** References the hobby `description` fields from `About.tsx` data (can be duplicated as 3 short objects in `CinematicContact.tsx`)

All other data: social links (`lib/social-links.ts`), contact info, project data — referenced directly from existing sources where the data shape is compatible, or duplicated in the Cinematic component where the shape differs.

---

## Styling

- Continues using Tailwind CSS with existing theme variables (both light and dark themes work in both design modes)
- `DecorativeElements` renders in both modes (outside the mode-conditional block)
- No new CSS variable definitions needed — reuse `--primary`, `--accent`, `--background`, etc.
- Frosted glass navbar: `bg-background/80 backdrop-blur-sm`
- New animations use Framer Motion (already a dependency)
- No new npm dependencies required

---

## Section ID Reference

| Section | ID | Navbar Link Text |
|---------|-----|-----------------|
| Hero | `hero` | (name — scrolls to top) |
| Experience | `experience` | Experience |
| Projects | `projects` | Projects |
| Tech Stack | `tech-stack` | Tech Stack |
| Contact | `contact` | Contact |

---

## Interactions

| Element | Interaction | Result |
|---------|------------|--------|
| Landing choice card | Click | Fade out overlay, load chosen design, save to localStorage |
| Design toggle | Click | Swap between Classic and Cinematic, save to localStorage |
| Sticky navbar links | Click | Smooth scroll to section by ID |
| Impact stat counters | Scroll into view | Count up from 0 using Framer Motion `animate()` |
| Experience cards | Scroll into view | Slide in from left/right with stagger |
| Project cards | Hover | Lift + shadow + gradient overlay with "View Details" |
| Project cards | Click | Open detail modal |
| Floating CV button | Click | Download PDF |
| Scroll-to-explore chevron | Click | Smooth scroll to `#experience` |
| Personality strip items | Click | Expand to show one-sentence description |

---

## What This Does NOT Include

- No new pages or routes (stays single-page)
- No backend changes (API route unchanged)
- No new npm dependencies (Framer Motion + existing stack covers everything)
- No changes to Classic mode components
- No SEO/meta changes
- No mobile-first redesign (responsive adjustments only)
- No Server Component refactoring (page.tsx must remain client component)
