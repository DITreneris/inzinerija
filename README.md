# Promptų anatomija – Interaktyvus DI mokymas

**6 promptų struktūros blokai – interaktyvus mokymas nuo pamatų iki pažangių kelių.**  
**Versija:** 1.6.3 (2026-08-16). **Produkcija:** [www.promptanatomy.app](https://www.promptanatomy.app) (Vercel; šis repo – **git submodulis** marketingo projekte). Training cut **v1.6.3**; live pin kol neperpinsi = **v1.6.2**. **12 live per Supabase**. Viešas Stripe = M1–6; M7–18 = corporate grant iki 2027-01. `v1.4.9` = istorinis learning freeze, ne current pin. Pakeitimai – [CHANGELOG.md](CHANGELOG.md).

Interaktyvus mokymas apie DI (dirbtinio intelekto) promptų struktūrą ir konteksto inžineriją: **pilnai įgyvendinti moduliai 1–6** (MVP), **production bundle M1–9** (Duomenų analizės kelias, tier 9), **corporate12 M1–12**, **corporate15 M1–15** ir **full authoring katalogas M1–18** (dev; Kodo inžinerijos kelias). Kursas orientuotas į verslo problemų sprendimą ir **praktinius rezultatus**.  
UI ir turinys palaiko **LT / EN** (M1–M18 authoring; M10–12 EN kai `maxModuleId >= 10`, M13–15 kai `>= 13`, M16–18 kai `>= 16`). Magic-link tiers lieka 3|6|9|12|15 (corporate18 Deferred).

## Produkto modelis (5 build sluoksniai)

| Sluoksnis               | Build komanda                   | Moduliai         | Paskirtis                                                     |
| ----------------------- | ------------------------------- | ---------------- | ------------------------------------------------------------- |
| **Demo / GitHub Pages** | `VITE_MVP_MODE=1 npm run build` | M1–6 only        | Preview `/inzinerija/` (ne M7–18; žr. DEPLOYMENT gate policy) |
| **M1–9 profilis**       | `npm run build:production`      | M1–9             | Fallback; ne gyvas kanonas                                    |
| **Production (Vercel)** | `npm run build:corporate12`     | M1–12            | Canonical SPA; tier 12 live per Supabase                      |
| **Corporate15**         | `npm run build:corporate15`     | M1–15            | Repo-ready; Vaizdo/I2V live; grant / later                    |
| **Dev / authoring**     | `npm run build`                 | M1–18 (full SOT) | Turinio redagavimas; DEV unlock 18; magic-link ≤15            |

Žr. [docs/deployment/DEPLOYMENT.md](docs/deployment/DEPLOYMENT.md), [05_marketingo_memo_tier9_vienas_build.md](05_marketingo_memo_tier9_vienas_build.md), [06_marketingo_memo_corporate12_supabase.md](06_marketingo_memo_corporate12_supabase.md) (Horizon B, 12 live, be Stripe SKU).

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

- **Pamatinis kelias M1–6:** 6 Blokų Sistema → Žinių patikrinimas → Praktika → Konteksto inžinerija → Pažangus testas → Projekto kūrimas.
- **Duomenų analizės kelias M7–9:** tier 9, production bundle (`build:production`); adaptuotos šakos Modulyje 7.
- **Agentų kelias M10–12:** corporate12 build (`build:corporate12`) ir full authoring katalogas; taksonomija 10.45, workflow 10.48.
- **Turinio kelias M13–15:** corporate15 build (`build:corporate15`) ir full authoring katalogas; vaizdai, video, muzika, testas ir finalinis kūrybinis projektas.
- **6 blokų sistema** su workflow, technikomis ir mąstymo modeliais (CoT, ToT, konteksto inžinerijos schemos).
- **Žodynėlis**, **Įrankių puslapis**, **Branduolio pasitikrinimas** (nav: Pasitikrink), **Promptų biblioteka**.
- **Sertifikatai (PDF):**
  - Tier 1 – po modulių 1–3.
  - Tier 2 – po modulių 1–6 ir apklausos ≥ 70 %.
  - Tier 3 – po kelio 7–9 ir Modulio 8 testo ≥ 70 %.
  - Tier 4 – po kelio 10–12 ir Modulio 11 testo ≥ 70 %.
  - Tier 5 – po kelio 13–15 ir Modulio 14 testo ≥ 70 %.
- **PDF atmintinės:** M1 (first-win, value-only), M4, M5, M6, M7–9 DA kelio, M10–12 Agentų kelio ir M13–15 Turinio kelio atmintinės (LT/EN); bendras maketas `handoutPdfKit.ts`, registry `completionArtifacts.json`, pakartotinis atsisiuntimas – `ModulesPage` „Mano medžiaga“. Žr. `docs/development/PDF_DOWNLOAD_TESTING.md`.
- **Progreso sekimas:** localStorage, versijavimas, autosave.
- **Prieigos lygiai (access tier):** magic link tier **3** (M1–3), **6** (M1–6), **9** (M1–9), **12** (M1–12), **15** (M1–15) per `api/verify-access.ts`.
- **Ekosistema M1–12:** spinoff nuorodos, blog deepen (žr. `docs/ECOSYSTEM_MAP.md`).
- **LT/EN**, responsive, dark/light, klaviatūros navigacija, lazy loading, Error Boundary, SEO (`react-helmet-async`).

## 🚀 Greitas startas

### Reikalavimai

- Node.js 24 (Active LTS; fiksuota `.nvmrc`). Minimumas – `engines` iš `package.json`: node >=22, npm >=10. Node 18 / 20 nebepalaikomi (EOL).
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

Prieš build automatiškai vykdoma JSON schemų validacija (`npm run validate:schema` per `prebuild`).

```bash
npm run build:production   # Production M1–9 (Vercel)
npm run preview
```

**Corporate build'ai:**

```bash
npm run build:corporate12  # M1–12
npm run build:corporate15  # M1–15
```

**Demo / core M1–6:**

```bash
VITE_MVP_MODE=1 npm run build
```

**Full authoring katalogas (dev):**

```bash
npm run build
```

**Windows (PowerShell):** env kintamiesiems naudokite `$env:VITE_MVP_MODE="1"; npm run build` arba `$env:VITE_MAX_BUILD_MODULE="9"; npm run build`.

Pilnas aprašas: [docs/deployment/DEPLOYMENT.md](docs/deployment/DEPLOYMENT.md) skyrius „Production (moduliai 1–9)“.

### Testavimas

```bash
npm test              # Watch mode
npm run test:run      # Vienkartinis paleidimas
npm run test:coverage # Su coverage report
```

## 📚 Modulių struktūra

| Modulis | Pavadinimas             | Turinys                                                                         |
| ------- | ----------------------- | ------------------------------------------------------------------------------- |
| 1–6     | Pamatinis kelias        | 6 blokų sistema, testai, praktika, RAG, projektas (žr. ankstesnę lentelę)       |
| 7–9     | Duomenų analizės kelias | Pipeline, vizualizacija, M8 testas, M9 capstone (production tier 9)             |
| 10–12   | Agentų inžinerija       | Taksonomija, workflow, testas, capstone (prod bundle **M1–12** / `corporate12`) |
| 13–15   | Turinio inžinerija      | Planavimas, medijos generavimas, testas, finalinis projektas (corporate15)      |
| 16–18   | Kodo inžinerija         | Brief / Path Test / PACKET (full SOT; Wave D3 Deferred)                         |

**Navigacija:** Pagrindinis → Moduliai → Žodynėlis → Įrankiai → Pasitikrink.

**Duomenų architektūra:** `src/data/modules.json` – full `1–18` SOT. Build profiliai: `modules-m1-m6.json` (MVP), `modules-m1-m9.json` (M1–9 profilis), `modules-m1-m12.json` (corporate12 / prod), `modules-m1-m15.json` (corporate15). EN: `modules-en.json`, `modules-en-m4-m6.json`, `modules-en-m7-m9.json`, `modules-en-m10-m12.json`, `modules-en-m13-m15.json`, `modules-en-m16-m18.json`.

## ⚙️ Konfigūracija

### Modulių duomenų keitimas

- **Full SOT:** `modules.json`, `glossary.json`, `tools.json` – redaguokite čia.
- **Core profiliai:** `*-m1-m6.json`, `*-m1-m9.json` – generuojami per `npm run generate:core-data`.
- **EN overlay:** `modules-en*.json`, `glossary-en.json`, `tools-en-*.json`.
- Loaderiai: `modulesLoader.ts`, `glossaryLoader.ts`, ir kt. – žr. [docs/development/DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md](docs/development/DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md).

### Spalvų schema

Spalvos – `tailwind.config.js` (brand navy/slate, accent auksinė). Pilna paletė – faile.

## 🌐 Deployment

### GitHub Pages (demo)

Push į `main` → GitHub Actions deploy. Prieiga: `https://ditreneris.github.io/inzinerija/` (**MVP M1–6 only**; M7–15 ne Pages – `docs/deployment/DEPLOYMENT.md` Gate policy).

### Production (Vercel)

- [www.promptanatomy.app](https://www.promptanatomy.app) – git submodulis marketingo monorepo
- Build: `npm run build:corporate12` (M1–12, gyvas kanonas); `build:production` = M1–9 fallback. Env – [MARKETING_HANDOFF_CHECKLIST.md](docs/deployment/MARKETING_HANDOFF_CHECKLIST.md); corporate12 memo – [06_marketingo_memo_corporate12_supabase.md](06_marketingo_memo_corporate12_supabase.md)

Pilnas aprašas: [INTEGRATION_OVERVIEW.md](docs/deployment/INTEGRATION_OVERVIEW.md), [DEPLOYMENT.md](docs/deployment/DEPLOYMENT.md).

**SEO:** mokymų app – `noindex`; [SEO_SUBMODULE.md](docs/deployment/SEO_SUBMODULE.md).

## 🛠️ Technologijos

React 18, TypeScript, Vite, Tailwind CSS, Vitest + RTL, react-helmet-async, lucide-react.

## 📖 Dokumentacija

- [docs/DOCUMENTATION_QUICK_REF.md](docs/DOCUMENTATION_QUICK_REF.md) – SOT, agentai, kritiniai keliai
- [docs/development/CODEBASE_WHAT_IS_DONE.md](docs/development/CODEBASE_WHAT_IS_DONE.md) – kas įgyvendinta
- [TODO.md](TODO.md), [ROADMAP.md](ROADMAP.md), [CHANGELOG.md](CHANGELOG.md)

## 📄 Licencija

**Mokymo turinys:** © 2026 Tomas Staniulis. **Programinė įranga:** MIT License.

## 📧 Kontaktai

- **Svetainė:** [promptanatomy.app](https://www.promptanatomy.app/)
- **GitHub:** [DITreneris](https://github.com/DITreneris)

---

<div align="center">

**Promptų anatomija** - Interaktyvus DI Mokymas

Autorinė mokymo medžiaga © 2026 Tomas Staniulis

</div>
