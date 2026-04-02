// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: { unoptimized: true },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// domains: ['images.pexels.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.pexels.com',
				pathname: '/**', // Allow all paths
			},
		],
	},
};

module.exports = nextConfig;
