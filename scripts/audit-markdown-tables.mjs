#!/usr/bin/env node
/**
 * Audituoja JSON duomenis: randa content-block sekcijas, kuriose lentelė
 * užrašyta kaip Markdown pipes `body` lauke (vietoj section.table).
 *
 * Naudojimas: node scripts/audit-markdown-tables.mjs
 * Exit 0 = nėra pseudo-lentelių, 1 = rasta (rekomenduojama migruoti į section.table).
 */
import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');

const MARKDOWN_TABLE_RE = /\| --- \|/;

const SCAN_FILES = [
  'modules.json',
  'modules-m1-m6.json',
  'modules-m1-m9.json',
  ...readdirSync(dataDir).filter(
    (f) => f.startsWith('modules-en-') && f.endsWith('.json')
  ),
];

function scanFile(filePath) {
  const data = JSON.parse(readFileSync(filePath, 'utf8'));
  const modules = data.modules ?? [];
  const issues = [];
  const relPath = filePath.replace(root + '\\', '').replace(root + '/', '');

  for (const mod of modules) {
    const slides = mod.slides ?? [];
    for (const slide of slides) {
      const content = slide.content;
      if (!content?.sections) continue;
      const slideId = slide.id ?? slide.title;
      const slideTitle = slide.title ?? '';

      for (const s of content.sections) {
        const body = s.body ?? '';
        if (!MARKDOWN_TABLE_RE.test(body)) continue;
        const preview = body.trim().slice(0, 80).replace(/\n/g, ' ');
        issues.push({
          file: relPath,
          moduleId: mod.id,
          slideId,
          slideTitle,
          heading: s.heading ?? '(be antraštės)',
          preview: preview + (body.length > 80 ? '…' : ''),
        });
      }
    }
  }

  return issues;
}

function run() {
  const allIssues = [];

  for (const file of SCAN_FILES) {
    const filePath = join(dataDir, file);
    try {
      allIssues.push(...scanFile(filePath));
    } catch (err) {
      if (err.code === 'ENOENT') continue;
      throw err;
    }
  }

  if (allIssues.length === 0) {
    console.log('OK: nėra Markdown pseudo-lentelių body lauke.');
    return 0;
  }

  console.error(
    `\n⚠ Rasta ${allIssues.length} sekcijų su Markdown lentele body lauke (naudok section.table):\n`
  );
  for (const u of allIssues) {
    console.error(`  • ${u.file} – Modulys ${u.moduleId}, skaidrė ${u.slideId} "${u.slideTitle}"`);
    console.error(`    Sekcija: "${u.heading}"`);
    console.error(`    Pavyzdys: ${u.preview}`);
    console.error('');
  }
  console.error(
    'Rekomendacija: migruoti į section.table pagal docs/development/LENTELIU_STANDARTAS.md.'
  );
  return 1;
}

process.exit(run());
