'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-6 right-6 z-50"
    >
      <Button
        onClick={toggleTheme}
        size="lg"
        className="relative overflow-hidden bg-primary/10 hover:bg-primary/20 border-2 border-primary/20 backdrop-blur-sm transition-all duration-300"
      >
        <motion.div
          initial={false}
          animate={{
            rotate: theme === 'light' ? 0 : 180,
            scale: theme === 'light' ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-5 h-5 text-amber-500" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            rotate: theme === 'dark' ? 0 : -180,
            scale: theme === 'dark' ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-5 h-5 text-blue-300" />
        </motion.div>
        <span className="opacity-0">Toggle</span>
      </Button>
    </motion.div>
  );
}