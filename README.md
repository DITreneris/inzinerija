# Promptų anatomija – Interaktyvus DI mokymas

**6 promptų struktūros blokai, pilnas interaktyvus mokymas (moduliai 1–6) – sistema nuo A iki Z.**  
**Versija:** 1.3.0 (2026-03-16). Production: deploy, integruoti mokėjimai marketingo tinklalapyje.

Interaktyvus mokymas apie DI (dirbtinio intelekto) promptų struktūrą ir konteksto inžineriją: **pilnai įgyvendinti 6 moduliai** (6 blokų sistema, žinių testas, praktika, konteksto inžinerija, pažangus testas, projektas) su progresu, sertifikatais ir PDF atmintinėmis. Kursas orientuotas į verslo problemų sprendimą ir **praktinius rezultatus** – mokoma kurti promptus ir scenarijus, ne tik suprasti teoriją.  
UI ir turinys palaiko **LT / EN** (moduliams 1–6), kalba pasirenkama programėlėje.

## 🎯 Apie projektą

Mokymo kursas (treniruoklis), kuris moko **kurti** efektyvius DI promptus naudojant **6 blokų sistemą**:

| Blokas                     | Paskirtis                               |
| -------------------------- | --------------------------------------- |
| 1️⃣ **Meta**                | Rolė, kontekstas ir tikslas             |
| 2️⃣ **Input**               | Duomenys, faktai ir apribojimai         |
| 3️⃣ **Output**              | Formatas, struktūra ir reikalavimai     |
| 4️⃣ **Reasoning**           | Mąstymo seka ir logika                  |
| 5️⃣ **Quality Control**     | Kokybės kriterijai                      |
| 6️⃣ **Advanced Parameters** | Modelio nustatymai ir atsakymo valdymas |

Pagrindinis dėmesys – kaip šiuos 6 blokus pritaikyti realiuose darbo scenarijuose (nuo pirmųjų užduočių iki projekto).

## ✨ Pagrindinės funkcijos

- **Pilnas 1–6 modulių kelias:**
  1. 6 Blokų Sistema (teorija) → 2) Žinių Patikrinimas (testas) → 3) Praktinis Pritaikymas (6 scenarijų) → 4) Konteksto inžinerija (pažangi teorija) → 5) Pažangus testas / prezentacijos sprintas → 6) Projekto kūrimas (praktika).  
     Moduliai 7–15 – rezervuoti ateities turiniui (plėtra aprašyta dokumentacijoje).
- **6 blokų sistema** su workflow, technikomis ir mąstymo modeliais (CoT, ToT, konteksto inžinerijos schemos).
- **Praktiniai verslo scenarijai** (Modulis 3) ir **vienas integruotas projektas** (Modulis 6).
- **Žodynėlis** (terminai) ir **Įrankių puslapis** (DI įrankių katalogas pagal modulius).
- **Apklausa** – bendras žinių patikrinimas po mokymų.
- **Promptų biblioteka** pagrindiniame puslapyje su kopijavimo funkcija.
- **Sertifikatai:**
  - Po 3 modulių (1–3) – pirmas lygis.
  - Po 6 modulių (1–6) ir ≥70 % pažangaus testo – antras lygis.  
    Sertifikatai generuojami kaip PDF (NotoSans šriftas, LT diakritika).
- **PDF atmintinės:** M5 ir M6 turi atskiras atsisiunčiamas atmintines (LT/EN).
- **Progreso sekimas:** localStorage, versijavimas, automatinis išsaugojimas (baigti moduliai, užduotys, testų rezultatai).
- **Prieigos lygiai (access tier):**
  - Pilna versija (1–6) per magic link (`api/verify-access.ts`).
  - Core production profilis – buildina ir rodo tik modulius 1–6 (testuotojams / demo).
