#!/usr/bin/env node
/**
 * Atvirkštinis collapsible auditas: randa sekcijas su ILGU body BE collapsible,
 * skirsto pagal semantiką (GOLDEN_STANDARD, CONTENT_AGENT, UI_UX_AGENT, CURRICULUM_AGENT).
 * Ne visur ilgas = dėti collapsible – optional/reference = rekomenduojama; TL;DR/Daryk dabar = dažniau palikti atvertą.
 * NEDĖTI collapsible: (a) svarbus promptas (copyable arba antraštė su promptas/promptai/kopijuojami), (b) praktinė užduotis (antraštė: praktika, užduotis, patikra, daryk dabar ir pan.).
 *
 * Naudojimas: node scripts/audit-long-without-collapsible.mjs
 * Exit 0 = nėra kandidatų, 1 = yra kandidatų (sprendimas pagal semantiką – ne visiems dėti collapsible).
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const modulesPath = join(root, 'src', 'data', 'modules.json');

const MIN_LENGTH = 180;
const MIN_LENGTH_ONE_LINE = 280;
const PREVIEW_LEN = 80;

function isShortContent(body) {
  const b = (body ?? '').trim();
  if (b.length < MIN_LENGTH) return true;
  const lines = b.split(/\n/).filter((l) => l.trim().length > 0);
  if (lines.length <= 1 && b.length < MIN_LENGTH_ONE_LINE) return true;
  return false;
}

/** Ar antraštėje yra žodžiai, rodantys optional/reference (rekomenduojama collapsible). */
function headingSuggestsOptional(heading) {
  if (!heading || typeof heading !== 'string') return false;
  const h = heading.toLowerCase();
  const terms = [
    'optional',
    'papildomai',
    'šaltiniai',
    'nori suprasti detaliau',
    'detaliau',
    'giliau',
    'palyginimas',
    '🔽',
  ];
  return terms.some((t) => h.includes(t.toLowerCase()));
}

/** Ar antraštėje yra žodžiai, rodantys pagrindinį srautą/tikslus (dažniau palikti atvertą). */
function headingSuggestsMainFlow(heading) {
  if (!heading || typeof heading !== 'string') return false;
  const h = heading.toLowerCase();
  const terms = [
    'daryk dabar',
    'pirmas žingsnis',
    'ką čia įsisavinsi',
    'tikslas',
  ];
  return terms.some((t) => h.includes(t.toLowerCase()));
}

/** Ar sekcija yra svarbus promptas (copyable arba antraštė rodo promptą) – NEDĖTI collapsible. */
function isImportantPrompt(section) {
  const copyable = section.copyable;
  if (copyable != null && String(copyable).trim().length > 0) return true;
  const heading = (section.heading ?? '').toLowerCase();
  const terms = ['kopijuojami promptai', 'kopijuojami', 'promptas', 'promptai', 'šablonas', 'nukopijuok'];
  return terms.some((t) => heading.includes(t));
}

/** Ar antraštė rodo praktinę užduotį – NEDĖTI collapsible. */
function headingSuggestsPracticalTask(heading) {
  if (!heading || typeof heading !== 'string') return false;
  const h = heading.toLowerCase();
  const terms = [
    'praktika',
    'praktinė',
    'užduotis',
    'užduotys',
    'patikra',
    'ką daryti',
    'daryk dabar',
    'sudaryk',
    'apibrėžk',
    'atlik',
  ];
  return terms.some((t) => h.includes(t));
}

/**
 * Skirsto kandidatą į REKOMENDUOJAMA_COLLAPSIBLE arba PERZIURETI_PALIKTI_ATVERTA.
 * NEDĖTI collapsible: svarbus promptas (copyable / antraštė), praktinė užduotis.
 * Prioritetas: pirmiausia „peržiūrėti“ (promptas, praktika, pirmos sekcijos, accent/brand), paskui „rekomenduojama“ (terms, optional, index ≥ 3).
 */
