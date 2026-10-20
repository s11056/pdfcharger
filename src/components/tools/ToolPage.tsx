'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ChevronRight, ChevronDown, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Tool, ToolContent, HowToStep, UseCase, FAQ } from '@/types/tool';
import { getToolById } from '@/config/tools';
import { getToolIcon } from '@/config/icons';
import { CATEGORY_META, humanizeToolId } from '@/config/categories';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToolCard } from '@/components/tools/ToolCard';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import { type Locale } from '@/lib/i18n/config';
import { ToolProvider } from '@/lib/contexts/ToolContext';
import { sanitizeHtml } from '@/lib/utils/html-sanitizer';

export interface ToolPageProps {
  /** Tool data */
  tool: Tool;
  /** Tool content for SEO and documentation */
  content: ToolContent;
  /** Current locale */
  locale: string;
  /** Children for the tool interface area */
  children?: React.ReactNode;
  /** Localized content for related tools */
  localizedRelatedTools?: Record<string, { title: string; description: string }>;
}

const sectionTitle = 'font-display mb-6 text-2xl font-extrabold text-[hsl(var(--color-foreground))] sm:text-3xl';

/**
 * Layout for individual tool pages: hero, tool workspace, then how-to,
 * description, use cases, FAQ and related tools for SEO.
 */
export function ToolPage({ tool, content, locale, children, localizedRelatedTools = {} }: ToolPageProps) {
  const t = useTranslations();
  const relatedTools = tool.relatedTools.map((id) => getToolById(id)).filter((x): x is Tool => x !== undefined);
  const toolDisplayName = content.title || humanizeToolId(tool.id);
  const meta = CATEGORY_META[tool.category];
  const categoryName = t(`home.categories.${meta.i18nKey}`);

  return (
    <ToolProvider toolSlug={tool.slug} toolName={toolDisplayName}>
      <div className="flex min-h-screen flex-col bg-[hsl(var(--color-background))]" data-testid="tool-page">
        <Header locale={locale as Locale} />

        <main id="main-content" className="flex-1" tabIndex={-1}>
          {/* Hero */}
          <div className="pc-hero-wash pb-8 pt-24 sm:pt-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-center gap-1 text-sm text-[hsl(var(--color-muted-foreground))]">
                <Link href={`/${locale}`} className="hover:text-[hsl(var(--color-primary))]">
                  {t('common.navigation.home')}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                <Link href={`/${locale}/tools/category/${tool.category}`} className="hover:text-[hsl(var(--color-primary))]">
                  {categoryName}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="max-w-[200px] truncate font-medium text-[hsl(var(--color-foreground))] sm:max-w-md" aria-current="page">
                  {toolDisplayName}
                </span>
              </nav>

              <ToolHeader tool={tool} content={content} />
            </div>
          </div>

          {/* Tool workspace */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <section
              className="rounded-[var(--radius-xl)] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-4 shadow-[var(--shadow-lg)] sm:p-6"
              data-testid="tool-page-interface"
              aria-label="Tool interface"
            >
              {children}
            </section>
          </div>

          {/* Content for people and search engines */}
          <div className="mx-auto max-w-6xl space-y-20 px-4 py-20 sm:px-6">
            <HowToUseSection steps={content.howToUse} />
            <DescriptionSection description={content.description} />
            <UseCasesSection useCases={content.useCases} />
            <FAQSection faq={content.faq} />
            <RelatedToolsSection tools={relatedTools} locale={locale} localizedRelatedTools={localizedRelatedTools} />
          </div>
        </main>

        <Footer locale={locale as Locale} />
      </div>
    </ToolProvider>
  );
}

function ToolHeader({ tool, content }: { tool: Tool; content: ToolContent }) {
  const t = useTranslations();
  const IconComponent = getToolIcon(tool.icon);
  const meta = CATEGORY_META[tool.category];

  return (
    <header className={`text-center ${meta.colorClass}`} data-testid="tool-page-header" itemScope itemType="https://schema.org/SoftwareApplication">
      <meta itemProp="applicationCategory" content="UtilitiesApplication" />
      <meta itemProp="operatingSystem" content="Web Browser" />
      <meta itemProp="offers" itemScope itemType="https://schema.org/Offer" content="" />
      <meta itemProp="price" content="0" />
      <meta itemProp="priceCurrency" content="USD" />
      <div className="cat-solid mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-[0_10px_24px_-10px_hsl(var(--cat))]" aria-hidden="true">
        <IconComponent className="h-8 w-8" />
      </div>
      <h1 className="font-display mb-3 text-3xl font-extrabold text-[hsl(var(--color-foreground))] sm:text-5xl" data-testid="tool-page-title" itemProp="name">
        {content.title || humanizeToolId(tool.id)}
      </h1>
      <p className="mx-auto mb-5 max-w-2xl text-lg leading-relaxed text-[hsl(var(--color-muted-foreground))]" data-testid="tool-page-subtitle" itemProp="description">
        {content.metaDescription}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--color-success)/0.1)] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--color-success))]">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          {t('tools.pc.privateNote')}
        </span>
        <FavoriteButton toolId={tool.id} size="md" showLabel />
      </div>
    </header>
  );
}

