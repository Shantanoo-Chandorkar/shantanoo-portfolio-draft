'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/SectionHeader';
import { TechBadge } from '@/components/TechBadge';
import { VIEWPORT_ONCE } from '@/lib/animation';
import type { ExperienceEntry, Highlight } from '@/lib/types';
import { experiences } from '@/lib/data/experience';

function HighlightBadges({ highlights }: { highlights: Highlight[] }) {
	return (
		<div className="flex flex-wrap gap-3 mb-4">
			{highlights.map((h) => (
				<div
					key={h.label}
					className="flex items-baseline gap-1.5 bg-primary/10 border border-primary/20 rounded-lg px-3 py-1.5"
				>
					<span className="text-lg font-bold text-primary">{h.metric}</span>
					<span className="text-xs text-muted-foreground">{h.label}</span>
				</div>
			))}
		</div>
	);
}

function CinematicExpCard({ exp, className = '' }: { exp: ExperienceEntry; className?: string }) {
	return (
		<Card
			className={`bg-card/50 border-border backdrop-blur-sm hover:bg-card/70 transition-all duration-300 ${className}`}
		>
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

				<HighlightBadges highlights={exp.highlights} />

				<ul className="text-muted-foreground mb-6 space-y-2 text-left">
					{exp.description.map((item) => (
						<li key={item} className="flex items-start">
							<span className="text-primary mr-3 mt-1" aria-hidden="true">
								•
							</span>
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

export function CinematicExperience() {
	return (
		<section id="experience" className="py-16 px-4">
			<div className="max-w-6xl mx-auto">
				<SectionHeader
					heading="Experience"
					subtitle="My professional journey in software development."
				/>

				{/* Desktop Timeline */}
				<div className="hidden md:block relative">
					<div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-primary" />

					{experiences.map((exp, index) => {
						const isLeft = index % 2 === 0;
						return (
							<motion.div
								key={exp.id}
								initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={VIEWPORT_ONCE}
								className={`relative mb-16 ${
									isLeft ? 'md:pr-1/2 md:text-left' : 'md:pl-1/2 md:ml-auto md:text-left'
								}`}
								style={{ width: '50%' }}
							>
								<div
									className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg z-10 -top-3"
									style={{ left: isLeft ? 'calc(100% + 0px)' : '0px' }}
								/>
								<div className={isLeft ? 'md:pr-8' : 'md:pl-8'}>
									<CinematicExpCard exp={exp} />
								</div>
							</motion.div>
						);
					})}
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
							viewport={VIEWPORT_ONCE}
							className="relative mb-12"
						>
							<div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background" />
							<CinematicExpCard exp={exp} className="ml-12" />
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
