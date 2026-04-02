// app/api/send-email/route.ts:
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

const MAX_LENGTHS = { name: 100, email: 254, subject: 200, message: 5000 } as const;

export async function POST(request: NextRequest) {
	try {
		const { name, email, subject, message } = await request.json();

		if (!name || !email || !subject || !message) {
			return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
		}

		if (
			typeof name !== 'string' ||
			typeof email !== 'string' ||
			typeof subject !== 'string' ||
			typeof message !== 'string'
		) {
			return NextResponse.json({ error: 'Invalid field types' }, { status: 400 });
		}

		if (
			name.length > MAX_LENGTHS.name ||
			email.length > MAX_LENGTHS.email ||
			subject.length > MAX_LENGTHS.subject ||
			message.length > MAX_LENGTHS.message
		) {
			return NextResponse.json({ error: 'One or more fields exceed maximum length' }, { status: 400 });
		}

		const safeName = escapeHtml(name);
		const safeEmail = escapeHtml(email);
		const safeSubject = escapeHtml(subject);
		const safeMessage = escapeHtml(message);

		await resend.emails.send({
			from: 'onboarding@resend.dev',
			to: process.env.CONTACT_EMAIL || '',
			subject: `Portfolio Contact: ${safeSubject} from ${safeName}`,
			html: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong> ${safeMessage.replace(/\n/g, '<br>')}</p>
      `,
			text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
			replyTo: email,
		});

		return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error sending email:', error);
		return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
	}
}
