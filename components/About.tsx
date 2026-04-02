'use client';

import { motion } from 'framer-motion';
import { VIEWPORT_ONCE } from '@/lib/animation';

export function About() {
	return (
		<section className="py-16 px-4">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={VIEWPORT_ONCE}
					className="text-center"
				>
					<div className="bg-card/50 border-border backdrop-blur-sm rounded-lg p-8">
						<h3 className="text-2xl font-bold text-foreground mb-4">My Philosophy</h3>
						<p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
							I believe great software is built at the intersection of empathy and engineering. Every line
							of code should serve the person using it - fast, accessible, and reliable. I chase hard
							problems, ship iteratively, and never stop learning.
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
