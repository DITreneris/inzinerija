# UX auditas – micro-UX patobulinimai (Promptų anatomija)

> **Paskirtis:** Gili UX/UI analizė kaip moderniai SaaS mokymų platformai. Fokusas – skaitomumas, dėmesio išlaikymas, mokymosi įtraukimas, interakcija su turiniu ir premium SaaS pojūtis.  
> **Apimtis:** Moduliai 1–6, LT/EN, komponentai, tipografija, spalvos, navigacija.  
> **Apribojimai:** Nekeičiamas mokymų turinys ir metodika – tik UX/UI optimizacija.  
> **Versija:** 1.0 | **Data:** 2026-03-11

---

## 1. Greita sistemos diagnozė

**3–5 svarbiausios UX problemos, kurios trukdo mokytis arba mažina įtraukimą:**

| #   | Problema                                                                                                                                                                                                                                                                                                                              | Poveikis                                                         |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 1   | **Navigacijos ir progreso informacijos išsibarstymas** – skaidrės numeris viršuje, Atgal/Pirmyn juosta, slide dots ir modulių taškai apačioje – vartotojas netenka aiškaus „kur esu“ ir „kiek liko“. Ilguose moduliuose (M4 ~41 skaidrė) slide dots reikalauja horizontalaus scroll.                                                  | Prarandama orientacija; didesnė kognityvinė apkrova.             |
| 2   | **Ilgų skaidrių trintis** – kai turinys ilgas (content-block su keliais blokais), Pirmyn/Atgal yra virš turinio (sticky), o ilgame skaidrėje vartotojas turi scrollinti žemyn, kad rastų CTA arba „Kopijuoti“. Sticky bar užima vietą ir „slėpia“ turinį.                                                                             | Mažesnis „daryk dabar“ impulsas; vartotojas gali nepasiekti CTA. |
| 3   | **Vizualinė hierarchija ir „vienos eilutės“ principas** – Donato ir V1 feedback: „per daug spalvų“, „per daug informacijos“, „neintuityvu“. Kortelėse (ModulesPage) daug badge'ų (Modulis N, Learn/Test/Practice, Rekomenduojama, Baigta), aprašymas + progreso juosta + pavyzdžiai – vienu žvilgsniu sunku suvokti, kas svarbiausia. | Sumažėjęs skenuojamumas ir pasitikėjimas.                        |
| 4   | **Skaitomumo ribos** – body tekstas daugelyje vietų `text-sm`; eilučių ilgis ne visur ribojamas (max-w); kai kur lietuviški ilgi žodžiai gali lūžti neoptimaliai. Line-height ir paragraph spacing nėra visur vienodas (design tokens naudojami dalinai).                                                                             | Pavargsta skaityti; mažesnis įsisavinimas.                       |
| 5   | **Mobilioji patirtis** – bottom nav fiksuota, bet skaidrės turinys gali būti ilgas; spacer h-20 padaro tai, kad po paskutinio bloko lieka „tuščia“ vieta. Slide dots mobiliajame – daug taškų, reikia slinkti. Nėra aiškaus „mini“ progreso (pvz. 5/41) visada matomo viršuje.                                                        | Didesnė trintis mobile; prarandama motyvacija.                   |

---

## 2. Kognityvinės apkrovos analizė

**Kur vartotojas pavargsta, pasimeta arba praranda motyvaciją:**

