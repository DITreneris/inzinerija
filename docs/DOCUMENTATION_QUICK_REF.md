# Dokumentacijos greita nuoroda (agentams)

> **Tikslas:** Mažas kontekstas – SOT ir kritiniai keliai. **Lean branduolys:** `docs/LEAN_INDEX.md`. Pilnas sąrašas: `docs/DOCUMENTATION_INDEX.md`.  
> **Atnaujinta:** 2026-06-30 (tier 9 production build, memo 05)

---

## 1. Source of Truth (SOT)

| Sritis                                                             | Failas                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Turinys M1–3                                                       | `turinio_pletra.md`                                                                                                                                                                                                                                                                                                              |
| Turinys M4–6                                                       | `docs/turinio_pletra_moduliai_4_5_6.md`                                                                                                                                                                                                                                                                                          |
| Turinys M7–9                                                       | `docs/turinio_pletra_moduliai_7_8_9.md`                                                                                                                                                                                                                                                                                          |
| Turinys M10–12                                                     | `docs/turinio_pletra_moduliai_10_11_12.md`; M10 seka – `docs/MODULIO_10_SKAIDRIU_EILES.md`                                                                                                                                                                                                                                       |
| Modulių/skaidrių numeracija                                        | `docs/CONTENT_MODULIU_ATPAZINIMAS.md`                                                                                                                                                                                                                                                                                            |
| Dizainas (šriftai, skaidrės)                                       | `docs/development/GOLDEN_STANDARD.md`                                                                                                                                                                                                                                                                                            |
| Techninė atspirties būsena (architektūra, komponentai, testai, CI) | `docs/development/GOLD_LEGACY_STANDARD.md`                                                                                                                                                                                                                                                                                       |
| Duomenys                                                           | Full SOT: `modules.json`, `glossary.json`, `tools.json`. Build profiliai: `*-m1-m6.json` (MVP/demo), `*-m1-m9.json` (**production** `build:production`). EN overlay: `modules-en.json`, `modules-en-m4-m6.json`, `modules-en-m7-m9.json`, `modules-en-m10-m12.json`. Žr. `docs/development/DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md`. |
| Ekosistema (M1–12 touchpoints, URL, analytics)                     | `docs/ECOSYSTEM_MAP.md`, `docs/development/BLOG_CURRICULUM_LINKS.yaml`, `src/constants/ecosystemUrls.ts`; agent spine: `AGENTS.md` §Ecosystem, `sot_index.json` → `ecosystem`                                                                                                                                                    |
| Atsiliepimai / klaidos                                             | `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md`, `docs/development/TEST_REPORT.md`                                                                                                                                                                                                                                                      |

**Konfliktas:** 1) Turinio SOT → 2) JSON sinchronas → 3) UI.

**Architektūra A:** `src/data/modules.json` lieka full `1–15` redagavimo SOT. Build profiliai: `*-m1-m6.json` (`VITE_MVP_MODE=1`, demo) ir `*-m1-m9.json` (**production** `npm run build:production`). Marketing memo tier 9: [`05_marketingo_memo_tier9_vienas_build.md`](../05_marketingo_memo_tier9_vienas_build.md).

---

## 2. Agentai ir kur žiūrėti

**Agentų registras (EN, vienas grep):** `AGENTS.md` (repo šaknyje) – rolės, trigeriai, pipeline, handoff, subagentai. Skills: `.cursor/skills/<agentas>/SKILL.md`.

| Veikla                               | Agentas            | Dokumentas                                                                         |
| ------------------------------------ | ------------------ | ---------------------------------------------------------------------------------- |
| Turinys, CTA, kopija                 | CONTENT_AGENT      | `docs/development/CONTENT_AGENT.md`, `docs/development/PAPRASTOS_KALBOS_GAIRES.md` |
| Pedagogika, Bloom, santraukos        | CURRICULUM_AGENT   | `docs/development/CURRICULUM_AGENT.md`                                             |
| Schemos, diagramos                   | SCHEME_AGENT       | `docs/development/SCHEME_AGENT.md`                                                 |
| JSON, duomenys                       | DATA_AGENT         | `src/data/*`                                                                       |
| UI/UX, layout, a11y                  | UI_UX_AGENT        | `docs/development/UI_UX_AGENT.md`, GOLDEN_STANDARD                                 |
| Kokybė, diagnozė                     | CODE_REVIEW_AGENT  | —                                                                                  |
| Vartotojo kelionė                    | USER_JOURNEY_AGENT | `docs/development/USER_JOURNEY_AGENT.md`                                           |
| Routeris, pipeline                   | —                  | `docs/development/AGENT_ORCHESTRATOR.md`                                           |
| Definition of Done (kada „padaryta“) | visi               | `docs/development/dod_01.md`; skills – `.cursor/skills/README.md`                  |

---

## 3. Lean ir pilnas sąrašas

- **Lean branduolys (pakanka daugumai):** `docs/LEAN_INDEX.md`
- **Pilnas aktyvių sąrašas:** `docs/DOCUMENTATION_INDEX.md` §2–4
- **Archyvas (modulio analizės, ataskaitos):** `docs/archive/` – tik lokaliai (ne commitinama, .gitignore); jei naudojate lokaliai – žr. `docs/archive/README.md`.

---

## 4. Išoriniams integratoriams

- **Šis repo** = mokymo turinio ir UI šaltinis; **production** = [promptanatomy.app](https://promptanatomy.app/); auth, Stripe, DB – **marketingo repo**.
- **Integracija kaip subproject (monorepo):** [docs/deployment/INTEGRATION_OVERVIEW.md](deployment/INTEGRATION_OVERVIEW.md).
- **Marketing handoff (MON-\*):** [docs/deployment/MARKETING_HANDOFF_CHECKLIST.md](deployment/MARKETING_HANDOFF_CHECKLIST.md).
- **Tier 9 / vienas production build:** [05_marketingo_memo_tier9_vienas_build.md](../05_marketingo_memo_tier9_vienas_build.md).
- **Production audit (2026-06):** [docs/development/AUDIT_2026-06_SUMMARY.md](development/AUDIT_2026-06_SUMMARY.md); prioritetai → [TODO.md](../TODO.md) §1.1.
- **Deploy, env, base path:** [docs/deployment/DEPLOYMENT.md](deployment/DEPLOYMENT.md) (Production + skyrius „Integracija kaip subproject“).
- **Kas įgyvendinta (duomenys, i18n, testai):** [docs/development/CODEBASE_WHAT_IS_DONE.md](development/CODEBASE_WHAT_IS_DONE.md).

---

## 5. Konteksto taupymas

- Pirmiausia krauk tik šį failą arba DOCUMENTATION_INDEX §1.
- Pilną aktyvių dokumentų sąrašą krauk tik kai užduotis liečia konkretų modulį/agentą.
- Archyvuoti dokumentai: `docs/archive/` – tik istorinei informacijai (lokaliai, ne repo).