function DescriptionSection({ description }: { description: string }) {
  const t = useTranslations();
  const sanitizedDescription = useMemo(() => sanitizeHtml(description), [description]);
  if (!description) return null;

  return (
    <section data-testid="tool-page-description" aria-labelledby="description-heading">
      <h2 id="description-heading" className={sectionTitle}>
        {t('tools.about')}
      </h2>
      <div
        className="prose prose-sm max-w-none rounded-[var(--radius-lg)] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-6 leading-relaxed text-[hsl(var(--color-foreground)/0.85)] sm:p-8 sm:text-base"
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
    </section>
  );
}

function HowToUseSection({ steps }: { steps: HowToStep[] }) {
  const t = useTranslations();
  if (!steps || steps.length === 0) return null;

  return (
    <section data-testid="tool-page-how-to-use" aria-labelledby="how-to-use-heading" itemScope itemType="https://schema.org/HowTo">
      <h2 id="how-to-use-heading" className={`${sectionTitle} text-center`} itemProp="name">
        {t('tools.howToUse')}
      </h2>
      <ol className={`grid gap-6 pt-4 ${steps.length >= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`} data-testid="how-to-use-steps">
        {steps.map((step) => (
          <li
            key={step.step}
            className="relative rounded-[var(--radius-lg)] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-6 pt-8 text-center shadow-[var(--shadow-sm)]"
            data-testid={`how-to-step-${step.step}`}
            id={`step-${step.step}`}
            itemScope
            itemProp="step"
            itemType="https://schema.org/HowToStep"
          >
            <meta itemProp="position" content={String(step.step)} />
            <span className="pc-brand-gradient absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full text-sm font-bold text-white shadow-md" aria-hidden="true">
              {step.step}
            </span>
            <h3 className="font-display mb-2 text-lg font-bold" itemProp="name">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]" itemProp="text">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function UseCasesSection({ useCases }: { useCases: UseCase[] }) {
  const t = useTranslations();
  if (!useCases || useCases.length === 0) return null;

  return (
    <section data-testid="tool-page-use-cases" aria-labelledby="use-cases-heading">
      <h2 id="use-cases-heading" className={sectionTitle}>
        {t('tools.useCases')}
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" data-testid="use-cases-grid">
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className="flex gap-4 rounded-[var(--radius-lg)] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-5 shadow-[var(--shadow-sm)]"
            data-testid={`use-case-${index}`}
          >
            <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-[hsl(var(--color-primary))]" aria-hidden="true" />
            <div>
              <h3 className="mb-1 font-bold">{useCase.title}</h3>
              <p className="text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">{useCase.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection({ faq }: { faq: FAQ[] }) {
  const t = useTranslations();
  if (!faq || faq.length === 0) return null;

  return (
    <section className="mx-auto max-w-3xl" data-testid="tool-page-faq" aria-labelledby="faq-heading" itemScope itemType="https://schema.org/FAQPage">
      <h2 id="faq-heading" className={`${sectionTitle} text-center`}>
        {t('tools.faq')}
      </h2>
      <div className="space-y-3" data-testid="faq-list">
        {faq.map((item, index) => (
          <details
            key={index}
            className="group rounded-[var(--radius-lg)] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-5 shadow-[var(--shadow-sm)] open:shadow-[var(--shadow-md)]"
            data-testid={`faq-item-${index}`}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4">
              <h3 className="font-semibold" itemProp="name">
                {item.question}
              </h3>
              <ChevronDown className="h-5 w-5 flex-shrink-0 text-[hsl(var(--color-muted-foreground))] transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p className="pb-5 text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]" itemProp="text">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function RelatedToolsSection({
  tools,
  locale,
  localizedRelatedTools,
}: {
  tools: Tool[];
  locale: string;
  localizedRelatedTools: Record<string, { title: string; description: string }>;
}) {
  const t = useTranslations();
  if (!tools || tools.length === 0) return null;

  return (
    <section data-testid="tool-page-related-tools" aria-labelledby="related-tools-heading">
      <h2 id="related-tools-heading" className={sectionTitle}>
        {t('tools.relatedTools')}
      </h2>
      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4" data-testid="related-tools-grid">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} locale={locale} localizedContent={localizedRelatedTools[tool.id]} />
        ))}
      </div>
    </section>
  );
}

export default ToolPage;
