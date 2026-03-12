// TypeScript types for modules.json data structure

/** Klausimo tipas – MCQ (numatytasis), matching, ordering, true-false, scenario */
export type QuestionType = 'mcq' | 'matching' | 'ordering' | 'true-false' | 'scenario';

/** Matching klausimo pora – kairė ir dešinė pusė */
export interface MatchPair {
  left: string;
  right: string;
}

export interface TestQuestion {
  id: string;
  /** Klausimo tipas. Jei nenurodyta – traktuojama kaip 'mcq' (backward compatible) */
  type?: QuestionType;
  question: string;
  // MCQ + Scenario fields
  options?: string[];
  correct?: number;
  // Matching fields
  matchPairs?: MatchPair[];
  // Ordering fields
  correctOrder?: string[];
  items?: string[];
  // True/False fields
  isTrue?: boolean;
  // Scenario fields
  scenarioContext?: string;
  // Common fields
  explanation: string;
  /** Užuomina – rodoma po pirmo neteisingmo bandymo (progressive hint) */
  hint?: string;
  /** Bloom taksonomijos lygis: 1=Remember, 2=Understand, 3=Apply, 4=Analyze, 5=Evaluate, 6=Create */
  bloomLevel?: number;
  /** Susijusios Modulio 1 skaidrės ID – remediation nuoroda */
  relatedSlideId?: number;
  /** Kategorija per-bloko vertinimui: meta, input, output, reasoning, quality, advanced, workflow, technikos */
  category?: string;
  /** Diagnostinė nuoroda, kai atsakymas neteisingas – žr. skaidrę X (Modulio 5 ir kt.) */
  ifWrongSee?: {
    moduleId: number;
    slideId: number;
    label: string;
  };
}

/** W1: vienas pasirinkimas šakotame scenarijuje – etiketė ir pasekmės tekstas */
export interface ScenarioBranchingChoice {
  label: string;
  consequence: string;
}

/** W1: šakotas scenarijus – klausimas ir 2–3 pasirinkimai su pasekmėmis */
export interface ScenarioBranching {
  question: string;
  choices: ScenarioBranchingChoice[];
}

export interface Scenario {
  context: string;
  data: string;
  constraints: string;
  expectedFormat: string;
  /** 2–3 sakiniai: persona, problema, kontekstas – rodomi virš scenarijaus skirtukų (M3 ir kt.) */
  situation?: string;
  /** Modulio 9 role-quest: optional įvedantis sakinys „Šią savaitę [Veikėjas] atlieka…“ */
  narrativeLead?: string;
  /** W1: optional šakotas scenarijus – pasirinkimai ir pasekmės */
  branching?: ScenarioBranching;
}

export interface InstructionStep {
  step: number;
  title: string;
  description: string;
  hint: string;
  partialSolution: string;
  /** Kada pereiti prie kito žingsnio (pvz. „Kada toliau: kai META blokas užpildytas“). */
  whenToProceed?: string;
}

export interface TaskInstructions {
  title: string;
  steps: InstructionStep[];
}

export interface PracticalTask {
  title: string;
  placeholder: string;
  motivation?: string;
  /** Aiški instrukcija, ką vesti į lauką (pvz. „Įveskite visą promptą – ne tik žodžius skliausteliuose“). */
  inputHint?: string;
  templateLabel?: string;
  template?: string;
  explanation?: string;
  instructions?: TaskInstructions;
  /** W2: leisti pažymėti užduotį atlikta be teksto įvedimo (mygtukas „Pažymėjau kaip atliktą“). */
  allowMarkWithoutAnswer?: boolean;
  /** W2: po atliktos užduoties – kopijuojamas refleksijos promptas (pvz. „Ką gavai iš DI?“). */
  feedbackPrompt?: string;
}

/** Vienas įrankis modalių grupėje (galima pažymėti rekomenduojamą, tooltip – hover) */
export interface DiModalityExample {
  name: string;
  url?: string;
  /** Pažymėti kaip rekomenduojamą įrankį šiai kategorijai */
  recommended?: boolean;
  /** Trumpas aprašymas (rodomas kaip title/tooltip ant nuorodos) */
  tooltip?: string;
}

/** Viena modalių grupė skaidrei „GPT –> TAI TRANSFORMERIAI“ (įvestis → išvestis) */
export interface DiModalityGroup {
  modality: string;
  tasks: string;
  description: string;
  examples: DiModalityExample[];
}

export interface DiModalitiesContent {
  title?: string;
  /** Trumpas įvadinis tekstas virš kategorijų (jei nėra – rodomas numatytas) */
  intro?: string;
  /** Santrauka apačioje: kaip rinktis įrankius (jei nėra – nerodoma) */
  takeaway?: string;
  /** „Toliau – skaidrė X“ (jei nėra – nerodoma) */
  footer?: string;
  /** Kiek kategorijų rodyti iš karto; likusios po „Rodyti daugiau“ (0 = rodyti visas) */
  showFirst?: number;
  groups: DiModalityGroup[];
}

/** Vienas segmentas skaidrei „Kam žmonės naudoja GPT?“ (pie diagrama) */
export interface PieChartSegment {
  label: string;
  value: number;
  /** Spalva pagal projekto paletę: brand, emerald, orange, rose, violet, amber, cyan, slate */
  colorKey?: string;
}

export interface PieChartContent {
  title?: string;
  subtitle?: string;
  /** „Toliau – skaidrė X“ (jei nėra – nerodoma) */
  footer?: string;
  segments: PieChartSegment[];
}

/** Viena kortelė intro-action-pie Fazėje 1 (kortų deck) – icon, title, description; eilė atitinka segments */
export interface IntroActionPieCard {
  /** Lucide ikonos pavadinimas (Pen, Wrench, Search, Code, Image, HelpCircle, Brain) – vektorinė ikona; arba emoji fallback */
  icon: string;
  /** Kortelės antraštė (pvz. „Rašymui“) */
  title: string;
  /** Trumpas aprašas skliaustuose (pvz. „laiškai, tekstai, postai, darbai“) */
  description?: string;
}

