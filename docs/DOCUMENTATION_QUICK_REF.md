# Dokumentacijos greita nuoroda (agentams)

> **Tikslas:** Mažas kontekstas – SOT ir kritiniai keliai. **Lean:** `docs/LEAN_INDEX.md` (≤25). Pilnas: `docs/DOCUMENTATION_INDEX.md`.  
> **Atnaujinta:** 2026-07-24 (Docs Lean). Archyvas = ne SOT. Taisyklės: `DOCS_MAINTENANCE.md` §1c.

---

## 1. Source of Truth (SOT)

| Sritis                | Failas                                                                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Turinys M1–3          | `turinio_pletra.md`                                                                                                                                                             |
| Turinys M4–6          | `docs/turinio_pletra_moduliai_4_5_6.md`                                                                                                                                         |
| Turinys M7–9          | `docs/turinio_pletra_moduliai_7_8_9.md`                                                                                                                                         |
| Turinys M10–12        | `docs/turinio_pletra_moduliai_10_11_12.md` (+ eilė `MODULIO_10_SKAIDRIU_EILES.md` pagal poreikį)                                                                                |
| Turinys M13–15        | `docs/turinio_pletra_moduliai_13_14_15.md` (authoring)                                                                                                                          |
| Numeracija            | `docs/CONTENT_MODULIU_ATPAZINIMAS.md`                                                                                                                                           |
| Dizainas / ritmas     | `docs/development/GOLDEN_STANDARD.md` (§3.8)                                                                                                                                    |
| Mokymo elementai      | `docs/development/TEACHING_ELEMENTS_REGISTRY.md` + overlay; `npm run audit:teaching-elements`                                                                                   |
| Interaktyvumo auditai | `npm run audit:slide-interactivity` · `audit:embed-catalog` (ritmas = GOLDEN §3.8; istorinis UX planas – archive po DL-3)                                                       |
| Kas įgyvendinta       | `docs/development/CODEBASE_WHAT_IS_DONE.md` (ne GOLD_LEGACY)                                                                                                                    |
| Duomenys              | Full: `modules.json`, `glossary.json`, `tools.json`. Production: `*-m1-m9.json`. MVP: `*-m1-m6.json`. EN overlays `modules-en*.json`. Žr. `DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md` |
| M4 news-portal        | `NEWS_PORTAL_SLIDE_53_5.md`, `PORTAL_BEAT_DIAGRAMS.md`                                                                                                                          |
| M7–9 polish ops       | `M79_PATCH_REGISTRY.md` + `DOCS_MAINTENANCE.md` (backlog – ne pirmas load)                                                                                                      |
| Klaidos               | `docs/development/TEST_REPORT.md`                                                                                                                                               |
| Open prioritetai      | `TODO.md` §1 · `ROADMAP.md` open gaps                                                                                                                                           |

**Konfliktas:** Turinio SOT → JSON → UI.

**Release vartai:** `npm run audit:release-preflight` · M10–12 `audit:m1012` · M13–15 `audit:m1315`.

---

## 2. Agentai

**Registras:** `AGENTS.md`. Skills: `.cursor/skills/<agentas>/SKILL.md`.

| Veikla         | Agentas      | Dokumentas                                       |
| -------------- | ------------ | ------------------------------------------------ |
| Turinys / CTA  | CONTENT      | `CONTENT_AGENT.md`, `PAPRASTOS_KALBOS_GAIRES.md` |
| Pedagogika     | CURRICULUM   | `CURRICULUM_AGENT.md`                            |
| Schemos        | SCHEME       | `SCHEME_AGENT.md`, TE registry                   |
| JSON           | DATA         | `DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md`            |
| UI/UX          | UI_UX        | `UI_UX_AGENT.md`, GOLDEN                         |
| Docs / release | QA           | `DOCS_MAINTENANCE.md`, `DOCS_SYNC_CHECKLIST.md`  |
| Kelionė        | USER_JOURNEY | `USER_JOURNEY_AGENT.md`                          |
| Router         | ORCHESTRATOR | `AGENT_ORCHESTRATOR.md`                          |
| DoD            | visi         | `dod_01.md`                                      |

---

## 3. Lean / katalogas / archyvas

- Lean (≤25): `LEAN_INDEX.md`
- Pilnas aktyvių: `DOCUMENTATION_INDEX.md` §2–4
- Archyvas (ne SOT): `docs/archive/` – Done TODO snapshot, frozen PLAN/AUDIT

---

## 4. Išoriniams integratoriams

- Integracija: `docs/deployment/INTEGRATION_OVERVIEW.md`
- Marketing handoff / MON: `MARKETING_HANDOFF_CHECKLIST.md`, `MON_P0_EXECUTION_PLAN.md`
- PostHog: `MON-4_POSTHOG_DEPLOY.md`
- Deploy: `DEPLOYMENT.md`
- Metrikos: `CODEBASE_WHAT_IS_DONE.md`

---

## 5. Konteksto taupymas

1. Šis failas arba LEAN_INDEX.
2. `TODO.md` / `ROADMAP.md` – tik **open** §1 / gaps.
3. Archyvas – tik kai explicit istorija.
