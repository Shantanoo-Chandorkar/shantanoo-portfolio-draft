'use client';

import { motion } from 'framer-motion';
import { Download, FileText, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function DownloadCV() {
  const highlights = [
    { icon: Star, text: '5+ Years Experience' },
    { icon: Award, text: 'Full Stack Developer' },
    { icon: FileText, text: 'Multiple Projects' },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Download My CV</h2>
          <p className="text-muted-foreground text-lg">Get a detailed overview of my experience and skills</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mb-6"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                      <FileText className="w-10 h-10 text-primary-foreground" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4 text-center lg:text-left">
                    Comprehensive Resume
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 text-center lg:text-left">
                    Download my complete CV to get detailed information about my professional experience, 
                    technical skills, education, and achievements. Perfect for recruiters and hiring managers.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center lg:justify-start"
                      >
                        <highlight.icon className="w-5 h-5 text-primary mr-2" />
                        <span className="text-muted-foreground text-sm">{highlight.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-center lg:text-left"
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-3"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download CV (PDF)
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="hidden lg:block"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="bg-card rounded-lg shadow-2xl p-6 max-w-sm mx-auto border border-border"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary rounded-full"></div>
                          <div>
                            <div className="h-3 bg-muted rounded w-24 mb-1"></div>
                            <div className="h-2 bg-muted/60 rounded w-20"></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="h-2 bg-muted/60 rounded w-full"></div>
                          <div className="h-2 bg-muted/60 rounded w-4/5"></div>
                          <div className="h-2 bg-muted/60 rounded w-3/4"></div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="h-2 bg-primary/30 rounded w-full"></div>
                          <div className="h-2 bg-primary/30 rounded w-5/6"></div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-8 bg-muted/30 rounded"></div>
                          <div className="h-8 bg-muted/30 rounded"></div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <FileText className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Last updated: December 2024 • Available in PDF format • 2 pages
          </p>
        </motion.div>
      </div>
    </section>
  );
}