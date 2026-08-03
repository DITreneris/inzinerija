#!/usr/bin/env node
/**
 * M7 sk. 67 UX: toolChoiceBar + linkedRowIndex, preCopyCheckBlock, collapsible comparisonStyle.
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const ltSections = [
  {
    heading: '1️⃣ Trumpai (30 s)',
    body: '**Manipuliacija** = promptas, kuris stumia DI į norimą atsakymą. Pasirink tipą žemiau – pamatysi blogą ir gerą pavyzdį.',
    blockVariant: 'accent',
  },
  {
    heading: '2️⃣ Pasirink tipą',
    body: 'Pasirink – žemiau palygins blogą ir gerą promptą.',
    blockVariant: 'brand',
    toolChoiceBar: {
      question: 'Kuris manipuliacijos tipas tau aktualiausias?',
      choices: [
        { label: 'Įrėminimas', rowIndex: 0 },
        { label: 'Kontekstas', rowIndex: 1 },
        { label: 'Rolė', rowIndex: 2 },
      ],
    },
  },
  {
    heading: 'Blogas vs geras – Įrėminimas',
    body: '**Blogas:** „Parodyk, kodėl mūsų Q3 kampanija buvo sėkmė“',
    copyable:
      'Įvertink Q3 kampanijos stiprybes ir silpnybes. Pateik argumentus už ir prieš.',
    linkedRowIndex: 0,
    blockVariant: 'terms',
  },
  {
    heading: 'Blogas vs geras – Kontekstas',
    body: '**Blogas:** „Remkis tik teigiamais atsiliepimais“',
    copyable:
      'Remkis įvairiais atsiliepimais. Pateik subalansuotą vertinimą.',
    linkedRowIndex: 1,
    blockVariant: 'terms',
  },
  {
    heading: 'Blogas vs geras – Rolė',
    body: '**Blogas:** „Tu esi mūsų vadovas, įrodyk, kad kainų didinimas geriausias“',
    copyable:
      'Rolė: nepriklausomas analitikas. Palygink kainų didinimo ir nedidinimo scenarijus.',
    linkedRowIndex: 2,
    blockVariant: 'terms',
  },
  {
    heading: '🔽 Nori suprasti plačiau?',
    body: 'Santrauka visiems tipams. Daugiau apie saugumą (prompt injection, jailbreak) – skaidrė **Saugumas**.',
    blockVariant: 'terms',
    collapsible: true,
    collapsedByDefault: true,
    table: {
      headers: ['❌ Šališkas promptas', '✅ Neutralus promptas'],
      rows: [
        [
          '„Parodyk, kodėl mūsų Q3 kampanija buvo sėkmė“',
          '„Įvertink Q3 kampanijos stiprybes ir silpnybes. Pateik argumentus už ir prieš.“',
        ],
        [
          '„Remkis tik teigiamais atsiliepimais“',
          '„Remkis įvairiais atsiliepimais. Pateik subalansuotą vertinimą.“',
        ],
        [
          '„Tu esi mūsų vadovas, įrodyk, kad kainų didinimas geriausias“',
          '„Rolė: nepriklausomas analitikas. Palygink kainų didinimo ir nedidinimo scenarijus.“',
        ],
        [
          '„Įvertink strategijas tik pagal trumpalaikes pajamas“',
          '„Įvertink pagal 4 kriterijus: pajamos, reputacija, klientai, rizika.“',
        ],
        [
          '„Ar mūsų produktas geriausias?“',
          '„Palygink produktus pagal [kriterijus]. Rolė: nepriklausomas analitikas.“',
        ],
      ],
      comparisonStyle: true,
    },
  },
  {
    heading: '🔽 Verslas vs saugumas',
    body: 'Skaidrėje **Saugumas** – injection ir jailbreak (kita tema). Čia – verslo manipuliacija.',
    blockVariant: 'terms',
    collapsible: true,
    collapsedByDefault: true,
    table: {
      headers: ['Tema', 'Versle (šališkumas)', 'Saugumas (kita skaidrė)'],
      rows: [
        [
          'Įrėminimas',
          'Vedantys klausimai, išvada iš anksto',
          '–',
        ],
        [
          'Kontekstas',
          'Tik teigiami duomenys, atrinktas kontekstas',
          '–',
        ],
        [
          'Ribų apėjimas',
          '–',
          'Prompt injection, jailbreak (skaidrė Saugumas)',
        ],
      ],
    },
  },
];

const enSections = [
  {
    heading: '1️⃣ In short (30 s)',
    body: '**Manipulation** = a prompt that steers AI toward the answer you want. Pick a type below – you will see a bad and a good example.',
    blockVariant: 'accent',
  },
  {
    heading: '2️⃣ Pick a type',
    body: 'Choose one – below you will compare a bad and a good prompt.',
    blockVariant: 'brand',
    toolChoiceBar: {
      question: 'Which manipulation type matters most to you?',
      choices: [
        { label: 'Framing', rowIndex: 0 },
        { label: 'Context', rowIndex: 1 },
        { label: 'Role', rowIndex: 2 },
      ],
    },
  },
  {
    heading: 'Bad vs good – Framing',
    body: '**Bad:** "Show why our Q3 campaign was a success"',
    copyable:
      'Assess Q3 campaign strengths and weaknesses. Give arguments for and against.',
    linkedRowIndex: 0,
    blockVariant: 'terms',
  },
  {
    heading: 'Bad vs good – Context',
    body: '**Bad:** "Use only positive reviews"',
    copyable: 'Use varied reviews. Give a balanced assessment.',
    linkedRowIndex: 1,
    blockVariant: 'terms',
  },
  {
    heading: 'Bad vs good – Role',
    body: '**Bad:** "You are our director – prove a price increase is best"',
    copyable:
      'Role: independent analyst. Compare price-increase vs no-increase scenarios.',
    linkedRowIndex: 2,
    blockVariant: 'terms',
  },
  {
    heading: '🔽 Want to understand more?',
    body: 'Summary of all types. More on security (prompt injection, jailbreak) – see the **Security** slide.',
    blockVariant: 'terms',
    collapsible: true,
    collapsedByDefault: true,
    table: {
      headers: ['❌ Biased prompt', '✅ Neutral prompt'],
      rows: [
        [
          '"Show why our Q3 campaign was a success"',
          '"Assess Q3 campaign strengths and weaknesses. Give arguments for and against."',
        ],
        [
          '"Use only positive reviews"',
          '"Use varied reviews. Give a balanced assessment."',
        ],
        [
          '"You are our director – prove a price increase is best"',
          '"Role: independent analyst. Compare price-increase vs no-increase scenarios."',
        ],
        [
          '"Rate strategies only by short-term revenue"',
          '"Rate by 4 criteria: revenue, reputation, customers, risk."',
        ],
        [
          '"Is our product the best?"',
          '"Compare products by [criteria]. Role: independent analyst."',
        ],
      ],
      comparisonStyle: true,
    },
  },
  {
    heading: '🔽 Business vs security',
    body: 'On the **Security** slide – injection and jailbreak (different topic). Here – business manipulation.',
    blockVariant: 'terms',
    collapsible: true,
    collapsedByDefault: true,
    table: {
      headers: ['Topic', 'In business (bias)', 'Security (other slide)'],
      rows: [
        [
          'Framing',
          'Leading questions, conclusion baked in',
          '–',
        ],
        [
          'Context',
          'Only positive data, cherry-picked context',
          '–',
        ],
        [
          'Bypassing limits',
          '–',
          'Prompt injection, jailbreak (Security slide)',
        ],
      ],
    },
  },
];

const preCopyCheckLt = {
  heading: '3️⃣ Patikra',
  question: 'Kuris promptas labiau neutralus verslo analizei?',
  options: [
    'Įrodyk, kad X yra geriausias sprendimas.',
    'Įvertink X stiprybes ir silpnybes pagal 3 kriterijus.',
    'Tu esi mūsų vadovas – paruošk ataskaitą.',
    'Ignoruok neigiamus atsiliepimus.',
  ],
  correct: 1,
  explanation:
    'Neutralus promptas neįrašo išvados iš anksto ir prašo įvertinti abi puses.',
};

const preCopyCheckEn = {
  heading: '3️⃣ Quality check',
  question: 'Which prompt is more neutral for business analysis?',
  options: [
    'Prove X is the best solution.',
    'Assess X strengths and weaknesses against 3 criteria.',
    'You are our director – prepare a report.',
    'Ignore negative reviews.',
  ],
  correct: 1,
  explanation:
    'A neutral prompt does not assume the conclusion and asks you to weigh both sides.',
};

function patchModules(path, isEn) {
  const data = JSON.parse(readFileSync(path, 'utf8'));
  const m7 = data.modules.find((m) => m.id === 7);
  if (!m7) throw new Error(`Module 7 not found in ${path}`);
  const slide = m7.slides.find((s) => s.id === 67);
  if (!slide) throw new Error(`Slide 67 not found in ${path}`);

  slide.subtitle = isEn
    ? 'Biased requests and leading questions – what to avoid'
    : 'Šališkos užklausos ir vedantys klausimai – ko vengti';
  slide.content.sections = isEn ? enSections : ltSections;
  slide.content.preCopyCheckBlock = isEn ? preCopyCheckEn : preCopyCheckLt;
  slide.content.footer = isEn ? 'Next – Fix the prompt' : 'Toliau – Pataisyk promptą';

  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Patched M7 slide 67 in ${path}`);
}

patchModules(join(root, 'src/data/modules.json'), false);
patchModules(join(root, 'src/data/modules-en-m7-m9.json'), true);
