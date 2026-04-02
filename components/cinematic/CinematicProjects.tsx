'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '@/hooks/useModal';
import { ExternalLink, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { SectionHeader } from '@/components/SectionHeader';
import { TechBadge } from '@/components/TechBadge';
import { ProjectModal } from '@/components/ProjectModal';
import { VIEWPORT_ONCE } from '@/lib/animation';
import type { Project } from '@/lib/types';
import { projects } from '@/lib/data/projects';

function ProjectCard({ project, index }: { project: Project; index: number }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			viewport={VIEWPORT_ONCE}
			whileHover={{ y: -4 }}
			className="group cursor-pointer"
		>
			<div className="bg-card/50 border border-border backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300">
				<div className="relative h-48 overflow-hidden">
					<Image
						src={project.image}
						alt={project.title}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						width={600}
						height={400}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
						<span className="text-sm font-medium text-foreground">View Details</span>
					</div>
				</div>

				<div className="p-5">
					<h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>
					<p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

					<div className="flex flex-wrap gap-1.5 mb-4">
						{project.technologies.slice(0, 4).map((tech) => (
							<TechBadge key={tech} tech={tech} size="sm" />
						))}
						{project.technologies.length > 4 && (
							<TechBadge tech={`+${project.technologies.length - 4}`} size="sm" />
						)}
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
			</div>
		</motion.div>
	);
}

export function CinematicProjects() {
	const { selected: selectedProject, open: openProject, close: closeProject } = useModal<Project>();

	return (
		<section id="projects" className="py-16 px-4">
			<div className="max-w-6xl mx-auto">
				<SectionHeader
					heading="Projects"
					subtitle="Things I've built to solve problems and learn new things."
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{projects.map((project, index) => (
						<div key={project.id} onClick={() => openProject(project)}>
							<ProjectCard project={project} index={index} />
						</div>
					))}
				</div>

				<ProjectModal project={selectedProject} onClose={closeProject} />
			</div>
		</section>
	);
}
