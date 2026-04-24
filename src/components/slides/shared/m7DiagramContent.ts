import type { StepExplanation } from './stepExplanations';

export type M7Locale = 'lt' | 'en';

/** 4 analizės tipai – skaidrė 731 */
export function getM7AnalysisTypeExplanations(
  locale: M7Locale
): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: 'Descriptive – What happened?',
        body: 'Summarise facts: top products, regions, trends, concentration. Use when leadership asks **what** happened.',
      },
      {
        title: 'Diagnostic – Why?',
        body: 'Find causes: price, seasonality, marketing. Use when the question is **why** results changed.',
      },
      {
        title: 'Predictive – What might happen?',
        body: 'Forecasts, stock needs, risk ranges. Use when you need **what could happen next**.',
      },
      {
        title: 'Prescriptive – What to do?',
        body: 'Actions: how much stock to add, pricing, focus products. Use when you need **how to act**.',
      },
    ];
  }
  return [
    {
      title: 'Aprašomoji – Kas įvyko?',
      body: 'Apibendrink faktus: top produktai, regionai, tendencijos, koncentracija. Kai vadovybė klausia **kas** įvyko.',
    },
    {
      title: 'Diagnostinė – Kodėl?',
      body: 'Ieškok priežasčių: kaina, sezoniškumas, rinkodara. Kai klausia **kodėl** pasikeitė rezultatai.',
    },
    {
      title: 'Nuspėjamoji – Kas gali įvykti?',
      body: 'Prognozės, atsargos, rizikos intervalai. Kai reikia **kas gali nutikti toliau**.',
    },
    {
      title: 'Nurodomoji – Kaip veikti?',
      body: 'Veiksmai: kiek didinti atsargas, kainodara, produktų fokusas. Kai reikia **ką daryti**.',
    },
  ];
}

export function getM7AnalysisShortLabels(
  locale: M7Locale
): { title: string; sub: string }[] {
  if (locale === 'en') {
    return [
      { title: 'Descriptive', sub: 'What happened?' },
      { title: 'Diagnostic', sub: 'Why?' },
      { title: 'Predictive', sub: 'What might happen?' },
      { title: 'Prescriptive', sub: 'How to act?' },
    ];
  }
  return [
    { title: 'Aprašomoji', sub: 'Kas įvyko?' },
    { title: 'Diagnostinė', sub: 'Kodėl?' },
    { title: 'Nuspėjamoji', sub: 'Kas gali?' },
    { title: 'Nurodomoji', sub: 'Kaip veikti?' },
  ];
}

/** 5 žingsnių duomenų paruošimas – skaidrė 89 */
const M7_PREP_STEPS_LT = [
  { label: 'Šaltiniai', desc: 'Identifikuoti' },
  { label: 'Struktūra', desc: 'Lentelė' },
  { label: 'Surinkti', desc: 'Kategorijos' },
  { label: 'Valymas', desc: 'Dubliai, trūkumai' },
  { label: 'Eksportas', desc: 'CSV' },
];

const M7_PREP_STEPS_EN = [
  { label: 'Sources', desc: 'Identify' },
  { label: 'Structure', desc: 'Table' },
  { label: 'Collect', desc: 'Categories' },
  { label: 'Cleaning', desc: 'Dupes, gaps' },
  { label: 'Export', desc: 'CSV' },
];

export function getM7DataPrepSteps(locale: M7Locale) {
  return locale === 'en' ? M7_PREP_STEPS_EN : M7_PREP_STEPS_LT;
}

export function getM7DataPrepExplanations(locale: M7Locale): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: '1. Identify sources',
        body: 'List public or internal **sources** with links and refresh cadence before any merge.',
      },
      {
        title: '2. Create structure',
        body: 'Define columns: category, source, URL, update frequency – so DI and you share the same schema.',
      },
      {
        title: '3. Collect into categories',
        body: 'Assign datasets to categories so later cleaning and analysis stay consistent.',
      },
      {
        title: '4. Cleaning',
        body: 'Remove duplicates, fix missing values and formats – same checklist as Module 7 slide on prep workflow.',
      },
      {
        title: '5. Export',
        body: 'Export to **CSV** (or agreed format) for tools and the MASTER prompt chain.',
      },
    ];
  }
  return [
    {
      title: '1. Identifikuoti šaltinius',
      body: 'Išvardink **šaltinius** su nuorodomis ir atnaujinimo dažniu prieš sujungiant duomenis.',
    },
    {
      title: '2. Sukurti struktūrą',
      body: 'Stulpeliai: kategorija, šaltinis, URL, atnaujinimo dažnis – kad DI ir tu naudotumėte tą pačią schemą.',
    },
    {
      title: '3. Surinkti į kategorijas',
      body: 'Priskirk rinkinius kategorijoms – taip valymas ir analizė lieka nuoseklūs.',
    },
    {
      title: '4. Valymas',
      body: 'Pašalink dubliavimus, sutvarkyk trūkstamas reikšmes ir formatus – kaip toje pačioje skaidrėje CopyButton blokuose.',
    },
    {
      title: '5. Eksportas',
      body: 'Paruošk **CSV** (ar sutartą formatą) įrankiams ir MASTER prompto grandinėi.',
    },
  ];
}

/** 3 agentai – skaidrė 94 */
export function getM7AgentExplanations(locale: M7Locale): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: 'Data Research agent',
        body: 'Sources, structure, cleaning prompts – **before** deep stats. Start here for new datasets.',
      },
      {
        title: 'EDA agent',
        body: 'Stats, charts, hypotheses – **explore** what the data says.',
      },
      {
        title: 'Insight agent',
        body: 'Recommendations and narrative for leadership – **close the loop** after analysis.',
      },
    ];
  }
  return [
    {
      title: 'Data Research agentas',
      body: 'Šaltiniai, struktūra, valymo promptai – **prieš** gilią statistiką. Pradėk čia su naujais rinkiniais.',
    },
    {
      title: 'EDA agentas',
      body: 'Statistika, grafikai, hipotezės – **tiriamoji** fazė: ką duomenys rodo.',
    },
    {
      title: 'Insight agentas',
      body: 'Rekomendacijos ir istorija vadovybei – **uždaryk ciklą** po analizės.',
    },
  ];
}

export function getM7AgentShortLabels(
  locale: M7Locale
): { title: string; sub: string }[] {
  if (locale === 'en') {
    return [
      { title: 'Data Research', sub: 'Sources & structure' },
      { title: 'EDA', sub: 'Explore data' },
      { title: 'Insight', sub: 'For leadership' },
    ];
  }
  return [
    { title: 'Data Research', sub: 'Šaltiniai ir struktūra' },
    { title: 'EDA', sub: 'Tiriamoji analizė' },
    { title: 'Insight', sub: 'Įžvalgos vadovybei' },
  ];
}
