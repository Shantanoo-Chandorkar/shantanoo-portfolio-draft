# Cinematic Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Cinematic" design mode alongside the existing "Classic" portfolio, with a landing choice screen, sticky navbar, impact stats, and redesigned sections.

**Architecture:** A `DesignContext` manages `'classic' | 'cinematic' | null` state via localStorage. `page.tsx` conditionally renders the appropriate component set. New Cinematic components live in `components/cinematic/`. Existing Classic components are untouched.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, shadcn/ui

**Spec:** `docs/superpowers/specs/2026-03-13-portfolio-cinematic-redesign.md`

---

## File Map

### New Files

| File | Responsibility |
|------|---------------|
| `contexts/DesignContext.tsx` | Design mode state + localStorage persistence |
| `components/LandingChoice.tsx` | First-visit design selection overlay |
| `components/DesignToggle.tsx` | Persistent toggle button (top-left) |
| `components/cinematic/ImpactStat.tsx` | Animated counter (shared: hero + experience) |
| `components/cinematic/CinematicHero.tsx` | Full-viewport hero with stats + scroll cue |
| `components/cinematic/StickyNavbar.tsx` | Scroll-aware navbar with section highlighting |
| `components/cinematic/CinematicExperience.tsx` | Timeline with impact callouts |
| `components/cinematic/CinematicProjects.tsx` | Grid showcase with hover effects + modal |
| `components/cinematic/CinematicTechStack.tsx` | Grouped domain chips |
| `components/cinematic/CinematicContact.tsx` | Merged contact + CV banner + personality strip |
| `components/cinematic/FloatingCVButton.tsx` | Persistent download button (bottom-right) |

### Modified Files

| File | Change |
|------|--------|
| `app/layout.tsx` | Wrap with `DesignProvider` |
| `app/page.tsx` | Conditional Classic/Cinematic rendering |
| `components/ThemeToggle.tsx` | Add `variant` prop for navbar mode |

### Unchanged Files

All existing components in `components/` remain untouched. `lib/social-links.ts`, `lib/utils.ts` are reused as-is.

| File | Change |
|------|--------|
| `lib/animation.ts` | Add `once: true` to `VIEWPORT_ONCE` constant |

---

## Chunk 1: Foundation (DesignContext + Layout + LandingChoice + Toggle)

### Task 1: Create DesignContext

**Files:**
- Create: `contexts/DesignContext.tsx`

- [ ] **Step 1: Create the DesignContext**

```tsx
// contexts/DesignContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type DesignMode = 'classic' | 'cinematic';

interface DesignContextType {
  designMode: DesignMode | null;
  setDesignMode: (mode: DesignMode) => void;
  isLoaded: boolean;
  hasChosen: boolean;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export function DesignProvider({ children }: { children: ReactNode }) {
  const [designMode, setDesignModeState] = useState<DesignMode | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('design-mode') as DesignMode | null;
    if (saved === 'classic' || saved === 'cinematic') {
      setDesignModeState(saved);
      setHasChosen(true);
    }
    // Always mark as loaded after reading localStorage
    setIsLoaded(true);
  }, []);

  const setDesignMode = (mode: DesignMode) => {
    setDesignModeState(mode);
    setHasChosen(true);
    localStorage.setItem('design-mode', mode);
  };

  return (
    <DesignContext.Provider value={{ designMode, setDesignMode, isLoaded, hasChosen }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesignMode() {
  const context = useContext(DesignContext);
  if (context === undefined) {
    throw new Error('useDesignMode must be used within a DesignProvider');
  }
  return context;
}
```

- [ ] **Step 2: Run build to verify**

Run: `npm run build`
Expected: Compiles successfully (file is not imported yet)

- [ ] **Step 3: Commit**

```bash
git add contexts/DesignContext.tsx
git commit -m "feat: add DesignContext for dual design mode"
```

---

### Task 1b: Fix VIEWPORT_ONCE in lib/animation.ts

**Files:**
- Modify: `lib/animation.ts`

- [ ] **Step 1: Add `once: true` to VIEWPORT_ONCE**

The existing constant is missing `once: true`, which causes all scroll-triggered animations across the site to re-trigger every time elements leave and re-enter the viewport.

Change:
```ts
export const VIEWPORT_ONCE = { amount: 0.3 } as const;
```
To:
```ts
export const VIEWPORT_ONCE = { once: true, amount: 0.3 } as const;
```

---

### Task 2: Wire DesignProvider into layout and update page.tsx

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Add DesignProvider to layout.tsx**

In `app/layout.tsx`, add the import and wrap children:

```tsx
// Add import at top:
import { DesignProvider } from '@/contexts/DesignContext';

// In the return, wrap ThemeProvider's children:
<ThemeProvider>
  <DesignProvider>
    {children}
  </DesignProvider>
</ThemeProvider>
```

- [ ] **Step 2: Update page.tsx with conditional rendering skeleton**

Replace the entire `app/page.tsx` with:

