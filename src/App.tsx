import { useEffect, useMemo, useState } from 'react';
import {
  Search,
  Sun,
  Moon,
  Languages,
  LayoutGrid,
  Table2,
  X,
  RotateCcw,
} from 'lucide-react';
import { ALL_ELEMENTS } from './data/elements';
import { CATEGORY_META, STATE_META, UI_TEXT } from './data/i18n';
import { ElementCategory, ElementData, Language, MatterState, Theme } from './types/element';
import { StateIcon } from './components/StateIcon';
import { PeriodicTableView } from './components/PeriodicTableView';
import { ElementModal } from './components/ElementModal';

const CATEGORY_ORDER: ElementCategory[] = [
  'alkali-metal',
  'alkaline-earth',
  'transition-metal',
  'post-transition',
  'metalloid',
  'reactive-nonmetal',
  'noble-gas',
  'lanthanide',
  'actinide',
];

const STATE_ORDER: MatterState[] = ['solid', 'liquid', 'gas'];

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem('pt_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch {
    // ignore storage errors
  }
  return 'light';
}

function getInitialLang(): Language {
  try {
    const saved = localStorage.getItem('pt_lang');
    if (saved === 'ar' || saved === 'en') return saved;
  } catch {
    // ignore storage errors
  }
  return 'en';
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [lang, setLang] = useState<Language>(getInitialLang);
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState<MatterState | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<ElementCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);

  const t = UI_TEXT[lang];

  // Sync dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('pt_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Sync language & direction on <html>
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('pt_lang', lang);
    } catch {
      // ignore
    }
  }, [lang]);

  // Precompute counts per state and category
  const stateCounts = useMemo(() => {
    const counts: Record<MatterState, number> = { solid: 0, liquid: 0, gas: 0 };
    for (const el of ALL_ELEMENTS) {
      counts[el.state]++;
    }
    return counts;
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = {} as Record<ElementCategory, number>;
    for (const cat of CATEGORY_ORDER) counts[cat] = 0;
    for (const el of ALL_ELEMENTS) {
      counts[el.category]++;
    }
    return counts;
  }, []);

  // Filter logic
  const matchedNumbers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const matched = new Set<number>();

    for (const el of ALL_ELEMENTS) {
      if (stateFilter !== 'all' && el.state !== stateFilter) continue;
      if (categoryFilter !== 'all' && el.category !== categoryFilter) continue;

      if (q) {
        const hit =
          String(el.number) === q ||
          el.symbol.toLowerCase().includes(q) ||
          el.enName.toLowerCase().includes(q) ||
          el.latinName.toLowerCase().includes(q) ||
          el.arName.includes(q);
        if (!hit) continue;
      }

      matched.add(el.number);
    }

    return matched;
  }, [searchQuery, stateFilter, categoryFilter]);

  const hasActiveFilter =
    searchQuery.trim() !== '' || stateFilter !== 'all' || categoryFilter !== 'all';

  const handleResetFilters = () => {
    setSearchQuery('');
    setStateFilter('all');
    setCategoryFilter('all');
  };

  const handleToggleCategory = (cat: ElementCategory) => {
    setCategoryFilter((prev) => (prev === cat ? 'all' : cat));
  };

  const handleNavigateElement = (atomicNumber: number) => {
    const found = ALL_ELEMENTS.find((el) => el.number === atomicNumber);
    if (found) setSelectedElement(found);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070b12] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Bar */}
      <header className="border-b border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/90">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Brand Title */}
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 whitespace-nowrap shrink-0">
            {t.appTitle}
          </h1>

          {/* Center View Switcher (Desktop) */}
          <nav
            aria-label="View mode"
            className="hidden sm:flex items-center gap-6 text-sm font-medium"
          >
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`inline-flex items-center gap-1.5 py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'table'
                  ? 'border-sky-600 dark:border-sky-400 text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Table2 className="w-4 h-4" />
              <span>{t.tableView}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'grid'
                  ? 'border-sky-600 dark:border-sky-400 text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{t.gridView}</span>
            </button>
          </nav>

          {/* Right Controls: Language & Theme */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setLang((prev) => (prev === 'en' ? 'ar' : 'en'))}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="Switch language"
            >
              <Languages className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>{t.switchLang}</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              aria-label={theme === 'dark' ? t.lightMode : t.darkMode}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">{t.lightMode}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden md:inline">{t.darkMode}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1520px] w-full mx-auto px-4 sm:px-6 py-5 sm:py-6 space-y-5">
        {/* Workspace Toolbar: Search + State Filter + Mobile View Toggle */}
        <section className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search
                className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 pointer-events-none ${
                  lang === 'ar' ? 'right-3.5' : 'left-3.5'
                }`}
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-colors ${
                  lang === 'ar' ? 'pr-10 pl-9' : 'pl-10 pr-9'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={`absolute top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer ${
                    lang === 'ar' ? 'left-2.5' : 'right-2.5'
                  }`}
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* State of Matter Segmented Control + Mobile View Switch */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div
                role="group"
                aria-label={t.stateLegendTitle}
                className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800"
              >
                <button
                  type="button"
                  onClick={() => setStateFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    stateFilter === 'all'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {t.allStates}
                </button>
                {STATE_ORDER.map((st) => {
                  const meta = STATE_META[st];
                  const active = stateFilter === st;
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStateFilter((prev) => (prev === st ? 'all' : st))}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <StateIcon state={st} className={`w-3.5 h-3.5 ${meta.textClass}`} />
                      <span>{lang === 'ar' ? meta.ar : meta.en}</span>
                      <span className="font-mono-tabular text-[11px] opacity-60">
                        {stateCounts[st]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile View Switch */}
              <div className="flex sm:hidden items-center gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                  aria-label={t.tableView}
                >
                  <Table2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                  aria-label={t.gridView}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Category Legend & Filter Bar */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                categoryFilter === 'all'
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
              }`}
            >
              {t.allCategories}
            </button>

            {CATEGORY_ORDER.map((catId) => {
              const meta = CATEGORY_META[catId];
              const isActive = categoryFilter === catId;
              return (
                <button
                  key={catId}
                  type="button"
                  onClick={() => handleToggleCategory(catId)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? meta.badgeClasses
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-sm shrink-0 ${meta.swatchClass}`}
                    aria-hidden="true"
                  />
                  <span>{lang === 'ar' ? meta.ar : meta.en}</span>
                  <span className="font-mono-tabular text-[11px] opacity-60">
                    {categoryCounts[catId]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quiet Status / Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <span>
                {t.showingCount}{' '}
                <strong className="font-mono-tabular text-slate-800 dark:text-slate-200">
                  {matchedNumbers.size}
                </strong>{' '}
                {t.ofElements}
              </span>
              <span aria-hidden="true">·</span>
              <span>{t.roomTempNote}</span>
            </div>

            {hasActiveFilter && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.clearFilters}</span>
              </button>
            )}
          </div>
        </section>

        {/* Periodic Table or Index Grid */}
        <section aria-label={t.appTitle}>
          <PeriodicTableView
            elements={ALL_ELEMENTS}
            matchedNumbers={matchedNumbers}
            selectedElement={selectedElement}
            lang={lang}
            viewMode={viewMode}
            onSelectElement={setSelectedElement}
            onSelectCategory={handleToggleCategory}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-4 mt-6">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>{t.appSubtitle}</span>
          <span>
            {lang === 'ar'
              ? 'اضغط على أي عنصر لعرض التسمية اللاتينية، أصل الرمز، المركبات، التاريخ، والاستخدامات.'
              : 'Click any element to inspect its Latin etymology, top 10 compounds, discovery history, and uses.'}
          </span>
        </div>
      </footer>

      {/* Element Details Modal */}
      {selectedElement && (
        <ElementModal
          element={selectedElement}
          lang={lang}
          onClose={() => setSelectedElement(null)}
          onNavigate={handleNavigateElement}
        />
      )}
    </div>
  );
}
