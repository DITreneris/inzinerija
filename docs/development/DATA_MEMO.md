# DATA_MEMO – claim vintage and freshness

> **Status:** parked improvement. **Not** P0/P1. Do not break live slides or start a year-replace epic.  
> **Checked:** 2026-08-18. **Owner when opened:** CONTENT (copy + cite) → DATA (JSON / twins) → QA (URL spot-check).  
> **Related:** [`DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md`](DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md) (Vectara + tools cadence only).  
> **TODO:** [`TODO.md`](../../TODO.md) §1.5 `DATA-FRESH`.

## 1. Verdict

The course is not “stuck on 2022–2023 data.” It mixes four vintages in the same JSON. Only some of them should move on a calendar.

| Class                     | What                                                    | Update the year?                                    | Examples                                                                                                                          |
| ------------------------- | ------------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **A. Landmark papers**    | Peer-reviewed, still the citation everyone uses         | **No.** Keep + say it is the canonical study        | M1 `0.5`: Noy & Zhang _Science_ 2023, Peng Copilot 2023, Brynjolfsson NBER 2023. M4 `66.25`: Liu et al. “Lost in the Middle” 2023 |
| **B. Official surveys**   | Eurostat / Stat.gov.lt / EK / MIT field studies         | **After a new wave is published**                   | M4 `53.5` (32,7% · 20% · 69% · 9,8% · ~15,8%). M7 `725` (95% / 5% / 40 mlrd $)                                                    |
| **C. Live product facts** | Model names, context windows, tools, detectors, Vectara | **Quarterly, when a training-cut cares**            | `66` table titled “2026” still lists GPT-4o / Claude 3.5+ / Gemini 1.5+. `hallucinationRates.ts` `asOfDate` 2026-07-14            |
| **D. Teaching fiction**   | Fake quarters, campaign briefs                          | Optional roll-forward so labs do not feel last-year | M3 “Q2 2024”, “Q2 2025 SmartFlow”; “eksportas 2024”; RAG window `2020–2024`                                                       |

**Credibility risk = Class C labeled as current**, not Class A being from 2023.

Eurostat 2026 household AI results were **not** out on 2026-08-18. “Fresh” means **latest published + dated**, not “printed this year.”

## 2. What already exists

- `DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md` §2: refresh **Vectara** and **tools.json**. No claim inventory, no Eurostat/MIT/context-window SLA.
- `src/data/hallucinationRates.ts`: good pattern — `asOfDate` + URL + learner research prompt. GitHub leaderboard last updated **2026-05-11**; course snapshot **2026-07-14** still matches top-10. No emergency refresh.
- M4 `53.5` footer “Atnaujinta 2026-07” is a **UI polish date**, not a source vintage.
- CONTENT lesson 2026-07-13: `86/38/48` source **not confirmed** — keep as illustration.
- No `claimRegistry`, no `audit:claim-freshness`, no open learning P0/P1 for this.

Architecture A: authoring SOT = `modules.json`. M1–9 → EN overlay + `generate:core-data`. M4 portal twin also lives in `portalBeatContent.ts`. M7 rates = `hallucinationRates.ts` only. M10+ → `build:modules-en-m*` (never EN-only JSON).

## 3. Hero claims (do not silently swap %)

| Slide / file                       | Claim                                         | 2026-08-18 note                                                                                                                                                                                                                                                            |
| ---------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| M1 `0.5`                           | 56% / +40% / +18% / +55% / +14% / +34%        | Keep 2023 papers. Do not merge with portal “MIT 2025 · 56%”.                                                                                                                                                                                                               |
| M4 `53.5` + `portalBeatContent.ts` | 32,7 · 98 · 20 · 56 · 63,8 · 69 · 9,8 · ~15,8 | **32,7%** and **20% +6,5 pp** = Eurostat ICT 2025 (Dec 2025 news). Youth **63,8 / 44,2 / 39,3 / 15,8** = Eurostat 2026-02-10. **15,8% is 16–24 professional use**, not “licensed workplace seats.” **69% LT residents** — verify vs youth **73%** before leading the beat. |
| M7 `725`                           | 95% / 5% / >40 mlrd $ / ~90% shadow DI        | NANDA _The GenAI Divide_ (2025): no measurable **P&L** / 5% of integrated pilots. Footer says Sloan/CISR; `url` is `#`. Fix attribution when this slide is touched — do not rewrite the module for it.                                                                     |
| M4 `66`                            | “Konteksto langai (2026)”                     | Names 2024–25 SKUs. Highest “we are in 2024” smell. Relabel or refresh **when** someone is already in that slide.                                                                                                                                                          |
| M4 `66.25`                         | Liu 2023 + “~39% logic drop”                  | Keep Liu. Soften or cite the 39% if the slide is opened.                                                                                                                                                                                                                   |
| M7 `200`                           | Vectara top-10                                | Keep. Optional `asOfDate` honesty only.                                                                                                                                                                                                                                    |
| M7 `67.5`                          | OWASP LLM #1                                  | 2026 list published 2026-08-03/04. Year bump only when ethics copy is open.                                                                                                                                                                                                |
| M13 `13.5`                         | “2026 video matrica”                          | Product snapshot — refresh with `tools.json`, not Eurostat.                                                                                                                                                                                                                |

