import { useState, useEffect, RefObject } from 'react';

const ICON_SIZE_PX = 48;
const DEFAULT_RADIUS_PX = 200;

// 6% offset ensures orbiting icons clear the profile image edge with visual breathing room
const EDGE_OFFSET_FACTOR = 0.06;

/**
 * Computes the orbit radius for icons circling a circular container element.
 * Derives the radius from the container's rendered width and re-computes on resize.
 * @param containerRef - Ref attached to the circular container element
 * @returns Orbit radius in pixels; defaults to 200 before first measurement
 */
export function useOrbitRadius(containerRef: RefObject<HTMLDivElement | null>): number {
	const [radius, setRadius] = useState(DEFAULT_RADIUS_PX);

	useEffect(() => {
		const updateRadius = () => {
			if (containerRef.current) {
				const size = containerRef.current.offsetWidth;
				const offset = size * EDGE_OFFSET_FACTOR;
				setRadius((size - ICON_SIZE_PX) / 2 + offset);
			}
		};

		updateRadius();
		window.addEventListener('resize', updateRadius);
		return () => window.removeEventListener('resize', updateRadius);
	}, [containerRef]);

	return radius;
}
