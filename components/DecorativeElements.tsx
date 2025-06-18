'use client';

import { useState, useEffect } from 'react';
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

  if (!isClient) return null; // Prevent rendering on server

  if (theme === 'light') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating leaves */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`leaf-${i}`}
            className="absolute w-4 h-4 opacity-20"
            initial={{
              x: Math.random() * screenSize.width,
              y: -20,
              rotate: 0
            }}
            animate={{
              y: screenSize.height + 20,
              rotate: 360,
              x: Math.random() * screenSize.width
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          >
            🍃
          </motion.div>
        ))}
        
        {/* Floating flowers */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`flower-${i}`}
            className="absolute w-6 h-6 opacity-30"
            initial={{
              x: Math.random() * screenSize.width,
              y: -30,
              rotate: 0
            }}
            animate={{
              y: screenSize.height + 30,
              rotate: 180,
              x: Math.random() * screenSize.width
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear"
            }}
          >
            🌸
          </motion.div>
        ))}

        {/* Butterflies */}
        {/* {[...Array(4)].map((_, i) => (
          <motion.div
            key={`butterfly-${i}`}
            className="absolute w-8 h-8 opacity-40"
            animate={{
              x: [0, 100, 200, 100, 0],
              y: [0, -50, 0, 50, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`
            }}
          >
            🦋
          </motion.div>
        ))} */}

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
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            x: Math.random() * screenSize.width,
            y: Math.random() * (screenSize.height / 2),
            opacity: 0
          }}
          animate={{
            x: Math.random() * screenSize.width + 200,
            y: Math.random() * (screenSize.height / 2) + 200,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 5 + Math.random() * 10,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Floating planets */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`planet-${i}`}
          className={`absolute rounded-full opacity-20 ${
            i === 0 ? 'w-8 h-8 bg-purple-400' :
            i === 1 ? 'w-6 h-6 bg-blue-400' :
            'w-4 h-4 bg-pink-400'
          }`}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: 360
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: `${10 + i * 30}%`,
            top: `${20 + i * 20}%`
          }}
        />
      ))}

      {/* Nebula clouds */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 opacity-5"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full bg-gradient-radial from-purple-500/30 via-pink-500/20 to-transparent rounded-full blur-xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-48 h-48 opacity-5"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full bg-gradient-radial from-blue-500/30 via-cyan-500/20 to-transparent rounded-full blur-xl" />
      </motion.div>
    </div>
  );
}