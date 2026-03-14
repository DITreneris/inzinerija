# Golden standard – vienas etalonas viskam

> **Paskirtis:** Vienas dokumentas – visi standartai: šriftai, spalvos, blokų hierarchija, skaidrių tipai ir jų užpildymo schemos, turinio išdėstymas, modulio identitetas. **CONTENT_AGENT, UI_UX_AGENT, DATA_AGENT ir CODING_AGENT privalo laikytis šio dokumento.**
> **Versija:** 2.3.7  
> **Data:** 2026-03-14  
> **2.3.7:** §2.1 Paletė – pridėta `gold: #f3cc30` spalva (brand žaibas, hero CTA, dark mode glow). Centralizuota per `tailwind.config.js` ir CSS custom property `--brand-gold`. Sync su promptanatomy.app.  
> **2.3.6:** Haliucinacijų ir žinių patikrinimo tema – **Modulyje 7** (blokas „Patikrumas ir etika“, skaidrės Haliucinacijos 67.8, Žinių patikrinimas 68). Skaidrėse ir SOT nuorodos į šią temą turi rodyti į Modulį 7, ne į Modulio 4 (4.6). Žr. `docs/MODULIO_7_SKAIDRIU_EILES.md`, `docs/turinio_pletra_moduliai_7_8_9.md`.  
> **2.3.5:** §5.5 Sticky stacking – AppNav nustato `--app-nav-height` CSS kintamąjį (ResizeObserver); visi sticky elementai po AppNav naudoja `top-[var(--app-nav-height,4rem)]`, ne hardcoded `top-16`. Z-index hierarchija dokumentuota.  
> **2.3.4:** §3.6 Footerių ilgis – įgyvendinta rekomendacija ≤55 simb.; visi „Toliau – skaidrė N“ / „Next – slide N“ footeriai sutrumpinti (shortTitle arba rankinis sutrumpinimas). Žr. `docs/development/analysis/FOOTER_NEXT_SLIDE_ANALIZE.md`.  
> **2.3.3:** §3.7 Sertifikatai moduliuose – atkartojamas golden standard (kada išduoti, duomenys, PDF maketas, UI); privaloma websiteUrl/websiteCta; receptas naujiems moduliams; §9, §10 atnaujinti.  
> **2.3.2:** §3.2 Peržiūrėti pilname dydyje (enlarge) – kada reikia, kada ne; palyginimo vaizdai, section.image fallback, workflowImages, paprastos diagramos – paprastas img (ne EnlargeableImage).  
> **2.3.1:** §8.5 Skaidrių navigacijos taškai – viena eilutė, horizontalus scroll ilgiems moduliams (ne 4+ eilės wrap).  
> **2.3.0:** §3.4c Skiriamoji / apibendrinimo skaidrė (section-break su 3 konceptais).  
> **2.2.1:** §8.4 Modulių puslapis – H1 „Paversk DI savo darbo sistema“, subtitle (legacy idea).  
> **2.2.0:** §3.2a Apšilimo skaidrė, §3.4a warm-up-quiz, §3.4b section-break.  
> **2.1.0:** §3.6 Footeriai (nuoseklūs skaidrių numeriai), checklist ir nuorodos.  
> **Supersedes:** GOLD_STANDARD_MODULIAI_1_2_3.md, DESIGN_GUIDE_MODULIAI_1_2_3.md, QA_DI_VISATA_UI_UX.md, AGENT_SEQUENCE_SKAIDRES_SYSTEM_PROCESO_STRUKTURUOTAS.md (archyvuoti).  
> Techninė kodo bazės apžvalga ir inventorius – **`docs/development/GOLD_LEGACY_STANDARD.md`**.

---

## 1. Šriftai ir tipografija

| Vieta | Šriftas | Tailwind | Naudojimas |
|-------|---------|----------|------------|
| **H1 (skaidrės pavadinimas)** | Plus Jakarta Sans | `text-2xl md:text-3xl font-bold` | Vienas per skaidrę – ModuleView |
| **H2 (poskyrio antraštė)** | Plus Jakarta Sans | `text-lg md:text-xl font-bold` | Blokų heading |
| **H3 (kortelės/bloko antraštė)** | Plus Jakarta Sans | `text-base font-semibold` | Sekcijų heading |
| **Body (pagrindinis tekstas)** | Plus Jakarta Sans | `text-sm md:text-base` | Aprašymai, body |
| **Small (etiketės, šaltiniai)** | Plus Jakarta Sans | `text-xs` | Badge, šaltiniai |
| **Kodas / promptai / šablonai** | JetBrains Mono | `font-mono text-sm` | Copyable blokai, kodo pavyzdžiai |

**Taisyklė:** Vienas H1 per skaidrę. Bold – tik svarbiems žodžiams, ne visai pastraipai.

**Techninis:** `tailwind.config.js` – fontFamily: sans (Plus Jakarta Sans), mono (JetBrains Mono).

---

## 2. Spalvos ir blockVariant hierarchija

### 2.1 Pagrindinė paletė (tailwind.config.js)

| Spalva | Hex (500) | Paskirtis |
|--------|-----------|-----------|
| **brand** | #627d98 | Pasitikėjimas, pagrindinė info, navigacija |
| **accent** | #d4a520 | CTA, pasiekimai, „daryk dabar“, takeaway |
| **gold** | #f3cc30 | Brand akcentas (žaibas), hero CTA, dark mode glow |
| **slate** | #64748b | Neutralūs UI elementai, Testas, antrinė info |

### 2.2 blockVariant – sekcijų spalvų logika

| blockVariant | Tailwind klasės | Kada naudoti |
|--------------|-----------------|--------------|
| **accent** | `bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500` | CTA, „daryk dabar“, takeaway, pirmas žingsnis |
| **brand** | `bg-brand-50 dark:bg-brand-900/20 border-l-4 border-l-brand-500` | Pagrindinė info, proceso žingsniai, kontekstas |
| **terms** | `bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-400` | Šalutinė info, žodynėlis, collapsible, nuorodos |
| **default** | `border-l-4 border-brand-200` | Kai variantas nenurodytas |

