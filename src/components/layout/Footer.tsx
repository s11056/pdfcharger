'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Github, Mail, Globe, ShieldCheck } from 'lucide-react';
import { type Locale, locales, localeConfig, getLocalizedPath } from '@/lib/i18n/config';
import { saveLanguagePreference } from './LanguageSelector';
import { Logo } from '@/components/brand/Logo';
import { siteConfig } from '@/config/site';
import { getToolsByCategory } from '@/config/tools';
import { CATEGORY_META, CATEGORY_ORDER } from '@/config/categories';
import { useLocalizedTools } from '@/hooks/useLocalizedTools';

export interface FooterProps {
  locale: Locale;
}

const FOOTER_TOOLS_PER_CATEGORY = 6;

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = useTranslations('common');
  const tHome = useTranslations('home');
  const router = useRouter();
  const pathname = usePathname();
  const localized = useLocalizedTools(locale);
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { href: `/${locale}/about`, label: t('navigation.about') },
    { href: `/${locale}/faq`, label: t('navigation.faq') },
    { href: `/${locale}/privacy`, label: t('navigation.privacy') },
    { href: `/${locale}/contact`, label: t('navigation.contact') },
    { href: `/${locale}/studio`, label: 'PDF Studio' },
    { href: `/${locale}/workflow`, label: t('navigation.workflow') },
  ];

  const handleLanguageChange = (newLocale: Locale) => {
    saveLanguagePreference(newLocale);
    router.push(getLocalizedPath(pathname, newLocale));
  };

  const socials = [
    { href: siteConfig.links.github, label: 'GitHub', icon: Github },
    { href: siteConfig.links.email, label: 'Email', icon: Mail },
  ];

  return (
    <footer className="w-full border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))]" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-8">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-5">
            <Link href={`/${locale}`} className="self-start" aria-label={`${t('brand')} - ${t('navigation.home')}`}>
              <Logo />
              <span className="sr-only" data-testid="footer-brand-name">{t('brand')}</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">
              {t('tagline')}
            </p>
            <p className="inline-flex items-center gap-2 self-start rounded-full bg-[hsl(var(--color-success)/0.1)] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--color-success))]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {t('footer.privacyBadge')}
            </p>
            <div className="flex gap-2">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] text-[hsl(var(--color-muted-foreground))] transition-colors hover:border-[hsl(var(--color-primary)/0.5)] hover:text-[hsl(var(--color-primary))]"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
            <a
              href="https://audiocharger.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-3 py-1.5 text-xs text-[hsl(var(--color-muted-foreground))] transition-colors hover:border-[hsl(var(--color-primary)/0.5)] hover:text-[hsl(var(--color-primary))]"
            >
              Need an audio tool? ↗
            </a>
          </div>

          {/* Tool columns */}
          {CATEGORY_ORDER.slice(0, 5).map((cat) => {
            const meta = CATEGORY_META[cat];
            return (
              <div key={cat}>
                <h3 className="mb-4 text-sm font-bold text-[hsl(var(--color-foreground))]">
                  <Link href={`/${locale}/tools?category=${cat}`} className="hover:text-[hsl(var(--color-primary))]">
                    {tHome(`categories.${meta.i18nKey}`)}
                  </Link>
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {getToolsByCategory(cat)
                    .slice(0, FOOTER_TOOLS_PER_CATEGORY)
                    .map((tool) => (
                      <li key={tool.id}>
                        <Link
                          href={`/${locale}/tools/${tool.slug}`}
                          className="text-sm text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
                        >
                          {localized[tool.id]?.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            );
          })}

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-[hsl(var(--color-foreground))]">{t('brand')}</h3>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Languages */}
        <div className="mt-12 border-t border-[hsl(var(--color-border))] pt-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[hsl(var(--color-foreground))]">
            <Globe className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]" aria-hidden="true" />
            {t('buttons.selectLanguage')}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {locales.map((loc) => {
              const isActive = loc === locale;
              return (
                <button
                  key={loc}
                  onClick={() => handleLanguageChange(loc)}
                  className={`rounded-full px-3 py-1 text-xs transition-colors ${
                    isActive
                      ? 'pc-brand-gradient font-semibold text-white'
                      : 'border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] text-[hsl(var(--color-muted-foreground))] hover:border-[hsl(var(--color-primary)/0.5)] hover:text-[hsl(var(--color-primary))]'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {localeConfig[loc].nativeName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-[hsl(var(--color-border))] pt-6 text-xs text-[hsl(var(--color-muted-foreground))] md:flex-row md:items-center">
          <p>
            &copy; {currentYear} {t('brand')} · pdfcharger.com
          </p>
          <p>
            Open source under{' '}
            <a href={`${siteConfig.links.github}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer" className="underline hover:text-[hsl(var(--color-primary))]">
              AGPL-3.0
            </a>{' '}
            ·{' '}
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-[hsl(var(--color-primary))]">
              Source code
            </a>{' '}
            · Built on{' '}
            <a href={siteConfig.links.upstream} target="_blank" rel="noopener noreferrer" className="underline hover:text-[hsl(var(--color-primary))]">
              PDFCraft
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
