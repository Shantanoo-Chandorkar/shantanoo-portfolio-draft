'use client';

import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { ExternalLink, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import { SectionHeader } from './SectionHeader';
import { TechBadge } from './TechBadge';
import { VIEWPORT_ONCE } from '@/lib/animation';
import type { Project } from '@/lib/types';
import { projects } from '@/lib/data/projects';

interface ProjectCardProps {
	project: Project;
	index: number;
	totalCards: number;
	onDragEnd: (
		event: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo,
		project: Project
	) => void;
	onClick: (project: Project) => void;
}

function ProjectCard({ project, index, totalCards, onDragEnd, onClick }: ProjectCardProps) {
	const x = useMotionValue(0);
	const rotate = useTransform(x, [-200, 200], [-25, 25]);
	const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

	return (
		<motion.div
			key={project.id}
			className="relative sm:w-[18rem] md:w-72 lg:w-80 xl:w-80 w-[18rem] mx-auto mb-6"
			style={{
				x,
				rotate,
				opacity,
				zIndex: totalCards - index,
			}}
			drag="x"
			dragConstraints={{ left: 0, right: 0 }}
			onDragEnd={(event, info) => onDragEnd(event, info, project)}
			whileHover={{ scale: 1.02 }}
			initial={{ scale: 0.9, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 1, delay: index * 0.2 }}
			onClick={() => onClick(project)}
		>
			<Card className="w-full h-full bg-card/50 border-border backdrop-blur-sm cursor-grab active:cursor-grabbing">
				<CardContent className="p-0 h-full flex flex-col">
					<div className="h-48 overflow-hidden rounded-t-lg">
						<Image
							src={project.image}
							alt={project.title}
							className="w-full h-full object-cover"
							width={600}
							height={500}
						/>
					</div>
					<div className="p-6 flex flex-col justify-between flex-grow">
						<div>
							<h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
							<p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
						</div>

						<div className="mt-2 flex flex-wrap gap-2">
							{project.technologies.slice(0, 3).map((tech) => (
								<TechBadge key={tech} tech={tech} size="sm" />
							))}
							{project.technologies.length > 3 && (
								<TechBadge tech={`+${project.technologies.length - 3}`} size="sm" />
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}

export function Projects() {
	const { theme } = useTheme();

	const [cards, setCards] = useState(projects);
	const { selected: selectedProject, open: openProject, close: closeProject } = useModal<Project>();

	const removeCard = (id: number) => {
		setCards((prev) => {
			const filtered = prev.filter((card) => card.id !== id);
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
			// Right swipe - open modal
			openProject(project);
		} else if (info.offset.x < -threshold) {
			// Left swipe - remove card
			removeCard(project.id);
		}
	};

	const resetCards = () => {
		setCards(projects);
	};

	return (
		<section className="py-16 px-4">
			<div className="max-w-6xl mx-auto">
				<SectionHeader
					heading="Projects"
					subtitle="Swipe left for next project | Swipe right to open."
				/>

				<div className="flex flex-col items-center">
					{/* Project Cards */}
					<div className="flex flex-wrap justify-center gap-6 mb-8">
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
									onClick={openProject}
								/>
							))
						)}
					</div>
				</div>

				{/* Project Modal */}
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
								className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border scrollbar-thin scrollbar-thumb-primary/30 relative"
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

									<div className="flex flex-row max-sm:flex-col sm:flex-row gap-4">
										<Button asChild className="bg-primary hover:bg-primary/90">
											<a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
												<FaGithub className="w-4 h-4 mr-2" />
												<span className="text-xs">View Code</span>
											</a>
										</Button>
										{selectedProject.liveUrl ? (
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
										) : (
											<Button variant="outline" disabled className="border-primary text-primary opacity-50">
												<ExternalLink className="w-4 h-4 mr-2" />
												<span className="text-xs">No Live Demo</span>
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
