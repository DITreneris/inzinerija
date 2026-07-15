# Codebase: kas įgyvendinta (gilaus analizės santrauka)

> **Tikslas:** Viena vieta – kas dabar veikia, kokie duomenys, kokybė, apimtis. Atnaujinta: 2026-07-15 (release **1.4.5** + preflight gates green).

---

## 1. Kas įgyvendinta – aukščiausiu lygiu

| Sritis                                    | Būsena                                  | Pastabos                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Moduliai 1–6**                          | ✅ Pilnai                               | Teorija (M1), testas (M2), praktika (M3), pažangus (M4–M6). Full SOT: `modules.json`; MVP profilis: `modules-m1-m6.json`; EN: `modules-en.json` (M1–M3), `modules-en-m4-m6.json` (M4–M6).                                                                                                                                                        |
| **Moduliai 7–9**                          | ✅ Korporatyvinis bundle                | Duomenų analizės kelias; `*-m1-m9.json`; `npm run build:production`. Phase 2 + P2 UX polish (2026-07-15); operacinis SOT – `M79_PATCH_REGISTRY.md`.                                                                                                                                                                                                                                                 |
| **Moduliai 10–12**                        | ✅ Turinys full kataloge                | Agentų kelias: taksonomija (10.45), workflow šablonai (10.48), M11 testas, M12 capstone; EN partial overlay `modules-en-m10-m12.json`.                                                                                                                                                                                                           |
| **Moduliai 13–15**                        | ✅ Turinys full kataloge                | Turinio inžinerijos kelias: M13 image/video/music, M14 testas, M15 quick/full finalinis projektas; EN overlay `modules-en-m13-m15.json`.                                                                                                                                                                                                         |
| **LT/EN (i18n)**                          | ✅ UI + M1–M15 turinys                  | Kalbos perjungiklis; modulių turinys per loader merge; M7–9 EN overlay `modules-en-m7-m9.json`; M10–12 EN kai `maxModuleId >= 10`; M13–15 EN kai `maxModuleId >= 13`.                                                                                                                                                                            |
| **Žodynėlis**                             | ✅                                      | `glossary.json` / `glossary-en.json`, `getGlossary(locale)`. Path-step žodynėlio atrakinimas (M7+).                                                                                                                                                                                                                                              |
| **Apklausa**                              | ✅                                      | Klausimai iš `modules.json` (M2) + `questionPool` / `questionPool-en`; `selectQuestions(locale)`.                                                                                                                                                                                                                                                |
| **Sertifikatai**                          | ✅                                      | Tier 1 (po 3 mod.), tier 2 (po 6 + quiz ≥70%), tier 3 (po 7–9 + M8 testas ≥70%), tier 4 (M10–12 + M11 testas ≥70%), tier 5 (M13–15 + M14 testas ≥70%). PDF: `certificatePdf.ts`, NotoSans; serial numeris stabilus per tier localStorage.                                                                                                        |
| **PDF atmintinės**                        | ✅ M1, M4, M5, M6, M7–9, M10–12, M13–15 | Bendras maketas: `handoutPdfKit.ts`. M1/M4: value-only atmintinės. M5/M6: `m5/m6Handout*`. M7–9: `m79HandoutContent*.json`; M10–12: `m1012HandoutContent*.json`; M13–15: `m1315HandoutContent*.json` (kelio bundle su funnel CTA). Entry point routing – `completionArtifacts.json`; pakartotinis atsisiuntimas – `ModulesPage` „Mano medžiaga“. |
| **Progresas**                             | ✅                                      | localStorage, versijavimas, migracija; completedModules, completedTasks, moduleTestScores.                                                                                                                                                                                                                                                       |
| **Įrankiai (Tools)**                      | ✅                                      | `tools.json`, ToolsPage, filtrai pagal modulį/kategoriją.                                                                                                                                                                                                                                                                                        |
| **Promptų biblioteka**                    | ✅                                      | `promptLibrary.json`, HomePage quick prompts (LT/EN).                                                                                                                                                                                                                                                                                            |
| **DI detektoriai (AiDetectorsSlide)**     | ✅ Pilnas i18n                          | Namespace `aiDetectors`, `getAiDetectors(locale)`, `getSixBlockPrompt(locale)`; EN turinys ir duomenys.                                                                                                                                                                                                                                          |
| **Schemas / diagramos**                   | ✅ Lokalizuotos                         | LlmArch, Schema3, DiPrezentacijosWorkflow, StrukturuotasProcesas, RagDuomenuRuosimas, RlProcess, TurinioWorkflow, ContextEngineeringPipeline, M7–M12 React schemos (`m12_multi_agent_schema`, M10 `m10_*`) – tekstai per locale getterius arba i18n. Legacy `AgentOrchestrator` nebewired.                                                       |
| **Veiksmo intro (Trumpai/Daryk/Patikra)** | ✅                                      | VeiksmoIntroBlock + DiModalitiesSlide takeaway + AiDetectorsSlide – etiketės per `contentSlides` / `aiDetectors`.                                                                                                                                                                                                                                |
| **Navigacija (ModuleView)**               | ✅                                      | Viena sticky viršutinė juosta, primary „Tęsti“, Atgal ghost (CHANGELOG 2026-02-26, 2026-02-28).                                                                                                                                                                                                                                                  |
| **Testai**                                | ✅ 72 failai, 482 testai                | Vitest + RTL; unit, component, integration, a11y smoke, gate tier 9, handout PDF (M1/M4/M5/M6/M79/M1012/M1315), tier 4/5 eligibility, diagram registry guards, M10–15 EN/data-contract audit guard'ai, `ContentBlockSlide.linkedRowIndex` (2026-07-15).                                                                                                                                           |
| **Validacija**                            | ✅                                      | `validate-schema.mjs` – full, core (`*-m1-m6`, `*-m1-m9`), EN overlays, glossary, tools, `completionArtifacts.json`, handout content JSON. `sot_index.json` – `validate-sot-index.mjs`. Release gate M1–9: `npm run audit:release-preflight`; M10–12: `npm run audit:m1012`; M13–15: `npm run audit:m1315`.                                      |
| **Access tier**                           | ✅                                      | Magic link tier 3 \| 6 \| 9; `getMaxAccessibleModuleId()`, užrakinimas modulių.                                                                                                                                                                                                                                                                  |
| **MVP režimas**                           | ✅                                      | `VITE_MVP_MODE=1` – M1–6 demo; production `npm run build:production` – M1–9.                                                                                                                                                                                                                                                                     |

