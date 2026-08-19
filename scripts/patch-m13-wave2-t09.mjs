/**
 * One-shot Wave 2 patch: T09 P1 split + SYS-D/E copy (13.2 / 13.4 / 13.5 / 13.101).
 * Full authoring SOT only. EN via build:modules-en-m13-m15.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const modulesPath = join(root, 'src/data/modules.json');
const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const mod = data.modules.find((m) => m.id === 13);
if (!mod) throw new Error('Module 13 not found');

const slide = (id) => mod.slides.find((s) => s.id === id);

const s2 = slide(13.2);
if (s2) {
  const copySec = s2.content.sections.find((s) => s.copyable);
  if (copySec) {
    copySec.heading = 'Kopijuojamas promptas';
    copySec.body = 'Žemiau – vaizdo prompto šablonas; užpildyk sluoksnius.';
    copySec.copyable =
      'Objektas: [ką rodoma].\nKontekstas: [vieta, veiksmas].\nEstetika: [stilius, šviesa].\nProporcijos: 16:9.\nBe teksto vaizde.';
  }
  const patikra = s2.content.sections.find((s) => s.heading === 'Patikra');
  if (patikra) {
    patikra.body =
      'Ar vaizdas atitiko aprašymą? Jei ne – pridėk daugiau detalių (vieta, apšvietimas, stilius) arba nurodyk „be teksto vaizde“.';
  }
}

const s34 = slide(13.34);
if (s34?.content) {
  s34.content.footer = 'Toliau – skaidrė 12: Darbo eiga';
}

const slide35 = {
  id: 13.35,
  title: 'Vaizdų darbo eiga',
  shortTitle: 'Darbo eiga',
  subtitle: 'Penkios stotys – pažymėk, kur esi',
  type: 'content-block',
  optional: true,
  content: {
    sections: [
      {
        heading: 'Trumpai',
        body: 'Vaizdas eina per penkias stotis: idėja, promptas, bandymas, generuok, pataisyk. Pažymėk, kur esi dabar – tada užpildyk tik tą žingsnį.',
        blockVariant: 'accent',
      },
      {
        heading: 'Eigos schema',
        body: 'Penkios stotys ant stalo. Paspausk stotį – paaiškinimas apačioje.',
        blockVariant: 'brand',
        image: 'm13_still_workflow',
        imageAlt: 'Vaizdų darbo eiga: penkios stotys ant stalo',
      },
      {
        heading: 'Daryk dabar',
        body: 'Pažymėk schemoje, kur esi, ir užpildyk vieną žingsnį.',
        blockVariant: 'brand',
      },
      {
        heading: 'Kopijuojamas žingsnis',
        body: 'Vienas žingsnis – ne visa eiga iš karto.',
        copyable:
          'Žingsnis, kuriame esu: [Idėja / Promptas / Bandymas / Generuok / Pataisyk].\nKą užpildau šiame žingsnyje: [1 sakinys].',
      },
      {
        heading: '#1000Books – vienas pavyzdys',
        body: 'Knygos iliustracija: pavadinimas + santrauka → 5 koncepcijos → išrink vieną → tada promptas į vaizdų įrankį. Tai vienas worked example, ne antra eiga.',
        blockVariant: 'terms',
        collapsible: true,
        collapsedByDefault: true,
      },
      {
        heading: 'Patikra',
        body: 'Ar pažymėjai, kur esi, ir užpildei tik vieną žingsnį? Jei ne – grįžk prie schemos.',
        blockVariant: 'accent',
      },
    ],
    footer: 'Toliau – skaidrė 13: MASTER šablonai',
  },
};

const slide351 = {
  id: 13.351,
  title: 'MASTER šablonai',
  shortTitle: 'MASTER šablonai',
  subtitle: 'Vienas MASTER + vienas Ready',
  type: 'content-block',
  optional: true,
  content: {
    sections: [
      {
        heading: 'Trumpai',
        body: 'Jei užtenka vieno sprendimo – nukopijuok MASTER šabloną arba vieną Ready. Ready veikia tik su stiliaus užraktu (15+ žodžių / tas pats produktas / vienas modelis). Aštuoni scenarijai – gilinimuisi (išskleisk).',
        blockVariant: 'accent',
      },
      {
        heading: 'Daryk dabar',
        body: 'Nukopijuok MASTER arba Ready logotipui ir užpildyk laužtinius skliaustus.',
        blockVariant: 'brand',
      },
      {
        heading: 'MASTER prompt šablonas',
        body: 'Universalus šablonas – užpildyk laukus; visą tekstą nukopijuosi vienu mygtuku.',
        copyable:
          'Subjektas: [ką rodoma].\nTikslas: [Awareness / Engagement / Conversion].\nAuditorija: [kam].\nStilius: [fotorealistiškas / minimalistinis / …].\nKompozicija + kamera: [kadras, kampas].\nŠviesa ir spalvos: [apšvietimas + paletė / nuotaika].\nTekstas vizuale (jei reikia): [tekstas + vieta].\nFormatas: [1:1 / 16:9 / 9:16]. Vengti: [ko vengti].',
      },
      {
        heading: 'Ready promptas: Logotipas',
        body: 'Nukopijuok ir užpildyk. Prieš paleidžiant įklijuok stiliaus užraktą ir modelio vardą.',
        copyable:
          'Sukurk logotipą [verslo sritis] įmonei [pavadinimas]. Stilius [minimalistinis/modernus], spalvos [x], fonas skaidrus/baltas, pateik 3 variantus.\nStiliaus užraktas: [15+ žodžių, pažodžiui]. Modelis: [vienas].',
      },
      {
        heading: 'Aštuoni verslo scenarijai',
        body: 'Produkto maketas: Sukurk fotorealistinį [produktas] maketą. Aplinka [studija/virtuvė], medžiagos [x], šviesa softbox, 3 kampai. Social post: Pagal šį tekstą [įklijuoti], sukurk iliustraciją LinkedIn/Facebook. Įvaizdis [korporatyvus], spalvos [x], formatas 1:1 ar 4:5. Plakatas: Sukurk ryškų plakatą renginiui [pavadinimas], data/vieta [x], stilius [x]. Reklaminė kampanija: 5 vizualinės kryptys reklamai [produktas], tema [x], auditorija [x]. Naujienlaiškio hero: hero antraštės vizualas, vieta tekstui viršuje 30%. Brošiūra: viršelio vizualas, vieta logotipui. Blogo vizualas: cover image temai [x], be teksto, vieta antraštei.',
        blockVariant: 'terms',
        collapsible: true,
        collapsedByDefault: true,
      },
      {
        heading: 'Patikra',
        body: 'Ar naudoji bent 3 laukus iš MASTER (subjektas, stilius, kompozicija)? Ar Ready paleidai su tuo pačiu užraktu, ne tuščiu stiliumi?',
        blockVariant: 'accent',
      },
    ],
    footer: 'Toliau – skaidrė 14: Vaizdo generatorius',
  },
};

const idx35 = mod.slides.findIndex((s) => s.id === 13.35);
if (idx35 < 0) throw new Error('13.35 not found');
mod.slides.splice(idx35, 1, slide35, slide351);

const s4 = slide(13.4);
if (s4) {
  s4.content.sections = [
    {
      heading: 'Trumpai',
      body: 'Trumpam vaizdo įrašui reikia aiškaus scenarijaus, tono ir kameros. Geriau 2–4 trumpi klipai (3–5 s) nei vienas ilgas bandymas – kadrus užrakink prieš brangų video.',
      blockVariant: 'accent',
    },
    {
      heading: 'Kadravimas ir kameros kampas',
      body: 'Kadravimas keičia emociją: lygus akims, iš viršaus, iš apačios, POV. Nurodyk prompte. Video modelis geriausiai atlieka judesį ir laiką – ne vizualinį turinį iš nulio.',
      blockVariant: 'brand',
      collapsible: true,
      collapsedByDefault: true,
    },
    {
      heading: 'Vaizdas → video grandinė',
      body: 'Pagrindinis vaizdas / raktinis kadras → video iš kadro (I2V) → montažas. Pirma garsas: jei bus balsas, pirmiausia užfiksuok balso trukmę.',
      blockVariant: 'brand',
      collapsible: true,
      collapsedByDefault: true,
    },
    {
      heading: 'Daryk dabar',
      body: 'Parašyk 2–3 sakinius vienam 3–5 s kadrui. Ciklo praktiką (vienas kintamasis, paskutinis kadras) daryk I2V generatoriuje.',
      blockVariant: 'brand',
    },
    {
      heading: 'Kopijuojamas promptas',
      body: 'Vieno trumpo klipo šablonas.',
      copyable:
        'Klipas 3–5 s (ne ilgesnis).\nScenarijus: [kas vyksta šiame kadre].\nKamera: [lėtai į priekį / šonu / stabiliai].\nTonas: [profesionalus / dinamiškas / ramus].\nStartas: video iš kadro (I2V) iš hero kadro. Tas pats stilius, tos pačios spalvos.',
    },
    {
      heading: 'Patikra',
      body: 'Ar parašei vieną sceną, trukmę ir kamerą? Ciklą (keisk vieną dalyką, žiūrėk paskutinį kadrą) pratęsk I2V generatoriuje.',
      blockVariant: 'accent',
    },
    {
      heading: 'Ta pati išvaizda keliuose kadruose',
      body: 'Tas pats pavyzdys + „tas pats produktas / tas pats stilius“. Venk realių veidų ar balsų be sutikimo.',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
    },
  ];
}

const s5 = slide(13.5);
if (s5) {
  s5.subtitle = 'Formatas ir kaina už tinkamą klipą';
  s5.content.sections = [
    {
      heading: 'Trumpai',
      body: 'Video: formatas (16:9 / 9:16), trukmė 3–5 s. Kaina už tinkamą klipą (CPI) = generavimas + bandymai iš naujo / tinkami klipai – ne tik kaina už sekundę.',
      blockVariant: 'accent',
    },
    {
      heading: 'Daryk dabar',
      body: 'Pasirink vieną įrankį ir sugeneruok vieną 3–5 s klipą iš kadro. Užsirašyk, kiek bandymų prireikė.',
      blockVariant: 'brand',
      toolChoiceBar: {
        variant: 'choice',
        question: 'Pasirink video įrankį',
        choices: [
          {
            label: 'Kling',
            rowIndex: 0,
            description: 'I2V, kaina / kokybė',
            whenHint:
              'Tinka: video iš kadro, kai reikia balanso. Netinka: jei reikia įtaisyto garso tame pačiame generate.',
          },
          {
            label: 'Veo',
            rowIndex: 1,
            description: 'Kokybė + garsas',
            whenHint:
              'Tinka: dialogas ar aplinka viename generate. Netinka: jei prekės balsą dėsi atskirai.',
          },
          {
            label: 'Seedance',
            rowIndex: 2,
            description: 'Valdomas judesys',
            whenHint:
              'Tinka: daug pavyzdžių nuotraukų ir judesio kontrolė. Netinka: jei užtenka vieno kadro.',
          },
          {
            label: 'Sora',
            rowIndex: 3,
            description: 'OpenAI ekosistema',
            whenHint:
              'Tinka: 1–2 pavyzdžių nuotraukos toje pačioje aplinkoje. Netinka: jei jau turi kitą I2V grandinę.',
          },
        ],
      },
    },
    {
      heading: 'Kopijuojamas promptas',
      body: 'Trumpo klipo + CPI pastaba.',
      copyable:
        'Vaizdo klipas iš raktinio kadro: [1–2 sakiniai veiksmo].\nFormatas: [16:9 / 9:16]. Trukmė: 3–5 sek. Stilius: [nurodyk].\nCPI pastaba: kiek bandymų prireikė iki tinkamo? [N]',
    },
    {
      heading: 'Patikra',
      body: 'Ar failas atsisiųstas? Ar komercinės teisės tinka? Koks CPI (bandymus įskaičiuok)?',
      blockVariant: 'accent',
    },
    {
      heading: 'Garsas: tame pačiame generate ar atskirai?',
      body: 'Dialogas ar aplinka viename generate – rašyk garsą tame pačiame prompte. Prekės balsas / licencija – tylus klipas + balsas atskirai + maišymas (saugesnis klientui). Niekada nedėk dviejų garsų ant to paties klipo, jei nežinai, kurį išmesi.',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
    },
    {
      heading: 'Daugiau video įrankių',
      body: 'Runway, Pika, Luma Dream Machine, Synthesia, InVideo, CapCut. Pilnas sąrašas – skiltyje „Įrankiai“.',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
    },
  ];
}

const s47 = slide(13.47);
if (s47?.content) {
  s47.content.tldr =
    'Trumpai: Užpildyk kadrą, trukmę ir judesį – sistema sudės video iš kadro promptą. Nukopijuok į video įrankį.';
  s47.content.patikra =
    'Ar prompte yra raktinis kadras, trukmė 3 s pirma, viena kamera ir vienas veiksmas? Ar žiūrėjai paskutinę sekundę – etiketė skaitoma, nėra naujų objektų?';
}

const s101 = slide(13.101);
if (s101) {
  s101.content.sections = [
    {
      heading: 'Trumpai',
      body: 'Prieš publikaciją žinosi, ką tikrinsi: rezultatus, teises, DI žymą ir bent vieną A/B hipotezę.',
      blockVariant: 'accent',
    },
    {
      heading: 'Daryk dabar',
      body: 'Pasirink vieną: parašyk A/B hipotezę arba įvertink savo vaizdą pagal 3 kriterijus (ženklas, žinutė, platforma).',
      blockVariant: 'brand',
    },
    {
      heading: 'Teisės ir rizikos',
      body: '(1) Komercinė licencija – ar planas leidžia reklamą.\n(2) Veidas ir balsas – tik su sutikimu.\n(3) Prekės ženklai – nekopijuok svetimų logotipų.\n(4) Asmens duomenys – nekelk klientų veidų be pagrindo.\n(5) DI žyma – žmogui matoma pastaba arba įrankio žymė.',
      blockVariant: 'brand',
    },
    {
      heading: 'A/B hipotezė',
      body: 'Šablonas testavimo hipotezei – nukopijuok ir užpildyk.',
      copyable:
        'Testas: [A vs B – pvz. „Vaizdas A: žmogus naudoja produktą / Vaizdas B: tik produktas ant balto fono“].\nHipotezė: [pvz. „Variantas A gaus didesnį CTR, nes rodo naudojimą“].\nMetrika: CTR (arba CVR, scroll stop). Trukmė: [pvz. 7 dienos]. Auditorija: [kam rodoma].',
    },
    {
      heading: 'Vertinimo šablonas',
      body: 'Jei renkiesi vertinimą – nukopijuok ir įvertink savo artefaktą.',
      copyable:
        'Įvertink šį turinio artefaktą pagal 3 kriterijus: brand atitikimas, žinutės aiškumas, platformos tinkamumas.\nKontekstas: [kampanijos tikslas, auditorija, platforma].\nArtefaktas / aprašymas: [įklijuok promptą arba aprašyk gautą rezultatą].\nGrąžink lentelę: kriterijus, balas 1–5, kas gerai, 1–2 konkretūs pataisymai.',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
    },
    {
      heading: 'Art. 50 ir Soft Binding',
      body: 'EU AI Act Art. 50 – žmogui matoma DI žyma. C2PA / SynthID dažnai nuimami socialiniuose tinkluose – Soft Binding (watermark) padeda, bet nekeičia žmogui matomos pastabos.',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
    },
    {
      heading: 'Ką matuoti',
      body: 'Vienas verslo sakinys: ar vaizdas sustabdė slinktį ir ar daugiau žmonių paspaudė ten, kur tikėjaisi.',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
    },
    {
      heading: 'Patikra',
      body: 'Ar prieš publikaciją patikrinai teises, DI žymą ir bent vieną A/B hipotezę ar vertinimą?',
      blockVariant: 'accent',
    },
  ];
}

const FOOTER_FROM = new Set([
  13.35, 13.351, 13.37, 13.36, 13.4, 13.47, 13.5, 13.51, 13.52, 13.56, 13.6,
  13.7, 13.101, 13.11, 13.8,
]);

for (let i = 0; i < mod.slides.length - 1; i++) {
  const current = mod.slides[i];
  if (!FOOTER_FROM.has(current.id) || !current.content) continue;
  const next = mod.slides[i + 1];
  const nextTitle = next.shortTitle || next.title;
  current.content.footer = `Toliau – skaidrė ${i + 2}: ${nextTitle}`;
}

writeFileSync(modulesPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log(
  `Patched M13: slides=${mod.slides.length} (13.351 at ${mod.slides.findIndex((s) => s.id === 13.351)})`
);
