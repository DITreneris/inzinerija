/**
 * I3: M4/59 and M4/60 — preCopyCheckBlock before first copyable
 * Run: node scripts/patch-m456-maturity-i3-precopy.mjs
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

const PRE_59 = {
  lt: {
    question: 'Prieš kopijuodamas RAG promptą su atvirais duomenimis – kas privaloma?',
    options: [
      'Užtenka paprašyti „surask faktus internete“',
      'Nurodyti oficialius šaltinius ir reikalauti citatos (arba „Nežinau“)',
      'Prašyti kuo ilgesnio atsakymo be šaltinių',
      'Naudoti tik vieną neoficialų blogą',
    ],
    correct: 1,
    explanation:
      'RAG su atvirais duomenimis veikia, kai šaltiniai aiškūs ir DI privalo cituoti arba pripažinti spragą („Nežinau“). Be to – lengva haliucinacija.',
  },
  en: {
    question: 'Before copying a RAG prompt with open data — what is required?',
    options: [
      'Asking to “find facts online” is enough',
      'Name official sources and require a citation (or “I don’t know”)',
      'Ask for the longest answer with no sources',
      'Use only one unofficial blog',
    ],
    correct: 1,
    explanation:
      'RAG with open data works when sources are clear and AI must cite or admit a gap (“I don’t know”). Without that — easy hallucination.',
  },
};

const PRE_60 = {
  lt: {
    question: 'Kada DI „atmintis“ (įkeltas kontekstas) veikia patikimiau nei bendras pokalbis?',
    options: [
      'Kai prašai nuomonės be dokumentų',
      'Kai įkeli savo šaltinius / santrauką ir prašai atsakyti tik iš jų',
      'Kai kartojį tą patį klausimą 10 kartų',
      'Kai renkiesi ilgiausią modelį be konteksto',
    ],
    correct: 1,
    explanation:
      'Patikima atmintis = tavo dokumentai ar santrauka kaip šaltinis + instrukcija neiti už ribų. Be įkeltų duomenų modelis spėlioja.',
  },
  en: {
    question: 'When is AI “memory” (uploaded context) more reliable than a general chat?',
    options: [
      'When you ask for an opinion with no documents',
      'When you upload your sources / summary and ask answers only from them',
      'When you repeat the same question 10 times',
      'When you pick the longest model with no context',
    ],
    correct: 1,
    explanation:
      'Reliable memory = your documents or summary as the source + an instruction not to go outside them. Without uploaded data the model guesses.',
  },
};

function collapseWall60(s) {
  // Soft density: collapse optional trailing sections
  for (const sec of s.content.sections) {
    if (/Praktinis workflow|Practical workflow/i.test(sec.heading || '')) {
      sec.collapsible = true;
      sec.collapsedByDefault = true;
      sec.blockVariant = sec.blockVariant || 'terms';
    }
    if (/Nuorodos|Links|NotebookLM/i.test(sec.heading || '')) {
      sec.collapsible = true;
      sec.collapsedByDefault = true;
    }
  }
}

const ltData = load('modules.json');
const enData = load('modules-en-m4-m6.json');

const s59lt = slide(ltData, 4, 59);
const s59en = slide(enData, 4, 59);
s59lt.content.preCopyCheckBlock = PRE_59.lt;
s59en.content.preCopyCheckBlock = PRE_59.en;

const s60lt = slide(ltData, 4, 60);
const s60en = slide(enData, 4, 60);
s60lt.content.preCopyCheckBlock = PRE_60.lt;
s60en.content.preCopyCheckBlock = PRE_60.en;
collapseWall60(s60lt);
collapseWall60(s60en);

save('modules.json', ltData);
save('modules-en-m4-m6.json', enData);
console.log('M4/59 preCopy:', s59lt.content.preCopyCheckBlock.question.slice(0, 60) + '…');
console.log('M4/60 preCopy:', s60lt.content.preCopyCheckBlock.question.slice(0, 60) + '…');
console.log('I3 patched OK');
