'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import { ContactFormPanel } from '@/components/ContactFormPanel';
import { CVDownloadBanner } from './CVDownloadBanner';
import { PersonalitySection } from './PersonalitySection';
import { VIEWPORT_ONCE } from '@/lib/animation';

/**
 * Cinematic Contact section - a thin layout compositor that assembles
 * the contact section's independent concerns.
 */
export function CinematicContact() {
	return (
		<section id="contact" className="py-16 px-4">
			<div className="max-w-6xl mx-auto">
				<SectionHeader
					heading="Get In Touch"
					subtitle="Let's discuss your next project or opportunity"
				/>

				<CVDownloadBanner />

				<ContactFormPanel />

				<PersonalitySection />

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
