import { NonCoreLanguage } from '../../types/element';

type L10 = Record<NonCoreLanguage, string>;

function l10(
  ja: string,
  zh: string,
  fr: string,
  es: string,
  de: string,
  ru: string,
  pt: string,
  ko: string,
  it: string,
  hi: string
): L10 {
  return { ja, zh, fr, es, de, ru, pt, ko, it, hi };
}

// Parenthetical qualifiers (all exact suffixes in the 118-element dataset)
const PARENS_MAP: Record<string, L10> = {
  '(predicted)': l10('（予測）', '（预测）', '(prédit)', '(predicho)', '(vorhergesagt)', '(предсказано)', '(previsto)', '(예측)', '(previsto)', '(अनुमानित)'),
  '(theoretical)': l10('（理論）', '（理论）', '(théorique)', '(teórico)', '(theoretisch)', '(теоретическое)', '(teórico)', '(이론)', '(teorico)', '(सैद्धांतिक)'),
  '(studied)': l10('（研究済）', '（已研究）', '(étudié)', '(estudiado)', '(untersucht)', '(изучено)', '(estudado)', '(연구됨)', '(studiato)', '(अध्ययनित)'),
  '(studied/predicted)': l10('（研究・予測）', '（研究/预测）', '(étudié/prédit)', '(estudiado/predicho)', '(untersucht/vorhergesagt)', '(изучено/предсказано)', '(estudado/previsto)', '(연구/예측)', '(studiato/previsto)', '(अध्ययनित/अनुमानित)'),
  '(synthesized)': l10('（合成済）', '（已合成）', '(synthétisé)', '(sintetizado)', '(synthetisiert)', '(синтезировано)', '(sintetizado)', '(합성됨)', '(sintetizzato)', '(संश्लेषित)'),
  '(tracer)': l10('（トレーサー）', '（示踪剂）', '(traceur)', '(trazador)', '(Tracer)', '(трассер)', '(traçador)', '(추적자)', '(tracciante)', '(अनुरेखक)'),
  '(tracer/predicted)': l10('（トレーサー・予測）', '（示踪/预测）', '(traceur/prédit)', '(trazador/predicho)', '(Tracer/vorhergesagt)', '(трассер/предск.)', '(traçador/previsto)', '(추적자/예측)', '(tracciante/previsto)', '(अनुरेखक/अनुमानित)'),
  '(radiotracer)': l10('（放射性トレーサー）', '（放射性示踪剂）', '(radiotraceur)', '(radiotrazador)', '(Radiotracer)', '(радиоиндикатор)', '(radiotraçador)', '(방사성 추적자)', '(radiotracciante)', '(रेडियो-अनुरेखक)'),
  '(radiotherapy)': l10('（放射線治療）', '（放射治疗）', '(radiothérapie)', '(radioterapia)', '(Strahlentherapie)', '(радиотерапия)', '(radioterapia)', '(방사선 치료)', '(radioterapia)', '(विकिरण चिकित्सा)'),
  '(medical)': l10('（医療用）', '（医用）', '(médical)', '(médico)', '(medizinisch)', '(медицинское)', '(médico)', '(의료용)', '(medico)', '(चिकित्सा)'),
  '(Chemotherapy)': l10('（抗がん剤）', '（化疗药）', '(chimiothérapie)', '(quimioterapia)', '(Chemotherapie)', '(химиотерапия)', '(quimioterapia)', '(화학요법)', '(chemioterapia)', '(कीमोथेरेपी)'),
  '(MRI contrast agent)': l10('（MRI造影剤）', '（MRI造影剂）', '(agent de contraste IRM)', '(agente de contraste RM)', '(MRT-Kontrastmittel)', '(МРТ-контраст)', '(contraste de RM)', '(MRI 조영제)', '(mezzo di contrasto RM)', '(MRI कंट्रास्ट एजेंट)'),
  '(bone scan agent)': l10('（骨シンチ剤）', '（骨扫描剂）', '(agent de scintigraphie osseuse)', '(agente óseo)', '(Knochenszintigrafie)', '(для сцинтиграфии костей)', '(agente ósseo)', '(골 스캔 제제)', '(agente scintigrafico osseo)', '(अस्थि स्कैन एजेंट)'),
  '(catalyst)': l10('（触媒）', '（催化剂）', '(catalyseur)', '(catalizador)', '(Katalysator)', '(катализатор)', '(catalisador)', '(촉매)', '(catalizzatore)', '(उत्प्रेरक)'),
  '(scintillator)': l10('（シンチレーター）', '（闪烁体）', '(scintillateur)', '(centelleador)', '(Szintillator)', '(сцинтиллятор)', '(cintilador)', '(섬광체)', '(scintillatore)', '(सिंटिलेटर)'),
  '(BGO Scintillator)': l10('（BGOシンチレーター）', '（BGO闪烁体）', '(scintillateur BGO)', '(centelleador BGO)', '(BGO-Szintillator)', '(сцинтиллятор BGO)', '(cintilador BGO)', '(BGO 섬광체)', '(scintillatore BGO)', '(BGO सिंटिलेटर)'),
  '(solid electrolyte)': l10('（固体電解質）', '（固体电解质）', '(électrolyte solide)', '(electrolito sólido)', '(Festelektrolyt)', '(твёрдый электролит)', '(eletrólito sólido)', '(고체 전해질)', '(elettrolita solido)', '(ठोस विद्युत-अपघट्य)'),
  '(superacid)': l10('（超強酸）', '（超强酸）', '(superacide)', '(superácido)', '(Supersäure)', '(суперкислота)', '(superácido)', '(초강산)', '(superacido)', '(महा-अम्ल)'),
  '(superhard)': l10('（超硬質）', '（超硬）', '(superdur)', '(superduro)', '(superhart)', '(сверхтвёрдый)', '(superduro)', '(초경질)', '(superduro)', '(अति-कठोर)'),
  '(ultra-refractory)': l10('（超耐火性）', '（超耐火）', '(ultra-réfractaire)', '(ultrarrefractario)', '(ultrafeuerfest)', '(сверхтугоплавкий)', '(ultrarrefratário)', '(초내화성)', '(ultrarefrattario)', '(अति-अग्निसह)'),
  '(high-pressure)': l10('（高圧合成）', '（高压）', '(haute pression)', '(alta presión)', '(Hochdruck)', '(высокого давления)', '(alta pressão)', '(고압)', '(alta pressione)', '(उच्च दाब)'),
  '(interstellar)': l10('（星間分子）', '（星际）', '(interstellaire)', '(interestelar)', '(interstellar)', '(межзвёздный)', '(interestelar)', '(성간)', '(interstellare)', '(अंतरतारकीय)'),
  '(gas-phase)': l10('（気相）', '（气相）', '(phase gazeuse)', '(fase gaseosa)', '(Gasphase)', '(газовая фаза)', '(fase gasosa)', '(기상)', '(fase gassosa)', '(गैस चरण)'),
  '(gas-phase study)': l10('（気相研究）', '（气相研究）', '(étude en phase gazeuse)', '(estudio en fase gaseosa)', '(Gasphasenstudie)', '(газофазное иссл.)', '(estudo em fase gasosa)', '(기상 연구)', '(studio in fase gassosa)', '(गैस चरण अध्ययन)'),
  '(gas-phase tracer)': l10('（気相トレーサー）', '（气相示踪）', '(traceur en phase gazeuse)', '(trazador en fase gaseosa)', '(Gasphasen-Tracer)', '(газофазный трассер)', '(traçador gasoso)', '(기상 추적자)', '(tracciante in fase gassosa)', '(गैस चरण अनुरेखक)'),
  '(solution)': l10('（溶液中）', '（溶液）', '(en solution)', '(en disolución)', '(in Lösung)', '(в растворе)', '(em solução)', '(용액)', '(in soluzione)', '(विलयन में)'),
  '(solution study)': l10('（溶液研究）', '（溶液研究）', '(étude en solution)', '(estudio en disolución)', '(Lösungsstudie)', '(изучение в растворе)', '(estudo em solução)', '(용액 연구)', '(studio in soluzione)', '(विलयन अध्ययन)'),
  '(solution/tracer)': l10('（溶液・トレーサー）', '（溶液/示踪）', '(solution/traceur)', '(disolución/trazador)', '(Lösung/Tracer)', '(раствор/трассер)', '(solução/traçador)', '(용액/추적자)', '(soluzione/tracciante)', '(विलयन/अनुरेखक)'),
  '(coprecipitated)': l10('（共沈）', '（共沉淀）', '(coprécipité)', '(coprecipitado)', '(kopräzipitiert)', '(соосаждён)', '(coprecipitado)', '(공침)', '(coprecipitato)', '(सह-अवक्षेपित)'),
  '(matrix-isolated)': l10('（マトリックス単離）', '（基质隔离）', '(isolé en matrice)', '(aislado en matriz)', '(matrixisoliert)', '(матричная изоляция)', '(isolado em matriz)', '(매트릭스 격리)', '(isolato in matrice)', '(मैट्रिक्स-पृथकित)'),
  '(cryogenic)': l10('（極低温）', '（低温）', '(cryogénique)', '(criogénico)', '(kryogen)', '(криогенный)', '(criogênico)', '(극저온)', '(criogenico)', '(क्रायोजेनिक)'),
  '(cryogenic cooler)': l10('（極低温冷却材）', '（低温制冷剂）', '(refroidisseur cryogénique)', '(refrigerante criogénico)', '(Kryokühler)', '(криоохладитель)', '(resfriador criogênico)', '(극저온 냉각재)', '(refrigeratore criogenico)', '(क्रायोजेनिक शीतलक)'),
  '(laser medium)': l10('（レーザー媒質）', '（激光介质）', '(milieu laser)', '(medio láser)', '(Lasermedium)', '(лазерная среда)', '(meio laser)', '(레이저 매질)', '(mezzo laser)', '(लेज़र माध्यम)'),
  '(UV laser)': l10('（紫外レーザー）', '（紫外激光）', '(laser UV)', '(láser UV)', '(UV-Laser)', '(УФ-лазер)', '(laser UV)', '(자외선 레이저)', '(laser UV)', '(पराबैंगनी लेज़र)'),
  '(IR detector)': l10('（赤外線検出器）', '（红外探测器）', '(détecteur IR)', '(detector IR)', '(IR-Detektor)', '(ИК-детектор)', '(detector IV)', '(적외선 검출기)', '(rivelatore IR)', '(इन्फ्रारेड संसूचक)'),
  '(multiferroic)': l10('（マルチフェロイック）', '（多铁性材料）', '(multiferroïque)', '(multiferroico)', '(multiferroisch)', '(мультиферроик)', '(multiferroico)', '(다강체)', '(multiferroico)', '(मल्टीफेरोइक)'),
  '(ionic gold salt)': l10('（イオン性金塩）', '（离子型金盐）', '(sel d’or ionique)', '(sal iónica de oro)', '(ionisches Goldsalz)', '(ионная соль золота)', '(sal iônico de ouro)', '(이온성 금 염)', '(sale ionico d’oro)', '(आयनिक स्वर्ण लवण)'),
  '(densest white phosphor)': l10('（最高密度白色蛍光体）', '（最高密度白光荧光粉）', '(luminophore blanc dense)', '(fósforo blanco denso)', '(dichtester Weißleuchtstoff)', '(сверхплотный люминофор)', '(fósforo branco denso)', '(고밀도 백색 형광체)', '(fosforo bianco denso)', '(सघनतम श्वेत फॉस्फोर)'),
  '(bright yellow pigment)': l10('（鮮黄色顔料）', '（亮黄色颜料）', '(pigment jaune vif)', '(pigmento amarillo vivo)', '(leuchtendes Gelbpigment)', '(ярко-жёлтый пигмент)', '(pigmento amarelo vivo)', '(선명한 황색 안료)', '(pigmento giallo vivo)', '(चमकीला पीला वर्णक)'),
  '(Table Salt)': l10('（食塩）', '（食盐）', '(sel de table)', '(sal de mesa)', '(Speisesalz)', '(поваренная соль)', '(sal de cozinha)', '(소금)', '(sale da cucina)', '(खाने का नमक)'),
  '(Baking Soda)': l10('（重曹）', '（小苏打）', '(bicarbonate de soude)', '(bicarbonato de sodio)', '(Natron)', '(пищевая сода)', '(bicarbonato)', '(베이킹 소다)', '(bicarbonato)', '(बेकिंग सोडा)'),
  '(Bleach)': l10('（漂白剤）', '（漂白剂）', '(eau de Javel)', '(lejía)', '(Bleichmittel)', '(отбеливатель)', '(água sanitária)', '(표백제)', '(candeggina)', '(ब्लीच)'),
  '(Caustic Soda)': l10('（苛性ソーダ）', '（烧碱）', '(soude caustique)', '(sosa cáustica)', '(Ätznatron)', '(едкий натр)', '(soda cáustica)', '(가성소다)', '(soda caustica)', '(कास्टिक सोडा)'),
  '(Soda Ash)': l10('（ソーダ灰）', '（纯碱）', '(soude)', '(sosa)', '(Soda)', '(кальцинированная сода)', '(barrilha)', '(소다회)', '(soda)', '(सोडा ऐश)'),
  '(Quicklime)': l10('（生石灰）', '（生石灰）', '(chaux vive)', '(cal viva)', '(Branntkalk)', '(негашёная известь)', '(cal viva)', '(생석회)', '(calce viva)', '(बिना बुझा चूना)'),
  '(Slaked Lime)': l10('（消石灰）', '（熟石灰）', '(chaux éteinte)', '(cal apagada)', '(Löschkalk)', '(гашёная известь)', '(cal hidratada)', '(소석회)', '(calce spenta)', '(बुझा चूना)'),
  '(Limestone)': l10('（石灰石）', '（石灰石）', '(calcaire)', '(piedra caliza)', '(Kalkstein)', '(известняк)', '(calcário)', '(석회석)', '(calcare)', '(चूना पत्थर)'),
  '(Gypsum)': l10('（石膏）', '（石膏）', '(gypse)', '(yeso)', '(Gips)', '(гипс)', '(gesso)', '(석고)', '(gesso)', '(जिप्सम)'),
  '(Quartz)': l10('（石英）', '（石英）', '(quartz)', '(cuarzo)', '(Quarz)', '(кварц)', '(quartzo)', '(석영)', '(quarzo)', '(क्वार्ट्ज़)'),
  '(Silica/Quartz)': l10('（シリカ・石英）', '（二氧化硅/石英）', '(silice/quartz)', '(sílice/cuarzo)', '(Kieselsäure/Quarz)', '(кремнезём/кварц)', '(sílica/quartzo)', '(실리카/석영)', '(silice/quarzo)', '(सिलिका/क्वार्ट्ज़)'),
  '(Water Glass)': l10('（水ガラス）', '（水玻璃）', '(verre soluble)', '(vidrio soluble)', '(Wasserglas)', '(жидкое стекло)', '(vidro líquido)', '(물유리)', '(vetro solubile)', '(वाटर ग्लास)'),
  '(Carborundum)': l10('（カーボランダム）', '（金刚砂）', '(carborundum)', '(carborundo)', '(Karborund)', '(карборунд)', '(carborundo)', '(카보런덤)', '(carborundo)', '(कार्बोरंडम)'),
  '(Alumina)': l10('（アルミナ）', '（氧化铝）', '(alumine)', '(alúmina)', '(Tonerde)', '(глинозём)', '(alumina)', '(알루미나)', '(allumina)', '(एल्युमिना)'),
  '(Hematite/Rust)': l10('（赤鉄鉱・錆）', '（赤铁矿/铁锈）', '(hématite/rouille)', '(hematita/óxido)', '(Hämatit/Rost)', '(гематит/ржавчина)', '(hematita/ferrugem)', '(적철광/녹)', '(ematite/ruggine)', '(हेमेटाइट/जंग)'),
  '(Magnetite)': l10('（磁鉄鉱）', '（磁铁矿）', '(magnétite)', '(magnetita)', '(Magnetit)', '(магнетит)', '(magnetita)', '(자철광)', '(magnetite)', '(मैग्नेटाइट)'),
  '(Pyrite)': l10('（黄鉄鉱）', '（黄铁矿）', '(pyrite)', '(pirita)', '(Pyrit)', '(пирит)', '(pirita)', '(황철광)', '(pirite)', '(पायराइट)'),
  '(Siderite)': l10('（菱鉄鉱）', '（菱铁矿）', '(sidérite)', '(siderita)', '(Siderit)', '(сидерит)', '(siderita)', '(능철광)', '(siderite)', '(सिडेराइट)'),
  '(Potash)': l10('（カリウム灰）', '（苛性钾）', '(potasse)', '(potasa)', '(Pottasche)', '(поташ)', '(potassa)', '(가성칼리)', '(potassa)', '(पोटाश)'),
  '(Saltpeter)': l10('（硝石）', '（硝石）', '(salpêtre)', '(salitre)', '(Salpeter)', '(селитра)', '(salitre)', '(초석)', '(salnitro)', '(शोरा)'),
  '(Fluorite)': l10('（蛍石）', '（萤石）', '(fluorine)', '(fluorita)', '(Fluorit)', '(флюорит)', '(fluorita)', '(형석)', '(fluorite)', '(फ्लोराइट)'),
  '(Barite)': l10('（重晶石）', '（重晶石）', '(barytine)', '(barita)', '(Baryt)', '(барит)', '(barita)', '(중정석)', '(barite)', '(बेराइट)'),
  '(Celestine)': l10('（天青石）', '（天青石）', '(célestine)', '(celestina)', '(Coelestin)', '(целестин)', '(celestina)', '(천청석)', '(celestina)', '(सेलेस्टाइन)'),
  '(Epsom Salt)': l10('（エプソム塩）', '（泻盐）', '(sel d’Epsom)', '(sal de Epsom)', '(Bittersalz)', '(английская соль)', '(sal de Epsom)', '(엡솜염)', '(sale di Epsom)', '(एप्सम लवण)'),
  '(Galena)': l10('（方鉛鉱）', '（方铅矿）', '(galène)', '(galena)', '(Bleiglanz)', '(галенит)', '(galena)', '(방연광)', '(galena)', '(गैलेना)'),
  '(Litharge)': l10('（一酸化鉛・密陀僧）', '（密陀僧）', '(litharge)', '(litargirio)', '(Bleiglätte)', '(свинцовый глёт)', '(litargírio)', '(일산화납)', '(litargirio)', '(लिथार्ज)'),
  '(Minium)': l10('（鉛丹）', '（红丹）', '(minium)', '(minio)', '(Mennige)', '(сурик)', '(zarcão)', '(광명단)', '(minio)', '(सिंदूर)'),
  '(Chrome Yellow)': l10('（黄鉛）', '（铬黄）', '(jaune de chrome)', '(amarillo de cromo)', '(Chromgelb)', '(хромовый жёлтый)', '(amarelo cromo)', '(크롬 옐로우)', '(giallo cromo)', '(क्रोम येलो)'),
  '(Cadmium Yellow)': l10('（カドミウムイエロー）', '（镉黄）', '(jaune de cadmium)', '(amarillo de cadmio)', '(Kadmiumgelb)', '(кадмиевый жёлтый)', '(amarelo de cádmio)', '(카드뮴 옐로우)', '(giallo cadmio)', '(कैडमियम येलो)'),
  '(Cinnabar/Vermilion)': l10('（辰砂・朱）', '（朱砂）', '(cinabre/vermillon)', '(cinabrio/bermellón)', '(Zinnober)', '(киноварь)', '(cinábrio/vermelhão)', '(진사/주사)', '(cinabro/vermiglione)', '(हिंगुल/सिंदूर)'),
  '(Calomel)': l10('（甘汞）', '（甘汞）', '(calomel)', '(calomelanos)', '(Kalomel)', '(каломель)', '(calomelano)', '(감홍)', '(calomelano)', '(कैलोमेल)'),
  '(Corrosive Sublimate)': l10('（昇汞）', '（升汞）', '(sublimé corrosif)', '(sublimado corrosivo)', '(Sublimat)', '(сулема)', '(sublimado corrosivo)', '(승홍)', '(sublimato corrosivo)', '(कॉरोसिव सब्लीमेट)'),
  '(Cassiterite)': l10('（錫石）', '（锡石）', '(cassitérite)', '(casiterita)', '(Zinnstein)', '(касситерит)', '(cassiterita)', '(주석석)', '(cassiterite)', '(कैसिटेराइट)'),
  '(Mosaic Gold)': l10('（モザイク金）', '（彩金）', '(or mussif)', '(oro musivo)', '(Musivgold)', '(муссивное золото)', '(ouro musivo)', '(모자이크 골드)', '(oro musivo)', '(मोज़ेक गोल्ड)'),
  '(Stannous Fluoride)': l10('（フッ化第一スズ）', '（氟化亚锡）', '(fluorure stanneux)', '(fluoruro estannoso)', '(Zinn(II)-fluorid)', '(фторид олова(II))', '(fluoreto estanoso)', '(플루오린화 주석)', '(fluoruro stannoso)', '(स्टैनस फ्लोराइड)'),
  '(Stibnite)': l10('（輝安鉱）', '（辉锑矿）', '(stibine)', '(estibina)', '(Antimonit)', '(антимонит)', '(estibina)', '(휘안광)', '(stibnite)', '(स्टिबनाइट)'),
  '(Orpiment)': l10('（雄黄）', '（雌黄）', '(orpiment)', '(oropimente)', '(Auripigment)', '(аурипигмент)', '(ouro-pigmento)', '(웅황)', '(orpimento)', '(हरताल)'),
  '(Bismuthinite)': l10('（輝蒼鉛鉱）', '（辉铋矿）', '(bismuthinite)', '(bismutinita)', '(Bismutinit)', '(висмутин)', '(bismutinita)', '(휘창연광)', '(bismutinite)', '(बिस्मथिनाइट)'),
  '(Zircon)': l10('（ジルコン）', '（锆石）', '(zircon)', '(circón)', '(Zirkon)', '(циркон)', '(zircão)', '(지르콘)', '(zircone)', '(ज़िरकॉन)'),
  '(Zirconia)': l10('（ジルコニア）', '（氧化锆）', '(zircone)', '(circona)', '(Zirkonoxid)', '(диоксид циркония)', '(zircônia)', '(지르코니아)', '(zirconia)', '(ज़िरकोनिया)'),
  '(Hafnia)': l10('（ハフニア）', '（氧化铪）', '(oxyde d’hafnium)', '(hafnia)', '(Hafniumdioxid)', '(диоксид гафния)', '(háfnia)', '(하프니아)', '(afnia)', '(हैफनिया)'),
  '(Hafnon)': l10('（ハフノン）', '（硅酸铪）', '(hafnon)', '(hafnón)', '(Hafnon)', '(гафнон)', '(hafnão)', '(하프논)', '(hafnon)', '(हैफनॉन)'),
  '(Ceria)': l10('（セリア）', '（氧化铈）', '(cérine/oxyde de cérium)', '(ceria)', '(Ceroxid)', '(оксид церия)', '(céria)', '(세리아)', '(ossido di cerio)', '(सीरिया)'),
  '(Yttria)': l10('（イットリア）', '（氧化钇）', '(oxyde d’yttrium)', '(itria)', '(Yttriumoxid)', '(оксид иттрия)', '(ítria)', '(이트리아)', '(ittria)', '(यिट्रिया)'),
  '(Thoria)': l10('（トリア）', '（氧化钍）', '(thorine)', '(toria)', '(Thoriumdioxid)', '(оксид тория)', '(tória)', '(토리아)', '(ossido di torio)', '(थोरिया)'),
  '(Thorite)': l10('（トール石）', '（钍石）', '(thorite)', '(torita)', '(Thorit)', '(торит)', '(torita)', '(토라이트)', '(torite)', '(थोराइट)'),
  '(Monazite)': l10('（モナズ石）', '（独居石）', '(monazite)', '(monacita)', '(Monazit)', '(монацит)', '(monazita)', '(모나자이트)', '(monazite)', '(मोनाज़ाइट)'),
  '(Scheelite)': l10('（灰重石）', '（白钨矿）', '(scheelite)', '(scheelita)', '(Scheelit)', '(шеелит)', '(scheelita)', '(회중석)', '(scheelite)', '(शीलाइट)'),
  '(Wulfenite)': l10('（モリブデン鉛鉱）', '（钼铅矿）', '(wulfénite)', '(wulfenita)', '(Wulfenit)', '(вульфенит)', '(wulfenita)', '(울페나이트)', '(wulfenite)', '(वुल्फेनाइट)'),
  '(Calaverite)': l10('（カラベラス鉱）', '（碲金矿）', '(calavérite)', '(calaverita)', '(Calaverit)', '(калаверит)', '(calaverita)', '(칼라베라이트)', '(calaverite)', '(कैलवेराइट)'),
  '(Tarnish)': l10('（硫化変色被膜）', '（银锈）', '(ternissure)', '(deslustre)', '(Anlaufen)', '(потемнение)', '(escurecimento)', '(변색 피막)', '(ossidazione)', '(काला पड़ना)'),
  '(Yellowcake)': l10('（イエローケーキ）', '（黄饼）', '(yellowcake)', '(torta amarilla)', '(Yellowcake)', '(жёлтый кек)', '(yellowcake)', '(옐로케이크)', '(yellowcake)', '(येलोकेक)'),
  '(Nuclear Fuel)': l10('（核燃料）', '（核燃料）', '(combustible nucléaire)', '(combustible nuclear)', '(Kernbrennstoff)', '(ядерное топливо)', '(combustível nuclear)', '(핵연료)', '(combustibile nucleare)', '(परमाणु ईंधन)'),
  '(Spin Ice)': l10('（スピンアイス）', '（自旋冰）', '(glace de spin)', '(hielo de espín)', '(Spin-Eis)', '(спиновый лёд)', '(gelo de spin)', '(스핀 아이스)', '(ghiaccio di spin)', '(स्पिन आइस)'),
  '(Iodomethane)': l10('（ヨードメタン）', '（碘甲烷）', '(iodométhane)', '(yodometano)', '(Iodmethan)', '(иодметан)', '(iodometano)', '(아이오도메탄)', '(iodometano)', '(आयोडोमीथेन)'),
  '(Sodium Borate)': l10('（ホウ酸ナトリウム）', '（硼酸钠）', '(borate de sodium)', '(borato de sodio)', '(Natriumborat)', '(борат натрия)', '(borato de sódio)', '(붕산나트륨)', '(borato di sodio)', '(सोडियम बोरेट)'),
  '(Beryllium Aluminium Silicate)': l10('（ケイ酸ベリリウムアルミニウム）', '（硅酸铍铝）', '(silicate de béryllium et d’aluminium)', '(silicato de berilio y aluminio)', '(Beryllium-Aluminium-Silikat)', '(силикат бериллия-алюминия)', '(silicato de berílio e alumínio)', '(베릴륨 알루미늄 규산염)', '(silicato di berillio e alluminio)', '(बेरिलियम एल्युमिनियम सिलिकेट)'),
  '(Iron Titanium Oxide)': l10('（チタン鉄酸化物）', '（钛铁氧化物）', '(oxyde de fer et de titane)', '(óxido de hierro y titanio)', '(Eisen-Titan-Oxid)', '(оксид железа-титана)', '(óxido de ferro e titânio)', '(철 티타늄 산화물)', '(ossido di ferro e titanio)', '(आयरन टाइटेनियम ऑक्साइड)'),
  '(Iron Tungstate)': l10('（タングステン酸鉄）', '（钨酸铁）', '(tungstate de fer)', '(wolframato de hierro)', '(Eisenwolframat)', '(вольфрамат железа)', '(tungstato de ferro)', '(텅스텐산철)', '(tungstato di ferro)', '(आयरन टंगस्टेट)'),
  '(Basic Copper Carbonate)': l10('（塩基性炭酸銅）', '（碱式碳酸铜）', '(carbonate basique de cuivre)', '(carbonato básico de cobre)', '(basisches Kupfercarbonat)', '(основный карбонат меди)', '(carbonato básico de cobre)', '(염기성 탄산구리)', '(carbonato basico di rame)', '(बेसिक कॉपर कार्बोनेट)'),
  '(Cobalt Aluminate)': l10('（アルミン酸コバルト）', '（铝酸钴）', '(aluminate de cobalt)', '(aluminato de cobalto)', '(Cobaltaluminat)', '(алюминат кобальта)', '(aluminato de cobalto)', '(알루민산코발트)', '(alluminato di cobalto)', '(कोबाल्ट एल्युमिनेट)'),
  '(Nickel–Titanium Shape Memory)': l10('（Ni-Ti形状記憶合金）', '（镍钛形状记忆合金）', '(alliage à mémoire de forme Ni-Ti)', '(aleación con memoria de forma Ni-Ti)', '(Ni-Ti-Formgedächtnislegierung)', '(сплав с памятью формы Ni-Ti)', '(liga com memória de forma Ni-Ti)', '(니켈-티타늄 형상기억합금)', '(lega a memoria di forma Ni-Ti)', '(निकेल-टाइटेनियम शेप मेमोरी)'),
  '(Antimony Potassium Tartrate)': l10('（酒石酸アンチモニルカリウム）', '（酒石酸锑钾）', '(tartrate d’antimoine et de potassium)', '(tartrato de antimonio y potasio)', '(Antimonylkaliumtartrat)', '(тартрат антимонила-калия)', '(tartarato de antimônio e potássio)', '(주석산 안티모니 칼륨)', '(tartrato di antimonile e potassio)', '(एंटीमनी पोटैशियम टार्ट्रेट)'),
  '(NdFeB Magnet)': l10('（ネオジム磁石）', '（钕铁硼磁铁）', '(aimant NdFeB)', '(imán NdFeB)', '(NdFeB-Magnet)', '(магнит NdFeB)', '(ímã NdFeB)', '(네오디뮴 자석)', '(magnete NdFeB)', '(NdFeB चुंबक)'),
  '(Zinc Fungicide)': l10('（亜鉛系殺菌剤）', '（锌杀菌剂）', '(fongicide au zinc)', '(fungicida de zinc)', '(Zink-Fungizid)', '(цинковый фунгицид)', '(fungicida de zinco)', '(아연 살균제)', '(fungicida allo zinco)', '(जिंक कवकनाशी)'),
  '(Kagan Reagent)': l10('（ケーガン試薬）', '（Kagan试剂）', '(réactif de Kagan)', '(reactivo de Kagan)', '(Kagan-Reagenz)', '(реагент Кагана)', '(reagente de Kagan)', '(카간 시약)', '(reagente di Kagan)', '(कागन अभिकर्मक)'),
  "(Adams' Catalyst)": l10('（アダムス触媒）', '（亚当斯催化剂）', '(catalyseur d’Adams)', '(catalizador de Adams)', '(Adams-Katalysator)', '(катализатор Адамса)', '(catalisador de Adams)', '(애덤스 촉매)', '(catalizzatore di Adams)', '(एडम्स उत्प्रेरक)'),
  '(PTFE)': l10('(PTFE)', '(PTFE)', '(PTFE)', '(PTFE)', '(PTFE)', '(ПТФЭ)', '(PTFE)', '(PTFE)', '(PTFE)', '(PTFE)'),
  '(PDMS)': l10('(PDMS)', '(PDMS)', '(PDMS)', '(PDMS)', '(PDMS)', '(ПДМС)', '(PDMS)', '(PDMS)', '(PDMS)', '(PDMS)'),
  '(YAG)': l10('(YAG)', '(YAG)', '(YAG)', '(YAG)', '(YAG)', '(ИАГ)', '(YAG)', '(YAG)', '(YAG)', '(YAG)'),
  '(YBCO)': l10('(YBCO)', '(YBCO)', '(YBCO)', '(YBCO)', '(YBCO)', '(YBCO)', '(YBCO)', '(YBCO)', '(YBCO)', '(YBCO)'),
  '(YIG)': l10('(YIG)', '(YIG)', '(YIG)', '(YIG)', '(YIG)', '(ЖИГ)', '(YIG)', '(YIG)', '(YIG)', '(YIG)'),
  '(PZT)': l10('(PZT)', '(PZT)', '(PZT)', '(PZT)', '(PZT)', '(ЦТС)', '(PZT)', '(PZT)', '(PZT)', '(PZT)'),
  '(CAN)': l10('(CAN)', '(CAN)', '(CAN)', '(CAN)', '(CAN)', '(CAN)', '(CAN)', '(CAN)', '(CAN)', '(CAN)'),
  '(GGG)': l10('(GGG)', '(GGG)', '(GGG)', '(GGG)', '(GGG)', '(ГГГ)', '(GGG)', '(GGG)', '(GGG)', '(GGG)'),
  '(LSO)': l10('(LSO)', '(LSO)', '(LSO)', '(LSO)', '(LSO)', '(LSO)', '(LSO)', '(LSO)', '(LSO)', '(LSO)'),
  '(OLED)': l10('(OLED)', '(OLED)', '(OLED)', '(OLED)', '(OLED)', '(OLED)', '(OLED)', '(OLED)', '(OLED)', '(OLED)'),
};