```tsx
'use client';

import { motion } from 'framer-motion';
import { useDesignMode } from '@/contexts/DesignContext';

// Classic components
import { HeroBanner } from '@/components/HeroBanner';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { TechStack } from '@/components/TechStack';
import { About } from '@/components/About';
import { DownloadCV } from '@/components/DownloadCV';
import { Contact } from '@/components/Contact';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DecorativeElements } from '@/components/DecorativeElements';
import { LandingChoice } from '@/components/LandingChoice';
import { DesignToggle } from '@/components/DesignToggle';

function ClassicView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroBanner />
      <Experience />
      <Projects />
      <TechStack />
      <About />
      <DownloadCV />
      <Contact />
    </motion.div>
  );
}

function CinematicView() {
  // Placeholder — will be filled in Chunk 2-5
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-foreground text-2xl">Cinematic mode coming soon...</p>
    </div>
  );
}

export default function Home() {
  const { designMode, hasChosen, isLoaded } = useDesignMode();

  // While loading from localStorage, render nothing to prevent flash
  if (!isLoaded) return null;

  return (
    <main className="min-h-screen relative">
      <DecorativeElements />
      <ThemeToggle />

      {/* Show landing choice if no preference saved */}
      {!hasChosen && designMode === null && <LandingChoice />}

      {/* Show design toggle once a choice has been made */}
      {hasChosen && <DesignToggle />}

      {/* Render the chosen design */}
      {designMode === 'classic' && <ClassicView />}
      {designMode === 'cinematic' && <CinematicView />}
    </main>
  );
}
```

**Note:** This will NOT build yet — `LandingChoice` and `DesignToggle` don't exist. Create them in the next tasks before building.

---

### Task 3: Create LandingChoice component

**Files:**
- Create: `components/LandingChoice.tsx`

- [ ] **Step 1: Create the LandingChoice overlay**

```tsx
// components/LandingChoice.tsx
'use client';

import { type ElementType } from 'react';
import { motion } from 'framer-motion';
import { useDesignMode, DesignMode } from '@/contexts/DesignContext';
import { Sparkles, Leaf } from 'lucide-react';

const options: { mode: DesignMode; title: string; subtitle: string; icon: ElementType; description: string }[] = [
  {
    mode: 'classic',
    title: 'Classic',
    subtitle: 'Clean & Minimal',
    icon: Leaf,
    description: 'A clean, scrollable portfolio with smooth animations and a nature-inspired aesthetic.',
  },
  {
    mode: 'cinematic',
    title: 'Cinematic',
    subtitle: 'Interactive & Bold',
    icon: Sparkles,
    description: 'A dramatic full-screen hero, sticky navigation, impact stats, and engaging interactions.',
  },
];

export function LandingChoice() {
  const { setDesignMode } = useDesignMode();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
          Shantanoo Chandorkar
        </h1>
        <p className="text-lg text-muted-foreground">Choose your experience</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
        {options.map((option, index) => (
          <motion.button
            key={option.mode}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setDesignMode(option.mode)}
            className="group relative bg-card/50 border border-border backdrop-blur-sm rounded-xl p-8 text-left hover:bg-card/70 hover:border-primary/50 transition-colors duration-300 cursor-pointer"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <option.icon className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-1">{option.title}</h2>
            <p className="text-sm font-medium text-primary mb-3">{option.subtitle}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{option.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
```

---

### Task 4: Create DesignToggle component

**Files:**
- Create: `components/DesignToggle.tsx`

- [ ] **Step 1: Create the DesignToggle button**

```tsx
// components/DesignToggle.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Leaf } from 'lucide-react';
import { useDesignMode } from '@/contexts/DesignContext';
import { Button } from '@/components/ui/button';

interface DesignToggleProps {
  variant?: 'fixed' | 'navbar';
}

export function DesignToggle({ variant = 'fixed' }: DesignToggleProps) {
  const { designMode, setDesignMode } = useDesignMode();

  const toggle = () => {
    setDesignMode(designMode === 'classic' ? 'cinematic' : 'classic');
  };

  const button = (
    <Button
      onClick={toggle}
      size="icon"
      aria-label={`Switch to ${designMode === 'classic' ? 'cinematic' : 'classic'} design`}
      className="relative overflow-hidden bg-primary/10 hover:bg-primary/20 border-2 border-primary/20 backdrop-blur-sm transition-all duration-300 w-10 h-10"
    >
      <AnimatePresence mode="wait" initial={false}>
        {designMode === 'classic' ? (
          <motion.span
            key="classic"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
            aria-hidden="true"
          >
            <Leaf className="w-5 h-5 text-emerald-500" />
          </motion.span>
        ) : (
          <motion.span
            key="cinematic"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
            aria-hidden="true"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );

  // In navbar mode, render inline without fixed positioning
  if (variant === 'navbar') return button;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-6 left-20 z-50"
    >
      {button}
    </motion.div>
  );
}
```

**ThemeToggle variant support:** The existing `ThemeToggle` also needs a `variant` prop. During implementation (Task 7), add an optional `variant?: 'fixed' | 'navbar'` prop to `ThemeToggle`. When `variant='navbar'`, skip the `fixed top-6 left-6 z-50` wrapper — render only the button inline. When `variant='fixed'` (default), keep the existing fixed positioning. This is the only modification to an existing Classic component.

