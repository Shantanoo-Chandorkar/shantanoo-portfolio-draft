'use client';

import { SectionHeader } from './SectionHeader';
import { ContactFormPanel } from './ContactFormPanel';
import { VIEWPORT_ONCE } from '@/lib/animation';

export function Contact() {
	return (
		<section className="py-16 px-4">
			<div className="max-w-6xl mx-auto">
				<SectionHeader
					heading="Get In Touch"
					subtitle="Let's discuss your next project or opportunity"
					delay={0.1}
				/>

				<ContactFormPanel />
			</div>
		</section>
	);
}
