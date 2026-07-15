# Mokymų promptų konteksto auditas (Moduliai 1–6)

**Tikslas:** Atskirt anglų kalbos turinį į 2 regioninius variantus: bazinį `LT (EN)` Europai ir `US (EN)` JAV vartotojams.  
**Apimtis:** Visi mokymų promptai, pavyzdžiai, užduočių scenarijai ir praktinio konteksto atvejai (Moduliai 1–6).  
**Šaltiniai:** `src/data/modules.json` (LT), `src/data/modules-en.json` (M1–M3 bazinis EN), `src/data/modules-en-m4-m6.json` (M4–M6 bazinis EN), `src/data/modules-en-us-overrides.json` (US override).

---

## 0. Priimti sprendimai

| Tema | Priimtas sprendimas |
|------|---------------------|
| EN variantų modelis | Bazinis EN = **`LT (EN)`** / Europos kontekstas; JAV vartotojams papildomai taikomas **`US (EN)` override**. |
| US vartotojo aptikimas | `US (EN)` variantas aktyvuojamas tik kai browser locale yra **`en-US`**. |
| Statistika skaidrėje „US companies use AI“ | Naudoti intervalą **about 5–7% of US businesses use AI** su šaltiniu **Census Bureau BTOS (2024)**. |
| Šaltinių pateikimas EN versijoje | Kai šaltinis rodomas vartotojui, pateikti **pavadinimą ir URL**: pvz. Census Bureau (`census.gov`), BEA (`bea.gov`), FRED (`fred.stlouisfed.org`). |
| Vartotojų vs įmonių statistika | `US (EN)` kontekste šiai skaidrei naudoti **vieną pagrindinę verslo statistiką**, ne maišyti su LT ar vartotojų statistikomis. |
| Būsimos lokales | `EN-US` = USA kontekstas ir USA šaltiniai. `EN-GB` ir kitos lokales turi turėti atskirai apibrėžtą default regioną ir šaltinių sąrašą. |
| Terminologija EN UI | Vartotojui matomuose EN tekstuose vartoti **AI** (ne DI). |

---

## 1. Executive summary

| Metrika | Rezultatas |
|--------|------------|
| **Promptų / blokų su lietuvišku ar regioniniu kontekstu** | **≥18** atvejų (EN versijoje) |
| **Kur dažniausiai pasikartoja** | Modulis 4 (RAG, šaltiniai, BVP pavyzdžiai, DI adopcija), Modulis 6 (projekto šablonas, wingfoil), Modulis 1 EN (Baltics) |
| **Pagrindinės problemos** | 1) BVP/GDP pavyzdžiai – Lietuva vs Latvija (Eurostat LT/LV); 2) Šaltiniai – Statistics Lithuania, Stat.gov.lt, e-TAR; 3) Regionas – „Baltics“, „Lithuanian SaaS“, „Lithuania“ statistikose; 4) Projektų pavyzdžiai – „wingfoil community in Lithuania“; 5) Modulio 1 EN – „Baltic countries“ vietoj JAV rinkos. |

**Išvada:** EN turinys turi būti padalintas į 2 sluoksnius: bazinį `LT (EN)` / Europos EN ir `US (EN)` override JAV vartotojams. JAV override naudoja US GDP, data.gov, BEA, Census, JAV įmonių/regionų pavyzdžius ir USD.

---

## 2. Konteksto neatitikimai

Kiekvienam atvejui: **prompto vieta** (failas, modulis, skaidrės tipas/ID), **bazinis EN kontekstas**, **problema JAV vartotojui**, **rekomenduojamas `US (EN)` override**.