/** Vienas asmeninės atsakymo blokas atskleidimo fazėje – „Ką tai reiškia tau?“; eilė atitinka segments */
export interface IntroActionPieRevealInsight {
  /** Frazė sakinio „Tu patenki į X% [segmentPhrase] segmentą“ (pvz. „techninio naudojimo“); jei nėra – naudojamas segment.label */
  segmentPhrase?: string;
  /** Viena sakinio įžvalga (pvz. „Dauguma žmonių DI naudoja tekstams ir kasdieniams patarimams – ne technikai.“) */
  insight: string;
  /** Refleksyvus klausimas vartotojui (pvz. „Ar išnaudoji tik pagalbą klaidoms, ar ir architektūriniam mąstymui?“) */
  question: string;
  /** Pirmoji įžvalgos eilutė (pvz. „Tu esi 10% segmente: Techninė pagalba“) – jei nėra, naudojamas insight */
  line1?: string;
  /** Antroji įžvalgos eilutė (pvz. „Dauguma naudoja rašymui ir patarimams (40% + 24.1%)“) */
  line2?: string;
  /** Mini CTA etiketė (pvz. „Pamatyti, kaip išnaudoti techninę pagalbą“) – rodoma kaip link stilius */
  ctaLabel?: string;
  /** Mini CTA nuoroda (jei nėra – rodomas tik tekstas) */
  ctaHref?: string;
}

/** Atskleidžiamoji intro action skaidrė: quiz (vienas pasirinkimas) → CTA → atskleidžiamas pie chart + asmeninis atsakymas */
export interface IntroActionPieContent {
  /** Klausimas (pvz. „Kur tu dažniausiai naudoji DI?“) */
  question: string;
  /** Viena instrukcija po klausimo (pvz. „Pasirink vieną – palyginsi su 2026 m. duomenimis.“) */
  subtitle?: string;
  /** Mikro-hook (pvz. „2026 m. duomenys gali nustebinti.“) – neprivaloma */
  introHook?: string;
  /** CTA mygtuko tekstas (pvz. „Parodyk 2026 duomenis“) */
  ctaReveal?: string;
  /** „Toliau – skaidrė X“ (jei nėra – nerodoma) */
  footer?: string;
  /** Segmentai naudojami ir pasirinkimams, ir grafikui */
  segments: PieChartSegment[];
  /** Kortų deck Fazėje 1: ikonos, antraštės, aprašai (eilė = segments); jei nėra – rodomi tik segmentų label */
  cards?: IntroActionPieCard[];
  /** Atskleidimo fazė: asmeninės įžvalgos ir klausimai pagal pasirinktą segmentą (eilė = segments) */
  revealInsights?: IntroActionPieRevealInsight[];
}

/** Vieno segmento turinys Action PDF / „Generuok patarimus sau“ (7 segmentai = 7 įrašai) */
export interface IntroActionPiePdfSegment {
  /** Pvz. „Kaip pasitelkti DI rašymui?“ */
  title: string;
  /** 5 pedagogiškai aiškūs patarimai */
  top5Tips: string[];
  /** Pagrindinis įrankis – atitinka tools.json name */
  mainToolName: string;
  /** 2–3 papildomi įrankiai – tools.json name */
  additionalToolNames: string[];
  /** Workflow žingsniai su rodyklėmis (tekstas, pvz. „Tikslas → Rolė → Input → Output“) */
  workflowSteps: string[];
  /** 5 žodyno terminai – atitinka glossary.json term */
  glossaryTermNames: string[];
  /** Trumpas sisteminis promptas segmentui */
  systemPrompt: string;
  /** Motyvacinis palinkėjimas, brand Promptų anatomija */
  motivationWish: string;
}

/** Vienas bendras workflow etapas (Įvestis / Apdorojimas / Rezultatas) */
export interface AiWorkflowStage {
  step: number;
  title: string;
  items: string[];
}

/** Vienas pavyzdinis įrankių grandinės žingsnis (pvz. ChatGPT – Pradinis užklausas) */
export interface AiWorkflowStep {
  tool: string;
  description: string;
}

/** Viena pavyzdinė workflow grandinė (pvz. ChatGPT → Claude AI → Gamma App) */
export interface AiWorkflowExample {
  steps: AiWorkflowStep[];
}

export interface AiWorkflowContent {
  title?: string;
  subtitle?: string;
  /** Bendri etapai: 1. Įvestis, 2. Apdorojimas, 3. Rezultatas */
  stages?: AiWorkflowStage[];
  /** Trumpi workflow pavyzdžiai (įrankis → įrankis → …) */
  examples: AiWorkflowExample[];
}

/** Veiksmo intro skaidrė (Modulio 1 pirma skaidrė) – provokacija + micro-action + kontekstas.
 *  v2: perrašyta pagal vartotojo kelionės analizę (vartotojo_kelione.md) – emocinis hook, CTA hero viduje, 5-7s veiksmas. */
export interface ActionIntroContent {
  /** LXD: „Kas man iš to?“ vienu sakiniu – pirmame ekrane, virš hero (nauda prieš provokaciją). */
  whyBenefit?: string;
  /** Pagrindinė provokuojanti antraštė (pvz. "Ta pati užduotis.") */
  heroStat: string;
  /** Antroji antraštės eilutė – konfliktas (pvz. "Du visiškai skirtingi DI atsakymai.") */
  heroText: string;
  /** Trečia eilutė – paaiškinimas/diskomfortas (pvz. "Skirtumas – ne modelis. Skirtumas – prompto struktūra.") */
  heroSubText?: string;
  /** CTA mygtuko tekstas hero bloke (pvz. "Pamatyk skirtumą per 30 sekundžių!"). Jei nėra – default arba firstActionCTA. */
  ctaText?: string;
  /** Nestruktūruotas promptas – micro-action demo kairė pusė (neprivaloma – M10-style intro be „reveal“) */
  unstructuredPrompt?: string;
  /** Struktūruotas promptas – micro-action demo dešinė pusė (neprivaloma) */
  structuredPrompt?: string;
  /** Trumpas "Apie mokymą" tekstas – 1-2 sakiniai (neprivaloma) */
  aboutText?: string;
  /** Antraštė virš outcomes sąrašo (pvz. „Po šio modulio galėsi:“) – M4 action-intro */
  outcomesHeading?: string;
  /** Outcomes – 3–6 punktų (privaloma) */
  outcomes: string[];
  /** Įrankiai – apačioje išskleidžiamas blokas (neprivaloma – M10 be įrankių sąrašo) */
  tools?: {
    name: string;
    url?: string;
    /** Trumpas aprašymas įrankio (1–2 sakiniai) */
    description?: string;
    /** Populiariausi naudojimo atvejai (pvz. "Rašyti laiškus", "Santraukos") */
    useCases?: string[];
  }[];
  /** Intro tekstas virš įrankių bloko (pvz. "6 blokų principai veikia bet kuriame iš šių įrankių.") */
  toolsIntro?: string;
  /** Trukmės tekstas (pvz. "3 moduliai, ~45 min") (neprivaloma) */
  duration?: string;
  /** Auditorija – vienas sakinys, kam skirta (User Journey: rodyti intro skaidrėje) */
  audience?: string;
  /** Pirmas veiksmas per ~1 min – vienas sakinys (User Journey: aiškus pirmas žingsnis) */
  firstActionCTA?: string;
  /** Sandbox pranešimas – „treniruoklis, galite klysti“ (ROADMAP, VARTOTOJU_ATSILIEPIMAI) */
  sandboxMessage?: string;
  /** Pažadas dėl parsisiunčiamos PDF atmintinės (pvz. M5 – rodomas po reveal) */
  handoutPromise?: string;
  /** „Kaip naudoti šį modulį“ – minimalus vs pilnas kelias (PEDAGOGINE_ANALIZE §2.8). Rodomas kaip terms blokas. */
  howToUseModule?: {
    heading?: string;
    /** Viena pastraipa arba items naudojami kaip sąrašas */
    body?: string;
    items?: string[];
  };
}

