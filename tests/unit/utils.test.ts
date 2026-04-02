import { cn } from '@/lib/utils';

describe('cn', () => {
	it('merges multiple class strings', () => {
		expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz');
	});

	it('handles falsy conditional classes', () => {
		expect(cn('foo', false && 'bar', null && 'baz')).toBe('foo');
	});

	it('handles truthy conditional classes', () => {
		expect(cn('foo', true && 'bar')).toBe('foo bar');
	});

	it('resolves conflicting Tailwind classes', () => {
		// tailwind-merge should keep the last conflicting class
		expect(cn('px-2', 'px-4')).toBe('px-4');
		expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
	});

	it('returns empty string for empty call', () => {
		expect(cn()).toBe('');
	});

	it('handles undefined and null values', () => {
		expect(cn(undefined, null, 'foo')).toBe('foo');
		expect(cn(null)).toBe('');
		expect(cn(undefined)).toBe('');
	});

	it('handles arrays of classes', () => {
		expect(cn(['foo', 'bar'])).toBe('foo bar');
	});

	it('handles nested arrays', () => {
		expect(cn(['foo', ['bar', 'baz']])).toBe('foo bar baz');
	});

	it('handles objects with boolean values', () => {
		expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
	});

	it('combines different input types', () => {
		expect(cn('foo', ['bar'], { baz: true, qux: false })).toBe('foo bar baz');
	});
});
