'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Code, Mail, MapPin } from 'lucide-react';
import { useState, useEffect, useRef  } from 'react';
import { FaLinkedin, FaGithub, FaHackerrank } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';

export function HeroBanner() {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(200);

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub', color: '#333' },
    { icon: SiLeetcode, href: 'https://leetcode.com', label: 'LeetCode', color: '#FFA116' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: '#0077B5' },
    { icon: FaHackerrank, href: 'https://hackerrank.com', label: 'HackerRank', color: '#00EA64' },
    { icon: SiGeeksforgeeks, href: 'https://geeksforgeeks.com', label: 'GeeksForGeeks', color: '#2C8E46' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % socialLinks.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [socialLinks.length]);

  const getIconPosition = (
    index: number,
    currentIndex: number,
    radius: number
  ) => {
    const totalIcons = socialLinks.length;
    const angleStep = (2 * Math.PI) / totalIcons;
    const baseAngle = index * angleStep;
    const rotationOffset = currentIndex * angleStep;
    const angle = baseAngle - rotationOffset - Math.PI / 2;
  
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
  
    return { x, y };
  };

  useEffect(() => {
    const updateRadius = () => {
      if (imageRef.current) {
        const size = imageRef.current.offsetWidth;
        const iconSize = 48;
        const offset = size * 0.06; // ~6% of the image size, adjust as needed
        const safeRadius = (size - iconSize) / 2 + offset;
        setRadius(safeRadius);
      }
    };
  
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                John Doe
              </span>
            </h1>
            <h2 className="text-2xl lg:text-3xl text-primary font-light mb-2">
              Software Developer
            </h2>
            <div className="flex items-center justify-center lg:justify-start text-muted-foreground mb-6">
              <MapPin className="w-4 h-4 mr-2" />
              <span>San Francisco, CA</span>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Passionate full-stack developer with expertise in modern web technologies. 
              Creating innovative solutions and beautiful user experiences.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div 
            ref={imageRef}
            className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
          >
            {/* Profile Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative z-10 w-full h-full"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-xl opacity-30"
              />
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-border backdrop-blur-sm relative z-10"
              />
            </motion.div>

            {/* Animated Social Icons */}
            <div className="absolute inset-0 flex items-center justify-center">
              {socialLinks.map((link, index) => {
                const position = getIconPosition(index, currentIconIndex, radius);
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute z-20"
                    animate={{
                      x: position.x,
                      y: position.y,
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut"
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div 
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-card/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ 
                        boxShadow: `0 0 20px ${link.color}20`,
                      }}
                    >
                      <link.icon 
                        className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" 
                        style={{ color: link.color }}
                      />
                    </div>
                  </motion.a>
                );
              })}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}