/** Viena kelionės pasirinkimo kortelė – Modulio 7 action-intro-journey */
export interface JourneyChoice {
  id: string;
  /** Pavadinimas (pvz. "Pardavimai") */
  label: string;
  /** Paaiškinimas arba sritis (pvz. "Duomenų analitikas") */
  subtitle: string;
  /** Lucide ikonos pavadinimas (pvz. "TrendingUp") – optional vizualui */
  icon?: string;
}

/** Kelionės pasirinkimo intro (Modulio 7 pirmoji skaidrė) – hook + pasirink savo kelionę + CTA */
export interface ActionIntroJourneyContent {
  whyBenefit?: string;
  heroStat: string;
  heroText: string;
  heroSubText?: string;
  /** Antraštė virš pasirinkimų (pvz. "Pasirink savo kelionę") */
  journeyHeading?: string;
  journeyChoices: JourneyChoice[];
  /** Patvirtinimo tekstas po pasirinkimo (pvz. "Tu pasirinkai: …") – naudojamas su {label} placeholder */
  confirmMessage?: string;
  /** Mygtuko tekstas po pasirinkimo (pvz. "Pradėti kelionę") */
  ctaContinue?: string;
}

/** Įvado skaidrė (Modulio 1) – content-driven; jei content nėra – IntroSlide naudoja hardcoded. P2 skaidrių tipų analizė §4.1 */
export interface IntroContent {
  /** Apie šį mokymą – 1–2 pastraipos */
  aboutText: string;
  /** Įrankiai su nuorodomis (ChatGPT, Claude, …) */
  tools: { name: string; url?: string }[];
  /** Po šio mokymo galėsite – 3–6 punktai */
  outcomes: string[];
  /** Optional: „Svarbu“ / tools tip (pvz. apie promptų struktūrą) */
  toolsTip?: string;
  /** Optional: Praktinė užduotis – 1–2 sakiniai */
  tip?: string;
}

/** Modulio įvado skaidrė (pvz. Modulis 4) – „Po šio modulio galėsite“ + „Kodėl konteksto inžinerija?“ */
export interface ModuleIntroContent {
  /** 5–6 punktai, ką išmoks dalyvis */
  learningOutcomes: string[];
  /** 2–3 sakiniai: kodėl šis lygis svarbus */
  whyAdvanced: string;
  /** Pasirenkama: motyvuojantis ryšys su Moduliu 1 (rodomas apačioje) */
  connectionToModule1?: string;
}

/** Viena įrankių grandinės kortelė – „Pavyzdžiai iš praktikos“ (List Cards) */
export interface WorkflowChainItem {
  /** Įrankiai grandinėje (pvz. ["GPT", "Zapier", "Gmail"]) */
  chain: string[];
  /** Eiga: 2 arba 3 žingsniai (pvz. ["Automatizavimas", "Siuntimas"]) */
  flow: string[];
  /** Kategorijos žyma (Turinys, Dizainas, Planavimas, Automatizacija, Video) */
  tag?: string;
  /** Optional: expand bloko „Ką duodi?“ (max 1–2 eilutės) */
  expandInput?: string;
  /** Optional: expand bloko „Ką gauni?“ (max 1–2 eilutės) */
  expandOutput?: string;
}

/** Pasirinktinai: stiprybės badge ir „Best for“ eilutė įrankių palyginimo lentelėje (skaidrė 53); sprendimo matricoje – spalvotas sprendimo tipas (Memory/Dokumentai) */
export interface ContentBlockTableRowMeta {
  /** Trumpas stiprybės badge (pvz. „Universalumas“) – rodomas spalvotu badge */
  strengthBadge?: string;
  /** „Geriausiai tinka“ viena eilutė po įrankio pavadinimu (pvz. „Kasdienis asistentas“) */
  bestFor?: string;
  /** Badge spalva: atitinka įrankio vizualinį identitetą (ChatGPT mėlynas, Claude žalias ir t.t.) */
  badgeVariant?: 'blue' | 'green' | 'violet' | 'yellow' | 'orange';
  /** Kai true – eilutė rodoma kaip įspėjimas / klaidos zona (pvz. „Memory gali būti netikslu“) */
  isWarning?: boolean;
}

/** Lentelė content-block sekcijoje (pvz. RL vs RLHF palyginimas) */
export interface ContentBlockTable {
  /** Stulpelių antraštės */
  headers: string[];
  /** Eilučių duomenys – kiekviena eilutė yra masyvas langelių (ilgis = headers.length) */
  rows: string[][];
  /** Kai true – palyginimo stiliai: skirtingi header fonai, didesnis padding, paskutinės eilutės paryškinimas */
  comparisonStyle?: boolean;
  /** Kai true – sprendimo matricos stilius: didesnis eilučių tarpas (py-5), zebra (kas antra eilutė pilkesnė) */
  solutionMatrixStyle?: boolean;
  /** Pasirinktinai: papildoma info eilutei (stiprybės badge, bestFor, isWarning) – ilgis = rows.length */
  rowMeta?: ContentBlockTableRowMeta[];
}

