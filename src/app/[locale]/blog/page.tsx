import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generateBlogMetadata } from '@/lib/seo';
import { getAllPosts, getBlogLocales, BLOG_DEFAULT_LOCALE, type BlogPostMeta } from '@/lib/blog/posts';
import { getBlogStrings } from '@/lib/blog/i18n';
import type { Locale } from '@/lib/i18n/config';
import { formatPostDate } from './format';

// Only locales with at least one post get a blog index; others 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogLocales().map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const strings = getBlogStrings(locale);
  return generateBlogMetadata({
    locale,
    availableLocales: getBlogLocales(),
    path: '/blog',
    title: strings.title,
    description: strings.metaDescription,
  });
}

function PostList({ posts, locale }: { posts: BlogPostMeta[]; locale: Locale }) {
  const strings = getBlogStrings(locale);
  return (
    <ul className="flex flex-col gap-5">
      {posts.map((post) => (
        <li key={`${post.locale}-${post.slug}`}>
          <Link
            href={`/${post.locale}/blog/${post.slug}/`}
            hrefLang={post.locale}
            className="pc-card group block rounded-2xl p-6 transition-colors hover:border-[hsl(var(--color-primary)/0.5)]"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-muted-foreground))]">
              <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time> ·{' '}
              {strings.minRead.replace('{n}', String(post.readingMinutes))}
              {post.draft && <span className="ml-2 rounded bg-amber-500/15 px-1.5 py-0.5 text-amber-600">Draft</span>}
            </p>
            <h2 className="font-display mb-2 text-xl font-bold text-[hsl(var(--color-foreground))] group-hover:text-[hsl(var(--color-primary))]">
              {post.title}
            </h2>
            <p className="mb-3 text-[hsl(var(--color-muted-foreground))]">{post.description}</p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--color-primary))]">
              {strings.readGuide} <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);
  const strings = getBlogStrings(locale);

  const posts = getAllPosts(locale);
  // On a translated blog, also list the English posts that have no translation yet
  const translated = new Set(posts.map((post) => post.slug));
  const englishOnly = locale === BLOG_DEFAULT_LOCALE
    ? []
    : getAllPosts(BLOG_DEFAULT_LOCALE).filter((post) => !translated.has(post.slug));

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />

      <main className="flex-1">
        <section className="pc-hero-wash py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h1 className="font-display mb-4 text-4xl font-extrabold text-[hsl(var(--color-foreground))] md:text-5xl">
              {strings.title}
            </h1>
            <p className="text-lg text-[hsl(var(--color-muted-foreground))]">{strings.subtitle}</p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-3xl px-4">
            {posts.length === 0 ? (
              <p className="text-center text-[hsl(var(--color-muted-foreground))]">{strings.noPosts}</p>
            ) : (
              <PostList posts={posts} locale={locale} />
            )}

            {englishOnly.length > 0 && (
              <div className="mt-14">
                <h2 className="font-display mb-5 text-2xl font-extrabold text-[hsl(var(--color-foreground))]">
                  {strings.moreInEnglish}
                </h2>
                <div lang="en">
                  <PostList posts={englishOnly} locale={BLOG_DEFAULT_LOCALE} />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
