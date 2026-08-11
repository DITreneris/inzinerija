import type { StepExplanation } from './stepExplanations';

/** Trumpi antraštės tekstai diagramos dėžutėse (LT) – sinchronas su Modulio 9 id 93 */
export const M9_DATA_WORKFLOW_STEPS_LT: { label: string; desc: string }[] = [
  { label: 'Surinkimas', desc: 'Šaltiniai, tema' },
  { label: 'Metodika', desc: 'Struktūra, KPI' },
  { label: 'Tyrimas', desc: 'Promptas' },
  { label: 'Paleidimas', desc: '1–4 DI' },
  { label: 'Valymas', desc: 'Dubliai' },
  { label: 'Integracija', desc: 'Vienas dok.' },
  { label: 'Vaizdai', desc: 'Spalvos, grafikai' },
  { label: 'Dashboard', desc: '.html' },
];

export const M9_DATA_WORKFLOW_STEPS_EN: { label: string; desc: string }[] = [
  { label: 'Collection', desc: 'Sources, topic' },
  { label: 'Methodology', desc: 'Structure, KPIs' },
  { label: 'Deep research', desc: 'Prompt prep' },
  { label: 'Run tools', desc: '1–4 AI' },
  { label: 'Cleaning', desc: 'Dedupe' },
  { label: 'Integration', desc: 'Single doc' },
  { label: 'Charts', desc: 'Colors, charts' },
  { label: 'Dashboard', desc: '.html' },
];

export type M9DataWorkflowContext = 'm9' | 'm7_master';

const M9_DATA_WORKFLOW_STEP_EXPLANATIONS_M9_LT: StepExplanation[] = [
  {
    title: '1. Duomenų surinkimas',
    body: '**Patikslink ar išplėsk** jau turimą šaltinių katalogą (iš praktikos): oficialūs, vieši; formatas ir atnaujinimo dažnis. Jei lentelė silpna – papildyk 3–5 eilutėmis. **Kopijuojamą šabloną** – žemiau.',
  },
  {
    title: '2. Metodikos promptas',
    body: 'Paruošk **analizės metodiką**: struktūra, rodikliai, lentelės šablonas. Ryšys su Moduliu 7 – MASTER ir verslo analizės šablonai.',
  },
  {
    title: '3. Deep research promptas',
    body: '**Paruošk** vieną gilaus tyrimo promptą su šaltinių taisykle ir „Nežinau“. Dar **nepaliek** keliose DI – tai kitas žingsnis. **Kopijuojamą šabloną** – žemiau.',
  },
  {
    title: '4. Paleidimas prieinamuose DI',
    body: 'Tą patį promptą paleisk **1–4 prieinamuose** įrankiuose (ChatGPT, Gemini, DeepSeek, Grok – tiek, kiek turi). Pakanka 1–2; vėliau sujungsi išvestis.',
  },
  {
    title: '5. Duomenų išvalymas',
    body: '**Checklist**: dublių šalinimas, datos ir skaičių formatas, trūkstamos reikšmės, metaduomenys (kuris DI, data). Tą patį principą radai Modulyje 7 skaidrėje **„Duomenų paruošimas ir darbo eiga“**.',
  },
  {
    title: '6. Integracija',
    body: 'Sujunk 4 fragmentus į **vieną markdown** – skyriai: santrauka, faktai, rizikos, šaltiniai; pašalink pasikartojimus.',
  },
  {
    title: '7. Atvaizdavimas',
    body: '**Vizualizacijos spec**: spalvos (hex), ašys, legenda, 2 grafikų tipai, pagrindinių rodiklių (KPI) blokai – mažai kodo, aiškios instrukcijos DI.',
  },
  {
    title: '8. Dashboard (.html)',
    body: 'Pilnas **.html** su CSS (ir jei reikia Chart.js per CDN) – nukopijuok į Notepad, išsaugok, atidaryk naršyklėje. Pavyzdys: `m9_dashboard_snippet.html` public aplanke.',
  },
];

