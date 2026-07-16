# Dokumentacijos indeksas – kur kuo remtis

> **Tikslas:** Agentai ir žmonės žino, kuris dokumentas yra tiesa (SOT), kas aktyvus, o kas archyvuota.  
> **Atnaujinta:** 2026-07-16 (A–C residual docs; docs maintenance; M7–M9 P2 + Lygis C)
>
> **Agentams (lean, prieinama):** pirmiausia **`docs/DOCUMENTATION_QUICK_REF.md`** (SOT + keliai); **`docs/LEAN_INDEX.md`** – minimalus branduolys (~20 failų). Pilnas sąrašas ir archyvas žemiau.

---

## 1. Source of Truth (SOT) – pagrindinė tiesa

Šiuose failuose – **vienintelė** tiesa savo srityje. Konfliktų atveju laimėti šie.

| Sritis                                                                                     | Failas                                                                                                                                                                                                                 | Pastaba                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Turinys Moduliai 1–3**                                                                   | `turinio_pletra.md` (root)                                                                                                                                                                                             | Pedagogika, terminologija, struktūra                                                                                                                                                                                    |
| **Turinys Moduliai 4–6**                                                                   | `docs/turinio_pletra_moduliai_4_5_6.md`                                                                                                                                                                                | Teorija (4), testas (5), projektas (6)                                                                                                                                                                                  |
| **Turinys Moduliai 7–9**                                                                   | `docs/turinio_pletra_moduliai_7_8_9.md`                                                                                                                                                                                | Duomenų analizės kelias; production bundle (`build:production`, tier 9). DA praktikos stub: `docs/development/DUOMENU_ANALIZES_GERIAUSIOS_PRAKTIKOS.md`                                                                 |
| **Turinys Moduliai 10–12**                                                                 | `docs/turinio_pletra_moduliai_10_11_12.md`                                                                                                                                                                             | Agentų inžinerija: teorija (10), testas (11), projektas (12)                                                                                                                                                            |
| **Turinys Moduliai 13–15**                                                                 | `docs/turinio_pletra_moduliai_13_14_15.md`                                                                                                                                                                             | Turinio inžinerija: teorija (13), testas (14), projektas (15)                                                                                                                                                           |
| **Kur kalbama apie kurį modulį**                                                           | `docs/CONTENT_MODULIU_ATPAZINIMAS.md`                                                                                                                                                                                  | 4.1–4.7 = tik Modulio 4; 10.1–10.8 = tik Modulio 10; 13.1–13.9 = tik Modulio 13                                                                                                                                         |
| **Dizaino etalonas** (šriftai, spalvos, skaidrių schemos)                                  | `docs/development/GOLDEN_STANDARD.md`                                                                                                                                                                                  | Vienas etalonas visiems moduliams (v2.3.0: §3.4c skiriamoji/apibendrinimo; §3.4d path-step kelio žingsnis, badge, žodynėlio atrakinimas)                                                                                |
| **Techninė atspirties dokumentacija** (inventorius, architektūra, komponentai, testai, CI) | `docs/development/GOLD_LEGACY_STANDARD.md`                                                                                                                                                                             | Istorinis baseline v1.3.0 (M1–6 snapshot); dabartinis release **v1.4.3 + Unreleased P2** – žr. `CHANGELOG.md`, `docs/development/CODEBASE_WHAT_IS_DONE.md`                                                              |
| **Duomenys**                                                                               | `src/data/modules.json`, `*-m1-m6.json`, `*-m1-m9.json`, `promptLibrary.json`, `glossary.json`, `tools.json`, `hallucinationRates.ts`, `completionArtifacts.json`, `certificateContent*.json`, `*HandoutContent*.json` | Full SOT: `modules.json` / `glossary.json` / `tools.json`; artefaktai per `completionArtifacts.json`. Build profiliai: `*-m1-m6.json` (MVP), `*-m1-m9.json` (**production**). Žr. `DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md` |
| **Vartotojo atsiliepimai**                                                                 | `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md`                                                                                                                                                                               | Gyvas testavimas, V1/V2, segmentai                                                                                                                                                                                      |
| **Klaidos ir sprendimai**                                                                  | `docs/development/TEST_REPORT.md`                                                                                                                                                                                      | QA_AGENT priima klaidas čia                                                                                                                                                                                             |

---

## 2. Lean branduolys ir aktyvūs dokumentai

**Lean (pakanka daugumai užduočių):** žr. **`docs/LEAN_INDEX.md`** – SOT, agentai, M4 eilė, kokybė.

### Agentai ir procesas (development/)

