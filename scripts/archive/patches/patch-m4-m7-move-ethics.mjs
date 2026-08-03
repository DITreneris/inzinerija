#!/usr/bin/env node
/**
 * Plan: M4 skaidrių perkėlimas į M6 ir M7
 * - M4: pašalinti "Patikrumas ir etika" bloką (66.9–68.5) ir santrauką (70); įterpti 3 naujas skaidres po 69 (Žodynėlis).
 * - M7: įterpti perkeltas 9 skaidres po 891 (Duomenų paruošimas).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modulesPath = path.join(__dirname, '../src/data/modules.json');

const IDs_TO_MOVE = [66.9, 67, 67.3, 67.5, 67.8, 68, 200, 201, 68.5];

const M4_NEW_SLIDES = [
  {
    id: 66.95,
    title: "Konteksto inžinerijos atspaudas",
    subtitle: "7 promptų technikos – recap. Toliau: Modulio 5 testas ir Modulio 6 projektas.",
    type: "section-break",
    content: {
      title: "Konteksto inžinerijos atspaudas",
      subtitle: "Ką išmokote Modulyje 4: sisteminis ir master promptas, proceso promptas, RAG, Deep research, tokenai, kokybė. Toliau – Testas (M5) ir Projektas (M6).",
      sectionNumber: "4.4",
      footer: "Toliau – 3 klausimai sau",
      celebrationText: "Modulio 4 teorija – įveikta. Prieš testą – trumpas atspaudas.",
      nextSteps: [
        "Modulio 5 – 15 min sprintas ir mini testas; rekomenduojama ≥70% prieš Modulio 6 projektą.",
        "Modulis 6 – praktika: SUPER PROMPTAI, COMBO, HTML ir projektas.",
        "Norint pakartoti – RAG ir Deep research skaidrės (4.2, 4.3)."
      ],
      recap: {
        heading: "Ką jau žinai?",
        lead: "7 promptų technikų atspaudas – Modulio 4 esmė.",
        items: [
          "Sisteminis promptas – rolė, tonas, ribos.",
          "Master promptas – kontekstas apie save / organizaciją.",
          "Proceso promptas – žingsniai ir workflow.",
          "Metodinis ir agentinis – kada „padaryk pats“, kada „ieškok ir atsakyk“.",
          "RAG – atsakymai iš nurodytų šaltinių.",
          "Deep research – multi-step tyrimas su DI.",
          "Tokenai – konteksto langas, max_tokens, degradacija."
        ],
        itemGlossaryTerms: ["Sisteminis promptas", "Master promptas", "RAG", "Tokenas"],
        progressTotal: 7
      }
    }
  },
  {
    id: 66.97,
    title: "3 klausimai sau",
    subtitle: "Refleksija prieš testą ir projektą – nukopijuok promptą",
    type: "content-block",
    content: {
      sections: [
        {
          heading: "Refleksijos promptas",
          body: "Prieš eidamas į Modulio 5 testą arba Modulio 6 projektą – užduok sau 3 klausimus. Nukopijuok žemiau esantį promptą į DI ir gauk asmeninę grįžtamąjį ryšį.",
          blockVariant: "accent"
        },
        {
          heading: "Kopijuojamas promptas",
          body: "Esi mokymų refleksijos asistentas.\n\nKą tik baigiau Modulio 4 (konteksto inžinerija) – RAG, Deep research, tokenai, žinių patikrinimas.\n\nUžduok man 3 klausimus:\n1. Ką iš to galiu pritaikyti savo darbe jau šiandien?\n2. Kas buvo naujausia ar netikėčiausia?\n3. Ką noriu išbandyti pirmiausia – testą (M5) ar projektą (M6)?\n\nPo mano atsakymų duok vieną konkretų patarimą, kaip pradėti.",
          blockVariant: "terms",
          copyable: "Esi mokymų refleksijos asistentas.\n\nKą tik baigiau Modulio 4 (konteksto inžinerija) – RAG, Deep research, tokenai, žinių patikrinimas.\n\nUžduok man 3 klausimus:\n1. Ką iš to galiu pritaikyti savo darbe jau šiandien?\n2. Kas buvo naujausia ar netikėčiausia?\n3. Ką noriu išbandyti pirmiausia – testą (M5) ar projektą (M6)?\n\nPo mano atsakymų duok vieną konkretų patarimą, kaip pradėti."
        },
        {
          heading: "Kitas žingsnis",
          body: "Pasirink tolesnį žingsnį – kita skaidrė (interaktyvi).",
          blockVariant: "brand"
        }
      ],
      footer: "Toliau – Pasirink tolesnį žingsnį"
    }
  },
  {
    id: 66.99,
    title: "Pasirink tolesnį žingsnį",
    subtitle: "Modulio 5 testas, RAG pakartojimas, Modulio 6 projektas arba M4 santraukos PDF",
    type: "content-block",
    content: {
      sections: [
        {
          heading: "Ką galiu daryti toliau?",
          body: "Modulis 4 baigtas. Pasirink vieną iš keturių kelių – pagal savo tikslą.",
          blockVariant: "accent"
        },
        {
          heading: "1. Eiti į Modulio 5 testą",
          body: "15 min prezentacijos sprintas ir mini suvokimo testas. Rekomenduojama ≥70% – tada atrakinamas Modulio 6 projektas.",
          blockVariant: "brand"
        },
        {
          heading: "2. Peržiūrėti RAG arba Deep research",
          body: "Jei nori sustiprinti šaltinių naudojimą arba giliąjį tyrimą – grįžk į atitinkamas Modulio 4 skaidres (4.2, 4.3).",
          blockVariant: "brand"
        },
        {
          heading: "3. Atidaryti Modulio 6 projekto aprašą",
          body: "Praktika: SUPER PROMPTAI, COMBO, HTML – vienas integruotas projektas. Rekomenduojama po Modulio 5 testo.",
          blockVariant: "brand"
        },
        {
          heading: "4. Parsisiųsti Modulio 4 santrauką (PDF)",
          body: "Jei įjungta – parsisiųsk modulio santraukos PDF į savo įrenginį.",
          blockVariant: "terms"
        }
      ],
      footer: "Modulis 4 baigtas – sėkmės testuose ir projekte!"
    }
  }
];

function main() {
  const raw = fs.readFileSync(modulesPath, 'utf8');
  const data = JSON.parse(raw);

  const m4 = data.modules.find((m) => m.id === 4);
  const m7 = data.modules.find((m) => m.id === 7);
  if (!m4 || !m7) throw new Error('Module 4 or 7 not found');

  const m4Slides = m4.slides;
  const toMove = m4Slides.filter((s) => IDs_TO_MOVE.includes(s.id));
  if (toMove.length !== 9) throw new Error(`Expected 9 slides to move, got ${toMove.length}`);

  const idx70 = m4Slides.findIndex((s) => s.id === 70);
  const idx69 = m4Slides.findIndex((s) => s.id === 69);
  if (idx69 === -1 || idx70 === -1) throw new Error('Slide 69 or 70 not found in M4');

  // M4: remove 66.9–68.5 and 70; insert 3 new slides after 69
  const idsToRemove = new Set([...IDs_TO_MOVE, 70]);
  const newM4Slides = [];
  let inserted = false;
  for (let i = 0; i < m4Slides.length; i++) {
    const s = m4Slides[i];
    if (idsToRemove.has(s.id)) continue;
    newM4Slides.push(s);
    if (s.id === 69 && !inserted) {
      newM4Slides.push(...M4_NEW_SLIDES);
      inserted = true;
    }
  }
  if (!inserted) throw new Error('Slide 69 not found, could not insert new slides');
  m4.slides = newM4Slides;

  // M7: insert moved slides after 891
  const idx891 = m7.slides.findIndex((s) => s.id === 891);
  if (idx891 === -1) throw new Error('Slide 891 not found in M7');
  const before = m7.slides.slice(0, idx891 + 1);
  const after = m7.slides.slice(idx891 + 1);
  m7.slides = [...before, ...toMove, ...after];

  fs.writeFileSync(modulesPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('OK: M4 – removed 9+1 slides, added 3 new; M7 – inserted 9 slides after 891.');
}

main();
