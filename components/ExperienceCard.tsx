import { Calendar, MapPin, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { TechBadge } from './TechBadge';

interface Experience {
  position: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

export function ExperienceCard({ exp, className = '' }: { exp: Experience; className?: string }) {
  return (
    <Card className={`bg-card/50 border-border backdrop-blur-sm hover:bg-card/70 transition-all duration-300 ${className}`}>
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

        <ul className="text-muted-foreground mb-6 space-y-2 text-left">
          {exp.description.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="text-primary mr-3 mt-1" aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
