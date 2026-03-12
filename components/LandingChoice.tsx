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
