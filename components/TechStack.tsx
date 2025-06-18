'use client';

import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Globe, 
  Smartphone, 
  Cloud, 
  Cpu, 
  Layers, 
  Terminal,
  FileCode,
  Server,
  Palette,
  Zap
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TechItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}

function TechItem({ icon: Icon, title, description, delay = 0 }: TechItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ amount: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <Card className="bg-card/50 border-border backdrop-blur-sm hover:bg-card/70 transition-all duration-300 h-full">
        <CardContent className="p-6 text-center">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
              <Icon className="w-8 h-8 text-primary-foreground" />
            </div>
          </motion.div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function TechStack() {
  const technologies = [
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'React, Next.js, TypeScript, Tailwind CSS'
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Node.js, Express, Python, FastAPI'
    },
    {
      icon: Database,
      title: 'Database Management',
      description: 'PostgreSQL, MongoDB, Redis, Supabase'
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'AWS, Docker, Kubernetes, CI/CD'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'React Native, Flutter, Progressive Web Apps'
    },
    {
      icon: Layers,
      title: 'Architecture',
      description: 'Microservices, System Design, API Design'
    },
    {
      icon: Terminal,
      title: 'Development Tools',
      description: 'Git, VS Code, Linux, Terminal'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimization, Caching, Load Testing'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Figma, Design Systems, User Experience'
    },
    {
      icon: Globe,
      title: 'Web Technologies',
      description: 'WebSockets, GraphQL, REST APIs'
    },
    {
      icon: FileCode,
      title: 'Version Control',
      description: 'Git, GitHub, GitLab, Collaborative Development'
    },
    {
      icon: Cpu,
      title: 'Machine Learning',
      description: 'TensorFlow, PyTorch, Data Analysis'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Tech Stack</h2>
          <p className="text-muted-foreground text-lg">Technologies and tools I work with</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <TechItem
              key={index}
              icon={tech.icon}
              title={tech.title}
              description={tech.description}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}