# M10–M12 turinio gilus auditas (LT + EN) — 2026-08

> **Data:** 2026-08-12  
> **Apimtis:** 47 skaidrės (M10 31 + M11 5 + M12 11) + lab TS + žodynėlis + locale + handout  
> **Rubrika:** K1 aiškumas · K2 išbaigtumas · K3 tikslumas · K4 praktika · K5 LT kalba · K6 EN kalba · K7 LT↔EN atitikimas  
> **Metodas:** I0 korpusas → I1 mechaninė higiena → I2 10 turinio subagentų → I3 LT/EN korektūra → I4 cross-cutting → I5 citatų verifikacija (98,5 %) → I6 sintezė → I7 adversarinis kalibravimas  
> **Statusas:** **CLOSED / FREEZE** 2026-08-12 — P0 ✅ · P1 ✅ · P2 ✅; hygiene baseline **71** (`audit:m1012-content-hygiene:gate`). **Nevaryti į 0; jokių naujų turinio/P3 batch’ų.**  
> **Pirmtakas (UI/UX ašys):** [`M10_M12_DEEP_AUDIT_2026-08.md`](M10_M12_DEEP_AUDIT_2026-08.md) — **šis dokumentas = turinio ašis**, ne UI.

---

## 1. Vadovo santrauka

| Rodiklis                      | Recenzentų                              | Po I7 kalibravimo                                          |
| ----------------------------- | --------------------------------------- | ---------------------------------------------------------- |
| Bendras vidurkis (47 sk.)     | **3.36**                                | **3.46**                                                   |
| M10                           | 3.41                                    | 3.52                                                       |
| M11                           | 3.51                                    | 3.39                                                       |
| M12                           | 3.17                                    | 3.30                                                       |
| Silpniausia ašis              | K7 LT↔EN (**3.13**)                     | —                                                          |
| Antra silpniausia             | K2 išbaigtumas (**3.17**)               | —                                                          |
| Mechaniniai radiniai          | **195** (`audit:m1012-content-hygiene`) | —                                                          |
| Turinio radiniai (subagentai) | **244** (P0 33 · P1 113 · P2 98)        | —                                                          |
| LT korektūros pasiūlymai      | **241**                                 | [`M10_M12_LANG_FIXLIST_LT.md`](M10_M12_LANG_FIXLIST_LT.md) |
| EN korektūros pasiūlymai      | **266**                                 | [`M10_M12_LANG_FIXLIST_EN.md`](M10_M12_LANG_FIXLIST_EN.md) |

**Vieno sakinio diagnozė:** LT mokymo stuburas dažnai geras; silpniausias sluoksnis – **EN overlay užpildas iš `build-en-m10-m12.mjs`**, M12 EN `taskFrame: "Task"` (tuščias acceptance blokas), **terminų driftas** (paleidiklis/trigger) ir **`123` → klaidingas pointeris** į `10.64` vietoj `10.65`.

**Atmesta (I7 + grepas):**

- Promptų injekcija **yra** privalomame kelyje (`10.6` „Įrankio grąžintas tekstas nėra instrukcija“) – ankstesnė G2 spraga **neteisinga**.
- `10.65` kaip „vienintelis saugumas“ – **DISAGREE** (MUST: `10.6` + `10.26` + `10.64` B/C).
- `120.5` kaip grynas `10.482` dublikatas – **DISAGREE** (SOT reikalauja JSON handoff).

---

## 2. Sisteminės problemos (konsoliduotos)

| #      | Problema                                                                                                              | Įrodymas                                                | Savininkas     | Prioritetas |
| ------ | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------------- | ----------- |
| **S1** | EN build fallback generuoja **įtikinamą** užpildą (~47 laukai: body×12, step×18, def×5, copyable×2)                   | `scripts/build-en-m10-m12.mjs` literaliai; live overlay | DATA           | **P0**      |
| **S2** | M12 EN `content.taskFrame: "Task"` (string) vs tipas `{task, doneWhen}` → tuščias acceptance box                      | 5 praktikų skaidrės                                     | DATA / CODING  | **P0**      |
| **S3** | `123` reikalauja incidentų plano, bet visos LT nuorodos → **Minimalus eigos aprašymas** (`10.64`); planas yra `10.65` | 5 laukai × LT                                           | CONTENT / DATA | **P0**      |
| **S4** | EN `10.7` žodynėlis: 5 placeholder apibrėžimai, dublikatai, nėra HITL                                                 | `terms[17..21]`                                         | DATA           | **P0**      |
| **S5** | Hint ladder: `description` = `hint` = `partialSolution` (M12 praktikos)                                               | 17 scaffold-collapse                                    | CONTENT        | P1 ✅       |
| **S6** | Terminų driftas: `Paleidiklis` vs glossary `Trigger`; orkestratorius vs koordinatorius                                | X3                                                      | CONTENT        | P1 ✅       |
| **S7** | Warm-up → graded leak (pvz. `10.61` q1 ≈ `111` q)                                                                     | X2 / A6                                                 | CURRICULUM     | P2 ✅       |
| **S8** | `128` completion claim neteisingas LT+EN (leidžia „bent vieną“ / greitą startą)                                       | introBody                                               | CURRICULUM     | P0 ✅       |

