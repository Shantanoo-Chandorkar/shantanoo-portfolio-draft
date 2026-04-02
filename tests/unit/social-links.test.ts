import { heroSocialLinks, contactSocialLinks } from '@/lib/social-links';

describe('heroSocialLinks', () => {
	it('contains the expected platform labels', () => {
		const labels = heroSocialLinks.map((l) => l.label);
		expect(labels).toEqual(['GitHub', 'LeetCode', 'LinkedIn', 'HackerRank', 'GeeksForGeeks']);
	});

	it('each entry has an icon, href, label, and color', () => {
		for (const link of heroSocialLinks) {
			expect(link.icon).toBeDefined();
			expect(typeof link.href).toBe('string');
			expect(link.href.length).toBeGreaterThan(0);
			expect(typeof link.label).toBe('string');
			expect(link.label.length).toBeGreaterThan(0);
			expect(typeof link.color).toBe('string');
		}
	});

	it('GitHub href points to the correct profile', () => {
		const github = heroSocialLinks.find((l) => l.label === 'GitHub');
		expect(github?.href).toBe('https://github.com/Shantanoo-Chandorkar');
	});

	it('LinkedIn href points to the correct profile', () => {
		const linkedin = heroSocialLinks.find((l) => l.label === 'LinkedIn');
		expect(linkedin?.href).toBe('https://linkedin.com/in/shantanoo-chandorkar');
	});

	it('has no duplicate hrefs', () => {
		const hrefs = heroSocialLinks.map((l) => l.href);
		expect(new Set(hrefs).size).toBe(hrefs.length);
	});
});

describe('contactSocialLinks', () => {
	it('contains GitHub and LinkedIn entries', () => {
		const labels = contactSocialLinks.map((l) => l.label);
		expect(labels).toContain('GitHub');
		expect(labels).toContain('LinkedIn');
	});

	it('each entry has an icon, href, label, and color', () => {
		for (const link of contactSocialLinks) {
			expect(link.icon).toBeDefined();
			expect(typeof link.href).toBe('string');
			expect(link.href.length).toBeGreaterThan(0);
			expect(typeof link.label).toBe('string');
			expect(link.label.length).toBeGreaterThan(0);
			expect(typeof link.color).toBe('string');
		}
	});

	it('GitHub href matches the hero list', () => {
		const heroGithub = heroSocialLinks.find((l) => l.label === 'GitHub');
		const contactGithub = contactSocialLinks.find((l) => l.label === 'GitHub');
		expect(contactGithub?.href).toBe(heroGithub?.href);
	});

	it('LinkedIn href matches the hero list', () => {
		const heroLinkedin = heroSocialLinks.find((l) => l.label === 'LinkedIn');
		const contactLinkedin = contactSocialLinks.find((l) => l.label === 'LinkedIn');
		expect(contactLinkedin?.href).toBe(heroLinkedin?.href);
	});

	it('has no duplicate hrefs', () => {
		const hrefs = contactSocialLinks.map((l) => l.href);
		expect(new Set(hrefs).size).toBe(hrefs.length);
	});
});
