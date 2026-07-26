/**
 * One-shot: M4/61 + M7/71.35 – decision table + toolChoiceBar + GOLDEN cycle.
 * Run: node scripts/patch-m4-61-m7-71-35-tools-table.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(root, 'src', 'data', 'modules.json');
const data = JSON.parse(readFileSync(path, 'utf8'));

const decisionSection = {
  heading: 'Kada ką?',
  body: '**Pirmi 4 = tipinė 30–45 min eiga.** Consensus ir Connected Papers – kai reikia mokslo gylio.',
  blockVariant: 'terms',
  toolChoiceBar: {
    question: 'Ką darai dabar?',
    choices: [
      { label: 'Šaltiniai', rowIndex: 0 },
      { label: 'PDF', rowIndex: 1 },
      { label: 'Sintezė', rowIndex: 2 },
      { label: 'Citata', rowIndex: 3 },
      { label: 'Mokslas', rowIndex: 4 },
      { label: 'Tinklas', rowIndex: 5 },
    ],
  },
  table: {
    headers: ['Situacija', 'Įrankis', 'Įvestis → rezultatas', 'Laikas'],
    solutionMatrixStyle: true,
    rows: [
      [
        'Greiti šaltiniai su nuorodomis',
        'Perplexity',
        'Klausimas → atsakymas + URL',
        '5–10 min',
      ],
      [
        'Turiu PDF / ataskaitą',
        'PaperGuide',
        'PDF + klausimas → santrauka',
        '10–15 min',
      ],
      [
        'Tendencijos iš kelių tyrimų',
        'Elicit',
        'Klausimas / PDF → sintezė',
        '10–15 min',
      ],
      [
        'Ar citata palaiko teiginį?',
        'Scite',
        'DOI / pavadinimas → Supported vs Contradicted',
        '~5 min',
      ],
      [
        '„Ką sako mokslas?“',
        'Consensus',
        'Teiginys → palaikymo vaizdas',
        'Pagal poreikį',
      ],
      [
        'Tyrimų tinklas / seminal darbai',
        'Connected Papers',
        'Straipsnis → klasteriai',
        'Pagal poreikį',
      ],
    ],
  },
};

const eigaSection = {
  heading: 'Tipinė eiga (30–45 min)',
  body: 'Keturi žingsniai vienai temai – laikas orientacinis.',
  blockVariant: 'brand',
  table: {
    headers: ['#', 'Žingsnis', 'Įrankis', 'Min'],
    rows: [
      ['1', 'Šaltiniai', 'Perplexity', '5–10'],
      ['2', 'PDF', 'PaperGuide / Elicit', '10–15'],
      ['3', 'Citata', 'Scite', '~5'],
      ['4', 'Sintezė', 'Elicit', '10–15'],
    ],
  },
};

const copyable =
  'ROLE: Tu esi verslo tyrėjas.\nTASK: Surask 5–7 patikimus šaltinius temai: [X].\nOUTPUT: Lentelė – teiginys | šaltinis (URL) | kodėl patikimas.\nRULE: Prie kiekvieno teiginio – šaltinis; jei nežinai – „Nežinau“.';

const patikra = {
  heading: '4️⃣ Patikra (1 min)',
  body: 'Jei bent 2 „ne“ – grįžk prie lentelės „Kada ką?“.\n\n1. Ar turi šaltinius su URL?\n2. Jei dirbai su PDF – ar davei konkretų klausimą (ne tik „santrauka“)?\n3. Ar kritinį teiginį patikrinai Scite (Supported vs Contradicted)?',
  blockVariant: 'accent',
};

const starter = {
  heading: 'Starteris: Perplexity',
  body: 'Įklijuok į Perplexity (web režimas). Pakeisk [X] į savo temą.',
  blockVariant: 'default',
  copyable,
};

function applySlide(slide, { trumpai, toolsIntro, daryk, context, footer, whyBenefit }) {
  const tools = slide.content.tools;
  slide.content = {
    whyBenefit,
    toolsIntro,
    toolsCollapsible: true,
    tools,
    sections: [
      { heading: '1️⃣ Trumpai (20 s)', body: trumpai, blockVariant: 'accent' },
      decisionSection,
      eigaSection,
      { heading: '2️⃣ Daryk dabar', body: daryk, blockVariant: 'brand' },
      starter,
      patikra,
      context,
    ],
    footer,
  };
}

const m4 = data.modules.find((m) => m.id === 4);
const s61 = m4.slides.find((s) => s.id === 61);
if (!s61) throw new Error('M4/61 not found');
// Re-apply in case prior partial edit; keep tools from current
applySlide(s61, {
  whyBenefit:
    'Bet kokį tyrimą gali atlikti per 30–45 min – įvesk klausimą ar įkelk PDF, gauk atsakymus su šaltiniais.',
  toolsIntro:
    'Įvesk klausimą ar įkelk PDF – gausi atsakymus su šaltiniais. Naudinga RAG šaltinių paieškai ir Deep research užduotims.',
  trumpai:
    'Neprivaloma atmintinė: pasirink DI įrankį pagal situaciją (paieška → PDF → citata → sintezė). Tipinė eiga – 30–45 min. Naudok kartu su RAG šaltiniais.',
  daryk:
    'Paimk temą, kurią jau tiri (arba RAG šaltinius). Paleisk bent **1 žingsnį** iš lentelės – pradžiai užtenka Perplexity. 🔘 **Kopijuoti promptą (žemiau)**',
  context: {
    heading: 'Kur pritaikyti?',
    body: 'Naudok po to, kai nurodai šaltinius prompte (RAG) arba ruoši dokumentus tyrimui. Vėliau modulyje – **Deep research**.',
    blockVariant: 'brand',
  },
  footer: s61.content.footer || 'Toliau – Pradinis duomenų paruošimas RAG',
});

const m7 = data.modules.find((m) => m.id === 7);
const s7135 = m7.slides.find((s) => s.id === 71.35);
if (!s7135) throw new Error('M7/71.35 not found');
applySlide(s7135, {
  whyBenefit:
    'Bet kokį tyrimą gali atlikti per 30–45 min – įvesk klausimą ar įkelk PDF, gauk atsakymus su šaltiniais.',
  toolsIntro:
    'Įvesk klausimą ar įkelk PDF – gausi atsakymus su šaltiniais. Naudinga po lygiagrečių tyrimų (2–4 šaltiniai).',
  trumpai:
    'Neprivaloma atmintinė: po lygiagrečių tyrimų pasirink DI įrankį pagal situaciją (paieška → PDF → citata → sintezė). Tipinė eiga – 30–45 min.',
  daryk:
    'Paimk temą iš ankstesnio žingsnio (2–4 šaltiniai). Paleisk bent **1 žingsnį** iš lentelės – pradžiai užtenka Perplexity. 🔘 **Kopijuoti promptą (žemiau)**',
  context: {
    heading: 'Kur tai kelyje?',
    body: 'Tą pačią atmintinę rasi **Modulyje 4** (papildoma, po RAG atminties). Čia – praktika Duomenų analizės kelyje po lygiagrečių tyrimų (Deep research).',
    blockVariant: 'brand',
  },
  footer: s7135.content.footer || 'Toliau – skaidrė: MASTER PROMPTAS',
});

writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log('Patched M4/61 and M7/71.35');
