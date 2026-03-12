# LT → EN UI kokybės vertimo rizikos analizė

**Apimtis:** nuo Home page iki Modulio 6 pabaigos (visa vartotojo kelionė).  
**Tikslas:** nustatyti didžiausias rizikas, kad EN UI nebuvo kokybiškai išverstas iš LT.

### Įgyvendinimo būsena (planas: LT EN UI vertimo planas)

- **P1 (atlikta):** QuizPage – `backToHome`, `completedModulesCount`, `questionLabel` per t(); ToolsPage – i18n, getTools(locale), MODULE_LABELS iš getModulesSync(locale); PromptLibrary – i18n, getPromptLibrary(locale); tools-en.json, toolsLoader; promptLibrary-en.json, promptLibraryLoader.
- **P2 (dalis):** ModuleCompleteScreen – aria certAriaPart1/Part2, handoutCtaLabel, track cta_label per t(); M6 handout – getM6HandoutContent(locale), m6HandoutContent-en.json, handoutContentLoader; GlossaryPage – MODULE_LABELS iš getModulesSync(locale), glossary:moduleN.
- **P3 (atlikta):** SlideContent – slideMissingContent, slideTypeUnknown per t(); ModuleView – TRAIL_EN stopwords, kai locale === 'en'.
- **Faze A–D (atlikta, planas EN UI likusios spragos):** ModuleCompleteScreen – progressLabel, backToModules, startQuiz, continueToNextModule, courseLinkAria/Text, viewPart1SummaryAria/Label per t(); M5 handout – m5HandoutContent-en.json, getM5HandoutContent(locale), TestPracticeSlides naudoja loaderį; ContentSlides – cardFallback, next/finish, openToolsListAria, expandCollapseAria, presentationToolsAria, sectionCompleteAria, linkToModule1, trainingCompleteTitle, toolsForCategoryAria, recommendedToolAria/StatusAria, copyPrompt/copyReflectionPromptAria, whatToDoNextAria, showSourcesAria, markStepDoneAria, getM6HandoutContent(locale); TestPracticeSlides – testCompleteTitle, resultLabel, completedLabel, notAddedLabel, goToSummaryAria, backToFirstChoiceAria, M5 fallback raktai (m5IntroTitleDefault, m5IntroBodyDefault, m5ThresholdsTextDefault, passedTitleDefault, passedMessageDefault, failedTitleDefault, failedMessageDefault), aria (pdfHandoutAria, moduleMeaningAria, yourTaskAria, whereToApplyQAria, optionalPracticeAria, recommendedStartAria, firstStepAria, storyBlockAria, taskFrameAria, scenarioChoiceAria, situationAria, shortReflectionAria, scenarioIntroAria, copyReflectionPromptAria).
- **Schemų/diagramų blokai (planas EN UI schemos moduliai 1–6) – visi atlikti:** **P1 LlmArch:** llmArchLayout getters; Block + Diagram useLocale. **P2 Schema3:** schema3Labels.ts, schema3StepExplanations EN, Block + Diagram. **P3 DiPrezentacijos:** stepExplanations DI_PREZENTACIJOS_EN + getter, diPrezentacijosWorkflowConfig.ts, Block + Diagram. **P4 StrukturuotasProcesas:** strukturuotasProcesasStepExplanations EN + block labels getter, Block. **P5 RagDuomenuRuosimas:** ragDuomenuRuosimasLayout EN steps + block labels getter, Block + Diagram. **P6 AgentOrchestrator:** diagrams.agentOrchestratorAlt (lt/en.json), useTranslation. **P7 RlProcess:** getRlStepExplanations(locale), RL_BLOCK_LABELS lt/en. **P8 TurinioWorkflow:** getTurinioWorkflowStepExplanations(locale), TURINIO_BLOCK_LABELS lt/en.

---

## 1. Santrauka

