/**
 * Tests for the Button primitive (components/ui/button.tsx).
 * Covers all variants, all sizes, disabled state, asChild, and accessibility.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/button';

describe('Button', () => {
	describe('variants', () => {
		it('renders the default variant', () => {
			render(<Button>Click me</Button>);
			expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
		});

		it('renders the destructive variant', () => {
			render(<Button variant="destructive">Delete</Button>);
			const btn = screen.getByRole('button', { name: 'Delete' });
			expect(btn.className).toMatch(/destructive/);
		});

		it('renders the outline variant', () => {
			render(<Button variant="outline">Outline</Button>);
			const btn = screen.getByRole('button', { name: 'Outline' });
			expect(btn.className).toMatch(/outline/);
		});

		it('renders the secondary variant', () => {
			render(<Button variant="secondary">Secondary</Button>);
			const btn = screen.getByRole('button', { name: 'Secondary' });
			expect(btn.className).toMatch(/secondary/);
		});

		it('renders the ghost variant', () => {
			render(<Button variant="ghost">Ghost</Button>);
			const btn = screen.getByRole('button', { name: 'Ghost' });
			// ghost applies hover utilities rather than a background — no bg- class on idle state
			expect(btn.className).toMatch(/hover:bg-accent/);
		});

		it('renders the link variant', () => {
			render(<Button variant="link">Link</Button>);
			const btn = screen.getByRole('button', { name: 'Link' });
			expect(btn.className).toMatch(/underline-offset-4/);
		});
	});

	describe('sizes', () => {
		it('renders the default size', () => {
			render(<Button size="default">Default</Button>);
			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		it('renders the sm size', () => {
			render(<Button size="sm">Small</Button>);
			const btn = screen.getByRole('button');
			expect(btn.className).toMatch(/h-9/);
		});

		it('renders the lg size', () => {
			render(<Button size="lg">Large</Button>);
			const btn = screen.getByRole('button');
			expect(btn.className).toMatch(/h-11/);
		});

		it('renders the icon size', () => {
			render(<Button size="icon" aria-label="icon action" />);
			const btn = screen.getByRole('button');
			expect(btn.className).toMatch(/h-10 w-10/);
		});
	});

	describe('disabled state', () => {
		it('is disabled when the disabled prop is set', () => {
			render(<Button disabled>Disabled</Button>);
			expect(screen.getByRole('button')).toBeDisabled();
		});

		it('does not fire onClick when disabled', async () => {
			const user = userEvent.setup();
			const onClick = jest.fn();
			render(
				<Button disabled onClick={onClick}>
					Disabled
				</Button>
			);
			await user.click(screen.getByRole('button'));
			expect(onClick).not.toHaveBeenCalled();
		});
	});

	describe('asChild prop', () => {
		it('renders as an anchor element when asChild is used with an <a>', () => {
			render(
				<Button asChild>
					<a href="/test">Link button</a>
				</Button>
			);
			const link = screen.getByRole('link', { name: 'Link button' });
			expect(link).toBeInTheDocument();
			expect(link.tagName).toBe('A');
		});
	});

	describe('accessibility', () => {
		it('passes through aria-label', () => {
			render(<Button aria-label="Close dialog" />);
			expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
		});

		it('has a visible focus ring class', () => {
			render(<Button>Focus me</Button>);
			const btn = screen.getByRole('button');
			expect(btn.className).toMatch(/focus-visible:ring/);
		});

		it('forwards a ref to the underlying element', () => {
			const ref = React.createRef<HTMLButtonElement>();
			render(<Button ref={ref}>Ref button</Button>);
			expect(ref.current).not.toBeNull();
			expect(ref.current?.tagName).toBe('BUTTON');
		});
	});
});