- **Pavargsta skaityti:** Ilgos content-block skaidrės su keliais sekcijų blokais (Trumpai → Daryk dabar → Copy → Patikra → Optional) be tarpų tarp „kvėpavimo“ – viena blokų siena. Mažas body (`text-sm`) ilgose pastraipose. Lentelėse (LENTELIU_STANDARTAS) – jei per daug eilučių, skenuojamumas krenta.
- **Pasimeta struktūroje:** Modulio kontekstas („Modulis 4“, „Skaidrė 12/41“) ir fazių juosta (SlideGroupProgressBar) rodomi žemiau turinio; pirmas žvilgsnis – antraštė ir sticky nav. Nėra „breadcrumb“ tipo „Modulis 4 → Skyrius 4.2 → Skaidrė 12“. Ilguose moduliuose slide dots – daug taškų, sunku įvertinti „kiek dar“.
- **Praranda motyvaciję:** Mažai momentinių „laimėjimų“ – celebration tik po modulio/užduoties; nėra trumpų pozityvių patvirtinimų (pvz. „Šiai skaidrei peržiūrėta“ tick). Rekomenduojamo modulio žiedas (ring-accent) gali būti nepakankamai akcentuotas, ypač dark režime. Completion ekrane (ModuleCompleteScreen) – daug informacijos vienu metu (statistikos, CTA, sertifikatas, „Kur pritaikyti?“).

---

## 3. Micro-UX patobulinimai (low hanging fruits)

Kiekvienam punktui: **PROBLEMA** → **KODĖL** → **SPRENDIMAS** → **NUMATOMA NAUDA**.

