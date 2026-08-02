/**
 * Soft audit: every module 1–18 has resolveable transfer (summary or module.transfer).
 * Exit 1 on missing.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(
  fs.readFileSync(path.join(root, 'src/data/modules.json'), 'utf8')
);

function fromSummary(slides) {
  for (let i = slides.length - 1; i >= 0; i -= 1) {
    const s = slides[i];
    if (s.type !== 'summary' && s.type !== 'practice-summary') continue;
    const c = s.content || {};
    if (c.abilityBefore && c.abilityAfter && c.firstAction24h) {
      return { source: 'summary', slideId: s.id };
    }
  }
  return null;
}

const missing = [];
for (const mod of data.modules) {
  if (mod.id < 1 || mod.id > 18) continue;
  const sum = fromSummary(mod.slides || []);
  const fb = mod.transfer;
  const ok =
    sum ||
    (fb?.abilityBefore && fb?.abilityAfter && fb?.firstAction24h);
  if (!ok) missing.push(mod.id);
  else console.log(`M${mod.id} OK (${sum ? `summary ${sum.slideId}` : 'module.transfer'})`);
}

if (missing.length) {
  console.error('Missing transfer:', missing.join(', '));
  process.exit(1);
}
console.log('audit-module-transfer: all M1–18 OK');
