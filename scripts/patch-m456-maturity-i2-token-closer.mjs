/**
 * I2: M4 token cluster + reflection + closer — 66, 66.25, 66.97, 66.99
 * Run: node scripts/patch-m456-maturity-i2-token-closer.mjs
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
function hasHeading(secs, re) {
  return secs.some((x) => re.test(x.heading || ''));
}

function patch66(s, locale) {
  const lt = locale === 'lt';
  const secs = s.content.sections;
  secs[0] = {
    heading: lt ? 'Trumpai' : 'In short',
    body: lt
      ? 'Tokenas = mažiausias teksto vienetas DI. Konteksto langas ir max_tokens riboja, kiek informacijos „telpa“. Žemiau – kaip trumpinti ir išlaikyti kokybę.'
      : 'A token is the smallest text unit AI processes. Context window and max_tokens limit how much fits. Below — how to shorten without losing quality.',
    blockVariant: 'accent',
  };
  if (!hasHeading(secs, /Daryk dabar|Do now/i)) {
    secs.splice(1, 0, {
      heading: lt ? 'Daryk dabar' : 'Do now',
      body: lt
        ? 'Pasiimk vieną savo neseniai naudotą promptą. Įvertink: ar gali sutrumpinti 30 % ir pridėti išvesties ribą („maks. 150 žodžių“ / „tik sąrašą“)? Užsirašyk 1 pakeitimą.'
        : 'Take one prompt you used recently. Check: can you cut 30% and add an output limit (“max 150 words” / “list only”)? Write down 1 change.',
      blockVariant: 'brand',
    });
  }
  for (const sec of secs) {
    if (/Kas yra tokenas|What is a token/i.test(sec.heading || '')) sec.blockVariant = 'terms';
    if (/Konkretus pavyzdys|Concrete example/i.test(sec.heading || '')) sec.blockVariant = 'terms';
    if (/patarimai|tips|biužet|budget/i.test(sec.heading || '')) sec.blockVariant = 'terms';
  }
  // Replace last "Kodėl..." with Patikra or append
  const last = secs[secs.length - 1];
  if (/Patikra|Quality check/i.test(last.heading || '')) {
    /* already */
  } else if (/Kodėl|Why/i.test(last.heading || '')) {
    last.heading = lt ? 'Patikra' : 'Quality check';
    last.body = lt
      ? 'Prieš kitą ilgą sesiją:\n• Ar žinau savo modelio konteksto lango dydį (apytiksliai)?\n• Ar prompte yra išvesties riba?\n• Ar galiu skaidyti temą į mažesnius pokalbius?\n\nJei bent 2 „ne“ – grįžk prie 5 patarimų ir pritaikyk vieną dabar.'
      : 'Before the next long session:\n• Do I roughly know my model’s context window size?\n• Does the prompt cap the output?\n• Can I split the topic into smaller chats?\n\nIf at least 2 are “no” — return to the 5 tips and apply one now.';
    last.blockVariant = 'accent';
  } else {
    secs.push({
      heading: lt ? 'Patikra' : 'Quality check',
      body: lt
        ? 'Prieš kitą ilgą sesiją:\n• Ar žinau savo modelio konteksto lango dydį?\n• Ar prompte yra išvesties riba?\n• Ar galiu skaidyti temą?\n\nJei bent 2 „ne“ – pritaikyk vieną patarimą dabar.'
        : 'Before the next long session:\n• Do I know my model’s context window size?\n• Does the prompt cap the output?\n• Can I split the topic?\n\nIf at least 2 are “no” — apply one tip now.',
      blockVariant: 'accent',
    });
  }
}