| Failas                                                 | Paskirtis                                                                                |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `docs/development/AGENT_ORCHESTRATOR.md`               | Routeris, pipeline, kokybės vartai                                                       |
| `docs/development/GOLD_LEGACY_STANDARD.md`             | Techninė atspirties dokumentacija (inventorius, failai, testai, CI); savininkas QA_AGENT |
| `docs/development/DOCS_SYNC_CHECKLIST.md`              | Docs sync vartas po release / didelio Unreleased sprinto                                 |
| `docs/development/DOCS_MAINTENANCE.md`                 | Ilgalaikė dokumentacijos priežiūra, dual SOT, release cadence                            |
| `docs/development/M79_PATCH_REGISTRY.md`               | M7–M9 patch skriptų registras (operacinis UX polish SOT)                                 |
| `docs/development/PLAN_AGENTAI_DARBAI.md`              | Kas, seka, Modulio 4 MUST/SHOULD                                                         |
| `docs/development/PEDAGOGINES_IZVALGOS_ROADMAP.md`     | Pedagoginės įžvalgos, Must/Should/Want                                                   |
| `docs/development/CONTENT_AGENT.md`                    | CONTENT_AGENT spec                                                                       |
| `docs/development/CURRICULUM_AGENT.md`                 | Pedagogika, Bloom, santraukos                                                            |
| `docs/development/SCHEME_AGENT.md`                     | Schemų/diagramų gairės                                                                   |
| `docs/development/DIAGRAMU_M7_M12_REGISTRY.md`         | Aktyvus M7–M12 schemų routing, test coverage ir image key registry                       |
| `docs/development/DIAGRAMU_GERIAUSIOS_PRAKTIKOS.md`    | Diagramų praktikos                                                                       |
| `docs/development/AGENT_VERIFICATION_NE_MELUOTI.md`    | Verifikacija, „padaryta“ vs tikrovė                                                      |
| `docs/development/UI_UX_AGENT.md`                      | UI/UX gairės                                                                             |
| `docs/development/LENTELIU_STANDARTAS.md`              | Lentelių standartas                                                                      |
| `docs/development/USER_JOURNEY_AGENT.md`               | Vartotojo kelionės diagnostika                                                           |
| `docs/development/DATA_AGENT_TOOLS.md`                 | DATA_AGENT įrankiai                                                                      |
| `docs/development/DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md` | Duomenų atnaujinimo gairės                                                               |
| `docs/development/analysis/README.md`                  | Redirect – vienkartinės analizės perkeltos į `docs/archive/development/analysis/`        |

**User Journey seka ir modulio analizės (archyvas):** `docs/archive/development/` – AGENT*SEQUENCE_USER_JOURNEY_MVP_MODULIO_ANALIZE, MODULIO*_*USER_JOURNEY_ANALIZE, M4_SKAIDRE*_ ir kt. Žr. `docs/archive/README.md`.

### Bendra kursų analizė (1–15)

| Failas                                           | Paskirtis                                                                                                                               |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/EXECUTIVE_ATASKAITA_PROGRAMOS_1_IKI_15.md` | **Executive ataskaita klientams/partneriams** – pilna „Promptų anatomijos“ programa 1–15: temos nuodugniai ir konkrečiai, visi moduliai |
| `docs/KURSO_1_IKI_15_ANALIZE_APIBENDRINIMAS.md`  | **Visa kursų 1–15 analizė** – kas gerai/negerai, ko trūksta/per daug, SWOT, pasiūlymai pagal dalis, low-hanging fruits                  |

### Kokybė ir release

| Failas                                            | Paskirtis                                                                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/development/RELEASE_QA_CHECKLIST.md`        | 5 min prieš release (a11y, lietuviškos raidės, MVP)                                                                                         |
| `docs/development/PAPRASTOS_KALBOS_GAIRES.md`     | Paprasta kalba, žargonas                                                                                                                    |
| **Archyvas**                                      | Mobile auditas, EN standartas, santraukos spec – `docs/archive/development/` (MOBILE_UI_UX_AUDIT, EN_LANGUAGE_STANDARD, SUMMARY_SLIDE_SPEC) |
| `docs/development/TESTING_CHECKLIST.md`           | Testavimo sąrašas                                                                                                                           |
| `docs/development/ANALYTICS_EVENT_TAXONOMY.md`    | MVP Analytics (eventai, funnel)                                                                                                             |
| `docs/development/ANALYTICS_DASHBOARD_MVP.md`     | Dashboard wireframe, PostHog                                                                                                                |
| `docs/development/PDF_MAKETO_GAIRES.md`           | PDF maketas (tipografija, NotoSans)                                                                                                         |
| `docs/development/PDF_DOWNLOAD_TESTING.md`        | PDF atsisiuntimo testai                                                                                                                     |
| `docs/development/PDF_GENERATION_AGENT_MEMORY.md` | PDF geriausios praktikos, checklist                                                                                                         |
| **Archyvas**                                      | LT/EN analizės, multikalbiškumas, WWW nuorodos – `docs/archive/development/`                                                                |

