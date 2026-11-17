import { ElementCategory, Language, MatterState } from '../types/element';

export interface CategoryMeta {
  id: ElementCategory;
  en: string;
  ar: string;
  tileClasses: string;
  swatchClass: string;
  badgeClasses: string;
}

export const CATEGORY_META: Record<ElementCategory, CategoryMeta> = {
  'alkali-metal': {
    id: 'alkali-metal',
    en: 'Alkali Metals',
    ar: 'الفلزات القلوية',
    tileClasses:
      'bg-rose-50/90 dark:bg-rose-950/45 border-rose-200 dark:border-rose-800/70 text-rose-950 dark:text-rose-100 hover:border-rose-400 dark:hover:border-rose-500',
    swatchClass: 'bg-rose-500',
    badgeClasses:
      'bg-rose-100 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800',
  },
  'alkaline-earth': {
    id: 'alkaline-earth',
    en: 'Alkaline Earth Metals',
    ar: 'الفلزات القلوية الترابية',
    tileClasses:
      'bg-amber-50/90 dark:bg-amber-950/45 border-amber-200 dark:border-amber-800/70 text-amber-950 dark:text-amber-100 hover:border-amber-400 dark:hover:border-amber-500',
    swatchClass: 'bg-amber-500',
    badgeClasses:
      'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800',
  },
  'transition-metal': {
    id: 'transition-metal',
    en: 'Transition Metals',
    ar: 'الفلزات الانتقالية',
    tileClasses:
      'bg-sky-50/90 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/70 text-sky-950 dark:text-sky-100 hover:border-sky-400 dark:hover:border-sky-500',
    swatchClass: 'bg-sky-500',
    badgeClasses:
      'bg-sky-100 dark:bg-sky-950/70 text-sky-900 dark:text-sky-200 border-sky-300 dark:border-sky-800',
  },
  'post-transition': {
    id: 'post-transition',
    en: 'Post-Transition Metals',
    ar: 'فلزات ما بعد الانتقالية',
    tileClasses:
      'bg-teal-50/90 dark:bg-teal-950/45 border-teal-200 dark:border-teal-800/70 text-teal-950 dark:text-teal-100 hover:border-teal-400 dark:hover:border-teal-500',
    swatchClass: 'bg-teal-500',
    badgeClasses:
      'bg-teal-100 dark:bg-teal-950/70 text-teal-900 dark:text-teal-200 border-teal-300 dark:border-teal-800',
  },
  metalloid: {
    id: 'metalloid',
    en: 'Metalloids',
    ar: 'أشباه الفلزات',
    tileClasses:
      'bg-emerald-50/90 dark:bg-emerald-950/45 border-emerald-200 dark:border-emerald-800/70 text-emerald-950 dark:text-emerald-100 hover:border-emerald-400 dark:hover:border-emerald-500',
    swatchClass: 'bg-emerald-500',
    badgeClasses:
      'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800',
  },
  'reactive-nonmetal': {
    id: 'reactive-nonmetal',
    en: 'Reactive Non-Metals',
    ar: 'اللافلزات النشطة',
    tileClasses:
      'bg-indigo-50/90 dark:bg-indigo-950/45 border-indigo-200 dark:border-indigo-800/70 text-indigo-950 dark:text-indigo-100 hover:border-indigo-400 dark:hover:border-indigo-500',
    swatchClass: 'bg-indigo-500',
    badgeClasses:
      'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-800',
  },
  'noble-gas': {
    id: 'noble-gas',
    en: 'Noble Gases',
    ar: 'الغازات النبيلة',
    tileClasses:
      'bg-violet-50/90 dark:bg-violet-950/45 border-violet-200 dark:border-violet-800/70 text-violet-950 dark:text-violet-100 hover:border-violet-400 dark:hover:border-violet-500',
    swatchClass: 'bg-violet-500',
    badgeClasses:
      'bg-violet-100 dark:bg-violet-950/70 text-violet-900 dark:text-violet-200 border-violet-300 dark:border-violet-800',
  },
  lanthanide: {
    id: 'lanthanide',
    en: 'Lanthanides',
    ar: 'اللانثانيدات',
    tileClasses:
      'bg-orange-50/90 dark:bg-orange-950/45 border-orange-200 dark:border-orange-800/70 text-orange-950 dark:text-orange-100 hover:border-orange-400 dark:hover:border-orange-500',
    swatchClass: 'bg-orange-500',
    badgeClasses:
      'bg-orange-100 dark:bg-orange-950/70 text-orange-900 dark:text-orange-200 border-orange-300 dark:border-orange-800',
  },
  actinide: {
    id: 'actinide',
    en: 'Actinides',
    ar: 'الأكتينيدات',
    tileClasses:
      'bg-fuchsia-50/90 dark:bg-fuchsia-950/45 border-fuchsia-200 dark:border-fuchsia-800/70 text-fuchsia-950 dark:text-fuchsia-100 hover:border-fuchsia-400 dark:hover:border-fuchsia-500',
    swatchClass: 'bg-fuchsia-500',
    badgeClasses:
      'bg-fuchsia-100 dark:bg-fuchsia-950/70 text-fuchsia-900 dark:text-fuchsia-200 border-fuchsia-300 dark:border-fuchsia-800',
  },
};

