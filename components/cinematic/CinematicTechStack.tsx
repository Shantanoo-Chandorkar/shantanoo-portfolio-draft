'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import { VIEWPORT_ONCE } from '@/lib/animation';

interface TechGroup {
	name: string;
	items: string[];
}

const techGroups: TechGroup[] = [
	{ name: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'jQuery'] },
	{ name: 'Backend', items: ['PHP', 'Node.js', 'C#', '.NET'] },
	{ name: 'Languages', items: ['JavaScript', 'PHP', 'C#', 'TypeScript', 'C++', 'Java', 'Go'] },
	{ name: 'Database', items: ['MySQL', 'MS-SQL', 'MongoDB'] },
	{ name: 'CMS & E-commerce', items: ['WordPress', 'WooCommerce', 'Magento'] },
	{
		name: 'Tools & DevOps',
		items: [
			'Linux',
			'Docker',
			'Nginx',
			'Apache',
			'Git',
			'GitHub',
			'Bitbucket',
			'SVN',
			'Postman',
			'VS Code',
		],
	},
	{ name: 'Build Tools', items: ['Webpack', 'ESLint', 'Babel', 'Grunt', 'PhpCodeSniffer'] },
	{
		name: 'Core Concepts',
		items: [
			'DSA',
			'System Design',
			'Technical SEO',
			'Core Web Vitals',
			'Lighthouse',
			'Accessibility',
		],
	},
	{ name: 'Web Technologies', items: ['REST APIs', 'GraphQL'] },
	{
		name: 'WordPress Ecosystem',
		items: ['WooCommerce', 'WPForms', 'Yoast SEO', 'ACF', 'Elementor'],
	},
];

export function CinematicTechStack() {
	return (
		<section id="tech-stack" className="py-16 px-4">
			<div className="max-w-6xl mx-auto">
				<SectionHeader heading="Tech Stack" subtitle="Technologies and tools I work with" />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{techGroups.map((group, index) => (
						<motion.div
							key={group.name}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.05 }}
							viewport={VIEWPORT_ONCE}
						>
							<h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
								{group.name}
							</h3>
							<div className="flex flex-wrap gap-2">
								{group.items.map((item) => (
									<span
										key={item}
										className="px-3 py-1.5 text-sm bg-card/50 border border-border rounded-full text-foreground hover:bg-card/70 hover:border-primary/30 transition-colors duration-200"
									>
										{item}
									</span>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