**Taisyklė:** Vienoje skaidrėje – max 2 semantinės + 1 CTA. CTA ir „daryk dabar“ – accent; pagrindinė info – brand; papildoma – terms.

### 2.3 Semantinės spalvos (ribotas naudojimas)

| Semantika | Spalva | Naudojimas |
|-----------|--------|------------|
| Success / teisingai | emerald | Teisingas atsakymas, struktūruotas pavyzdys |
| Error / blogas | rose | Nestruktūruotas pavyzdys, klaida |
| Warning / papildoma | amber | Papildoma skaidrė, optional |

---

## 3. Skaidrių tipai ir užpildymo schemos

### 3.1 action-intro

| Laukas | Privalomas | Turinio taisyklė |
|--------|------------|------------------|
| whyBenefit | Taip | Vienas sakinys „kas man iš to?“ |
| heroStat, heroText, heroSubText | Taip | Provokacija + CTA |
| firstActionCTA | Taip | Pirmas veiksmas per ~1 min |
| duration, audience | Ne | Trumpai |
| outcomes | Taip | 3–6 punktų |

**Veiksmo modelis:** Hook (problema + CTA) → Reveal (palyginimas) → Kontekstas.

### 3.2 content-block (veiksmo skaidrės)

**Sekcijų schema:** TL;DR (accent) → Do now (brand) → Copy-paste prompt → Quality check → Optional (terms, collapsible).

| Sekcija | blockVariant | Turinio taisyklė |
|---------|--------------|------------------|
| 1. Trumpai / TL;DR | accent | 1–2 sakiniai, be perteklius |
| 2. Daryk dabar | brand | Aiškus veiksmas; CTA „🔘 Kopijuoti promptą (žemiau)“ |
| 3. Kopijuojamas promptas | — | Vienas blokas; copyable |
| 4. Patikra / Quality check | accent | „Jei bent 2 „ne“ → grįžk prie…“ |
| 5. Optional (collapsible) | terms | „🔽 Nori suprasti detaliau?“ – teorija, nuorodos |

**CTA „(žemiau)“ ir render eilė:** Formuluotę „Kopijuoti promptą (žemiau)“ naudoti **tik tada**, kai UI vizualiai rodo kopijuojamą bloką **po** CTA tekstu. Sekcijų render eilė: pirmiau „Daryk dabar“ (body su CTA), paskiau „Kopijuojamas promptas“ (TemplateBlock). Jei dėl layout promptas būtų virš CTA – vartoti tik „Kopijuoti promptą“ be „(žemiau)“.

**Vienas kopijuoti veiksmas vienai sekcijai:** Vienoje sekcijoje su copyable turiniu – **vienas** mygtukas/nuoroda „Kopijuoti“ (ne antraštėje + dar vienas bloke). „Blokas bloke“ su dviem kopijuoti mygtukais neatitinka §4.2 (vienas dominuojantis CTA) ir §3.2 (vienas blokas).

**Numeracija:** Sekcijų numeracija heading'uose (emoji 1️⃣, 2️⃣, …) **visada prasideda nuo 1** – ne nuo 0.

**Sekcijų antraštės:** Turi būti **savarankiškos** – vartotojas supranta be skaidrės pavadinimo (pvz. ne „Kodėl verta 10 minučių“, o „Kodėl verta skirti ~10 min Master Prompt kūrimui“). Žr. CONTENT_AGENT §3.2.

**Collapsible naudojimas:** Collapsible **taupo vietą** – naudoti tik tada, kai turinys **ilgas** (kelios pastraipos arba ≥2 eilutės ir pakankamai teksto). Viena eilutė ar labai trumpas tekstas (pvz. „Kodėl verta 10 min“, „Prieš vs Po“ su vienu sakiniumi) **nerodomas** kaip collapsible – UI jau trumpas turinys rodo kaip paprastą bloką. Patikra: `node scripts/audit-collapsible-sections.mjs`.

**Peržiūrėti pilname dydyje (enlarge):** Naudoti **tik tada**, kai vaizdas/diagrama **tanki** ir naudinga didinti: daug blokų/teksto schemoje, mažas šriftas, mobilus peržiūrėtojas. **Nenaudoti** (paprastas `<img>` arba nuoroda „Atidaryti naujame lange“): palyginimo vaizdai (comparisonImages – du vaizdai šalia, dekoratyvūs), paprastos ilustracijos, vienas vaizdas jau aiškiai skaitomas normaliame dydyje, workflow paveikslėliai be smulkios informacijos. Taip sumažiname perteklinį UI ir dvigubą render (modal).

**content-block viršuje (M5 ir pan.):** whyBenefit, duration, firstActionCTA – kaip action-intro.

### 3.2a Apšilimo skaidrė (content-block variantas)

**Paskirtis:** Pirmas lengvas praktinis žingsnis prieš sudėtingesnius scenarijus (pvz. M3 prieš 6 scenarijus). Sumažina trintį – vartotojas iš karto „daro“, ne tik skaito.

**Schema:** TL;DR (accent) → Daryk dabar (brand) → Kopijuojamas promptas → Patikra (accent). **Be Optional** – trumpas, low-friction.

| Sekcija | blockVariant | Turinio taisyklė |
|---------|--------------|------------------|
| 1. Trumpai / TL;DR | accent | 1–2 sakiniai – ką gausi per 2–3 min |
| 2. Daryk dabar | brand | „Nukopijuok promptą ir paleisk DI“ |
| 3. Kopijuojamas promptas | — | Vienas blokas; META + INPUT + OUTPUT (trumpas) |
| 4. Patikra | accent | „Jei X – puiku. Jei ne – pridėk…“ |

**Trukmė:** 2–3 min.

**Pavyzdys:** M3 skaidrė id 30.5 „Apšilimas“.

**SOT:** `turinio_pletra.md` § „Apšilimas (Warming-up)“.