**Hiding fixed toggles when navbar is visible:** In `page.tsx`, the fixed `<ThemeToggle />` and `<DesignToggle />` remain at the top level. To avoid duplicate toggles when the navbar is showing, the StickyNavbar exports its `isVisible` state (or the fixed toggles can check scroll position independently). The simplest approach: add a `cinematic-navbar-visible` CSS class to `<body>` when the navbar shows, and hide the fixed toggles with `[body.cinematic-navbar-visible] .fixed-toggle { display: none }`. This will be handled during Task 7 implementation.

- [ ] **Step 2: Run build to verify Chunk 1**

Run: `npm run build`
Expected: Compiles successfully. Classic mode works as before. Landing choice shows on first visit.

- [ ] **Step 3: Run dev server and verify visually**

Run: `npm run dev`
Check:
1. Clear localStorage (`localStorage.removeItem('design-mode')`) and reload — Landing Choice overlay appears
2. Click "Classic" — existing portfolio loads, design toggle appears at top-left next to theme toggle
3. Click design toggle — switches to "Cinematic mode coming soon..." placeholder
4. Reload — last choice is remembered (no landing overlay)

- [ ] **Step 4: Commit Chunk 1**

```bash
git add contexts/DesignContext.tsx components/LandingChoice.tsx components/DesignToggle.tsx app/layout.tsx app/page.tsx
git commit -m "feat: add dual design system foundation with landing choice and toggle"
```

---

## Chunk 2: Cinematic Hero + ImpactStat

### Task 5: Create ImpactStat component

**Files:**
- Create: `components/cinematic/ImpactStat.tsx`

- [ ] **Step 1: Create the animated counter component**

```tsx
// components/cinematic/ImpactStat.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValue, animate, useInView } from 'framer-motion';

interface ImpactStatProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

export function ImpactStat({ value, suffix = '', label, delay = 0 }: ImpactStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Subscribe to motionValue changes and update displayValue state
    const unsubscribe = motionValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [motionValue]);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 1.5,
        delay,
        ease: 'easeOut',
      });
      return () => controls.stop();
    }
  }, [isInView, motionValue, value, delay]);

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-baseline justify-center">
        <span className="text-3xl sm:text-4xl font-bold text-primary">
          {displayValue}
        </span>
        {suffix && (
          <span className="text-xl sm:text-2xl font-bold text-primary">{suffix}</span>
        )}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
```

---

### Task 6: Create CinematicHero component

**Files:**
- Create: `components/cinematic/CinematicHero.tsx`

- [ ] **Step 1: Create the full-viewport cinematic hero**

```tsx
// components/cinematic/CinematicHero.tsx
'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { heroSocialLinks } from '@/lib/social-links';
import { ImpactStat } from './ImpactStat';

const name = 'Shantanoo Chandorkar';
const nameWords = name.split(' ');
const title = 'Software';
const words = ['Developer', 'Engineer', 'Designer', 'Creator'];

const heroStats = [
  { value: 2, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: 'K+', label: 'Users Impacted' },
  { value: 5, suffix: '+', label: 'Products Shipped' },
];

export function CinematicHero() {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(200);
  const nameRef = useRef(null);
  const isNameInView = useInView(nameRef, { once: true });
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % heroSocialLinks.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getIconPosition = (index: number, currentIndex: number, r: number) => {
    const totalIcons = heroSocialLinks.length;
    const angleStep = (2 * Math.PI) / totalIcons;
    const baseAngle = index * angleStep;
    const rotationOffset = currentIndex * angleStep;
    const angle = baseAngle - rotationOffset - Math.PI / 2;
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
  };

  useEffect(() => {
    const updateRadius = () => {
      if (imageRef.current) {
        const size = imageRef.current.offsetWidth;
        const iconSize = 48;
        const offset = size * 0.06;
        setRadius((size - iconSize) / 2 + offset);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const scrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          {/* Name — delay 0ms */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            className="mb-4"
          >
            <h1
              ref={nameRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-4 flex flex-wrap lg:flex-nowrap justify-center lg:justify-start items-center"
            >
              <span className="sr-only">{name}</span>
              <span aria-hidden="true" className="flex flex-wrap lg:flex-nowrap">
                {nameWords.map((word, wIndex) => (
                  <span key={wIndex} className="inline-block whitespace-nowrap break-keep mr-3">
                    {word.split('').map((letter, lIndex) => (
                      <motion.span
                        key={lIndex}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        animate={isNameInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: (wIndex * word.length + lIndex) * 0.03 }}
                        className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                      >
                        {letter}
                      </motion.span>
                    ))}
                    {wIndex < nameWords.length - 1 && '\u00A0'}
                  </span>
                ))}
              </span>
            </h1>

            {/* Title — delay 200ms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-center lg:text-left mb-4 whitespace-nowrap"
            >
              {title}{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIndex]}
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center justify-center lg:justify-start text-muted-foreground mb-4"
            >
              <MapPin className="w-4 h-4 mr-2" />
              <span>Mumbai, India</span>
            </motion.div>

            {/* Bio — one punchy sentence */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-lg font-medium"
            >
              Building performant web applications and scalable SaaS platforms trusted by hundreds of thousands of users.
            </motion.p>
          </motion.div>

          {/* Impact Stats — delay 600ms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-3 gap-6 mt-8"
          >
            {heroStats.map((stat, i) => (
              <ImpactStat
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 0.15}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Photo + orbiting icons — delay 400ms */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <div ref={imageRef} className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <motion.div whileHover={{ scale: 1.05 }} className="relative z-10 w-full h-full">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-xl opacity-30"
              />
              <Image
                src="/banner-image.jpg"
                alt="Shantanoo Chandorkar profile photo"
                width={450}
                height={450}
                priority
                className="w-full h-full rounded-full object-cover border-4 border-border backdrop-blur-sm relative z-10"
              />
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center">
              {heroSocialLinks.map((link, index) => {
                const position = getIconPosition(index, currentIconIndex, radius);
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    aria-label={`Visit Shantanoo Chandorkar's ${link.label} Profile`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute z-20"
                    animate={{ x: position.x, y: position.y }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-card/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ boxShadow: `0 0 20px ${link.color}20` }}
                    >
                      <link.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: link.color }} />
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to explore — delay 1000ms */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={scrollToExperience}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="Scroll to experience section"
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
```

- [ ] **Step 2: Wire CinematicHero into page.tsx**

In `app/page.tsx`, replace the `CinematicView` placeholder:

```tsx
// Add import at top:
import { CinematicHero } from '@/components/cinematic/CinematicHero';

