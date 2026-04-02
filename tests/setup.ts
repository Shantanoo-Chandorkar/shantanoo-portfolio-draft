// Jest setup file
import '@testing-library/jest-dom';

// Mock window.matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
	useRouter() {
		return {
			push: jest.fn(),
			replace: jest.fn(),
			prefetch: jest.fn(),
			back: jest.fn(),
		};
	},
	usePathname() {
		return '/';
	},
	useSearchParams() {
		return new URLSearchParams();
	},
}));

// Mock next/server for API route testing
jest.mock('next/server', () => ({
	NextResponse: {
		json: (data: unknown, init?: ResponseInit) => {
			return {
				json: async () => data,
				status: init?.status || 200,
				ok: init?.status ? init.status >= 200 && init.status < 300 : true,
			};
		},
	},
	NextRequest: jest.fn().mockImplementation((body: unknown) => ({
		json: async () => body,
	})),
}));

// Mock framer-motion to avoid animation issues in tests.
// motion.* components are replaced with functional components that strip
// Framer Motion-specific props before forwarding to the DOM — preventing
// React's "unrecognized prop" warnings when string tags were used instead.
jest.mock('framer-motion', () => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const React = require('react');

	// Props that are only meaningful to Framer Motion and must not reach the DOM
	const MOTION_ONLY_PROPS = new Set([
		'initial',
		'animate',
		'exit',
		'transition',
		'variants',
		'whileHover',
		'whileTap',
		'whileInView',
		'whileFocus',
		'whileDrag',
		'drag',
		'dragConstraints',
		'dragElastic',
		'dragMomentum',
		'dragTransition',
		'layout',
		'layoutId',
		'layoutDependency',
		'viewport',
		'custom',
		'onAnimationStart',
		'onAnimationComplete',
		'onDragStart',
		'onDrag',
		'onDragEnd',
		'onHoverStart',
		'onHoverEnd',
		'onViewportEnter',
		'onViewportLeave',
	]);

	const mockMotionComponent = (tag: string) =>
		function MockMotion({ children, ...props }: Record<string, unknown>) {
			const domProps = Object.fromEntries(
				Object.entries(props).filter(([key]) => !MOTION_ONLY_PROPS.has(key))
			);
			return React.createElement(tag, domProps, children);
		};

	return {
		__esModule: true,
		...jest.requireActual('framer-motion'),
		motion: {
			div: mockMotionComponent('div'),
			section: mockMotionComponent('section'),
			button: mockMotionComponent('button'),
			a: mockMotionComponent('a'),
			p: mockMotionComponent('p'),
			span: mockMotionComponent('span'),
			h1: mockMotionComponent('h1'),
			h2: mockMotionComponent('h2'),
			h3: mockMotionComponent('h3'),
			h4: mockMotionComponent('h4'),
			li: mockMotionComponent('li'),
			ul: mockMotionComponent('ul'),
		},
		AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
	};
});
