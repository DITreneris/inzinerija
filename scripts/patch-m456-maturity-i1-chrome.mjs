/**
 * I1: M4 chrome — GOLDEN §3.2 Trumpai → Daryk → Patikra on 53, 63, 64, 63.7
 * Run: node scripts/patch-m456-maturity-i1-chrome.mjs
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
  if (!m) throw new Error(`module ${modId} missing`);
  const s = m.slides.find((x) => String(x.id) === String(slideId));
  if (!s) throw new Error(`M${modId}/${slideId} missing`);
  return s;
}

function patch53(s, locale) {
  const lt = locale === 'lt';
  const secs = s.content.sections;
  // 0 → Trumpai
  secs[0] = {
    heading: lt ? 'Trumpai' : 'In short',
    body: lt
      ? 'Įrankį rinkis pagal užduoties tipą, ne pagal populiarumą. Teisingas pasirinkimas taupo laiką ir mažina klaidas.'
      : 'Pick the tool by task type, not popularity. The right choice saves time and cuts mistakes.',
    blockVariant: 'accent',
  };
  // Insert Daryk after Trumpai if missing
  const darykHeading = lt ? 'Daryk dabar' : 'Do now';
  if (!secs.some((x) => /Daryk dabar|Do now/i.test(x.heading || ''))) {
    secs.splice(1, 0, {
      heading: darykHeading,
      body: lt
        ? 'Pasirink juostoje, ką darai dabar (Rašau / Analizuoju / Office / Tiriu / Skaidrės). Lentelė parodys tinkamiausią įrankį – užsirašyk vieną pasirinkimą šiai savaitei.'
        : 'In the bar, pick what you are doing now (Write / Analyze / Office / Research / Slides). The table highlights the best-fit tool — note one choice for this week.',
      blockVariant: 'brand',
    });
  }
  // Last section → Patikra (was Practical recommendation)
  const last = secs[secs.length - 1];
  last.heading = lt ? 'Patikra' : 'Quality check';
  last.body = lt
    ? 'Pažymėk sau:\n• Ar žinau 1 pagrindinį įrankį šiai savaitei?\n• Ar žinau, kada jungti antrą (specializuotą)?\n• Ar renkusi pagal užduotį, ne pagal hype?\n\nJei bent 2 „ne“ – grįžk prie juostos ir pakartok pasirinkimą.'
    : 'Check yourself:\n• Do I know 1 primary tool for this week?\n• Do I know when to add a second specialist tool?\n• Did I choose by task, not hype?\n\nIf at least 2 are “no” — return to the bar and choose again.',
  last.blockVariant = 'accent';
  // Demote extra brand accents on "Kaip rinktis" / workflow if needed — keep brand for Daryk only among CTAs; "Kaip rinktis" stays brand OK; workflow → terms to avoid clutter
  for (const sec of secs) {
    if (/Kaip rinktis|How to choose/i.test(sec.heading || '')) sec.blockVariant = 'terms';
    if (/Pavyzdinė grandinė|Example chain/i.test(sec.heading || '')) sec.blockVariant = 'terms';
  }
}

function patch63(s, locale) {
  const lt = locale === 'lt';
  const secs = s.content.sections;
  secs[0] = {
    heading: lt ? 'Trumpai' : 'In short',
    body: lt
      ? 'Keturios trumpos strategijos – mažiau chaoso, aiškesnės išvados, struktūruoti atsakymai. Veikia su RAG ir Deep research.'
      : 'Four short strategies — less chaos, clearer conclusions, structured answers. Works with RAG and Deep research.',
    blockVariant: 'accent',
  };
  const darykHeading = lt ? 'Daryk dabar' : 'Do now';
  if (!secs.some((x) => /Daryk dabar|Do now/i.test(x.heading || ''))) {
    secs.splice(1, 0, {
      heading: darykHeading,
      body: lt
        ? 'Nukopijuok **vieną** Micro promptą žemiau (pradėk nuo „Žingsnis po žingsnio“), pakeisk skliaustus ir paleisk DI. Palygink su savo įprastu klausimu.'
        : 'Copy **one** Micro prompt below (start with “Step-by-step”), fill the brackets, and run it in AI. Compare with your usual question.',
      blockVariant: 'brand',
    });
  }
  const last = secs[secs.length - 1];
  last.heading = lt ? 'Patikra' : 'Quality check';
  last.body = lt
    ? 'Po paleidimo:\n• Ar atsakymas turi aiškią struktūrą (žingsniai / lentelė / šakos)?\n• Ar galiu tą pačią strategiją pakartoti kitai temai?\n\nJei „ne“ – bandyk kitą Micro iš sąrašo. Tu ne tik klausi DI – tu valdai mąstymo struktūrą.'
    : 'After you run it:\n• Does the answer have clear structure (steps / table / branches)?\n• Can you reuse the same strategy on another topic?\n\nIf “no” — try another Micro from the list. You are not just asking AI — you steer its thinking structure.',
  last.blockVariant = 'accent';
}

function patch64(s, locale) {
  const lt = locale === 'lt';
  const secs = s.content.sections;
  secs[0] = {
    heading: lt ? 'Trumpai' : 'In short',
    body: lt
      ? 'Kai sprendimas kainuoja pinigus arba reikia šaltinių vadovybei – Deep research = struktūruotas mini tyrimas (5–15 min), ne vienas DI atsakymas.'
      : 'When a decision costs money or you need sources for leadership — Deep research is a structured mini-study (5–15 min), not a single AI answer.',
    blockVariant: 'accent',
  };
  // Ensure Daryk before first copyable
  const firstCopyIdx = secs.findIndex((x) => x.copyable);
  const darykHeading = lt ? 'Daryk dabar' : 'Do now';
  if (!secs.some((x) => /Daryk dabar|Do now/i.test(x.heading || ''))) {
    secs.splice(firstCopyIdx, 0, {
      heading: darykHeading,
      body: lt
        ? 'Nukopijuok Deep Research promptą žemiau. Pakeisk [TEMA], [TIKSLĄ], [ŠALTINIUS] ir paleisk. Jei skubi – naudok Greitą startą (tyrimo starterį).'
        : 'Copy the Deep Research prompt below. Replace [TOPIC], [GOAL], [SOURCES] and run it. In a hurry — use Quick start (research starter).',
      blockVariant: 'brand',
    });
  }
  // Soften middle brand overload: "Kas tai" → terms
  for (const sec of secs) {
    if (/Kas tai iš esmės|What is it in essence/i.test(sec.heading || '')) sec.blockVariant = 'terms';
    if (/Kur tai veikia|Where does it work/i.test(sec.heading || '')) sec.blockVariant = 'terms';
  }
  const last = secs[secs.length - 1];
  last.heading = lt ? 'Patikra' : 'Quality check';
  last.body = lt
    ? 'Patikrink OUTPUT:\n• Ar yra sub-klausimai ir sintezė (ne tik nuomonė)?\n• Ar prie išvadų yra šaltiniai (arba „Nežinau“)?\n• Ar galiu tuo pagrįsti sprendimą?\n\nJei bent 2 „ne“ – paleisk Greitą startą ir papildyk šaltinius.'
    : 'Check the OUTPUT:\n• Are there sub-questions and a synthesis (not just opinion)?\n• Do conclusions cite sources (or “I don’t know”)?\n• Can you defend a decision with this?\n\nIf at least 2 are “no” — run Quick start and add sources.',
  last.blockVariant = 'accent';
}

function patch637(s, locale) {
  const lt = locale === 'lt';
  const secs = s.content.sections;
  secs[0] = {
    heading: lt ? 'Trumpai' : 'In short',
    body: lt
      ? 'COMBO sujungia vaidmenį, procesą, alternatyvas ir aiškią išvestį – DI duoda sprendimo logiką, ne „gražų tekstą“. Tą patį principą naudosi projekte.'
      : 'COMBO joins role, process, alternatives, and a clear output — AI gives decision logic, not “nice text”. You will reuse the same principle in your project.',
    blockVariant: 'accent',
  };
  const darykHeading = lt ? 'Daryk dabar' : 'Do now';
  if (!secs.some((x) => /Daryk dabar|Do now/i.test(x.heading || ''))) {
    secs.splice(1, 0, {
      heading: darykHeading,
      body: lt
        ? 'Nukopijuok COMBO pavyzdį žemiau (practical task). Pakeisk situaciją į savo verslo atvejį ir paleisk DI. Tikslas – 90 dienų planas + 3 rizikos, ne bendros frazės.'
        : 'Copy the COMBO example below (practical task). Swap in your business case and run it in AI. Goal — a 90-day plan + 3 risks, not generic phrases.',
      blockVariant: 'brand',
    });
  }
  // COMBO explainer → terms (was violet)
  for (const sec of secs) {
    if (/COMBO\s*=/i.test(sec.heading || '')) sec.blockVariant = 'terms';
  }
  // Replace "Kodėl tai veikia?" accent with Patikra; keep useful bullets
  const whyIdx = secs.findIndex((x) => /Kodėl tai veikia|Why does it work/i.test(x.heading || ''));
  if (whyIdx >= 0) {
    secs[whyIdx] = {
      heading: lt ? 'Patikra' : 'Quality check',
      body: lt
        ? 'Po paleidimo:\n• Ar DI palygino alternatyvas (ne tik vieną idėją)?\n• Ar yra rekomenduojama kryptis + 90 dienų planas?\n• Ar įvardytos bent 3 rizikos?\n\nJei „ne“ – grąžink COMBO sluoksnius į promptą (vaidmuo → procesas → alternatyvos → išvestis).'
        : 'After you run it:\n• Did AI compare alternatives (not just one idea)?\n• Is there a recommended direction + 90-day plan?\n• Are at least 3 risks named?\n\nIf “no” — put the COMBO layers back into the prompt (role → process → alternatives → output).',
      blockVariant: 'accent',
    };
  }
  // Fix curriculum ID leak in token collapsible
  for (const sec of secs) {
    if (/Token/i.test(sec.heading || '') && typeof sec.body === 'string') {
      sec.body = lt
        ? 'COMBO promptai gali būti ilgi – gerbk tokenų limitą (promptas + atsakymas); planuok apimtį arba skaidyk į kelis promptus. Jei atsakymas pertrūksta – skaidyk į kelias užklausas su aiškia seka.\n\nDaugiau – skaidrėje „Tokenų ekonomika“ šiame modulyje.'
        : 'COMBO prompts can get long — respect the token limit (prompt + answer); plan length or split into several prompts. If the answer cuts off — split into sequenced queries.\n\nMore in the “Token economy” slide in this module.';
    }
  }
}

const ltData = load('modules.json');
const enData = load('modules-en-m4-m6.json');

patch53(slide(ltData, 4, 53), 'lt');
patch53(slide(enData, 4, 53), 'en');
patch63(slide(ltData, 4, 63), 'lt');
patch63(slide(enData, 4, 63), 'en');
patch64(slide(ltData, 4, 64), 'lt');
patch64(slide(enData, 4, 64), 'en');
patch637(slide(ltData, 4, '63.7'), 'lt');
patch637(slide(enData, 4, '63.7'), 'en');

save('modules.json', ltData);
save('modules-en-m4-m6.json', enData);

for (const id of [53, 63, 64, '63.7']) {
  const s = slide(ltData, 4, id);
  const h = s.content.sections.map((x) => `${x.heading}[${x.blockVariant || '-'}]`).join(' → ');
  console.log(`M4/${id}: ${h}`);
}
console.log('I1 chrome patched OK');
