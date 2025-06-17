'use client';

import { motion } from 'framer-motion';
import { HeroBanner } from '@/components/HeroBanner';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { TechStack } from '@/components/TechStack';
import { About } from '@/components/About';
import { DownloadCV } from '@/components/DownloadCV';
import { Contact } from '@/components/Contact';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DecorativeElements } from '@/components/DecorativeElements';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <DecorativeElements />
      <ThemeToggle />
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
    </main>
  );
}