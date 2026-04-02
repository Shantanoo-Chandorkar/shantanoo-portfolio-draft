/**
 * Tests for CinematicExperience.
 * Covers: section heading and experience entry content rendering.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { CinematicExperience } from '@/components/cinematic/CinematicExperience';
import { experiences } from '@/lib/data/experience';

describe('CinematicExperience', () => {
	it('renders the "Experience" section heading', () => {
		render(<CinematicExperience />);
		expect(screen.getByText('Experience')).toBeInTheDocument();
	});

	it('renders all experience entry positions', () => {
		render(<CinematicExperience />);
		for (const exp of experiences) {
			expect(screen.getAllByText(exp.position).length).toBeGreaterThan(0);
		}
	});

	it('renders all experience entry company names', () => {
		render(<CinematicExperience />);
		for (const exp of experiences) {
			expect(screen.getAllByText(exp.company).length).toBeGreaterThan(0);
		}
	});

	it('renders the first description bullet of the first entry', () => {
		render(<CinematicExperience />);
		const firstBullet = experiences[0].description[0];
		expect(screen.getAllByText(firstBullet).length).toBeGreaterThan(0);
	});

	it('renders technology badges for the first entry', () => {
		render(<CinematicExperience />);
		const firstTech = experiences[0].technologies[0];
		expect(screen.getAllByText(firstTech).length).toBeGreaterThan(0);
	});
});