**Konsolidacija (I7):** vienas generatoriaus pataisymas + EN glossary rekey + `taskFrame` pašalinimas + `123` pointeriai uždaro ~30 radinių.

---

## 3. Kalibruotas rangas (blogiausia → geriausia)

## Rangas pagal kalibruota bala: blogiausia -> geriausia

| #   | id       | kalib.   | recenz.       | K1  | K2  | K3  | K4  | K5  | K6  | K7  | mech. |
| --- | -------- | -------- | ------------- | --- | --- | --- | --- | --- | --- | --- | ----- |
| 1   | `128`    | **2.60** | 2.29 _koreg._ | 3   | 2   | 2   | 2   | 4   | 2   | 1   | 15    |
| 2   | `123`    | **2.80** | 2.57 _koreg._ | 3   | 1   | 2   | 3   | 4   | 3   | 2   | 20    |
| 3   | `10.7`   | **3.00** | 2.29 _koreg._ | 3   | 2   | 3   | 3   | 2   | 2   | 1   | 16    |
| 4   | `111`    | **3.00** | 2.86 _koreg._ | 3   | 2   | 4   | 3   | 2   | 2   | 4   | 2     |
| 5   | `124.5`  | **3.00** | 3.00          | 4   | 4   | 4   | 4   | 2   | 2   | 1   | 14    |
| 6   | `124`    | **3.00** | 3.00          | 4   | 2   | 3   | 3   | 3   | 2   | 4   | 13    |
| 7   | `121`    | **3.00** | 3.00          | 4   | 4   | 4   | 3   | 2   | 2   | 2   | 31    |
| 8   | `10.255` | **3.14** | 3.14          | 3   | 3   | 3   | 4   | 2   | 4   | 3   | 1     |
| 9   | `10.151` | **3.14** | 3.14          | 3   | 2   | 3   | 4   | 3   | 4   | 3   | 0     |
| 10  | `10.35`  | **3.14** | 3.14          | 3   | 4   | 4   | 3   | 2   | 2   | 4   | 1     |
| 11  | `10.64`  | **3.14** | 3.14          | 4   | 2   | 3   | 4   | 2   | 3   | 4   | 0     |
| 12  | `10.8`   | **3.14** | 3.14          | 3   | 4   | 5   | 3   | 2   | 3   | 2   | 3     |
| 13  | `10.451` | **3.20** | 2.86 _koreg._ | 3   | 1   | 2   | 3   | 5   | 5   | 1   | 10    |
| 14  | `10.482` | **3.29** | 3.29          | 3   | 4   | 3   | 2   | 3   | 4   | 4   | 0     |
| 15  | `10.49`  | **3.29** | 3.29          | 4   | 3   | 3   | 4   | 4   | 2   | 3   | 0     |
| 16  | `10.5`   | **3.29** | 3.29          | 4   | 3   | 3   | 3   | 4   | 3   | 3   | 0     |
| 17  | `10.15`  | **3.29** | 3.29          | 3   | 4   | 4   | 4   | 4   | 2   | 2   | 7     |
| 18  | `122`    | **3.29** | 3.29          | 4   | 4   | 4   | 4   | 4   | 2   | 1   | 23    |
| 19  | `10.21`  | **3.40** | 3.00 _koreg._ | 3   | 2   | 3   | 3   | 4   | 5   | 1   | 10    |
| 20  | `10.26`  | **3.40** | 2.00 _koreg._ | 2   | 1   | 2   | 2   | 1   | 5   | 1   | 8     |
| 21  | `10.485` | **3.40** | 4.29 _koreg._ | 5   | 5   | 4   | 4   | 4   | 4   | 4   | 0     |
| 22  | `10.36`  | **3.40** | 2.86 _koreg._ | 3   | 3   | 4   | 2   | 2   | 3   | 3   | 3     |
| 23  | `113`    | **3.40** | 4.14 _koreg._ | 5   | 4   | 4   | 5   | 4   | 3   | 4   | 1     |
| 24  | `100`    | **3.43** | 3.43          | 4   | 3   | 3   | 4   | 4   | 5   | 1   | 4     |
| 25  | `10.1`   | **3.43** | 3.43          | 4   | 2   | 2   | 4   | 3   | 4   | 5   | 0     |
| 26  | `10.3`   | **3.43** | 3.43          | 4   | 3   | 3   | 5   | 3   | 2   | 4   | 0     |
| 27  | `110.5`  | **3.43** | 3.43          | 4   | 3   | 4   | 4   | 3   | 3   | 3   | 0     |
| 28  | `112`    | **3.43** | 3.43          | 4   | 3   | 3   | 2   | 4   | 4   | 4   | 1     |
| 29  | `125`    | **3.43** | 3.43          | 4   | 3   | 4   | 2   | 3   | 3   | 5   | 0     |
| 30  | `10.2`   | **3.57** | 3.57          | 4   | 4   | 3   | 5   | 3   | 3   | 3   | 1     |
| 31  | `10.51`  | **3.57** | 3.57          | 4   | 3   | 4   | 3   | 4   | 3   | 4   | 1     |
| 32  | `10.61`  | **3.57** | 3.57          | 3   | 3   | 3   | 4   | 4   | 5   | 3   | 1     |
| 33  | `120.25` | **3.57** | 3.57          | 4   | 4   | 4   | 4   | 4   | 2   | 3   | 0     |
| 34  | `10.65`  | **3.60** | 2.86 _koreg._ | 3   | 2   | 4   | 3   | 3   | 2   | 3   | 1     |
| 35  | `10.45`  | **3.71** | 3.71          | 4   | 4   | 4   | 4   | 3   | 4   | 3   | 0     |
| 36  | `10.481` | **3.71** | 3.71          | 3   | 4   | 4   | 4   | 3   | 4   | 4   | 0     |
| 37  | `10.4`   | **3.71** | 3.71          | 3   | 3   | 4   | 3   | 5   | 4   | 4   | 0     |
| 38  | `110`    | **3.71** | 3.71          | 4   | 3   | 3   | 4   | 4   | 4   | 4   | 0     |
| 39  | `120.5`  | **3.80** | 2.86 _koreg._ | 3   | 3   | 3   | 3   | 2   | 3   | 3   | 0     |
| 40  | `10.37`  | **3.86** | 3.86          | 4   | 4   | 5   | 4   | 3   | 3   | 4   | 0     |
| 41  | `120.55` | **3.86** | 3.86          | 4   | 3   | 4   | 3   | 5   | 4   | 4   | 3     |
| 42  | `10.48`  | **4.00** | 4.00          | 4   | 5   | 5   | 4   | 3   | 3   | 4   | 4     |
| 43  | `10.6`   | **4.00** | 4.00          | 4   | 4   | 5   | 3   | 4   | 3   | 5   | 0     |
| 44  | `120`    | **4.00** | 4.00          | 4   | 3   | 4   | 4   | 5   | 4   | 4   | 0     |
| 45  | `10.22`  | **4.29** | 4.29          | 4   | 5   | 5   | 3   | 4   | 5   | 4   | 1     |
| 46  | `10.25`  | **4.30** | 4.00 _koreg._ | 4   | 5   | 5   | 5   | 2   | 2   | 5   | 0     |
| 47  | `10.66`  | **4.43** | 4.43          | 5   | 4   | 5   | 5   | 5   | 4   | 3   | 0     |

