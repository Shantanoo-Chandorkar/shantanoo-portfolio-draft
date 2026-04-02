/**
 * Narrows an unknown value to a plain, non-array object record.
 * @param value - The value to check
 * @returns True if the value is a non-null, non-array object
 */
function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Regex for basic email format validation: requires local@domain.tld structure. */
const EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Escapes HTML special characters to prevent HTML injection in email content.
 * @param str - The string to escape
 * @returns The escaped string with HTML entities
 */
export function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

const MAX_LENGTHS = { name: 100, email: 254, subject: 200, message: 5000 } as const;

export interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export interface ValidationResult {
	valid: boolean;
	error?: string;
	data?: ContactFormData;
}

/**
 * Validates contact form payload.
 * @param body - The parsed request body
 * @returns Validation result with either error message or validated data
 */
export function validateContactPayload(body: unknown): ValidationResult {
	if (!isRecord(body)) {
		return { valid: false, error: 'Invalid request body' };
	}

	const { name, email, subject, message } = body;

	// Check required fields
	if (!name || !email || !subject || !message) {
		return { valid: false, error: 'All fields are required' };
	}

	// Check types
	if (
		typeof name !== 'string' ||
		typeof email !== 'string' ||
		typeof subject !== 'string' ||
		typeof message !== 'string'
	) {
		return { valid: false, error: 'Invalid field types' };
	}

	// Check lengths
	if (
		name.length > MAX_LENGTHS.name ||
		email.length > MAX_LENGTHS.email ||
		subject.length > MAX_LENGTHS.subject ||
		message.length > MAX_LENGTHS.message
	) {
		return { valid: false, error: 'One or more fields exceed maximum length' };
	}

	// Verify email format — Resend rejects malformed addresses; we catch it here first
	if (!EMAIL_FORMAT_REGEX.test(email)) {
		return { valid: false, error: 'Invalid email format' };
	}

	return {
		valid: true,
		data: {
			name: escapeHtml(name),
			email: escapeHtml(email),
			subject: escapeHtml(subject),
			message: escapeHtml(message),
		},
	};
}
