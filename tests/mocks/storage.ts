/**
 * In-memory mock storage adapter for testing.
 * Implements the Storage interface without touching real localStorage.
 */
export class MockStorage implements Storage {
	private store: Map<string, string>;

	constructor(initialData: Record<string, string> = {}) {
		this.store = new Map(Object.entries(initialData));
	}

	get length(): number {
		return this.store.size;
	}

	clear(): void {
		this.store.clear();
	}

	getItem(key: string): string | null {
		return this.store.get(key) ?? null;
	}

	setItem(key: string, value: string): void {
		this.store.set(key, value);
	}

	removeItem(key: string): void {
		this.store.delete(key);
	}

	key(index: number): string | null {
		const keys = Array.from(this.store.keys());
		return keys[index] ?? null;
	}

	// Helper to set initial state for tests
	setStore(data: Record<string, string>): void {
		this.store.clear();
		Object.entries(data).forEach(([key, value]) => {
			this.store.set(key, value);
		});
	}

	// Helper to get all stored data
	getStore(): Record<string, string> {
		return Object.fromEntries(this.store);
	}
}

/**
 * Creates a fresh mock storage instance for tests.
 */
export function createMockStorage(initialData: Record<string, string> = {}): MockStorage {
	return new MockStorage(initialData);
}