### 3.2b evaluator-prompt-block (vienas promptas vertina kitą)

**Paskirtis:** Pedagoginė praktika – **vienas promptas (vertintojas) naudojamas tam, kad įvertintum kitą** (dalyvio promptą). Nėra dviejų konkuruojančių ar identiškų promptų: vertintojas suteikia įvertinimą. Tinka vėlesnėms temoms: **manipuliacijos, haliucinacijos, šaltinių patikrinimas** ir pan. – kai reikia „įvertinimo“ ar „tikrinimo“ prompto ir aiškių žingsnių.

**Struktūra (privaloma):**

| Elementas | Turinio taisyklė |
|-----------|------------------|
| **sections** | Bent viena sekcija su **copyable** = vertintojo promptas (vienintelė pilna versija skaidrėje). Body/heading aiškina: „vienas promptas vertina kitą“. |
| **practicalTask** | **Privalomas.** Ne to paties vertintojo teksto dubliavimas, o **žingsniai**: templateLabel pvz. „Žingsniai: vienas promptas vertina kitą“; template = 4–5 žingsniai (nukopijuok vertintojo promptą → įklijuok į DI → įklijuok savo promptą → gauk įvertinimą) + pastaba „Vertintojas ir tavo promptas – ne konkurentai“. |

**Kada naudoti:** Skaidrėse, kur dalyvis turi **paleisti vertintojo promptą**, o po to **savo** – ir gauti grįžtamąjį ryšį (kokybė, manipuliacijos, haliucinacijos ir t. t.).

**Pavyzdys:** M4 skaidrė id 45 „4 dedamosios“ – vertintojo promptas (4 kriterijai) + žingsniai practicalTask.

**SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` § „4 dedamosios“ (4.1a2).

### 3.2c intro-action-pie (atskleidžiamoji intro su quiz ir statistika)

**Paskirtis:** Atskleidžiamoji intro action skaidrė – leidžia vartotojui **pažinti ir suprasti**: pirmiausia savo pasirinkimą (kur dažniausiai naudoja DI), po to palyginimą su 2026 m. statistika (pie chart).

**Veiksmo modelis:** Klausimas (vienas pasirinkimas iš segmentų) → CTA „Palyginti su statistika“ → Atskleidžiamas blokas „Jūs pasirinkote: [X]“ + pie chart su 2026 m. duomenimis.

| Laukas | Privalomas | Turinio taisyklė |
|--------|------------|------------------|
| question | Taip | Klausimas (pvz. „Kur tu dažniausiai naudoji DI?“) |
| segments | Taip | Tie patys segmentai naudojami ir pasirinkimams (label), ir grafikui (label, value, colorKey) |
| subtitle | Ne | Intro tekstas virš klausimo |
| ctaReveal | Ne | CTA mygtuko tekstas (numatytas: „Palyginti su statistika“) |
| footer | Ne | „Toliau – skaidrė X: …“ |

**Pavyzdys:** M4 skaidrė id 42 „Kam žmonės naudoja GPT?“.

**Action blokas (po insight „Ką tai reiškia tau?“):** Du mygtukai – „Generuok patarimus sau“ (primary/accent, atidaro modalą su pilnu segmento turiniu) ir „Eksportuok PDF“ (secondary, atsisiunčia tik savo segmento PDF). Turinys iš `src/data/introPiePdfContent.json` (7 segmentai): title, top5Tips, mainToolName, additionalToolNames, workflowSteps, glossaryTermNames, systemPrompt, motivationWish. Įrankiai ir žodyno terminai – nuorodos į `tools.json` ir `glossary.json` pagal name/term.

**SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` § „Kam žmonės naudoja GPT?“ (intro action).

### 3.3 summary (santrauka)

**5 blokų modelis** (SOT: `docs/development/SUMMARY_SLIDE_SPEC.md`):

| # | Blokas | Turinys |
|---|--------|---------|
| 1 | Celebration Hero | Gradient brand→accent, „Ką išmokote“, intro body, 3 statistikos |
| 2 | Žinių kortelės | Max 3 kortelės; ikona + heading + items su CheckCircle |
| 3 | Refleksijos promptas | Copyable; 3 klausimai (Apply, Analyze, Create) |
| 4 | Kitas žingsnis CTA | Konkretus tekstas („Pereikite prie Modulio 2“) |
| 5 | Motyvacinis footer | Tagline, formulė |

### 3.4 test-intro, practice-intro

| Laukas | Turinio taisyklė |
|--------|------------------|
| whyBenefit | Vienas aiškus naudos sakinys |
| duration | „~15 min“ arba panašiai |
| firstActionCTA / pirmas veiksmas | Trumpas, konkretus |

### 3.4a warm-up-quiz (savitikra)

**Paskirtis:** Savitikra prieš testą – 3 klausimai su diagnostiniu feedback (pvz. „Čia stipru“, „Jei supainiojote – prisiminkite“). Ne ta pati kaip apšilimas – warm-up-quiz = quiz; apšilimas = content-block praktinis pavyzdys.

**Vieta:** M4 po temų (pvz. id 63.5, 65.7, 66.5, 68.5).

**Turinio schema:** `WarmUpQuizContent` – klausimai, teisingi atsakymai, explanations (diagnostinis tonas).

### 3.4b section-break

**Paskirtis:** Skyriaus skiriamoji skaidrė – vizualiai atskiria temų blokus ilgame modulyje.

**Turinio schema:** `SectionBreakContent` – title, subtitle (optional), sectionNumber (optional), footer (optional). **Neprivaloma įsiminimo/kartojimo skaidrėms:** `recap?: { heading: string; items: string[] }` – blokas „Ką jau supratome?“ su punktais (emerald, CheckCircle); po jo subtitle rodomas kaip „Kas toliau“ blokas (brand). Kai `recap` nėra – tik title + subtitle (centruotas layout).

