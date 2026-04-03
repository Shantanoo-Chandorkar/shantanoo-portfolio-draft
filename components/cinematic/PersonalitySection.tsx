'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BookOpen, Mountain, Tv, LucideIcon } from 'lucide-react';
import { VIEWPORT_ONCE } from '@/lib/animation';

interface PersonalityItem {
	icon: LucideIcon;
	label: string;
	description: string;
}

const personalityItems: PersonalityItem[] = [
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

/**
 * Personality Section component for the cinematic contact section.
 * Displays personality trait buttons with a fixed description area below
 * that updates on selection — no layout shift on toggle.
 */
export function PersonalitySection() {
	const [expandedPersonality, setExpandedPersonality] = useState<string | null>(null);

	return (
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
					<button
						key={item.label}
						onClick={() => setExpandedPersonality(expandedPersonality === item.label ? null : item.label)}
						className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
							expandedPersonality === item.label
								? 'bg-primary/10 border-primary/30 text-primary'
								: 'bg-card/50 border-border text-muted-foreground hover:bg-card/70'
						}`}
					>
						<item.icon className="w-4 h-4" />
						<span className="text-sm font-medium">{item.label}</span>
					</button>
				))}
			</div>
			<div className="h-10 mt-3">
				<AnimatePresence mode="wait">
					{expandedPersonality && (
						<motion.p
							key={expandedPersonality}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15 }}
							className="text-sm text-muted-foreground"
						>
							{personalityItems.find((i) => i.label === expandedPersonality)?.description}
						</motion.p>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
