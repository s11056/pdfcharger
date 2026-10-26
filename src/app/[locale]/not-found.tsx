'use client';

import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const POPULAR_TOOLS = [
  { label: 'Merge PDF', href: '/en/tools/merge-pdf' },
  { label: 'Split PDF', href: '/en/tools/split-pdf' },
  { label: 'Compress PDF', href: '/en/tools/compress-pdf' },
  { label: 'PDF to Word', href: '/en/tools/pdf-to-docx' },
  { label: 'Word to PDF', href: '/en/tools/word-to-pdf' },
  { label: 'Sign PDF', href: '/en/tools/sign-pdf' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[hsl(var(--color-background))]">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-[hsl(var(--color-muted))] flex items-center justify-center">
          <FileQuestion className="w-8 h-8 text-[hsl(var(--color-muted-foreground))]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[hsl(var(--color-foreground))]">
            Page not found
          </h1>
          <p className="text-[hsl(var(--color-muted-foreground))]">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-foreground))] font-medium hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Go home
          </Link>
          <button
            type="button"
            onClick={() => typeof window !== 'undefined' && window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--color-secondary))] text-[hsl(var(--color-secondary-foreground))] font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>
        </div>

        <div className="border-t border-[hsl(var(--color-border))] pt-6">
          <p className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] mb-3">
            Popular free PDF tools
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {POPULAR_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="text-sm px-3 py-1.5 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-muted))] transition-colors"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
