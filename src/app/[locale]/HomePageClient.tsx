'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Infinity as InfinityIcon,
  Globe2,
  Plus,
  UploadCloud,
  MousePointerClick,
  Download,
  FileText,
  X,
  ChevronDown,
  Check,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { getAllTools, getToolById, getToolsByCategory } from '@/config/tools';
import { getToolIcon } from '@/config/icons';
import { CATEGORY_META, CATEGORY_ORDER, humanizeToolId } from '@/config/categories';
import { setPendingFiles } from '@/lib/pending-files';
import { locales, type Locale } from '@/lib/i18n/config';
import type { Tool, ToolCategory } from '@/types/tool';

interface HomePageClientProps {
  locale: Locale;
  localizedToolContent?: Record<string, { title: string; description: string }>;
}

/** Curated grid for the "All" tab, in iLovePDF's order of importance */
const FEATURED_TOOL_IDS = [
  'merge-pdf', 'split-pdf', 'compress-pdf', 'pdf-to-docx',
  'pdf-to-pptx', 'pdf-to-excel', 'word-to-pdf', 'pptx-to-pdf',
  'excel-to-pdf', 'edit-pdf', 'pdf-to-jpg', 'jpg-to-pdf',
  'sign-pdf', 'add-watermark', 'rotate-pdf', 'organize-pdf',
  'encrypt-pdf', 'decrypt-pdf', 'page-numbers', 'ocr-pdf',
  'pdf-to-pdfa', 'repair-pdf', 'compare-pdfs', 'redact-pdf',
];

/** Suggested next actions for a file dropped on the homepage, by extension */
const SUGGESTIONS: { match: RegExp; ids: string[] }[] = [
  { match: /\.pdf$/i, ids: ['merge-pdf', 'compress-pdf', 'split-pdf', 'pdf-to-docx', 'edit-pdf', 'sign-pdf', 'pdf-to-jpg', 'organize-pdf', 'rotate-pdf', 'encrypt-pdf', 'ocr-pdf', 'add-watermark'] },
  { match: /\.(jpe?g)$/i, ids: ['jpg-to-pdf', 'image-to-pdf', 'merge-pdf'] },
  { match: /\.(png|webp|bmp|gif|tiff?|heic|svg)$/i, ids: ['image-to-pdf', 'png-to-pdf', 'merge-pdf'] },
  { match: /\.(docx?|odt|rtf)$/i, ids: ['word-to-pdf', 'merge-pdf'] },
  { match: /\.(xlsx?|ods|csv)$/i, ids: ['excel-to-pdf', 'merge-pdf'] },
  { match: /\.(pptx?|odp)$/i, ids: ['pptx-to-pdf', 'merge-pdf'] },
  { match: /\.(txt|md)$/i, ids: ['txt-to-pdf', 'markdown-to-pdf'] },
  { match: /\.epub$/i, ids: ['epub-to-pdf'] },
];

const ACCEPT = '.pdf,.jpg,.jpeg,.png,.webp,.bmp,.gif,.tif,.tiff,.heic,.svg,.doc,.docx,.odt,.rtf,.xls,.xlsx,.ods,.csv,.ppt,.pptx,.odp,.txt,.md,.epub';

