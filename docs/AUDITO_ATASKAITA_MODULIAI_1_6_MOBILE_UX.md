# Mobilios sąsajos UX auditas – Moduliai 1–6

> **Rolė:** Senior Mobile UI/UX dizaineris, produktų audito ekspertas.  
> **Apimtis:** Moduliai 1–6 (6 Blokų sistema, Žinių patikrinimas, Praktika, Moduliai 4–6 – teorija, testas, projektas).  
> **Fokusas:** Tik mobilus naudojimas; mokymosi ir užduoties atlikimo greitis; didžiausio poveikio patobulinimai.  
> **Versija:** 1.0 | **Data:** 2026-03-11  
> **Šaltiniai:** `docs/UX_AUDIT_MICRO_IMPROVEMENTS.md`, `docs/development/analysis/UX_AUDIT_IMPLEMENTATION_PLAN.md`, `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md`, `src/components/ModuleView.tsx`, `AppNav.tsx`, `ModulesPage.tsx`, `ContentSlides.tsx`.

---

## 1. Executive summary

**3 didžiausios mobilios UX problemos:**

| # | Problema | Poveikis |
|---|----------|----------|
| **1** | **Dviguba navigacija ir prarandama orientacija** – viršuje sticky juosta (Atgal / 12/41 / Tęsti), apačioje fiksuota bottom nav (Atgal / M4·12/41 / Tęsti), modulių taškai (1–6) rodomi tik desktop (`hidden sm:flex`). Telefonu vartotojas mato skaidrės numerį dviem vietomis, bet nemato, kuriame modulyje yra, be scroll iki apačios. Ilguose moduliuose (M4 ~41 skaidrė) slide dots reikalauja horizontalaus scroll be aiškios „yra daugiau“ vizualizacijos. | Prarandamas „kur esu“ jausmas; didesnė kognityvinė apkrova; lėtesnė užduoties atlikimo progresija. |
| **2** | **Ilgų skaidrių trintis ir CTA nematomumas** – content-block skaidrėse (TL;DR → Daryk dabar → Kopijuoti → Patikra → Optional) turinys ilgas; sticky juosta užima vertikalų plotą (`top-16` po AppNav). CTA „Kopijuoti“ arba „Tęsti“ gali būti žemiau fold. Spacer `h-20` po turiniu padaro tuščią zoną prieš bottom nav – vartotojas scrollina ir gali nepasiekti paskutinio bloko ar CTA prieš paspaudimą. | Mažesnis „daryk dabar“ atsakas; rizika nepasiekti CTA; didesnė atsisakymo tikimybė. |
| **3** | **Informacijos tankis ir skaitomumas telefone** – modulių kortelėse (ModulesPage) daug badge'ų (Modulis N, Learn/Test/Practice, Rekomenduojama, Baigta), aprašymas, progreso juosta, CTA. Vienu žvilgsniu sunku suvokti prioritetą. Content-block body dalyje `text-sm md:text-base` – mažame ekrane tekstas mažesnis. Lentelės (M4 palyginimai) reikalauja horizontalaus scroll be sticky pirmo stulpelio; collapsible „Optional“ atidarytas būsenos vizualiai ne visur paryškintas. | Sumažėjęs skenuojamumas; pavargsta skaityti; paralyžius „ką daryti“. |

---

## 2. Critical friction points

### 2.1 Dviguba navigacija ir orientacijos praradimas

| Aspektas | Aprašymas |
|----------|-----------|
| **Problema** | Viršuje – sticky slide nav (Atgal, 12/41, Tęsti + progress linija). Apačioje – fiksuota mobile bottom nav (tas pats Atgal / 12/41 / Tęsti). Modulių kontekstas („Modulis 4“) bottom nav rodomas (`M4 · 12/41`), bet modulių taškai (1–6) – tik `sm:flex`, t.y. mobile paslėpti. |
| **Kur pasireiškia** | `ModuleView.tsx`: sticky `top-16` nav (776–817 eil.), mobile bottom nav (864–906), modulių taškai (911–938) – `hidden sm:flex`. `AppNav`: mobile – tik hamburger meniu, progreso juosta kompaktiška. |
| **Kodėl stabdo** | Vartotojas nemato vienoje vietoje: (1) kuriame modulyje, (2) kuri skaidrė, (3) kiek liko. Bottom nav duoda 12/41, bet „ar tai M1, M4?“ – reikia scroll iki apačios arba atsiminti. Dvigubos Atgal/Tęsti mygtukai gali kelti abejonę: kurį spausti. |
| **Poveikis UX** | Prarandama orientacija; didesnė kognityvinė apkrova; lėtesnis sprendimas „ką daryti toliau“. Vartotojų feedback (20260220): „navigacija šokinėja“. |

