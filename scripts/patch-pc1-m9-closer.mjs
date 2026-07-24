/**
 * PC-1: M9 practice closer – intro copy, recommended +104, primary footers, hub note.
 * Run from repo root: node scripts/patch-pc1-m9-closer.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const REC_IDS = [101, 102, 104, 111, 116, 117];

const FOOTERS_LT = {
  90: 'Toliau – skaidrė 2: 8 žingsnių darbo eiga',
  93: 'Toliau – skaidrė 3: Praktika: šaltinių katalogas',
  93.1: 'Toliau – skaidrė 4: Praktika: savo CSV / Excel',
  93.2: 'Toliau – skaidrė 5: Pagalbiniai promptai žingsniams',
  94: 'Toliau – skaidrė 6: Scenarijų hub (neprivaloma)',
};

const FOOTERS_EN = {
  90: 'Next – slide 2: 8-step workflow',
  93: 'Next – slide 3: Practice: sources catalog',
  93.1: 'Next – slide 4: Practice: your CSV / Excel',
  93.2: 'Next – slide 5: Helper prompts per step',
  94: 'Next – slide 6: Scenario hub (optional)',
};

const SHORT_TITLES_LT = {
  93: '8 žingsnių darbo eiga',
  94: 'Pagalbiniai promptai žingsniams',
  99: 'Scenarijų hub (neprivaloma)',
};

const SHORT_TITLES_EN = {
  93: '8-step workflow',
  94: 'Helper prompts per step',
  99: 'Scenario hub (optional)',
};

function patchModule9(mod, { locale }) {
  const footers = locale === 'en' ? FOOTERS_EN : FOOTERS_LT;
  const shorts = locale === 'en' ? SHORT_TITLES_EN : SHORT_TITLES_LT;
  const slides = mod.slides;
  if (!Array.isArray(slides)) throw new Error('M9 slides missing');

  for (const s of slides) {
    if (shorts[s.id] && !s.shortTitle) s.shortTitle = shorts[s.id];
    if (footers[s.id] != null) {
      if (!s.content || typeof s.content !== 'object') s.content = {};
      s.content.footer = footers[s.id];
    }
    if (s.id === 104) s.recommended = true;
    if (REC_IDS.includes(s.id)) s.recommended = true;
    // leave explicit false on 105 as-is; 104 was false → true
    if (s.id === 105 && s.recommended === false) {
      /* keep false */
    }
  }

  const intro = slides.find((s) => s.id === 90);
  if (!intro?.content) throw new Error('intro 90 missing');
  if (locale === 'lt') {
    intro.content.primaryPathIntro =
      '**Pagrindinis kelias:** dvi praktikos (šaltinių katalogas arba savo CSV/Excel) + **8 žingsnių ciklas** (schema ir kopijuojami promptai). To užtenka moduliui užbaigti.';
    intro.content.firstActionCTA =
      'Spausk „Tęsti“ → šaltinių katalogas, tada 8 žingsnių schema ir promptai.';
    intro.content.recommendedStart =
      '**(i)** Neturi vidinių duomenų → šaltinių katalogas. **(ii)** Turi Excel/CRM (arba sample CSV) → savo failo valymas. Tada schema ir pagalbiniai promptai. Hub scenarijai – papildoma biblioteka (neprivaloma); amber „Rekomenduojama“ – starteriai po pagrindinio kelio.';
    intro.subtitle =
      'Pirmiausia – dvi praktikos ir 8 žingsnių ciklas; hub – papildoma biblioteka';
  } else {
    intro.content.primaryPathIntro =
      '**Main path:** two practices (sources catalog or your CSV/Excel) + the **8-step cycle** (diagram and copyable prompts). That is enough to finish the module.';
    intro.content.firstActionCTA =
      'Press Continue → sources catalog, then the 8-step diagram and prompts.';
    intro.content.recommendedStart =
      '**(i)** No internal data → sources catalog. **(ii)** You have Excel/CRM (or sample CSV) → clean your file. Then the diagram and helper prompts. Hub scenarios are an optional library; amber “Recommended” marks starters after the main path.';
    intro.subtitle =
      'First – two practices and the 8-step cycle; hub – optional library';
  }
  intro.content.recommendedSlideIds = [...REC_IDS];

  const hub = slides.find((s) => s.id === 99);
  if (!hub?.content) throw new Error('hub 99 missing');
  hub.content.recommendedSlideIds = [...REC_IDS];
  hub.content.optionalPathNote =
    locale === 'lt'
      ? 'Papildoma biblioteka · pagrindinis kelias jau praeitas: schema → dvi praktikos → pagalbiniai promptai → santrauka. Amber „Rekomenduojama“ – starteriai; kiti – papildomi.'
      : 'Optional library · main path first: diagram → two practices → helper prompts → summary. Amber “Recommended” = starters; others are extra.';
}

function patchFile(rel, locale) {
  const fp = path.join(root, rel);
  const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const mod = data.modules.find((m) => m.id === 9);
  if (!mod) throw new Error(`module 9 not in ${rel}`);
  patchModule9(mod, { locale });
  fs.writeFileSync(fp, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('patched', rel);
}

patchFile('src/data/modules.json', 'lt');
patchFile('src/data/modules-en-m7-m9.json', 'en');
console.log('OK PC-1 M9 data');
