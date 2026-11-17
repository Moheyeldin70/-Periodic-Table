import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeftRight,
  ChevronDown,
  MessageSquare,
  Search,
  ExternalLink,
} from 'lucide-react';
import { ElementData, Language } from '../types/element';
import { CATEGORY_META, STATE_META, UI_TEXT } from '../data/i18n';
import { StateIcon } from './StateIcon';
import { BohrModelSvg } from './BohrModelSvg';

interface CompareViewProps {
  elements: ElementData[];
  elementA: ElementData;
  elementB: ElementData;
  lang: Language;
  onChangeA: (el: ElementData) => void;
  onChangeB: (el: ElementData) => void;
  onSwap: () => void;
  onInspectElement: (el: ElementData) => void;
  onCompareWithAi: (a: ElementData, b: ElementData) => void;
}

function parseNumericValue(raw: string): number | null {
  if (!raw || raw.trim() === '—') return null;
  // Strip parentheses like "(294)" -> 294, and extract first numeric value
  const cleaned = raw.replace(/[()~]/g, '').trim();
  const match = cleaned.match(/-?\d+(\.\d+)?/);
  if (!match) return null;
  const num = Number.parseFloat(match[0]);
  return Number.isFinite(num) ? num : null;
}

interface ElementPickerProps {
  label: string;
  selected: ElementData;
  elements: ElementData[];
  lang: Language;
  accentSide: 'a' | 'b';
  onSelect: (el: ElementData) => void;
}

