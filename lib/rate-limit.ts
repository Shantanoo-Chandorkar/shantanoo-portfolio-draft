const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

interface RateLimitEntry {
	count: number;
	windowStart: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Resets the in-memory rate limit store.
 * Intended for use in tests only — do not call in application code.
 */
export function resetRateLimitStore(): void {
	rateLimitStore.clear();
}

/**
 * Checks whether the given IP address has exceeded the rate limit.
 * Uses a fixed window of RATE_LIMIT_WINDOW_MS, resetting the counter when the
 * window expires. Mutates the store as a side effect.
 * @param ip - The caller's IP address
 * @returns True if the caller is rate-limited and should be blocked
 */
export function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const entry = rateLimitStore.get(ip);

	if (!entry || now - entry.windowStart >= RATE_LIMIT_WINDOW_MS) {
		rateLimitStore.set(ip, { count: 1, windowStart: now });
		return false;
	}

	if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
		return true;
	}

	entry.count += 1;
	return false;
}
