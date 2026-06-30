# Promptų anatomija – Interaktyvus DI mokymas

**6 promptų struktūros blokai – interaktyvus mokymas nuo pamatų iki pažangių kelių.**  
**Versija:** 1.4.0 (2026-06-30). **Produkcija:** [www.promptanatomy.app](https://www.promptanatomy.app) (Vercel; šis repo – **git submodulis** marketingo projekte). Pakeitimai – [CHANGELOG.md](CHANGELOG.md) (`[1.4.0]`).

Interaktyvus mokymas apie DI (dirbtinio intelekto) promptų struktūrą ir konteksto inžineriją: **pilnai įgyvendinti moduliai 1–6** (MVP), **production bundle M1–9** (Duomenų analizės kelias, tier 9), **full authoring katalogas M1–15** (dev). Kursas orientuotas į verslo problemų sprendimą ir **praktinius rezultatus**.  
UI ir turinys palaiko **LT / EN** (M1–M12; M10–12 EN kai kataloge `maxModuleId >= 10`).

## Produkto modelis (3 build sluoksniai)

| Sluoksnis               | Build komanda                   | Moduliai         | Paskirtis                 |
| ----------------------- | ------------------------------- | ---------------- | ------------------------- |
| **Demo / GitHub Pages** | `VITE_MVP_MODE=1 npm run build` | M1–6             | Preview `/inzinerija/`    |
| **Production (Vercel)** | `npm run build:production`      | M1–9             | Tier 3 / 6 / 9 magic link |
| **Dev / authoring**     | `npm run build`                 | M1–15 (full SOT) | Turinio redagavimas       |

Žr. [docs/deployment/DEPLOYMENT.md](docs/deployment/DEPLOYMENT.md), [05_marketingo_memo_tier9_vienas_build.md](05_marketingo_memo_tier9_vienas_build.md).

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
- **Agentų kelias M10–12:** turinys full authoring kataloge (ne production bundle); taksonomija 10.45, workflow 10.48.
- **6 blokų sistema** su workflow, technikomis ir mąstymo modeliais (CoT, ToT, konteksto inžinerijos schemos).
- **Žodynėlis**, **Įrankių puslapis**, **Apklausa**, **Promptų biblioteka**.
- **Sertifikatai (PDF):**
  - Tier 1 – po modulių 1–3.
  - Tier 2 – po modulių 1–6 ir apklausos ≥ 70 %.
  - Tier 3 – po kelio 7–9 ir Modulio 8 testo ≥ 70 %.
- **PDF atmintinės:** M5 ir M6 (LT/EN).
- **Progreso sekimas:** localStorage, versijavimas, autosave.
- **Prieigos lygiai (access tier):** magic link tier **3** (M1–3), **6** (M1–6), **9** (M1–9) per `api/verify-access.ts`.
- **Ekosistema M1–12:** spinoff nuorodos, blog deepen (žr. `docs/ECOSYSTEM_MAP.md`).
- **LT/EN**, responsive, dark/light, klaviatūros navigacija, lazy loading, Error Boundary, SEO (`react-helmet-async`).

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

Prieš build automatiškai vykdoma JSON schemų validacija (`npm run validate:schema` per `prebuild`).

```bash
npm run build:production   # Production M1–9 (Vercel)
npm run preview
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

| Modulis | Pavadinimas             | Turinys                                                                   |
| ------- | ----------------------- | ------------------------------------------------------------------------- |
| 1–6     | Pamatinis kelias        | 6 blokų sistema, testai, praktika, RAG, projektas (žr. ankstesnę lentelę) |
| 7–9     | Duomenų analizės kelias | Pipeline, vizualizacija, M8 testas, M9 capstone (production tier 9)       |
| 10–12   | Agentų inžinerija       | Taksonomija, workflow, testas, capstone (authoring; ne prod bundle)       |
| 13–15   | Turinio inžinerija      | Planavimas / authoring SOT                                                |

**Navigacija:** Pagrindinis → Moduliai → Žodynėlis → Įrankiai → Apklausa.

**Duomenų architektūra:** `src/data/modules.json` – full `1–15` SOT. Build profiliai: `modules-m1-m6.json` (MVP), `modules-m1-m9.json` (production). EN: `modules-en.json`, `modules-en-m4-m6.json`, `modules-en-m7-m9.json`, `modules-en-m10-m12.json`.

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

Push į `main` → GitHub Actions deploy. Prieiga: `https://ditreneris.github.io/inzinerija/` (MVP M1–6).

### Production (Vercel)

- [www.promptanatomy.app](https://www.promptanatomy.app) – git submodulis marketingo monorepo
- Build: `npm run build:production`; env – [MARKETING_HANDOFF_CHECKLIST.md](docs/deployment/MARKETING_HANDOFF_CHECKLIST.md)

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