// Exact special multi-word / mineral / organic / complex compound base names (without outer parens)
const SPECIAL_COMPOUNDS: Record<string, L10> = {
  'Water': l10('水', '水', 'Eau', 'Agua', 'Wasser', 'Вода', 'Água', '물', 'Acqua', 'जल (पानी)'),
  'Ammonia': l10('アンモニア', '氨', 'Ammoniac', 'Amoníaco', 'Ammoniak', 'Аммиак', 'Amônia', '암모니아', 'Ammoniaca', 'अमोनिया'),
  'Methane': l10('メタン', '甲烷', 'Méthane', 'Metano', 'Methan', 'Метан', 'Metano', '메테인', 'Metano', 'मीथेन'),
  'Ethanol': l10('エタノール', '乙醇', 'Éthanol', 'Etanol', 'Ethanol', 'Этанол', 'Etanol', '에탄올', 'Etanolo', 'इथेनॉल'),
  'Glucose': l10('グルコース（ブドウ糖）', '葡萄糖', 'Glucose', 'Glucosa', 'Glucose', 'Глюкоза', 'Glicose', '포도당', 'Glucosio', 'ग्लूकोज़'),
  'Benzene': l10('ベンゼン', '苯', 'Benzène', 'Benceno', 'Benzol', 'Бензол', 'Benzeno', '벤젠', 'Benzene', 'बेंजीन'),
  'Urea': l10('尿素', '尿素', 'Urée', 'Urea', 'Harnstoff', 'Мочевина', 'Ureia', '요소', 'Urea', 'यूरिया'),
  'Ozone': l10('オゾン', '臭氧', 'Ozone', 'Ozono', 'Ozon', 'Озон', 'Ozônio', '오존', 'Ozono', 'ओज़ोन'),
  'Hydrazine': l10('ヒドラジン', '联氨（肼）', 'Hydrazine', 'Hidracina', 'Hydrazin', 'Гидразин', 'Hidrazina', '히드라진', 'Idrazina', 'हाइड्राज़ीन'),
  'Chloroform': l10('クロロホルム', '氯仿', 'Chloroforme', 'Cloroformo', 'Chloroform', 'Хлороформ', 'Clorofórmio', '클로로포름', 'Cloroformio', 'क्लोरोफॉर्म'),
  'Iodoform': l10('ヨードホルム', '碘仿', 'Iodoforme', 'Yodoformo', 'Iodoform', 'Иодоформ', 'Iodofórmio', '아이오도포름', 'Iodoformio', 'आयोडोफॉर्म'),
  'Bromomethane': l10('ブロモメタン', '溴甲烷', 'Bromométhane', 'Bromometano', 'Brommethan', 'Бромметан', 'Bromometano', '브로모메테인', 'Bromometano', 'ब्रोमोमीथेन'),
  'Silane': l10('シラン', '硅烷', 'Silane', 'Silano', 'Silan', 'Силан', 'Silano', '실레인', 'Silano', 'सिलेन'),
  'Germane': l10('ゲルマン', '锗烷', 'Germane', 'Germano', 'German', 'Герман', 'Germano', '저메인', 'Germano', 'जर्मेन'),
  'Stannane': l10('スタンナン', '锡烷', 'Stannane', 'Estannano', 'Stannan', 'Станнан', 'Estanano', '스탄난', 'Stannano', 'स्टैनन'),
  'Phosphine': l10('ホスフィン', '磷化氢（膦）', 'Phosphine', 'Fosfina', 'Phosphan', 'Фосфин', 'Fosfina', '포스핀', 'Fosfina', 'फॉस्फीन'),
  'Arsine': l10('アルシン', '砷化氢（胂）', 'Arsine', 'Arsina', 'Arsan', 'Арсин', 'Arsina', '아르신', 'Arsina', 'आर्सीन'),
  'Stibine': l10('スチビン', '锑化氢（锑）', 'Stibine', 'Estibina', 'Stiban', 'Стибин', 'Estibina', '스티빈', 'Stibina', 'स्टिबीन'),
  'Diborane': l10('ジボラン', '乙硼烷', 'Diborane', 'Diborano', 'Diboran', 'Диборан', 'Diborano', '디보레인', 'Diborano', 'डाइबोरेन'),
  'Ferrocene': l10('フェロセン', '二茂铁', 'Ferrocène', 'Ferroceno', 'Ferrocen', 'Ферроцен', 'Ferroceno', '페로센', 'Ferrocene', 'फेरोसीन'),
  'Osmocene': l10('オスモセン', '二茂锇', 'Osmocène', 'Osmoceno', 'Osmocen', 'Осмоцен', 'Osmoceno', '오스모센', 'Osmocene', 'ऑस्मोसीन'),
  'Hassiocene': l10('ハッソセン', '二茂𬭶', 'Hassiocène', 'Hasioceno', 'Hassiocen', 'Хассиоцен', 'Hassioceno', '하시오센', 'Hassiocene', 'हैसियोसीन'),
  'Dimethylmercury': l10('ジメチル水銀', '二甲基汞', 'Diméthylmercure', 'Dimetilmercurio', 'Dimethylquecksilber', 'Диметилртуть', 'Dimetilmercúrio', '디메틸수은', 'Dimetilmercurio', 'डाइमिथाइलमरकरी'),
  'Trimethylgallium': l10('トリメチルガリウム', '三甲基镓', 'Triméthylgallium', 'Trimetilgalio', 'Trimethylgallium', 'Триметилгаллий', 'Trimetilgálio', '트리메틸갈륨', 'Trimetilgallio', 'ट्राइमिथाइलगैलियम'),
  'Trimethylindium': l10('トリメチルインジウム', '三甲基铟', 'Triméthylindium', 'Trimetilindio', 'Trimethylindium', 'Триметилиндий', 'Trimetilíndio', '트리메틸인듐', 'Trimetilindio', 'ट्राइमिथाइलइंडियम'),
  'Polytetrafluoroethylene': l10('ポリテトラフルオロエチレン', '聚四氟乙烯', 'Polytétrafluoroéthylène', 'Politetrafluoroetileno', 'Polytetrafluorethylen', 'Политетрафторэтилен', 'Politetrafluoroetileno', '폴리테트라플루오로에틸렌', 'Politetrafluoroetilene', 'पॉलिटेट्राफ्लोरोएथिलीन'),
  'Polydimethylsiloxane': l10('ポリジメチルシロキサン', '聚二甲基硅氧烷', 'Polydiméthylsiloxane', 'Polidimetilsiloxano', 'Polydimethylsiloxan', 'Полидиметилсилоксан', 'Polidimetilsiloxano', '폴리디메틸실록산', 'Polidimetilsilossano', 'पॉलीडाइमिथाइलसिलोक्सेन'),
  // Acids
  'Acetic Acid': l10('酢酸', '乙酸（醋酸）', 'Acide acétique', 'Ácido acético', 'Essigsäure', 'Уксусная кислота', 'Ácido acético', '아세트산', 'Acido acetico', 'एसिटिक अम्ल'),
  'Hydrochloric Acid': l10('塩酸', '盐酸', 'Acide chlorhydrique', 'Ácido clorhídrico', 'Salzsäure', 'Соляная кислота', 'Ácido clorídrico', '염산', 'Acido cloridrico', 'हाइड्रोक्लोरिक अम्ल'),
  'Hydrobromic Acid': l10('臭化水素酸', '氢溴酸', 'Acide bromhydrique', 'Ácido bromhídrico', 'Bromwasserstoffsäure', 'Бромоводородная кислота', 'Ácido bromídrico', '브로민화수소산', 'Acido bromidrico', 'हाइड्रोब्रोमिक अम्ल'),
  'Hydroiodic Acid': l10('ヨウ化水素酸', '氢碘酸', 'Acide iodhydrique', 'Ácido yodhídrico', 'Iodwasserstoffsäure', 'Иодоводородная кислота', 'Ácido iodídrico', '아이오딘화수소산', 'Acido iodidrico', 'हाइड्रोआयोडिक अम्ल'),
  'Sulfuric Acid': l10('硫酸', '硫酸', 'Acide sulfurique', 'Ácido sulfúrico', 'Schwefelsäure', 'Серная кислота', 'Ácido sulfúrico', '황산', 'Acido solforico', 'सल्फ्यूरिक अम्ल'),
  'Nitric Acid': l10('硝酸', '硝酸', 'Acide nitrique', 'Ácido nítrico', 'Salpetersäure', 'Азотная кислота', 'Ácido nítrico', '질산', 'Acido nitrico', 'नाइट्रिक अम्ल'),
  'Phosphoric Acid': l10('リン酸', '磷酸', 'Acide phosphorique', 'Ácido fosfórico', 'Phosphorsäure', 'Фосфорная кислота', 'Ácido fosfórico', '인산', 'Acido fosforico', 'फॉस्फोरिक अम्ल'),
  'Boric Acid': l10('ホウ酸', '硼酸', 'Acide borique', 'Ácido bórico', 'Borsäure', 'Борная кислота', 'Ácido bórico', '붕산', 'Acido borico', 'बोरिक अम्ल'),
  'Arsenic Acid': l10('ヒ酸', '砷酸', 'Acide arsénique', 'Ácido arsénico', 'Arsensäure', 'Мышьяковая кислота', 'Ácido arsênico', '비산', 'Acido arsenico', 'आर्सेनिक अम्ल'),
  'Selenic Acid': l10('セレン酸', '硒酸', 'Acide sélénique', 'Ácido selénico', 'Selensäure', 'Селеновая кислота', 'Ácido selênico', '셀레늄산', 'Acido selenico', 'सेलेनिक अम्ल'),
  'Telluric Acid': l10('テルル酸', '碲酸', 'Acide tellurique', 'Ácido telúrico', 'Tellursäure', 'Теллуровая кислота', 'Ácido telúrico', '텔루르산', 'Acido tellurico', 'टेल्यूरिक अम्ल'),
  'Orthosilicic Acid': l10('オルトケイ酸', '原硅酸', 'Acide orthosilicique', 'Ácido ortosilícico', 'Orthokieselsäure', 'Ортокремниевая кислота', 'Ácido ortossilícico', '오르토규산', 'Acido ortosilicico', 'ऑर्थोसिलिसिक अम्ल'),
  'Chloroauric Acid': l10('塩化金酸', '氯金酸', 'Acide chloraurique', 'Ácido cloroáurico', 'Tetrachlorogoldsäure', 'Золотохлористоводородная кислота', 'Ácido cloroáurico', '염화금산', 'Acido cloroaurico', 'क्लोरोऑरिक अम्ल'),
  'Chloroplatinic Acid': l10('塩化白金酸', '氯铂酸', 'Acide chloroplatinique', 'Ácido cloroplatínico', 'Hexachloroplatinsäure', 'Платинохлористоводородная кислота', 'Ácido cloroplatínico', '염화백금산', 'Acido cloroplatinico', 'क्लोरोप्लैटिनिक अम्ल'),
  'Hexachloroiridic Acid': l10('ヘキサクロロイリジウム酸', '六氯铱酸', 'Acide hexachloroiridique', 'Ácido hexacloroirídico', 'Hexachloroiridiumsäure', 'Гексахлороиридиевая кислота', 'Ácido hexacloroirídico', '헥사클로로이리듐산', 'Acido esacloroiridico', 'हेक्साक्लोरोइरिडिक अम्ल'),
  'Chlororoentgenous Acid': l10('クロロレントゲニウム酸', '氯𬬭酸', 'Acide chlororoentgénique', 'Ácido clororoentgenoso', 'Chlororoentgensäure', 'Хлорорентгенистая кислота', 'Ácido clororroentgênico', '클로로뢴트게늄산', 'Acido clororoentgenico', 'क्लोरोरॉन्टजेनस अम्ल'),
  'Fluoroantimonic Acid': l10('フルオロアンチモン酸', '氟锑酸', 'Acide fluoroantimonique', 'Ácido fluoroantimónico', 'Fluor-Antimonsäure', 'Фторсурьмяная кислота', 'Ácido fluoroantimônico', '플루오로안티모니산', 'Acido fluoroantimonico', 'फ्लोरोएंटीमोनिक अम्ल'),
  'Periodic Acid': l10('過ヨウ素酸', '高碘酸', 'Acide périodique', 'Ácido peryódico', 'Periodsäure', 'Иодная кислота', 'Ácido periódico', '과아이오딘산', 'Acido periodico', 'परआयोडिक अम्ल'),
  'Perxenic Acid': l10('過キセノン酸', '高氙酸', 'Acide perxénique', 'Ácido perxénico', 'Perxenonsäure', 'Ксеноновая кислота', 'Ácido perxênico', '과제논산', 'Acido perxenico', 'परजीनिक अम्ल'),
  'Perrhenic Acid': l10('過レニウム酸', '高铼酸', 'Acide perrhénique', 'Ácido perrénico', 'Perrheniumsäure', 'Рениевая кислота', 'Ácido perrênico', '과레늄산', 'Acido perrenico', 'पररेनिक अम्ल'),
  'Pertechnetic Acid': l10('過テクネチウム酸', '高锝酸', 'Acide pertechnétique', 'Ácido pertecnético', 'Pertechnetiumsäure', 'Технециевая кислота', 'Ácido pertecnético', '과테크네튬산', 'Acido pertecnetico', 'परटेक्नीटिक अम्ल'),
  'Perbohric Acid': l10('過ボーリウム酸', '高𬭛酸', 'Acide perbohrique', 'Ácido perbórico', 'Perbohrsäure', 'Бориевая кислота', 'Ácido perbórico', '과보륨산', 'Acido perborico', 'परबोरिक अम्ल'),
  'Seaborgic Acid': l10('シーボーギウム酸', '𬭳酸', 'Acide seaborgique', 'Ácido seabórgico', 'Seaborgsäure', 'Сиборгиевая кислота', 'Ácido seabórgico', '시보귬산', 'Acido seaborgico', 'सीबोर्गिक अम्ल'),
  'Tungstic Acid': l10('タングステン酸', '钨酸', 'Acide tungstique', 'Ácido túngstico', 'Wolframsäure', 'Вольфрамовая кислота', 'Ácido túngstico', '텅스텐산', 'Acido tungstico', 'टंगस्टिक अम्ल'),
  // Minerals & Common Drugs/Materials
  'Borax': l10('ホウ砂', '硼砂', 'Borax', 'Bórax', 'Borax', 'Бура', 'Bórax', '붕사', 'Borace', 'सुहागा (बोरेक्स)'),
  'Beryl': l10('緑柱石（ベリル）', '绿柱石', 'Béryl', 'Berilo', 'Beryll', 'Берилл', 'Berilo', '녹주석', 'Berillo', 'बेरिल'),
  'Dolomite': l10('ドロマイト（苦灰石）', '白云石', 'Dolomie', 'Dolomita', 'Dolomit', 'Доломит', 'Dolomita', '백운석', 'Dolomite', 'डोलोमाइट'),
  'Cryolite': l10('氷晶石', '冰晶石', 'Cryolite', 'Criolita', 'Kryolith', 'Криолит', 'Criolita', '빙정석', 'Criolite', 'क्रायोलाइट'),
  'Chalcopyrite': l10('黄銅鉱', '黄铜矿', 'Chalcopyrite', 'Calcopirita', 'Chalkopyrit', 'Халькопирит', 'Calcopirita', '황동광', 'Calcopirite', 'चैल्कोपायराइट'),
  'Chromite': l10('クロム鉄鉱', '铬铁矿', 'Chromite', 'Cromita', 'Chromit', 'Хромит', 'Cromita', '크롬철광', 'Cromite', 'क्रोमाइट'),
  'Ilmenite': l10('イルメナイト', '钛铁矿', 'Ilménite', 'Ilmenita', 'Ilmenit', 'Ильменит', 'Ilmenita', '티탄철광', 'Ilmenite', 'इल्मेनाइट'),
  'Ferberite': l10('鉄重石', '黑钨矿', 'Ferbérite', 'Ferberita', 'Ferberit', 'Ферберит', 'Ferberita', '철중석', 'Ferberite', 'फर्बेराइट'),
  'Malachite': l10('孔雀石', '孔雀石', 'Malachite', 'Malaquita', 'Malachit', 'Малахит', 'Malaquita', '공작석', 'Malachite', 'मैलाकाइट'),
  'Realgar': l10('鶏冠石', '雄黄', 'Réalgar', 'Rejalgar', 'Realgar', 'Реальгар', 'Realgar', '계관석', 'Realgar', 'मैनसिल'),
  'Red Lead': l10('鉛丹', '铅丹', 'Minium de plomb', 'Minio de plomo', 'Bleimennige', 'Свинцовый сурик', 'Zarcão', '광명단', 'Minio di piombo', 'लाल सीसा'),
  'Cobalt Blue': l10('コバルトブルー', '钴蓝', 'Bleu de cobalt', 'Azul cobalto', 'Kobaltblau', 'Кобальтовая синь', 'Azul cobalto', '코발트 블루', 'Blu cobalto', 'कोबाल्ट ब्लू'),
  'Nitinol': l10('ニチノール', '镍钛诺', 'Nitinol', 'Nitinol', 'Nitinol', 'Нитинол', 'Nitinol', '니티놀', 'Nitinol', 'नाइटिनॉल'),
  'Cisplatin': l10('シスプラチン', '顺铂', 'Cisplatine', 'Cisplatino', 'Cisplatin', 'Цисплатин', 'Cisplatina', '시스플라틴', 'Cisplatino', 'सिस्प्लैटिन'),
  'Carboplatin': l10('カルボプラチン', '卡铂', 'Carboplatine', 'Carboplatino', 'Carboplatin', 'Карбоплатин', 'Carboplatina', '카보플라틴', 'Carboplatino', 'कार्बोप्लैटिन'),
  'Tartar Emetic': l10('吐酒石', '吐酒石', 'Émétique', 'Tártaro emético', 'Brechweinstein', 'Рвотный камень', 'Tártaro emético', '토주석', 'Tartaro emetico', 'टार्टर एमेटिक'),
  'Zineb': l10('ジネブ', '代森锌', 'Zinèbe', 'Zineb', 'Zineb', 'Цинеб', 'Zinebe', '지네브', 'Zineb', 'ज़िनेब'),
  'Gadopentetate': l10('ガドペンテト酸', '钆喷酸', 'Gadopentétate', 'Gadopentetato', 'Gadopentetat', 'Гадопентетат', 'Gadopentetato', '가도펜테테이트', 'Gadopentetato', 'गैडोपेंटेटेट'),
  'Bismuth Subsalicylate': l10('次サリチル酸ビスマス', '次水杨酸铋', 'Sous-salicylate de bismuth', 'Subsalicilato de bismuto', 'Bismutsubsalicylat', 'Субсалицилат висмута', 'Subsalicilato de bismuto', '차살리실산비스무트', 'Subsalicilato di bismuto', 'बिस्मथ सबसैलिसिलेट'),
  'Bismuth Germanate': l10('ゲルマニウム酸ビスマス', '锗酸铋', 'Germanate de bismuth', 'Germanato de bismuto', 'Bismutgermanat', 'Германат висмута', 'Germanato de bismuto', '게르마늄산 비스무트', 'Germanato di bismuto', 'बिस्मथ जर्मेनेट'),
  'Bismuth Ferrite': l10('ビスマスフェライト', '铁酸铋', 'Ferrite de bismuth', 'Ferrita de bismuto', 'Bismutferrit', 'Феррит висмута', 'Ferrita de bismuto', '비스무트 페라이트', 'Ferrite di bismuto', 'बिस्मथ फेराइट'),
  'Barium Ferrite': l10('バリウムフェライト', '铁酸钡', 'Ferrite de baryum', 'Ferrita de bario', 'Bariumferrit', 'Феррит бария', 'Ferrita de bário', '바륨 페라이트', 'Ferrite di bario', 'बेरियम फेराइट'),
  'Strontium Ferrite': l10('ストロンチウムフェライト', '铁酸锶', 'Ferrite de strontium', 'Ferrita de estroncio', 'Strontiumferrit', 'Феррит стронция', 'Ferrita de estrôncio', '스트론튬 페라이트', 'Ferrite di stronzio', 'स्ट्रॉन्शियम फेराइट'),
  'Terbium Iron Garnet': l10('テルビウム鉄ガーネット', '铽铁石榴石', 'Grenat de fer et de terbium', 'Granate de hierro y terbio', 'Terbium-Eisen-Granat', 'Тербий-железный гранат', 'Granada de ferro e térbio', '테르븀 철 가넷', 'Granato di ferro e terbio', 'टर्बियम आयरन गार्नेट'),
  'Yttrium Iron Garnet': l10('イットリウム鉄ガーネット', '钇铁石榴石', 'Grenat de fer et d’yttrium', 'Granate de hierro e itrio', 'Yttrium-Eisen-Granat', 'Иттрий-железный гранат', 'Granada de ferro e ítrio', '이트륨 철 가넷', 'Granato di ferro e ittrio', 'यिट्रियम आयरन गार्नेट'),
  'Yttrium Aluminium Garnet': l10('イットリウム・アルミニウム・ガーネット', '钇铝石榴石', 'Grenat d’yttrium-aluminium', 'Granate de itrio y aluminio', 'Yttrium-Aluminium-Granat', 'Иттрий-алюминиевый гранат', 'Granada de ítrio e alumínio', '이트륨 알루미늄 가넷', 'Granato di ittrio e alluminio', 'यिट्रियम एल्युमिनियम गार्नेट'),
  'Ceric Ammonium Nitrate': l10('硝酸セリウム(IV)アンモニウム', '硝酸铈铵', 'Nitrate cérique d’ammonium', 'Nitrato cérico amónico', 'Cer(IV)-ammoniumnitrat', 'Церий-аммоний нитрат', 'Nitrato cérico amoniacal', '질산세륨(IV)암모늄', 'Nitrato cerico ammonico', 'सेरिक अमोनियम नाइट्रेट'),
  'Lutetium Oxyorthosilicate': l10('オルトケイ酸ルテチウム', '硅酸镥', 'Oxyorthosilicate de lutécium', 'Oxiortosilicato de lutecio', 'Lutetiumoxyorthosilicat', 'Оксиортосиликат лютеция', 'Oxiortossilicato de lutécio', '옥시오르토규산 루테튬', 'Ossiortosilicato di lutezio', 'ल्यूटिशियम ऑक्सीऑर्थोसिलिकेट'),
  'Gadolinium Gallium Garnet': l10('ガドリニウム・ガリウム・ガーネット', '钆镓石榴石', 'Grenat de gadolinium-gallium', 'Granate de gadolinio y galio', 'Gadolinium-Gallium-Granat', 'Гадолиний-галлиевый гранат', 'Granada de gadolínio e gálio', '가돌리늄 갈륨 가넷', 'Granato di gadolinio e gallio', 'गैडोलिनियम गैलियम गार्नेट'),
  'Yttrium Barium Copper Oxide': l10('イットリウム系銅酸化物超伝導体', '钇钡铜氧', 'Oxyde d’yttrium-baryum-cuivre', 'Óxido de itrio, bario y cobre', 'Yttrium-Barium-Kupferoxid', 'Оксид иттрия-бария-меди', 'Óxido de ítrio, bário e cobre', '이트륨 바륨 구리 산화물', 'Ossido di ittrio, bario e rame', 'यिट्रियम बेरियम कॉपर ऑक्साइड'),
  'YBCO High-Temp Superconductor': l10('YBCO高温超伝導体', 'YBCO高温超导体', 'Supraconducteur haute température YBCO', 'Superconductor de alta temp. YBCO', 'YBCO-Hochtemperatursupraleiter', 'ВТСП-сверхпроводник YBCO', 'Supercondutor de alta temp. YBCO', 'YBCO 고온 초전도체', 'Superconduttore ad alta temp. YBCO', 'YBCO उच्च-ताप अतिचालक'),
  'TBCCO High-Temp Superconductor': l10('TBCCO高温超伝導体', 'TBCCO高温超导体', 'Supraconducteur haute température TBCCO', 'Superconductor de alta temp. TBCCO', 'TBCCO-Hochtemperatursupraleiter', 'ВТСП-сверхпроводник TBCCO', 'Supercondutor de alta temp. TBCCO', 'TBCCO 고온 초전도체', 'Superconduttore ad alta temp. TBCCO', 'TBCCO उच्च-ताप अतिचालक'),
  'Niobium-Tin Superconductor': l10('ニオブスズ超伝導体', '铌锡超导体', 'Supraconducteur niobium-étain', 'Superconductor de niobio-estaño', 'Niob-Zinn-Supraleiter', 'Сверхпроводник ниобий-олово', 'Supercondutor nióbio-estanho', '나이오븀-주석 초전도체', 'Superconduttore niobio-stagno', 'नायोबियम-टिन अतिचालक'),
  'Niobium–Tin Superconductor': l10('ニオブスズ超伝導体', '铌锡超导体', 'Supraconducteur niobium-étain', 'Superconductor de niobio-estaño', 'Niob-Zinn-Supraleiter', 'Сверхпроводник ниобий-олово', 'Supercondutor nióbio-estanho', '나이오븀-주석 초전도체', 'Superconduttore niobio-stagno', 'नायोबियम-टिन अतिचालक'),
  'Neodymium Magnet Alloy': l10('ネオジム磁石合金', '钕铁硼永磁合金', 'Alliage d’aimant au néodyme', 'Aleación de imán de neodimio', 'Neodym-Magnetlegierung', 'Неодимовый магнитный сплав', 'Liga magnética de neodímio', '네오디뮴 자석 합금', 'Lega magnetica al neodimio', 'नियोडिमियम चुंबक मिश्रधातु'),
  'Samarium–Cobalt Magnet Alloy': l10('サマリウムコバルト磁石合金', '钐钴永磁合金', 'Alliage d’aimant samarium-cobalt', 'Aleación magnética samario-cobalto', 'Samarium-Cobalt-Magnetlegierung', 'Магнитный сплав самарий-кобальт', 'Liga magnética samário-cobalto', '사마륨-코발트 자석 합금', 'Lega magnetica samario-cobalto', 'समारियम-कोबाल्ट चुंबक मिश्रधातु'),
  'Terfenol-D Magnetostrictive Alloy': l10('超磁歪合金テルフェノールD', 'Terfenol-D磁致伸缩合金', 'Alliage magnétostrictif Terfenol-D', 'Aleación magnetoestrictiva Terfenol-D', 'Magnetostriktive Legierung Terfenol-D', 'Магнитострикционный сплав Терфенол-D', 'Liga magnetostritiva Terfenol-D', '테르페놀-D 자기변형 합금', 'Lega magnetostrittiva Terfenol-D', 'टरफेनॉल-D चुंबकीय-विरूपण मिश्रधातु'),
  'Giant Magnetocaloric Alloy': l10('巨大磁気熱量効果合金', '巨磁热效应合金', 'Alliage magnétocalorique géant', 'Aleación magnetocalórica gigante', 'Riesen-magnetokalorische Legierung', 'Сплав с гигантским магнитокалорическим эффектом', 'Liga magnetocalórica gigante', '거대 자기열량 합금', 'Lega magnetocalorica gigante', 'विशाल मैग्नेटोकैलोरिक मिश्रधातु'),
  'CIGS Solar Cell Compound': l10('CIGS太陽電池化合物', 'CIGS太阳能电池化合物', 'Composé photovoltaïque CIGS', 'Compuesto solar CIGS', 'CIGS-Solarzellenverbindung', 'Соединение для солнечных батарей CIGS', 'Composto solar CIGS', 'CIGS 태양전지 화합물', 'Composto solare CIGS', 'CIGS सौर सेल यौगिक'),
  'BAM Blue Phosphor': l10('BAM青色蛍光体', 'BAM蓝色荧光粉', 'Luminophore bleu BAM', 'Fósforo azul BAM', 'Blauleuchtstoff BAM', 'Синий люминофор BAM', 'Fósforo azul BAM', 'BAM 청색 형광체', 'Fosforo blu BAM', 'BAM नीला फॉस्फोर'),
  'Europium NMR Shift Reagent': l10('ユウロピウムNMRシフト試薬', '铕核磁共振位移试剂', 'Réactif de déplacement RMN à l’europium', 'Reactivo de desplazamiento RMN de europio', 'Europium-NMR-Shift-Reagenz', 'ЯМР-сдвигающий реагент европия', 'Reagente de deslocamento RMN de európio', '유로퓸 NMR 이동 시약', 'Reagente di shift NMR all’europio', 'यूरोपियम NMR शिफ्ट अभिकर्मक'),
  'Europium-Doped Yttria Red Phosphor': l10('ユウロピウム付活イットリア赤色蛍光体', '铕掺杂氧化钇红粉', 'Luminophore rouge Y₂O₃:Eu', 'Fósforo rojo de itria dopado con europio', 'Europium-dotierter Yttriumoxid-Rotleuchtstoff', 'Красный люминофор Y₂O₃:Eu', 'Fósforo vermelho de ítria dopada com európio', '유로퓸 도핑 이트리아 적색 형광체', 'Fosforo rosso di ittria drogata all’europio', 'यूरोपियम-डॉप्ड यिट्रिया लाल फॉस्फोर'),
  'Neodymium-Doped YAG Laser Crystal': l10('Nd添加YAGレーザー結晶', '掺钕YAG激光晶体', 'Cristal laser YAG dopé au néodyme', 'Cristal láser YAG dopado con neodimio', 'Neodym-dotierter YAG-Laserkristall', 'Лазерный кристалл Nd:YAG', 'Cristal laser YAG dopado com neodímio', '네오디뮴 도핑 YAG 레이저 결정', 'Cristallo laser YAG drogato al neodimio', 'नियोडिमियम-डॉप्ड YAG लेज़र क्रिस्टल'),
  'Erbium-Doped YAG Crystal': l10('Er添加YAG結晶', '掺铒YAG晶体', 'Cristal YAG dopé à l’erbium', 'Cristal YAG dopado con erbio', 'Erbium-dotierter YAG-Kristall', 'Кристалл Er:YAG', 'Cristal YAG dopado com érbio', '에르븀 도핑 YAG 결정', 'Cristallo YAG drogato all’erbio', 'एर्बियम-डॉप्ड YAG क्रिस्टल'),
  'Holmium-Doped YAG Laser Crystal': l10('Ho添加YAGレーザー結晶', '掺钬YAG激光晶体', 'Cristal laser YAG dopé à l’holmium', 'Cristal láser YAG dopado con holmio', 'Holmium-dotierter YAG-Laserkristall', 'Лазерный кристалл Ho:YAG', 'Cristal laser YAG dopado com hólmio', '홀뮴 도핑 YAG 레이저 결정', 'Cristallo laser YAG drogato all’olmio', 'होल्मियम-डॉप्ड YAG लेज़र क्रिस्टल'),
  'Ytterbium-Doped YAG Laser Crystal': l10('Yb添加YAGレーザー結晶', '掺镱YAG激光晶体', 'Cristal laser YAG dopé à l’ytterbium', 'Cristal láser YAG dopado con iterbio', 'Ytterbium-dotierter YAG-Laserkristall', 'Лазерный кристалл Yb:YAG', 'Cristal laser YAG dopado com itérbio', '이터븀 도핑 YAG 레이저 결정', 'Cristallo laser YAG drogato all’itterbio', 'यिट्टरबियम-डॉप्ड YAG लेज़र क्रिस्टल'),
  'Thulium Orthoferrite': l10('オルトフェライト・ツリウム', '正铁酸铥', 'Orthoferrite de thulium', 'Ortoferrita de tulio', 'Thuliumorthoferrit', 'Ортоферрит тулия', 'Ortoferrita de túlio', '오르토페라이트 툴륨', 'Ortoferrite di tulio', 'थूलियम ऑर्थोफेराइट'),
  'Potassium Alum': l10('カリウムミョウバン', '钾明矾', 'Alun de potassium', 'Alumbre de potasio', 'Kalialaun', 'Калиевые квасцы', 'Alúmen de potássio', '칼륨 백반', 'Allume di potassio', 'पोटाश फिटकरी'),
  'Potassium Dicyanoaurate': l10('ジシアノ金(I)酸カリウム', '二氰合金(I)酸钾', 'Dicyanoaurate de potassium', 'Dicianoaurato de potasio', 'Kaliumdicyanoaurat', 'Дицианоаурат калия', 'Dicianoaurato de potássio', '디시아노금산 칼륨', 'Dicianoaurato di potassio', 'पोटैशियम डाइसाइनोऑरेट'),
  'Potassium Ferrocyanide': l10('フェロシアン化カリウム（黄血塩）', '亚铁氰化钾', 'Ferrocyanure de potassium', 'Ferrocianuro de potasio', 'Kaliumhexacyanoferrat(II)', 'Ферроцианид калия', 'Ferrocianeto de potássio', '페로시안화 칼륨', 'Ferrocianuro di potassio', 'पोटैशियम फेरोसायनाइड'),
  'Sodium Cobaltinitrite': l10('亜硝酸コバルトナトリウム', '亚硝酸钴钠', 'Cobaltinitrite de sodium', 'Cobaltinitrito de sodio', 'Natriumhexanitrocobaltat(III)', 'Гексанитрокобальтат(III) натрия', 'Cobaltinitrito de sódio', '코발티아질산 나트륨', 'Cobaltinitrito di sodio', 'सोडियम कोबाल्टीनाइट्राइट'),
  'Sodium Arsenite': l10('亜ヒ酸ナトリウム', '亚砷酸钠', 'Arsénite de sodium', 'Arsenito de sodio', 'Natriumarsenit', 'Арсенит натрия', 'Arsenito de sódio', '아비산나트륨', 'Arsenito di sodio', 'सोडियम आर्सेनाइट'),
  'Sodium Selenite': l10('亜セレン酸ナトリウム', '亚硒酸钠', 'Sélénite de sodium', 'Selenito de sodio', 'Natriumselenit', 'Селенит натрия', 'Selenito de sódio', '아셀렌산나트륨', 'Selenito di sodio', 'सोडियम सेलेनाइट'),
  'Sodium Selenate': l10('セレン酸ナトリウム', '硒酸钠', 'Sélénate de sodium', 'Seleniato de sodio', 'Natriumselenat', 'Селенат натрия', 'Selenato de sódio', '셀렌산나트륨', 'Seleniato di sodio', 'सोडियम सेलेनेट'),
  'Sodium Tellurite': l10('亜テルル酸ナトリウム', '亚碲酸钠', 'Tellurite de sodium', 'Telurito de sodio', 'Natriumtellurit', 'Теллурит натрия', 'Telurito de sódio', '아텔루르산나트륨', 'Tellurito di sodio', 'सोडियम टेल्यूराइट'),
  'Sodium Bismuthate': l10('ビスマス酸ナトリウム', '铋酸钠', 'Bismuthate de sodium', 'Bismutato de sodio', 'Natriumbismutat', 'Висмутат натрия', 'Bismutato de sódio', '비스무트산나트륨', 'Bismutato di sodio', 'सोडियम बिस्मथेट'),
  'Sodium Diuranate': l10('重ウラン酸ナトリウム', '重铀酸钠', 'Diuranate de sodium', 'Diuranato de sodio', 'Natriumdiuranat', 'Диуранат натрия', 'Diuranato de sódio', '중우라늄산나트륨', 'Diuranato di sodio', 'सोडियम डाइयूरेनेट'),
  'Sodium Perxenate': l10('過キセノン酸ナトリウム', '高氙酸钠', 'Perxénate de sodium', 'Perxenato de sodio', 'Natriumperxenat', 'Перксенат натрия', 'Perxenato de sódio', '과제논산나트륨', 'Perxenato di sodio', 'सोडियम परजीनेट'),
  'Sodium Polonide': l10('ポロニウム化ナトリウム', '钋化钠', 'Poloniure de sodium', 'Poloniuro de sodio', 'Natriumpolonid', 'Полонид натрия', 'Poloneto de sódio', '폴로늄화 나트륨', 'Polonuro di sodio', 'सोडियम पोलोनाइड'),
  'Sodium Astatide': l10('アスタチン化ナトリウム', '砹化钠', 'Astature de sodium', 'Astáturo de sodio', 'Natriumastatid', 'Астатид натрия', 'Astateto de sódio', '아스타틴화 나트륨', 'Astaturo di sodio', 'सोडियम एस्टैटाइड'),
  'Sodium Livermoride': l10('リバモリウム化ナトリウム', '𫟷化钠', 'Livermoriure de sodium', 'Livermoruro de sodio', 'Natriumlivermorid', 'Ливерморид натрия', 'Livermoreto de sódio', '리버모륨화 나트륨', 'Livermoruro di sodio', 'सोडियम लिवरमोराइड'),
  'Sodium Tennesside': l10('テネシン化ナトリウム', '鿬化钠', 'Tennessure de sodium', 'Tennessuro de sodio', 'Natriumtennessid', 'Теннессид натрия', 'Tennesseto de sódio', '테네신화 나트륨', 'Tennessuro di sodio', 'सोडियम टेनेसाइड'),
  'Sodium Hassate(VIII)': l10('ハッシウム(VIII)酸ナトリウム', '𬭶(VIII)酸钠', 'Hassate(VIII) de sodium', 'Hasato(VIII) de sodio', 'Natriumhassat(VIII)', 'Хассат(VIII) натрия', 'Hassato(VIII) de sódio', '하슘(VIII)산 나트륨', 'Assiato(VIII) di sodio', 'सोडियम हैसेट(VIII)'),
  'Sodium Hexachloromeitnerate': l10('ヘキサクロロマイトネリウム酸ナトリウム', '六氯𬭿酸钠', 'Hexachloromeitnérate de sodium', 'Hexacloromeitnerato de sodio', 'Natriumhexachloromeitnerat', 'Гексахлоромейтнерат натрия', 'Hexacloromeitnerato de sódio', '헥사클로로마이트너륨산 나트륨', 'Esacloromeitnerato di sodio', 'सोडियम हेक्साक्लोरोमाइटनेरेट'),
  'Potassium Astatide': l10('アスタチン化カリウム', '砹化钾', 'Astature de potassium', 'Astáturo de potasio', 'Kaliumastatid', 'Астатид калия', 'Astateto de potássio', '아스타틴화 칼륨', 'Astaturo di potassio', 'पोटैशियम एस्टैटाइड'),
  'Potassium Hassate': l10('ハッシウム酸カリウム', '𬭶酸钾', 'Hassate de potassium', 'Hasato de potasio', 'Kaliumhassat', 'Хассат калия', 'Hassato de potássio', '하슘산 칼륨', 'Assiato di potassio', 'पोटैशियम हैसेट'),
  'Potassium Heptafluoroprotactinate': l10('ヘプタフルオロプロトアクチニウム酸カリウム', '七氟镤酸钾', 'Heptafluoroprotactinate de potassium', 'Heptafluoroprotactinato de potasio', 'Kaliumheptafluoroprotactinat', 'Гептафторопротактинат калия', 'Heptafluoroprotactinato de potássio', '헵타플루오로프로트악티늄산 칼륨', 'Eptafluoroprotattinato di potassio', 'पोटैशियम हेप्टाफ्लोरोप्रोटैक्टिनेट'),
  'Cesium Auride': l10('金化セシウム', '金化铯', 'Aurure de césium', 'Aururo de cesio', 'Caesiumaurid', 'Аурид цезия', 'Aureto de césio', '금화 세슘', 'Aururo di cesio', 'सीज़ियम ऑराइड'),
  'Cesium Hexachloroneptunate': l10('ヘキサクロロネプツニウム酸セシウム', '六氯镎酸铯', 'Hexachloroneptunate de césium', 'Hexacloroneptunato de cesio', 'Caesiumhexachloroneptunat', 'Гексахлоронептунат цезия', 'Hexacloroneptunato de césio', '헥사클로로넵투늄산 세슘', 'Esacloroneptunato di cesio', 'सीज़ियम हेक्साक्लोरोनेप्ट्यूनेट'),
  'Cesium Roentgenide': l10('レントゲニウム化セシウム', '𬬭化铯', 'Roentgéniure de césium', 'Roentgenuro de cesio', 'Caesiumroentgenid', 'Рентгенид цезия', 'Roentgeneto de césio', '뢴트게늄화 세슘', 'Roentgenuro di cesio', 'सीज़ियम रॉन्टजेनाइड'),
  'Lead Polonide': l10('ポロニウム化鉛', '钋化铅', 'Poloniure de plomb', 'Poloniuro de plomo', 'Bleipolonid', 'Полонид свинца', 'Poloneto de chumbo', '폴로늄화 납', 'Polonuro di piombo', 'लेड पोलोनाइड'),
  'Nickel Dimethylglyoximate': l10('ジメチルグリオキシムニッケル', '丁二酮肟镍', 'Diméthylglyoximate de nickel', 'Dimetilglioximato de níquel', 'Nickeldimethylglyoximat', 'Диметилглиоксимат никеля', 'Dimetilglioximato de níquel', '디메틸글리옥심 니켈', 'Dimetilgliossimato di nichel', 'निकेल डाइमिथाइलग्लाइऑक्सिमेट'),
  'Titanium Isopropoxide': l10('チタンテトライソプロポキシド', '异丙醇钛', 'Isopropoxyde de titane', 'Isopropóxido de titanio', 'Titanisopropoxid', 'Изопропоксид титана', 'Isopropóxido de titânio', '이소프로폭사이드 티타늄', 'Isopropossido di titanio', 'टाइटेनियम आइसोप्रोपॉक्साइड'),
  'Tantalum(V) Ethoxide': l10('タンタル(V)エトキシド', '乙醇钽(V)', 'Éthoxyde de tantale(V)', 'Etóxido de tántalo(V)', 'Tantal(V)-ethoxid', 'Этоксид тантала(V)', 'Etóxido de tântalo(V)', '탄탈럼(V) 에톡사이드', 'Etossido di tantalo(V)', 'टैंटलम(V) एथॉक्साइड'),
  'Ruthenium(III) Acetylacetonate': l10('ルテニウム(III)アセチルアセトナート', '乙酰丙酮钌(III)', 'Acétylacétonate de ruthénium(III)', 'Acetilacetonato de rutenio(III)', 'Ruthenium(III)-acetylacetonat', 'Ацетилацетонат рутения(III)', 'Acetilacetonato de rutênio(III)', '루테늄(III) 아세틸아세토네이트', 'Acetilacetonato di rutenio(III)', 'रूथेनियम(III) एसिटिलएसीटोनेट'),
  'Fermium Acetylacetonate Complex': l10('フェルミウム・アセチルアセトナート錯体', '乙酰丙酮镄配合物', 'Complexe acétylacétonate de fermium', 'Complejo acetilacetonato de fermio', 'Fermium-Acetylacetonat-Komplex', 'Ацетилацетонатный комплекс фермия', 'Complexo acetilacetonato de férmio', '페르뮴 아세틸아세토네이트 착물', 'Complesso acetilacetonato di fermio', 'फर्मियम एसिटिलएसीटोनेट संकुल'),
  'Einsteinium Hydroxypyridinone Complex': l10('アインスタイニウム・ヒドロキシピリジノン錯体', '羟基吡啶酮锿配合物', 'Complexe hydroxypyridinone d’einsteinium', 'Complejo hidroxipiridinona de einstenio', 'Einsteinium-Hydroxypyridinon-Komplex', 'Гидроксипиридиноновый комплекс эйнштейния', 'Complexo hidroxipiridinona de einstênio', '아인슈타이늄 히드록시피리디논 착물', 'Complesso idrossipiridinone di einsteinio', 'आइंस्टीनियम हाइड्रॉक्सीपाइरिडिनोन संकुल'),
  'Rhodium(II) Acetate Dimer': l10('酢酸ロジウム(II)二量体', '乙酸铑(II)二聚体', 'Dimère d’acétate de rhodium(II)', 'Dímero de acetato de rodio(II)', 'Rhodium(II)-acetat-Dimer', 'Димер ацетата родия(II)', 'Dímero de acetato de ródio(II)', '아세트산 로듐(II) 이량체', 'Dimero di acetato di rodio(II)', 'रोडियम(II) एसीटेट डाइमर'),
  'Tetrakis(triphenylphosphine)palladium(0)': l10('テトラキス(トリフェニルホスフィン)パラジウム(0)', '四(三苯基膦)钯(0)', 'Tétrakis(triphénylphosphine)palladium(0)', 'Tetrakis(trifenilfosfina)paladio(0)', 'Tetrakis(triphenylphosphin)palladium(0)', 'Тетракис(трифенилфосфин)палладий(0)', 'Tetraquis(trifenilfosfina)paládio(0)', '테트라키스(트리페닐포스핀)팔라듐(0)', 'Tetrachis(trifenilfosfina)palladio(0)', 'टेट्राकिस(ट्राइफेनिलफॉस्फीन)पैलेडियम(0)'),
  'Tris(2-phenylpyridine)iridium': l10('トリス(2-フェニルピリジン)イリジウム', '三(2-苯基吡啶)合铱', 'Tris(2-phénylpyridine)iridium', 'Tris(2-fenilpiridina)iridio', 'Tris(2-phenylpyridin)iridium', 'Трис(2-фенилпиридин)иридий', 'Tris(2-fenilpiridina)irídio', '트리스(2-페닐피리딘)이리듐', 'Tris(2-fenilpiridina)iridio', 'ट्रिस(2-फेनिलपाइरिडीन)इरिडियम'),
  "Vaska's Complex": l10('バスカ錯体', '瓦斯卡配合物', 'Complexe de Vaska', 'Complejo de Vaska', 'Vaska-Komplex', 'Комплекс Васки', 'Complexo de Vaska', '바스카 착물', 'Complesso di Vaska', 'वास्का संकुल'),
  "Wilkinson's Catalyst": l10('ウィルキンソン触媒', '威尔金森催化剂', 'Catalyseur de Wilkinson', 'Catalizador de Wilkinson', 'Wilkinson-Katalysator', 'Катализатор Уилкинсона', 'Catalisador de Wilkinson', '윌킨슨 촉매', 'Catalizzatore di Wilkinson', 'विल्किन्सन उत्प्रेरक'),
  'Samarium Lexidronam': l10('サマリウム・レキシドロナム', '钐[153Sm]来昔决南', 'Samarium léxidronam', 'Samario lexidronam', 'Samarium-Lexidronam', 'Самарий лексидронам', 'Samário lexidronam', '사마륨 렉시드로남', 'Samario lexidronam', 'समारियम लेक्सिड्रोनम'),
  'Technetium Medronate': l10('テクネチウム・メドロネート', '锝[99mTc]亚甲基二膦酸盐', 'Médronate de technétium', 'Medronato de tecnecio', 'Technetium-Medronat', 'Медронат технеция', 'Medronato de tecnécio', '테크네튬 메드로네이트', 'Medronato di tecnezio', 'टेक्नीशियम मेड्रोनेट'),
  'Lutetium Lu 177 Dotatate': l10('ルテチウム(177Lu)ドタテート', '镥-177氧奥曲肽', 'Lutécium (177Lu) dotatate', 'Lutecio (177Lu) dotatate', 'Lutetium-177-Dotatate', 'Лютеций-177 дотатат', 'Lutécio-177 dotatato', '루테튬-177 도타테이트', 'Lutezio-177 dotatate', 'ल्यूटिशियम-177 डोटाटेट'),
  'Mercury(II) Fulminate': l10('雷酸水銀(II)', '雷酸汞(II)', 'Fulminate de mercure(II)', 'Fulminato de mercurio(II)', 'Quecksilber(II)-fulminat', 'Гремучая ртуть', 'Fulminato de mercúrio(II)', '뇌산수은(II)', 'Fulminato di mercurio(II)', 'मरकरी(II) फल्मिनेट'),
  'Nitrous Oxide': l10('亜酸化窒素（笑気ガス）', '一氧化二氮（笑气）', 'Protoxyde d’azote', 'Óxido nitroso', 'Distickstoffmonoxid (Lachgas)', 'Закись азота', 'Óxido nitroso', '아산화질소', 'Protossido di azoto', 'नाइट्रस ऑक्साइड'),
  'Nitric Oxide': l10('一酸化窒素', '一氧化氮', 'Monoxyde d’azote', 'Óxido nítrico', 'Stickstoffmonoxid', 'Оксид азота(II)', 'Óxido nítrico', '일산화질소', 'Monossido di azoto', 'नाइट्रिक ऑक्साइड'),
  'Vinyl Chloride': l10('塩化ビニル', '氯乙烯', 'Chlorure de vinyle', 'Cloruro de vinilo', 'Vinylchlorid', 'Винилхлорид', 'Cloreto de vinila', '염화비닐', 'Cloruro di vinile', 'विनाइल क्लोराइड'),
  'Adenosine Triphosphate (C₁₀H₁₆N₅O₁₃P₃)': l10('アデノシン三リン酸 (C₁₀H₁₆N₅O₁₃P₃)', '三磷酸腺苷 (C₁₀H₁₆N₅O₁₃P₃)', 'Adénosine triphosphate (C₁₀H₁₆N₅O₁₃P₃)', 'Trifosfato de adenosina (C₁₀H₁₆N₅O₁₃P₃)', 'Adenosintriphosphat (C₁₀H₁₆N₅O₁₃P₃)', 'Аденозинтрифосфат (C₁₀H₁₆N₅O₁₃P₃)', 'Trifosfato de adenosina (C₁₀H₁₆N₅O₁₃P₃)', '아데노신 삼인산 (C₁₀H₁₆N₅O₁₃P₃)', 'Adenosina trifosfato (C₁₀H₁₆N₅O₁₃P₃)', 'एडीनोसिन ट्राइफॉस्फेट (C₁₀H₁₆N₅O₁₃P₃)'),
  'Hydrokrypton Cyanide': l10('シアン化水素クリプトン', '氢氪化氰', 'Cyanure d’hydrokrypton', 'Cianuro de hidrokriptón', 'Hydrokryptoncyanid', 'Цианид гидроктриптона', 'Cianeto de hidrocriptônio', '수소크립톤 시안화물', 'Cianuro di idrokripton', 'हाइड्रोक्रिप्टॉन सायनाइड'),
  'Krypton Acetylide Hydride': l10('水素化クリプトンアセチリド', '氢乙炔化氪', 'Hydrure d’acétylure de krypton', 'Hidruro de acetiluro de kriptón', 'Kryptonacetylidhydrid', 'Гидрид-ацетилид криптона', 'Hidreto de acetileto de criptônio', '크립톤 아세틸라이드 수소화물', 'Idruro acetiluro di kripton', 'क्रिप्टॉन एसिटिलाइड हाइड्राइड'),
  'Technetium Pentacarbonyl Chloride': l10('ペンタカルボニル塩化テクネチウム', '五羰基氯化锝', 'Chlorure de pentacarbonyltechnétium', 'Cloruro de pentacarboniltecnecio', 'Technetiumpentacarbonylchlorid', 'Пентакарбонилхлорид технеция', 'Cloreto de pentacarboniltecnécio', '펜타카르보닐 염화테크네튬', 'Cloruro di pentacarboniltecnezio', 'टेक्नीशियम पेंटाकार्बोनिल क्लोराइड'),
  'Tris(bipyridine)ruthenium(II) Chloride': l10('トリス(ビピリジン)ルテニウム(II)塩化物', '三(联吡啶)合氯化钌(II)', 'Chlorure de tris(bipyridine)ruthénium(II)', 'Cloruro de tris(bipiridina)rutenio(II)', 'Tris(bipyridin)ruthenium(II)-chlorid', 'Хлорид трис(бипиридин)рутения(II)', 'Cloreto de tris(bipiridina)rutênio(II)', '트리스(비피리딘)루테늄(II) 염화물', 'Cloruro di tris(bipiridina)rutenio(II)', 'ट्रिस(बाइपाइरिडीन)रूथेनियम(II) क्लोराइड'),
  'Astatobenzene': l10('アスタトベンゼン', '砹苯', 'Astatobenzène', 'Astatobenceno', 'Astatbenzol', 'Астатобензол', 'Astatobenzeno', '아스타토벤젠', 'Astatobenzene', 'एस्टैटोबेंजीन'),
  'Hydrogen Astatide': l10('アスタチン化水素', '砹化氢', 'Astature d’hydrogène', 'Astaturo de hidrógeno', 'Wasserstoffastatid', 'Астатид водорода', 'Astateto de hidrogênio', '아스타틴화 수소', 'Astaturo di idrogeno', 'हाइड्रोजन एस्टैटाइड'),
  'Hydrogen Tennesside': l10('テネシン化水素', '鿬化氢', 'Tennessure d’hydrogène', 'Tennessuro de hidrógeno', 'Wasserstofftennessid', 'Теннессид водорода', 'Tennesseto de hidrogênio', '테네신화 수소', 'Tennessuro di idrogeno', 'हाइड्रोजन टेनेसाइड'),
  'Lanthanum Pentanickel': l10('ランタン五ニッケル', '五镍化镧', 'Pentanickel de lanthane', 'Pentaníquel de lantano', 'Lanthanpentanickel', 'Пентаникель лантана', 'Pentaníquel de lantânio', '란타넘 오니켈', 'Pentanichel di lantanio', 'लैंथेनम पेंटानिकेल'),
  'Praseodymium Pentanickel': l10('プラセオジム五ニッケル', '五镍化镨', 'Pentanickel de praséodyme', 'Pentaníquel de praseodimio', 'Praseodympentanickel', 'Пентаникель празеодима', 'Pentaníquel de praseodímio', '프라세오디뮴 오니켈', 'Pentanichel di praseodimio', 'प्रेज़ियोडिमियम पेंटानिकेल'),
  'Lawrencium Carbonyl': l10('ローレンシウムカルボニル', '羰基铹', 'Carbonyle de lawrencium', 'Carbonilo de laurencio', 'Lawrenciumcarbonyl', 'Карбонил лоуренсия', 'Carbonila de laurêncio', '로렌슘 카르보닐', 'Carbonile di laurenzio', 'लॉरेंसियम कार्बोनिल'),
  'Hexafluorodubnate(V) Complex': l10('ヘキサフルオロドブニウム(V)酸錯体', '六氟𬭊(V)酸根配合物', 'Complexe hexafluorodubnate(V)', 'Complejo hexafluorodubnato(V)', 'Hexafluorodubnat(V)-Komplex', 'Гексафтородубнатный(V) комплекс', 'Complexo hexafluorodubnato(V)', '헥사플루오로더브늄(V)산 착물', 'Complesso esafluorodubnato(V)', 'हेक्साफ्लोरोडब्नेट(V) संकुल'),
  'Hexafluororutherfordate(IV) Complex': l10('ヘキサフルオロラザホージウム(IV)酸錯体', '六氟𬬻(IV)酸根配合物', 'Complexe hexafluororutherfordate(IV)', 'Complejo hexafluororutherfordato(IV)', 'Hexafluororutherfordat(IV)-Komplex', 'Гексафторорезерфордатный(IV) комплекс', 'Complexo hexafluororutherfordato(IV)', '헥사플루오로러더포듐(IV)산 착물', 'Complesso esafluororutherfordato(IV)', 'हेक्साफ्लोरोरदरफोर्डेट(IV) संकुल'),
  'Astatate Anion': l10('アスタチン酸アニオン', '砹酸根阴离子', 'Anion astatate', 'Anión astatato', 'Astatat-Anion', 'Астатат-анион', 'Ânion astatato', '아스타틴산 음이온', 'Anione astatato', 'एस्टैटेट ऋणायन'),
  'Astanyl Cation': l10('アスタニルカチオン', '氧砹酰阳离子', 'Cation astanyle', 'Catión astanilo', 'Astanyl-Kation', 'Катион астанила', 'Cátion astanila', '아스타닐 양이온', 'Catione astanile', 'एस्टैनिल धनायन'),
  'Dihydroxoastatate(I) Ion': l10('ジヒドロキソアスタチン(I)酸イオン', '二羟基砹(I)酸根离子', 'Ion dihydroxoastatate(I)', 'Ion dihidroxoastatato(I)', 'Dihydroxoastatat(I)-Ion', 'Ион дигидроксоастатата(I)', 'Íon di-hidroxoastatato(I)', '디히드록소아스타틴(I)산 이온', 'Ione diidrossoastatato(I)', 'डाइहाइड्रॉक्सोएस्टैटेट(I) आयन'),
  'Seaborgate Anion': l10('シーボーギウム酸アニオン', '𬭳酸根阴离子', 'Anion seaborgate', 'Anión seaborgato', 'Seaborgat-Anion', 'Сиборгат-анион', 'Ânion seaborgato', '시보귬산 음이온', 'Anione seaborgato', 'सीबोर्गेट ऋणायन'),
  'Perbohrate Anion': l10('過ボーリウム酸アニオン', '高𬭛酸根阴离子', 'Anion perbohrate', 'Anión perborato', 'Perbohrat-Anion', 'Перборат-анион', 'Ânion perborato', '과보륨산 음이온', 'Anione perborato', 'परबोरेट ऋणायन'),
  'Tennessyl Cation': l10('テネシルカチオン', '鿬阳离子', 'Cation tennessyle', 'Catión tenesilo', 'Tennessyl-Kation', 'Катион теннессила', 'Cátion tenessila', '테네실 양이온', 'Catione tennessile', 'टेनेसिल धनायन'),
  // Noble gas & transactinide special complexes / dimers / clathrates
  'Disodium Helide': l10('ヘリウム化二ナトリウム', '氦化二钠', 'Héliure de disodium', 'Heliuro de disodio', 'Dinatriumhelid', 'Гелид динатрия', 'Helieto de dissódio', '헬륨화 이나트륨', 'Eliuro di disodio', 'डाइसोडियम हीलाइड'),
  'Helium Hydride Ion': l10('水素化ヘリウムイオン', '氢化氦离子', 'Ion hydrure d’hélium', 'Ion hidruro de helio', 'Heliumhydrid-Ion', 'Ион гидрида гелия', 'Íon hidreto de hélio', '수소화 헬륨 이온', 'Ione idruro di elio', 'हीलियम हाइड्राइड आयन'),
  'Neon Hydride Ion': l10('水素化ネオンイオン', '氢化氖离子', 'Ion hydrure de néon', 'Ion hidruro de neón', 'Neonhydrid-Ion', 'Ион гидрида неона', 'Íon hidreto de neônio', '수소화 네온 이온', 'Ione idruro di neon', 'निऑन हाइड्राइड आयन'),
  'Argonium Ion': l10('アルゴニウムイオン', '氢氩离子', 'Ion argonium', 'Ion argonio', 'Argonium-Ion', 'Ион аргония', 'Íon argônio', '아르고늄 이온', 'Ione argonio', 'आर्गोनियम आयन'),
  'Krypton Hydride Ion': l10('水素化クリプトンイオン', '氢化氪离子', 'Ion hydrure de krypton', 'Ion hidruro de kriptón', 'Kryptonhydrid-Ion', 'Ион гидрида криптона', 'Íon hidreto de criptônio', '수소화 크립톤 이온', 'Ione idruro di kripton', 'क्रिप्टॉन हाइड्राइड आयन'),
  'Radon Hydride Ion': l10('水素化ラドンイオン', '氢化氡离子', 'Ion hydrure de radon', 'Ion hidruro de radón', 'Radonhydrid-Ion', 'Ион гидрида радона', 'Íon hidreto de radônio', '수소화 라돈 이온', 'Ione idruro di radon', 'रेडॉन हाइड्राइड आयन'),
  'Krypton Monofluoride Cation': l10('一フッ化クリプトンカチオン', '一氟化氪阳离子', 'Cation monofluorure de krypton', 'Catión monofluoruro de kriptón', 'Kryptonmonofluorid-Kation', 'Катион монофторида криптона', 'Cátion monofluoreto de criptônio', '일플루오린화 크립톤 양이온', 'Catione monofluoruro di kripton', 'क्रिप्टॉन मोनोफ्लोराइड धनायन'),
  'Radon Monofluoride Cation': l10('一フッ化ラドンカチオン', '一氟化氡阳离子', 'Cation monofluorure de radon', 'Catión monofluoruro de radón', 'Radonmonofluorid-Kation', 'Катион монофторида радона', 'Cátion monofluoreto de radônio', '일플루오린화 라돈 양이온', 'Catione monofluoruro di radon', 'रेडॉन मोनोफ्लोराइड धनायन'),
  'Dihelium Cation': l10('二ヘリウムカチオン', '二氦阳离子', 'Cation dihélium', 'Catión dihelio', 'Dihelium-Kation', 'Катион дигелия', 'Cátion di-hélio', '이헬륨 양이온', 'Catione dielio', 'डाइहीलियम धनायन'),
  'Dineon Cation': l10('二ネオンカチオン', '二氖阳离子', 'Cation dinéon', 'Catión dineón', 'Dineon-Kation', 'Катион динеона', 'Cátion dineônio', '이네온 양이온', 'Catione dineon', 'डाइनिऑन धनायन'),
  'Diargon Cation': l10('二アルゴンカチオン', '二氩阳离子', 'Cation diargon', 'Catión diargón', 'Diargon-Kation', 'Катион диаргона', 'Cátion diargônio', '이아르곤 양이온', 'Catione diargon', 'डाइआर्गन धनायन'),
  'Dikrypton Cation': l10('二クリプトンカチオン', '二氪阳离子', 'Cation dikrypton', 'Catión dicriptón', 'Dikrypton-Kation', 'Катион дикриптона', 'Cátion dicriptônio', '이크립톤 양이온', 'Catione dikripton', 'डाइक्रिप्टॉन धनायन'),
  'Dioganesson Dimer': l10('オガネソン二量体', '二聚鿫', 'Dimère d’oganesson', 'Dímero de oganesón', 'Oganesson-Dimer', 'Димер оганесона', 'Dímero de oganessônio', '오가네손 이량체', 'Dimero di oganesson', 'डाइओगानेसन द्विलक'),
  'Oganesson–Xenon Dimer': l10('オガネソン–キセノン二量体', '鿫–氙二聚体', 'Dimère oganesson–xénon', 'Dímero oganesón–xenón', 'Oganesson-Xenon-Dimer', 'Димер оганесон–ксенон', 'Dímero oganessônio–xenônio', '오가네손–제논 이량체', 'Dimero oganesson–xeno', 'ओगानेसन–ज़ीनॉन द्विलक'),
  'Roentgenium–Gold Dimer': l10('レントゲニウム–金二量体', '𬬭–金二聚体', 'Dimère roentgenium–or', 'Dímero roentgenio–oro', 'Roentgenium-Gold-Dimer', 'Димер рентгений–золото', 'Dímero roentgênio–ouro', '뢴트게늄–금 이량체', 'Dimero roentgenio–oro', 'रॉन्टजेनियम–स्वर्ण द्विलक'),
  'Copernicium–Gold Intermetallic': l10('コペルニシウム–金金属間化合物', '鎶–金金属间化合物', 'Intermétallique copernicium–or', 'Intermetálico copernicio–oro', 'Copernicium-Gold-Intermetall', 'Интерметаллид коперниций–золото', 'Intermetálico copernício–ouro', '코페르니슘–금 금속간 화합물', 'Intermetallico copernicio–oro', 'कोपरनिसियम–स्वर्ण अंतरधात्विक'),
  'Flerovium–Gold Adsorbate': l10('フレロビウム–金吸着種', '𫓧–金吸附物', 'Adsorbat flérovium–or', 'Adsorbato flerovio–oro', 'Flerovium-Gold-Adsorbat', 'Адсорбат флеровия на золоте', 'Adsorbato fleróvio–ouro', '플레로븀–금 흡착체', 'Adsorbato flerovio–oro', 'फ्लेरोवियम–स्वर्ण अधिशोषित'),
  'Endohedral Helium Fullerene': l10('ヘリウム内包フラーレン', '内嵌氦富勒烯', 'Fullerène endoédrique d’hélium', 'Fulereno endoédrico de helio', 'Endohedrales Heliumfulleren', 'Эндоэдральный фуллерен гелия', 'Fulereno endoédrico de hélio', '내포 헬륨 풀러렌', 'Fullerene endoedrico di elio', 'अंतःफलकीय हीलियम फुलरीन'),
  'Endohedral Neon Fullerene': l10('ネオン内包フラーレン', '内嵌氖富勒烯', 'Fullerène endoédrique de néon', 'Fulereno endoédrico de neón', 'Endohedrales Neonfulleren', 'Эндоэдральный фуллерен неона', 'Fulereno endoédrico de neônio', '내포 네온 풀러렌', 'Fullerene endoedrico di neon', 'अंतःफलकीय निऑन फुलरीन'),
  'Endohedral Argon Fullerene': l10('アルゴン内包フラーレン', '内嵌氩富勒烯', 'Fullerène endoédrique d’argon', 'Fulereno endoédrico de argón', 'Endohedrales Argonfulleren', 'Эндоэдральный фуллерен аргона', 'Fulereno endoédrico de argônio', '내포 아르곤 풀러렌', 'Fullerene endoedrico di argon', 'अंतःफलकीय आर्गन फुलरीन'),
  'Endohedral Krypton Fullerene': l10('クリプトン内包フラーレン', '内嵌氪富勒烯', 'Fullerène endoédrique de krypton', 'Fulereno endoédrico de kriptón', 'Endohedrales Kryptonfulleren', 'Эндоэдральный фуллерен криптона', 'Fulereno endoédrico de criptônio', '내포 크립톤 풀러렌', 'Fullerene endoedrico di kripton', 'अंतःफलकीय क्रिप्टॉन फुलरीन'),
  'Helium–Neon Excimer': l10('ヘリウム–ネオン・エキシマ', '氦–氖准分子', 'Exciplexe hélium–néon', 'Excímero helio–neón', 'Helium-Neon-Excimer', 'Эксимер гелий–неон', 'Excímero hélio–neônio', '헬륨–네온 엑시머', 'Eccimero elio–neon', 'हीलियम–निऑन एक्साइमर'),
  'Helium–Neon Ion': l10('ヘリウム–ネオン分子イオン', '氦–氖分子离子', 'Ion hélium–néon', 'Ion helio–neón', 'Helium-Neon-Ion', 'Ион гелий–неон', 'Íon hélio–neônio', '헬륨–네온 이온', 'Ione elio–neon', 'हीलियम–निऑन आयन'),
  'Helium–Neon Exciplex': l10('ヘリウム–ネオン・エキサイプレックス', '氦–氖激基复合物', 'Exciplexe hélium–néon', 'Exciplexo helio–neón', 'Helium-Neon-Exciplex', 'Эксиплекс гелий–неон', 'Exciplexo hélio–neônio', '헬륨–네온 엑시플렉스', 'Ecciplesso elio–neon', 'हीलियम–निऑन एक्सिप्लेक्स'),
  'Argon–Helium Molecular Ion': l10('アルゴン–ヘリウム分子イオン', '氩–氦分子离子', 'Ion moléculaire argon–hélium', 'Ion molecular argón–helio', 'Argon-Helium-Molekülion', 'Молекулярный ион аргон–гелий', 'Íon molecular argônio–hélio', '아르곤–헬륨 분자 이온', 'Ione molecolare argon–elio', 'आर्गन–हीलियम आण्विक आयन'),
  'Argon–Neon Molecular Ion': l10('アルゴン–ネオン分子イオン', '氩–氖分子离子', 'Ion moléculaire argon–néon', 'Ion molecular argón–neón', 'Argon-Neon-Molekülion', 'Молекулярный ион аргон–неон', 'Íon molecular argônio–neônio', '아르곤–네온 분자 이온', 'Ione molecolare argon–neon', 'आर्गन–निऑन आण्विक आयन'),
  'Argon–Xenon Molecular Ion': l10('アルゴン–キセノン分子イオン', '氩–氙分子离子', 'Ion moléculaire argon–xénon', 'Ion molecular argón–xenón', 'Argon-Xenon-Molekülion', 'Молекулярный ион аргон–ксенон', 'Íon molecular argônio–xenônio', '아르곤–제논 분자 이온', 'Ione molecolare argon–xeno', 'आर्गन–ज़ीनॉन आण्विक आयन'),
  'Neon–Krypton Exciplex Ion': l10('ネオン–クリプトン励起錯体イオン', '氖–氪激基复合物离子', 'Ion exciplexe néon–krypton', 'Ion exciplexo neón–kriptón', 'Neon-Krypton-Exciplex-Ion', 'Эксиплексный ион неон–криптон', 'Íon exciplexo neônio–criptônio', '네온–크립톤 엑시플렉스 이온', 'Ione ecciplesso neon–kripton', 'निऑन–क्रिप्टॉन एक्सिप्लेक्स आयन'),
  'Lithium–Helium Van der Waals Molecule': l10('リチウム–ヘリウム・ファンデルワールス分子', '锂–氦范德华分子', 'Molécule de van der Waals lithium–hélium', 'Molécula de van der Waals litio–helio', 'Lithium-Helium-Van-der-Waals-Molekül', 'Ван-дер-ваальсова молекула литий–гелий', 'Molécula de van der Waals lítio–hélio', '리튬–헬륨 반데르발스 분자', 'Molecola di van der Waals litio–elio', 'लिथियम–हीलियम वैन डर वाल्स अणु'),
  'Helium Difluoride Complex': l10('二フッ化ヘリウム錯体', '二氟化氦配合物', 'Complexe difluorure d’hélium', 'Complejo difluoruro de helio', 'Heliumdifluorid-Komplex', 'Комплекс дифторида гелия', 'Complexo difluoreto de hélio', '이플루오린화 헬륨 착물', 'Complesso difluoruro di elio', 'हीलियम डाइफ्लोराइड संकुल'),
  'Neon Fluoride Excimer': l10('フッ化ネオン・エキシマ', '氟化氖准分子', 'Excimère fluorure de néon', 'Excímero fluoruro de neón', 'Neonfluorid-Excimer', 'Эксимер фторида неона', 'Excímero fluoreto de neônio', '플루오린화 네온 엑시머', 'Eccimero fluoruro di neon', 'निऑन फ्लोराइड एक्साइमर'),
  'Argon Fluoride Excimer': l10('フッ化アルゴン・エキシマ', '氟化氩准分子', 'Excimère fluorure d’argon', 'Excímero fluoruro de argón', 'Argonfluorid-Excimer', 'Эксимер фторида аргона', 'Excímero fluoreto de argônio', '플루오린화 아르곤 엑시머', 'Eccimero fluoruro di argon', 'आर्गन फ्लोराइड एक्साइमर'),
  'Argon Chloride Excimer': l10('塩化アルゴン・エキシマ', '氯化氩准分子', 'Excimère chlorure d’argon', 'Excímero cloruro de argón', 'Argonchlorid-Excimer', 'Эксимер хлорида аргона', 'Excímero cloreto de argônio', '염화 아르곤 엑시머', 'Eccimero cloruro di argon', 'आर्गन क्लोराइड एक्साइमर'),
  'Krypton Fluoride Excimer': l10('フッ化クリプトン・エキシマ', '氟化氪准分子', 'Excimère fluorure de krypton', 'Excímero fluoruro de kriptón', 'Kryptonfluorid-Excimer', 'Эксимер фторида криптона', 'Excímero fluoreto de criptônio', '플루오린화 크립톤 엑시머', 'Eccimero fluoruro di kripton', 'क्रिप्टॉन फ्लोराइड एक्साइमर'),
  'Neon Beryllium Oxide Complex': l10('ネオン–酸化ベリリウム錯体', '氖–氧化铍配合物', 'Complexe néon–oxyde de béryllium', 'Complejo neón–óxido de berilio', 'Neon-Berylliumoxid-Komplex', 'Комплекс неон–оксид бериллия', 'Complexo neônio–óxido de berílio', '네온–산화베릴륨 착물', 'Complesso neon–ossido di berillio', 'निऑन बेरिलियम ऑक्साइड संकुल'),
  'Argon Beryllium Oxide Complex': l10('アルゴン–酸化ベリリウム錯体', '氩–氧化铍配合物', 'Complexe argon–oxyde de béryllium', 'Complejo argón–óxido de berilio', 'Argon-Berylliumoxid-Komplex', 'Комплекс аргон–оксид бериллия', 'Complexo argônio–óxido de berílio', '아르곤–산화베릴륨 착물', 'Complesso argon–ossido di berillio', 'आर्गन बेरिलियम ऑक्साइड संकुल'),
  'Copper Argon Chloride Complex': l10('銅–アルゴン塩化物錯体', '铜氩氯配合物', 'Complexe chlorure de cuivre-argon', 'Complejo cloruro de cobre-argón', 'Kupfer-Argon-Chlorid-Komplex', 'Хлоридный комплекс медь–аргон', 'Complexo cloreto de cobre-argônio', '구리-아르곤 염화물 착물', 'Complesso cloruro di rame-argon', 'ताम्र आर्गन क्लोराइड संकुल'),
  'Radon Fluoridoantimonate Complex': l10('フルオロアンチモン酸ラドン錯体', '氟锑酸氡配合物', 'Complexe fluoroantimonate de radon', 'Complejo fluoroantimonato de radón', 'Radon-Fluoroantimonat-Komplex', 'Фтороантимонатный комплекс радона', 'Complexo fluoroantimonato de radônio', '플루오로안티모니산 라돈 착물', 'Complesso fluoroantimonato di radon', 'रेडॉन फ्लोरिडोएंटीमोनेट संकुल'),
  'Krypton Bis(pentafluoroorthotellurate)': l10('クリプトン・ビス(ペンタフルオロオルトテルル酸)', '双(五氟正碲酸)氪', 'Bis(pentafluoroorthotellurate) de krypton', 'Bis(pentafluoroorthotelurato) de kriptón', 'Krypton-bis(pentafluoroorthotellurat)', 'Бис(пентафтороортотеллурат) криптона', 'Bis(pentafluoroortotelurato) de criptônio', '크립톤 비스(펜타플루오로오르토텔루레이트)', 'Bis(pentafluoroortotellurato) di kripton', 'क्रिप्टॉन बिस(पेंटाफ्लोरोऑर्थोटेल्यूरेट)'),
  'Helium Clathrate Hydrate': l10('ヘリウム・クラスレートハイドレート', '氦笼形水合物', 'Hydrate de clathrate d’hélium', 'Hidrato de clatrato de helio', 'Helium-Clathrathydrat', 'Клатратный гидрат гелия', 'Hidrato de clatrato de hélio', '헬륨 포접 수화물', 'Idrato clatrato di elio', 'हीलियम क्लैथ्रेट हाइड्रेट'),
  'Neon Clathrate Hydrate': l10('ネオン・クラスレートハイドレート', '氖笼形水合物', 'Hydrate de clathrate de néon', 'Hidrato de clatrato de neón', 'Neon-Clathrathydrat', 'Клатратный гидрат неона', 'Hidrato de clatrato de neônio', '네온 포접 수화물', 'Idrato clatrato di neon', 'निऑन क्लैथ्रेट हाइड्रेट'),
  'Argon Clathrate Hydrate': l10('アルゴン・クラスレートハイドレート', '氩笼形水合物', 'Hydrate de clathrate d’argon', 'Hidrato de clatrato de argón', 'Argon-Clathrathydrat', 'Клатратный гидрат аргона', 'Hidrato de clatrato de argônio', '아르곤 포접 수화물', 'Idrato clatrato di argon', 'आर्गन क्लैथ्रेट हाइड्रेट'),
  'Krypton Clathrate Hydrate': l10('クリプトン・クラスレートハイドレート', '氪笼形水合物', 'Hydrate de clathrate de krypton', 'Hidrato de clatrato de kriptón', 'Krypton-Clathrathydrat', 'Клатратный гидрат криптона', 'Hidrato de clatrato de criptônio', '크립톤 포접 수화물', 'Idrato clatrato di kripton', 'क्रिप्टॉन क्लैथ्रेट हाइड्रेट'),
  'Radon Clathrate Hydrate': l10('ラドン・クラスレートハイドレート', '氡笼形水合物', 'Hydrate de clathrate de radon', 'Hidrato de clatrato de radón', 'Radon-Clathrathydrat', 'Клатратный гидрат радона', 'Hidrato de clatrato de radônio', '라돈 포접 수화물', 'Idrato clatrato di radon', 'रेडॉन क्लैथ्रेट हाइड्रेट'),
  'Radon–Phenol Clathrate': l10('ラドン–フェノール・クラスレート', '氡–苯酚笼形包合物', 'Clathrate radon–phénol', 'Clatrato radón–fenol', 'Radon-Phenol-Clathrat', 'Клатрат радон–фенол', 'Clatrato radônio–fenol', '라돈–페놀 포접화합물', 'Clatrato radon–fenolo', 'रेडॉन–फिनॉल क्लैथ्रेट'),
  'Radon–Sulfur Dioxide Clathrate': l10('ラドン–二酸化硫黄クラスレート', '氡–二氧化硫笼形包合物', 'Clathrate radon–dioxyde de soufre', 'Clatrato radón–dióxido de azufre', 'Radon-Schwefeldioxid-Clathrat', 'Клатрат радон–диоксид серы', 'Clatrato radônio–dióxido de enxofre', '라돈–이산화황 포접화합물', 'Clatrato radon–diossido di zolfo', 'रेडॉन–सल्फर डाइऑक्साइड क्लैथ्रेट'),
};

