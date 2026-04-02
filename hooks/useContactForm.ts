'use client';

import { useState, useRef, useEffect } from 'react';

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

const EMPTY_FORM: FormData = { name: '', email: '', subject: '', message: '' };

// Reset delay in ms after a successful submission before the form clears
const SUCCESS_RESET_DELAY = 5000;

export function useContactForm() {
	const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
		};
	}, []);

	const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (error) setError('');
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError('');

		try {
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) throw new Error(data.error || 'Failed to send email');

			setIsSubmitted(true);
			resetTimerRef.current = setTimeout(() => {
				setIsSubmitted(false);
				setFormData(EMPTY_FORM);
			}, SUCCESS_RESET_DELAY);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to send email. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return { formData, isSubmitting, isSubmitted, error, handleInputChange, handleSubmit };
}
