#!/usr/bin/env node
/**
 * One-off: atnaujina skaidr?s 60 (4.2a) turin? modules.json pagal SOT.
 * SOT: docs/turinio_pletra_moduliai_4_5_6.md � Darbas su RAG: memory, i�oriniai �altiniai ir duomen? paruo�imas.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const modulesPath = join(root, 'src', 'data', 'modules.json');

const modules = JSON.parse(readFileSync(modulesPath, 'utf8'));

const mod4 = modules.modules.find((m) => m.id === 4);
if (!mod4?.slides) {
  console.error('Modulio 4 slides nerasta');
  process.exit(1);
}

const slide = mod4.slides.find((s) => s.id === 60);
if (!slide) {
  console.error('Skaidr?s 60 nerasta');
  process.exit(1);
}

slide.title = 'Darbas su RAG: memory, i�oriniai �altiniai ir duomen? paruo�imas';
slide.subtitle = 'Memory, verslo dokumentai, duomen? paruo�imas ? gair?s ir �ablonas';

slide.content.sections = [
  {
    heading: '1?? Trumpai (RAG memory ir �altiniai)',
    body: 'Memory = ilgalaikis kontekstas apie versl�; dokumentai (ataskaitos, CRM, sutartys) = tikri skai�iai. Gerai paruo�ti duomenys su �altini? ID ir citavimu = 80% RAG rezultato. �emiau ? kada k� naudoti ir kopijuojamas �ablonas.',
    blockVariant: 'accent',
  },
  {
    heading: '2?? Memory ? ilgalaikis kontekstas apie versl�',
    body: '**Kas tai:** Platformos atmintis (ChatGPT Memory, Claude Projects) leid�ia DI prisiminti: ?mon?s veiklos srit?, tikslin� rink�, prioritetus, darbo stili?.\n\n**Pavyzdys:** ?Mano ?mon? dirba FMCG distribucijoje Baltijos �alyse. Prioritetas ? pelningumas ir augimas, ne apyvarta.?\n\n**Kada naudoti:** Kai reikia, kad DI nuolat suprast? tavo verslo kontekst�.\n\n**Svarbu:** Memory n?ra dokument? analiz?s ?rankis. Tai foninis kontekstas.',
    blockVariant: 'brand',
  },
  {
    heading: '3?? I�oriniai �altiniai ? tikras RAG versle',
    body: '**Kas tai:** Tavo real?s dokumentai: strateginis planas, finansin? ataskaita, pardavim? Excel, CRM eksportas, projekt? s�ra�as, sutartys. Kur laikyti / naudoti: savi failai, NotebookLM (Google), Trello, CRM; jei patogiau ? NoteLM kaip u�ra�? ekosistema.\n\n**Kada naudoti:** Kai reikia sprendim? pagr?st? skai�iais; atsakomyb?s; cituojam? i�vad?.',
    blockVariant: 'brand',
  },
  {
    heading: '4?? Duomen? paruo�imas ? 80% rezultato',
    body: 'RAG neveiks, jei: dokumentai padriki; n?ra ai�ki? �altini? ID; nereikalaujama citavimo.\n\n**Minimalus verslo RAG standartas:** Prid?k �ymes [�altinis 1], [�altinis 2] prie dokument? ir prompte reikalauk: ?Prie kiekvienos i�vados nurodyk �altinio ID.?',
    blockVariant: 'brand',
  },
  {
    heading: '5?? Daryk dabar',
    body: 'Nurodyk prompte: ?Naudok ir mano i�saugot� kontekst� (Memory), ir pateiktus dokumentus.? Nukopijuok �emiau esant? prompt� ir panaudok su savo dokumentais.\n\n?? **Kopijuoti prompt� (�emiau)**',
    blockVariant: 'brand',
  },
  {
    heading: '6?? Kopijuojamas promptas',
    body: '?klijuok �? prompt� ? DI (ChatGPT, Claude) kartu su savo dokumentais, pa�ym?tais [�altinis 1], [�altinis 2]:',
    blockVariant: 'default',
    copyable: '�tai duomenys su nuorodomis: [?klijuoti tekst� su [�altinis 1], [�altinis 2]?]. Analizuok ir pateik i�vadas; prie kiekvienos i�vados nurodyk nuorod� ? �altin?.',
  },
  {
    heading: 'Kada naudoti Memory, o kada dokumentus?',
    body: '',
    blockVariant: 'terms',
    table: {
      headers: ['Situacija', 'Sprendimas'],
      rows: [
        ['Reikia bendro verslo konteksto', 'Memory'],
        ['Reikia analizuoti skai�ius', 'I�oriniai �altiniai'],
        ['Reikia pagr?sti sprendim�', 'I�oriniai �altiniai'],
        ['Reikia greito strateginio m�stymo', 'Memory + dokumentai'],
      ],
    },
  },
  {
    heading: '7?? Patikra',
    body: 'Jei DI necituoja �altini? arba neai�k?s nuorodos ? gr?�k prie duomen? paruo�imo: prid?k ai�kius �ymes [�altinis 1], [�altinis 2] ir prompte reikalauk ?Prie kiekvieno teiginio nurodyk �altinio ID.?',
    blockVariant: 'accent',
  },
  {
    heading: 'Praktinis workflow ? tipinis verslininkas',
    body: '**1. Memory:** ?Mano ?mon? veikia statyb? sektoriuje. Prioritetas ? mar�a, ne apyvarta.?\n\n**2. ?keliami dokumentai:** Q1 finansin? ataskaita, Objekt? pelningumo analiz?.\n\n**3. Promptas:** ?Remiantis dokumentais, identifikuok ma�iausiai pelningus projektus ir pasi?lyk 3 veiksmus mar�ai didinti. Prie kiekvieno teiginio nurodyk �altinio ID.?',
    blockVariant: 'brand',
    collapsible: true,
    collapsedByDefault: true,
  },
  {
    heading: 'Esmin? logika',
    body: '**Memory** = kontekstas apie versl�. **Dokumentai** = real?s skai�iai. **Strukt?ra + citavimas** = sprendim? patikimumas.\n\nBe dokument? ? tai nuomon?. Su dokumentais ? tai analiz?.',
    blockVariant: 'accent',
  },
  {
    heading: '?? Nuorodos: NotebookLM, NoteLM, Trello',
    body: '**NotebookLM** ? Google DI ?rankis darbui su dokument? rinkiniais (PDF, Docs, Slides) ir RAG tarp �altini?. Nuoroda: [notebooklm.google](https://notebooklm.google/). **NoteLM** ? AI u�ra�? ir video ?rankis, jei patogiau dirbti per u�ra�? ekosistem�. Nuoroda: [notelm.app](https://www.notelm.app/). **Trello** ? lentos ir kortel?s; galima apra�yti u�duotis kaip kontekst� RAG promptui. Nuoroda: [trello.com](https://trello.com/).',
    blockVariant: 'terms',
    collapsible: true,
    collapsedByDefault: true,
  },
];

writeFileSync(modulesPath, JSON.stringify(modules, null, 2), 'utf8');
console.log('OK: skaidr? 60 (4.2a) atnaujinta src/data/modules.json');
