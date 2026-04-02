import { escapeHtml, validateContactPayload } from '@/lib/contact-validation';

describe('escapeHtml', () => {
	it('returns string with no special characters unchanged', () => {
		expect(escapeHtml('Hello World')).toBe('Hello World');
	});

	it('escapes ampersand', () => {
		expect(escapeHtml('A & B')).toBe('A &amp; B');
	});

	it('escapes less than', () => {
		expect(escapeHtml('a < b')).toBe('a &lt; b');
	});

	it('escapes greater than', () => {
		expect(escapeHtml('a > b')).toBe('a &gt; b');
	});

	it('escapes double quote', () => {
		expect(escapeHtml('Say "Hello"')).toBe('Say &quot;Hello&quot;');
	});

	it('escapes single quote', () => {
		expect(escapeHtml("It's")).toBe('It&#039;s');
	});

	it('escapes empty string', () => {
		expect(escapeHtml('')).toBe('');
	});

	it('escapes all special characters together', () => {
		expect(escapeHtml('A & B < C > "D" \'E\'')).toBe(
			'A &amp; B &lt; C &gt; &quot;D&quot; &#039;E&#039;'
		);
	});

	it('handles multi-character input', () => {
		expect(escapeHtml('Hello <script>alert("XSS")</script>')).toBe(
			'Hello &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
		);
	});
});

describe('validateContactPayload', () => {
	it('returns error for null body', () => {
		const result = validateContactPayload(null);
		expect(result.valid).toBe(false);
		expect(result.error).toBe('Invalid request body');
	});

	it('returns error for non-object body', () => {
		const result = validateContactPayload('string');
		expect(result.valid).toBe(false);
		expect(result.error).toBe('Invalid request body');
	});

	it('returns error when name is missing', () => {
		const result = validateContactPayload({ email: 'test@test.com', subject: 'Test', message: 'Hi' });
		expect(result.valid).toBe(false);
		expect(result.error).toBe('All fields are required');
	});

	it('returns error when email is missing', () => {
		const result = validateContactPayload({ name: 'John', subject: 'Test', message: 'Hi' });
		expect(result.valid).toBe(false);
		expect(result.error).toBe('All fields are required');
	});

	it('returns error when subject is missing', () => {
		const result = validateContactPayload({ name: 'John', email: 'test@test.com', message: 'Hi' });
		expect(result.valid).toBe(false);
		expect(result.error).toBe('All fields are required');
	});

	it('returns error when message is missing', () => {
		const result = validateContactPayload({ name: 'John', email: 'test@test.com', subject: 'Test' });
		expect(result.valid).toBe(false);
		expect(result.error).toBe('All fields are required');
	});

	it('returns error for invalid name type', () => {
		const result = validateContactPayload({
			name: 123,
			email: 'test@test.com',
			subject: 'Test',
			message: 'Hi',
		});
		expect(result.valid).toBe(false);
		expect(result.error).toBe('Invalid field types');
	});

	it('returns error for invalid email type', () => {
		const result = validateContactPayload({
			name: 'John',
			email: 123,
			subject: 'Test',
			message: 'Hi',
		});
		expect(result.valid).toBe(false);
		expect(result.error).toBe('Invalid field types');
	});

	it('returns error when name exceeds max length', () => {
		const result = validateContactPayload({
			name: 'a'.repeat(101),
			email: 'test@test.com',
			subject: 'Test',
			message: 'Hi',
		});
		expect(result.valid).toBe(false);
		expect(result.error).toBe('One or more fields exceed maximum length');
	});

	it('returns error when email exceeds max length', () => {
		const result = validateContactPayload({
			name: 'John',
			email: 'a'.repeat(255),
			subject: 'Test',
			message: 'Hi',
		});
		expect(result.valid).toBe(false);
		expect(result.error).toBe('One or more fields exceed maximum length');
	});

	it('returns error when subject exceeds max length', () => {
		const result = validateContactPayload({
			name: 'John',
			email: 'test@test.com',
			subject: 'a'.repeat(201),
			message: 'Hi',
		});
		expect(result.valid).toBe(false);
		expect(result.error).toBe('One or more fields exceed maximum length');
	});

	it('returns error when message exceeds max length', () => {
		const result = validateContactPayload({
			name: 'John',
			email: 'test@test.com',
			subject: 'Test',
			message: 'a'.repeat(5001),
		});
		expect(result.valid).toBe(false);
		expect(result.error).toBe('One or more fields exceed maximum length');
	});

	it('returns valid result with escaped data for valid input', () => {
		const result = validateContactPayload({
			name: 'John <Doe>',
			email: 'test@test.com',
			subject: 'Hello & Welcome',
			message: 'Say "Hi"',
		});
		expect(result.valid).toBe(true);
		expect(result.data).toEqual({
			name: 'John &lt;Doe&gt;',
			email: 'test@test.com',
			subject: 'Hello &amp; Welcome',
			message: 'Say &quot;Hi&quot;',
		});
	});

	it('returns error for array body', () => {
		const result = validateContactPayload([]);
		expect(result.valid).toBe(false);
		expect(result.error).toBe('Invalid request body');
	});

	it('returns error for email missing @ symbol', () => {
		const result = validateContactPayload({
			name: 'John',
			email: 'notanemail',
			subject: 'Test',
			message: 'Hi',
		});
		expect(result.valid).toBe(false);
		expect(result.error).toBe('Invalid email format');
	});

	it('returns error for email with @ but missing domain', () => {
		const result = validateContactPayload({
			name: 'John',
			email: 'user@',
			subject: 'Test',
			message: 'Hi',
		});
		expect(result.valid).toBe(false);
		expect(result.error).toBe('Invalid email format');
	});

	it('returns error for email with @ but missing local part', () => {
		const result = validateContactPayload({
			name: 'John',
			email: '@domain.com',
			subject: 'Test',
			message: 'Hi',
		});
		expect(result.valid).toBe(false);
		expect(result.error).toBe('Invalid email format');
	});

	it('accepts a standard email address', () => {
		const result = validateContactPayload({
			name: 'John',
			email: 'user@domain.com',
			subject: 'Test',
			message: 'Hi',
		});
		expect(result.valid).toBe(true);
	});

	it('accepts an email with plus-addressing and subdomains', () => {
		const result = validateContactPayload({
			name: 'John',
			email: 'user+tag@sub.domain.co.uk',
			subject: 'Test',
			message: 'Hi',
		});
		expect(result.valid).toBe(true);
	});
});
