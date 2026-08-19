# Lean dokumentacijos branduolys (agentams)

> **Atnaujinta:** 2026-08-19 (live pin **v1.6.3** · ROADMAP **v4.38** · hygiene **39**)  
> **Tikslas:** ≤25 keliai ~90% užduočių. Analizės / PLAN snapshot / backlog – ne čia. Žr. `DOCUMENTATION_QUICK_REF.md` (startas) · `DOCUMENTATION_INDEX.md` (katalogas) · `DOCS_MAINTENANCE.md` §1c.  
> **Open P1 (learning):** nėra. Late stack (ne P1) = T01 I5 parked · Should 2-as pass. Infra = TOOL-5. Out of scope = MON §1.4 + D3 Deferred §1.5. Horizon B / 12 live — uždaryta (pin **v1.6.3**).

---

## 1. Pirmiausia

| Failas                                | Kada                                       |
| ------------------------------------- | ------------------------------------------ |
| **`docs/DOCUMENTATION_QUICK_REF.md`** | SOT lentelė + agentų routeris – pradėk čia |

---

## 2. Lean core (≤25)

### SOT ir duomenys

| Failas                                                    | Paskirtis                                                    |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| `turinio_pletra.md`                                       | Turinys M1–3                                                 |
| `docs/turinio_pletra_moduliai_4_5_6.md`                   | Turinys M4–6                                                 |
| `docs/turinio_pletra_moduliai_7_8_9.md`                   | Turinys M7–9 (production tier 9)                             |
| `docs/turinio_pletra_moduliai_10_11_12.md`                | Turinys M10–12 (corporate12 + authoring)                     |
| `docs/turinio_pletra_moduliai_13_14_15.md`                | Turinys M13–15 (corporate15 + authoring)                     |
| `docs/CONTENT_MODULIU_ATPAZINIMAS.md`                     | Modulių/skaidrių numeracija                                  |
| `docs/development/GOLDEN_STANDARD.md`                     | Dizainas, content-block, §3.8 ritmas                         |
| `docs/development/TEACHING_ELEMENTS_REGISTRY.md`          | Master mokymo elementai (+ `teaching-elements-overlay.json`) |
| `docs/development/CODEBASE_WHAT_IS_DONE.md`               | Kas įgyvendinta (metrikos, architektūra)                     |
| `docs/development/DOCS_MAINTENANCE.md`                    | Dual SOT, Feature Doc, Docs Lean §1c                         |
| `docs/development/DOCS_SYNC_CHECKLIST.md`                 | Docs sync po sprinto                                         |
| `docs/development/TEST_REPORT.md`                         | Klaidos / QA žurnalas                                        |
| `docs/development/RELEASE_QA_CHECKLIST.md`                | Prieš release                                                |
| `src/data/modules.json` (+ `glossary.json`, `tools.json`) | Full authoring SOT                                           |
| `src/data/modules-m1-m9.json` (+ glossary/tools m1-m9)    | M1–9 fallback profilis (ne gyvas kanonas)                    |
| `src/data/modules-m1-m6.json` (+ glossary/tools m1-m6)    | MVP/demo profilis                                            |
| `src/data/modules-m1-m12.json`, `modules-m1-m15.json`     | Corporate12 / corporate15 profiliai                          |

### Procesas ir agentai

| Failas                                                 | Paskirtis                                                                   |
| ------------------------------------------------------ | --------------------------------------------------------------------------- |
| `docs/development/AGENT_ORCHESTRATOR.md`               | Routeris, pipeline                                                          |
| `docs/development/CONTENT_AGENT.md`                    | Turinys, CTA                                                                |
| `docs/development/PAPRASTOS_KALBOS_GAIRES.md`          | Paprasta kalba                                                              |
| `docs/development/CURRICULUM_AGENT.md`                 | Pedagogika                                                                  |
| `docs/development/SCHEME_AGENT.md`                     | Schemos / diagramos                                                         |
| `docs/development/DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md` | JSON / overlay                                                              |
| `docs/development/UI_UX_AGENT.md`                      | UI/UX, a11y                                                                 |
| `AGENTS.md`                                            | Agentų žemėlapis                                                            |
| `TODO.md` §1                                           | Learning P0/P1 nėra; late stack §1.3a/b; MON §1.4 out of scope; D3 Deferred |
| `ROADMAP.md`                                           | Open gaps + turinio plėtra                                                  |

---

## 3. Pagal poreikį (ne lean core)

- **M13–15 SOT / eilės / schemų auditas:** `turinio_pletra_moduliai_13_14_15.md`, `MODULIO_13_SKAIDRIU_EILES.md`, `M13_M15_SCHEME_AUDIT.md`
- **M16–18 SOT / eilė / TE:** `turinio_pletra_moduliai_16_17_18.md`, `MODULIO_16_SKAIDRIU_EILES.md`, `TODO.md` §1.2g, `16_17_18_backlog.md`
- **Skaidrių eilės:** `MODULIO_*_SKAIDRIU_EILES.md` – tik kai liečia tą modulį
- **M7–9 polish:** `M79_PATCH_REGISTRY.md`, `07_08_09_backlog.md`, `M7_M9_SCHEME_AUDIT.md` (schemų / interaktyvių ROI)
- **Pedagogika:** `PEDAGOGINES_IZVALGOS_ROADMAP.md`
- **Portal M4/53.5:** `NEWS_PORTAL_SLIDE_53_5.md`, `PORTAL_BEAT_DIAGRAMS.md`
- **PDF:** `PDF_DOWNLOAD_TESTING.md`, `PDF_GENERATION_AGENT_MEMORY.md`
- **Marketing handoff (ne P0):** `docs/deployment/MON_P0_EXECUTION_PLAN.md`
- **Reference (ne SOT):** `PEDAGOGINE_ANALIZE_*`, `SKAIDRIU_TIPU_ANALIZE.md` – INDEX
- **Archyvas:** `docs/archive/` – Done TODO snapshot, frozen PLAN/AUDIT
- **Pilnas katalogas:** `DOCUMENTATION_INDEX.md` §2–4

**Agentams:** pirmiausia QUICK_REF + šis lean core; kitus failus – tik kai užduotis to reikalauja.
