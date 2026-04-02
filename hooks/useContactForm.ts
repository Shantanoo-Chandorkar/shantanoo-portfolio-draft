'use client';

import { useState, useRef, useEffect } from 'react';
import { submitContactForm } from '@/lib/contact-service';

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

const EMPTY_FORM: FormData = { name: '', email: '', subject: '', message: '' };

// Reset delay in ms after a successful submission before the form clears
const SUCCESS_RESET_DELAY = 5000;

/**
 * Manages contact form state and submission lifecycle.
 * Clears the form and resets the submitted flag after a delay following
 * a successful send. Cancels any pending reset timer on unmount.
 * @param endpoint - The API route to submit the form to
 * @returns Form state (formData, isSubmitting, isSubmitted, error) and event handlers
 */
export function useContactForm(endpoint = '/api/send-email') {
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
			await submitContactForm(formData, endpoint);

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
