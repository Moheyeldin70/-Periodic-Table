import {
  ElementData,
  ElementLocaleMap,
  Language,
  LocalizedElement,
  NonCoreLanguage,
} from '../types/element';
import { LOCALE_JA } from '../data/locales/ja';
import { LOCALE_ZH } from '../data/locales/zh';
import { LOCALE_FR } from '../data/locales/fr';
import { LOCALE_ES } from '../data/locales/es';
import { LOCALE_DE } from '../data/locales/de';
import { LOCALE_RU } from '../data/locales/ru';
import { LOCALE_PT } from '../data/locales/pt';
import { LOCALE_KO } from '../data/locales/ko';
import { LOCALE_IT } from '../data/locales/it';
import { LOCALE_HI } from '../data/locales/hi';
import { ELEMENT_NAMES } from '../data/locales/names';
import { translateDiscoverer } from '../data/locales/discoverers';
import { translateCompoundName } from '../data/locales/compounds';

export interface LanguageOption {
  code: Language;
  nativeName: string;
  shortCode: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', nativeName: 'English', shortCode: 'EN', dir: 'ltr' },
  { code: 'ar', nativeName: 'العربية', shortCode: 'AR', dir: 'rtl' },
  { code: 'ja', nativeName: '日本語', shortCode: 'JA', dir: 'ltr' },
  { code: 'zh', nativeName: '中文', shortCode: 'ZH', dir: 'ltr' },
  { code: 'fr', nativeName: 'Français', shortCode: 'FR', dir: 'ltr' },
  { code: 'es', nativeName: 'Español', shortCode: 'ES', dir: 'ltr' },
  { code: 'de', nativeName: 'Deutsch', shortCode: 'DE', dir: 'ltr' },
  { code: 'ru', nativeName: 'Русский', shortCode: 'RU', dir: 'ltr' },
  { code: 'pt', nativeName: 'Português', shortCode: 'PT', dir: 'ltr' },
  { code: 'ko', nativeName: '한국어', shortCode: 'KO', dir: 'ltr' },
  { code: 'it', nativeName: 'Italiano', shortCode: 'IT', dir: 'ltr' },
  { code: 'hi', nativeName: 'हिन्दी', shortCode: 'HI', dir: 'ltr' },
];

const SUPPORTED_SET = new Set<Language>(LANGUAGE_OPTIONS.map((o) => o.code));

const LOCALE_MAPS: Record<NonCoreLanguage, ElementLocaleMap> = {
  ja: LOCALE_JA,
  zh: LOCALE_ZH,
  fr: LOCALE_FR,
  es: LOCALE_ES,
  de: LOCALE_DE,
  ru: LOCALE_RU,
  pt: LOCALE_PT,
  ko: LOCALE_KO,
  it: LOCALE_IT,
  hi: LOCALE_HI,
};

export function isSupportedLanguage(value: string | null | undefined): value is Language {
  return Boolean(value && SUPPORTED_SET.has(value as Language));
}

export function matchLanguageTag(tag: string | undefined | null): Language | null {
  if (!tag) return null;
  const normalized = tag.trim().toLowerCase().replace(/_/g, '-');
  if (!normalized) return null;
  const primary = normalized.split('-')[0];
  if (isSupportedLanguage(primary)) {
    return primary;
  }
  return null;
}

export function detectDeviceLanguage(): Language {
  if (typeof navigator === 'undefined') return 'en';
  const candidates: string[] = [];
  if (Array.isArray(navigator.languages)) {
    candidates.push(...navigator.languages);
  }
  if (navigator.language) {
    candidates.push(navigator.language);
  }
  for (const tag of candidates) {
    const matched = matchLanguageTag(tag);
    if (matched) return matched;
  }
  return 'en';
}

export function getInitialLang(): Language {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('pt_lang');
      if (isSupportedLanguage(saved)) {
        return saved;
      }
    }
  } catch {
    // ignore storage errors
  }
  return detectDeviceLanguage();
}

export function getLanguageDir(lang: Language): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

export function getElementName(element: ElementData, lang: Language): string {
  if (lang === 'en') return element.enName;
  if (lang === 'ar') return element.arName;
  return ELEMENT_NAMES[element.number]?.[lang] ?? element.enName;
}

export function getLocalizedElement(element: ElementData, lang: Language): LocalizedElement {
  if (lang === 'en') {
    return {
      name: element.enName,
      secondaryName: element.arName,
      etymology: element.etymologyEn,
      discoveredBy: element.discoveredByEn,
      history: element.historyEn,
      uses: element.usesEn,
      compounds: element.compounds.map((c) => ({
        formula: c.formula,
        name: c.enName,
        secondaryName: c.arName,
      })),
    };
  }

  if (lang === 'ar') {
    return {
      name: element.arName,
      secondaryName: element.enName,
      etymology: element.etymologyAr,
      discoveredBy: element.discoveredByAr,
      history: element.historyAr,
      uses: element.usesAr,
      compounds: element.compounds.map((c) => ({
        formula: c.formula,
        name: c.arName,
        secondaryName: c.enName,
      })),
    };
  }

  const tuple = LOCALE_MAPS[lang][element.number];
  const name = getElementName(element, lang);

  return {
    name,
    secondaryName: element.enName,
    etymology: tuple?.[0] ?? element.etymologyEn,
    discoveredBy: translateDiscoverer(element.discoveredByEn, lang),
    history: tuple?.[1] ?? element.historyEn,
    uses: tuple?.[2] ?? element.usesEn,
    compounds: element.compounds.map((c) => ({
      formula: c.formula,
      name: translateCompoundName(c.enName, lang),
      secondaryName: c.enName,
    })),
  };
}

export function elementMatchesQuery(
  element: ElementData,
  query: string,
  lang: Language
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const localName = getElementName(element, lang).toLowerCase();
  return (
    localName.includes(q) ||
    element.enName.toLowerCase().includes(q) ||
    element.arName.toLowerCase().includes(q) ||
    element.latinName.toLowerCase().includes(q) ||
    element.symbol.toLowerCase().includes(q) ||
    String(element.number) === q
  );
}