/** Bendras turinio blokas (antraštė + tekstas + optional vizualas) – Modulio 4 ir kt. skaidrėms pagal SOT */
export interface ContentBlockSection {
  heading?: string;
  /** Tekstas; **tekstas** rodomas paryškintai. Gali būti tuščias, jei naudojama tik section.table */
  body: string;
  /** Jei nurodyta – rodomas CopyButton su šiuo tekstu (pvz. anti-haliucinacinis šablonas, 5 taisyklės). MUST M3 */
  copyable?: string;
  /** Kai true – sekcija rodoma kaip „accordion“ (paspaudžiamas blokas) */
  collapsible?: boolean;
  /** Kai true – collapsible sekcija pradžioje suskleista (default: true) */
  collapsedByDefault?: boolean;
  /** Nuoroda į vaizdą (pvz. /diagram.png) – rodomas virš teksto arba po antraštės */
  image?: string;
  /** Alt tekstas pritaikomumui */
  imageAlt?: string;
  /** Figma embed URL – rodomas kaip iframe (pvz. Schema 3 architektūra) */
  figmaUrl?: string;
  /** Bloko stilius: brand – pagrindinė info, accent – CTA/esminė žinutė, terms – žodynėlis (slate), default – neutralus */
  blockVariant?: 'brand' | 'accent' | 'terms' | 'default';
  /** Kai true – sekcija rodo įrankius (section.presentationTools arba content.presentationTools) */
  presentationToolsBlock?: boolean;
  /** Pasirenkama: šios sekcijos įrankiai (viršija content.presentationTools) – M5 logika: DI pirmiausia, paskui prez. */
  presentationTools?: ContentBlockPresentationTool[];
  /** Pasirenkama lentelė – rodoma po antraštės (pvz. RL vs RLHF palyginimas) */
  table?: ContentBlockTable;
  /** Pasirenkama: pasirinkimo juosta virš lentelės „Ką darai dabar?“ – rowIndex atitinka table.rows eilutę (skaidrė 53) */
  toolChoiceBar?: {
    /** Klausimas virš mygtukų (pvz. „Ką darai dabar?“) */
    question?: string;
    choices: { label: string; rowIndex: number }[];
  };
  /** Pasirenkama: workflow grandinės (List Cards) – naudoti vietoj table, kai blokas „Pavyzdžiai iš praktikos“ */
  workflowChains?: WorkflowChainItem[];
}

/** Vienas palyginimo vaizdas – src, antraštė, paaiškinimas, šaltinis */
export interface ContentBlockComparisonImage {
  src: string;
  /** Antraštė po paveikslu */
  label?: string;
  /** Paaiškinimas 1–2 sakiniais (non-tech) */
  explanation?: string;
  /** Šaltinis (mažu šriftu) */
  source?: string;
}

/** Palyginimo vaizdai (pvz. DI visata vs Paradizas/Dante) – rodomi viršuje content-block skaidrės */
export interface ContentBlockComparisonImages {
  /** Pasirenkama: vienas sakinys virš kortelių, jungiantis abu vaizdus (pvz. Dantė–DI hierarchijos analogija) */
  bridgeText?: string;
  left: ContentBlockComparisonImage;
  right: ContentBlockComparisonImage;
}

/** Atpažinimo pratimas – pvz. DI visatos sluoksnių atpažinimas */
export interface RecognitionExercise {
  title: string;
  task: string;
  examples: string[];
  choices: string[];
  /** Teisingi atsakymai pagal pavyzdžius (choices indeksas): correctAnswers[i] = teisingas choice index pavyzdžiui i */
  correctAnswers: number[];
  /** Pasirenkama: trumpas paaiškinimas kiekvienam pavyzdžiui, kodėl teisingas atsakymas – rodomas neteisingai atsakius */
  explanations?: string[];
  goal: string;
}

/** Vienas workflow vaizdas (pvz. inžinerijos pavyzdys) – skaidrė „4 dedamosios“ */
export interface ContentBlockWorkflowImage {
  src: string;
  alt?: string;
  label?: string;
  /** Pasirenkama: hover tooltip su papildomu paaiškinimu */
  tooltip?: string;
}

/** Prezentacijų įrankis – nuoroda + kam tinka (skaidrė „8 skaidrių prezentacija“) */
export interface ContentBlockPresentationTool {
  name: string;
  url: string;
  /** Kam ir kada naudoti (pvz. „Mokymams, vadovams“) */
  forWhom: string;
}

/** InstructGPT kokybės analizės statistikos elementas (content-block su instructGptQuality, pvz. skaidrė id 44) */
export interface InstructGptQualityStat {
  label: string;
  value: string;
  detail: string;
  colorKey: 'accent' | 'emerald' | 'violet' | 'slate';
}

/** InstructGPT delta eilutė (1.5B → 175B pokytis) */
export interface InstructGptQualityDelta {
  model: string;
  start: string;
  end: string;
  change: string;
  colorKey: 'accent' | 'emerald' | 'violet' | 'slate' | 'rose';
}

/** InstructGPT kokybės vizualizacijos blokas (stats, chart, delta, insight) */
export interface InstructGptQualityBlock {
  stats: InstructGptQualityStat[];
  chartData: { model: string; points: { x: string; y: number }[]; colorKey: string }[];
  deltaRows: InstructGptQualityDelta[];
  insight: string;
  scaleNote?: string;
}

export type InteractivePipelineMode = 'prompt' | 'context';

export interface InteractivePipelineStep {
  id: string;
  title: string;
  shortHint: string;
  description: string;
  examplePrompt: string;
  withoutContext: string;
  withContext: string;
  availableInModes: InteractivePipelineMode[];
}

export interface InteractivePipelineModeContent {
  panelTitle: string;
  panelDescription: string;
}

export interface InteractivePipelineContent {
  labels: {
    hint: string;
    examplePrompt: string;
    withoutContext: string;
    withContext: string;
    availableInContextModeOnly: string;
  };
  modes: Record<InteractivePipelineMode, InteractivePipelineModeContent>;
  steps: InteractivePipelineStep[];
}

