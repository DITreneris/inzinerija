import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const ltPatikra =
  'Ar sugeneruotas promptas apima bent 3 elementus (objektas, stilius, proporcijos) ir aiškų A/E/C tikslą? Ar meter rodo „Paruošta“? Jei ne – grįžk ir pakeisk parametrus.';
const enPatikra =
  'Does the generated prompt include at least 3 elements (subject, style, proportions) and a clear A/E/C goal? Does the meter show Ready? If not – go back and change the parameters.';

const ltPath = path.join(root, 'src/data/modules.json');
const lt = JSON.parse(fs.readFileSync(ltPath, 'utf8'));
const m13 = lt.modules.find((m) => m.id === 13);
const s37 = m13.slides.find((s) => s.id === 13.37);
s37.content.patikra = ltPatikra;
fs.writeFileSync(ltPath, JSON.stringify(lt, null, 2) + '\n');

const enPath = path.join(root, 'src/data/modules-en-m13-m15.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const enMod = Array.isArray(en) ? en.find((m) => m.id === 13) : en.modules?.find((m) => m.id === 13) ?? en;
const slides = enMod.slides || en.slides;
const en37 = slides.find((s) => s.id === 13.37);
en37.content.patikra = enPatikra;
fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n');

console.log('Updated 13.37 patikra LT+EN');
