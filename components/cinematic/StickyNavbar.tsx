'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DesignToggle } from '@/components/DesignToggle';

const navLinks = [
	{ label: 'Experience', id: 'experience' },
	{ label: 'Projects', id: 'projects' },
	{ label: 'Tech Stack', id: 'tech-stack' },
	{ label: 'Contact', id: 'contact' },
];

export function StickyNavbar() {
	const [isVisible, setIsVisible] = useState(false);
	const [activeSection, setActiveSection] = useState('');
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		const heroEl = document.getElementById('hero');
		if (!heroEl) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(!entry.isIntersecting);
			},
			{ threshold: 0.1 }
		);
		observer.observe(heroEl);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const sectionIds = navLinks.map((l) => l.id);
		const observers: IntersectionObserver[] = [];

		sectionIds.forEach((id) => {
			const el = document.getElementById(id);
			if (!el) return;

			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						setActiveSection(id);
					}
				},
				{ threshold: 0, rootMargin: '-80px 0px -40% 0px' }
			);
			observer.observe(el);
			observers.push(observer);
		});

		return () => observers.forEach((observer) => observer.disconnect());
	}, []);

	const scrollTo = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
		setMobileMenuOpen(false);
	};

	const scrollToTop = () => {
		document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
		setMobileMenuOpen(false);
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.nav
					initial={{ y: -80, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -80, opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50"
				>
					<div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
						{/* Left: Name */}
						<button
							onClick={scrollToTop}
							className="text-lg font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
						>
							Shantanoo
						</button>

						{/* Center: Desktop nav links */}
						<div className="hidden md:flex items-center gap-1">
							{navLinks.map((link) => (
								<button
									key={link.id}
									onClick={() => scrollTo(link.id)}
									className={`px-3 py-2 text-sm rounded-md transition-colors cursor-pointer ${
										activeSection === link.id
											? 'text-primary font-semibold bg-primary/10'
											: 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
									}`}
								>
									{link.label}
								</button>
							))}
						</div>

						{/* Right: CV button + toggles + mobile menu */}
						<div className="flex items-center gap-2">
							<Button
								asChild
								size="sm"
								className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground"
							>
								<a href="/Shantanoo_Chandorkar_Resume.pdf" download>
									<Download className="w-4 h-4 mr-1" />
									CV
								</a>
							</Button>

							{/* Toggles migrate into navbar when visible */}
							<div className="hidden md:flex items-center gap-1">
								<ThemeToggle variant="navbar" />
								<DesignToggle variant="navbar" />
							</div>

							{/* Mobile hamburger */}
							<button
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								className="md:hidden p-2 text-foreground hover:bg-muted/50 rounded-md cursor-pointer"
								aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
							>
								{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
							</button>
						</div>
					</div>

					{/* Mobile menu panel */}
					<AnimatePresence>
						{mobileMenuOpen && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="md:hidden border-t border-border/50 overflow-hidden bg-background/95 backdrop-blur-sm"
							>
								<div className="px-4 py-3 flex flex-col gap-1">
									{navLinks.map((link) => (
										<button
											key={link.id}
											onClick={() => scrollTo(link.id)}
											className={`px-3 py-2 text-sm rounded-md text-left transition-colors cursor-pointer ${
												activeSection === link.id
													? 'text-primary font-semibold bg-primary/10'
													: 'text-muted-foreground hover:text-foreground'
											}`}
										>
											{link.label}
										</button>
									))}
									<Button
										asChild
										size="sm"
										className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground"
									>
										<a href="/Shantanoo_Chandorkar_Resume.pdf" download>
											<Download className="w-4 h-4 mr-1" />
											Download CV
										</a>
									</Button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.nav>
			)}
		</AnimatePresence>
	);
}