export interface ContentBlockContent {
  /** M1 UX: „Kas čia?“ blokas pirmose skaidrėse (meta, input, output) – DefinitionsSlide stilius, sumažina disorientaciją. */
  contextIntro?: string;
  /** LXD: „Kas man iš to?“ vienu sakiniu – pirmame ekrane (gold standard Moduliams 4–6). */
  whyBenefit?: string;
  /** User Journey: trukmė (pvz. Modulio 5 skaidrė 47) – rodoma hero bloke */
  duration?: string;
  /** User Journey: pirmas veiksmas vienu sakiniu (pvz. Modulio 5 skaidrė 47) */
  firstActionCTA?: string;
  sections: ContentBlockSection[];
  /** Kai 'tabs' – sekcijos su copyable rodomos kaip tab'ai (pvz. pagalbos kortelės Modulyje 5) */
  displayMode?: 'default' | 'tabs';
  /** Pasirenkama: du vaizdai palyginimui (Modulio 4 ir kt.) */
  comparisonImages?: ContentBlockComparisonImages;
  /** Pasirenkama: iki 2 workflow vaizdai (pvz. inžinerijos pavyzdžiai) – rodomi po pirmuoju bloku */
  workflowImages?: ContentBlockWorkflowImage[];
  /** Antraštė virš workflowImages (pvz. „Du būdai: kaip kontekstas padeda“) – skaidrė 45 */
  workflowImagesHeading?: string;
  /**
   * Progresinės pipeline diagramos tipas – rodo ContextEngineeringPipelineDiagram vietoj workflowImages.
   * Skaidrė id 45: 'context-engineering' = viena vertikali schema (Prompt eng. vs Konteksto inž.).
   */
  pipelineDiagram?: 'context-engineering';
  /** Subtitras po pipelineDiagram antraštės – trumpas paaiškinimas vartotojui (skaidrė 45). */
  pipelineDiagramSubtitle?: string;
  /** Interaktyvaus pipeline turinys (tooltip + mini panelė) skaidrei 45. */
  interactivePipeline?: InteractivePipelineContent;
  /** Pasirenkama: prezentacijų įrankiai su nuorodomis – rodomi šalia workflow (skaidrė 47) */
  presentationTools?: ContentBlockPresentationTool[];
  /** Kopijuojamas prompto šablonas praktikai (pagal projekto praktikas) */
  practicalTask?: { template: string; templateLabel?: string };
  /** Micro-checkpoint prieš sprintą – „Ar brief pilnas?“ (Modulio 5) */
  briefCheckBlock?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
  /** Mini checkpoint prieš copy-paste (skaidrė 47) – 1 klausimas, ar suprato brief */
  preCopyCheckBlock?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
  /** Atpažinimo pratimas – pavyzdžiai + pasirinkimai (pvz. DI visatos sluoksniai) */
  recognitionExercise?: RecognitionExercise;
  /** InstructGPT kokybės analizė (content-block, pvz. skaidrė id 44) – stats, chart, delta, insight */
  instructGptQuality?: InstructGptQualityBlock;
  /** Pasirenkama: DI įrankiai su nuorodomis ir useCases – kaip Modulio 4 (content-block skaidrėse) */
  toolsIntro?: string;
  tools?: {
    name: string;
    url?: string;
    description?: string;
    useCases?: string[];
  }[];
  /** Praktika „pataisyk promptą“ su textarea ir paslėptu sprendimu (mygtukas „Parodyti sprendimą“) – skaidrė 49 */
  correctPromptPractice?: {
    intro: string;
    badPrompt: string;
    revealButtonLabel: string;
    solutionAnalysis: string;
    solutionCopyable: string;
    solutionSummary: string;
  };
  /** Modulio 6 skaidrė 64: mygtuko „Parsisiųsti atmintinę (PDF)“ etiketė */
  handoutDownloadLabel?: string;
}

/** Skyriaus riba / milestone (Modulio 4 ir kt.) – paprasta skaidrė su antrašte. Optional recap – įsiminimo/kartojimo blokas. */
export interface SectionBreakContent {
  title: string;
  subtitle?: string;
  /** Pvz. "4.1", "4.2" – rodomas kaip ženklelis */
  sectionNumber?: string;
  /** „Toliau – skaidrė N: …“ – rodomas SlideContent lygmenyje */
  footer?: string;
  /** Neprivaloma: „Ką jau supratome?“ blokas su punktais (emerald, CheckCircle) – įsiminimo skaidrėms */
  recap?: { heading: string; /** Neprivaloma įvadinė eilutė virš punktų (pvz. „Promptų inžinerija – kaip knyga.“) */ lead?: string; items: string[]; /** Žodynėlio termino pavadinimas kiekvienam item (nuoroda į žodyną) */ itemGlossaryTerms?: string[]; /** Bendras konceptų skaičius progresijai (pvz. 7) – badge rodo X/progressTotal (3/7, 5/7, 7/7) */ progressTotal?: number };
  /** Trumpas teigiamas stiprinimas prieš recap (šventimo elementas) */
  celebrationText?: string;
  /** Kas toliau – trumpi punktai (rekomenduojama vietoj ilgo subtitle) */
  nextSteps?: string[];
  /** Nuoroda į spinoff / išorinį išteklių (pvz. 8 promptų biblioteka) */
  spinoffCta?: { label: string; url: string };
  /** Skyriaus hero spalvos raktas – leidžia atskirti skyrių vizualiai (brand, emerald, violet) */
  heroColorKey?: 'brand' | 'emerald' | 'violet';
}

/** Pasiruošimo savitikra prieš testą – bandomieji klausimai be įskaitos */
export interface WarmUpQuizContent {
  questions: TestQuestion[];
}

/** path-step (kelio žingsnis) – Duomenų analizės kelias pramaišytas su teorija; badge atrakina žodynėlio terminus */
export interface PathStepContent {
  title: string;
  stepNumber: number;
  /** Trumpas aprašymas – ką daryti */
  body?: string;
  /** Arba sekcijos (heading + body) – content-block panašūs blokai */
  sections?: { heading?: string; body: string }[];
  /** Terminų pavadinimai – atrakinti žodynėlyje po „Pažymėjau kaip atliktą“ */
  unlockedGlossaryTerms?: string[];
  footer?: string;
}

/** Modulio 4 žodynėlis – terminas ir vieno sakinio apibrėžimas (SOT 2.1a) */
export interface GlossaryTerm {
  term: string;
  definition: string;
  /** Jei nurodyta – terminas rodomas kaip užrakintas, kol path-step neužbaigtas */
  unlockedBy?: { moduleId: number; slideId: number };
}

export interface GlossaryContent {
  terms: GlossaryTerm[];
}

/** Įrankis Įrankių skiltyje – DI įrankiai, minimi mokymuose (tools.json) */
export interface ToolItem {
  name: string;
  url?: string;
  description?: string;
  moduleId: number;
  category?: string;
}

export interface DefinitionsAspect {
  icon: string;
  title: string;
  description: string;
  example: string;
}

export interface DefinitionsContent {
  /** Trumpas „Kas čia?“ kontekstas pradžioje – padeda tiems, kurie dar nepažįsta terminų (pvz. „Šioje skaidrėje – du pagrindiniai žodžiai: promptas ir promptų inžinerija.“) */
  contextIntro?: string;
  /** Nuoroda į vaizdą skaidrės pradžioje (pvz. /ai_universe.gif) – rodomas prieš apibrėžimus */
  heroImage?: string;
  /** Antras vaizdas palyginimui (pvz. /paradise_dante.gif); rodomas šalia heroImage su etiketėmis */
  comparisonImage?: string;
  /** Etiketė pirmam vaizdui (kai rodomas palyginimas) */
  heroImageLabel?: string;
  /** Etiketė antram vaizdui (palyginimas) */
  comparisonImageLabel?: string;
  promptDefinition: string;
  engineeringDefinition: string;
  aspects: DefinitionsAspect[];
  keyInsight: string;
  sources?: { label: string; url: string }[];
}

export interface PromptType {
  name: string;
  color: string;
  description: string;
  example: string;
  result: string;
}

export interface PromptTypesContent {
  types: PromptType[];
  practicalTip: string;
}

export interface WorkflowDiagram {
  title: string;
  subtitle: string;
  steps: string[];
  note: string;
  /** Vizualinis variantas: 'basic' (neutralus) arba 'workflow' (paryškintas) */
  variant?: 'basic' | 'workflow';
}