---

## 2. Duomenų sluoksnis

| Šaltinis                                   | Paskirtis                                                            | Locale                                                |
| ------------------------------------------ | -------------------------------------------------------------------- | ----------------------------------------------------- |
| `modules.json`                             | Full `1–15` redagavimo SOT: skaidrės, M2/M5 klausimai, apklausa (LT) | Bazinis; EN per merge                                 |
| `modules-m1-m6.json`                       | MVP `1–6` build/runtime (`VITE_MVP_MODE=1`)                          | LT                                                    |
| `modules-m1-m9.json`                       | Korporatyvinis `1–9` build (`VITE_MAX_BUILD_MODULE=9`)               | LT                                                    |
| `modules-en.json`                          | M1–M3 pilnas turinys EN                                              | `locale === 'en'`                                     |
| `modules-en-m4-m6.json`                    | M4–M6 pilnas turinys EN                                              | `locale === 'en'`                                     |
| `modules-en-m7-m9.json`                    | M7–M9 EN deep-merge overlay (lean + branch/scenario expansion)       | `locale === 'en'`, merge jei `maxModuleId >= 7`       |
| `modules-en-m10-m12.json`                  | M10–M12 EN deep-merge overlay (body pilnas)                          | `locale === 'en'`, merge jei `maxModuleId >= 10`      |
| `modules-en-m13-m15.json`                  | M13–M15 EN deep-merge overlay (body pilnas)                          | `locale === 'en'`, merge jei `maxModuleId >= 13`      |
| `glossary.json` / `glossary-en.json`       | Full žodynėlio terminai                                              | `getGlossary(locale)`                                 |
| `glossary-m1-m6.json`                      | MVP žodynėlio profilis                                               | LT                                                    |
| `glossary-m1-m9.json`                      | Korporatyvinis žodynėlio profilis                                    | LT                                                    |
| `promptLibrary.json`                       | Biblioteka (kopijuojami promptai)                                    | Vienas failas                                         |
| `tools.json`                               | Full DI įrankių redagavimo SOT                                       | Vienas failas                                         |
| `tools-m1-m6.json` / `tools-en-m1-m6.json` | MVP build/runtime failai                                             | LT / EN                                               |
| `tools-m1-m9.json` / `tools-en-m1-m9.json` | Korporatyvinis build/runtime                                         | LT / EN                                               |
| `certificateContent.json` / `-en.json`     | Sertifikatų tekstai                                                  | `getCertificateContent(locale)`                       |
| `completionArtifacts.json`                 | Handout ir sertifikatų entry point registry                          | `completionArtifactsLoader.ts`, `downloadHandout.ts`  |
| `m1HandoutContent.json` / `-en.json`       | M1 first-win PDF atmintinė                                           | `getM1HandoutContent(locale)`                         |
| `m4HandoutContent.json` / `-en.json`       | M4 konteksto, šaltinių ir patikros PDF atmintinė                     | `getM4HandoutContent(locale)`                         |
| `m5HandoutContent.json` / `-en.json`       | M5 PDF atmintinė                                                     | `getM5HandoutContent(locale)`                         |
| `m6HandoutContent.json` / `-en.json`       | M6 PDF atmintinė                                                     | `getM6HandoutContent(locale)`                         |
| `m79HandoutContent.json` / `-en.json`      | M7–9 DA kelio PDF atmintinė                                          | `getM79HandoutContent(locale)`                        |
| `m1012HandoutContent.json` / `-en.json`    | M10–12 Agentų kelio PDF atmintinė                                    | `getM1012HandoutContent(locale)`                      |
| `m1315HandoutContent.json` / `-en.json`    | M13–15 Turinio kelio PDF atmintinė                                   | `getM1315HandoutContent(locale)`                      |
| `questionPool` / `questionPool-en`         | Apklausos klausimų pool                                              | `selectQuestions(locale)`                             |
| `aiDetectors.ts`                           | DI detektorių sąrašas, tipai, 6 blokų promptas                       | `getAiDetectors(locale)`, `getSixBlockPrompt(locale)` |

