'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ThemeToggleProps {
	variant?: 'fixed' | 'navbar';
}

export function ThemeToggle({ variant = 'fixed' }: ThemeToggleProps) {
	const { theme, toggleTheme } = useTheme();

	const button = (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					onClick={toggleTheme}
					size="icon"
					aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
					aria-pressed={theme === 'dark'}
					className="relative overflow-hidden bg-primary/10 hover:bg-primary/20 border-2 border-primary/20 backdrop-blur-sm transition-all duration-300 w-10 h-10"
				>
					<AnimatePresence mode="wait" initial={false}>
						{theme === 'light' ? (
							<motion.span
								key="sun"
								initial={{ rotate: -90, scale: 0 }}
								animate={{ rotate: 0, scale: 1 }}
								exit={{ rotate: 90, scale: 0 }}
								transition={{ duration: 0.3 }}
								className="flex items-center justify-center"
								aria-hidden="true"
							>
								<Sun className="w-5 h-5 text-amber-500" />
							</motion.span>
						) : (
							<motion.span
								key="moon"
								initial={{ rotate: 90, scale: 0 }}
								animate={{ rotate: 0, scale: 1 }}
								exit={{ rotate: -90, scale: 0 }}
								transition={{ duration: 0.3 }}
								className="flex items-center justify-center"
								aria-hidden="true"
							>
								<Moon className="w-5 h-5 text-blue-300" />
							</motion.span>
						)}
					</AnimatePresence>
				</Button>
			</TooltipTrigger>
			<TooltipContent side="bottom" align="end">
				<p>Switch to {theme === 'light' ? 'dark' : 'light'} mode</p>
			</TooltipContent>
		</Tooltip>
	);

	if (variant === 'navbar') return button;

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.3 }}
			className="fixed top-6 left-6 z-50"
		>
			{button}
		</motion.div>
	);
}
