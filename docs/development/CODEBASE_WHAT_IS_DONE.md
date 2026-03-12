# Codebase: kas įgyvendinta (gilaus analizės santrauka)

> **Tikslas:** Viena vieta – kas dabar veikia, kokie duomenys, kokybė, apimtis. Atnaujinta: 2026-03-11.

---

## 1. Kas įgyvendinta – aukščiausiu lygiu

| Sritis | Būsena | Pastabos |
|--------|--------|----------|
| **Moduliai 1–6** | ✅ Pilnai | Teorija (M1), testas (M2), praktika (M3), pažangus (M4–M6). Full redagavimo SOT: `modules.json`; core build/runtime profilis: `modules-m1-m6.json`; EN merge: `modules-en.json` (M1–M3), `modules-en-m4-m6.json` (M4–M6). |
| **LT/EN (i18n)** | ✅ Pilnas UI + turinys M1–M6 | Kalbos perjungiklis (nav), locale per `useLocale()`; modulių/skaidrių turinys per loaderiai; UI stringai per 16 namespace (common, nav, home, module, quiz, glossary, modulesPage, certificate, stepper, testPractice, vaizdoGen, contentSlides, diagrams, toolsPage, promptLibrary, aiDetectors). |
| **Žodynėlis** | ✅ | `glossary.json` / `glossary-en.json`, `getGlossary(locale)`. Path-step žodynėlio atrakinimas (M7+). |
| **Apklausa** | ✅ | Klausimai iš `modules.json` (M2) + `questionPool` / `questionPool-en`; `selectQuestions(locale)`. |
| **Sertifikatai** | ✅ | Tier 1 (po 3 mod.), tier 2 (po 6 + quiz ≥70%). PDF: `certificatePdf.ts`, `certificateContent.json` / `certificateContent-en.json`, NotoSans. |
| **PDF atmintinės** | ✅ M5, M6 | M5: `m5HandoutContent.json` / `m5HandoutContent-en.json`, `m5HandoutPdf.ts`. M6: `m6HandoutContent.json` / `m6HandoutContent-en.json`, `m6HandoutPdf.ts`. Locale-aware. |
| **Progresas** | ✅ | localStorage, versijavimas, migracija; completedModules, completedTasks, moduleTestScores. |
| **Įrankiai (Tools)** | ✅ | `tools.json`, ToolsPage, filtrai pagal modulį/kategoriją. |
| **Promptų biblioteka** | ✅ | `promptLibrary.json`, HomePage quick prompts (LT/EN). |
| **DI detektoriai (AiDetectorsSlide)** | ✅ Pilnas i18n | Namespace `aiDetectors`, `getAiDetectors(locale)`, `getSixBlockPrompt(locale)`; EN turinys ir duomenys. |
| **Schemas / diagramos** | ✅ Lokalizuotos | LlmArch, Schema3, DiPrezentacijosWorkflow, StrukturuotasProcesas, RagDuomenuRuosimas, AgentOrchestrator, RlProcess, TurinioWorkflow, ContextEngineeringPipeline – tekstai per locale getterius arba i18n. |
| **Veiksmo intro (Trumpai/Daryk/Patikra)** | ✅ | VeiksmoIntroBlock + DiModalitiesSlide takeaway + AiDetectorsSlide – etiketės per `contentSlides` / `aiDetectors`. |
| **Testai** | ✅ ~26 failų | Vitest + RTL; unit (loaders, progress, PDF, accessTier, slidePhaseConfig), component (QuizPage, CertificateScreen, ModuleCompleteScreen, ToolsPage, ErrorBoundary), integration (App.quiz, progress), a11y smoke, mvp.gating. |
| **Validacija** | ✅ | `validate-schema.mjs` – full ir core failai: modules, modules-m1-m6, modules-en-m4-m6, glossary, glossary-m1-m6, tools, tools-m1-m6, promptLibrary, certificateContent, introPiePdf. `sot_index.json` tikrina atskiras `validate-sot-index.mjs`. |
| **Access tier** | ✅ | Magic link `api/verify-access.ts` (tier 3 | 6); `getMaxAccessibleModuleId()`, užrakinimas modulių. |
| **MVP režimas** | ✅ | `VITE_MVP_MODE=1` – M1–M6; M7–M15 užrakinti. |

---

## 2. Duomenų sluoksnis

