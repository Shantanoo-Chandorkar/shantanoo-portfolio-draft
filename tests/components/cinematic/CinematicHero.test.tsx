/**
 * Tests for CinematicHero.
 * Covers: static content (name, title, location, bio, stats, scroll button)
 * and the timed word cycling behaviour.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { CinematicHero } from '@/components/cinematic/CinematicHero';

jest.mock('framer-motion', () => ({
	motion: {
		div: 'div',
		section: 'section',
		span: 'span',
		p: 'p',
		button: 'button',
	},
	AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
	useInView: () => true,
}));

// ImpactStat uses framer-motion internally; stub it to a simple display
jest.mock('@/components/cinematic/ImpactStat', () => ({
	ImpactStat: ({ value, suffix, label }: { value: number; suffix: string; label: string }) => (
		<div data-testid="impact-stat">
			{value}
			{suffix} {label}
		</div>
	),
}));

describe('CinematicHero', () => {
	it('renders the full name as screen-reader text', () => {
		render(<CinematicHero />);
		expect(screen.getByText('Shantanoo Chandorkar')).toBeInTheDocument();
	});

	it('renders the "Software" title prefix', () => {
		render(<CinematicHero />);
		expect(screen.getByText(/Software/)).toBeInTheDocument();
	});

	it('renders the initial cycling word "Developer"', () => {
		render(<CinematicHero />);
		expect(screen.getByText('Developer')).toBeInTheDocument();
	});

	it('renders the location', () => {
		render(<CinematicHero />);
		expect(screen.getByText('Mumbai, India')).toBeInTheDocument();
	});

	it('renders the bio text', () => {
		render(<CinematicHero />);
		expect(screen.getByText(/Building performant web applications/)).toBeInTheDocument();
	});

	it('renders all three impact stats', () => {
		render(<CinematicHero />);
		const stats = screen.getAllByTestId('impact-stat');
		expect(stats).toHaveLength(3);
	});

	it('renders the scroll-to-experience button', () => {
		render(<CinematicHero />);
		expect(screen.getByRole('button', { name: /scroll to experience section/i })).toBeInTheDocument();
	});

	describe('word cycling', () => {
		beforeEach(() => jest.useFakeTimers());
		afterEach(() => jest.useRealTimers());

		it('advances from "Developer" to "Engineer" after 5 seconds', () => {
			render(<CinematicHero />);
			expect(screen.getByText('Developer')).toBeInTheDocument();

			act(() => {
				jest.advanceTimersByTime(5000);
			});

			expect(screen.getByText('Engineer')).toBeInTheDocument();
		});

		it('cycles through all four words and wraps back to "Developer"', () => {
			render(<CinematicHero />);

			act(() => {
				jest.advanceTimersByTime(20000);
			});

			expect(screen.getByText('Developer')).toBeInTheDocument();
		});
	});
});