**Rekomenduojama įsiminimo skaidrėms (section-break su recap):** `celebrationText?: string` – trumpas teigiamas stiprinimas prieš recap (šventimo elementas su Sparkles ikona); `nextSteps?: string[]` – „Kas toliau“ kaip 3–4 trumpi punktai (vietoj ilgo subtitle); `spinoffCta?: { label: string; url: string }` – nuoroda į spinoff išteklių. UI rodo CTA bloką (footer) ir **premium spinoff mygtuką**: accent border (`border-accent-400/500`), Sparkles + ExternalLink ikonos, `shadow-sm` / `hover:shadow-md`, `min-h-[44px]`, atidaroma naujame lange; viena spinoff nuoroda per section-break skaidrę. M4: skaidrė 40.5 = biblioteka (SOT), 52.5 = marketingas (SOT_Marketingas). Kai `itemGlossaryTerms` nurodyti – recap punkte **terminas rodomas kaip nuoroda** į žodynėlį (ne atskiras mygtukas).

**Vizualė (section-break su recap):** Vienas hero, mažiau dėžučių – celebration blokas vizualiai dominuoja; kiti blokai kompaktiški (sąrašai su kairiuoju accentu, ne vienodos didelės dėžutės). **Spalvos – esama brand mėlyna** (ta pati kaip modulių mygtukai „Peržiūrėti“, Pirmyn, tamsus blokas): hero ir pagrindinis CTA – brand; accent – tik mikro (badge „4 tipai įveikta“) ir **spinoff mygtukas** (premium SaaS stilius). **Hero (celebration):** tipografija `text-xl md:text-2xl font-bold`, `leading-snug`; fonas `bg-brand-800 dark:bg-brand-900`, `border-brand-700`; tekstas baltas; Sparkles `w-6 h-6` baltas; optional badge „4 tipai įveikta“ – accent kaip mikro. Recap – sąrašas su `border-l-4 border-emerald-500` ir kontekstinėmis ikonomis; fonas neutralus `bg-slate-50 dark:bg-slate-800/30` (žalia tik kairysis accent ir ikonos). „Kas toliau“ – `pl-4 border-l-4 border-brand-500`. Footer CTA – solid brand (`bg-brand-700 dark:bg-brand-800`), baltas tekstas. **Spinoff** – premium mygtukas: accent border/text, Sparkles + ExternalLink, shadow-sm, hover:shadow-md. Tarpai – `space-y-4`.

**Vieta:** M4 skyriai (pvz. 40.5, 52.5, 65.8, 66.9 – su recap/celebration ten, kur numatyta).

### 3.4c Skiriamoji / apibendrinimo skaidrė (section-break su 3, 5 arba 7 konceptais)

**Paskirtis:** Skyriaus riba su **įsiminimu 3, 5 arba 7 konceptų** ir aiškiu „Kas toliau“. Naudojama kaip skiriamoji / apibendrinimo skaidrė (pvz. M4 skaidrė 40.5 „3 pagrindiniai promptų tipai“, 52.5 su 5 konceptais, 65.8 su 7 promptų technikomis – Sisteminis, Master, Procesas, Metodinis, Agentinis, **RAG promptai**, **Combo promptai**). Etalonas tokioms skaidrėms kurse – perpanaudojamas vizualus šablonas.

**Kada naudoti:** Po 3–7 teminių skaidrių, kai reikia „kvėpavimo pauzės“, įsiminimo (3, 5 arba 7 apibrėžimai / takeaway) ir nukreipimo į kitą skyrių.

**Privalomi laukai:** `type: "section-break"`, `content.title`, `content.celebrationText`, `content.recap` su `heading`, `items` (tiksliai 3, 5 arba 7). **Rekomenduojama:** `recap.lead`, `recap.itemGlossaryTerms`, `recap.progressTotal` (pvz. 7 – badge rodo X/7); `content.nextSteps` arba `content.subtitle`, `content.footer`, `content.spinoffCta` (optional).

**Vizualė (eilė iš viršaus):** (1) Section badge (`sectionNumber`, pvz. „4.1“, „4.2“, „4.4“) – rounded-full, brand. (2) Celebration hero – tamsus brand blokas: Sparkles, „Puiku!“ + antraštė (`celebrationText`); dešinėje badge **„3/7“**, **„5/7“** arba **„7/7“** su progreso juosta (kai `recap.progressTotal === 7`) arba „3/3“, „5/5“, „7/7“ (kai `progressTotal` nenurodyta). (3) Konceptų pills – horizontalus eilė: 3, 5 arba 7 pills (numeris, ikona, etiketė, BookOpen); nuoroda į žodyną per `itemGlossaryTerms`. **3 konceptai:** Sisteminis, Master, Procesas (Settings, User, Repeat). **5 konceptai:** + Metodinis, Agentinis (Wrench, Cpu). **7 konceptai:** + RAG promptai, Combo promptai (FileSearch, Layers). Ateityje galima išplėsti per `content.recap.conceptPills`. (4) Recap blokas – emerald kairysis accent, H3 `recap.heading`, `recap.lead` italic, 3, 5 arba 7 punktai. (5) „Kas toliau“ – brand kairysis accent, `nextSteps` arba `subtitle`. (6) Footer CTA. (7) Spinoff – premium mygtukas (accent border, Sparkles + ExternalLink, shadow-sm/hover:shadow-md, optional).

**Implementacija:** Komponentas `SectionBreakSlide` (`src/components/slides/types/ContentSlides.tsx`). Pills rodomi kai `items.length === 3` (ir `progressTotal === 7`), 5 arba 7; badge rodo `items.length/progressTotal` arba `items.length/items.length`.

**A11y ir UI_UX (žr. UI_UX_AGENT.md §4.2):** Pills – `min-h-[44px]`; hero `aria-label="Skyriaus įveikimas"`; badge `aria-label="X iš Y"` (pvz. „3 iš 7“, „5 iš 7“, „7 iš 7“); pills sąrašas – `aria-label="Promptų tipai – žodyno nuorodos"`; recap sekcija `aria-label={recap.heading}`; mygtukai – `focus-visible:ring-2 focus-visible:ring-brand-500`; visi blokai turi `dark:` variantus; pills – `flex-wrap` responsive.

