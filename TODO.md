# TODO – Promptų anatomija

**Nuosavybė:** šis repo = **turinys, pedagogika, UI/UX mokymosi patirtyje**, duomenų/authoring kokybė. Marketingas / monetizacija / PostHog / CRO → kitas repo ([`docs/deployment/`](docs/deployment/) handoff).  
**Tikslas:** Open P0/P1 prioritetai (Docs Lean). Done istorija → [`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md) · [`2026-07-31`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-31.md) · [`2026-07-28`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md). SOT indeksas: `docs/DOCUMENTATION_QUICK_REF.md`.  
**Legenda:** **P0 = mokymosi kokybės blokoriai**, P1 = turinio/authoring kokybė + corporate cut, P2 = polish. MON ≠ P0. **Atnaujinta:** 2026-08-19 (kiss + Unreleased gate-green · corp15 slice honesty · hygiene **40** · ROADMAP **v4.36**).

**Dabartinis fokusas (šiame repo):** M10 testerio **Must** T01–T08 + T09 + hygiene closeout ✅. M11/M12 walked, no RAW. **M14 Path Test W1 + chrome** ✅. **M14-ITEMS** ✅. **M15 walk FAIL** shipped. **I2-M13 + craft Banga 1 C-M1–M3** ✅. **M5 polish** ✅. Learning P0/P1 lentelė vis dar tuščia; late stack = craft Could parked (ne P1). Open residual: T01 I5 parked · Should 2-as pass tik po savininko. Infra: TOOL-5 (§1.7) · MON **out of scope** (§1.4) · D3 Deferred (§1.5). Ladder: [`ROADMAP.md`](ROADMAP.md) **v4.36**. Training cut **v1.6.3**. Live pin kol neperpinsi = **v1.6.2** / `c35a1f5` (PR #92). **12 live per Supabase.** Automated: tag **1.6.3** = **171/1056**; HEAD Unreleased = **176/1078**.

**Produktiniai sprendimai (santrauka):** gylis > Density CI; M79/M1315 ROI ✅; UJ-MUST ✅; M16–18 authoring+TE+plain ✅; M13 plain+TRIM ✅; M10–12 UI deep + turinio deep ✅ (**freeze gyvam turiniui**, hygiene liekana **40**; nevaryti į 0); katalogas owns next-step; Home retrieval = antrinis.

**Learning / corporate vartai (šiame repo):**

- **Open P0:** nėra.
- **Open P1:** nėra (learning). `CATALOG-HOME` ✅ 2026-08-12 → archive. D3 corporate18 Deferred §1.5.
- **Open intake (ne P0/P1):** T01 I5 parked; T01–T08 Should 2-as pass tik po „tvarkom“. M11/M12 walked, no RAW. **M13–15** — §1.3a Walk RAW `151–158` ✅ · **M17-ANALOG** ✅. §1.3b C-M1–M3 + C-S1–S4 ✅; Could C-C\* parked. **DATA-FRESH** parked (§1.5) — gerinti etiketes, nelaužyti skaidrių.
- **Open P2:** `TOOL-5` §1.7 — React Hooks v7 React Compiler taisyklių sprendimas.
- **Caveats:** §1.6 — A/C1 ✅ · B1 ✅ · B2 marketing · C2/D parked.

---

## 1. Aktualus pipeline (open only)

> **Taisyklės:** [`DOCS_MAINTENANCE.md`](docs/development/DOCS_MAINTENANCE.md) §1c — §1 tik open; done → archive.

### §1.1 P0 – Mokymosi kokybės blokoriai

Open P0: **nėra.**

### §1.2 P1 – Learning / corporate (closed → archive)

Horizon B/C corporate cuts, M1012-DEEP, LANG-SOT, UJ-MUST, M16–18 F/TE/R/plain, M13 plain+TRIM, M10–12 content audit, katalogas UX, SCHEME-CENTRAL W1, CATALOG-HOME — **[`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md)**.

