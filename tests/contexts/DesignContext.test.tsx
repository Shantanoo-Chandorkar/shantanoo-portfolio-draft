import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DesignProvider, useDesignMode } from '@/contexts/DesignContext';
import { MockStorage } from '@/tests/mocks/storage';

// Test component to access design context
function DesignConsumer() {
	const { designMode, setDesignMode, isLoaded, hasChosen } = useDesignMode();
	return (
		<div>
			<span data-testid="design-mode">{String(designMode)}</span>
			<span data-testid="is-loaded">{String(isLoaded)}</span>
			<span data-testid="has-chosen">{String(hasChosen)}</span>
			<button onClick={() => setDesignMode('classic')}>Set Classic</button>
			<button onClick={() => setDesignMode('cinematic')}>Set Cinematic</button>
		</div>
	);
}

describe('DesignProvider', () => {
	it('reads design mode from localStorage on mount', () => {
		const mockStorage = new MockStorage({ 'design-mode': 'cinematic' });

		render(
			<DesignProvider storage={mockStorage}>
				<DesignConsumer />
			</DesignProvider>
		);

		expect(screen.getByTestId('design-mode')).toHaveTextContent('cinematic');
		expect(screen.getByTestId('has-chosen')).toHaveTextContent('true');
	});

	it('uses null when localStorage is empty', () => {
		const mockStorage = new MockStorage();

		render(
			<DesignProvider storage={mockStorage}>
				<DesignConsumer />
			</DesignProvider>
		);

		expect(screen.getByTestId('design-mode')).toHaveTextContent('null');
		expect(screen.getByTestId('has-chosen')).toHaveTextContent('false');
	});

	it('falls back to default mode when localStorage has invalid value', () => {
		const mockStorage = new MockStorage({ 'design-mode': 'invalid-mode' });

		render(
			<DesignProvider storage={mockStorage} defaultMode={null}>
				<DesignConsumer />
			</DesignProvider>
		);

		expect(screen.getByTestId('design-mode')).toHaveTextContent('null');
	});

	it('writes design mode to localStorage when set', async () => {
		const mockStorage = new MockStorage();

		render(
			<DesignProvider storage={mockStorage}>
				<DesignConsumer />
			</DesignProvider>
		);

		await userEvent.click(screen.getByText('Set Classic'));

		await waitFor(() => {
			expect(mockStorage.getItem('design-mode')).toBe('classic');
		});
		expect(screen.getByTestId('has-chosen')).toHaveTextContent('true');
	});

	it('sets isLoaded to true after initialization', () => {
		const mockStorage = new MockStorage();

		render(
			<DesignProvider storage={mockStorage}>
				<DesignConsumer />
			</DesignProvider>
		);

		expect(screen.getByTestId('is-loaded')).toHaveTextContent('true');
	});

	it('can switch between classic and cinematic modes', async () => {
		const mockStorage = new MockStorage();

		render(
			<DesignProvider storage={mockStorage}>
				<DesignConsumer />
			</DesignProvider>
		);

		await userEvent.click(screen.getByText('Set Classic'));
		expect(screen.getByTestId('design-mode')).toHaveTextContent('classic');

		await userEvent.click(screen.getByText('Set Cinematic'));
		expect(screen.getByTestId('design-mode')).toHaveTextContent('cinematic');
	});
});

describe('useDesignMode', () => {
	it('throws error when used outside DesignProvider', () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

		function TestComponent() {
			useDesignMode();
			return <div>Test</div>;
		}

		expect(() => render(<TestComponent />)).toThrow(
			'useDesignMode must be used within a DesignProvider'
		);

		consoleSpy.mockRestore();
	});
});
