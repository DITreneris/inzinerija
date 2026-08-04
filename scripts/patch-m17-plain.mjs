#!/usr/bin/env node
/**
 * M17-PLAIN: shell chrome + LT bank bridges.
 * Usage: node scripts/patch-m17-plain.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(root, 'src', 'data', 'modules.json');
const data = JSON.parse(readFileSync(path, 'utf8'));
const mod = data.modules.find((m) => m.id === 17);
if (!mod) {
  console.error('Module 17 not found');
  process.exit(1);
}

function slide(id) {
  const s = mod.slides.find((x) => x.id === id);
  if (!s) throw new Error(`Slide ${id} not found`);
  return s;
}

// —— 170 intro micro ——
{
  const s = slide(170);
  s.subtitle = 'Brief ir planavimo žinios – ne kodas';
  s.content.firstActionCTA =
    'Atsakyk į klausimus apie brief ir planavimą – ne apie kodą ar deploy.';
}

// —— 170.5 warm-up bridges ——
{
  const s = slide(170.5);
  s.subtitle = '3 klausimai: 1+1+1, vertė, kelias į M18';
  const q3 = s.content.questions.find((q) => q.id === 'm17-warm-3');
  q3.question = 'Po testo ką darysi pirmiausia Modulyje 18?';
  q3.options[0] =
    'Sudėliosi BUILD PACKET (failų rinkinį prieš DI kodą: brief, flow, taisyklės, Cursor promptas) – ne „sukurk visą app“';
  q3.options[1] = 'Iš karto prašysi DI parašyti visą sistemą be PACKET';
  q3.explanation =
    'M18 ašis: brief → PACKET (failų rinkinys) → Cursor pjūvis → įrodymas. Ne chaotiškas generate.';
}

// —— 171 bank bridges ——
{
  const s = slide(171);
  const byId = Object.fromEntries(s.testQuestions.map((q) => [q.id, q]));
  byId['m17-q4'].question =
    'Surikiuok brief brandinimo fazes Vibe → Skeleton → Refinement (nuo pirmos iki paskutinės):';
  byId['m17-q4'].explanation =
    'Vibe (idėjos jausmas) → Skeleton (ciklas + ribos) → Refinement (smailinimas).';
  byId['m17-q8'].options[0] =
    'PACKET (failų rinkinys) / rules / vertikalų pjūvį – kontekstas prieš generate';
  byId['m17-q8'].explanation =
    'Prieš generavimą – PACKET ir ribos, ne plikas „sukurk app“.';
  byId['m17-q9'].options[0] =
    'Per 2 min galima patikrinti, ar pagrindinė funkcija veikia naudotojui';
  byId['m17-q11'].options[0] =
    'Prieš commit: perskaityti diff, tada greita patikra (smoke), tada commit';
  byId['m17-q11'].explanation =
    'Diff ritualas: status → diff → greita patikra (smoke) → commit → push. Detaliau – Modulis 18.';
}

// —— 172 results lukštas (M11 etalon) ——
{
  const s = slide(172);
  s.content = {
    passedMessage:
      'Sveikiname! Brief’as atrodo pakankamai siauras – gali eiti į Modulio 18 projektą.',
    failedMessage:
      'Verta grįžti prie Modulio 16: kortelės 5 laukų, triage (Būtina/Galima/Nekuriame), naudotojo ciklo ir 01_MVP_BRIEF.md.',
    thresholdExplanation:
      'Kai pasieksi ≥70 %, gali pereiti prie Modulio 18. Mažiau – peržiūrėk brief ribas, Vertė ≠ funkcija ir Vibe → Skeleton → Refinement.',
    useCaseBlock: {
      heading: 'Kitas žingsnis: Modulis 18',
      body: 'Jei ≥70 % – eik į projektą: sudėliok BUILD PACKET (failų rinkinį prieš DI kodą), padaryk vieną Cursor pjūvį ir surink minkštą baigties įrodymą (soft DoD – M18). Jei mažiau – grįžk prie kortelės ir brief’o Modulio 16.',
      blockVariant: 'accent',
    },
    reflectionTitle: 'Refleksijos promptas',
    reflectionPrompt:
      'META: Tu esi mokymų refleksijos asistentas. Tikslas – įtvirtinti brief planavimo žinias.\nINPUT: Ką tik baigiau Modulio 17 testą – brief siaurumą, triage, ciklą ir sėkmės kriterijų.\nOUTPUT: Užduok 3 klausimus: (1) Kurį brief lauką sutvirtinsiu per 24 val.? (2) Kas buvo naujausia? (3) Ką noriu padaryti pirmą M18 PACKET žingsnį? Po mano atsakymų duok 1 konkretų patarimą.',
    footer: 'Toliau – skaidrė 5: Bonus: brief checklist',
  };
}

// —— 173 bonus ——
{
  const s = slide(173);
  s.content.sections[0].body =
    'Patikrink brief prieš PACKET (failų rinkinį prieš DI kodą) – 5 greiti punktai.';
  s.content.sections[3].body =
    'Ar gali pradėti PACKET (brief + flow + taisyklės) be „sukurk visą app“?';
}

// transfer CTA bridge
mod.transfer.nextStepCTA =
  'Pereik prie Modulio 18 – BUILD PACKET (failų rinkinys) ir minkštas baigties įrodymas (soft DoD).';

writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log('Patched M17 plain LT');