// Element/cation forms for systematic binary/ternary IUPAC names
// [name, genitiveDeForPrep = same] where Romance languages use "de <fr>"/"di <it>"/"de <es/pt>"
const CATIONS: Record<string, L10> = {
  Hydrogen: l10('水素', '氢', 'hydrogène', 'hidrógeno', 'Wasserstoff', 'водорода', 'hidrogênio', '수소', 'idrogeno', 'हाइड्रोजन'),
  Helium: l10('ヘリウム', '氦', 'hélium', 'helio', 'Helium', 'гелия', 'hélio', '헬륨', 'elio', 'हीलियम'),
  Lithium: l10('リチウム', '锂', 'lithium', 'litio', 'Lithium', 'лития', 'lítio', '리튬', 'litio', 'लिथियम'),
  Beryllium: l10('ベリリウム', '铍', 'béryllium', 'berilio', 'Beryllium', 'бериллия', 'berílio', '베릴륨', 'berillio', 'बेरिलियम'),
  Boron: l10('ホウ素', '硼', 'bore', 'boro', 'Bor', 'бора', 'boro', '붕소', 'boro', 'बोरॉन'),
  Carbon: l10('炭素', '碳', 'carbone', 'carbono', 'Kohlenstoff', 'углерода', 'carbono', '탄소', 'carbonio', 'कार्बन'),
  Nitrogen: l10('窒素', '氮', 'azote', 'nitrógeno', 'Stickstoff', 'азота', 'nitrogênio', '질소', 'azoto', 'नाइट्रोजन'),
  Oxygen: l10('酸素', '氧', 'oxygène', 'oxígeno', 'Sauerstoff', 'кислорода', 'oxigênio', '산소', 'ossigeno', 'ऑक्सीजन'),
  Fluorine: l10('フッ素', '氟', 'fluor', 'flúor', 'Fluor', 'фтора', 'flúor', '플루오린', 'fluoro', 'फ्लोरीन'),
  Neon: l10('ネオン', '氖', 'néon', 'neón', 'Neon', 'неона', 'neônio', '네온', 'neon', 'निऑन'),
  Sodium: l10('ナトリウム', '钠', 'sodium', 'sodio', 'Natrium', 'натрия', 'sódio', '나트륨', 'sodio', 'सोडियम'),
  Magnesium: l10('マグネシウム', '镁', 'magnésium', 'magnesio', 'Magnesium', 'магния', 'magnésio', '마그네슘', 'magnesio', 'मैग्नीशियम'),
  Aluminium: l10('アルミニウム', '铝', 'aluminium', 'aluminio', 'Aluminium', 'алюминия', 'alumínio', '알루미늄', 'alluminio', 'एल्युमिनियम'),
  Aluminum: l10('アルミニウム', '铝', 'aluminium', 'aluminio', 'Aluminium', 'алюминия', 'alumínio', '알루미늄', 'alluminio', 'एल्युमिनियम'),
  Silicon: l10('ケイ素', '硅', 'silicium', 'silicio', 'Silicium', 'кремния', 'silício', '규소', 'silicio', 'सिलिकॉन'),
  Phosphorus: l10('リン', '磷', 'phosphore', 'fósforo', 'Phosphor', 'фосфора', 'fósforo', '인', 'fosforo', 'फॉस्फोरस'),
  Phosphoryl: l10('ホスホリル', '磷酰', 'phosphoryle', 'fosforilo', 'Phosphoryl', 'фосфорила', 'fosforila', '포스포릴', 'fosforile', 'फॉस्फोरिल'),
  Sulfur: l10('硫黄', '硫', 'soufre', 'azufre', 'Schwefel', 'серы', 'enxofre', '황', 'zolfo', 'सल्फर'),
  Chlorine: l10('塩素', '氯', 'chlore', 'cloro', 'Chlor', 'хлора', 'cloro', '염소', 'cloro', 'क्लोरीन'),
  Argon: l10('アルゴン', '氩', 'argon', 'argón', 'Argon', 'аргона', 'argônio', '아르곤', 'argon', 'आर्गन'),
  Potassium: l10('カリウム', '钾', 'potassium', 'potasio', 'Kalium', 'калия', 'potássio', '칼륨', 'potassio', 'पोटैशियम'),
  Calcium: l10('カルシウム', '钙', 'calcium', 'calcio', 'Calcium', 'кальция', 'cálcio', '칼슘', 'calcio', 'कैल्शियम'),
  Scandium: l10('スカンジウム', '钪', 'scandium', 'escandio', 'Scandium', 'скандия', 'escândio', '스칸듐', 'scandio', 'स्कैंडियम'),
  Titanium: l10('チタン', '钛', 'titane', 'titanio', 'Titan', 'титана', 'titânio', '타이타늄', 'titanio', 'टाइटेनियम'),
  Vanadium: l10('バナジウム', '钒', 'vanadium', 'vanadio', 'Vanadium', 'ванадия', 'vanádio', '바나듐', 'vanadio', 'वैनेडियम'),
  Vanadyl: l10('バナジル', '氧钒', 'vanadyle', 'vanadilo', 'Vanadyl', 'ванадила', 'vanadila', '바나딜', 'vanadile', 'वैनेडिल'),
  Chromium: l10('クロム', '铬', 'chrome', 'cromo', 'Chrom', 'хрома', 'cromo', '크로뮴', 'cromo', 'क्रोमियम'),
  Manganese: l10('マンガン', '锰', 'manganèse', 'manganeso', 'Mangan', 'марганца', 'manganês', '망가니즈', 'manganese', 'मैंगनीज'),
  Iron: l10('鉄', '铁', 'fer', 'hierro', 'Eisen', 'железа', 'ferro', '철', 'ferro', 'आयरन (लोहा)'),
  Cobalt: l10('コバルト', '钴', 'cobalt', 'cobalto', 'Cobalt', 'кобальта', 'cobalto', '코발트', 'cobalto', 'कोबाल्ट'),
  Nickel: l10('ニッケル', '镍', 'nickel', 'níquel', 'Nickel', 'никеля', 'níquel', '니켈', 'nichel', 'निकेल'),
  Copper: l10('銅', '铜', 'cuivre', 'cobre', 'Kupfer', 'меди', 'cobre', '구리', 'rame', 'कॉपर (तांबा)'),
  Zinc: l10('亜鉛', '锌', 'zinc', 'zinc', 'Zink', 'цинка', 'zinco', '아연', 'zinco', 'जिंक (जस्ता)'),
  Gallium: l10('ガリウム', '镓', 'gallium', 'galio', 'Gallium', 'галлия', 'gálio', '갈륨', 'gallio', 'गैलियम'),
  Germanium: l10('ゲルマニウム', '锗', 'germanium', 'germanio', 'Germanium', 'германия', 'germânio', '저마늄', 'germanio', 'जर्मेनियम'),
  Arsenic: l10('ヒ素', '砷', 'arsenic', 'arsénico', 'Arsen', 'мышьяка', 'arsênio', '비소', 'arsenico', 'आर्सेनिक'),
  Selenium: l10('セレン', '硒', 'sélénium', 'selenio', 'Selen', 'селена', 'selênio', '셀레늄', 'selenio', 'सेलेनियम'),
  Bromine: l10('臭素', '溴', 'brome', 'bromo', 'Brom', 'брома', 'bromo', '브로민', 'bromo', 'ब्रोमीन'),
  Krypton: l10('クリプトン', '氪', 'krypton', 'kriptón', 'Krypton', 'криптона', 'criptônio', '크립톤', 'kripton', 'क्रिप्टॉन'),
  Rubidium: l10('ルビジウム', '铷', 'rubidium', 'rubidio', 'Rubidium', 'рубидия', 'rubídio', '루비듐', 'rubidio', 'रुबिडियम'),
  Strontium: l10('ストロンチウム', '锶', 'strontium', 'estroncio', 'Strontium', 'стронция', 'estrôncio', '스트론튬', 'stronzio', 'स्ट्रॉन्शियम'),
  Yttrium: l10('イットリウム', '钇', 'yttrium', 'itrio', 'Yttrium', 'иттрия', 'ítrio', '이트륨', 'ittrio', 'यिट्रियम'),
  Zirconium: l10('ジルコニウム', '锆', 'zirconium', 'circonio', 'Zirconium', 'циркония', 'zircônio', '지르코늄', 'zirconio', 'ज़िरकोनियम'),
  Zirconyl: l10('ジルコニル', '氧锆', 'zirconyle', 'circonilo', 'Zirconyl', 'цирконила', 'zirconila', '지르코닐', 'zirconile', 'ज़िरकोनिल'),
  Niobium: l10('ニオブ', '铌', 'niobium', 'niobio', 'Niob', 'ниобия', 'nióbio', '나이오븀', 'niobio', 'नायोबियम'),
  Molybdenum: l10('モリブデン', '钼', 'molybdène', 'molibdeno', 'Molybdän', 'молибдена', 'molibdênio', '몰리브데넘', 'molibdeno', 'मोलिब्डेनम'),
  Technetium: l10('テクネチウム', '锝', 'technétium', 'tecnecio', 'Technetium', 'технеция', 'tecnécio', '테크네튬', 'tecnezio', 'टेक्नीशियम'),
  Ruthenium: l10('ルテニウム', '钌', 'ruthénium', 'rutenio', 'Ruthenium', 'рутения', 'rutênio', '루테늄', 'rutenio', 'रूथेनियम'),
  Rhodium: l10('ロジウム', '铑', 'rhodium', 'rodio', 'Rhodium', 'родия', 'ródio', '로듐', 'rodio', 'रोडियम'),
  Palladium: l10('パラジウム', '钯', 'palladium', 'paladio', 'Palladium', 'палладия', 'paládio', '팔라듐', 'palladio', 'पैलेडियम'),
  Silver: l10('銀', '银', 'argent', 'plata', 'Silber', 'серебра', 'prata', '은', 'argento', 'सिल्वर (चांदी)'),
  Cadmium: l10('カドミウム', '镉', 'cadmium', 'cadmio', 'Cadmium', 'кадмия', 'cádmio', '카드뮴', 'cadmio', 'कैडमियम'),
  Indium: l10('インジウム', '铟', 'indium', 'indio', 'Indium', 'индия', 'índio', '인듐', 'indio', 'इंडियम'),
  Tin: l10('スズ', '锡', 'étain', 'estaño', 'Zinn', 'олова', 'estanho', '주석', 'stagno', 'टिन'),
  Antimony: l10('アンチモン', '锑', 'antimoine', 'antimonio', 'Antimon', 'сурьмы', 'antimônio', '안티모니', 'antimonio', 'एंटीमनी'),
  Tellurium: l10('テルル', '碲', 'tellure', 'telurio', 'Tellur', 'теллура', 'telúrio', '텔루륨', 'tellurio', 'टेल्यूरियम'),
  Iodine: l10('ヨウ素', '碘', 'iode', 'yodo', 'Iod', 'иода', 'iodo', '아이오딘', 'iodio', 'आयोडीन'),
  Xenon: l10('キセノン', '氙', 'xénon', 'xenón', 'Xenon', 'ксенона', 'xenônio', '제논', 'xeno', 'ज़ीनॉन'),
  Cesium: l10('セシウム', '铯', 'césium', 'cesio', 'Caesium', 'цезия', 'césio', '세슘', 'cesio', 'सीज़ियम'),
  Barium: l10('バリウム', '钡', 'baryum', 'bario', 'Barium', 'бария', 'bário', '바륨', 'bario', 'बेरियम'),
  Lanthanum: l10('ランタン', '镧', 'lanthane', 'lantano', 'Lanthan', 'лантана', 'lantânio', '란타넘', 'lantanio', 'लैंथेनम'),
  Cerium: l10('セリウム', '铈', 'cérium', 'cerio', 'Cer', 'церия', 'cério', '세륨', 'cerio', 'सीरियम'),
  Ceric: l10('セリウム(IV)', '铈(IV)', 'cérique', 'cérico', 'Cer(IV)', 'церия(IV)', 'cérico', '세륨(IV)', 'cerico', 'सेरिक'),
  Praseodymium: l10('プラセオジム', '镨', 'praséodyme', 'praseodimio', 'Praseodym', 'празеодима', 'praseodímio', '프라세오디뮴', 'praseodimio', 'प्रेज़ियोडिमियम'),
  Neodymium: l10('ネオジム', '钕', 'néodyme', 'neodimio', 'Neodym', 'неодима', 'neodímio', '네오디뮴', 'neodimio', 'नियोडिमियम'),
  Promethium: l10('プロメチウム', '钷', 'prométhium', 'prometio', 'Promethium', 'прометия', 'promécio', '프로메튬', 'promezio', 'प्रोमेथियम'),
  Samarium: l10('サマリウム', '钐', 'samarium', 'samario', 'Samarium', 'самария', 'samário', '사마륨', 'samario', 'समारियम'),
  Europium: l10('ユウロピウム', '铕', 'europium', 'europio', 'Europium', 'европия', 'európio', '유로퓸', 'europio', 'यूरोपियम'),
  Gadolinium: l10('ガドリニウム', '钆', 'gadolinium', 'gadolinio', 'Gadolinium', 'гадолиния', 'gadolínio', '가돌리늄', 'gadolinio', 'गैडोलिनियम'),
  Terbium: l10('テルビウム', '铽', 'terbium', 'terbio', 'Terbium', 'тербия', 'térbio', '터븀', 'terbio', 'टर्बियम'),
  Dysprosium: l10('ジスプロシウム', '镝', 'dysprosium', 'disprosio', 'Dysprosium', 'диспрозия', 'disprósio', '디스프로슘', 'disprosio', 'डिस्प्रोसियम'),
  Holmium: l10('ホルミウム', '钬', 'holmium', 'holmio', 'Holmium', 'гольмия', 'hólmio', '홀뮴', 'olmio', 'होल्मियम'),
  Erbium: l10('エルビウム', '铒', 'erbium', 'erbio', 'Erbium', 'эрбия', 'érbio', '에르븀', 'erbio', 'एर्बियम'),
  Thulium: l10('ツリウム', '铥', 'thulium', 'tulio', 'Thulium', 'тулия', 'túlio', '툴륨', 'tulio', 'थूलियम'),
  Ytterbium: l10('イッテルビウム', '镱', 'ytterbium', 'iterbio', 'Ytterbium', 'иттербия', 'itérbio', '이터븀', 'itterbio', 'यिट्टरबियम'),
  Lutetium: l10('ルテチウム', '镥', 'lutécium', 'lutecio', 'Lutetium', 'лютеция', 'lutécio', '루테튬', 'lutezio', 'ल्यूटिशियम'),
  Hafnium: l10('ハフニウム', '铪', 'hafnium', 'hafnio', 'Hafnium', 'гафния', 'háfnio', '하프늄', 'afnio', 'हैफनियम'),
  Hafnyl: l10('ハフニル', '氧铪', 'hafnyle', 'hafnilo', 'Hafnyl', 'гафнила', 'hafnila', '하프닐', 'afnile', 'हैफनिल'),
  Tantalum: l10('タンタル', '钽', 'tantale', 'tantalio', 'Tantal', 'тантала', 'tântalo', '탄탈럼', 'tantalio', 'टैंटलम'),
  Tungsten: l10('タングステン', '钨', 'tungstène', 'wolframio', 'Wolfram', 'вольфрама', 'tungstênio', '텅스텐', 'tungsteno', 'टंगस्टन'),
  Rhenium: l10('レニウム', '铼', 'rhénium', 'renio', 'Rhenium', 'рения', 'rênio', '레늄', 'renio', 'रेनियम'),
  Osmium: l10('オスミウム', '锇', 'osmium', 'osmio', 'Osmium', 'осмия', 'ósmio', '오스뮴', 'osmio', 'ऑस्मियम'),
  Iridium: l10('イリジウム', '铱', 'iridium', 'iridio', 'Iridium', 'иридия', 'irídio', '이리듐', 'iridio', 'इरिडियम'),
  Platinum: l10('白金', '铂', 'platine', 'platino', 'Platin', 'платины', 'platina', '백금', 'platino', 'प्लैटिनम'),
  Gold: l10('金', '金', 'or', 'oro', 'Gold', 'золота', 'ouro', '금', 'oro', 'गोल्ड (सोना)'),
  Mercury: l10('水銀', '汞', 'mercure', 'mercurio', 'Quecksilber', 'ртути', 'mercúrio', '수은', 'mercurio', 'मरकरी (पारा)'),
  Thallium: l10('タリウム', '铊', 'thallium', 'talio', 'Thallium', 'таллия', 'tálio', '탈륨', 'tallio', 'थैलियम'),
  Lead: l10('鉛', '铅', 'plomb', 'plomo', 'Blei', 'свинца', 'chumbo', '납', 'piombo', 'लेड (सीसा)'),
  Bismuth: l10('ビスマス', '铋', 'bismuth', 'bismuto', 'Bismut', 'висмута', 'bismuto', '비스무트', 'bismuto', 'बिस्मथ'),
  Polonium: l10('ポロニウム', '钋', 'polonium', 'polonio', 'Polonium', 'полония', 'polônio', '폴로늄', 'polonio', 'पोलोनियम'),
  Astatine: l10('アスタチン', '砹', 'astate', 'astato', 'Astat', 'астата', 'astato', '아스타틴', 'astato', 'एस्टैटीन'),
  Radon: l10('ラドン', '氡', 'radon', 'radón', 'Radon', 'радона', 'radônio', '라돈', 'radon', 'रेडॉन'),
  Francium: l10('フランシウム', '钫', 'francium', 'francio', 'Francium', 'франция', 'frâncio', '프랑슘', 'francio', 'फ्रांसियम'),
  Radium: l10('ラジウム', '镭', 'radium', 'radio', 'Radium', 'радия', 'rádio', '라듐', 'radio', 'रेडियम'),
  Actinium: l10('アクチニウム', '锕', 'actinium', 'actinio', 'Actinium', 'актиния', 'actínio', '악티늄', 'attinio', 'एक्टिनियम'),
  Thorium: l10('トリウム', '钍', 'thorium', 'torio', 'Thorium', 'тория', 'tório', '토륨', 'torio', 'थोरियम'),
  Protactinium: l10('プロトアクチニウム', '镤', 'protactinium', 'protactinio', 'Protactinium', 'протактиния', 'protactínio', '프로트악티늄', 'protoattinio', 'प्रोटैक्टिनियम'),
  Uranium: l10('ウラン', '铀', 'uranium', 'uranio', 'Uran', 'урана', 'urânio', '우라늄', 'uranio', 'यूरेनियम'),
  Uranyl: l10('ウラニル', '铀酰', 'uranyle', 'uranilo', 'Uranyl', 'уранила', 'uranila', '우라닐', 'uranile', 'यूरेनिल'),
  Neptunium: l10('ネプツニウム', '镎', 'neptunium', 'neptunio', 'Neptunium', 'нептуния', 'neptúnio', '넵투늄', 'nettunio', 'नेप्ट्यूनियम'),
  Neptunyl: l10('ネプツニル', '镎酰', 'neptunyle', 'neptunilo', 'Neptunyl', 'нептунила', 'neptunila', '넵투닐', 'nettunile', 'नेप्ट्यूनिल'),
  Plutonium: l10('プルトニウム', '钚', 'plutonium', 'plutonio', 'Plutonium', 'плутония', 'plutônio', '플루토늄', 'plutonio', 'प्लूटोनियम'),
  Americium: l10('アメリシウム', '镅', 'américium', 'americio', 'Americium', 'америция', 'amerício', '아메리슘', 'americio', 'अमेरीशियम'),
  Curium: l10('キュリウム', '锔', 'curium', 'curio', 'Curium', 'кюрия', 'cúrio', '퀴륨', 'curio', 'क्यूरियम'),
  Berkelium: l10('バークリウム', '锫', 'berkélium', 'berkelio', 'Berkelium', 'берклия', 'berquélio', '버클륨', 'berkelio', 'बर्केलियम'),
  Californium: l10('カリホルニウム', '锎', 'californium', 'californio', 'Californium', 'калифорния', 'califórnio', '칼리포르늄', 'californio', 'कैलिफोर्नियम'),
  Einsteinium: l10('アインスタイニウム', '锿', 'einsteinium', 'einstenio', 'Einsteinium', 'эйнштейния', 'einstênio', '아인슈타이늄', 'einsteinio', 'आइंस्टीनियम'),
  Fermium: l10('フェルミウム', '镄', 'fermium', 'fermio', 'Fermium', 'фермия', 'férmio', '페르뮴', 'fermio', 'फर्मियम'),
  Mendelevium: l10('メンデレビウム', '钔', 'mendélévium', 'mendelevio', 'Mendelevium', 'менделевия', 'mendelévio', '멘델레븀', 'mendelevio', 'मेंडेलीवियम'),
  Nobelium: l10('ノーベリウム', '锘', 'nobélium', 'nobelio', 'Nobelium', 'нобелия', 'nobélio', '노벨륨', 'nobelio', 'नोबेलियम'),
  Lawrencium: l10('ローレンシウム', '铹', 'lawrencium', 'laurencio', 'Lawrencium', 'лоуренсия', 'laurêncio', '로렌슘', 'laurenzio', 'लॉरेंसियम'),
  Rutherfordium: l10('ラザホージウム', '𬬻', 'rutherfordium', 'rutherfordio', 'Rutherfordium', 'резерфордия', 'rutherfórdio', '러더포듐', 'rutherfordio', 'रदरफोर्डियम'),
  Dubnium: l10('ドブニウム', '𬭊', 'dubnium', 'dubnio', 'Dubnium', 'дубния', 'dúbnio', '더브늄', 'dubnio', 'डब्नियम'),
  Seaborgium: l10('シーボーギウム', '𬭳', 'seaborgium', 'seaborgio', 'Seaborgium', 'сиборгия', 'seabórgio', '시보귬', 'seaborgio', 'सीबोर्गियम'),
  Bohrium: l10('ボーリウム', '𬭛', 'bohrium', 'bohrio', 'Bohrium', 'бория', 'bóhrio', '보륨', 'bohrio', 'बोरियम'),
  Hassium: l10('ハッシウム', '𬭶', 'hassium', 'hasio', 'Hassium', 'хассия', 'hássio', '하슘', 'hassio', 'हैसियम'),
  Meitnerium: l10('マイトネリウム', '𬭿', 'meitnérium', 'meitnerio', 'Meitnerium', 'мейтнерия', 'meitnério', '마이트너륨', 'meitnerio', 'माइटनेरियम'),
  Darmstadtium: l10('ダームスタチウム', '𫟼', 'darmstadtium', 'darmstatio', 'Darmstadtium', 'дармштадтия', 'darmstádio', '다름슈타튬', 'darmstadtio', 'डार्मस्टैडियम'),
  Roentgenium: l10('レントゲニウム', '𬬭', 'roentgenium', 'roentgenio', 'Roentgenium', 'рентгения', 'roentgênio', '뢴트게늄', 'roentgenio', 'रॉन्टजेनियम'),
  Copernicium: l10('コペルニシウム', '鎶', 'copernicium', 'copernicio', 'Copernicium', 'коперниция', 'copernício', '코페르니슘', 'copernicio', 'कोपरनिसियम'),
  Nihonium: l10('ニホニウム', '鿭', 'nihonium', 'nihonio', 'Nihonium', 'нихония', 'nihônio', '니호늄', 'nihonio', 'निहोनियम'),
  Flerovium: l10('フレロビウム', '𫓧', 'flérovium', 'flerovio', 'Flerovium', 'флеровия', 'fleróvio', '플레로븀', 'flerovio', 'फ्लेरोवियम'),
  Moscovium: l10('モスコビウム', '镆', 'moscovium', 'moscovio', 'Moscovium', 'московия', 'moscóvio', '모스코븀', 'moscovio', 'मॉस्कोवियम'),
  Livermorium: l10('リバモリウム', '𫟷', 'livermorium', 'livermorio', 'Livermorium', 'ливермория', 'livermório', '리버모륨', 'livermorio', 'लिवरमोरियम'),
  Tennessine: l10('テネシン', '鿬', 'tennesse', 'teneso', 'Tenness', 'теннессина', 'tenesso', '테네신', 'tennesso', 'टेनेसिन'),
  Oganesson: l10('オガネソン', '鿫', 'oganesson', 'oganesón', 'Oganesson', 'оганесона', 'oganessônio', '오가네손', 'oganesson', 'ओगानेसन'),
  Ammonium: l10('アンモニウム', '铵', 'ammonium', 'amonio', 'Ammonium', 'аммония', 'amônio', '암모늄', 'ammonio', 'अमोनियम'),
  Methyl: l10('メチル', '甲基', 'méthyle', 'metilo', 'Methyl', 'метила', 'metila', '메틸', 'metile', 'मिथाइल'),
  Trisodium: l10('三ナトリウム', '三钠', 'trisodium', 'trisodio', 'Trinatrium', 'тринатрия', 'trissódio', '삼나트륨', 'trisodio', 'ट्राइसोडियम'),
  Dibutyltin: l10('ジブチルスズ', '二丁基锡', 'dibutylétain', 'dibutilestaño', 'Dibutylzinn', 'дибутилолова', 'dibutilestanho', '디부틸주석', 'dibutilstagno', 'डाइब्यूटिलटिन'),
};

