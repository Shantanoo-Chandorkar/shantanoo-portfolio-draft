/**
 * Tests for HeroBanner.
 * Verifies the content users see and interact with — name, title, social links,
 * location, bio, and timed word cycling. Animation and layout details are not tested.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { HeroBanner } from '@/components/HeroBanner';

// Override the global framer-motion mock to add useInView.
// IntersectionObserver is not available in jsdom, so useInView must be stubbed.
jest.mock('framer-motion', () => ({
	motion: {
		div: 'div',
		section: 'section',
		a: 'a',
		span: 'span',
		p: 'p',
	},
	AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
	useInView: () => true,
}));

describe('HeroBanner', () => {
	it('renders the full name as screen-reader text', () => {
		render(<HeroBanner />);
		expect(screen.getByText('Shantanoo Chandorkar')).toBeInTheDocument();
	});

	it('renders the "Software" title prefix', () => {
		render(<HeroBanner />);
		// The title element contains "Software" as a text node alongside the cycling word
		expect(screen.getByText(/Software/)).toBeInTheDocument();
	});

	it('renders the initial cycling word "Developer"', () => {
		render(<HeroBanner />);
		expect(screen.getByText('Developer')).toBeInTheDocument();
	});

	it('renders the location', () => {
		render(<HeroBanner />);
		expect(screen.getByText('Mumbai, India')).toBeInTheDocument();
	});

	it('renders the profile image with correct alt text', () => {
		render(<HeroBanner />);
		expect(screen.getByAltText('Shantanoo Chandorkar profile photo')).toBeInTheDocument();
	});

	it('renders all social link anchors with aria-labels', () => {
		render(<HeroBanner />);

		const expectedLabels = [
			"Visit Shantanoo Chandorkar's GitHub Profile",
			"Visit Shantanoo Chandorkar's LeetCode Profile",
			"Visit Shantanoo Chandorkar's LinkedIn Profile",
			"Visit Shantanoo Chandorkar's HackerRank Profile",
			"Visit Shantanoo Chandorkar's GeeksForGeeks Profile",
		];

		for (const label of expectedLabels) {
			expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
		}
	});

	it('renders the bio text', () => {
		render(<HeroBanner />);
		expect(screen.getByText(/Full-stack developer specializing in React/)).toBeInTheDocument();
	});

	describe('word cycling', () => {
		beforeEach(() => {
			jest.useFakeTimers();
		});

		afterEach(() => {
			jest.useRealTimers();
		});

		it('advances from "Developer" to "Engineer" after 5 seconds', () => {
			render(<HeroBanner />);
			expect(screen.getByText('Developer')).toBeInTheDocument();

			act(() => {
				jest.advanceTimersByTime(5000);
			});

			expect(screen.getByText('Engineer')).toBeInTheDocument();
		});

		it('cycles through all four words and wraps back to "Developer"', () => {
			render(<HeroBanner />);

			act(() => {
				jest.advanceTimersByTime(20000);
			});

			expect(screen.getByText('Developer')).toBeInTheDocument();
		});
	});
});
