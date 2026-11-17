import React from 'react';
import { parseFormulaParts } from '../utils/etymology';

interface FormulaTextProps {
  formula: string;
  className?: string;
}

export const FormulaText: React.FC<FormulaTextProps> = ({ formula, className = '' }) => {
  const parts = parseFormulaParts(formula);
  return (
    <span dir="ltr" className={`inline-block font-mono-tabular tracking-tight ${className}`}>
      {parts.map((part, idx) =>
        part.isSub ? (
          <sub key={idx} className="text-[0.72em] leading-none align-baseline relative -bottom-[0.2em]">
            {part.text}
          </sub>
        ) : (
          <React.Fragment key={idx}>{part.text}</React.Fragment>
        )
      )}
    </span>
  );
};
