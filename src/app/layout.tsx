import type { Metadata } from 'next';
import '@/app/globals.css';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

// Root layout - provides the basic HTML structure
// The actual layout with i18n is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var m=location.pathname.match(/^\\/([a-z]{2}(?:-[A-Z]{2})?)(\\/?)/);if(m&&m[1]){document.documentElement.lang=m[1];if(m[1]==='he'||m[1]==='ar')document.documentElement.dir='rtl';}})();`,
          }}
        />
        <script
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/coi-serviceworker.js`}
          data-coi="true"
          async
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
