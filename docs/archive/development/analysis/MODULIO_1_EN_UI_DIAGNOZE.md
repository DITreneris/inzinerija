# Modulio 1 EN→UI diagnozė

**Data:** 2026-03-10  
**Tikslas:** Nustatyti, kodėl EN režime rodomas LT/EN mišinys (ypač blokų skaidrėse).

## 1. Duomenų SOT palyginimas (modules.json vs modules-en.json)

### 1.1. Modulio 1 struktūra

- **modulesLoader:** Kai `locale === 'en'`, naudojamas `modules-en.json` moduliams 1–3. `modules[0]` (Modulio 1) pilnai pakeičiamas EN failo turiniu – t. y. visos skaidrės (title, subtitle, content) ateina iš EN.
- **Skaidrių eilė ir tipai:** Identiška abiejuose failuose (action-intro, infographic, definitions, workflow-summary, prompt-types, prompt-techniques, prompt-template, transition-3-to-6, hierarchy, **meta**, **input**, **output**, reasoning-models, reasoning, quality, advanced, advanced-2, summary).

### 1.2. Skaidrės su tipais meta, input, output (id 5, 6, 7)

| Laukas      | modules.json (LT)    | modules-en.json (EN)            |
| ----------- | -------------------- | ------------------------------- |
| title       | 1️⃣ Meta Blokas       | 1 Meta block                    |
| subtitle    | Rolė, kontekstas…    | Role, context, and goal…        |
| type        | meta                 | meta                            |
| keyQuestion | Kas esi ir ką darai? | Who are you and what do you do? |

**Svarbu:** Šioms skaidrėms JSON **neturi** `content` – tik title, subtitle, blockNumber, keyQuestion. Visas vizualus turinys (klausimo blokas, „blogas/geras“ pavyzdžiai, komponentų sąrašas, šablonas) generuojamas **React komponentuose** (`BlockSlides.tsx`), ne iš JSON.

### 1.3. Išvada

- EN duomenys Moduliui 1 yra teisingi ir pilni `modules-en.json`.
- **Priežastis mišrios kalbos:** Skaidrės tipų `meta`, `input`, `output` (ir galbūt `reasoning`, `quality`, `advanced`) **piešia turinį iš kodo** – `MetaBlockSlide`, `InputBlockSlide`, `OutputBlockSlide` ir kt. šiuo metu naudoja **fiksuotus lietuviškus stringus**. Todėl net su EN locale vartotojas mato EN tik antraštę (iš JSON), o kūną – lietuviškai.

---

## 2. BlockSlides.tsx – hardcoded LT tekstų auditas

### 2.1. OptionalWhySections (bendras)

| Vieta            | LT tekstas         |
| ---------------- | ------------------ |
| Fallback heading | `Kodėl tai veikia` |

### 2.2. MetaBlockSlide

| Vieta                | LT tekstas                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Klausimas (h3)       | Klausimas: Kas esate ir ką darote?                                                                                       |
| Paaiškinimas         | Meta blokas nustato DI tapatybę ir kontekstą. Tai kaip darbo aprašymas, kuris lemia, kaip DI interpretuoja jūsų užduotį. |
| Bad label            | ❌ Blogas                                                                                                                |
| Bad example          | Sukurk man pardavimų ataskaitą.                                                                                          |
| Bad problem          | Problema: neaiški perspektyva                                                                                            |
| Good label           | ✓ Geras                                                                                                                  |
| Good example (ilgas) | Tu esi vyresnysis verslo analitikas su 10 metų patirtimi...                                                              |
| Komponentai heading  | Meta bloko komponentai:                                                                                                  |
| Rolė                 | Rolė: specializacija, patirties lygis                                                                                    |
| Domeno kontekstas    | Domeno kontekstas: pramonė, specifika                                                                                    |
| Tikslinė auditorija  | Tikslinė auditorija: kam skirtas rezultatas                                                                              |
| Verslo kontekstas    | Verslo kontekstas: kodėl tai svarbu                                                                                      |
| Šablono label        | Kopijuojamas šablonas                                                                                                    |
| Šablono tekstas      | META: Tu esi [vaidmuo]. Tikslas: [rezultatas]. Auditorija: [kam].                                                        |

