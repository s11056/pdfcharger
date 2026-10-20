'use client';

import { useMemo } from 'react';
import { getToolContent } from '@/config/tool-content';
import { getAllTools } from '@/config/tools';
import { humanizeToolId } from '@/config/categories';
import type { Locale } from '@/lib/i18n/config';

export type LocalizedToolMap = Record<string, { title: string; description: string }>;

/** Map of tool id -> localized { title, description } for the given locale. */
export function useLocalizedTools(locale: Locale): LocalizedToolMap {
  return useMemo(() => {
    const map: LocalizedToolMap = {};
    for (const tool of getAllTools()) {
      const content = getToolContent(locale, tool.id);
      map[tool.id] = {
        title: content?.title || humanizeToolId(tool.id),
        description: content?.metaDescription || '',
      };
    }
    return map;
  }, [locale]);
}
