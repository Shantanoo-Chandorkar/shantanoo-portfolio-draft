'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '@/hooks/useModal';
import { ExternalLink, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { SectionHeader } from '@/components/SectionHeader';
import { TechBadge } from '@/components/TechBadge';
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

				<AnimatePresence>
					{selectedProject && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
							onClick={closeProject}
						>
							<motion.div
								role="dialog"
								aria-modal="true"
								aria-labelledby="modal-title"
								initial={{ scale: 0.9, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.9, opacity: 0 }}
								className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border relative"
								onClick={(e) => e.stopPropagation()}
							>
								<div className="relative">
									<Image
										src={selectedProject.image}
										alt={selectedProject.title}
										className="w-full h-64 object-cover rounded-t-lg"
										width={600}
										height={500}
									/>
									<Button
										variant="ghost"
										size="sm"
										aria-label="Close modal"
										className="absolute top-4 right-4 bg-background/50 text-foreground hover:bg-background/70"
										onClick={closeProject}
									>
										<X className="w-4 h-4" />
									</Button>
								</div>
								<div className="p-6">
									<h3 id="modal-title" className="text-2xl font-bold text-foreground mb-4">
										{selectedProject.title}
									</h3>
									<p className="text-muted-foreground mb-6">{selectedProject.longDescription}</p>
									<div className="mb-6">
										<h4 className="text-lg font-semibold text-foreground mb-3">Key Features</h4>
										<ul className="space-y-2">
											{selectedProject.features.map((feature, i) => (
												<li key={i} className="flex items-start text-muted-foreground">
													<span className="text-primary mr-3 mt-1" aria-hidden="true">
														•
													</span>
													<span>{feature}</span>
												</li>
											))}
										</ul>
									</div>
									<div className="mb-6">
										<h4 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h4>
										<div className="flex flex-wrap gap-2">
											{selectedProject.technologies.map((tech) => (
												<TechBadge key={tech} tech={tech} />
											))}
										</div>
									</div>
									<div className="flex flex-row max-sm:flex-col gap-4">
										<Button asChild className="bg-primary hover:bg-primary/90">
											<a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
												<FaGithub className="w-4 h-4 mr-2" />
												<span className="text-xs">View Code</span>
											</a>
										</Button>
										{selectedProject.liveUrl && (
											<Button
												variant="outline"
												asChild
												className="border-primary text-primary hover:bg-primary/10"
											>
												<a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
													<ExternalLink className="w-4 h-4 mr-2" />
													<span className="text-xs">Live Demo</span>
												</a>
											</Button>
										)}
									</div>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
}