const M9_DATA_WORKFLOW_STEP_EXPLANATIONS_M7_LT: StepExplanation[] = [
  {
    title: '1. Duomenų surinkimas',
    body: 'Išvardink **10–15 šaltinių** temai: oficialūs, vieši; formatas (CSV, API, ataskaitos) ir atnaujinimo dažnis. Tai pirmas MASTER bloko žingsnis – šaltiniai prieš analizę.',
  },
  {
    title: '2. Metodikos promptas',
    body: 'Paruošk **analizės metodiką**: struktūra, rodikliai, lentelės šablonas. Šis žingsnis susiejamas su MASTER promptu žemiau – aiški struktūra prieš gilinimą.',
  },
  {
    title: '3. Deep research promptas',
    body: 'Vienas **gilusis tyrimo** promptas su šaltinių taisykle – paruošk prieš paleidimą 2–4 DI platformose. **Šablono esmė:** ROLE + TASK + tema + OUTPUT su šaltiniais; jei duomenų nėra – parašyk „Nežinau“. Pilną kopijuojamą versiją gausi **Modulyje 9** projekto skaidrėje „Pagalbiniai promptai“.',
  },
  {
    title: '4. Keturi tyrimai vienu metu',
    body: 'Tą patį promptą paleisk **ChatGPT, Gemini, DeepSeek, Grok** (ar prieinamus). Vėliau sujungsi išvestis į vieną dokumentą.',
  },
  {
    title: '5. Duomenų išvalymas',
    body: '**Checklist**: dublių šalinimas, datos ir skaičių formatas, trūkstamos reikšmės, metaduomenys (kuris DI, data). Tą patį principą radai skaidrėje **„Duomenų paruošimas ir darbo eiga“**.',
  },
  {
    title: '6. Integracija',
    body: 'Sujunk 4 fragmentus į **vieną markdown** – skyriai: santrauka, faktai, rizikos, šaltiniai; pašalink pasikartojimus.',
  },
  {
    title: '7. Atvaizdavimas',
    body: '**Vizualizacijos spec**: spalvos (hex), ašys, legenda, 2 grafikų tipai, pagrindinių rodiklių (KPI) blokai – mažai kodo, aiškios instrukcijos DI.',
  },
  {
    title: '8. Dashboard (.html)',
    body: 'Pilnas **.html** su CSS (ir jei reikia Chart.js per CDN) – nukopijuok į Notepad, išsaugok, atidaryk naršyklėje. Pavyzdys: `m9_dashboard_snippet.html` public aplanke.',
  },
];

const M9_DATA_WORKFLOW_STEP_EXPLANATIONS_M9_EN: StepExplanation[] = [
  {
    title: '1. Data collection',
    body: '**Refine or expand** the source catalog you already built: official, public; format and refresh cadence. If the table is thin – add 3–5 rows. **Copyable template** – below.',
  },
  {
    title: '2. Methodology prompt',
    body: 'Prepare **analysis methodology**: structure, metrics (KPIs), table template. Links to Module 7 – MASTER and business analysis templates.',
  },
  {
    title: '3. Deep research prompt',
    body: '**Prepare** one deep-research prompt with source rules and "I don\'t know". Do **not** run on several tools yet – that is the next step. **Copyable template** – below.',
  },
  {
    title: '4. Run on available AI tools',
    body: 'Run the same prompt on **1–4 available** tools (ChatGPT, Gemini, DeepSeek, Grok – whatever you have). 1–2 is enough; merge outputs later.',
  },
  {
    title: '5. Data cleaning',
    body: '**Checklist**: dedupe, date and number formats, missing values, metadata (which AI tool, date). Same principles on Module 7 slide **“Data preparation and work process”**.',
  },
  {
    title: '6. Integration',
    body: 'Merge four fragments into **one markdown** – sections: summary, facts, risks, sources; remove duplicates.',
  },
  {
    title: '7. Visualization',
    body: '**Viz spec**: colors (hex), axes, legend, two chart types, key metric (KPI) blocks – minimal code, clear AI instructions.',
  },
  {
    title: '8. Dashboard (.html)',
    body: 'Full **.html** with CSS (and Chart.js via CDN if needed) – copy to Notepad, save, open in browser. Example: `m9_dashboard_snippet.html` in public.',
  },
];

