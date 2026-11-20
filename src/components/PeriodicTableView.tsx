import React from 'react';
import { ElementCategory, ElementData, Language } from '../types/element';
import { UI_TEXT } from '../data/i18n';
import { ElementTile } from './ElementTile';

interface PeriodicTableViewProps {
  elements: ElementData[];
  matchedNumbers: Set<number>;
  selectedElement: ElementData | null;
  lang: Language;
  viewMode: 'table' | 'grid';
  onSelectElement: (el: ElementData) => void;
  onSelectCategory: (cat: ElementCategory) => void;
}

const GROUPS = Array.from({ length: 18 }, (_, i) => i + 1);

export const PeriodicTableView: React.FC<PeriodicTableViewProps> = ({
  elements,
  matchedNumbers,
  selectedElement,
  lang,
  viewMode,
  onSelectElement,
  onSelectCategory,
}) => {
  const t = UI_TEXT[lang];

  if (viewMode === 'grid') {
    const matchedList = elements.filter((el) => matchedNumbers.has(el.number));

    if (matchedList.length === 0) {
      return (
        <div className="py-16 px-6 text-center border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {t.noResults}
          </p>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            {t.noResultsHint}
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {matchedList.map((el) => (
          <ElementTile
            key={el.number}
            element={el}
            lang={lang}
            isMatched={true}
            isSelected={selectedElement?.number === el.number}
            onSelect={onSelectElement}
            compact={false}
          />
        ))}
      </div>
    );
  }

  // Standard 18-column Periodic Table Matrix (always LTR horizontally for IUPAC group alignment)
  return (
    <div className="table-scroll overflow-x-auto pb-2">
      <div dir="ltr" className="min-w-[1080px] select-none">
        {/* Group Header Row */}
        <div className="grid grid-cols-[28px_repeat(18,minmax(0,1fr))] gap-1.5 mb-1.5 items-center">
          <div />
          {GROUPS.map((g) => (
            <div
              key={`group-${g}`}
              className="text-center font-mono-tabular text-[11px] font-medium text-slate-400 dark:text-slate-500"
              title={`${t.groupLabel} ${g}`}
            >
              {g}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[28px_repeat(18,minmax(0,1fr))] gap-1.5">
          {/* Period Numbers (1–7) in col 1 */}
          {[1, 2, 3, 4, 5, 6, 7].map((p) => (
            <div
              key={`period-${p}`}
              style={{ gridRowStart: p, gridColumnStart: 1 }}
              className="flex items-center justify-center font-mono-tabular text-[11px] font-medium text-slate-400 dark:text-slate-500"
              title={`${t.periodLabel} ${p}`}
            >
              {p}
            </div>
          ))}

          {/* Elements rendered directly in their exact periodic grid positions (offset +1 col for period axis) */}
          {elements.map((el) => (
            <ElementTile
              key={el.number}
              element={{ ...el, gridCol: el.gridCol + 1 }}
              lang={lang}
              isMatched={matchedNumbers.has(el.number)}
              isSelected={selectedElement?.number === el.number}
              onSelect={onSelectElement}
              compact={true}
            />
          ))}

          {/* Lanthanide placeholder marker in Row 6, Col 3 (gridCol = 4 because of period col) */}
          <button
            type="button"
            onClick={() => onSelectCategory('lanthanide')}
            style={{ gridRowStart: 6, gridColumnStart: 4 }}
            className="flex flex-col items-center justify-center p-1 rounded-lg border border-dashed border-orange-300 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/20 text-orange-800 dark:text-orange-300 hover:bg-orange-100/70 dark:hover:bg-orange-900/40 transition-colors cursor-pointer min-h-[68px]"
            title={t.lanthanidesSeries}
          >
            <span className="font-mono-tabular text-[10px] font-bold">57–71</span>
            <span
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              className="text-[9px] font-medium mt-0.5 text-center leading-tight"
            >
              {t.lanthanidesShort}
            </span>
          </button>

          {/* Actinide placeholder marker in Row 7, Col 3 (gridCol = 4 because of period col) */}
          <button
            type="button"
            onClick={() => onSelectCategory('actinide')}
            style={{ gridRowStart: 7, gridColumnStart: 4 }}
            className="flex flex-col items-center justify-center p-1 rounded-lg border border-dashed border-fuchsia-300 dark:border-fuchsia-800 bg-fuchsia-50/50 dark:bg-fuchsia-950/20 text-fuchsia-800 dark:text-fuchsia-300 hover:bg-fuchsia-100/70 dark:hover:bg-fuchsia-900/40 transition-colors cursor-pointer min-h-[68px]"
            title={t.actinidesSeries}
          >
            <span className="font-mono-tabular text-[10px] font-bold">89–103</span>
            <span
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              className="text-[9px] font-medium mt-0.5 text-center leading-tight"
            >
              {t.actinidesShort}
            </span>
          </button>

          {/* Spacer gap in Row 8 */}
          <div style={{ gridRowStart: 8, gridColumnStart: 1 }} className="h-3" />

          {/* Row 9 label: Lanthanides */}
          <div
            style={{ gridRowStart: 9, gridColumnStart: 1, gridColumnEnd: 5 }}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            className="flex items-center justify-end px-2 text-[11px] font-medium text-orange-700 dark:text-orange-300"
          >
            {t.lanthanidesSeries}
          </div>

          {/* Row 10 label: Actinides */}
          <div
            style={{ gridRowStart: 10, gridColumnStart: 1, gridColumnEnd: 5 }}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            className="flex items-center justify-end px-2 text-[11px] font-medium text-fuchsia-700 dark:text-fuchsia-300"
          >
            {t.actinidesSeries}
          </div>
        </div>
      </div>
    </div>
  );
};
