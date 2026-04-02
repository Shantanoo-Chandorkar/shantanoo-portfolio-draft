/**
 * Integration tests for the send-email API route.
 *
 * Note: These tests mock the resend client at the module level.
 * For validation logic tests, see contact-validation.test.ts
 */

// Mock resend at the module level BEFORE any imports
jest.mock('resend', () => {
	const mockSendEmail = jest.fn();
	return {
		Resend: jest.fn().mockImplementation(() => ({
			emails: {
				send: mockSendEmail,
			},
		})),
		__mockSendEmail: mockSendEmail,
	};
});

import { NextRequest } from 'next/server';
import { POST } from '@/app/api/send-email/route';
import { resetRateLimitStore } from '@/lib/rate-limit';

// Get the mock function from the mocked module
const mockResend = jest.requireMock('resend');
const mockSendEmail = mockResend.__mockSendEmail;

/**
 * Builds a minimal mock NextRequest with the given body and IP address.
 * @param body - The JSON body to return from request.json()
 * @param ip - The X-Forwarded-For header value (defaults to a unique test IP)
 */
function makeRequest(body: Record<string, unknown>, ip = '1.2.3.4'): NextRequest {
	return {
		headers: { get: (key: string) => (key === 'x-forwarded-for' ? ip : null) },
		json: async () => body,
	} as unknown as NextRequest;
}

const validBody = {
	name: 'John Doe',
	email: 'john@example.com',
	subject: 'Project Inquiry',
	message: 'Hello, I would like to discuss a project.',
};

describe('POST /api/send-email', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		resetRateLimitStore();
		process.env.CONTACT_EMAIL = 'contact@example.com';
	});

	afterEach(() => {
		delete process.env.CONTACT_EMAIL;
	});

	it('returns 500 when CONTACT_EMAIL is not configured', async () => {
		delete process.env.CONTACT_EMAIL;

		const response = await POST(makeRequest(validBody));
		const data = await (response as any).json();

		expect((response as any).status).toBe(500);
		expect(data.error).toBe('Service unavailable');
		expect(mockSendEmail).not.toHaveBeenCalled();
	});

	it('returns 400 when name is missing', async () => {
		const response = await POST(
			makeRequest({ email: 'test@test.com', subject: 'Test', message: 'Hello' })
		);
		const data = await (response as any).json();

		expect((response as any).status).toBe(400);
		expect(data.error).toBe('All fields are required');
		expect(mockSendEmail).not.toHaveBeenCalled();
	});

	it('returns 400 when email is missing', async () => {
		const response = await POST(makeRequest({ name: 'John', subject: 'Test', message: 'Hello' }));
		const data = await (response as any).json();

		expect((response as any).status).toBe(400);
		expect(data.error).toBe('All fields are required');
		expect(mockSendEmail).not.toHaveBeenCalled();
	});

	it('returns 400 when subject is missing', async () => {
		const response = await POST(
			makeRequest({ name: 'John', email: 'test@test.com', message: 'Hello' })
		);
		const data = await (response as any).json();

		expect((response as any).status).toBe(400);
		expect(data.error).toBe('All fields are required');
		expect(mockSendEmail).not.toHaveBeenCalled();
	});

	it('returns 400 when message is missing', async () => {
		const response = await POST(
			makeRequest({ name: 'John', email: 'test@test.com', subject: 'Test' })
		);
		const data = await (response as any).json();

		expect((response as any).status).toBe(400);
		expect(data.error).toBe('All fields are required');
		expect(mockSendEmail).not.toHaveBeenCalled();
	});

	it('returns 400 for invalid field types', async () => {
		const response = await POST(
			makeRequest({ name: 123, email: 'test@test.com', subject: 'Test', message: 'Hello' })
		);
		const data = await (response as any).json();

		expect((response as any).status).toBe(400);
		expect(data.error).toBe('Invalid field types');
		expect(mockSendEmail).not.toHaveBeenCalled();
	});

	it('returns 400 when field exceeds maximum length', async () => {
		const response = await POST(
			makeRequest({ name: 'a'.repeat(101), email: 'test@test.com', subject: 'Test', message: 'Hello' })
		);
		const data = await (response as any).json();

		expect((response as any).status).toBe(400);
		expect(data.error).toBe('One or more fields exceed maximum length');
		expect(mockSendEmail).not.toHaveBeenCalled();
	});

	it('returns 500 when Resend API fails', async () => {
		mockSendEmail.mockRejectedValueOnce(new Error('API Error'));

		const response = await POST(makeRequest(validBody));
		const data = await (response as any).json();

		expect((response as any).status).toBe(500);
		expect(data.error).toBe('Failed to send email');
	});

	it('returns 200 on successful email send', async () => {
		mockSendEmail.mockResolvedValueOnce({ id: 'email-id' });

		const response = await POST(makeRequest(validBody));
		const data = await (response as any).json();

		expect((response as any).status).toBe(200);
		expect(data.message).toBe('Email sent successfully');
		expect(mockSendEmail).toHaveBeenCalledWith(
			expect.objectContaining({
				from: 'onboarding@resend.dev',
				subject: 'Portfolio Contact: Project Inquiry from John Doe',
				replyTo: 'john@example.com',
			})
		);
	});

	it('escapes HTML in all fields before sending', async () => {
		mockSendEmail.mockResolvedValueOnce({ id: 'email-id' });

		const response = await POST(
			makeRequest({
				name: 'John <script>alert("XSS")</script>',
				email: 'test@test.com',
				subject: 'Hello & Welcome',
				message: 'Say "Hi"',
			})
		);

		expect(mockSendEmail).toHaveBeenCalledWith(
			expect.objectContaining({
				subject: expect.stringContaining('&lt;script&gt;'),
				html: expect.stringContaining('&lt;script&gt;'),
			})
		);
	});

	describe('rate limiting', () => {
		it('allows requests under the limit', async () => {
			mockSendEmail.mockResolvedValue({ id: 'email-id' });

			// 5 requests from the same IP — all should succeed
			for (let i = 0; i < 5; i++) {
				const response = await POST(makeRequest(validBody, '10.0.0.1'));
				expect((response as any).status).toBe(200);
			}
		});

		it('returns 429 when the rate limit is exceeded', async () => {
			mockSendEmail.mockResolvedValue({ id: 'email-id' });

			for (let i = 0; i < 5; i++) {
				await POST(makeRequest(validBody, '10.0.0.2'));
			}

			const response = await POST(makeRequest(validBody, '10.0.0.2'));
			const data = await (response as any).json();

			expect((response as any).status).toBe(429);
			expect(data.error).toBe('Too many requests');
		});

		it('does not apply the limit across different IPs', async () => {
			mockSendEmail.mockResolvedValue({ id: 'email-id' });

			// Exhaust the limit for one IP
			for (let i = 0; i < 5; i++) {
				await POST(makeRequest(validBody, '10.0.0.3'));
			}

			// A different IP should still succeed
			const response = await POST(makeRequest(validBody, '10.0.0.4'));
			expect((response as any).status).toBe(200);
		});

		it('resets the counter after the window expires', async () => {
			mockSendEmail.mockResolvedValue({ id: 'email-id' });

			// Exhaust the limit
			for (let i = 0; i < 5; i++) {
				await POST(makeRequest(validBody, '10.0.0.5'));
			}

			// Advance time past the 60-second window
			jest.spyOn(Date, 'now').mockReturnValue(Date.now() + 61_000);

			const response = await POST(makeRequest(validBody, '10.0.0.5'));
			expect((response as any).status).toBe(200);

			jest.restoreAllMocks();
		});
	});
});