// Multi-word cation qualifiers (e.g. "Lithium Aluminium Hydride")
const COMPOUND_CATIONS: Record<string, L10> = {
  'Lithium Aluminium': l10('水素化アルミニウムリチウム', '氢化铝锂', 'aluminium et de lithium', 'litio y aluminio', 'Lithiumaluminium', 'лития-алюминия', 'lítio e alumínio', '리튬 알루미늄', 'litio e alluminio', 'लिथियम एल्युमिनियम'),
  'Lithium Iron': l10('リン酸鉄リチウム', '磷酸铁锂', 'fer et de lithium', 'litio y hierro', 'Lithiumeisen', 'лития-железа', 'lítio e ferro', '리튬 철', 'litio e ferro', 'लिथियम आयरन'),
  'Lithium Cobalt': l10('コバルト酸リチウム', '钴酸锂', 'cobalt et de lithium', 'litio y cobalto', 'Lithiumcobalt', 'лития-кобальта', 'lítio e cobalto', '리튬 코발트', 'litio e cobalto', 'लिथियम कोबाल्ट'),
  'Lead Zirconate': l10('チタン酸ジルコン酸鉛', '锆钛酸铅', 'plomb', 'plomo', 'Blei-Zirkonat', 'свинца', 'chumbo', '납 지르코네이트', 'piombo', 'लेड ज़िरकोनेट'),
  'Copper(II)': l10('銅(II)', '铜(II)', 'cuivre(II)', 'cobre(II)', 'Kupfer(II)', 'меди(II)', 'cobre(II)', '구리(II)', 'rame(II)', 'कॉपर(II)'),
};