export const STATE_META: Record<
  MatterState,
  { en: string; ar: string; shortEn: string; shortAr: string; dotClass: string; textClass: string }
> = {
  solid: {
    en: 'Solid',
    ar: 'صلب',
    shortEn: 'S',
    shortAr: 'ص',
    dotClass: 'bg-slate-700 dark:bg-slate-300',
    textClass: 'text-slate-700 dark:text-slate-300',
  },
  liquid: {
    en: 'Liquid',
    ar: 'سائل',
    shortEn: 'L',
    shortAr: 'س',
    dotClass: 'bg-cyan-600 dark:bg-cyan-400',
    textClass: 'text-cyan-700 dark:text-cyan-300',
  },
  gas: {
    en: 'Gas',
    ar: 'غاز',
    shortEn: 'G',
    shortAr: 'غ',
    dotClass: 'bg-emerald-600 dark:bg-emerald-400',
    textClass: 'text-emerald-700 dark:text-emerald-300',
  },
};

export const UI_TEXT: Record<
  Language,
  {
    appTitle: string;
    appSubtitle: string;
    searchPlaceholder: string;
    allStates: string;
    allCategories: string;
    clearFilters: string;
    showingCount: string;
    ofElements: string;
    roomTempNote: string;
    tableView: string;
    gridView: string;
    lanthanidesSeries: string;
    actinidesSeries: string;
    groupLabel: string;
    periodLabel: string;
    noResults: string;
    noResultsHint: string;
    close: string;
    previousElement: string;
    nextElement: string;
    namesSection: string;
    arabicName: string;
    englishName: string;
    latinName: string;
    etymologyTitle: string;
    symbolOriginPrefix: string;
    propertiesTitle: string;
    atomicNumber: string;
    atomicMass: string;
    electronConfig: string;
    electronegativity: string;
    meltingPoint: string;
    boilingPoint: string;
    density: string;
    oxidationStates: string;
    block: string;
    stateAtRoomTemp: string;
    electronShells: string;
    compoundsTitle: string;
    compoundsSubtitle: string;
    historyTitle: string;
    discoveredYear: string;
    discoveredBy: string;
    usesTitle: string;
    lightMode: string;
    darkMode: string;
    switchLang: string;
    stateLegendTitle: string;
    categoryLegendTitle: string;
    compareView: string;
    compareTitle: string;
    compareSubtitle: string;
    compareElementA: string;
    compareElementB: string;
    compareSwap: string;
    comparePresets: string;
    compareProperty: string;
    compareDifference: string;
    compareSame: string;
    compareDifferent: string;
    compareSelectPlaceholder: string;
    compareButton: string;
  }
