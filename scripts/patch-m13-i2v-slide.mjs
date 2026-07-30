/**
 * Insert M13 slide 13.47 (i2v-generatorius) after 13.4; refresh nearby footers.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const ltSlide = {
  id: 13.47,
  title: 'I2V klipo generatorius',
  subtitle: 'Keyframe → 3–5 s → kamera → same style',
  type: 'i2v-generatorius',
  shortTitle: 'I2V generatorius',
  content: {
    tldr: 'Trumpai: Aprašyk keyframe / sceną, pasirink trukmę (3–5 s) ir kameros judesį. Sistema sudės image-to-video promptą – nukopijuok į Kling, Runway, Veo ar Sora.',
    patikra:
      'Ar prompte yra keyframe, trukmė ≤5 s ir same style/product? Ar pradžia gali atitikti hero still (13.37 / 13.4)?',
    footer: 'Toliau – skaidrė 16: Video įrankiai, formatas ir CPI',
  },
};

const enSlide = {
  id: 13.47,
  title: 'I2V clip builder',
  subtitle: 'Keyframe → 3–5 s → camera → same style',
  type: 'i2v-generatorius',
  shortTitle: 'I2V builder',
  content: {
    tldr: 'In short: Describe the keyframe / scene, pick duration (3–5 s) and camera motion. The system builds an image-to-video prompt – copy into Kling, Runway, Veo or Sora.',
    patikra:
      'Does the prompt include a keyframe, duration ≤5 s and same style/product? Can the start match your hero still (13.37 / 13.4)?',
    footer: 'Next – slide 16: Video tools, format and CPI',
  },
};

function insertAfter(slides, afterId, slide) {
  if (slides.some((s) => s.id === slide.id)) {
    const i = slides.findIndex((s) => s.id === slide.id);
    slides[i] = slide;
    return 'updated';
  }
  const idx = slides.findIndex((s) => s.id === afterId);
  if (idx < 0) throw new Error(`Slide ${afterId} not found`);
  slides.splice(idx + 1, 0, slide);
  return 'inserted';
}

function renumberFootersLt(slides) {
  // Learner-facing "Toliau – skaidrė N" uses UI order (1-based index of next).
  for (let i = 0; i < slides.length - 1; i++) {
    const cur = slides[i];
    const next = slides[i + 1];
    const nextNum = i + 2;
    const title = next.shortTitle || next.title;
    const footer = cur.content?.footer;
    if (typeof footer === 'string' && /^Toliau – skaidrė \d+/.test(footer)) {
      cur.content.footer = `Toliau – skaidrė ${nextNum}: ${title}`;
    }
  }
}

function renumberFootersEn(slides) {
  for (let i = 0; i < slides.length - 1; i++) {
    const cur = slides[i];
    const next = slides[i + 1];
    const nextNum = i + 2;
    const title = next.shortTitle || next.title;
    const footer = cur.content?.footer;
    if (typeof footer === 'string' && /^Next – slide \d+/.test(footer)) {
      cur.content.footer = `Next – slide ${nextNum}: ${title}`;
    }
  }
}

const ltPath = path.join(root, 'src/data/modules.json');
const lt = JSON.parse(fs.readFileSync(ltPath, 'utf8'));
const m13 = lt.modules.find((m) => m.id === 13);
const ltStatus = insertAfter(m13.slides, 13.4, ltSlide);
renumberFootersLt(m13.slides);
fs.writeFileSync(ltPath, JSON.stringify(lt, null, 2) + '\n');

const enPath = path.join(root, 'src/data/modules-en-m13-m15.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const en13 = en.modules.find((m) => m.id === 13);
const enStatus = insertAfter(en13.slides, 13.4, enSlide);
renumberFootersEn(en13.slides);
fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n');

console.log(`LT ${ltStatus}; EN ${enStatus}; slides=${m13.slides.length}`);
