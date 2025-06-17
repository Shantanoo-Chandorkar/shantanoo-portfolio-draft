// src/components/Projects.tsx
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { MascotWithText } from './MascotCanvas';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  features: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, project: Project) => void;
}

function ProjectCard({ project, index, totalCards, onDragEnd }: ProjectCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  return (
    <motion.div
      key={project.id}
      className="absolute inset-0 sm:w-[18rem] md:w-72 lg:w-80 xl:w-80 w-[18rem] h-auto mx-auto"
      style={{
        x,
        rotate,
        opacity,
        zIndex: totalCards - index
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(event, info) => onDragEnd(event, info, project)}
      whileHover={{ scale: 1.02 }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full h-full bg-card/50 border-border backdrop-blur-sm cursor-grab active:cursor-grabbing">
        <CardContent className="p-0 h-full">
          <div className="h-48 overflow-hidden rounded-t-lg">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-primary/20 text-primary rounded text-xs border border-primary/30"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs border border-primary/30">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SwipeIndicators({ theme }: { theme: 'light' | 'dark' }) {
  const getIndicatorElements = () => {
    if (theme === 'light') {
      return {
        leftColor: '#f87171',
        rightColor: '#4ade80'
      };
    } else {
      return {
        leftColor: '#ef4444',
        rightColor: '#a855f7'
      };
    }
  };

  const indicators = getIndicatorElements();

  return (
    <div className="flex justify-evenly items-center w-full max-w-md mx-auto">
      <motion.div
        animate={{ x: [-10, 0, -10] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2"
      >
        <ArrowLeft 
          className="w-5 h-5" 
          style={{ color: indicators.leftColor }}
        />
        <span 
          className="text-sm font-medium"
          style={{ color: indicators.leftColor }}
        >
          Dismiss
        </span>
      </motion.div>

      <motion.div
        animate={{ x: [10, 0, 10] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2"
      >
        <span 
          className="text-sm font-medium"
          style={{ color: indicators.rightColor }}
        >
          View Details
        </span>
        <ArrowRight 
          className="w-5 h-5" 
          style={{ color: indicators.rightColor }}
        />
      </motion.div>
    </div>
  );
}

export function Projects() {
  const { theme } = useTheme();
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with modern UI/UX',
      longDescription: 'A comprehensive e-commerce platform built with Next.js and Stripe integration. Features include user authentication, shopping cart, payment processing, order management, and admin dashboard.',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL'],
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      features: ['User Authentication', 'Payment Processing', 'Order Management', 'Admin Dashboard', 'Inventory Management']
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates',
      longDescription: 'A real-time collaborative task management application with drag-and-drop functionality, team collaboration features, and progress tracking.',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      features: ['Real-time Updates', 'Drag & Drop', 'Team Collaboration', 'Progress Tracking', 'File Sharing']
    },
    {
      id: 3,
      title: 'Weather Analytics Dashboard',
      description: 'Interactive weather data visualization with forecasting',
      longDescription: 'An advanced weather analytics dashboard featuring interactive charts, weather forecasting, historical data analysis, and location-based weather tracking.',
      technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'Redis'],
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      features: ['Interactive Charts', 'Weather Forecasting', 'Historical Analysis', 'Location Tracking', 'API Integration']
    },
    {
      id: 4,
      title: 'AI Content Generator',
      description: 'AI-powered content creation tool with multiple formats',
      longDescription: 'An AI-powered content generation platform that creates blog posts, social media content, and marketing copy using advanced language models.',
      technologies: ['Next.js', 'OpenAI API', 'Supabase', 'Tailwind CSS'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      features: ['AI Content Generation', 'Multiple Formats', 'Content Templates', 'Export Options', 'Usage Analytics']
    }
  ];

  const [cards, setCards] = useState(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mascotEmotion, setMascotEmotion] = useState<'happy' | 'sad' | 'neutral'>('neutral');

  const removeCard = (id: number) => {
    setCards(prev => {
      const filtered = prev.filter(card => card.id !== id);
      // If no cards left, reset to full list
      if (filtered.length === 0) {
        return projects;
      }
      return filtered;
    });
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    project: Project
  ) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      // Right swipe - open modal and show happy mascot
      setSelectedProject(project);
      setMascotEmotion('happy');
    } else if (info.offset.x < -threshold) {
      // Left swipe - remove card and show sad mascot
      removeCard(project.id);
      setMascotEmotion('sad');
    }
  };

  const resetCards = () => {
    setCards(projects);
    setMascotEmotion('neutral');
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Projects</h2>
          <p className="text-muted-foreground text-lg mb-8">Explore my work through interactive cards</p>
        </motion.div>

        <div className="flex flex-col items-center">
          {/* 3D Mascot */}
          <div className="mb-8">
            <MascotWithText emotion={mascotEmotion} theme={theme} />
          </div>

          {/* Project Cards */}
          <div className="relative w-80 h-96 mb-8">
            {cards.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">No more projects to show</p>
                  <Button onClick={resetCards} className="bg-primary hover:bg-primary/90">
                    Reset Cards
                  </Button>
                </div>
              </div>
            ) : (
              cards.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  totalCards={cards.length}
                  onDragEnd={handleDragEnd}
                />
              ))
            )}
          </div>

          {/* Animated Swipe Indicators */}
          <SwipeIndicators theme={theme} />
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 bg-background/50 text-foreground hover:bg-background/70"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">{selectedProject.title}</h3>
                <p className="text-muted-foreground mb-6">{selectedProject.longDescription}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-foreground mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-muted-foreground">
                        <span className="text-primary mr-3 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}