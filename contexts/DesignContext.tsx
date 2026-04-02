'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type DesignMode = 'classic' | 'cinematic';

interface DesignContextType {
	designMode: DesignMode | null;
	setDesignMode: (mode: DesignMode) => void;
	isLoaded: boolean;
	hasChosen: boolean;
}

interface StorageAdapter {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
}

const defaultStorage: StorageAdapter = {
	getItem: (key) => (typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null),
	setItem: (key, value) => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(key, value);
		}
	},
};

const DesignContext = createContext<DesignContextType | undefined>(undefined);

interface DesignProviderProps {
	children: ReactNode;
	storage?: StorageAdapter;
	defaultMode?: DesignMode | null;
}

/**
 * Provides design mode state and the setter to the component tree.
 * On mount, reads the saved design mode from storage. Only 'classic' and
 * 'cinematic' are accepted — any other stored value is discarded and the
 * default mode is used instead.
 * @param children - Child components that consume the design context
 * @param storage - Storage adapter for reading/writing the saved design mode (defaults to localStorage)
 * @param defaultMode - Design mode to use when no valid saved preference exists
 */
export function DesignProvider({
	children,
	storage = defaultStorage,
	defaultMode = null,
}: DesignProviderProps) {
	const [designMode, setDesignModeState] = useState<DesignMode | null>(defaultMode);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasChosen, setHasChosen] = useState(false);

	useEffect(() => {
		const saved = storage.getItem('design-mode') as DesignMode | null;
		if (saved === 'classic' || saved === 'cinematic') {
			setDesignModeState(saved);
			setHasChosen(true);
		} else {
			setDesignModeState(defaultMode);
		}
		setIsLoaded(true);
	}, [storage, defaultMode]);

	const setDesignMode = (mode: DesignMode) => {
		setDesignModeState(mode);
		setHasChosen(true);
		storage.setItem('design-mode', mode);
	};

	return (
		<DesignContext.Provider value={{ designMode, setDesignMode, isLoaded, hasChosen }}>
			{children}
		</DesignContext.Provider>
	);
}

/**
 * Returns the current design mode and the setter for changing it.
 * Must be called within a DesignProvider.
 * @throws {Error} When called outside of a DesignProvider
 * @returns The design context value: designMode, setDesignMode, isLoaded, and hasChosen
 */
export function useDesignMode() {
	const context = useContext(DesignContext);
	if (context === undefined) {
		throw new Error('useDesignMode must be used within a DesignProvider');
	}
	return context;
}
