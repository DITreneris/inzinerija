# Dokumentacijos greita nuoroda (agentams)

> **Tikslas:** Mažas kontekstas – SOT ir kritiniai keliai. **Lean branduolys:** `docs/LEAN_INDEX.md`. Pilnas sąrašas: `docs/DOCUMENTATION_INDEX.md`.  
> **Atnaujinta:** 2026-03-11 (architektūra A)

---

## 1. Source of Truth (SOT)

| Sritis | Failas |
|--------|--------|
| Turinys M1–3 | `turinio_pletra.md` |
| Turinys M4–6 | `docs/turinio_pletra_moduliai_4_5_6.md` |
| Modulių/skaidrių numeracija | `docs/CONTENT_MODULIU_ATPAZINIMAS.md` |
| Dizainas (šriftai, skaidrės) | `docs/development/GOLDEN_STANDARD.md` |
| Techninė atspirties būsena (architektūra, komponentai, testai, CI) | `docs/development/GOLD_LEGACY_STANDARD.md` |
| Duomenys | `src/data/modules.json` (full redagavimo SOT), `src/data/modules-m1-m6.json` (core build/runtime), `promptLibrary.json`, `glossary.json`, `glossary-m1-m6.json`, `tools.json`, `tools-m1-m6.json`, `hallucinationRates.ts` |
| Atsiliepimai / klaidos | `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md`, `docs/development/TEST_REPORT.md` |

**Konfliktas:** 1) Turinio SOT → 2) JSON sinchronas → 3) UI.

**Architektūra A:** `src/data/modules.json` lieka full `1–15` redagavimo SOT. `VITE_MVP_MODE=1` per aliasus perjungia runtime į `*-m1-m6.json` failus, bet jų nelaikome pagrindiniais authoring failais.

---

## 2. Agentai ir kur žiūrėti

| Veikla | Agentas | Dokumentas |
|--------|---------|------------|
| Turinys, CTA, kopija | CONTENT_AGENT | `docs/development/CONTENT_AGENT.md`, `docs/development/PAPRASTOS_KALBOS_GAIRES.md` |
| Pedagogika, Bloom, santraukos | CURRICULUM_AGENT | `docs/development/CURRICULUM_AGENT.md` |
| Schemos, diagramos | SCHEME_AGENT | `docs/development/SCHEME_AGENT.md` |
| JSON, duomenys | DATA_AGENT | `src/data/*` |
| UI/UX, layout, a11y | UI_UX_AGENT | `docs/development/UI_UX_AGENT.md`, GOLDEN_STANDARD |
| Kokybė, diagnozė | CODE_REVIEW_AGENT | — |
| Vartotojo kelionė | USER_JOURNEY_AGENT | `docs/development/USER_JOURNEY_AGENT.md` |
| Routeris, pipeline | — | `docs/development/AGENT_ORCHESTRATOR.md` |

---

## 3. Lean ir pilnas sąrašas

- **Lean branduolys (pakanka daugumai):** `docs/LEAN_INDEX.md`  
- **Pilnas aktyvių sąrašas:** `docs/DOCUMENTATION_INDEX.md` §2–4  
- **Archyvas (modulio analizės, ataskaitos):** `docs/archive/` – tik lokaliai (ne commitinama, .gitignore); jei naudojate lokaliai – žr. `docs/archive/README.md`.

---

## 4. Išoriniams integratoriams

- **Šis repo** = mokymo turinio ir UI šaltinis; **production** = [promptanatomy.app](https://promptanatomy.app/); auth, Stripe, DB – **marketingo repo**.
- **Integracija kaip subproject (monorepo):** [docs/deployment/INTEGRATION_OVERVIEW.md](deployment/INTEGRATION_OVERVIEW.md).
- **Deploy, env, base path:** [docs/deployment/DEPLOYMENT.md](deployment/DEPLOYMENT.md) (Production + skyrius „Integracija kaip subproject“).
- **Kas įgyvendinta (duomenys, i18n, testai):** [docs/development/CODEBASE_WHAT_IS_DONE.md](development/CODEBASE_WHAT_IS_DONE.md).

---

## 5. Konteksto taupymas

- Pirmiausia krauk tik šį failą arba DOCUMENTATION_INDEX §1.
- Pilną aktyvių dokumentų sąrašą krauk tik kai užduotis liečia konkretų modulį/agentą.
- Archyvuoti dokumentai: `docs/archive/` – tik istorinei informacijai (lokaliai, ne repo).