### 3.4d path-step (kelio žingsnis)

**Paskirtis:** Vienas „Duomenų analizės kelio“ žingsnis – pramaišytas su M7 teorija. Keliautojas atlikęs žingsnį gauna **badge** ir **atrakina** nurodytus terminus žodynėlyje. Vizualiai atpažįstamas (kelias ≠ section-break, ne content-block).

**Turinio schema:** `PathStepContent` – title, stepNumber (1…N), body (trumpas aprašymas) arba sections (content-block panašūs blokai), unlockedGlossaryTerms (string[] – terminų pavadinimai, kurie atrakinti po žingsnio užbaigimo).

| Laukas | Privalomas | Turinio taisyklė |
|--------|------------|------------------|
| title | Taip | Žingsnio pavadinimas (pvz. „Įrankių seka ir workflow“) |
| stepNumber | Taip | Kelio žingsnio numeris (1, 2, … N) |
| body arba sections | Taip | Kas daryti; trumpas tekstas arba sekcijos su heading/body |
| unlockedGlossaryTerms | Rekomenduojama | Terminų pavadinimų masyvas – atrakinti žodynėlyje po „Pažymėjau kaip atliktą“ |

**Vizualė (atpažįstamumas):** „Duomenų analizės kelias“ identitetas – brand + accent juosta arba ikona (kelias/žemėlapis); badge pvz. „Žingsnis 1/N“ arba custom („Lygiagretūs tyrimai“). Skaidrė skiriasi nuo section-break (recap + „Kas toliau“) ir content-block (veiksmo sekcijos).

**Sąveika:** CTA „Pažymėjau kaip atliktą“ – paspaudus žingsnis įrašomas į progresą (`completedTasks[moduleId]`); žodynėlyje terminai iš `unlockedGlossaryTerms` (arba terminai su `unlockedBy: { moduleId, slideId }`) laikomi atrakintais. Užrakinti terminai – pilkai arba su „Atrakink per Modulio 7 kelio žingsnį X“.

**Vieta:** M7 (Duomenų analizės kelias) – path-step skaidrės įterpiamos tarp teorinių (žr. turinio_pletra_moduliai_7_8_9.md §8.2, MODULIO_7_SKAIDRIU_EILES.md).

**Implementacija:** Komponentas PathStepSlide; progresas – completedTasks; GlossaryPage – rodyti locked/unlocked pagal unlockedBy ir completedTasks.

### 3.5 Kiti tipai

- **test-section, test-results:** Žr. GOLD_STANDARD §4 (testas).
- **practice-scenario:** Kontekstas, Duomenys, Apribojimai, Formatas, Užduotis.
- **glossary, definitions:** Terminai su vieno sakinio apibrėžimu.
- **infographic (variant: news-portal):** DI galimybės praktiškai – naujienų portalo stiliumi (ne ataskaita, kvietimas veikti). **Masthead:** optional portalBrand (pvz. „Next Level AI“) + „Žiniasklaida“ – rekiantis prekės ženklas. Struktūra: eyebrow, headline, subline; **takeaway** (viena eilutė, accent – žmogus + rezultatas); featured (hero skaičius + label); optional heroImageVertical; optional horizontal banneriai; KPI strip; section cards (optional imageVertical); tools + youth (optional youthImageVertical); insight kortelė (optional illustrationHorizontal); **ctaBlock** (vienas CTA – accent, pvz. „Toliau: Metodinis ir agentinis promptas“); footer + šaltiniai. Spalvos: brand, accent (CTA, takeaway), slate + semantinės. Iliustracijų slotai: **NEWS_PORTAL_INFOGRAFIC_UI_UX_ANALIZE.md** §4. Duomenų šaltinis – lokaliai archyve (portalas.txt); turinys įkeliamas į `modules.json`.

### 3.6 Footeriai („Toliau – skaidrė N“)

**Principas:** Vartotojas mato skaidrės numerį kaip **nuoseklų sveikąjį skaičių modulyje** (1, 2, 3, …) – atitinka UI „Skaidrė 1/N“, „Skaidrė 2/N“. Footeryje **nenaudojame** skaidrės `id` (kuris gali būti dešimtainis, pvz. 40.8, 63.7).

| Taisyklė | Aprašymas |
|----------|------------|
| **Formatas** | `"footer": "Toliau – skaidrė N: [kitos skaidrės pavadinimas]"`, kur **N** = kitos skaidrės **1-based pozicija** modulyje (ne `id`). |
| **Ilgis** | Rekomenduojama: visas footer tekstas **iki 55 simbolių** (viena eilutė tipiniame ekrane). Jei skaidrė turi `shortTitle`, naudoti jį footeryje; jei vis tiek per ilga – sutrumpinti tik pavadinimo dalį. Žr. `docs/development/analysis/FOOTER_NEXT_SLIDE_ANALIZE.md`. |
| **Kur pridedame** | `content.footer` – skaidrėse, kurios turi `content` objektą. Paskutinė modulio skaidrė (santrauka, rezultatai) – be „Toliau“ arba su CTA, ne su skaidrės numeriu. |
| **Pavyzdys teisingas** | „Toliau – skaidrė 5: DI įrankiai pagal formą“ (5 = penkta skaidrė modulyje). |
| **Pavyzdys neteisingas** | „Toliau – skaidrė 40.8: InstructGPT“ (40.8 = id; vartotojas nematė tokių numerių). |
| **Kitos formos** | Šaltinio / nuorodos footeriai (pvz. „Šaltinis: MIT…“) – be skaidrės numerio; nekoreguojami. |

**Kai skaidrė perkeliama arba keičiama eilė:** Privaloma perskaičiuoti ir atnaujinti visus footerių numerius modulyje – N turi atitikti faktinę 1-based poziciją. Žr. **`.cursor/rules/footer-slide-numbers.mdc`** ir **agent-orchestrator.mdc §7**.

**Taikymas:** Visi moduliai (1–15). DATA_AGENT atsakingas už `modules.json` ir footer atitiktį eilei.

