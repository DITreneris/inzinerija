#!/usr/bin/env node
/**
 * E6.2 helper: list content-block sections with body > ~20 words (GOLDEN_STANDARD §4.4 hint).
 * Read-only audit — does not modify JSON.
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '..', 'src', 'data', 'modules.json');
const MODULE_IDS = new Set(
  (process.argv[2] || '1,4,6').split(',').map((n) => Number(n.trim()))
);
const WORD_THRESHOLD = 20;

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const data = JSON.parse(readFileSync(dataPath, 'utf8'));
const findings = [];

for (const mod of data.modules) {
  if (!MODULE_IDS.has(mod.id)) continue;
  for (const slide of mod.slides || []) {
    const sections = slide.content?.sections;
    if (!Array.isArray(sections)) continue;
    for (const sec of sections) {
      const body = sec.body ?? sec.content ?? sec.text ?? '';
      if (typeof body !== 'string' || !body.trim()) continue;
      const plain = stripHtml(body);
      const wc = wordCount(plain);
      if (wc > WORD_THRESHOLD) {
        findings.push({
          moduleId: mod.id,
          slideId: slide.id,
          slideTitle: slide.title,
          slideType: slide.type,
          heading: sec.heading ?? sec.title ?? '(be antraštės)',
          wordCount: wc,
          preview: plain.slice(0, 120) + (plain.length > 120 ? '…' : ''),
        });
      }
    }
  }
}

console.log(JSON.stringify(findings, null, 2));
