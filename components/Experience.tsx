'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function Experience() {
  const experiences = [
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      position: 'Junior Full Stack Developer',
      period: 'Jan 2022 - Dec 2022',
      location: 'San Francisco, CA',
      description: [
        'Started as a junior developer working on frontend applications',
        'Learned React, TypeScript, and modern web development practices',
        'Collaborated with senior developers on various client projects',
        'Participated in code reviews and agile development processes'
      ],
      technologies: ['React', 'JavaScript', 'HTML/CSS', 'Git', 'REST APIs'],
      side: 'left'
    },
    {
      id: 2,
      company: 'Tech Solutions Inc.',
      position: 'Full Stack Developer',
      period: 'Jan 2023 - Dec 2023',
      location: 'San Francisco, CA',
      description: [
        'Promoted to full stack developer role with increased responsibilities',
        'Built complete web applications using React and Node.js',
        'Implemented database designs and API integrations',
        'Mentored new junior developers joining the team'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Express', 'AWS'],
      side: 'right'
    },
    {
      id: 3,
      company: 'Tech Solutions Inc.',
      position: 'Senior Full Stack Developer',
      period: 'Jan 2024 - Present',
      location: 'San Francisco, CA',
      description: [
        'Led development of microservices architecture serving 1M+ users',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Mentored 5+ junior developers and conducted code reviews',
        'Built responsive web applications using React, Next.js, and TypeScript'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL'],
      side: 'left'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Experience</h2>
          <p className="text-muted-foreground text-lg">My professional journey at Tech Solutions Inc.</p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-primary" />
          
          {/* Timeline Dots */}
          {experiences.map((exp, index) => (
            <div
              key={`dot-${exp.id}`}
              className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg z-10"
              style={{ top: `${20 + index * 33.33}%` }}
            />
          ))}

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: exp.side === 'left' ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ amount: 0.3 }}
              className={`relative mb-16 ${
                exp.side === 'left' 
                  ? 'md:pr-1/2 md:text-right' 
                  : 'md:pl-1/2 md:ml-auto md:text-left'
              }`}
              style={{ width: '50%' }}
            >
              <div className={`${exp.side === 'left' ? 'md:pr-8' : 'md:pl-8'}`}>
                <Card className="bg-card/50 border-border backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground mb-1">{exp.position}</h3>
                      <div className="flex items-center text-primary mb-2 justify-start">
                        <Building className="w-4 h-4 mr-2" />
                        <span className="font-semibold">{exp.company}</span>
                      </div>
                      <div className="flex flex-col text-muted-foreground text-sm">
                        <div className="flex items-center mb-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <ul className="text-muted-foreground mb-6 space-y-2 text-left">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary mr-3 mt-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2 justify-start">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden relative">
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-primary to-accent" />
          
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ amount: 0.3 }}
              className="relative mb-12"
            >
              <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background" />
              
              <Card className="ml-16 bg-card/50 border-border backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-1">{exp.position}</h3>
                    <div className="flex items-center text-primary mb-2">
                      <Building className="w-4 h-4 mr-2" />
                      <span className="font-semibold">{exp.company}</span>
                    </div>
                    <div className="flex flex-col text-muted-foreground text-sm">
                      <div className="flex items-center mb-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="text-muted-foreground mb-6 space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-3 mt-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}