// Replace CinematicView function:
function CinematicView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CinematicHero />
    </motion.div>
  );
}
```

- [ ] **Step 3: Run build to verify**

Run: `npm run build`
Expected: Compiles successfully

- [ ] **Step 4: Visual verification**

Run: `npm run dev`
Check: Switch to Cinematic mode — hero shows with large name, rotating title, impact stat counters animate up, scroll cue bounces at bottom.

- [ ] **Step 5: Commit Chunk 2**

```bash
git add components/cinematic/ImpactStat.tsx components/cinematic/CinematicHero.tsx app/page.tsx
git commit -m "feat: add cinematic hero with impact stats and scroll cue"
```

---

## Chunk 3: Sticky Navbar

### Task 7: Create StickyNavbar component

**Files:**
- Create: `components/cinematic/StickyNavbar.tsx`

- [ ] **Step 1: Create the sticky navbar with Intersection Observer**

```tsx
// components/cinematic/StickyNavbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DesignToggle } from '@/components/DesignToggle';

const navLinks = [
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Tech Stack', id: 'tech-stack' },
  { label: 'Contact', id: 'contact' },
];

export function StickyNavbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Show navbar after scrolling past hero
  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  // Track active section
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50"
        >
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Left: Name */}
            <button
              onClick={scrollToTop}
              className="text-lg font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Shantanoo
            </button>

            {/* Center: Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-2 text-sm rounded-md transition-colors cursor-pointer ${
                    activeSection === link.id
                      ? 'text-primary font-semibold bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right: CV button + toggles + mobile menu */}
            <div className="flex items-center gap-2">
              <Button asChild size="sm" className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="/Shantanoo_Chandorkar_Resume.pdf" download>
                  <Download className="w-4 h-4 mr-1" />
                  CV
                </a>
              </Button>

              {/* Toggles migrate into navbar when visible */}
              <div className="hidden md:flex items-center gap-1">
                <ThemeToggle variant="navbar" />
                <DesignToggle variant="navbar" />
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-foreground hover:bg-muted/50 rounded-md cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu panel */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden border-t border-border/50 overflow-hidden bg-background/95 backdrop-blur-sm"
              >
                <div className="px-4 py-3 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollTo(link.id)}
                      className={`px-3 py-2 text-sm rounded-md text-left transition-colors cursor-pointer ${
                        activeSection === link.id
                          ? 'text-primary font-semibold bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                  <Button asChild size="sm" className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <a href="/Shantanoo_Chandorkar_Resume.pdf" download>
                      <Download className="w-4 h-4 mr-1" />
                      Download CV
                    </a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Wire StickyNavbar into page.tsx**

In `app/page.tsx`, add the import and include in `CinematicView`:

```tsx
import { StickyNavbar } from '@/components/cinematic/StickyNavbar';

// In CinematicView:
function CinematicView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CinematicHero />
      <StickyNavbar />
    </motion.div>
  );
}
```

- [ ] **Step 3: Run build and verify**

Run: `npm run build`
Expected: Compiles. Navbar appears when scrolling past hero, highlights correct section, hamburger works on mobile.

- [ ] **Step 4: Commit Chunk 3**

```bash
git add components/cinematic/StickyNavbar.tsx app/page.tsx
git commit -m "feat: add sticky navbar with section highlighting and mobile menu"
```

---

## Chunk 4: Content Sections (Experience + Projects + TechStack)

### Task 8: Create CinematicExperience

**Files:**
- Create: `components/cinematic/CinematicExperience.tsx`

- [ ] **Step 1: Create the experience section with impact callouts**

```tsx
// components/cinematic/CinematicExperience.tsx
'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/SectionHeader';
import { TechBadge } from '@/components/TechBadge';
import { VIEWPORT_ONCE } from '@/lib/animation';