### Moduliai 4–6 (struktūra ir tobulinimai)

| Failas                                                 | Paskirtis                                                                                          |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `docs/MODULIO_4_SKAIDRIU_EILES.md`                     | Oficiali Modulio 4 skaidrių eilė (4.0→4.7)                                                         |
| `docs/MODULIO_4_TOBULINIMAI_GERIAUSIOS_PRAKTIKOS.md`   | MUST/SHOULD prioritetai (PLAN_AGENTAI remiasi)                                                     |
| `docs/PEDAGOGINE_ANALIZE_MODULIAI_4_5_6.md`            | Pedagoginė analizė                                                                                 |
| `docs/SKAIDRIU_TIPU_ANALIZE.md`                        | Skaidrių tipai (content-driven)                                                                    |
| `docs/development/NEWS_PORTAL_SLIDE_53_5.md`           | M4 sk. 53.5 news-portal storyboard (aktyvus)                                                       |
| `docs/development/PORTAL_BEAT_DIAGRAMS.md`             | M4 sk. 53.5 beat diagramų spec                                                                     |
| `docs/development/M4_SK_53_5_SESSION_RETROSPECTIVE.md` | M4 sk. 53.5 sesijos pamokos (ne SOT – referencas)                                                  |
| **Archyvas**                                           | User Journey analizės, M4 skaidrių 56/59/63 auditai, gilios analizės – `docs/archive/development/` |

### Moduliai 10–12 (Agentų inžinerija)

| Failas                                     | Paskirtis                                                                                                              |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `docs/turinio_pletra_moduliai_10_11_12.md` | Turinio SOT M10–M12                                                                                                    |
| `docs/MODULIO_10_SKAIDRIU_EILES.md`        | Oficiali M10/M11/M12 skaidrių eilė                                                                                     |
| `docs/AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md`  | Verslo automatizavimo gidas (papildomas skaitymas M10–12)                                                              |
| **Archyvas**                               | MODULIO*10_USER_JOURNEY_ANALIZE, ANALIZE*\*\_10_11_12, MODULIAI_10_11_12_TURINIO_SPRAGOS – `docs/archive/development/` |

### Moduliai 13–15 (Turinio inžinerija)

| Failas                                     | Paskirtis                                                                                                              |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `docs/turinio_pletra_moduliai_13_14_15.md` | Turinio SOT M13–M15                                                                                                    |
| `docs/MODULIO_13_SKAIDRIU_EILES.md`        | Oficiali M13/M14/M15 skaidrių eilė                                                                                     |
| **Archyvas**                               | MODULIO*13_USER_JOURNEY_ANALIZE, ANALIZE*\*\_13_14_15, MODULIAI_13_14_15_TURINIO_SPRAGOS – `docs/archive/development/` |

### Konteksto inžinerija (agentams)

| Failas                                  | Paskirtis                                                     |
| --------------------------------------- | ------------------------------------------------------------- |
| `docs/development/context-engineering/` | sot_index.json, context_budget.md, memory_schema, eval_rubric |
| `docs/development/dod_01.md`            | Definition of Done indeksas (agentų DoD, pipeline handoff)    |
| `.cursor/skills/`                       | Agentų skills (workflow + lessons.md)                         |

### Pradžia ir deployment

| Failas                                | Paskirtis               |
| ------------------------------------- | ----------------------- |
| `docs/getting-started/QUICK_START.md` | Greitas pradžios gidas  |
| `docs/deployment/DEPLOYMENT.md`       | Deployment instrukcijos |
| `docs/deployment/GITHUB_SETUP.md`     | GitHub Pages setup      |

### Marketingas ir funnel

