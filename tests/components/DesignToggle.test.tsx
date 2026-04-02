/**
 * Tests for DesignToggle.
 * Covers: aria-label, toggle callback direction, and variant rendering.
 */

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DesignToggle } from '@/components/DesignToggle';
import { renderWithProviders } from '@/tests/test-utils';
import { MockStorage } from '@/tests/mocks/storage';

describe('DesignToggle', () => {
	describe('in classic mode', () => {
		it('labels the button as switching to cinematic', () => {
			renderWithProviders(<DesignToggle />, { designMode: 'classic' });
			expect(screen.getByRole('button', { name: /switch to cinematic design/i })).toBeInTheDocument();
		});

		it('calls setDesignMode with "cinematic" on click', async () => {
			const user = userEvent.setup();
			const storage = new MockStorage({ 'design-mode': 'classic' });
			renderWithProviders(<DesignToggle />, { storage });

			await user.click(screen.getByRole('button', { name: /switch to cinematic design/i }));

			expect(storage.getItem('design-mode')).toBe('cinematic');
		});
	});

	describe('in cinematic mode', () => {
		it('labels the button as switching to classic', () => {
			renderWithProviders(<DesignToggle />, { designMode: 'cinematic' });
			expect(screen.getByRole('button', { name: /switch to classic design/i })).toBeInTheDocument();
		});

		it('calls setDesignMode with "classic" on click', async () => {
			const user = userEvent.setup();
			const storage = new MockStorage({ 'design-mode': 'cinematic' });
			renderWithProviders(<DesignToggle />, { storage });

			await user.click(screen.getByRole('button', { name: /switch to classic design/i }));

			expect(storage.getItem('design-mode')).toBe('classic');
		});
	});

	describe('variant prop', () => {
		it('renders the fixed wrapper by default', () => {
			const { container } = renderWithProviders(<DesignToggle />, {
				designMode: 'classic',
			}).renderResult;
			// The fixed variant wraps the button in a positioned div
			expect(container.querySelector('.fixed')).toBeInTheDocument();
		});

		it('renders just the button when variant is "navbar"', () => {
			const { container } = renderWithProviders(<DesignToggle variant="navbar" />, {
				designMode: 'classic',
			}).renderResult;
			expect(container.querySelector('.fixed')).not.toBeInTheDocument();
			expect(screen.getByRole('button', { name: /switch to cinematic design/i })).toBeInTheDocument();
		});
	});
});
