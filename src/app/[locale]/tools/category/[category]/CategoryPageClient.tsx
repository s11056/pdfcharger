'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { getToolsByCategory } from '@/config/tools';
import { CATEGORY_META, CATEGORY_ORDER } from '@/config/categories';
import { type Locale } from '@/lib/i18n/config';
import { type ToolCategory } from '@/types/tool';

interface CategoryPageClientProps {
  locale: Locale;
  category: ToolCategory;
  localizedToolContent?: Record<string, { title: string; description: string }>;
}

export default function CategoryPageClient({ locale, category, localizedToolContent }: CategoryPageClientProps) {
  const t = useTranslations();
  const tools = getToolsByCategory(category);
  const meta = CATEGORY_META[category];
  const categoryName = t(`home.categories.${meta.i18nKey}`);

  return (
    <div className="flex min-h-screen flex-col bg-[hsl(var(--color-background))]">
      <Header locale={locale} />

      <main id="main-content" className="flex-1" tabIndex={-1}>
        <section className={`pc-hero-wash pb-12 pt-28 ${meta.colorClass}`}>
          <div className="mx-auto max-w-4xl px-4 text-center">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-1 text-sm text-[hsl(var(--color-muted-foreground))]">
              <Link href={`/${locale}`} className="hover:text-[hsl(var(--color-primary))]">
                {t('common.navigation.home')}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link href={`/${locale}/tools`} className="hover:text-[hsl(var(--color-primary))]">
                {t('common.navigation.tools')}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-medium text-[hsl(var(--color-foreground))]" aria-current="page">
                {categoryName}
              </span>
            </nav>
            <span className="cat-solid mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg" aria-hidden="true">
              <meta.icon className="h-8 w-8" />
            </span>
            <h1 className="font-display mb-3 text-4xl font-extrabold sm:text-5xl">{categoryName}</h1>
            <p className="text-lg text-[hsl(var(--color-muted-foreground))]">{t(`home.categoriesDescription.${meta.i18nKey}`)}</p>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ToolGrid tools={tools} locale={locale} localizedToolContent={localizedToolContent} />

            <div className="mt-14 flex flex-wrap justify-center gap-2">
              {CATEGORY_ORDER.filter((c) => c !== category).map((c) => {
                const m = CATEGORY_META[c];
                return (
                  <Link
                    key={c}
                    href={`/${locale}/tools/category/${c}`}
                    className={`${m.colorClass} cat-border-hover inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-4 py-2.5 text-sm font-semibold shadow-[var(--shadow-sm)]`}
                  >
                    <m.icon className="cat-text h-4 w-4" aria-hidden="true" />
                    {t(`home.categories.${m.i18nKey}`)}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
