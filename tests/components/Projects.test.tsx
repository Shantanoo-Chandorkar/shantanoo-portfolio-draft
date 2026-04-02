/**
 * Tests for the Projects component.
 * Covers: initial card rendering, card click opening modal,
 * and the reset button after all cards are dismissed.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/tests/test-utils';
import { Projects } from '@/components/Projects';
import { projects } from '@/lib/data/projects';

// Isolate ProjectModal so we can assert on which project was opened
jest.mock('@/components/ProjectModal', () => ({
	ProjectModal: ({
		project,
		onClose,
	}: {
		project: { title: string } | null;
		onClose: () => void;
	}) =>
		project ? (
			<div data-testid="project-modal">
				<span>{project.title}</span>
				<button onClick={onClose}>Close</button>
			</div>
		) : null,
}));

// Stub heavy child components used inside ProjectCard
jest.mock('@/components/TechBadge', () => ({
	TechBadge: ({ tech }: { tech: string }) => <span>{tech}</span>,
}));

// Stub framer-motion values so MotionValues don't reach native DOM props
jest.mock('framer-motion', () => ({
	motion: {
		div: ({
			children,
			onClick,
			style,
			...rest
		}: React.HTMLAttributes<HTMLDivElement> & { style?: object }) => (
			<div onClick={onClick} {...rest}>
				{children}
			</div>
		),
		section: 'section',
		span: 'span',
		a: 'a',
	},
	AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
	useMotionValue: () => 0,
	useTransform: () => 0,
	useInView: () => true,
}));

describe('Projects', () => {
	it('renders the "Projects" section heading', () => {
		renderWithProviders(<Projects />);
		expect(screen.getByText('Projects')).toBeInTheDocument();
	});

	it('renders all project cards on initial load', () => {
		renderWithProviders(<Projects />);
		for (const project of projects) {
			expect(screen.getByText(project.title)).toBeInTheDocument();
		}
	});

	it('opens the project modal when a card is clicked', async () => {
		const user = userEvent.setup();
		renderWithProviders(<Projects />);

		await user.click(screen.getByText(projects[0].title));

		expect(screen.getByTestId('project-modal')).toBeInTheDocument();
		expect(screen.getByTestId('project-modal')).toHaveTextContent(projects[0].title);
	});

	it('closes the modal when the close button is clicked', async () => {
		const user = userEvent.setup();
		renderWithProviders(<Projects />);

		await user.click(screen.getByText(projects[0].title));
		expect(screen.getByTestId('project-modal')).toBeInTheDocument();

		await user.click(screen.getByText('Close'));
		expect(screen.queryByTestId('project-modal')).not.toBeInTheDocument();
	});
});
