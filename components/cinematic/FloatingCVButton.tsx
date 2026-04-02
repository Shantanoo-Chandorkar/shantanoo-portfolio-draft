'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';

export function FloatingCVButton() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const heroEl = document.getElementById('hero');
		if (!heroEl) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(!entry.isIntersecting);
			},
			{ threshold: 0.1 }
		);
		observer.observe(heroEl);
		return () => observer.disconnect();
	}, []);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.a
					href="/Shantanoo_Chandorkar_Resume.pdf"
					download
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
					aria-label="Download CV"
				>
					<Download className="w-5 h-5" />
				</motion.a>
			)}
		</AnimatePresence>
	);
}