type Tab = 'all' | ToolCategory;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function HomePageClient({ locale, localizedToolContent = {} }: HomePageClientProps) {
  const t = useTranslations();
  const router = useRouter();
  const allTools = getAllTools();
  const [tab, setTab] = useState<Tab>('all');
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const dragDepth = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const titleOf = useCallback(
    (id: string) => localizedToolContent[id]?.title || humanizeToolId(id),
    [localizedToolContent]
  );

  const gridTools = useMemo<Tool[]>(() => {
    if (tab === 'all') {
      return FEATURED_TOOL_IDS.map((id) => getToolById(id)).filter((x): x is Tool => !!x);
    }
    return getToolsByCategory(tab);
  }, [tab]);

  const suggestions = useMemo<Tool[]>(() => {
    if (files.length === 0) return [];
    const ids = new Set<string>();
    for (const f of files) {
      const rule = SUGGESTIONS.find((s) => s.match.test(f.name));
      (rule?.ids ?? ['merge-pdf']).forEach((id) => ids.add(id));
    }
    return [...ids].map((id) => getToolById(id)).filter((x): x is Tool => !!x);
  }, [files]);

  const acceptFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    setFiles(Array.from(list));
  };

  const openTool = (tool: Tool) => {
    setPendingFiles(files);
    router.push(`/${locale}/tools/${tool.slug}`);
  };

  const steps = [
    { icon: UploadCloud, title: t('home.pc.steps.1.title'), body: t('home.pc.steps.1.body') },
    { icon: MousePointerClick, title: t('home.pc.steps.2.title'), body: t('home.pc.steps.2.body') },
    { icon: Download, title: t('home.pc.steps.3.title'), body: t('home.pc.steps.3.body') },
  ];

  const benefits = [
    { icon: ShieldCheck, title: t('home.features.privacy.title'), body: t('home.features.privacy.description') },
    { icon: Zap, title: t('home.pc.benefits.fast.title'), body: t('home.pc.benefits.fast.body') },
    { icon: InfinityIcon, title: t('home.features.free.title'), body: t('home.features.free.description') },
    { icon: Globe2, title: t('home.pc.benefits.anywhere.title'), body: t('home.pc.benefits.anywhere.body') },
  ];

  const faqs = [1, 2, 3, 4, 5].map((n) => ({ q: t(`home.pc.faq.${n}.q`), a: t(`home.pc.faq.${n}.a`) }));

  const tabs: { value: Tab; label: string }[] = [
    { value: 'all', label: t('toolsPage.allTools') },
    ...CATEGORY_ORDER.map((c) => ({ value: c as Tab, label: t(`home.categories.${CATEGORY_META[c].i18nKey}`) })),
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[hsl(var(--color-background))]">
      <Header locale={locale} />

      <main id="main-content" className="flex-1" tabIndex={-1}>
        {/* ============ HERO ============ */}
        <section className="pc-hero-wash relative overflow-hidden pb-16 pt-28 sm:pt-32" aria-labelledby="hero-title">
          <div className="pc-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" aria-hidden="true" />

          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-primary)/0.2)] bg-[hsl(var(--color-card)/0.8)] px-4 py-1.5 text-sm font-semibold text-[hsl(var(--color-primary))] shadow-[var(--shadow-sm)]">
              <Zap className="h-4 w-4 fill-current" aria-hidden="true" />
              {t('home.pc.badge', { count: allTools.length })}
            </p>

            <h1 id="hero-title" className="font-display mb-5 text-[2.4rem] font-extrabold leading-[1.08] text-[hsl(var(--color-foreground))] sm:text-6xl">
              {t('home.pc.title')} <span className="text-gradient">{t('home.pc.highlight')}</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[hsl(var(--color-muted-foreground))]">
              {t('home.pc.subtitle')}
            </p>

            {/* Drop zone */}
            <div
              className={`relative mx-auto max-w-3xl rounded-[var(--radius-xl)] border bg-[hsl(var(--color-card))] p-2 shadow-[var(--shadow-xl)] transition-colors ${
                dragging ? 'border-[hsl(var(--color-primary))]' : 'border-[hsl(var(--color-border))]'
              }`}
              onDragEnter={(e) => {
                e.preventDefault();
                dragDepth.current += 1;
                setDragging(true);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={(e) => {
                e.preventDefault();
                dragDepth.current -= 1;
                if (dragDepth.current <= 0) setDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                dragDepth.current = 0;
                setDragging(false);
                acceptFiles(e.dataTransfer.files);
              }}
            >
              <input
                ref={inputRef}
                type="file"
                multiple
                accept={ACCEPT}
                className="hidden"
                onChange={(e) => {
                  acceptFiles(e.target.files);
                  e.target.value = '';
                }}
              />

              {files.length === 0 ? (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => inputRef.current?.click()}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
                  className={`group flex cursor-pointer flex-col items-center rounded-[calc(var(--radius-xl)-6px)] border-2 border-dashed px-6 py-12 transition-colors sm:py-14 ${
                    dragging
                      ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.06)]'
                      : 'border-[hsl(var(--color-primary)/0.25)] bg-[hsl(var(--color-surface))] hover:border-[hsl(var(--color-primary)/0.55)]'
                  }`}
                >
                  <span className="pc-brand-gradient inline-flex items-center gap-2 rounded-2xl px-9 py-4 text-lg font-bold text-white shadow-[var(--shadow-xl)] transition-transform group-hover:scale-[1.03]">
                    <Plus className="h-5 w-5" aria-hidden="true" />
                    {t('home.pc.select')}
                  </span>
                  <span className="mt-4 text-sm text-[hsl(var(--color-muted-foreground))]">
                    {dragging ? t('common.fileUploader.dropToUpload') : t('home.pc.orDrop')}
                  </span>
                </div>
              ) : (
                <div className="rounded-[calc(var(--radius-xl)-6px)] bg-[hsl(var(--color-surface))] p-5 text-left sm:p-6">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-display text-lg font-bold">{t('home.pc.whatNext')}</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {files.slice(0, 4).map((f) => (
                          <li key={f.name + f.size} className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-2.5 py-1 text-xs">
                            <FileText className="h-3.5 w-3.5 flex-shrink-0 text-[hsl(var(--color-primary))]" aria-hidden="true" />
                            <span className="truncate">{f.name}</span>
                            <span className="flex-shrink-0 text-[hsl(var(--color-muted-foreground))]">{formatBytes(f.size)}</span>
                          </li>
                        ))}
                        {files.length > 4 && (
                          <li className="rounded-lg px-2 py-1 text-xs text-[hsl(var(--color-muted-foreground))]">+{files.length - 4}</li>
                        )}
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFiles([])}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]"
                      aria-label={t('common.buttons.clear')}
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:grid-cols-3">
                    {suggestions.map((tool) => {
                      const Icon = getToolIcon(tool.icon);
                      return (
                        <button
                          key={tool.id}
                          type="button"
                          onClick={() => openTool(tool)}
                          className={`${CATEGORY_META[tool.category].colorClass} cat-border-hover flex items-center gap-3 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-3 py-2.5 text-left text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]`}
                        >
                          <span className="cat-tile flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg" aria-hidden="true">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="truncate">{titleOf(tool.id)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-[hsl(var(--color-muted-foreground))]">
              {[t('home.pc.trust.1'), t('home.pc.trust.2'), t('home.pc.trust.3')].map((line) => (
                <li key={line} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[hsl(var(--color-success))]" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ TOOL GRID ============ */}
        <section className="py-16" aria-labelledby="tools-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h2 id="tools-heading" className="font-display mb-3 text-3xl font-extrabold sm:text-4xl">
                {t('home.pc.toolsTitle')}
              </h2>
              <p className="mx-auto max-w-2xl text-[hsl(var(--color-muted-foreground))]">{t('home.pc.toolsSubtitle')}</p>
            </div>

            <div className="sticky top-[76px] z-30 -mx-4 mb-8 px-4">
              <div className="scrollbar-hide mx-auto flex max-w-max gap-1 overflow-x-auto rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card)/0.92)] p-1.5 shadow-[var(--shadow-md)] backdrop-blur" role="tablist" aria-label="Tool categories">
                {tabs.map((item) => {
                  const active = tab === item.value;
                  const meta = item.value === 'all' ? null : CATEGORY_META[item.value];
                  return (
                    <button
                      key={item.value}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setTab(item.value)}
                      className={`${meta?.colorClass ?? ''} flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                        active
                          ? item.value === 'all'
                            ? 'pc-brand-gradient text-white shadow-sm'
                            : 'cat-solid shadow-sm'
                          : 'text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))] hover:text-[hsl(var(--color-foreground))]'
                      }`}
                    >
                      {meta && <meta.icon className="h-4 w-4" aria-hidden="true" />}
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <ToolGrid tools={gridTools} locale={locale} localizedToolContent={localizedToolContent} />

            <div className="mt-10 text-center">
              <Link
                href={`/${locale}/tools${tab === 'all' ? '' : `?category=${tab}`}`}
                className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-6 py-3 font-semibold shadow-[var(--shadow-sm)] transition-colors hover:border-[hsl(var(--color-primary)/0.5)] hover:text-[hsl(var(--color-primary))]"
              >
                {t('home.pc.viewAll', { count: allTools.length })}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="border-y border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] py-20" aria-labelledby="how-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="how-heading" className="font-display mb-12 text-center text-3xl font-extrabold sm:text-4xl">
              {t('home.pc.howTitle')}
            </h2>
            <ol className="grid gap-6 md:grid-cols-3">
              {steps.map((step, i) => (
                <li key={i} className="relative rounded-[var(--radius-lg)] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-7 text-center shadow-[var(--shadow-sm)]">
                  <span className="pc-brand-gradient absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full text-sm font-bold text-white shadow-md">
                    {i + 1}
                  </span>
                  <span className="mx-auto mb-4 mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))]">
                    <step.icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="font-display mb-2 text-lg font-bold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ WHY PDFCHARGER ============ */}
        <section className="py-20" aria-labelledby="why-heading">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
            {/* Illustration: stacked document cards */}
            <div className="relative mx-auto aspect-[4/3.2] w-full max-w-md" aria-hidden="true">
              <div className="pc-hero-wash absolute inset-0 rounded-[2rem] border border-[hsl(var(--color-border))]" />
              <div className="absolute left-[10%] top-[14%] w-[52%] rotate-[-7deg] rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-4 shadow-[var(--shadow-lg)]">
                <div className="mb-3 h-2.5 w-2/3 rounded-full bg-[hsl(var(--color-muted))]" />
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="mb-2 h-2 rounded-full bg-[hsl(var(--color-muted))]" style={{ width: `${90 - i * 9}%` }} />
                ))}
              </div>
              <div className="animate-pc-float absolute right-[10%] top-[24%] w-[52%] rotate-[5deg] rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-4 shadow-[var(--shadow-xl)]">
                <div className="mb-3 flex items-center gap-2">
                  <span className="pc-brand-gradient flex h-7 w-7 items-center justify-center rounded-lg text-white">
                    <Zap className="h-4 w-4 fill-current" />
                  </span>
                  <div className="h-2.5 w-1/2 rounded-full bg-[hsl(var(--color-muted))]" />
                </div>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="mb-2 h-2 rounded-full bg-[hsl(var(--color-muted))]" style={{ width: `${95 - i * 12}%` }} />
                ))}
                <div className="mt-3 h-14 rounded-xl bg-[hsl(var(--color-primary)/0.1)]" />
              </div>
              <div className="absolute bottom-[10%] left-[18%] flex items-center gap-2 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-3 py-2 text-xs font-semibold shadow-[var(--shadow-lg)]">
                <ShieldCheck className="h-4 w-4 text-[hsl(var(--color-success))]" />
                {t('home.pc.illustrationBadge')}
              </div>
            </div>

            <div>
              <h2 id="why-heading" className="font-display mb-4 text-3xl font-extrabold leading-tight sm:text-4xl">
                {t('home.pc.whyTitle')}
              </h2>
              <p className="mb-8 leading-relaxed text-[hsl(var(--color-muted-foreground))]">{t('home.pc.whyBody')}</p>
              <ul className="grid gap-5 sm:grid-cols-2">
                {benefits.map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))]">
                      <b.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-bold">{b.title}</h3>
                      <p className="text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">{b.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className="pb-20" aria-label="Statistics">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <dl className="grid grid-cols-2 overflow-hidden rounded-[var(--radius-xl)] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] shadow-[var(--shadow-sm)] md:grid-cols-4">
              {[
                { value: `${allTools.length}+`, label: t('home.stats.pdfTools') },
                { value: '100%', label: t('home.stats.freeToUse') },
                { value: `${locales.length}`, label: t('home.stats.languages') },
                { value: '0', label: t('home.stats.filesUploaded') },
              ].map((s, i) => (
                <div key={s.label} className={`p-6 text-center ${i > 0 ? 'border-l border-[hsl(var(--color-border))]' : ''} ${i === 2 ? 'max-md:border-l-0 max-md:border-t' : ''} ${i === 3 ? 'max-md:border-t' : ''}`}>
                  <dd className="font-display text-gradient text-4xl font-extrabold">{s.value}</dd>
                  <dt className="mt-1 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-muted-foreground))]">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] py-20" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 id="faq-heading" className="font-display mb-10 text-center text-3xl font-extrabold sm:text-4xl">
              {t('home.pc.faqTitle')}
            </h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <details key={i} className="group rounded-[var(--radius-lg)] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-5 shadow-[var(--shadow-sm)] open:shadow-[var(--shadow-md)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold">
                    {f.q}
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-[hsl(var(--color-muted-foreground))] transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="pc-brand-gradient relative overflow-hidden rounded-[2rem] px-6 py-14 text-center text-white shadow-[var(--shadow-xl)] sm:px-12">
              <div className="pc-dots pointer-events-none absolute inset-0 opacity-30 [filter:invert(1)]" aria-hidden="true" />
              <h2 className="font-display relative mb-3 text-3xl font-extrabold sm:text-4xl">{t('home.pc.ctaTitle')}</h2>
              <p className="relative mx-auto mb-8 max-w-xl text-white/85">{t('home.pc.ctaBody')}</p>
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => inputRef.current?.click(), 400);
                }}
                className="relative inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold text-[hsl(262_83%_45%)] shadow-lg transition-transform hover:scale-[1.03]"
              >
                <Plus className="h-5 w-5" aria-hidden="true" />
                {t('home.pc.select')}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
