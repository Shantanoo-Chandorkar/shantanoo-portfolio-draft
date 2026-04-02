import type { ExperienceEntry } from '@/lib/types';

export const experiences: ExperienceEntry[] = [
	{
		id: 1,
		company: 'Brainstorm Force (CartFlows)',
		position: 'Software Developer',
		period: 'August 2025 - Present',
		location: 'Remote',
		description: [
			'Overhauled CartFlows Flow Analytics, expanding tracked KPIs from 8 to 24 (+200%) with new tabular data views, achieving zero regression and no performance degradation on a database-heavy implementation.',
			'Engineered a full-featured interactive Canvas Builder from scratch using React and ReactFlow, dynamically visualizing complete funnel flows and all nested steps in a node-based UI.',
			'Resolved 3+ critical payment failures — Stripe Express Checkout blocking transactions, PayPal infinite loading on upsell, and Google Pay misrouting to WooCommerce — cutting payment-related support tickets by 90%.',
			'Conducted a comprehensive security audit of the CartFlows plugin and independently remediated all identified vulnerabilities spanning all CVSS severity tiers.',
			'Pioneered WordPress Abilities API integration for CartFlows, mapping plugin capabilities as MCP-compatible tools within the WordPress MCP server architecture.',
		],
		technologies: ['PHP', 'React.js', 'ReactFlow', 'JavaScript', 'MySQL', 'WordPress', 'WooCommerce', 'REST APIs', 'Git'],
		highlights: [
			{ metric: '+200%', label: 'KPIs expanded' },
			{ metric: '90%', label: 'ticket reduction' },
			{ metric: 'From Scratch', label: 'Canvas Builder' },
		],
	},
	{
		id: 2,
		company: 'Hummingbird Web Solutions Pvt Ltd.',
		position: 'Software Engineer',
		period: 'December 2023 - July 2025',
		location: 'Pune, India',
		description: [
			'Built a high-performance Windows application automating JSON-to-PDF conversion using C# and .NET, delivering 20% faster internal workflows with full CRUD persistence for 10+ designers.',
			'Revamped 50+ React-based Gutenberg block components, improving accessibility and UX for 4,000+ active users across the Responsive Blocks plugin.',
			'Resolved critical security vulnerabilities in a SaaS platform, hardening reliability for 10,000+ active users including 200+ premium subscribers.',
			'Boosted Core Web Vitals score from 71 to 89 (+18 points) by targeting LCP and CLS via lazy loading, DOM optimizations, and layout fixes.',
		],
		technologies: ['React.js', 'WordPress', 'PHP', 'JavaScript', 'C#', '.NET', 'MySQL', 'GitHub', 'REST APIs'],
		highlights: [
			{ metric: '+18pts', label: 'Core Web Vitals' },
			{ metric: '50+', label: 'components revamped' },
			{ metric: '10K+', label: 'users secured' },
		],
	},
];