## Vidurkiai (recenzentu / kalibruoti)

- M10: **3.41** / **3.52** (31 sk.)
- M11: **3.51** / **3.39** (5 sk.)
- M12: **3.17** / **3.30** (11 sk.)
- Visos: **3.36** / **3.46** (47 sk.)

- Kalibruota <= 3.0: `10.7`, `111`, `124.5`, `124`, `121`, `123`, `128`
- Kalibruota >= 4.0: `10.22`, `10.25`, `10.48`, `10.6`, `10.66`, `120`

## Ašių vidurkiai

- K1: **3.64**
- K2: **3.17**
- K3: **3.60**
- K4: **3.49**
- K5: **3.30**
- K6: **3.23**
- K7: **3.13**

## Be turinio balų (patikrinti): nėra

---

## 4. Bottom 7 (kalibruota ≤ 3.0) – ką taisyti pirmiausia

| id      | kalib. | Problema                                   | Fix                                                    |
| ------- | ------ | ------------------------------------------ | ------------------------------------------------------ |
| `128`   | 2.60   | Completion claim + EN filler               | Perrašyti introBody LT+EN; užpildyti ability*/ownWork* |
| `123`   | 2.80   | Klaidingas incidentų plano pointeris       | Visur → **Darbo eigos testavimas ir saugumas**         |
| `10.7`  | 3.00   | EN glossary sugedęs                        | Rekey pagal terminą + HITL + pašalinti stub            |
| `111`   | 3.00   | Warm-up leak + length cue                  | Keisti warm-up / distractorius                         |
| `124.5` | 3.00   | EN be Skill pack                           | Atstatyti EN artefakto laukus                          |
| `124`   | 3.00   | SOT golden test neauthorintas              | Užbaigti praktiką arba optional+aiškumas               |
| `121`   | 3.00   | EN duplicate copy žudo no-account fallback | Sutvarkyti EN scenarioDescription                      |

