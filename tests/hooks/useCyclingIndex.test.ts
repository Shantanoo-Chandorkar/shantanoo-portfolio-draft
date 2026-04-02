import { renderHook, act } from '@testing-library/react';
import { useCyclingIndex } from '@/hooks/useCyclingIndex';

describe('useCyclingIndex', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('initialises at index 0', () => {
		const { result } = renderHook(() => useCyclingIndex(3, 1000));
		expect(result.current).toBe(0);
	});

	it('advances to the next index after the interval', () => {
		const { result } = renderHook(() => useCyclingIndex(3, 1000));

		act(() => {
			jest.advanceTimersByTime(1000);
		});

		expect(result.current).toBe(1);
	});

	it('wraps back to 0 after the last index', () => {
		const { result } = renderHook(() => useCyclingIndex(3, 1000));

		act(() => {
			jest.advanceTimersByTime(3000);
		});

		expect(result.current).toBe(0);
	});

	it('does not advance when length is 1', () => {
		const { result } = renderHook(() => useCyclingIndex(1, 1000));

		act(() => {
			jest.advanceTimersByTime(5000);
		});

		expect(result.current).toBe(0);
	});

	it('does not advance when length is 0', () => {
		const { result } = renderHook(() => useCyclingIndex(0, 1000));

		act(() => {
			jest.advanceTimersByTime(5000);
		});

		expect(result.current).toBe(0);
	});

	it('clears the interval on unmount', () => {
		const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
		const { unmount } = renderHook(() => useCyclingIndex(3, 1000));

		unmount();

		expect(clearIntervalSpy).toHaveBeenCalled();
		clearIntervalSpy.mockRestore();
	});
});
