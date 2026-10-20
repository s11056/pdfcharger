/**
 * Site configuration
 */
export const siteConfig = {
  name: 'PDFCharger',
  description: 'Every PDF tool you need, supercharged. Merge, split, compress, convert, edit and sign PDFs right in your browser — free, fast and private. Your files never leave your device.',
  url: 'https://pdfcharger.com',
  ogImage: '/images/og-image.png',
  links: {
    // Source of this site (required by the AGPL-3.0 licence)
    github: 'https://github.com/s11056/pdfcharger',
    // Upstream project PDFCharger is built on
    upstream: 'https://github.com/PDFCraftTool/pdfcraft',
    twitter: 'https://x.com/pdfcharger',
    email: 'mailto:hello@pdfcharger.com',
  },
  creator: 'PDFCharger',
  keywords: [
    'PDF tools',
    'PDF editor',
    'merge PDF',
    'split PDF',
    'compress PDF',
    'convert PDF',
    'PDF to Word',
    'free PDF tools',
    'online PDF editor',
    'private PDF processing',
    'PDFCharger',
  ],
  seo: {
    titleTemplate: '%s | PDFCharger',
    defaultTitle: 'PDFCharger - Free Online PDF Tools, Supercharged',
    twitterHandle: '@pdfcharger',
    locale: 'en_US',
  },
};

/**
 * Navigation configuration
 */
export const navConfig = {
  mainNav: [
    { title: 'Home', href: '/' },
    { title: 'Tools', href: '/tools' },
    { title: 'About', href: '/about' },
    { title: 'FAQ', href: '/faq' },
  ],
  footerNav: [
    { title: 'Privacy', href: '/privacy' },
    { title: 'Contact', href: '/contact' },
  ],
};
