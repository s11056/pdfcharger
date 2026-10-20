'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Search, Menu, X, ChevronDown, LayoutGrid, Sparkles, Workflow } from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { Logo } from '@/components/brand/Logo';
import { RecentFilesDropdown } from '@/components/common/RecentFilesDropdown';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { searchTools, SearchResult } from '@/lib/utils/search';
import { getToolById, getToolsByCategory } from '@/config/tools';
import { getToolIcon } from '@/config/icons';
import { CATEGORY_META, CATEGORY_ORDER } from '@/config/categories';
import { useLocalizedTools, type LocalizedToolMap } from '@/hooks/useLocalizedTools';
import type { Tool } from '@/types/tool';

export interface HeaderProps {
  locale: Locale;
  showSearch?: boolean;
}

/** Tools surfaced directly in the top bar, like iLovePDF (id -> short nav label key) */
const QUICK_TOOLS: { id: string; labelKey: string }[] = [
  { id: 'merge-pdf', labelKey: 'navigation.merge' },
  { id: 'split-pdf', labelKey: 'navigation.split' },
  { id: 'compress-pdf', labelKey: 'navigation.compress' },
  { id: 'edit-pdf', labelKey: 'navigation.edit' },
];
const CONVERT_TO_IDS = ['jpg-to-pdf', 'word-to-pdf', 'pptx-to-pdf', 'excel-to-pdf', 'image-to-pdf', 'txt-to-pdf'];
const CONVERT_FROM_IDS = ['pdf-to-jpg', 'pdf-to-docx', 'pdf-to-pptx', 'pdf-to-excel', 'pdf-to-png', 'pdf-to-pdfa'];
/** How many tools to show per category in the mega menu */
const MEGA_PER_CATEGORY = 7;

const navLinkClass =
  'inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-[0.92rem] font-semibold text-[hsl(var(--color-foreground)/0.82)] transition-colors hover:bg-[hsl(var(--color-muted))] hover:text-[hsl(var(--color-foreground))]';

function toolsFromIds(ids: string[]): Tool[] {
  return ids.map((id) => getToolById(id)).filter((t): t is Tool => !!t);
}

