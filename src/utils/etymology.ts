export interface TextSegment {
  text: string;
  highlighted: boolean;
}

/**
 * Splits a name (Latin or English) into highlighted and non-highlighted segments
 * matching the element's chemical symbol letters in order.
 * Prefers a contiguous case-insensitive substring match (e.g., **Na**trium, **Fe**rrum),
 * then falls back to ordered letter matching from the start (e.g., **P**lum**b**um, **H**ydrar**g**yrum).
 */
export function getSymbolHighlightSegments(name: string, symbol: string): TextSegment[] {
  if (!name || !symbol) {
    return [{ text: name, highlighted: false }];
  }

  const lowerName = name.toLowerCase();
  const lowerSym = symbol.toLowerCase();

  // 1. Try exact contiguous match starting at index 0, or anywhere in the word
  const contiguousIdx = lowerName.indexOf(lowerSym);
  let matchedIndices: Set<number> | null = null;

  if (contiguousIdx !== -1) {
    matchedIndices = new Set<number>();
    for (let i = 0; i < lowerSym.length; i++) {
      matchedIndices.add(contiguousIdx + i);
    }
  } else {
    // 2. Ordered subsequence match (first symbol char from start if possible)
    const indices: number[] = [];
    let searchFrom = 0;
    for (let s = 0; s < lowerSym.length; s++) {
      const ch = lowerSym[s];
      const found = lowerName.indexOf(ch, searchFrom);
      if (found === -1) {
        break;
      }
      indices.push(found);
      searchFrom = found + 1;
    }
    if (indices.length === lowerSym.length) {
      matchedIndices = new Set(indices);
    }
  }

  if (!matchedIndices || matchedIndices.size === 0) {
    return [{ text: name, highlighted: false }];
  }

  const segments: TextSegment[] = [];
  let currentText = '';
  let currentHighlight = matchedIndices.has(0);

  for (let i = 0; i < name.length; i++) {
    const isHi = matchedIndices.has(i);
    if (isHi === currentHighlight) {
      currentText += name[i];
    } else {
      if (currentText) {
        segments.push({ text: currentText, highlighted: currentHighlight });
      }
      currentText = name[i];
      currentHighlight = isHi;
    }
  }
  if (currentText) {
    segments.push({ text: currentText, highlighted: currentHighlight });
  }

  return segments;
}

/**
 * Formats chemical formulas with Unicode subscripts where appropriate if plain digits are passed,
 * or renders cleanly. Returns segments so digits can be styled as <sub>.
 */
export function parseFormulaParts(formula: string): Array<{ text: string; isSub: boolean }> {
  const parts: Array<{ text: string; isSub: boolean }> = [];
  // Normalize unicode subscripts back to normal digits if needed, or detect digits after letters/parens
  const subscriptMap: Record<string, string> = {
    '₀': '0',
    '₁': '1',
    '₂': '2',
    '₃': '3',
    '₄': '4',
    '₅': '5',
    '₆': '6',
    '₇': '7',
    '₈': '8',
    '₉': '9',
  };

  let normalized = '';
  for (const ch of formula) {
    normalized += subscriptMap[ch] ?? ch;
  }

  // Match sequences of digits that follow a letter or closing parenthesis/bracket, vs normal text
  // Leading stoichiometric coefficients (if any) stay normal, numbers after element/paren become sub.
  const regex = /([A-Za-z)\]])(\d+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(normalized)) !== null) {
    const prefixStart = match.index;
    const letterEnd = prefixStart + match[1].length;
    if (letterEnd > lastIndex) {
      parts.push({ text: normalized.slice(lastIndex, letterEnd), isSub: false });
    }
    parts.push({ text: match[2], isSub: true });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < normalized.length) {
    parts.push({ text: normalized.slice(lastIndex), isSub: false });
  }

  return parts;
}
