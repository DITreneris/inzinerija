#!/usr/bin/env node
/**
 * Footer numbers audit: "Toliau – skaidrė N" / "Next – slide N" must match next slide's 1-based position.
 * SOT: .cursor/rules/footer-slide-numbers.mdc, GOLDEN_STANDARD §3.6.
 * Usage: node scripts/audit-footer-numbers.mjs [--modules=10,11,12]
 *        Or: AUDIT_MODULES=10 node scripts/audit-footer-numbers.mjs
 *        --locale=en merges modules-en-m10-m12.json for M10–12 EN footers
 * Exit 0 = all OK, 1 = at least one mismatch.
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');
const dataPath = join(dataDir, 'modules.json');

const argModules = process.argv.find((a) => a.startsWith('--modules='));
const envModules = process.env.AUDIT_MODULES;
const filterList = (argModules?.split('=')[1] || envModules || '')
  .split(',')
  .map((s) => parseInt(s.trim(), 10))
  .filter((n) => !Number.isNaN(n));

const useEn = process.argv.includes('--locale=en');

function deepMerge(base, overlay) {
  if (overlay == null) return base;
  if (Array.isArray(overlay)) {
    if (!Array.isArray(base)) return overlay;
    return base.map((item, i) => {
      const o = overlay.find?.((x) => x?.id != null && item?.id != null && x.id === item.id);
      if (o) return deepMerge(item, o);
      return overlay[i] != null ? deepMerge(item, overlay[i]) : item;
    });
  }
  if (typeof overlay !== 'object' || typeof base !== 'object') return overlay ?? base;
  const out = { ...base };
  for (const k of Object.keys(overlay)) {
    out[k] = deepMerge(base[k], overlay[k]);
  }
  return out;
}

let data = JSON.parse(readFileSync(dataPath, 'utf8'));

if (useEn) {
  try {
    const enM1012 = JSON.parse(readFileSync(join(dataDir, 'modules-en-m10-m12.json'), 'utf8'));
    data = {
      modules: data.modules.map((m) => {
        const enMod = enM1012.modules?.find((x) => x.id === m.id);
        return enMod ? deepMerge(m, enMod) : m;
      }),
    };
  } catch (e) {
    console.error('Failed to load EN M10–12 for merge:', e.message);
    process.exit(1);
  }
}

let hasError = false;

for (const mod of data.modules) {
  if (filterList.length > 0 && !filterList.includes(mod.id)) continue;
  const slides = mod.slides;
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    const footer = s.content?.footer;
    const isLt = footer && footer.includes('Toliau – skaidrė');
    const isEn = footer && footer.includes('Next – slide');
    if (!isLt && !isEn) continue;
    const nextPos = i + 2;
    const nextSlide = slides[i + 1];
    const nextTitle = nextSlide ? nextSlide.title : '(last)';
    const match = isLt
      ? footer.match(/skaidrė (\d+):\s*(.+)/)
      : footer.match(/slide (\d+):\s*(.+)/);
    if (!match) continue;
    const num = parseInt(match[1], 10);
    if (num !== nextPos) {
      console.error(
        `[${useEn ? 'EN' : 'LT'}] M${mod.id} pos ${i + 1} id ${s.id} | expected "${nextPos}: ${nextTitle.slice(0, 45)}..." got "${num}: ${match[2].slice(0, 45)}..."`
      );
      hasError = true;
    }
  }
}

if (hasError) {
  console.error('\nAudit FAIL: footer N must equal next slide 1-based position.');
  process.exit(1);
}
console.log(`Footer numbers audit${useEn ? ' (EN merge)' : ''}: OK`);
process.exit(0);
