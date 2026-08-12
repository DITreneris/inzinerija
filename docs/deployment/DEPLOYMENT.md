# Deployment Instrukcijos (konsoliduota)

Detalios instrukcijos yra `README.md`:

- GitHub Pages
- Vercel / Netlify
- Lokalus testavimas
- Base path

---

## Base path politika (vienas šaltinis)

| Scenarijus                                    | `VITE_BASE_PATH` | Moduliai  | Build / env                                      | Pastaba                                                                                          |
| --------------------------------------------- | ---------------- | --------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| **Production monorepo** (promptanatomy.app)   | `/anatomy/`      | M1–9      | `build:production` / `VITE_MAX_BUILD_MODULE=9`   | Canonical SPA šiandien. Senas `/anatomija/` – tik **301**. Žr. `MARKETING_HANDOFF_CHECKLIST.md`. |
| **Corporate12 target** (Horizon B)            | `/anatomy/`      | M1–12     | `build:corporate12` / `VITE_MAX_BUILD_MODULE=12` | Repo-ready; marketing cutover kai pin/env perjungia. M13–15 ne bundle'e.                         |
| **Corporate15 target** (Horizon C)            | `/anatomy/`      | M1–15     | `build:corporate15` / `VITE_MAX_BUILD_MODULE=15` | Repo-ready; Vaizdo/I2V live. Marketing cutover kai pin/env perjungia.                            |
| **GitHub Pages demo** (DITreneris/inzinerija) | `/inzinerija/`   | M1–6      | `VITE_MVP_MODE=1` (deploy.yml)                   | Preview; ne tas pats artefaktas kaip production.                                                 |
| **Authoring / local full**                    | `/` (dev)        | M1–18     | default `modules.json`                           | Full SOT (M16–18 Kodo kelias); DEV unlock 18; magic-link tiers lieka ≤15 (D3 Deferred).          |
| **Lokalus dev**                               | `/` (tuščia)     | pagal env | `npm run dev`                                    | —                                                                                                |

**Magic link URL (prod, tier 9):** `https://www.promptanatomy.app/anatomy/?access_tier=9&expires=...&token=...`  
**Magic link URL (tier 12, po cutover):** `https://www.promptanatomy.app/anatomy/?access_tier=12&expires=...&token=...`  
**Magic link URL (tier 15, po cutover):** `https://www.promptanatomy.app/anatomy/?access_tier=15&expires=...&token=...`

---

## Production (moduliai 1–9, vienas build – dabartinis)

**Vercel (promptanatomy.app / marketing monorepo):**

- **Build:** `npm run build:production` (`VITE_MAX_BUILD_MODULE=9`, be `VITE_MVP_MODE`).
- **Bundle:** `modules-m1-m9.json`, glossary/tools M1–9 – M10–15 ne client-side.
- **Prieiga:** magic link tier 3, 6, 9 (ir **12** šiame repo – žr. corporate12); gate kai tier 0. Žr. [05_marketingo_memo_tier9_vienas_build.md](../../05_marketingo_memo_tier9_vienas_build.md), [MARKETING_HANDOFF_CHECKLIST.md](MARKETING_HANDOFF_CHECKLIST.md).

### Corporate12 (M1–12) – Horizon B ready

- **Build:** `npm run build:corporate12` (`VITE_MAX_BUILD_MODULE=12`, be `VITE_MVP_MODE`).
- **Bundle:** `*-m1-m12.json` (generate:core-data); M10–12 EN overlay merge; M13–15 + Vaizdo/I2V slide stub’ai.
- **Prieiga:** magic link `access_tier=12` → moduliai 1–12; `api/verify-access` + `MAGIC_LINK_TIERS` priima 3|6|9|12|15.
- **Marketing cutover (ne šio repo P0):** pin **v1.6.1** + Vercel `build:corporate12` + Supabase `highest_plan=12` → `access_tier=12` (Phase 1 be Stripe). Stripe Agentų €199 = Phase 2. Default pin gali likti M1–9 iki cutover.
- **Handoff:** [06_marketingo_memo_corporate12_supabase.md](../../06_marketingo_memo_corporate12_supabase.md), [MARKETING_SUBMODULE_PIN_CORPORATE12.md](MARKETING_SUBMODULE_PIN_CORPORATE12.md).

### Corporate15 (M1–15) – Horizon C ready

- **Build:** `npm run build:corporate15` (`VITE_MAX_BUILD_MODULE=15`, be `VITE_MVP_MODE`).
- **Bundle:** `*-m1-m15.json` (generate:core-data); M13–15 EN overlay merge; Vaizdo/I2V **live** (ne stub).
- **Prieiga:** magic link `access_tier=15` → moduliai 1–15; `MAGIC_LINK_TIERS` + `api/verify-access` priima 3|6|9|12|15.
- **Marketing cutover (ne šio repo P0):** Vercel build → `build:corporate15`; Stripe/Supabase generator siunčia `access_tier=15` už Turinio kelio produktą (**€249** provisional). Default pin gali likti M1–9 iki cutover.

