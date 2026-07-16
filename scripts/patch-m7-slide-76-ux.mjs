#!/usr/bin/env node
/**
 * M7 sk. 76 UX: sritis terminologija, toolChoiceBar be lentelės, collapsible žemėlapis.
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const modulesPath = join(root, 'src/data/modules.json');

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const m7 = data.modules.find((m) => m.id === 7);
if (!m7) throw new Error('Module 7 not found');
const slide = m7.slides.find((s) => s.id === 76);
if (!slide) throw new Error('Slide 76 not found');

slide.subtitle = '6 sritys – ne tik finansai';
slide.content.sections = [
  {
    heading: '1️⃣ Trumpai',
    body: '**6 verslo sritys**, iš kurių renkami duomenys. Pasirink vieną – žemiau gausi kopijuojamą promptą.\n\n**Sritis** = kurioje veiklos dalyje kaupiasi duomenys ir priimami sprendimai.',
    blockVariant: 'accent',
  },
  {
    heading: '2️⃣ Pasirink sritį',
    body: 'Pasirink sritį pagal savo darbą – žemiau rasi kopijuojamą promptą.',
    blockVariant: 'brand',
    toolChoiceBar: {
      question: 'Kuri sritis tau aktualiausia?',
      choices: [
        { label: 'Klientai', rowIndex: 0 },
        { label: 'Tiekimas', rowIndex: 1 },
        { label: 'Pardavimai', rowIndex: 2 },
        { label: 'Rinkodara', rowIndex: 3 },
        { label: 'Procesai', rowIndex: 4 },
        { label: 'Konkurentai', rowIndex: 5 },
      ],
    },
  },
  {
    heading: 'Kopijuojamas promptas – Klientų elgsena',
    body: 'Duomenys apie pirkimus, grįžimą, atsiliepimus, naudojimąsi produktu.',
    copyable:
      'ROLE: Tu esi verslo duomenų analitikas.\nTASK: Išanalizuok klientų elgsenos duomenis.\nINPUT: [įklijuok pirkimų, atsiliepimų ar naudojimo duomenis]\nOUTPUT: 1) 3 klientų grupės 2) Kas kiekvienai grupei svarbu 3) Kur yra rizika 4) Ką daryti kitą savaitę.',
    linkedRowIndex: 0,
    blockVariant: 'terms',
  },
  {
    heading: 'Kopijuojamas promptas – Tiekimo grandinė',
    body: 'Tiekėjai, pristatymo laikas, likučiai, vėlavimai ir kainų pokyčiai.',
    copyable:
      'ROLE: Tu esi tiekimo grandinės analitikas.\nTASK: Rask silpnas vietas tiekimo duomenyse.\nINPUT: [įklijuok tiekėjų, pristatymo ar atsargų duomenis]\nOUTPUT: 1) 3 didžiausios rizikos 2) Kur trūksta duomenų 3) Ką stebėti kas savaitę 4) Kokių veiksmų imtis pirmiausia.',
    linkedRowIndex: 1,
    blockVariant: 'terms',
  },
  {
    heading: 'Kopijuojamas promptas – Pardavimų dinamika',
    body: 'Pardavimai pagal laiką, regioną, produktą ir kanalą.',
    copyable:
      'ROLE: Tu esi pardavimų analitikas.\nTASK: Paaiškink pardavimų pokyčius pagal laiką, regioną ir produktą.\nINPUT: [įklijuok pardavimų lentelę]\nOUTPUT: 1) Kas augo 2) Kas krito 3) Galimos priežastys 4) 3 rekomenduojami veiksmai.',
    linkedRowIndex: 2,
    blockVariant: 'terms',
  },
  {
    heading: 'Kopijuojamas promptas – Klientų ryšiai ir rinkodara',
    body: 'Kampanijos, laiškai, užklausos, klientų kelias ir apklausos.',
    copyable:
      'ROLE: Tu esi klientų ryšių ir rinkodaros analitikas.\nTASK: Įvertink, kurie rinkodaros veiksmai susiję su klientų reakcija.\nINPUT: [įklijuok kampanijų, užklausų ar apklausų duomenis]\nOUTPUT: 1) Kas veikia 2) Kas neveikia 3) Kokie klientų klausimai kartojasi 4) Ką testuoti kitą kartą.',
    linkedRowIndex: 3,
    blockVariant: 'terms',
  },
  {
    heading: 'Kopijuojamas promptas – Procesų efektyvumas',
    body: 'Laikas, klaidos, perdavimai tarp komandų, pakartotiniai darbai.',
    copyable:
      'ROLE: Tu esi procesų analitikas.\nTASK: Rask 3 vietas, kur procesas stringa arba kartojasi.\nINPUT: [aprašyk procesą arba įklijuok laiko / klaidų duomenis]\nOUTPUT: 1) Silpna vieta 2) Kodėl ji kainuoja laiką 3) Ką galima supaprastinti 4) Ką galėtų perimti DI.',
    linkedRowIndex: 4,
    blockVariant: 'terms',
  },
  {
    heading: 'Kopijuojamas promptas – Konkurencinė analizė',
    body: 'Kainos, pasiūlymai, vieši atsiliepimai, produktų savybės ir komunikacija.',
    copyable:
      'ROLE: Tu esi konkurencinės analizės specialistas.\nTASK: Palygink mus su 3 konkurentais pagal viešus duomenis.\nINPUT: [įklijuok konkurentų nuorodas, kainas, savybes ar atsiliepimus]\nOUTPUT: 1) Stiprybės 2) Silpnybės 3) Galimybės 4) Ką keisti pasiūlyme ar komunikacijoje.',
    linkedRowIndex: 5,
    blockVariant: 'terms',
  },
  {
    heading: '9️⃣ Daryk dabar',
    body: 'Pasirink 3 sritis, kurios tavo darbe turi daugiausia duomenų arba daugiausia neaiškumo. Tada paprašyk DI pasiūlyti pirmą analizės planą.\n\n🔘 Kopijuoti promptą (žemiau)',
    blockVariant: 'brand',
    copyable:
      'ROLE: Tu esi verslo duomenų analitikas.\nTASK: Padėk man pasirinkti 3 svarbiausias analizės sritis.\nCONTEXT: Mano veikla / komanda: [aprašyk trumpai]. Turimi duomenys: [išvardink]. Sprendimai, kuriuos turiu priimti: [įrašyk].\nOUTPUT: 1) 3 svarbiausios sritys 2) Kodėl jos svarbios 3) Kokius duomenis rinkti 4) Pirmas analizės klausimas kiekvienai sričiai.',
  },
  {
    heading: '4️⃣ Patikra (1 min)',
    body: '• Ar pasirinkai sritį ir gavai konkretų analizės planą?\n• Ar prompto OUTPUT turi aiškius punktus?',
    blockVariant: 'accent',
  },
  {
    heading: '🔽 Ne tik finansai – nori suprasti plačiau?',
    body: 'Dažnai žiūrime tik finansus: **sąnaudos, pajamos, pelnas**. Bet duomenys gimsta ir kitose veiklos dalyse. Tai **ne tas pats dalykas** – žemiau platesnis žvilgsnis.\n\n**6 papildomos sritys:** klientų elgsena, tiekimo grandinė, pardavimų dinamika, klientų ryšiai ir rinkodara, procesų efektyvumas, konkurencinė analizė.',
    blockVariant: 'terms',
    collapsible: true,
    table: {
      headers: ['Sritis', 'Kada naudoti', 'Klausimas'],
      rows: [
        [
          'Klientų elgsena',
          'Pirkimai, grįžimas, atsiliepimai, naudojimasis',
          'Kas perka? Kodėl grįžta?',
        ],
        [
          'Tiekimo grandinė',
          'Tiekėjai, pristatymas, likučiai, vėlavimai',
          'Kur butelio kakliukas?',
        ],
        [
          'Pardavimų dinamika',
          'Laikas, regionas, produktas, kanalas',
          'Kas auga / krenta?',
        ],
        [
          'Klientų ryšiai ir rinkodara',
          'Kampanijos, laiškai, apklausos, klientų kelias',
          'Kas pritraukia dėmesį?',
        ],
        [
          'Procesų efektyvumas',
          'Laikas, klaidos, perdavimai, pakartotiniai darbai',
          'Kur stringa procesas?',
        ],
        [
          'Konkurencinė analizė',
          'Kainos, pasiūlymai, atsiliepimai, komunikacija',
          'Kur stipresni / silpnesni?',
        ],
      ],
    },
  },
  {
    heading: '🔽 Kitas žingsnis',
    body: 'Kitas žingsnis – skaidrė apie duomenų tipus ir rinkimo strategiją. Sritis atsako į klausimą **ką analizuojame**, o duomenų tipas atsako į klausimą **kokiu formatu tai turime**.',
    blockVariant: 'terms',
    collapsible: true,
  },
];

writeFileSync(modulesPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Patched M7 slide 76 in modules.json');
