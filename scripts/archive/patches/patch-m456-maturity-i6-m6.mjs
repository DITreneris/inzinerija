/**
 * I6: M6 chrome/density — 68 Daryk+preCopy, 67.8 TDP, 65 Daryk+Patikra, 66 Daryk+Patikra
 * Run: node scripts/patch-m456-maturity-i6-m6.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');
const overlayPath = join(__dirname, '..', 'docs', 'development', 'teaching-elements-overlay.json');

function load(name) {
  return JSON.parse(readFileSync(join(dataDir, name), 'utf8'));
}
function save(name, data) {
  writeFileSync(join(dataDir, name), JSON.stringify(data, null, 2) + '\n', 'utf8');
}
function slide(data, modId, slideId) {
  const m = data.modules.find((x) => Number(x.id) === modId);
  const s = m.slides.find((x) => String(x.id) === String(slideId));
  if (!s) throw new Error(`M${modId}/${slideId} missing`);
  return s;
}

function patch68(s, locale) {
  const lt = locale === 'lt';
  // Fix heading-less emerald → Daryk
  const orphan = s.content.sections.find((x) => !x.heading && x.body);
  if (orphan) {
    orphan.heading = lt ? 'Daryk dabar' : 'Do now';
    orphan.blockVariant = 'brand';
    orphan.body = lt
      ? 'Pirmiausia – atpažink silpną HTML promptą praktikoje žemiau (arba „Parodyti sprendimą“). Tada nukopijuok pilną 6 blokų pavyzdį ir paleisk DI savo temai.'
      : 'First — spot the weak HTML prompt in the practice below (or “Show solution”). Then copy the full 6-block example and run it in AI for your topic.';
  } else if (!s.content.sections.some((x) => /Daryk|Do now/i.test(x.heading || ''))) {
    s.content.sections.splice(1, 0, {
      heading: lt ? 'Daryk dabar' : 'Do now',
      body: lt
        ? 'Atlik correct-prompt praktiką, tada nukopijuok 6 blokų pavyzdį žemiau ir paleisk savo temai.'
        : 'Complete the correct-prompt practice, then copy the 6-block example below and run it for your topic.',
      blockVariant: 'brand',
    });
  }

  s.content.preCopyCheckBlock = lt
    ? {
        question: 'Prieš kopijuodamas HTML promptą – ko negali trūkti 6 blokų sistemoje?',
        options: [
          'Užtenka paprašyti „gražaus tinklalapio“',
          'META + INPUT + OUTPUT (+ REASONING/QUALITY/ADVANCED pagal užduotį)',
          'Tik spalvų paletė be tikslo',
          'Tik „padaryk professionaliai“ be formato',
        ],
        correct: 1,
        explanation:
          '6 blokai duoda rolę, įvestį ir aiškų OUTPUT (failas/formatas). Be to DI spėlioja ir rezultatas būna chaotiškas.',
      }
    : {
        question: 'Before copying the HTML prompt — what must the 6-block system include?',
        options: [
          'Asking for a “nice website” is enough',
          'META + INPUT + OUTPUT (+ REASONING/QUALITY/ADVANCED as needed)',
          'Only a color palette with no goal',
          'Only “make it professional” with no format',
        ],
        correct: 1,
        explanation:
          'The 6 blocks give role, input, and a clear OUTPUT (file/format). Without them AI guesses and the result gets messy.',
      };

  // Normalize Trumpai heading
  if (s.content.sections[0]) {
    s.content.sections[0].heading = lt ? 'Trumpai' : 'In short';
    s.content.sections[0].blockVariant = 'accent';
  }
}

function patch678(s, locale) {
  const lt = locale === 'lt';
  if (s.content.sections[0]) {
    s.content.sections[0].heading = lt ? 'Trumpai' : 'In short';
    s.content.sections[0].blockVariant = 'accent';
  }
  if (!s.content.sections.some((x) => /Daryk|Do now/i.test(x.heading || ''))) {
    s.content.sections.splice(1, 0, {
      heading: lt ? 'Daryk dabar' : 'Do now',
      body: lt
        ? 'Peržvelk pavyzdinę eigą žemiau. Užsirašyk, kurį žingsnį darysi pirmą su savo HTML projektu (brief → blokai → generavimas → patikra).'
        : 'Scan the example flow below. Note which step you will do first on your HTML project (brief → blocks → generate → check).',
      blockVariant: 'brand',
    });
  }
  for (const sec of s.content.sections) {
    if (/Pavyzdžiai|Examples|workflow/i.test(sec.heading || '')) sec.blockVariant = 'terms';
  }
  if (!s.content.sections.some((x) => /Patikra|Quality check/i.test(x.heading || ''))) {
    s.content.sections.push({
      heading: lt ? 'Patikra' : 'Quality check',
      body: lt
        ? 'Ar matai aiškią seką (ne tik „padaryk HTML“)? Ar žinai, kur įterpti 6 blokus? Jei ne – grįžk prie praktikos skaidrės su COMBO/HTML promptu.'
        : 'Do you see a clear sequence (not just “make HTML”)? Do you know where the 6 blocks fit? If not — return to the practice slide with the COMBO/HTML prompt.',
      blockVariant: 'accent',
    });
  }
}

function patch65(s, locale) {
  const lt = locale === 'lt';
  if (s.content.sections[0]) {
    s.content.sections[0].heading = lt ? 'Trumpai' : 'In short';
  }
  for (const sec of s.content.sections) {
    if (/Pirmas veiksmas|First action|24/i.test(sec.heading || '')) {
      sec.heading = lt ? 'Daryk dabar' : 'Do now';
      sec.blockVariant = 'brand';
    }
    if (/Modulio rezultatas|Module result/i.test(sec.heading || '')) sec.blockVariant = 'terms';
    if (/Ką toliau|What next/i.test(sec.heading || '')) {
      sec.heading = lt ? 'Patikra' : 'Quality check';
      sec.blockVariant = 'accent';
      sec.body = lt
        ? 'Ar turi 1 konkretų veiksmą kitoms 24–48 val.? Ar refleksijos atsakymai užrašyti? Jei ne – paleisk refleksijos promptą dar kartą ir užsirašyk vieną žingsnį.'
        : 'Do you have 1 concrete action for the next 24–48h? Are reflection answers written down? If not — run the reflection prompt again and note one step.';
    }
  }
  if (!s.content.sections.some((x) => /Daryk|Do now/i.test(x.heading || ''))) {
    s.content.sections.splice(1, 0, {
      heading: lt ? 'Daryk dabar' : 'Do now',
      body: lt
        ? 'Nukopijuok refleksijos promptą žemiau, atsakyk DI ir užsirašyk 1 veiksmą kitoms 48 val.'
        : 'Copy the reflection prompt below, answer in AI, and write 1 action for the next 48h.',
      blockVariant: 'brand',
    });
  }
}

function patch66(s, locale) {
  const lt = locale === 'lt';
  if (s.content.sections[0]) {
    s.content.sections[0].heading = lt ? 'Trumpai' : 'In short';
  }
  if (!s.content.sections.some((x) => /Daryk|Do now/i.test(x.heading || ''))) {
    const schemaIdx = s.content.sections.findIndex((x) => x.image || /schema|žingsni/i.test(x.heading || ''));
    const insertAt = schemaIdx >= 0 ? schemaIdx : 1;
    s.content.sections.splice(insertAt, 0, {
      heading: lt ? 'Daryk dabar' : 'Do now',
      body: lt
        ? 'Peržvelk 8 žingsnių schemą. Pažymėk, kuriame žingsnyje esi dabar, ir atlik tik kitą vieną žingsnį (ne visus iš karto).'
        : 'Scan the 8-step schema. Mark which step you are on now, and do only the next one step (not all at once).',
      blockVariant: 'brand',
    });
  }
  for (const sec of s.content.sections) {
    if (/schema|žingsnių|8-step|8 step/i.test(sec.heading || '')) sec.blockVariant = 'terms';
    if (/Baigimo kriterijai|Completion|Patikra|Quality check/i.test(sec.heading || '')) {
      sec.heading = lt ? 'Patikra' : 'Quality check';
      sec.blockVariant = 'accent';
    }
  }
}

const ltData = load('modules.json');
const enData = load('modules-en-m4-m6.json');

for (const [id, fn] of [
  ['68', patch68],
  ['67.8', patch678],
  ['65', patch65],
  ['66', patch66],
]) {
  fn(slide(ltData, 6, id), 'lt');
  fn(slide(enData, 6, id), 'en');
}

save('modules.json', ltData);
save('modules-en-m4-m6.json', enData);

// TE overlay for M6/68 preCopy
const overlay = JSON.parse(readFileSync(overlayPath, 'utf8'));
const exists = overlay.elements.some((e) => e.elementId === 'embed:preCopyCheckBlock:m6:68');
if (!exists) {
  const after = overlay.elements.findIndex((e) => e.elementId === 'embed:correctPromptPractice:m6:68');
  const row = {
    elementId: 'embed:preCopyCheckBlock:m6:68',
    kind: 'embed',
    key: 'preCopyCheckBlock',
    pattern: 'embed',
    shell: 'n/a',
    render: null,
    layoutSot: null,
    contentSot: null,
    maturity: 2,
    owner: 'CONTENT',
    notes: 'Praktika: Vieno puslapio tinklalapio kūrimas (HTML)',
    moduleId: 6,
    slideId: 68,
  };
  if (after >= 0) overlay.elements.splice(after + 1, 0, row);
  else overlay.elements.push(row);
  writeFileSync(overlayPath, JSON.stringify(overlay, null, 2) + '\n', 'utf8');
  console.log('overlay: added embed:preCopyCheckBlock:m6:68');
}

for (const id of ['68', '67.8', '65', '66']) {
  const s = slide(ltData, 6, id);
  console.log(
    `M6/${id}:`,
    s.content.sections.map((x) => `${x.heading || '?'}[${x.blockVariant || '-'}]`).join(' → '),
    s.content.preCopyCheckBlock ? '+preCopy' : ''
  );
}
console.log('I6 patched OK');
