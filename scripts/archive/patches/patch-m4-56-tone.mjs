#!/usr/bin/env node
/**
 * Patch M4 slide 56 (RAG: kas tai ir pabandyk) – tonas kaip 4.2a.
 * SOT: docs/turinio_pletra_moduliai_4_5_6.md § Sulieta skaidrė id 56.
 * Run: node scripts/patch-m4-56-tone.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const modulesPath = join(__dirname, '..', 'src', 'data', 'modules.json');

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const mod = data.modules.find((m) => m.id === 4);
const slide = mod?.slides?.find((s) => s.id === 56);
if (!slide?.content?.sections) {
  console.error('M4 or slide 56 not found');
  process.exit(1);
}

slide.content.whyBenefit =
  'Po šios skaidrės žinosi, kaip gauti atsakymus iš savo dokumentų – ir iš karto pabandysi.';

const sections = slide.content.sections;
const updates = [
  {
    heading: 'Trumpai',
    body:
      'RAG – kai DI atsakymą remia **tavo** dokumentai, ne savo žinios. Žemiau – kas tai ir kaip pabandyti per kelias minutes.',
  },
  {
    heading: 'Agentinė vizualizacija',
    body: 'Perejimas tarp režimų: Bazinis (įvestis → DI → išvestis), RAG (su duomenų baze), Įrankiai. Parodo, kaip DI naudoja tavo šaltinius.',
  },
  {
    heading: 'Kas yra RAG (3 žingsniai)',
    body:
      'RAG – kai DI generuoja atsakymą iš **tavo** dokumentų. 3 žingsniai: paieška šaltiniuose → atranka svarbiausių faktų → atsakymas. Prašyk: „Naudok tik pateiktą kontekstą“, „Jei nėra – parašyk Nežinau“, „Cituok šaltinį“ – mažiau klaidų.',
  },
  {
    heading: 'Daryk dabar',
    body:
      'Paimk bet kokį trumpą tekstą (ataskaitos fragmentas, sąrašas). Žemiau – mini-šablonas: įklijuok tekstą ir klausimą, paleisk DI.\n\n🔘 Kopijuoti promptą (žemiau)\n\nNedaryk idealaus – bet koks trumpas tekstas ir vienas klausimas.',
  },
  {
    heading: 'Kopijuojamas promptas',
    body: 'Atsakymas tik iš tavo konteksto. Jei atsakymo nėra – DI parašys Nežinau.',
  },
  {
    heading: 'Patikra',
    body:
      'Ar atsakymas remiasi tavo kontekstu? Ar DI parašė „Nežinau“, jei informacijos nebuvo? Ar nurodė nuorodą? Jei bent vienas „ne“ – papildyk kontekstą arba paleisk dar kartą.',
  },
  {
    heading: '🔽 Pasirinktinai: daugiau apie RAG ir multimodalinę įvestis',
    body:
      '**Multimodalinė įvestis ir išvestis:** Kai kurie DI priima ne tik tekstą, bet ir vaizdą, garsą – naudinga analizei ir santraukoms.\n\n**RAG detaliau:** Kiek konteksto telpa į užklausą – skaidrėse Tokenų ekonomika. Pagalvok: kokie dokumentai darbe kartojasi? Užsirašyk vieną – naudosi Modulio 6 projekte.',
  },
];

for (const u of updates) {
  const sec = sections.find((s) => s.heading === u.heading);
  if (sec) sec.body = u.body;
}

writeFileSync(modulesPath, JSON.stringify(data, null, 2), 'utf8');
console.log('OK: M4 slide 56 – tonas atnaujintas.');
