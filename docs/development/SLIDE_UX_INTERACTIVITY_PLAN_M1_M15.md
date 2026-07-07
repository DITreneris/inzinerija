# M1–15 mokymų UX ir interaktyvumo planas

> **Tikslas:** Padidinti mokymų įvairovę ir „ar supratau?“ momentus **platinant esamus skaidrių tipus ir `content-block` sub-laukus** – be naujų top-level tipų (išskyrus vėlesnį `interactive-builder`, jei 3+ moduliai to reikalaus).
> **Prioritetas:** P0 produkto backlog (2026-07) – virš MON P0 full sprint; MON lieka release guardrail.
> **SOT tipams:** `docs/development/GOLDEN_STANDARD.md` §3, `src/types/modules.ts` (`SlideType`, `ContentBlockContent`).
> **Atnaujinta:** 2026-07-07

---

## 1. Principai

| Taisyklė                         | Aprašymas                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Platinimas, ne proliferacija** | Naudoti `path-step`, `warm-up-quiz`, `intro-action-pie`, `evaluator-prompt-block`, embedded laukus |
| **M4 = etalonas**                | Learn moduliuose tikslas: ≥1 formative check kas 6–8 teorijos skaidres                             |
| **SOT → JSON → UI**              | Turinio SOT (`turinio_pletra*.md`, `MODULIO_*_EILES.md`) pirmiau nei `modules.json`                |
| **Be naujo kodo P1**             | Pirmos 3 bangos – tik JSON + SOT; kodas tik jei trūksta renderio                                   |
| **EN sync**                      | M10–15: po LT JSON – `build:modules-en-*` + `audit:m1012` / `audit:m1315`                          |

### Target ritmas (learn moduliai)

```
action-intro [(-journey)] → content-block × (4–6) → [warm-up-quiz | path-step] → section-break → … → summary
```

Test moduliai: `warm-up-quiz` optional prieš `test-intro`. Practice: `practice-intro` + scenarijai (hub jei >6 scenarijų).

---

## 2. Baseline (2026-07-07)

**258 skaidrės**, 15 modulių. Audit: `npm run audit:slide-interactivity` (po Bangos 1 + M1 baseline: warm-up=14, path=9, intro-action-pie=2, evaluator=2, embed=7; M1 warning uždarytas).

| Modulis | Skaidrės | Interaktyvūs pattern'ai                                | Embedded sub-laukai    | UX spraga                                                      |
| ------- | -------- | ------------------------------------------------------ | ---------------------- | -------------------------------------------------------------- |
| M1      | 23       | path-step ×1, warm-up ×1, block slides + 1 infographic | 0                      | ✅ Baseline uždarytas: micro-win + META/INPUT/OUTPUT savitikra |
| M2      | 11       | test-section ×7                                        | 0                      | OK (testas)                                                    |
| M3      | 10       | practice ×6                                            | 0                      | OK (praktika)                                                  |
| M4      | 41       | warm-up ×3, intro-action-pie, evaluator                | 4 embed                | **Etalonas** – platinimo šaltinis                              |
| M5      | 9        | warm-up ×1                                             | brief + preCopy        | Galima +1 warm-up                                              |
| M6      | 10       | practice ×2                                            | 0                      | +path-step arba warm-up prieš capstone                         |
| M7      | 58       | journey, intro-action-pie ×1, path ×5, warm-up ×5      | 0                      | ✅ Banga 1 atlikta                                             |
| M8      | 5        | test                                                   | 0                      | +1 warm-up optional                                            |
| M9      | 22       | hub + practice ×17                                     | 0                      | OK (capstone)                                                  |
| M10     | 24       | path ×3, warm-up ×2, evaluator ×1                      | 0                      | ✅ Banga 1 atlikta                                             |
| M11     | 4        | test                                                   | 0                      | OK                                                             |
| M12     | 10       | practice ×5                                            | 0                      | +1 path-step po 120.5                                          |
| M13     | 21       | warm-up ×2, vaizdo-generatorius                        | recognitionExercise ×1 | ✅ Banga 1 atlikta                                             |
| M14     | 3        | test                                                   | 0                      | OK                                                             |
| M15     | 7        | practice ×4                                            | 0                      | +1 path-step po 150.25                                         |

**content-block dalis:** ~55% visų skaidrių – monotoniškumo rizika sprendžiama **ritmu**, ne nauju tipu.

---