/** A single tool row used in menus and search results */
function ToolMenuItem({
  tool,
  title,
  href,
  onClick,
  active = false,
}: {
  tool: Tool;
  title: string;
  href: string;
  onClick?: () => void;
  active?: boolean;
}) {
  const Icon = getToolIcon(tool.icon);
  const meta = CATEGORY_META[tool.category];
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${meta.colorClass} flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-[hsl(var(--color-foreground)/0.85)] transition-colors hover:bg-[hsl(var(--color-muted))] hover:text-[hsl(var(--color-foreground))] ${active ? 'bg-[hsl(var(--color-muted))]' : ''}`}
    >
      <span className="cat-tile flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg" aria-hidden="true">
        <Icon className="h-4 w-4" />
      </span>
      <span className="line-clamp-2 leading-snug">{title}</span>
    </Link>
  );
}

/** Hover/click dropdown wrapper */
function Dropdown({
  label,
  open,
  setOpen,
  children,
  panelClassName = '',
  mega = false,
}: {
  label: React.ReactNode;
  open: boolean;
  setOpen: (v: boolean) => void;
  children: React.ReactNode;
  panelClassName?: string;
  /** Centre the panel on the page instead of under the trigger */
  mega?: boolean;
}) {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  return (
    <div
      className={mega ? '' : 'relative'}
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={() => {
        closeTimer.current = setTimeout(() => setOpen(false), 120);
      }}
    >
      <button
        type="button"
        className={`${navLinkClass} ${open ? 'bg-[hsl(var(--color-muted))] text-[hsl(var(--color-foreground))]' : ''}`}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <div
          className={`${mega ? 'fixed top-[60px]' : 'absolute top-full'} left-1/2 z-50 -translate-x-1/2 pt-2 ${panelClassName}`}
          onMouseEnter={cancelClose}
        >
          <div className="rounded-[var(--radius-lg)] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-4 shadow-[var(--shadow-xl)]">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

/** ⌘K search palette */
function SearchPalette({
  locale,
  localized,
  onClose,
}: {
  locale: Locale;
  localized: LocalizedToolMap;
  onClose: () => void;
}) {
  const t = useTranslations('common');
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results: SearchResult[] = query.trim() ? searchTools(query, localized).slice(0, 8) : [];
  const suggestions = toolsFromIds(['merge-pdf', 'compress-pdf', 'pdf-to-docx', 'edit-pdf', 'sign-pdf', 'jpg-to-pdf']);
  const list: Tool[] = query.trim() ? results.map((r) => r.tool) : suggestions;

  useEffect(() => {
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => setSelected(0), [query]);

  const go = (tool: Tool) => {
    router.push(`/${locale}/tools/${tool.slug}`);
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, list.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && list[selected]) {
      e.preventDefault();
      go(list[selected]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-[hsl(245_40%_8%/0.45)] px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={onClose}>
      <div
        className="w-full max-w-xl overflow-hidden rounded-[var(--radius-lg)] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] shadow-[var(--shadow-xl)]"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search tools"
      >
        <div className="flex items-center gap-3 border-b border-[hsl(var(--color-border))] px-4">
          <Search className="h-5 w-5 text-[hsl(var(--color-primary))]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t('search.placeholder') || 'Search tools...'}
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-[hsl(var(--color-muted-foreground))]"
            style={{ background: 'transparent' }}
            aria-label="Search tools"
            autoComplete="off"
          />
          <kbd className="hidden rounded border border-[hsl(var(--color-border))] px-1.5 py-0.5 text-[10px] font-semibold text-[hsl(var(--color-muted-foreground))] sm:block">ESC</kbd>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {!query.trim() && (
            <p className="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-muted-foreground))]">Popular</p>
          )}
          {list.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-[hsl(var(--color-muted-foreground))]">{t('search.noResults')}</p>
          ) : (
            <ul role="listbox">
              {list.map((tool, i) => (
                <li key={tool.id} role="option" aria-selected={i === selected} onMouseEnter={() => setSelected(i)}>
                  <ToolMenuItem
                    tool={tool}
                    title={localized[tool.id]?.title || tool.id}
                    href={`/${locale}/tools/${tool.slug}`}
                    onClick={onClose}
                    active={i === selected}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-[hsl(var(--color-border))] px-4 py-2 text-xs text-[hsl(var(--color-muted-foreground))]">
          {t('search.hint')}
        </div>
      </div>
    </div>
  );
}

export const Header: React.FC<HeaderProps> = ({ locale, showSearch = true }) => {
  const t = useTranslations('common');
  const tHome = useTranslations('home');
  const localized = useLocalizedTools(locale);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<'convert' | 'all' | null>(null);

  const title = useCallback((id: string) => localized[id]?.title || id, [localized]);
  const href = (tool: Tool) => `/${locale}/tools/${tool.slug}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMenus = () => setOpenMenu(null);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'glass border-b border-[hsl(var(--color-border))] shadow-[var(--shadow-sm)]'
            : 'border-b border-transparent bg-transparent'
        }`}
        role="banner"
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link href={`/${locale}`} className="flex-shrink-0 rounded-lg" aria-label={`${t('brand')} - ${t('navigation.home')}`}>
            <Logo markClassName="h-9 w-9" />
            <span className="sr-only" data-testid="brand-name">{t('brand')}</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="ml-4 hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {QUICK_TOOLS.map(({ id, labelKey }) => {
              const tool = getToolById(id);
              return tool ? (
                <Link key={id} href={href(tool)} className={navLinkClass}>
                  {t(labelKey)}
                </Link>
              ) : null;
            })}

            <Dropdown
              label={t('navigation.convert')}
              open={openMenu === 'convert'}
              setOpen={(v) => setOpenMenu(v ? 'convert' : null)}
              panelClassName="w-[560px]"
            >
              <div className="grid grid-cols-2 gap-6">
                {([
                  ['convert-to-pdf', CONVERT_TO_IDS],
                  ['convert-from-pdf', CONVERT_FROM_IDS],
                ] as const).map(([cat, ids]) => (
                  <div key={cat}>
                    <p className={`${CATEGORY_META[cat].colorClass} cat-text mb-2 px-2 text-xs font-bold uppercase tracking-wider`}>
                      {tHome(`categories.${CATEGORY_META[cat].i18nKey}`)}
                    </p>
                    {toolsFromIds([...ids]).map((tool) => (
                      <ToolMenuItem key={tool.id} tool={tool} title={title(tool.id)} href={href(tool)} onClick={closeMenus} />
                    ))}
                  </div>
                ))}
              </div>
            </Dropdown>

            <Dropdown
              label={t('navigation.tools')}
              open={openMenu === 'all'}
              setOpen={(v) => setOpenMenu(v ? 'all' : null)}
              panelClassName="w-[min(1180px,96vw)]"
              mega
            >
              <div className="grid grid-cols-3 gap-x-6 gap-y-5 xl:grid-cols-6">
                {CATEGORY_ORDER.map((cat) => {
                  const meta = CATEGORY_META[cat];
                  const list = getToolsByCategory(cat);
                  return (
                    <div key={cat} className="min-w-0">
                      <p className={`${meta.colorClass} cat-text mb-2 px-2 text-xs font-bold uppercase tracking-wider`}>
                        {tHome(`categories.${meta.i18nKey}`)}
                      </p>
                      {list.slice(0, MEGA_PER_CATEGORY).map((tool) => (
                        <ToolMenuItem key={tool.id} tool={tool} title={title(tool.id)} href={href(tool)} onClick={closeMenus} />
                      ))}
                      {list.length > MEGA_PER_CATEGORY && (
                        <Link
                          href={`/${locale}/tools?category=${cat}`}
                          onClick={closeMenus}
                          className="mt-1 block px-2 text-xs font-semibold text-[hsl(var(--color-primary))] hover:underline"
                        >
                          +{list.length - MEGA_PER_CATEGORY} more
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[hsl(var(--color-border))] pt-4">
                <Link href={`/${locale}/tools`} onClick={closeMenus} className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--color-muted))] px-3 py-2 text-sm font-semibold hover:bg-[hsl(var(--color-secondary-hover))]">
                  <LayoutGrid className="h-4 w-4" aria-hidden="true" /> Browse all tools
                </Link>
                <Link href={`/${locale}/studio`} onClick={closeMenus} className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--color-muted))] px-3 py-2 text-sm font-semibold hover:bg-[hsl(var(--color-secondary-hover))]">
                  <Sparkles className="h-4 w-4 text-[hsl(var(--color-primary))]" aria-hidden="true" /> PDF Studio
                </Link>
                <Link href={`/${locale}/workflow`} onClick={closeMenus} className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--color-muted))] px-3 py-2 text-sm font-semibold hover:bg-[hsl(var(--color-secondary-hover))]">
                  <Workflow className="h-4 w-4 text-[hsl(var(--color-primary))]" aria-hidden="true" /> {t('navigation.workflow')}
                </Link>
              </div>
            </Dropdown>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            {showSearch && (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex h-10 items-center gap-2 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-3 text-sm text-[hsl(var(--color-muted-foreground))] transition-colors hover:border-[hsl(var(--color-primary)/0.4)] hover:text-[hsl(var(--color-foreground))]"
                aria-label="Open search"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                <span className="hidden xl:inline">{t('search.placeholder')}</span>
                <kbd className="hidden rounded border border-[hsl(var(--color-border))] px-1.5 text-[10px] font-semibold md:inline">Ctrl K</kbd>
              </button>
            )}

            <div className="hidden sm:block">
              <RecentFilesDropdown
                locale={locale}
                translations={{
                  title: t('recentFiles.title') || 'Recent Files',
                  empty: t('recentFiles.empty') || 'No recent files',
                  clearAll: t('recentFiles.clearAll') || 'Clear all',
                  processedWith: t('recentFiles.processedWith') || 'Processed with',
                }}
              />
            </div>

            <ThemeToggle />

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-muted))] lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <nav
            id="mobile-menu"
            className="h-[calc(100dvh-68px)] overflow-y-auto border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] px-4 pb-10 pt-4 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mb-5 grid grid-cols-2 gap-2">
              {[
                { href: `/${locale}/tools`, label: t('navigation.tools'), icon: LayoutGrid },
                { href: `/${locale}/studio`, label: 'PDF Studio', icon: Sparkles },
              ].map(({ href: h, label, icon: Icon }) => (
                <Link key={h} href={h} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-3 py-3 text-sm font-semibold">
                  <Icon className="h-4 w-4 text-[hsl(var(--color-primary))]" aria-hidden="true" /> {label}
                </Link>
              ))}
            </div>
            {CATEGORY_ORDER.map((cat) => {
              const meta = CATEGORY_META[cat];
              return (
                <details key={cat} className="group border-b border-[hsl(var(--color-border))] py-1">
                  <summary className={`${meta.colorClass} flex cursor-pointer list-none items-center justify-between py-3 font-display font-bold`}>
                    <span className="flex items-center gap-2.5">
                      <span className="cat-tile flex h-8 w-8 items-center justify-center rounded-lg" aria-hidden="true">
                        <meta.icon className="h-4 w-4" />
                      </span>
                      {tHome(`categories.${meta.i18nKey}`)}
                    </span>
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="grid grid-cols-1 gap-0.5 pb-3 min-[420px]:grid-cols-2">
                    {getToolsByCategory(cat).map((tool) => (
                      <ToolMenuItem key={tool.id} tool={tool} title={title(tool.id)} href={href(tool)} onClick={() => setMobileOpen(false)} />
                    ))}
                  </div>
                </details>
              );
            })}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[hsl(var(--color-muted-foreground))]">
              <Link href={`/${locale}/about`} onClick={() => setMobileOpen(false)}>{t('navigation.about')}</Link>
              <Link href={`/${locale}/faq`} onClick={() => setMobileOpen(false)}>{t('navigation.faq')}</Link>
              <Link href={`/${locale}/workflow`} onClick={() => setMobileOpen(false)}>{t('navigation.workflow')}</Link>
              <Link href={`/${locale}/contact`} onClick={() => setMobileOpen(false)}>{t('navigation.contact')}</Link>
            </div>
          </nav>
        )}
      </header>

      {searchOpen && <SearchPalette locale={locale} localized={localized} onClose={() => setSearchOpen(false)} />}
    </>
  );
};

export default Header;
