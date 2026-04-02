import { renderHook, act } from '@testing-library/react';
import { useRef } from 'react';
import { useOrbitRadius } from '@/hooks/useOrbitRadius';

describe('useOrbitRadius', () => {
	it('returns the default radius of 200 when the ref has no element', () => {
		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement>(null);
			const radius = useOrbitRadius(ref);
			return radius;
		});

		expect(result.current).toBe(200);
	});

	it('computes radius from the container width on mount', () => {
		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement>(null);

			// Simulate a mounted element with a known offsetWidth
			Object.defineProperty(ref, 'current', {
				get: () => ({ offsetWidth: 400 }),
				configurable: true,
			});

			return useOrbitRadius(ref);
		});

		// With size=400, iconSize=48, offset=400*0.06=24: (400-48)/2 + 24 = 176 + 24 = 200
		expect(result.current).toBe(200);
	});

	it('updates the radius when a resize event fires', () => {
		let containerWidth = 400;

		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement>(null);

			Object.defineProperty(ref, 'current', {
				get: () => ({ offsetWidth: containerWidth }),
				configurable: true,
			});

			return useOrbitRadius(ref);
		});

		act(() => {
			containerWidth = 320;
			window.dispatchEvent(new Event('resize'));
		});

		// With size=320, iconSize=48, offset=320*0.06=19.2: (320-48)/2 + 19.2 = 136 + 19.2 = 155.2
		expect(result.current).toBeCloseTo(155.2);
	});

	it('removes the resize listener on unmount', () => {
		const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

		const { unmount } = renderHook(() => {
			const ref = useRef<HTMLDivElement>(null);
			return useOrbitRadius(ref);
		});

		unmount();

		expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
		removeEventListenerSpy.mockRestore();
	});
});
