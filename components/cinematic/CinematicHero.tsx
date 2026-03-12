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

            {/* Bio */}
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
