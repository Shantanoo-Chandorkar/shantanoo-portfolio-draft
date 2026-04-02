'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VIEWPORT_ONCE } from '@/lib/animation';

/**
 * CV Download Banner component for the cinematic contact section.
 * Displays a call-to-action banner with a download link for the CV.
 */
export function CVDownloadBanner() {
	return (
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
	);
}