export interface WorkflowSummaryContent {
  intro: string;
  diagrams: WorkflowDiagram[];
  examples: { title: string; prompt: string }[];
  interactive?: {
    enabled: boolean;
    defaultMode?: 'basic' | 'workflow';
  };
}

export interface PromptTechnique {
  title: string;
  description: string;
  example: string;
}

export interface PromptTechniquesContent {
  logicSteps: string[];
  techniques: PromptTechnique[];
}

export interface PromptTemplateBlock {
  title: string;
  description: string;
  example: string;
}

export interface PromptTemplateContent {
  blocks: PromptTemplateBlock[];
  template: string;
  example: string;
}

export interface TransitionContent {
  title: string;
  mapping: { from: string; to: string }[];
  note: string;
  takeaway: string;
}

export interface ProductivityCard {
  icon: string;
  title: string;
  stats: { label: string; value: string }[];
}

export interface ProductivityInsight {
  emoji: string;
  value: string;
  text: string;
}

export interface ProductivityInfographicContent {
  title: string;
  heroNumber: string;
  heroText: string;
  conclusion: string;
  cards: ProductivityCard[];
  insights: ProductivityInsight[];
  sources?: {
    label?: string;
    title?: string;
    institution?: string;
    year?: string;
    url: string;
    journal?: string;
  }[];
}

/** Tooltip skaičiui – paaiškinimas ir tendencija (DI paradokso infografikas) */
export interface DiParadoxStatTooltip {
  explanation: string;
  trend?: string;
}

/** DI paradokso infografikas (skaidrė 725) – pilna struktūra su interaktyviais tooltip */
export interface DiParadoxHeroStat {
  value: string;
  label: string;
  colorKey?: 'accent' | 'brand' | 'rose' | 'amber';
  tooltip?: DiParadoxStatTooltip;
}

export interface DiParadoxParadoxCardStat {
  label: string;
  value: string;
  tooltip?: DiParadoxStatTooltip;
}

export interface DiParadoxParadoxCard {
  number: string;
  icon: string;
  title: string;
  body: string;
  stats?: DiParadoxParadoxCardStat[];
}

export interface DiParadoxShadowBar {
  label: string;
  value: string;
  percent: number;
  colorKey?: 'accent' | 'amber' | 'slate';
  tooltip?: DiParadoxStatTooltip;
}

export interface DiParadoxFunnelStep {
  value: string;
  title: string;
  description: string;
  colorKey?: 'accent' | 'orange' | 'amber';
  tooltip?: DiParadoxStatTooltip;
}

export interface DiParadoxValueItem {
  text: string;
  tag?: string;
}

export interface DiParadoxSolutionStep {
  num: string;
  icon: string;
  name: string;
  description: string;
  highlighted?: boolean;
}

export interface DiParadoxActionCard {
  num: string;
  title: string;
  body: string;
  kpi: string;
  colorKey?: 'accent' | 'amber' | 'slate';
}

export interface DiParadoxInfographicContent {
  variant: 'di-paradox';
  badge?: string;
  title: string;
  subtitle?: string;
  sourceBox?: { label: string; title: string; meta?: string };
  heroStats: DiParadoxHeroStat[];
  conclusion: string;
  paradoxCards: DiParadoxParadoxCard[];
  shadowSection?: { label: string; sublabel?: string; bars: DiParadoxShadowBar[] };
  funnelSection?: { title: string; steps: DiParadoxFunnelStep[] };
  valueSection?: { title: string; items: DiParadoxValueItem[]; commonCondition?: { label: string; text: string } };
  solutionSection?: { label: string; pipeline: DiParadoxSolutionStep[] };
  actionSection?: { label: string; cards: DiParadoxActionCard[] };
  conclusionSection?: { icon: string; heading: string; body: string; chips?: string[] };
  footer?: string;
  onGoToGlossaryTerm?: string;
  sources?: {
    label?: string;
    title?: string;
    institution?: string;
    year?: string;
    url: string;
    journal?: string;
  }[];
}

/** News-portal infographic (DI galimybės praktiškai) – KPI kortelė */
export interface NewsPortalKpiCard {
  icon: string;
  value: string;
  desc: string;
  source: string;
  colorKey?: 'brand' | 'violet' | 'emerald' | 'amber';
}

/** Optional image slot for portal infographic (src = filename in public/ or full path) */
export interface NewsPortalImageSlot {
  src: string;
  alt: string;
}

/** Section card: Nematomas DI – split + bar list */
export interface NewsPortalSectionSplit {
  type: 'split';
  leftNum: string;
  leftLabel: string;
  rightNum: string;
  rightLabel: string;
  gapLabel: string;
  bars: { name: string; pct: string; colorKey?: 'brand' | 'rose' }[];
  imageVertical?: NewsPortalImageSlot;
}

/** Section card: Verslas – sector tiles + callout */
export interface NewsPortalSectionBusiness {
  type: 'business';
  sectorTiles: { icon: string; pct: string; name: string; colorKey?: 'brand' | 'violet' | 'emerald' | 'amber' }[];
  calloutValue: string;
  calloutText: string;
  imageVertical?: NewsPortalImageSlot;
}

/** Section card: Lietuva – stats + bars */
export interface NewsPortalSectionLithuania {
  type: 'lithuania';
  stats: { value: string; sub: string; badge?: string; colorKey?: 'emerald' | 'brand' }[];
  bars: { name: string; pct: string; colorKey?: 'emerald' | 'brand' | 'slate' }[];
  imageVertical?: NewsPortalImageSlot;
}

export type NewsPortalSectionCard =
  | (NewsPortalSectionSplit & { sectionLabel: string; title: string })
  | (NewsPortalSectionBusiness & { sectionLabel: string; title: string })
  | (NewsPortalSectionLithuania & { sectionLabel: string; title: string });

/** Tools + Youth block (Row 2 left) */
export interface NewsPortalToolsAndYouth {
  toolsLabel: string;
  toolsTitle: string;
  tools: { name: string; pct: string; colorKey?: 'rose' | 'amber' | 'violet' | 'brand' }[];
  youthLabel: string;
  youthTitle: string;
  youthBigNum: string;
  youthLabelText: string;
  youthBars: { name: string; pct: string; colorKey?: 'violet' | 'amber' | 'slate' }[];
  youthFootnote?: string;
  youthImageVertical?: NewsPortalImageSlot;
}

/** Insight card (Row 2 right) */
export interface NewsPortalInsightCard {
  tag: string;
  headline: string;
  points: { num: string; text: string }[];
  illustrationHorizontal?: NewsPortalImageSlot;
}

/** Optional CTA block (one dominant call to action – portal feel, not report) */
export interface NewsPortalCtaBlock {
  label: string;
  subline?: string;
}