function classifyCandidate(section, sectionIndex) {
  const heading = section.heading ?? '';
  const blockVariant = section.blockVariant ?? '';

  if (isImportantPrompt(section)) return 'PERZIURETI_PALIKTI_ATVERTA';
  if (headingSuggestsPracticalTask(heading)) return 'PERZIURETI_PALIKTI_ATVERTA';

  if (sectionIndex <= 1) return 'PERZIURETI_PALIKTI_ATVERTA';
  if (blockVariant === 'accent' || blockVariant === 'brand') return 'PERZIURETI_PALIKTI_ATVERTA';
  if (headingSuggestsMainFlow(heading)) return 'PERZIURETI_PALIKTI_ATVERTA';

  if (blockVariant === 'terms') return 'REKOMENDUOJAMA_COLLAPSIBLE';
  if (headingSuggestsOptional(heading)) return 'REKOMENDUOJAMA_COLLAPSIBLE';
  if (sectionIndex >= 3) return 'REKOMENDUOJAMA_COLLAPSIBLE';

  return 'PERZIURETI_PALIKTI_ATVERTA';
}

function run() {
  const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
  const modules = data.modules ?? [];
  const rekomenduojama = [];
  const perziureti = [];

  for (const mod of modules) {
    const slides = mod.slides ?? [];
    for (const slide of slides) {
      const content = slide.content;
      if (!content?.sections) continue;
      const slideId = slide.id ?? slide.title;
      const slideTitle = slide.title ?? '';

      for (let i = 0; i < content.sections.length; i++) {
        const s = content.sections[i];
        if (s.collapsible === true) continue;
        const body = s.body ?? '';
        if (isShortContent(body)) continue;
        if (s.table?.rows?.length) continue;

        const preview = body.trim().slice(0, PREVIEW_LEN).replace(/\n/g, ' ');
        const entry = {
          moduleId: mod.id,
          slideId,
          slideTitle,
          heading: s.heading ?? '(be antraštės)',
          bodyLength: body.trim().length,
          blockVariant: s.blockVariant ?? '(nenurodyta)',
          sectionIndex: i,
          preview: preview + (body.trim().length > PREVIEW_LEN ? '…' : ''),
        };

        const category = classifyCandidate(s, i);
        if (category === 'REKOMENDUOJAMA_COLLAPSIBLE') {
          rekomenduojama.push(entry);
        } else {
          perziureti.push(entry);
        }
      }
    }
  }

  const total = rekomenduojama.length + perziureti.length;
  if (total === 0) {
    console.log('OK: nėra sekcijų su ilgu body be collapsible.');
    return 0;
  }

  console.error(`\n⚠ Rasta ${total} sekcijų su ilgu body be collapsible. Semantinis skirstymas (GOLDEN_STANDARD / CONTENT_AGENT / UI_UX_AGENT / CURRICULUM_AGENT):\n`);

  if (rekomenduojama.length > 0) {
    console.error(`--- REKOMENDUOJAMA_COLLAPSIBLE (${rekomenduojama.length}) – pagal semantiką tinkama collapsible ---\n`);
    for (const u of rekomenduojama) {
      console.error(`  • Modulys ${u.moduleId}, skaidrė ${u.slideId} "${u.slideTitle}"`);
      console.error(`    Sekcija [${u.sectionIndex}]: "${u.heading}" | ${u.blockVariant} | ${u.bodyLength} simb.`);
      console.error(`    Preview: ${u.preview}`);
      console.error('');
    }
  }

  if (perziureti.length > 0) {
    console.error(`--- PERZIURETI_PALIKTI_ATVERTA (${perziureti.length}) – ilgas, bet pagal turinį geriau peržiūrėti; galima palikti atvertą ---\n`);
    for (const u of perziureti) {
      console.error(`  • Modulys ${u.moduleId}, skaidrė ${u.slideId} "${u.slideTitle}"`);
      console.error(`    Sekcija [${u.sectionIndex}]: "${u.heading}" | ${u.blockVariant} | ${u.bodyLength} simb.`);
      console.error(`    Preview: ${u.preview}`);
      console.error('');
    }
  }

  console.error('Sprendimas pagal tikrą skaidrės turinį – CONTENT_AGENT / UI_UX_AGENT / CURRICULUM_AGENT. Collapsible neįvedami automatiškai visur.');
  return 1;
}

process.exit(run());
