import { renderHook, act } from '@testing-library/react';
import { useModal } from '@/hooks/useModal';

describe('useModal', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('initializes with null selected item', () => {
		const { result } = renderHook(() => useModal<string>());

		expect(result.current.selected).toBeNull();
	});

	it('opens modal with selected item', () => {
		const { result } = renderHook(() => useModal<string>());

		act(() => {
			result.current.open('test-item');
		});

		expect(result.current.selected).toBe('test-item');
	});

	it('closes modal', () => {
		const { result } = renderHook(() => useModal<string>());

		act(() => {
			result.current.open('test-item');
		});

		expect(result.current.selected).toBe('test-item');

		act(() => {
			result.current.close();
		});

		expect(result.current.selected).toBeNull();
	});

	it('closes modal when Escape key is pressed', () => {
		const { result } = renderHook(() => useModal<string>());

		// Open modal
		act(() => {
			result.current.open('test-item');
		});

		expect(result.current.selected).toBe('test-item');

		// Simulate Escape key press
		act(() => {
			const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
			document.dispatchEvent(escapeEvent);
		});

		expect(result.current.selected).toBeNull();
	});

	it('does not close modal when other keys are pressed', () => {
		const { result } = renderHook(() => useModal<string>());

		// Open modal
		act(() => {
			result.current.open('test-item');
		});

		expect(result.current.selected).toBe('test-item');

		// Simulate other key press
		act(() => {
			const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
			document.dispatchEvent(enterEvent);
		});

		expect(result.current.selected).toBe('test-item');
	});

	it('can select different items', () => {
		const { result } = renderHook(() => useModal<number>());

		act(() => {
			result.current.open(1);
		});
		expect(result.current.selected).toBe(1);

		act(() => {
			result.current.open(2);
		});
		expect(result.current.selected).toBe(2);

		act(() => {
			result.current.open(3);
		});
		expect(result.current.selected).toBe(3);
	});
});