/** Level 1: full-width main insight block (one number + one message) – 2-level layout */
export interface NewsPortalMainInsightBlock {
  bigNumber: string;
  label: string;
  source?: string;
  imageVertical?: NewsPortalImageSlot;
}

/** Level 2: small KPI card (one KPI + one line, optional image) – 2-level layout */
export interface NewsPortalSecondaryCard {
  sectionLabel: string;
  title: string;
  value: string;
  label: string;
  source?: string;
  colorKey?: 'brand' | 'violet' | 'emerald' | 'amber';
  imageVertical?: NewsPortalImageSlot;
}

export interface NewsPortalInfographicContent {
  variant: 'news-portal';
  /** Optional "shouting" masthead brand (e.g. "Next Level AI") – editorial portal feel */
  portalBrand?: string;
  eyebrow: string;
  headline: string;
  subline: string;
  /** One-line takeaway (portal feel) – shown below subline or hero */
  takeaway?: string;
  /** Optional CTA line below takeaway (e.g. "Ar tarp jų esi tu?") – new line, bold, accent gradient */
  takeawayCta?: string;
  featured: {
    bigNumber: string;
    label: string;
    labelStrong?: string;
    source?: string;
  };
  /** Optional vertical hero image (left of headline) */
  heroImageVertical?: NewsPortalImageSlot;
  /** Optional horizontal banner between header and KPI strip */
  bannerImageHorizontal?: NewsPortalImageSlot;
  /** Optional horizontal banner between KPI strip and section cards */
  bannerBetweenKpiAndSections?: NewsPortalImageSlot;
  kpiCards: NewsPortalKpiCard[];
  /** Legacy: 3 section cards. When mainInsightBlock + secondaryCards present, use 2-level layout instead. */
  sectionCards?: NewsPortalSectionCard[];
  /** Level 1: full-width main insight (one number + one line). Used with secondaryCards for 2-level layout. */
  mainInsightBlock?: NewsPortalMainInsightBlock;
  /** Level 2: exactly 2 small KPI cards. Used with mainInsightBlock for 2-level layout. */
  secondaryCards?: NewsPortalSecondaryCard[];
  toolsAndYouth: NewsPortalToolsAndYouth;
  insightCard: NewsPortalInsightCard;
  /** Optional single CTA block (accent) – "invitation to act", not dashboard */
  ctaBlock?: NewsPortalCtaBlock;
  footerBrand: string;
  footerSub?: string;
  sources?: {
    label?: string;
    title?: string;
    institution?: string;
    year?: string;
    url: string;
    journal?: string;
  }[];
}

export type SlideType =
  | 'action-intro'
  | 'action-intro-journey'
  | 'intro'
  | 'definitions'
  | 'prompt-types'
  | 'prompt-techniques'
  | 'workflow-summary'
  | 'prompt-template'
  | 'transition-3-to-6'
  | 'hierarchy'
  | 'meta'
  | 'input'
  | 'output'
  | 'reasoning-models'
  | 'reasoning'
  | 'quality'
  | 'advanced'
  | 'advanced-2'
  | 'full-example'
  | 'comparison'
  | 'summary'
  | 'test-intro'
  | 'test-section'
  | 'test-results'
  | 'practice-intro'
  | 'practice-scenario'
  | 'practice-scenario-hub'
  | 'practice-summary'
  | 'infographic'
  | 'hallucination-dashboard'
  | 'ai-detectors'
  | 'di-modalities'
  | 'pie-chart'
  | 'intro-action-pie'
  | 'ai-workflow'
  | 'module-intro'
  | 'content-block'
  | 'evaluator-prompt-block'
  | 'glossary'
  | 'section-break'
  | 'warm-up-quiz'
  | 'path-step'
  | 'vaizdo-generatorius';

/** Veiksmo intro blokas Modulio 1 Advanced skaidrėms (id 11, 18) – Trumpai, Daryk dabar, Patikra viršuje */
export interface AdvancedVeiksmoIntro {
  trumpai?: string;
  darykDabar?: string;
  patikra?: string;
}

/** Content skaidrėms type 'advanced' | 'advanced-2' – neprivalomas veiksmo intro */
export interface AdvancedVeiksmoIntroContent {
  veiksmoIntro: AdvancedVeiksmoIntro;
}

/** Data-driven content for type 'advanced' (slide id 11) */
export interface AdvancedSlideContent extends AdvancedVeiksmoIntroContent {
  heroTitle: string;
  heroBody: string;
  temperatureTitle: string;
  temperatureScaleLeft: string;
  temperatureScaleRight: string;
  temperatureLevels: { range: string; label: string; note?: string }[];
  reasoningTitle: string;
  reasoningLevels: { label: string; note?: string }[];
  cheatSheetTitle: string;
  cheatSheetHeaders: [string, string, string];
  cheatSheetRows: [string, string, string][];
  safeDefaultBadge: string;
  safeDefaultValue: string;
  examplesTitle: string;
  examples: { icon: string; label: string; copyText: string; taskLabel: string }[];
  errorsTitle: string;
  errors: string[];
  ruleTemperatureLabel: string;
  ruleReasoningLabel: string;
  templateLabel: string;
  templateValue: string;
  sections?: { heading?: string; body: string; collapsedByDefault?: boolean }[];
}

