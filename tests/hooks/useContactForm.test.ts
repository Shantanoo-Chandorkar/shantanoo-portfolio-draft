import { renderHook, waitFor, act } from '@testing-library/react';
import { useContactForm } from '@/hooks/useContactForm';

jest.mock('@/lib/contact-service');

import { submitContactForm } from '@/lib/contact-service';
const mockSubmit = submitContactForm as jest.MockedFunction<typeof submitContactForm>;

describe('useContactForm', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('initializes with empty form state', () => {
		const { result } = renderHook(() => useContactForm());

		expect(result.current.formData).toEqual({
			name: '',
			email: '',
			subject: '',
			message: '',
		});
		expect(result.current.isSubmitting).toBe(false);
		expect(result.current.isSubmitted).toBe(false);
		expect(result.current.error).toBe('');
	});

	it('handles input changes', () => {
		const { result } = renderHook(() => useContactForm());

		const mockEvent = {
			target: { name: 'name', value: 'John Doe' },
		} as React.ChangeEvent<HTMLInputElement>;

		act(() => {
			result.current.handleInputChange(mockEvent);
		});

		expect(result.current.formData.name).toBe('John Doe');
		expect(result.current.error).toBe('');
	});

	it('clears an existing error when the user types', async () => {
		const { result } = renderHook(() => useContactForm());

		// Inject an error state by simulating a failed submit
		mockSubmit.mockRejectedValueOnce(new Error('Server error'));

		await act(async () => {
			await result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
		});

		// Type in a field — error should clear
		act(() => {
			result.current.handleInputChange({
				target: { name: 'name', value: 'Jane' },
			} as React.ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.error).toBe('');
	});

	it('successfully submits form and resets after delay', async () => {
		jest.useFakeTimers();

		mockSubmit.mockResolvedValueOnce(undefined);

		const { result } = renderHook(() => useContactForm());

		act(() => {
			result.current.handleInputChange({
				target: { name: 'name', value: 'John' },
			} as React.ChangeEvent<HTMLInputElement>);
		});
		act(() => {
			result.current.handleInputChange({
				target: { name: 'email', value: 'john@example.com' },
			} as React.ChangeEvent<HTMLInputElement>);
		});
		act(() => {
			result.current.handleInputChange({
				target: { name: 'subject', value: 'Test' },
			} as React.ChangeEvent<HTMLInputElement>);
		});
		act(() => {
			result.current.handleInputChange({
				target: { name: 'message', value: 'Hello' },
			} as React.ChangeEvent<HTMLTextAreaElement>);
		});

		await act(async () => {
			result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
		});

		expect(result.current.isSubmitting).toBe(false);
		expect(result.current.isSubmitted).toBe(true);

		expect(mockSubmit).toHaveBeenCalledWith(
			{ name: 'John', email: 'john@example.com', subject: 'Test', message: 'Hello' },
			'/api/send-email'
		);

		act(() => {
			jest.runOnlyPendingTimers();
		});

		await waitFor(() => {
			expect(result.current.isSubmitted).toBe(false);
			expect(result.current.formData).toEqual({ name: '', email: '', subject: '', message: '' });
		});

		jest.useRealTimers();
	});

	it('sets error state on API error response', async () => {
		mockSubmit.mockRejectedValueOnce(new Error('Server error'));

		const { result } = renderHook(() => useContactForm());

		await act(async () => {
			await result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
		});

		expect(result.current.error).toBe('Server error');
	});

	it('sets error state on network failure', async () => {
		mockSubmit.mockRejectedValueOnce(new Error('Network error'));

		const { result } = renderHook(() => useContactForm());

		await act(async () => {
			await result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
		});

		expect(result.current.error).toBe('Network error');
	});

	it('shows generic error message when thrown value is not an Error', async () => {
		mockSubmit.mockRejectedValueOnce('unexpected');

		const { result } = renderHook(() => useContactForm());

		await act(async () => {
			await result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
		});

		expect(result.current.error).toBe('Failed to send email. Please try again.');
	});

	it('passes a custom endpoint to the service', async () => {
		mockSubmit.mockResolvedValueOnce(undefined);

		const { result } = renderHook(() => useContactForm('/api/custom-endpoint'));

		await act(async () => {
			result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
		});

		expect(mockSubmit).toHaveBeenCalledWith(expect.any(Object), '/api/custom-endpoint');
	});
});
