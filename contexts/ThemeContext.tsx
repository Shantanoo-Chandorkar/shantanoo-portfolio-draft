'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}

interface StorageAdapter {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
}

interface DOMAdapter {
	addClass(className: string): void;
	removeClass(className: string): void;
}

const defaultStorage: StorageAdapter = {
	getItem: (key) => (typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null),
	setItem: (key, value) => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(key, value);
		}
	},
};

const defaultDOMAdapter: DOMAdapter = {
	addClass: (className) => {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.add(className);
		}
	},
	removeClass: (className) => {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.remove(className);
		}
	},
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
	children: ReactNode;
	storage?: StorageAdapter;
	domAdapter?: DOMAdapter;
	defaultTheme?: Theme;
}

/**
 * Provides theme state and controls to the component tree.
 * On mount, reads the saved theme from storage or falls back to the user's
 * OS preference. Writes the active theme to storage and the DOM on change.
 * @param children - Child components that consume the theme context
 * @param storage - Storage adapter for reading/writing the saved theme (defaults to localStorage)
 * @param domAdapter - DOM adapter for applying/removing the dark class (defaults to document.documentElement)
 * @param defaultTheme - Theme to use when no saved preference exists and OS preference is unavailable
 */
export function ThemeProvider({
	children,
	storage = defaultStorage,
	domAdapter = defaultDOMAdapter,
	defaultTheme = 'dark',
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(defaultTheme);

	// On mount, check user's preference or saved theme
	useEffect(() => {
		const prefersDarkMode =
			typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
		const saved = storage.getItem('theme');
		// Guard against arbitrary strings written to localStorage by third parties
		const validTheme: Theme | null = saved === 'light' || saved === 'dark' ? saved : null;
		setTheme(validTheme ?? (prefersDarkMode ? 'dark' : defaultTheme));
	}, [storage, defaultTheme]);

	// Update storage and DOM when theme changes
	useEffect(() => {
		storage.setItem('theme', theme);

		if (theme === 'dark') {
			domAdapter.addClass('dark');
		} else {
			domAdapter.removeClass('dark');
		}
	}, [theme, storage, domAdapter]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
	);
}

/**
 * Returns the current theme and controls for toggling or setting it explicitly.
 * Must be called within a ThemeProvider.
 * @throws {Error} When called outside of a ThemeProvider
 * @returns The theme context value: theme, setTheme, and toggleTheme
 */
export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
}