| Šaltinis | Paskirtis | Locale |
|----------|-----------|--------|
| `modules.json` | Full `1–15` redagavimo SOT: skaidrės, M2/M5 klausimai, apklausa (LT) | Bazinis; EN per merge |
| `modules-m1-m6.json` | Core `1–6` build/runtime failas (`VITE_MVP_MODE=1`) | LT |
| `modules-en.json` | M1–M3 pilnas turinys EN | `locale === 'en'` |
| `modules-en-m4-m6.json` | M4–M6 pilnas turinys EN | `locale === 'en'` |
| `glossary.json` / `glossary-en.json` | Full žodynėlio terminai | `getGlossary(locale)` |
| `glossary-m1-m6.json` | Core `1–6` žodynėlio build/runtime failas | LT |
| `promptLibrary.json` | Biblioteka (kopijuojami promptai) | Vienas failas |
| `tools.json` | Full DI įrankių redagavimo SOT | Vienas failas |
| `tools-m1-m6.json` / `tools-en-m1-m6.json` | Core `1–6` build/runtime failai | LT / EN |
| `certificateContent.json` / `-en.json` | Sertifikatų tekstai | `getCertificateContent(locale)` |
| `m5HandoutContent.json` / `-en.json` | M5 PDF atmintinė | `getM5HandoutContent(locale)` |
| `m6HandoutContent.json` / `-en.json` | M6 PDF atmintinė | `getM6HandoutContent(locale)` |
| `questionPool` / `questionPool-en` | Apklausos klausimų pool | `selectQuestions(locale)` |
| `aiDetectors.ts` | DI detektorių sąrašas, tipai, 6 blokų promptas | `getAiDetectors(locale)`, `getSixBlockPrompt(locale)` |

**Loaderiai:** `modulesLoader.ts` (cache LT/EN, merge), `glossaryLoader.ts`, `handoutContentLoader.ts`, `certificateContentLoader.ts`, `questionPoolSelector.ts`. Runtime/build pasirinkimą tarp full ir core profilio daro aliasai (`vite.config.ts`, `vitest.config.ts`), ne atskiras authoring modelis.

---

## 3. i18n padengimas

- **Namespace (16):** common, nav, home, module, quiz, glossary, modulesPage, certificate, stepper, testPractice, vaizdoGen, contentSlides, diagrams, toolsPage, promptLibrary, aiDetectors.
- **Komponentai naudoja `useLocale()` / `useTranslation()`:** App, AppNav, HomePage, ModulesPage, ModuleView, QuizPage, GlossaryPage, CertificateScreen, ModuleCompleteScreen, SlideContent, ContentSlides (DiModalitiesSlide, block slides, …), TestPracticeSlides, VaizdoGeneratoriusSlide, AiDetectorsSlide, ProcessStepper, visi diagramų/blokų komponentai (LlmArch, Schema3, ContextEngineeringPipeline, …), VeiksmoIntroBlock.
- **Liko ne visur:** Kai kurios skaidrės moduliuose 7–15 turi tik LT turinį; VaizdoGeneratoriusSlide body tekstai – vaizdoGen namespace (jau EN). Pilnas P2 i18n likusioms skaidrėms – atskira užduotis.

---

## 4. Testai

- **~26 testų failų** (unit + component + integration).
- **Padengimas:** modulesLoader (merge EN), glossaryLoader (LT/EN), questionPoolSelector (locale), certificatePdf (locale, options), CertificateScreen (LT/EN), App.quiz integration (navigacija, progress, EN locale), progress (save/load, moduleTestScores), slidePhaseConfig (M4/M5/M6 fazės), m5HandoutPdf, m6HandoutPdf, accessTier, mvp.gating, a11y smoke (axe-core), ErrorBoundary, ToolsPage, ModuleCompleteScreen, QuizPage.
- **E2E:** Nėra (roadmap).

---

## 5. Kas nebaigta / backlog

- **Navigacija (Pirmyn/Atgal):** Viena dominuojanti vieta (viršuje vs dešinėje) – produktinis sprendimas (TODO #0).
- **M5/M6 PDF:** Rankinė lietuviškų raidžių ir parsisiuntimo patikra prieš release; NotoSans production.
- **Footer numeriai M4:** 65.8, 66.9 ir kiti – prieš release pagal `footer-slide-numbers.mdc`.
- **Moduliai 7–15:** Turinys ir struktūra SOT; UI rodo, bet dalis turinio/EN dar ne pilnai.
- **E2E, monitoring (Sentry/GA4/PostHog):** Roadmap.

---

## 6. Nuorodos

| Kas | Kur |
|-----|-----|
| SOT, agentai | `docs/DOCUMENTATION_QUICK_REF.md`, `docs/LEAN_INDEX.md` |
| Kas toliau | `TODO.md` |
| Release QA | `docs/development/RELEASE_QA_CHECKLIST.md` |
| Changelog | `CHANGELOG.md` |