const M9_DATA_WORKFLOW_STEP_EXPLANATIONS_M7_EN: StepExplanation[] = [
  {
    title: '1. Data collection',
    body: 'List **10–15 sources** for the topic: official, public; format (CSV, API, reports) and refresh cadence. First MASTER block step – sources before analysis.',
  },
  {
    title: '2. Methodology prompt',
    body: 'Prepare **analysis methodology**: structure, metrics (KPIs), table template. Links to the MASTER prompt below – clear structure before going deeper.',
  },
  {
    title: '3. Deep research prompt',
    body: 'One **deep research** prompt with source rules – prepare before running on 2–4 AI tools. **Template essence:** ROLE + TASK + topic + OUTPUT with sources; if data is missing, say “I don’t know”. Full copyable version in **Module 9** on the project slide with step prompts.',
  },
  {
    title: '4. Four parallel runs',
    body: 'Run the same prompt on **ChatGPT, Gemini, DeepSeek, Grok** (or available). You will merge outputs into one document later.',
  },
  {
    title: '5. Data cleaning',
    body: '**Checklist**: dedupe, date and number formats, missing values, metadata (which AI tool, date). Same principles on slide **“Data preparation and work process”**.',
  },
  {
    title: '6. Integration',
    body: 'Merge four fragments into **one markdown** – sections: summary, facts, risks, sources; remove duplicates.',
  },
  {
    title: '7. Visualization',
    body: '**Viz spec**: colors (hex), axes, legend, two chart types, key metric (KPI) blocks – minimal code, clear AI instructions.',
  },
  {
    title: '8. Dashboard (.html)',
    body: 'Full **.html** with CSS (and Chart.js via CDN if needed) – copy to Notepad, save, open in browser. Example: `m9_dashboard_snippet.html` in public.',
  },
];

/** @deprecated use getM9DataWorkflowStepExplanations */
export const M9_DATA_WORKFLOW_STEP_EXPLANATIONS =
  M9_DATA_WORKFLOW_STEP_EXPLANATIONS_M9_LT;

/** @deprecated use getM9DataWorkflowStepExplanations */
export const M9_DATA_WORKFLOW_STEP_EXPLANATIONS_EN =
  M9_DATA_WORKFLOW_STEP_EXPLANATIONS_M9_EN;

export function getM9DataWorkflowSteps(locale: 'lt' | 'en') {
  return locale === 'en'
    ? M9_DATA_WORKFLOW_STEPS_EN
    : M9_DATA_WORKFLOW_STEPS_LT;
}

export function getM9DataWorkflowStepExplanations(
  locale: 'lt' | 'en',
  context: M9DataWorkflowContext = 'm9'
): StepExplanation[] {
  if (context === 'm7_master') {
    return locale === 'en'
      ? M9_DATA_WORKFLOW_STEP_EXPLANATIONS_M7_EN
      : M9_DATA_WORKFLOW_STEP_EXPLANATIONS_M7_LT;
  }
  return locale === 'en'
    ? M9_DATA_WORKFLOW_STEP_EXPLANATIONS_M9_EN
    : M9_DATA_WORKFLOW_STEP_EXPLANATIONS_M9_LT;
}

/** Modulio 9 sk. 93 – kopijuojami promptai pagal workflow žingsnį */
export interface M9WorkflowPromptStep extends StepExplanation {
  copyable: string;
}

