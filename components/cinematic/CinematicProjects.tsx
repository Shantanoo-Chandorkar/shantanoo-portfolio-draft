'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import ReactLenis from 'lenis/react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useModal } from '@/hooks/useModal';
import { SectionHeader } from '@/components/SectionHeader';
import { TechBadge } from '@/components/TechBadge';
import { ProjectModal } from '@/components/ProjectModal';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/types';
import { projects } from '@/lib/data/projects';

interface StickyCardProps {
	project: Project;
	i: number;
	progress: MotionValue<number>;
	range: [number, number];
	targetScale: number;
	onClick: (project: Project) => void;
}

/**
 * A single project card that sticks to the top of the viewport while the scroll
 * container passes, then scales down as subsequent cards stack on top of it.
 *
 * @param project - The project data to display
 * @param i - Zero-based index in the stack (0 is the first/bottom card)
 * @param progress - Scroll progress value (0→1) from the outer container
 * @param range - The [start, end] scroll-progress range over which this card scales down
 * @param targetScale - The minimum scale this card shrinks to when fully covered
 * @param onClick - Handler called when the card is clicked, receives the project
 */
function StickyCard({ project, i, progress, range, targetScale, onClick }: StickyCardProps) {
	const scale = useTransform(progress, range, [1, targetScale]);

	return (
		<div className="sticky top-0 flex items-start justify-center sm:h-screen pt-20">
			<motion.div
				style={{
					scale,
					// Stagger each card 20px lower than the previous to create a visible fan/depth effect
					// while keeping all cards near the viewport center.
					top: `${i * 20}px`,
				}}
				className="relative origin-top w-[85%] h-full rounded-2xl overflow-hidden bg-card border border-border shadow-2xl cursor-pointer flex flex-col"
				onClick={() => onClick(project)}
			>
				<div className="relative h-[50%] shrink-0">
					<Image
						src={project.image}
						alt={project.title}
						className="w-full h-full object-cover"
						width={680}
						height={300}
					/>
				</div>

				<div className="flex-1 p-5 flex flex-col gap-3 sm:gap-4 overflow-hidden">
					<h3 className="text-xl font-bold text-foreground">{project.title}</h3>
					<p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>

					<div className="flex-1 flex flex-col gap-3 min-h-0">
						<p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
							Technologies:
						</p>
						<div className="flex flex-wrap gap-3 content-start overflow-hidden">
							{project.technologies.map((tech) => (
								<TechBadge key={tech} tech={tech} />
							))}
						</div>
					</div>

					<div className="flex gap-2">
						<Button asChild size="sm" variant="outline" className="text-xs">
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								onClick={(e) => e.stopPropagation()}
							>
								<FaGithub className="w-3.5 h-3.5 mr-1" />
								Code
							</a>
						</Button>
						{project.liveUrl && (
							<Button asChild size="sm" variant="outline" className="text-xs">
								<a
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									onClick={(e) => e.stopPropagation()}
								>
									<ExternalLink className="w-3.5 h-3.5 mr-1" />
									Live
								</a>
							</Button>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	);
}

/**
 * The Projects section for Cinematic design mode.
 *
 * Uses the Skiper16 sticky-stack pattern: each card is `sticky top-0` so it pins
 * to the viewport while the outer container scrolls past. Framer Motion's
 * `useTransform` scales down cards already in the stack as new ones arrive on top.
 * Lenis provides smooth inertia scrolling for the entire cinematic page.
 *
 * Classic mode's Projects.tsx drag/swipe interaction is not affected.
 */
export function CinematicProjects() {
	const container = useRef<HTMLDivElement>(null);
	const { selected: selectedProject, open: openProject, close: closeProject } = useModal<Project>();
	const total = projects.length;

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	return (
		<ReactLenis root>
			<section id="projects">
				<div className="pt-16 pb-8 text-center px-8">
					<SectionHeader
						heading="Projects"
						subtitle="Things I've built to solve problems and learn new things."
					/>
				</div>

				{/* Outer container: pt-[50vh] so the first card enters from the middle of the screen;
				    pb-[100vh] keeps the last card visible before the section ends */}
				<div ref={container} className="relative pt-0 pb-[20vh]">
					{projects.map((project, i) => {
						// Cards deeper in the stack (lower i) shrink more to simulate depth.
						const targetScale = Math.max(0.5, 1 - (total - i - 1) * 0.1);
						// Each card starts scaling down at a different point in the scroll range.
						const rangeStart = i / Math.max(total - 1, 1);
						return (
							<StickyCard
								key={project.id}
								project={project}
								i={i}
								progress={scrollYProgress}
								range={[rangeStart, 1]}
								targetScale={targetScale}
								onClick={openProject}
							/>
						);
					})}
				</div>
			</section>

			<ProjectModal project={selectedProject} onClose={closeProject} />
		</ReactLenis>
	);
}
