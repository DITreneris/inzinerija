#!/usr/bin/env node
/**
 * Patch M4 slide 60: pilnai perrašo skaidrę iš SOT.
 * SOT: docs/turinio_pletra_moduliai_4_5_6.md § „Darbas su RAG: Atmintis, išoriniai šaltiniai ir duomenų paruošimas“ (4.2a).
 * Auditas: docs/development/M4_SKAIDRE_60_RAG_MEMORY_UI_UX_AUDITAS_DETALUS.md (FMCG paaiškintas, body po lentele, collapsible).
 * Run: node scripts/patch-m4-60-reset-clean.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const modulesPath = join(__dirname, '..', 'src', 'data', 'modules.json');

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const mod = data.modules.find((m) => m.id === 4);
const slideIndex = mod?.slides?.findIndex((s) => s.id === 60);
if (slideIndex === undefined || slideIndex === -1) {
  console.error('M4 or slide 60 not found');
  process.exit(1);
}

/** Pilna skaidrė 60 iš SOT (4.2a) + GOLDEN_STANDARD §3.2 + audito pataisymai */
const slide60FromSOT = {
  id: 60,
  title: 'Darbas su RAG: atmintis, išoriniai šaltiniai ir duomenų paruošimas',
  shortTitle: 'RAG: atmintis ir įrankiai',
  subtitle: 'Memory, verslo dokumentai, duomenų paruošimas – gairės ir šablonas',
  type: 'content-block',
  content: {
    sections: [
      {
        heading: '1️⃣ Trumpai (RAG memory ir šaltiniai)',
        body:
          'Per šią skaidrę susidėliosi paprastą taisyklę: kada užtenka DI atminties, kada būtini dokumentai ir kaip prašyti atsakymų su nuorodomis, o ne nuomonių.',
        blockVariant: 'accent',
      },
      {
        heading: '2️⃣ Atmintis – ilgalaikis kontekstas apie verslą',
        body:
          '**Kas tai:** DI atmintis (Memory) – vieta, kur DI prisimena pagrindinius faktus apie tavo verslą: veiklos sritį, klientus, prioritetus, darbo stilių.\n\n**Pavyzdys:** „Mano įmonė dirba greitai gaminamų vartotojų produktų (FMCG) distribucijoje Baltijos šalyse. Prioritetas – pelningumas ir augimas, ne apyvarta.“\n\n**Kada naudoti:** Kai nori, kad DI nuolat „žinotų“, kas tu esi ir kuo užsiimi – kad nereikėtų visko kartoti kiekviename pokalbyje.\n\n**Svarbu:** Atmintis neskirta skaičių analizei. Tai foninis kontekstas – be konkrečių lentelių ir dokumentų.',
        blockVariant: 'brand',
        collapsible: true,
        collapsedByDefault: true,
      },
      {
        heading: '3️⃣ Išoriniai šaltiniai – tikras RAG versle',
        body:
          '**Kas tai:** Tavo realūs dokumentai: strateginis planas, finansinė ataskaita, pardavimų Excel, CRM eksportas, projektų sąrašas, sutartys.\n\n**Kur laikyti / naudoti:** savi failai, NotebookLM (Google), Trello, CRM; jei patogiau – NoteLM kaip užrašų ekosistemą.\n\n**Kada naudoti:** Kai nori atsakymų, kurie remiasi skaičiais ir tekstais, o ne bendromis frazėmis: pelningumo analizė, segmentai, rizikos, sutartys.',
        blockVariant: 'brand',
        collapsible: true,
        collapsedByDefault: true,
      },
      {
        heading: '4️⃣ Duomenų paruošimas – 80% rezultato',
        body:
          'RAG duos silpnus atsakymus, jei dokumentai padriki, nesuidentifikuoti ir neklausi apie šaltinius.\n\n**Minimalus verslo RAG standartas:** aiškiai paženklinti šaltiniai (pvz. [Šaltinis 1 – 2026 Q1 Finansinė ataskaita], [Šaltinis 2 – Pardavimų ataskaita pagal regionus]) ir užklausa su prašymu cituoti.',
        blockVariant: 'brand',
        collapsible: true,
        collapsedByDefault: true,
      },
      {
        heading: '5️⃣ Daryk dabar',
        body: 'Nurodyk prompte: „Naudok ir mano išsaugotą kontekstą (Memory), ir pateiktus dokumentus.“ Nukopijuok žemiau esantį promptą ir panaudok su savo dokumentais.\n\n🔘 **Kopijuoti promptą (žemiau)**',
        blockVariant: 'brand',
      },
      {
        heading: '6️⃣ Kopijuojamas promptas',
        body: 'Įklijuok šį promptą į DI (ChatGPT, Claude) kartu su savo dokumentais, pažymėtais [Šaltinis 1], [Šaltinis 2]:',
        blockVariant: 'default',
        copyable:
          'Štai duomenys su nuorodomis: [įklijuoti tekstą su [Šaltinis 1], [Šaltinis 2]…]. Analizuok ir pateik išvadas; prie kiekvienos išvados nurodyk nuorodą į šaltinį.',
      },
      {
        heading: 'Sprendimo matrica: DI atmintis ir dokumentai',
        body:
          'Lentelėje – tipinės situacijos: kada užtenka DI atminties, kada būtini dokumentai ir kur DI atmintimi pasikliauti negalima.',
        blockVariant: 'terms',
        collapsible: true,
        collapsedByDefault: true,
        table: {
          headers: ['Situacija', 'Rekomenduojamas sprendimas', 'Kodėl?'],
          rows: [
            [
              'Reikia bendro verslo konteksto',
              'DI atmintis (Memory)',
              'Kontekstas ilgalaikis ir kartojasi.',
            ],
            [
              'Reikia analizuoti skaičius',
              'Dokumentai (išoriniai šaltiniai)',
              'Reikia tikslių faktų ir lentelių.',
            ],
            [
              'Reikia pagrįsti sprendimą',
              'Dokumentai (išoriniai šaltiniai)',
              'Reikia citatų ir atsakomybės.',
            ],
            [
              'Reikia greito strateginio mąstymo',
              'Atmintis + dokumentai',
              'Kontekstas ir skaičiai kartu.',
            ],
            [
              'Teisinis tikslumas (įstatymai, sutartys)',
              'Dokumentai (oficialūs šaltiniai)',
              '⚠ DI atmintis gali būti netiksli arba pasenusi.',
            ],
          ],
          solutionMatrixStyle: true,
          rowMeta: [
            { strengthBadge: 'DI atmintis', badgeVariant: 'blue' },
            { strengthBadge: 'Dokumentai', badgeVariant: 'yellow' },
            { strengthBadge: 'Dokumentai', badgeVariant: 'yellow' },
            { strengthBadge: 'Atmintis + dokumentai', badgeVariant: 'green' },
            {
              strengthBadge: 'Dokumentai',
              badgeVariant: 'yellow',
              isWarning: true,
            },
          ],
        },
      },
      {
        heading: '7️⃣ Patikra',
        body: 'Jei DI necituoja šaltinių arba neaiškūs nuorodos – grįžk prie duomenų paruošimo: pridėk aiškius žymes [Šaltinis 1], [Šaltinis 2] ir prompte reikalauk „Prie kiekvieno teiginio nurodyk šaltinio ID.“',
        blockVariant: 'accent',
      },
      {
        heading: 'Praktinis workflow – tipinis verslininkas',
        body: '**1. Memory:** „Mano įmonė veikia statybų sektoriuje. Prioritetas – marža, ne apyvarta.“\n\n**2. Įkeliami dokumentai:** Q1 finansinė ataskaita, Objektų pelningumo analizė.\n\n**3. Promptas:** „Remiantis dokumentais, identifikuok mažiausiai pelningus projektus ir pasiūlyk 3 veiksmus maržai didinti. Prie kiekvieno teiginio nurodyk šaltinio ID.“',
        blockVariant: 'brand',
        collapsible: true,
        collapsedByDefault: true,
      },
      {
        heading: 'Esminė logika',
        body:
          '**Atmintis (Memory)** = kontekstas apie verslą. **Dokumentai** = realūs skaičiai. **Struktūra + citavimas** = sprendimų patikimumas.\n\nBe dokumentų – tai nuomonė. Su dokumentais – tai analizė.',
        blockVariant: 'accent',
      },
      {
        heading: '🔽 Nuorodos: NotebookLM, NoteLM, Trello',
        body: '**NotebookLM** – Google DI įrankis darbui su dokumentų rinkiniais (PDF, Docs, Slides) ir RAG tarp šaltinių. Nuoroda: [notebooklm.google](https://notebooklm.google/). **NoteLM** – AI užrašų ir video įrankis, jei patogiau dirbti per užrašų ekosistemą. Nuoroda: [notelm.app](https://www.notelm.app/). **Trello** – lentos ir kortelės; galima aprašyti užduotis kaip kontekstą RAG promptui. Nuoroda: [trello.com](https://trello.com/).',
        blockVariant: 'terms',
        collapsible: true,
        collapsedByDefault: true,
      },
    ],
    footer: 'Toliau – skaidrė 24: DI įrankiai informacijos paieškai',
  },
};

mod.slides[slideIndex] = slide60FromSOT;
writeFileSync(modulesPath, JSON.stringify(data, null, 2), 'utf8');
console.log('OK: M4 slide 60 pilnai perrašyta iš SOT (4.2a).');
