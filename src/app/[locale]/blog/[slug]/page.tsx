import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBlogMetadata, generateBlogPostingSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { getAllPosts, getBlogLocales, getPostBySlug, getPostLocales } from '@/lib/blog/posts';
import { getBlogStrings } from '@/lib/blog/i18n';
import { getToolById } from '@/config/tools';
import { getToolContent } from '@/config/tool-content';
import type { Locale } from '@/lib/i18n/config';
import { formatPostDate } from '../format';

// Only posts that exist in a locale are built; other locale/slug pairs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogLocales().flatMap((locale) => getAllPosts(locale).map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const post = getPostBySlug(slug, locale);
  if (!post) return {};

  return {
    ...generateBlogMetadata({
      locale,
      availableLocales: getPostLocales(post.slug),
      path: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated,
    }),
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const post = getPostBySlug(slug, locale);
  if (!post) notFound();
  const strings = getBlogStrings(locale);

  const tools = post.tools.flatMap((id) => {
    const tool = getToolById(id);
    const content = getToolContent(locale, id);
    return tool && content ? [{ slug: tool.slug, title: content.title, description: content.metaDescription }] : [];
  });

  const breadcrumb = generateBreadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog/' },
      { name: post.title, path: `/blog/${post.slug}/` },
    ],
    locale
  );

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={[generateBlogPostingSchema(post), breadcrumb]} />
      <Header locale={locale} />

      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href={`/${locale}/blog/`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--color-primary))] hover:underline"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /> {strings.allGuides}
            </Link>
          </nav>

          <header className="mb-10">
            <h1 className="font-display mb-4 text-3xl font-extrabold leading-tight text-[hsl(var(--color-foreground))] md:text-5xl">
              {post.title}
            </h1>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
              {post.updated && (
                <>
                  {` · ${strings.updated} `}
                  <time dateTime={post.updated}>{formatPostDate(post.updated, locale)}</time>
                </>
              )}
              {` · ${strings.minRead.replace('{n}', String(post.readingMinutes))}`}
            </p>
          </header>

          <div className="pc-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

          {tools.length > 0 && (
            <aside className="mt-14 rounded-3xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-6 md:p-8">
              <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--color-success))]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                {strings.privacyNote}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/${locale}/tools/${tool.slug}/`}
                    className="pc-card group rounded-2xl p-5 transition-colors hover:border-[hsl(var(--color-primary)/0.5)]"
                  >
                    <p className="font-display mb-1 text-lg font-bold text-[hsl(var(--color-foreground))] group-hover:text-[hsl(var(--color-primary))]">
                      {tool.title}
                    </p>
                    <p className="mb-3 text-sm text-[hsl(var(--color-muted-foreground))]">{tool.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--color-primary))]">
                      {strings.openTool} <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </article>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