### 2.3. InputBlockSlide

| Vieta                  | LT tekstas                                                                  |
| ---------------------- | --------------------------------------------------------------------------- |
| Klausimas              | Klausimas: Kokia faktinė informacija, duomenys, apribojimai?                |
| Paaiškinimas           | Input blokas nurodo KONKREČIUS duomenis... Aiškus input = aiškus output.    |
| Ką įtraukti            | Ką įtraukti į Input bloką?                                                  |
| 4 bullet'ai            | Konkretūs skaičiai..., Dokumentų ištraukos..., Apribojimai..., Taisyklės... |
| Bad label              | ❌ Ne konkretus input:                                                      |
| Bad example            | Įvertink mūsų pardavimus.                                                   |
| Good label             | ✓ Konkretus input:                                                          |
| Good example           | Įvertink Q3 2024 pardavimus. Duomenys: 250k EUR...                          |
| Šablono label/template | Kopijuojamas šablonas / INPUT: Duomenys: [faktai/skaičiai]...               |

### 2.4. OutputBlockSlide

| Vieta                                                                                       | LT tekstas                                             |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Klausimas                                                                                   | Klausimas: Kokio formato ir struktūros noriu?          |
| Paaiškinimas                                                                                | Output blokas nurodo TIKSLŲ rezultato formatą...       |
| Pavyzdys heading                                                                            | Pavyzdys: Q4 Pardavimų Analizės Ataskaita              |
| Formatas / Struktūra / list items / Papildomi reikalavimai / Kalba, Tonas, Stilius, Priedai | Visi LT                                                |
| Formatų tipai / Reikalavimai                                                                | Lentelė, Dokumentas... / Ilgis, Detalumo lygis...      |
| Šablono label/template                                                                      | Kopijuojamas šablonas / OUTPUT: Format: [struktūra]... |

### 2.5. Kitos skaidrės (ReasoningModelsSlide, ReasoningBlockSlide, QualityBlockSlide, AdvancedParameters2Slide, FullExampleSlide)

Visos turi dešimtis hardcoded LT stringų (hero tekstai, „Kada naudoti“, šablonai, lentelės, taisyklės). Pirmajame etape sutvarkomi **Meta**, **Input**, **Output** (P1); likusios – P2.

---

## 3. i18n strategija Modulio 1 blokų skaidrėms

- **Namespace:** `contentSlides` (jau naudojamas ContentSlides; BlockSlides naudoja tą patį, kad būtų viena vieta skaidrės tekstams).
- **Raktų prefiksas:** `block*` – pvz. `blockWhyHeading`, `blockMetaQuestion`, `blockMetaBody`, `blockMetaBadLabel`, `blockMetaGoodLabel`, `blockMetaGoodExample`, `blockMetaComponentsTitle`, `blockMetaRole`, `blockMetaDomainContext`, `blockMetaAudience`, `blockMetaBusinessContext`, `blockMetaTemplateLabel`, `blockMetaTemplate`. Analogiškai `blockInput*`, `blockOutput*`.
- **META šablono SOT:** Žr. `docs/development/META_BLOCK_SOT.md`. Vertimai laikomi `lt.json` / `en.json`; JSON skaidrėse (modules-en) title/subtitle lieka kaip dabar.
- **Implementacija:** `BlockSlides.tsx` – `useTranslation('contentSlides')`, visi rodomi stringai per `t('contentSlides:blockMetaQuestion')` ir pan. OptionalWhySections fallback – `t('contentSlides:blockWhyHeading')`.

### 3.1. Turinys iš skaidrės JSON (ne iš locale)

**VeiksmoIntroBlock** ir bet koks kitas turinys, kuris ateina iš **slide.content** (pvz. `content.veiksmoIntro`, `content.whyBenefit`), **keičiamas tik per modulio duomenis**, ne per `lt.json` / `en.json`:

| Šaltinis                                                  | Failas LT                                                    | Failas EN                                                      | Pastaba                                                                                 |
| --------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| slide.content.veiksmoIntro (trumpai, darykDabar, patikra) | `modules.json` – atitinkamos skaidrės `content.veiksmoIntro` | `modules-en.json` – tos pačios skaidrės `content.veiksmoIntro` | Kai locale = EN, modulesLoader įkelia modules-en.json → skaidrės content jau angliškai. |
| Skaidrės title, subtitle, keyQuestion                     | modules.json                                                 | modules-en.json                                                | Taip pat per modulio JSON.                                                              |
| UI etiketės, laiko žymos („1. Benefit“, „30 s“)           | lt.json (contentSlides.veiksmoStep1Label, veiksmoTime30s)    | en.json                                                        | VeiksmoIntroBlock naudoja t() tik etiketėms; pats intro tekstas – iš content.           |

**Praktiška taisyklė:** Jei tekstas rodomas iš **slide.content.xxx** – EN versijai redaguok **modules-en.json** atitinkamos skaidrės `content`. Jei tekstas generuojamas **React komponente** (hardcoded arba per t()) – EN versijai naudok **en.json** (contentSlides namespace).

**Modulio 1 atveju:** `modules-en.json` jau turi anglų `veiksmoIntro` skaidrėms Reasoning models, Reasoning, Quality, Advanced, Advanced-2 – trumpai, darykDabar, patikra pateikti angliškai. Locale = EN → šis turinys rodomas be papildomų pakeitimų locale failuose.

---

## 4. Rankinio EN/LT perėjimo checklist (Modulio 1)

Po pataisymų (Meta, Input, Output blokų i18n) rekomenduojama rankinė patikra:

1. **Paleisti:** `npm run dev`, atidaryti Modulį 1.
2. **LT režimas:** Kalba LT – peržiūrėti skaidres 10, 11, 12 (1 Meta block, 2 Input block, 3 Output block). Patikrinti, kad visi tekstai lietuviškai (klausimas, paaiškinimas, Blogas/Geras, komponentai, šablonas).
3. **EN režimas:** Perjungti kalbą į EN – tą pačią modulį atidaryti iš naujo arba pereiti į kitą modulį ir atgal. Skaidrės 10–12 turi būti **visiškai anglų kalba** (Question: Who are you..., Meta block components, Copyable template ir pan.).
4. **Likusios skaidrės (13–21):** Reasoning models, Reasoning, Quality, Advanced – dar turi hardcoded LT. EN režime bus mišri kalba (antraštės iš JSON – EN, kūnas – LT). Tai P2 darbas.

Jei 2–3 žingsnyje viskas atitinka – P1 uždavinys atliktas.

---

## 5. Kas liko (santrauka)

| Prioritetas | Kas                                       | Kur                                                                                                                              | Pastaba                                                                                                                                                                           |
| ----------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ~~P2~~ ✅   | **Modulio 1 blokų skaidrės 13–21**        | `BlockSlides.tsx` + lt.json/en.json (blockReasoningModels*, blockReasoning*, blockQuality*, blockAdvanced2*, blockFullExample\*) | **Atlikta (2026-03):** Visi šie komponentai perėję į i18n; EN režime skaidrės 13–21 rodo anglų kūną.                                                                              |
| P1/P2       | **Bendra EN UI** (ne tik M1)              | Žr. LT_EN_UI_KOKYBES_VERSTIMO_RIZIKOS_ANALIZE.md                                                                                 | ToolsPage + tools-en, PromptLibrary + promptLibrary-en, QuizPage likę LT stringai, ModuleCompleteScreen aria/cta, ContentSlides/TestPracticeSlides fallback'ai, m5/m6 handout EN. |
| P3          | SlideContent klaidos, ModuleView TRAIL EN | SlideContent.tsx, ModuleView.tsx                                                                                                 | „Skaidrei trūksta turinio“, „Skaidrės tipas neatpažintas“; EN stopwords „Continue“.                                                                                               |

**Padaryta:** Meta, Input, Output (P1) + Reasoning models, Reasoning, Quality, Advanced-2, Full Example (P2) – visos Modulio 1 blokų skaidrės per contentSlides.block\*; VeiksmoIntroBlock turinys (trumpai, darykDabar, patikra) – iš **modules-en.json** atitinkamos skaidrės, ne iš locale (žr. §3.1).