| # | Vieta (failas, modulis, skaidrė) | Originalus kontekstas | Problema EN UI | Rekomenduojamas USA kontekstas |
|---|----------------------------------|------------------------|----------------|--------------------------------|
| 1 | `modules-en.json`, M1, skaidrė 1, `structuredPrompt` | „Target market: **Baltic countries**. Budget 50k EUR.“ | Regioninis šališkumas – EN vartotojui aktualesnė JAV rinka. | „Target market: **US (e.g. Midwest or Northeast)**. Budget 50k USD.“ |
| 2 | `modules-en-m4-m6.json`, M4, intro (id 38), `unstructuredPrompt` | „Write me a report on **Lithuania's GDP** trends.“ | Lietuviškas ekonominis kontekstas. | „Write me a report on **US GDP** trends.“ |
| 3 | `modules-en-m4-m6.json`, M4, intro (id 38), `structuredPrompt` | „Use only these sources: Eurostat, **Statistics Lithuania**.“ | LT valstybinė statistika – EN vartotojui nepasiekiama / nerelevantu. | „Use only these sources: **BEA (bea.gov), Census Bureau (census.gov), or FRED (Federal Reserve)**.“ |
| 4 | `modules-en-m4-m6.json`, M4, konteksto žingsnis (examplePrompt) | „Prepare 5 marketing ideas for a **logistics company in Lithuania**.“ | Lietuviška įmonių/geografija nuoroda. | „Prepare 5 marketing ideas for a **logistics company in Texas**“ arba „**in the US**.“ |
| 5 | `modules-en-m4-m6.json`, M4, skaidrė DI adopcija (id 52), `sectionLabel` / `title` / `label` | „**02 — Lithuania**“, „**Lithuanian companies use AI**“, „**9.8% of Lithuanian companies use AI**“, „**Lithuania's population use AI tools**“, „**Lithuania's AI adoption – companies**“. | Statistika ir etiketės orientuotos į Lietuvą. | „**02 — United States**“, „**US companies use AI**“, „**X% of US companies use AI**“ (BLS/Census duomenys), „**US AI adoption – companies**“. |
| 6 | Ten pat, `insightCard.headline` / `points[3].text` / alt | „Main takeaways: EU, business, youth, **Lithuania**.“; „**Lithuania:** 69% … (Stat.gov.lt)“; „Key message – EU, business, youth, **Lithuania**“. | Lietuva kaip pagrindinis pavyzdys. | „Main takeaways: **US**, business, youth.“; „**United States:** [BLS/Census %] … (census.gov, BLS).“ |
| 7 | Ten pat, `sources` | „**Stat.gov.lt**, 2025“. | LT šaltinis. | „**Census Bureau / BLS**, 2025“ arba „**Pew Research (US)**“. |
| 8 | `modules-en-m4-m6.json`, M4, RAG (id 59), heading / body / copyable | „**GDP LT vs LV**“, „Did GDP grow faster in **Lithuania than in Latvia** …“, „filter countries **LT and LV**“. | Baltijos šalių palyginimas – EN vartotojui mažai naudingas. | „**GDP US vs Germany**“ arba „**California vs Texas GDP**“; „Use **BEA or FRED** data. Task: Did GDP grow faster in **the US than in Germany** over 2020–2024?“ |
| 9 | Ten pat, „Official open data sources – 3 blocks“, B. National level | „**e-TAR** – main source of legal acts. Parliament – official laws. **Statistics office** … **Business register** … **Procurement** … **Central bank**.“ | Nevardintas „national“ = LT (e-TAR, Seimas). | „**Congress.gov** – federal legislation. **State legislature** – state laws. **Census Bureau / BEA** – statistics, API. **SEC EDGAR** – company filings. **SAM.gov** – procurement. **Federal Reserve** – financial statistics.“ |
| 10 | Ten pat, „Other international sources“ | „For **Baltic/EU audience** Eurostat and data.europa.eu are used most.“ | Regioninis prioritetas. | „For **US audience**, **data.gov, BEA, Census Bureau, FRED** are used most.“ |
| 11 | Ten pat, Memory pavyzdys (slide „Working with RAG: memory“) | „My company does FMCG distribution in the **Baltics**. Priority is profitability and growth.“ | Baltų regionas. | „My company does FMCG distribution in the **Midwest**“ arba „**across the US**. Priority is profitability and growth.“ |
| 12 | `modules-en-m4-m6.json`, M4, CTA / follow-up (refleksija arba „Do it now“) | „From Eurostat data: **GDP trend in Lithuania** over 3 years. Cite the source.“ | Lietuviškas BVP. | „From **BEA or FRED** data: **US GDP trend** over 3 years. Cite the source.“ |
| 13 | `modules-en-m4-m6.json`, M4, correctPromptPractice (slide id 47) | „Do a short analysis of 3 main competitors in the **Lithuanian SaaS market**.“; „clear context (IT/SaaS, **Lithuania**)“. | Lietuviška rinka. | „Do a short analysis of 3 main competitors in the **US SaaS market**“ arba „**Austin tech market**.“; „clear context (IT/SaaS, **US**).“ |
| 14 | `modules-en-m4-m6.json`, M6, pilnas pavyzdinis promptas (copyable) | „INPUT: Topic – **wingfoil community in Lithuania**. Content: community intro, training, contacts.“ | Lietuviška bendruomenė. | „INPUT: Topic – **wingfoil community in Florida**“ arba „**in Austin, TX**. Content: community intro, training, contacts.“ |
| 15 | `modules-en-m4-m6.json`, M6, template (Deep research) | „Sources: … **e.g. Eurostat**, market overviews.“ | Eurostat kaip pagrindinis pavyzdys. | „Sources: … **e.g. BEA, Census Bureau, Pew Research**, market overviews.“ |
| 16 | `modules-en-m4-m6.json`, M4, Deep research copyable / PROMPT 1+2 | „Use only reliable sources (**Eurostat**, official portals …)“ | Eurostat pirmenybė. | „Use only reliable sources (**BEA, Census, data.gov**, official portals …).“ |
| 17 | `modules-en-m4-m6.json`, M4, „Do it now“ body | „run it in AI (**Eurostat** or data.europa.eu)“ | EU šaltiniai. | „run it in AI (**BEA** or **data.gov**)“ – JAV vartotojui. |
| 18 | `modules-en-m4-m6.json`, skaidrė su „Mini-prompt: Eurostat template“ | „Use only **Eurostat** data.“; „**Eurostat** (ec.europa.eu/eurostat)“. | Visas RAG pavyzdys paremtas Eurostat. | Pridėti **USA variantą**: „Use only **BEA / FRED** data“ ir atskirą copyable su data.gov/BEA. |

