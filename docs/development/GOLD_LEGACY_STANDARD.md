# Gold Legacy Standard – Promptų anatomija v1.3.0

> **Paskirtis:** Išsami kodo bazės dokumentacija, fiksuojanti production deploy būseną (v1.3.0, 2026-03-16). Šis dokumentas yra **atskaitos taškas** – sistema veikia, moduliai 1–6 deployed, ir bet kokie tolimesni pakeitimai turi būti vertinami šio standarto kontekste.  
> **Apimtis:** Visa kodo bazė, išskyrus modulių 7–15 turinį (jie yra `modules.json`, bet dar neplėtojami).  
> **Versija:** 1.1.0  
> **Data:** 2026-03-14  
> **1.1.0:** Production hardening – pridėti husky, lint-staged, prettier, rollup-plugin-visualizer; .nvmrc, .husky/, public/ brand assets (favicon.svg, apple-touch-icon.png, og-image.png, robots.txt); NPM skriptai typecheck/prepare/analyze; CI pipeline typecheck žingsnis; Tailwind `gold` spalva; Global CSS `--brand-gold`, `btn-hero-cta` auksinis gradientas, `prefers-reduced-motion`, dark mode `#0d0d0d` fonas.  
> Šis dokumentas – **techninė** atspirties būsena. Turinio ir dizaino SOT – **`docs/development/GOLDEN_STANDARD.md`**.

---

## Turinys

