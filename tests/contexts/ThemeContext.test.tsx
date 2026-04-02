import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { MockStorage } from '@/tests/mocks/storage';
import { MockDOMAdapter } from '@/tests/mocks/dom';

// Test component to access theme context
function ThemeConsumer() {
	const { theme, toggleTheme } = useTheme();
	return (
		<div>
			<span data-testid="theme">{theme}</span>
			<button onClick={toggleTheme}>Toggle</button>
		</div>
	);
}

describe('ThemeProvider', () => {
	it('reads theme from localStorage on mount', () => {
		const mockStorage = new MockStorage({ theme: 'light' });
		const mockDOMAdapter = new MockDOMAdapter();

		render(
			<ThemeProvider storage={mockStorage} domAdapter={mockDOMAdapter}>
				<ThemeConsumer />
			</ThemeProvider>
		);

		expect(screen.getByTestId('theme')).toHaveTextContent('light');
	});

	it('uses default theme when localStorage is empty', () => {
		const mockStorage = new MockStorage();
		const mockDOMAdapter = new MockDOMAdapter();

		render(
			<ThemeProvider storage={mockStorage} domAdapter={mockDOMAdapter} defaultTheme="dark">
				<ThemeConsumer />
			</ThemeProvider>
		);

		expect(screen.getByTestId('theme')).toHaveTextContent('dark');
	});

	it('applies dark class to DOM when theme is dark', () => {
		const mockStorage = new MockStorage();
		const mockDOMAdapter = new MockDOMAdapter();

		render(
			<ThemeProvider storage={mockStorage} domAdapter={mockDOMAdapter} defaultTheme="dark">
				<ThemeConsumer />
			</ThemeProvider>
		);

		expect(mockDOMAdapter.hasClass('dark')).toBe(true);
	});

	it('does not apply dark class when theme is light', () => {
		const mockStorage = new MockStorage({ theme: 'light' });
		const mockDOMAdapter = new MockDOMAdapter();

		render(
			<ThemeProvider storage={mockStorage} domAdapter={mockDOMAdapter}>
				<ThemeConsumer />
			</ThemeProvider>
		);

		expect(mockDOMAdapter.hasClass('dark')).toBe(false);
	});

	it('writes theme to localStorage when toggled', async () => {
		const mockStorage = new MockStorage({ theme: 'dark' });
		const mockDOMAdapter = new MockDOMAdapter(['dark']);

		render(
			<ThemeProvider storage={mockStorage} domAdapter={mockDOMAdapter}>
				<ThemeConsumer />
			</ThemeProvider>
		);

		await userEvent.click(screen.getByText('Toggle'));

		await waitFor(() => {
			expect(mockStorage.getItem('theme')).toBe('light');
		});
	});

	it('toggles theme class in DOM', async () => {
		const mockStorage = new MockStorage({ theme: 'dark' });
		const mockDOMAdapter = new MockDOMAdapter(['dark']);

		render(
			<ThemeProvider storage={mockStorage} domAdapter={mockDOMAdapter}>
				<ThemeConsumer />
			</ThemeProvider>
		);

		expect(mockDOMAdapter.hasClass('dark')).toBe(true);

		await userEvent.click(screen.getByText('Toggle'));

		await waitFor(() => {
			expect(mockDOMAdapter.hasClass('dark')).toBe(false);
		});
	});
});

describe('useTheme', () => {
	it('throws error when used outside ThemeProvider', () => {
		// Suppress console.error for this test
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

		function TestComponent() {
			useTheme();
			return <div>Test</div>;
		}

		expect(() => render(<TestComponent />)).toThrow('useTheme must be used within a ThemeProvider');

		consoleSpy.mockRestore();
	});
});
