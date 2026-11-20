import { NonCoreLanguage } from '../../types/element';

const EXACT_DISCOVERERS: Record<string, Partial<Record<NonCoreLanguage, string>>> = {
  'Known since antiquity': {
    ja: '古代から知られる',
    zh: '自古已知',
    fr: "Connu depuis l'Antiquité",
    es: 'Conocido desde la Antigüedad',
    de: 'Seit der Antike bekannt',
    ru: 'Известен с древности',
    pt: 'Conhecido desde a Antiguidade',
    ko: '고대부터 알려짐',
    it: "Noto fin dall'antichità",
    hi: 'प्राचीन काल से ज्ञात',
  },
  'Known since antiquity; recognized as an element by Antoine Lavoisier (1789)': {
    ja: '古代から知られる（1789年、アントワーヌ・ラボアジエが元素と認定）',
    zh: '自古已知；1789年由安托万·拉瓦锡确认为元素',
    fr: "Connu depuis l'Antiquité ; reconnu comme élément par Antoine Lavoisier (1789)",
    es: 'Conocido desde la Antigüedad; reconocido como elemento por Antoine Lavoisier (1789)',
    de: 'Seit der Antike bekannt; 1789 von Antoine Lavoisier als Element erkannt',
    ru: 'Известен с древности; признан элементом Антуаном Лавуазье (1789)',
    pt: 'Conhecido desde a Antiguidade; reconhecido como elemento por Antoine Lavoisier (1789)',
    ko: '고대부터 알려짐; 1789년 앙투안 라부아지에가 원소로 인정',
    it: "Noto fin dall'antichità; riconosciuto come elemento da Antoine Lavoisier (1789)",
    hi: 'प्राचीन काल से ज्ञात; 1789 में एंटोनी लावोज़ियर द्वारा तत्व के रूप में मान्यता प्राप्त',
  },
  'Known since antiquity; proved an element by Antoine Lavoisier (1777)': {
    ja: '古代から知られる（1777年、アントワーヌ・ラボアジエが元素と証明）',
    zh: '自古已知；1777年由安托万·拉瓦锡证明为元素',
    fr: "Connu depuis l'Antiquité ; démontré comme élément par Antoine Lavoisier (1777)",
    es: 'Conocido desde la Antigüedad; demostrado como elemento por Antoine Lavoisier (1777)',
    de: 'Seit der Antike bekannt; 1777 von Antoine Lavoisier als Element bewiesen',
    ru: 'Известен с древности; доказан как элемент Антуаном Лавуазье (1777)',
    pt: 'Conhecido desde a Antiguidade; provado como elemento por Antoine Lavoisier (1777)',
    ko: '고대부터 알려짐; 1777년 앙투안 라부아지에가 원소로 증명',
    it: "Noto fin dall'antichità; dimostrato elemento da Antoine Lavoisier (1777)",
    hi: 'प्राचीन काल से ज्ञात; 1777 में एंटोनी लावोज़ियर द्वारा तत्व सिद्ध',
  },
  'Known since antiquity (meteoric iron; Iron Age smelting ~1200 BCE)': {
    ja: '古代から知られる（隕鉄；紀元前1200年頃の鉄器時代製錬）',
    zh: '自古已知（陨铁；约公元前1200年铁器时代冶炼）',
    fr: "Connu depuis l'Antiquité (fer météoritique ; métallurgie de l'âge du fer ~1200 av. J.-C.)",
    es: 'Conocido desde la Antigüedad (hierro meteórico; fundición en la Edad del Hierro ~1200 a. C.)',
    de: 'Seit der Antike bekannt (Meteoreisen; Eisenzeit-Verhüttung ca. 1200 v. Chr.)',
    ru: 'Известен с древности (метеоритное железо; выплавка в железном веке ~1200 до н.э.)',
    pt: 'Conhecido desde a Antiguidade (ferro meteórico; fundição na Idade do Ferro ~1200 a.C.)',
    ko: '고대부터 알려짐(운철; 기원전 1200년경 철기 시대 제련)',
    it: "Noto fin dall'antichità (ferro meteorico; fusione nell'età del ferro ~1200 a.C.)",
    hi: 'प्राचीन काल से ज्ञात (उल्कापिंडीय लोहा; लौह युग में प्रगलन ~1200 ई.पू.)',
  },
  'Known since antiquity (Chalcolithic / Copper Age)': {
    ja: '古代から知られる（金石併用時代・銅器時代）',
    zh: '自古已知（铜石并用时代 / 铜器时代）',
    fr: "Connu depuis l'Antiquité (Chalcolithique / âge du cuivre)",
    es: 'Conocido desde la Antigüedad (Calcolítico / Edad del Cobre)',
    de: 'Seit der Antike bekannt (Kupfersteinzeit / Kupferzeit)',
    ru: 'Известен с древности (энеолит / медный век)',
    pt: 'Conhecido desde a Antiguidade (Calcolítico / Idade do Cobre)',
    ko: '고대부터 알려짐(동기 시대)',
    it: "Noto fin dall'antichità (Calcolitico / età del rame)",
    hi: 'प्राचीन काल से ज्ञात (ताम्रपाषाण / ताम्र युग)',
  },
  'Known since antiquity (Bronze Age)': {
    ja: '古代から知られる（青銅器時代）',
    zh: '自古已知（青铜时代）',
    fr: "Connu depuis l'Antiquité (âge du bronze)",
    es: 'Conocido desde la Antigüedad (Edad del Bronce)',
    de: 'Seit der Antike bekannt (Bronzezeit)',
    ru: 'Известен с древности (бронзовый век)',
    pt: 'Conhecido desde a Antiguidade (Idade do Bronze)',
    ko: '고대부터 알려짐(청동기 시대)',
    it: "Noto fin dall'antichità (età del bronzo)",
    hi: 'प्राचीन काल से ज्ञात (कांस्य युग)',
  },
  'Known since antiquity (described by Vannoccio Biringuccio, 1540)': {
    ja: '古代から知られる（1540年にヴァンノッチョ・ビリングッチョが記述）',
    zh: '自古已知（1540年由万诺乔·比林古乔记述）',
    fr: "Connu depuis l'Antiquité (décrit par Vannoccio Biringuccio, 1540)",
    es: 'Conocido desde la Antigüedad (descrito por Vannoccio Biringuccio, 1540)',
    de: 'Seit der Antike bekannt (1540 von Vannoccio Biringuccio beschrieben)',
    ru: 'Известен с древности (описан Ванноччо Бирингуччо в 1540 году)',
    pt: 'Conhecido desde a Antiguidade (descrito por Vannoccio Biringuccio, 1540)',
    ko: '고대부터 알려짐(1540년 반노초 비링구초가 기술)',
    it: "Noto fin dall'antichità (descritto da Vannoccio Biringuccio, 1540)",
    hi: 'प्राचीन काल से ज्ञात (1540 में वनोच्चियो बिरिंगुच्चियो द्वारा वर्णित)',
  },
  'Carl Wilhelm Scheele (confirmed elemental by Humphry Davy, 1810)': {
    ja: 'カール・ヴィルヘルム・シェーレ（1810年にハンフリー・デービーが元素と確認）',
    zh: '卡尔·威廉·舍勒（1810年汉弗里·戴维确认为元素）',
    fr: 'Carl Wilhelm Scheele (confirmé comme élément par Humphry Davy, 1810)',
    es: 'Carl Wilhelm Scheele (confirmado como elemento por Humphry Davy, 1810)',
    de: 'Carl Wilhelm Scheele (1810 von Humphry Davy als Element bestätigt)',
    ru: 'Карл Вильгельм Шееле (подтверждён как элемент Гемфри Дэви, 1810)',
    pt: 'Carl Wilhelm Scheele (confirmado como elemento por Humphry Davy, 1810)',
    ko: '카를 빌헬름 셸레(1810년 험프리 데이비가 원소로 확인)',
    it: 'Carl Wilhelm Scheele (confermato elemento da Humphry Davy, 1810)',
    hi: 'कार्ल विल्हेल्म शीले (1810 में हम्फ्री डेवी द्वारा तत्व के रूप में पुष्टि)',
  },
  'William Gregor (named by M. H. Klaproth, 1795)': {
    ja: 'ウィリアム・グレゴール（1795年にM. H. クラプロートが命名）',
    zh: '威廉·格雷戈尔（1795年由M. H. 克拉普罗特命名）',
    fr: 'William Gregor (nommé par M. H. Klaproth, 1795)',
    es: 'William Gregor (nombrado por M. H. Klaproth, 1795)',
    de: 'William Gregor (1795 von M. H. Klaproth benannt)',
    ru: 'Уильям Грегор (назван М. Г. Клапротом, 1795)',
    pt: 'William Gregor (nomeado por M. H. Klaproth, 1795)',
    ko: '윌리엄 그레고르(1795년 M. H. 클라프로트가 명명)',
    it: 'William Gregor (nominato da M. H. Klaproth, 1795)',
    hi: 'विलियम ग्रेगर (1795 में एम. एच. क्लैप्रोथ द्वारा नामित)',
  },
  'Albertus Magnus (credited with first isolation)': {
    ja: 'アルベルトゥス・マグヌス（最初の単離者とされる）',
    zh: '阿尔伯图斯·马格努斯（被认为首次分离）',
    fr: 'Albert le Grand (crédité de la première isolation)',
    es: 'Alberto Magno (atribuido el primer aislamiento)',
    de: 'Albertus Magnus (erste Isolierung zugeschrieben)',
    ru: 'Альберт Великий (приписывается первое выделение)',
    pt: 'Alberto Magno (creditado pelo primeiro isolamento)',
    ko: '알베르투스 마그누스(최초 분리로 인정)',
    it: 'Alberto Magno (accreditato per il primo isolamento)',
    hi: 'अल्बर्टस मैग्नस (प्रथम पृथक्करण का श्रेय)',
  },
  'Antonio de Ulloa (scientific report, 1748)': {
    ja: 'アントニオ・デ・ウリョア（1748年に科学報告）',
    zh: '安东尼奥·德·乌略亚（1748年科学报告）',
    fr: 'Antonio de Ulloa (rapport scientifique, 1748)',
    es: 'Antonio de Ulloa (informe científico, 1748)',
    de: 'Antonio de Ulloa (wissenschaftlicher Bericht, 1748)',
    ru: 'Антонио де Ульоа (научный отчёт, 1748)',
    pt: 'Antonio de Ulloa (relatório científico, 1748)',
    ko: '안토니오 데 우요아(1748년 과학 보고)',
    it: 'Antonio de Ulloa (rapporto scientifico, 1748)',
    hi: 'एंटोनियो डी उल्लोआ (वैज्ञानिक रिपोर्ट, 1748)',
  },
  'Marie Curie & Pierre Curie (isolated 1910 with André-Louis Debierne)': {
    ja: 'マリ・キュリー＆ピエール・キュリー（1910年にアンドレ＝ルイ・ドビエルヌと単離）',
    zh: '玛丽·居里与皮埃尔·居里（1910年与安德烈-路易·德比埃尔纳共同分离）',
    fr: 'Marie Curie & Pierre Curie (isolé en 1910 avec André-Louis Debierne)',
    es: 'Marie Curie y Pierre Curie (aislado en 1910 con André-Louis Debierne)',
    de: 'Marie Curie & Pierre Curie (1910 mit André-Louis Debierne isoliert)',
    ru: 'Мария Кюри и Пьер Кюри (выделен в 1910 с Андре-Луи Дебьерном)',
    pt: 'Marie Curie e Pierre Curie (isolado em 1910 com André-Louis Debierne)',
    ko: '마리 퀴리 & 피에르 퀴리(1910년 앙드레-루이 드비에른과 함께 분리)',
    it: 'Marie Curie e Pierre Curie (isolato nel 1910 con André-Louis Debierne)',
    hi: 'मैरी क्यूरी और पियरे क्यूरी (1910 में आंद्रे-लुई डेबिर्न के साथ पृथक)',
  },
  'Martin Heinrich Klaproth (metal isolated 1841 by Eugène-Melchior Péligot)': {
    ja: 'マルティン・ハインリヒ・クラプロート（1841年にウジェーヌ＝メルキオール・ペリゴが金属単離）',
    zh: '马丁·海因里希·克拉普罗特（1841年由欧仁-梅尔基奥尔·佩利戈分离出金属）',
    fr: 'Martin Heinrich Klaproth (métal isolé en 1841 par Eugène-Melchior Péligot)',
    es: 'Martin Heinrich Klaproth (metal aislado en 1841 por Eugène-Melchior Péligot)',
    de: 'Martin Heinrich Klaproth (Metall 1841 von Eugène-Melchior Péligot isoliert)',
    ru: 'Мартин Генрих Клапрот (металл выделен в 1841 году Эженом-Мельхиором Пелиго)',
    pt: 'Martin Heinrich Klaproth (metal isolado em 1841 por Eugène-Melchior Péligot)',
    ko: '마르틴 하인리히 클라프로트(1841년 외젠-멜키오르 펠리고가 금속 분리)',
    it: 'Martin Heinrich Klaproth (metallo isolato nel 1841 da Eugène-Melchior Péligot)',
    hi: 'मार्टिन हेनरिक क्लैप्रोथ (1841 में यूजीन-मेल्चियोर पेलिगोट द्वारा धातु पृथक)',
  },
};

