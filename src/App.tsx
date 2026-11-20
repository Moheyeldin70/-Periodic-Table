import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Search,
  Sun,
  Moon,
  Languages,
  LayoutGrid,
  Table2,
  X,
  RotateCcw,
  ArrowLeftRight,
  ChevronDown,
  Check,
} from 'lucide-react';
import { ALL_ELEMENTS } from './data/elements';
import { CATEGORY_META, STATE_META, UI_TEXT } from './data/i18n';
import {
  ElementCategory,
  ElementData,
  Language,
  MatterState,
  Theme,
} from './types/element';
import {
  LANGUAGE_OPTIONS,
  elementMatchesQuery,
  getInitialLang,
  getLanguageDir,
} from './utils/localization';
import { StateIcon } from './components/StateIcon';
import { PeriodicTableView } from './components/PeriodicTableView';
import { ElementModal } from './components/ElementModal';
import { CompareView } from './components/CompareView';

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

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [lang, setLang] = useState<Language>(getInitialLang);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState<MatterState | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<ElementCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid' | 'compare'>('table');
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [compareElementA, setCompareElementA] = useState<ElementData>(ALL_ELEMENTS[10]); // Na
  const [compareElementB, setCompareElementB] = useState<ElementData>(ALL_ELEMENTS[18]); // K
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  const t = UI_TEXT[lang];
  const currentLangOption =
    LANGUAGE_OPTIONS.find((opt) => opt.code === lang) ?? LANGUAGE_OPTIONS[0];

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
    root.dir = getLanguageDir(lang);
  }, [lang]);

  // Close language dropdown on outside click or Escape
  useEffect(() => {
    if (!langMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [langMenuOpen]);

  const handleSelectLanguage = (nextLang: Language) => {
    setLang(nextLang);
    setLangMenuOpen(false);
    try {
      localStorage.setItem('pt_lang', nextLang);
    } catch {
      // ignore storage errors
    }
  };

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
    const matched = new Set<number>();

    for (const el of ALL_ELEMENTS) {
      if (stateFilter !== 'all' && el.state !== stateFilter) continue;
      if (categoryFilter !== 'all' && el.category !== categoryFilter) continue;
      if (!elementMatchesQuery(el, searchQuery, lang)) continue;

      matched.add(el.number);
    }

    return matched;
  }, [searchQuery, stateFilter, categoryFilter, lang]);

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

  const handleSwapCompare = () => {
    setCompareElementA(compareElementB);
    setCompareElementB(compareElementA);
  };

  const handleSendToCompare = (el: ElementData) => {
    if (el.number !== compareElementA.number) {
      setCompareElementB(compareElementA);
      setCompareElementA(el);
    }
    setSelectedElement(null);
    setViewMode('compare');
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
            <button
              type="button"
              onClick={() => setViewMode('compare')}
              className={`inline-flex items-center gap-1.5 py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'compare'
                  ? 'border-sky-600 dark:border-sky-400 text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>{t.compareView}</span>
            </button>
          </nav>

          {/* Right Controls: Language & Theme */}
          <div className="flex items-center gap-2 shrink-0">
            <div ref={langMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                aria-label={t.languageLabel}
                aria-haspopup="listbox"
                aria-expanded={langMenuOpen}
              >
                <Languages className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                <span className="hidden sm:inline">{currentLangOption.nativeName}</span>
                <span className="sm:hidden">{currentLangOption.shortCode}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                    langMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {langMenuOpen && (
                <div
                  role="listbox"
                  aria-label={t.languageLabel}
                  className={`absolute top-full mt-2 w-52 max-h-80 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl py-1 z-40 ${
                    lang === 'ar' ? 'left-0' : 'right-0'
                  }`}
                >
                  {LANGUAGE_OPTIONS.map((opt) => {
                    const active = opt.code === lang;
                    return (
                      <button
                        key={opt.code}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => handleSelectLanguage(opt.code)}
                        className={`w-full flex items-center justify-between gap-3 px-3.5 py-2 text-xs transition-colors cursor-pointer text-start ${
                          active
                            ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-semibold'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70'
                        }`}
                      >
                        <span className="truncate">{opt.nativeName}</span>
                        <span className="inline-flex items-center gap-1.5 shrink-0">
                          <span className="font-mono-tabular text-[10px] opacity-60">
                            {opt.shortCode}
                          </span>
                          {active && <Check className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

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
        {/* Mobile View Switcher (always accessible on small screens) */}
        <div className="flex sm:hidden items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 w-full">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer whitespace-nowrap ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Table2 className="w-3.5 h-3.5" />
              <span>{t.tableView}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer whitespace-nowrap ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{t.gridView}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('compare')}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer whitespace-nowrap ${
                viewMode === 'compare'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>{t.compareView}</span>
            </button>
          </div>
        </div>

        {viewMode === 'compare' ? (
          <section aria-label={t.compareTitle}>
            <CompareView
              elements={ALL_ELEMENTS}
              elementA={compareElementA}
              elementB={compareElementB}
              lang={lang}
              onChangeA={setCompareElementA}
              onChangeB={setCompareElementB}
              onSwap={handleSwapCompare}
              onInspectElement={setSelectedElement}
            />
          </section>
        ) : (
          <>
            {/* Workspace Toolbar: Search + State Filter */}
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

                {/* State of Matter Segmented Control */}
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
                          <span>{meta.names[lang]}</span>
                          <span className="font-mono-tabular text-[11px] opacity-60">
                            {stateCounts[st]}
                          </span>
                        </button>
                      );
                    })}
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
                      <span>{meta.names[lang]}</span>
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
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-4 mt-6">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>{t.appSubtitle}</span>
          <span>{t.footerHint}</span>
        </div>
      </footer>

      {/* Element Details Modal */}
      {selectedElement && (
        <ElementModal
          element={selectedElement}
          lang={lang}
          onClose={() => setSelectedElement(null)}
          onNavigate={handleNavigateElement}
          onCompareElement={handleSendToCompare}
        />
      )}
    </div>
  );
}
