import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generateBlogMetadata } from '@/lib/seo';
import { getAllPosts, BLOG_LOCALE } from '@/lib/blog/posts';
import { formatPostDate } from './format';

// The blog is English-only: /en/blog/ is built, other locales 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: BLOG_LOCALE }];
}

export function generateMetadata(): Metadata {
  return generateBlogMetadata({
    path: '/blog',
    title: 'PDF Guides & Tips',
    description:
      'Practical guides for working with PDFs privately: compress, convert, sign, redact and fix PDFs in your browser without uploading them.',
  });
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getAllPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={BLOG_LOCALE} />

      <main className="flex-1">
        <section className="pc-hero-wash py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h1 className="font-display mb-4 text-4xl font-extrabold text-[hsl(var(--color-foreground))] md:text-5xl">
              PDF Guides &amp; Tips
            </h1>
            <p className="text-lg text-[hsl(var(--color-muted-foreground))]">
              How to get things done with PDFs, without handing your documents to anyone.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-3xl px-4">
            {posts.length === 0 ? (
              <p className="text-center text-[hsl(var(--color-muted-foreground))]">No posts yet.</p>
            ) : (
              <ul className="flex flex-col gap-5">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/${BLOG_LOCALE}/blog/${post.slug}/`}
                      className="pc-card group block rounded-2xl p-6 transition-colors hover:border-[hsl(var(--color-primary)/0.5)]"
                    >
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-muted-foreground))]">
                        <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingMinutes} min read
                        {post.draft && <span className="ml-2 rounded bg-amber-500/15 px-1.5 py-0.5 text-amber-600">Draft</span>}
                      </p>
                      <h2 className="font-display mb-2 text-xl font-bold text-[hsl(var(--color-foreground))] group-hover:text-[hsl(var(--color-primary))]">
                        {post.title}
                      </h2>
                      <p className="mb-3 text-[hsl(var(--color-muted-foreground))]">{post.description}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--color-primary))]">
                        Read guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      <Footer locale={BLOG_LOCALE} />
    </div>
  );
}
