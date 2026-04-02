export interface Project {
	id: number;
	title: string;
	description: string;
	longDescription: string;
	technologies: string[];
	image: string;
	githubUrl: string;
	liveUrl: string;
	features: string[];
}

export interface Highlight {
	metric: string;
	label: string;
}

export interface ExperienceEntry {
	id: number;
	company: string;
	position: string;
	period: string;
	location: string;
	description: string[];
	technologies: string[];
	highlights: Highlight[];
}