const CONJUNCTION: Record<NonCoreLanguage, string> = {
  ja: '・',
  zh: '与',
  fr: 'et',
  es: 'y',
  de: 'und',
  ru: 'и',
  pt: 'e',
  ko: ' 및 ',
  it: 'e',
  hi: 'और',
};

const TEAMS_WORD: Record<NonCoreLanguage, string> = {
  ja: '研究チーム',
  zh: '研究团队',
  fr: 'équipes de',
  es: 'equipos de',
  de: 'Teams aus',
  ru: 'команды',
  pt: 'equipes de',
  ko: '연구팀',
  it: 'team di',
  hi: 'टीम',
};

const TEAM_WORD: Record<NonCoreLanguage, string> = {
  ja: '研究チーム',
  zh: '团队',
  fr: 'équipe',
  es: 'equipo',
  de: 'Team',
  ru: 'команда',
  pt: 'equipe',
  ko: '팀',
  it: 'team',
  hi: 'टीम',
};

export function translateDiscoverer(discoveredByEn: string, lang: NonCoreLanguage): string {
  const exact = EXACT_DISCOVERERS[discoveredByEn]?.[lang];
  if (exact) return exact;

  let out = discoveredByEn;
  if (out.includes('Berkeley/Argonne/Los Alamos teams')) {
    out = out.replace(
      'Berkeley/Argonne/Los Alamos teams',
      lang === 'ja' || lang === 'zh' || lang === 'ko' || lang === 'hi'
        ? `Berkeley / Argonne / Los Alamos ${TEAMS_WORD[lang]}`
        : `${TEAMS_WORD[lang]} Berkeley / Argonne / Los Alamos`
    );
  }
  if (out.includes('& team')) {
    out = out.replace('& team', `${CONJUNCTION[lang]} ${TEAM_WORD[lang]}`);
  }
  if (lang !== 'ja' && lang !== 'zh') {
    out = out.replace(/ & /g, ` ${CONJUNCTION[lang]} `);
  } else {
    out = out.replace(/ & /g, CONJUNCTION[lang]);
  }
  return out;
}