### Prieigos lygis (tier 3, 6, 9, 12, 15)

Aplikacija rodo modulius tik iki `getMaxAccessibleModuleId()` (šaltinis: `src/utils/accessTier.ts`). Be patikrinto magic link numatytasis lygis yra **0**.

**Magic link (rekomenduojama):**

- `access_tier=3` | `6` | `9` | `12` | `15`
- `expires=UNIX_TIMESTAMP`, `token=BASE64URL_HMAC`
- Pvz. tier 9: `https://www.promptanatomy.app/anatomy/?access_tier=9&expires=...&token=...` (senas `/anatomija/` → 301)
- Pvz. tier 12: `https://www.promptanatomy.app/anatomy/?access_tier=12&expires=...&token=...`
- Frontend → `GET /api/verify-access`; 200 → `localStorage` `verified_access_tier`

**Draudžiama production:** `VITE_MAX_ACCESSIBLE_MODULE=6`, `9` arba `12` (atidaro visiems be apmokėjimo).

---

## GitHub Pages / demo (moduliai 1–6)

### Gate policy (P2 #GP) – užfiksuota

|              | GitHub Pages (`/inzinerija/`)                                                                           | Production (`promptanatomy.app/anatomy/`)                                            |
| ------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Build**    | `VITE_MVP_MODE=1` + `VITE_BASE_PATH=/inzinerija/` (`.github/workflows/deploy.yml` → `build-and-deploy`) | `npm run build:production` / `VITE_MAX_BUILD_MODULE=9` (target: `build:corporate12`) |
| **Moduliai** | **M1–6** core (`*-m1-m6.json`)                                                                          | **M1–9** (`*-m1-m9.json`); corporate12 → **M1–12** (`*-m1-m12.json`)                 |
| **Nėra**     | M7–9, M10–15 authoring                                                                                  | M13–15 (authoring / Horizon C); M10–12 nėra tik M1–9 slice                           |
| **Prieiga**  | MVP + tier cap ≤6 (`getIsMvpMode` → `capForMvp`)                                                        | Magic link tier 3 / 6 / 9 / **12**                                                   |

**Taisyklė:** Pages = MVP **preview**, ne tas pats artefaktas kaip marketing production. Quality-gates job stato ir default, ir MVP build; **deploy** kelias naudoja **tik** MVP.

Production gali veikti dviem keliais (dev/demo):

- **full katalogo build** – `modules.json` be env;
- **core 1–6 build** – `VITE_MVP_MODE=1` → `*-m1-m6.json`.

### Prieigos lygis (Phase 1: tier 3 arba 6) – legacy demo

Aplikacija rodo modulius tik iki `getMaxAccessibleModuleId()` (šaltinis: `src/utils/accessTier.ts`). Be patikrinto magic link arba env kintamojo numatytasis lygis yra **0**.

**Kaip atrakinti modulius 1–6 (tier 6):**

1. **Magic link (rekomenduojama po apmokėjimo)**  
   Po sėkmingo apmokėjimo nukreipkite vartotoją į URL su parametrais:
   - `access_tier=3` arba `access_tier=6`
   - `expires=UNIX_TIMESTAMP`
   - `token=BASE64URL_HMAC` (payload: `access_tier:expires`, žr. `api/verify-access.ts`)
   - Pvz.: `https://www.promptanatomy.app/?access_tier=6&expires=1735689600&token=...`  
     Frontend kreipiasi į `GET /api/verify-access?access_tier=6&expires=...&token=...`; jei 200 – įrašo tier į `localStorage` ir išvalo URL.

2. **Aplinkos kintamasis (build laikas)**  
   Jei reikia „demo“ režimo (visi 1–6 matomi be pirkimo), production build nustatykite:
   - `VITE_MAX_ACCESSIBLE_MODULE=6`  
     (Vercel / Netlify / GitHub Actions env).

### Pilnas 1–6: MVP režimas išjungtas

**Production build su moduliais 1–6 gali būti su arba be `VITE_MVP_MODE=1`.**

- Su `VITE_MVP_MODE=1` buildinami ir rodomi tik moduliai 1–6; `7–15` duomenys neimportuojami į core production profilį. Tools ir Glossary naudoja atskirtus `1–6` failus.
- Be `VITE_MVP_MODE` (arba jo neįjungus) – build naudoja full failus (`modules.json`, `glossary.json`, `tools.json`) ir prieigą riboja pagal tier (3, 6, 9, 12).

**Architektūra A:** redagavimo tiesa lieka full failai. `*-m1-m6.json` failai yra build/runtime profilio failai, o ne pagrindinis authoring šaltinis.

