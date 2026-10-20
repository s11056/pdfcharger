'use client';
import React from 'react';
import Link from 'next/link';
import { Tool } from '@/types/tool';
import { getToolIcon } from '@/config/icons';
import { CATEGORY_META, humanizeToolId } from '@/config/categories';
import { FavoriteButton } from '@/components/ui/FavoriteButton';

export interface ToolCardProps {
  /** Tool data to display */
  tool: Tool;
  /** Current locale for URL generation */
  locale: string;
  /** Optional additional CSS classes */
  className?: string;
  /** Localized content */
  localizedContent?: { title: string; description: string };
  /** Called before navigating (e.g. to hand off dropped files) */
  onSelect?: (tool: Tool) => void;
}

/**
 * Tool tile: colour-coded icon, bold name, two-line description.
 */
export function ToolCard({ tool, locale, className = '', localizedContent, onSelect }: ToolCardProps) {
  const toolName = localizedContent?.title || humanizeToolId(tool.id);
  const description =
    localizedContent?.description ||
    tool.features.slice(0, 3).map((f) => f.replace(/-/g, ' ')).join(', ');

  const IconComponent = getToolIcon(tool.icon);
  const meta = CATEGORY_META[tool.category];

  return (
    <Link
      href={`/${locale}/tools/${tool.slug}`}
      onClick={() => onSelect?.(tool)}
      className={`group relative block rounded-[var(--radius-lg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))] focus-visible:ring-offset-2 ${meta.colorClass} ${className}`}
      data-testid="tool-card"
    >
      <div
        className="cat-border-hover relative h-full rounded-[var(--radius-lg)] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-5 shadow-[var(--shadow-sm)] transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-lg)]"
        data-testid="tool-card-container"
      >
        <div className="absolute right-2.5 top-2.5 z-10 opacity-60 transition-opacity group-hover:opacity-100">
          <FavoriteButton toolId={tool.id} size="sm" />
        </div>

        <div
          className="cat-tile mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
          data-testid="tool-card-icon"
          aria-hidden="true"
        >
          <IconComponent className="h-6 w-6" data-icon={tool.icon} />
        </div>

        <h3
          className="font-display mb-1.5 pr-6 text-[1.05rem] font-bold leading-snug text-[hsl(var(--color-card-foreground))]"
          data-testid="tool-card-name"
        >
          {toolName}
        </h3>
        <p
          className="line-clamp-2 text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]"
          data-testid="tool-card-description"
        >
          {description}
        </p>
      </div>
    </Link>
  );
}

export default ToolCard;