const M9_WORKFLOW_PROMPTS_LT: M9WorkflowPromptStep[] = [
  {
    title: 'Duomenų surinkimas',
    body: 'Patikslink ar išplėsk katalogą – oficialūs, vieši, atnaujinimo dažnis.',
    copyable:
      'Patikslink arba išplėsk šaltinių katalogą temai [X]: oficialūs, vieši šaltiniai; nurodyk atnaujinimo dažnį ir formatą (CSV, API, ataskaitos). Pridėk trumpą aprašymą kiekvienam. Jei jau turi lentelę – papildyk trūkstamus URL / dažnius, nekurk visko iš naujo.',
  },
  {
    title: 'Metodikos promptas',
    body: 'Paruošk analizės metodikos šabloną – struktūra, rodikliai.',
    copyable:
      'ROLE: Tu esi verslo analitikas, kuris paruošia analizės metodiką.\nTASK: Paruošk analizės metodikos šabloną temai [X].\nCONTEXT: Reikia aiškios struktūros – ką analizuoti, kokius rodiklius naudoti.\nOUTPUT: Lentelės struktūra su stulpeliais – Šaltinis, Rodiklis, Laikotarpis, Pastaba. Pridėk 5–7 konkretų rodiklių ir 3 šaltinius su nuorodomis.',
  },
  {
    title: 'Deep research promptas',
    body: 'Paruošk gilaus tyrimo promptą – dar nepaliek DI.',
    copyable:
      'ROLE: Tu esi vyresnysis verslo analitikas. Naudok tik patikimus, cituotus šaltinius.\nTASK: Atlik gilųjį tyrimą (deep research) temoje: [X].\nUžduotis: Išanalizuok tendencijas, pagrindinius rodiklius, rizikas ir galimybes. Sub-klausimai: (1) Kas vyksta rinkoje? (2) Kokie pagrindiniai KPI? (3) Kokios 3 didžiausios rizikos?\nOUTPUT: Santrauka (max 1 puslapis), faktų sąrašas su datomis, šaltinių nuorodos. Jei duomenų nėra arba nežinai – parašyk „Nežinau“, nespėliok. Kiekvieną skaičių susiek su šaltiniu.',
  },
  {
    title: 'Paleidimas (1–4 DI)',
    body: 'Paleisk tą patį promptą 1–4 prieinamuose DI – pakanka 1–2.',
    copyable:
      'ROLE: Tu esi vyresnysis verslo analitikas. Naudok tik patikimus, cituotus šaltinius.\nTASK: Atlik gilųjį tyrimą (deep research) temoje: [X].\nUžduotis: Išanalizuok tendencijas, pagrindinius rodiklius, rizikas ir galimybes. Sub-klausimai: (1) Kas vyksta rinkoje? (2) Kokie pagrindiniai KPI? (3) Kokios 3 didžiausios rizikos?\nOUTPUT: Santrauka (max 1 puslapis), faktų sąrašas su datomis, šaltinių nuorodos. Jei duomenų nėra – parašyk „Nežinau“, nespėliok.\nINSTRUKCIJA SAU: paleisk šį promptą 1–4 prieinamuose DI (ChatGPT, Gemini, DeepSeek, Grok – kiek turi; pakanka 1–2). Rezultatus vėliau sujungsi.',
  },
  {
    title: 'Duomenų valymas',
    body: 'Checklist – ta pati logika kaip Modulyje 7 skaidrėje „Duomenų paruošimas ir darbo eiga“.',
    copyable:
      'Štai DI tyrimo išvestys (1–4). Užduotis:\n1. Išvalyk: pašalink dublius ir pasikartojančius faktus.\n2. Suvienodink datas (formatas YYYY-MM-DD) ir skaičius (dešimtainis su kableliu arba tašku – nurodyk).\n3. Pažymėk trūkstamas reikšmes ir faktus be šaltinio – jei nežinai, rašyk „Nežinau“.\n4. Pridėk metaduomenis: šaltinis (kuris DI), data, tema.\nChecklist prieš analizę: anonimizacija (jei reikia), formatų suvienodinimas, dublių šalinimas, trūkstamų reikšmių identifikavimas – žr. Modulio 7 skaidrę „Duomenų paruošimas ir darbo eiga“.',
  },
  {
    title: 'Duomenų integracija',
    body: 'Sujunk 4 tyrimo fragmentus į vieną markdown dokumentą.',
    copyable:
      'Sujunk šiuos 4 tyrimo fragmentus (iš ChatGPT, Gemini, DeepSeek, Grok) į vieną dokumentą.\nReikalavimai: viena markdown struktūra su skyriais (1. Santrauka, 2. Faktai ir rodikliai, 3. Rizikos, 4. Šaltiniai). Kiekvienas faktas su žyme [šaltinis: ChatGPT/Gemini/DeepSeek/Grok]. Pašalink visus dublius – palik tik unikalius punktus. Pridėk bendrą išvadų skyrių (max 5 sakiniai).',
  },
  {
    title: 'Atvaizdavimas',
    body: 'Nurodyk parametrus – spalvos (hex), ašys, legenda, 2 grafikų tipai, KPI blokai.',
    copyable:
      'ROLE: Tu esi duomenų vizualizacijos ekspertas. Mažai kodo – daug aišių instrukcijų.\nTASK: Paruošk vizualizacijos specifikaciją iš šių integruotų duomenų.\nCONTEXT: Turiu vieną suvestinį dokumentą (surinktas + išvalyti + sujungti iš 4 DI tyrimų). Tikslas – dashboard vadovybei.\nOUTPUT – nurodyk parametrus:\n1. Spalvos: pagrindinė (hex), antrinė (hex), akcentas (įspėjimams/pozityviam) (hex).\n2. Grafikų pavadinimai: X ašis, Y ašis, diagramos pavadinimas, legenda – konkrečiai pagal mano duomenis.\n3. Dinamika: kokius 2 grafikus rekomenduotum? (pvz. laiko eilė, palyginimas pagal kategoriją.) Tipas: stulpelinė / linijinė / skritulinė.\n4. KPI blokai: kokius 3–4 skaičius parodyti viršuje?\nPateik konkretų tekstą, kurį galiu nukopijuoti į Claude arba ChatGPT ir gauti .html dashboard kodą.',
  },
  {
    title: '.html dashboard',
    body: 'Pilnas .html – nukopijuoti į Notepad, išsaugoti, atidaryti naršyklėje.',
    copyable:
      'Sugeneruok vieną pilną .html failą su įterptu CSS ir, jei reikia, minimaliu JavaScript (pvz. Chart.js per CDN), kuris atvaizduoja dashboard temai: [X].\nReikalavimai: antraštė, 2–3 KPI blokai (skaičiai ar placeholder), 1–2 grafikai (stulpelinė arba linijinė). Kodas turi būti pilnas – kad galėčiau nukopijuoti į Notepad, išsaugoti kaip .html ir atidaryti naršyklėje be papildomų failų. Naudok spalvas ir pavadinimus, kuriuos nurodžiau [arba: pagrindinė #2563eb, antrinė #64748b, akcentas #10b981]. Komentaras faile: „Modulio 9 pavyzdys – gali pakeisti duomenis ir spalvas.“',
  },
];

