'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const experiences = [
  {
    id: 1,
    company: 'Hummingbird Web Solutions Pvt Ltd.',
    position: 'Software Developer',
    period: 'Oct 2024 - Present',
    location: 'Pune, India',
    description: [
      'Took ownership of revamping 50+ React based Gutenberg components, enhancing accessibility and UX for 4,000+ users',
      'Contributed to the optimization of Responsive Plus, reducing template import time by 50%.',
      'Enhanced the SaaS e-commerce platform powered by WooCommerce by integrating a Support feature for over 10,000 active users, including 200+ premium subscriber.',
      'Patched and resolved over 20+ vulnerabilities across 3 products and SaaS platform, improving overall security and performance.',
      'Implemented features leveraging popular WordPress plugins like Elementor, WooCommerce, WPForms, and Yoast SEO, ensuring seamless integration and functionality.',
      'Participated in Code Reviews, Peer Testing and Agile Development processes to ensure high code quality and team collaboration.',
      'Mentored 3 junior developers on best practices in WordPress development, Javascript, and Version Control.'
    ],
    technologies: ['React', 'WordPress', 'REST API', 'Javascript', 'PHP', 'MySQL', 'Tailwind', 'GitHub', 'Postman', 'SVN', 'WooCommerce', 'Elementor', 'WPForms', 'Yoast SEO'],
    side: 'left'
  },
  {
    id: 2,
    company: 'Hummingbird Web Solutions Pvt Ltd.',
    position: 'Software Developer',
    period: 'April 2024 - Oct 2024',
    location: 'Pune, India',
    description: [
      'Learned Magento 2.0 to facilitate the e-commerce projects and contributed to the development of a custom Magento module for a client, improving their online store functionality.',
      'Developed and delivered a pixel-perfect responsive Landing page for a client using MagePlaza Page Builder, enhancing their online presence and user engagement.',
      'Resolved bugs and implemented improvements in existing Magento modules, ensuring optimal performance and user experience.',
      'Consistent client and cross-team communication over JIRA, Asana and Basecamp to gather requirements, provide updates, and ensure project alignment with client expectations.',
    ],
    technologies: ['Magento', 'PHP', 'Javascript', 'GitHub', 'MySQL', 'NGINX', 'Hyva Theme'],
    side: 'right'
  },
  {
    id: 3,
    company: 'Hummingbird Web Solutions Pvt Ltd.',
    position: 'Software Developer Trainee',
    period: 'Dec 2023 - March 2024',
    location: 'Pune, India',
    description: [
      'Built a high-performance Windows application to automate JSON-to-PDF conversion using C# and .NET with efficient SQL queries, enabling 20% faster internal workflows.',
      'Implemented features like file handling, data processing, and user interface design.',
      'Active client communication on daily and weekly basis on JIRA and Google Meet to gather requirements, provide updates, and ensure project alignment with client expectations.',
      'Learned C# and .NET framework fundamentals, including object-oriented programming, data structures, and algorithms.',
    ],
    technologies: ['.NET', 'C#', 'Windows Application', 'Microsoft SQL Server', 'GitHub', 'DevExpress'],
    side: 'left'
  },
];

export function Experience() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Experience</h2>
          <p className="text-muted-foreground text-lg">My professional journey at Hummingbird Web Solutions Pvt Ltd.</p>
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
                  ? 'md:pr-1/2 md:text-left' 
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
                          <span className="text-primary mr-3">•</span>
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
              viewport={{ amount: 0.1 }}
              className="relative mb-12"
            >
              <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background" />
              
              <Card className="ml-12 bg-card/50 border-border backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
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