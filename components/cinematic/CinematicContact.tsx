'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useContactForm } from '@/hooks/useContactForm';
import { Send, CheckCircle, AlertCircle, Download, BookOpen, Mountain, Tv } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/SectionHeader';
import { contactSocialLinks } from '@/lib/social-links';
import { VIEWPORT_ONCE } from '@/lib/animation';
import { contactInfo } from '@/lib/data/contact';

const personalityItems = [
	{
		icon: BookOpen,
		label: 'Avid Reader',
		description: 'An avid reader who believes in the power of knowledge and storytelling.',
	},
	{
		icon: Mountain,
		label: 'Trekker',
		description: 'Nature enthusiast who finds peace and challenge in the mountains.',
	},
	{
		icon: Tv,
		label: 'Anime Fan',
		description: 'A passionate otaku who finds inspiration in Japanese animation and storytelling.',
	},
];

export function CinematicContact() {
	const [expandedPersonality, setExpandedPersonality] = useState<string | null>(null);
	const { formData, isSubmitting, isSubmitted, error, handleInputChange, handleSubmit } =
		useContactForm();

	return (
		<section id="contact" className="py-16 px-4">
			<div className="max-w-6xl mx-auto">
				<SectionHeader
					heading="Get In Touch"
					subtitle="Let's discuss your next project or opportunity"
				/>

				{/* CV Download Banner */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={VIEWPORT_ONCE}
					className="mb-12"
				>
					<div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
						<div>
							<h3 className="text-lg font-bold text-foreground">Want the full picture?</h3>
							<p className="text-sm text-muted-foreground">
								Download my complete CV with experience, skills, and education.
							</p>
						</div>
						<Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">
							<a href="/Shantanoo_Chandorkar_Resume.pdf" download>
								<Download className="w-4 h-4 mr-2" />
								Download CV
							</a>
						</Button>
					</div>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={VIEWPORT_ONCE}
					>
						<Card className="bg-card/50 border-border backdrop-blur-sm">
							<CardContent className="p-8">
								<h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>
								{isSubmitted ? (
									<motion.div
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										className="text-center py-8"
									>
										<CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
										<h4 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h4>
										<p className="text-muted-foreground">
											{"Thank you for reaching out. I'll get back to you soon."}
										</p>
									</motion.div>
								) : (
									<form onSubmit={handleSubmit} className="space-y-6">
										{error && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500"
											>
												<AlertCircle className="w-4 h-4" />
												<span className="text-sm">{error}</span>
											</motion.div>
										)}
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label
													htmlFor="cin-name"
													className="block text-sm font-medium text-muted-foreground mb-2"
												>
													Name *
												</label>
												<Input
													id="cin-name"
													name="name"
													type="text"
													required
													value={formData.name}
													onChange={handleInputChange}
													className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
													placeholder="Your name"
												/>
											</div>
											<div>
												<label
													htmlFor="cin-email"
													className="block text-sm font-medium text-muted-foreground mb-2"
												>
													Email *
												</label>
												<Input
													id="cin-email"
													name="email"
													type="email"
													required
													value={formData.email}
													onChange={handleInputChange}
													className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
													placeholder="your@email.com"
												/>
											</div>
										</div>
										<div>
											<label
												htmlFor="cin-subject"
												className="block text-sm font-medium text-muted-foreground mb-2"
											>
												Subject *
											</label>
											<Input
												id="cin-subject"
												name="subject"
												type="text"
												required
												value={formData.subject}
												onChange={handleInputChange}
												className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
												placeholder="What's this about?"
											/>
										</div>
										<div>
											<label
												htmlFor="cin-message"
												className="block text-sm font-medium text-muted-foreground mb-2"
											>
												Message *
											</label>
											<Textarea
												id="cin-message"
												name="message"
												required
												rows={5}
												value={formData.message}
												onChange={handleInputChange}
												className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary resize-none"
												placeholder="Tell me about your project or opportunity..."
											/>
										</div>
										<Button
											type="submit"
											disabled={isSubmitting}
											className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
										>
											{isSubmitting ? (
												<motion.div
													animate={{ rotate: 360 }}
													transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
													className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full mr-2"
												/>
											) : (
												<Send className="w-5 h-5 mr-2" />
											)}
											{isSubmitting ? 'Sending...' : 'Send Message'}
										</Button>
									</form>
								)}
							</CardContent>
						</Card>
					</motion.div>

					{/* Contact Info + Social + Personality */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={VIEWPORT_ONCE}
						className="space-y-8"
					>
						<div>
							<h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
							<div className="space-y-4">
								{contactInfo.map((item, index) => (
									<motion.a
										key={index}
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`Contact via ${item.label}: ${item.value}`}
										whileHover={{ scale: 1.02 }}
										className="flex items-center p-4 bg-card/50 border border-border rounded-lg hover:bg-card/70 transition-all duration-300 group"
									>
										<div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mr-4">
											<item.icon className="w-6 h-6 text-primary-foreground" />
										</div>
										<div>
											<p className="text-muted-foreground text-sm">{item.label}</p>
											<p className="text-foreground text-xs font-medium group-hover:text-primary transition-colors">
												{item.value}
											</p>
										</div>
									</motion.a>
								))}
							</div>
						</div>

						<div>
							<h3 className="text-xl font-bold text-foreground mb-4">Follow Me</h3>
							<div className="flex space-x-4">
								{contactSocialLinks.map((social, index) => (
									<motion.a
										key={index}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
										aria-label={`Visit Shantanoo Chandorkar's ${social.label} Profile`}
										className={`w-12 h-12 bg-card/50 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:bg-card/70 transition-all duration-300 ${social.color}`}
									>
										<social.icon className="w-5 h-5" />
									</motion.a>
								))}
							</div>
						</div>

						{/* Personality Strip */}
						<div>
							<h3 className="text-xl font-bold text-foreground mb-4">Beyond the Code</h3>
							<div className="flex flex-wrap gap-3">
								{personalityItems.map((item) => (
									<div key={item.label}>
										<button
											onClick={() =>
												setExpandedPersonality(expandedPersonality === item.label ? null : item.label)
											}
											className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
												expandedPersonality === item.label
													? 'bg-primary/10 border-primary/30 text-primary'
													: 'bg-card/50 border-border text-muted-foreground hover:bg-card/70'
											}`}
										>
											<item.icon className="w-4 h-4" />
											<span className="text-sm font-medium">{item.label}</span>
										</button>
										<AnimatePresence>
											{expandedPersonality === item.label && (
												<motion.p
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: 'auto' }}
													exit={{ opacity: 0, height: 0 }}
													className="text-sm text-muted-foreground mt-2 px-4 overflow-hidden"
												>
													{item.description}
												</motion.p>
											)}
										</AnimatePresence>
									</div>
								))}
							</div>
						</div>
					</motion.div>
				</div>

				{/* Footer */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					viewport={VIEWPORT_ONCE}
					className="mt-16 pt-8 border-t border-border/50 text-center"
				>
					<p className="text-sm text-muted-foreground">
						{`\u00A9 ${new Date().getFullYear()} Shantanoo Chandorkar. All rights reserved.`}
					</p>
				</motion.div>
			</div>
		</section>
	);
}