---

## 5. Top etalonai (kalibruota ≥ 4.0)

| id      | kalib. | Kodėl                                      |
| ------- | ------ | ------------------------------------------ |
| `10.66` | 4.43   | LT evaluator etalonas                      |
| `10.25` | 4.30   | 3A juostos + transfer                      |
| `10.22` | 4.29   | Švari savitikra                            |
| `10.48` | 4.00   | 5 šablonai                                 |
| `10.6`  | 4.00   | Klaidos + **įrankio injekcijos** saugiklis |
| `120`   | 4.00   | Švarus projekto intro                      |

---

## 6. Mechaniniai vartai

```bash
npm run audit:m1012-content-hygiene
npm run audit:m1012-content-hygiene:gate   # --fail-on-regression vs baseline
npm run extract:m1012-corpus               # tmp/m1012-audit/batch-A*.md
```

Įtraukta į `audit:release-preflight` po `audit:m1012`.

Mašininis radinių failas: [`audit/m1012-content-findings.json`](audit/m1012-content-findings.json).

---

## 7. Remediacijos batchai

### Batch P0 — „EN generatorius ir tušti vartai“ ✅

| #    | Veiksmas                                                                   | Failai                         | Būsena |
| ---- | -------------------------------------------------------------------------- | ------------------------------ | ------ |
| P0-1 | Fallback → `__EN_MISSING__` + `assertNoPlausibleEnFiller` po merge         | `scripts/build-en-m10-m12.mjs` | ✅     |
| P0-2 | Live EN + `m10-ux-batch-en-overlay.json` be filler                         | overlay + UX batch             | ✅     |
| P0-3 | Pašalinti `taskFrame: "Task"` (5×) + build → `undefined`                   | overlay + build                | ✅     |
| P0-4 | `123` pointeriai → **Workflow testing and security** / LT **Darbo eigos…** | `modules.json` + build EN      | ✅     |
| P0-5 | EN `10.7` 22 terms + HITL                                                  | build terms[]                  | ✅     |
| P0-6 | `128` completion claim (3 required; extras ≠ substitutes)                  | LT + EN                        | ✅     |

### Batch P1 — kalba ir kelionė ✅

| #    | Veiksmas                                                        |
| ---- | --------------------------------------------------------------- |
| P1-1 | LT fixlist P0/P1 (`M10_M12_LANG_FIXLIST_LT.md`)                 |
| P1-2 | EN fixlist P0/P1 (`M10_M12_LANG_FIXLIST_EN.md`)                 |
| P1-3 | Hint ladder atskyrimas M12                                      |
| P1-4 | Terminų kanonas (paleidiklis; orkestratorius vs koordinatorius) |

### Batch P2 — pedagogika / optional

P2 batch ✅: warm-up/test leak, LT/EN P2 polish ir hygiene liekanos; intake Musts lieka uždaryti §898.

---

## 8. Nuorodos

- Scratch ataskaitos: `tmp/m1012-audit/` (batch-_, findings-_, lang-_, cross-_, adversarial-I7.md)
- UI/UX pirmtakas: [`M10_M12_DEEP_AUDIT_2026-08.md`](M10_M12_DEEP_AUDIT_2026-08.md)
- Plain intake: [`intake/M10_M12_PLAIN_PEDAGOGY_INTAKE_2026-08.md`](intake/M10_M12_PLAIN_PEDAGOGY_INTAKE_2026-08.md)
- SOT: [`turinio_pletra_moduliai_10_11_12.md`](../turinio_pletra_moduliai_10_11_12.md)
- Gairės: [`PAPRASTOS_KALBOS_GAIRES.md`](PAPRASTOS_KALBOS_GAIRES.md)

```text
CHANGES: turinio deep audit 47 sk. + hygiene gate + P0/P1/P2 remediacija
CHECKS: audit:m1012; audit:m1012-content-hygiene:gate; build:modules-en-m10-m12
RISKS: hygiene parity liekanos (71) = freeze, ne backlog
NEXT: stop — M10–12 turinio ROI baigtas
```
