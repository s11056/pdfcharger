/**
 * Blog post loading
 * Reads Markdown posts from content/blog at build time (server only).
 *
 * Each post is a `.md` file whose name is its slug, starting with a
 * frontmatter block:
 *
 *   ---
 *   title: How to compress a PDF without uploading it
 *   description: One or two sentences for search results (max ~160 chars).
 *   date: 2026-11-17
 *   updated: 2026-11-20        (optional)
 *   tools: [compress-pdf]      (optional, tool ids shown as call-to-action cards)
 *   draft: true                (optional, drafts only appear in `npm run dev`)
 *   ---
 *
 * English posts live in content/blog/. Translations live in
 * content/blog/<locale>/ under the same file name as the English post, so
 * every translation shares its slug with the original.
 *
 * @module lib/blog/posts
 */

import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { locales, type Locale } from '@/lib/i18n/config';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/** Locale of the original posts in content/blog/ */
export const BLOG_DEFAULT_LOCALE = 'en' as const;

function localeDir(locale: Locale): string {
  return locale === BLOG_DEFAULT_LOCALE ? BLOG_DIR : path.join(BLOG_DIR, locale);
}

export interface BlogPostMeta {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD) the post was first published */
  date: string;
  /** ISO date of the last meaningful content change */
  updated?: string;
  /** Tool ids from src/config/tools.ts to promote alongside the post */
  tools: string[];
  draft: boolean;
  /** Estimated reading time in minutes */
  readingMinutes: number;
}

export interface BlogPost extends BlogPostMeta {
  /** Rendered HTML of the post body */
  html: string;
}

function parseFrontmatter(source: string, file: string): { data: Record<string, string | string[]>; body: string } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`Blog post ${file} is missing its frontmatter block`);
  }

  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (!field) continue;
    const [, key, raw] = field;
    const value = raw.trim();
    data[key] = value.startsWith('[') && value.endsWith(']')
      ? value.slice(1, -1).split(',').map((item) => item.trim()).filter(Boolean)
      : value.replace(/^(['"])(.*)\1$/, '$2');
  }

  return { data, body: match[2] };
}

function readPost(locale: Locale, file: string): BlogPost {
  const slug = file.replace(/\.md$/, '');
  const source = fs.readFileSync(path.join(localeDir(locale), file), 'utf8');
  const { data, body } = parseFrontmatter(source, file);

  for (const key of ['title', 'description', 'date']) {
    if (typeof data[key] !== 'string' || !data[key]) {
      throw new Error(`Blog post ${file} needs a "${key}" in its frontmatter`);
    }
  }

  const words = body.split(/\s+/).filter(Boolean).length;

  // CJK text has no spaces, so estimate those by characters instead of words
  const cjkChars = (body.match(/[぀-ヿ㐀-鿿가-힯]/g) || []).length;

  return {
    slug,
    locale,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    updated: typeof data.updated === 'string' && data.updated ? data.updated : undefined,
    tools: Array.isArray(data.tools) ? data.tools : [],
    draft: data.draft === 'true',
    readingMinutes: Math.max(1, Math.round(words / 220 + cjkChars / 500)),
    html: marked.parse(body, { async: false }),
  };
}

/**
 * All posts in a locale, newest first. Drafts are only included in development.
 */
export function getAllPosts(locale: Locale = BLOG_DEFAULT_LOCALE): BlogPost[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];

  const includeDrafts = process.env.NODE_ENV !== 'production';

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_') && file !== 'README.md')
    .map((file) => readPost(locale, file))
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string, locale: Locale = BLOG_DEFAULT_LOCALE): BlogPost | undefined {
  return getAllPosts(locale).find((post) => post.slug === slug);
}

/** Locales that have at least one post (always includes English) */
export function getBlogLocales(): Locale[] {
  return locales.filter((locale) => locale === BLOG_DEFAULT_LOCALE || getAllPosts(locale).length > 0);
}

/** Locales a post is available in, for hreflang links */
export function getPostLocales(slug: string): Locale[] {
  return locales.filter((locale) => fs.existsSync(path.join(localeDir(locale), `${slug}.md`)));
}
