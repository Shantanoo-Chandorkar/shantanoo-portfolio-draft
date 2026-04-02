/**
 * Mock DOM adapter for testing classList operations.
 * Tracks class changes without touching the real DOM.
 */
export class MockDOMAdapter {
	public classes: Set<string>;

	constructor(initialClasses: string[] = []) {
		this.classes = new Set(initialClasses);
	}

	addClass(className: string): void {
		this.classes.add(className);
	}

	removeClass(className: string): void {
		this.classes.delete(className);
	}

	hasClass(className: string): boolean {
		return this.classes.has(className);
	}

	getClasses(): string[] {
		return Array.from(this.classes);
	}

	clear(): void {
		this.classes.clear();
	}
}

/**
 * Creates a fresh mock DOM adapter for tests.
 */
export function createMockDOMAdapter(initialClasses: string[] = []): MockDOMAdapter {
	return new MockDOMAdapter(initialClasses);
}
