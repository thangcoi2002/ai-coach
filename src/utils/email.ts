/**
 * `nguyen.van.a@company.com` -> `ng***@company.com`.
 * Falls back to a generic phrase when there is nothing usable to mask.
 */
export function maskEmail(email: string): string {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'email của bạn';
  }
  const separator = trimmed.indexOf('@');
  if (separator < 0) {
    return trimmed;
  }
  const user = trimmed.slice(0, separator);
  const domain = trimmed.slice(separator + 1);
  return `${user.slice(0, 2)}***@${domain}`;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
