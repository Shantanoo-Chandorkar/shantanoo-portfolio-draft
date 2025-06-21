'use client';

import { motion, useInView, AnimatePresence  } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useState, useEffect, useRef  } from 'react';
import { FaLinkedin, FaGithub, FaHackerrank } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';

const name = "Shantanoo Chandorkar";
const nameWords = name.split(" ");  // ["Shantanoo", "Chandorkar"]
const title = "Software";
const words = ["Developer", "Engineer", "Designer", "Creator"];

export function HeroBanner() {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(200);

  // Hooks for the animated name
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // State for the animated title
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 5000)
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [])

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Shantanoo-Chandorkar', label: 'GitHub', color: '#AAA' },
    { icon: SiLeetcode, href: 'https://leetcode.com/u/Shantanoo-Chandorkar', label: 'LeetCode', color: '#FFA116' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/shantanoo-chandorkar', label: 'LinkedIn', color: '#0077B5' },
    { icon: FaHackerrank, href: 'https://hackerrank.com/profile/cshantanoo123', label: 'HackerRank', color: '#00EA64' },
    { icon: SiGeeksforgeeks, href: 'https://geeksforgeeks.org/user/cshantanoo123', label: 'GeeksForGeeks', color: '#2C8E46' },
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
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              className="mb-6"
            >
              {/* Animated Name */}
              <h1
                ref={ref}
                // className="text-4xl lg:text-5xl font-bold text-foreground mb-4 flex justify-center items-center"
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 flex flex-wrap lg:flex-nowrap justify-center lg:justify-start items-center text-balance"
              >
                {nameWords.map((word, wIndex) => (
                  <span
                    key={wIndex}
                    // className="inline-block whitespace-nowrap"
                    className="inline-block whitespace-nowrap break-keep mr-2"
                  >
                    {word.split("").map((letter, lIndex) => (
                      <motion.span
                        key={lIndex}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: (wIndex * word.length + lIndex) * 0.03 }}
                        className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                      >
                        {letter}
                      </motion.span>
                    ))}
                    {/* add natural space after each word */}
                    {wIndex < words.length - 1 && "\u00A0"}
                  </span>
                ))}
              </h1>
              
              {/* Animated Title */}
              {/* <div className="text-[2rem] text-center xs:text-center sm:text-center md:text-left lg:text-left xl:text-left sm:text-4xl font-bold md:text-[3rem] md:leading-[4rem] w-full gap-1.5 mb-4"> */}
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-center md:text-center lg:text-left mb-4 whitespace-nowrap break-keep">
                {title}{' '}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={words[index]}
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block break-keep"
                  >
                    {words[index]}
                  </motion.p>
                </AnimatePresence>
              </div>
              
              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex items-center justify-center lg:justify-start text-muted-foreground mb-6"
              >
                <MapPin className="w-4 h-4 mr-2" />
                <span>Mumbai, India</span>
              </motion.div>
            </motion.div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg font-bold">
              {"Passionate full-stack developer with expertise in modern web technologies. Creating innovative solutions and beautiful user experiences."}
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
                src={"/banner-image.jpg"}
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