# Lean dokumentacijos branduolys (agentams)

> **Tikslas:** Minimalus dokumentų rinkinys – pakanka ~90% užduočių. Visa kita – krauk tik kai užduotis liečia konkretų modulį/analizę; žr. `docs/DOCUMENTATION_INDEX.md` arba `docs/archive/README.md` (lokaliai, jei turite archyvą).  
> **Atnaujinta:** 2026-03-11

---

## 1. Pirmiausia naudok (vienas failas)

| Failas | Kada |
|--------|------|
| **`docs/DOCUMENTATION_QUICK_REF.md`** | SOT lentelė + agentų routeris + kritiniai keliai – pradėk čia. |

---

## 2. Lean core (pakanka daugumai užduočių)

### SOT ir duomenys
| Failas | Paskirtis |
|--------|-----------|
| `turinio_pletra.md` | Turinys M1–3 |
| `docs/turinio_pletra_moduliai_4_5_6.md` | Turinys M4–6 |
| `docs/CONTENT_MODULIU_ATPAZINIMAS.md` | Modulių/skaidrių numeracija (4.1 = Modulio 4, ne 6) |
| `docs/development/GOLDEN_STANDARD.md` | Dizainas, skaidrių išdėstymas, content-block |
| `src/data/modules.json`, `glossary.json`, `promptLibrary.json`, `tools.json` | Full redagavimo SOT |
| `src/data/modules-m1-m6.json`, `glossary-m1-m6.json`, `tools-m1-m6.json` | Core `1–6` build/runtime profilis (`VITE_MVP_MODE=1`) |
| `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md` | Atsiliepimai |
| `docs/development/TEST_REPORT.md` | Klaidos ir sprendimai |
| `docs/development/CODEBASE_WHAT_IS_DONE.md` | Kas įgyvendinta – duomenys, i18n, testai, backlog (gilus apžvalga) |

### Procesas ir agentai
| Failas | Paskirtis |
|--------|-----------|
| `docs/development/AGENT_ORCHESTRATOR.md` | Routeris, pipeline, kokybės vartai |
| `docs/development/PLAN_AGENTAI_DARBAI.md` | Kas, seka, MUST/SHOULD (Modulis 4) |
| `docs/development/CONTENT_AGENT.md` | Turinys, CTA, kopija |
| `docs/development/PAPRASTOS_KALBOS_GAIRES.md` | Paprasta kalba, žargonas |
| `docs/development/CURRICULUM_AGENT.md` | Pedagogika, Bloom, santraukos |
| `docs/development/SCHEME_AGENT.md` | Schemos, diagramos |
| `docs/development/UI_UX_AGENT.md` | UI/UX, a11y |
| `docs/development/USER_JOURNEY_AGENT.md` | Vartotojo kelionė |
| `docs/development/AGENT_VERIFICATION_NE_MELUOTI.md` | Verifikacija, „padaryta“ vs tikrovė |
| `docs/development/LENTELIU_STANDARTAS.md` | Lentelių standartas |
| `docs/development/RELEASE_QA_CHECKLIST.md` | Prieš release (a11y, lietuviškos raidės) |

### Skaidrių eilė ir tobulinimai (M4)
| Failas | Paskirtis |
|--------|-----------|
| `docs/MODULIO_4_SKAIDRIU_EILES.md` | Oficiali M4 skaidrių eilė |
| `docs/MODULIO_4_TOBULINIMAI_GERIAUSIOS_PRAKTIKOS.md` | MUST/SHOULD prioritetai |
| `docs/PEDAGOGINE_ANALIZE_MODULIAI_4_5_6.md` | Pedagoginė analizė |
| `docs/SKAIDRIU_TIPU_ANALIZE.md` | Skaidrių tipai |

---

## 3. Visa kita – pagal poreikį

- **Moduliai 10–12, 13–15:** turinio SOT `docs/turinio_pletra_moduliai_10_11_12.md`, `docs/turinio_pletra_moduliai_13_14_15.md`; skaidrių eilės `docs/MODULIO_10_SKAIDRIU_EILES.md`, `docs/MODULIO_13_SKAIDRIU_EILES.md`.
- **Modulio analizės, User Journey, kalbos/UI auditai:** `docs/archive/development/` (lokaliai, ne repo) – žr. `docs/archive/README.md`. **Santraukos skaidrės (5 blokai):** `docs/development/SUMMARY_SLIDE_SPEC.md`; EN/Mobile detalės – lokaliai archyve.
- **Pilnas aktyvių dokumentų sąrašas:** `docs/DOCUMENTATION_INDEX.md` §2–4.
- **Konteksto inžinerija:** `docs/development/context-engineering/` (sot_index, context_budget) – tik kai užduotis apie modulių registrą.

**Agentams:** Jei užduotis nes liečia konkretų modulio analizės dokumentą – pirmiausia lean core (šis failas + QUICK_REF); kitus dokumentus atidaryk tik tada, kai reikia.