// Stoichiometric prefixes attached to anion roots
const NUM_PREFIXES: { en: string; l10: L10 }[] = [
  { en: 'Hexadeca', l10: l10('十六', '十六', 'hexadéca', 'hexadeca', 'hexadeca', 'гексадека', 'hexadeca', '헥사데카', 'esadeca', 'हेक्साडेका') },
  { en: 'Dodeca', l10: l10('十二', '十二', 'dodéca', 'dodeca', 'dodeca', 'додека', 'dodeca', '도데카', 'dodeca', 'डोडेका') },
  { en: 'Hepta', l10: l10('七', '七', 'hepta', 'hepta', 'hepta', 'гепта', 'hepta', '헵타', 'epta', 'हेप्टा') },
  { en: 'Hexa', l10: l10('六', '六', 'hexa', 'hexa', 'hexa', 'гекса', 'hexa', '헥사', 'esa', 'हेक्सा') },
  { en: 'Octa', l10: l10('八', '八', 'octa', 'octa', 'octa', 'окта', 'octa', '옥타', 'otta', 'ऑक्टा') },
  { en: 'Penta', l10: l10('五', '五', 'penta', 'penta', 'penta', 'пента', 'penta', '펜타', 'penta', 'पेंटा') },
  { en: 'Tetra', l10: l10('四', '四', 'tétra', 'tetra', 'tetra', 'тетра', 'tetra', '테트라', 'tetra', 'टेट्रा') },
  { en: 'Deca', l10: l10('十', '十', 'déca', 'deca', 'deca', 'дека', 'deca', '데카', 'deca', 'डेका') },
  { en: 'Tri', l10: l10('三', '三', 'tri', 'tri', 'tri', 'три', 'tri', '트리', 'tri', 'ट्राइ') },
  { en: 'Di', l10: l10('二', '二', 'di', 'di', 'di', 'ди', 'di', '디', 'di', 'डाइ') },
  { en: 'Mono', l10: l10('一', '一', 'mono', 'mono', 'mono', 'моно', 'mono', '모노', 'mono', 'मोनो') },
  { en: 'Bi', l10: l10('重', '酸式', 'bi', 'bi', 'hydrogen', 'гидро', 'bi', '중', 'bi', 'बाइ') },
  { en: 'Oxy', l10: l10('オキシ', '氧', 'oxy', 'oxi', 'oxy', 'окси', 'oxi', '옥시', 'ossi', 'ऑक्सी') },
  { en: 'Per', l10: l10('過', '高', 'per', 'per', 'per', 'пер', 'per', '과', 'per', 'पर') },
  { en: 'Hypo', l10: l10('次亜', '次', 'hypo', 'hipo', 'hypo', 'гипо', 'hipo', '차아', 'ipo', 'हाइपो') },
  { en: 'Meta', l10: l10('メタ', '偏', 'méta', 'meta', 'meta', 'мета', 'meta', '메타', 'meta', 'मेटा') },
  { en: 'Ortho', l10: l10('オルト', '正', 'ortho', 'orto', 'ortho', 'орто', 'orto', '오르토', 'orto', 'ऑर्थो') },
  { en: 'Sub', l10: l10('亜', '碱式', 'sous-', 'sub', 'sub', 'суб', 'sub', '차', 'sub', 'सब') },
  { en: 'Thio', l10: l10('チオ', '硫代', 'thio', 'tio', 'thio', 'тио', 'tio', '티오', 'tio', 'थायो') },
];