| Prioritetas | Rizika | Vieta | Poveikis EN vartotojui |
|-------------|--------|--------|-------------------------|
| **P1** | ToolsPage – visas UI lietuviškai, be i18n | ToolsPage.tsx | Įrankiai puslapyje 100 % LT |
| **P1** | PromptLibrary – visas UI ir duomenys LT | PromptLibrary.tsx, promptLibrary.json | Home „Promptų biblioteka“ visada LT |
| **P1** | QuizPage – keli raktiniai tekstai hardcoded LT | QuizPage.tsx | „Atgal“, „Baigta modulių“, „Klausimas“ – LT |
| **P1** | tools.json – vienintelis failas, LT aprašai/kategorijos | src/data/tools.json | Įrankių sąrašas ir filtrai – LT |
| **P2** | ModuleCompleteScreen – aria-label ir track LT | ModuleCompleteScreen.tsx | A11y ir analitika – LT frazės |
| **P2** | GlossaryPage – MODULE_LABELS tik LT | GlossaryPage.tsx | Filtro „Modulis N – …“ – LT |
| **P2** | ContentSlides – daug hardcoded LT (tab, CTA, aria) | ContentSlides.tsx | Skaidrės viduje: kortelės, mygtukai, aria – LT |
| **P2** | TestPracticeSlides – fallback tekstai ir rodomi stringai LT | TestPracticeSlides.tsx | Mini testai, rezultatų žinutės – LT |
| **P2** | m5/m6 handout PDF – vienas turinys, be locale | m5HandoutContent.json, m6HandoutContent.json | EN vartotojas gauna LT PDF |
| **P3** | SlideContent – klaidos ir „neatpažintas tipas“ LT | SlideContent.tsx | Klaidos – LT |
| **P3** | ModuleView – CTA „Tęsti: …“ – LT stopwords | ModuleView.tsx | EN skaidrės pavadinimuose gali likti „and“, „with“ ir pan. |

---

## 2. Detali analizė pagal sritį

### 2.0 Navigacija (AppNav) – perjungus į LT viršutinis meniu išsikraipo (išspręsta)

- **Simptomas:** Perjungus kalbą į LT, viršutinis meniu (desktop) gali „lūžti“ – elementai perplūsta, persikelia arba išdėstymas būna netvarkingas.
- **Priežastis:** LT meniu etiketės ilgesnės nei EN (pvz. „Pagrindinis“ vs „Home“, „Žodynėlis“ vs „Glossary“, „Apklausa“ vs „Quiz“). Desktop bloke buvo `flex` be `flex-wrap` ir fiksuotas `h-16`, todėl visi mygtukai laikėsi vienoje eilutėje – kai vietos trūko, layoutas lūždavo.
- **Sprendimas (2026-03):** `AppNav.tsx` – viršutiniam konteineriui `min-h-16` vietoj `h-16`, `flex-wrap` ir `gap-y-2`, kairiam blokui (logo + pavadinimas) `flex-shrink-0`; desktop navigacijos blokui `flex-wrap` ir `justify-end`, meniu mygtukams `whitespace-nowrap`. Taip LT režime meniu gali pereiti į dvi eilutes, o ne perplūsti.
- **Papildomas sprendimas (šokinėjimui):** kiekvienam desktop meniu mygtukui pridėta `min-w-[8.5rem]` ir `justify-center`, kad keičiant kalbą (LT↔EN) mygtukų plotis nesikeistų – ilgesnė LT etiketė (pvz. „Pagrindinis“) telpa, trumpesnė EN centruojama toje pačioje vietoje, layoutas nešokinėja.

### 2.0b Frontpage (Home) – dienos režimo gradientas plėšė akis (išspręsta)

- **Simptomas:** Dienos (light) režime viršus (hero) – per stiprūs gradientai ir šešėliai, „plėšo akis“.
- **Low-hanging fruit (2026-03):** (1) **Antraštės gradientas** – `.gradient-text-hero` dienai: `from-brand-800 to-accent-700` → `from-brand-600 to-accent-600`. (2) **Hero ikonos blokas** – gradientas `from-brand-500 to-accent-500` → dienai `from-brand-400 to-accent-400`, šešėlis `shadow-brand-500/20` → `shadow-brand-500/10`; dark režime palikta buvusi stiprumas. (3) **Fono dekoracija** – `bg-brand-400/20` → dienai `bg-brand-400/10`. (4) **Hero CTA mygtukas** – `.btn-hero-cta`: šešėlis sumažintas (opacity 0.45→0.22), gradientas šiek tiek šviesesnis dienai; dark režimui pridėti atskiri stiliai su stipresniu šešėliu. (5) **Duration badge** – dienai `bg-accent-500` vietoj `bg-accent-400`, kad mažiau „rėktų“.

