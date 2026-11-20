export type Language =
  | 'en'
  | 'ar'
  | 'ja'
  | 'zh'
  | 'fr'
  | 'es'
  | 'de'
  | 'ru'
  | 'pt'
  | 'ko'
  | 'it'
  | 'hi';

export type NonCoreLanguage = Exclude<Language, 'en' | 'ar'>;

export type Theme = 'light' | 'dark';

export type MatterState = 'solid' | 'liquid' | 'gas';

export type ElementCategory =
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition-metal'
  | 'post-transition'
  | 'metalloid'
  | 'reactive-nonmetal'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide';

export interface Compound {
  formula: string;
  enName: string;
  arName: string;
}

export interface ElementData {
  number: number;
  symbol: string;
  enName: string;
  arName: string;
  latinName: string;
  etymologyEn: string;
  etymologyAr: string;
  atomicMass: string;
  category: ElementCategory;
  state: MatterState;
  period: number;
  group: number;
  gridRow: number;
  gridCol: number;
  block: 's' | 'p' | 'd' | 'f';
  shells: number[];
  electronConfig: string;
  electronegativity: string;
  meltingPoint: string; // e.g. "370.95 K (97.8 °C)"
  boilingPoint: string;
  density: string;
  oxidationStates: string;
  yearDiscovered: string;
  discoveredByEn: string;
  discoveredByAr: string;
  historyEn: string;
  historyAr: string;
  usesEn: string[];
  usesAr: string[];
  compounds: Compound[];
}

export type ElementLocaleTuple = [
  etymology: string,
  history: string,
  uses: string[]
];

export type ElementLocaleMap = Record<number, ElementLocaleTuple>;

export interface LocalizedCompound {
  formula: string;
  name: string;
  secondaryName: string;
}

export interface LocalizedElement {
  name: string;
  secondaryName: string;
  etymology: string;
  discoveredBy: string;
  history: string;
  uses: string[];
  compounds: LocalizedCompound[];
}
