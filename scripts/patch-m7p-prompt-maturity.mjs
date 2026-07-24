#!/usr/bin/env node
/**
 * M7P prompt maturity patch (I1–I4):
 * - Type F: MASTER, path-steps, 732/92 Nežinau
 * - Type S: 73/89/90/731 + full journey siblings
 * - Chrome: Kam tai? → Trumpai; Ką daryti → Daryk dabar
 * - Mid F + viz Patikra/Nežinau
 *
 * Updates: modules.json, modules-en-m7-m9.json,
 * modules-journey-m7.json, modules-journey-en-m7.json
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const JOURNEYS = [
  'pardavimai',
  'rinkodara',
  'it-inzinerija',
  'personalas',
  'vadyba',
  'kita',
];

const LT = {
  pardavimai: {
    roleF: 'patyręs duomenų analitikas (pardavimai)',
    roleShort: 'pardavimų analitikas',
    topic: 'pardavimų',
    sources: 'CRM, ERP, e-commerce',
    eda: 'top produktai, regionai, tendencijos',
    forecast: 'Q4, atsargos',
    recs: 'Strateginės rekomendacijos',
    table: 'pardavimų',
    metrics: 'pajamos, kiekiai, kaina',
    corrHint: 'kaina vs kiekis, regionas vs pajamos',
    domainNoun: 'pardavimų',
  },
  rinkodara: {
    roleF: 'patyręs rinkos analitikas (rinkodara)',
    roleShort: 'rinkodaros analitikas',
    topic: 'rinkodaros',
    sources: 'kampanijos, socialiniai tinklai, web analytics',
    eda: 'kanalai, turinys, sentimentas',
    forecast: 'reach, konversija',
    recs: 'Strateginės rekomendacijos',
    table: 'rinkodaros / kampanijų',
    metrics: 'CTR, CPC, konversijos',
    corrHint: 'biudžetas vs konversija, kanalas vs engagement',
    domainNoun: 'rinkodaros',
  },
  'it-inzinerija': {
    roleF: 'patyręs duomenų inžinierius (IT)',
    roleShort: 'duomenų inžinierius',
    topic: 'duomenų sistemos',
    sources: 'DB, API, logai, failai',
    eda: 'apimtys, klaidos, vėlavimai',
    forecast: 'apkrova, ETL',
    recs: 'Automatizavimo rekomendacijos',
    table: 'pipeline / kokybės',
    metrics: 'vėlavimas, klaidos, eilės ilgis',
    corrHint: 'apkrova vs klaidos, šaltinis vs vėlavimas',
    domainNoun: 'pipeline',
  },
  personalas: {
    roleF: 'patyręs HR analitikas (personalas)',
    roleShort: 'HR analitikas',
    topic: 'darbuotojų',
    sources: 'HRIS, apklausos, įdarbinimo portalai',
    eda: 'įdarbinimas, atskyrimas, retention',
    forecast: 'headcount, rizika',
    recs: 'Strateginės rekomendacijos',
    table: 'HR',
    metrics: 'tenure, atlygis, eNPS',
    corrHint: 'tenure vs atrition, padalinys vs eNPS',
    domainNoun: 'HR',
  },
  vadyba: {
    roleF: 'patyręs strateginis verslo analitikas (vadyba)',
    roleShort: 'strateginis analitikas',
    topic: 'verslo',
    sources: 'KPI, finansai, operacijos',
    eda: 'rodikliai, tendencijos, rizikos',
    forecast: 'scenarijai',
    recs: 'Sprendimų rekomendacijos',
    table: 'vadovybės KPI',
    metrics: 'pajamos, marža, tikslų %',
    corrHint: 'tikslas vs faktas, padalinys vs rizika',
    domainNoun: 'verslo KPI',
  },
  kita: {
    roleF: 'patyręs duomenų analitikas',
    roleShort: 'verslo analitikas',
    topic: '[X]',
    sources: '[X] šaltiniai',
    eda: 'pagrindiniai dėsningumai',
    forecast: '[X] tendencija',
    recs: 'Strateginės rekomendacijos',
    table: '[X]',
    metrics: '[X] metrikos',
    corrHint: 'pagrindiniai ryšiai tarp kintamųjų',
    domainNoun: '[X]',
  },
};

const EN = {
  pardavimai: {
    roleF: 'experienced data analyst (sales)',
    roleShort: 'sales analyst',
    topic: 'sales',
    sources: 'CRM, ERP, e-commerce',
    eda: 'top products, regions, trends',
    forecast: 'Q4, inventory',
    recs: 'Strategic recommendations',
    table: 'sales',
    metrics: 'revenue, quantity, price',
    corrHint: 'price vs quantity, region vs revenue',
    domainNoun: 'sales',
  },
  rinkodara: {
    roleF: 'experienced market analyst (marketing)',
    roleShort: 'marketing analyst',
    topic: 'marketing',
    sources: 'campaigns, social, web analytics',
    eda: 'channels, content, sentiment',
    forecast: 'reach, conversion',
    recs: 'Strategic recommendations',
    table: 'marketing / campaign',
    metrics: 'CTR, CPC, conversions',
    corrHint: 'budget vs conversion, channel vs engagement',
    domainNoun: 'marketing',
  },
  'it-inzinerija': {
    roleF: 'experienced data engineer (IT)',
    roleShort: 'data engineer',
    topic: 'data systems',
    sources: 'DB, API, logs, files',
    eda: 'volume, errors, latency',
    forecast: 'load, ETL',
    recs: 'Automation recommendations',
    table: 'pipeline / quality',
    metrics: 'latency, errors, queue length',
    corrHint: 'load vs errors, source vs latency',
    domainNoun: 'pipeline',
  },
  personalas: {
    roleF: 'experienced HR analyst',
    roleShort: 'HR analyst',
    topic: 'people / workforce',
    sources: 'HRIS, surveys, hiring portals',
    eda: 'hiring, attrition, retention',
    forecast: 'headcount, risk',
    recs: 'Strategic recommendations',
    table: 'HR',
    metrics: 'tenure, pay, eNPS',
    corrHint: 'tenure vs attrition, team vs eNPS',
    domainNoun: 'HR',
  },
  vadyba: {
    roleF: 'experienced strategic business analyst',
    roleShort: 'strategic analyst',
    topic: 'business',
    sources: 'KPIs, finance, operations',
    eda: 'metrics, trends, risks',
    forecast: 'scenarios',
    recs: 'Decision recommendations',
    table: 'executive KPI',
    metrics: 'revenue, margin, goal %',
    corrHint: 'target vs actual, unit vs risk',
    domainNoun: 'business KPI',
  },
  kita: {
    roleF: 'experienced data analyst',
    roleShort: 'business analyst',
    topic: '[X]',
    sources: '[X] sources',
    eda: 'key patterns',
    forecast: '[X] trend',
    recs: 'Strategic recommendations',
    table: '[X]',
    metrics: '[X] metrics',
    corrHint: 'key variable relationships',
    domainNoun: '[X]',
  },
};

const NEZ_LT =
  'Jei trūksta duomenų – parašyk „Nežinau“ ir nurodyk, ko reikia; ne spėliok.';
const NEZ_EN =
  'If data is missing – write “I don’t know” and say what is missing; do not guess.';
const RULE_LT = `RULE: ${NEZ_LT}`;
const RULE_EN = `RULE: ${NEZ_EN}`;

function masterLt(j) {
  const d = LT[j];
  return `META: Tu esi ${d.roleF}. Tikslas: pilna ${d.topic} analizė temai [X].\n\nINPUT: Tema – [X]. Duomenys: [įklijuok arba aprašyk šaltinius: ${d.sources}]. ${NEZ_LT}\n\nOUTPUT: Pateik 8 blokus:\n1. Duomenų šaltiniai (${d.sources})\n2. Duomenų struktūra\n3. Valymas\n4. EDA (${d.eda})\n5. Vizualizacijos pasiūlymai\n6. Įžvalgos\n7. Prognozės (${d.forecast})\n8. ${d.recs}`;
}

function masterEn(j) {
  const d = EN[j];
  return `META: You are an ${d.roleF}. Goal: full ${d.topic} analysis on topic [X].\n\nINPUT: Topic – [X]. Data: [paste or describe sources: ${d.sources}]. ${NEZ_EN}\n\nOUTPUT: Provide 8 blocks:\n1. Data sources (${d.sources})\n2. Data structure\n3. Cleaning\n4. EDA (${d.eda})\n5. Visualization suggestions\n6. Insights\n7. Forecasts (${d.forecast})\n8. ${d.recs}`;
}

function withRule(text, rule) {
  if (text.includes('Nežinau') || text.includes("I don’t know") || text.includes("I don't know")) {
    return text;
  }
  return `${text.replace(/\s+$/, '')}\n\n${rule}`;
}

function stageLt(j, kind) {
  const d = LT[j];
  const map = {
    'pipeline-overview': `Duomenys: tema [X] (${d.domainNoun})\nPadaryk: išvardink 10 galimų ${d.domainNoun} duomenų šaltinių (pvz. ${d.sources})\nFormatas: 1) šaltinis 2) tipas 3) ką duoda 4) kaip pasiekti`,
    'pipeline-prep': `Duomenys: [įklijuok ${d.table} lentelę]\nPadaryk: rask trūkstamas reikšmes ir pasiūlyk užpildymo metodus\nFormatas: 1) stulpelis 2) % trūkumo 3) metodas 4) rizika jei nepataisysi`,
    'pipeline-eda': `Duomenys: [įklijuok ${d.table} duomenis]\nPadaryk: identifikuok 5 svarbiausius dėsningumus\nFormatas: 1) dėsningumas 2) įrodymas skaičiais 3) verslo reikšmė`,
    'pipeline-viz': `Duomenys: [įklijuok ${d.table} duomenis]\nPadaryk: pasiūlyk 3 grafikus šiai analizei\nFormatas: 1) grafiko tipas 2) ašys / matmenys 3) kokia įžvalga`,
    'pipeline-publish': `Duomenys: [įklijuok ${d.table} įžvalgas arba lentelę]\nPadaryk: sugeneruok vadovų ataskaitą su rekomendacijomis\nFormatas: 1) santrauka 2) 3 įžvalgos 3) 3 veiksmai 4) rizikos`,
    'algo-sources': `Duomenys: tema [X] (${d.domainNoun})\nPadaryk: sudaryk 20 viešų duomenų šaltinių Lietuvoje sąrašą su nuorodomis\nFormatas: šaltinis | URL | tipas | atnaujinimo dažnis`,
    'algo-structure': `Duomenys: [šaltinių sąrašas arba tema [X]]\nPadaryk: sukurk lentelę šaltiniams struktūruoti\nFormatas: stulpeliai kategorija, šaltinis, URL, atnaujinimo dažnis + 5 pavyzdinės eilutės`,
    'algo-collect': `Duomenys: [šaltinių lentelė arba sąrašas]\nPadaryk: priskirk šiuos rinkinius kategorijoms\nFormatas: kategorija | rinkinys | kodėl tinka | prioriteta`,
    'algo-clean': `Duomenys: [įklijuok ${d.table} lentelę]\nPadaryk: pašalink dubliavimus; rask trūkstamas reikšmes ir pasiūlyk užpildymą\nFormatas: 1) dubliai 2) trūkumai 3) veiksmai 4) kas lieka neaišku`,
    'algo-export': `Duomenys: [įklijuok sutvarkytą ${d.table} lentelę]\nPadaryk: paruošk CSV eksportui\nFormatas: 1) stulpelių sąrašas 2) koduotė UTF-8 3) 3 patikros prieš eksportą`,
    'eda-stats': `Duomenys: [įklijuok ${d.table} duomenis]\nPadaryk: pateik vidurkį, medianą, IQR ir standartinį nuokrypį (${d.metrics})\nFormatas: metrika | vidurkis | mediana | IQR | SD | 1 sakinio interpretacija`,
    'eda-corr': `Duomenys: [įklijuok ${d.table} duomenis]\nPadaryk: apskaičiuok koreliacijų matricą ir paaiškink ryšius (pvz. ${d.corrHint})\nFormatas: 1) matrica / top poros 2) paaiškinimas 3) ką tikrinti toliau`,
    'eda-anomaly': `Duomenys: [įklijuok ${d.table} duomenis]\nPadaryk: identifikuok outlierius pagal IQR metodą\nFormatas: 1) kuri eilutė/stulpelis 2) kodėl outlieris 3) ar klaida ar signalas 4) ką daryti`,
    'eda-hypotheses': `Duomenys: [įklijuok ${d.table} duomenis arba santrauką]\nPadaryk: pasiūlyk 3 hipotezes, kurias verta testuoti\nFormatas: hipotezė | kodėl svarbi | kokie duomenys patvirtintų / paneigtų`,
  };
  return map[kind];
}

function stageEn(j, kind) {
  const d = EN[j];
  const map = {
    'pipeline-overview': `Data: topic [X] (${d.domainNoun})\nDo: list 10 possible ${d.domainNoun} data sources (e.g. ${d.sources})\nFormat: 1) source 2) type 3) what it gives 4) how to access`,
    'pipeline-prep': `Data: [paste ${d.table} table]\nDo: find missing values and suggest fill methods\nFormat: 1) column 2) % missing 3) method 4) risk if not fixed`,
    'pipeline-eda': `Data: [paste ${d.table} data]\nDo: identify 5 most important patterns\nFormat: 1) pattern 2) evidence in numbers 3) business meaning`,
    'pipeline-viz': `Data: [paste ${d.table} data]\nDo: suggest 3 charts for this analysis\nFormat: 1) chart type 2) axes / dimensions 3) insight`,
    'pipeline-publish': `Data: [paste ${d.table} insights or table]\nDo: generate an executive report with recommendations\nFormat: 1) summary 2) 3 insights 3) 3 actions 4) risks`,
    'algo-sources': `Data: topic [X] (${d.domainNoun})\nDo: list 20 public data sources in Lithuania with links\nFormat: source | URL | type | update frequency`,
    'algo-structure': `Data: [source list or topic [X]]\nDo: create a table to structure sources\nFormat: columns category, source, URL, update frequency + 5 sample rows`,
    'algo-collect': `Data: [source table or list]\nDo: assign these datasets to categories\nFormat: category | dataset | why it fits | priority`,
    'algo-clean': `Data: [paste ${d.table} table]\nDo: remove duplicates; find missing values and suggest fills\nFormat: 1) duplicates 2) gaps 3) actions 4) what remains unclear`,
    'algo-export': `Data: [paste cleaned ${d.table} table]\nDo: prepare CSV for export\nFormat: 1) column list 2) UTF-8 encoding 3) 3 checks before export`,
    'eda-stats': `Data: [paste ${d.table} data]\nDo: provide mean, median, IQR and standard deviation (${d.metrics})\nFormat: metric | mean | median | IQR | SD | 1-sentence interpretation`,
    'eda-corr': `Data: [paste ${d.table} data]\nDo: compute a correlation matrix and explain links (e.g. ${d.corrHint})\nFormat: 1) matrix / top pairs 2) explanation 3) what to check next`,
    'eda-anomaly': `Data: [paste ${d.table} data]\nDo: identify outliers using the IQR method\nFormat: 1) row/column 2) why outlier 3) error or signal 4) what to do`,
    'eda-hypotheses': `Data: [paste ${d.table} data or summary]\nDo: propose 3 hypotheses worth testing\nFormat: hypothesis | why it matters | what data would confirm / reject`,
  };
  return map[kind];
}

function typesLt(j) {
  const d = LT[j];
  return {
    'types-descriptive': `Duomenys: [įklijuok ${d.table} duomenis]\nPadaryk: apibendrink – kas įvyko\nFormatas:\n- Top 5 vienetai pagal pagrindinį KPI\n- Segmentai su didžiausiu pokyčiu\n- Sezoniškumo / laikotarpio tendencijos\n- Koncentracija (% nuo top 20%)`,
    'types-diagnostic': `Duomenys: [įklijuok ${d.table} duomenis + stebimą pokytį]\nPadaryk: paaiškink kodėl pokytis įvyko\nFormatas:\n- Galimos priežastys\n- Ką patikrinti pirmiausia\n- Išoriniai vs vidiniai veiksniai\n- Ko dar trūksta duomenyse`,
    'types-predictive': `Duomenys: [įklijuok ${d.table} istoriją]\nPadaryk: prognozuok artimiausią laikotarpį\nFormatas:\n- Prognozė (${d.forecast})\n- Sezoniškumo / piko įtaka\n- Rizika (% arba lygis)\n- Prielaidos`,
    'types-prescriptive': `Duomenys: [prognozė arba ${d.table} santrauka]\nPadaryk: pasiūlyk ką daryti toliau\nFormatas:\n- 3 veiksmai prioriteto tvarka\n- Ko nedaryti\n- Kaip matuosime sėkmę\n- Pirmas žingsnis šią savaitę`,
  };
}

function typesEn(j) {
  const d = EN[j];
  return {
    'types-descriptive': `Data: [paste ${d.table} data]\nDo: summarize what happened\nFormat:\n- Top 5 units by main KPI\n- Segments with biggest change\n- Seasonality / period trends\n- Concentration (% from top 20%)`,
    'types-diagnostic': `Data: [paste ${d.table} data + observed change]\nDo: explain why the change happened\nFormat:\n- Possible causes\n- What to check first\n- External vs internal factors\n- What data is still missing`,
    'types-predictive': `Data: [paste ${d.table} history]\nDo: forecast the next period\nFormat:\n- Forecast (${d.forecast})\n- Seasonality / peak impact\n- Risk (% or level)\n- Assumptions`,
    'types-prescriptive': `Data: [forecast or ${d.table} summary]\nDo: recommend what to do next\nFormat:\n- 3 actions by priority\n- What not to do\n- How we will measure success\n- First step this week`,
  };
}

function pathStepBodiesLt() {
  return {
    71.1: (j) => {
      const d = LT[j];
      return withRule(
        `ROLE: Tu esi ${d.roleShort}.\nTASK: Sudaryk 3 žingsnių įrankių seką ${d.topic} analizei.\nCONTEXT: Duomenys iš ${d.sources} apie [X].\nOUTPUT: 1) Įrankis 1 + tikslas 2) Įrankis 2 + tikslas 3) Įrankis 3 + rezultatas (KPI / artefaktas).`,
        RULE_LT
      );
    },
    71.2: (j) => {
      const d = LT[j];
      return withRule(
        `ROLE: Tu esi ${d.roleShort} / tyrėjas.\nTASK: Parašyk sisteminį promptą ir gilaus tyrimo temą.\nCONTEXT: Noriu ištirti ${d.topic} veiksnius [X].\nOUTPUT: 1) Sisteminis promptas (rolė + taisyklės) 2) Tyrimo tema 3) 5 klausimai, į kuriuos turiu gauti atsakymą.`,
        RULE_LT
      );
    },
    71.3: (j) => {
      const d = LT[j];
      return withRule(
        `ROLE: Tu esi ${d.roleShort}.\nTASK: Paruošk 2–4 šaltinių sąrašą lygiagrečiam tyrimui.\nCONTEXT: Tema – ${d.topic} [X].\nOUTPUT: Lentelė: šaltinis | tipas (viešas/vidinis) | ką duoda | kodėl svarbu.`,
        RULE_LT
      );
    },
    71.4: (j) => {
      const d = LT[j];
      return withRule(
        `ROLE: Tu esi ${d.roleShort}.\nTASK: Sujunk 2 tyrimų atsakymus į sintezės lentelę.\nCONTEXT: Tema – ${d.topic} [X]. Įklijuoju 2 DI atsakymus.\nOUTPUT: 1) Kas sutampa 2) Kas skiriasi 3) 3 veiksmai komandai.`,
        RULE_LT
      );
    },
    71.5: (j) => {
      const d = LT[j];
      return withRule(
        `ROLE: Tu esi ${d.roleShort}.\nTASK: Paruošk duomenų masyvą tolesnei analizei.\nCONTEXT: Turiu sintezės išvadas apie ${d.topic} [X].\nOUTPUT: 1) Lentelės stulpeliai 2) 5–10 pavyzdinių eilučių 3) 3 KPI, kuriuos skaičiuosiu toliau.`,
        RULE_LT
      );
    },
  };
}

function pathStepBodiesEn() {
  return {
    71.1: (j) => {
      const d = EN[j];
      return withRule(
        `ROLE: You are a ${d.roleShort}.\nTASK: Build a 3-step tool sequence for ${d.topic} analysis.\nCONTEXT: Data from ${d.sources} about [X].\nOUTPUT: 1) Tool 1 + goal 2) Tool 2 + goal 3) Tool 3 + result (KPI / artefact).`,
        RULE_EN
      );
    },
    71.2: (j) => {
      const d = EN[j];
      return withRule(
        `ROLE: You are a ${d.roleShort} / researcher.\nTASK: Write a system prompt and a deep-research topic.\nCONTEXT: I want to research ${d.topic} drivers for [X].\nOUTPUT: 1) System prompt (role + rules) 2) Research topic 3) 5 questions I must answer.`,
        RULE_EN
      );
    },
    71.3: (j) => {
      const d = EN[j];
      return withRule(
        `ROLE: You are a ${d.roleShort}.\nTASK: Prepare a list of 2–4 sources for parallel research.\nCONTEXT: Topic – ${d.topic} [X].\nOUTPUT: Table: source | type (public/internal) | what it gives | why it matters.`,
        RULE_EN
      );
    },
    71.4: (j) => {
      const d = EN[j];
      return withRule(
        `ROLE: You are a ${d.roleShort}.\nTASK: Merge 2 research answers into a synthesis table.\nCONTEXT: Topic – ${d.topic} [X]. I will paste 2 AI answers.\nOUTPUT: 1) What matches 2) What differs 3) 3 actions for the team.`,
        RULE_EN
      );
    },
    71.5: (j) => {
      const d = EN[j];
      return withRule(
        `ROLE: You are a ${d.roleShort}.\nTASK: Prepare a data table for further analysis.\nCONTEXT: I have synthesis findings about ${d.topic} [X].\nOUTPUT: 1) Table columns 2) 5–10 sample rows 3) 3 KPIs I will compute next.`,
        RULE_EN
      );
    },
  };
}

function sentimentLt(j) {
  const d = LT[j];
  return withRule(
    `ROLE: Tu esi ${d.roleShort}.\nTASK: Atlik sentimentų analizę.\nCONTEXT: Įkeliu klientų / auditorijos atsiliepimus apie ${d.domainNoun} [X].\n\nOUTPUT:\n1. Bendra sentimentų struktūra (% teigiamų / neutralių / neigiamų)\n2. Dažniausios temos (su pasikartojimo skaičiumi)\n3. Emocijos intensyvumas (žemas / vidutinis / aukštas)\n4. Kritiniai skundai (top 5 pagal riziką)\n5. 3 prioritetiniai veiksmai\n\nTONE: Analitinis, konkretus, be bendrybių.`,
    RULE_LT
  );
}

function sentimentEn(j) {
  const d = EN[j];
  return withRule(
    `ROLE: You are a ${d.roleShort}.\nTASK: Run a sentiment analysis.\nCONTEXT: I will paste customer / audience feedback about ${d.domainNoun} [X].\n\nOUTPUT:\n1. Overall sentiment mix (% positive / neutral / negative)\n2. Top themes (with counts)\n3. Emotion intensity (low / medium / high)\n4. Critical complaints (top 5 by risk)\n5. 3 priority actions\n\nTONE: Analytical, concrete, no fluff.`,
    RULE_EN
  );
}

function biPlanLt(j) {
  const d = LT[j];
  return withRule(
    `ROLE: Tu esi ${d.roleShort}.\nTASK: Pateik 4 žingsnių BI planą temai [X].\nCONTEXT: ${d.topic} kontekstas; šaltiniai: ${d.sources}.\nOUTPUT:\n1. Surink – kokius šaltinius naudoti\n2. Analizuok – kokius EDA ir įžvalgų žingsnius atlikti\n3. Ataskaita – kaip vizualizuoti ir kam pateikti\n4. Prognozė – ką prognozuoti toliau (${d.forecast})`,
    RULE_LT
  );
}

function biPlanEn(j) {
  const d = EN[j];
  return withRule(
    `ROLE: You are a ${d.roleShort}.\nTASK: Provide a 4-step BI plan for topic [X].\nCONTEXT: ${d.topic} context; sources: ${d.sources}.\nOUTPUT:\n1. Collect – which sources to use\n2. Analyze – which EDA and insight steps\n3. Report – how to visualize and for whom\n4. Forecast – what to forecast next (${d.forecast})`,
    RULE_EN
  );
}

function midFLt(j) {
  const d = LT[j];
  return {
    'di-role-prompt': withRule(
      `ROLE: Tu esi ${d.roleF}.\nTASK: Parodyk, kaip DI gali padėti mano ${d.topic} analizės užduotyje.\nCONTEXT: Užduotis: [įrašyk]. Turimi duomenys: [įrašyk]. Sprendimas, kurį turiu priimti: [įrašyk].\nOUTPUT: 1) Ką DI gali padaryti pats 2) Ką turi patikrinti žmogus 3) Kokius duomenis dar reikia surinkti 4) Pirmas promptas, nuo kurio pradėti.`,
      RULE_LT
    ),
    'excel-clean-prompt': withRule(
      `ROLE: Tu esi ${d.roleShort}.\nTASK: Sudaryk Excel/CRM eksporto valymo planą.\nCONTEXT: Turiu ${d.table} eksportą apie [X].\nOUTPUT: 1) Kokius stulpelius tikrinti 2) Tipinės klaidos 3) Valymo žingsniai 4) Kada duomenys „pakankamai švarūs“ analizei.`,
      RULE_LT
    ),
    'role-activation': `Tavo rolė – vyresnysis ${d.roleShort}.\nMąstai sisteminiu principu.\nSprendimus grindži ${d.domainNoun} duomenimis, ne intuicija.`,
    'db-structure': withRule(
      `ROLE: Tu esi ${d.roleShort}.\nTASK: Padėk sukurti idealią duomenų bazės struktūrą.\nCONTEXT: ${d.topic} domenas (niša: [X]); šaltiniai: ${d.sources}.\nOUTPUT: 1) 6 pagrindinės lentelės 2) Ryšiai (ER logika) 3) KPI, kuriuos verta stebėti 4) Pirmas žingsnis.`,
      RULE_LT
    ),
    'viz-prompt': withRule(
      `ROLE: Tu esi ${d.roleShort}.\nTASK: Sugeneruok vizualizacijas ir įžvalgas.\nCONTEXT: Remdamasis šiais ${d.table} duomenimis:\n[duomenys]\nOUTPUT:\n1. Pagrindinę tendencijos diagramą\n2. Segmentų palyginimą\n3. Rizikų / galimybių vaizdą\n4. 3 pagrindines įžvalgas`,
      RULE_LT
    ),
    'forecast-prompt': withRule(
      `ROLE: Tu esi ${d.roleShort}.\nTASK: Paruošk 6 mėn. prognozę.\nCONTEXT: Remiantis 24 mėn. ${d.table} istorija:\n[duomenys arba nuoroda]\nOUTPUT:\n1. Prognozė (${d.forecast})\n2. Sezoniškumo įtaka\n3. Optimistinis ir pesimistinis scenarijus\n4. Pagrindinės rizikos`,
      RULE_LT
    ),
    'prep-clean': withRule(
      `ROLE: Tu esi ${d.roleShort}.\nTASK: Patikrink duomenis prieš analizę.\nCONTEXT: [įklijuok ${d.table} eksportą]\nOUTPUT:\n1. Ar reikalinga anonimizacija?\n2. Ar formatai suvienodinti (datos, skaičiai)?\n3. Ar pašalinti dubliavimai?\n4. Kur trūksta reikšmių ir kaip užpildyti?\n5. Ar stulpelių tipai teisingi?\n6. Ar pridėtos laiko / regiono žymės?\nPateik valymo ataskaitą ir siūlomus veiksmus.`,
      RULE_LT
    ),
    'template-data': withRule(
      `ROLE: Tu esi ${d.roleShort}.\nTASK: Sukurk 20 eilučių ${d.table} duomenų pavyzdį.\nCONTEXT: Tema [X]; reikia realistiškų stulpelių analizei.\nOUTPUT: Lentelė su stulpeliais + 20 eilučių + 2 apskaičiuoti rodikliai.`,
      RULE_LT
    ),
    'template-competitors': withRule(
      `ROLE: Tu esi ${d.roleShort}.\nTASK: Atlik konkurentų / alternatyvų analizę.\nCONTEXT: ${d.topic} rinka [X].\nOUTPUT: SWOT lentelė, 3 silpnos vietos, 3 galimybės, 30 dienų greito veiksmo planas.`,
      RULE_LT
    ),
    'template-cfo': withRule(
      `ROLE: Tu esi CFO asistentas (${d.domainNoun}).\nTASK: Įvertink finansinius / kaštų rodiklius.\nCONTEXT: [įklijuok ${d.table} skaičius arba aprašą]\nOUTPUT: 3 rizikos, 3 optimizavimo galimybės, kainų / biudžeto potencialas (%).`,
      RULE_LT
    ),
  };
}

function midFEn(j) {
  const d = EN[j];
  return {
    'di-role-prompt': withRule(
      `ROLE: You are an ${d.roleF}.\nTASK: Show how AI can help my ${d.topic} analysis task.\nCONTEXT: Task: [write]. Available data: [write]. Decision I must make: [write].\nOUTPUT: 1) What AI can do alone 2) What a human must check 3) What data to collect next 4) First prompt to start with.`,
      RULE_EN
    ),
    'excel-clean-prompt': withRule(
      `ROLE: You are a ${d.roleShort}.\nTASK: Build a cleaning plan for an Excel/CRM export.\nCONTEXT: I have a ${d.table} export about [X].\nOUTPUT: 1) Columns to check 2) Typical errors 3) Cleaning steps 4) When data is “clean enough” for analysis.`,
      RULE_EN
    ),
    'role-activation': `Your role is a senior ${d.roleShort}.\nYou think in systems.\nYou ground decisions in ${d.domainNoun} data, not intuition.`,
    'db-structure': withRule(
      `ROLE: You are a ${d.roleShort}.\nTASK: Help design an ideal database structure.\nCONTEXT: ${d.topic} domain (niche: [X]); sources: ${d.sources}.\nOUTPUT: 1) 6 main tables 2) Relationships (ER logic) 3) KPIs worth tracking 4) First step.`,
      RULE_EN
    ),
    'viz-prompt': withRule(
      `ROLE: You are a ${d.roleShort}.\nTASK: Generate visualizations and insights.\nCONTEXT: Using this ${d.table} data:\n[data]\nOUTPUT:\n1. Main trend chart\n2. Segment comparison\n3. Risk / opportunity view\n4. 3 key insights`,
      RULE_EN
    ),
    'forecast-prompt': withRule(
      `ROLE: You are a ${d.roleShort}.\nTASK: Prepare a 6-month forecast.\nCONTEXT: Based on 24 months of ${d.table} history:\n[data or link]\nOUTPUT:\n1. Forecast (${d.forecast})\n2. Seasonality impact\n3. Optimistic and pessimistic scenarios\n4. Main risks`,
      RULE_EN
    ),
    'prep-clean': withRule(
      `ROLE: You are a ${d.roleShort}.\nTASK: Check data before analysis.\nCONTEXT: [paste ${d.table} export]\nOUTPUT:\n1. Is anonymization needed?\n2. Are formats aligned (dates, numbers)?\n3. Are duplicates removed?\n4. Where are gaps and how to fill them?\n5. Are column types correct?\n6. Are time / region tags added?\nProvide a cleaning report and recommended actions.`,
      RULE_EN
    ),
    'template-data': withRule(
      `ROLE: You are a ${d.roleShort}.\nTASK: Create a 20-row ${d.table} sample dataset.\nCONTEXT: Topic [X]; need realistic columns for analysis.\nOUTPUT: Table with columns + 20 rows + 2 calculated metrics.`,
      RULE_EN
    ),
    'template-competitors': withRule(
      `ROLE: You are a ${d.roleShort}.\nTASK: Run a competitor / alternatives analysis.\nCONTEXT: ${d.topic} market [X].\nOUTPUT: SWOT table, 3 weaknesses, 3 opportunities, 30-day quick-action plan.`,
      RULE_EN
    ),
    'template-cfo': withRule(
      `ROLE: You are a CFO assistant (${d.domainNoun}).\nTASK: Assess financial / cost metrics.\nCONTEXT: [paste ${d.table} numbers or description]\nOUTPUT: 3 risks, 3 optimization opportunities, pricing / budget upside (%).`,
      RULE_EN
    ),
  };
}

function findModule(data, id) {
  return (data.modules ?? []).find((m) => m.id === id);
}

function findSlide(mod, id) {
  return (mod.slides ?? []).find((s) => s.id === id || String(s.id) === String(id));
}

function setCopyable(slide, sectionIndex, text) {
  if (!slide?.content?.sections?.[sectionIndex]) {
    throw new Error(`Missing section ${sectionIndex} on slide ${slide?.id}`);
  }
  slide.content.sections[sectionIndex].copyable = text;
}

function renameChrome(slide, locale = 'lt') {
  if (!slide?.content?.sections) return;
  for (const sec of slide.content.sections) {
    const h = sec.heading || '';
    if (locale === 'lt') {
      if (/^1️⃣\s*Kam tai\??/i.test(h) || /^1️⃣\s*Kodėl čia\??/i.test(h)) {
        sec.heading = '1️⃣ Trumpai';
      } else if (/^2️⃣\s*Ką daryti/i.test(h)) {
        sec.heading = '2️⃣ Daryk dabar';
      } else if (/^2️⃣\s*Pasirink/i.test(h)) {
        sec.heading = '2️⃣ Daryk dabar';
      }
    } else {
      if (/^1️⃣\s*What is this for\??/i.test(h) || /^1️⃣\s*Why (here|this)\??/i.test(h)) {
        sec.heading = '1️⃣ In short';
      } else if (/^2️⃣\s*What to do/i.test(h) || /^2️⃣\s*Choose/i.test(h)) {
        sec.heading = '2️⃣ Do now';
      }
    }
  }
}

function ensurePatikra(slide, body, locale = 'lt') {
  const sections = slide.content?.sections;
  if (!sections) return;
  const has = sections.some((s) =>
    locale === 'lt'
      ? /Patikra/i.test(s.heading || '')
      : /Check|Quality/i.test(s.heading || '')
  );
  if (has) {
    const p = sections.find((s) =>
      locale === 'lt'
        ? /Patikra/i.test(s.heading || '')
        : /Check|Quality/i.test(s.heading || '')
    );
    if (p && body) p.body = body;
    return;
  }
  sections.push({
    heading: locale === 'lt' ? '4️⃣ Patikra (1 min)' : '4️⃣ Check (1 min)',
    body,
    blockVariant: 'accent',
  });
}

function buildJourneyFields(locale) {
  const stage = locale === 'lt' ? stageLt : stageEn;
  const types = locale === 'lt' ? typesLt : typesEn;
  const master = locale === 'lt' ? masterLt : masterEn;
  const path = locale === 'lt' ? pathStepBodiesLt() : pathStepBodiesEn();
  const sentiment = locale === 'lt' ? sentimentLt : sentimentEn;
  const bi = locale === 'lt' ? biPlanLt : biPlanEn;
  const mid = locale === 'lt' ? midFLt : midFEn;

  const fields = {};

  // Keep existing non-touched slides by merging later; build full replaced set for M7P slides
  const pipelineKeys = [
    'pipeline-overview',
    'pipeline-prep',
    'pipeline-eda',
    'pipeline-viz',
    'pipeline-publish',
  ];
  fields['73'] = Object.fromEntries(
    pipelineKeys.map((k) => [
      k,
      Object.fromEntries(JOURNEYS.map((j) => [j, stage(j, k)])),
    ])
  );

  const algoKeys = [
    'algo-sources',
    'algo-structure',
    'algo-collect',
    'algo-clean',
    'algo-export',
  ];
  fields['89'] = Object.fromEntries(
    algoKeys.map((k) => [
      k,
      Object.fromEntries(JOURNEYS.map((j) => [j, stage(j, k)])),
    ])
  );

  const edaKeys = ['eda-stats', 'eda-corr', 'eda-anomaly', 'eda-hypotheses'];
  fields['90'] = Object.fromEntries(
    edaKeys.map((k) => [
      k,
      Object.fromEntries(JOURNEYS.map((j) => [j, stage(j, k)])),
    ])
  );

  fields['731'] = Object.fromEntries(
    ['types-descriptive', 'types-diagnostic', 'types-predictive', 'types-prescriptive'].map(
      (k) => [k, Object.fromEntries(JOURNEYS.map((j) => [j, types(j)[k]]))]
    )
  );

  fields['74'] = {
    'master-prompt': Object.fromEntries(JOURNEYS.map((j) => [j, master(j)])),
  };

  for (const id of ['71.1', '71.2', '71.3', '71.4', '71.5']) {
    fields[id] = {
      'step-task': Object.fromEntries(JOURNEYS.map((j) => [j, path[id](j)])),
    };
  }

  fields['732'] = {
    'sentiment-prompt': Object.fromEntries(JOURNEYS.map((j) => [j, sentiment(j)])),
  };
  fields['92'] = {
    'bi-plan': Object.fromEntries(JOURNEYS.map((j) => [j, bi(j)])),
  };

  const midKeysBySlide = {
    78: ['di-role-prompt'],
    '78.5': ['excel-clean-prompt'],
    83: ['role-activation'],
    84: ['db-structure'],
    86: ['viz-prompt'],
    87: ['forecast-prompt'],
    891: ['prep-clean'],
    733: ['template-data', 'template-competitors', 'template-cfo'],
  };
  for (const [slideId, keys] of Object.entries(midKeysBySlide)) {
    fields[slideId] = Object.fromEntries(
      keys.map((k) => [
        k,
        Object.fromEntries(JOURNEYS.map((j) => [j, mid(j)[k]])),
      ])
    );
  }

  return fields;
}

function mergeJourney(existing, patch) {
  const out = {
    moduleId: existing.moduleId ?? 7,
    version: (existing.version ?? 1) + 0,
    fields: { ...(existing.fields ?? {}) },
  };
  if (existing.locale) out.locale = existing.locale;
  for (const [slideId, slideFields] of Object.entries(patch)) {
    out.fields[slideId] = {
      ...(out.fields[slideId] ?? {}),
      ...slideFields,
    };
  }
  // preserve 734, 75 filters/reflection if not in patch
  return out;
}

function patchModuleSlides(mod, locale) {
  const isLt = locale === 'lt';
  const baseJ = 'pardavimai';
  const master = isLt ? masterLt : masterEn;
  const stage = isLt ? stageLt : stageEn;
  const types = isLt ? typesLt : typesEn;
  const path = isLt ? pathStepBodiesLt() : pathStepBodiesEn();
  const sentiment = isLt ? sentimentLt : sentimentEn;
  const bi = isLt ? biPlanLt : biPlanEn;
  const mid = isLt ? midFLt : midFEn;
  const rule = isLt ? RULE_LT : RULE_EN;
  const nezLine = isLt ? NEZ_LT : NEZ_EN;

  // 74 MASTER
  const s74 = findSlide(mod, 74);
  if (s74) {
    setCopyable(s74, 4, master(baseJ));
    renameChrome(s74, locale);
    ensurePatikra(
      s74,
      isLt
        ? `• Ar pakeitei [X] ir įklijavai / aprašei duomenis?\n• Ar gavai visus 8 blokus?\n• Jei DI spėliojo – ar paprašei „Nežinau“ ten, kur trūko duomenų?`
        : `• Did you replace [X] and paste / describe data?\n• Did you get all 8 blocks?\n• If the AI guessed – did you require “I don’t know” where data was missing?`,
      locale
    );
  }

  // path-steps
  for (const id of [71.1, 71.2, 71.3, 71.4, 71.5]) {
    const s = findSlide(mod, id);
    if (s) setCopyable(s, 0, path[String(id)](baseJ));
  }

  // 732 / 92
  const s732 = findSlide(mod, 732);
  if (s732) {
    setCopyable(s732, 2, sentiment(baseJ));
    renameChrome(s732, locale);
  }
  const s92 = findSlide(mod, 92);
  if (s92) {
    // bi-plan is sections[2] per registry; verify copyable exists
    const idx = s92.content.sections.findIndex((sec) => sec.copyable);
    if (idx >= 0) setCopyable(s92, idx, bi(baseJ));
    // second copyable on 92 if present – leave structure, add rule to first only
    renameChrome(s92, locale);
  }

  // 73 Type S
  const s73 = findSlide(mod, 73);
  if (s73) {
    const keys = [
      'pipeline-overview',
      'pipeline-prep',
      'pipeline-eda',
      'pipeline-viz',
      'pipeline-publish',
    ];
    keys.forEach((k, i) => setCopyable(s73, 3 + i, stage(baseJ, k)));
    renameChrome(s73, locale);
    ensurePatikra(
      s73,
      isLt
        ? `• Ar įklijavai duomenis / temą [X]?\n• Ar gavai Formatas punktus (ne tik bendrą tekstą)?`
        : `• Did you paste data / topic [X]?\n• Did you get the Format points (not only vague text)?`,
      locale
    );
  }

  // 89
  const s89 = findSlide(mod, 89);
  if (s89) {
    const keys = [
      'algo-sources',
      'algo-structure',
      'algo-collect',
      'algo-clean',
      'algo-export',
    ];
    keys.forEach((k, i) => setCopyable(s89, 3 + i, stage(baseJ, k)));
    renameChrome(s89, locale);
    ensurePatikra(
      s89,
      isLt
        ? `• Ar gavai lentelę / sąrašą pagal Formatas?\n• Ar žingsnis atitinka tavo vietą 5 žingsnių sekoje?`
        : `• Did you get a table / list matching Format?\n• Does the step match your place in the 5-step sequence?`,
      locale
    );
  }

  // 90
  const s90 = findSlide(mod, 90);
  if (s90) {
    const keys = ['eda-stats', 'eda-corr', 'eda-anomaly', 'eda-hypotheses'];
    keys.forEach((k, i) => setCopyable(s90, 2 + i, stage(baseJ, k)));
    renameChrome(s90, locale);
    ensurePatikra(
      s90,
      isLt
        ? `• Ar įklijavai duomenis?\n• Ar rezultatas turi Formatas struktūrą (ne tik vieną skaičių)?`
        : `• Did you paste data?\n• Does the result follow Format (not only a single number)?`,
      locale
    );
  }

  // 731
  const s731 = findSlide(mod, 731);
  if (s731) {
    const t = types(baseJ);
    setCopyable(s731, 3, t['types-descriptive']);
    setCopyable(s731, 4, t['types-diagnostic']);
    setCopyable(s731, 5, t['types-predictive']);
    setCopyable(s731, 6, t['types-prescriptive']);
    renameChrome(s731, locale);
    ensurePatikra(
      s731,
      isLt
        ? `• Ar tipas atitinka klausimą (kas / kodėl / kas bus / ką daryti)?\n• Ar įklijavai duomenis prieš paleisdamas?`
        : `• Does the type match the question (what / why / what next / what to do)?\n• Did you paste data before running?`,
      locale
    );
  }

  // Mid F slides
  const midMap = [
    [78, 3, 'di-role-prompt'],
    [78.5, 2, 'excel-clean-prompt'],
    [83, 2, 'role-activation'],
    [84, 3, 'db-structure'],
    [86, 2, 'viz-prompt'],
    [87, 2, 'forecast-prompt'],
    [891, 2, 'prep-clean'],
  ];
  for (const [id, idx, key] of midMap) {
    const s = findSlide(mod, id);
    if (!s) continue;
    const text = mid(baseJ)[key];
    if (s.content.sections[idx]?.copyable !== undefined) {
      setCopyable(s, idx, text);
    }
    renameChrome(s, locale);
  }

  // 733 templates
  const s733 = findSlide(mod, 733);
  if (s733) {
    const m = mid(baseJ);
    setCopyable(s733, 2, m['template-data']);
    setCopyable(s733, 3, m['template-competitors']);
    setCopyable(s733, 4, m['template-cfo']);
    renameChrome(s733, locale);
  }

  // 734 chrome + light Nežinau on filters
  const s734 = findSlide(mod, 734);
  if (s734) {
    renameChrome(s734, locale);
    for (let i = 3; i <= 6; i++) {
      const c = s734.content.sections[i]?.copyable;
      if (c && !c.includes('Nežinau') && !c.includes("don’t know") && !c.includes("don't know")) {
        s734.content.sections[i].copyable = withRule(c, rule);
      }
    }
  }

  // Viz 861 – add Nežinau to each copyable + Patikra
  const s861 = findSlide(mod, 861);
  if (s861) {
    for (const sec of s861.content.sections) {
      if (sec.copyable && !sec.copyable.includes('Nežinau') && !sec.copyable.includes("don’t know")) {
        sec.copyable = withRule(
          sec.copyable,
          isLt
            ? `Jei duomenų nepakanka – parašyk „Nežinau“ ir ko trūksta.`
            : `If data is insufficient – write “I don’t know” and what is missing.`
        );
      }
    }
    ensurePatikra(
      s861,
      isLt
        ? `• Ar gavai vizualizacijos pasiūlymą su 1–2 įžvalgomis?\n• Jei DI spėliojo – ar paprašei trūkstamų duomenų?`
        : `• Did you get a visualization suggestion with 1–2 insights?\n• If the AI guessed – did you ask for missing data?`,
      locale
    );
  }

  // 103 – Nežinau + Patikra
  const s103 = findSlide(mod, 103);
  if (s103) {
    renameChrome(s103, locale);
    for (const sec of s103.content.sections) {
      if (sec.copyable) {
        sec.copyable = withRule(sec.copyable, rule);
      }
    }
    ensurePatikra(
      s103,
      isLt
        ? `• Ar CONTEXT turi realius stulpelius / auditoriją?\n• Ar OUTPUT atsako į užduotį be spėlionių?`
        : `• Does CONTEXT include real columns / audience?\n• Does OUTPUT answer the task without guessing?`,
      locale
    );
  }

  // 106 – Nežinau on super + Patikra
  const s106 = findSlide(mod, 106);
  if (s106) {
    renameChrome(s106, locale);
    for (const sec of s106.content.sections) {
      if (sec.copyable) {
        sec.copyable = withRule(sec.copyable, rule);
      }
    }
    ensurePatikra(
      s106,
      isLt
        ? `• Ar aprašei stulpelius, laikotarpį ir auditoriją?\n• Ar paketas turi santrauką, grafikus ir veiksmą?\n• ${nezLine}`
        : `• Did you describe columns, period and audience?\n• Does the package include summary, charts and an action?\n• ${nezLine}`,
      locale
    );
  }

  // More branduolys chrome
  for (const id of [76, 77, 77.5, 84, 85, 88, 91, 94, 95, 97, 98, 100, 101, 104]) {
    const s = findSlide(mod, id);
    if (s) renameChrome(s, locale);
  }
}

function main() {
  const modulesPath = join(root, 'src', 'data', 'modules.json');
  const enPath = join(root, 'src', 'data', 'modules-en-m7-m9.json');
  const journeyLtPath = join(root, 'src', 'data', 'modules-journey-m7.json');
  const journeyEnPath = join(root, 'src', 'data', 'modules-journey-en-m7.json');

  const modules = JSON.parse(readFileSync(modulesPath, 'utf8'));
  const en = JSON.parse(readFileSync(enPath, 'utf8'));
  const journeyLt = JSON.parse(readFileSync(journeyLtPath, 'utf8'));
  const journeyEn = JSON.parse(readFileSync(journeyEnPath, 'utf8'));

  const mod7 = findModule(modules, 7);
  if (!mod7) throw new Error('Module 7 not found in modules.json');
  patchModuleSlides(mod7, 'lt');

  const enMod7 = findModule(en, 7);
  if (!enMod7) throw new Error('Module 7 not found in modules-en-m7-m9.json');
  patchModuleSlides(enMod7, 'en');

  const patchedLt = mergeJourney(journeyLt, buildJourneyFields('lt'));
  const patchedEn = mergeJourney(journeyEn, buildJourneyFields('en'));
  if (!patchedEn.locale) patchedEn.locale = 'en';

  writeFileSync(modulesPath, JSON.stringify(modules, null, 2) + '\n');
  writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n');
  writeFileSync(journeyLtPath, JSON.stringify(patchedLt, null, 2) + '\n');
  writeFileSync(journeyEnPath, JSON.stringify(patchedEn, null, 2) + '\n');

  console.log('M7P patch applied: modules.json, modules-en-m7-m9.json, journey LT/EN');
}

main();
