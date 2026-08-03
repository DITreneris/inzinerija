/**
 * I5: M5 chrome — 47 Patikra, 47.5 Patikra, 510 Soft proof→Patikra, 515 density+TDP
 * Run: node scripts/patch-m456-maturity-i5-m5.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');

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

function patch47(s, locale) {
  const lt = locale === 'lt';
  if (s.content.sections.some((x) => /Patikra|Quality check/i.test(x.heading || ''))) return;
  // Insert before first collapsible
  const idx = s.content.sections.findIndex((x) => x.collapsible);
  const patikra = {
    heading: lt ? 'Patikra' : 'Quality check',
    body: lt
      ? 'Po paleidimo:\n• Ar turi 8 skaidrių antraštes (ne pilną tekstą)?\n• Ar brief turi temą + auditoriją?\n• Ar galiu tą patį šabloną paleisti kitai temai?\n\nJei „ne“ – grįžk prie struktūros šablono aukščiau.'
      : 'After you run it:\n• Do you have 8 slide titles (not full copy)?\n• Does the brief include topic + audience?\n• Can you reuse the same template on another topic?\n\nIf “no” — return to the structure template above.',
    blockVariant: 'accent',
  };
  if (idx >= 0) s.content.sections.splice(idx, 0, patikra);
  else s.content.sections.push(patikra);
}

function patch475(s, locale) {
  const lt = locale === 'lt';
  for (const sec of s.content.sections) {
    if (/Įrankio medis|Tool tree/i.test(sec.heading || '')) sec.blockVariant = 'terms';
    if (/Pirmiausia|First:/i.test(sec.heading || '')) sec.blockVariant = 'terms';
    if (/Svarbiausia|Key takeaway|Bottom line/i.test(sec.heading || '')) {
      sec.heading = lt ? 'Patikra' : 'Quality check';
      sec.blockVariant = 'accent';
      sec.body = lt
        ? 'Prieš QC:\n• Ar paleidai 6 blokų promptą su užpildytais [Tema] / [Auditorija]?\n• Ar pasirinkai 1 įrankio kelią (ne visus iš karto)?\n• Ar turi juodraštį 8 skaidrėms?\n\n**Esmė:** geras promptas ir aiški struktūra = ~80 % prezentacijos; įrankis – formatas.'
        : 'Before QC:\n• Did you run the 6-block prompt with [Topic] / [Audience] filled?\n• Did you pick 1 tool path (not all at once)?\n• Do you have a draft for 8 slides?\n\n**Bottom line:** a good prompt and clear structure ≈ 80% of the deck; the tool is formatting.';
    }
  }
}

function patch510(s, locale) {
  const lt = locale === 'lt';
  for (const sec of s.content.sections) {
    if (/Daryk|Do now/i.test(sec.heading || '')) sec.blockVariant = 'brand';
    if (/Soft proof|Patikra|Quality check/i.test(sec.heading || '')) {
      sec.heading = lt ? 'Patikra' : 'Quality check';
      sec.blockVariant = 'accent';
      // keep body checklist; light prefix if Soft proof wording remains
      if (typeof sec.body === 'string') {
        sec.body = sec.body.replace(/Soft proof\s*[–—-]?\s*/i, '');
      }
    }
  }
}

function patch515(s, locale) {
  const lt = locale === 'lt';
  const by = (re) => s.content.sections.find((x) => re.test(x.heading || ''));
  const rag = by(/^RAG/);
  const tok = by(/Token/);
  const man = by(/Manipul/);
  const hal = by(/Haliucin|Hallucin/);

  delete s.content.displayMode;

  s.content.sections = [
    {
      heading: lt ? 'Trumpai' : 'In short',
      body: lt
        ? 'Keturios greitos pagalbos kortelės sprintui. Pasirink situaciją, nukopijuok šabloną, grįžk į QC.'
        : 'Four quick help cards for the sprint. Pick a situation, copy the template, return to QC.',
      blockVariant: 'accent',
    },
    {
      heading: lt ? 'Daryk dabar' : 'Do now',
      body: lt
        ? 'Pasirink **vieną** kortelę žemiau pagal riziką ir paleisk promptą ant juodraščio.'
        : 'Pick **one** card below by risk and run the prompt on your draft.',
      blockVariant: 'brand',
    },
  ];

  const cards = [
    [rag, 'terms'],
    [tok, 'terms'],
    [man, 'terms'],
    [hal, 'terms'],
  ];
  for (const [sec] of cards) {
    if (!sec) continue;
    s.content.sections.push({
      heading: sec.heading.startsWith('🔽') ? sec.heading : `🔽 ${sec.heading}`,
      body: sec.body,
      copyable: sec.copyable,
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
    });
  }

  s.content.sections.push({
    heading: lt ? 'Patikra' : 'Quality check',
    body: lt
      ? 'Po pagalbos kortelės:\n• Ar pritaikiau **vieną** techniką (ne visas keturias)?\n• Ar juodraštyje aišku, kas faktas / kas prielaida?\n• Ar galiu grįžti į QC lab?\n\nJei „ne“ – pakartok Daryk su kita kortele.'
      : 'After a help card:\n• Did I apply **one** technique (not all four)?\n• Is it clear in the draft what is fact vs assumption?\n• Can I return to the QC lab?\n\nIf “no” — repeat Do now with another card.',
    blockVariant: 'accent',
  });
}

const ltData = load('modules.json');
const enData = load('modules-en-m4-m6.json');

for (const [id, fn] of [
  ['47', patch47],
  ['47.5', patch475],
  ['510', patch510],
  ['515', patch515],
]) {
  fn(slide(ltData, 5, id), 'lt');
  fn(slide(enData, 5, id), 'en');
}

save('modules.json', ltData);
save('modules-en-m4-m6.json', enData);

for (const id of ['47', '47.5', '510', '515']) {
  const s = slide(ltData, 5, id);
  console.log(
    `M5/${id}:`,
    s.content.sections.map((x) => `${x.heading}[${x.blockVariant || '-'}]`).join(' → '),
    s.content.displayMode ? `mode=${s.content.displayMode}` : ''
  );
}
console.log('I5 patched OK');
