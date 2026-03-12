'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { ExperienceCard } from './ExperienceCard';
import { VIEWPORT_ONCE } from '@/lib/animation';

const experiences = [
  {
    id: 1,
    company: 'Brainstorm Force (CartFlows)',
    position: 'Software Developer',
    period: 'August 2025 - Present',
    location: 'Remote',
    description: [
      'Overhauled CartFlows Flow Analytics, expanding tracked KPIs from 8 to 24 (+200%) with new tabular data views, achieving zero regression and no performance degradation on a database-heavy implementation.',
      'Engineered a full-featured interactive Canvas Builder from scratch using React and ReactFlow, dynamically visualizing complete funnel flows and all nested steps in a node-based UI.',
      'Resolved 3+ critical payment failures — Stripe Express Checkout blocking transactions, PayPal infinite loading on upsell, and Google Pay misrouting to WooCommerce — cutting payment-related support tickets by 90%.',
      'Conducted a comprehensive security audit of the CartFlows plugin and independently remediated all identified vulnerabilities spanning all CVSS severity tiers, from input sanitization and capability checks to privilege escalation and data exposure vectors.',
      'Pioneered WordPress Abilities API integration for CartFlows, mapping plugin capabilities as MCP-compatible tools and resources within the WordPress MCP server architecture.',
    ],
    technologies: ['PHP', 'React.js', 'ReactFlow', 'JavaScript', 'MySQL', 'WordPress', 'WooCommerce', 'REST APIs', 'Git'],
    side: 'left' as const,
  },
  {
    id: 2,
    company: 'Hummingbird Web Solutions Pvt Ltd.',
    position: 'Software Engineer',
    period: 'December 2023 - July 2025',
    location: 'Pune, India',
    description: [
      'Built a high-performance Windows application automating JSON-to-PDF conversion using C# and .NET, delivering 20% faster internal workflows with full CRUD persistence for 10+ designers.',
      'Revamped 50+ React-based Gutenberg block components, improving accessibility and UX for 4,000+ active users across the Responsive Blocks plugin.',
      'Resolved critical security vulnerabilities in a SaaS platform, hardening reliability for 10,000+ active users including 200+ premium subscribers.',
      'Boosted Core Web Vitals score from 71 to 89 (+18 points) by targeting LCP and CLS via lazy loading, DOM optimizations, and layout fixes.',
    ],
    technologies: ['React.js', 'WordPress', 'PHP', 'JavaScript', 'C#', '.NET', 'MySQL', 'GitHub', 'REST APIs'],
    side: 'right' as const,
  },
];

export function Experience() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader heading="Experience" subtitle="My professional journey in software development." />

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-primary" />

          {experiences.map((exp, index) => (
            <div
              key={`dot-${exp.id}`}
              className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg z-10"
              style={{ top: `${Math.round((index + 1) * 100 / (experiences.length + 1))}%` }}
            />
          ))}

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: exp.side === 'left' ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={VIEWPORT_ONCE}
              className={`relative mb-16 ${
                exp.side === 'left'
                  ? 'md:pr-1/2 md:text-left'
                  : 'md:pl-1/2 md:ml-auto md:text-left'
              }`}
              style={{ width: '50%' }}
            >
              <div className={exp.side === 'left' ? 'md:pr-8' : 'md:pl-8'}>
                <ExperienceCard exp={exp} />
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
              <ExperienceCard exp={exp} className="ml-12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
