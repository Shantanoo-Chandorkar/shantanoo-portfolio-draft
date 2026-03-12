'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export function DecorativeElements() {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setIsClient(true);
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const leafData = useMemo(
    () => Array.from({ length: 5 }, () => ({
      startX: Math.random() * screenSize.width,
      endX: Math.random() * screenSize.width,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 10,
    })),
    [screenSize.width]
  );

  const flowerData = useMemo(
    () => Array.from({ length: 3 }, () => ({
      startX: Math.random() * screenSize.width,
      endX: Math.random() * screenSize.width,
      duration: 20 + Math.random() * 15,
      delay: Math.random() * 15,
    })),
    [screenSize.width]
  );

  const starData = useMemo(
    () => Array.from({ length: 25 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
    })),
    []
  );

  const shootingStarData = useMemo(
    () => Array.from({ length: 3 }, () => ({
      startX: Math.random() * screenSize.width,
      startY: Math.random() * (screenSize.height / 2),
      endX: Math.min(Math.random() * screenSize.width, screenSize.width - 100),
      endY: Math.min(Math.random() * (screenSize.height / 2), screenSize.height - 100),
      delay: 5 + Math.random() * 10,
    })),
    [screenSize.width, screenSize.height]
  );

  if (!isClient) return null;

  if (theme === 'light') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Floating leaves */}
        {leafData.map((leaf, i) => (
          <motion.div
            key={`leaf-${i}`}
            className="absolute w-4 h-4 opacity-20"
            initial={{ x: leaf.startX, y: -20, rotate: 0 }}
            animate={{ y: screenSize.height + 20, rotate: 360, x: leaf.endX }}
            transition={{ duration: leaf.duration, repeat: Infinity, delay: leaf.delay, ease: "linear" }}
          >
            🍃
          </motion.div>
        ))}

        {/* Floating flowers */}
        {flowerData.map((flower, i) => (
          <motion.div
            key={`flower-${i}`}
            className="absolute w-6 h-6 opacity-30"
            initial={{ x: flower.startX, y: -30, rotate: 0 }}
            animate={{ y: screenSize.height + 30, rotate: 180, x: flower.endX }}
            transition={{ duration: flower.duration, repeat: Infinity, delay: flower.delay, ease: "linear" }}
          >
            🌸
          </motion.div>
        ))}

        {/* Sun rays */}
        <motion.div
          className="absolute top-10 right-20 w-32 h-32 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-gradient-radial from-amber-300/30 to-transparent rounded-full" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Twinkling stars */}
      {starData.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: star.left, top: star.top }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStarData.map((star, i) => (
        <motion.div
          key={`shooting-star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ x: star.startX, y: star.startY, opacity: 0 }}
          animate={{ x: star.endX, y: star.endY, opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: star.delay, ease: "easeOut" }}
        />
      ))}

      {/* Floating planets */}
      {[
        { size: 'w-8 h-8', color: 'bg-purple-400', left: '10%', top: '20%' },
        { size: 'w-6 h-6', color: 'bg-blue-400', left: '40%', top: '40%' },
        { size: 'w-4 h-4', color: 'bg-pink-400', left: '70%', top: '60%' },
      ].map((planet, i) => (
        <motion.div
          key={`planet-${i}`}
          className={`absolute rounded-full opacity-20 ${planet.size} ${planet.color}`}
          animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: 360 }}
          transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: planet.left, top: planet.top }}
        />
      ))}

      {/* Nebula clouds */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 opacity-5"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-gradient-radial from-purple-500/30 via-pink-500/20 to-transparent rounded-full blur-xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-48 h-48 opacity-5"
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-gradient-radial from-blue-500/30 via-cyan-500/20 to-transparent rounded-full blur-xl" />
      </motion.div>
    </div>
  );
}