### 2.2 Ilgų skaidrių trintis ir CTA nematomumas

| Aspektas | Aprašymas |
|----------|-----------|
| **Problema** | Content-block skaidrėse 5 blokai (TL;DR → Daryk dabar → Copy → Patikra → Optional). Sticky juosta + AppNav užima ~140–160px. Mažame viewport (375px) likusi aukštis ~400px – į telpa 1–2 blokai. CTA „Kopijuoti promptą“ dažnai 3–4 bloke; „Tęsti“ – bottom nav, bet prieš jį spacer `h-20` – po paskutinio turinio bloko lieka tuščia vieta. |
| **Kur pasireiškia** | `ModuleView.tsx` spacer (909): `md:hidden h-20`. `ContentSlides.tsx`: content-block sekcijos `space-y-6`, TemplateBlock/Kopijuoti mygtukas. Ilgos skaidrės M4 (section-break, content-block su keliais blokais). |
| **Kodėl stabdo** | Vartotojas scrollina žemyn, norėdamas rasti „Kopijuoti“ arba paskutinį takeaway; sticky bar vis laikosi viršuje. Jei CTA žemiau fold – reikia daug scroll. Spacer po turiniu atima vertikalų plotą – atrodo, kad „dar daug turinio“, nors tai tik vietos rezervavimas bottom nav. |
| **Poveikis UX** | Mažesnis „daryk dabar“ impulsas; rizika nepasiekti CTA; frustracija dėl tuščios zonos. |

### 2.3 Informacijos tankis ir skaitomumas

| Aspektas | Aprašymas |
|----------|-----------|
| **Problema** | ModulesPage: kortelėje – ikona, Modulis N, level badge (Learn/Test/Practice), Rekomenduojama (ring), Baigta badge, aprašymas (line-clamp), progreso juosta, CTA. Content-block: keli blokai su skirtingomis spalvomis (accent, brand, terms); body `text-sm` mobile. Lentelėse (M4) – daug stulpelių; pirmas stulpelis fiksuotas ne visur. Collapsible Optional – atidarytas būsenos vizualiai ne visur aiškiai (border-l-4, fonas). |
| **Kur pasireiškia** | `ModulesPage.tsx` kortelės (225–260+), `ContentSlides.tsx` content-block sekcijos, lentelių render, collapsible. GOLDEN_STANDARD §2.2 – max 2 semantinės + 1 CTA; realybėje mobile vienu žvilgsniu vis tiek daug elementų. |
| **Kodėl stabdo** | Donato feedback: „per daug spalvų, per daug informacijos, neintuityvu“. Mobile vienas ekranas = mažiau vietos; tankis didina kognityvinę apkrovą. Mažas body tekstas (text-sm) ilgesniam skaitymui pavargina. |
| **Poveikis UX** | Sumažėjęs skenuojamumas; vartotojas „nežino nuo ko pradėti“; mažesnis įsisavinimas. |

---

## 3. Mobile usability audit

| Kriterijus | Įvertinimas | Pastabos |
|------------|------------|----------|
| **Navigacija** | ⚠️ Vidutinis | AppNav mobile – hamburger + dropdown, aiškus. ModuleView – dvigubi Atgal/Tęsti (viršuje + apačioje); modulių taškai (1–6) mobile paslėpti – prarandamas modulio kontekstas. Bottom nav rodo „M4 · 12/41“ – gera; trūksta vienos aiškios „vietos tiesos“ (pvz. vienas sticky bar su Modulis + Skaidrė + CTA). |
| **Skaitomumas** | ⚠️ Vidutinis | Body `text-sm md:text-base` – mobile mažesnis šriftas; max-w-prose taikomas. H2/H3 hierarchija pataisyta (text-lg md:text-xl, text-base). Ilgos pastraipos content-block – vis tiek daug teksto vienoje skaidrėje; rekomenduotina dar labiau trumpinti mobile arba „read more“. |
| **Informacijos tankis** | ❌ Per didelis | Kortelėse daug badge'ų; content-block – 5 blokų schema. Rekomenduojama: mobile sumažinti badge skaičių, vienas dominuojantis CTA, trumpesni blokų įvadai. |
| **CTA matomumas** | ⚠️ Vidutinis | Primary CTA (Tęsti) – bottom nav, min-h-52px, gradient – gerai. „Kopijuoti“ skaidrėse – min-h-44px, accent – gerai, bet gali būti žemiau fold. ModuleComplete – kelios CTA (Tęsti, Sertifikatas, Santrauka) – rekomenduojama vienas primary, kiti secondary. |
| **Ekrano hierarchija** | ⚠️ Vidutinis | H1 vienas per skaidrę; blockVariant (accent/brand/terms) naudojamas. Mobile vienu žvilgsniu vis tiek daug vizualinių vienetų; rekomenduojama dar labiau paryškinti vieną „hero“ bloką arba vieną CTA. |
| **Scroll patirtis** | ⚠️ Vidutinis | Touch-pan-y įjungtas; spacer h-20 užtikrina, kad turinys neužsikerta su bottom nav. Problema: ilgose skaidrėse daug scroll; nėra „scroll to CTA“ arba „jump to action“. Slide dots ilgiems moduliams (M4) – horizontalus scroll + mask-gradient-dots („yra daugiau“) – įgyvendinta; touch 36px ilgiems moduliams – atitinka. |

