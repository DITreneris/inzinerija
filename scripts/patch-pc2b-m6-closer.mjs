/**
 * PC-2b: M6 summary slide 69 + soft 1-of-2 intro + Patikra/footers.
 * Run: node scripts/patch-pc2b-m6-closer.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SUMMARY_LT = {
  id: 69,
  title: 'Projekto santrauka',
  subtitle: 'Ką išsineši ir ką daryti toliau',
  type: 'summary',
  shortTitle: 'Projekto santrauka',
  content: {
    introHeading: 'Ką išmokai',
    introBody:
      'Sveikiname! Užbaigei Modulio 6 projektą: tyrimo ataskaitą su DI arba Custom GPT. Turi artefaktą, 6 blokų šablonus, COMBO/HTML technikų užuominas ir duomenų tvarkymo atmintinę.',
    stats: [
      { label: 'Projektas', value: '1 iš 2' },
      { label: 'Technikos', value: 'COMBO + HTML' },
      { label: 'Atmintinė', value: 'PDF' },
    ],
    sections: [
      {
        heading: 'Vienas artefaktas',
        icon: 'Target',
        color: 'brand',
        items: [
          'Tyrimo ataskaita su šaltiniais – arba Custom GPT instrukcijos',
          '6 blokų struktūra pritaikyta realiame projekte',
          'RAG / žinių patikra – mažiau haliucinacijų',
        ],
      },
      {
        heading: 'Technikos ir higiena',
        icon: 'Layers',
        color: 'violet',
        items: [
          'COMBO – keli metodai viename prompte',
          'HTML grandinė – nuo juodraščio iki puslapio',
          'Duomenų tvarkymas – biblioteka, versijos, dokumentacija',
        ],
      },
      {
        heading: 'Kitas žingsnis',
        icon: 'ArrowRight',
        color: 'accent',
        items: [
          'Parsisiųsk Modulio 6 PDF atmintinę (po modulio užbaigimo)',
          'Per 24–48 val. įrašyk vieną promptą į savo biblioteką',
          'Jei nori DA kelio – Modulis 7 (po prieigos)',
        ],
      },
    ],
    reflectionTitle: 'Refleksijos promptas',
    reflectionPrompt:
      'META: Tu esi mokymų refleksijos asistentas. Tikslas – įtvirtinti Modulio 6 projekto rezultatus.\nINPUT: Ką tik baigiau vieną projektą – tyrimo ataskaitą su DI arba Custom GPT (6 blokai, RAG, technikų buffet).\nOUTPUT: Užduok 3 klausimus: (1) Kurį artefaktą naudosiu darbe pirmiausia? (2) Kurioje vietoje projekte buvo sunkiausia? (3) Ką įtrauksiu į savo promptų biblioteką per 24 val.? Po atsakymų – 1 konkretus patarimas.',
    tagline: 'Vienas projektas + atmintinė = kartojamas DI darbo ritmas',
  },
};

const SUMMARY_EN = {
  id: 69,
  title: 'Project summary',
  subtitle: 'What you take away and what to do next',
  type: 'summary',
  shortTitle: 'Project summary',
  content: {
    introHeading: 'What you learned',
    introBody:
      'Well done! You finished the Module 6 project: a research report with AI or a Custom GPT. You have an artifact, 6-block templates, COMBO/HTML technique cues, and a data-hygiene handout.',
    stats: [
      { label: 'Project', value: '1 of 2' },
      { label: 'Techniques', value: 'COMBO + HTML' },
      { label: 'Handout', value: 'PDF' },
    ],
    sections: [
      {
        heading: 'One artifact',
        icon: 'Target',
        color: 'brand',
        items: [
          'Research report with sources – or Custom GPT instructions',
          '6-block structure applied in a real project',
          'RAG / knowledge checks – fewer hallucinations',
        ],
      },
      {
        heading: 'Techniques and hygiene',
        icon: 'Layers',
        color: 'violet',
        items: [
          'COMBO – several methods in one prompt',
          'HTML chain – from draft to a one-page site',
          'Data hygiene – library, versions, documentation',
        ],
      },
      {
        heading: 'Next step',
        icon: 'ArrowRight',
        color: 'accent',
        items: [
          'Download the Module 6 PDF handout (after completion)',
          'Within 24–48h save one prompt to your library',
          'For the Data Analysis path – Module 7 (when you have access)',
        ],
      },
    ],
    reflectionTitle: 'Reflection prompt',
    reflectionPrompt:
      'META: You are a learning reflection assistant. Goal – lock in Module 6 project results.\nINPUT: I just finished one project – a research report with AI or a Custom GPT (6 blocks, RAG, technique buffet).\nOUTPUT: Ask 3 questions: (1) Which artifact will I use at work first? (2) Where in the project was it hardest? (3) What will I add to my prompt library within 24h? After answers – 1 concrete tip.',
    tagline: 'One project + handout = a repeatable AI work rhythm',
  },
};

/** 1-based next footers after inserting slide 69 at end */
const FOOTERS_LT = {
  60: 'Toliau – skaidrė 2: Tyrimo ataskaita su DI',
  61: 'Toliau – skaidrė 3: Praktika: COMBO',
  62: 'Toliau – skaidrė 4: HTML tinklalapio grandinė',
  67.8: 'Toliau – skaidrė 5: Vieno puslapio HTML',
  68: 'Toliau – skaidrė 6: SUPER PROMPTAI',
  63: 'Toliau – skaidrė 7: Modulio 6 refleksija',
  65: 'Toliau – skaidrė 8: Duomenų tvarkymo checklist',
  65.5: 'Toliau – skaidrė 9: Duomenų tvarkymas',
  64: 'Toliau – skaidrė 10: Custom GPT schema (neprivaloma)',
  66: 'Toliau – skaidrė 11: Custom GPT asistentas',
  67: 'Toliau – skaidrė 12: Projekto santrauka',
};