- **LT/EN kalbos palaikymas** moduliams 1–6, žodynėliui, promptų bibliotekai, įrankiams ir pagrindiniam UI.
- **Responsive dizainas**, tamsusis/šviesusis režimas, klaviatūros navigacija.
- **Lazy loading** komponentų, **Error Boundary**, **SEO** (`react-helmet-async`).

## 🚀 Greitas startas

### Reikalavimai

- Node.js 18+ (rekomenduojama `engines` iš `package.json`: node >=18, npm >=9)
- npm arba yarn

### Instaliacija

```bash
git clone https://github.com/DITreneris/inzinerija.git
cd inzinerija
npm install
npm run dev
```

Aplikacija bus prieinama: `http://localhost:3000`

### Build produkcijai

Prieš build automatiškai vykdoma JSON schemų validacija (`npm run validate:schema` per `prebuild`). Komandos:

```bash
npm run build
npm run preview
```

**Production (moduliai 1–6):** Jei norite tik core `1–6` profilio, naudokite `VITE_MVP_MODE=1` build metu. Tada aliasai krauna `modules-m1-m6.json`, `glossary-m1-m6.json` ir `tools-m1-m6.json`. Jei norite pilno katalogo su `1–15` duomenimis ir tier valdymu ateičiai, nenaudokite `VITE_MVP_MODE`. Žr. [docs/deployment/DEPLOYMENT.md](docs/deployment/DEPLOYMENT.md) skyrių „Production (moduliai 1–6)“.

**Core build** (buildina tik modulius 1–6):

```bash
VITE_MVP_MODE=1 npm run build
```

**Windows (PowerShell):** Jei `&&` neveikia, naudokite `;` arba `cmd /c "cd anatomija && npm run build"`.

### Testavimas

```bash
npm test              # Watch mode
npm run test:run      # Vienkartinis paleidimas
npm run test:coverage # Su coverage report
```

Testai apima duomenų loaderius (LT/EN), progresą, EN/LT apklausą, sertifikatų ir PDF generavimą, prieigos ribojimą, MVP režimą, a11y „smoke“ ir pagrindines naudotojo keliones.

## 📚 Modulių struktūra

| Modulis | Pavadinimas                                  | Turinys                                                                                                                 |
| ------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 1       | **6 Blokų Sistema**                          | Teorija: promptų struktūra, workflow, technikos, kiekvienas blokas (Meta, Input, Output, Reasoning, Quality, Advanced). |
| 2       | **Žinių Patikrinimas**                       | Testas: klausimai su paaiškinimais; sertifikatas nuo 70 %.                                                              |
| 3       | **Praktinis Pritaikymas**                    | 6 verslo scenarijų su žingsniais ir pavyzdiniais sprendimais.                                                           |
| 4       | **Konteksto inžinerija**                     | Pažangus teorija: RAG, deep research, tokenų ekonomika, manipuliacijos, žinių patikrinimas.                             |
| 5       | **Pažangus testas / prezentacijos sprintas** | Pažangus suvokimo testas + prezentacijos struktūros rėmelis. ≥70 % rekomenduojama prieš Modulį 6.                       |
| 6       | **Projekto kūrimas**                         | Vienas integruotas projektas (capstone) su 6 blokų sistema ir pažangiomis temomis.                                      |

**Navigacija:** Pagrindinis → Moduliai → Žodynėlis → Įrankiai → Apklausa.  
**Duomenų architektūra:** `src/data/modules.json` yra full `1–15` redagavimo SOT. Core production profilis naudoja `src/data/modules-m1-m6.json`, o EN turinys sujungiamas per `modules-en.json` ir `modules-en-m4-m6.json`.

## ⚙️ Konfigūracija

### Modulių duomenų keitimas

