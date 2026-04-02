export interface ContactFormPayload {
	name: string;
	email: string;
	subject: string;
	message: string;
}

/**
 * Submits a contact form payload to the given API endpoint.
 * Throws an Error if the response is not ok, using the error message from the
 * response body when available.
 * @param payload - The validated contact form fields to send
 * @param endpoint - The API route to POST to
 * @throws {Error} When the server returns a non-ok response or the request fails entirely
 */
export async function submitContactForm(
	payload: ContactFormPayload,
	endpoint: string
): Promise<void> {
	const response = await fetch(endpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error || 'Failed to send email');
	}
}
