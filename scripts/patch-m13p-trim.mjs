#!/usr/bin/env node
/**
 * M13P-TRIM – fit-for-purpose copyable lengths (LT modules.json).
 * EN via copyableBySlide + m13-en-plain-overrides + build:modules-en-m13-m15.
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(root, 'src', 'data', 'modules.json');
const data = JSON.parse(readFileSync(path, 'utf8'));
const mod = data.modules.find((m) => m.id === 13);
if (!mod) throw new Error('Module 13 not found');

function slide(id) {
  const s = mod.slides.find((x) => x.id === id);
  if (!s) throw new Error(`Slide ${id} not found`);
  return s;
}

function setCopyable(slideId, heading, copyable) {
  const s = slide(slideId);
  const sec = s.content.sections.find((x) => x.heading === heading);
  if (!sec) throw new Error(`Slide ${slideId}: section "${heading}" not found`);
  sec.copyable = copyable;
}

// ——— 13.1 Micro ≤4 teaching lines ———
setCopyable(
  13.1,
  'Kopijuojamas šablonas',
  `Tikslas (A/E/C): [atpažįstamumas / įsitraukimas / konversija].
Kontekstas: [produktas], platforma [kur], auditorija [kam].
Atsakyk: 1) vienas tikslas, 2) ką pabrėžti vizuale (emocija / kontekstas / CTA), 3) 1 formatas.`,
);

// ——— 13.4: keep clip; trim chain ———
setCopyable(
  13.4,
  'Kopijuojama grandinė – vaizdas → video',
  `1) Hero kadaras: [OBJEKTAS], [KONTEKSTAS], stilius [STILIUS], 16:9 arba 9:16.
2) I2V 3–5 s iš šio kadro: kamera […], same product / same style.
(Jei reikia ilgesnio – antras keyframe, tada montažas.)`,
);

// ——— 13.35: kiss MASTER (merge light+color) ———
setCopyable(
  13.35,
  'MASTER prompt šablonas',
  `Subjektas: [ką rodoma].
Tikslas: [Awareness / Engagement / Conversion].
Auditorija: [kam].
Stilius: [fotorealistiškas / minimalistinis / …].
Kompozicija + kamera: [kadras, kampas].
Šviesa ir spalvos: [apšvietimas + paletė / nuotaika].
Tekstas vizuale (jei reikia): [tekstas + vieta].
Formatas: [1:1 / 16:9 / 9:16]. Vengti: [ko vengti].`,
);

// ——— 13.6: trim EN MASTER; keep bed/VO ———
const s6 = slide(13.6);
const enMaster = s6.content.sections.find((x) => x.heading === 'Angliškas MASTER šablonas (universalus)');
if (!enMaster) throw new Error('13.6 EN MASTER section missing');
enMaster.copyable = `Create a [genre] track.
Mood: [emotion]. Tempo: [bpm or speed]. Instruments: [list].
Vocal: none. Use: background / ads. License intent: commercial.`;
enMaster.collapsible = true;
enMaster.collapsedByDefault = true;

writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);

function stats(id, heading) {
  const c = slide(id).content.sections.find((x) => x.heading === heading).copyable;
  const lines = c.split('\n').filter((l) => l.trim()).length;
  return `${id} ${heading}: ${c.length}c / ${lines}L`;
}

console.log('M13P-TRIM patched:');
console.log(stats(13.1, 'Kopijuojamas šablonas'));
console.log(stats(13.4, 'Kopijuojama grandinė – vaizdas → video'));
console.log(stats(13.35, 'MASTER prompt šablonas'));
console.log(stats(13.6, 'Angliškas MASTER šablonas (universalus)'));
