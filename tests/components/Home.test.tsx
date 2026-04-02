/**
 * Tests for the Home page (app/page.tsx).
 * Covers conditional rendering based on DesignMode context state.
 * All heavy child components are stubbed to keep tests focused on routing logic.
 */

import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/tests/test-utils';
import { MockStorage } from '@/tests/mocks/storage';
import Home from '@/app/page';

// Stub every child so the test only exercises the conditional branching in Home
jest.mock('@/components/HeroBanner', () => ({
	HeroBanner: () => <div data-testid="hero-banner" />,
}));
jest.mock('@/components/Projects', () => ({ Projects: () => <div data-testid="projects" /> }));
jest.mock('@/components/TechStack', () => ({ TechStack: () => <div data-testid="tech-stack" /> }));
jest.mock('@/components/About', () => ({ About: () => <div data-testid="about" /> }));
jest.mock('@/components/DownloadCV', () => ({
	DownloadCV: () => <div data-testid="download-cv" />,
}));
jest.mock('@/components/Contact', () => ({ Contact: () => <div data-testid="contact" /> }));
jest.mock('@/components/ThemeToggle', () => ({
	ThemeToggle: () => <div data-testid="theme-toggle" />,
}));
jest.mock('@/components/DecorativeElements', () => ({
	DecorativeElements: () => <div data-testid="decorative-elements" />,
}));
jest.mock('@/components/LandingChoice', () => ({
	LandingChoice: () => <div data-testid="landing-choice" />,
}));
jest.mock('@/components/DesignToggle', () => ({
	DesignToggle: () => <div data-testid="design-toggle" />,
}));
jest.mock('@/components/cinematic/CinematicHero', () => ({
	CinematicHero: () => <div data-testid="cinematic-hero" />,
}));
jest.mock('@/components/cinematic/StickyNavbar', () => ({
	StickyNavbar: () => <div data-testid="sticky-navbar" />,
}));
jest.mock('@/components/cinematic/CinematicExperience', () => ({
	CinematicExperience: () => <div data-testid="cinematic-experience" />,
}));
jest.mock('@/components/cinematic/CinematicProjects', () => ({
	CinematicProjects: () => <div data-testid="cinematic-projects" />,
}));
jest.mock('@/components/cinematic/CinematicTechStack', () => ({
	CinematicTechStack: () => <div data-testid="cinematic-tech-stack" />,
}));
jest.mock('@/components/cinematic/CinematicContact', () => ({
	CinematicContact: () => <div data-testid="cinematic-contact" />,
}));
jest.mock('@/components/cinematic/FloatingCVButton', () => ({
	FloatingCVButton: () => <div data-testid="floating-cv-button" />,
}));

describe('Home page', () => {
	describe('when no design mode has been chosen', () => {
		it('renders LandingChoice', () => {
			renderWithProviders(<Home />, { designMode: null });
			expect(screen.getByTestId('landing-choice')).toBeInTheDocument();
		});

		it('does not render ClassicView or CinematicView', () => {
			renderWithProviders(<Home />, { designMode: null });
			expect(screen.queryByTestId('hero-banner')).not.toBeInTheDocument();
			expect(screen.queryByTestId('cinematic-hero')).not.toBeInTheDocument();
		});

		it('does not render DesignToggle before a choice is made', () => {
			renderWithProviders(<Home />, { designMode: null });
			expect(screen.queryByTestId('design-toggle')).not.toBeInTheDocument();
		});
	});

	describe('when classic design is chosen', () => {
		it('renders the ClassicView components', () => {
			renderWithProviders(<Home />, { storage: new MockStorage({ 'design-mode': 'classic' }) });
			expect(screen.getByTestId('hero-banner')).toBeInTheDocument();
		});

		it('does not render CinematicView components', () => {
			renderWithProviders(<Home />, { storage: new MockStorage({ 'design-mode': 'classic' }) });
			expect(screen.queryByTestId('cinematic-hero')).not.toBeInTheDocument();
		});

		it('renders DesignToggle once a choice has been made', () => {
			renderWithProviders(<Home />, { storage: new MockStorage({ 'design-mode': 'classic' }) });
			expect(screen.getByTestId('design-toggle')).toBeInTheDocument();
		});
	});

	describe('when cinematic design is chosen', () => {
		it('renders the CinematicView components', () => {
			renderWithProviders(<Home />, { storage: new MockStorage({ 'design-mode': 'cinematic' }) });
			expect(screen.getByTestId('cinematic-hero')).toBeInTheDocument();
		});

		it('does not render ClassicView components', () => {
			renderWithProviders(<Home />, { storage: new MockStorage({ 'design-mode': 'cinematic' }) });
			expect(screen.queryByTestId('hero-banner')).not.toBeInTheDocument();
		});

		it('renders DesignToggle once a choice has been made', () => {
			renderWithProviders(<Home />, { storage: new MockStorage({ 'design-mode': 'cinematic' }) });
			expect(screen.getByTestId('design-toggle')).toBeInTheDocument();
		});
	});

	describe('always-visible elements', () => {
		it('renders ThemeToggle regardless of design mode', () => {
			renderWithProviders(<Home />, { designMode: 'classic' });
			expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
		});

		it('renders DecorativeElements regardless of design mode', () => {
			renderWithProviders(<Home />, { designMode: 'cinematic' });
			expect(screen.getByTestId('decorative-elements')).toBeInTheDocument();
		});
	});
});