interface Highlight {
  metric: string;
  label: string;
}

interface ExperienceEntry {
  id: number;
  company: string;
  position: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  highlights: Highlight[];
  side: 'left' | 'right';
}

const experiences: ExperienceEntry[] = [
  {
    id: 1,
    company: 'Brainstorm Force (CartFlows)',
    position: 'Software Developer',
    period: 'August 2025 - Present',
    location: 'Remote',
    description: [
      'Overhauled CartFlows Flow Analytics, expanding tracked KPIs from 8 to 24 (+200%) with new tabular data views, achieving zero regression and no performance degradation on a database-heavy implementation.',
      'Engineered a full-featured interactive Canvas Builder from scratch using React and ReactFlow, dynamically visualizing complete funnel flows and all nested steps in a node-based UI.',
      'Resolved 3 critical payment failures — Stripe Express Checkout blocking transactions, PayPal infinite loading on upsell, and Google Pay misrouting to WooCommerce — cutting payment-related support tickets by 90%.',
      'Conducted a comprehensive security audit of the CartFlows plugin and independently remediated all identified vulnerabilities spanning all CVSS severity tiers.',
      'Pioneered WordPress Abilities API integration for CartFlows, mapping plugin capabilities as MCP-compatible tools within the WordPress MCP server architecture.',
    ],
    technologies: ['PHP', 'React.js', 'ReactFlow', 'JavaScript', 'MySQL', 'WordPress', 'WooCommerce', 'REST APIs', 'Git'],
    highlights: [
      { metric: '+200%', label: 'KPIs expanded' },
      { metric: '90%', label: 'ticket reduction' },
      { metric: 'From Scratch', label: 'Canvas Builder' },
    ],
    side: 'left',
  },
  {
    id: 2,
    company: 'Hummingbird Web Solutions Pvt Ltd.',
    position: 'Software Engineer',
    period: 'December 2023 - July 2025',
    location: 'Pune, India',
    description: [
      'Built a high-performance Windows application automating JSON-to-PDF conversion using C# and .NET, delivering 20% faster internal workflows with full CRUD persistence for 10+ designers.',
      'Revamped 50+ React-based Gutenberg block components, improving accessibility and UX for 4,000+ active users across the Responsive Blocks plugin.',
      'Resolved critical security vulnerabilities in a SaaS platform, hardening reliability for 10,000+ active users including 200+ premium subscribers.',
      'Boosted Core Web Vitals score from 71 to 89 (+18 points) by targeting LCP and CLS via lazy loading, DOM optimizations, and layout fixes.',
    ],
    technologies: ['React.js', 'WordPress', 'PHP', 'JavaScript', 'C#', '.NET', 'MySQL', 'GitHub', 'REST APIs'],
    highlights: [
      { metric: '+18pts', label: 'Core Web Vitals' },
      { metric: '50+', label: 'components revamped' },
      { metric: '10K+', label: 'users secured' },
    ],
    side: 'right',
  },
];

function HighlightBadges({ highlights }: { highlights: Highlight[] }) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {highlights.map((h) => (
        <div key={h.label} className="flex items-baseline gap-1.5 bg-primary/10 border border-primary/20 rounded-lg px-3 py-1.5">
          <span className="text-lg font-bold text-primary">{h.metric}</span>
          <span className="text-xs text-muted-foreground">{h.label}</span>
        </div>
      ))}
    </div>
  );
}

