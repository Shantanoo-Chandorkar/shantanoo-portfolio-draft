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
  // Placeholder — will be filled in later chunks
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
