#!/usr/bin/env node
/**
 * Audituoja modules.json: randa sekcijas, kur collapsible: true, bet turinys per trumpas
 * (viena eilutė ar < ~200 simbolių). Tokios sekcijos apsunkina UX – collapsible turi taupyti vietą.
 *
 * Naudojimas: node scripts/audit-collapsible-sections.mjs
 * Exit 0 = nėra plonų collapsible, 1 = rasta (rekomenduojama pašalinti collapsible arba pridėti turinio).
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const modulesPath = join(root, 'src', 'data', 'modules.json');

const MIN_LENGTH = 180;
const MIN_LENGTH_ONE_LINE = 280;

function isShortContent(body) {
  const b = (body ?? '').trim();
  if (b.length < MIN_LENGTH) return true;
  const lines = b.split(/\n/).filter((l) => l.trim().length > 0);
  if (lines.length <= 1 && b.length < MIN_LENGTH_ONE_LINE) return true;
  return false;
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

      for (let i = 0; i < content.sections.length; i++) {
        const s = content.sections[i];
        if (!s.collapsible) continue;
        const body = s.body ?? '';
        if (!isShortContent(body)) continue;

        const len = body.trim().length;
        const preview = body.trim().slice(0, 80).replace(/\n/g, ' ');
        issues.push({
          moduleId: mod.id,
          slideId,
          slideTitle,
          heading: s.heading ?? '(be antraštės)',
          bodyLength: len,
          preview: preview + (body.length > 80 ? '…' : ''),
        });
      }
    }
  }

  if (issues.length === 0) {
    console.log('OK: nėra collapsible sekcijų su per trumpu turiniu.');
    return 0;
  }

  console.error(`\n⚠ Rasta ${issues.length} collapsible sekcijų su per trumpu turiniu (UX: rodyti kaip paprastą bloką):\n`);
  for (const u of issues) {
    console.error(`  • Modulys ${u.moduleId}, skaidrė ${u.slideId} "${u.slideTitle}"`);
    console.error(`    Sekcija: "${u.heading}" (${u.bodyLength} simb.)`);
    console.error(`    Pavyzdys: ${u.preview}`);
    console.error('');
  }
  console.error('Rekomendacija: pašalinti collapsible: true iš šių sekcijų modules.json arba pridėti daugiau turinio. UI jau trumpas turinys rodo kaip paprastą bloką (ContentSlides isShortContent).');
  return 1;
}

process.exit(run());