**Loaderiai:** `modulesLoader.ts`, `glossaryLoader.ts`, `handoutContentLoader.ts`, `completionArtifactsLoader.ts`, `certificateContentLoader.ts`, `questionPoolSelector.ts`. Runtime/build pasirinkimą daro aliasai (`vite.config.ts`, `vitest.config.ts`).

---

## 3. i18n padengimas

- **Namespace (16):** common, nav, home, module, quiz, glossary, modulesPage, certificate, stepper, testPractice, vaizdoGen, contentSlides, diagrams, toolsPage, promptLibrary, aiDetectors.
- **Komponentai naudoja `useLocale()` / `useTranslation()`:** App, AppNav, HomePage, ModulesPage, ModuleView, QuizPage, GlossaryPage, CertificateScreen, ModuleCompleteScreen, SlideContent, ContentSlides, TestPracticeSlides, VaizdoGeneratoriusSlide, AiDetectorsSlide, ProcessStepper, diagramų/blokų komponentai, VeiksmoIntroBlock.
- **M10–12 EN gate:** `modules-en-m10-m12.json` deep-merge overlay; patikra `npm run audit:m1012` (coverage + language).
- **M13–15 EN gate:** `modules-en-m13-m15.json` deep-merge overlay; patikra `npm run audit:m1315` (coverage + language).
- **Liko ne visur:** M7–9 EN: `npm run audit:m79`; M13–15 EN turinys pilnas overlay, bet release brandumas vis dar priklauso nuo rankinės UI peržiūros.

---

## 4. Testai

- **72 testų failai, 482 testai** (unit + component + integration; 2026-07-15 HEAD po M7–M9 P2 polish).
- **Padengimas:** modulesLoader, glossaryLoader, questionPoolSelector, certificatePdf/certificateStorage, `certificateEligibility` tier 1–5, handout PDF (M1/M4/M5/M6/M79/M1012/M1315), completionArtifacts registry, `ModulesPage.materials` uždirbtos M12/M15 atmintinės, accessTier, mvp.gating, gate.smoke, a11y smoke, ModuleCompleteScreen, QuizPage, ecosystem URLs, diagram registry guards, EN audit tests (`m46EnLanguageAudit`, `m79EnLanguageAudit`, `m1012EnLanguageAudit`, `m1315EnLanguageAudit`).
- **E2E:** Nėra (roadmap; gate smoke – vitest).

---

## 5. Kas nebaigta / backlog

- **M1/M4/M5/M6/M7–9/M10–12/M13–15 PDF:** Rankinė lietuviškų raidžių, spaudžiamų nuorodų ir parsisiuntimo patikra prieš release; NotoSans production (`RELEASE_QA_CHECKLIST` §5d).
- **Moduliai 13–15:** Turinys SOT + EN overlay + audit vartai; dar reikia rankinės UI peržiūros prieš release.
- **E2E (Playwright), monitoring (PostHog/GA4):** gate smoke jau dengiamas Vitest; production analytics snippet / dashboard lieka `TODO.md` §1.1 MON-4.

---

## 6. Nuorodos

| Kas          | Kur                                                     |
| ------------ | ------------------------------------------------------- |
| SOT, agentai | `docs/DOCUMENTATION_QUICK_REF.md`, `docs/LEAN_INDEX.md` |
| Kas toliau   | `TODO.md`                                               |
| Release QA   | `docs/development/RELEASE_QA_CHECKLIST.md`              |
| Changelog    | `CHANGELOG.md`                                          |