### 2.0c Frontpage – premium SaaS fonas ir gylis (išspręsta)

- **Tikslas:** Ne grynas baltas fonas; premium SaaS kokybė (Stripe / Vercel / Linear stiliaus praktikos).
- **Praktikos (šaltiniai):** Mesh-style – kelios radial gradient „dėmės“ su dideliu blur; off-white pagrindas; kortelės su šešėliais „plūduriuoja“ virš fono.
- **Įgyvendinimas (2026-03):** (1) **App.tsx** – globalus fonas: `via-white` pakeistas į `from-slate-50 via-brand-50/40 to-accent-50/50` (nėra gryno #fff). (2) **HomePage hero** – pridėti 2 papildomi mesh orbs: apačia kairė (accent), viršus kairė (brand), visi su blur-3xl ir žema opacity; hero konteineriui `rounded-3xl`. (3) **Kortelės** – stats grid, features card, quick prompts: `shadow-lg shadow-gray-200/50`, `border border-gray-100/80` (light), dark atitinkamai – gylis ir „premium“ jausmas.

### 2.1 Home page → Modules list

- **HomePage.tsx:** naudoja `useTranslation(['home', 'common'])` ir `QUICK_PROMPTS_EN` / `QUICK_PROMPTS_LT` – **OK**.
- **ModulesPage.tsx:** naudoja `t('modulesPage:...')` ir `useLocale()` – **OK**.
- **PromptLibrary (Home):** **P1 rizika**
  - Nenaudoja `useTranslation` nei `useLocale`.
  - Hardcoded: „Promptų biblioteka“, „Pasirinkite kategoriją…“, „Naudokite taisykles…“.
  - Duomenys: tik `promptLibrary.json` (nėra `promptLibrary-en.json`).
  - **Poveikis:** EN vartotojas vis tiek mato lietuvišką „Promptų biblioteką“ ir visus tekstus.

### 2.2 Įrankiai (Tools)

- **ToolsPage.tsx:** **P1 rizika**
  - Nėra `useTranslation` nei `useLocale`.
  - Visi tekstai lietuviškai: „Įrankiai“, „DI įrankiai, minimi mokymuose“, „Grįžti į modulį“, „Filtruoti pagal modulį“, „Visi moduliai“, „Filtruoti pagal kategoriją“, „Visos kategorijos“, `MODULE_LABELS` (Modulis 1 – …, Modulis 2 – …).
- **tools.json:** **P1 rizika**
  - Vienintelis šaltinis; laukai `description`, `category` – lietuviškai.
  - Nėra `tools-en.json` ar locale-based loaderio (panašaus į glossaryLoader).

### 2.3 Žodynėlis (Glossary)

- **GlossaryPage.tsx:** **P2 rizika**
  - Turinys iš `getGlossary(locale)` – EN/LT **OK**.
  - Bet `MODULE_LABELS` (filtro dropdown) – visi LT: „Modulis 1 – 6 Blokų Sistema“ ir t.t.
  - Fallback `Modulis ${id}` – LT.
- **glossaryLoader.ts:** naudoja `glossary-en.json` – **OK**.

### 2.4 Apklausa (Quiz)

- **QuizPage.tsx:** **P1 rizika**
  - Dauguma stringų per `t('quiz:...')` – **OK**.
  - Hardcoded LT:
    - `<span>Atgal</span>` (apie eil. 140),
    - `Baigta modulių: ...` (apie eil. 144),
    - `Klausimas` (apie eil. 156) – virš klausimo numerio.
- **quiz-en.json:** naudojamas per `modulesLoader` – klausimai EN **OK**.

### 2.5 Modulio peržiūra (ModuleView) ir skaidrės

- **ModuleView.tsx:** 
  - UI naudoja `t('module:...')` – **OK**.
  - **P3:** `nextSlideContextLabel` naudoja LT stopwords regex (`TRAIL = /^(ir|su|iš|ar|be|per|po|nuo|dėl|apie|kaip|savo|kurios|kodėl|tai)$/i`). EN skaidrėse „Continue: …“ gali likti paskutinis žodis (pvz. „and“, „with“) – mažesnė kokybė, ne kritinė.
- **ModuleCompleteScreen.tsx:** **P2 rizika**
  - Aria-label: `t('module:unlockCertCta') + ' (1 dalis)'` / `+ ' (kurso baigimas)'` – lietuviškai.
  - Track: `cta_label: 'Parsisiųsti sertifikatą'`, `cta_label: 'Parsisiųsti Modulio 6 atmintinę (PDF)'`.
  - Aria „Parsisiųsti Modulio 6 atmintinę (PDF)“ – hardcoded LT.
- **ContentSlides.tsx:** **P2 rizika**
  - Tab label fallback: `` `Kortelė ${idx + 1}` `` – LT (kai nėra `tab.heading`).
  - Aria: `` `Atidaryti įrankių sąrašą (Modulis ${moduleId})` ``, `` `Papildoma informacija: ${img.label}` `` – LT.
  - Mygtukai: `'Kitas' : 'Baigti'` (apie eil. 1670).
  - Tekstas: „Ryšys su Moduliu 1“ (apie eil. 1734).
  - Default intro: „Kitas Žingsnis“, „Dabar, kai išmokote…“ (apie eil. 3005).
  - „Mokymas Baigtas!“ (apie eil. 4345, 4374).
- **TestPracticeSlides.tsx:** **P2 rizika**
  - Fallback `introBody`, `thresholdsText`, `passedMessage`, `failedMessage` – lietuviškai.
  - Rodomi stringai: „Testas Baigtas!“, „Rezultatas“, „Peržiūrėkite skaidrę…“, „Peržiūrėkite atitinkamą Modulio 1 skaidrę:“ ir pan.
- **SlideContent.tsx:** **P3**
  - „Skaidrei trūksta turinio“, „Skaidrės tipas neatpažintas“ – LT (dev/klaidos, bet matomi vartotojui).

### 2.6 Sertifikatas ir PDF

- **CertificateScreen.tsx:** naudoja `t('certificate:...')` ir `getCertificateContent(locale)` – **OK**.
- **certificateContent-en.json:** naudojamas – **OK**.
- **m5HandoutContent.json / m6HandoutContent.json:** **P2 rizika**
  - Importuojami tiesiog, be locale. EN vartotojas atsisiunčia LT turinio PDF (Modulio 5/6 handout).

### 2.7 Lokalizacijos failai (locales)

- **lt.json / en.json:** raktų rinkiniai sutampa (namespaces: common, nav, home, module, quiz, glossary, modulesPage, certificate, stepper, testPractice, vaizdoGen, contentSlides, diagrams) – **OK**.
- **lt.json** common turi dubliuotą `"retry"` – tik viena reikšmė naudojama; funkcionalumas **OK**.

### 2.8 Modulių turinys (1–6)

- **modulesLoader.ts:** EN naudoja `modules-en.json` (M1–M3) ir `modules-en-m4-m6.json` (M4–M6) – **OK**.
- **modules-en.json** turi pilną Modulio 1 turinį anglų k.; **modules-en-m4-m6.json** naudojamas M4–M6 – **OK**.

---

## 3. Didžiausios rizikos (prioritetas)

1. **ToolsPage + tools.json** – visas Įrankiai puslapis ir duomenys LT, be EN atitikmens.
2. **PromptLibrary + promptLibrary.json** – visas „Promptų biblioteka“ blokas ant Home – LT.
3. **QuizPage** – „Atgal“, „Baigta modulių“, „Klausimas“ – tiesiogiai matomi EN vartotojui.
4. **ModuleCompleteScreen** – aria ir analitikos etiketės LT; EN vartotojui nekokybiška a11y ir matavimai.
5. **GlossaryPage MODULE_LABELS** – filtras „Modulis N – …“ visada LT.
6. **ContentSlides / TestPracticeSlides** – daug fallback ir rodomų stringų LT skaidrėse (kortelės, CTA, aria, rezultatų žinutės).
7. **m5/m6 handout PDF** – vienas LT turinys; EN vartotojas gauna lietuvišką PDF.

---

## 4. Rekomenduojami žingsniai

| Prioritetas | Veiksmas |
|-------------|----------|
| P1 | Įvesti i18n į **ToolsPage** (nav/arba nauji raktai toolsPage) ir **tools-en.json** (arba locale loaderį kaip glossary). |
| P1 | Įvesti i18n į **PromptLibrary** ir **promptLibrary-en.json** (arba locale loaderį). |
| P1 | **QuizPage:** pakeisti „Atgal“, „Baigta modulių“, „Klausimas“ į `t('quiz:backToHome')`, `t('quiz:completedModules')`, `t('quiz:questionLabel')` (pridėti į en/lt.json). |
| P2 | **ModuleCompleteScreen:** „(1 dalis)“ / „(kurso baigimas)“ ir cta_label/aria – išvesti į locale (module certAriaPart1, certAriaPart2, handoutCta ir pan.). |
| P2 | **GlossaryPage:** MODULE_LABELS generuoti iš locale (glossary.module1Title, …) arba naudoti modulio `title` iš `getModulesSync(locale)`. |
| P2 | **ContentSlides / TestPracticeSlides:** visus hardcoded LT stringus išvesti į contentSlides/testPractice namespace ir naudoti `t()`. |
| P2 | **m5/m6 handout:** įvesti `m5HandoutContent-en.json`, `m6HandoutContent-en.json` ir loaderį pagal locale (kaip certificateContent). |

---

## 5. Failų nuorodos (grep / pataisymams)

- ToolsPage: `src/components/ToolsPage.tsx` (MODULE_LABELS, „Įrankiai“, „Grįžti į modulį“, „Filtruoti…“, „Visi moduliai“, „Visos kategorijos“).
- PromptLibrary: `src/components/PromptLibrary.tsx` („Promptų biblioteka“, „Pasirinkite kategoriją…“, „Naudokite taisykles…“); `src/data/promptLibrary.json`.
- QuizPage: `src/components/QuizPage.tsx` („Atgal“, „Baigta modulių“, „Klausimas“).
- ModuleCompleteScreen: `src/components/ModuleCompleteScreen.tsx` („(1 dalis)“, „(kurso baigimas)“, „Parsisiųsti…“, aria handout).
- GlossaryPage: `src/components/GlossaryPage.tsx` (MODULE_LABELS).
- ContentSlides: `src/components/slides/types/ContentSlides.tsx` (Kortelė, Atidaryti įrankių, Papildoma informacija, Kitas/Baigti, Ryšys su Moduliu 1, Mokymas Baigtas!, Kitas Žingsnis).
- TestPracticeSlides: `src/components/slides/types/TestPracticeSlides.tsx` (introBody, thresholdsText, passedMessage, failedMessage, „Testas Baigtas!“, „Peržiūrėkite…“).
- Handout: `src/data/m5HandoutContent.json`, `src/data/m6HandoutContent.json`; naudojimas `ModuleCompleteScreen`, `ContentSlides`, `TestPracticeSlides`.

---

**CHANGES:** Sukurtas `docs/development/LT_EN_UI_KOKYBES_VERSTIMO_RIZIKOS_ANALIZE.md`.  
**CHECKS:** Peržiūrėta i18n naudojimas (HomePage, ModulesPage, ModuleView, CertificateScreen, GlossaryPage turinys, modulesLoader, glossaryLoader, certificateContentLoader); pagreptas grep hardcoded LT stringų.  
**RISKS:** Be pataisymų EN vartotojai Tools, Prompt Library, dalyje Quiz ir modulio užbaigimo ekrano mato lietuvišką tekstą; a11y ir analitika – LT.  
**NEXT:** (1) P1: ToolsPage + tools-en, PromptLibrary + promptLibrary-en, QuizPage t(). (2) P2: ModuleCompleteScreen aria/cta, GlossaryPage MODULE_LABELS, ContentSlides/TestPracticeSlides i18n, m5/m6 handout EN. (3) P3: SlideContent klaidos, ModuleView TRAIL EN stopwords.
