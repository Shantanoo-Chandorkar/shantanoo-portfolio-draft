'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Code, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroBanner() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Code, href: 'https://leetcode.com', label: 'LeetCode' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
  ];

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-card/50 border-border text-foreground hover:bg-accent/20 backdrop-blur-sm transition-all duration-300"
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <link.icon className="w-5 h-5 mr-2" />
                    {link.label}
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-xl opacity-30"
            />
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=500"
              alt="Profile"
              className="w-80 h-80 rounded-full object-cover border-4 border-border backdrop-blur-sm relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}