- **Moduliai ir skaidrės:** `src/data/modules.json` yra pagrindinis full `1–15` redagavimo failas. Jame laikomi moduliai, skaidrės, Modulio 2/5 klausimai ir apklausa. EN turiniui – `src/data/modules-en.json` (M1–M3) ir `src/data/modules-en-m4-m6.json` (M4–M6).
- **Core production profilis:** `src/data/modules-m1-m6.json` nėra pagrindinis authoring failas. Jis naudojamas core `1–6` build/runtime keliui, kai `VITE_MVP_MODE=1`.
- **Žodynėlis:** `src/data/glossary.json` yra full redagavimo failas, `src/data/glossary-m1-m6.json` – core build/runtime failas, o `src/data/glossary-en.json` – EN turinys.
- **Promptų biblioteka:** `src/data/promptLibrary.json`.
- **Įrankiai:** `src/data/tools.json` yra full redagavimo failas, `src/data/tools-m1-m6.json` ir `src/data/tools-en-m1-m6.json` – core build/runtime failai.
- **Sertifikatų tekstai:** `src/data/certificateContent.json` ir `certificateContent-en.json`.
- **PDF atmintinės:** `src/data/m5HandoutContent*.json`, `src/data/m6HandoutContent*.json`.
- Duomenys įkraunami per loaderius (`modulesLoader.ts`, `glossaryLoader.ts`, `handoutContentLoader.ts`, `certificateContentLoader.ts`, `questionPoolSelector.ts`) su cache ir validacija. **Paprasti turinio pakeitimai** – pirmiausia redaguokite full SOT failus, o ne core profilio išvestinius failus.

### Spalvų schema

Spalvos konfigūruojamos `tailwind.config.js` (brand – navy/slate, accent – auksinė):

```javascript
// theme.extend.colors
brand: { 500: '#627d98', 600: '#486581', ... },  // Navy / slate mėlyna
accent: { 500: '#d4a520', 600: '#b8860b', ... }  // Auksinė
```

Pilna paletė (50–950) ir papildomos spalvos (slate, di-visata) – žr. `tailwind.config.js`.

## 🌐 Deployment

### GitHub Pages (demo / statinis preview)

1. GitHub repo: Settings → Pages
2. Source: pasirinkite "GitHub Actions"
3. Push į `main` automatiškai deployina

Prieiga: `https://ditreneris.github.io/inzinerija/`

**Pastaba:** tai yra statinis preview kelias. Base path turi atitikti repo pavadinimą (šiame repozitorijuje – `inzinerija`). GitHub Pages neturi marketingo repo autentifikacijos ir `verify-access` API sluoksnio, todėl jo nereikėtų laikyti pilnu production deployment modeliu.

### Production (rekomenduojama)

- **Produkcinis domenas:** `https://promptanatomy.app/`
- **Hostingas:** marketingo repo / Vercel integracija
- **Mokymo app:** servinamas kaip subproject po keliu, pvz. `/academy` arba `/anatomija`

Pilnas production aprašas: `docs/deployment/INTEGRATION_OVERVIEW.md` ir `docs/deployment/DEPLOYMENT.md`.

**Pastaba:** `vite.config.ts` production default base path – `/inzinerija/` (atitinka GitHub Pages repo pavadinimą). Per env galima nustatyti `VITE_BASE_PATH` (pvz. `/anatomija/` kito repo atveju).

### Kiti variantai

- **Vercel**: `vercel`
- **Netlify**: Build `npm run build`, publish `dist`

## 🛠️ Technologijos

| Technologija                   | Paskirtis                                                                                |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| React 18                       | UI biblioteka (lazy loading, Suspense)                                                   |
| TypeScript                     | Tipai (`src/types/modules.ts`)                                                           |
| Vite                           | Build ir dev serveris                                                                    |
| Tailwind CSS                   | Styling (brand, accent, dark mode)                                                       |
| Vitest + React Testing Library | Unit ir integraciniai testai                                                             |
| react-helmet-async             | SEO (title, description pagal puslapį)                                                   |
| lucide-react                   | Ikonos; recharts – diagramos (pvz. haliucinacijų rodikliai); canvas-confetti – šventimas |

