/**
 * PC-3: M15 primary/scenario footers §3.6 (LT). EN via build:modules-en-m13-m15.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fp = path.join(root, 'src/data/modules.json');
const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
const mod = data.modules.find((m) => m.id === 15);
if (!mod) throw new Error('M15 missing');

const FOOTERS = {
  150: 'Toliau – skaidrė 2: Greitas startas: hero vaizdas',
  150.5: 'Toliau – skaidrė 3: Projekto ciklas',
  150.25: 'Toliau – skaidrė 4: Kontrolinis taškas',
  150.26: 'Toliau – skaidrė 5: Scenarijus: Vaizdas (neprivaloma)',
  151: 'Toliau – skaidrė 6: Scenarijus: Trumpas vaizdo įrašas',
  152: 'Toliau – skaidrė 7: Scenarijus: Garsas',
  153: 'Toliau – skaidrė 8: Scenarijus: Montažas',
  154: 'Toliau – skaidrė 9: Projekto santrauka',
};

const SHORT = {
  150.5: 'Greitas startas: hero vaizdas',
  150.25: 'Projekto ciklas',
  150.26: 'Kontrolinis taškas',
  151: 'Scenarijus: Vaizdas',
  152: 'Trumpas vaizdo įrašas',
  153: 'Scenarijus: Garsas',
  154: 'Scenarijus: Montažas',
  158: 'Projekto santrauka',
};

for (const s of mod.slides) {
  if (SHORT[s.id]) s.shortTitle = SHORT[s.id];
  if (FOOTERS[s.id] != null) {
    if (!s.content || typeof s.content !== 'object') s.content = {};
    s.content.footer = FOOTERS[s.id];
  }
}

fs.writeFileSync(fp, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('OK M15 footers');