**Pastaba:** LT versijoje (`modules.json`) papildomai: Modulio 4 schema „Rytas, LKL“, „cyberpunk Vilnius“, „lietuviškas rap“ – tai **sąmoningai LT** turinys; EN versijoje atitinkamų skaidrių gali būti USA pakaitalai (pvz. „Lakers“, „New York“), jei tos skaidrės bus lokalizuojamos.

---

## 3. Siūlomi pakeitimai

Pateikiami **originalūs fragmentai** ir **pataisyti fragmentai su USA kontekstu** (tik konteksto keitimas, ne struktūros).

### 3.1 Modulis 1 (modules-en.json)

**Originalus:**  
`"INPUT: Budget 50k EUR. Target market: Baltic countries.\nCompetitors: 3 main players."`

**Pataisytas:**  
`"INPUT: Budget 50k USD. Target market: US (e.g. Midwest or Northeast).\nCompetitors: 3 main players."`

---

### 3.2 Modulis 4 – intro (modules-en-m4-m6.json)

**Originalus:**  
`"unstructuredPrompt": "Write me a report on Lithuania's GDP trends."`

**Pataisytas:**  
`"unstructuredPrompt": "Write me a report on US GDP trends."`

**Originalus:**  
`"INPUT: Use only these sources: Eurostat, Statistics Lithuania. If data is missing …"`

**Pataisytas:**  
`"INPUT: Use only these sources: BEA (bea.gov), Census Bureau (census.gov), or FRED. If data is missing …"`

---

### 3.3 Modulis 4 – konteksto pavyzdys (examplePrompt)

**Originalus:**  
`"examplePrompt": "Prepare 5 marketing ideas for a logistics company in Lithuania."`

**Pataisytas:**  
`"examplePrompt": "Prepare 5 marketing ideas for a logistics company in Texas (or: in the US)."`

---

### 3.4 Modulis 4 – DI adopcija (sectionLabel, title, label, sources, insightCard)

**Originalus:**  
`"sectionLabel": "02 — Lithuania"`, `"title": "Lithuanian companies use AI"`, `"label": "9.8% of Lithuanian companies use AI"`, alt „Lithuania's AI adoption“, sources „Stat.gov.lt“, headline/points su „Lithuania“.