function CinematicExpCard({ exp, className = '' }: { exp: ExperienceEntry; className?: string }) {
  return (
    <Card className={`bg-card/50 border-border backdrop-blur-sm hover:bg-card/70 transition-all duration-300 ${className}`}>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground mb-1">{exp.position}</h3>
          <div className="flex items-center text-primary mb-2">
            <Building className="w-4 h-4 mr-2" />
            <span className="font-semibold">{exp.company}</span>
          </div>
          <div className="flex flex-col text-muted-foreground text-sm">
            <div className="flex items-center mb-1">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{exp.period}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{exp.location}</span>
            </div>
          </div>
        </div>

        <HighlightBadges highlights={exp.highlights} />

        <ul className="text-muted-foreground mb-6 space-y-2 text-left">
          {exp.description.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="text-primary mr-3 mt-1" aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function CinematicExperience() {
  return (
    <section id="experience" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader heading="Experience" subtitle="My professional journey in software development." />

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-primary" />

          {experiences.map((exp, index) => (
            <div
              key={`dot-${exp.id}`}
              className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg z-10"
              style={{ top: `${Math.round((index + 1) * 100 / (experiences.length + 1))}%` }}
            />
          ))}

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: exp.side === 'left' ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={VIEWPORT_ONCE}
              className={`relative mb-16 ${
                exp.side === 'left' ? 'md:pr-1/2 md:text-left' : 'md:pl-1/2 md:ml-auto md:text-left'
              }`}
              style={{ width: '50%' }}
            >
              <div className={exp.side === 'left' ? 'md:pr-8' : 'md:pl-8'}>
                <CinematicExpCard exp={exp} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden relative">
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-primary to-accent" />
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ amount: 0.1 }}
              className="relative mb-12"
            >
              <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background" />
              <CinematicExpCard exp={exp} className="ml-12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 9: Create CinematicProjects

**Files:**
- Create: `components/cinematic/CinematicProjects.tsx`

- [ ] **Step 1: Create the grid-based projects section**

```tsx
// components/cinematic/CinematicProjects.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { SectionHeader } from '@/components/SectionHeader';
import { TechBadge } from '@/components/TechBadge';
import { VIEWPORT_ONCE } from '@/lib/animation';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  features: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'CineMix Platform',
    description: 'A Full-Stack application for Movies and TV shows.',
    longDescription: 'A Full-Stack application that leverages the IMDB API to provide users with searchable movie and TV show information, including details like ratings, cast, and plot summaries.',
    technologies: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Javascript', 'Tailwind CSS', 'IMDB API', 'Axios', 'Redux', 'JWT', 'Bcrypt', 'Mongoose'],
    image: '/cinemix.png',
    githubUrl: 'https://github.com/Shantanoo-Chandorkar/mern-movie-app',
    liveUrl: 'https://cinemixmern.netlify.app/',
    features: ['React Skeletons', 'Search Functionality', 'Movie Details', 'User Authentication', 'Responsive Design', 'Favorite Movies', 'Lazy Loading'],
  },
  {
    id: 2,
    title: 'Habit Tracker',
    description: 'Modern Habit Tracker with Analytics feature coming soon.',
    longDescription: 'A robust habit tracking platform where users can authenticate, organize habits by category, and monitor their progress through detailed weekly, monthly, and yearly insights, with analytics coming soon.',
    technologies: ['Next.js', 'MongoDB', 'App Router', 'JavaScript', 'Bcrypt'],
    image: '/habit-tracker.png',
    githubUrl: 'https://github.com/Shantanoo-Chandorkar/next-habit-tracker',
    liveUrl: 'https://next-habit-tracker.vercel.app/',
    features: ['User Authentication', 'Progress Tracking', 'Weekly Insights', 'Monthly Insights', 'Yearly Insights', 'Responsive Design', 'Analytics Coming Soon'],
  },
  {
    id: 3,
    title: 'Portfolio Project',
    description: 'Portfolio project showcasing frontend skills with intuitive UI and animations',
    longDescription: 'A portfolio project that highlights my frontend development skills, featuring an intuitive user interface, smooth animations, and responsive design.',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'React'],
    image: '/portfolio-1.png',
    githubUrl: 'https://github.com/Shantanoo-Chandorkar/shantanoo-portfolio-draft',
    liveUrl: '',
    features: ['Responsive Design', 'Smooth Animations', 'Intuitive UI', 'Portfolio Showcase', 'Dark Mode', 'Light Mode'],
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={VIEWPORT_ONCE}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
    >
      <div className="bg-card/50 border border-border backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            width={600}
            height={400}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span className="text-sm font-medium text-foreground">View Details</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <TechBadge key={tech} tech={tech} size="sm" />
            ))}
            {project.technologies.length > 4 && (
              <TechBadge tech={`+${project.technologies.length - 4}`} size="sm" />
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button asChild size="sm" variant="outline" className="text-xs">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <FaGithub className="w-3.5 h-3.5 mr-1" />
                Code
              </a>
            </Button>
            {project.liveUrl && (
              <Button asChild size="sm" variant="outline" className="text-xs">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  Live
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CinematicProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    if (selectedProject) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="projects" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader heading="Projects" subtitle="Things I've built to solve problems and learn new things." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={project.id} onClick={() => setSelectedProject(project)}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <Image src={selectedProject.image} alt={selectedProject.title} className="w-full h-64 object-cover rounded-t-lg" width={600} height={500} />
                  <Button variant="ghost" size="sm" aria-label="Close modal" className="absolute top-4 right-4 bg-background/50 text-foreground hover:bg-background/70" onClick={() => setSelectedProject(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-6">
                  <h3 id="modal-title" className="text-2xl font-bold text-foreground mb-4">{selectedProject.title}</h3>
                  <p className="text-muted-foreground mb-6">{selectedProject.longDescription}</p>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-foreground mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-muted-foreground">
                          <span className="text-primary mr-3 mt-1" aria-hidden="true">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <TechBadge key={tech} tech={tech} />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-row max-sm:flex-col gap-4">
                    <Button asChild className="bg-primary hover:bg-primary/90">
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <FaGithub className="w-4 h-4 mr-2" />
                        <span className="text-xs">View Code</span>
                      </a>
                    </Button>
                    {selectedProject.liveUrl && (
                      <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          <span className="text-xs">Live Demo</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
```

---

### Task 10: Create CinematicTechStack

**Files:**
- Create: `components/cinematic/CinematicTechStack.tsx`

- [ ] **Step 1: Create the grouped tech stack section**

```tsx
// components/cinematic/CinematicTechStack.tsx
'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import { VIEWPORT_ONCE } from '@/lib/animation';

interface TechGroup {
  name: string;
  items: string[];
}

const techGroups: TechGroup[] = [
  { name: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'jQuery'] },
  { name: 'Backend', items: ['PHP', 'Node.js', 'C#', '.NET'] },
  { name: 'Languages', items: ['JavaScript', 'PHP', 'C#', 'TypeScript', 'C++', 'Java', 'Go'] },
  { name: 'Database', items: ['MySQL', 'MS-SQL', 'MongoDB'] },
  { name: 'CMS & E-commerce', items: ['WordPress', 'WooCommerce', 'Magento'] },
  { name: 'Tools & DevOps', items: ['Linux', 'Docker', 'Nginx', 'Apache', 'Git', 'GitHub', 'Bitbucket', 'SVN', 'Postman', 'VS Code'] },
  { name: 'Build Tools', items: ['Webpack', 'ESLint', 'Babel', 'Grunt', 'PhpCodeSniffer'] },
  { name: 'Core Concepts', items: ['DSA', 'System Design', 'Technical SEO', 'Core Web Vitals', 'Lighthouse', 'Accessibility'] },
  { name: 'Web Technologies', items: ['REST APIs', 'GraphQL'] },
  { name: 'WordPress Ecosystem', items: ['WooCommerce', 'WPForms', 'Yoast SEO', 'ACF', 'Elementor'] },
];

export function CinematicTechStack() {
  return (
    <section id="tech-stack" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader heading="Tech Stack" subtitle="Technologies and tools I work with" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techGroups.map((group, index) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={VIEWPORT_ONCE}
            >
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{group.name}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm bg-card/50 border border-border rounded-full text-foreground hover:bg-card/70 hover:border-primary/30 transition-colors duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire all three sections into page.tsx**

Update `CinematicView` in `app/page.tsx`:

```tsx
// Add imports:
import { CinematicExperience } from '@/components/cinematic/CinematicExperience';
import { CinematicProjects } from '@/components/cinematic/CinematicProjects';
import { CinematicTechStack } from '@/components/cinematic/CinematicTechStack';

// Update CinematicView:
function CinematicView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CinematicHero />
      <StickyNavbar />
      <CinematicExperience />
      <CinematicProjects />
      <CinematicTechStack />
    </motion.div>
  );
}
```

- [ ] **Step 3: Run build and verify**

Run: `npm run build`
Expected: Compiles successfully. All content sections render with scroll-triggered animations.

- [ ] **Step 4: Commit Chunk 4**

```bash
git add components/cinematic/CinematicExperience.tsx components/cinematic/CinematicProjects.tsx components/cinematic/CinematicTechStack.tsx app/page.tsx
git commit -m "feat: add cinematic experience, projects grid, and grouped tech stack"
```

---

## Chunk 5: Contact + FloatingCV + Final Integration

### Task 11: Create CinematicContact

**Files:**
- Create: `components/cinematic/CinematicContact.tsx`

- [ ] **Step 1: Create the merged contact section**

```tsx
// components/cinematic/CinematicContact.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Download, BookOpen, Mountain, Tv } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/SectionHeader';
import { contactSocialLinks } from '@/lib/social-links';
import { VIEWPORT_ONCE } from '@/lib/animation';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'shantanoochandorkar@gmail.com', href: 'mailto:shantanoochandorkar@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 9930725465', href: 'tel:+919930725465' },
  { icon: MapPin, label: 'Location', value: 'Mumbai, India', href: 'https://www.google.com/maps/search/?api=1&query=Mumbai,+India' },
];

