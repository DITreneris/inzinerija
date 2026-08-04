#!/usr/bin/env node
/**
 * M18-PLAIN B1–B4 LT bridges (keep PACKET/Soft DoD/smoke as curriculum terms).
 * Usage: node scripts/patch-m18-plain-lt.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(root, 'src', 'data', 'modules.json');
const data = JSON.parse(readFileSync(path, 'utf8'));
const mod = data.modules.find((m) => m.id === 18);
if (!mod) {
  console.error('Module 18 not found');
  process.exit(1);
}

function slide(id) {
  const s = mod.slides.find((x) => x.id === id);
  if (!s) throw new Error(`Slide ${id} missing`);
  return s;
}

function setSec(id, heading, body) {
  const s = slide(id);
  const sec = s.content.sections?.find((x) => x.heading === heading);
  if (!sec) throw new Error(`${id} missing section ${heading}`);
  sec.body = body;
}

// —— B1: 180 · 18.05 · 18.1 · 18.2 ——
{
  const s = slide(180);
  s.subtitle = 'PACKET → Cursor → minkštas baigties įrodymas';
  s.content.whyBenefit =
    'Po projekto turėsi BUILD PACKET (failų rinkinį prieš DI kodą) ir įrodytą paleidžiamą (arba lokaliai veikiantį) MVP.';
  s.content.outcomes = [
    'BUILD PACKET – failų rinkinys: brief, flow, taisyklės, Cursor promptas',
    'Vertikalus pjūvis Cursor su planu prieš kodą',
    'Minkštas baigties įrodymas (soft DoD): URL arba lokalus proof + GitHub',
  ];
  s.content.taskOneLiner =
    'Sudėliok PACKET, padaryk vieną Cursor pjūvį ir surink minkštą baigties įrodymą (soft DoD).';
}

setSec(
  18.05,
  'Trumpai',
  'Turi brief. Čia nekartojame viso M16. Primename: 1 naudotojas, 1 problema, 1 funkcija – ir pereiname į PACKET (failų rinkinį prieš DI kodą).'
);

setSec(
  18.1,
  'Trumpai',
  'DI siūlo daug. Žmogus riboja. Kontroliuojamas kūrimas = PACKET (failų rinkinys) + vienas pjūvis.'
);
{
  const s = slide(18.1);
  const sec = s.content.sections.find((x) => x.heading === 'Chaosas vs kontrolė');
  if (sec) sec.body = 'Kontroliuojamas kūrimas = PACKET + vienas pjūvis – ne „sukurk visą app“.';
}

setSec(
  18.2,
  'Trumpai',
  'Pilnas Task Manager su Redis, WebSocket, AWS, Auth, Stripe – ne pirmas MVP. Palik vieną siaurą pjūvį.'
);

// —— B2: Alias kill, early smoke → greita patikra ——
setSec(
  18.12,
  'Trumpai',
  'PACKET failai: tas pats brief kaip `01_MVP_BRIEF.md` (čia `mvp_brief.md`), user_flow.md, optional schema, build_prompt.md, PROJECT_RULES.md.'
);

{
  const s = slide(18.125);
  s.content.subtitle =
    'Toliau: vibe-debt, greita patikra (smoke), paleidimo vartai, diff ir minkštas baigties įrodymas (soft DoD).';
  s.content.celebrationText =
    'PACKET sudėtas – toliau higiena ir įrodymas.';
  if (Array.isArray(s.content.nextSteps)) {
    s.content.nextSteps = s.content.nextSteps.map((t) =>
      typeof t === 'string'
        ? t
            .replace(/\bsmoke\b/gi, 'greita patikra (smoke)')
            .replace(/soft DoD/gi, 'minkštas baigties įrodymas (soft DoD)')
        : t
    );
  }
}

setSec(
  18.101,
  'Trumpai',
  'Maži ciklai: aprašyk → generuok mažai → paleisk → patikrink → pataisyk. Klaida + kontekstas – ne „pergeneruok viską“.'
);
{
  const s = slide(18.101);
  const sec = s.content.sections.find((x) => x.heading === '5 žingsniai' || x.heading?.includes('žingsniai'));
  if (sec) {
    sec.body = 'Kartok, kol Must funkcija praeina greitą patikrą (smoke – detaliau vėliau).';
  }
  // also patch any section with smoke
  for (const sec of s.content.sections || []) {
    if (typeof sec.body === 'string' && /\bsmoke\b/i.test(sec.body) && !/greitą patikrą/i.test(sec.body)) {
      sec.body = sec.body.replace(/\bsmoke\b/gi, 'greitą patikrą (smoke)');
    }
  }
}

{
  const s = slide(18.9);
  for (const sec of s.content.sections || []) {
    if (typeof sec.body === 'string' && /\bsmoke\b/i.test(sec.body) && !/greita patikra/i.test(sec.body)) {
      sec.body = sec.body.replace(/\bsmoke\b/gi, 'greita patikra (smoke)');
    }
    if (sec.table?.rows) {
      sec.table.rows = sec.table.rows.map((row) =>
        row.map((cell) =>
          typeof cell === 'string' && /\bsmoke\b/i.test(cell) && !/greita/i.test(cell)
            ? cell.replace(/\bsmoke\b/gi, 'greita patikra (smoke)')
            : cell
        )
      );
    }
  }
}

setSec(
  18.6,
  'Trumpai',
  'Trumpos taisyklės agentui: stack hint, Must/Won’t, Done, LT, saugumas, patvirtinimo vartai (approve) prieš kodą.'
);

setSec(
  18.7,
  'Trumpai',
  'Viena Must funkcija (vertikalus pjūvis). Failų planas prieš kodą. Priėmimo kriterijai.'
);
setSec(
  18.7,
  'Daryk dabar',
  'Nukopijuok Cursor pjūvio promptą ir įrašyk savo 1 funkciją.'
);

// —— B3: smoke path-step keeps term with bridge ——
{
  const s = slide(18.16);
  s.content.body =
    'Aprašyk ir paleisk 3 greitos patikros (smoke) žingsnius. Pažymėk, kai paleidimas, UI/API ir pagrindinė funkcija – žali (1 raudona = nestartuojame giliau).';
  s.content.pathLabel = 'Smoke / greita patikra';
}

{
  const s = slide(18.13);
  setSec(
    18.13,
    'Trumpai',
    'DI generuoja. Produktas atsiranda tik kai tu patikrini paleidimą, funkciją ir saugumą – su įrodymu.'
  );
}

// —— B4: Soft DoD earned + summary ——
{
  const s = slide(18.23);
  s.content.title = 'Soft DoD – minkštas baigties įrodymas';
  s.content.body =
    'Pažymėk, kai turi soft DoD (minkštą baigties įrodymą): GitHub + commit’ai, gitignore, README, PROJECT_RULES, ≥1 kritinės funkcijos patikra, viešas URL arba lokalus paleidimo aprašas.';
  s.content.pathLabel = 'Soft DoD kelias';
}

{
  const s = slide(18.201);
  setSec(
    18.201,
    'Trumpai',
    'Prieš didesnį DI pakeitimą – commit veikiančios versijos. Po DI: perskaityk diff, tada greita patikra (smoke), tada commit.'
  );
  for (const sec of s.content.sections || []) {
    if (typeof sec.body === 'string') {
      sec.body = sec.body
        .replace(/→ smoke →/g, '→ greita patikra (smoke) →')
        .replace(/\bsmoke\b(?! \()/gi, (m) =>
          /greita patikra/i.test(sec.body) ? m : 'greita patikra (smoke)'
        );
    }
  }
}

{
  const s = slide(18.24);
  s.content.introBody =
    'Sudėliojai BUILD PACKET (failų rinkinį), dirbai Cursor su planu prieš kodą ir surinkai minkštą baigties įrodymą (soft DoD).';
  s.content.tagline =
    'Disciplina = PACKET + įrodymas – ne chaotiškas generate.';
  if (Array.isArray(s.content.stats)) {
    s.content.stats = s.content.stats.map((st) => {
      if (st.label === 'DoD' || /soft/i.test(st.label)) {
        return { ...st, label: 'Soft DoD', value: st.value || '✓' };
      }
      return st;
    });
  }
}

mod.transfer = {
  ...mod.transfer,
  abilityBefore: 'DI kodą leidau be PACKET ir be baigties įrodymo.',
  abilityAfter: 'Turiu PACKET ir soft DoD įrodymą (URL arba lokalus).',
  firstAction24h: 'Padaryk 1 commit + 1 greitą patikrą / proof ant savo MVP.',
  nextStepCTA: 'Pritaikyk PACKET kitai siaurai idėjai',
};

// Global light pass: alias + fn shorthand
for (const s of mod.slides) {
  const walk = (obj) => {
    if (typeof obj === 'string') {
      return obj
        .replace(/\(alias 01_MVP_BRIEF\.md\)/gi, '(tas pats dokumentas kaip 01_MVP_BRIEF.md)')
        .replace(/mvp_brief\.md \(alias 01_MVP_BRIEF\.md\)/gi, 'mvp_brief.md (tas pats kaip 01_MVP_BRIEF.md)')
        .replace(/Alias M18:?\s*/gi, '')
        .replace(/\b1 fn\b/g, '1 funkcija')
        .replace(/pagrindinė fn/gi, 'pagrindinė funkcija')
        .replace(/kritinės fn/gi, 'kritinės funkcijos');
    }
    if (Array.isArray(obj)) return obj.map(walk);
    if (obj && typeof obj === 'object') {
      for (const k of Object.keys(obj)) obj[k] = walk(obj[k]);
    }
    return obj;
  };
  if (s.content) walk(s.content);
}

writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log('Patched M18 LT plain bridges');
