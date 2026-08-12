# TODO – Promptų anatomija

**Nuosavybė:** šis repo = **turinys, pedagogika, UI/UX mokymosi patirtyje**, duomenų/authoring kokybė. Marketingas / monetizacija / PostHog / CRO → kitas repo ([`docs/deployment/`](docs/deployment/) handoff).  
**Tikslas:** Open P0/P1 prioritetai (Docs Lean). Done istorija → [`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md) · [`2026-07-31`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-31.md) · [`2026-07-28`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md). SOT indeksas: `docs/DOCUMENTATION_QUICK_REF.md`.  
**Legenda:** **P0 = mokymosi kokybės blokoriai**, P1 = turinio/authoring kokybė + corporate cut, P2 = polish. MON ≠ P0. **Atnaujinta:** 2026-08-12 (Docs Lean · M10–12 content freeze · CATALOG-HOME ✅ · Unreleased post-v1.6.1).

**Dabartinis fokusas (šiame repo):** learning P0/P1 **uždaryti**; open = **TOOL-5** (P2 infra) · marketing cutover / MON **out of scope** (§1.4) · Wave D3 corporate18 Deferred (§1.5). Ladder: [`ROADMAP.md`](ROADMAP.md). Pin: marketing corporate12 = **v1.6.1** (never amend). Automated: **165/1005**.

**Produktiniai sprendimai (santrauka):** gylis > Density CI; M79/M1315 ROI ✅; UJ-MUST ✅; M16–18 authoring+TE+plain ✅; M13 plain+TRIM ✅; M10–12 UI deep + turinio deep ✅ (**freeze**, hygiene 71); katalogas owns next-step; Home retrieval = antrinis.

**Learning / corporate vartai (šiame repo):**

- **Open P0:** nėra.
- **Open P1:** nėra (learning). `CATALOG-HOME` ✅ 2026-08-12 → archive. D3 corporate18 Deferred §1.5.
- **Open P2:** `TOOL-5` §1.7 — React Hooks v7 React Compiler taisyklių sprendimas.
- **Caveats:** §1.6 — A/C1 ✅ · B1/B2 marketing · C2/D parked.

---

## 1. Aktualus pipeline (open only)

> **Taisyklės:** [`DOCS_MAINTENANCE.md`](docs/development/DOCS_MAINTENANCE.md) §1c — §1 tik open; done → archive.

### §1.1 P0 – Mokymosi kokybės blokoriai

Open P0: **nėra.**

### §1.2 P1 – Learning / corporate (closed → archive)

Horizon B/C corporate cuts, M1012-DEEP, LANG-SOT, UJ-MUST, M16–18 F/TE/R/plain, M13 plain+TRIM, M10–12 content audit, katalogas UX, SCHEME-CENTRAL W1, CATALOG-HOME — **[`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md)**.

M10–12 turinio ROI: **FREEZE** (baseline 71; nevaryti į 0).

### §1.4 Out of scope – marketing handoff

> Ne default agentų P0. Vykdymas / env / KPI → marketing repo. Runbook: [`MON_P0_EXECUTION_PLAN.md`](docs/deployment/MON_P0_EXECUTION_PLAN.md).  
> **Horizon B cutover:** pin **v1.6.1** + `build:corporate12` — [`06_marketingo_memo_corporate12_supabase.md`](06_marketingo_memo_corporate12_supabase.md). Training HEAD may advance (Unreleased / 1.6.2); **cutover pin stays v1.6.1** unless marketing re-pins.

| ID        | Užduotis                                                                | Status | Pastaba                                                                                      |
| --------- | ----------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------- |
| **MON-1** | Prod env: nėra `VITE_MAX_ACCESSIBLE_MODULE=6`; `VITE_VERIFY_ACCESS_URL` | [ ]    | Marketing Vercel · CAV-B1                                                                    |
| **MON-2** | Submodule pin **v1.6.1** + corporate12 deploy                           | ⏳     | Learning pin **v1.4.9**; Horizon B pin target **v1.6.1**. Execute in marketing repo · CAV-B1 |
| **MON-3** | Verify-access smoke (magic link → tier)                                 | ⏳     | Browser ⏳; po cutover — tier **12** / **15** (tier **18** = CAV-C2)                         |
| **MON-4** | PostHog/GA4 production + funnel dashboard                               | [ ]    | [`MON-4_POSTHOG_DEPLOY.md`](docs/deployment/MON-4_POSTHOG_DEPLOY.md) · CAV-B2                |
| **MON-5** | Gate regression browser (tier 0 → AccessGate)                           | ⏳     | Auto ✅; browser ⏳                                                                          |
| **MON-7** | Baseline KPI po MON-4 (2–4 sav.)                                        | [ ]    | Marketing                                                                                    |
| **MON-8** | Marketing prod: `build:production` M1–9 env                             | ⏳     | Vercel env; optional cutover → `build:corporate12` / `corporate15`                           |
| CRO       | Landing positioning / Hero CTA / trust / Pricing eilė                   | [ ]    | Marketing                                                                                    |