/** Modulio 9: vienas pasirinkimas 1 lygyje (4 kortelės) */
export interface PracticeScenarioHubChoiceLevel1 {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

/** Modulio 9: vienas pasirinkimas 2 lygyje – nurodo į scenarijaus skaidrę */
export interface PracticeScenarioHubChoiceLevel2 {
  targetSlideId: number;
  title: string;
  description: string;
}

/** Content skaidrei type 'practice-scenario-hub' – 4×4 scenarijų medis */
export interface PracticeScenarioHubContent {
  level1Choices: PracticeScenarioHubChoiceLevel1[];
  level2Choices: PracticeScenarioHubChoiceLevel2[][];
}

export type SlideContent =
  | ActionIntroContent
  | ActionIntroJourneyContent
  | IntroContent
  | ModuleIntroContent
  | ContentBlockContent
  | GlossaryContent
  | DiModalitiesContent
  | PieChartContent
  | IntroActionPieContent
  | AiWorkflowContent
  | DefinitionsContent
  | PromptTypesContent
  | PromptTechniquesContent
  | WorkflowSummaryContent
  | PromptTemplateContent
  | TransitionContent
  | ProductivityInfographicContent
  | DiParadoxInfographicContent
  | NewsPortalInfographicContent
  | SectionBreakContent
  | WarmUpQuizContent
  | PathStepContent
  | HierarchyContent
  | ComparisonContent
  | SummaryContent
  | PracticeSummaryContent
  | PracticeScenarioHubContent
  | AdvancedVeiksmoIntroContent
  | AdvancedSlideContent;

export interface Slide {
  id: number;
  title: string;
  /** Trumpas pavadinimas navigacijai / UI (jei title ilgas) */
  shortTitle?: string;
  subtitle: string;
  type: SlideType;
  blockNumber?: number;
  keyQuestion?: string;
  testQuestions?: TestQuestion[];
  scenario?: Scenario;
  content?: SlideContent;
  practicalTask?: PracticalTask;
  /** Ar skaidrė yra papildoma (optional) – mokiniui galima praleisti */
  optional?: boolean;
  /** Modulio 9 role-quest: kuris veikėjas (1–4) atlieka šį scenarijų – rodoma asmens kortelė */
  characterId?: number;
  /** Modulio 9: ar scenarijus rekomenduojamas pradedantiesiems (101, 102, 105, 104) */
  recommended?: boolean;
  /** Optional badge tipas: 'bonus' (Sparkles) arba 'optional' (Neprivaloma); jei optional === true ir nėra – rodoma „Papildoma“ */
  badgeVariant?: 'bonus' | 'optional';
}

/** Modulio 9 role-quest: veikėjo asmens kortelė (m9Characters.json) */
export interface M9Character {
  id: number;
  name: string;
  age: number;
  profession: string;
  experience: string;
  hobby: string;
  imagePath: string;
}

export interface BusinessExample {
  title: string;
  description: string;
}

export type ModuleLevel = 'learn' | 'test' | 'practice';
export type ModuleIcon = 'Target' | 'Brain' | 'Settings' | 'BarChart3' | 'ClipboardCheck' | 'Rocket';

export interface Module {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: ModuleIcon;
  level: ModuleLevel;
  duration: string;
  slides: Slide[];
  businessExamples: BusinessExample[];
  /** Modulio ID, po kurio šis modulis atrakinamas (jei nurodyta – naudojama vietoj „ankstesnis modulis masyve“). */
  unlocksAfter?: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export interface Quiz {
  title: string;
  description: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface ModulesData {
  modules: Module[];
  quiz: Quiz;
}

// Color mapping types for consistent styling
export type BlockColor = 'rose' | 'orange' | 'amber' | 'emerald' | 'brand' | 'violet';

export interface HierarchyBlock {
  num: string;
  name: string;
  desc: string;
  priority: string;
  color: BlockColor;
  /** Papildomos sąvokos – rodomos išskleidžiamame bloke; jei nurodyta, blokas tampa collapsible */
  concepts?: string[];
  /** Patarimas blokui – rodomas išskleidžiamame bloke */
  tip?: string;
}

/** Hierarchijos skaidrė (Modulio 1) – content-driven. P2 SKAIDRIU_TIPU_ANALIZE §4.1 */
export interface HierarchyContent {
  introHeading?: string;
  introBody?: string;
  blocks: HierarchyBlock[];
  /** Praktinė užduotis (toje pačioje skaidrėje): antraštė, body, kopijuojamas promptas */
  practiceHeading?: string;
  practiceBody?: string;
  practiceCopyable?: string;
  /** Ką prisiminti – atskiras blokas (kai yra practiceCopyable) arba vienas blokas su „Praktinė užduotis:“ */
  tip?: string;
}

/** Palyginimo skaidrė (nestruktūruotas vs struktūruotas) – content-driven. P2 §4.1 */
export interface ComparisonContent {
  introText?: string;
  unstructuredPrompt: string;
  structuredPrompt: string;
  unstructuredCons?: string[];
  structuredPros?: string[];
  labelLeft?: string;
  labelRight?: string;
  /** leftPct, rightPct, lessEditsPct – rezultatų palyginimas */
  stats?: { leftPct: number; rightPct: number; lessEditsPct: number };
}

/** Modulio santraukos skaidrė – content-driven. P2 §4.1
 *  v2 2026-02: redesign pagal top e-learning platformų šablonus (Duolingo, Design+Code, Articulate).
 *  Pridėta: sekcijų ikonos, spalvos, statistika, motyvacinis CTA. */
export interface SummarySection {
  heading: string;
  items: string[];
  /** Lucide ikonos pavadinimas (pvz. "Layers", "Workflow", "Lightbulb", "ArrowRight") */
  icon?: string;
  /** Spalvos raktas – brand, emerald, violet, amber, rose, orange */
  color?: string;
}
export interface SummaryContent {
  introHeading?: string;
  introBody?: string;
  sections: SummarySection[];
  /** Statistikos blokai hero dalyje (pvz. "6 blokai", "5 technikos") */
  stats?: { label: string; value: string }[];
  /** Motyvacinis šūkis apačioje (pvz. "Struktūruoti promptai = nuspėjami rezultatai") */
  tagline?: string;
  /** Kopijuojamas refleksijos promptas – mokinys gali iškart panaudoti su DI įrankiu */
  reflectionPrompt?: string;
  /** Refleksijos kortelės antraštė */
  reflectionTitle?: string;
  /** Pirmas veiksmas per 24–48 val. – trumpas CTA (User Journey: deployment per 24h) */
  firstAction24h?: string;
  /** Kitas žingsnis CTA (pvz. „Pereikite prie Modulio 11“) – rodomas jei nėra sections su Kitas Žingsnis */
  nextStepCTA?: string;
}

/** Praktikos santraukos skaidrė – content-driven. P2 §4.1 */
export interface PracticeSummaryContent {
  title?: string;
  subtitle?: string;
  learnedItems?: string[];
  nextStepsItems?: string[];
  taglineTitle?: string;
  taglineSub?: string;
  /** M9: sekcijos su heading/body vietoj learnedItems/nextSteps */
  sections?: { heading: string; body: string; blockVariant?: string }[];
  /** Kopijuojamas refleksijos promptas (What–So What–Now What) */
  reflectionPrompt?: string;
  /** M9 5 blokų etalonas: antraštė (pvz. „Ką išmokote“) */
  introHeading?: string;
  /** M9: įvodinis body */
  introBody?: string;
  /** M9: statistikos (pvz. 16 scenarijų, 4 veikėjai) */
  stats?: { label: string; value: string }[];
  /** M9: tagline (pvz. „Vienas scenarijus = vienas rezultatas.“) */
  tagline?: string;
  /** M9: kitas žingsnis CTA (pvz. „Pritaikyk per 48 val.…“) */
  nextStepCTA?: string;
}

/** M9 užduoties rėmas – vienas sakinys (Užduotis) ir konkretus output (Užbaigta, kai) */
export interface TaskFrame {
  task: string;
  doneWhen: string;
}

export interface QualityCriteria {
  text: string;
  color: BlockColor;
}

export interface FullExampleBlock {
  num: number;
  name: string;
  color: BlockColor;
  content: string;
}