**Build komandos:**

- **Production (Vercel M1–9):** `npm run build:production`
- **Corporate12 (M1–12):** `npm run build:corporate12`
- **Corporate15 (M1–15):** `npm run build:corporate15`
- Pilnas SOT (authoring): `npm run build` (be env).
- Core 1–6 demo (GitHub Pages): `VITE_MVP_MODE=1 npm run build` (žr. README).

### EN lokalizacija (moduliai 1–6)

Jei palaikomas EN, prieš release įsitikinkite, kad egzistuoja šie failai (juos merge'ina `src/data/modulesLoader.ts` ir glossary loader):

- `src/data/modules-en.json` (moduliai 1–3)
- `src/data/quiz-en.json` (apklausa)
- `src/data/modules-en-m4-m6.json` (moduliai 4–6)
- `src/data/glossary-en.json` (žodynėlis)

Automatiniai EN testai: `npm run test:run` – EN kelias tikrinamas `modulesLoader.test.ts`, `questionPoolSelector.test.ts`, `glossaryLoader.test.ts`, `App.quiz.integration.test.tsx`. Pilna EN checklist – `docs/development/RELEASE_QA_CHECKLIST.md` §5c.

### Nuorodos

- Prieigos logika: `src/utils/accessTier.ts`
- Magic link API: `api/verify-access.ts`
- SEO / crawlers / GEO: `docs/deployment/SEO_SUBMODULE.md`
- Release QA: `docs/development/RELEASE_QA_CHECKLIST.md`

---

## Integracija kaip subproject (monorepo)

Kai šis app integruojamas į marketingo repo (pvz. promptanatomy.app) kaip subproject, production deploy gali būti vykdomas per tą monorepo. Žr. [INTEGRATION_OVERVIEW.md](INTEGRATION_OVERVIEW.md).

### Subproject vieta ir build

- **Rekomenduojama vieta:** `apps/prompt-anatomy/` arba `apps/training/`.
- **Root script pavyzdys (marketingo repo):**  
  `"build:training": "cd apps/prompt-anatomy && npm ci && npm run build"`  
  arba su base path:  
  `"build:training": "cd apps/prompt-anatomy && npm ci && VITE_BASE_PATH=/academy/ npm run build"`.
- **Išvestis:** `apps/prompt-anatomy/dist/` – statiniai failai turi būti patalpinti į marketingo static path (pvz. `public/academy/`), kad būtų servinami po `/academy`.

### Base path ir env

| Kintamasis                   | Paskirtis                                                                                                            | Default (šis repo)                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `VITE_BASE_PATH`             | Kelias, po kurio servinamas training app. Prod monorepo → `/anatomy/`; GitHub Pages **inzinerija** → `/inzinerija/`. | `/inzinerija/` (vite prod default)  |
| `VITE_PUBLIC_SITE_URL`       | OG/canonical origin (pvz. `https://www.promptanatomy.app`)                                                           | `https://www.promptanatomy.app`     |
| `VITE_MVP_MODE`              | `1` = core production profilis, buildina tik modulius 1–6                                                            | neįjungta                           |
| `VITE_MAX_ACCESSIBLE_MODULE` | Demo/build-time override: atrakinti iki N modulio (0, 3, 6, 9, 12)                                                   | 0 (production – tik per magic link) |
| `VITE_VERIFY_ACCESS_URL`     | Verify-access origin/base URL (pvz. `https://promptanatomy.app`); tuščias = same-origin `/api/verify-access`         | tuščias = same-origin               |

Jei marketingas servina training po `/academy`, prieš training build nustatyti `VITE_BASE_PATH=/academy/`.
Jei dėl senesnės integracijos jau turite pilną endpoint URL (`.../api/verify-access`), runtime jį taip pat priims, bet naujoms integracijoms rekomenduojamas origin/base URL.

### Vercel: rewrites ir SPA fallback

- Statiniai failai iš training `dist/` – po pasirinktu path (pvz. `/academy/`).
- Visi `/academy` ir `/academy/*` (išskyrus egzistuojančius failus, pvz. `assets/`) – SPA fallback į training `index.html`.  
  Pvz. `vercel.json` rewrites:  
  `{ "source": "/academy/:path*", "destination": "/academy/index.html" }`  
  (konkretus path priklauso nuo to, kur marketingas talpina dist turinį).

### API (verify-access)

- **Verify-access atsakomybė – marketingo app.** Marketingas eksponuoja `GET /api/verify-access` pagal kontraktą (domain root). Žr. [INTEGRATION_OVERVIEW.md](INTEGRATION_OVERVIEW.md) skyrių „Verify-access API“.

---

**Pastaba:** Šis failas yra perkeltas į `docs/deployment/` katalogą. Aktualiausios instrukcijos yra `README.md` faile.