const personalityItems = [
  { icon: BookOpen, label: 'Avid Reader', description: 'An avid reader who believes in the power of knowledge and storytelling.' },
  { icon: Mountain, label: 'Trekker', description: 'Nature enthusiast who finds peace and challenge in the mountains.' },
  { icon: Tv, label: 'Anime Fan', description: 'A passionate otaku who finds inspiration in Japanese animation and storytelling.' },
];

export function CinematicContact() {
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [expandedPersonality, setExpandedPersonality] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send email');
      setIsSubmitted(true);
      resetTimerRef.current = setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader heading="Get In Touch" subtitle="Let's discuss your next project or opportunity" />

        {/* CV Download Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={VIEWPORT_ONCE}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-foreground">Want the full picture?</h3>
              <p className="text-sm text-muted-foreground">Download my complete CV with experience, skills, and education.</p>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">
              <a href="/Shantanoo_Chandorkar_Resume.pdf" download>
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </a>
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={VIEWPORT_ONCE}
          >
            <Card className="bg-card/50 border-border backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>
                {isSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h4>
                    <p className="text-muted-foreground">{"Thank you for reaching out. I'll get back to you soon."}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{error}</span>
                      </motion.div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cin-name" className="block text-sm font-medium text-muted-foreground mb-2">Name *</label>
                        <Input id="cin-name" name="name" type="text" required value={formData.name} onChange={handleInputChange} className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary" placeholder="Your name" />
                      </div>
                      <div>
                        <label htmlFor="cin-email" className="block text-sm font-medium text-muted-foreground mb-2">Email *</label>
                        <Input id="cin-email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary" placeholder="your@email.com" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cin-subject" className="block text-sm font-medium text-muted-foreground mb-2">Subject *</label>
                      <Input id="cin-subject" name="subject" type="text" required value={formData.subject} onChange={handleInputChange} className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary" placeholder="What's this about?" />
                    </div>
                    <div>
                      <label htmlFor="cin-message" className="block text-sm font-medium text-muted-foreground mb-2">Message *</label>
                      <Textarea id="cin-message" name="message" required rows={5} value={formData.message} onChange={handleInputChange} className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary resize-none" placeholder="Tell me about your project or opportunity..." />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground">
                      {isSubmitting ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full mr-2" />
                      ) : (
                        <Send className="w-5 h-5 mr-2" />
                      )}
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info + Social + Personality */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={VIEWPORT_ONCE}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Contact via ${item.label}: ${item.value}`}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-4 bg-card/50 border border-border rounded-lg hover:bg-card/70 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mr-4">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">{item.label}</p>
                      <p className="text-foreground text-xs font-medium group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Follow Me</h3>
              <div className="flex space-x-4">
                {contactSocialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Visit Shantanoo Chandorkar's ${social.label} Profile`}
                    className={`w-12 h-12 bg-card/50 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:bg-card/70 transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Personality Strip */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Beyond the Code</h3>
              <div className="flex flex-wrap gap-3">
                {personalityItems.map((item) => (
                  <div key={item.label}>
                    <button
                      onClick={() => setExpandedPersonality(expandedPersonality === item.label ? null : item.label)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                        expandedPersonality === item.label
                          ? 'bg-primary/10 border-primary/30 text-primary'
                          : 'bg-card/50 border-border text-muted-foreground hover:bg-card/70'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                    <AnimatePresence>
                      {expandedPersonality === item.label && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-sm text-muted-foreground mt-2 px-4 overflow-hidden"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={VIEWPORT_ONCE}
          className="mt-16 pt-8 border-t border-border/50 text-center"
        >
          <p className="text-sm text-muted-foreground">
            {`\u00A9 ${new Date().getFullYear()} Shantanoo Chandorkar. All rights reserved.`}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### Task 12: Create FloatingCVButton

**Files:**
- Create: `components/cinematic/FloatingCVButton.tsx`

- [ ] **Step 1: Create the floating download button**

```tsx
// components/cinematic/FloatingCVButton.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';

export function FloatingCVButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="/Shantanoo_Chandorkar_Resume.pdf"
          download
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Download CV"
        >
          <Download className="w-5 h-5" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
```

---

### Task 13: Final page.tsx integration and verification

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Complete the CinematicView with all sections**

Update `app/page.tsx` — final version of `CinematicView`:

```tsx
// Add remaining imports:
import { CinematicContact } from '@/components/cinematic/CinematicContact';
import { FloatingCVButton } from '@/components/cinematic/FloatingCVButton';

// Final CinematicView:
function CinematicView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CinematicHero />
      <StickyNavbar />
      <CinematicExperience />
      <CinematicProjects />
      <CinematicTechStack />
      <CinematicContact />
      <FloatingCVButton />
    </motion.div>
  );
}
```

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: Compiles successfully with no errors.

- [ ] **Step 3: Full visual verification**

Run: `npm run dev`

Verify in browser:
1. Clear localStorage and reload — **Landing Choice** appears with two cards
2. Click **Classic** — existing portfolio loads identically to before
3. Click design toggle (Leaf icon, top-left) — switches to Cinematic
4. **Cinematic Hero:** Large name, rotating title, orbiting icons, 3 impact stats animate, scroll cue bounces
5. Scroll down — **Sticky Navbar** appears with frosted glass, section links highlight as you scroll
6. **Experience:** Timeline with impact callout badges (+200%, 90%, etc.) above bullet points
7. **Projects:** 2-column grid, hover lifts cards, click opens modal, GitHub/Live buttons on cards
8. **Tech Stack:** Grouped by domain with chips, no giant card grid
9. **Contact:** CV download banner, form, contact info, personality strip with expandable items
10. **Floating CV button:** Appears in bottom-right after scrolling past hero
11. Toggle design — switches back to Classic instantly
12. Reload — remembers last choice
13. Test both light and dark themes in both design modes

- [ ] **Step 4: Commit Chunk 5**

```bash
git add components/cinematic/CinematicContact.tsx components/cinematic/FloatingCVButton.tsx app/page.tsx
git commit -m "feat: add cinematic contact, floating CV button, and complete integration"
```

- [ ] **Step 5: Add .superpowers to .gitignore**

Check if `.superpowers/` is in `.gitignore`. If not, add it:

```bash
echo ".superpowers/" >> .gitignore
git add .gitignore
git commit -m "chore: add .superpowers to gitignore"
```

---

## Summary

| Chunk | Tasks | Files Created | Commits |
|-------|-------|--------------|---------|
| 1: Foundation | 1-4 | DesignContext, LandingChoice, DesignToggle | 2 |
| 2: Hero | 5-6 | ImpactStat, CinematicHero | 1 |
| 3: Navbar | 7 | StickyNavbar | 1 |
| 4: Content | 8-10 | CinematicExperience, CinematicProjects, CinematicTechStack | 1 |
| 5: Contact + Polish | 11-13 | CinematicContact, FloatingCVButton | 2 |

**Total:** 11 new files created, 2 files modified (`page.tsx`, `layout.tsx`), 7 commits.
