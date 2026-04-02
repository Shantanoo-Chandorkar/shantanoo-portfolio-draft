import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { DesignProvider } from '@/contexts/DesignContext';
import { MockStorage } from './mocks/storage';
import { MockDOMAdapter } from './mocks/dom';

interface TestProvidersProps {
	children: ReactNode;
	theme?: 'light' | 'dark';
	designMode?: 'classic' | 'cinematic' | null;
	storage?: MockStorage;
	domAdapter?: MockDOMAdapter;
}

/**
 * Wrapper component that provides all necessary context providers for tests.
 */
function TestProviders({
	children,
	theme = 'dark',
	designMode = null,
	storage,
	domAdapter,
}: TestProvidersProps) {
	// Create mock adapters if not provided
	const mockStorage = storage || new MockStorage();
	const mockDOMAdapter = domAdapter || new MockDOMAdapter();

	return (
		<ThemeProvider storage={mockStorage} domAdapter={mockDOMAdapter} defaultTheme={theme}>
			<DesignProvider storage={mockStorage} defaultMode={designMode}>
				{children}
			</DesignProvider>
		</ThemeProvider>
	);
}

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
	theme?: 'light' | 'dark';
	designMode?: 'classic' | 'cinematic' | null;
	storage?: MockStorage;
	domAdapter?: MockDOMAdapter;
}

/**
 * Renders a component with all necessary providers.
 * Use this instead of render() directly in your tests.
 */
export function renderWithProviders(
	ui: ReactElement,
	{
		theme = 'dark',
		designMode = null,
		storage,
		domAdapter,
		...renderOptions
	}: RenderWithProvidersOptions = {}
) {
	function Wrapper({ children }: { children: ReactNode }) {
		return (
			<TestProviders theme={theme} designMode={designMode} storage={storage} domAdapter={domAdapter}>
				{children}
			</TestProviders>
		);
	}

	return { renderResult: render(ui, { wrapper: Wrapper, ...renderOptions }), storage, domAdapter };
}

export { TestProviders };
