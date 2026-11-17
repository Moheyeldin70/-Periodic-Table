import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, FlaskConical, History, Wrench, Atom } from 'lucide-react';
import { ElementData, Language } from '../types/element';
import { CATEGORY_META, STATE_META, UI_TEXT } from '../data/i18n';
import { getSymbolHighlightSegments } from '../utils/etymology';
import { StateIcon } from './StateIcon';
import { FormulaText } from './FormulaText';
import { BohrModelSvg } from './BohrModelSvg';

interface ElementModalProps {
  element: ElementData;
  lang: Language;
  onClose: () => void;
  onNavigate: (atomicNumber: number) => void;
}

export const ElementModal: React.FC<ElementModalProps> = ({
  element,
  lang,
  onClose,
  onNavigate,
}) => {
  const t = UI_TEXT[lang];
  const catMeta = CATEGORY_META[element.category];
  const stateMeta = STATE_META[element.state];

  const hasPrev = element.number > 1;
  const hasNext = element.number < 118;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        if (lang === 'ar' && hasNext) onNavigate(element.number + 1);
        else if (lang === 'en' && hasPrev) onNavigate(element.number - 1);
      } else if (e.key === 'ArrowRight') {
        if (lang === 'ar' && hasPrev) onNavigate(element.number - 1);
        else if (lang === 'en' && hasNext) onNavigate(element.number + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [element.number, hasNext, hasPrev, lang, onClose, onNavigate]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const latinSegments = getSymbolHighlightSegments(element.latinName, element.symbol);
  const englishSegments = getSymbolHighlightSegments(element.enName, element.symbol);
  const englishDiffersFromLatin =
    element.enName.toLowerCase() !== element.latinName.toLowerCase();

  const PrevIcon = lang === 'ar' ? ChevronRight : ChevronLeft;
  const NextIcon = lang === 'ar' ? ChevronLeft : ChevronRight;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="element-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 py-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 min-w-0">
            <span className="font-mono-tabular font-semibold text-slate-900 dark:text-slate-100">
              #{element.number}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate font-medium">
              {lang === 'ar' ? catMeta.ar : catMeta.en}
            </span>
            <span aria-hidden="true">·</span>
            <span className={`inline-flex items-center gap-1 font-medium ${stateMeta.textClass}`}>
              <StateIcon state={element.state} className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? stateMeta.ar : stateMeta.en}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={() => hasPrev && onNavigate(element.number - 1)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label={t.previousElement}
            >
              <PrevIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.previousElement}</span>
            </button>
            <button
              type="button"
              disabled={!hasNext}
              onClick={() => hasNext && onNavigate(element.number + 1)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label={t.nextElement}
            >
              <span className="hidden sm:inline">{t.nextElement}</span>
              <NextIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label={t.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-5 sm:p-8 space-y-8">
          {/* Hero: Atomic Tile + Trilingual Names + Bohr Diagram */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 pb-7 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-5 min-w-0 flex-1">
              {/* Element Badge Tile */}
              <div
                dir="ltr"
                className={`w-28 h-32 sm:w-32 sm:h-36 shrink-0 rounded-xl border p-3 flex flex-col justify-between ${catMeta.tileClasses}`}
              >
                <div className="flex items-center justify-between text-xs font-mono-tabular font-semibold">
                  <span>{element.number}</span>
                  <span className={`inline-flex items-center gap-1 ${stateMeta.textClass}`}>
                    <StateIcon state={element.state} className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold tracking-tight leading-none">
                    {element.symbol}
                  </div>
                </div>
                <div className="text-center font-mono-tabular text-[11px] opacity-80">
                  {element.atomicMass} u
                </div>
              </div>

              {/* Names Block: Arabic, English, Latin */}
              <div className="min-w-0 flex-1 space-y-3">
                <div>
                  <h2
                    id="element-modal-title"
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
                  >
                    {lang === 'ar' ? element.arName : element.enName}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {lang === 'ar' ? element.enName : element.arName}
                  </p>
                </div>

                {/* 3-Language Name Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {t.arabicName}
                    </div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                      {element.arName}
                    </div>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {t.englishName}
                    </div>
                    <div dir="ltr" className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-0.5 text-start">
                      {element.enName}
                    </div>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {t.latinName}
                    </div>
                    <div dir="ltr" className="text-sm font-semibold italic text-slate-900 dark:text-slate-100 mt-0.5 text-start">
                      {element.latinName}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bohr Model Visual */}
            <div className="flex flex-col items-center justify-center shrink-0 self-center md:self-auto">
              <BohrModelSvg
                symbol={element.symbol}
                number={element.number}
                shells={element.shells}
                size={156}
              />
              <div className="text-[11px] font-mono-tabular text-slate-500 dark:text-slate-400 mt-1">
                {t.electronShells}: {element.shells.join(' · ')}
              </div>
            </div>
          </div>

          {/* Symbol Etymology Highlight Section */}
          <section className="rounded-xl bg-slate-50 dark:bg-slate-800/45 border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-400 mb-2">
              <Atom className="w-4 h-4" />
              <span>{t.etymologyTitle}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              {t.symbolOriginPrefix}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {/* Highlighted Latin Name */}
              <div
                dir="ltr"
                className="inline-flex items-baseline gap-2.5 px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              >
                <span className="text-xl sm:text-2xl font-bold tracking-wide text-slate-800 dark:text-slate-200">
                  {latinSegments.map((seg, i) =>
                    seg.highlighted ? (
                      <mark
                        key={i}
                        className="bg-sky-100 dark:bg-sky-900/70 text-sky-700 dark:text-sky-300 px-0.5 rounded font-extrabold underline decoration-2 decoration-sky-500 underline-offset-4"
                      >
                        {seg.text}
                      </mark>
                    ) : (
                      <span key={i} className="opacity-70">
                        {seg.text}
                      </span>
                    )
                  )}
                </span>
                <span className="text-slate-400 dark:text-slate-500 font-mono-tabular text-sm">
                  →
                </span>
                <span className="text-xl font-bold font-mono-tabular text-sky-700 dark:text-sky-400">
                  {element.symbol}
                </span>
              </div>

              {/* Also show English highlight if English name differs & shares letters */}
              {englishDiffersFromLatin && (
                <div
                  dir="ltr"
                  className="inline-flex items-baseline gap-2 px-3.5 py-2 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/70 text-sm text-slate-600 dark:text-slate-300"
                >
                  <span className="text-xs text-slate-400 dark:text-slate-500">EN:</span>
                  <span className="font-semibold">
                    {englishSegments.some((s) => s.highlighted)
                      ? englishSegments.map((seg, i) =>
                          seg.highlighted ? (
                            <span
                              key={i}
                              className="text-sky-700 dark:text-sky-300 font-bold underline decoration-sky-500/70 underline-offset-2"
                            >
                              {seg.text}
                            </span>
                          ) : (
                            <span key={i}>{seg.text}</span>
                          )
                        )
                      : element.enName}
                  </span>
                </div>
              )}
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {lang === 'ar' ? element.etymologyAr : element.etymologyEn}
            </p>
          </section>

          {/* Atomic & Physical Properties Grid */}
          <section>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3.5">
              {t.propertiesTitle}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              {[
                { label: t.atomicMass, value: `${element.atomicMass} u`, ltr: true },
                { label: t.electronConfig, value: element.electronConfig, ltr: true },
                { label: t.electronegativity, value: element.electronegativity, ltr: true },
                { label: t.oxidationStates, value: element.oxidationStates, ltr: true },
                { label: t.meltingPoint, value: element.meltingPoint, ltr: true },
                { label: t.boilingPoint, value: element.boilingPoint, ltr: true },
                { label: t.density, value: element.density, ltr: true },
                {
                  label: `${t.periodLabel} / ${t.groupLabel} / ${t.block}`,
                  value: `P${element.period} · G${element.group} · ${element.block}-block`,
                  ltr: true,
                },
              ].map((prop, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 p-3.5 flex flex-col justify-between"
                >
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {prop.label}
                  </span>
                  <span
                    dir={prop.ltr ? 'ltr' : undefined}
                    className={`mt-1 text-sm font-semibold font-mono-tabular text-slate-900 dark:text-slate-100 break-words ${
                      lang === 'ar' && prop.ltr ? 'text-end' : ''
                    }`}
                  >
                    {prop.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Top 10 Famous & Common Compounds */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3.5">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {t.compoundsTitle}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.compoundsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {element.compounds.slice(0, 10).map((comp, index) => (
                <div
                  key={`${comp.formula}-${index}`}
                  className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/35"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono-tabular text-xs font-medium text-slate-400 dark:text-slate-500 w-5 shrink-0">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                        {lang === 'ar' ? comp.arName : comp.enName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {lang === 'ar' ? comp.enName : comp.arName}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-sky-700 dark:text-sky-300">
                    <FormulaText formula={comp.formula} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* History & Discovery + Common Uses (Two-Column Balance) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-200 dark:border-slate-800">
            {/* History & Discovery */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {t.historyTitle}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span>
                  {t.discoveredYear}:{' '}
                  <strong className="font-mono-tabular text-slate-800 dark:text-slate-200">
                    {element.yearDiscovered}
                  </strong>
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {t.discoveredBy}:{' '}
                  <strong className="text-slate-800 dark:text-slate-200">
                    {lang === 'ar' ? element.discoveredByAr : element.discoveredByEn}
                  </strong>
                </span>
              </div>

              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {lang === 'ar' ? element.historyAr : element.historyEn}
              </p>
            </section>

            {/* Common Uses */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {t.usesTitle}
                </h3>
              </div>

              <ul className="space-y-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {(lang === 'ar' ? element.usesAr : element.usesEn).map((use, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400 shrink-0"
                    />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