function patch6625(s, locale) {
  const lt = locale === 'lt';
  const secs = s.content.sections;
  secs[0] = {
    heading: lt ? 'Trumpai' : 'In short',
    body: lt
      ? 'Konteksto degradacija – kodėl DI „pamiršta“ ilguose pokalbiuose. Trys mechanizmai + trys praktikos: checkpoint, atskiri pokalbiai, prioritetų kartojimas.'
      : 'Context degradation — why AI “forgets” in long chats. Three mechanisms + three practices: checkpoint, separate chats, re-inject priorities.',
    blockVariant: 'accent',
  };
  if (!hasHeading(secs, /Daryk dabar|Do now/i)) {
    secs.splice(1, 0, {
      heading: lt ? 'Daryk dabar' : 'Do now',
      body: lt
        ? 'Kitame ilgame pokalbyje padaryk checkpoint: kas ~10 žinučių paprašyk DI apibendrinti, kas sutarėte. Svarbiausią taisyklę pakartok kritinėje užklausoje.'
        : 'In your next long chat, run a checkpoint: about every ~10 messages ask AI to summarize what you agreed. Re-state the top rule in the critical request.',
      blockVariant: 'brand',
    });
  }
  for (const sec of secs) {
    if (/Kas vyksta|What happens|behind/i.test(sec.heading || '')) sec.blockVariant = 'terms';
    if (/Verslo pavyzdys|Business example/i.test(sec.heading || '')) sec.blockVariant = 'terms';
    if (/suvaldyti|manage risk|Kaip suvaldyti/i.test(sec.heading || '')) {
      sec.blockVariant = 'terms';
      if (lt && typeof sec.body === 'string') {
        sec.body = sec.body.replace(/įtraukite/g, 'įtrauk');
      }
    }
    if (/Tyrimų duomenys|Research data/i.test(sec.heading || '')) {
      sec.collapsible = true;
      sec.collapsedByDefault = true;
      sec.blockVariant = 'terms';
    }
  }
  // Insert Patikra before sources collapsible if missing
  if (!hasHeading(secs, /Patikra|Quality check/i)) {
    const srcIdx = secs.findIndex((x) => /Šaltiniai|Sources|Nori suprasti/i.test(x.heading || ''));
    const patikra = {
      heading: lt ? 'Patikra' : 'Quality check',
      body: lt
        ? 'Ilgoje sesijoje:\n• Ar naudoju checkpoint (santrauka kas ~10 žinučių)?\n• Ar kritinė taisyklė pakartota paskutinėje užklausoje?\n• Ar skirtingi projektai – atskiruose pokalbiuose?\n\nJei „ne“ – pradėk nuo 1–2 sakinių apibendrinimo kitame pokalbyje.'
        : 'In a long session:\n• Do I use checkpoints (summary ~every 10 messages)?\n• Is the critical rule repeated in the last request?\n• Are different projects in separate chats?\n\nIf “no” — start the next chat with a 1–2 sentence summary.',
      blockVariant: 'accent',
    };
    if (srcIdx >= 0) secs.splice(srcIdx, 0, patikra);
    else secs.push(patikra);
  }
}

function patch6697(s, locale) {
  const lt = locale === 'lt';
  const secs = s.content.sections;
  secs[0] = {
    heading: lt ? 'Trumpai' : 'In short',
    body: lt
      ? 'Prieš Modulio 5 testą ar projektą – 3 klausimai sau. Nukopijuok refleksijos promptą ir gauk asmeninį grįžtamąjį ryšį.'
      : 'Before the Module 5 test or project — 3 questions for yourself. Copy the reflection prompt and get personal feedback.',
    blockVariant: 'accent',
  };
  // Pirmas veiksmas → Daryk
  const actionIdx = secs.findIndex((x) => /Pirmas veiksmas|First action|Do now|Daryk/i.test(x.heading || ''));
  if (actionIdx >= 0) {
    secs[actionIdx].heading = lt ? 'Daryk dabar' : 'Do now';
    secs[actionIdx].blockVariant = 'brand';
  } else if (!hasHeading(secs, /Daryk dabar|Do now/i)) {
    secs.splice(1, 0, {
      heading: lt ? 'Daryk dabar' : 'Do now',
      body: lt
        ? 'Nukopijuok refleksijos promptą žemiau, paleisk DI ir atsakyk į 3 klausimus. Tada per 24–48 val. užduok vieną RAG klausimą su šaltiniu.'
        : 'Copy the reflection prompt below, run it in AI, and answer the 3 questions. Then within 24–48h ask one RAG question with a source.',
      blockVariant: 'brand',
    });
  }
  // Last emerald → Patikra
  const last = secs[secs.length - 1];
  last.heading = lt ? 'Patikra' : 'Quality check';
  last.body = lt
    ? 'Ar turi 1 konkretų veiksmą kitoms 48 val. (RAG klausimas, testas ar projektas)? Jei ne – grįžk prie prompto ir užsirašyk vieną žingsnį.'
    : 'Do you have 1 concrete action for the next 48h (RAG question, test, or project)? If not — return to the prompt and write one step.',
  last.blockVariant = 'accent';
}