M10–12 turinio ROI: **FREEZE** gyvam turiniui (priimta liekana **41**; nevaryti į 0). Testerio Must T01–T08 + T09 + hygiene closeout ✅ → [`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md). Liekana — §1.3.

### §1.3 M10–12 testerio intake (Must shipped; liekana)

> Phase B **Must** T01–T08 + **T09** + hygiene **40** (freeze buvo 41) ✅. M11 chrome + item quality ✅. **M11 walked, no RAW** · **M12 walked, no RAW**. Gyvas turinys **FREEZE**. Training **v1.6.3**. Intake priima naujas pastabas.

| ID         | Užduotis                                       | Status | Pastaba                                                                                      |
| ---------- | ---------------------------------------------- | ------ | -------------------------------------------------------------------------------------------- |
| **T01 I5** | 10.45 dual-picker demote (pill’ai → legenda)   | parked | Tik jei savininko re-walk vis dar painus. Dual picker **lieka** kol tada.                    |
| **Should** | T01–T08 2-as pass (legenda, oras, `max-w-5xl`) | [ ]    | Ne P0. Tik po savininko „tvarkom“. Won’t = rainbow / enlarge / Cursor šaka / naujas Pattern. |

### §1.3a M13–15 learner walk (ne P0/P1)

> Horizon C corporate15 + M13 plain **lieka done**. Late stack = owner walk, ne 47×7. Intake [`M13_M15_LEARNER_WALK_INTAKE.md`](docs/development/intake/M13_M15_LEARNER_WALK_INTAKE.md) (§2.7–§2.13). M13 gyvas turinys **FREEZE** (TRIM/TE). I2-M13 ✅. **M14-ITEMS** ✅. Craft Banga 1 + C-S1–S4 ✅. Could C-C\* parked.

| ID               | Užduotis                                                                                | Status | Pastaba                                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| **M14-W1**       | Path Test items + chrome (leak, EN twins)                                               | [x]    | 2026-08-17. Warm-up ≠ graded; `pipeline` chrome; durable EN `141`.                                                   |
| **M15-W2**       | `158` Quick start LHF                                                                   | [x]    | Label → `Greitas startas`. `151–154` rewrite **nebe Won’t** — žr. M15-PROMPTS.                                       |
| **Walk RAW**     | Savininko walk                                                                          | [x]    | 2026-08-18. `151–158` chrome + `150.25`/`150.26` šaka. M13 tik jei FAIL. Complete-screen #16 parked.                 |
| **M17-ANALOG**   | Path Test 0 % / pass nebe M2 default                                                    | [x]    | 2026-08-18. `172` JSON live; fail → M16; pass → M18.                                                                 |
| **M14-ITEMS**    | Testerio Path Test item kokybė (`141`)                                                  | [x]    | 2026-08-18. Q6 grandinė; Q9 be CPI; Q11 principas; Q12 provenance; Q5 be hint; Wave 1 SOT sync. **Ne** 12 rewrite.   |
| **LANG-M1315**   | LT║EN I0 + I1A + W1–W3 apply                                                            | [x]    | 2026-08-17 chrome. I2-M14 + I3 + I2-M13 shipped 2026-08-18. Ne TRIM/TE.                                              |
| **M15-EMPTY**    | `150.5` + `151–154` piešia tuščią (`!slide.scenario` → `null`)                          | [x]    | 2026-08-18 compact kelias + `practicalTask`. Be M3 4 tab’ų.                                                          |
| **M15-150-GRID** | `150` izoliuoti kaip M12 — slėpti M3 `scenarioCards` / „🔥 6 Verslo…“                   | [x]    | 2026-08-18 `isM15`.                                                                                                  |
| **M15-PROMPTS**  | `150.5–158`: problema + promptas į DI įrankį (vaizdas / garsas / montažas / sujungimas) | [x]    | 2026-08-18. Privaloma/neprivaloma nuimta kaip ašis.                                                                  |
| **M15-I3**       | Turinio kelio atmintinė — tie patys promptai, ne kontrolinis lapas                      | [x]    | 2026-08-18. 4 promptai + LT „Pristatymo sąrašas“.                                                                    |
| **I2-M14**       | First-screen + TS chip’ai + `142` 0 % M2 fallback                                       | [x]    | 2026-08-18. `rawScore > 0` nuimtas M8/M11/M14. M17 = **M17-ANALOG**.                                                 |
| **I2-M13**       | First-screen + ciklas live M13                                                          | [x]    | 2026-08-18. MUST kelias + i2vGen i18n. TRIM/TE neliesti.                                                             |
| **W3/W4**        | Scoped M14 first-screen                                                                 | [x]    | Įėjo į I2-M14. Won’t = `Savitikra` rename · C2PA drop · M8/M11 chip’ai · hygiene→0.                                  |
| **M1315-KISS**   | Chrome + kiss + `13.35` Ready collapse (ne TE / ne nauja skaidrė)                       | [x]    | 2026-08-19. `13.31`/`150`/`150.5`/`140.5`/`151`/`143`/`142`/`13.101`/`13.35`. Gate lieka `150.5`. Could C-C1 parked. |

### §1.3b M13–15 craft MoSCoW (ne P0/P1; po I2-M13)

> Spec: [`M13_M15_CRAFT_MOSCOW_2026-08.md`](docs/development/intake/M13_M15_CRAFT_MOSCOW_2026-08.md). SOT §11 KEEP. Šis sluoksnis = kontrolės ciklas (invariantai / last-frame / VO inkarai), ne nauja grandinė.  
> Banga 1 shipped. TRIM/TE/S4 freeze. C-S* — jokios naujos skaidrės / Pattern / Feature Doc. EN = `build:modules-en-m13-m15`. **Ne** `generate:core-data`. CONTENT → DATA. M13P klasė = Stage (3–7 eil.).  
> **Stop:** nauja skaidrė/lab/Pattern (C-W4) · 12 M14 stem rewrite (C-W5 / C-S4 limitas). **M14-ITEMS** (4 stem + 1 grandinė) ≠ C-W5. Banga 1 + C-S1–S4 shipped. Could C-C* parked.

**Must — Banga 1** (po I2-M13)

| ID       | Užduotis                                                           | Status | Pastaba                                         |
| -------- | ------------------------------------------------------------------ | ------ | ----------------------------------------------- |
| **C-M1** | I2V ciklas: invariantai + 1 kamera + 1 veiksmas + 3 s + last-frame | [x]    | 2026-08-18. `13.4` · `13.47` · `152` `doneWhen` |
| **C-M2** | Stiliaus antraštė pažodžiui + vienas modelis serijai               | [x]    | 2026-08-18. `13.3` · `150.5` žingsnis           |
| **C-M3** | VO: ausiai + žodynėlis + 3 inkarai + fonas po balsu                | [x]    | 2026-08-18. `13.6` · `153`                      |

**Should — Banga 2 / 3**

| ID       | Užduotis                                         | Status | Pastaba                                                           |
| -------- | ------------------------------------------------ | ------ | ----------------------------------------------------------------- |
| **C-S1** | Veo native garsas vs tylus I2V + atskiras balsas | [x]    | 2026-08-18. `13.5` collapsible + `13.47` Patikra hint             |
| **C-S3** | Viena užrakto kortelė per M15 / I3               | [x]    | 2026-08-18. `150.25` skiltis + I3 delivery eilutė                 |
| **C-S2** | Pirmas + paskutinis kadras                       | [x]    | 2026-08-18. `152` Stage copy (kai įrankis moka); be 13.47 control |
| **C-S4** | Max 1 M14 warm/bonus „ką keiti retry #2?“        | [x]    | 2026-08-18. `143` Patikra eilutė. **Ne** 12 stem rewrite          |

**Could — tik po Bangos 1 + savininko**

| ID       | Užduotis                            | Status | Pastaba                                |
| -------- | ----------------------------------- | ------ | -------------------------------------- |
| **C-C1** | UGC / kalbantis kadras              | parked | Ne naujas MUST kelias                  |
| **C-C2** | Apšvietimas kaip pagrindinis slotas | parked | `13.2` +1 eil.; 13.33 already optional |
| **C-C3** | „Pakeisk kadrą, ne promptą“         | parked | `13.4` / `13.101`                      |
| **C-C4** | Seed lock (Flux / SD)               | parked | Hosted image often has no seed         |
| **C-C5** | Inpaint kaip pirmas fix             | parked | `13.325` hint only                     |

**Won’t**

| ID        | Užduotis                                                                                                                                                                                    | Status | Pastaba                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | --------------------------------- |
| **C-W\*** | LoRA/ComfyUI · Zapier factory · cinema/Suno JSON · nauja skaidrė/Pattern · 12 stem rewrite · hybrid B-roll slide · savaitinis Sora/Veo chase · mix su I2-M13 · TRIM/TE/`generate:core-data` | won’t  | Stage kūnai lieka intake, ne čia. |

### §1.4 Out of scope – marketing handoff

> Ne default agentų P0. Vykdymas / env / KPI → marketing repo. Runbook: [`MON_P0_EXECUTION_PLAN.md`](docs/deployment/MON_P0_EXECUTION_PLAN.md) (**superseded** — nevykdyti pin 1.4.2 eilučių).  
> **Horizon B įvykdytas:** GitHub pin **v1.6.2** (`c35a1f5`, [PR #92](https://github.com/DITreneris/promptanatomy/pull/92)) + parent `build:corporate12` + **12 live per Supabase** (`highest_plan=12` → `access_tier=12`). Viešas Stripe = M1–6. M7–18 = corporate grant iki **2027-01** (ne LP checkout; ne produkto skola). Training cut **v1.6.3**; **live pin stays v1.6.2** until marketing re-pins. Optional SPA chrome fingerprint (`home-recall-link` vs `RetrievalDueCard`) — ne cutover blokas.

| ID        | Užduotis                                                                | Status     | Pastaba                                                                                          |
| --------- | ----------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------ |
| **MON-1** | Prod env: nėra `VITE_MAX_ACCESSIBLE_MODULE=6`; `VITE_VERIFY_ACCESS_URL` | [ ]        | Marketing Vercel                                                                                 |
| **MON-2** | Submodule pin **v1.6.2** + corporate12 + 12 per Supabase                | [x]        | Live pin ✅ PR #92 `c35a1f5`. Next target **v1.6.3** (marketing). Optional chrome ≠ fail. CAV-B1 |
| **MON-3** | Verify-access smoke (magic link → tier 12)                              | [x]        | Tier 12 kelias veikia. Kitų pakopų browser ritualas — marketingas, ne open P0                    |
| **MON-4** | PostHog/GA4 production + funnel dashboard                               | [ ]        | [`MON-4_POSTHOG_DEPLOY.md`](docs/deployment/MON-4_POSTHOG_DEPLOY.md) · CAV-B2                    |
| **MON-5** | Gate regression browser (tier 0 → AccessGate)                           | ⏳         | Auto ✅; browser ⏳                                                                              |
| **MON-7** | Baseline KPI po MON-4 (2–4 sav.)                                        | [ ]        | Marketing                                                                                        |
| **MON-8** | Marketing prod: `build:production` M1–9 env                             | superseded | Prod build = `corporate12` / M1–12. M1–9 = fallback profilis                                     |
| CRO       | Landing positioning / Hero CTA / trust / Pricing eilė                   | [ ]        | Marketing. Viešas SKU M1–6 — kanonas iki 2027-01                                                 |

MON-6 ✅ – žr. archive / CHANGELOG.

### §1.5 Deferred

- Viešas checkout = M1–6. **M7–18 = corporate / Supabase grant iki 2027-01** — planas, ne skola. Monetizacijos SKU (Agentų / Turinio / 18) ≠ learning P0.
- M10–15 vieša monetizacija – marketing repo (Phase 2 SKU); prieiga 12 jau live (§1.4).
- **Horizon D Wave D3 / CAV-C2:** corporate18 — po pricing call. Intake [`docs/development/intake/M16_M18_CORPORATE18_INTAKE.md`](docs/development/intake/M16_M18_CORPORATE18_INTAKE.md).
- M19–21 **DI politikos inžinerija** – Deferred (nėra SOT).
- M7 optional viz sk. 100–106 lieka M7 (≠ M16–18).
- **CAV-D1 Progress / org memory:** localStorage sandbox; revisit after MON-4.
- **M18-PLAIN-C** optional dens soft — deferred.
- Formalus Density DoD / CI — **ne**.
- **DATA-FRESH** (parked, ne P0/P1): šaltinių vintage / Eurostat–MIT etiketės. Gerinti, kai skaidrė jau atidaryta; **nelaužyti** hero KPI ir nevaryti „visus 2024 → 2026“. Memo: [`DATA_MEMO.md`](docs/development/DATA_MEMO.md).

### §1.6 Caveats Closure Program

| ID         | Item                                     | Owner               | Status                                                                  |
| ---------- | ---------------------------------------- | ------------------- | ----------------------------------------------------------------------- |
| **CAV-A1** | EN automated audits + RELEASE_QA §5c log | QA                  | [x]                                                                     |
| **CAV-A2** | Mobile @375 owner residual               | QA / owner          | [x]                                                                     |
| **CAV-A3** | PDF LT glyphs / links pre-release        | QA                  | [x] automated; owner open-PDF visual still recommended §5d              |
| **CAV-B1** | Magic link cutover                       | Marketing           | [x] pin **v1.6.2** + 12 live per Supabase; optional SPA chrome ≠ blokas |
| **CAV-B2** | PostHog MON-4                            | Marketing           | [ ]                                                                     |
| **CAV-C1** | M1618 path handout                       | CONTENT→DATA→CODING | [x]                                                                     |
| **CAV-C2** | corporate18 + tier 18                    | Product + stack     | won’t-now until pricing call                                            |
| **CAV-D1** | Progress lite / org memory               | Product             | deferred after B                                                        |

### §1.7 P2 – Toolchain (open only)

| ID         | Užduotis                                                                  | Status | Pastaba                                                                                        |
| ---------- | ------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------- |
| **TOOL-5** | Sprendimas: ar įjungti 14 naujų `react-hooks` v7 React Compiler taisyklių | [ ]    | Politikos klausimas. TOOL-0/1/2/4 ✅ → archive 2026-08. Vite 8 / React 19 / Tailwind 4 = defer |

---

## 2. Padaryta (santrauka)

Pilnos lentelės: [`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md) · [`2026-07-31`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-31.md) · [`2026-07-28`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md). Metrika: [`CODEBASE_WHAT_IS_DONE.md`](docs/development/CODEBASE_WHAT_IS_DONE.md).