| #   | PROBLEMA                                                                                          | KODĖL tai problema                                                                                               | SPRENDIMAS                                                                                                                                                        | NUMATOMA NAUDA                                     |
| --- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 1   | Skaidrės body tekstas daugelyje vietų per mažas (`text-sm`)                                       | Ilgas skaitymas mažu šriftu didina akų įtampą ir mažina įsisavinimą                                              | Content-block ir panašiose sekcijose body naudoti `text-base` (GOLDEN_STANDARD body), o `text-sm` tik etiketėms ir šalutiniam tekstui                             | Geresnis skaitomumas, mažesnė akų įtampa           |
| 2   | Eilučių ilgis neribojamas – plačiame ekrane viena eilutė per ilga                                 | Optimalus skaitomumas 45–75 simboliai eilutėje                                                                   | Body blokuose pridėti `max-w-prose` (arba ~65ch) ir `mx-auto` ten, kur vienas stulpelis teksto                                                                    | Mažesnė kognityvinė apkrova, lengviau sekti eilutę |
| 3   | Tarpai tarp sekcijų skaidrėje nenuoseklūs                                                         | GOLDEN_STANDARD rekomenduoja space-y-6; kai kur gap mažesnis arba didesnis be logikos                            | Naudoti design-tokens: `space-y-6` tarp blokų, `mb-6` antraštė→turinys; 8pt grid (16, 24, 32 px)                                                                  | Vizualus „kvėpavimas“, aiškesnė hierarchija        |
| 4   | Callout / info blokai vizualiai neparyškinti                                                      | Accent ir brand blokai turi border-l-4, bet kai kur border per plonas arba kontrastas silpnas                    | Standartizuoti: accent CTA – `border-l-4 border-accent-500`, brand – `border-l-4 border-l-brand-500`, terms – `border-slate-400`; pakankamas padding `p-4 md:p-5` | Greitesnis skenuojamumas, aiškesnė semantika       |
| 5   | CTA mygtukai skaidrėse kartais konkuruoja su antriniais veiksmais                                 | „Vienos eilutės“ principas reikalauja vieno dominuojančio CTA                                                    | Pagrindinis CTA – `btn-primary` arba accent; antriniai („Peržiūrėti“, „Paslėpti“) – `btn-secondary` arba tekstinė nuoroda, mažesnis                               | Mažesnis sprendimų paralyžius, aiškesnis kelias    |
| 6   | Modulių puslapyje kortelėse per daug vizualinių elementų vienu metu                               | Badge (Learn/Test/Practice), Modulis N, Rekomenduojama, Baigta, aprašymas, progreso juosta, pavyzdžiai, mygtukas | Sumažinti: vienas ryškiausias elementas – CTA mygtukas; progreso juosta subtilesnė; badge'ai viena eilute, max 2–3                                                | Kortelė skenuojama greičiau, mažesnis triukšmas    |
| 7   | Skaidrės navigacijoje nėra „mini“ progreso viršuje (visada matomo)                                | Vartotojas nori žinoti „12/41“ be scroll iki apačios                                                             | Sticky juostoje (virš turinio) palikti arba pridėti kompaktinį „Skaidrė 12/41“ su optional mini progress bar (linija)                                             | Nuolatinis orientacijos jausmas                    |
| 8   | Slide dots ilguose moduliuose reikalauja horizontalaus scroll be vizualios „uodegos“              | Neaišku, kad yra daugiau taškų dešinėje                                                                          | Pridėti švelnų gradient fade dešinėje (mask arba overlay), kad būtų aišku „yra daugiau“; arba „12 / 41“ prie taškų                                                | Mažesnė frustracija, aiškesnė navigacija           |
| 9   | Sticky nav bar užima vertikalią vietą – ilgose skaidrėse turinys „po juo“                         | Ypač mobile: mažas viewport, bar fiksuotas                                                                       | Sumažinti bar aukštį (py-2 vietoj py-3), arba padaryti „sutraukiamą“ po pirmo scroll (hide on scroll down, show on scroll up)                                     | Daugiau turinio matoma be scroll                   |
| 10  | Tarp blokų (content-block sekcijų) nėra vizualaus atskyrimo                                       | Visi blokai vienas po kito – sunku sustoti ir „kvėpuoti“                                                         | Tarp sekcijų naudoti `space-y-6`; optional labai švelnus separator (pvz. 1px border-t border-gray-100) po kiekvieno bloko                                         | Struktūra lengviau suvokiama                       |
| 11  | Footer „Toliau – skaidrė N“ kartais per ilgas (GOLDEN_STANDARD ≤55 simb.)                         | Ilgas tekstas laužo eilutę arba atrodo „sunkus“                                                                  | Naudoti shortTitle footeryje; sutrumpinti pavadinimus; validacija per FOOTER_NEXT_SLIDE_ANALIZE                                                                   | Tvarkingesnis apačios blokas, viena eilutė         |
| 12  | Kontrastas tamsiame režime – kai kur pilkas ant pilko                                             | Dark mode: slate-400 ant slate-800 gali būti per mažas kontrastas                                                | Patikrinti WCAG AA: text-gray-400 ant bg-gray-800; pakelti į gray-300 arba paryškinti border                                                                      | Prieinamumas ir skaitomumas dark                   |
| 13  | Progress indikatoriai (CircularProgress, juostos) be animacijos atsiranda staigiai                | Staigus „šuolis“ gali atrodyti mechaniškai                                                                       | Naudoti `transition-all duration-500` progreso juostoms; CircularProgress jau turi transition                                                                     | Premium jausmas, mažesnis „šokas“                  |
| 14  | Modulių puslapyje „Rekomenduojama“ kortelė – tik ring, be papildomo vizualinio švytėjimo          | Kitas modulis gali „nugalėti“ dėmesį                                                                             | Pridėti labai švelnų pulse arba subtle shadow accent spalva (ring-2 ring-accent-500 jau yra); optional „Toliau“ label prie mygtuko                                | Aiškesnis „kur eiti toliau“                        |
| 15  | Home hero – daug teksto (badge, subline, subtitle, bonus) prieš CTA                               | Ilgas skaitymas prieš veiksmą – dalis vartotojų atsitrauks                                                       | Sutrumpinti subline/bonus; vienas „naudos“ sakinys + vienas CTA virš fold; likusį perkelti po CTA arba į accordion                                                | Greitesnis pirmas veiksmas                         |
| 16  | Kortelėse (ModulesPage) aprašymas line-clamp-3 – kartais nutraukia vidury sakinio                 | Estetiška ir semantinė neadekvatumas                                                                             | Riboti aprašymą iki 120 simbolių (SOT); jei reikia, pabaigti tašku ir „…“ tik jei tikrai sutrumpinta                                                              | Profesionalesnis vaizdas                           |
| 17  | Quiz / testo rezultatų ekrane pirmas klaidingas atsakymas – scroll jau įgyvendintas (TEST_REPORT) | Patikrinti, ar vizualiai paryškintas                                                                             | Užtikrinti, kad pirmas klaidingas blokas turi id=quiz-first-wrong ir scroll; optional accent border-left                                                          | Mažesnė „pražiopsa“, geresnė remediacija           |
| 18  | Section-break / celebration skaidrėse – daug blokų (recap, next steps, footer, spinoff)           | Vienoje skaidrėje daug informacijos – kognityvinė apkrova                                                        | Vizualiai sustiprinti vieną hero bloką; kitus padaryti kompaktiškesnius (sąrašai su kairiuoju accentu); GOLDEN_STANDARD §3.4b                                     | Aiškesnė hierarchija, „kvėpavimas“                 |
| 19  | Tipografija – H2/H3 skaidrėse kartais per panaši į body                                           | Skirtumas tarp heading ir body per mažas                                                                         | H2: `text-lg md:text-xl font-bold`; H3: `text-base font-semibold`; body: `text-sm md:text-base`; GOLDEN_STANDARD laikytis                                         | Skenuojamumas, hierarchija                         |
| 20  | Kopijuoti mygtukas (TemplateBlock) – ne visur pakankamai matomas                                  | CTA „Kopijuoti promptą“ turi būti vienas dominuojantis                                                           | Vienas „Kopijuoti“ mygtukas vienoje sekcijoje; pakankamas dydis (min-h 44px), accent arba brand                                                                   | Didesnis „daryk dabar“ atsakas                     |
| 21  | Mobilus bottom nav – mygtukai „Atgal“ / „Pirmyn“ vienodos vizualinės svorio                       | Pagrindinis veiksmas – „Pirmyn“; turi vizualiai dominuoti                                                        | „Pirmyn“ jau gradient ir didesnis; „Atgal“ palikti ghost; užtikrinti, kad disabled būsenoje aiškūs hint (jau yra)                                                 | Aiškesnė prioritetizacija                          |
| 22  | Lentelėse (content-block table) – pirmas stulpelis per siauras                                    | Etiketės suspaustos; GOLDEN_STANDARD/LENTELIU rekomenduoja min-width                                             | Pirmas stulpelis `min-w-[10rem] sm:w-40`; `align-top`; `py-3.5`; `leading-relaxed`                                                                                | Lentelių skaitomumas                               |
| 23  | Collapsible (Optional) – atidarytas būsenos vizualiai neparyškintas                               | Sunku matyti, kas atidaryta                                                                                      | Summary – `border-l-4` arba icon rotate; open būsenoje švelnus fonas (bg-slate-50 dark:bg-slate-800/30)                                                           | Mažesnė klaida „ar jau atidariau?“                 |
| 24  | Žodynėlis / Glossary – terminai be vizualios grupavimo pagal raidę ar temą                        | Ilgas sąrašas – sunku rasti                                                                                      | Optional: alphabet tabs arba „populiariausios“ viršuje; paieška jau naudinga – užtikrinti, kad matoma                                                             | Greitesnis paieškos rezultatas                     |
| 25  | Sertifikato / ModuleComplete ekrane daug CTA (Grįžti, Tęsti, Sertifikatas, Peržiūrėti santrauką)  | Kelios lygiavertės veiklos – paralyžius                                                                          | Vienas pagrindinis CTA („Tęsti į Modulį N“ arba „Parsisiųsti sertifikatą“); kiti – secondary arba nuorodos                                                        | „Vienos eilutės“ principas                         |
| 26  | Spalvų naudojimas – semantinių spalvų (emerald, rose, amber) daug skaidrėse                       | Donato feedback: per daug spalvų                                                                                 | Riboti 2–3 spalvas per skaidrę; brand + accent + viena semantinė (success/error); GOLDEN_STANDARD §2                                                              | Ramesnis, profesionalesnis vaizdas                 |
| 27  | Skaidrės H1 (pavadinimas) – kartais labai ilgas                                                   | Ilga antraštė užima daug vietos ir gali lūžti                                                                    | Naudoti shortTitle rodyme; H1 `leading-tight`; max 2 eilutės, po to truncate arba mažesnis šriftas                                                                | Tvarkingesnis header                               |
| 28  | Empty state / klaidos ekranai – generic                                                           | Pvz. modulis nepasiekiamas – tekstas ok, bet vizualiai „tuščias“                                                 | Pridėti ikoną (AlertTriangle arba Compass), švelnų foną (brand-50), vieną CTA                                                                                     | Pasitikėjimas ir aiškumas                          |
| 29  | Focus states – ne visur vienodi                                                                   | A11y reikalauja matomo focus                                                                                     | Naudoti `focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2` visiems interaktyviems; index.css jau \*:focus-visible                    | Prieinamumas klaviatūra                            |
| 30  | Modulių taškai (1–6) apačioje – tik desktop (hidden sm:flex)                                      | Mobile vartotojas nemato, kuriame modulyje yra                                                                   | Mobile: rodyti kompaktinę versiją (pvz. „M4“ badge) arba įtraukti į sticky juostą „Modulis 4 · 12/41“                                                             | Orientacija ir mobile                              |