1. [Projekto apžvalga](#1-projekto-apžvalga)
2. [Technologijų krūva](#2-technologijų-krūva)
3. [Architektūra ir failų struktūra](#3-architektūra-ir-failų-struktūra)
4. [Duomenų architektūra (Source of Truth)](#4-duomenų-architektūra-source-of-truth)
5. [Komponentų inventorius](#5-komponentų-inventorius)
6. [Utility ir hooks inventorius](#6-utility-ir-hooks-inventorius)
7. [Skaidrių sistema](#7-skaidrių-sistema)
8. [Diagramų ir schemų sistema](#8-diagramų-ir-schemų-sistema)
9. [Duomenų loaderiai ir i18n](#9-duomenų-loaderiai-ir-i18n)
10. [Progreso ir būsenos valdymas](#10-progreso-ir-būsenos-valdymas)
11. [PDF generavimas](#11-pdf-generavimas)
12. [Prieigos valdymas (Access Tier)](#12-prieigos-valdymas-access-tier)
13. [Testų sistema](#13-testų-sistema)
14. [Build sistema ir aliasai](#14-build-sistema-ir-aliasai)
15. [CI/CD pipeline](#15-cicd-pipeline)
16. [Deployment](#16-deployment)
17. [JSON schemos ir validacija](#17-json-schemos-ir-validacija)
18. [Skriptai ir įrankiai](#18-skriptai-ir-įrankiai)
19. [Stilių sistema](#19-stilių-sistema)
20. [Konfigūracija ir aplinkos kintamieji](#20-konfigūracija-ir-aplinkos-kintamieji)
21. [Kritiniai keliai ir priklausomybės](#21-kritiniai-keliai-ir-priklausomybės)
22. [Žinomos konvencijos ir taisyklės](#22-žinomos-konvencijos-ir-taisyklės) (įsk. §22.6 Apsauga nuo tipinių klaidų)

---

## 1. Projekto apžvalga

**Pavadinimas:** Promptų anatomija – Interaktyvus DI mokymas  
**Paketas:** `prompt-anatomy-training` v1.3.0  
**Autorius:** Tomas Staniulis  
**Licencija:** MIT (kodas), © 2024–2026 (turinys)  
**Repozitorija:** `https://github.com/DITreneris/inzinerija.git` (deploy šiam projektui; alternatyva – anatomija)  
**Production URL:** `https://promptanatomy.app/` (marketingo repo integracija)  
**Demo URL:** `https://ditreneris.github.io/inzinerija/` (GitHub Pages; base path turi atitikti repo pavadinimą)

### Kas tai?

Interaktyvi mokymo programa (treniruoklis), mokanti kurti efektyvius DI promptus naudojant **6 blokų sistemą** (Meta, Input, Output, Reasoning, Quality Control, Advanced Parameters). Kursas orientuotas į verslo problemų sprendimą su praktiniu rezultatu.

### Modulių struktūra (1–6, production)

| Modulis | Pavadinimas                                  | Tipas                                                                            |
| ------- | -------------------------------------------- | -------------------------------------------------------------------------------- |
| 1       | **6 Blokų Sistema**                          | Teorija: promptų struktūra, workflow, technikos                                  |
| 2       | **Žinių Patikrinimas**                       | Testas: klausimai su paaiškinimais; sertifikatas nuo 70%                         |
| 3       | **Praktinis Pritaikymas**                    | 6 verslo scenarijai su žingsniais ir pavyzdiniais sprendimais                    |
| 4       | **Konteksto inžinerija**                     | Pažangi teorija: RAG, deep research, tokenai, manipuliacijos                     |
| 5       | **Pažangus testas / prezentacijos sprintas** | Pažangus testas + prezentacijos struktūros rėmelis; ≥70% rekomenduojama prieš M6 |
| 6       | **Projekto kūrimas**                         | Integruotas capstone projektas su 6 blokų sistema ir pažangiomis temomis         |

### Pagrindinės funkcijos

- Pilnas 1→6 modulių kelias su progresu
- LT/EN kalbos palaikymas (moduliams 1–6)
- Žodynėlis (97 terminai LT / EN), Įrankių katalogas (57 įrankiai)
- Promptų biblioteka su kopijavimo funkcija
- Bendras žinių testas (apklausa)
- 2 lygių sertifikatai (PDF su NotoSans, LT diakritika)
- PDF atmintinės (M5, M6)
- Progreso sekimas (localStorage, versija v2)
- Prieigos lygiai per magic link (HMAC-signed)
- Core production profilis (VITE_MVP_MODE=1, tik moduliai 1–6)
- Responsive dizainas, tamsusis/šviesusis režimas
- Lazy loading, Error Boundary, SEO (react-helmet-async)

---

## 2. Technologijų krūva

### Runtime priklausomybės

| Paketas              | Versija  | Paskirtis                                  |
| -------------------- | -------- | ------------------------------------------ |
| `react`              | ^18.2.0  | UI biblioteka                              |
| `react-dom`          | ^18.2.0  | DOM renderinimas                           |
| `i18next`            | ^25.8.14 | Internacionalizacija                       |
| `react-i18next`      | ^16.5.6  | React i18n integracija                     |
| `react-helmet-async` | ^2.0.5   | SEO (title, description pagal puslapį)     |
| `lucide-react`       | ^0.294.0 | Ikonos                                     |
| `jspdf`              | ^4.2.0   | PDF generavimas (sertifikatai, atmintinės) |
| `canvas-confetti`    | ^1.9.4   | Šventimo animacija                         |

### Dev priklausomybės

| Paketas                       | Versija  | Paskirtis                 |
| ----------------------------- | -------- | ------------------------- |
| `vite`                        | ^5.0.8   | Build ir dev serveris     |
| `@vitejs/plugin-react`        | ^4.2.1   | React Vite plugin         |
| `typescript`                  | ^5.2.2   | TypeScript kompiliatorius |
| `tailwindcss`                 | ^3.3.6   | CSS framework             |
| `postcss`                     | ^8.4.32  | PostCSS                   |
| `autoprefixer`                | ^10.4.16 | Autoprefixer              |
| `vitest`                      | ^1.1.0   | Testų framework           |
| `@testing-library/react`      | ^14.1.2  | React testų biblioteka    |
| `@testing-library/jest-dom`   | ^6.1.5   | Jest-DOM matchers         |
| `@testing-library/user-event` | ^14.5.1  | User event simuliavimas   |
| `@vitest/coverage-v8`         | ^1.1.0   | Coverage reportai         |
| `@vitest/ui`                  | ^1.1.0   | Vitest UI                 |
| `jsdom`                       | ^23.0.1  | DOM aplinka testams       |
| `ajv`                         | ^8.17.1  | JSON schemos validacija   |
| `ajv-formats`                 | ^3.0.1   | AJV formatų palaikymas    |
| `axe-core`                    | ^4.11.1  | Accessibility testai      |
| `eslint`                      | ^8.55.0  | Linteris                  |
| `eslint-plugin-react`         | ^7.37.5  | React ESLint taisyklės    |
| `eslint-plugin-react-hooks`   | ^4.6.0   | React hooks taisyklės     |
| `eslint-plugin-react-refresh` | ^0.4.5   | React refresh taisyklės   |
| `@typescript-eslint/*`        | ^6.14.0  | TypeScript ESLint         |
| `husky`                       | ^9.x     | Pre-commit hooks          |
| `lint-staged`                 | ^15.x    | Staged failų lint/format  |
| `rollup-plugin-visualizer`    | ^5.x     | Bundle analysis           |
| `prettier`                    | ^3.x     | Code formatter            |

### Engine reikalavimai

- Node.js ≥18.0.0
- npm ≥9.0.0

---

## 3. Architektūra ir failų struktūra

```
prompt-anatomy-training/
├── .cursor/rules/           # Cursor AI taisyklės (agent orchestrator, content, scheme, etc.)
├── .github/workflows/       # CI/CD (deploy.yml, test.yml)
├── .husky/pre-commit        # Pre-commit hook (lint-staged)
├── .nvmrc                   # Node.js versijos fiksavimas (22)
├── api/                     # Serverless API (verify-access.ts)
├── docs/                    # Dokumentacija
│   ├── deployment/          # Deployment gairės
│   ├── development/         # Programavimo dokumentai, agentų gairės
│   │   ├── analysis/        # Analizių ataskaitos
│   │   └── context-engineering/ # SOT indeksas, konteksto biudžetas
│   └── ...                  # Turinio plėtra, audito ataskaitos
├── public/                  # Statiniai failai (SVG diagramos, šriftai, banneriai)
│   ├── fonts/               # NotoSans-Regular.ttf (PDF, LT diakritika)
│   ├── robots.txt           # SEO – leisti indeksavimą
│   ├── favicon.svg          # Brand žaibas (geltonas ant tamsaus fono)
│   ├── apple-touch-icon.png # iOS home screen ikona (180×180)
│   └── og-image.png         # OG socialinio dalinimosi paveikslas (1200×630)
├── sales-os/                # Pardavimų dokumentai
├── scripts/                 # Build/utility skriptai
│   └── schemas/             # JSON schemos (modules, glossary, tools, etc.)
├── src/
│   ├── components/          # React komponentai
│   │   ├── __tests__/       # Komponentų testai
│   │   ├── slides/          # Skaidrių sistema
│   │   │   ├── shared/      # Bendrieji blokai ir diagramos
│   │   │   │   └── questions/ # Klausimų tipų komponentai
│   │   │   ├── types/       # Skaidrių tipų komponentai
│   │   │   │   ├── content/ # Turinio skaidrės
│   │   │   │   ├── block/   # Blokų skaidrės
│   │   │   │   └── shared/  # Bendri render utilities
│   │   │   └── utils/       # Spalvų stiliai
│   │   ├── stubs/           # Stub komponentai (UnavailableModuleSlide)
│   │   └── ui/              # UI primityvai (Button, Card, Table, Banner, ErrorBoundary)
│   ├── constants/           # Konstantos (pricing.ts)
│   ├── contexts/            # React kontekstai (LocaleContext.tsx)
│   ├── data/                # Duomenų failai ir loaderiai
│   │   └── __tests__/       # Loaderių testai
│   ├── locales/             # i18n vertimų failai (lt.json, en.json)
│   ├── test/                # Test setup ir utilities
│   ├── types/               # TypeScript tipai (modules.ts)
│   └── utils/               # Hooks, utilities, PDF generatoriai
│       └── __tests__/       # Utility testai
├── index.html               # Vite entry point
├── package.json             # NPM konfigūracija
├── tailwind.config.js       # Tailwind CSS konfigūracija
├── tsconfig.json            # TypeScript konfigūracija
├── vite.config.ts           # Vite build konfigūracija
└── vitest.config.ts         # Vitest testų konfigūracija
```

### Entry point seka

1. `index.html` → `<script src="/src/main.tsx">`
2. `src/main.tsx` → `import './i18n'` → `ReactDOM.createRoot` → `<HelmetProvider>` → `<LocaleProvider>` → `<App />`
3. `src/App.tsx` → lazy loads pages, manages routing/progress/celebration/access

---

## 4. Duomenų architektūra (Source of Truth)

### 4.1 Dviejų profilių sistema

Sistema naudoja **dviejų profilių** architektūrą, valdomą per `VITE_MVP_MODE` env kintamąjį:

| Profilis              | Aprašymas                                           | Aktyvavimas                      |
| --------------------- | --------------------------------------------------- | -------------------------------- |
| **Full (authoring)**  | Visi moduliai 1–15, pilnas žodynėlis, visi įrankiai | Numatytasis (be `VITE_MVP_MODE`) |
| **Core (production)** | Tik moduliai 1–6, filtruotas žodynėlis ir įrankiai  | `VITE_MVP_MODE=1`                |

Aliasai `vite.config.ts` persijungia failų kelius:

| Aliasas                      | Full build                    | Core build                   |
| ---------------------------- | ----------------------------- | ---------------------------- |
| `@modules-data`              | `modules.json`                | `modules-m1-m6.json`         |
| `@glossary-data`             | `glossary.json`               | `glossary-m1-m6.json`        |
| `@tools-data`                | `tools.json`                  | `tools-m1-m6.json`           |
| `@tools-en-data`             | `tools-en.json`               | `tools-en-m1-m6.json`        |
| `@m9-characters-data`        | `m9Characters.json`           | `m9Characters-empty.json`    |
| `@ai-detectors-slide`        | `AiDetectorsSlide.tsx`        | `UnavailableModuleSlide.tsx` |
| `@vaizdo-generatorius-slide` | `VaizdoGeneratoriusSlide.tsx` | `UnavailableModuleSlide.tsx` |

### 4.2 Duomenų failų inventorius

#### Pagrindiniai SOT failai (redagavimo šaltiniai)

| Failas                             | Aprašymas                                                       | Turinys                                                         |
| ---------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `src/data/modules.json`            | **Pagrindinis SOT** – visi moduliai, skaidrės, testas, apklausa | ~12,000 eilučių; `{ modules: Module[], quiz: Quiz }`            |
| `src/data/glossary.json`           | Žodynėlis (pilnas)                                              | `{ terms: GlossaryTerm[] }` – 97 terminai                       |
| `src/data/tools.json`              | Įrankių katalogas (pilnas)                                      | `{ tools: ToolItem[] }` – ~57 įrankiai                          |
| `src/data/promptLibrary.json`      | Promptų biblioteka                                              | `{ sections: PromptLibrarySection[] }` – 6 sekcijos             |
| `src/data/certificateContent.json` | Sertifikatų PDF tekstai (LT)                                    | `{ tiers: [tier1, tier2, tier3], websiteUrl, websiteCta, ... }` |
| `src/data/m5HandoutContent.json`   | M5 atmintinės turinys (LT)                                      | `{ title, toolsBullets, sequenceSteps, ... }`                   |
| `src/data/m6HandoutContent.json`   | M6 atmintinės turinys (LT)                                      | `{ title, projectSteps, dataManagementPoints, ... }`            |
| `src/data/introPiePdfContent.json` | Intro-action-pie PDF (LT)                                       | `{ segments: IntroActionPiePdfSegment[7] }`                     |
| `src/data/hallucinationRates.ts`   | Haliucinacijų rodikliai                                         | 9 modelių duomenys (GPT-4, Gemini, Llama, etc.)                 |
| `src/data/aiDetectors.ts`          | DI detektorių duomenys                                          | Detektorių sąrašas su statistika                                |

#### EN vertimo failai (merge overlay)

| Failas                                  | Aprašymas                                       |
| --------------------------------------- | ----------------------------------------------- |
| `src/data/modules-en.json`              | EN vertimas moduliams 1–3                       |
| `src/data/modules-en-m4-m6.json`        | EN vertimas moduliams 4–6                       |
| `src/data/modules-en-us-overrides.json` | US-specifiniai override'ai (pvz. USD, US rinka) |
| `src/data/quiz-en.json`                 | EN baigiamasis testas                           |
| `src/data/glossary-en.json`             | EN žodynėlis                                    |
| `src/data/tools-en.json`                | EN įrankių katalogas                            |
| `src/data/promptLibrary-en.json`        | EN promptų biblioteka                           |
| `src/data/certificateContent-en.json`   | EN sertifikatų tekstai                          |
| `src/data/m5HandoutContent-en.json`     | EN M5 atmintinė                                 |
| `src/data/m6HandoutContent-en.json`     | EN M6 atmintinė                                 |
| `src/data/introPiePdfContent-en.json`   | EN intro-action-pie PDF                         |

#### Core profilio failai (generuojami iš SOT)

| Failas                    | Generuojamas iš                                 | Generavimo skriptas              |
| ------------------------- | ----------------------------------------------- | -------------------------------- |
| `modules-m1-m6.json`      | `modules.json` (moduliai su `id ≤ 6`)           | `scripts/generate-core-data.mjs` |
| `glossary-m1-m6.json`     | `glossary.json` (terminai su `moduleId ≤ 6`)    | `scripts/generate-core-data.mjs` |
| `tools-m1-m6.json`        | `tools.json` (įrankiai su `moduleId ≤ 6`)       | `scripts/generate-core-data.mjs` |
| `tools-en-m1-m6.json`     | `tools-en.json` (EN įrankiai su `moduleId ≤ 6`) | `scripts/generate-core-data.mjs` |
| `m9Characters-empty.json` | Tuščias `{ characters: [] }`                    | `scripts/generate-core-data.mjs` |

#### Klausimų pool (TypeScript, ne JSON)

| Failas                        | Aprašymas                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------ |
| `src/data/questionPool.ts`    | Modulio 2 klausimų pool'as (LT) – kategorijos: meta, input, output, reasoning, quality, advanced |
| `src/data/questionPool.en.ts` | Modulio 2 klausimų pool'as (EN)                                                                  |

### 4.3 Modulio duomenų struktūra

```typescript
interface Module {
  id: number; // 1–15
  title: string; // "6 Blokų Sistema"
  subtitle: string; // Trumpas aprašymas
  description: string; // Pilnas aprašymas
  level: ModuleLevel; // 'beginner' | 'intermediate' | 'advanced'
  icon: ModuleIcon; // 'blocks' | 'quiz' | 'practice' | ...
  slides: Slide[]; // Skaidrių masyvas
  testQuestions?: TestQuestion[]; // Modulio testo klausimai (M2, M5)
  businessExamples?: BusinessExample[];
}

interface Slide {
  id: number; // Unikalus skaidrės ID
  type: SlideType; // ~50+ tipų
  title: string;
  content: SlideContent; // Tipo-specifinis turinys
}
```

### 4.4 Pagrindiniai skaidrių tipai (SlideType)

| Kategorija          | Tipai                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Intro**           | `action-intro`, `intro-action-pie`, `module-intro`, `warm-up-quiz`                                           |
| **Turinys**         | `content-block`, `definitions`, `infographic`, `comparison`, `hierarchy`, `glossary`                         |
| **6 blokai**        | `meta`, `input`, `output`, `reasoning`, `quality`, `advanced`, `full-example`                                |
| **Schemos**         | `prompt-techniques`, `prompt-template`, `workflow-summary`, `productivity-infographic`                       |
| **Testas/Praktika** | `test-intro`, `test-section`, `test-results`, `practice-intro`, `practice-scenario-hub`, `practice-scenario` |
| **Navigacija**      | `section-break`, `transition`, `path-step`, `summary`, `practice-summary`                                    |
| **Specialūs**       | `evaluator-prompt-block`, `di-modalities`, `news-portal-infographic`, `di-paradox-infographic`               |
| **Pažangūs**        | `advanced-veikmo-intro`, `advanced-veikmo-intro-journey`                                                     |

---

## 5. Komponentų inventorius

### 5.1 Root komponentas

#### `src/App.tsx` (~413 eilučių)

- **Funkcija:** Pagrindinis root komponentas – routing, navigacija, progreso valdymas, locale, modulių krovimas, magic link, SEO, celebration overlay
- **Būsena:** `currentPage`, `selectedModule`, `initialSlideIndex`, `remediationFrom`, `progress`, `showCelebration`, `celebrationType`, `modulesData`, `modulesLoadError`, `isDark`, `isMobileMenuOpen`, `toolsInitialFilter`, `glossaryHighlightTerm`, `certificateTier`, `accessTierRefresh`
- **Hooks:** `useState`, `useEffect`, `useCallback`, `useLocale`, `useTranslation`
- **Patterns:** Lazy loading visų pagrindinių puslapių, `Suspense` su `LoadingSpinner`, `ErrorBoundary`, magic link verifikacija

### 5.2 Pagrindiniai puslapių komponentai

| Komponentas             | Eilutės | Props                                                                          | Funkcija                                                                 |
| ----------------------- | ------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `HomePage.tsx`          | ~362    | `onStart`, `onGoToQuiz`, `progress`                                            | Hero, stats, quick prompts, PromptLibrary embed                          |
| `ModulesPage.tsx`       | ~309    | `onModuleSelect`, `onGoToQuiz`, `progress`                                     | Modulių tinklelis su progresu, locked/unlocked būsena, CTA               |
| `ModuleView.tsx`        | ~743    | `moduleId`, `initialSlideIndex`, `onBack`, `onComplete`, `progress`, +12 props | Skaidrių navigacija, resume, progreso valdymas, M2 klausimų pool, M9 hub |
| `QuizPage.tsx`          | ~316    | `onBack`, `progress`, `onQuizComplete`                                         | Apklausos srautas: klausimai, atsakymai, rezultatai                      |
| `GlossaryPage.tsx`      | ~192    | `highlightTerm`, `onBackToModule`, `progress`                                  | Žodynėlis su modulio filtru                                              |
| `ToolsPage.tsx`         | ~179    | `onBackToModule`, `initialFilter`                                              | Įrankių sąrašas su modulio ir kategorijos filtrais                       |
| `CertificateScreen.tsx` | ~176    | `tier`, `onBack`                                                               | Sertifikato peržiūra, vardo įvedimas, PDF atsisiuntimas                  |

### 5.3 Skaidrių turinio komponentas

#### `SlideContent.tsx` (~413 eilučių)

- **Funkcija:** Skaidrių registras – susieja `slide.type` su atitinkamu renderiniu komponentu
- **Pattern:** Lazy-loading skaidrių tipų; `SlideRenderContext` kontekstas su navigacija, progresu, analytics
- **Palaiko:** ~50+ skaidrių tipų

### 5.4 Navigacijos ir UI komponentai

| Komponentas                       | Eilutės | Funkcija                                                                                      |
| --------------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `AppNav.tsx`                      | ~309    | Sticky nav: Home, Modules, Glossary, Tools, Quiz; dark mode; LT/EN; mobile menu; progress bar |
| `ModuleCompleteScreen.tsx`        | ~274    | Modulio pabaigos ekranas: trofėjus, progreso statistika, kitas modulis, M6 handout PDF        |
| `QuizResultsView.tsx`             | ~228    | Rezultatų suvestinė, animuotas score, klaidų sąrašas                                          |
| `Celebration.tsx`                 | ~124    | Animuotas overlay su dalelėmis (task/module/quiz completion)                                  |
| `CircularProgress.tsx`            | ~91     | SVG apvalus progreso indikatorius su gradientu                                                |
| `PromptLibrary.tsx`               | ~144    | Promptų biblioteka su copy-to-clipboard                                                       |
| `HallucinationRatesDashboard.tsx` | ~137    | Haliucinacijų rodiklių bar chart pagal modelius                                               |

### 5.5 Specialūs modulių komponentai

| Komponentas                   | Eilutės | Funkcija                                                             |
| ----------------------------- | ------- | -------------------------------------------------------------------- |
| `AiDetectorsSlide.tsx`        | ~305    | DI detektorių įrankių apžvalga su statistika                         |
| `VaizdoGeneratoriusSlide.tsx` | ~475    | Vaizdo generavimo promptų konstruktorius (platforma, tonas, stilius) |

### 5.6 UI primityvai (`src/components/ui/`)

| Komponentas          | Funkcija                                                                            |
| -------------------- | ----------------------------------------------------------------------------------- |
| `ErrorBoundary.tsx`  | Class error boundary su fallback UI ir retry                                        |
| `LoadingSpinner.tsx` | Spinneris su tekstu (sm/md/lg dydžiai)                                              |
| `CTAButton.tsx`      | Variantai: primary, secondary, accent, hero                                         |
| `Card.tsx`           | Variantai: default, brand, accent                                                   |
| `Table.tsx`          | Lentelė su a11y (Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell) |
| `Banner.tsx`         | Variantai: info, success, warning                                                   |

### 5.7 Stub komponentai

| Komponentas                  | Funkcija                                                                                  |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| `UnavailableModuleSlide.tsx` | Grąžina `null` – naudojamas core build aliasams pakeisti neprieinamus modulių komponentus |

---

## 6. Utility ir hooks inventorius

### 6.1 Pagrindiniai utility

| Failas                    | Eksportai                                                                                                            | Funkcija                                                                                                                                                                                     |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `progress.ts`             | `Progress`, `getProgress`, `saveProgress`, `resetProgress`, `flushProgressSave`, `migrateV1ToV2`, `validateProgress` | Progreso persistencija localStorage su v1→v2 migracija. Debounced save (500ms). Storage key: `prompt-anatomy-progress`                                                                       |
| `logger.ts`               | `logError`, `logWarning`, `logInfo`, `initErrorTracking`                                                             | Console logging su kontekstu ir timestamp. Sentry placeholder. `logInfo` tik DEV                                                                                                             |
| `analytics.ts`            | `track`, `getAnonId`, `getSessionId`                                                                                 | Anoniminė analitika. Events: `slide_view`, `slide_complete`, `practice_start/complete`, `cta_click`, `collapse_open`, `rl_step_click`. Session (30 min inactivity), dedupe. Optional PostHog |
| `accessTier.ts`           | `hasAccessTokenInUrl`, `stripMagicLinkSearchParams`, `getMaxAccessibleModuleId`                                      | Prieigos lygis iš magic link. DEV: max 12. Prod: sessionStorage + env + MVP mode                                                                                                             |
| `mvpMode.ts`              | `getIsMvpMode`                                                                                                       | Grąžina `VITE_MVP_MODE === '1'`                                                                                                                                                              |
| `learningEvents.ts`       | `logLearningEvent`, `getLearningEvents`, `exportEventsAsJson`, `downloadEventsExport`                                | Mokymosi įvykiai localStorage (max 500). Tipai: `module_completed`, `first_action_success`                                                                                                   |
| `sixBlockStructure.ts`    | `SIX_BLOCKS`, `detectBlocks`, `isBlockFilled`                                                                        | 6 blokų struktūros atpažinimas per regex                                                                                                                                                     |
| `certificateStorage.ts`   | `getCertificateName`, `setCertificateName`                                                                           | Sertifikato vardo persistencija localStorage                                                                                                                                                 |
| `renderBold.tsx`          | `renderBold`                                                                                                         | Parsina `**text**` → `<strong>`                                                                                                                                                              |
| `slidePhaseConfig.ts`     | `getPhaseLabel`, `buildSlideGroups`                                                                                  | Fazių etiketės skaidrių progreso juostoms. Modulio-specifinės fazės (M4, M5, M6, M10, M13)                                                                                                   |
| `questionPoolSelector.ts` | `selectQuestions`, `selectQuestionsByCategory`, `assignToSlides`                                                     | Parenka 15 klausimų su kategorijų balansu ir tipų diversifikacija. Fisher–Yates shuffle                                                                                                      |

### 6.2 Custom hooks

| Hook                    | Funkcija                                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| `useAutoSave.ts`        | Debounced localStorage writes. `useAutoSave(key, value, delay)`                                           |
| `useQuizState.ts`       | Apklausos būsena: `currentIndex`, `answers`, `showResults`, `score`, `showExplanation`. Confetti nuo ≥70% |
| `useSlideNavigation.ts` | Skaidrių navigacija su persistencija, touch swipe (60px threshold), keyboard (arrows), optional-skip mode |
| `useTheme.ts`           | Dark mode: init iš localStorage arba `prefers-color-scheme`, sync su `document.documentElement.classList` |
| `useCountUp.ts`         | Animuoja skaičių 0→target per duration su ease-out cubic. `requestAnimationFrame`                         |
| `useStepDiagram.ts`     | Step index būsena diagramų blokams (RL, Turinio, Schema3)                                                 |

### 6.3 PDF generatoriai

| Failas              | Funkcija                                                                                                                                                          |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `certificatePdf.ts` | Sertifikato PDF (3 lygiai). NotoSans šriftas. Layout: programos pavadinimas, sertifikato etiketė, intro, vardas, completion, serialas, data, footer, website link |
| `introPiePdf.ts`    | Intro-action-pie segmento PDF. Sekcijos: Top 5 tips, tools, workflow, glossary, system prompt, motivation                                                         |
| `m5HandoutPdf.ts`   | Modulio 5 atmintinės PDF: tools, 8-slide structure, master prompt, sequence, brief, quality checks                                                                |
| `m6HandoutPdf.ts`   | Modulio 6 atmintinės PDF: project steps (6), data management (5), reflection                                                                                      |

**Bendros PDF savybės:**

- Šriftas: NotoSans-Regular.ttf (iš `/fonts/NotoSans-Regular.ttf`) – palaiko lietuvišką diakritiką
- Brand spalva: `#627d98`, Accent: `#d4a520`
- Biblioteka: jsPDF ^4.2.0

---

## 7. Skaidrių sistema

### 7.1 Architektūra

```
SlideContent.tsx (registras, ~50+ tipų)
├── slides/types/ContentSlides.tsx (~40 slide komponentų)
├── slides/types/BlockSlides.tsx (Meta, Input, Output, Reasoning, Quality, Advanced, FullExample)
├── slides/types/TestPracticeSlides.tsx (TestIntro, TestSection, TestResults, PracticeIntro, PracticeScenarioHub, PracticeScenario)
├── slides/types/content/ActionIntroSlide.tsx
├── slides/types/content/IntroActionPieSlide.tsx
├── slides/types/block/AdvancedBlockSlide.tsx
├── slides/types/block/VeiksmoIntroBlock.tsx
└── slides/types/shared/renderBody.tsx, RecognitionExerciseBlock.tsx
```

### 7.2 Skaidrių registravimo mechanizmas

`SlideContent.tsx` naudoja `switch`/`map` tipo registrą: kiekvienam `slide.type` priskiriamas atitinkamas React komponentas. Lazy-load naudojamas per `React.lazy()` su `Suspense` fallback.

### 7.3 Klausimų tipai (`slides/shared/questions/`)

| Komponentas              | Klausimo tipas                     |
| ------------------------ | ---------------------------------- |
| `McqQuestion.tsx`        | Multiple choice (vienas teisingas) |
| `TrueFalseQuestion.tsx`  | Tiesa/Netiesa                      |
| `MatchingQuestion.tsx`   | Porų atitikimas                    |
| `OrderingQuestion.tsx`   | Rikiavimas                         |
| `ScenarioQuestion.tsx`   | Scenarinis klausimas               |
| `ConfidenceSelector.tsx` | Pasitikėjimo lygio parinkimas      |

### 7.4 Skaidrių tipų komponentų render context

```typescript
interface SlideRenderContext {
  slide: Slide;
  moduleId: number;
  onTaskComplete?: (taskId: string) => void;
  progress: Progress;
  onGoToModule?: (moduleId: number) => void;
  onGoToGlossary?: () => void;
  onGoToGlossaryTerm?: (term: string) => void;
  onGoToTools?: () => void;
  onNextSlide?: () => void;
  practiceScenarioSlides?: PracticeScenarioSlideInfo[];
  onNavigateToSlide?: (index: number) => void;
  onGoToSummary?: () => void;
  onNavigateToSlideById?: (id: number) => void;
}
```

---

## 8. Diagramų ir schemų sistema

### 8.1 Block + Diagram pattern

Kiekviena diagrama naudoja **Block + Diagram** šabloną:

- **Block** (`*Block.tsx`) – wrapper su paaiškinimais, CTA, interaktyvumu
- **Diagram** (`*Diagram.tsx`) – SVG/JSX vizualizacija
- **Config/Layout** (`*Config.ts`, `*Layout.ts`) – koordinatės, spalvos, step paaiškinimai

### 8.2 Diagramų inventorius

| Diagrama                     | Block                                    | Diagram                                               | Config                                                                            |
| ---------------------------- | ---------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------- |
| Custom GPT procesas          | –                                        | `CustomGptProcessDiagram.tsx`                         | –                                                                                 |
| DI prezentacijos workflow    | `DiPrezentacijosWorkflowBlock.tsx`       | `DiPrezentacijosWorkflowDiagram.tsx`                  | `diPrezentacijosWorkflowConfig.ts`                                                |
| RL procesas                  | `RlProcessBlock.tsx`                     | `RlProcessDiagram.tsx`                                | `stepExplanations.ts`                                                             |
| Agentų workflow              | `AgentWorkflowBlock.tsx`                 | `AgentWorkflowDiagram.tsx`                            | –                                                                                 |
| Agentų orkestratorius        | `AgentOrchestratorBlock.tsx`             | `AgentOrchestratorDiagram.tsx`                        | –                                                                                 |
| Schema 3 (LLM RAG)           | `Schema3InteractiveBlock.tsx`            | `Schema3Diagram.tsx`, `Schema3InteractiveDiagram.tsx` | `schema3Layout.ts`, `schema3Labels.ts`, `schema3StepExplanations.ts`              |
| Schema 4 (Multimodal)        | –                                        | `Schema4Diagram.tsx`                                  | `schema4Layout.ts`                                                                |
| LLM architektūra             | `LlmArchDiagramBlock.tsx`                | `LlmArchDiagramDiagram.tsx`                           | `llmArchLayout.ts`                                                                |
| LLM autoregresyvus           | `LlmAutoregressiveBlock.tsx`             | `LlmAutoregressiveDiagram.tsx`                        | `llmAutoregressiveLayout.ts`                                                      |
| Struktūruotas procesas       | `StrukturuotasProcesasBlock.tsx`         | `StrukturuotasProcesasDiagram.tsx`                    | `strukturuotasProcesasStepExplanations.ts`                                        |
| Workflow chains              | `WorkflowChainsBlock.tsx`                | –                                                     | –                                                                                 |
| Turinio workflow             | `TurinioWorkflowBlock.tsx`               | `TurinioWorkflowDiagram.tsx`                          | –                                                                                 |
| Context flow                 | `ContextFlowBlock.tsx`                   | `ContextFlowDiagram.tsx`                              | `contextFlowDiagramLabels.ts`                                                     |
| Workflow palyginimas         | `WorkflowComparisonInteractiveBlock.tsx` | `WorkflowComparisonDiagram.tsx`                       | `workflowComparisonConfig.ts`                                                     |
| RAG duomenų ruošimas         | `RagDuomenuRuosimasBlock.tsx`            | `RagDuomenuRuosimasDiagram.tsx`                       | `ragDuomenuRuosimasLayout.ts`                                                     |
| Context engineering pipeline | –                                        | `ContextEngineeringPipelineDiagram.tsx`               | `ContextEngineeringPipelineConfig.ts`, `contextEngineeringPipelineInteraction.ts` |
| InstructGPT kokybė           | `InstructGptQualityBlock.tsx`            | –                                                     | –                                                                                 |

### 8.3 Bendri vizualizacijos komponentai

| Komponentas              | Funkcija                                           |
| ------------------------ | -------------------------------------------------- |
| `ProcessStepper.tsx`     | Step-by-step stepper su numeriais ir paaiškinimais |
| `EnlargeableDiagram.tsx` | Wrapper – diagrama su „Peržiūrėti pilname dydyje"  |
| `EnlargeableImage.tsx`   | Paveikslėlis su padidinimu                         |
| `FigmaEmbed.tsx`         | Figma iframe embed                                 |
| `RadarChart.tsx`         | Radar chart (pvz. įgūdžių palyginimui)             |
| `CharacterCard.tsx`      | M9 veikėjo kortelė                                 |
| `CopyButton.tsx`         | Copy-to-clipboard mygtukas                         |
| `TemplateBlock.tsx`      | Šablono blokas su kopijavimu                       |
| `PracticalTask.tsx`      | Praktinės užduoties blokas                         |

---

## 9. Duomenų loaderiai ir i18n

### 9.1 Loaderių architektūra

Kiekvienas duomenų tipas turi dedikuotą loaderį su:

- **Cache per locale** – kešuoja LT ir EN atskirai
- **Deep merge** – EN duomenys merginami ant LT bazės pagal `id` lauką
- **Lazy init** – kraunama tik kai reikia

| Loaderis                      | SOT failas                                       | EN failas                                                                                     | Eksportai                                                                                |
| ----------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `modulesLoader.ts`            | `@modules-data`                                  | `modules-en.json` + `modules-en-m4-m6.json` + `quiz-en.json` + `modules-en-us-overrides.json` | `loadModules`, `getModule`, `getModulesSync`, `preloadModules`, `invalidateModulesCache` |
| `glossaryLoader.ts`           | `@glossary-data`                                 | `glossary-en.json`                                                                            | `getGlossary`                                                                            |
| `toolsLoader.ts`              | `@tools-data`                                    | `@tools-en-data`                                                                              | `getTools`                                                                               |
| `promptLibraryLoader.ts`      | `promptLibrary.json`                             | `promptLibrary-en.json`                                                                       | `getPromptLibrary`                                                                       |
| `certificateContentLoader.ts` | `certificateContent.json`                        | `certificateContent-en.json`                                                                  | `getCertificateContent`                                                                  |
| `handoutContentLoader.ts`     | `m5HandoutContent.json`, `m6HandoutContent.json` | `*-en.json`                                                                                   | `getM5HandoutContent`, `getM6HandoutContent`                                             |
| `introPiePdfContentLoader.ts` | `introPiePdfContent.json`                        | `introPiePdfContent-en.json`                                                                  | `getIntroPiePdfContent`                                                                  |

### 9.2 EN turinio merge strategija (modulesLoader)

1. Bazė: `@modules-data` (LT)
2. Overlay 1: `modules-en.json` (M1–M3 EN)
3. Overlay 2: `modules-en-m4-m6.json` (M4–M6 EN)
4. Overlay 3: `quiz-en.json` (EN apklausa)
5. Overlay 4 (tik `en-us` variantas): `modules-en-us-overrides.json`

Deep merge pagal `id` – masyvai merginami pagal elementų `id` lauką.

### 9.3 i18n konfigūracija

**Failas:** `src/i18n.ts`

| Savybė               | Reikšmė                                                                                                                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Biblioteka           | `i18next` + `react-i18next`                                                                                                                                                                                                           |
| Kalbos               | `lt` (numatytoji), `en`                                                                                                                                                                                                               |
| Namespace'ai         | `common`, `footer`, `nav`, `seo`, `home`, `module`, `quiz`, `glossary`, `modulesPage`, `certificate`, `stepper`, `testPractice`, `vaizdoGen`, `contentSlides`, `celebration`, `diagrams`, `toolsPage`, `promptLibrary`, `aiDetectors` |
| Storage key          | `prompt-anatomy-locale`                                                                                                                                                                                                               |
| EN content variantai | `en-lt` (LT rinka, EN kalba), `en-us` (US rinka, EN kalba)                                                                                                                                                                            |
| Locale failai        | `src/locales/lt.json` (~533 eilučių), `src/locales/en.json` (~533 eilučių)                                                                                                                                                            |

### 9.4 Locale kontekstas

**Failas:** `src/contexts/LocaleContext.tsx`

- **Eksportai:** `LocaleProvider`, `useLocale`
- **Kontekstas:** `locale`, `setLocale`, `toggleLocale`
- **Sinchronizuoja:** i18next kalbą, localStorage

---

## 10. Progreso ir būsenos valdymas

### 10.1 Progreso sistema (`progress.ts`)

**Storage key:** `prompt-anatomy-progress`  
**Formatas:** v2 (su automatine v1→v2 migracija)

```typescript
interface Progress {
  version: 2;
  completedModules: number[]; // Baigti moduliai [1, 2, 3]
  completedTasks: string[]; // Baigtos užduotys ["task-3-1", "task-3-2"]
  quizCompleted: boolean; // Baigiamasis testas
  quizScore: number; // Testo rezultatas (0–100)
  moduleTestScores: Record<number, number>; // Modulio testų rezultatai {2: 85, 5: 70}
  lastSlidePositions?: Record<number, number>; // Paskutinė skaidrė modulyje
}
```

**Savybės:**

- Debounced save (500ms) – `flushProgressSave()` priverstiniam sync
- v1→v2 migracija: prideda `moduleTestScores`, `version`
- Skaidrių ID migracijos: M3 (35→37, remove 34), M5 (49–52, 501–504 → 510–514)
- Validacija: tikrina duomenų tipų teisingumą

### 10.2 Skaidrių pozicijos

**Storage key:** `prompt-anatomy-slide-pos`  
**Valdomas per:** `useSlideNavigation` hook

**Funkcijos:**

- Resume (tęsti iš paskutinės pozicijos)
- Touch swipe navigacija (60px threshold)
- Keyboard navigacija (rodyklės)
- Optional-skip mode
- Fast track mode

### 10.3 Auto-save

**Hook:** `useAutoSave(key, value, delay)`

- Debounced localStorage writes
- `loadAutoSave(key)` / `clearAutoSave(key)` – read/clear
- `saveCompletedContent(key, content)` – baigto turinio išsaugojimas

### 10.4 Mokymosi įvykiai (`learningEvents.ts`)

**Storage key:** localStorage  
**Max:** 500 įvykių  
**Tipai:** `module_completed`, `first_action_success`  
**KPI helpers:** `getModuleCompletedCount()`, `getFirstActionSuccessTimestamp()`

---

## 11. PDF generavimas

### 11.1 Bendras šablonas

Visi PDF naudoja:

- **jsPDF** ^4.2.0
- **NotoSans-Regular.ttf** (iš `/fonts/NotoSans-Regular.ttf`) – lietuviška diakritika
- **Brand spalva:** `#627d98` (navy/slate)
- **Accent spalva:** `#d4a520` (auksinė)
- Puslapio dydis: A4 (210×297mm)

### 11.2 Sertifikatų PDF

**3 lygiai (tiers):**

1. **6 blokų sistema** (po M1–M3)
2. **Konteksto inžinerija** (po M1–M6 + M5 ≥70%)
3. **Duomenų analitika** (ateičiai)

**Layout:** Programos pavadinimas → Sertifikato etiketė → Intro → Vardas → Completion → Serialas → Data → Footer → Website CTA

**Serialo generavimas:** `generateSerialNumber()` – unikalus UUID-based

### 11.3 Atmintinių PDF

- **M5 Handout:** Tools, 8-slide struktūra, master prompt, 15 min sprint seka, brief, quality checks, thresholds
- **M6 Handout:** 6 projekto žingsniai, 5 duomenų valdymo punktai, refleksija

### 11.4 Intro-action-pie PDF

7 segmentai: Top 5 patarimai, įrankiai, workflow žingsniai, žodynėlio terminai, system prompt, motyvacinis palinkėjimas

---

## 12. Prieigos valdymas (Access Tier)

### 12.1 Lygiai ir kainos

| Tier | Max modulis   | Kaina                |
| ---- | ------------- | -------------------- |
| 0    | Niekas        | Nemokama (neįsigyta) |
| 3    | Moduliai 1–3  | 39€                  |
| 6    | Moduliai 1–6  | 99€                  |
| 9    | Moduliai 1–9  | 149€                 |
| 12   | Moduliai 1–12 | 199€                 |

### 12.2 Magic link mechanizmas

**API:** `api/verify-access.ts` (serverless function)

**URL formatas:** `?access_tier=6&expires=UNIX_TS&token=BASE64URL_HMAC`

**Veikimas:**

1. Generuojama HMAC-SHA256 nuo `{access_tier}:{expires}` su `ACCESS_TOKEN_SECRET`
2. Patikrinamas per `crypto.timingSafeEqual`
3. Grąžina `{ access_tier: number }` arba klaidos JSON
4. Kliento pusė: `accessTier.ts` → `getMaxAccessibleModuleId()`:
   - DEV: max 12
   - Prod: sessionStorage (verified) → env `VITE_MAX_ACCESSIBLE_MODULE` → MVP mode (6)
   - MVP mode riboja iki 6

### 12.3 Modulių atrakinimo logika

- Modulis 1: visada prieinamas
- Modulis N (N>1): prieinamas, jei modulis N-1 baigtas IR `N ≤ maxAccessibleModule`
- Modulis 6: optional ≥70% Modulio 5 testo

---

## 13. Testų sistema

### 13.1 Konfigūracija

**Framework:** Vitest ^1.1.0  
**Aplinka:** jsdom ^23.0.1  
**Setup:** `src/test/setup.ts`  
**Coverage:** v8 provider, reports: text, json, html

### 13.2 Testų inventorius (26 failai)

#### Utility testai (`src/utils/__tests__/`)

| Testas                                 | Kas testuojama                                |
| -------------------------------------- | --------------------------------------------- |
| `progress.test.ts`                     | Progreso CRUD, migracija v1→v2, validacija    |
| `accessTier.test.ts`                   | Magic link parsimas, tier ribojimas, MVP mode |
| `certificatePdf.test.ts`               | PDF generavimas, šrifto krovimas              |
| `certificateStorage.test.ts`           | Vardo persistencija                           |
| `introPiePdf.test.ts`                  | Intro-pie PDF generavimas                     |
| `m5HandoutPdf.test.ts`                 | M5 atmintinės PDF                             |
| `m6HandoutPdf.test.ts`                 | M6 atmintinės PDF                             |
| `questionPoolSelector.test.ts`         | Klausimų atranka, kategorijų balansas         |
| `sixBlockStructure.test.ts`            | 6 blokų atpažinimas                           |
| `slidePhaseConfig.test.ts`             | Fazių konfigūracija                           |
| `useAutoSave.test.ts`                  | Auto-save hook                                |
| `useSlideNavigation.fastTrack.test.ts` | Fast track navigacija                         |
| `useSlideNavigation.position.test.ts`  | Pozicijos persistencija                       |

#### Loaderių testai (`src/data/__tests__/`)

| Testas                   | Kas testuojama                                |
| ------------------------ | --------------------------------------------- |
| `modulesLoader.test.ts`  | Krovimas, cache, merge, EN variantai, klaidos |
| `glossaryLoader.test.ts` | LT/EN žodynėlio krovimas                      |

#### Komponentų testai (`src/components/__tests__/`)

| Testas                          | Kas testuojama             |
| ------------------------------- | -------------------------- |
| `QuizPage.test.tsx`             | Apklausos komponentas      |
| `ErrorBoundary.test.tsx`        | Error boundary fallback    |
| `CertificateScreen.test.tsx`    | Sertifikato peržiūra       |
| `ModuleCompleteScreen.test.tsx` | Modulio pabaigos ekranas   |
| `ToolsPage.test.tsx`            | Įrankių puslapis           |
| `a11y.smoke.test.tsx`           | Accessibility smoke testas |
| `mvp.gating.test.tsx`           | MVP režimo apribojimai     |
| `App.quiz.integration.test.tsx` | App + apklausa integracija |
| `progress.integration.test.tsx` | Progreso integracija       |

#### Integraciniai testai

| Testas                                | Kas testuojama                                    |
| ------------------------------------- | ------------------------------------------------- |
| `IntroActionPieSlide.pdf.test.tsx`    | Intro-pie PDF skaidrė                             |
| `validate-schema.integration.test.ts` | JSON schemos validacija per `validate-schema.mjs` |

### 13.3 Test setup (`src/test/setup.ts`)

- `process` stub (jsdom compatibility)
- `localStorage` mock su numatytu `prompt-anatomy-locale: 'lt'`
- `window.matchMedia` mock
- `IntersectionObserver` mock (`vi.stubGlobal` + globalThis/window)
- **`ResizeObserver` mock** (`vi.stubGlobal` + globalThis/window/global) – jsdom jo neturi; be mock AppNav ir kiti komponentai, naudojantys ResizeObserver, mesta „ResizeObserver is not defined“ ir CI failina
- `HTMLCanvasElement.getContext` mock (axe-core)
- i18n init prieš testus
- `cleanup()` po kiekvieno testo

**Taisyklė (kad nebūtų tokių klaidų ateityje):** Naršyklės API, kurių jsdom neturi (pvz. `ResizeObserver`), privalo būti **mock'inami** `setup.ts` per `vi.stubGlobal` ir priskyrimą į `window`/`global`, arba komponente naudoti **guard**: tik `window.ResizeObserver` (ne globalų `ResizeObserver`) ir `if (!window.ResizeObserver) return`, kad testuose be mock komponentas tiesiog nevykdytų efekto, o ne kristų.

### 13.4 NPM test komandos

```bash
npm test              # Watch mode
npm run test:run      # Vienkartinis
npm run test:coverage # Su coverage
npm run test:ui       # Vitest UI
```

---

## 14. Build sistema ir aliasai

### 14.1 Vite konfigūracija

**Failas:** `vite.config.ts`

| Savybė     | Reikšmė                                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| Base path  | `VITE_BASE_PATH` arba production default `/inzinerija/` (GitHub Pages repo pavadinimas; pvz. anatomija → `/anatomija/`) |
| Dev port   | 3000                                                                                                                    |
| Dev host   | `0.0.0.0`                                                                                                               |
| Output     | `dist/`                                                                                                                 |
| Sourcemap  | `false` (production)                                                                                                    |
| Minify     | `esbuild`                                                                                                               |
| CSS split  | `true`                                                                                                                  |
| CSS minify | `true`                                                                                                                  |

**Manual chunks:**

```
vendor: ['react', 'react-dom']
icons: ['lucide-react']
helmet: ['react-helmet-async']
```

**Custom Vite plugin:** `no-cache-modules-json` – dev serveryje neleidžia kešinti `modules.json`

### 14.2 TypeScript konfigūracija

**Target:** ES2020  
**Module:** ESNext  
**Strict mode:** `true`  
**No unused vars/params:** `true`  
**JSX:** `react-jsx`

**Path aliasai:** atitinka Vite aliasus

### 14.3 ESLint konfigūracija

**Failas:** `.eslintrc.cjs`

- `eslint:recommended` + `@typescript-eslint/recommended` + `react-hooks/recommended` + `react/recommended`
- `react-refresh/only-export-components` (warn)
- `@typescript-eslint/no-unused-vars` (error, ignore `^_`)
- `react/react-in-jsx-scope` off
- `@typescript-eslint/no-explicit-any` warn

### 14.4 NPM skriptai

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint \"src/**/*.{ts,tsx}\"",
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:coverage": "vitest --coverage",
  "test:run": "vitest run",
  "validate:schema": "node scripts/validate-schema.mjs",
  "generate:core-data": "node scripts/generate-core-data.mjs",
  "audit:collapsible": "node scripts/audit-collapsible-sections.mjs",
  "audit:long-no-collapsible": "node scripts/audit-long-without-collapsible.mjs",
  "audit:heading-time": "node scripts/audit-heading-time-ambiguity.mjs",
  "audit:footer-numbers": "node scripts/audit-footer-numbers.mjs",
  "prebuild": "npm run validate:schema",
  "typecheck": "tsc --noEmit",
  "prepare": "husky",
  "analyze": "ANALYZE=true vite build"
}
```

**Svarbu:** `prebuild` automatiškai vykdo JSON validaciją prieš kiekvieną build.

**`lint-staged` konfigūracija** (`package.json`):

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

---

## 15. CI/CD pipeline

### 15.1 Tests workflow (`.github/workflows/test.yml`)

**Triggers:** push ir PR į `main`, `develop`  
**Matrix:** Node 18.x, 20.x

**Žingsniai:**

1. `npm ci`
2. `npm run validate:schema`
3. `npm run lint`
4. `npm run typecheck`
5. `npm run test:run`
6. `VITE_MVP_MODE=1 npm run build`
7. Coverage upload (tik Node 20.x) → Codecov

### 15.2 Deploy workflow (`.github/workflows/deploy.yml`)

**Triggers:** push į `main`, manual dispatch  
**Concurrency:** vienas deployment vienu metu

**Quality gates job:**

1. `npm ci`
2. Schema validacija
3. Lint
4. Typecheck (`tsc --noEmit`)
5. Tests
6. Default production build (be `VITE_MVP_MODE`)
7. Core production build (`VITE_MVP_MODE=1`)

**Build-and-deploy job** (po quality gates):

1. `npm ci`
2. Build su `VITE_MVP_MODE=1`
3. Upload artifact → GitHub Pages deploy

**Permissions:** `contents: read`, `pages: write`, `id-token: write`

---

## 16. Deployment

### 16.1 GitHub Pages (demo)

- **URL:** `https://ditreneris.github.io/anatomija/`
- **Statinis:** GitHub Actions automatic deploy
- **Base path:** `/anatomija/`
- **Profilis:** Core (moduliai 1–6)

### 16.2 Production

- **Domenas:** `https://promptanatomy.app/`
- **Hostingas:** Marketingo repo / Vercel integracija
- **App kelias:** `/academy` arba `/anatomija`
- **API:** `api/verify-access.ts` (Vercel serverless function)

### 16.3 Aplinkos kintamieji

| Kintamasis                   | Aprašymas                          | Pavyzdys                 |
| ---------------------------- | ---------------------------------- | ------------------------ |
| `ACCESS_TOKEN_SECRET`        | Magic link HMAC secret (≥16 chars) | `changeme_min16chars`    |
| `VITE_VERIFY_ACCESS_URL`     | Verify-access endpoint URL         | (tuščia = same-origin)   |
| `VITE_MAX_ACCESSIBLE_MODULE` | Max atrakinto modulio ID           | `0`, `3`, `6`, `9`, `12` |
| `VITE_MVP_MODE`              | Core production profilis           | `1`                      |
| `VITE_BASE_PATH`             | Statinio hosting base path         | `/anatomija/`            |

---

## 17. JSON schemos ir validacija

### 17.1 Schemos inventorius

| Schema failas                    | Validuojamas failas                                           |
| -------------------------------- | ------------------------------------------------------------- |
| `modules.schema.json`            | `modules.json`, `modules-m1-m6.json`, `modules-en-m4-m6.json` |
| `promptLibrary.schema.json`      | `promptLibrary.json`                                          |
| `glossary.schema.json`           | `glossary.json`, `glossary-m1-m6.json`                        |
| `tools.schema.json`              | `tools.json`, `tools-m1-m6.json`, `tools-en-m1-m6.json`       |
| `certificateContent.schema.json` | `certificateContent.json`, `certificateContent-en.json`       |
| `introPiePdfContent.schema.json` | `introPiePdfContent.json`, `introPiePdfContent-en.json`       |

### 17.2 Validacijos skriptas

**Failas:** `scripts/validate-schema.mjs`  
**Biblioteka:** AJV ^8.17.1 + ajv-formats ^3.0.1  
**Vykdomas:** `npm run validate:schema` (taip pat per `prebuild`)

**Kas validuojama:**

1. `modules.json` – pilna struktūra (moduliai, skaidrės, testas, apklausa)
2. `modules-m1-m6.json` – struktūra + papildoma: ar nėra modulių su `id > 6`
3. `modules-en-m4-m6.json` – struktūra (tik 3 moduliai M4–M6)
4. `promptLibrary.json` – sekcijos ir elementai
5. `glossary.json` ir `glossary-m1-m6.json` – terminai
6. `tools.json`, `tools-m1-m6.json`, `tools-en-m1-m6.json` – įrankiai
7. `introPiePdfContent.json` ir EN
8. `certificateContent.json` ir EN

**Exit code:** 0 = OK, 1 = fail (build nepraeina)

### 17.3 SOT indekso validacija

**Failas:** `scripts/validate-sot-index.mjs`  
**Tikrina:** `docs/development/context-engineering/sot_index.json`

- 6–15 modulių
- Unikalūs ID
- Keliai egzistuoja (`sotPath`, `contentSOT`, `dataSOT`)

---

## 18. Skriptai ir įrankiai

### 18.1 Core skriptai

| Skriptas                 | NPM komanda          | Funkcija                                                           |
| ------------------------ | -------------------- | ------------------------------------------------------------------ |
| `validate-schema.mjs`    | `validate:schema`    | JSON schemos validacija (prebuild)                                 |
| `generate-core-data.mjs` | `generate:core-data` | Generuoja `*-m1-m6.json` ir `m9Characters-empty.json` iš pilnų SOT |
| `validate-sot-index.mjs` | –                    | SOT indekso validacija                                             |

### 18.2 Extract skriptai (vienkartiniai)

| Skriptas                           | Funkcija                                              |
| ---------------------------------- | ----------------------------------------------------- |
| `extract-modules-en.mjs`           | Ištraukia M1–M3 į `modules-en.json` (vertimo pradžia) |
| `extract-modules-m4-m6.mjs`        | Ištraukia M4–M6 į `modules-en-m4-m6.json`             |
| `extract-block-slides.mjs`         | Blokų skaidrių ekstrakcija                            |
| `extract-slides.cjs`               | Skaidrių ekstrakcija                                  |
| `extract-test-practice-slides.mjs` | Testo/praktikos skaidrių ekstrakcija                  |

### 18.3 Audit skriptai

| Skriptas                             | NPM komanda                 | Funkcija                                 |
| ------------------------------------ | --------------------------- | ---------------------------------------- |
| `audit-collapsible-sections.mjs`     | `audit:collapsible`         | Collapsible sekcijų tikrinimas           |
| `audit-long-without-collapsible.mjs` | `audit:long-no-collapsible` | Ilgų skaidrių be collapsible             |
| `audit-heading-time-ambiguity.mjs`   | `audit:heading-time`        | Antraščių/laiko dviprasmybės             |
| `audit-footer-numbers.mjs`           | `audit:footer-numbers`      | Skaidrių footerių numeracijos tikrinimas |
| `audit-footer-length.mjs`            | –                           | Footerių ilgio tikrinimas                |

### 18.4 Patch skriptai

Modulio 4 turinio ir tono pataisymai (`patch-m4-*.mjs`), žodynėlio/įrankių patch (`patch-glossary-tools-m1-6.mjs`), workflow patch'ai, EN translation patch'ai.

### 18.5 Kiti

| Failas                   | Funkcija                                         |
| ------------------------ | ------------------------------------------------ |
| `download-noto-font.ps1` | NotoSans šrifto atsisiuntimo PowerShell skriptas |
| `generate_banner_gif.py` | Banner GIF generavimas (Python)                  |
| `apply-en-patch-m4.mjs`  | EN M4 translation patch pritaikymas              |

---

## 19. Stilių sistema

### 19.1 Tailwind CSS konfigūracija

**Failas:** `tailwind.config.js`

**Dark mode:** `'class'` (perjungiamas per `useTheme`)

**Spalvų paletė:**

| Pavadinimas          | Reikšmė                              | Naudojimas                        |
| -------------------- | ------------------------------------ | --------------------------------- |
| `brand` (50–950)     | Navy/slate mėlyna (#627d98, #486581) | Pagrindinė spalva                 |
| `accent` (50–950)    | Auksinė (#d4a520, #b8860b)           | Akcentai, CTA                     |
| `gold`               | #f3cc30                              | Brand akcentas (žaibas, hero CTA) |
| `di-visata` (50–950) | Custom                               | DI visatos tema                   |
| `slate` (50–950)     | Pilka                                | Fonas, border                     |

**Šriftai:**

- `sans`: Plus Jakarta Sans, system fallbacks
- `mono`: JetBrains Mono, monospace

**Animacijos:** `fade-in`, `slide-in`, `bounce-in`, `scale-in`, `shimmer`, `pulse-slow`, `celebrate`, `confetti`, `check-pop`, `progress-fill`, `float`

**Safelist:** bg/text/border klasės (rose, orange, amber, emerald, brand, violet, cyan, fuchsia, accent, slate, di-visata) – garantuoja, kad Tailwind neišmes netiesiogiai naudojamų klasių.

### 19.2 Global CSS (`src/index.css`)

**Šriftai:** Plus Jakarta Sans (Google Fonts), JetBrains Mono  
**Base stiliai:** dark mode (`#0d0d0d` fonas), focus-visible, scrollbar, mobile touch, safe-area  
**CSS custom properties:**

- `:root { --brand-gold: #f3cc30 }` – centralizuota brand gold spalva

**Custom klasės:**

- `.mask-gradient-dots` – gradientinis taškų mask
- `.rag-duomenu-step` – RAG žingsnio stilius
- `.progress-ring` – progreso žiedo animacija
- `.particle` – dalelių animacija
- `.gradient-text` – gradientinis tekstas
- `.gradient-text-hero` – hero gradientinis tekstas (brand → gold)
- `.btn-hero-cta` – hero CTA mygtukas (auksinis gradientas `#f3cc30 → #d4a520`, dark: subtilus glow)
- `.glass-card` – stiklinio efekto kortelė
- `.btn-primary` – pirminis mygtukas
- `.card` – kortelė
- `.badge` – žymė
- `.input` – įvesties laukas
- `.mono` – monospace šriftas

**Accessibility:**

- `@media (prefers-reduced-motion: reduce)` – visos animacijos ir transition išjungiamos

---

## 20. Konfigūracija ir aplinkos kintamieji

### 20.1 Failų inventorius

| Failas               | Paskirtis                           |
| -------------------- | ----------------------------------- |
| `vite.config.ts`     | Build ir dev serverio konfigūracija |
| `vitest.config.ts`   | Testų konfigūracija                 |
| `tsconfig.json`      | TypeScript konfigūracija            |
| `tsconfig.node.json` | Node.js TypeScript (vite.config)    |
| `tailwind.config.js` | CSS framework konfigūracija         |
| `postcss.config.js`  | PostCSS plugins                     |
| `.eslintrc.cjs`      | ESLint taisyklės                    |
| `.prettierrc.json`   | Prettier formatavimas               |
| `.prettierignore`    | Prettier ignore                     |
| `.editorconfig`      | Editor nustatymai                   |
| `.env.example`       | Aplinkos kintamųjų šablonas         |
| `vite-env.d.ts`      | Vite env TypeScript deklaracijos    |

### 20.2 Env kintamieji

| Kintamasis                   | Tipas       | Paskirtis                                     |
| ---------------------------- | ----------- | --------------------------------------------- |
| `ACCESS_TOKEN_SECRET`        | Server-side | HMAC secret magic linkams (≥16 chars)         |
| `VITE_VERIFY_ACCESS_URL`     | Client-side | Verify-access endpoint (tuščia = same-origin) |
| `VITE_MAX_ACCESSIBLE_MODULE` | Client-side | Max atrakinto modulio ID (0, 3, 6, 9, 12)     |
| `VITE_MVP_MODE`              | Build-time  | `1` = core profilis (tik M1–M6)               |
| `VITE_BASE_PATH`             | Build-time  | Hosting base path                             |
| `VITE_POSTHOG_KEY`           | Client-side | Optional PostHog analytics key                |

---

## 21. Kritiniai keliai ir priklausomybės

### 21.1 Vartotojo kelionė (kritinis kelias)

```
index.html
  → main.tsx (i18n, HelmetProvider, LocaleProvider)
    → App.tsx (routing, progress, access tier, modules loading)
      → HomePage.tsx (hero, PromptLibrary)
      → ModulesPage.tsx (module grid, lock/unlock)
        → ModuleView.tsx (slides, navigation, progress)
          → SlideContent.tsx (slide type registry)
            → [Content/Block/TestPractice slides]
      → QuizPage.tsx (quiz flow)
      → GlossaryPage.tsx (glossary)
      → ToolsPage.tsx (tools)
      → CertificateScreen.tsx (certificate PDF)
```

### 21.2 Duomenų krovimo seka

```
App.tsx → modulesLoader.loadModules(locale)
  → @modules-data (aliasas → modules.json arba modules-m1-m6.json)
  → [EN] deepMerge su modules-en.json, modules-en-m4-m6.json, quiz-en.json
  → cache per locale
  → getModule(id) → filtruoja pagal accessTier
```

### 21.3 Progreso seka

```
App.tsx → getProgress() → localStorage
  → ModulesPage.tsx (locked/unlocked pagal progress + accessTier)
  → ModuleView.tsx → saveProgress() (debounced 500ms)
  → ModuleCompleteScreen.tsx → onComplete()
  → CertificateScreen.tsx (tier check)
```

### 21.4 Build pipeline

```
npm run build
  → prebuild: npm run validate:schema
    → scripts/validate-schema.mjs (AJV)
  → vite build
    → VITE_MVP_MODE aliasai
    → manual chunks (vendor, icons, helmet)
    → dist/
```

---

## 22. Žinomos konvencijos ir taisyklės

### 22.1 Kodo konvencijos

- **TypeScript strict mode** – visi failai tipizuoti
- **Unused vars/params** – klaida (prefix `_` leidžiama)
- **No explicit any** – warning
- **React Hooks taisyklės** – enforced per ESLint
- **Lazy loading** – visi pagrindiniai puslapiai ir skaidrių tipai
- **Error Boundary** – aplink pagrindinį turinį ir per-slide
- **Memoizacija** – `ModuleView` ir `ModulesPage` su `React.memo`
- **Komentarai** – tik neakivaizdžiam intent'ui, ne kodo pasakojimui

### 22.2 Turinio konvencijos

Išsamios turinio taisyklės (šriftai, spalvos, skaidrių schemos, CTA, footeriai, sertifikatai, paprasta kalba, DI ne AI): **`docs/development/GOLDEN_STANDARD.md`**. Čia – tik techninė nuoroda: DI ne AI; paprasta kalba; lietuviška diakritika; 6 blokų sistema; modulių numeracija (4.1–4.7 = M4).

### 22.3 Dizaino konvencijos

Išsamus dizaino etalonas (H1, bold, šriftai, spalvos, dark mode, responsive): **`docs/development/GOLDEN_STANDARD.md`**. Čia – tik techninė nuoroda: vienas H1; bold tik svarbiems žodžiams; font-mono promptams; dark mode `class`; mobile-first.

### 22.4 Failų keitimo disciplina

- **Minimal diffs** – keisti tik tai, ko reikia
- **Turinio struktūra** – nekeisti be reikalo
- **Didesnis perstatymas** – pirmiausia planas (3 žingsniai), paskui vykdymas
- **SOT hierarchija:** 1) Turinio SOT (semantika) → 2) JSON sinchronizacija → 3) UI taisymas

### 22.5 Release checklist

Prieš kiekvieną release:

1. `npm run validate:schema` ✓
2. `npm run lint` ✓
3. `npm run test:run` ✓
4. Core production build (`VITE_MVP_MODE=1`) ✓
5. Default production build ✓
6. Lietuviškų raidžių tikrinimas ✓
7. Mobile responsive ✓
8. Dark mode ✓
9. EN kalbos tikrinimas ✓

### 22.6 Apsauga nuo tipinių klaidų (CI, deploy, testai)

Kad ateityje nepasikartotų tipinės klaidos (CI failas, 404 vaizdai po deploy, testų „X is not defined“):

| Problema                                                   | Priežastis                                                                                                                                 | Sprendimas / taisyklė                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | -------------------------------------------------------------------------------------------------------------------- |
| **PNG/vaizdai 404 po deploy**                              | Production build naudoja `base: '/…/'` (Vite). Keliai iš JSON (`/image.png`) naudojami be BASE_URL – naršyklė kreipiasi į svetainės šaknį. | **Visi** vaizdų `src`, imami iš duomenų (JSON), renderinant privalo naudoti `import.meta.env.BASE_URL` prieš kelią: `\`${import.meta.env.BASE_URL                                                                                                                                        |     | '/'}${path.replace(/^\//, '')}\``. Pvz. ContentSlides (comparisonImages, workflowImages), CharacterCard (imagePath). |
| **ResizeObserver (arba kitas browser API) is not defined** | jsdom testuose neturi ResizeObserver, fullscreen API ir kt.                                                                                | **1)** Mock'inti `src/test/setup.ts`: `vi.stubGlobal('ResizeObserver', MockClass)` ir priskyrimas į `window`/`global`. **2)** Komponente naudoti tik `window.ResizeObserver` ir guard `if (!window.ResizeObserver) return`, kad be mock komponentas nekreiptų į neegzistuojantį globalą. |
| **Deploy 404 visiems asset'ams**                           | Base path nesutampa su hosting keliu (pvz. build su `/anatomija/`, o GitHub Pages servina `/inzinerija/`).                                 | **VITE_BASE_PATH** turi atitikti **repo pavadinimą** (GitHub Pages: `https://<user>.github.io/<repo>/` → base = `/<repo>/`). Deploy workflow'e nustatyti `VITE_BASE_PATH: '/<repo>/'` visiems build step'ams. Žr. `docs/deployment/PRE_DEPLOY_INZINERIJA.md`.                            |
| **Versija neaiški**                                        | Keičiama keliuose failuose arba pamirštama.                                                                                                | **Release versija** = vienintelis šaltinis `package.json` `version`. CHANGELOG – tik žmogaus skaitoma istorija; naujas release = nauja sekcija `## [X.Y.Z] – data` ir `package.json` atnaujinimas. Žr. `docs/development/VERSION_ANALIZE.md`.                                            |

---

## Appendix A: Failų dydžiai (top 20)

| Failas                                       | ~Eilutės | Komentaras              |
| -------------------------------------------- | -------- | ----------------------- |
| `src/data/modules.json`                      | ~12,000  | Pagrindinis SOT         |
| `src/data/modules-m1-m6.json`                | ~6,600   | Core profilis           |
| `src/components/ModuleView.tsx`              | ~743     | Didžiausias komponentas |
| `src/components/VaizdoGeneratoriusSlide.tsx` | ~475     | Vaizdo generatorius     |
| `src/components/SlideContent.tsx`            | ~413     | Skaidrių registras      |
| `src/App.tsx`                                | ~413     | Root komponentas        |
| `src/locales/lt.json`                        | ~533     | LT vertimai             |
| `src/locales/en.json`                        | ~533     | EN vertimai             |
| `src/components/HomePage.tsx`                | ~362     | Pagrindinis puslapis    |
| `src/components/QuizPage.tsx`                | ~316     | Apklausa                |
| `src/components/ModulesPage.tsx`             | ~309     | Modulių puslapis        |
| `src/components/AppNav.tsx`                  | ~309     | Navigacija              |
| `src/components/AiDetectorsSlide.tsx`        | ~305     | DI detektoriai          |
| `src/components/ModuleCompleteScreen.tsx`    | ~274     | Modulio pabaiga         |
| `scripts/validate-schema.mjs`                | ~239     | Schema validacija       |
| `src/components/QuizResultsView.tsx`         | ~228     | Rezultatų peržiūra      |
| `src/utils/m5HandoutPdf.ts`                  | ~222     | M5 PDF                  |
| `src/components/GlossaryPage.tsx`            | ~192     | Žodynėlis               |
| `src/components/ToolsPage.tsx`               | ~179     | Įrankiai                |
| `src/components/CertificateScreen.tsx`       | ~176     | Sertifikatas            |

## Appendix B: Pilnas dependency graph (runtime)

```
react (18) → react-dom (18)
  → App.tsx
    ├── react-helmet-async (SEO)
    ├── lucide-react (ikonos)
    ├── i18next + react-i18next (i18n)
    ├── canvas-confetti (šventimas)
    ├── jspdf (PDF generavimas)
    │   └── /fonts/NotoSans-Regular.ttf
    ├── modulesLoader → @modules-data + EN overlays
    ├── glossaryLoader → @glossary-data + EN
    ├── toolsLoader → @tools-data + EN
    ├── progress.ts → localStorage
    ├── accessTier.ts → pricing.ts + sessionStorage
    └── analytics.ts → optional PostHog
```

## Appendix C: localStorage raktai

| Raktas                            | Tipas                  | Paskirtis            |
| --------------------------------- | ---------------------- | -------------------- |
| `prompt-anatomy-progress`         | JSON (Progress v2)     | Modulių progresas    |
| `prompt-anatomy-slide-pos`        | JSON                   | Skaidrių pozicijos   |
| `prompt-anatomy-locale`           | `'lt'` \| `'en'`       | Kalba                |
| `prompt-anatomy-certificate-name` | string                 | Sertifikato vardas   |
| `prompt-anatomy-theme`            | `'dark'` \| `'light'`  | Tema                 |
| `prompt-anatomy-en-variant`       | `'en-lt'` \| `'en-us'` | EN turinio variantas |
| `prompt-anatomy-learning-events`  | JSON array             | Mokymosi įvykiai     |
| `prompt-anatomy-autosave-*`       | JSON                   | Auto-save duomenys   |

---

_Šis dokumentas fiksuoja production deploy v1.3.0 būseną. Bet kokie tolimesni kodo pakeitimai turi būti vertinami šio standarto kontekste, užtikrinant, kad esama funkcionalumas nebus pažeistas._
