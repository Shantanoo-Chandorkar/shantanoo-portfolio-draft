import { submitContactForm } from '@/lib/contact-service';

const mockFetch = jest.fn();
global.fetch = mockFetch;

const payload = {
	name: 'John Doe',
	email: 'john@example.com',
	subject: 'Hello',
	message: 'Test message',
};

describe('submitContactForm', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('sends a POST request with the correct headers and serialised body', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({ message: 'Email sent successfully' }),
		});

		await submitContactForm(payload, '/api/send-email');

		expect(mockFetch).toHaveBeenCalledWith('/api/send-email', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});
	});

	it('resolves without error on a successful response', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({ message: 'Email sent successfully' }),
		});

		await expect(submitContactForm(payload, '/api/send-email')).resolves.toBeUndefined();
	});

	it('throws an Error with the response error message on a non-ok response', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			json: async () => ({ error: 'Too many requests' }),
		});

		await expect(submitContactForm(payload, '/api/send-email')).rejects.toThrow('Too many requests');
	});

	it('throws a generic error when the non-ok response has no error field', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			json: async () => ({}),
		});

		await expect(submitContactForm(payload, '/api/send-email')).rejects.toThrow(
			'Failed to send email'
		);
	});

	it('propagates network errors as thrown exceptions', async () => {
		mockFetch.mockRejectedValueOnce(new Error('Network failure'));

		await expect(submitContactForm(payload, '/api/send-email')).rejects.toThrow('Network failure');
	});

	it('uses the provided endpoint, not a hardcoded one', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({}),
		});

		await submitContactForm(payload, '/api/custom-route');

		expect(mockFetch).toHaveBeenCalledWith('/api/custom-route', expect.any(Object));
	});
});
