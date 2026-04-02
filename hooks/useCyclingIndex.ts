import { useState, useEffect } from 'react';

/**
 * Cycles an index through [0, length) at a fixed interval.
 * Useful for carousels, word rotators, or any timed sequential display.
 * @param length - Total number of items to cycle through; no cycling if <= 1
 * @param intervalMs - Milliseconds between each index advance
 * @returns The current index, always in [0, length)
 */
export function useCyclingIndex(length: number, intervalMs: number): number {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (length <= 1) return;

		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % length);
		}, intervalMs);

		return () => clearInterval(interval);
	}, [length, intervalMs]);

	return index;
}
