#!/usr/bin/env node
/**
 * Audituoja modules.json: randa sekcijas, kuriose antraštėje yra laikas („X min“, „X minučių“)
 * be nurodymo, kam tas laikas. Pagal CONTENT_AGENT §3.2 / GOLDEN_STANDARD §3.2 antraštė turi
 * būti savarankiška (pvz. ne „Kodėl verta 10 min“, o „Kodėl verta skirti ~10 min Master Prompt kūrimui“).
 *
 * Naudojimas: node scripts/audit-heading-time-ambiguity.mjs
 * Exit 0 = nėra neaiškių antraščių, 1 = rasta (rekomenduojama patikslinti antraštę).
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const modulesPath = join(root, 'src', 'data', 'modules.json');

/** Antraštė laikoma aiškia (laikas susietas su veiksmu/objektu), jei joje yra bent vienas iš šių. */
const WHITELIST_PHRASES = [
  'Daryk dabar',
  'Patikra',
  'Pabandyk',
  'Kodėl verta skirti',
  'Master Prompt',
  'workflow',
  'grandin',
  'Ką daryti',
  'Ką čia įsisavinsi',
  'Apibrėžk',
  'Sudaryk',
  'Tipinė eiga',
  'Sprinto eiga',
];

/** Ar antraštėje yra laiko išraiška (skaičius + min / minučių). */
function hasTimeInHeading(heading) {
  if (!heading || typeof heading !== 'string') return false;
  return /\d+[\s–-]*\d*\s*min(učių)?/i.test(heading);
}

/** Ar antraštė laikoma aiškia (whitelist). */
function isHeadingClear(heading) {
  if (!heading) return true;
  const h = heading.trim();
  return WHITELIST_PHRASES.some((phrase) => h.includes(phrase));
}

function run() {
  const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
  const modules = data.modules ?? [];
  const issues = [];

  for (const mod of modules) {
    const slides = mod.slides ?? [];
    for (const slide of slides) {
      const content = slide.content;
      if (!content?.sections) continue;
      const slideId = slide.id ?? slide.title;
      const slideTitle = slide.title ?? '';

      for (const section of content.sections) {
        const heading = section.heading ?? '';
        if (!hasTimeInHeading(heading)) continue;
        if (isHeadingClear(heading)) continue;

        issues.push({
          moduleId: mod.id,
          slideId,
          slideTitle,
          heading,
        });
      }
    }
  }

  if (issues.length === 0) {
    console.log('OK: nėra sekcijų su laiku antraštėje be konteksto „kam“.');
    return 0;
  }

  console.error('\n⚠ Potentially ambiguous heading (time without clear "for what"):\n');
  for (const u of issues) {
    console.error(`  Slide ${u.slideId} "${u.slideTitle}"`);
    console.error(`    → "${u.heading}"`);
    console.error('');
  }
  console.error('Rekomendacija: patikslinti antraštę pagal CONTENT_AGENT §3.2 / GOLDEN_STANDARD §3.2 (nurodyti, kam tas laikas).');
  return 1;
}

process.exit(run());
