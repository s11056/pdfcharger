/**
 * Format an ISO date (YYYY-MM-DD) for display, e.g. "17 November 2026".
 * Parsed as UTC so the day never shifts with the build machine's timezone.
 */
export function formatPostDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
