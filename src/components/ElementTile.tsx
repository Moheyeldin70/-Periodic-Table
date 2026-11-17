import React from 'react';
import { ElementData, Language } from '../types/element';
import { CATEGORY_META, STATE_META } from '../data/i18n';
import { StateIcon } from './StateIcon';

interface ElementTileProps {
  element: ElementData;
  lang: Language;
  isMatched: boolean;
  isSelected: boolean;
  onSelect: (element: ElementData) => void;
  compact?: boolean;
}

export const ElementTile: React.FC<ElementTileProps> = ({
  element,
  lang,
  isMatched,
  isSelected,
  onSelect,
  compact = true,
}) => {
  const catMeta = CATEGORY_META[element.category];
  const stateMeta = STATE_META[element.state];
  const displayName = lang === 'ar' ? element.arName : element.enName;

  if (!compact) {
    // Card style for Grid / Index View
    return (
      <button
        type="button"
        onClick={() => onSelect(element)}
        className={`group text-start flex flex-col justify-between p-4 rounded-xl border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
          catMeta.tileClasses
        } ${
          isSelected
            ? 'ring-2 ring-sky-500 dark:ring-sky-400 shadow-sm'
            : ''
        }`}
      >
        <div className="flex items-start justify-between gap-2 w-full">
          <span className="font-mono-tabular text-xs font-semibold opacity-75">
            {element.number}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-medium ${stateMeta.textClass}`}
            title={lang === 'ar' ? stateMeta.ar : stateMeta.en}
          >
            <StateIcon state={element.state} className="w-3 h-3" />
            <span>{lang === 'ar' ? stateMeta.ar : stateMeta.en}</span>
          </span>
        </div>

        <div className="my-2.5 flex items-baseline gap-2.5">
          <span dir="ltr" className="text-2xl font-bold tracking-tight">
            {element.symbol}
          </span>
          <span className="text-sm font-semibold truncate">{displayName}</span>
        </div>

        <div className="flex items-center justify-between gap-2 text-[11px] opacity-75 w-full pt-2 border-t border-current/10">
          <span className="truncate">{lang === 'ar' ? catMeta.ar : catMeta.en}</span>
          <span dir="ltr" className="font-mono-tabular shrink-0">
            {element.atomicMass}
          </span>
        </div>
      </button>
    );
  }

  // Standard 18-column Periodic Table Cell
  return (
    <button
      type="button"
      onClick={() => onSelect(element)}
      title={`${element.number}. ${element.enName} (${element.arName}) — ${element.latinName}`}
      style={{
        gridRowStart: element.gridRow,
        gridColumnStart: element.gridCol,
      }}
      className={`relative flex flex-col justify-between p-1.5 rounded-lg border text-left transition-all duration-150 cursor-pointer select-none min-h-[68px] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-sky-500 ${
        catMeta.tileClasses
      } ${
        isMatched
          ? 'opacity-100 hover:-translate-y-0.5 hover:shadow-sm z-0 hover:z-10'
          : 'opacity-20 grayscale-[45%] hover:opacity-75'
      } ${isSelected ? 'ring-2 ring-sky-500 dark:ring-sky-400 z-10' : ''}`}
    >
      {/* Top Row: Atomic Number & State Badge */}
      <div className="flex items-center justify-between w-full leading-none">
        <span className="font-mono-tabular text-[10px] font-semibold opacity-85">
          {element.number}
        </span>
        <span
          className={`inline-flex items-center gap-0.5 text-[9px] font-bold ${stateMeta.textClass}`}
          aria-label={lang === 'ar' ? stateMeta.ar : stateMeta.en}
        >
          <StateIcon state={element.state} className="w-2.5 h-2.5" />
          <span className="hidden xl:inline">
            {lang === 'ar' ? stateMeta.shortAr : stateMeta.shortEn}
          </span>
        </span>
      </div>

      {/* Center: Chemical Symbol */}
      <div className="my-0.5 flex flex-col items-center justify-center text-center w-full">
        <span className="text-base xl:text-lg font-bold leading-tight tracking-tight">
          {element.symbol}
        </span>
        <span
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
          className="text-[9px] xl:text-[10px] font-medium leading-tight w-full truncate opacity-90 text-center"
        >
          {displayName}
        </span>
      </div>

      {/* Bottom: Atomic Mass */}
      <div className="w-full text-center leading-none">
        <span className="font-mono-tabular text-[8.5px] opacity-65 block truncate">
          {element.atomicMass}
        </span>
      </div>
    </button>
  );
};