// Core anion roots (note: JA/ZH use "X化<Cation>" for halides/chalcogenides/pnictides vs "X酸<Cation>" for oxyanions)
// We model anion entry with optional `prefixOrder` for JA/ZH/KO where Oxide -> 酸化 (Prefix + 酸化)
interface AnionDef {
  l10: L10;
  // For JA/ZH/KO: usually `numPrefix + root + cation`, e.g. 二酸化 + 炭素 -> 二酸化炭素
  // For FR/ES/PT/IT: `numPrefix + root + prep + cation`, e.g. dioxyde de carbone
  // For DE: `cation + numPrefix + root`, e.g. Kohlenstoffdioxid (lowercase root unless capitalized)
  // For RU: `numPrefix + root + cation(genitive)`, e.g. диоксид углерода
  // For HI: `cation + numPrefix + root`, e.g. कार्बन डाइऑक्साइड
}

const ANIONS: Record<string, AnionDef> = {
  oxide: { l10: l10('酸化', '氧化', 'oxyde', 'óxido', 'oxid', 'оксид', 'óxido', '산화', 'ossido', 'ऑक्साइड') },
  monoxide: { l10: l10('一酸化', '一氧化', 'monoxyde', 'monóxido', 'monoxid', 'моноксид', 'monóxido', '일산화', 'monossido', 'मोनोऑक्साइड') },
  tetroxide: { l10: l10('四酸化', '四氧化', 'tétroxyde', 'tetróxido', 'tetroxid', 'тетраоксид', 'tetróxido', '사산화', 'tetrossido', 'टेट्रॉक्साइड') },
  pentoxide: { l10: l10('五酸化', '五氧化', 'pentoxyde', 'pentóxido', 'pentoxid', 'пентаоксид', 'pentóxido', '오산화', 'pentossido', 'पेंटॉक्साइड') },
  heptoxide: { l10: l10('七酸化', '七氧化', 'heptoxyde', 'heptóxido', 'heptoxid', 'гептаоксид', 'heptóxido', '칠산화', 'eptossido', 'हेप्टॉक्साइड') },
  octoxide: { l10: l10('八酸化', '八氧化', 'octoxyde', 'octóxido', 'octoxid', 'октаоксид', 'octóxido', '팔산화', 'ottossido', 'ऑक्टॉक्साइड') },
  hydroxide: { l10: l10('水酸化', '氢氧化', 'hydroxyde', 'hidróxido', 'hydroxid', 'гидроксид', 'hidróxido', '수산화', 'idrossido', 'हाइड्रॉक्साइड') },
  oxyhydroxide: { l10: l10('オキシ水酸化', '羟基氧化', 'oxyhydroxyde', 'oxihidróxido', 'oxyhydroxid', 'оксигидроксид', 'oxi-hidróxido', '옥시수산화', 'ossidrossido', 'ऑक्सीहाइड्रॉक्साइड') },
  peroxide: { l10: l10('過酸化', '过氧化', 'peroxyde', 'peróxido', 'peroxid', 'пероксид', 'peróxido', '과산화', 'perossido', 'परॉक्साइड') },
  chloride: { l10: l10('塩化', '氯化', 'chlorure', 'cloruro', 'chlorid', 'хлорид', 'cloreto', '염화', 'cloruro', 'क्लोराइड') },
  fluoride: { l10: l10('フッ化', '氟化', 'fluorure', 'fluoruro', 'fluorid', 'фторид', 'fluoreto', '플루오린화', 'fluoruro', 'फ्लोराइड') },
  bromide: { l10: l10('臭化', '溴化', 'bromure', 'bromuro', 'bromid', 'бромид', 'brometo', '브로민화', 'bromuro', 'ब्रोमाइड') },
  iodide: { l10: l10('ヨウ化', '碘化', 'iodure', 'yoduro', 'iodid', 'иодид', 'iodeto', '아이오딘화', 'ioduro', 'आयोडाइड') },
  hydride: { l10: l10('水素化', '氢化', 'hydrure', 'hidruro', 'hydrid', 'гидрид', 'hidreto', '수소화', 'idruro', 'हाइड्राइड') },
  fluorohydride: { l10: l10('フッ化水素化物', '氟氢化物', 'fluorohydrure', 'fluorohidruro', 'fluorohydrid', 'фторогидрид', 'fluoro-hidreto', '플루오로수소화물', 'fluoroidruro', 'फ्लोरोहाइड्राइड') },
  sulfide: { l10: l10('硫化', '硫化', 'sulfure', 'sulfuro', 'sulfid', 'сульфид', 'sulfeto', '황화', 'solfuro', 'सल्फाइड') },
  oxysulfide: { l10: l10('酸硫化', '硫氧化', 'oxysulfure', 'oxisulfuro', 'oxysulfid', 'оксисульфид', 'oxissulfeto', '산황화', 'ossisolfuro', 'ऑक्सीसल्फाइड') },
  oxychloride: { l10: l10('オキシ塩化', '氧氯化', 'oxychlorure', 'oxicloruro', 'oxychlorid', 'оксихлорид', 'oxicloreto', '옥시염화', 'ossicloruro', 'ऑक्सीक्लोराइड') },
  oxyfluoride: { l10: l10('オキシフッ化', '氧氟化', 'oxyfluorure', 'oxifluoruro', 'oxyfluorid', 'оксифторид', 'oxifluoreto', '옥시플루오린화', 'ossifluoruro', 'ऑक्सीफ्लोराइड') },
  oxydichloride: { l10: l10('オキシ二塩化', '氧二氯化', 'oxydichlorure', 'oxidicloruro', 'oxydichlorid', 'оксидихлорид', 'oxidicloreto', '옥시이염화', 'ossidicloruro', 'ऑक्सीडाइक्लोराइड') },
  oxytetrafluoride: { l10: l10('オキシ四フッ化', '氧四氟化', 'oxytétrafluorure', 'oxitetrafluoruro', 'oxytetrafluorid', 'окситетрафторид', 'oxitetrafluoreto', '옥시사플루오린화', 'ossitetrafluoruro', 'ऑक्सीटेट्राफ्लोराइड') },
  oxytrichloride: { l10: l10('オキシ三塩化', '氧三氯化', 'oxytrichlorure', 'oxitricloruro', 'oxytrichlorid', 'окситрихлорид', 'oxitricloreto', '옥시삼염화', 'ossitricloruro', 'ऑक्सीट्राइक्लोराइड') },
  oxytribromide: { l10: l10('オキシ三臭化', '氧三溴化', 'oxytribromure', 'oxitribromuro', 'oxytribromid', 'окситрибромид', 'oxitribrometo', '옥시삼브로민화', 'ossitribromuro', 'ऑक्सीट्राइब्रोमाइड') },
  dioxydichloride: { l10: l10('二酸化二塩化', '二氧二氯化', 'dioxydichlorure', 'dioxidicloruro', 'dioxydichlorid', 'диоксидихлорид', 'dioxidicloreto', '이산화이염화', 'diossidicloruro', 'डाइऑक्सीडाइक्लोराइड') },
  dioxydifluoride: { l10: l10('二酸化二フッ化', '二氧二氟化', 'dioxydifluorure', 'dioxidifluoruro', 'dioxydifluorid', 'диоксидифторид', 'dioxidifluoreto', '이산화이플루오린화', 'diossidifluoruro', 'डाइऑक्सीडाइफ्लोराइड') },
  trioxychloride: { l10: l10('三酸化塩化', '三氧氯化', 'trioxychlorure', 'trioxicloruro', 'trioxychlorid', 'триоксихлорид', 'trioxicloreto', '삼산화염화', 'triossicloruro', 'ट्राइऑक्सीक्लोराइड') },
  trioxyfluoride: { l10: l10('三酸化フッ化', '三氧氟化', 'trioxyfluorure', 'trioxifluoruro', 'trioxyfluorid', 'триоксифторид', 'trioxifluoreto', '삼산화플루오린화', 'triossifluoruro', 'ट्राइऑक्सीफ्लोराइड') },
  selenide: { l10: l10('セレン化', '硒化', 'séléniure', 'seleniuro', 'selenid', 'селенид', 'seleneto', '셀레늄화', 'seleniuro', 'सेलेनाइड') },
  telluride: { l10: l10('テルル化', '碲化', 'tellurure', 'telururo', 'tellurid', 'теллурид', 'telureto', '텔루륨화', 'tellururo', 'टेल्यूराइड') },
  nitride: { l10: l10('窒化', '氮化', 'nitrure', 'nitruro', 'nitrid', 'нитрид', 'nitreto', '질화', 'nitruro', 'नाइट्राइड') },
  phosphide: { l10: l10('リン化', '磷化', 'phosphure', 'fosfuro', 'phosphid', 'фосфид', 'fosfeto', '인화', 'fosfuro', 'फॉस्फाइड') },
  arsenide: { l10: l10('ヒ化', '砷化', 'arséniure', 'arseniuro', 'arsenid', 'арсенид', 'arseneto', '비소화', 'arseniuro', 'आर्सेनाइड') },
  antimonide: { l10: l10('アンチモン化', '锑化', 'antimoniure', 'antimoniuro', 'antimonid', 'антимонид', 'antimoneto', '안티모니화', 'antimoniuro', 'एंटीमोनाइड') },
  carbide: { l10: l10('炭化', '碳化', 'carbure', 'carburo', 'carbid', 'карбид', 'carbeto', '탄화', 'carburo', 'कार्बाइड') },
  silicide: { l10: l10('ケイ化', '硅化', 'siliciure', 'siliciuro', 'silicid', 'силицид', 'siliceto', '규화', 'siliciuro', 'सिलिसाइड') },
  boride: { l10: l10('ホウ化', '硼化', 'borure', 'boruro', 'borid', 'борид', 'boreto', '붕화', 'boruro', 'बोराइड') },
  borohydride: { l10: l10('水素化ホウ素', '硼氢化', 'borohydrure', 'borohidruro', 'borhydrid', 'борогидрид', 'boroidreto', '붕수소화', 'boroidruro', 'बोरोहाइड्राइड') },
  hexafluorophosphate: { l10: l10('ヘキサフルオロリン酸', '六氟磷酸', 'hexafluorophosphate', 'hexafluorofosfato', 'hexafluorophosphat', 'гексафторофосфат', 'hexafluorofosfato', '헥사플루오로인산', 'esafluorofosfato', 'हेक्साफ्लोरोफॉस्फेट') },
  nitrate: { l10: l10('硝酸', '硝酸', 'nitrate', 'nitrato', 'nitrat', 'нитрат', 'nitrato', '질산', 'nitrato', 'नाइट्रेट') },
  oxynitrate: { l10: l10('オキシ硝酸', '氧硝酸', 'oxynitrate', 'oxinitrato', 'oxynitrat', 'оксинитрат', 'oxinitrato', '옥시질산', 'ossinitrato', 'ऑक्सीनाइट्रेट') },
  sulfate: { l10: l10('硫酸', '硫酸', 'sulfate', 'sulfato', 'sulfat', 'сульфат', 'sulfato', '황산', 'solfato', 'सल्फेट') },
  thiosulfate: { l10: l10('チオ硫酸', '硫代硫酸', 'thiosulfate', 'tiosulfato', 'thiosulfat', 'тиосульфат', 'tiossulfato', '티오황산', 'tiosolfato', 'थायोसल्फेट') },
  carbonate: { l10: l10('炭酸', '碳酸', 'carbonate', 'carbonato', 'carbonat', 'карбонат', 'carbonato', '탄산', 'carbonato', 'कार्बोनेट') },
  bicarbonate: { l10: l10('炭酸水素', '碳酸氢', 'bicarbonate', 'bicarbonato', 'hydrogencarbonat', 'гидрокарбонат', 'bicarbonato', '탄산수소', 'bicarbonato', 'बाइकार्बोनेट') },
  phosphate: { l10: l10('リン酸', '磷酸', 'phosphate', 'fosfato', 'phosphat', 'фосфат', 'fosfato', '인산', 'fosfato', 'फॉस्फेट') },
  oxyorthosilicate: { l10: l10('オキシオルトケイ酸', '氧正硅酸', 'oxyorthosilicate', 'oxiortosilicato', 'oxyorthosilicat', 'оксиортосиликат', 'oxiortossilicato', '옥시오르토규산', 'ossiortosilicato', 'ऑक्सीऑर्थोसिलिकेट') },
  silicate: { l10: l10('ケイ酸', '硅酸', 'silicate', 'silicato', 'silicat', 'силикат', 'silicato', '규산', 'silicato', 'सिलिकेट') },
  borate: { l10: l10('ホウ酸', '硼酸', 'borate', 'borato', 'borat', 'борат', 'borato', '붕산', 'borato', 'बोरेट') },
  chlorate: { l10: l10('塩素酸', '氯酸', 'chlorate', 'clorato', 'chlorat', 'хлорат', 'clorato', '염소산', 'clorato', 'क्लोरेट') },
  perchlorate: { l10: l10('過塩素酸', '高氯酸', 'perchlorate', 'perclorato', 'perchlorat', 'перхлорат', 'perclorato', '과염소산', 'perclorato', 'परक्लोरेट') },
  hypochlorite: { l10: l10('次亜塩素酸', '次氯酸', 'hypochlorite', 'hipoclorito', 'hypochlorit', 'гипохлорит', 'hipoclorito', '차아염소산', 'ipoclorito', 'हाइपोक्लोराइट') },
  bromate: { l10: l10('臭素酸', '溴酸', 'bromate', 'bromato', 'bromat', 'бромат', 'bromato', '브로민산', 'bromato', 'ब्रोमेट') },
  iodate: { l10: l10('ヨウ素酸', '碘酸', 'iodate', 'yodato', 'iodat', 'иодат', 'iodato', '아이오딘산', 'iodato', 'आयोडेट') },
  chromate: { l10: l10('クロム酸', '铬酸', 'chromate', 'cromato', 'chromat', 'хромат', 'cromato', '크로뮴산', 'cromato', 'क्रोमेट') },
  dichromate: { l10: l10('二クロム酸', '重铬酸', 'dichromate', 'dicromato', 'dichromat', 'дихромат', 'dicromato', '이중크로뮴산', 'dicromato', 'डाइक्रोमेट') },
  permanganate: { l10: l10('過マンガン酸', '高锰酸', 'permanganate', 'permanganato', 'permanganat', 'перманганат', 'permanganato', '과망가니즈산', 'permanganato', 'परमैंगनेट') },
  molybdate: { l10: l10('モリブデン酸', '钼酸', 'molybdate', 'molibdato', 'molybdat', 'молибдат', 'molibdato', '몰리브데넘산', 'molibdato', 'मोलिब्डेट') },
  heptamolybdate: { l10: l10('七モリブデン酸', '七钼酸', 'heptamolybdate', 'heptamolibdato', 'heptamolybdat', 'гептамолибдат', 'heptamolibdato', '헵타몰리브데넘산', 'eptamolibdato', 'हेप्टामोलिब्डेट') },
  tungstate: { l10: l10('タングステン酸', '钨酸', 'tungstate', 'wolframato', 'wolframat', 'вольфрамат', 'tungstato', '텅스텐산', 'tungstato', 'टंगस्टेट') },
  vanadate: { l10: l10('バナジン酸', '钒酸', 'vanadate', 'vanadato', 'vanadat', 'ванадат', 'vanadato', '바나듐산', 'vanadato', 'वैनेडेट') },
  metavanadate: { l10: l10('メタバナジン酸', '偏钒酸', 'métavanadate', 'metavanadato', 'metavanadat', 'метаванадат', 'metavanadato', '메타바나듐산', 'metavanadato', 'मेटावैनेडेट') },
  orthovanadate: { l10: l10('オルトバナジン酸', '正钒酸', 'orthovanadate', 'ortovanadato', 'orthovanadat', 'ортованадат', 'ortovanadato', '오르토바나듐산', 'ortovanadato', 'ऑर्थोवैनेडेट') },
  niobate: { l10: l10('ニオブ酸', '铌酸', 'niobate', 'niobato', 'niobat', 'ниобат', 'niobato', '나이오븀산', 'niobato', 'नायोबेट') },
  tantalate: { l10: l10('タンタル酸', '钽酸', 'tantalate', 'tantalato', 'tantalat', 'танталат', 'tantalato', '탄탈럼산', 'tantalato', 'टैंटलेट') },
  titanate: { l10: l10('チタン酸', '钛酸', 'titanate', 'titanato', 'titanat', 'титанат', 'titanato', '타이타늄산', 'titanato', 'टाइटेनेट') },
  zirconate: { l10: l10('ジルコン酸', '锆酸', 'zirconate', 'circonato', 'zirconat', 'цирконат', 'zirconato', '지르코늄산', 'zirconato', 'ज़िरकोनेट') },
  aluminate: { l10: l10('アルミン酸', '铝酸', 'aluminate', 'aluminato', 'aluminat', 'алюминат', 'aluminato', '알루민산', 'alluminato', 'एल्युमिनेट') },
  ferrite: { l10: l10('フェライト', '铁氧体', 'ferrite', 'ferrita', 'ferrit', 'феррит', 'ferrita', '페라이트', 'ferrite', 'फेराइट') },
  germanate: { l10: l10('ゲルマニウム酸', '锗酸', 'germanate', 'germanato', 'germanat', 'германат', 'germanato', '저마늄산', 'germanato', 'जर्मेनेट') },
  cyanide: { l10: l10('シアン化', '氰化', 'cyanure', 'cianuro', 'cyanid', 'цианид', 'cianeto', '시안화', 'cianuro', 'सायनाइड') },
  acetate: { l10: l10('酢酸', '乙酸', 'acétate', 'acetato', 'acetat', 'ацетат', 'acetato', '아세트산', 'acetato', 'एसीटेट') },
  oxalate: { l10: l10('シュウ酸', '草酸', 'oxalate', 'oxalato', 'oxalat', 'оксалат', 'oxalato', '옥살산', 'ossalato', 'ऑक्सालेट') },
  formate: { l10: l10('ギ酸', '甲酸', 'formiate', 'formiato', 'formiat', 'формиат', 'formiato', '포름산', 'formiato', 'फॉर्मेट') },
  stearate: { l10: l10('ステアリン酸', '硬脂酸', 'stéarate', 'estearato', 'stearat', 'стеарат', 'estearato', '스테아르산', 'stearato', 'स्टीयरेट') },
  triflate: { l10: l10('トリフラート', '三氟甲磺酸', 'triflate', 'triflato', 'triflat', 'трифлат', 'triflato', '트리플레이트', 'triflato', 'ट्राइफ्लेट') },
  carbonyl: { l10: l10('カルボニル', '羰基', 'carbonyle', 'carbonilo', 'carbonyl', 'карбонил', 'carbonila', '카르보닐', 'carbonile', 'कार्बोनिल') },
  stannate: { l10: l10('スズ酸', '锡酸', 'stannate', 'estannato', 'stannat', 'станнат', 'estanato', '주석산', 'stannato', 'स्टैनेट') },
  ruthenate: { l10: l10('ルテニウム酸', '钌酸', 'ruthénate', 'rutenato', 'ruthenat', 'рутенат', 'rutenato', '루테늄산', 'rutenato', 'रूथेनेट') },
  perruthenate: { l10: l10('過ルテニウム酸', '高钌酸', 'perruthénate', 'perrutenato', 'perruthenat', 'перрутенат', 'perrutenato', '과루테늄산', 'perrutenato', 'पररूथेनेट') },
  osmate: { l10: l10('オスミウム酸', '锇酸', 'osmate', 'osmiato', 'osmat', 'осмат', 'osmato', '오스뮴산', 'osmiato', 'ऑस्मेट') },
  perrhenate: { l10: l10('過レニウム酸', '高铼酸', 'perrhénate', 'perrenato', 'perrhenat', 'перренат', 'perrenato', '과레늄산', 'perrenato', 'पररेनेट') },
  pertechnetate: { l10: l10('過テクネチウム酸', '高锝酸', 'pertechnétate', 'pertecnetato', 'pertechnetat', 'пертехнетат', 'pertecnetato', '과테크네튬산', 'pertecnetato', 'परटेक्नीटेट') },
  tetrachloroaurate: { l10: l10('テトラクロロ金(III)酸', '四氯合金酸', 'tétrachloroaurate', 'tetracloroaurato', 'tetrachloroaurat', 'тетрахлороаурат', 'tetracloroaurato', '테트라클로로금산', 'tetracloroaurato', 'टेट्राक्लोरोऑरेट') },
  tetrachloropalladate: { l10: l10('テトラクロロパラジウム酸', '四氯合钯酸', 'tétrachloropalladate', 'tetracloropaladato', 'tetrachloropalladat', 'тетрахлоропалладат', 'tetracloropaladato', '테트라클로로팔라듐산', 'tetracloropalladato', 'टेट्राक्लोरोपैलेडेट') },
  tetrachloroplatinate: { l10: l10('テトラクロロ白金酸', '四氯合铂酸', 'tétrachloroplatinate', 'tetracloroplatinato', 'tetrachloroplatinat', 'тетрахлороплатинат', 'tetracloroplatinato', '테트라클로로백금산', 'tetracloroplatinato', 'टेट्राक्लोरोप्लैटिनेट') },
  hexachloroplatinate: { l10: l10('ヘキサクロロ白金酸', '六氯合铂酸', 'hexachloroplatinate', 'hexacloroplatinato', 'hexachloroplatinat', 'гексахлороплатинат', 'hexacloroplatinato', '헥사클로로백금산', 'esacloroplatinato', 'हेक्साक्लोरोप्लैटिनेट') },
  hexachloroiridate: { l10: l10('ヘキサクロロイリジウム酸', '六氯合铱酸', 'hexachloroiridate', 'hexacloroiridato', 'hexachloroiridat', 'гексахлороиридат', 'hexacloroiridato', '헥사클로로이리듐산', 'esacloroiridato', 'हेक्साक्लोरोइरिडेट') },
  hexachloroosmate: { l10: l10('ヘキサクロロオスミウム酸', '六氯合锇酸', 'hexachloroosmate', 'hexacloroosmiato', 'hexachloroosmat', 'гексахлороосмат', 'hexacloroosmato', '헥사클로로오스뮴산', 'esacloroosmiato', 'हेक्साक्लोरोऑस्मेट') },
  hexachlororhodate: { l10: l10('ヘキサクロロロジウム酸', '六氯合铑酸', 'hexachlororhodate', 'hexaclororodiato', 'hexachlororhodat', 'гексахлорородат', 'hexaclororodato', '헥사클로로로듐산', 'esaclororodiato', 'हेक्साक्लोरोरोडेट') },
  hexafluoroplatinate: { l10: l10('ヘキサフルオロ白金酸', '六氟合铂酸', 'hexafluoroplatinate', 'hexafluoroplatinato', 'hexafluoroplatinat', 'гексафтороплатинат', 'hexafluoroplatinato', '헥사플루오로백금산', 'esafluoroplatinato', 'हेक्साफ्लोरोप्लैटिनेट') },
  heptafluorotantalate: { l10: l10('ヘプタフルオロタンタル酸', '七氟钽酸', 'heptafluorotantalate', 'heptafluorotantalato', 'heptafluorotantalat', 'гептафторотанталат', 'heptafluorotantalato', '헵타플루오로탄탈럼산', 'eptafluorotantalato', 'हेप्टाफ्लोरोटैंटलेट') },
  triphosphate: { l10: l10('三リン酸', '三磷酸', 'triphosphate', 'trifosfato', 'triphosphat', 'трифосфат', 'trifosfato', '삼인산', 'trifosfato', 'ट्राइफॉस्फेट') },
  acetylide: { l10: l10('アセチリド（炭化）', '乙炔化', 'acétylure', 'acetiluro', 'acetylid', 'ацетилид', 'acetileto', '아세틸라이드', 'acetiluro', 'एसिटिलाइड') },
};

