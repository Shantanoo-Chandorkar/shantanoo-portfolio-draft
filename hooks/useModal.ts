'use client';

import { useState, useEffect } from 'react';

export function useModal<T>() {
	const [selected, setSelected] = useState<T | null>(null);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setSelected(null);
		};
		if (selected) document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [selected]);

	const open = (item: T) => setSelected(item);
	const close = () => setSelected(null);

	return { selected, open, close };
}
