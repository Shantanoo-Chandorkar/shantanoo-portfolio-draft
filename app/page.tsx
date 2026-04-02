'use client';

import { motion } from 'framer-motion';
import { useDesignMode } from '@/contexts/DesignContext';

// Classic components
import { HeroBanner } from '@/components/HeroBanner';
import { Projects } from '@/components/Projects';
import { TechStack } from '@/components/TechStack';
import { About } from '@/components/About';
import { DownloadCV } from '@/components/DownloadCV';
import { Contact } from '@/components/Contact';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DecorativeElements } from '@/components/DecorativeElements';
import { LandingChoice } from '@/components/LandingChoice';
import { DesignToggle } from '@/components/DesignToggle';
import { CinematicHero } from '@/components/cinematic/CinematicHero';
import { StickyNavbar } from '@/components/cinematic/StickyNavbar';
import { CinematicExperience } from '@/components/cinematic/CinematicExperience';
import { CinematicProjects } from '@/components/cinematic/CinematicProjects';
import { CinematicTechStack } from '@/components/cinematic/CinematicTechStack';
import { CinematicContact } from '@/components/cinematic/CinematicContact';
import { FloatingCVButton } from '@/components/cinematic/FloatingCVButton';

function ClassicView() {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
			<HeroBanner />
			<CinematicExperience />
			<Projects />
			<TechStack />
			<DownloadCV />
			<Contact />
			<About />
		</motion.div>
	);
}

function CinematicView() {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
			<CinematicHero />
			<StickyNavbar />
			<CinematicExperience />
			<CinematicProjects />
			<CinematicTechStack />
			<CinematicContact />
			<FloatingCVButton />
		</motion.div>
	);
}

/**
 * Root page component. Reads the user's saved design preference and renders
 * LandingChoice (no preference), ClassicView, or CinematicView accordingly.
 * Renders nothing until the preference is loaded to prevent a flash of wrong content.
 */
export default function Home() {
	const { designMode, hasChosen, isLoaded } = useDesignMode();

	// While loading from localStorage, render nothing to prevent flash
	if (!isLoaded) return null;

	return (
		<main className="min-h-screen relative">
			<DecorativeElements />
			<ThemeToggle />

			{/* Show landing choice if no preference saved */}
			{!hasChosen && designMode === null && <LandingChoice />}

			{/* Show design toggle once a choice has been made */}
			{hasChosen && <DesignToggle />}

			{/* Render the chosen design */}
			{designMode === 'classic' && <ClassicView />}
			{designMode === 'cinematic' && <CinematicView />}
		</main>
	);
}