MON-6 ✅ – žr. archive / CHANGELOG.

### §1.5 Deferred

- M10–15 marketing monetizacija – marketing repo (tier 12/15 cutover = §1.4).
- **Horizon D Wave D3 / CAV-C2:** corporate18 — po pricing call. Intake [`docs/development/intake/M16_M18_CORPORATE18_INTAKE.md`](docs/development/intake/M16_M18_CORPORATE18_INTAKE.md).
- M19–21 **DI politikos inžinerija** – Deferred (nėra SOT).
- M7 optional viz sk. 100–106 lieka M7 (≠ M16–18).
- **CAV-D1 Progress / org memory:** localStorage sandbox; revisit after MON-4.
- **M18-PLAIN-C** optional dens soft — deferred.
- Formalus Density DoD / CI — **ne**.

### §1.6 Caveats Closure Program

| ID         | Item                                     | Owner               | Status                                                     |
| ---------- | ---------------------------------------- | ------------------- | ---------------------------------------------------------- |
| **CAV-A1** | EN automated audits + RELEASE_QA §5c log | QA                  | [x]                                                        |
| **CAV-A2** | Mobile @375 owner residual               | QA / owner          | [x]                                                        |
| **CAV-A3** | PDF LT glyphs / links pre-release        | QA                  | [x] automated; owner open-PDF visual still recommended §5d |
| **CAV-B1** | Magic link cutover                       | Marketing           | [ ] pin **v1.6.1**; execute in marketing repo              |
| **CAV-B2** | PostHog MON-4                            | Marketing           | [ ]                                                        |
| **CAV-C1** | M1618 path handout                       | CONTENT→DATA→CODING | [x]                                                        |
| **CAV-C2** | corporate18 + tier 18                    | Product + stack     | won’t-now until pricing call                               |
| **CAV-D1** | Progress lite / org memory               | Product             | deferred after B                                           |

### §1.7 P2 – Toolchain (open only)

| ID         | Užduotis                                                                  | Status | Pastaba                                                                                        |
| ---------- | ------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------- |
| **TOOL-5** | Sprendimas: ar įjungti 14 naujų `react-hooks` v7 React Compiler taisyklių | [ ]    | Politikos klausimas. TOOL-0/1/2/4 ✅ → archive 2026-08. Vite 8 / React 19 / Tailwind 4 = defer |

---

## 2. Padaryta (santrauka)

Pilnos lentelės: [`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md) · [`2026-07-31`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-31.md) · [`2026-07-28`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md). Metrika: [`CODEBASE_WHAT_IS_DONE.md`](docs/development/CODEBASE_WHAT_IS_DONE.md).

- M1–9 production · M10–15 corporate cuts · M16–18 authoring+TE+plain · UJ-MUST · M79/M1315 ROI ✅
- M1012-DEEP + M1012 content audit (freeze) · LANG-SOT · katalogas UX · CATALOG-HOME · SCHEME-CENTRAL W1 ✅
- Release **1.6.1** = corporate12 pin target; Unreleased = post-pin training HEAD

---

## 3. Nuorodos

| Kas                   | Kur                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| Production ladder     | [`ROADMAP.md`](ROADMAP.md)                                                                        |
| Klaidos / release QA  | `docs/development/TEST_REPORT.md`, `RELEASE_QA_CHECKLIST.md`                                      |
| M10–12 content freeze | [`M10_M12_CONTENT_DEEP_AUDIT_2026-08.md`](docs/development/M10_M12_CONTENT_DEEP_AUDIT_2026-08.md) |
| Marketing handoff     | `docs/deployment/MON_P0_EXECUTION_PLAN.md`                                                        |
| Docs lean             | `docs/development/DOCS_MAINTENANCE.md` §1c                                                        |
| Agent start           | `docs/DOCUMENTATION_QUICK_REF.md`                                                                 |
| Done snapshot         | [`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md)           |