function patch6699(s, locale) {
  const lt = locale === 'lt';
  s.content.sections = lt
    ? [
        {
          heading: 'Trumpai',
          body: 'Modulis 4 baigtas. Pasirink **vieną** kitą žingsnį – rekomenduojama pradėti nuo Modulio 5 testo.',
          blockVariant: 'accent',
        },
        {
          heading: 'Daryk dabar: Modulio 5 testas',
          body: 'Eik į Modulio 5 – 15 min prezentacijos sprintas ir mini suvokimo testas. Rekomenduojama ≥70 %, tada projektas Module 6 bus aiškesnis.',
          blockVariant: 'brand',
        },
        {
          heading: 'Kitaip: sustiprinti Modulį 4',
          body: 'Jei nori daugiau praktikos – grįžk į skaidres „RAG: kas tai ir pabandyk“ arba „Deep research (Gilusis tyrimas)“.',
          blockVariant: 'terms',
        },
        {
          heading: 'Kitaip: Modulio 6 projektas',
          body: 'Praktika su SUPER promptais ir COMBO – vienas integruotas projektas. Rekomenduojama po Modulio 5 testo.',
          blockVariant: 'terms',
        },
        {
          heading: 'Patikra: atmintinė',
          body: 'Užbaigimo ekrane parsisiųsk Modulio 4 PDF atmintinę (RAG, gilusis tyrimas, tokenai, patikros checklist). Jei dar neatsisiuntei – padaryk tai prieš testą.',
          blockVariant: 'accent',
        },
      ]
    : [
        {
          heading: 'In short',
          body: 'Module 4 is done. Pick **one** next step — recommended: start with the Module 5 test.',
          blockVariant: 'accent',
        },
        {
          heading: 'Do now: Module 5 test',
          body: 'Go to Module 5 — a 15-min presentation sprint and a short comprehension test. Aim for ≥70%, then the Module 6 project will be clearer.',
          blockVariant: 'brand',
        },
        {
          heading: 'Otherwise: reinforce Module 4',
          body: 'Want more practice — revisit “RAG: what it is and try it” or “Deep research”.',
          blockVariant: 'terms',
        },
        {
          heading: 'Otherwise: Module 6 project',
          body: 'Practice with SUPER prompts and COMBO — one integrated project. Recommended after the Module 5 test.',
          blockVariant: 'terms',
        },
        {
          heading: 'Quality check: handout',
          body: 'On the completion screen, download the Module 4 PDF handout (RAG, deep research, tokens, QC checklist). If you have not yet — do it before the test.',
          blockVariant: 'accent',
        },
      ];
}

const ltData = load('modules.json');
const enData = load('modules-en-m4-m6.json');

for (const [id, fn] of [
  ['66', patch66],
  ['66.25', patch6625],
  ['66.97', patch6697],
  ['66.99', patch6699],
]) {
  fn(slide(ltData, 4, id), 'lt');
  fn(slide(enData, 4, id), 'en');
}

save('modules.json', ltData);
save('modules-en-m4-m6.json', enData);

for (const id of ['66', '66.25', '66.97', '66.99']) {
  const s = slide(ltData, 4, id);
  console.log(
    `M4/${id}:`,
    s.content.sections.map((x) => `${x.heading}[${x.blockVariant}]`).join(' → ')
  );
}
console.log('I2 patched OK');
