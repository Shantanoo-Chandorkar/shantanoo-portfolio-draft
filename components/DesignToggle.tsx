'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Leaf } from 'lucide-react';
import { useDesignMode } from '@/contexts/DesignContext';
import { Button } from '@/components/ui/button';

interface DesignToggleProps {
	variant?: 'fixed' | 'navbar';
}

export function DesignToggle({ variant = 'fixed' }: DesignToggleProps) {
	const { designMode, setDesignMode } = useDesignMode();

	const toggle = () => {
		setDesignMode(designMode === 'classic' ? 'cinematic' : 'classic');
	};

	const button = (
		<Button
			onClick={toggle}
			size="icon"
			aria-label={`Switch to ${designMode === 'classic' ? 'cinematic' : 'classic'} design`}
			className="relative overflow-hidden bg-primary/10 hover:bg-primary/20 border-2 border-primary/20 backdrop-blur-sm transition-all duration-300 w-10 h-10"
		>
			<AnimatePresence mode="wait" initial={false}>
				{designMode === 'classic' ? (
					<motion.span
						key="classic"
						initial={{ rotate: -90, scale: 0 }}
						animate={{ rotate: 0, scale: 1 }}
						exit={{ rotate: 90, scale: 0 }}
						transition={{ duration: 0.3 }}
						className="flex items-center justify-center"
						aria-hidden="true"
					>
						<Leaf className="w-5 h-5 text-emerald-500" />
					</motion.span>
				) : (
					<motion.span
						key="cinematic"
						initial={{ rotate: 90, scale: 0 }}
						animate={{ rotate: 0, scale: 1 }}
						exit={{ rotate: -90, scale: 0 }}
						transition={{ duration: 0.3 }}
						className="flex items-center justify-center"
						aria-hidden="true"
					>
						<Sparkles className="w-5 h-5 text-purple-400" />
					</motion.span>
				)}
			</AnimatePresence>
		</Button>
	);

	if (variant === 'navbar') return button;

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.3 }}
			className="fixed top-6 left-20 z-50"
		>
			{button}
		</motion.div>
	);
}
