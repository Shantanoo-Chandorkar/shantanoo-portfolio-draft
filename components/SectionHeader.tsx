'use client';

import { motion } from 'framer-motion';
import { VIEWPORT_ONCE } from '@/lib/animation';

interface SectionHeaderProps {
	heading: string;
	subtitle: string;
	delay?: number;
}

export function SectionHeader({ heading, subtitle, delay = 0 }: SectionHeaderProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay }}
			viewport={VIEWPORT_ONCE}
			className="text-center mb-16"
		>
			<h2 className="text-4xl font-bold text-foreground mb-4">{heading}</h2>
			<p className="text-muted-foreground text-lg">{subtitle}</p>
		</motion.div>
	);
}
