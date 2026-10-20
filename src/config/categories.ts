import {
  FolderKanban,
  Gauge,
  FileInput,
  FileOutput,
  PenLine,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import type { ToolCategory } from '@/types/tool';

export interface CategoryMeta {
  id: ToolCategory;
  /** Key under `home.categories.*` / `home.categoriesDescription.*` */
  i18nKey: string;
  /** CSS class that sets the `--cat` colour (see globals.css) */
  colorClass: string;
  icon: LucideIcon;
}

/** Display order across the site (most-used first, like iLovePDF) */
export const CATEGORY_ORDER: ToolCategory[] = [
  'organize-manage',
  'optimize-repair',
  'convert-to-pdf',
  'convert-from-pdf',
  'edit-annotate',
  'secure-pdf',
];

export const CATEGORY_META: Record<ToolCategory, CategoryMeta> = {
  'organize-manage': { id: 'organize-manage', i18nKey: 'organizeManage', colorClass: 'cat-organize', icon: FolderKanban },
  'optimize-repair': { id: 'optimize-repair', i18nKey: 'optimizeRepair', colorClass: 'cat-optimize', icon: Gauge },
  'convert-to-pdf': { id: 'convert-to-pdf', i18nKey: 'convertToPdf', colorClass: 'cat-convert-to', icon: FileInput },
  'convert-from-pdf': { id: 'convert-from-pdf', i18nKey: 'convertFromPdf', colorClass: 'cat-convert-from', icon: FileOutput },
  'edit-annotate': { id: 'edit-annotate', i18nKey: 'editAnnotate', colorClass: 'cat-edit', icon: PenLine },
  'secure-pdf': { id: 'secure-pdf', i18nKey: 'securePdf', colorClass: 'cat-secure', icon: ShieldCheck },
};

/** Fallback display name for a tool id, e.g. 'merge-pdf' -> 'Merge Pdf' */
export function humanizeToolId(id: string): string {
  return id
    .split('-')
    .map((w) => (w === 'pdf' ? 'PDF' : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}