const FOOTERS_EN = {
  60: 'Next – slide 2: Research report with AI',
  61: 'Next – slide 3: Practice: COMBO',
  62: 'Next – slide 4: HTML page chain',
  67.8: 'Next – slide 5: One-page HTML',
  68: 'Next – slide 6: SUPER PROMPTS',
  63: 'Next – slide 7: Module 6 reflection',
  65: 'Next – slide 8: Data hygiene checklist',
  65.5: 'Next – slide 9: Data hygiene',
  64: 'Next – slide 10: Custom GPT schema (optional)',
  66: 'Next – slide 11: Custom GPT assistant',
  67: 'Next – slide 12: Project summary',
};

function ensurePatikra(sections, locale) {
  if (!Array.isArray(sections)) return sections;
  const hasPatikra = sections.some((s) =>
    /patikra|check|quality/i.test(s.heading || '')
  );
  if (hasPatikra) return sections;
  const hasDaryk = sections.some((s) => /daryk|do now/i.test(s.heading || ''));
  if (!hasDaryk) return sections;
  return [
    ...sections,
    {
      heading: locale === 'en' ? 'Check' : 'Patikra',
      body:
        locale === 'en'
          ? 'Can you name one concrete next step for your project in one sentence?'
          : 'Ar gali vienu sakiniu pasakyti vieną konkretų kitą žingsnį savo projekte?',
      blockVariant: 'accent',
    },
  ];
}

function patchM6(mod, locale) {
  const footers = locale === 'en' ? FOOTERS_EN : FOOTERS_LT;
  const summary = locale === 'en' ? SUMMARY_EN : SUMMARY_LT;
  const intro = mod.slides.find((s) => s.id === 60);
  if (!intro?.content) throw new Error('M6 intro missing');

  if (locale === 'lt') {
    intro.content.recommendedStart =
      'Baigimui užtenka **vieno** projekto: Tyrimo ataskaita **arba** Custom GPT. Patarimas: pradėk nuo tyrimo ataskaitos, nebent tau konkrečiai reikia Custom GPT.';
    intro.content.firstActionCTA =
      'Pasirink vieną projektą (Tyrimo ataskaita arba Custom GPT), užpildyk META bloką ir paleisk DI. Scaffolding technikos – pagal poreikį.';
  } else {
    intro.content.recommendedStart =
      'Finishing needs **one** project: Research report **or** Custom GPT. Tip: start with the research report unless you specifically need a Custom GPT.';
    intro.content.firstActionCTA =
      'Pick one project (Research report or Custom GPT), fill the META block, and run AI. Scaffolding techniques – as needed.';
  }

  for (const s of mod.slides) {
    if (footers[s.id] != null) {
      if (!s.content || typeof s.content !== 'object') s.content = {};
      s.content.footer = footers[s.id];
    }
    if (
      s.type === 'content-block' &&
      s.content?.sections &&
      [62, 63, 64, 68].includes(s.id)
    ) {
      s.content.sections = ensurePatikra(s.content.sections, locale);
    }
  }

  if (!mod.slides.some((s) => s.id === 69)) {
    mod.slides.push(structuredClone(summary));
  } else {
    const idx = mod.slides.findIndex((s) => s.id === 69);
    mod.slides[idx] = structuredClone(summary);
  }
}

function patchFile(rel, locale) {
  const fp = path.join(root, rel);
  const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const mod = data.modules.find((m) => m.id === 6);
  if (!mod) throw new Error(`no M6 in ${rel}`);
  patchM6(mod, locale);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('patched', rel, 'slides', mod.slides.length);
}

patchFile('src/data/modules.json', 'lt');
patchFile('src/data/modules-en-m4-m6.json', 'en');
console.log('OK PC-2b M6');