| Failas                                          | Paskirtis                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/marketing_plan.md`                        | **Rinkodaros planas (vienas dokumentas)** – auditorija, žinutės, kanalai (LinkedIn lead magnet, vieša Telegram grupė), funnel, monetizacija (Modulis 4 mokamai), integracijos (Brevo, GA4, UTM), MUST–SHOULD–WANT. Sąsaja: `VARTOTOJU_ATSILIEPIMAI_BENDRAS.md` §11. Supersedes: `docs/archive/marketing_plan.md`, `docs/archive/MARKETING_MUST_SHOULD_WANT.md`. |
| `docs/LinkedIn_audience_insights_2026-02-21.md` | **LinkedIn įrašo auditorijos analizė** – kas pamatė postą (2026-02-21), validacija su rinkodaros planu, įžvalgos, Kiss–Marry–Kill prioritizacija. Šaltinis: `docs/archive/20260221_Linkedin_analize.txt`.                                                                                                                                                       |

### Projekto šaknis

| Failas         | Paskirtis                             |
| -------------- | ------------------------------------- |
| `README.md`    | Projekto aprašas, struktūra, komandos |
| `TODO.md`      | Dabartinės užduotys                   |
| `ROADMAP.md`   | Plėtros planas                        |
| `CHANGELOG.md` | Versijų istorija                      |

---

## 3. Moduliai 7–8–9 (Duomenų analizės kelias – production)

**Produkcijoje (Vercel, tier 9):** moduliai 7–9 įtraukti per `npm run build:production` (`VITE_MAX_BUILD_MODULE=9` → `*-m1-m9.json`). **Ne** production bundle: M10–15 (authoring kataloge).

| Failas                                                             | Paskirtis                                                                      |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `docs/turinio_pletra_moduliai_7_8_9.md`                            | Turinio SOT M7–M9 (pipeline, MASTER, M8 testas, M9 capstone)                   |
| `docs/MODULIO_7_SKAIDRIU_EILES.md`                                 | Skaidrių eilė Moduliui 7; path-step ids 71.1–71.5 (žr. SOT §8.2)               |
| `docs/development/DUOMENU_ANALIZES_GERIAUSIOS_PRAKTIKOS.md`        | DA praktikos **nuorodų stubas** → redaguoti `turinio_pletra_moduliai_7_8_9.md` |
| `05_marketingo_memo_tier9_vienas_build.md`                         | Production env, tier 9, vienas build                                           |
| `docs/archive/development/MODULIU_7_8_9_GILI_ANALIZE_VERDIKTAS.md` | Istorinė analizė (2026-02-14) – dalis išvados nebevalidi po release 1.4.0      |

Vienkartinės **M7/M8/M9** analizės – `docs/archive/moduliai_7_8_9/`; DS/UX analizės – `docs/archive/development/analysis/`.

---

## 4. Archyvas – pasenę / neaktualūs

**Įspėjimas:** `docs/archive/` dokumentai **nėra SOT**. Agentai ir žmonės – pirmiausia `DOCUMENTATION_QUICK_REF.md` §1; archyvą atidarykite tik istoriniam kontekstui.

Kelias **`docs/archive/`** yra repozitorijoje (sekamas git). Šaknies `archive/` (be `docs/`) lieka `.gitignore` – senas lokalinis katalogas.

- **docs/archive/README.md** – archyvavimo taisyklės ir 2026-07-14 perkėlimų sąrašas.
- **docs/archive/audits/** – Modulių 1–6 UX/mobile audito ataskaitos.
- **docs/archive/development/** – įgyvendinti planai, vienkartiniai auditai.
- **docs/archive/development/analysis/** – vienkartinės analizės (CTA, footer, DS baseline, EN ir kt.).
- **docs/archive/moduliai_7_8_9/** – M7/M8/M9 detalesnės analizės (aktyvus turinys – `turinio_pletra_moduliai_7_8_9.md`).
- **docs/archive/root/** – konfidencialūs testų txt iš projekto šaknies.

---

## 5. Greita taisyklė agentams

1. **Turinys / terminologija** → `turinio_pletra.md`, `docs/turinio_pletra_moduliai_4_5_6.md`, `docs/CONTENT_MODULIU_ATPAZINIMAS.md`.
2. **Dizainas / skaidrių išdėstymas** → `docs/development/GOLDEN_STANDARD.md`.
3. **Duomenys** → `src/data/*.json`, `src/data/hallucinationRates.ts`.
4. **Kas kokiam agentui / seka** → `docs/development/AGENT_ORCHESTRATOR.md`, `docs/development/PLAN_AGENTAI_DARBAI.md`.
5. **Klaidos / atsiliepimai** → `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md`, `docs/development/TEST_REPORT.md`.
6. **Jei abejoji** → pirmiausia **CODE_REVIEW_AGENT** (diagnozė) arba **CONTENT_AGENT** (reikalavimų sugryninimas). **Nenaudoti** `docs/archive/` kaip SOT – tik istorijai.