---

## 4. Low-hanging improvements

5–10 greitų patobulinimų, kurie pagerina mobilų UX, mažina trintį ir gali būti įgyvendinti greitai:

| # | Patobulinimas | Kur | Efektas |
|---|----------------|-----|---------|
| 1 | **Mobile: vienoje vietoje rodyti modulio kontekstą** – sticky juostoje (arba bottom nav) visada rodyti „Modulis 4 · 12/41“, o ne tik „12/41“ viršuje. Dabar bottom nav jau rodo „M4 · 12/41“ – užtikrinti, kad viršutinėje sticky juostoje mobile taip pat būtų „M4“ arba „Modulis 4“, kad nereikėtų žiūrėti į apačią. | `ModuleView.tsx` – sticky nav, span su slide counter | Orientacija vienoje vietoje. |
| 2 | **Sumažinti viršutinės sticky juostos aukštį mobile** – py-2 jau; galima mobile padaryti vieną eilutę: [Atgal] [M4 12/41] [Tęsti] be antros eilutės (progress line) arba progress line padaryti plonesnę (1px). | `ModuleView.tsx` – nav py-2, optional progress line | Daugiau vietos turiniui. |
| 3 | **Spacer po turiniu – ne h-20, o min-h su safe-area** – užtikrinti, kad `h-20` būtų pakankamas įvairiems įrenginiams (notch, gesture bar); naudoti `pb-safe` arba `min-h-[5rem]` su env(safe-area-inset-bottom). | `ModuleView.tsx` – spacer div | Mažesnė tuščios zonos rizika; geresnis atsistatymas į įrenginį. |
| 4 | **Content-block: pirmas CTA (Kopijuoti) virš fold arba „Scroll to CTA“** – arba sutrumpinti pirmus blokus mobile (sutrumpintas TL;DR + Daryk dabar), arba pridėti mobile-only mygtuką „Pereiti prie veiksmo“ (smooth scroll į pirmą CTA). | `ContentSlides.tsx` arba ModuleView | CTA greičiau pasiekiamas. |
| 5 | **Modulių kortelė mobile: max 2 badge** – Modulis N + vienas iš (Rekomenduojama / Baigta / Learn|Test|Practice). Sumažinti vizualinį triukšmą. | `ModulesPage.tsx` | Greitesnis skenuojamumas. |
| 6 | **Lentelės mobile: sticky pirmas stulpelis** – horizontal scroll lentelėms, bet pirmas stulpelis (etiketės) `position: sticky; left: 0` + fonas, kad scrollinant matytųsi kontekstas. | `ContentSlides.tsx` – table wrapper | Lentelių skaitomumas. |
| 7 | **Apklausa (Quiz): mygtukas „Pasitikrinti“ / „Baigti“ – aiškus disabled būsenos pranešimas** – jau įgyvendinta (quiz-next-hint); patikrinti, ar mobile matomas ir skaitomas (aria-live). | `QuizPage.tsx` | Mažesnė frustracija (20260220 feedback). |
| 8 | **Slide dots mobile: užtikrinti gradient mask** – „yra daugiau“ dešinėje (mask-gradient-dots) matomas; touch target min 36px ilgiems moduliams – jau. Patikrinti, ar mask veikia Safari iOS. | `ModuleView.tsx`, CSS | Aiškesnė navigacija ilguose moduliuose. |
| 9 | **Body tekstas content-block mobile: text-base visur** – vietoj `text-sm md:text-base` naudoti `text-base` mobile, kad skaitomumas būtų geresnis. | `ContentSlides.tsx` – sekcijų body | Mažesnė akų įtampa. |
| 10 | **Bottom nav „Tęsti“ label – truncate max 140px** – jau yra `truncate max-w-[140px]`; užtikrinti, kad kontekstinė etiketė („Tęsti: …“) būtų skaitoma; jei per ilga – tooltip arba shortTitle. | `ModuleView.tsx` – nextButtonLabel | Aiškus kitas žingsnis be lūžimo. |