## 3. Bangos ir deliverables

### Banga 0 – Infrastruktūra (1–2 d.)

| ID     | Darbas                         | Failai                                                  | DoD                                                    |
| ------ | ------------------------------ | ------------------------------------------------------- | ------------------------------------------------------ |
| UX-0.1 | Interaktyvumo audit skriptas   | `scripts/audit-slide-interactivity.mjs`, `package.json` | `npm run audit:slide-interactivity` exit 0 + ataskaita |
| UX-0.2 | Šis planas + TODO sync         | `TODO.md`, `CHANGELOG.md`                               | P0 UX-ID matomi TODO                                   |
| UX-0.3 | Curriculum matrica (žemiau §4) | Šis failas                                              | Kiekvienam moduliui ≥3 konkretūs veiksmai              |

**Release guardrail (ne blokeris):** prieš marketing submodule – gate smoke 15 min (`MARKETING_HANDOFF_CHECKLIST.md` §7).

### Banga 1 – Aukšto trinties moduliai (2–3 sav.)

**M7, M10, M13** – ilgi learn keliai, mažai formative checks.

| ID     | Modulis | Veiksmas                                                                 | Agentai                     | SOT / JSON                                                                                        |
| ------ | ------- | ------------------------------------------------------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------- |
| UX-1.1 | M7      | +4 `warm-up-quiz` po: pipeline, 4 analizės tipai, MASTER, haliucinacijos | CURRICULUM → CONTENT → DATA | ✅ 2026-07-07 – `MODULIO_7_SKAIDRIU_EILES.md`, `turinio_pletra_moduliai_7_8_9.md`, `modules.json` |
| UX-1.2 | M7      | 1× `intro-action-pie` – „Koks tavo analitiko profilis?“ (5 segmentai)    | CONTENT → DATA              | ✅ 2026-07-07 – skaidrė 70.5 po journey                                                           |
| UX-1.3 | M10     | +2 `warm-up-quiz` (po 10.2 ciklas, po 10.48 workflow)                    | CONTENT → DATA              | ✅ 2026-07-07 – `MODULIO_10_SKAIDRIU_EILES.md`                                                    |
| UX-1.4 | M10     | 1× `evaluator-prompt-block` – agent QC checklist                         | CONTENT → DATA              | ✅ 2026-07-07 – po 10.65                                                                          |
| UX-1.5 | M13     | +2 `warm-up-quiz` (vaizdo promptai, video)                               | CONTENT → DATA              | ✅ 2026-07-07 – `MODULIO_13_SKAIDRIU_EILES.md`                                                    |
| UX-1.6 | M13     | 1× `recognitionExercise` – stilių / aspect ratio atpažinimas             | CONTENT → DATA              | ✅ 2026-07-07 – skaidrė 13.34                                                                     |

**Gate:** `npm run validate:schema`, `npm run audit:slide-interactivity`, M7/M10 `audit:m79` / `audit:m1012`, M13 `audit:m1315`.

### Banga 2 – Practice ir vidutiniai learn (1–2 sav.)

| ID     | Modulis | Veiksmas                                                       |
| ------ | ------- | -------------------------------------------------------------- |
| UX-2.1 | M6      | 1× `path-step` prieš capstone (duomenų tvarkymo checklist)     |
| UX-2.2 | M12     | 1× `path-step` po 120.5 (multi-agent schema patikra)           |
| UX-2.3 | M15     | 1× `path-step` po 150.25 (practice loop patvirtinimas)         |
| UX-2.4 | M5      | +1 `warm-up-quiz` prieš test-section                           |
| UX-2.5 | M8      | optional `warm-up-quiz` (3 klausimai, remediation → M7)        |
| UX-2.6 | M6      | `correctPromptPractice` 1× content-block (projekto prompt fix) |

### Banga 3 – MVP ir testų moduliai (1 sav.)

| ID     | Modulis | Veiksmas                                                                         |
| ------ | ------- | -------------------------------------------------------------------------------- |
| UX-3.1 | M1      | ✅ 2026-07-07 – `path-step` 1.1 po įvado + `warm-up-quiz` 16.5 META/INPUT/OUTPUT |
| UX-3.2 | M2      | Bonus content-block interaktyvumas (id 51–52) – patikrinti collapsible + copy    |
| UX-3.3 | M11/M14 | Scenario klausimų share ≥30% (jei < – CONTENT peržiūra)                          |