---

## 4. Premium SaaS UI transformacija

**Pasiūlymai: spalvų sistema, gradientai, šešėliai, komponentų stilistika.**

- **Spalvų sistema:** Laikytis esamos brand (#627d98) ir accent (#d4a520); įvesti **neutralų skalę** fonams: `gray-50` (light) ir `gray-900` (dark) kaip pagrindą; kortelėms – baltas / gray-800 su **švelniu border** (border-gray-100 / border-gray-700). Semantinės spalvos – tik success (emerald), error (rose), warning (amber) ir **retai**.
- **Gradientai:** Naudoti **subtiliai** – hero CTA jau turi gradient; modulių kortelėse viršutinė juosta (h-1.5) – gradient; progress bar – gradient. Vengti gradientų ant kelių gretimų elementų vienoje skaidrėje.
- **Šešėlių sistema:** Vienas lygis – `shadow-md` pagrindiniams blokams; hover – `shadow-lg`; CTA – `shadow-brand-500/25`. Kortelėms – `shadow-md border border-gray-100`; hover `hover:shadow-lg hover:-translate-y-0.5`. **Nenaudoti** shadow-2xl keliuose elementuose.
- **UI komponentų stilistika:**
  - **Cards:** `rounded-2xl`, `shadow-md`, `border border-gray-100 dark:border-gray-700`; vidinis padding `p-4 md:p-6`.
  - **Callout blokai:** Kairysis border 4px (accent/brand/slate); `rounded-r-xl`; fonas `bg-*-50 dark:bg-*-900/20`.
  - **Progress bars:** Aukštis 8–10px; `rounded-full`; užpildymas – gradient + optional shimmer animacija (jau yra ModulesPage).
  - **Section dividers:** Vietoj storų linijų – `border-t border-gray-100 dark:border-gray-800` su `space-y-6` tarp sekcijų.
  - **Module navigation:** Modulių taškai – aktyvus brand, baigti emerald; slide dots – viena eilutė, horizontalus scroll, maži taškai ilgiems moduliams (36px touch).

**Tikslas:** Ramus, profesionalus vaizdas – „premium AI SaaS“ – be pertekliaus dekorų, su aiškia hierarchija ir vienu akcentu (CTA) per kontekstą.

---

## 5. Modulių UX patobulinimai

**Kiekvienam moduliui – 3–5 konkrečiai UX pataisymai.**

### Modulis 1 (Mokymas – 6 blokai, šablonas)

1. Pirmose skaidrėse (meta, input, output) – **„Kas čia?“** blokas viršuje (DefinitionsSlide contextIntro stilius) – sumažina disorientaciją.
2. Body tekstas blokuose – **text-base** ir **max-w-prose** ten, kur vienas stulpelis teksto.
3. PracticalTask – **vienas aiškus CTA** „Kopijuoti“ arba „Įvesti promptą“; antrinius veiksmus mažesniu šriftu arba nuoroda.
4. Santraukos skaidrė – 5 blokų modelis (GOLDEN_STANDARD §3.3): Celebration Hero → Žinių kortelės → Refleksijos promptas → Kitas žingsnis CTA → Motyvacinis footer; užtikrinti vizualią atkarpą tarp blokų (space-y-8).

### Modulis 2 (Žinių patikrinimas)

1. Test-intro – **whyBenefit** vienas sakinys; **firstActionCTA** – vienas žingsnis („Atsakyk į 15 klausimų“).
2. Klausimų rodinyje – **progreso juosta** virš klausimo (pvz. „5 / 15“) – visada matoma.
3. Rezultatų ekrane – **scroll į pirmą klaidingą** atsakymą (jau įgyvendinta); vizualiai paryškinti klaidingus atsakymus (border-left accent rose).
4. Grįžus į klausimą po remediacijos – **aiškus „Jūs atsakėte neteisingai“** su teisingu atsakymu ir paaiškinimu.

### Modulis 3 (Praktika – scenarijai)

1. Scenarijų hub – **vienas dominuojantis CTA** per scenarijų („Pradėti scenarijų 1“); kiti scenarijai – secondary.
2. Praktinėje skaidrėje – **„Kopijuoti promptą“** blokas virš CTA teksto („žemiau“) – kad vartotojas iš karto matytų, ką kopijuoti.
3. **Tęsti: [2–3 žodžiai]** (nextSlideContextLabel) – užtikrinti, kad visada rodomas (jau yra); mobile – matomas ir bottom nav mygtuke.
4. Santraukos nuoroda – **„Peržiūrėti 1 dalies santrauką“** (po M3) – vienas mygtukas, aiškiai pavadintas (jau įgyvendinta).

### Modulis 4 (Teorija – 6 blokai, RAG, tokenai)

1. Ilgas modulis (~41 skaidrė) – **slide dots** su horizontal scroll ir **fade dešinėje** („yra daugiau“); **sticky juostoje** „Skaidrė 12/41“ arba mini progress line.
2. Section-break skaidrėse – **vienas hero** (celebration); recap ir „Kas toliau“ – kompaktiški; spinoff mygtukas – accent border, Sparkles (GOLDEN_STANDARD §3.4b).
3. Content-block skaidrėse – **Trumpai (accent) → Daryk dabar (brand) → Copy → Patikra → Optional** – tarpai `space-y-6`; vienas „Kopijuoti“ mygtukas.
4. DI modalybės (DiModalitiesSlide) – **„Rek.“** ir rekomenduojamas įrankis aiškiai pažymėti (legend viršuje, aria-label).
5. Lentelėse (RL vs RLHF ir pan.) – **comparisonStyle** pagal LENTELIU_STANDARTAS; `min-w-[36rem]`, stulpelių `min-w-[14rem]`; body po lentele.

### Modulis 5 (Testas)

1. Test-intro – **duration** ir **firstActionCTA** aiškūs; **whyBenefit** vienas sakinys.
2. Rezultatų ekrane – **scroll į pirmą klaidingą** (jau); **remediacijos nuorodos** – vienas mygtukas „Peržiūrėti skaidrę X“.
3. Jei <70% – **aiškus pranešimas** „Rekomenduojama pakartoti“ su nuoroda į temas; CTA „Iš naujo“ arba „Į modulį“.

### Modulis 6 (Projektas)

1. Practice-intro – **kontekstas, duomenys, apribojimai, formatas, užduotis** – vizualiai atskirti (pvz. H3 + border-l arba kortelės).
2. **Vienas dominuojantis CTA** – „Pradėti projektą“ arba „Parsisiųsti šabloną“; antriniai – nuorodos.
3. Completion ekrane – **sertifikato** (jei tier 2) CTA vienas pagrindinis; „Kur pritaikyti?“ blokas – kompaktiškas (use-case sąrašas).

---

## 6. Greičiausi 10 patobulinimų

**TOP 10 micro-UX pataisymų, įgyvendinami per 1–2 valandas, didžiausias UX efektas.**

| #   | Patobulinimas                                                                                                                                        | Kur                                                 | Laikas  | Efektas             |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------- | ------------------- |
| 1   | **Body tekstas content-block:** `text-sm` → `text-base` ten, kur pagrindinis skaitomas tekstas                                                       | ContentSlides.tsx (ContentBlockSlide, sekcijų body) | ~30 min | Skaitomumas         |
| 2   | **Max eilučių ilgis:** body blokuose pridėti `max-w-prose` (arba 65ch) centruotam tekstui                                                            | Tų pačių blokų wrapper                              | ~20 min | Kognityvinė apkrova |
| 3   | **Sticky juosta:** pridėti kompaktinį „Skaidrė 12/41“ (arba palikti esamą) + optional 2px progress line (width %)                                    | ModuleView.tsx – sticky nav viduje                  | ~45 min | Orientacija         |
| 4   | **Tarpai tarp sekcijų:** `space-y-6` visur content-block sekcijoms; design-tokens import jei reikia                                                  | ContentBlockSlide, SectionBreakSlide                | ~20 min | Kvėpavimas          |
| 5   | **Modulių kortelė:** sumažinti badge skaičių – vienoje eilutėje max 2 (Modulis N + Learn/Test/Practice arba Rekomenduojama); Baigta – tik jei baigta | ModulesPage.tsx                                     | ~30 min | Skenuojamumas       |
| 6   | **Slide dots – „yra daugiau“:** gradient mask dešinėje (overflow hidden + gradient overlay)                                                          | ModuleView.tsx – slide dots wrapper                 | ~25 min | Navigacija          |
| 7   | **Footer ilgis:** patikrinti M4/M5/M6 footerių „Toliau – skaidrė N“ ≤55 simb.; shortTitle naudoti                                                    | modules.json (DATA_AGENT) arba validacija           | ~30 min | Tvarkingumas        |
| 8   | **Callout border ir padding:** visiems blockVariant blokams `border-l-4` + `p-4 md:p-5`; getColorClasses arba tiesiog Tailwind                       | ContentSlides sekcijų wrapper                       | ~25 min | Hierarchija         |
| 9   | **H2/H3 skaidrėse:** H2 `text-lg md:text-xl font-bold`, H3 `text-base font-semibold` – peržiūrėti SlideContent ir tipų komponentus                   | SlideContent, ContentSlides, BlockSlides            | ~40 min | Tipografija         |
| 10  | **Mobile – skaidrės numeris viršuje:** sticky juostoje rodyti „12/41“ (jau gali būti); jei nėra – pridėti tik mobile                                 | ModuleView.tsx – sticky nav                         | ~20 min | Mobile orientacija  |

---

## Nuorodos

- **SOT dizainui:** `docs/development/GOLDEN_STANDARD.md`
- **UI/UX agentas:** `docs/development/UI_UX_AGENT.md`
- **Vartotojų atsiliepimai:** `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md`
- **Testų klaidos:** `docs/development/TEST_REPORT.md`
- **Lentelės:** `docs/development/LENTELIU_STANDARTAS.md`
- **Design tokens:** `src/design-tokens.ts`
- **Tailwind:** `tailwind.config.js`

---

_Šis dokumentas – UX auditas micro patobulinimams. Implementaciją atlieka CODING_AGENT pagal UI_UX_AGENT gaires ir GOLDEN_STANDARD._