---

## 5. Prioritetų planas

### Dabar (kritiniai – 1–2 savaitės)

| Užduotis | Poveikis | Pastabos |
|----------|----------|-----------|
| Mobile sticky juostoje rodyti modulio kontekstą (M4 · 12/41) | Orientacija | Vienas šaltinis tiesos viršuje. |
| Spacer su safe-area-inset-bottom | Atsistatymas į įrenginį | Notch / gesture bar. |
| Content-block body mobile: text-base | Skaitomumas | Mažesnė akų įtampa. |
| Modulių kortelė mobile: max 2 badge | Skenuojamumas | Sumažinti triukšmą. |

### V1 patobulinime (artimiausi release)

| Užduotis | Poveikis | Pastabos |
|----------|----------|-----------|
| Sumažinti sticky juostos aukštį / vienos eilutės variantas mobile | Vieta turiniui | Daugiau matomo turinio. |
| Lentelės mobile: sticky pirmas stulpelis | Lentelių skaitomumas | M4 palyginimai. |
| „Pereiti prie veiksmo“ arba sutrumpintas TL;DR mobile | CTA pasiekiamumas | Mažesnė trintis. |
| Slide dots gradient mask patikra (Safari iOS) | Navigacija | Ilgi moduliai. |

### V2 sistemoje (strateginiai)

| Užduotis | Poveikis | Pastabos |
|----------|----------|-----------|
| Vienas unifikuotas mobile nav (vietoj dviejų Atgal/Tęsti) – pvz. tik bottom nav, viršuje tik H1 + modulio kontekstas be mygtukų | Paprastumas | Mažiau dubliavimo. |
| Progressive disclosure: content-block mobile – pirmi 2 blokai atverti, „Rodyti daugiau“ kitiems | Tankio mažinimas | Kognityvinė apkrova. |
| A/B testas: bottom nav su „Tęsti“ vs sticky CTA skaidrės apačioje | Konversija | Duomenys vartotojų elgsenai. |

---

## Nuorodos

| Dokumentas | Paskirtis |
|------------|-----------|
| `docs/UX_AUDIT_MICRO_IMPROVEMENTS.md` | Pilnas micro-UX auditas, 30 punktų |
| `docs/development/analysis/UX_AUDIT_IMPLEMENTATION_PLAN.md` | Fazių planas, Faze 1–4 |
| `docs/development/GOLDEN_STANDARD.md` | Dizaino SOT, skaidrių schemos |
| `docs/development/UI_UX_AGENT.md` | UI/UX checklist |
| `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md` | Donato, 20260220 mobile testas |
| `docs/CONTENT_MODULIU_ATPAZINIMAS.md` | Modulių 1–6 apimtis |

---

**CHANGES:**  
- Sukurtas `docs/AUDITO_ATASKAITA_MODULIAI_1_6_MOBILE_UX.md` – pilnas mobilios UX audito dokumentas moduliams 1–6.

**CHECKS:**  
- Peržiūrėta pagal `docs/development/GOLDEN_STANDARD.md` (§1–§3) – skaidrių tipai, CTA, turinio išdėstymas.  
- Peržiūrėta pagal `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md` – 20260220 navigacija „šokinėja“, apklausos mygtukas; Donato „per daug informacijos“.  
- Kodo nuorodos: `ModuleView.tsx` (sticky, bottom nav, spacer, slide dots), `ModulesPage.tsx`, `ContentSlides.tsx`, `AppNav.tsx`.

**RISKS:**  
- Sticky + bottom nav supaprastinimas (V2) gali reikalauti didesnės ModuleView refaktorizacijos.  
- Lentelių sticky pirmas stulpelis gali reikalauti overflow-x wrapper ir testavimo įvairiuose iOS/Safari.

**NEXT:**  
- Įgyvendinti „Dabar“ bloko punktus (4 užduotys).  
- Atnaujinti `docs/development/analysis/UX_AUDIT_IMPLEMENTATION_PLAN.md` – pridėti skyrių „Mobile-specific“ arba nuorodą į šį auditą.  
- Pakartoti mobile QA (Samsung / iPhone) su šio audito checklist.
