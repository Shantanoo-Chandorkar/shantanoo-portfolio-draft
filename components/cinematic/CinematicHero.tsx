'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ImpactStat } from './ImpactStat';

const name = 'Shantanoo Chandorkar';
const nameWords = name.split(' ');
const title = 'Software';
const words = ['Developer', 'Engineer', 'Designer', 'Creator'];

const heroStats = [
	{ value: 2, suffix: '+', label: 'Years Experience' },
	{ value: 200, suffix: 'K+', label: 'Users Impacted' },
	{ value: 5, suffix: '+', label: 'Products Built' },
];

export function CinematicHero() {
	const nameRef = useRef(null);
	const isNameInView = useInView(nameRef, { once: true });
	const [wordIndex, setWordIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setWordIndex((prev) => (prev + 1) % words.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	const scrollToExperience = () => {
		document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section
			id="hero"
			className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative"
		>
			<div className="max-w-3xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center"
				>
					{/* Name — delay 0ms */}
					<motion.div
						initial="hidden"
						animate="visible"
						variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
						className="mb-4"
					>
						<h1
							ref={nameRef}
							className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-4 flex flex-wrap justify-center items-center"
						>
							<span className="sr-only">{name}</span>
							<span aria-hidden="true" className="flex flex-wrap justify-center">
								{nameWords.map((word, wIndex) => (
									<span key={wIndex} className="inline-block whitespace-nowrap break-keep mr-3">
										{word.split('').map((letter, lIndex) => (
											<motion.span
												key={lIndex}
												variants={{
													hidden: { opacity: 0, y: 20 },
													visible: { opacity: 1, y: 0 },
												}}
												animate={isNameInView ? { opacity: 1 } : {}}
												transition={{ duration: 0.4, delay: (wIndex * word.length + lIndex) * 0.03 }}
												className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
											>
												{letter}
											</motion.span>
										))}
										{wIndex < nameWords.length - 1 && '\u00A0'}
									</span>
								))}
							</span>
						</h1>

						{/* Title — delay 200ms */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.6 }}
							className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-center mb-4 whitespace-nowrap"
						>
							{title}{' '}
							<AnimatePresence mode="wait">
								<motion.span
									key={words[wordIndex]}
									initial={{ opacity: 0, y: -40 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 40 }}
									transition={{ duration: 0.2 }}
									className="inline-block"
								>
									{words[wordIndex]}
								</motion.span>
							</AnimatePresence>
						</motion.div>

						{/* Location */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.5 }}
							className="flex items-center justify-center text-muted-foreground mb-4"
						>
							<MapPin className="w-4 h-4 mr-2" />
							<span>Mumbai, India</span>
						</motion.div>

						{/* Bio */}
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.5 }}
							className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto font-medium"
						>
							Building performant web applications and scalable SaaS platforms trusted by hundreds of
							thousands of users.
						</motion.p>
					</motion.div>

					{/* Impact Stats — delay 600ms */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.6 }}
						className="grid grid-cols-3 gap-6 mt-8"
					>
						{heroStats.map((stat, i) => (
							<ImpactStat
								key={stat.label}
								value={stat.value}
								suffix={stat.suffix}
								label={stat.label}
								delay={i * 0.15}
							/>
						))}
					</motion.div>
				</motion.div>
			</div>

			{/* Scroll to explore — delay 1000ms */}
			<motion.button
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 0.6 }}
				onClick={scrollToExperience}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
				aria-label="Scroll to experience section"
			>
				<span className="text-sm mb-2">Scroll to explore</span>
				<motion.div
					animate={{ y: [0, 8, 0] }}
					transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
				>
					<ChevronDown className="w-6 h-6" />
				</motion.div>
			</motion.button>
		</section>
	);
}
