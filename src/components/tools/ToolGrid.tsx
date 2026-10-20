'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Tool, ToolCategory } from '@/types/tool';
import { CATEGORY_META, CATEGORY_ORDER } from '@/config/categories';
import { ToolCard } from './ToolCard';

export interface ToolGridProps {
  /** Array of tools to display */
  tools: Tool[];
  /** Current locale for URL generation */
  locale: string;
  /** Optional category filter */
  category?: ToolCategory;
  /** Optional search query to filter tools */
  searchQuery?: string;
  /** Whether to show category headers */
  showCategoryHeaders?: boolean;
  /** Optional additional CSS classes */
  className?: string;
  /** localized tool content */
  localizedToolContent?: Record<string, { title: string; description: string }>;
  /** Called when a tool card is clicked */
  onSelectTool?: (tool: Tool) => void;
}

const GRID = 'grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';

/**
 * Responsive grid of tool cards, optionally grouped under category headers.
 */
export function ToolGrid({
  tools,
  locale,
  category,
  searchQuery,
  showCategoryHeaders = false,
  className = '',
  localizedToolContent,
  onSelectTool,
}: ToolGridProps) {
  const t = useTranslations();

  const filteredTools = useMemo(() => {
    let result = tools;

    if (category) {
      result = result.filter((tool) => tool.category === category);
    }

    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((tool) => {
        const localized = localizedToolContent?.[tool.id];
        if (localized) {
          if (localized.title.toLowerCase().includes(query) || localized.description.toLowerCase().includes(query)) {
            return true;
          }
        }
        const toolName = tool.id.replace(/-/g, ' ').toLowerCase();
        const features = tool.features.map((f) => f.replace(/-/g, ' ').toLowerCase()).join(' ');
        return toolName.includes(query) || features.includes(query);
      });
    }

    return result;
  }, [tools, category, searchQuery, localizedToolContent]);

  if (filteredTools.length === 0) {
    return (
      <div className={`py-12 text-center ${className}`} data-testid="tool-grid-empty">
        <p className="text-[hsl(var(--color-muted-foreground))]">No tools found</p>
      </div>
    );
  }

  const renderCards = (list: Tool[]) =>
    list.map((tool) => (
      <ToolCard
        key={tool.id}
        tool={tool}
        locale={locale}
        localizedContent={localizedToolContent?.[tool.id]}
        onSelect={onSelectTool}
      />
    ));

  if (showCategoryHeaders) {
    return (
      <div className={`space-y-14 ${className}`} data-testid="tool-grid">
        {CATEGORY_ORDER.map((cat) => {
          const categoryTools = filteredTools.filter((tool) => tool.category === cat);
          if (categoryTools.length === 0) return null;
          const meta = CATEGORY_META[cat];
          const Icon = meta.icon;

          return (
            <section key={cat} id={cat} className={`scroll-mt-28 ${meta.colorClass}`} data-testid={`tool-grid-category-${cat}`}>
              <div className="mb-5 flex items-center gap-3">
                <span className="cat-solid flex h-10 w-10 items-center justify-center rounded-xl shadow-sm" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-extrabold text-[hsl(var(--color-foreground))]">
                    {t(`home.categories.${meta.i18nKey}`)}
                    <span className="ml-2 align-middle text-sm font-semibold text-[hsl(var(--color-muted-foreground))]">
                      {categoryTools.length}
                    </span>
                  </h2>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                    {t(`home.categoriesDescription.${meta.i18nKey}`)}
                  </p>
                </div>
              </div>
              <div className={GRID}>{renderCards(categoryTools)}</div>
            </section>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`${GRID} ${className}`} data-testid="tool-grid">
      {renderCards(filteredTools)}
    </div>
  );
}

export default ToolGrid;
