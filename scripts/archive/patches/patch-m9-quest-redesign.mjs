/**
 * One-shot M9 quest redesign: practice-quest-intro, merge 94→93, hub 12, reorder.
 * Usage: node scripts/patch-m9-quest-redesign.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const DROP_IDS = new Set([94, 104, 108, 109, 115, 117]);
const KEEP_SCENARIO_IDS = [101, 102, 103, 105, 106, 107, 110, 111, 112, 113, 114, 116];
const HUB_LEVEL2 = [
  [
    { targetSlideId: 101, title: 'Sentimentų analizė', titleEn: 'Sentiment analysis', description: 'Temos, intensyvumas, prioritetai.', descriptionEn: 'Themes, intensity, priorities.' },
    { targetSlideId: 102, title: 'Duomenų valymas', titleEn: 'Data cleaning', description: 'Checklist prieš analizę.', descriptionEn: 'Checklist before analysis.' },
    { targetSlideId: 103, title: 'Metaduomenys', titleEn: 'Metadata', description: '3 tipai – kontekstas, schema, teisės.', descriptionEn: '3 types – context, schema, rights.' },
  ],
  [
    { targetSlideId: 105, title: '4 analizės tipai', titleEn: '4 analysis types', description: 'Aprašomoji → nurodomoji.', descriptionEn: 'Descriptive → prescriptive.' },
    { targetSlideId: 106, title: 'Rizikų prognozavimas', titleEn: 'Risk forecasting', description: 'Rizikų matrica, 3 scenarijai.', descriptionEn: 'Risk matrix, 3 scenarios.' },
    { targetSlideId: 107, title: 'Stebėjimas socialiniuose tinkluose', titleEn: 'Social listening', description: 'Temos, nuotaika, rizika.', descriptionEn: 'Themes, sentiment, risk.' },
  ],
  [
    { targetSlideId: 110, title: 'Konkurentų analizė', titleEn: 'Competitor analysis', description: 'SWOT ir 30 d. planas.', descriptionEn: 'SWOT and 30-day plan.' },
    { targetSlideId: 111, title: 'Finansų įžvalgos', titleEn: 'Finance insights', description: 'Santrauka vadovybei.', descriptionEn: 'Executive summary.' },
    { targetSlideId: 112, title: 'HR analitika', titleEn: 'HR analytics', description: 'Mokymų poveikis, segmentai.', descriptionEn: 'Training impact, segments.' },
  ],
  [
    { targetSlideId: 113, title: 'Vizualizacijos tipas', titleEn: 'Chart choice', description: '3 variantai vadovybei.', descriptionEn: '3 options for leadership.' },
    { targetSlideId: 114, title: 'Istorijos kūrimas', titleEn: 'Data storytelling', description: 'Įžvalga → veiksmas.', descriptionEn: 'Insight → action.' },
    { targetSlideId: 116, title: 'Python vizualizacijos', titleEn: 'Python charts', description: 'Kodas arba specifikacija.', descriptionEn: 'Code or specification.' },
  ],
];

const JOURNEY_CHOICES_LT = [
  { id: 'pardavimai', branchIds: ['viz-sales'], label: 'Pardavimai', subtitle: 'KPI, tendencijos, prognozės', icon: 'TrendingUp' },
  { id: 'rinkodara', branchIds: ['viz-mkt'], label: 'Rinkodara', subtitle: 'Kanalai ir kampanijos', icon: 'Image' },
  { id: 'it-inzinerija', branchIds: ['technika', 'etika-plus'], label: 'IT ir inžinerija', subtitle: 'Pipeline ir logai', icon: 'Cpu' },
  { id: 'personalas', branchIds: ['strategija'], label: 'Personalas', subtitle: 'Retention ir pulse', icon: 'Users' },
  { id: 'vadyba', branchIds: ['strategija', 'etika-plus'], label: 'Vadovai ir specialistai', subtitle: 'Ataskaitos valdybai', icon: 'Briefcase' },
  { id: 'kita', branchIds: [], label: 'Kita sritis ar vidiniai duomenys', subtitle: 'Excel, CRM – universalūs šablonai', icon: 'Compass' },
];

const JOURNEY_CHOICES_EN = [
  { id: 'pardavimai', branchIds: ['viz-sales'], label: 'Sales', subtitle: 'KPIs, trends, forecasts', icon: 'TrendingUp' },
  { id: 'rinkodara', branchIds: ['viz-mkt'], label: 'Marketing', subtitle: 'Channels and campaigns', icon: 'Image' },
  { id: 'it-inzinerija', branchIds: ['technika', 'etika-plus'], label: 'IT and engineering', subtitle: 'Pipelines and logs', icon: 'Cpu' },
  { id: 'personalas', branchIds: ['strategija'], label: 'People / HR', subtitle: 'Retention and pulse', icon: 'Users' },
  { id: 'vadyba', branchIds: ['strategija', 'etika-plus'], label: 'Managers and specialists', subtitle: 'Board-ready reports', icon: 'Briefcase' },
  { id: 'kita', branchIds: [], label: 'Other area or internal data', subtitle: 'Excel, CRM – universal templates', icon: 'Compass' },
];

function questIntroContent(en) {
  return {
    whyBenefit: en
      ? 'After this project you will understand the data analysis flow and have your own AI-ready analysis kit: prompts, cleaned data, and a summary.'
      : 'Po šio projekto suprasi duomenų analizės eigą ir turėsi savo analitinį rinkinį su DI: promptus, sutvarkytus duomenis ir suvestinę.',
    duration: en ? '~45–60 min' : '~45–60 min',
    audience: en
      ? 'You finished M7–M8 and want one full analysis pass with AI.'
      : 'Baigei M7–M8 ir nori vieną kartą praeiti pilną analizę su DI.',
    journeyHeading: en ? 'Choose your domain' : 'Pasirink savo sritį',
    journeyChoices: en ? JOURNEY_CHOICES_EN : JOURNEY_CHOICES_LT,
    confirmMessage: en
      ? 'Domain: {label}. Confirm to unlock the start button.'
      : 'Sritis: {label}. Patvirtink, kad atrakintum startą.',
    softPreselectHint: en
      ? 'In Module 7 you chose {label} – confirm or change below.'
      : 'Modulyje 7 rinkaisi {label} – patvirtink arba keisk žemiau.',
    questSteps: en
      ? [
          { id: 'start', label: 'Start', slideId: 90 },
          { id: 'catalog', label: 'Source catalog', slideId: 93.1 },
          { id: 'csv', label: 'CSV clean-up', slideId: 93.2 },
          { id: 'cycle', label: '8-step cycle', slideId: 93 },
          { id: 'kit', label: 'Your kit', slideId: 92 },
        ]
      : [
          { id: 'start', label: 'Startas', slideId: 90 },
          { id: 'catalog', label: 'Katalogas', slideId: 93.1 },
          { id: 'csv', label: 'CSV valymas', slideId: 93.2 },
          { id: 'cycle', label: '8 žingsniai', slideId: 93 },
          { id: 'kit', label: 'Rinkinys', slideId: 92 },
        ],
    outcomeChips: en
      ? ['Source table', 'Cleaned file', 'Summary / .html draft']
      : ['Šaltinių lentelė', 'Išvalytas failas', 'Suvestinė / .html juodraštis'],
    firstActionCTA: en
      ? 'Start: source catalog – then CSV and the 8-step prompts.'
      : 'Pradėti: šaltinių katalogas – tada CSV ir 8 žingsnių promptai.',
    firstActionSlideId: 93.1,
    recommendedSlideIds: [101, 102, 111, 116],
    footer: en
      ? 'Next – slide 2: Practice: source catalog'
      : 'Toliau – skaidrė 2: Praktika: šaltinių katalogas',
    onGoToGlossaryTerm: en ? 'Full analysis template' : 'Pilnas analizės šablonas',
  };
}

function merge93(slide93, slide94, en) {
  const sections93 = slide93?.content?.sections ?? [];
  const promptSection = (slide94?.content?.sections ?? []).find(
    (s) => s.image === 'm9_workflow_step_prompts'
  ) ?? {
    heading: en ? '2️⃣ Copy the prompt for each step' : '2️⃣ Kopijuok promptą pagal žingsnį',
    body: en
      ? 'Pick a step in the strip – copy the template into your AI tool.'
      : 'Pasirink žingsnį juostoje – nukopijuok šabloną ir įklijuok į DI.',
    blockVariant: 'brand',
    image: 'm9_workflow_step_prompts',
  };
  const trumpai = sections93.find((s) => /Trumpai|In brief|1️⃣/i.test(s.heading ?? '')) ?? {
    heading: en ? '1️⃣ In brief' : '1️⃣ Trumpai',
    body: en
      ? '**8-step cycle** – schema below; copy prompts in the same slide.'
      : '**8 žingsnių ciklas** – schema žemiau; promptus kopijuok toje pačioje skaidrėje.',
    blockVariant: 'accent',
  };
  const daryk = {
    heading: en ? '2️⃣ Do now' : '2️⃣ Daryk dabar',
    body: en
      ? 'Open a step on the schema, then copy its prompt below. Finish at least 2 steps with a useful AI reply.'
      : 'Atidaryk žingsnį schemoje, tada nukopijuok jo promptą žemiau. Atlik bent 2 žingsnius su naudingu DI atsakymu.',
    blockVariant: 'brand',
  };
  const schema = sections93.find((s) => s.image === 'm9_data_workflow') ?? {
    heading: en ? 'Interactive 8-step schema' : 'Interaktyvi 8 žingsnių schema',
    body: en
      ? 'Select a step – the matching copyable prompt is below.'
      : 'Pasirink žingsnį – kopijuojamas promptas yra žemiau.',
    image: 'm9_data_workflow',
    blockVariant: 'brand',
  };
  const patikra = {
    heading: en ? '4️⃣ Check (1 min)' : '4️⃣ Patikra (1 min)',
    body: en
      ? '• Did you copy prompts for at least 2 steps and get a useful AI answer?'
      : '• Ar nukopijavai promptą bent 2 žingsniams ir gavai naudingą DI atsakymą?',
    blockVariant: 'accent',
  };
  return {
    ...slide93,
    id: 93,
    title: en
      ? 'Module 9 workflow: 8-step cycle and prompts'
      : 'Modulio 9 darbo eiga: 8 žingsnių ciklas ir promptai',
    subtitle: en
      ? 'Main project – schema + copyable prompts in one place'
      : 'Pagrindinis projektas – schema ir kopijuojami promptai vienoje vietoje',
    shortTitle: en ? '8-step cycle + prompts' : '8 žingsniai + promptai',
    type: 'content-block',
    content: {
      sections: [trumpai, daryk, schema, promptSection, patikra],
      footer: en
        ? 'Next – slide 5: Project summary (your kit checklist)'
        : 'Toliau – skaidrė 5: Projekto santrauka (rinkinio checklist)',
      onGoToGlossaryTerm: slide93?.content?.onGoToGlossaryTerm,
    },
  };
}

function patchSummary(slide92, en) {
  return {
    ...slide92,
    id: 92,
    title: en ? 'Your analysis kit' : 'Tavo analitinis rinkinys',
    subtitle: en ? 'Checklist and next steps' : 'Checklist ir tolimesni žingsniai',
    type: 'practice-summary',
    content: {
      ...(slide92.content ?? {}),
      introHeading: en ? 'What you can do now' : 'Ką dabar moki',
      introBody: en
        ? 'You understand the analysis flow, tools, prompts, and visuals – and you can assemble an AI-ready kit for any topic.'
        : 'Supranti duomenų analizės eigą, įrankius, promptus ir vizualizacijas – ir moki paruošti sau analitinį rinkinį su DI bet kuriai temai.',
      kitChecklist: en
        ? [
            { id: 'catalog', label: 'I have a source catalog table' },
            { id: 'csv', label: 'I have a cleaned CSV / sample result' },
            { id: 'summary', label: 'I have a summary or .html draft' },
          ]
        : [
            { id: 'catalog', label: 'Turiu šaltinių katalogo lentelę' },
            { id: 'csv', label: 'Turiu išvalytą CSV / sample rezultatą' },
            { id: 'summary', label: 'Turiu suvestinę arba .html juodraštį' },
          ],
      badges: en
        ? [
            { id: 'data-ready', label: 'Data ready', rule: 'practices' },
            { id: 'kit-ready', label: 'Analysis kit', rule: 'checklist' },
          ]
        : [
            { id: 'data-ready', label: 'Duomenys paruošti', rule: 'practices' },
            { id: 'kit-ready', label: 'Analitinis rinkinys', rule: 'checklist' },
          ],
      hubCtaLabel: en
        ? 'Optional library (12 scenarios)'
        : 'Papildoma biblioteka (12 scenarijų)',
      hubSlideId: 99,
      stats: [
        { label: en ? 'Main path' : 'Pagrindinis kelias', value: en ? '5 steps' : '5 žingsniai' },
        { label: en ? 'Optional scenarios' : 'Papildomi scenarijai', value: '12' },
        { label: en ? 'Artefact' : 'Artefaktas', value: '1' },
      ],
      tagline: en
        ? 'One kit = catalog + clean data + 8-step prompts + summary.'
        : 'Vienas rinkinys = katalogas + švarūs duomenys + 8 promptai + suvestinė.',
    },
  };
}

function patchHub(slide99, en) {
  const level2 = HUB_LEVEL2.map((row) =>
    row.map((c) => ({
      targetSlideId: c.targetSlideId,
      title: en ? c.titleEn : c.title,
      description: en ? c.descriptionEn : c.description,
    }))
  );
  return {
    ...slide99,
    id: 99,
    title: en ? 'Pick a scenario (4×3)' : 'Pasirink scenarijų (4×3)',
    subtitle: en
      ? 'Optional library – 4 characters, 3 tasks each. Not required to finish the module.'
      : 'Neprivaloma biblioteka – 4 veikėjai, po 3 užduotis. Moduliui užbaigti nebūtina.',
    content: {
      ...(slide99.content ?? {}),
      optionalPathNote: en
        ? 'Optional · finish the main path first (catalog → CSV → 8 steps → kit).'
        : 'Neprivaloma · pirmiausia užbaik pagrindinį kelią (katalogas → CSV → 8 žingsniai → rinkinys).',
      recommendedSlideIds: [101, 102, 111, 116],
      level2Choices: level2,
    },
  };
}

function transformModule9(mod, en) {
  const byId = new Map(mod.slides.map((s) => [s.id, s]));
  const slide90 = {
    id: 90,
    title: en ? 'Data analysis path project' : 'Duomenų analizės kelio projektas',
    subtitle: en
      ? 'Build your AI analysis kit – ~45–60 min'
      : 'Susirink analitinį rinkinį su DI – ~45–60 min',
    type: 'practice-quest-intro',
    content: questIntroContent(en),
  };
  const slide93 = merge93(byId.get(93), byId.get(94), en);
  const s931 = byId.get(93.1);
  const s932 = byId.get(93.2);
  if (s931) {
    s931.content = {
      ...s931.content,
      footer: en
        ? 'Next – slide 3: Practice: your CSV / Excel'
        : 'Toliau – skaidrė 3: Praktika: savo CSV / Excel',
    };
  }
  if (s932) {
    s932.content = {
      ...s932.content,
      footer: en
        ? 'Next – slide 4: 8-step cycle and prompts'
        : 'Toliau – skaidrė 4: 8 žingsnių ciklas ir promptai',
    };
  }
  const scenarios = KEEP_SCENARIO_IDS.map((id) => {
    const s = byId.get(id);
    if (!s) throw new Error(`Missing scenario ${id}`);
    return {
      ...s,
      optional: true,
      badgeVariant: 'optional',
      recommended: [101, 102, 111, 116].includes(id),
    };
  });
  const hub = {
    ...patchHub(byId.get(99), en),
    optional: true,
    badgeVariant: 'optional',
  };
  const summary = patchSummary(byId.get(92), en);

  return {
    ...mod,
    title: mod.title,
    subtitle: en ? '8 steps to your analysis kit' : '8 žingsniai iki analitinio rinkinio',
    description: en
      ? 'Build one AI analysis kit: catalog, CSV clean-up, 8-step prompts, checklist.'
      : 'Susirink analitinį rinkinį su DI: katalogas, CSV valymas, 8 promptai, checklist.',
    duration: en ? '45–60 min' : '45–60 min',
    slides: [slide90, s931, s932, slide93, summary, hub, ...scenarios].filter(Boolean),
  };
}

function patchFile(rel, en) {
  const path = join(root, rel);
  const data = JSON.parse(readFileSync(path, 'utf8'));
  const idx = data.modules.findIndex((m) => m.id === 9);
  if (idx < 0) throw new Error(`M9 missing in ${rel}`);
  data.modules[idx] = transformModule9(data.modules[idx], en);
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
  const n = data.modules[idx].slides.length;
  console.log(`OK ${rel}: M9 slides=${n}`);
}

patchFile('src/data/modules.json', false);
patchFile('src/data/modules-en-m7-m9.json', true);
