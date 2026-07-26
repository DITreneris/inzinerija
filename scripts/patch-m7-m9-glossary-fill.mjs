/**
 * M7–9 glossary fill (plan m7-9_glossary_fill).
 * Inserts LT + EN terms, sorts alpha, prints counts.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ltPath = path.join(root, 'src/data/glossary.json');
const enPath = path.join(root, 'src/data/glossary-en.json');

const ltNew = [
  // M7 §11 gaps
  {
    term: '4 analizės tipai',
    definition:
      'Keturi klausimų lygiai: aprašomoji (kas įvyko?), diagnostinė (kodėl?), nuspėjamoji (kas gali įvykti?), nurodomoji (kaip veikti?) – eilė nuo fakto iki veiksmo.',
    moduleId: 7,
  },
  {
    term: 'Data storytelling',
    definition:
      'Duomenų pasakojimas: skaičiai → grafika → naratyvas → istorija; vizualizacija kaip sprendimų įrankis, ne tik gražus grafikas.',
    moduleId: 7,
  },
  {
    term: 'Deming principas',
    definition:
      '„In God we trust, all others bring data“ – pirmiausia duomenys ir nuolatinis tobulinimas, ne vien intuicija. Pvz. prieš keisdamas procesą – parodyk matavimą.',
    moduleId: 7,
  },
  {
    term: 'Duomenimis grįsti sprendimai',
    definition:
      'Sprendimai, pagrįsti duomenų analize ir įžvalgomis, o ne vien nuojauta ar nuomone.',
    moduleId: 7,
  },
  {
    term: 'Duomenų analizė',
    definition:
      'Duomenų rinkimas, tvarkymas ir interpretavimas, kad galėtum suprasti praeitį, įvertinti dabartį ir prognozuoti ateitį – tada priimti sprendimą.',
    moduleId: 7,
  },
  {
    term: 'Geštalto principai',
    definition:
      'Vizualinio suvokimo taisyklės (artumas, panašumas, išskyrimas, sujungimas, tęstinumas, figūra–fonas ir kt.), kurias taikai grafikų ir dashboard dizaine.',
    moduleId: 7,
  },
  {
    term: 'MASTER PROMPTAS',
    definition:
      'Galutinis 8 žingsnių promptas pilnai duomenų analizei: šaltiniai, struktūra, valymas, EDA, vizualizacijos, įžvalgos, prognozės, rekomendacijos. Tai ne tas pats kaip Master promptas (M4 personalizacija).',
    moduleId: 7,
  },
  {
    term: 'Metaduomenys',
    definition:
      'Duomenys apie duomenis: aprašomieji (šaltinis, data), struktūriniai (schema, tipai), administraciniai (teisės, saugumas) – be jų DI analizė greitai tampa paviršinė.',
    moduleId: 7,
  },
  {
    term: 'Screenshot analizė',
    definition:
      'DI galimybė analizuoti ekrano nuotrauką – tekstą, kodą, grafikus, UI/UX – ir grąžinti struktūruotą išvadą. Pvz. dashboard nuotrauka → elementai, rizikos, prioritetai.',
    moduleId: 7,
  },
  {
    term: 'Sentimentų analizė',
    definition:
      'Teksto nuotaikos įvertinimas (teigiamas / neutralus / neigiamas) kartu su temomis, intensyvumu ir veiksmų rekomendacijomis.',
    moduleId: 7,
  },
  // M8 path-test pack
  {
    term: 'Bonus praktika',
    definition:
      'Neprivaloma užduotis po kelio testo – papildomas Copy→Patikra ciklas (pvz. screenshot ar vizualizacija), kad įtvirtintum įgūdį be balo spaudimo.',
    moduleId: 8,
  },
  {
    term: 'Kelio testas',
    definition:
      'Trumpas įvertinimas po Duomenų analizės kelio teorijos: ar esi pasiruošęs Modulio 9 projektui. Paprastai ≥70% – žalias signalas eiti toliau.',
    moduleId: 8,
  },
  {
    term: 'Pasiruošimo savitikra',
    definition:
      'Trumpi apšilimo klausimai prieš įskaitinį testą – be balo spaudimo, kad prisimintum pagrindines sąvokas (pvz. 6 vs 8 žingsniai).',
    moduleId: 8,
  },
  {
    term: 'Pilnas analizės šablonas',
    definition:
      '8 žingsnių modelis vienai temai: šaltiniai → struktūra → valymas → EDA → vizualizacijos → įžvalgos → prognozės → rekomendacijos. Skiriasi nuo 6 žingsnių analizės eigos (pipeline).',
    moduleId: 8,
  },
  {
    term: 'Vizualizacijos rizika',
    definition:
      'Grafiko ar dashboard pasirinkimo pavojus – klaidinanti interpretacija, netinkama auditorija ar per sudėtingas tipas. Prieš rodydamas vadovybei – įvardink 1–2 rizikas.',
    moduleId: 8,
  },
  // M9 practice pack
  {
    term: 'Duomenų rinkimas skriptu',
    definition:
      'Automatinis duomenų surinkimas (pvz. Python skriptas), kai šaltinis neturi patogaus eksporto – rezultatas dažnai CSV/Excel tolesnei analizei.',
    moduleId: 9,
  },
  {
    term: 'Finansų įžvalgos',
    definition:
      'DI padedama finansinių rodiklių ir tendencijų interpretacija – ne tik skaičiai lentelėje, o ką jie reiškia sprendimui.',
    moduleId: 9,
  },
  {
    term: 'Kombinuotas super promptas',
    definition:
      'Vienas promptas, kuris sujungia kelis analizės žingsnius ar metodus (pvz. valymas + EDA + rekomendacijos) – greitam end-to-end rezultatui.',
    moduleId: 9,
  },
  {
    term: 'Konkurentų analizė',
    definition:
      'Struktūruotas konkurentų (produktų, kainų, žinučių) palyginimas su DI – kad pamatytum spragas ir galimybes, ne tik „kas daro tą patį“.',
    moduleId: 9,
  },
  {
    term: 'Nuspėjamoji analizė',
    definition:
      'Klausimas „kas gali įvykti?“ – tendencijos, rizikos, scenarijai iš istorinių duomenų. Vienas iš 4 analizės tipų, dažnas prieš veiksmų planą.',
    moduleId: 9,
  },
  {
    term: 'Sintetiniai duomenys',
    definition:
      'Dirbtinai sugeneruoti duomenys mokymui ar prototipui, kai tikrų duomenų nėra arba negalima dalintis. Naudok atsargiai – jie ne atspindi realią populiaciją 1:1.',
    moduleId: 9,
  },
  {
    term: 'Socialinių tinklų stebėsena',
    definition:
      'Sistemingas viešų žinučių ir reakcijų stebėjimas (temos, sentimentas, influenceriai) – kad matytum, ką sako rinka, ne tik savo CRM.',
    moduleId: 9,
  },
  {
    term: 'Šaltinių katalogas',
    definition:
      'Sąrašas tavo analizės šaltinių (failai, URL, sistemos) su trumpu aprašu – pradinis Modulio 9 projekto žingsnis prieš valymą ir EDA.',
    moduleId: 9,
  },
];

const enNew = [
  // M7 §11 EN
  {
    term: '4 analysis types',
    definition:
      'Four question levels: descriptive (what happened?), diagnostic (why?), predictive (what might happen?), prescriptive (how to act?) – from fact to action.',
    moduleId: 7,
  },
  {
    term: 'Data storytelling',
    definition:
      'Turning numbers into a story: data → chart → narrative → decision. Visualization as a decision tool, not just a pretty graphic.',
    moduleId: 7,
  },
  {
    term: 'Deming principle',
    definition:
      '“In God we trust, all others bring data” – prioritize evidence and continuous improvement over gut feel alone.',
    moduleId: 7,
  },
  {
    term: 'Data-driven decisions',
    definition:
      'Choices based on analysis and insights, not only intuition or opinion.',
    moduleId: 7,
  },
  {
    term: 'Data analysis',
    definition:
      'Collecting, cleaning, and interpreting data so you can understand the past, assess the present, and forecast – then decide.',
    moduleId: 7,
  },
  {
    term: 'Gestalt principles',
    definition:
      'Visual-perception rules (proximity, similarity, figure–ground, continuity, and more) you apply when designing charts and dashboards.',
    moduleId: 7,
  },
  {
    term: 'MASTER PROMPT',
    definition:
      'The full 8-step prompt for end-to-end data analysis: sources, structure, cleaning, EDA, visuals, insights, forecasts, recommendations. Not the same as a Master prompt (M4 personalization context).',
    moduleId: 7,
  },
  {
    term: 'Metadata',
    definition:
      'Data about data: descriptive (source, date), structural (schema, types), administrative (rights, security). Without it, AI analysis stays shallow.',
    moduleId: 7,
  },
  {
    term: 'Screenshot analysis',
    definition:
      'Using AI to read a screen capture – text, code, charts, UI/UX – and return a structured review. Example: dashboard photo → elements, risks, priorities.',
    moduleId: 7,
  },
  {
    term: 'Sentiment analysis',
    definition:
      'Scoring text mood (positive / neutral / negative) plus themes, intensity, and action tips.',
    moduleId: 7,
  },
  // M7 decision frameworks (LT-only before)
  {
    term: 'Must / Should / Could / Won’t (MoSCoW)',
    definition:
      'Priority buckets for tasks or ideas by importance and urgency – helps you decide what to do first.',
    moduleId: 7,
  },
  {
    term: 'Low-hanging fruit',
    definition:
      'Opportunities that need little effort or cost but give a quick, visible result.',
    moduleId: 7,
  },
  {
    term: 'OK / Fail check',
    definition:
      'Fast quality gates: what clearly passes, what clearly fails, what is unclear, then a verdict (Pass / Fail / Pass with conditions).',
    moduleId: 7,
  },
  {
    term: 'Decision filter',
    definition:
      'A short method that turns analysis into an action (fix, prioritize, reject, test, expand) – not only a description.',
    moduleId: 7,
  },
  {
    term: 'Test / Invest / Kill (Kiss-Marry-Kill)',
    definition:
      'Portfolio choice for options (products, channels, ideas): which to only test, which to grow, which to drop.',
    moduleId: 7,
  },
  // M8
  {
    term: 'Bonus practice',
    definition:
      'Optional task after the path test – an extra Copy→Check cycle (e.g. screenshot or visualization) to lock the skill without score pressure.',
    moduleId: 8,
  },
  {
    term: 'Path test',
    definition:
      'Short graded check after Data Analysis Path theory: are you ready for the Module 9 project? Usually ≥70% is the green light to continue.',
    moduleId: 8,
  },
  {
    term: 'Warm-up self-check',
    definition:
      'Short ungraded questions before the scored test – to recall key ideas (e.g. 6-step pipeline vs 8-step template).',
    moduleId: 8,
  },
  {
    term: 'Full analysis template',
    definition:
      'Eight steps for one topic: sources → structure → cleaning → EDA → visuals → insights → forecasts → recommendations. Different from the 6-step analysis pipeline.',
    moduleId: 8,
  },
  {
    term: 'Visualization risk',
    definition:
      'The downside of a chart or dashboard choice – misleading interpretation, wrong audience, or too complex a type. Name 1–2 risks before you show leadership.',
    moduleId: 8,
  },
  // M9
  {
    term: 'Scripted data collection',
    definition:
      'Automated collection (e.g. a Python script) when the source has no easy export – often ends as CSV/Excel for further analysis.',
    moduleId: 9,
  },
  {
    term: 'Financial insights',
    definition:
      'AI-assisted reading of financial metrics and trends – not only table numbers, but what they mean for a decision.',
    moduleId: 9,
  },
  {
    term: 'Combined super prompt',
    definition:
      'One prompt that joins several analysis steps or methods (e.g. cleaning + EDA + recommendations) for a fast end-to-end result.',
    moduleId: 9,
  },
  {
    term: 'Competitor analysis',
    definition:
      'Structured comparison of competitors (products, prices, messages) with AI – to spot gaps and opportunities, not only “who does the same”.',
    moduleId: 9,
  },
  {
    term: 'Predictive analysis',
    definition:
      'The “what might happen?” question – trends, risks, scenarios from historical data. One of the four analysis types, often before an action plan.',
    moduleId: 9,
  },
  {
    term: 'Synthetic data',
    definition:
      'Artificially generated data for training or prototypes when real data is missing or cannot be shared. Use carefully – it is not a 1:1 real population.',
    moduleId: 9,
  },
  {
    term: 'Social listening',
    definition:
      'Systematic tracking of public posts and reactions (topics, sentiment, influencers) – so you see what the market says, not only your CRM.',
    moduleId: 9,
  },
  {
    term: 'Source catalog',
    definition:
      'A list of your analysis sources (files, URLs, systems) with a short note – the first Module 9 project step before cleaning and EDA.',
    moduleId: 9,
  },
];

function mergeSort(filePath, locale, additions) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  // Exact term match only – MASTER PROMPTAS ≠ Master promptas
  const existing = new Set(data.terms.map((t) => t.term));
  const added = [];
  for (const t of additions) {
    if (existing.has(t.term)) {
      console.warn('SKIP duplicate', t.term);
      continue;
    }
    data.terms.push(t);
    existing.add(t.term);
    added.push(t.term);
  }
  data.terms.sort((a, b) => a.term.localeCompare(b.term, locale));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  const byMod = {};
  for (const t of data.terms) {
    byMod[t.moduleId] = (byMod[t.moduleId] || 0) + 1;
  }
  console.log(path.basename(filePath), 'added', added.length, 'byMod', byMod);
  return added;
}

mergeSort(ltPath, 'lt', ltNew);
mergeSort(enPath, 'en', enNew);
