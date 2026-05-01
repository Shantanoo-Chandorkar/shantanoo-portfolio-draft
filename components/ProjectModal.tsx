'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { TechBadge } from '@/components/TechBadge';
import Image from 'next/image';
import type { Project } from '@/lib/types';

interface ProjectModalProps {
	project: Project | null;
	onClose: () => void;
}

/**
 * Renders an animated modal overlay for a selected project.
 * Displays the project image, description, features, technologies, and links.
 * Closes when the backdrop is clicked or the close button is activated.
 * @param project - The project to display, or null to render nothing
 * @param onClose - Callback invoked when the user dismisses the modal
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
	useEffect(() => {
		if (!project) return;
		// Prevent the page from scrolling behind the open modal.
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	}, [project]);
	return (
		<AnimatePresence>
			{project && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
					onClick={onClose}
				>
					<motion.div
						data-lenis-prevent
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
								src={project.image}
								alt={project.title}
								className="w-full h-64 object-cover rounded-t-lg"
								width={600}
								height={500}
							/>
							{project.inProgress && (
								<span className="absolute top-4 left-4 text-xs font-medium px-2 py-1 rounded-full bg-amber-900 text-gray-200 dark:text-gray-200 border border-amber-500/40 backdrop-blur-sm">
									In Progress
								</span>
							)}
							<Button
								variant="ghost"
								size="sm"
								aria-label="Close modal"
								className="absolute top-4 right-4 bg-background/50 text-foreground hover:bg-background/70"
								onClick={onClose}
							>
								<X className="w-4 h-4" />
							</Button>
						</div>

						<div className="p-6">
							<h3 id="modal-title" className="text-2xl font-bold text-foreground mb-4">
								{project.title}
							</h3>
							<p className="text-muted-foreground mb-6">{project.longDescription}</p>

							<div className="mb-6">
								<h4 className="text-lg font-semibold text-foreground mb-3">Key Features</h4>
								<ul className="space-y-2">
									{project.features.map((feature, i) => (
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
									{project.technologies.map((tech) => (
										<TechBadge key={tech} tech={tech} />
									))}
								</div>
							</div>

							<div className="flex flex-row max-sm:flex-col sm:flex-row gap-4">
								<Button asChild className="bg-primary hover:bg-primary/90">
									<a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
										<FaGithub className="w-4 h-4 mr-2" />
										<span className="text-xs">View Code</span>
									</a>
								</Button>
								{project.liveUrl ? (
									<Button
										variant="outline"
										asChild
										className="border-primary text-primary hover:bg-primary/10"
									>
										<a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
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
	);
}
