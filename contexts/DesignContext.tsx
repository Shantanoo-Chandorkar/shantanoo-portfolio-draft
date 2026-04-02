'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type DesignMode = 'classic' | 'cinematic';

interface DesignContextType {
	designMode: DesignMode | null;
	setDesignMode: (mode: DesignMode) => void;
	isLoaded: boolean;
	hasChosen: boolean;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export function DesignProvider({ children }: { children: ReactNode }) {
	const [designMode, setDesignModeState] = useState<DesignMode | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasChosen, setHasChosen] = useState(false);

	useEffect(() => {
		const saved = localStorage.getItem('design-mode') as DesignMode | null;
		if (saved === 'classic' || saved === 'cinematic') {
			setDesignModeState(saved);
			setHasChosen(true);
		}
		setIsLoaded(true);
	}, []);

	const setDesignMode = (mode: DesignMode) => {
		setDesignModeState(mode);
		setHasChosen(true);
		localStorage.setItem('design-mode', mode);
	};

	return (
		<DesignContext.Provider value={{ designMode, setDesignMode, isLoaded, hasChosen }}>
			{children}
		</DesignContext.Provider>
	);
}

export function useDesignMode() {
	const context = useContext(DesignContext);
	if (context === undefined) {
		throw new Error('useDesignMode must be used within a DesignProvider');
	}
	return context;
}
