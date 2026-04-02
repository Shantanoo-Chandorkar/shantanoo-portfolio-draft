// app/api/send-email/route.ts:
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateContactPayload } from '@/lib/contact-validation';
import { isRateLimited } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends an email via Resend.
 * Extracted for testability.
 * @param data - Validated and escaped contact form fields
 * @param contactEmail - Destination email address (from environment config)
 */
async function sendEmail(
	data: { name: string; email: string; subject: string; message: string },
	contactEmail: string
): Promise<void> {
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: contactEmail,
		subject: `Portfolio Contact: ${data.subject} from ${data.name}`,
		html: `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong> ${data.message.replace(/\n/g, '<br>')}</p>
      `,
		text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\nMessage: ${data.message}`,
		replyTo: data.email,
	});
}

/**
 * Handles POST requests to send contact form emails.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
	const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
	if (isRateLimited(ip)) {
		return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
	}

	const contactEmail = process.env.CONTACT_EMAIL;
	if (!contactEmail) {
		console.error('CONTACT_EMAIL environment variable is not configured');
		return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
	}

	try {
		const body = await request.json();
		const validation = validateContactPayload(body);

		if (!validation.valid) {
			return NextResponse.json({ error: validation.error }, { status: 400 });
		}

		if (!validation.data) {
			// Not reachable in practice — validateContactPayload always sets data when valid is true
			console.error('Validation passed but data is absent');
			return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
		}

		const { name, email, subject, message } = validation.data;

		await sendEmail({ name, email, subject, message }, contactEmail);

		return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
	} catch (error) {
		// Avoid logging raw API error messages — they may contain internal service details
		console.error('Failed to send contact form email');
		return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
	}
}
