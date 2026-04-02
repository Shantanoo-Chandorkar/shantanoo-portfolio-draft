'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { heroSocialLinks } from '@/lib/social-links';

const name = 'Shantanoo Chandorkar';
const nameWords = name.split(' '); // ["Shantanoo", "Chandorkar"]
const title = 'Software';
const words = ['Developer', 'Engineer', 'Designer', 'Creator'];

export function HeroBanner() {
	const [currentIconIndex, setCurrentIconIndex] = useState(0);
	const imageRef = useRef<HTMLDivElement>(null);
	const [radius, setRadius] = useState(200);

	const nameRef = useRef(null);
	const isInView = useInView(nameRef, { once: true });

	const [wordIndex, setWordIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setWordIndex((prev) => (prev + 1) % words.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIconIndex((prev) => (prev + 1) % heroSocialLinks.length);
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	const getIconPosition = (index: number, currentIndex: number, radius: number) => {
		const totalIcons = heroSocialLinks.length;
		const angleStep = (2 * Math.PI) / totalIcons;
		const baseAngle = index * angleStep;
		const rotationOffset = currentIndex * angleStep;
		const angle = baseAngle - rotationOffset - Math.PI / 2;

		const x = Math.cos(angle) * radius;
		const y = Math.sin(angle) * radius;

		return { x, y };
	};

	useEffect(() => {
		const updateRadius = () => {
			if (imageRef.current) {
				const size = imageRef.current.offsetWidth;
				const iconSize = 48;
				// 6% offset ensures the orbiting icons clear the profile image edge with visual breathing room
				const offset = size * 0.06;
				const safeRadius = (size - iconSize) / 2 + offset;
				setRadius(safeRadius);
			}
		};

		updateRadius();
		window.addEventListener('resize', updateRadius);
		return () => window.removeEventListener('resize', updateRadius);
	}, []);

	return (
		<section className="min-h-screen flex items-center justify-center px-4 pt-20 sm:py-16">
			<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center lg:text-left"
				>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className="mb-6"
					>
						<motion.div
							initial="hidden"
							animate="visible"
							variants={{
								visible: {
									transition: {
										staggerChildren: 0.05,
									},
								},
							}}
							className="mb-6"
						>
							{/* Animated Name */}
							<h1
								ref={nameRef}
								className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 flex flex-wrap lg:flex-nowrap justify-center lg:justify-start items-center text-balance"
							>
								<span className="sr-only">{name}</span>
								<span aria-hidden="true" className="flex flex-wrap lg:flex-nowrap">
									{nameWords.map((word, wIndex) => (
										<span key={wIndex} className="inline-block whitespace-nowrap break-keep mr-2">
											{word.split('').map((letter, lIndex) => (
												<motion.span
													key={lIndex}
													variants={{
														hidden: { opacity: 0, y: 20 },
														visible: { opacity: 1, y: 0 },
													}}
													animate={isInView ? { opacity: 1 } : {}}
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

							{/* Animated Title */}
							<div className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-center md:text-center lg:text-left mb-4 whitespace-nowrap break-keep">
								{title}{' '}
								<AnimatePresence mode="wait">
									<motion.p
										key={words[wordIndex]}
										initial={{ opacity: 0, y: -40 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 40 }}
										transition={{ duration: 0.2 }}
										className="inline-block break-keep"
									>
										{words[wordIndex]}
									</motion.p>
								</AnimatePresence>
							</div>

							{/* Location */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 1, duration: 0.5 }}
								className="flex items-center justify-center lg:justify-start text-muted-foreground mb-6"
							>
								<MapPin className="w-4 h-4 mr-2" />
								<span>Mumbai, India</span>
							</motion.div>
						</motion.div>
						<p className="text-lg text-muted-foreground leading-relaxed max-w-lg font-bold">
							{
								'Full-stack developer specializing in React.js and PHP/WordPress — building performant web applications, scalable SaaS platforms, and custom WordPress products trusted by hundreds of thousands of users.'
							}
						</p>
					</motion.div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="flex justify-center"
				>
					<div
						ref={imageRef}
						className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
					>
						{/* Profile Image */}
						<motion.div whileHover={{ scale: 1.05 }} className="relative z-10 w-full h-full">
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
								className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-xl opacity-30"
							/>
							<Image
								src={'/banner-image.jpg'}
								alt="Shantanoo Chandorkar profile photo"
								width={450}
								height={450}
								priority
								className="w-full h-full rounded-full object-cover border-4 border-border backdrop-blur-sm relative z-10"
							/>
						</motion.div>

						{/* Animated Social Icons */}
						<div className="absolute inset-0 flex items-center justify-center">
							{heroSocialLinks.map((link, index) => {
								const position = getIconPosition(index, currentIconIndex, radius);
								return (
									<motion.a
										key={link.label}
										href={link.href}
										aria-label={`Visit Shantanoo Chandorkar's ${link.label} Profile`}
										target="_blank"
										rel="noopener noreferrer"
										className="absolute z-20"
										animate={{
											x: position.x,
											y: position.y,
										}}
										transition={{
											duration: 2,
											ease: 'easeInOut',
										}}
										whileHover={{
											scale: 1.2,
											transition: { duration: 0.2 },
										}}
										whileTap={{ scale: 0.9 }}
									>
										<div
											className="w-10 h-10 sm:w-12 sm:h-12 bg-card/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
											style={{
												boxShadow: `0 0 20px ${link.color}20`,
											}}
										>
											<link.icon
												className="w-5 h-5 sm:w-6 sm:h-6 text-foreground"
												style={{ color: link.color }}
											/>
										</div>
									</motion.a>
								);
							})}
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
