# TODO – Promptų anatomija

**Nuosavybė:** šis repo = **turinys, pedagogika, UI/UX mokymosi patirtyje**, duomenų/authoring kokybė. Marketingas / monetizacija / PostHog / CRO → kitas repo ([`docs/deployment/`](docs/deployment/) handoff).  
**Tikslas:** Open P0/P1 prioritetai (Docs Lean). Done istorija → [`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md) · [`2026-07-31`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-31.md) · [`2026-07-28`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md). SOT indeksas: `docs/DOCUMENTATION_QUICK_REF.md`.  
**Legenda:** **P0 = mokymosi kokybės blokoriai**, P1 = turinio/authoring kokybė + corporate cut, P2 = polish. MON ≠ P0. **Atnaujinta:** 2026-08-13 (M10 testerio Must T01–T08 + T09 + hygiene liekana **41** ✅ · parent pin **v1.6.2** · live `/anatomy/` verify ⏳).

**Dabartinis fokusas (šiame repo):** M10 testerio **Must** T01–T08 + T09 + hygiene closeout ✅. Learning P0/P1 **uždaryti**. Open residual (ne P0/P1): T01 I5 parked · Should 2-as pass tik po savininko · M11–M12 laukiama. Infra: TOOL-5 (§1.7) · MON **out of scope** (§1.4) · D3 Deferred (§1.5). Ladder: [`ROADMAP.md`](ROADMAP.md). Pin: GitHub `promptanatomy` = **v1.6.2** / `c35a1f5` (PR #92). Live `/anatomy/` ⏳. Automated: **165/1005**.

**Produktiniai sprendimai (santrauka):** gylis > Density CI; M79/M1315 ROI ✅; UJ-MUST ✅; M16–18 authoring+TE+plain ✅; M13 plain+TRIM ✅; M10–12 UI deep + turinio deep ✅ (**freeze gyvam turiniui**, hygiene liekana **41**; nevaryti į 0); katalogas owns next-step; Home retrieval = antrinis.

**Learning / corporate vartai (šiame repo):**

- **Open P0:** nėra.
- **Open P1:** nėra (learning). `CATALOG-HOME` ✅ 2026-08-12 → archive. D3 corporate18 Deferred §1.5.
- **Open intake (ne P0/P1):** T01 I5 (10.45 dual-picker demote) tik jei savininko re-walk vis dar painus; T01–T08 Should 2-as pass tik po „tvarkom“; M11–M12 testerio eilutės — atskirai.
- **Open P2:** `TOOL-5` §1.7 — React Hooks v7 React Compiler taisyklių sprendimas.
- **Caveats:** §1.6 — A/C1 ✅ · B1/B2 marketing · C2/D parked.

---

## 1. Aktualus pipeline (open only)

> **Taisyklės:** [`DOCS_MAINTENANCE.md`](docs/development/DOCS_MAINTENANCE.md) §1c — §1 tik open; done → archive.

### §1.1 P0 – Mokymosi kokybės blokoriai

Open P0: **nėra.**

### §1.2 P1 – Learning / corporate (closed → archive)

Horizon B/C corporate cuts, M1012-DEEP, LANG-SOT, UJ-MUST, M16–18 F/TE/R/plain, M13 plain+TRIM, M10–12 content audit, katalogas UX, SCHEME-CENTRAL W1, CATALOG-HOME — **[`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md)**.