## 📁 Projekto struktūra

```
src/
├── components/       # React komponentai
│   ├── slides/       # Skaidrės: types/ (AllSlides, ContentSlides, BlockSlides, TestPracticeSlides), shared/ (CopyButton, PracticalTask, ProcessStepper, EnlargeableImage, …), utils/
│   ├── ui/           # ErrorBoundary, LoadingSpinner
│   ├── HomePage.tsx, ModulesPage.tsx, ModuleView.tsx, QuizPage.tsx, GlossaryPage.tsx, ToolsPage.tsx
│   ├── AppNav.tsx, ModuleCompleteScreen.tsx, QuizResultsView.tsx, CircularProgress.tsx
│   ├── SlideContent.tsx, PromptLibrary.tsx, Celebration.tsx, HallucinationRatesDashboard.tsx
│   └── __tests__/    # progress.integration, App.quiz.integration, QuizPage, ErrorBoundary, a11y.smoke, mvp.gating
├── data/             # modules.json (full SOT), modules-m1-m6.json (core profilis), glossary/tools analogai, loaderiai
├── types/            # modules.ts (tipai moduliams, skaidrėms, quiz)
├── utils/            # progress.ts, useAutoSave.ts, useQuizState.ts, useSlideNavigation.ts, useTheme.ts, logger.ts + __tests__
└── test/             # Vitest setup
```

## 📖 Dokumentacija

- **README.md** – šis failas (projekto aprašymas ir startas).
- **Integracija į kitą repo:** jei integruojate šį app į marketingo monorepo kaip subproject, pradėkite nuo [docs/deployment/INTEGRATION_OVERVIEW.md](docs/deployment/INTEGRATION_OVERVIEW.md).
- **docs/DOCUMENTATION_QUICK_REF.md** – greita nuoroda: SOT, agentai, kritiniai keliai.
- **docs/DOCUMENTATION_INDEX.md** – pilnas dokumentacijos indeksas: SOT, aktyvūs dokumentai, archyvas (pirmiausia atsidarykite čia, jei reikia gilesnio konteksto).
- **turinio_pletra.md** – turinio planas (Moduliai 1–3, SOT).
- **docs/turinio_pletra_moduliai_4_5_6.md** – turinio planas Moduliams 4–6 (SOT).
- **docs/development/CODEBASE_WHAT_IS_DONE.md** – kodo bazės santrauka: kas įgyvendinta (duomenys, i18n, testai, access tier).
- **docs/development/RELEASE_QA_CHECKLIST.md** – 5 min sanity prieš release (nuorodos, mobilus, tamsus režimas, lietuviškos raidės, EN).
- **TODO.md** – dabartinės užduotys.
- **docs/README.md** – dokumentacijos struktūra; pasenę dokumentai – `docs/archive/` (lokaliai, žr. `docs/archive/README.md`).

## 📄 Licencija

**Mokymo turinys:** © 2024-2026 Tomas Staniulis. Visos teisės saugomos.

**Programinė įranga:** MIT License

## 📧 Kontaktai

- **Svetainė:** [promptanatomy.app](https://www.promptanatomy.app/)
- **Autorius:** Tomas Staniulis
- **GitHub:** [DITreneris](https://github.com/DITreneris)
- **Klausimai:** Sukurkite issue GitHub repozitorijoje
- **Bendruomenė (CTA):** [Prisijunk prie WhatsApp kanalo](https://chat.whatsapp.com/It49fzTl1n90huRCoWWkwu?mode=gi_t) – diskusijos apie promptus, atnaujimai, pasiūlymai toliau (Modulis 4 ir kt.)

---

<div align="center">

**Promptų anatomija** - Interaktyvus DI Mokymas

Autorinė mokymo medžiaga © 2024-2026 Tomas Staniulis

_Sukurta verslo problemų sprendimui su DI_ 🎯

</div>
