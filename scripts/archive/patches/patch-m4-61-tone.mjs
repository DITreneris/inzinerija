#!/usr/bin/env node
/**
 * Patch M4 slide 61 (DI įrankiai informacijos paieškai) – tonas kaip 4.2a.
 * SOT: docs/turinio_pletra_moduliai_4_5_6.md § 4.2a-academic.
 * Run: node scripts/patch-m4-61-tone.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const modulesPath = join(__dirname, '..', 'src', 'data', 'modules.json');

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const mod = data.modules.find((m) => m.id === 4);
const slide = mod?.slides?.find((s) => s.id === 61);
if (!slide?.content) {
  console.error('M4 or slide 61 not found');
  process.exit(1);
}

slide.subtitle = 'DI įrankiai – nuo paieškos iki sintezės.';
slide.content.whyBenefit =
  'Bet kokį tyrimą gali atlikti per 30–45 min – įvesk klausimą ar įkelk PDF, gauk atsakymus su šaltiniais.';
slide.content.toolsIntro =
  'Įvesk klausimą ar įkėlk PDF – gausi atsakymus su šaltiniais.';

const tools = slide.content.tools;
if (Array.isArray(tools)) {
  const ensureTool = (name, url, description, useCases) => {
    let t = tools.find((tool) => tool.name === name);
    if (!t) {
      t = { name, url, description, useCases };
      tools.push(t);
    } else {
      t.url = url;
      t.description = description;
      if (useCases) t.useCases = useCases;
    }
  };

  ensureTool('Perplexity', 'https://perplexity.ai', 'Paieška su šaltiniais. Vietoj valandos googlinimo – įvesk klausimą, gauk atsakymą su nuorodomis.', [
    'Verslo tyrimas',
    'Rinkos analizė',
    'Faktų tikrinimas',
  ]);
  ensureTool('PaperGuide', 'https://paperguide.ai', 'Kalbėk su PDF. Įkelk ataskaitą ar tyrimą – gausi santrauką, išvadas, pagrindines mintis.', [
    'Ataskaitų analizė',
    'Greitas dokumento skenavimas',
  ]);
  ensureTool('Scite', 'https://scite.ai', 'Ar šaltinis tikrai palaiko tavo teiginį? Rodo, kaip tyrimas cituojamas – palaiko ar prieštarauja.', [
    'Citavimo tikrinimas',
    'Argumentų stiprinimas',
  ]);
  ensureTool('Elicit', 'https://elicit.com', 'Suranda ir apibendrina tyrimus pagal temą. Įvesk klausimą – gauk tendencijas, rizikas, pavyzdžius.', [
    'Sintezė',
    'Tendencijų paieška',
  ]);
  ensureTool('Consensus', 'https://consensus.app', 'Ieško tik moksliniuose straipsniuose ir atsako „ką sako mokslas?“ – parodo, ar tyrimai palaiko ar prieštarauja teiginiui.', [
    'Health / tech / policy teiginių validavimas',
    'AI Act interpretacijos',
    'Rizikų pagrindimas',
    'Mokslinių argumentų stiprinimas',
  ]);
  ensureTool(
    'Connected Papers',
    'https://www.connectedpapers.com',
    'Parodo, kaip tyrimai susiję tarpusavyje ir kokie susiformavę „research clusters“, padeda rasti svarbiausius (seminal) darbus.',
    ['Tyrimų tinklo analizė', 'Technologinių krypčių analizė', 'Seminal darbų paieška'],
  );
}

const sections = slide.content.sections;
if (Array.isArray(sections)) {
  const byHeading = (h) => sections.find((s) => s.heading === h || (h.includes('Trumpai') && s.heading?.includes('Trumpai')));
  const t = byHeading('1️⃣ Trumpai (20 s)') || sections.find((s) => s.blockVariant === 'accent');
  if (t)
    t.body =
      'DI įrankiai informacijos paieškai ir sintezei: Perplexity (paieška su šaltiniais), PaperGuide (PDF), Scite (citavimo tikrinimas), Elicit (tyrimų sintezė) ir du moksliniai įrankiai – Consensus ir Connected Papers. Tipinė eiga – 30–45 min.';
  const p = byHeading('Patarimai kaip naudoti');
  if (p)
    p.body =
      '**Perplexity:** Web režimas – naujienoms ir verslui; prašyk nuorodų („Pateik šaltinius prie kiekvieno teiginio“); būk konkretus (pvz. „Kokios 2024 m. tendencijos X rinkoje?“).\n\n**PaperGuide:** Įkelk PDF (ataskaitą, tyrimą), pateik konkretų klausimą; duomenų ištraukimas – lentelėms iš PDF.\n\n**Scite:** Įvesk straipsnio nuorodą arba pavadinimą; žiūrėk „Supported“ (palaiko) vs „Contradicted“ (prieštarauja); patikrink, ar citata tikrai atitinka.\n\n**Elicit:** Pradėk nuo aiškaus klausimo; duomenų ištraukimas iš kelių PDF į lentelę; prašyk „Pateik tendencijas ir rizikas“.\n\n**Consensus:** Kai reikia „ką sako mokslas?“ – naudok health/tech/policy teiginiams; žiūrėk, ar tyrimai palaiko ar prieštarauja.\n\n**Connected Papers:** Kai nori matyti tyrimų tinklą ir klasterius – naudok planuodamas gilų tyrimą ar technologijų kryptis.';
  const e = byHeading('Tipinė eiga (30–45 min)');
  if (e) e.body = '**4 įrankiai = pilna eiga:**\n\n**1.** Šaltiniai (Perplexity) – 5–10 min: įvesk klausimą, surink pradinius šaltinius.\n\n**2.** PDF analizė (PaperGuide / Elicit) – 10–15 min: įkelk dokumentus (ataskaitas, tyrimus), gauk santraukas ir išvadas.\n\n**3.** Citavimo patikrinimas (Scite) – ~5 min: patikrink, ar šaltiniai palaiko tavo teiginius.\n\n**4.** Sintezė (Elicit) – 10–15 min: apibendrink tendencijas, rizikas ir pavyzdžius.\n\n**Pilna eiga vienai temai** dažnai 30–45 min.';
}

writeFileSync(modulesPath, JSON.stringify(data, null, 2), 'utf8');
console.log('OK: M4 slide 61 – tonas atnaujintas.');
