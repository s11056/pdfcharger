import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n/config';

// Root page: server-side redirect to default locale.
// Cloudflare _redirects already issues a 301 at the CDN edge, so this
// fallback is only reached in local dev or if the CDN rule is bypassed.
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