> = {
  en: {
    appTitle: 'Periodic Table of Elements',
    appSubtitle: 'Interactive bilingual reference · 118 elements',
    searchPlaceholder: 'Search by name, Arabic, Latin, symbol, or atomic number...',
    allStates: 'All States',
    allCategories: 'All Categories',
    clearFilters: 'Reset filters',
    showingCount: 'Showing',
    ofElements: 'of 118 elements',
    roomTempNote: 'State at 25 °C (298 K)',
    tableView: 'Periodic Table',
    gridView: 'Index Cards',
    lanthanidesSeries: 'Lanthanides (57–71)',
    actinidesSeries: 'Actinides (89–103)',
    groupLabel: 'Group',
    periodLabel: 'Period',
    noResults: 'No elements match your current filters',
    noResultsHint: 'Try clearing the search query or switching state/category filters.',
    close: 'Close',
    previousElement: 'Previous',
    nextElement: 'Next',
    namesSection: 'Nomenclature & Symbol Etymology',
    arabicName: 'Arabic',
    englishName: 'English',
    latinName: 'Latin',
    etymologyTitle: 'Symbol Origin Highlight',
    symbolOriginPrefix: 'Chemical symbol letters highlighted in the source name:',
    propertiesTitle: 'Atomic & Physical Properties',
    atomicNumber: 'Atomic Number',
    atomicMass: 'Atomic Mass',
    electronConfig: 'Electron Configuration',
    electronegativity: 'Electronegativity',
    meltingPoint: 'Melting Point',
    boilingPoint: 'Boiling Point',
    density: 'Density',
    oxidationStates: 'Oxidation States',
    block: 'Block',
    stateAtRoomTemp: 'State at 25 °C',
    electronShells: 'Electron Shells',
    compoundsTitle: 'Top 10 Famous & Common Compounds',
    compoundsSubtitle: 'Widely encountered inorganic, organic, or coordination compounds',
    historyTitle: 'History & Discovery',
    discoveredYear: 'Year Discovered',
    discoveredBy: 'Discoverer',
    usesTitle: 'Common Uses & Applications',
    lightMode: 'Light',
    darkMode: 'Dark',
    switchLang: 'العربية',
    stateLegendTitle: 'State of Matter',
    categoryLegendTitle: 'Element Categories',
    compareView: 'Compare',
    compareTitle: 'Side-by-Side Element Comparison',
    compareSubtitle: 'Select any two elements to inspect atomic mass, electronegativity, state, and structural differences',
    compareElementA: 'First Element',
    compareElementB: 'Second Element',
    compareSwap: 'Swap elements',
    comparePresets: 'Quick pairs',
    compareProperty: 'Property',
    compareDifference: 'Comparison',
    compareSame: 'Match',
    compareDifferent: 'Different',
    compareSelectPlaceholder: 'Filter element by name, symbol, or Z...',
    compareButton: 'Compare',
  },
  ar: {
    appTitle: 'الجدول الدوري للعناصر',
    appSubtitle: 'مرجع علمي تفاعلي ثنائي اللغة · ١١٨ عنصراً',
    searchPlaceholder: 'ابحث بالاسم العربي أو الإنجليزي أو اللاتيني أو الرمز أو العدد الذري...',
    allStates: 'كل الحالات',
    allCategories: 'كل الفئات',
    clearFilters: 'إعادة ضبط الفلاتر',
    showingCount: 'عرض',
    ofElements: 'من ١١٨ عنصراً',
    roomTempNote: 'الحالة عند ٢٥ °م (٢٩٨ كلفن)',
    tableView: 'الجدول الدوري',
    gridView: 'بطاقات الفهرس',
    lanthanidesSeries: 'اللانثانيدات (٥٧–٧١)',
    actinidesSeries: 'الأكتينيدات (٨٩–١٠٣)',
    groupLabel: 'المجموعة',
    periodLabel: 'الدورة',
    noResults: 'لا توجد عناصر مطابقة لمعايير البحث الحالية',
    noResultsHint: 'جرّب مسح نص البحث أو تغيير مرشح الحالة أو الفئة.',
    close: 'إغلاق',
    previousElement: 'السابق',
    nextElement: 'التالي',
    namesSection: 'التسمية وأصل الرمز الكيميائي',
    arabicName: 'بالعربية',
    englishName: 'بالإنجليزية',
    latinName: 'باللاتينية',
    etymologyTitle: 'إبراز حروف الرمز في الاسم',
    symbolOriginPrefix: 'الأحرف المكونة للرمز الكيميائي مبرزة داخل الاسم الأصلي:',
    propertiesTitle: 'الخصائص الذرية والفيزيائية',
    atomicNumber: 'العدد الذري',
    atomicMass: 'الكتلة الذرية',
    electronConfig: 'التوزيع الإلكتروني',
    electronegativity: 'السالبية الكهربائية',
    meltingPoint: 'درجة الانصهار',
    boilingPoint: 'درجة الغليان',
    density: 'الكثافة',
    oxidationStates: 'حالات الأكسدة',
    block: 'الفئة المدارية',
    stateAtRoomTemp: 'الحالة عند ٢٥ °م',
    electronShells: 'مستويات الطاقة',
    compoundsTitle: 'أشهر ١٠ مركبات كيميائية للعنصر',
    compoundsSubtitle: 'أبرز المركبات الشائعة والمهمة التي يدخل العنصر في تركيبها',
    historyTitle: 'التاريخ والاكتشاف',
    discoveredYear: 'سنة الاكتشاف',
    discoveredBy: 'المكتشف',
    usesTitle: 'أبرز الاستخدامات والتطبيقات',
    lightMode: 'نهاري',
    darkMode: 'ليلي',
    switchLang: 'English',
    stateLegendTitle: 'حالة المادة',
    categoryLegendTitle: 'تصنيفات العناصر',
    compareView: 'مقارنة',
    compareTitle: 'مقارنة العناصر جنباً إلى جنب',
    compareSubtitle: 'اختر أي عنصرين لمقارنة الكتلة الذرية والسالبية الكهربائية والحالة والخصائص البنيوية',
    compareElementA: 'العنصر الأول',
    compareElementB: 'العنصر الثاني',
    compareSwap: 'تبديل العنصرين',
    comparePresets: 'مقارنات سريعة',
    compareProperty: 'الخاصية',
    compareDifference: 'المقارنة',
    compareSame: 'متطابق',
    compareDifferent: 'مختلف',
    compareSelectPlaceholder: 'ابحث بالاسم أو الرمز أو العدد الذري...',
    compareButton: 'مقارنة',
  },
};