### Banga 4 – Etalonų dokumentacija ir EN (ongoing)

| ID     | Darbas                                                                               |
| ------ | ------------------------------------------------------------------------------------ |
| UX-4.1 | `GOLDEN_STANDARD.md` §3.8 – „Modulio interaktyvumo ritmas“ (1 puslapis)              |
| UX-4.2 | M4 pattern katalogas: kuri skaidrė naudoja kurį sub-lauką (maintain alongside audit) |
| UX-4.3 | EN overlay sync visoms Banga 1–2 skaidrėms                                           |

---

## 4. Modulio × rekomenduojamas pattern (santrauka)

| M   | Prioritetas | Top 3 veiksmai                                                              |
| --- | ----------- | --------------------------------------------------------------------------- |
| 1   | ✅          | Micro-win intro + META/INPUT/OUTPUT savitikra atlikta; block slides palikti |
| 2   | —           | Maintain; scenario share                                                    |
| 3   | —           | Maintain practice flow                                                      |
| 4   | Reference   | Dokumentuoti kaip etaloną; optional `toolChoiceBar` platinimas              |
| 5   | P2          | +1 warm-up; briefCheck jau yra                                              |
| 6   | P1          | path-step + correctPromptPractice                                           |
| 7   | **P0**      | ✅ +4 warm-up; toliau intro-action-pie, SOT schemų hierarchija              |
| 8   | P2          | optional warm-up                                                            |
| 9   | —           | Maintain hub + role-quest                                                   |
| 10  | **P0**      | +2 warm-up, evaluator-prompt-block                                          |
| 11  | —           | Maintain                                                                    |
| 12  | P1          | path-step                                                                   |
| 13  | **P0**      | +2 warm-up, recognitionExercise, vaizdo-gen jau OK                          |
| 14  | —           | Maintain                                                                    |
| 15  | P1          | path-step                                                                   |

---

## 5. Agentų pipeline (mixed task)

```
CURRICULUM (ritmas, kas 6–8 skaidrės) → CONTENT (copy, klausimai) → DATA (modules.json, validate, EN) → CODE_REVIEW → QA (audit + rankinė 390px)
```

**DoD vienos skaidrės:** GOLDEN_STANDARD §3.2 sekcijos; footer pozicija (1-based); LT diakritika; EN overlay jei M10+; `audit:slide-interactivity` neblogėja.

---

## 6. Sėkmės metrikos

| Metrika                                             | Baseline           | Dabar (2026-07-07)    | Tikslas (Banga 1–2) |
| --------------------------------------------------- | ------------------ | --------------------- | ------------------- |
| `warm-up-quiz` skaidrės (M1–15)                     | 5                  | 14                    | ≥12                 |
| `path-step` skaidrės                                | 8                  | 9                     | ≥11                 |
| Embedded sub-laukai (recognition, correctPrompt, …) | 6                  | 7                     | ≥10                 |
| Learn moduliai su ≥1 formative / 8 skaidrių         | M4, dalinai M7/M10 | M1, M4, M7, M10, M13  | M4, M7, M10, M13    |
| Ilgiausias content-block streak (be check)          | M7 ~15+            | M7 = 7 (branch-aware) | ≤8                  |

---

## 7. Rizikos

1. **M7 skaidrių skaičius** – naujos skaidrės didina trintį; prioritetas – **konvertuoti** esamas arba **įterpti** warm-up, ne pridėti teorijos.
2. **Footer numeriai** – po eilės keitimo privaloma perskaičiuoti (`footer-slide-numbers.mdc`).
3. **EN M10–15** – kiekvienas LT pakeitimas reikalauja overlay sync.
4. **Nauji tipai** – vengti iki Banga 4 review; `vaizdo-generatorius` lieka M13-specific.

---

## 8. Nuorodos

- Skaidrių tipai registry: `src/components/SlideContent.tsx`
- Content-block sub-laukai: `src/types/modules.ts` (`ContentBlockContent`)
- M4 etalonas: `docs/turinio_pletra_moduliai_4_5_6.md`, `docs/MODULIO_4_SKAIDRIU_EILES.md`
- UX auditai: `docs/UX_AUDIT_MICRO_IMPROVEMENTS.md`, `docs/AUDITO_ATASKAITA_MODULIAI_1_6_UI_UX_LEARNING.md`
- Release guardrail: `docs/deployment/MARKETING_HANDOFF_CHECKLIST.md` §7