### 3.7 Sertifikatai moduliuose – atkartojamas standartas (golden standard)

**Paskirtis:** Kad sertifikatus būtų galima **atkartoti bet kuriame modulyje** – vienoda struktūra, duomenys, PDF maketas ir UI. Laikantis šio standarto, naujas sertifikatas (pvz. po Modulio 7, 9, 12) pridedamas pagal tą patį receptą.

---

#### 3.7.1 Kada išduoti sertifikatą

| Sąlyga | Pavyzdys (dabartinis) |
|--------|------------------------|
| **Užbaigti moduliai** | Tier 1: moduliai 1–2–3; Tier 2: moduliai 1–6; Tier 3: moduliai 1–9. |
| **Papildoma (optional)** | Testas išlaikytas (pvz. Modulio 5 quiz ≥70%) – tier 2. |
| **Vieta mygtuko** | ModuleCompleteScreen – mygtukas „Parsisiųsti sertifikatą“ rodomas **tik** kai atitinka modulį (pvz. `module.id === 3` arba `module.id === 6`) ir sąlygas (completedModules, quizScore). |

**Receptas naujam moduliui:** Nuspręsti, po kurio modulio išduodamas sertifikatas; ar reikia quiz ribos; pridėti sąlygą ModuleCompleteScreen (pvz. `module.id === 9` ir `canRequestTier3`).

---

#### 3.7.2 Duomenys (certificateContent.json)

**Root (privaloma visiems):**
- `websiteUrl` – oficialus puslapis (pvz. `https://www.promptanatomy.app/`). Rodyti PDF footeryje ir UI.
- `websiteCta` – CTA tekstas nuorodai (pvz. „Kursas ir daugiau: promptanatomy.app“).
- `tiers` – masyvas; kiekvienas elementas = vienas sertifikato lygis (tier).

**Kiekvienam tier (vienas objektas masyve):**

| Laukas | Privalomas | Turinio taisyklė |
|--------|------------|------------------|
| `tier` | Taip | Skaičius 1, 2, 3, … – atitinka lygį (1 = pirmas sertifikatas, 2 = antras, …). |
| `introLine` | Taip | Pirmoji eilutė, pvz. „Šiuo dokumentu patvirtinama, kad“. Vienodas tonas – paprasta kalba. |
| `completionLine` | Taip | Po vardo, pvz. „sėkmingai baigė mokymų programos dalį“ arba „sėkmingai baigė mokymų programą“. |
| `programName` | Taip | Pilnas aprašymas (gali būti kelios eilutės), pvz. „6 blokų sistema – 6 blokai, testas, praktika“. |
| `label` | Taip | Trumpa etiketė sertifikatui (pvz. „6 blokų sistema“, „Konteksto inžinerija“, „Duomenų analitika“). Fiksuota vienam tier. |
| `footerText` | Taip | Footer tekstas, pvz. „Promptų anatomija – promptų struktūros mokymas. © Kurso medžiaga.“ |

**Naujam moduliui:** Pridėti naują tier į `tiers` (arba išplėsti tier sąvoką, jei reikia daugiau lygių). Schema: `scripts/schemas/certificateContent.schema.json` – `tiers` masyvas; jei tier skaičius auga, schema gali leisti `minItems` / `maxItems` atnaujintus.

---

#### 3.7.3 PDF maketas (atkartojamas)

