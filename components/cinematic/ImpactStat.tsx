'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValue, animate, useInView } from 'framer-motion';

interface ImpactStatProps {
	value: number;
	suffix?: string;
	label: string;
	delay?: number;
}

export function ImpactStat({ value, suffix = '', label, delay = 0 }: ImpactStatProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.5 });
	const motionValue = useMotionValue(0);
	const [displayValue, setDisplayValue] = useState(0);

	useEffect(() => {
		const unsubscribe = motionValue.on('change', (latest) => {
			setDisplayValue(Math.round(latest));
		});
		return unsubscribe;
	}, [motionValue]);

	useEffect(() => {
		if (isInView) {
			const controls = animate(motionValue, value, {
				duration: 1.5,
				delay,
				ease: 'easeOut',
			});
			return () => controls.stop();
		}
	}, [isInView, motionValue, value, delay]);

	return (
		<div ref={ref} className="text-center">
			<div className="flex items-baseline justify-center">
				<span className="text-3xl sm:text-4xl font-bold text-primary">{displayValue}</span>
				{suffix && <span className="text-xl sm:text-2xl font-bold text-primary">{suffix}</span>}
			</div>
			<p className="text-sm text-muted-foreground mt-1">{label}</p>
		</div>
	);
}
