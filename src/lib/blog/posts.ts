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
 * @module lib/blog/posts
 */

import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/** The blog is English-only; translate posts individually once they rank. */
export const BLOG_LOCALE = 'en' as const;

export interface BlogPostMeta {
  slug: string;
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

function readPost(file: string): BlogPost {
  const slug = file.replace(/\.md$/, '');
  const source = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
  const { data, body } = parseFrontmatter(source, file);

  for (const key of ['title', 'description', 'date']) {
    if (typeof data[key] !== 'string' || !data[key]) {
      throw new Error(`Blog post ${file} needs a "${key}" in its frontmatter`);
    }
  }

  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    updated: typeof data.updated === 'string' && data.updated ? data.updated : undefined,
    tools: Array.isArray(data.tools) ? data.tools : [],
    draft: data.draft === 'true',
    readingMinutes: Math.max(1, Math.round(words / 220)),
    html: marked.parse(body, { async: false }),
  };
}

/**
 * All posts, newest first. Drafts are only included in development.
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const includeDrafts = process.env.NODE_ENV !== 'production';

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_') && file !== 'README.md')
    .map(readPost)
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
