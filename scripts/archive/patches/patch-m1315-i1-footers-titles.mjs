#!/usr/bin/env node
/**
 * M1315-F / M1315-T: recalculate M13–15 LT numbered footers; scrub pipeline titles.
 * EN: sync Next – slide N footers from LT numbers + EN next shortTitle/title.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const ltPath = join(root, 'src', 'data', 'modules.json');
const enPath = join(root, 'src', 'data', 'modules-en-m13-m15.json');

const lt = JSON.parse(readFileSync(ltPath, 'utf8'));
const en = JSON.parse(readFileSync(enPath, 'utf8'));

const MAX_FOOTER = 55;

function truncateLabel(prefix, label) {
  const maxLabel = MAX_FOOTER - prefix.length;
  let L = String(label || '').trim();
  if (L.length > maxLabel) L = `${L.slice(0, Math.max(1, maxLabel - 1)).trimEnd()}…`;
  return L;
}

function footerLabel(slide) {
  return (slide.shortTitle || slide.title || '').trim();
}

/** Title / shortTitle renames (M1315-T). */
const TITLE_PATCHES = {
  '13.12': {
    title: 'Generatyvinės medijos grandinė',
    shortTitle: 'Medijos grandinė',
  },
  143: {
    title: 'Papildomai: medijos grandinės checklist per 5 min',
    shortTitle: 'Grandinės checklist',
  },
};

const EN_TITLE_PATCHES = {
  '13.12': {
    title: 'Generative media chain',
    shortTitle: 'Media chain',
  },
  143: {
    title: 'Bonus: media-chain checklist in 5 min',
    shortTitle: 'Chain checklist',
  },
};

let ltFooterFixes = 0;
let titleFixes = 0;

for (const modId of [13, 14, 15]) {
  const mod = lt.modules.find((m) => m.id === modId);
  if (!mod) continue;
  const slides = mod.slides;
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    const idKey = String(s.id);
    if (TITLE_PATCHES[idKey]) {
      Object.assign(s, TITLE_PATCHES[idKey]);
      titleFixes++;
    }
    const footer = s.content?.footer;
    if (typeof footer !== 'string') continue;
    // Keep non-numbered module jumpers (e.g. Toliau – Modulis 15)
    if (!footer.includes('Toliau – skaidrė')) continue;
    const next = slides[i + 1];
    if (!next) {
      // last slide should not have numbered next
      continue;
    }
    const nextPos = i + 2;
    const prefix = `Toliau – skaidrė ${nextPos}: `;
    const label = truncateLabel(prefix, footerLabel(next));
    const nextFooter = prefix + label;
    if (footer !== nextFooter) {
      if (!s.content) s.content = {};
      s.content.footer = nextFooter;
      ltFooterFixes++;
    }
  }
}

let enFooterFixes = 0;
let enTitleFixes = 0;

for (const modId of [13, 14, 15]) {
  const ltMod = lt.modules.find((m) => m.id === modId);
  const enMod = en.modules.find((m) => m.id === modId);
  if (!ltMod || !enMod) continue;
  for (let i = 0; i < ltMod.slides.length; i++) {
    const ltSlide = ltMod.slides[i];
    const enSlide = enMod.slides.find((x) => String(x.id) === String(ltSlide.id));
    if (!enSlide) continue;
    const idKey = String(ltSlide.id);
    if (EN_TITLE_PATCHES[idKey]) {
      Object.assign(enSlide, EN_TITLE_PATCHES[idKey]);
      enTitleFixes++;
    }
    const ltFooter = ltSlide.content?.footer;
    if (typeof ltFooter !== 'string') continue;
    const m = ltFooter.match(/^Toliau – skaidrė (\d+):\s*(.+)$/);
    if (!m) continue;
    const n = Number(m[1]);
    const nextEn = enMod.slides.find(
      (x) => String(x.id) === String(ltMod.slides[i + 1]?.id)
    );
    if (!nextEn) continue;
    const prefix = `Next – slide ${n}: `;
    const label = truncateLabel(prefix, footerLabel(nextEn));
    if (!enSlide.content || typeof enSlide.content !== 'object') {
      enSlide.content = {};
    }
    const nextFooter = prefix + label;
    if (enSlide.content.footer !== nextFooter) {
      enSlide.content.footer = nextFooter;
      enFooterFixes++;
    }
  }
}

writeFileSync(ltPath, JSON.stringify(lt, null, 2) + '\n', 'utf8');
writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n', 'utf8');
console.log(
  `LT footers fixed: ${ltFooterFixes}; LT title patches: ${titleFixes}; EN footers: ${enFooterFixes}; EN titles: ${enTitleFixes}`
);