**Do not treat as research debt:** fictional Q2 packs, “Vilniaus Rytas … 2024”, RAG `2020–2024` filter.

## 4. Kiss / marry / kill (web check 2026-08-18)

### Marry (keep — update label/URL, not the story)

- Eurostat **32,7%** individuals 16–74, gen DI, last 3 months — [news 2025-12-16](https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20251216-3).
- Eurostat **20,0%** enterprises 10+, **+6,5 pp**; large **55%**, small **17%** — [news 2025-12-11](https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20251211-2).
- Eurostat youth **63,8%** and purpose bars — [news 2026-02-10](https://ec.europa.eu/eurostat/web/products-eurostat-news/w/edn-20260210-1).
- Noy & Zhang 2023; Liu 2023; Vectara snapshot (see §3).

Write “Eurostat ICT 2025, checked 2026-08” — not “2026 data.”

### Kiss (one sentence or one collapsible — do not rebuild a module)

When a slide is already open for other reasons:

1. **Jagged frontier** (Dell’Acqua et al., _Organization Science_ 2025): inside the model’s skill → +12,2% tasks, 25% faster, +40% quality; **outside** → **19 pp worse**. Best new teaching number we do not have. M1 `0.5` or M4 Patikra.
2. **MIT CISR Digital Colleagues** (Apr 2026, 132 orgs): value tracks redesigned workflows, new roles/metrics, high use; ~**22%** major redesign. Real Sloan/CISR URL for `725` / M10. [CISR](https://cisr.mit.edu/publication/2026_0401_DigitalColleagues_WeillWoerner).
3. **Stanford AI Index 2026** — max two punches: ~53% population adoption in 3 years; org 88% vs agents still single digits. [HAI](https://hai.stanford.edu/ai-index/2026-ai-index-report). Not a new portal chapter.
4. **OWASP LLM Top 10 2026** — year bump on `67.5`. [genai.owasp.org](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/).
5. **LT youth ~73% vs EU 63,8%** — only if 69% all-ages is confirmed or replaced.
6. **EU purpose split (16–74):** 25,1% personal · 15,1% work · 9,4% education — if the portal work block is retitled.
7. **EU AI Act** — one line on existing Legal/ethics (GPAI since 2025-08-02; high-risk dates may have moved). Do not add a legal module.

### Kill (do not add; do not promote)

- McKinsey / Gartner $X trillion.
- `86/38/48` as a fact (illustration only).
- Portal “MIT 2025 · 56%” conflated with M1 Science 2023.
- `98%` IT / MIT 2025 without a paper URL.
- `15,8%` as “licencijuoti įrankiai darbe.”
- `69%` Lietuvos gyventojų until Stat.gov.lt / Eurostat all-ages is opened.
- Viral “95% of AI fails” without P&L / pilot→production caveat.
- US $172B surplus, US 28,3% adoption (weak for LT/ES).
- Training CO₂ / water, China vs US race, junior-dev −20% (off curriculum).
- Live Eurostat/Vectara fetch in the app (definitions change between waves).
- Big-bang “replace every 2024 in the repo.”

## 5. How to improve later (when we choose to)

**Do:** small label/URL fixes on a slide that is already open. Snapshot + checked-on date. Official page first, then the PDF. CONTENT writes the sentence; DATA patches SOT + EN + `.ts` twins; QA opens the URL.

**Do not:** invent a 2026 percentage because the calendar says 2026; auto-scrape into `modules.json`; treat landmark 2023 papers as stale; open a claim-registry epic before a trainer or tester asks.

Optional later (still not P0): a 12–20 row claim list (`claimId`, slide, value, URL, source year, `asOfChecked`, class A–D). Scale the Vectara pattern. Cadence: A keep · B annual after the statistical office · C quarterly if a cut needs it · D optional fiction year-roll.

## 6. First touch list (only if a slide is already being edited)

| If you are already in…          | Cheap improvement                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------------- |
| `66`                            | Relabel “typical ranges, checked …” or refresh flagship windows                     |
| `725`                           | Real URL; NANDA vs CISR; keep mechanism, kill ticker headline                       |
| `53.5` / `portalBeatContent.ts` | Dataset IDs; fix 15,8% / 69% captions; do not swap 32,7 without a new Eurostat wave |
| `0.5`                           | One line: 2023 experiment still canonical; later surveys measure adoption           |
| `200`                           | Leave numbers; optional date honesty                                                |
| `67.5`                          | OWASP year 2026                                                                     |

---

**Stop:** new slide type · Feature Doc · live API · hygiene→0 on every `%` · M10–12/M13 TRIM unfreeze for stats.