- M1–9 production · M10–15 corporate cuts · M16–18 authoring+TE+plain · UJ-MUST · M79/M1315 ROI ✅
- M1012-DEEP + M1012 content audit (freeze, hygiene **40**) · LANG-SOT · katalogas UX · CATALOG-HOME · SCHEME-CENTRAL W1 ✅
- M10 testerio Must T01–T08 + T09 split + hygiene closeout ✅ 2026-08-13; M11 chrome + item quality ✅; **M11 walked, no RAW** · **M12 walked, no RAW** (I5 / Should — §1.3)
- M14 Path Test W1 + chrome ✅ 2026-08-17; **M14-ITEMS** ✅ 2026-08-18; M15 walk FAIL + I2-M14 ✅; **I2-M13 + craft C-M1–M3 ✅**; **Walk RAW `151–158` + C-S1–S4 + M17 analog ✅** 2026-08-18; corp15 sync ✅; **M5 polish** ✅; open = I5 parked · Should 2-as pass
- Release **1.6.3** = training cut. Live pin kol neperpinsi = **v1.6.2** (PR #92). **12 live per Supabase.** Docs meta sync **v4.36** (ne 1.6.4).

---

## 3. Nuorodos

| Kas                    | Kur                                                                                                                                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Production ladder      | [`ROADMAP.md`](ROADMAP.md)                                                                                                                                                                                                               |
| Klaidos / release QA   | `docs/development/TEST_REPORT.md`, `RELEASE_QA_CHECKLIST.md`                                                                                                                                                                             |
| M10–12 content freeze  | [`M10_M12_CONTENT_DEEP_AUDIT_2026-08.md`](docs/development/M10_M12_CONTENT_DEEP_AUDIT_2026-08.md)                                                                                                                                        |
| M10–12 testerio intake | [`M10_M12_TESTER_INTAKE_2026-08.md`](docs/development/intake/M10_M12_TESTER_INTAKE_2026-08.md) · Must shipped; OPEN naujoms pastaboms                                                                                                    |
| M13–15 learner walk    | [`M13_M15_LEARNER_WALK_INTAKE.md`](docs/development/intake/M13_M15_LEARNER_WALK_INTAKE.md) · Wave 1+2 + Walk RAW `151–158` ✅ · **M14-ITEMS** ✅ · LANG-M1315 W1–W3 ✅ ([`M13_M15_TERM_BANK.md`](docs/development/M13_M15_TERM_BANK.md)) |
| M13–15 craft MoSCoW    | [`M13_M15_CRAFT_MOSCOW_2026-08.md`](docs/development/intake/M13_M15_CRAFT_MOSCOW_2026-08.md) · C-M1–M3 + C-S1–S4 ✅ · Could C-C\* parked (**§1.3b**; ne P0)                                                                              |
| Marketing handoff      | `docs/deployment/MON_P0_EXECUTION_PLAN.md`                                                                                                                                                                                               |
| Docs lean              | `docs/development/DOCS_MAINTENANCE.md` §1c                                                                                                                                                                                               |
| Claim vintage (parked) | [`DATA_MEMO.md`](docs/development/DATA_MEMO.md) · ne P0/P1; gerinti, nelaužyti                                                                                                                                                           |
| Agent start            | `docs/DOCUMENTATION_QUICK_REF.md`                                                                                                                                                                                                        |
| Done snapshot          | [`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md)                                                                                                                                                  |