**Pataisytas:**  
`"sectionLabel": "02 — United States"`, `"title": "US companies use AI"`, `"label": "[X]% of US companies use AI"` (su šaltiniu BLS/Census), `"sources": "Census Bureau, 2025"` / „BLS“, headline „Main takeaways: US, business, youth.“, points „**United States:** [appropriate US stat] (census.gov / BLS).“

---

### 3.5 Modulis 4 – RAG skaidrė (GDP LT vs LV)

**Originalus:**  
`"heading": "One example A to Z: GDP LT vs LV"`  
`"body": "Question: Did GDP grow faster in Lithuania than in Latvia over 2020–2024? … Filter: countries LT, LV."`  
`"copyable": "Use only Eurostat … Task: Did GDP grow faster in Lithuania than in Latvia … filter countries LT and LV …"`

**Pataisytas:**  
`"heading": "One example A to Z: US GDP vs Germany (or: California vs Texas)"`  
`"body": "Question: Did GDP grow faster in the US than in Germany over 2020–2024? Use BEA or FRED. Steps: (1) Dataset/source … (2) Filter: US, DE. (3) Years: 2020–2024. (4) Answer with citation."`  
`"copyable": "Use only BEA (bea.gov) or FRED data. Task: Did US GDP grow faster than Germany's over 2020–2024? Give the answer with dataset name, indicator, and link."`

---

### 3.6 Modulis 4 – Nacionaliniai šaltiniai (B. National level)

**Originalus:**  
`"B. National level:** e-TAR – main source of legal acts. Parliament – official laws. Statistics office … Business register … Procurement … Central bank … For legal acts – only the current version from e-TAR."`

**Pataisytas:**  
`"B. US federal/state level:** Congress.gov – federal legislation. State legislature – state laws. Census Bureau / BEA – statistics, API. SEC EDGAR – company filings. SAM.gov – procurement. Federal Reserve – financial statistics. For legal acts – use current version from Congress.gov or state legislature."`

---

### 3.7 Modulis 4 – „Other international sources“

**Originalus:**  
`"For Baltic/EU audience Eurostat and data.europa.eu are used most."`

**Pataisytas:**  
`"For US audience, data.gov, BEA, Census Bureau, and FRED are used most."`

---

### 3.8 Modulis 4 – Memory pavyzdys

**Originalus:**  
`"Example:** \"My company does FMCG distribution in the Baltics. Priority is profitability and growth, not turnover.\""`

**Pataisytas:**  
`"Example:** \"My company does FMCG distribution in the Midwest (or: across the US). Priority is profitability and growth, not turnover.\""`

---

### 3.9 Modulis 4 – CTA / follow-up

**Originalus:**  
`"e.g. \"From Eurostat data: GDP trend in Lithuania over 3 years. Cite the source.\""`

**Pataisytas:**  
`"e.g. \"From BEA or FRED data: US GDP trend over 3 years. Cite the source.\""`

---

### 3.10 Modulis 4 – correctPromptPractice (EN)

**Originalus:**  
`"solutionCopyable": "… Do a short analysis of 3 main competitors in the Lithuanian SaaS market. …"`  
`"solutionSummary": "… clear context (IT/SaaS, Lithuania) …"`

**Pataisytas:**  
`"solutionCopyable": "… Do a short analysis of 3 main competitors in the US SaaS market. …"`  
`"solutionSummary": "… clear context (IT/SaaS, US) …"`

---

### 3.11 Modulis 6 – pilnas pavyzdinis promptas

**Originalus:**  
`"INPUT: Topic – wingfoil community in Lithuania. Content: community intro, training, contacts."`

**Pataisytas:**  
`"INPUT: Topic – wingfoil community in Florida (or: in Austin, TX). Content: community intro, training, contacts."`

---

### 3.12 Modulis 4/6 – šaltinių pavyzdžiai (template, Deep research)

**Originalus:**  
`"e.g. Eurostat, official portals"` / `"Sources: … e.g. Eurostat, market overviews"`

**Pataisytas:**  
`"e.g. BEA, Census Bureau, data.gov, official portals"` / `"Sources: … e.g. BEA, Census, Pew Research, market overviews"`

---

## 4. Konteksto transformacijos taisyklės (LT → USA)

Standartas `US (EN)` override pavyzdžiams ir promptams:

| Lietuva / regioninis | USA pakaitalas |
|----------------------|-----------------|
| Lietuvos BVP / BVP tendencijos | US GDP / US GDP trends |
| Latvija, Estija, Baltijos šalys | Germany, or US regions (e.g. California vs Texas) |
| Vilnius | New York (arba Chicago) |
| Kaunas | Chicago (arba Austin) |
| Klaipėda | Los Angeles (arba Miami) |
| Baltijos regionas / Baltics | US market / Midwest / Northeast |
| Lietuvos įmonė / rinka | US company / US market |
| Eurostat (kaip pagrindinis) | BEA, FRED, Census Bureau, data.gov |
| Valstybės duomenų agentūra / Statistics Lithuania / Stat.gov.lt | Census Bureau (census.gov), BEA (bea.gov), BLS |
| e-TAR, Seimas | Congress.gov, state legislature |
| Registrų centras, VPT, Lietuvos bankas | SEC EDGAR, SAM.gov, Federal Reserve |
| „Lietuva“ statistikose / „Lithuania“ skaidrėse | United States / US |

**Pastaba:** EUR → USD ten, kur kalbama apie biudžetą ar kainas (pvz. Modulio 1 pavyzdys).

### JAV oficialūs šaltiniai (pavadinimas + URL)

| Šaltinis | URL | Kada naudoti EN-US kontekste |
|----------|-----|------------------------------|
| BEA | `bea.gov` | US GDP, national accounts, regioninė ekonomika |
| Census Bureau | `census.gov` | Verslo ir gyventojų statistika, BTOS |
| FRED | `fred.stlouisfed.org` | Ekonominiai rodikliai, laiko eilutės, palyginimai |
| data.gov | `data.gov` | Federalinių atvirų duomenų paieška |
| Congress.gov | `congress.gov` | Federaliniai teisės aktai |
| SEC EDGAR | `sec.gov/edgar` | Įmonių filings ir ataskaitos |
| SAM.gov | `sam.gov` | Viešieji pirkimai ir federal contract data |

---

## 5. Sisteminiai patobulinimai

- **Lokalizacijos nuoseklumas**
  - Bazinis EN turinys = **`LT (EN)`** / Europos kontekstas.
  - `US (EN)` override aktyvuojamas tik kai browser locale = **`en-US`**.
  - Turinio SOT turi aiškiai skirti: bazinis EN vs regioniniai override failai.

- **Išvengti mišraus konteksto**
  - Vienoje skaidrėje / viename prompte **nemaišyti** LT ir US šaltinių (pvz. ne „Eurostat ir Statistics Lithuania“ EN versijoje).
  - EN RAG skaidrėse: **pagrindiniai pavyzdžiai** – BEA, FRED, data.gov; Eurostat palikti tik kaip „international“ opciją (savo skyriuje), ne kaip numatytąją užduotį.

- **Kontrolės sąrašas prieš publikuojant EN**
  - [ ] Bazinis EN (`LT (EN)`) lieka nepakeistas, kad būtų patogu daryti EU -> EN.
  - [ ] `US (EN)` override taikomas tik `en-US` vartotojams.
  - [ ] Visi BVP/GDP pavyzdžiai – US (arba aiškiai „pasirinkite šalį“).
  - [ ] Visi šaltiniai – data.gov, BEA, Census, FRED (ne Stat.gov.lt, ne e-TAR).
  - [ ] Įmonių/regionų pavyzdžiai – US miestai/regionai arba neutralūs.
  - [ ] Valiuta – USD ten, kur nurodyta konkreti suma.
  - [ ] EN UI terminologija – **AI**, ne DI.

- **Ateities plėtra**
  - Atskiras **EN content checklist** (pvz. `docs/development/EN_UI_US_CONTEXT_CHECKLIST.md`) su lentelėmis: skaidrė ID, laukas, leidžiamos reikšmės (US only).
  - Jei bus daugiau kalbų (locale), kiekvienai rinkai apibrėžti atskirą „default region“ ir šaltinių sąrašą: `EN-US` = USA; `EN-GB` = UK (pvz. ONS, `gov.uk`) atskiru override failu arba aiškia merge taisykle.

---

**Dokumentas:** `docs/development/MOKYMU_PROMPTU_KONTEKSTO_AUDITAS_MODULIAI_1_6.md`  
**Data:** 2026-03-11