const M9_WORKFLOW_PROMPTS_EN: M9WorkflowPromptStep[] = [
  {
    title: 'Data collection',
    body: 'Refine or expand the catalog – official, public, refresh cadence.',
    copyable:
      'Refine or expand the source catalog for topic [X]: official, public sources; note refresh cadence and format (CSV, API, reports). Add a short description for each. If you already have a table – fill missing URLs / cadence; do not rebuild from scratch.',
  },
  {
    title: 'Methodology prompt',
    body: 'Prepare analysis methodology template – structure, KPIs.',
    copyable:
      'ROLE: You are a business analyst preparing analysis methodology.\nTASK: Prepare an analysis methodology template for topic [X].\nCONTEXT: Need clear structure – what to analyze, which KPIs to use.\nOUTPUT: Table structure with columns – Source, KPI, Period, Note. Add 5–7 concrete KPIs and 3 sources with links.',
  },
  {
    title: 'Deep research prompt',
    body: 'Prepare the deep-research prompt – do not run tools yet.',
    copyable:
      'ROLE: You are a senior business analyst. Use only reliable, cited sources.\nTASK: Perform deep research on: [X].\nTask: Analyze trends, key KPIs, risks and opportunities. Sub-questions: (1) What is happening in the market? (2) What are the main KPIs? (3) What are the top 3 risks?\nOUTPUT: Summary (max 1 page), fact list with dates, source links. If data is missing or unknown – write "I don\'t know", do not guess. Tie every number to a source.',
  },
  {
    title: 'Run tools (1–4 AI)',
    body: 'Run the same prompt on 1–4 available AI tools – 1–2 is enough.',
    copyable:
      'ROLE: You are a senior business analyst. Use only reliable, cited sources.\nTASK: Perform deep research on: [X].\nTask: Analyze trends, key KPIs, risks and opportunities. Sub-questions: (1) What is happening in the market? (2) What are the main KPIs? (3) What are the top 3 risks?\nOUTPUT: Summary (max 1 page), fact list with dates, source links. If data is missing – write "I don\'t know", do not guess.\nSELF NOTE: run this prompt on 1–4 available AI tools (ChatGPT, Gemini, DeepSeek, Grok – whatever you have; 1–2 is enough). Merge results later.',
  },
  {
    title: 'Data cleaning',
    body: 'Checklist – same logic as Module 7 slide "Data preparation and work process".',
    copyable:
      'Here are AI research outputs (1–4). Task:\n1. Clean: remove duplicates and repeated facts.\n2. Normalize dates (YYYY-MM-DD) and numbers (decimal format – specify).\n3. Mark missing values and claims without sources – if unknown, write "I don\'t know".\n4. Add metadata: source (which AI tool), date, topic.\nPre-analysis checklist: anonymisation (if needed), format normalization, dedupe, missing values – see Module 7 slide "Data preparation and work process".',
  },
  {
    title: 'Data integration',
    body: 'Merge four research fragments into one markdown document.',
    copyable:
      'Merge these 4 research fragments (from ChatGPT, Gemini, DeepSeek, Grok) into one document.\nRequirements: single markdown structure with sections (1. Summary, 2. Facts and KPIs, 3. Risks, 4. Sources). Each fact tagged [source: ChatGPT/Gemini/DeepSeek/Grok]. Remove all duplicates – keep only unique points. Add overall conclusions section (max 5 sentences).',
  },
  {
    title: 'Visualization',
    body: 'Specify parameters – colors (hex), axes, legend, 2 chart types, KPI blocks.',
    copyable:
      'ROLE: You are a data visualization expert. Minimal code – clear instructions.\nTASK: Prepare visualization spec from integrated data.\nCONTEXT: I have one summary document (collected + cleaned + merged from 4 AI runs). Goal – executive dashboard.\nOUTPUT – specify:\n1. Colors: primary (hex), secondary (hex), accent (hex).\n2. Chart labels: X axis, Y axis, chart title, legend – specific to my data.\n3. Dynamics: which 2 charts? (e.g. time series, category comparison.) Type: bar / line / pie.\n4. KPI blocks: which 3–4 numbers to show on top?\nProvide concrete text I can copy into Claude or ChatGPT to get .html dashboard code.',
  },
  {
    title: '.html dashboard',
    body: 'Full .html – copy to Notepad, save, open in browser.',
    copyable:
      'Generate one complete .html file with embedded CSS and minimal JavaScript if needed (e.g. Chart.js via CDN) for dashboard topic: [X].\nRequirements: title, 2–3 KPI blocks (numbers or placeholders), 1–2 charts (bar or line). Code must be complete – copy to Notepad, save as .html, open in browser without extra files. Use colors and labels I specified [or: primary #2563eb, secondary #64748b, accent #10b981]. File comment: "Module 9 example – you can change data and colors."',
  },
];

export function getM9WorkflowPrompts(
  locale: 'lt' | 'en'
): M9WorkflowPromptStep[] {
  return locale === 'en' ? M9_WORKFLOW_PROMPTS_EN : M9_WORKFLOW_PROMPTS_LT;
}
