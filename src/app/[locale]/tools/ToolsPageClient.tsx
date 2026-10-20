'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Search, X, Star, LayoutGrid } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { Button } from '@/components/ui/Button';
import { getAllTools, getToolsByCategory, getToolById } from '@/config/tools';
import { CATEGORY_META, CATEGORY_ORDER } from '@/config/categories';
import { toolMatchesQuery } from '@/lib/utils/search';
import { type Locale } from '@/lib/i18n/config';
import { type ToolCategory } from '@/types/tool';
import { useFavorites } from '@/hooks/useFavorites';

type CategoryFilter = ToolCategory | 'all' | 'favorites';

interface ToolsPageClientProps {
  locale: Locale;
  localizedToolContent?: Record<string, { title: string; description: string }>;
}

export default function ToolsPageClient({ locale, localizedToolContent }: ToolsPageClientProps) {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const allTools = getAllTools();
  const { favorites, isLoaded: favoritesLoaded, favoritesCount } = useFavorites();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(
    (searchParams.get('category') as CategoryFilter) || 'all'
  );

  // Sync state with URL params when they change
  useEffect(() => {
    setSelectedCategory((searchParams.get('category') as CategoryFilter) || 'all');
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const filteredTools = useMemo(() => {
    let tools = allTools;

    if (selectedCategory === 'favorites') {
      tools = favorites
        .map((id) => getToolById(id))
        .filter((tool): tool is NonNullable<typeof tool> => tool !== undefined);
    } else if (selectedCategory !== 'all') {
      tools = getToolsByCategory(selectedCategory);
    }

    if (searchQuery.trim()) {
      tools = tools.filter((tool) => toolMatchesQuery(tool, searchQuery, localizedToolContent?.[tool.id]));
    }

    return tools;
  }, [allTools, selectedCategory, searchQuery, favorites, localizedToolContent]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
  }, []);

  const pill = (active: boolean, extra = '') =>
    `flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${extra} ${
      active ? '' : 'text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))] hover:text-[hsl(var(--color-foreground))]'
    }`;

  const resultLabel =
    selectedCategory === 'favorites'
      ? `${filteredTools.length} ${t('tools.favorite.title').toLowerCase()}`
      : filteredTools.length === allTools.length
        ? t('toolsPage.showingAll', { count: allTools.length })
        : t('toolsPage.showingFiltered', { filtered: filteredTools.length, total: allTools.length });

  return (
    <div className="flex min-h-screen flex-col bg-[hsl(var(--color-background))]">
      <Header locale={locale} />

      <main id="main-content" className="flex-1" tabIndex={-1}>
        <section className="pc-hero-wash pb-12 pt-32">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h1 className="font-display mb-4 text-4xl font-extrabold sm:text-5xl">{t('toolsPage.title')}</h1>
            <p className="mb-8 text-lg text-[hsl(var(--color-muted-foreground))]">
              {t('toolsPage.subtitle', { count: allTools.length })}
            </p>
            <div className="relative mx-auto max-w-2xl">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[hsl(var(--color-primary))]" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('tools.search.placeholder')}
                className="w-full rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] py-4 pl-14 pr-12 text-base shadow-[var(--shadow-lg)] placeholder:text-[hsl(var(--color-muted-foreground))] focus:border-[hsl(var(--color-primary))] focus:outline-none focus:ring-4 focus:ring-[hsl(var(--color-primary)/0.15)]"
                aria-label="Search tools"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-[hsl(var(--color-muted))]"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="min-h-[500px] pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            {/* Category pills */}
            <div className="sticky top-[76px] z-30 mb-6">
              <div
                className="scrollbar-hide mx-auto flex max-w-max gap-1 overflow-x-auto rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card)/0.92)] p-1.5 shadow-[var(--shadow-md)] backdrop-blur"
                role="group"
                aria-label="Filter by category"
              >
                <button
                  onClick={() => setSelectedCategory('all')}
                  aria-pressed={selectedCategory === 'all'}
                  className={pill(selectedCategory === 'all', selectedCategory === 'all' ? 'pc-brand-gradient text-white' : '')}
                >
                  <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                  {t('toolsPage.allTools')}
                </button>
                <button
                  onClick={() => setSelectedCategory('favorites')}
                  aria-pressed={selectedCategory === 'favorites'}
                  className={pill(selectedCategory === 'favorites', selectedCategory === 'favorites' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' : '')}
                >
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" aria-hidden="true" />
                  {t('tools.favorite.title')}
                  {favoritesLoaded && <span className="text-xs opacity-70">({favoritesCount})</span>}
                </button>
                {CATEGORY_ORDER.map((cat) => {
                  const meta = CATEGORY_META[cat];
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      aria-pressed={active}
                      className={pill(active, `${meta.colorClass} ${active ? 'cat-solid' : ''}`)}
                    >
                      <meta.icon className="h-4 w-4" aria-hidden="true" />
                      {t(`home.categories.${meta.i18nKey}`)}
                      <span className="text-xs opacity-70">({getToolsByCategory(cat).length})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between gap-4 px-1">
              <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                {resultLabel}
                {searchQuery && ` ${t('toolsPage.forQuery', { query: searchQuery })}`}
              </p>
              {(searchQuery || selectedCategory !== 'all') && (
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  {t('toolsPage.clearAll')}
                </Button>
              )}
            </div>

            {filteredTools.length > 0 ? (
              <ToolGrid
                tools={filteredTools}
                locale={locale}
                localizedToolContent={localizedToolContent}
                showCategoryHeaders={selectedCategory === 'all' && !searchQuery}
              />
            ) : (
              <div className="mx-auto max-w-md rounded-[var(--radius-xl)] border-2 border-dashed border-[hsl(var(--color-border))] p-12 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--color-muted))]">
                  {selectedCategory === 'favorites' ? (
                    <Star className="h-8 w-8 text-amber-500" aria-hidden="true" />
                  ) : (
                    <Search className="h-8 w-8 text-[hsl(var(--color-muted-foreground))]" aria-hidden="true" />
                  )}
                </div>
                <h3 className="font-display mb-2 text-xl font-bold">
                  {selectedCategory === 'favorites' ? t('tools.favorite.empty') : t('toolsPage.noToolsFound')}
                </h3>
                <p className="mb-6 text-[hsl(var(--color-muted-foreground))]">
                  {selectedCategory === 'favorites' ? t('tools.favorite.hint') : t('tools.search.noResults', { query: searchQuery })}
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  {t('toolsPage.clearFilters')}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
