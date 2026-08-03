/**
 * M5 Wave A + Wave B content patch (one Apply path).
 * Run: node scripts/patch-m5-ab-waves.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const FULL_6_BLOCK_LT = `META: Tu esi ekspertas prezentacijų turiniui kurti. Tikslas – sukurti 8 skaidrių prezentacijos turinį. Auditorija: [Įrašyti].

INPUT: Tema – [Įrašyti]. Apribojimai – 8 skaidrės; struktūra: problema → kodėl svarbu → sprendimas → kaip veikia → pavyzdys → nauda → rizikos → CTA.

OUTPUT: Kiekvienai skaidrei – pavadinimas, 2–3 bullet pointai, vizualo pasiūlymas. Formatas – aiškus, glaustas. Tonas – profesionalus, non-tech.

REASONING: Pirmiausia apibrėžk kiekvienos skaidrės tikslą, tada suformuluok turinį.

QUALITY: Kiekvienoje skaidrėje ne daugiau 3 punktų; kalba lietuvių; be žargono.

ADVANCED: (pasirenkama) Žemas temperature – aiškiam, nuosekliam turiniui.`;

const FULL_6_BLOCK_EN = `META: You are an expert at creating presentation content. Goal – create content for an 8-slide presentation. Audience: [Your text].

INPUT: Topic – [Your text]. Constraints – 8 slides; structure: problem → why it matters → solution → how it works → example → benefits → risks → CTA.

OUTPUT: For each slide – title, 2–3 bullet points, visual suggestion. Format – clear, concise. Tone – professional, non-tech.

REASONING: First define each slide's purpose, then write the content.

QUALITY: No more than 3 points per slide; plain language; no jargon.

ADVANCED: (optional) Low temperature – for clear, consistent content.`;

const MASTER_LT =
  'Sukurk 8 skaidrių prezentacijos struktūrą (ne pilną turinį). Tema: [Įrašyti]. Auditorija: [Įrašyti]. Kiekvienai skaidrei pateik: pavadinimą ir 2–3 pagrindines mintis. Formatas: numeruotas sąrašas. Tonas: aiškus, non-tech.';

const MASTER_EN =
  'Create an 8-slide presentation structure (not full content). Topic: [Your text]. Audience: [Your text]. For each slide give: title and 2–3 main points. Format: numbered list. Tone: clear, non-tech.';

const STORYLINE_PROMPT_LT = `Paruošk prezentacijos storyline (ne pilną turinį).

TEMA: [Įrašyti]
AUDITORIJA: [Įrašyti]
SPRENDIMAS (ką auditorija turi nuspręsti / prisiminti): [Įrašyti]

Pateik:
1) Valdantis teiginys (1 sakinys)
2) 3 argumentai (kiekvienas – teiginys-antraštė, ne tema)
3) CTA (ką daryti toliau)

Taisyklė: antraštės = teiginys („Q3 prioritizuoti X“), ne tema („Apie Q3“).`;

const STORYLINE_PROMPT_EN = `Prepare a presentation storyline (not full content).

TOPIC: [Your text]
AUDIENCE: [Your text]
DECISION (what the audience must decide / remember): [Your text]

Provide:
1) Governing thought (1 sentence)
2) 3 arguments (each = assertion title, not a topic label)
3) CTA (what to do next)

Rule: titles = assertions ("Prioritize X in Q3"), not topics ("About Q3").`;

const SPRINT_TEMPLATE_LT = `Tu esi DI prezentacijų rengėjas.

TEMA: [įrašyk temą]
AUDITORIJA: [kam skirta]
TIKSLAS: [ką turi pasiekti prezentacija]
TONAS: profesionalus, aiškus, be perteklinių tekstų
APIMTIS: 8 skaidrės
FORMATAS: kiekvienai skaidrei pateik: 1) antraštę (teiginys), 2) 2 bullet (≤12 žodžių), 3) vieną vizualo idėją (schema / piktograma / lentelė).

Pirma sugeneruok 8 skaidrių struktūrą. Tada sugeneruok pilną 3-ios skaidrės turinį (išplėstai, su pavyzdžiu). Galiausiai pateik 6 punktų kokybės patikrą: aiškumas, auditorija, struktūra, faktai/prielaidos, ar antraštės teiginiai, ar CTA aiškus.`;

const SPRINT_TEMPLATE_EN = `You are an AI presentation writer.

TOPIC: [your topic]
AUDIENCE: [who it's for]
GOAL: [what the presentation should achieve]
TONE: professional, clear, no fluff
SCOPE: 8 slides
FORMAT: for each slide give: 1) title (assertion), 2) 2 bullets (≤12 words), 3) one visual idea (diagram / icon / table).

First generate the 8-slide structure. Then generate full content for slide 3 (expanded, with example). Finally give a 6-point quality check: clarity, audience, structure, facts/assumptions, assertion titles, clear CTA.`;

const RESCUE_PROMPT_LT = `Štai chaotiškas 8 skaidrių juodraštis. Pataisyk jį.

PROBLEMOS: per ilgi bullet, nėra CTA, antraštės – temos (ne teiginiai), skaičiai be šaltinių.

UŽDUOTIS:
1) Perrašyk 8 antraštes kaip teiginius
2) Kiekvienai – maks. 2 bullet (≤12 žodžių)
3) Pridėk aiškų CTA 8-oje skaidrėje
4) Skaičius be šaltinio pažymėk kaip prielaidą arba paprašyk šaltinio

JUODRAŠTIS:
[įklijuok]`;

const RESCUE_PROMPT_EN = `Here is a messy 8-slide draft. Fix it.

PROBLEMS: long bullets, no CTA, titles are topics (not assertions), numbers without sources.

TASK:
1) Rewrite 8 titles as assertions
2) Max 2 bullets per slide (≤12 words)
3) Add a clear CTA on slide 8
4) Mark unsourced numbers as assumptions or ask for a source

DRAFT:
[paste]`;

function buildLtSlides() {
  return [
    {
      id: 45.5,
      title: 'Modulis 5: Prezentacijos sprintas',
      subtitle: 'Brief → storyline → draftas → kokybės patikra',
      type: 'action-intro',
      content: {
        whyBenefit:
          'Per ~25–30 min – paruoštas prezentacijos draftas. Brief, storyline, struktūra, kokybės patikra – vienas kelias, vienas rezultatas.',
        ctaText: 'Pamatyk, kas laukia – per 1 minutę!',
        heroStat: 'Modulis 5: Prezentacijos sprintas.',
        heroText: '25–30 min – 8 skaidrių prezentacija su DI.',
        heroSubText:
          'Brief → storyline → struktūra → turinys → QC. Nukopijuosi šablonus, užpildysi [Tema] ir [Auditorija], paleisi DI – gausi juodraštį prieš Modulį 6.',
        firstActionCTA:
          'Toliau: atidaryk skaidrę „Kas yra 15 min sprintas ir ką daryti pirmiausia“ ir nukopijuok 8 skaidrių šabloną. Užpildyk [Tema], [Auditorija], paleisk DI.',
        duration: '~25–30 min (sprintas + QC + mini testas)',
        audience:
          'Skirta tiems, kurie baigė Modulį 4 ir nori sukurti prezentacijos juodraštį su storyline ir kokybės patikra prieš Modulio 6 projektą.',
        outcomes: [
          'Susikurti brief (tema, auditorija, tikslas)',
          'Suformuluoti storyline (sprendimas + 3 argumentai + CTA)',
          'Sugeneruoti 8 skaidrių struktūrą ir draftą su DI',
          'Atlikti QC lab ir mini testą (≥70% → Modulis 6)',
          'Parsisiųsti Modulio 5 atmintinę (PDF)',
        ],
        handoutPromise:
          'Po šio modulio galėsi parsisiųsti Modulio 5 atmintinę (PDF): sprintas, brief, storyline, 8 skaidrių šablonas, QC ir testo santrauka.',
        unstructuredPrompt: 'Parašyk 8 skaidrių prezentaciją apie [tema].',
        structuredPrompt:
          'Brief: tema [X], auditorija [Y], tikslas [Z]. Storyline: sprendimas + 3 argumentai. 8 skaidrės. Struktūra (teiginys-antraštė + 2 bullet), tada pilnas 3-ios skaidrės turinys. Kokybės patikra – 6 punktai.',
      },
      footer: 'Toliau – skaidrė 2: Kas yra 15 min sprintas ir ką daryti pirmiausia',
    },
    {
      id: 47,
      title: 'Kas yra 15 min sprintas ir ką daryti pirmiausia',
      shortTitle: 'Kas yra sprintas?',
      subtitle: 'Brief ir 8 skaidrių struktūra – pirmas žingsnis',
      type: 'content-block',
      content: {
        whyBenefit: 'Po šio modulio kursi verslo prezentacijų juodraščius greitai ir struktūruotai.',
        duration: '~25–30 min',
        firstActionCTA:
          'Nukopijuok 8 skaidrių struktūros šabloną žemiau, užpildyk [Tema] ir [Auditorija], paleisk DI – gauk planą.',
        preCopyCheckBlock: {
          question: 'Ką būtina įtraukti į brief prieš generuojant prezentaciją?',
          options: [
            'Tik temą ir pavadinimą',
            'Temą + auditoriją + tikslą + skaidrių skaičių + toną/formatą',
            'Tik įrankio pasirinkimą',
            'Tik vizualų stilių',
          ],
          correct: 1,
          explanation:
            'Pilnas brief (tema, auditorija, tikslas, apimtis, tonas) leidžia DI greitai ir tiksliai sugeneruoti struktūrą. Be to DI „spėlioja“ ir pateikia bendrybes.',
        },
        artifactDownload: {
          filename: 'prezentacijos-8-skaidriu-sablonas.txt',
          source: 'copyable',
          sectionHeading: '8 skaidrių struktūra',
        },
        sections: [
          {
            heading: '1️⃣ Trumpai (30 s)',
            body: '**Procesas:** Brief → storyline (kita skaidrė) → 8 struktūra → turinys → QC. Pradėk nuo brief ir struktūros – nukopijuok šabloną žemiau.',
            blockVariant: 'accent',
          },
          {
            heading: '2️⃣ Daryk dabar (2–5 min)',
            body: '**Ką daryti:** Nukopijuok 8 skaidrių struktūros šabloną žemiau. Užpildyk [Tema] ir [Auditorija], paleisk DI. **Rezultatas:** 8 skaidrių planas. Toliau – storyline, tada pilnas turinys ir įrankiai.',
            blockVariant: 'brand',
          },
          {
            heading: '8 skaidrių struktūra',
            body: 'Nukopijuok šią struktūrą į DI ar įrankį – kiekviena eilutė = viena skaidrė.',
            copyable:
              '1. Problema / kontekstas\n2. Kodėl tai svarbu dabar\n3. Sprendimo idėja\n4. Kaip tai veikia (paprastai)\n5. Pavyzdys / panaudojimo atvejis\n6. Nauda / rezultatai\n7. Rizikos / ribos\n8. Ką daryti toliau (CTA)',
          },
          {
            heading: '🔽 Master promptas (tik struktūra)',
            body: 'Prašo tik struktūros – ne pilno turinio. Užpildyk [Įrašyti], nukopijuok į DI. Pilnas 6 blokų turinio promptas – skaidrėje „Pilnas turinys ir įrankiai“.',
            copyable: MASTER_LT,
            blockVariant: 'terms',
            collapsible: true,
            collapsedByDefault: true,
          },
          {
            heading: '🔽 Proceso diagrama',
            image: 'di_prezentacijos_workflow',
            body: 'Paspausk žingsnį diagramoje – paaiškinimas apačioje. Tas pats procesas veikia su bet kuriuo įrankiu.',
            blockVariant: 'terms',
            collapsible: true,
            collapsedByDefault: true,
          },
        ],
        footer: 'Toliau – skaidrė 3: Storyline – sprendimas ir 3 argumentai',
      },
    },
    {
      id: 47.2,
      title: 'Storyline – sprendimas ir 3 argumentai',
      shortTitle: 'Storyline',
      subtitle: 'Antraštės = teiginiai; valdantis teiginys prieš detales',
      type: 'content-block',
      content: {
        whyBenefit:
          'Be storyline DI duoda „apie temą“ skaidres. Su storyline – argumentą, kurį galima pristatyti.',
        firstActionCTA:
          'Nukopijuok storyline promptą žemiau, užpildyk sprendimą ir 3 argumentus, paleisk DI.',
        sections: [
          {
            heading: '1️⃣ Trumpai',
            body: '**Storyline:** (1) ką auditorija turi nuspręsti, (2) 3 argumentai, (3) CTA. Antraštės = **teiginiai**, ne temos etiketės.',
            blockVariant: 'accent',
          },
          {
            heading: '2️⃣ Daryk dabar',
            body: 'Nukopijuok promptą žemiau. Jei jau turi 8 struktūrą – perrašyk antraštes į teiginius pagal storyline.',
            blockVariant: 'brand',
          },
          {
            heading: 'Tema-antraštė vs teiginys-antraštė',
            body: '| Silpna (tema) | Stipri (teiginys) |\n| --- | --- |\n| Apie Q3 biudžetą | Q3 prioritizuoti X, ne Y |\n| Rizikos | Be 2 savaičių buffer – vėluosime |\n| Tolimesni žingsniai | Patvirtink pilotą iki penktadienio |',
            blockVariant: 'terms',
          },
          {
            heading: 'Kopijuojamas storyline promptas',
            body: 'Užpildyk [Įrašyti], paleisk DI – gauk valdantį teiginį, 3 argumentus ir CTA.',
            copyable: STORYLINE_PROMPT_LT,
            blockVariant: 'brand',
          },
          {
            heading: '3️⃣ Patikra',
            body: 'Ar aišku, ką auditorija turi nuspręsti? Ar 3 argumentai palaiko tą sprendimą? Ar antraštės skamba kaip teiginiai?',
            blockVariant: 'accent',
          },
        ],
        footer: 'Toliau – skaidrė 4: Pilnas turinys ir įrankiai',
      },
    },
    {
      id: 47.5,
      title: 'Pilnas turinys ir įrankiai – įklijuok į skaidres',
      subtitle: '6 blokų promptas + įrankio medis (3 keliai)',
      type: 'content-block',
      content: {
        sections: [
          {
            heading: '1️⃣ Trumpai (30 s)',
            body: 'Turinį generuoji DI. Tada pasirinki **vieną** kelią skaidrėms. Rekomenduojama šiandien: DI tekstas → **Gamma**.',
            blockVariant: 'accent',
          },
          {
            heading: '2️⃣ Daryk dabar (5–15 min)',
            body: '**Ką daryti:** Nukopijuok 6 blokų promptą žemiau, užpildyk [Tema]/[Auditorija], paleisk DI. Gautą turinį įklijuok į pasirinktą įrankį.',
            blockVariant: 'brand',
          },
          {
            heading: 'Promptas pilnam turiniui (6 blokų) – vienintelė pilna versija',
            body: 'Pagal Modulio 1 sistemą. Užpildyk [Įrašyti], nukopijuok – tada įklijuok į įrankį pagal medį žemiau.',
            copyable: FULL_6_BLOCK_LT,
            blockVariant: 'brand',
          },
          {
            heading: 'Įrankio medis – 3 keliai',
            body: '**1. Rekomenduojama šiandien:** DI (ChatGPT / Claude) → **Gamma** – greitas draftas.\n**2. Office ekosistema:** Copilot / PowerPoint – jei dirbi Microsoft aplinkoje.\n**3. Vizualų šablonai:** Canva – jei reikia greitų vizualų.\n\nGeras promptas ir aiški struktūra = 80% prezentacijos. Įrankis – tik formatas.',
            blockVariant: 'brand',
            presentationToolsBlock: true,
            presentationTools: [
              {
                name: 'Gamma (rekomenduojama)',
                url: 'https://gamma.app',
                forWhom: 'DI tekstas → skaidrės. Greitas draftas, lietuvių kalba.',
              },
              {
                name: 'Copilot',
                url: 'https://copilot.microsoft.com',
                forWhom: 'Office / PowerPoint ekosistema',
              },
              {
                name: 'Canva',
                url: 'https://www.canva.com',
                forWhom: 'Vizualų šablonai, Magic Write',
              },
            ],
          },
          {
            heading: '1. Pirmiausia: DI – struktūra ir turinys',
            body: 'Susikurk turinį ChatGPT, Claude, Gemini arba Copilot. Nukopijuok 6 blokų promptą aukščiau.',
            blockVariant: 'brand',
            presentationToolsBlock: true,
            presentationTools: [
              {
                name: 'ChatGPT',
                url: 'https://chat.openai.com',
                forWhom: 'Greitas draftas, tekstas, struktūra',
              },
              {
                name: 'Claude',
                url: 'https://claude.ai',
                forWhom: 'Ilgesni tekstai, struktūros, redagavimas',
              },
              {
                name: 'Gemini',
                url: 'https://gemini.google.com',
                forWhom: 'Tyrimas, dokumentai, Google ekosistema',
              },
            ],
          },
          {
            heading: '🔽 Kiti įrankiai',
            body: 'Jei Gamma / Copilot / Canva netinka – šie variantai.',
            blockVariant: 'terms',
            collapsible: true,
            collapsedByDefault: true,
            presentationToolsBlock: true,
            presentationTools: [
              {
                name: 'SlidesAI',
                url: 'https://www.slidesai.io',
                forWhom: 'Tekstas → skaidrės. Google Slides.',
              },
              {
                name: 'Prezent.ai',
                url: 'https://prezent.ai',
                forWhom: 'Verslui – brand, Story Builder.',
              },
              {
                name: 'Visme',
                url: 'https://www.visme.co',
                forWhom: 'Ataskaitoms – infografikai, interaktyvumas.',
              },
              {
                name: 'Beautiful.ai',
                url: 'https://www.beautiful.ai',
                forWhom: 'Smart templates, auto-layout.',
              },
            ],
          },
          {
            heading: 'Svarbiausia',
            body: '**Geras promptas ir aiški struktūra = 80% prezentacijos.** Įrankis – tik skaidrės formatas.',
            blockVariant: 'brand',
          },
        ],
        footer: 'Toliau – skaidrė 5: Sprintas',
      },
    },
    {
      id: 510,
      title: 'Sprintas: Brief, struktūra, skaidrės',
      shortTitle: 'Sprintas',
      subtitle: 'Brief → struktūra → skaidrės. Vienas šablonas, vienas rezultatas.',
      type: 'content-block',
      content: {
        briefCheckBlock: {
          question: 'Ar šis brief pilnas? „Tema: BVP tendencijos. Auditorija: vadovybė.“',
          options: [
            'Taip – turime temą ir auditoriją',
            'Ne – trūksta tikslas, skaidrių skaičius, tonas',
            'Ne – trūksta tik vizualų stilius',
            'Taip – pakanka tik temos',
          ],
          correct: 1,
          explanation:
            'Pilnas brief apima: temą, auditoriją, tikslą, apimtį (skaidrių skaičių) ir toną. Be to DI „spėlioja“.',
        },
        sections: [
          {
            heading: '1️⃣ Trumpai (30 s)',
            body: '**Kodėl verta:** Vienas šablonas duoda 8 skaidrių struktūrą + 1 pilnai paruoštą skaidrę + QC. Tai juodraštis, ne polish.',
            blockVariant: 'accent',
          },
          {
            heading: '2️⃣ Daryk dabar (2–15 min)',
            body: '**Ką daryti:** Nukopijuok sprinto šabloną žemiau, užpildyk [Tema], [Auditorija], [Tikslas], paleisk DI. **Ką gausi:** 8 skaidrių struktūra + pilnas 3-ios skaidrės turinys + 6 punktų kokybės patikra.',
            blockVariant: 'emerald',
          },
          {
            heading: '3️⃣ Kopijuojamas šablonas',
            body: 'Nukopijuok šabloną žemiau, užpildyk [įrašyk temą], [kam skirta] ir paleisk DI.',
            blockVariant: 'terms',
          },
          {
            heading: '🔽 Sprinto eiga (orientyras)',
            body: '0–3 min: brief + storyline kryptis.\n3–8 min: 8 skaidrių struktūra (teiginys + 2 bullet).\n8–14 min: pilnas turinys / 2 sunkios skaidrės.\n14–18 min: įklijuok į įrankį (neprivaloma polish).\n18–22 min: QC (kita skaidrė) + soft proof.',
            collapsible: true,
            collapsedByDefault: true,
          },
          {
            heading: '4️⃣ Soft proof – prieš mini testą pažymėk sau',
            body: 'Tai juodraštis, ne galutinis polish. Pažymėk sau:\n• Paleidau DI su brief / storyline\n• Turiu 8 antraštes (geriau – teiginius)\n• Padariau greitą QC (arba kitą skaidrę – QC lab)',
            blockVariant: 'accent',
          },
        ],
        footer: 'Toliau – skaidrė 6: QC lab',
        practicalTask: {
          templateLabel: '📋 Sprinto šablonas (copy-paste)',
          template: SPRINT_TEMPLATE_LT,
        },
      },
    },
    {
      id: 510.5,
      title: 'QC lab – blogas vs geras juodraštis',
      shortTitle: 'QC lab',
      subtitle: 'Žmogaus kokybės patikra prieš siuntimą',
      type: 'content-block',
      content: {
        whyBenefit:
          'DI draftas atrodo baigtas anksčiau, nei yra tikslus. QC – tavo stop prieš publikavimą.',
        firstActionCTA:
          'Perskaityk blogą fragmentą, tada gerą. Nukopijuok QC checklist į savo draftą.',
        sections: [
          {
            heading: '1️⃣ Trumpai',
            body: '**6 punktai:** aiškumas · auditorija · struktūra · faktai/prielaidos · antraštės = teiginiai · CTA aiškus. Jei faktai – naudok pagalbos kortelę „Haliucinacijos“.',
            blockVariant: 'accent',
          },
          {
            heading: '🔽 Blogas fragmentas',
            body: '**Antraštė:** Apie eksportą\n• Daug įdomių tendencijų ir skaičių apie rinką pastaraisiais metais su įvairiais aspektais\n• Svarbu kalbėti apie galimybes\n• Taip pat rizikos ir dar kelios mintys\n*(Nėra CTA, antraštė – tema, bullet per ilgi, skaičių nėra / „išgalvoti“.)*',
            blockVariant: 'terms',
            collapsible: true,
            collapsedByDefault: false,
          },
          {
            heading: '🔽 Geras fragmentas',
            body: '**Antraštė:** Eksporto augimas +12% – prioritizuoti 3 rinkas\n• LT eksportas +12% YoY (šaltinis: [įrašyk])\n• Top 3 rinkos duoda 60% apimties\n**CTA skaidrė:** Patvirtink pilotą Baltijos rinkoje iki Q3.',
            blockVariant: 'brand',
            collapsible: true,
            collapsedByDefault: false,
          },
          {
            heading: '2️⃣ Daryk dabar',
            body: 'Įklijuok savo 1 skaidrę į DI su šiuo promptu arba pats pažymėk 6 punktus.',
            copyable: `Patikrink šią skaidrę pagal 6 punktus. Kiekvienam: Taip / Ne + 1 sakinys kaip taisyti.

1) Aiškumas 2) Auditorija 3) Struktūra 4) Faktai vs prielaidos 5) Antraštė = teiginys 6) CTA (jei tai paskutinė / veiksmų skaidrė)

SKAIDRĖ:
[įklijuok]`,
            blockVariant: 'brand',
          },
          {
            heading: '3️⃣ Patikra',
            body: 'Ar antraštė teiginys? Ar nėra „išgalvotų“ faktų be žymos? Jei abejoji faktais – atidaryk pagalbos kortelę **Haliucinacijos** (kita skaidrė).',
            blockVariant: 'accent',
          },
        ],
        footer: 'Toliau – skaidrė 7: Pagalbos kortelės',
      },
    },
    {
      id: 515,
      title: 'Pagalbos kortelės (kai prireikia)',
      subtitle: 'RAG, tokenai, manipuliacijos, haliucinacijos – tik tada, kai reikia',
      type: 'content-block',
      content: {
        displayMode: 'tabs',
        sections: [
          {
            heading: 'Kaip naudoti',
            body: '**Kai prireikia:** jei užstrigai sprinto ar QC metu – pasirink situaciją žemiau ir nukopijuok šabloną. Po QC lab – ypač naudinga kortelė „Haliucinacijos“.',
          },
          {
            heading: 'RAG: kai atsakymas turi būti su šaltiniais',
            body: 'Naudok, kai prezentacijoje atsiranda faktai/skaičiai ir nori, kad DI aiškiai atskirtų: kas yra iš šaltinių, o kas – prielaidos.',
            copyable:
              'Dirbk tik su mano pateikta informacija (žemiau). Jei informacijos nepakanka – parašyk „nežinau“ ir nurodyk, ko trūksta.\n\nUžduotis: paruošk 1 skaidrę apie [TEMA].\nFormatas: Antraštė + 2 bullet + „Šaltiniai“ (1–3 punktai).\nTaisyklė: kiekvieną faktą susiek su šaltiniu (pvz. [Šaltinis 1]).\n\nKONTEKSTAS/ŠALTINIAI:\n[įklijuok 1–3 šaltinių ištraukas]\n',
            blockVariant: 'brand',
          },
          {
            heading: 'Tokenai: kai nebetelpa kontekstas',
            body: 'Naudok, kai turi daug teksto/šaltinių ir DI pradeda „pamesti“ ankstesnę informaciją arba atsakymai tampa chaotiški.',
            copyable:
              'Aš įklijuosiu ilgą tekstą. Tavo užduotis – suspausti jį į „konteksto kapsulę“, kad tilptų į promptą.\n\n1) Ištrauk 10–15 svarbiausių faktų (maks. 1 sakinys kiekvienam).\n2) Sudaryk 6–8 raktinių terminų žodynėlį (term → 1 eilutė).\n3) Pateik 3 klausimus, kuriuos būtina atsakyti, kad prezentacija būtų tiksli.\n\nGrąžink kaip:\nKONTEKSTO_KAPSULĖ:\n- Faktai: ...\n- Terminai: ...\n- Trūkstami klausimai: ...\n',
            blockVariant: 'terms',
          },
          {
            heading: 'Manipuliacijos: kai klausimas šališkas / nori neutralaus',
            body: 'Naudok, kai pagauni save formuluojant „įrodyk, kad…“, „parašyk, kodėl mes geriausi…“ ir nori objektyvaus turinio.',
            copyable:
              'Perrašyk mano užklausą į 2 variantus:\nA) Neutralus (be šališkumo, abi pusės)\nB) Verslo (įtikinamas), bet etiškas (be išgalvotų faktų)\n\nTada sugeneruok 1 skaidrę pagal neutralų variantą: antraštė + 2 bullet + 1 „rizika/kontraargumentas“.\n\nMANO UŽKLAUSA:\n[įklijuok]\n',
            blockVariant: 'default',
          },
          {
            heading: 'Haliucinacijos: kai reikia patikimumo',
            body: 'Naudok, kai DI pateikia įtikinamus faktus, bet tu nori greito „stop“: kas tikra, kas neaišku, ką tikrinti. Tinka po QC lab.',
            copyable:
              'Patikimumo patikra.\n\n1) Išskirk visus teiginius, kurie skamba kaip faktai (maks. 10).\n2) Prie kiekvieno: pažymėk (A) turi šaltinį mano kontekste / (B) neturi šaltinio.\n3) Jei (B) – perrašyk teiginį kaip prielaidą arba pasiūlyk, kokio šaltinio reikia.\n\nTada pateik pataisytą skaidrės variantą: antraštė + 2 bullet + „Kas neaišku / ką tikrinti“.\n\nTEKSTAS/SKAIDRĖ:\n[įklijuok]\n',
            blockVariant: 'accent',
          },
        ],
        footer: 'Toliau – skaidrė 8: Pasiruošimo savitikra',
      },
    },
    {
      id: 511,
      title: 'Pasiruošimo savitikra',
      subtitle: 'Bandomosios užduotys prieš mini testą – nevertinama į rezultatą',
      type: 'warm-up-quiz',
      content: {
        questions: [
          {
            id: 'm5-warm-1',
            question: 'Kas yra „brief“ prezentacijos sprinto kontekste?',
            options: [
              'Trumpas aprašymas: tema, auditorija, tikslas – pagal kurį DI generuoja struktūrą ir turinį',
              'Tik skaidrių skaičius',
              'Tik įrankio pasirinkimas',
              'Tik kokybės patikros sąrašas',
            ],
            correct: 0,
            explanation:
              'Brief – orientacija DI: kokia tema, kam skirta, kokio rezultato tikimės. Geras brief sumažina iteracijas.',
          },
          {
            id: 'm5-warm-2',
            question: 'Kodėl 8 skaidrių struktūra padeda?',
            options: [
              'Suteikia aiškų karkasą – DI ir įrankis žino, ką kurti; mažiau spėliojimo',
              'Nes 8 skaidrės – maksimalus skaičius',
              'Nes tik Gamma priima 8 skaidres',
              'Nes testas reikalauja tik 8 skaidrių',
            ],
            correct: 0,
            explanation:
              'Struktūra – „žemėlapis“ DI ir tau. Mažiau spėliojimo, daugiau atkartojamų rezultatų.',
          },
          {
            id: 'm5-warm-3',
            question: 'Ką patikrini „kokybės patikros“ žingsnyje?',
            options: [
              'Ar turinys atitinka brief, ar nėra klaidų, ar skaidrės aiškios ir nuoseklios',
              'Tik ar įrankis išsaugo failą',
              'Tik ar skaidrių skaičius teisingas',
              'Tik ar DI atsakė greitai',
            ],
            correct: 0,
            explanation:
              'Kokybės patikra – ar rezultatas atitinka tikslus, ar nėra faktinių klaidų, ar struktūra aiški.',
          },
          {
            id: 'm5-warm-4',
            question: 'Kuo storyline skiriasi nuo „tiesiog 8 temų sąrašo“?',
            options: [
              'Storyline turi sprendimą, 3 argumentus ir CTA; antraštės = teiginiai',
              'Storyline reiškia daugiau animacijų',
              'Storyline veikia tik Gamma',
              'Storyline pakeičia brief',
            ],
            correct: 0,
            explanation:
              'Storyline duoda valdantį teiginį ir argumentus. Temų sąrašas be sprendimo lieka bendrybėmis.',
          },
        ],
      },
    },
    {
      id: 512,
      title: 'Mini testas po sprinto',
      subtitle: 'Klausimai apie brief, storyline, struktūrą, įrankį ir kokybės patikrą',
      type: 'test-intro',
      content: {
        introTitle: 'Mini testas po prezentacijos sprinto',
        introBody:
          'Pirmiausia atlikai **prezentacijos sprintą** (brief, storyline, draftas, QC). Šis mini testas patikrina, ar suprati esminius principus: brief, storyline, struktūrą, įrankio pasirinkimą ir greitą kokybės patikrą.',
        microWinPhrase:
          'Jei jau atlikai sprintą ir QC – tu pasiruošęs. Šis testas tik sustiprina žinias.',
        thresholdsText:
          'Rezultatas **≥70%** – rekomenduojama pereiti prie Modulio 6 (praktika). Rezultatas **<70%** – rekomenduojama pakartoti mini testą ir peržiūrėti sprintą, storyline bei QC lab. Jei reikia, gali vis tiek tęsti toliau.',
        ctaLabel: 'Pradėti mini testą',
      },
    },
    {
      id: 513,
      title: 'Sprinto žinių patikrinimas',
      subtitle: 'Patikrink, ar suprati sprinto logiką',
      type: 'test-section',
      testQuestions: [
        {
          id: 'm5-sprint-q1',
          type: 'scenario',
          scenarioContext:
            'Tu ketini sukurti prezentacijos draftą apie „Lietuvos eksporto tendencijas 2024“. Prieš pradedant – ką būtina nurodyti DI?',
          question: 'Ką reikia įtraukti į brief?',
          options: [
            'Temą + auditoriją + tikslą + skaidrių skaičių + toną/formatą',
            'Tik temą ir pavadinimą',
            'Tik įrankio pasirinkimą',
            'Tik vizualų stilių',
          ],
          correct: 0,
          explanation:
            'Be brief DI „spėlioja“. Tema, auditorija, tikslas, apimtis ir formatas leidžia greitai gauti valdomą rezultatą.',
          ifWrongSee: {
            moduleId: 5,
            slideId: 47,
            label: 'Kas yra 15 min sprintas',
          },
        },
        {
          id: 'm5-sprint-q2',
          question: 'Ką daryti, jei prezentacija gavosi per ilga arba chaotiška?',
          options: [
            'Sugriežtinti formatą (pvz. 8 skaidrės, 2 bullet), aiškiai nurodyti struktūrą ir apribojimus',
            'Paprašyti „parašyk geriau“ be apribojimų',
            'Pridėti dar daugiau konteksto be struktūros',
            'Visada keisti įrankį',
          ],
          correct: 0,
          explanation:
            'Struktūra ir aiškūs apribojimai yra didžiausias svertas. Dažniausiai nereikia keisti įrankio – reikia sugriežtinti formatą.',
          ifWrongSee: {
            moduleId: 5,
            slideId: 47.5,
            label: 'Pilnas turinys ir įrankiai',
          },
        },
        {
          id: 'm5-sprint-q3',
          question: 'Kas yra greita kokybės patikra prieš siunčiant prezentaciją?',
          options: [
            'Ar aiškus tikslas ir auditorija, ar struktūra logiška, ar nėra „išgalvotų“ faktų (jei reikia – paprašyti šaltinių / pažymėti prielaidas)',
            'Ar tekstas labai ilgas ir detalus',
            'Ar yra kuo daugiau animacijų',
            'Ar prezentacijoje naudojami tik angliški terminai',
          ],
          correct: 0,
          explanation:
            'Quality = minimalus „stop“ prieš publikavimą: aiškumas, auditorija, struktūra ir faktų patikimumas.',
          ifWrongSee: {
            moduleId: 5,
            slideId: 510.5,
            label: 'QC lab',
          },
        },
        {
          id: 'm5-sprint-q4',
          question: 'Kuris įrankio pasirinkimas logiškiausias 15 min prezentacijos draftui?',
          options: [
            'Prezentacijų generatorius (pvz. Gamma) arba DI (ChatGPT/Claude) su aiškia struktūra ir šablonu',
            'Tik tekstų redaktorius (Word) be DI',
            'Tik vaizdų generatorius',
            'Nėra skirtumo – bet kuris įrankis duos tą patį',
          ],
          correct: 0,
          explanation:
            'Įrankis svarbus, bet didžiausias svertas – prompto struktūra ir aiškus brief. Gamma arba DI su šablonu geriausiai tinka draftui.',
          ifWrongSee: {
            moduleId: 5,
            slideId: 47.5,
            label: 'Pilnas turinys ir įrankiai',
          },
        },
        {
          id: 'm5-sprint-q5',
          type: 'scenario',
          scenarioContext:
            'Gavai 8 skaidres: antraštės „Apie produktą“, „Rinka“, „Tolimesni žingsniai“; bullet po 5 eilutes; skaičius 47% be šaltinio; nėra CTA.',
          question: 'Koks geriausias pirmas žingsnis?',
          options: [
            'Rescue: teiginiai-antraštės, maks. 2 bullet, pažymėti prielaidas, pridėti CTA',
            'Keisti įrankį į kitą generatorių be keičiant turinį',
            'Prašyti dar ilgesnio teksto',
            'Ištrinti visas skaidres ir pradėti be brief',
          ],
          correct: 0,
          explanation:
            'Chaotišką decką gelbsti struktūra ir QC, ne naujas įrankis. Rescue promptas – bonus skaidrėje po rezultatu.',
          ifWrongSee: {
            moduleId: 5,
            slideId: 516,
            label: 'Bonusas: Pataisyk chaotišką decką',
          },
        },
      ],
    },
    {
      id: 514,
      title: 'Testo rezultatai',
      subtitle: 'Toliau – modulio užbaigimas ir praktika (Modulis 6)',
      type: 'test-results',
      content: {
        passedTitle: 'Sveikiname!',
        passedMessage:
          'Rezultatas **[X]%**. Turi veikiančią prezentacijos struktūrą, storyline kryptį ir supranti sprinto logiką – gali pereiti į Modulio 6 praktiką.',
        thresholdExplanation:
          '≥70% reiškia: supranti brief, storyline, struktūrą ir kokybės patikrą – gali pereiti prie projekto (Modulis 6). Mažiau nei 70% – rekomenduoju dar kartą peržiūrėti sprintą ir žemiau nurodytas skaidres.',
        useCaseBlock:
          'Panaudok tą patį sprinto šabloną kitai prezentacijai – darbo susitikimui, pitch ar ataskaitai. Brief + storyline + 8 skaidrės + kokybės patikra.',
        passedCtaLabel: 'Tęsti į modulio užbaigimą',
        failedTitle: 'Rezultatas [X]%',
        failedMessage:
          'Rekomenduoju pirmiausia pakartoti mini testą. Jei dar trūksta aiškumo, peržiūrėk žemiau nurodytas skaidres. Jei reikia, gali vis tiek tęsti į modulio užbaigimą.',
        failedCtaRetry: 'Bandyti mini testą dar kartą',
        failedCtaContinue: 'Vis tiek tęsti į modulio užbaigimą',
        failedCtaReview: 'Peržiūrėti Modulį 4',
        handoutDownloadLabel: 'Parsisiųsti Modulio 5 atmintinę (PDF)',
      },
    },
    {
      id: 516,
      title: 'Bonusas: Pataisyk chaotišką decką',
      shortTitle: 'Rescue',
      subtitle: 'Rescue promptas – kai draftas per ilgas, be CTA, su silpnomis antraštėmis',
      type: 'content-block',
      optional: true,
      badgeVariant: 'bonus',
      content: {
        whyBenefit:
          'Įveikei mini testą – premija: kaip gelbėti blogą DI juodraštį be naujo įrankio.',
        sections: [
          {
            heading: '1️⃣ Trumpai',
            body: 'Chaotiškas deckas = silpnos antraštės, ilgi bullet, nėra CTA, skaičiai be šaltinių. Rescue = sugriežtinti formatą ir storyline, ne „parašyk geriau“.',
            blockVariant: 'accent',
          },
          {
            heading: '2️⃣ Daryk dabar',
            body: 'Įklijuok blogą juodraštį (arba sugalvok) į promptą žemiau ir paleisk DI.',
            blockVariant: 'brand',
          },
          {
            heading: 'Kopijuojamas rescue promptas',
            body: 'Nukopijuok, įklijuok savo juodraštį vietoj [įklijuok].',
            copyable: RESCUE_PROMPT_LT,
            blockVariant: 'terms',
          },
          {
            heading: '3️⃣ Patikra',
            body: 'Ar antraštės tapo teiginiais? Ar bullet ≤2? Ar yra CTA? Ar skaičiai pažymėti / turi šaltinį?',
            blockVariant: 'accent',
          },
        ],
        footer: 'Gali grįžti į modulio užbaigimą arba pradėti Modulį 6.',
      },
    },
  ];
}

function buildEnSlides() {
  return [
    {
      id: 45.5,
      title: 'Module 5: Presentation sprint',
      subtitle: 'Brief → storyline → draft → quality check',
      type: 'action-intro',
      content: {
        whyBenefit:
          'In ~25–30 min you get a presentation draft. Brief, storyline, structure, quality check – one path, one result.',
        ctaText: "See what's ahead – in 1 minute!",
        heroStat: 'Module 5: Presentation sprint.',
        heroText: '25–30 min – 8-slide presentation with AI.',
        heroSubText:
          'Brief → storyline → structure → content → QC. You copy templates, fill [Topic] and [Audience], run AI – and get a draft before Module 6.',
        firstActionCTA:
          'Next: open the slide \"What is the 15 min sprint and what to do first\" and copy the 8-slide template. Fill [Topic], [Audience], run AI.',
        duration: '~25–30 min (sprint + QC + mini quiz)',
        audience:
          'For those who finished Module 4 and want a presentation draft with storyline and quality check before the Module 6 project.',
        outcomes: [
          'Create a brief (topic, audience, goal)',
          'Form a storyline (decision + 3 arguments + CTA)',
          'Generate an 8-slide structure and draft with AI',
          'Complete the QC lab and mini quiz (≥70% → Module 6)',
          'Download Module 5 handout (PDF)',
        ],
        handoutPromise:
          'After this module you can download the Module 5 handout (PDF): sprint, brief, storyline, 8-slide template, QC and quiz summary.',
        unstructuredPrompt: 'Write an 8-slide presentation about [topic].',
        structuredPrompt:
          'Brief: topic [X], audience [Y], goal [Z]. Storyline: decision + 3 arguments. 8 slides. Structure (assertion title + 2 bullets), then full content for slide 3. Quality check – 6 points.',
      },
      footer: 'Next – slide 2: What is the 15 min sprint and what to do first',
    },
    {
      id: 47,
      title: 'What is the 15 min sprint and what to do first',
      shortTitle: 'What is the sprint?',
      subtitle: 'Brief and 8-slide structure – first step',
      type: 'content-block',
      content: {
        whyBenefit: "After this module you'll create business presentation drafts quickly and with structure.",
        duration: '~25–30 min',
        firstActionCTA:
          'Copy the 8-slide structure template below, fill [Topic] and [Audience], run AI – get your plan.',
        preCopyCheckBlock: {
          question: 'What must you include in the brief before generating the presentation?',
          options: [
            'Only topic and title',
            'Topic + audience + goal + number of slides + tone/format',
            'Only tool choice',
            'Only visual style',
          ],
          correct: 1,
          explanation:
            'A full brief (topic, audience, goal, scope, tone) lets AI generate structure quickly and accurately. Without it, AI guesses.',
        },
        artifactDownload: {
          filename: 'presentation-8-slide-template.txt',
          source: 'copyable',
          sectionHeading: '8-slide structure',
        },
        sections: [
          {
            heading: '1️⃣ In short (30 s)',
            body: '**Process:** Brief → storyline (next slide) → 8-slide structure → content → QC. Start with brief and structure – copy the template below.',
            blockVariant: 'accent',
          },
          {
            heading: '2️⃣ Do it now (2–5 min)',
            body: '**What to do:** Copy the 8-slide structure template below. Fill [Topic] and [Audience], run AI. **Result:** 8-slide plan. Next – storyline, then full content and tools.',
            blockVariant: 'brand',
          },
          {
            heading: '8-slide structure',
            body: 'Copy this structure into AI or your tool – each line = one slide.',
            copyable:
              '1. Problem / context\n2. Why it matters now\n3. Solution idea\n4. How it works (simply)\n5. Example / use case\n6. Benefits / results\n7. Risks / limits\n8. What to do next (CTA)',
          },
          {
            heading: '🔽 Master prompt (structure only)',
            body: 'Asks only for structure – not full content. Fill [Your text], copy into AI. The full 6-block content prompt is on \"Full content and tools\".',
            copyable: MASTER_EN,
            blockVariant: 'terms',
            collapsible: true,
            collapsedByDefault: true,
          },
          {
            heading: '🔽 Process diagram',
            image: 'di_prezentacijos_workflow',
            body: 'Click a step on the diagram – explanation below. The same process works with any tool.',
            blockVariant: 'terms',
            collapsible: true,
            collapsedByDefault: true,
          },
        ],
        footer: 'Next – slide 3: Storyline – decision and 3 arguments',
      },
    },
    {
      id: 47.2,
      title: 'Storyline – decision and 3 arguments',
      shortTitle: 'Storyline',
      subtitle: 'Titles = assertions; governing thought before detail',
      type: 'content-block',
      content: {
        whyBenefit:
          'Without a storyline AI gives “about the topic” slides. With a storyline – an argument you can present.',
        firstActionCTA:
          'Copy the storyline prompt below, fill in the decision and 3 arguments, run AI.',
        sections: [
          {
            heading: '1️⃣ In short',
            body: '**Storyline:** (1) what the audience must decide, (2) 3 arguments, (3) CTA. Titles = **assertions**, not topic labels.',
            blockVariant: 'accent',
          },
          {
            heading: '2️⃣ Do it now',
            body: 'Copy the prompt below. If you already have an 8-slide structure – rewrite titles into assertions using the storyline.',
            blockVariant: 'brand',
          },
          {
            heading: 'Topic title vs assertion title',
            body: '| Weak (topic) | Strong (assertion) |\n| --- | --- |\n| About the Q3 budget | Prioritize X over Y in Q3 |\n| Risks | Without a 2-week buffer we will slip |\n| Next steps | Approve the pilot by Friday |',
            blockVariant: 'terms',
          },
          {
            heading: 'Copyable storyline prompt',
            body: 'Fill [Your text], run AI – get a governing thought, 3 arguments and a CTA.',
            copyable: STORYLINE_PROMPT_EN,
            blockVariant: 'brand',
          },
          {
            heading: '3️⃣ Check',
            body: 'Is it clear what the audience must decide? Do 3 arguments support that decision? Do titles sound like assertions?',
            blockVariant: 'accent',
          },
        ],
        footer: 'Next – slide 4: Full content and tools',
      },
    },
    {
      id: 47.5,
      title: 'Full content and tools – paste into slides',
      subtitle: '6-block prompt + tool tree (3 paths)',
      type: 'content-block',
      content: {
        sections: [
          {
            heading: '1️⃣ In short (30 s)',
            body: 'You generate content with AI. Then pick **one** path for slides. Recommended today: AI text → **Gamma**.',
            blockVariant: 'accent',
          },
          {
            heading: '2️⃣ Do it now (5–15 min)',
            body: '**What to do:** Copy the 6-block prompt below, fill [Topic]/[Audience], run AI. Paste into your chosen tool.',
            blockVariant: 'brand',
          },
          {
            heading: 'Prompt for full content (6 blocks) – only full version',
            body: 'Follows the Module 1 system. Fill [Your text], copy – then paste into a tool using the tree below.',
            copyable: FULL_6_BLOCK_EN,
            blockVariant: 'brand',
          },
          {
            heading: 'Tool tree – 3 paths',
            body: '**1. Recommended today:** AI (ChatGPT / Claude) → **Gamma** – fast draft.\n**2. Office ecosystem:** Copilot / PowerPoint – if you work in Microsoft.\n**3. Visual templates:** Canva – if you need quick visuals.\n\nA good prompt and clear structure = 80% of the presentation. The tool is just the format.',
            blockVariant: 'brand',
            presentationToolsBlock: true,
            presentationTools: [
              {
                name: 'Gamma (recommended)',
                url: 'https://gamma.app',
                forWhom: 'AI text → slides. Fast draft.',
              },
              {
                name: 'Copilot',
                url: 'https://copilot.microsoft.com',
                forWhom: 'Office / PowerPoint ecosystem',
              },
              {
                name: 'Canva',
                url: 'https://www.canva.com',
                forWhom: 'Visual templates, Magic Write',
              },
            ],
          },
          {
            heading: '1. First: AI – structure and content',
            body: 'Create content in ChatGPT, Claude or Gemini. Copy the 6-block prompt above.',
            blockVariant: 'brand',
            presentationToolsBlock: true,
            presentationTools: [
              {
                name: 'ChatGPT',
                url: 'https://chat.openai.com',
                forWhom: 'Quick draft, text, structure',
              },
              {
                name: 'Claude',
                url: 'https://claude.ai',
                forWhom: 'Longer texts, structure, editing',
              },
              {
                name: 'Gemini',
                url: 'https://gemini.google.com',
                forWhom: 'Research, documents, Google ecosystem',
              },
            ],
          },
          {
            heading: '🔽 Other tools',
            body: 'If Gamma / Copilot / Canva do not fit – these options.',
            blockVariant: 'terms',
            collapsible: true,
            collapsedByDefault: true,
            presentationToolsBlock: true,
            presentationTools: [
              {
                name: 'SlidesAI',
                url: 'https://www.slidesai.io',
                forWhom: 'Text → slides. Google Slides.',
              },
              {
                name: 'Prezent.ai',
                url: 'https://prezent.ai',
                forWhom: 'Business – brand, Story Builder.',
              },
              {
                name: 'Visme',
                url: 'https://www.visme.co',
                forWhom: 'Reports – infographics, interactivity.',
              },
              {
                name: 'Beautiful.ai',
                url: 'https://www.beautiful.ai',
                forWhom: 'Smart templates, auto-layout.',
              },
            ],
          },
          {
            heading: 'Bottom line',
            body: '**A good prompt and clear structure = 80% of the presentation.** The tool is just the slide format.',
            blockVariant: 'brand',
          },
        ],
        footer: 'Next – slide 5: Sprint',
      },
    },
    {
      id: 510,
      title: 'Sprint: Brief, structure, slides',
      shortTitle: 'Sprint',
      subtitle: 'Brief → structure → slides. One template, one result.',
      type: 'content-block',
      content: {
        briefCheckBlock: {
          question: 'Is this brief complete? "Topic: GDP trends. Audience: leadership."',
          options: [
            'Yes – we have topic and audience',
            'No – missing goal, number of slides, tone',
            'No – only visual style is missing',
            'Yes – topic alone is enough',
          ],
          correct: 1,
          explanation:
            'A full brief includes: topic, audience, goal, scope (number of slides) and tone. Without it AI guesses.',
        },
        sections: [
          {
            heading: '1️⃣ In short (30 s)',
            body: '**Why it is worth it:** One template gives an 8-slide structure + 1 fully prepared slide + QC. This is a draft, not polish.',
            blockVariant: 'accent',
          },
          {
            heading: '2️⃣ Do it now (2–15 min)',
            body: '**What to do:** Copy the sprint template below, fill [Topic], [Audience], [Goal], run AI. **What you get:** 8-slide structure + full content for slide 3 + 6-point quality check.',
            blockVariant: 'emerald',
          },
          {
            heading: '3️⃣ Copyable template',
            body: 'Copy the template below, fill [your topic], [your audience] and run AI.',
            blockVariant: 'terms',
          },
          {
            heading: '🔽 Sprint timeline (guide)',
            body: '0–3 min: brief + storyline direction.\n3–8 min: 8-slide structure (assertion + 2 bullets).\n8–14 min: full content / 2 heavy slides.\n14–18 min: paste into a tool (polish optional).\n18–22 min: QC (next slide) + soft proof.',
            collapsible: true,
            collapsedByDefault: true,
          },
          {
            heading: '4️⃣ Soft proof – check yourself before the mini quiz',
            body: 'This is a draft, not final polish. Check yourself:\n• I ran AI with brief / storyline\n• I have 8 titles (ideally assertions)\n• I did a quick QC (or the next slide – QC lab)',
            blockVariant: 'accent',
          },
        ],
        footer: 'Next – slide 6: QC lab',
        practicalTask: {
          templateLabel: '📋 Sprint template (copy-paste)',
          template: SPRINT_TEMPLATE_EN,
        },
      },
    },
    {
      id: 510.5,
      title: 'QC lab – weak vs strong draft',
      shortTitle: 'QC lab',
      subtitle: 'Human quality check before you send',
      type: 'content-block',
      content: {
        whyBenefit:
          'An AI draft looks finished before it is accurate. QC is your stop before publishing.',
        firstActionCTA:
          'Read the weak fragment, then the strong one. Copy the QC checklist onto your draft.',
        sections: [
          {
            heading: '1️⃣ In short',
            body: '**6 points:** clarity · audience · structure · facts/assumptions · titles = assertions · clear CTA. If facts matter – use the Hallucinations help card.',
            blockVariant: 'accent',
          },
          {
            heading: '🔽 Weak fragment',
            body: '**Title:** About exports\n• Many interesting trends and numbers about the market in recent years with various aspects\n• Important to talk about opportunities\n• Also risks and a few more thoughts\n*(No CTA, title is a topic, bullets too long, numbers missing / "made up".)*',
            blockVariant: 'terms',
            collapsible: true,
            collapsedByDefault: false,
          },
          {
            heading: '🔽 Strong fragment',
            body: '**Title:** Export +12% – prioritize 3 markets\n• Export +12% YoY (source: [add])\n• Top 3 markets drive 60% of volume\n**CTA slide:** Approve a Baltic pilot by Q3.',
            blockVariant: 'brand',
            collapsible: true,
            collapsedByDefault: false,
          },
          {
            heading: '2️⃣ Do it now',
            body: 'Paste your 1 slide into AI with this prompt, or mark the 6 points yourself.',
            copyable: `Check this slide against 6 points. For each: Yes / No + 1 sentence how to fix.

1) Clarity 2) Audience 3) Structure 4) Facts vs assumptions 5) Title = assertion 6) CTA (if this is the last / action slide)

SLIDE:
[paste]`,
            blockVariant: 'brand',
          },
          {
            heading: '3️⃣ Check',
            body: 'Is the title an assertion? Are there no "made-up" facts unmarked? If facts are shaky – open the **Hallucinations** help card (next slide).',
            blockVariant: 'accent',
          },
        ],
        footer: 'Next – slide 7: Help cards',
      },
    },
    {
      id: 515,
      title: 'Help cards (when you need them)',
      subtitle: 'RAG, tokens, manipulation, hallucinations – only when needed',
      type: 'content-block',
      content: {
        displayMode: 'tabs',
        sections: [
          {
            heading: 'How to use',
            body: '**When needed:** if you get stuck during the sprint or QC – pick a situation below and copy the template. After the QC lab – the Hallucinations card is especially useful.',
          },
          {
            heading: 'RAG: when the answer must cite sources',
            body: 'Use when the presentation has facts/figures and you want AI to separate sources vs assumptions.',
            copyable:
              'Work only with the information I provide (below). If information is insufficient – say "I don\'t know" and state what\'s missing.\n\nTask: prepare 1 slide about [TOPIC].\nFormat: Title + 2 bullets + "Sources" (1–3 points).\nRule: link each fact to a source (e.g. [Source 1]).\n\nCONTEXT/SOURCES:\n[paste 1–3 source excerpts]\n',
            blockVariant: 'brand',
          },
          {
            heading: 'Tokens: when context doesn\'t fit',
            body: 'Use when you have a lot of text/sources and AI starts forgetting earlier information.',
            copyable:
              'I will paste a long text. Your task – compress it into a "context capsule" that fits the prompt.\n\n1) Extract 10–15 key facts (max 1 sentence each).\n2) Build a 6–8 key-term glossary (term → 1 line).\n3) Give 3 questions that must be answered for the presentation to be accurate.\n\nReturn as:\nCONTEXT_CAPSULE:\n- Facts: ...\n- Terms: ...\n- Missing questions: ...\n',
            blockVariant: 'terms',
          },
          {
            heading: 'Manipulation: when the question is biased / you want neutral',
            body: 'Use when you catch yourself asking "prove that…" and want objective content.',
            copyable:
              'Rewrite my request into 2 versions:\nA) Neutral (no bias, both sides)\nB) Business (persuasive), but ethical (no made-up facts)\n\nThen generate 1 slide from the neutral version: title + 2 bullets + 1 "risk/counterargument".\n\nMY REQUEST:\n[paste]\n',
            blockVariant: 'default',
          },
          {
            heading: 'Hallucinations: when you need reliability',
            body: 'Use when AI gives convincing facts but you want a quick stop. Fits after the QC lab.',
            copyable:
              'Reliability check.\n\n1) List all statements that sound like facts (max 10).\n2) For each: mark (A) has a source in my context / (B) no source.\n3) If (B) – rewrite as an assumption or suggest what source is needed.\n\nThen give a corrected slide: title + 2 bullets + "What\'s unclear / what to check".\n\nTEXT/SLIDE:\n[paste]\n',
            blockVariant: 'accent',
          },
        ],
        footer: 'Next – slide 8: Warm-up check',
      },
    },
    {
      id: 511,
      title: 'Warm-up check',
      subtitle: 'Practice questions before the mini quiz – not counted in the score',
      type: 'warm-up-quiz',
      content: {
        questions: [
          {
            id: 'm5-warm-1',
            question: 'What is a "brief" in the presentation sprint?',
            options: [
              'A short description: topic, audience, goal – what AI uses to generate structure and content',
              'Only the number of slides',
              'Only tool choice',
              'Only the quality-check list',
            ],
            correct: 0,
            explanation:
              'A brief orients AI: topic, audience, expected result. A good brief reduces back-and-forth.',
          },
          {
            id: 'm5-warm-2',
            question: 'Why does an 8-slide structure help?',
            options: [
              'It gives a clear framework – AI and the tool know what to build; less guessing',
              'Because 8 slides is the maximum',
              'Because only Gamma accepts 8 slides',
              'Because the quiz requires exactly 8 slides',
            ],
            correct: 0,
            explanation: 'Structure is a map for AI and you. Less guessing, more repeatable results.',
          },
          {
            id: 'm5-warm-3',
            question: 'What do you check in the quality-check step?',
            options: [
              'Whether content matches the brief, no errors, slides are clear and consistent',
              'Only whether the tool saves the file',
              'Only whether the slide count is correct',
              'Only whether AI answered quickly',
            ],
            correct: 0,
            explanation:
              'Quality check – goals (brief), factual errors, clear structure. Last step before sharing.',
          },
          {
            id: 'm5-warm-4',
            question: 'How is a storyline different from "just a list of 8 topics"?',
            options: [
              'A storyline has a decision, 3 arguments and a CTA; titles = assertions',
              'A storyline means more animations',
              'A storyline only works in Gamma',
              'A storyline replaces the brief',
            ],
            correct: 0,
            explanation:
              'A storyline gives a governing thought and arguments. A topic list without a decision stays generic.',
          },
        ],
      },
    },
    {
      id: 512,
      title: 'Mini quiz after the sprint',
      subtitle: 'Questions on brief, storyline, structure, tool and quality check',
      type: 'test-intro',
      content: {
        introTitle: 'Mini quiz after the presentation sprint',
        introBody:
          'You just did the **presentation sprint** (brief, storyline, draft, QC). This mini quiz checks the essentials: brief, storyline, structure, tool choice and a quick quality check.',
        microWinPhrase:
          "If you've already done the sprint and QC – you're ready. This quiz reinforces what you learned.",
        thresholdsText:
          'Score **≥70%** – recommended to move to Module 6 (practice). Score **<70%** – retake the mini quiz and review the sprint, storyline and QC lab. You can still continue if you prefer.',
        ctaLabel: 'Start mini quiz',
      },
    },
    {
      id: 513,
      title: 'Sprint knowledge check',
      subtitle: 'Check that you understood the sprint logic',
      type: 'test-section',
      testQuestions: [
        {
          id: 'm5-sprint-q1',
          type: 'scenario',
          scenarioContext:
            'You\'re about to create a presentation draft on "Export trends 2024". Before starting – what must you tell AI?',
          question: 'What should you include in the brief?',
          options: [
            'Topic + audience + goal + number of slides + tone/format',
            'Only topic and title',
            'Only tool choice',
            'Only visual style',
          ],
          correct: 0,
          explanation:
            'Without a brief AI guesses. Topic, audience, goal, scope and format give a predictable result.',
          ifWrongSee: {
            moduleId: 5,
            slideId: 47,
            label: 'What is the 15 min sprint',
          },
        },
        {
          id: 'm5-sprint-q2',
          question: 'What to do if the presentation turns out too long or messy?',
          options: [
            'Tighten the format (e.g. 8 slides, 2 bullets), clearly state structure and limits',
            'Ask "write it better" with no limits',
            'Add more context without structure',
            'Always switch to another tool',
          ],
          correct: 0,
          explanation:
            'Structure and clear limits are the biggest lever. Usually tighten the format – do not switch tools.',
          ifWrongSee: {
            moduleId: 5,
            slideId: 47.5,
            label: 'Full content and tools',
          },
        },
        {
          id: 'm5-sprint-q3',
          question: 'What is a quick quality check before sending the presentation?',
          options: [
            'Is the goal and audience clear, is the structure logical, are there no "made-up" facts (if needed – ask for sources / mark assumptions)',
            'Is the text very long and detailed',
            'Are there as many animations as possible',
            'Does the presentation use only English terms',
          ],
          correct: 0,
          explanation:
            'Quality = a minimal stop before publishing: clarity, audience, structure and fact reliability.',
          ifWrongSee: {
            moduleId: 5,
            slideId: 510.5,
            label: 'QC lab',
          },
        },
        {
          id: 'm5-sprint-q4',
          question: 'Which tool choice makes most sense for a presentation draft?',
          options: [
            'Presentation generator (e.g. Gamma) or AI (ChatGPT/Claude) with clear structure and template',
            'Only a text editor (Word) without AI',
            'Only an image generator',
            'No difference – any tool gives the same result',
          ],
          correct: 0,
          explanation:
            'The tool matters, but the biggest lever is prompt structure and a clear brief.',
          ifWrongSee: {
            moduleId: 5,
            slideId: 47.5,
            label: 'Full content and tools',
          },
        },
        {
          id: 'm5-sprint-q5',
          type: 'scenario',
          scenarioContext:
            'You got 8 slides: titles "About the product", "Market", "Next steps"; 5-line bullets; a 47% figure with no source; no CTA.',
          question: 'What is the best first step?',
          options: [
            'Rescue: assertion titles, max 2 bullets, mark assumptions, add a CTA',
            'Switch tools without changing the content',
            'Ask for even longer text',
            'Delete all slides and start with no brief',
          ],
          correct: 0,
          explanation:
            'A messy deck is fixed with structure and QC, not a new tool. The rescue prompt is on the bonus slide after results.',
          ifWrongSee: {
            moduleId: 5,
            slideId: 516,
            label: 'Bonus: Fix a messy deck',
          },
        },
      ],
    },
    {
      id: 514,
      title: 'Quiz results',
      subtitle: 'Next – module wrap-up and practice (Module 6)',
      type: 'test-results',
      content: {
        passedTitle: 'Congratulations!',
        passedMessage:
          'Score **[X]%**. You have a working presentation structure, a storyline direction and understand the sprint logic – you can move to Module 6 practice.',
        thresholdExplanation:
          '≥70% means: you understand brief, storyline, structure and quality check – you can move to the project (Module 6). Below 70% – review the sprint and the slides listed below.',
        useCaseBlock:
          'Use the same sprint template for another presentation – team meeting, pitch or report. Brief + storyline + 8 slides + quality check.',
        passedCtaLabel: 'Continue to module wrap-up',
        failedTitle: 'Score [X]%',
        failedMessage:
          'We recommend retaking the mini quiz first. If things are still unclear, review the slides listed below. You can still continue to the module wrap-up if you prefer.',
        failedCtaRetry: 'Retry the mini quiz',
        failedCtaContinue: 'Continue to module wrap-up anyway',
        failedCtaReview: 'Review Module 4',
        handoutDownloadLabel: 'Download Module 5 handout (PDF)',
      },
    },
    {
      id: 516,
      title: 'Bonus: Fix a messy deck',
      shortTitle: 'Rescue',
      subtitle: 'Rescue prompt – when the draft is long, has no CTA and weak titles',
      type: 'content-block',
      optional: true,
      badgeVariant: 'bonus',
      content: {
        whyBenefit:
          'You passed the mini quiz – bonus: how to rescue a weak AI draft without switching tools.',
        sections: [
          {
            heading: '1️⃣ In short',
            body: 'A messy deck = weak titles, long bullets, no CTA, unsourced numbers. Rescue = tighten format and storyline, not "write it better".',
            blockVariant: 'accent',
          },
          {
            heading: '2️⃣ Do it now',
            body: 'Paste a weak draft (or invent one) into the prompt below and run AI.',
            blockVariant: 'brand',
          },
          {
            heading: 'Copyable rescue prompt',
            body: 'Copy, paste your draft instead of [paste].',
            copyable: RESCUE_PROMPT_EN,
            blockVariant: 'terms',
          },
          {
            heading: '3️⃣ Check',
            body: 'Did titles become assertions? Bullets ≤2? Is there a CTA? Are numbers sourced or marked as assumptions?',
            blockVariant: 'accent',
          },
        ],
        footer: 'You can return to module wrap-up or start Module 6.',
      },
    },
  ];
}

function patchModule(fileRel, slides, meta) {
  const filePath = path.join(root, fileRel);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const modules = data.modules ?? data;
  const m5 = (Array.isArray(modules) ? modules : data.modules).find((m) => m.id === 5);
  if (!m5) throw new Error(`M5 missing in ${fileRel}`);
  Object.assign(m5, meta);
  m5.slides = slides;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Patched ${fileRel}: slides=${m5.slides.map((s) => s.id).join(',')}`);
}

patchModule('src/data/modules.json', buildLtSlides(), {
  title: 'Prezentacijos sprintas',
  subtitle: 'Sprintas + mini testas: brief → storyline → draftas → QC',
  description:
    'Prezentacijos draftas + mini testas. Brief → storyline → skaidrės. ≥70% prieš Modulį 6.',
  duration: '25–30 min',
  level: 'test',
  icon: 'ClipboardCheck',
  accent: 'cyan',
  identityIcon: 'ClipboardCheck',
  businessExamples: [
    { title: 'Prezentacijos sprintas', description: 'Draftas su brief, storyline ir QC' },
    { title: 'Mini testas', description: 'Brief + storyline + kokybės patikra' },
  ],
});

patchModule('src/data/modules-en-m4-m6.json', buildEnSlides(), {
  title: 'Presentation sprint',
  subtitle: 'Sprint + mini quiz: brief → storyline → draft → QC',
  description:
    'Presentation draft + mini quiz. Brief → storyline → slides. ≥70% before Module 6.',
  duration: '25–30 min',
  level: 'test',
  icon: 'ClipboardCheck',
});

// Handout
const handoutPath = path.join(root, 'src/data/m5HandoutContent.json');
const handout = {
  title: 'Modulio 5 atmintinė. Prezentacijos sprintas.',
  subtitle: 'Brief → storyline → draftas → QC (25–30 min)',
  toolsIntro:
    'DI (struktūra ir turinys): ChatGPT, Claude, Gemini. Įrankio medis: Gamma (rekomenduojama) · Copilot/Office · Canva. Kiti – pagal poreikį.',
  toolsBullets: [
    'ChatGPT, Claude, Gemini – struktūra ir turinys',
    'Gamma (rekomenduojama) / Copilot / Canva – skaidrių formatas',
  ],
  structure8:
    '1. Problema / kontekstas\n2. Kodėl tai svarbu dabar\n3. Sprendimo idėja\n4. Kaip tai veikia (paprastai)\n5. Pavyzdys / use case\n6. Nauda / rezultatai\n7. Rizikos / ribos\n8. Ką daryti toliau (CTA)',
  masterPrompt: MASTER_LT,
  fullPromptPrinciple:
    'META + INPUT + OUTPUT + REASONING + QUALITY + ADVANCED. Storyline: sprendimas + 3 argumentai + CTA; antraštės = teiginiai.',
  sequenceSteps: [
    'Brief – tema, auditorija, tikslas, skaidrių skaičius, tonas',
    'Storyline – sprendimas, 3 argumentai, CTA',
    'Struktūra – 8 skaidrių planas (teiginys + 2 bullet)',
    'Turinys – DI → įrankis (Gamma / Copilot / Canva)',
    'QC – 6 punktai + soft proof',
  ],
  briefDefinition:
    'Brief – orientacija DI: tema, auditorija, tikslas, skaidrių skaičius, tonas/formatas. Storyline papildo: ką auditorija turi nuspręsti.',
  qualityCheckPoints: [
    'Ar aiškus tikslas?',
    'Ar atitinka auditoriją?',
    'Ar logiška struktūra?',
    'Ar nėra „išgalvotų“ faktų? (šaltiniai arba prielaidos)',
    'Ar antraštės = teiginiai (ne temos)?',
    'Ar CTA aiškus?',
  ],
  thresholdsExplanation:
    '≥70% – supranti brief, storyline, struktūrą ir kokybės patikrą; gali pereiti prie Modulio 6. Mažiau – peržiūrėk sprintą, QC lab ir nurodytas skaidres.',
  footerText: 'Promptų anatomija – promptų struktūros mokymas. © Kurso medžiaga.',
};
fs.writeFileSync(handoutPath, JSON.stringify(handout, null, 2) + '\n', 'utf8');
console.log('Patched m5HandoutContent.json');
