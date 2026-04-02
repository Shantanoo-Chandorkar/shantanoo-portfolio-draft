/**
 * Tests for ContactFormPanel.
 * Covers the three visible form states: idle, loading, success, and error.
 */

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/tests/test-utils';
import { ContactFormPanel } from '@/components/ContactFormPanel';

const mockHandleSubmit = jest.fn((e: React.FormEvent) => e.preventDefault());
const mockHandleInputChange = jest.fn();
const mockUseContactForm = jest.fn();

jest.mock('@/hooks/useContactForm', () => ({
	useContactForm: (...args: unknown[]) => mockUseContactForm(...args),
}));

const baseFormState = {
	formData: { name: '', email: '', subject: '', message: '' },
	isSubmitting: false,
	isSubmitted: false,
	error: null,
	handleInputChange: mockHandleInputChange,
	handleSubmit: mockHandleSubmit,
};

describe('ContactFormPanel', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockUseContactForm.mockReturnValue(baseFormState);
	});

	describe('idle state', () => {
		it('renders all form fields', () => {
			renderWithProviders(<ContactFormPanel />);
			expect(screen.getByLabelText('Name *')).toBeInTheDocument();
			expect(screen.getByLabelText('Email *')).toBeInTheDocument();
			expect(screen.getByLabelText('Subject *')).toBeInTheDocument();
			expect(screen.getByLabelText('Message *')).toBeInTheDocument();
		});

		it('renders the submit button with "Send Message" label', () => {
			renderWithProviders(<ContactFormPanel />);
			expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
		});

		it('renders contact info section', () => {
			renderWithProviders(<ContactFormPanel />);
			expect(screen.getByText('Contact Information')).toBeInTheDocument();
		});

		it('renders social follow links', () => {
			renderWithProviders(<ContactFormPanel />);
			expect(
				screen.getByRole('link', { name: /shantanoo chandorkar's github profile/i })
			).toBeInTheDocument();
			expect(
				screen.getByRole('link', { name: /shantanoo chandorkar's linkedin profile/i })
			).toBeInTheDocument();
		});
	});

	describe('loading state', () => {
		it('renders "Sending..." in the submit button when submitting', () => {
			mockUseContactForm.mockReturnValue({ ...baseFormState, isSubmitting: true });
			renderWithProviders(<ContactFormPanel />);
			expect(screen.getByRole('button', { name: /sending/i })).toBeInTheDocument();
		});

		it('disables the submit button while submitting', () => {
			mockUseContactForm.mockReturnValue({ ...baseFormState, isSubmitting: true });
			renderWithProviders(<ContactFormPanel />);
			expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
		});
	});

	describe('success state', () => {
		it('renders the success message after submission', () => {
			mockUseContactForm.mockReturnValue({ ...baseFormState, isSubmitted: true });
			renderWithProviders(<ContactFormPanel />);
			expect(screen.getByText('Message Sent!')).toBeInTheDocument();
		});

		it('hides the form after successful submission', () => {
			mockUseContactForm.mockReturnValue({ ...baseFormState, isSubmitted: true });
			renderWithProviders(<ContactFormPanel />);
			expect(screen.queryByRole('button', { name: /send message/i })).not.toBeInTheDocument();
		});
	});

	describe('error state', () => {
		it('renders the error message when an error is present', () => {
			mockUseContactForm.mockReturnValue({
				...baseFormState,
				error: 'Failed to send. Please try again.',
			});
			renderWithProviders(<ContactFormPanel />);
			expect(screen.getByText('Failed to send. Please try again.')).toBeInTheDocument();
		});

		it('keeps the form visible when an error is present', () => {
			mockUseContactForm.mockReturnValue({
				...baseFormState,
				error: 'Something went wrong.',
			});
			renderWithProviders(<ContactFormPanel />);
			expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
		});
	});
});