M10–12 turinio ROI: **FREEZE** gyvam turiniui (priimta liekana **41**; nevaryti į 0). Testerio Must T01–T08 + T09 + hygiene closeout ✅ → [`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md). Liekana — §1.3.

### §1.3 M10–12 testerio intake (Must shipped; liekana)

> Phase B **Must** T01–T08 + **T09** (`10.65`/`10.655`) + hygiene closeout ✅. Gyvas turinys **FREEZE** (liekana **41**; nevaryti į 0). Pin **v1.6.2**. Intake žurnalas vis dar priima **naujas** pastabas (M11–M12).

| ID          | Užduotis                                       | Status   | Pastaba                                                                                      |
| ----------- | ---------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| **T01 I5**  | 10.45 dual-picker demote (pill’ai → legenda)   | parked   | Tik jei savininko re-walk vis dar painus. Dual picker **lieka** kol tada.                    |
| **Should**  | T01–T08 2-as pass (legenda, oras, `max-w-5xl`) | [ ]      | Ne P0. Tik po savininko „tvarkom“. Won’t = rainbow / enlarge / Cursor šaka / naujas Pattern. |
| **M11–M12** | Testerio eilutės                               | laukiama | RAW dar nėra. Neliečiam JSON, kol nėra pastabų + triažo.                                     |

### §1.4 Out of scope – marketing handoff

> Ne default agentų P0. Vykdymas / env / KPI → marketing repo. Runbook: [`MON_P0_EXECUTION_PLAN.md`](docs/deployment/MON_P0_EXECUTION_PLAN.md).  
> **Horizon B:** GitHub pin **v1.6.2** (`c35a1f5`, [PR #92](https://github.com/DITreneris/promptanatomy/pull/92)) + parent `build:corporate12`. Live `https://www.promptanatomy.app/anatomy/` dar nepatvirtinta kaip 1.6.2 (Home vis dar importuoja `RetrievalDueCard`). Training HEAD may advance; **pin stays v1.6.2** unless marketing re-pins.

| ID        | Užduotis                                                                | Status | Pastaba                                                                                               |
| --------- | ----------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| **MON-1** | Prod env: nėra `VITE_MAX_ACCESSIBLE_MODULE=6`; `VITE_VERIFY_ACCESS_URL` | [ ]    | Marketing Vercel · CAV-B1                                                                             |
| **MON-2** | Submodule pin **v1.6.2** + corporate12 deploy                           | ⏳     | GitHub pin ✅ PR #92 `c35a1f5`. Live `/anatomy/` ⏳ (Home vis dar `RetrievalDueCard` = 1.6.1). CAV-B1 |
| **MON-3** | Verify-access smoke (magic link → tier)                                 | ⏳     | Browser ⏳; po cutover — tier **12** / **15** (tier **18** = CAV-C2)                                  |
| **MON-4** | PostHog/GA4 production + funnel dashboard                               | [ ]    | [`MON-4_POSTHOG_DEPLOY.md`](docs/deployment/MON-4_POSTHOG_DEPLOY.md) · CAV-B2                         |
| **MON-5** | Gate regression browser (tier 0 → AccessGate)                           | ⏳     | Auto ✅; browser ⏳                                                                                   |
| **MON-7** | Baseline KPI po MON-4 (2–4 sav.)                                        | [ ]    | Marketing                                                                                             |
| **MON-8** | Marketing prod: `build:production` M1–9 env                             | ⏳     | Vercel env; optional cutover → `build:corporate12` / `corporate15`                                    |
| CRO       | Landing positioning / Hero CTA / trust / Pricing eilė                   | [ ]    | Marketing                                                                                             |

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
| **CAV-B1** | Magic link cutover                       | Marketing           | GitHub pin ✅ **v1.6.2**; live `/anatomy/` verify ⏳       |
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
- M1012-DEEP + M1012 content audit (freeze, hygiene **41**) · LANG-SOT · katalogas UX · CATALOG-HOME · SCHEME-CENTRAL W1 ✅
- M10 testerio Must T01–T08 + T09 split + hygiene closeout ✅ 2026-08-13 (I5 / Should / M11–M12 — §1.3)
- Release **1.6.2** = corporate12 pin (GitHub `promptanatomy` PR #92). Do not retag 1.6.1. Live prod verify ⏳. Training HEAD Unreleased ≠ automatinis re-pin.

---

## 3. Nuorodos

| Kas                    | Kur                                                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Production ladder      | [`ROADMAP.md`](ROADMAP.md)                                                                                                            |
| Klaidos / release QA   | `docs/development/TEST_REPORT.md`, `RELEASE_QA_CHECKLIST.md`                                                                          |
| M10–12 content freeze  | [`M10_M12_CONTENT_DEEP_AUDIT_2026-08.md`](docs/development/M10_M12_CONTENT_DEEP_AUDIT_2026-08.md)                                     |
| M10–12 testerio intake | [`M10_M12_TESTER_INTAKE_2026-08.md`](docs/development/intake/M10_M12_TESTER_INTAKE_2026-08.md) · Must shipped; OPEN naujoms pastaboms |
| Marketing handoff      | `docs/deployment/MON_P0_EXECUTION_PLAN.md`                                                                                            |
| Docs lean              | `docs/development/DOCS_MAINTENANCE.md` §1c                                                                                            |
| Agent start            | `docs/DOCUMENTATION_QUICK_REF.md`                                                                                                     |
| Done snapshot          | [`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md)                                               |
