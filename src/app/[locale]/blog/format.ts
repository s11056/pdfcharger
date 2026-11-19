/**
 * Format an ISO date (YYYY-MM-DD) for display in the page's locale,
 * e.g. "17 November 2026". Parsed as UTC so the day never shifts with the
 * build machine's timezone.
 */
export function formatPostDate(isoDate: string, locale: string = 'en'): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString(locale === 'en' ? 'en-GB' : locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
