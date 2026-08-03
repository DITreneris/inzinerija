/**
 * I4: M4/62 slide chrome Trumpai → Daryk → Patikra (+ demote extra accent)
 * Run: node scripts/patch-m456-maturity-i4-slide62.mjs
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

function patch62(s, locale) {
  const lt = locale === 'lt';
  const diagramSec = s.content.sections.find((x) => x.image === 'rag_duomenu_ruosimas');
  const collapsible = s.content.sections.find((x) => x.collapsible);
  const term = s.content.sections.find((x) => /chunk|fragment/i.test(x.heading || ''));

  s.content.sections = [
    {
      heading: lt ? 'Trumpai' : 'In short',
      body: lt
        ? '5 žingsniai: metaduomenys → išvalymas → antraštės → fragmentai → santrauka. Pasirink žingsnį magistralėje – pamatysi promptą ir nukopijuok.'
        : '5 steps: metadata → cleaning → headings → chunks → summary. Pick a step on the pipeline — see the prompt and copy it.',
      blockVariant: 'accent',
    },
    {
      heading: lt ? 'Daryk dabar' : 'Do now',
      body: lt
        ? 'Peržvelk magistralę: kur tavo rizika (chunk dydis, metaduomenys, išvalymas)? Pasirink tą žingsnį, nukopijuok promptą ir paleisk ant savo dokumento gabalo.'
        : 'Scan the pipeline: where is your risk (chunk size, metadata, cleaning)? Pick that step, copy the prompt, and run it on a piece of your document.',
      blockVariant: 'brand',
    },
    {
      heading: diagramSec?.heading || (lt ? 'RAG ruošimo magistralė' : 'RAG preparation pipeline'),
      body:
        diagramSec?.body ||
        (lt
          ? 'Pasirink žingsnį – pamatysi promptą ir kodėl jis svarbus.'
          : 'Pick a step — see the prompt and why it matters.'),
      image: 'rag_duomenu_ruosimas',
      blockVariant: 'terms',
    },
  ];

  if (collapsible) {
    s.content.sections.push({
      ...collapsible,
      blockVariant: 'terms',
    });
  }
  if (term) {
    s.content.sections.push({
      ...term,
      heading: lt ? 'Terminas: fragmentas (chunk)' : 'Term: chunk (fragment)',
      blockVariant: 'terms',
    });
  }

  s.content.sections.push({
    heading: lt ? 'Patikra' : 'Quality check',
    body: lt
      ? 'Prieš RAG:\n• Ar dokumentas turi metaduomenis (šaltinis, data)?\n• Ar fragmentai logiški (ne per ilgi be antraščių)?\n• Ar žinai, kurį magistralės žingsnį darysi pirmą?\n\nJei „ne“ – grįžk prie to žingsnio prompto.'
      : 'Before RAG:\n• Does the document have metadata (source, date)?\n• Are chunks logical (not too long without headings)?\n• Do you know which pipeline step you will do first?\n\nIf “no” — return to that step’s prompt.',
    blockVariant: 'accent',
  });
}

const ltData = load('modules.json');
const enData = load('modules-en-m4-m6.json');
patch62(slide(ltData, 4, 62), 'lt');
patch62(slide(enData, 4, 62), 'en');
save('modules.json', ltData);
save('modules-en-m4-m6.json', enData);

const s = slide(ltData, 4, 62);
console.log(s.content.sections.map((x) => `${x.heading}[${x.blockVariant}]`).join(' → '));
console.log('I4 slide 62 patched OK');