const ElementPicker: React.FC<ElementPickerProps> = ({
  label,
  selected,
  elements,
  lang,
  accentSide,
  onSelect,
}) => {
  const t = UI_TEXT[lang];
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(id);
    } else {
      setQuery('');
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return elements;
    return elements.filter(
      (el) =>
        String(el.number) === q ||
        el.symbol.toLowerCase().includes(q) ||
        el.enName.toLowerCase().includes(q) ||
        el.latinName.toLowerCase().includes(q) ||
        el.arName.includes(q)
    );
  }, [elements, query]);

  const catMeta = CATEGORY_META[selected.category];

  return (
    <div ref={containerRef} className="relative flex-1 min-w-0">
      <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1.5">
        {label}
      </div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-500 transition-colors cursor-pointer text-start"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            dir="ltr"
            className={`w-9 h-9 rounded-lg border flex items-center justify-center font-bold text-sm shrink-0 ${catMeta.tileClasses}`}
          >
            {selected.symbol}
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
              {lang === 'ar' ? selected.arName : selected.enName}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono-tabular truncate">
              #{selected.number} · {lang === 'ar' ? selected.enName : selected.arName}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`w-2 h-2 rounded-full ${
              accentSide === 'a' ? 'bg-sky-600 dark:bg-sky-400' : 'bg-amber-600 dark:bg-amber-400'
            }`}
            aria-hidden="true"
          />
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
          <div className="p-2 border-b border-slate-200 dark:border-slate-800 relative">
            <Search
              className={`w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 pointer-events-none ${
                lang === 'ar' ? 'right-4' : 'left-4'
              }`}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.compareSelectPlaceholder}
              className={`w-full py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40 ${
                lang === 'ar' ? 'pr-8 pl-3' : 'pl-8 pr-3'
              }`}
            />
          </div>
          <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/70">
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                {t.noResults}
              </div>
            ) : (
              filtered.map((el) => {
                const isCurrent = el.number === selected.number;
                return (
                  <button
                    key={el.number}
                    type="button"
                    onClick={() => {
                      onSelect(el);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-3.5 py-2 text-start text-xs transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-900 dark:text-sky-100 font-semibold'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono-tabular text-[11px] text-slate-400 w-6 shrink-0">
                        {el.number}
                      </span>
                      <span dir="ltr" className="font-bold w-7 shrink-0 text-sky-700 dark:text-sky-300">
                        {el.symbol}
                      </span>
                      <span className="truncate">
                        {lang === 'ar' ? el.arName : el.enName}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 truncate shrink-0 max-w-[110px]">
                      {lang === 'ar' ? el.enName : el.arName}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const PRESET_PAIRS: Array<[number, number]> = [
  [11, 19], // Na vs K
  [6, 14],  // C vs Si
  [26, 29], // Fe vs Cu
  [35, 80], // Br vs Hg (both liquid)
  [1, 2],   // H vs He
];

export const CompareView: React.FC<CompareViewProps> = ({
  elements,
  elementA,
  elementB,
  lang,
  onChangeA,
  onChangeB,
  onSwap,
  onInspectElement,
  onCompareWithAi,
}) => {
  const t = UI_TEXT[lang];

  const catA = CATEGORY_META[elementA.category];
  const catB = CATEGORY_META[elementB.category];
  const stateA = STATE_META[elementA.state];
  const stateB = STATE_META[elementB.state];

  const massA = parseNumericValue(elementA.atomicMass);
  const massB = parseNumericValue(elementB.atomicMass);
  const enegA = parseNumericValue(elementA.electronegativity);
  const enegB = parseNumericValue(elementB.electronegativity);
  const meltA = parseNumericValue(elementA.meltingPoint);
  const meltB = parseNumericValue(elementB.meltingPoint);
  const boilA = parseNumericValue(elementA.boilingPoint);
  const boilB = parseNumericValue(elementB.boilingPoint);
  const densA = parseNumericValue(elementA.density);
  const densB = parseNumericValue(elementB.density);

  const quantitativeMetrics = [
    {
      label: t.atomicMass,
      unit: 'u',
      valA: massA,
      valB: massB,
      rawA: `${elementA.atomicMass} u`,
      rawB: `${elementB.atomicMass} u`,
      decimals: 3,
    },
    {
      label: t.electronegativity,
      unit: 'Pauling',
      valA: enegA,
      valB: enegB,
      rawA: elementA.electronegativity,
      rawB: elementB.electronegativity,
      decimals: 2,
    },
    {
      label: t.meltingPoint,
      unit: 'K',
      valA: meltA,
      valB: meltB,
      rawA: elementA.meltingPoint,
      rawB: elementB.meltingPoint,
      decimals: 1,
    },
    {
      label: t.boilingPoint,
      unit: 'K',
      valA: boilA,
      valB: boilB,
      rawA: elementA.boilingPoint,
      rawB: elementB.boilingPoint,
      decimals: 1,
    },
    {
      label: t.density,
      unit: 'g/cm³',
      valA: densA,
      valB: densB,
      rawA: elementA.density,
      rawB: elementB.density,
      decimals: 3,
    },
  ];

  const comparisonRows = [
    {
      label: t.stateAtRoomTemp,
      a: (
        <span className={`inline-flex items-center gap-1.5 font-medium ${stateA.textClass}`}>
          <StateIcon state={elementA.state} className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? stateA.ar : stateA.en}</span>
        </span>
      ),
      b: (
        <span className={`inline-flex items-center gap-1.5 font-medium ${stateB.textClass}`}>
          <StateIcon state={elementB.state} className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? stateB.ar : stateB.en}</span>
        </span>
      ),
      diff:
        elementA.state === elementB.state ? t.compareSame : t.compareDifferent,
      isMatch: elementA.state === elementB.state,
    },
    {
      label: t.categoryLegendTitle,
      a: (
        <span className="inline-flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-sm shrink-0 ${catA.swatchClass}`} />
          <span>{lang === 'ar' ? catA.ar : catA.en}</span>
        </span>
      ),
      b: (
        <span className="inline-flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-sm shrink-0 ${catB.swatchClass}`} />
          <span>{lang === 'ar' ? catB.ar : catB.en}</span>
        </span>
      ),
      diff:
        elementA.category === elementB.category ? t.compareSame : t.compareDifferent,
      isMatch: elementA.category === elementB.category,
    },
    {
      label: t.atomicNumber,
      a: <span className="font-mono-tabular">{elementA.number}</span>,
      b: <span className="font-mono-tabular">{elementB.number}</span>,
      diff: `Δ ${Math.abs(elementA.number - elementB.number)}`,
      isMatch: elementA.number === elementB.number,
    },
    {
      label: t.atomicMass,
      a: <span dir="ltr" className="font-mono-tabular">{elementA.atomicMass} u</span>,
      b: <span dir="ltr" className="font-mono-tabular">{elementB.atomicMass} u</span>,
      diff:
        massA !== null && massB !== null
          ? `Δ ${Math.abs(massA - massB).toFixed(3)} u`
          : '—',
      isMatch: massA !== null && massB !== null && massA === massB,
    },
    {
      label: t.electronegativity,
      a: <span dir="ltr" className="font-mono-tabular">{elementA.electronegativity}</span>,
      b: <span dir="ltr" className="font-mono-tabular">{elementB.electronegativity}</span>,
      diff:
        enegA !== null && enegB !== null
          ? `Δ ${Math.abs(enegA - enegB).toFixed(2)}`
          : '—',
      isMatch: enegA !== null && enegB !== null && enegA === enegB,
    },
    {
      label: t.electronConfig,
      a: <span dir="ltr" className="font-mono-tabular">{elementA.electronConfig}</span>,
      b: <span dir="ltr" className="font-mono-tabular">{elementB.electronConfig}</span>,
      diff: `${elementA.shells.length} vs ${elementB.shells.length} ${
        lang === 'ar' ? 'مدارات' : 'shells'
      }`,
      isMatch: elementA.shells.length === elementB.shells.length,
    },
    {
      label: `${t.periodLabel} / ${t.groupLabel} / ${t.block}`,
      a: (
        <span dir="ltr" className="font-mono-tabular">
          P{elementA.period} · G{elementA.group} · {elementA.block}
        </span>
      ),
      b: (
        <span dir="ltr" className="font-mono-tabular">
          P{elementB.period} · G{elementB.group} · {elementB.block}
        </span>
      ),
      diff:
        elementA.group === elementB.group
          ? lang === 'ar'
            ? 'نفس المجموعة'
            : 'Same group'
          : elementA.period === elementB.period
          ? lang === 'ar'
            ? 'نفس الدورة'
            : 'Same period'
          : t.compareDifferent,
      isMatch: elementA.group === elementB.group || elementA.period === elementB.period,
    },
    {
      label: t.meltingPoint,
      a: <span dir="ltr" className="font-mono-tabular">{elementA.meltingPoint}</span>,
      b: <span dir="ltr" className="font-mono-tabular">{elementB.meltingPoint}</span>,
      diff:
        meltA !== null && meltB !== null
          ? `Δ ${Math.abs(meltA - meltB).toFixed(1)} K`
          : '—',
      isMatch: false,
    },
    {
      label: t.boilingPoint,
      a: <span dir="ltr" className="font-mono-tabular">{elementA.boilingPoint}</span>,
      b: <span dir="ltr" className="font-mono-tabular">{elementB.boilingPoint}</span>,
      diff:
        boilA !== null && boilB !== null
          ? `Δ ${Math.abs(boilA - boilB).toFixed(1)} K`
          : '—',
      isMatch: false,
    },
    {
      label: t.density,
      a: <span dir="ltr" className="font-mono-tabular">{elementA.density}</span>,
      b: <span dir="ltr" className="font-mono-tabular">{elementB.density}</span>,
      diff:
        densA !== null && densB !== null
          ? `Δ ${Math.abs(densA - densB).toFixed(3)} g/cm³`
          : '—',
      isMatch: false,
    },
    {
      label: t.oxidationStates,
      a: <span dir="ltr" className="font-mono-tabular">{elementA.oxidationStates}</span>,
      b: <span dir="ltr" className="font-mono-tabular">{elementB.oxidationStates}</span>,
      diff:
        elementA.oxidationStates === elementB.oxidationStates
          ? t.compareSame
          : t.compareDifferent,
      isMatch: elementA.oxidationStates === elementB.oxidationStates,
    },
    {
      label: t.discoveredYear,
      a: <span className="font-mono-tabular">{elementA.yearDiscovered}</span>,
      b: <span className="font-mono-tabular">{elementB.yearDiscovered}</span>,
      diff: '—',
      isMatch: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Presets */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {t.compareTitle}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {t.compareSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {t.comparePresets}:
          </span>
          {PRESET_PAIRS.map(([numA, numB]) => {
            const elA = elements.find((e) => e.number === numA);
            const elB = elements.find((e) => e.number === numB);
            if (!elA || !elB) return null;
            const active =
              elementA.number === numA && elementB.number === numB;
            return (
              <button
                key={`${numA}-${numB}`}
                type="button"
                onClick={() => {
                  onChangeA(elA);
                  onChangeB(elB);
                }}
                dir="ltr"
                className={`px-2.5 py-1 rounded-lg text-xs font-mono-tabular font-semibold border transition-colors cursor-pointer ${
                  active
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
                }`}
              >
                {elA.symbol} vs {elB.symbol}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => onCompareWithAi(elementA, elementB)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.compareWithAi}</span>
          </button>
        </div>
      </div>

      {/* Dual Element Selectors */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
        <ElementPicker
          label={t.compareElementA}
          selected={elementA}
          elements={elements}
          lang={lang}
          accentSide="a"
          onSelect={onChangeA}
        />

        <button
          type="button"
          onClick={onSwap}
          className="inline-flex items-center justify-center h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer self-center sm:self-end"
          title={t.compareSwap}
          aria-label={t.compareSwap}
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>

        <ElementPicker
          label={t.compareElementB}
          selected={elementB}
          elements={elements}
          lang={lang}
          accentSide="b"
          onSelect={onChangeB}
        />
      </div>

      {/* Side-by-Side Hero Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { el: elementA, cat: catA, state: stateA, accent: 'sky' as const },
          { el: elementB, cat: catB, state: stateB, accent: 'amber' as const },
        ].map(({ el, cat, state, accent }, idx) => (
          <div
            key={`${el.number}-${idx}`}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4 min-w-0">
              <button
                type="button"
                onClick={() => onInspectElement(el)}
                dir="ltr"
                className={`w-20 h-24 rounded-xl border p-2.5 flex flex-col justify-between shrink-0 cursor-pointer hover:shadow-sm transition-shadow ${cat.tileClasses}`}
                title={lang === 'ar' ? el.arName : el.enName}
              >
                <div className="flex items-center justify-between text-[11px] font-mono-tabular font-semibold">
                  <span>{el.number}</span>
                  <StateIcon state={el.state} className={`w-3 h-3 ${state.textClass}`} />
                </div>
                <div className="text-center text-2xl font-bold leading-none">
                  {el.symbol}
                </div>
                <div className="text-center text-[10px] font-mono-tabular opacity-75 truncate">
                  {el.atomicMass}
                </div>
              </button>

              <div className="min-w-0 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      accent === 'sky'
                        ? 'bg-sky-600 dark:bg-sky-400'
                        : 'bg-amber-600 dark:bg-amber-400'
                    }`}
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 truncate">
                    {lang === 'ar' ? el.arName : el.enName}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'ar' ? el.enName : el.arName} ·{' '}
                  <span className="italic">{el.latinName}</span>
                </p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600 dark:text-slate-300 pt-1">
                  <span>{lang === 'ar' ? cat.ar : cat.en}</span>
                  <span aria-hidden="true">·</span>
                  <span className={`inline-flex items-center gap-1 font-medium ${state.textClass}`}>
                    <StateIcon state={el.state} className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? state.ar : state.en}</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onInspectElement(el)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline pt-1 cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'فتح البطاقة الكاملة' : 'Inspect full profile'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-center shrink-0">
              <BohrModelSvg
                symbol={el.symbol}
                number={el.number}
                shells={el.shells}
                size={104}
              />
              <span className="text-[10px] font-mono-tabular text-slate-400">
                {el.shells.join('·')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Quantitative Comparison Bars */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {lang === 'ar' ? 'المقارنة الكمية للخصائص الرئيسية' : 'Quantitative Metric Comparison'}
          </h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-sm bg-sky-600 dark:bg-sky-400" />
              <span dir="ltr">{elementA.symbol}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 dark:bg-amber-400" />
              <span dir="ltr">{elementB.symbol}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {quantitativeMetrics.map((m) => {
            const maxVal = Math.max(m.valA ?? 0, m.valB ?? 0, 0.0001);
            const pctA = m.valA !== null ? Math.min(100, Math.max(3, (m.valA / maxVal) * 100)) : 0;
            const pctB = m.valB !== null ? Math.min(100, Math.max(3, (m.valB / maxVal) * 100)) : 0;
            const delta =
              m.valA !== null && m.valB !== null
                ? Math.abs(m.valA - m.valB).toFixed(m.decimals)
                : '—';

            return (
              <div key={m.label} className="space-y-2">
                <div className="flex items-baseline justify-between gap-2 text-xs">
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {m.label}
                  </span>
                  <span dir="ltr" className="font-mono-tabular text-[11px] text-slate-500 dark:text-slate-400">
                    Δ {delta} {delta !== '—' ? m.unit : ''}
                  </span>
                </div>

                {/* Element A bar */}
                <div className="flex items-center gap-2.5">
                  <span dir="ltr" className="w-7 text-[11px] font-mono-tabular font-bold text-sky-700 dark:text-sky-300 shrink-0">
                    {elementA.symbol}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-sky-600 dark:bg-sky-400 transition-all duration-200"
                      style={{ width: `${pctA}%` }}
                    />
                  </div>
                  <span dir="ltr" className="w-36 text-end text-[11px] font-mono-tabular text-slate-700 dark:text-slate-300 truncate shrink-0">
                    {m.rawA}
                  </span>
                </div>

                {/* Element B bar */}
                <div className="flex items-center gap-2.5">
                  <span dir="ltr" className="w-7 text-[11px] font-mono-tabular font-bold text-amber-700 dark:text-amber-300 shrink-0">
                    {elementB.symbol}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-500 dark:bg-amber-400 transition-all duration-200"
                      style={{ width: `${pctB}%` }}
                    />
                  </div>
                  <span dir="ltr" className="w-36 text-end text-[11px] font-mono-tabular text-slate-700 dark:text-slate-300 truncate shrink-0">
                    {m.rawB}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Side-by-Side Properties Matrix */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <th className="py-3 px-4 text-start w-1/4">{t.compareProperty}</th>
                <th className="py-3 px-4 text-start w-[28%]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-600 dark:bg-sky-400" />
                    <span>
                      {lang === 'ar' ? elementA.arName : elementA.enName} ({elementA.symbol})
                    </span>
                  </span>
                </th>
                <th className="py-3 px-4 text-start w-[28%]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400" />
                    <span>
                      {lang === 'ar' ? elementB.arName : elementB.enName} ({elementB.symbol})
                    </span>
                  </span>
                </th>
                <th className="py-3 px-4 text-start w-[19%]">{t.compareDifference}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
              {comparisonRows.map((row) => (
                <tr
                  key={row.label}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-3 px-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {row.label}
                  </td>
                  <td className="py-3 px-4 text-slate-900 dark:text-slate-100">{row.a}</td>
                  <td className="py-3 px-4 text-slate-900 dark:text-slate-100">{row.b}</td>
                  <td className="py-3 px-4 text-xs font-mono-tabular">
                    <span
                      className={
                        row.isMatch
                          ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                          : 'text-slate-500 dark:text-slate-400'
                      }
                    >
                      {row.diff}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
