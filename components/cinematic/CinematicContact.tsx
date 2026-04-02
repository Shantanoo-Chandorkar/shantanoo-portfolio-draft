'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Download, BookOpen, Mountain, Tv } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/SectionHeader';
import { ContactFormPanel } from '@/components/ContactFormPanel';
import { VIEWPORT_ONCE } from '@/lib/animation';

const personalityItems = [
	{
		icon: BookOpen,
		label: 'Avid Reader',
		description: 'An avid reader who believes in the power of knowledge and storytelling.',
	},
	{
		icon: Mountain,
		label: 'Trekker',
		description: 'Nature enthusiast who finds peace and challenge in the mountains.',
	},
	{
		icon: Tv,
		label: 'Anime Fan',
		description: 'A passionate otaku who finds inspiration in Japanese animation and storytelling.',
	},
];

export function CinematicContact() {
	const [expandedPersonality, setExpandedPersonality] = useState<string | null>(null);

	return (
		<section id="contact" className="py-16 px-4">
			<div className="max-w-6xl mx-auto">
				<SectionHeader
					heading="Get In Touch"
					subtitle="Let's discuss your next project or opportunity"
				/>

				{/* CV Download Banner */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={VIEWPORT_ONCE}
					className="mb-12"
				>
					<div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
						<div>
							<h3 className="text-lg font-bold text-foreground">Want the full picture?</h3>
							<p className="text-sm text-muted-foreground">
								Download my complete CV with experience, skills, and education.
							</p>
						</div>
						<Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">
							<a href="/Shantanoo_Chandorkar_Resume.pdf" download>
								<Download className="w-4 h-4 mr-2" />
								Download CV
							</a>
						</Button>
					</div>
				</motion.div>

				<ContactFormPanel />

				{/* Personality Strip */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					viewport={VIEWPORT_ONCE}
					className="mt-12"
				>
					<h3 className="text-xl font-bold text-foreground mb-4">Beyond the Code</h3>
					<div className="flex flex-wrap gap-3">
						{personalityItems.map((item) => (
							<div key={item.label}>
								<button
									onClick={() =>
										setExpandedPersonality(expandedPersonality === item.label ? null : item.label)
									}
									className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
										expandedPersonality === item.label
											? 'bg-primary/10 border-primary/30 text-primary'
											: 'bg-card/50 border-border text-muted-foreground hover:bg-card/70'
									}`}
								>
									<item.icon className="w-4 h-4" />
									<span className="text-sm font-medium">{item.label}</span>
								</button>
								<AnimatePresence>
									{expandedPersonality === item.label && (
										<motion.p
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: 'auto' }}
											exit={{ opacity: 0, height: 0 }}
											className="text-sm text-muted-foreground mt-2 px-4 overflow-hidden"
										>
											{item.description}
										</motion.p>
									)}
								</AnimatePresence>
							</div>
						))}
					</div>
				</motion.div>

				{/* Footer */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					viewport={VIEWPORT_ONCE}
					className="mt-16 pt-8 border-t border-border/50 text-center"
				>
					<p className="text-sm text-muted-foreground">
						{`\u00A9 ${new Date().getFullYear()} Shantanoo Chandorkar. All rights reserved.`}
					</p>
				</motion.div>
			</div>
		</section>
	);
}
