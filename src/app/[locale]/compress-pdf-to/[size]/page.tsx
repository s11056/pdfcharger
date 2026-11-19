import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { getToolById } from '@/config/tools';
import { getToolContent } from '@/config/tool-content';
import { COMPRESS_PRESETS, getCompressPreset, getCompressPresetContent } from '@/config/compress-presets';
import { locales, type Locale } from '@/lib/i18n/config';
import { ToolPage } from '@/components/tools/ToolPage';
import { CompressPDFTool } from '@/components/tools/compress';
import { generateBaseMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/seo/structured-data';

/**
 * "Compress PDF to <size>" landing pages: the Compress tool with a target size
 * preselected, e.g. /en/compress-pdf-to/100kb/
 */
interface PresetPageParams {
  params: Promise<{ locale: string; size: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => COMPRESS_PRESETS.map((preset) => ({ locale, size: preset.slug })));
}

export async function generateMetadata({ params }: PresetPageParams): Promise<Metadata> {
  const { locale: localeParam, size } = await params;
  const locale = localeParam as Locale;
  const preset = getCompressPreset(size);
  if (!preset) return {};

  const content = getCompressPresetContent(locale, preset);
  return generateBaseMetadata({
    locale,
    path: `/compress-pdf-to/${preset.slug}`,
    title: content.title,
    description: content.metaDescription,
    keywords: content.keywords,
  });
}

export default async function CompressPresetPage({ params }: PresetPageParams) {
  const { locale: localeParam, size } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const preset = getCompressPreset(size);
  const tool = getToolById('compress-pdf');
  if (!preset || !tool) notFound();

  const content = getCompressPresetContent(locale, preset);

  const localizedRelatedTools = tool.relatedTools.reduce((acc, relatedId) => {
    const related = getToolContent(locale, relatedId);
    if (related) acc[relatedId] = { title: related.title, description: related.metaDescription };
    return acc;
  }, {} as Record<string, { title: string; description: string }>);

  const breadcrumb = generateBreadcrumbSchema(
    [
      { name: 'Home', path: '' },
      { name: 'Tools', path: '/tools' },
      { name: content.title, path: `/compress-pdf-to/${preset.slug}` },
    ],
    locale
  );

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={generateFAQPageSchema(content.faq)} />
      <ToolPage tool={tool} content={content} locale={locale} localizedRelatedTools={localizedRelatedTools}>
        <CompressPDFTool initialTargetKb={preset.kb} />
      </ToolPage>
    </>
  );
}