// Metal carbonyl cluster prefixes: e.g. "Iron Pentacarbonyl", "Dicobalt Octacarbonyl", "Triosmium Dodecacarbonyl"
const CLUSTER_CATIONS: Record<string, L10> = {
  Triuranium: l10('三ウラン', '三铀', 'triuranium', 'triuranio', 'Triuran', 'триурана', 'triurânio', '삼우라늄', 'triuranio', 'ट्राइयूरेनियम'),
  Dibohrium: l10('ジボーリウム', '二𬭛', 'dibohrium', 'dibohrio', 'Dibohrium', 'дибория', 'dibóhrio', '디보륨', 'dibohrio', 'डाइबोरियम'),
  Trihassium: l10('トリハッシウム', '三𬭶', 'trihassium', 'trihasio', 'Trihassium', 'трихассия', 'trihássio', '트리하슘', 'trihassio', 'ट्राइहैसियम'),
  Dicobalt: l10('ジコバルト', '八羰基二钴', 'dicobalt', 'dicobalto', 'Dicobalt', 'дикобальта', 'dicobalto', '디코발트', 'dicobalto', 'डाइकोबाल्ट'),
  Dirhenium: l10('ジレニウム', '十羰基二铼', 'dirhénium', 'dirrenio', 'Dirhenium', 'дирения', 'dirrênio', '디레늄', 'direnio', 'डाइरेनियम'),
  Triruthenium: l10('トリルテニウム', '十二羰基三钌', 'triruthénium', 'trirrutenio', 'Triruthenium', 'трирутения', 'trirutênio', '트리루테늄', 'trirutenio', 'ट्राइरूथेनियम'),
  Trisruthenium: l10('トリルテニウム', '十二羰基三钌', 'triruthénium', 'trirrutenio', 'Triruthenium', 'трирутения', 'trirutênio', '트리루테늄', 'trirutenio', 'ट्राइरूथेनियम'),
  Triosmium: l10('トリオスミウム', '十二羰基三锇', 'triosmium', 'triosmio', 'Triosmium', 'триосмия', 'triósmio', '트리오스뮴', 'triosmio', 'ट्राइऑस्मियम'),
  Trisiridium: l10('トリイリジウム', '十二羰基三铱', 'triiridium', 'triiridio', 'Triiridium', 'трииридия', 'triirídio', '트리이리듐', 'triiridio', 'ट्राइइरिडियम'),
  Tetrairidium: l10('テトライリジウム', '十二羰基四铱', 'tétrairidium', 'tetrairidio', 'Tetrairidium', 'тетраиридия', 'tetrairídio', '테트라이리듐', 'tetrairidio', 'टेट्राइरिडियम'),
  Hexarhodium: l10('ヘキサロジウム', '十六羰基六铑', 'hexarhodium', 'hexarrodio', 'Hexarhodium', 'гексародия', 'hexarródio', '헥사로듐', 'esarodio', 'हेक्सारोडियम'),
  Tetrameitnerium: l10('テトラマイトネリウム', '十二羰基四𬭿', 'tétrameitnérium', 'tetrameitnerio', 'Tetrameitnerium', 'тетрамейтнерия', 'tetrameitnério', '테트라마이트너륨', 'tetrameitnerio', 'टेट्रामाइटनेरियम'),
};

