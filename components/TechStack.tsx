'use client';

import { motion } from 'framer-motion';
import {
	Code,
	Database,
	Globe,
	Layers,
	Terminal,
	FileCode,
	Server,
	Zap,
	Cpu,
	Cog,
} from 'lucide-react';
import { FaWordpressSimple } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from './SectionHeader';
import { VIEWPORT_ONCE } from '@/lib/animation';

interface TechItemProps {
	icon: React.ElementType;
	title: string;
	description: string;
	delay?: number;
}

function TechItem({ icon: Icon, title, description, delay = 0 }: TechItemProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay }}
			viewport={VIEWPORT_ONCE}
			whileHover={{ scale: 1.05 }}
		>
			<Card className="bg-card/50 border-border backdrop-blur-sm hover:bg-card/70 transition-all duration-300 h-full">
				<CardContent className="p-6 text-center">
					<motion.div
						whileHover={{ rotate: 360 }}
						transition={{ duration: 0.6 }}
						className="inline-block mb-4"
					>
						<div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
							<Icon className="w-8 h-8 text-accent-foreground" />
						</div>
					</motion.div>
					<h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
					<p className="text-muted-foreground text-sm">{description}</p>
				</CardContent>
			</Card>
		</motion.div>
	);
}

const technologies = [
	{
		icon: Code,
		title: 'Frontend Development',
		description: 'React.js, Next.js, TypeScript, JavaScript, jQuery',
	},
	{ icon: Server, title: 'Backend Development', description: 'PHP, Node.js, .NET Framework' },
	{ icon: Database, title: 'Database Management', description: 'MySQL, MS-SQL, MongoDB' },
	{
		icon: Cpu,
		title: 'Core Concepts',
		description: 'Data Structures & Algorithms, Technical SEO, System Design, Database Management',
	},
	{
		icon: Cog,
		title: 'Programming Languages',
		description: 'JavaScript (ES6+), PHP, C#, TypeScript, C++, Java, Go',
	},
	{
		icon: Terminal,
		title: 'Development Tools',
		description: 'Linux, Docker, Nginx, Apache, Postman, VS Code',
	},
	{
		icon: Zap,
		title: 'Performance',
		description: 'Core Web Vitals, Technical SEO, Lighthouse, Accessibility',
	},
	{
		icon: Globe,
		title: 'Web Technologies',
		description: 'REST APIs, GraphQL, WordPress, WooCommerce, Magento',
	},
	{ icon: FileCode, title: 'Version Control', description: 'Git, GitHub, Bitbucket, SVN' },
	{
		icon: Layers,
		title: 'Programming Tools',
		description: 'Webpack, ESLint, Babel, Grunt, PhpCodeSniffer',
	},
	{
		icon: FaWordpressSimple,
		title: 'WordPress Plugins',
		description: 'WooCommerce, WPForms, Yoast SEO, Advanced Custom Fields, Elementor',
	},
];

export function TechStack() {
	return (
		<section className="py-16 px-4">
			<div className="max-w-6xl mx-auto">
				<SectionHeader heading="Tech Stack" subtitle="Technologies and tools I work with" delay={0.1} />

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{technologies.map((tech, index) => (
						<TechItem
							key={index}
							icon={tech.icon}
							title={tech.title}
							description={tech.description}
							delay={index * 0.05}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
