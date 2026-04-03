import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { DesignProvider } from '@/contexts/DesignContext';
import { TooltipProvider } from '@/components/ui/tooltip';

const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '700', '800'],
});

export const metadata: Metadata = {
	title: 'Shantanoo Chandorkar - Portfolio',
	description: 'Full Stack Developer',
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<TooltipProvider>
					<ThemeProvider>
						<DesignProvider>{children}</DesignProvider>
					</ThemeProvider>
				</TooltipProvider>
			</body>
		</html>
	);
}
