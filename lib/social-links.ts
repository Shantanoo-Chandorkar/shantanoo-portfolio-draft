import { FaLinkedin, FaGithub, FaHackerrank } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';
import { Github, Linkedin } from 'lucide-react';

export const heroSocialLinks = [
	{
		icon: FaGithub,
		href: 'https://github.com/Shantanoo-Chandorkar',
		label: 'GitHub',
		color: '#AAA',
	},
	{
		icon: SiLeetcode,
		href: 'https://leetcode.com/u/Shantanoo-Chandorkar',
		label: 'LeetCode',
		color: '#FFA116',
	},
	{
		icon: FaLinkedin,
		href: 'https://linkedin.com/in/shantanoo-chandorkar',
		label: 'LinkedIn',
		color: '#0077B5',
	},
	{
		icon: FaHackerrank,
		href: 'https://hackerrank.com/profile/cshantanoo123',
		label: 'HackerRank',
		color: '#00EA64',
	},
	{
		icon: SiGeeksforgeeks,
		href: 'https://geeksforgeeks.org/user/cshantanoo123',
		label: 'GeeksForGeeks',
		color: '#2C8E46',
	},
];

export const contactSocialLinks = [
	{
		icon: Github,
		label: 'GitHub',
		href: 'https://github.com/Shantanoo-Chandorkar',
		color: 'hover:text-gray-400',
	},
	{
		icon: Linkedin,
		label: 'LinkedIn',
		href: 'https://linkedin.com/in/shantanoo-chandorkar',
		color: 'hover:text-blue-400',
	},
];