**Eilė dokumente (vienoda visiems tier):**
1. Rėmelis (plonas, pilka).
2. Viršus: „Promptų anatomija“ (mažesnis šriftas), po to „SERTIFIKATAS“.
3. introLine → **vardas** (vartotojo įrašas) → completionLine → programName.
4. Dekoratyvios linijos (accent #d4a520).
5. Data (lt-LT arba pagal locale).
6. Serijinis Nr. (formatas pvz. PA-2026-XXXX).
7. Autoriaus blokas (authorBy, authorProduct), jei pateikta.
8. footerText.
9. **Nuoroda ir CTA** – websiteCta kaip spaudžiama nuoroda (websiteUrl); jei jsPDF neturi textWithLink – tik tekstas.

**Technika:** `src/utils/certificatePdf.ts` – `downloadCertificatePdf(tier, content, learnerName, options?)`. Options: `websiteUrl`, `websiteCta`, `authorBy`, `authorProduct`, `date`, `serialNumber`. Šriftas – NotoSans (lietuviškos raidės); fallback Helvetica.

---

#### 3.7.4 UI (atkartojamas)

| Vieta | Kas |
|-------|-----|
| **ModuleCompleteScreen** | Kai modulis atitinka (pvz. id 3, 6, 9) ir sąlygos tenkinamos – mygtukas „Parsisiųsti sertifikatą“ (aria-label su lygio aprašymu). Po mygtukų – nuoroda „Kursas: promptanatomy.app“ (websiteUrl). |
| **CertificateScreen** | Gauna `tier` (1 | 2 | 3 | …). Rodo maketo peržiūrą, vardo lauką, mygtukus „Grįžti“ ir „Išsaugoti ir parsisiųsti PDF“. Po mygtukų – nuoroda su websiteCta ir ExternalLink ikona. |
| **Navigacija** | Sertifikatas pasiekiamas tik per ModuleCompleteScreen (hidden treasure) arba tiesiogiai per route `/certificate?tier=N` – nėra atskiro meniu punkto. |
| **Lokalizacija** | `certificate.*` (lt.json, en.json): title, introText, nameLabel, namePlaceholder, nameHint, saveAndDownloadButton, back, preparing, contentNotFound, websiteCta, websiteCtaAria, yourNamePlaceholder. |

**Hidden treasure pattern:** Hidden treasure rodomas kaip **Unlock kortelė** – accent blokas (antraštė, body tekstas pagal tier, vienas dominuojantis CTA). Įgyvendinimas: `ModuleCompleteScreen.tsx` (Unlock kortelė, accent blokas, CTA).

**Naujam moduliui:** Pridėti ModuleCompleteScreen sąlygą (pvz. `showCertTier3 && module.id === 9`) ir mygtuką su atitinkamu tier; CertificateScreen jau veikia su bet kuriuo tier iš `certificateContent.tiers`.

---

#### 3.7.5 Privaloma nuoroda ir CTA (visi artefaktai)

Kiekvienas išvesties dokumentas (sertifikatas, PDF handout ir pan.) **privalo** turėti:
- **websiteUrl** ir **websiteCta** – root lygyje duomenyse; rodomi PDF footeryje ir atitinkamame UI (nuoroda po atsisiuntimo mygtuko).

**SOT:** `docs/development/CERTIFICATE_CONTENT_SOT.md` (titulai, tonas, websiteUrl, websiteCta, UI vietos).

---

## 4. Turinio išdėstymas ir kalba

### 4.1 „Kas man iš to?“ (whyBenefit)

Kiekvieno modulio **pirmoji skaidrė** – vienas aiškus naudos sakinys.

| Modulis | Pavyzdys |
|---------|----------|
| 1 | Po šio modulio rašysi promptus 6x geriau nei anksčiau. |
| 2 | Po šio testo tavo žinios išaugs dar 60%. |
| 3 | Po praktinės dalies turėsi 6 paruoštus šablonus kasdieniam darbui. |
| 4 | Po šio modulio klaidų DI atsakymuose sumažės 40%. |
| 5 | Po šio sprinto tu kursi verslo prezentacijas per 15 minučių! |
| 6 | Po projekto turėsi vieną paruoštą artefaktą ir šablonus tolesniam darbui. |

### 4.2 Antraštės ir CTA

- **Antraštės:** Trumpos (3–7 žodžiai), konkretūs.
- **CTA:** „Nukopijuok“, „Užpildyk“, „Paleisk“ – ne „tęskite mokymąsi“.
- **Kreipinys į dalyvį (moduliai 1–6 ir toliau):** Naudoti **tu** (ne Jūs) – vienodai outcomes, instrukcijose, CTA ir kopijuojamuose promptuose („Tu esi…“, „tavo tikslas“). Pagrindas: §4 outcomes lentelė (rašysi, tavo, turėsi, tu kursi).
- **firstActionCTA:** Vienas sakinys – ką daryti per 1–2 min.
- **Vienas dominuojantis CTA:** Pagal „vienos eilutės“ principą – vienoje skaidrėje vienas aiškiai paryškintas pagrindinis veiksmas (pvz. „Pereikite prie Modulio X“, „Kopijuoti promptą“). Antrinius veiksmus („Peržiūrėti“, „Paslėpti“) laikyti antro plano (slate, mažesnis mygtukas arba nuoroda). Sekcijoje su copyable – vienas „Kopijuoti“ mygtukas (žr. §3.2: ne antraštė + bloke).

### 4.3 Paprasta kalba

- **DI**, ne „AI“ (išskyrus citatas, produktų pavadinimus).
- Be nepaaiškinto žargono (ROI, NPS, SWOT, HR, CFO ir pan.). **Žr. `docs/development/PAPRASTOS_KALBOS_GAIRES.md`.**
- Angliški terminai – su paprastu paaiškinimu vienu sakiniu.

### 4.4 Bold ir struktūra

- **Bold** – tik svarbūs žodžiai, ne visą pastraipą.
- Trumpi sakiniai (iki ~20 žodžių).
- Bullet points – kai daugiau nei 2 punktai.

---

## 5. Dizaino sistema (spacing, radius, šešėliai)

### 5.1 Spacing

| Kontekstas | Klasė |
|------------|--------|
| Tarp blokų skaidrėje | `space-y-6` arba `gap-6` |
| Vidinis bloko padding | `p-4` md: `p-5` / `p-6` |
| Skaidrės wrapper | `p-6 md:p-10` |

### 5.2 Border-radius

| Elementas | Klasė |
|-----------|--------|
| Kortelė, didesnis blokas | `rounded-2xl` |
| Mažesnis blokas, mygtukas | `rounded-xl` |
| Badge | `rounded-full` arba `rounded-lg` |

### 5.3 Šešėliai

| Lygis | Klasė |
|-------|--------|
| Default | `shadow-md` |
| Hover | `shadow-lg` |
| CTA | `shadow-brand-500/25` (subtilius) |

**Taisyklė:** Vengti `shadow-2xl` ant kelių elementų vienoje skaidrėje.

### 5.4 Design tokens

**Šaltinis:** `src/design-tokens.ts` – spacing, radius klasės.

### 5.5 Sticky stacking (z-index ir `top` offset)

AppNav aukštis yra **dinaminis** – desktop meniu gali persilaužti į 2 eilutes, kai viewport < ~1280px. Todėl visi sticky elementai po AppNav turi naudoti CSS kintamąjį, ne hardcoded reikšmę.

| Elementas | Pozicionavimas | z-index |
|-----------|---------------|---------|
| AppNav | `sticky top-0` | `z-40` |
| Slide nav (ModuleView) | `sticky top-[var(--app-nav-height,4rem)]` | `z-20` |
| Modal / overlay | `fixed inset-0` | `z-50` |

**Mechanizmas:** `AppNav.tsx` naudoja `ResizeObserver` ir nustato `--app-nav-height` CSS kintamąjį ant `<html>`. Fallback `4rem` (64px) veikia kai kintamasis dar nenustatytas.

**Taisyklė:** Niekada nenaudoti hardcoded `top-16` sticky elementams po AppNav. Visada `top-[var(--app-nav-height,4rem)]`.

---

## 6. Modulio identitetas (badge ir akcentai)

| Modulis | Badge | CTA / akcentas |
|---------|-------|----------------|
| 1 (Mokymas) | brand | brand → accent gradient |
| 2 (Testas) | slate | brand mygtukai, ramus tonas |
| 3 (Praktika) | slate | accent tik 1–2 CTA |
| 4–6 | brand (learn), slate (test/practice) | Pagal modulio tipą |

**Bendras principas:** Vienas akcentas per kontekstą; neutralūs fonai (slate/gray).

---

## 7. Prieinamumas (a11y)

- Touch targets: min 44px (py-1.5 px-3 badge'ams).
- Interaktyvūs: `aria-label`, `role="button"`, `tabIndex={0}`, `onKeyDown` (Enter/tarpas).
- Focus: `focus:ring-2 focus:ring-brand-500 focus:ring-offset-2`.
- Dark mode: visi blokai turi `dark:` variantus.

---

## 8. Pedagogika ir vartotojo kelionė

### 8.1 Mokymosi seka (Bloom)

Žinoti → Suprasti → Prisiminti (testas) → Taikyti (praktika).

### 8.2 Modulių eilė ir atrakinimas

Modulis N atrakintas, kai `progress.completedModules` turi (N-1).

### 8.3 Testas (Modulis 2, 5)

- PASS_THRESHOLD: 70%.
- Klausimų tipai: mcq, true-false, matching, ordering, scenario.
- Remediacija: relatedSlideId, radar chart, deep link.

### 8.4 Modulių puslapis (ModulesPage) – legacy idea

**H1 ir subtitle** – etalonas, keisti tik pagal SOT / vartotojų atsiliepimus:

| Elementas | Tekstas |
|-----------|---------|
| **H1** | Paversk DI savo darbo sistema |
| **Subtitle** | Kiekvienas modulis – realios užduotys, verslo scenarijai ir šablonai. |

**Taisyklė:** H1 ir subtitle nesidubliuoja. Implementacija: `src/components/ModulesPage.tsx`.

### 8.5 Skaidrių navigacijos taškai (ModuleView)

**Problema:** Ilguose moduliuose (pvz. M4 ~41, M7 ~50 skaidrių) taškai, rodantys „kuri skaidrė“, dėl riboto pločio ir `flex-wrap` persidėlioja į kelias eilutes (4+), kas sukuria vizualų triukšmą ir prastą navigacijos patirtį.

**Geriausia praktika (legacy standard atnaujintas):**

| Taisyklė | Aprašymas |
|----------|-----------|
| **Viena eilutė** | Taškai **niekada** nepersidėlioja į kelias eilutes – naudoti `flex-nowrap`. |
| **Horizontalus scroll** | Kai skaidrių daug – konteineris su `overflow-x-auto`, `scroll-smooth`; vartotojas slenka taškų juostą horizontaliai. |
| **Ilgi moduliai (>24 skaidrės)** | Mažesni taškai: touch target 36px (vietoj 44px), aktyvus taškas proporcingai mažesnis – daugiau telpa į matomą plotį, mažiau reikia slinkti. |
| **A11y** | Konteineriui `role="group"` ir `aria-label` su skaidrių skaičiumi (`slideDotsAria`); kiekvienas taškas – `aria-label` „Eiti į skaidrę N“, `aria-current` dabartinei. |

**Implementacija:** `src/components/ModuleView.tsx` – blokas „Slide dots“. Vertimai: `module.slideDotsAria` (lt/en).

---

## 9. Nuorodos ir failai

| Sritis | Failas |
|--------|--------|
| Turinio SOT (1–3) | turinio_pletra.md |
| Turinio SOT (4–6) | docs/turinio_pletra_moduliai_4_5_6.md |
| Turinio SOT (7–9) | docs/turinio_pletra_moduliai_7_8_9.md |
| Modulių atpažinimas | docs/CONTENT_MODULIU_ATPAZINIMAS.md |
| Santraukos skaidrės | docs/development/SUMMARY_SLIDE_SPEC.md |
| Paprasta kalba | docs/development/PAPRASTOS_KALBOS_GAIRES.md |
| Spalvos, šriftai | tailwind.config.js |
| Design tokens | src/design-tokens.ts |
| Skaidrių routing | SlideContent.tsx, ModuleView.tsx |
| Duomenys | src/data/modules.json |
| Tipai | src/types/modules.ts, scripts/schemas/modules.schema.json |
| **Footeriai (nuoseklūs nr.)** | .cursor/rules/footer-slide-numbers.mdc, agent-orchestrator.mdc §7 |
| **Skaidrių taškai (navigacija)** | ModuleView.tsx §8.5 – viena eilutė, overflow-x-auto, ilgiems moduliams mažesni taškai |
| **Sertifikatai moduliuose (atkartojamas standartas)** | §3.7 – kada išduoti, certificateContent.json (tiers, websiteUrl, websiteCta), PDF maketas, UI; CERTIFICATE_CONTENT_SOT.md |

---

## 10. Checklist naujoms skaidrėms

- [ ] whyBenefit – vienas sakinys (pirmoje skaidrėje)
- [ ] blockVariant – accent (CTA), brand (info), terms (papildoma)
- [ ] Antraštės trumpos (3–7 žodžių)
- [ ] DI, ne AI; paprasta kalba
- [ ] Bold tik svarbiems žodžiams
- [ ] content-block: TL;DR → Do now → Copy → Quality check → Optional
- [ ] **Footer (jei skaidrė turi „Toliau“):** nuoseklus numeris (1, 2, 3…), ne skaidrės `id`; formatas „Toliau – skaidrė N: [pavadinimas]“ (§3.6)
- [ ] **Naujas sertifikatas moduliui:** §3.7 – tier į certificateContent.json (introLine, completionLine, programName, label, footerText); root websiteUrl, websiteCta; ModuleCompleteScreen sąlyga + mygtukas; tas pats PDF maketas ir CertificateScreen; nuoroda po mygtukais
- [ ] Touch targets min 44px (trumpi moduliai) arba 36px ilgiems (>24 skaidrės); aria-label interaktyviems; skaidrių taškai – viena eilutė + horizontalus scroll (§8.5)
- [ ] Dark mode variantai

---

*Šis dokumentas – vienintelis golden standard. Kontrolės: CONTENT_AGENT, UI_UX_AGENT, DATA_AGENT, CODING_AGENT.*