function capFirst(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function parseNumAndAnion(anionWord: string): { prefix: L10 | null; anion: AnionDef } | null {
  const lower = anionWord.toLowerCase();
  if (ANIONS[lower]) {
    return { prefix: null, anion: ANIONS[lower] };
  }
  for (const np of NUM_PREFIXES) {
    const pLower = np.en.toLowerCase();
    if (lower.startsWith(pLower)) {
      const rest = lower.slice(pLower.length);
      if (ANIONS[rest]) {
        return { prefix: np.l10, anion: ANIONS[rest] };
      }
    }
  }
  return null;
}

function getPrep(lang: 'fr' | 'es' | 'pt' | 'it', word: string): string {
  const w = word.toLowerCase();
  const startsVowel = /^[aeiouhéèêàáâíóôú]/i.test(w) || (lang === 'fr' && /^h/i.test(w));
  if (lang === 'fr') {
    return startsVowel ? "d'" : 'de ';
  }
  if (lang === 'it') {
    return startsVowel ? "d'" : 'di ';
  }
  return 'de ';
}

function composeBinary(
  cationL10: L10,
  numPrefix: L10 | null,
  anionL10: L10,
  oxSuffix: string,
  lang: NonCoreLanguage
): string {
  const c = cationL10[lang];
  const a = anionL10[lang];
  const p = numPrefix ? numPrefix[lang] : '';

  switch (lang) {
    case 'ja':
    case 'zh':
      return `${p}${a}${c}${oxSuffix}`;
    case 'ko':
      return `${p}${a} ${c}${oxSuffix}`;
    case 'de': {
      // e.g. Natriumchlorid, Kohlenstoffdioxid, Eisen(III)-oxid
      const catBase = c + oxSuffix;
      const tail = `${p}${a.toLowerCase()}`;
      return oxSuffix ? `${catBase}-${tail}` : `${catBase}${tail}`;
    }
    case 'ru': {
      const an = capFirst(`${p}${a}`);
      return `${an} ${c}${oxSuffix}`;
    }
    case 'hi': {
      const tail = `${p}${a}`;
      return `${c}${oxSuffix} ${tail}`;
    }
    case 'fr': {
      const an = capFirst(`${p}${a}`);
      const prep = getPrep('fr', c);
      return `${an} ${prep}${c}${oxSuffix}`;
    }
    case 'es': {
      const an = capFirst(`${p}${a}`);
      return `${an} de ${c}${oxSuffix}`;
    }
    case 'pt': {
      const an = capFirst(`${p}${a}`);
      return `${an} de ${c}${oxSuffix}`;
    }
    case 'it': {
      const an = capFirst(`${p}${a}`);
      const prep = getPrep('it', c);
      return `${an} ${prep}${c}${oxSuffix}`;
    }
  }
}

export function translateCompoundName(enName: string, lang: NonCoreLanguage): string {
  // 1. Extract trailing parenthetical qualifiers (possibly multiple, e.g. "(II) (Hematite/Rust)")
  let working = enName.trim();
  const parenTokens: string[] = [];

  // Pull trailing annotation parentheticals iteratively (preserve chemical parens like (0), (VIII), formulas)
  while (true) {
    const match = working.match(/\s*(\([^)]+\))\s*$/);
    if (!match) break;
    const rawParen = match[1];
    if (!PARENS_MAP[rawParen]) break;
    parenTokens.unshift(rawParen);
    working = working.slice(0, match.index).trim();
  }

  // Handle special known base names directly
  if (SPECIAL_COMPOUNDS[working]) {
    const base = SPECIAL_COMPOUNDS[working][lang];
    const translatedParens = parenTokens
      .map((p) => PARENS_MAP[p]?.[lang] ?? p)
      .join(' ');
    return translatedParens ? `${base} ${translatedParens}` : base;
  }

  // Handle "Lead Zirconate Titanate" -> PZT etc.
  if (working === 'Lead Zirconate Titanate') {
    const m = l10(
      'チタン酸ジルコン酸鉛',
      '锆钛酸铅',
      'Titano-zirconate de plomb',
      'Titanato circonato de plomo',
      'Blei-Zirkonat-Titanat',
      'Цинконат-титанат свинца',
      'Titanato zirconato de chumbo',
      '지르콘산 티탄산 납',
      'Titanato zirconato di piombo',
      'लेड ज़िरकोनेट टाइटेनेट'
    )[lang];
    const translatedParens = parenTokens.map((p) => PARENS_MAP[p]?.[lang] ?? p).join(' ');
    return translatedParens ? `${m} ${translatedParens}` : m;
  }

  // Handle multi-word special compounds that have trailing oxidation or suffixes e.g. "Lithium Aluminium Hydride"
  // Split off oxidation state on first token like "Iron(III) Oxide" -> cation="Iron", ox="(III)", rest="Oxide"
  let oxSuffix = '';
  const oxMatch = working.match(/^([A-Za-z]+)(\((?:I|II|III|IV|V|VI|VII|VIII|II,III|III,IV|0)\))\s+(.+)$/);
  let cationPart = '';
  let anionPart = '';

  if (oxMatch) {
    cationPart = oxMatch[1];
    oxSuffix = oxMatch[2];
    anionPart = oxMatch[3];
  } else {
    const parts = working.split(/\s+/);
    if (parts.length === 2) {
      cationPart = parts[0];
      anionPart = parts[1];
    } else if (parts.length === 3) {
      const twoWordCat = `${parts[0]} ${parts[1]}`;
      if (COMPOUND_CATIONS[twoWordCat]) {
        // Special three-word binary (e.g. Lithium Iron Phosphate, Lithium Cobalt Oxide)
        if (twoWordCat === 'Lithium Iron' && parts[2] === 'Phosphate') {
          return l10(
            'リン酸鉄リチウム',
            '磷酸铁锂',
            'Phosphate de fer et de lithium',
            'Fosfato de hierro y litio',
            'Lithiumeisenphosphat',
            'Фосфат лития-железа',
            'Fosfato de ferro e lítio',
            '인산철 리튬',
            'Fosfato di ferro e litio',
            'लिथियम आयरन फॉस्फेट'
          )[lang];
        }
        if (twoWordCat === 'Lithium Cobalt' && parts[2] === 'Oxide') {
          return l10(
            'コバルト酸リチウム',
            '钴酸锂',
            'Oxyde de lithium et de cobalt',
            'Óxido de litio y cobalto',
            'Lithiumcobaltoxid',
            'Оксид лития-кобальта',
            'Óxido de lítio e cobalto',
            '리튬 코발트 산화물',
            'Ossido di litio e cobalto',
            'लिथियम कोबाल्ट ऑक्साइड'
          )[lang];
        }
        if (twoWordCat === 'Lithium Aluminium' && parts[2] === 'Hydride') {
          return l10(
            '水素化アルミニウムリチウム',
            '四氢铝锂',
            'Hydrure de lithium et d’aluminium',
            'Hidruro de litio y aluminio',
            'Lithiumaluminiumhydrid',
            'Алюмогидрид лития',
            'Hidreto de lítio e alumínio',
            '수소화 알루미늄 리튬',
            'Idruro di litio e alluminio',
            'लिथियम एल्युमिनियम हाइड्राइड'
          )[lang];
        }
      }
      // Handle "Ammonium <X> <Y>" or "Cesium <X> <Y>" or "Sodium <X> <Y>" -> fallback check
      if (CATIONS[parts[0]] && CATIONS[parts[1]] && parseNumAndAnion(parts[2])) {
        const parsed = parseNumAndAnion(parts[2])!;
        const c1 = CATIONS[parts[0]][lang];
        const c2 = CATIONS[parts[1]][lang];
        const p = parsed.prefix ? parsed.prefix[lang] : '';
        const a = parsed.anion.l10[lang];
        if (lang === 'ja' || lang === 'zh') return `${p}${a}${c2}${c1}`;
        if (lang === 'ko') return `${p}${a} ${c2} ${c1}`;
        if (lang === 'de') return `${c1}${c2.toLowerCase()}${p}${a.toLowerCase()}`;
        if (lang === 'ru') return `${capFirst(`${p}${a}`)} ${c1}-${c2}`;
        if (lang === 'hi') return `${c1} ${c2} ${p}${a}`;
        if (lang === 'fr') return `${capFirst(`${p}${a}`)} de ${c1} et de ${c2}`;
        if (lang === 'it') return `${capFirst(`${p}${a}`)} di ${c1} e ${c2}`;
        return `${capFirst(`${p}${a}`)} de ${c1} e ${c2}`.replace(' e ', lang === 'es' ? ' y ' : ' e ');
      }
      // Handle "<Cation> Hydrogen <Anion>" like "Potassium Hydrogen Phosphate" or "Ammonium Dihydrogen Phosphate"
      if (CATIONS[parts[0]] && (parts[1] === 'Hydrogen' || parts[1] === 'Dihydrogen') && parseNumAndAnion(parts[2])) {
        const parsed = parseNumAndAnion(parts[2])!;
        const hyd = parts[1] === 'Dihydrogen'
          ? l10('二水素', '二氢', 'dihydrogéno', 'dihidrógeno', 'dihydrogen', 'дигидро', 'di-hidrogeno', '이수소', 'diidrogeno', 'डाइहाइड्रोजन')
          : l10('水素', '氢', 'hydrogéno', 'hidrógeno', 'hydrogen', 'гидро', 'hidrogeno', '수소', 'idrogeno', 'हाइड्रोजन');
        const c = CATIONS[parts[0]][lang];
        const a = parsed.anion.l10[lang];
        if (lang === 'ja' || lang === 'zh') return `${a}${hyd[lang]}${c}`;
        if (lang === 'ko') return `${a}${hyd[lang]} ${c}`;
        if (lang === 'de') return `${c}${hyd[lang]}${a.toLowerCase()}`;
        if (lang === 'ru') return `${capFirst(`${hyd[lang]}${a}`)} ${c}`;
        if (lang === 'hi') return `${c} ${hyd[lang]} ${a}`;
        if (lang === 'fr') return `${capFirst(`${hyd[lang]}${a}`)} ${getPrep('fr', c)}${c}`;
        if (lang === 'it') return `${capFirst(`${hyd[lang]}${a}`)} ${getPrep('it', c)}${c}`;
        return `${capFirst(`${hyd[lang]}${a}`)} de ${c}`;
      }
    }
  }

  // Handle Cluster Carbonyls e.g. "Dicobalt Octacarbonyl", "Triosmium Dodecacarbonyl"
  if (CLUSTER_CATIONS[cationPart] && parseNumAndAnion(anionPart)) {
    const parsed = parseNumAndAnion(anionPart)!;
    const base = composeBinary(CLUSTER_CATIONS[cationPart], parsed.prefix, parsed.anion.l10, oxSuffix, lang);
    const translatedParens = parenTokens.map((p) => PARENS_MAP[p]?.[lang] ?? p).join(' ');
    return translatedParens ? `${base} ${translatedParens}` : base;
  }

  // Standard 2-part systematic IUPAC name
  if (CATIONS[cationPart] && anionPart) {
    const parsed = parseNumAndAnion(anionPart);
    if (parsed) {
      const base = composeBinary(CATIONS[cationPart], parsed.prefix, parsed.anion.l10, oxSuffix, lang);
      const translatedParens = parenTokens.map((p) => PARENS_MAP[p]?.[lang] ?? p).join(' ');
      return translatedParens ? `${base} ${translatedParens}` : base;
    }
  }

  // Handle "<Cation> <NumPrefix> <Anion>" where e.g. "Cerium(IV) Oxide" already split oxSuffix, or "Silver Nitrate (AgNO3)"
  const translatedParens = parenTokens.map((p) => PARENS_MAP[p]?.[lang] ?? p).join(' ');
  return translatedParens ? `${working} ${translatedParens}` : working;
}
