const nextJest = require('next/jest');

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
	testEnvironment: 'jest-environment-jsdom',
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
	moduleNameMapper: {
		// Handle module aliases
		'^@/(.*)$': '<rootDir>/$1',
		// Handle CSS imports (with CSS modules)
		'\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
		// Handle CSS imports (without CSS modules)
		'\\.(css|sass|scss)$': '<rootDir>/tests/mocks/fileMock.js',
		// Handle image imports
		'\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/tests/mocks/fileMock.js',
	},
	collectCoverageFrom: [
		'**/*.{js,jsx,ts,tsx}',
		'!/**/*.d.ts',
		'!**/node_modules/**',
		'!**/.next/**',
		'!**/coverage/**',
		'!**/tests/**',
	],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
