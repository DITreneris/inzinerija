# M13 copyable promptų branda (M13P)

> **Statusas:** **done** trim audit 2026-08-04 (`M13P-TRIM`) – freeze: keisti tik paste-run FAIL.  
> **Etalonas:** [`M4_PROMPT_MATURITY.md`](M4_PROMPT_MATURITY.md) (Micro / Stage / Flagship).  
> **Turinio SOT:** [`turinio_pletra_moduliai_13_14_15.md`](../turinio_pletra_moduliai_13_14_15.md).  
> **Eilė:** [`MODULIO_13_SKAIDRIU_EILES.md`](../MODULIO_13_SKAIDRIU_EILES.md).  
> **Lab:** [`M13_CONSISTENCY_LOCK_LAB.md`](M13_CONSISTENCY_LOCK_LAB.md) – Drift Lab artefaktas ≠ Flagship siena.  
> **Plain chrome:** [`M13_MATURITY_PLAN.md`](M13_MATURITY_PLAN.md) ✅ (ne šis failas).

## Tikslas

Fit-for-purpose copyable branda Turinio kelyje (vaizdas / video / audio) – **ne** „ilgesnis = brandesnis“.

## Fit-for-purpose juostos

| Klasė        | Skaidrės darbas                                    | Ilgis                                                | Struktūra                                 |
| ------------ | -------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------- |
| **Micro**    | Viena technika (stilius, proporcijos, kamera)      | 1–4 eil.                                             | Placeholder + same-style cue              |
| **Stage**    | Kartojamas žingsnis (I2V klipas, consistency rule) | 3–7 eil.                                             | Scena / kamera / formatas / lock taisyklė |
| **Flagship** | MASTER / ready prompt / kampanijos šablonas        | ~6–12 eil.                                           | Role + constraints + output format        |
| **Lab**      | 13.325 Drift / fresh artefaktai                    | Trumpas fixture (+ Stage lock skeleton drift kelyje) | Choice → Copy; nekelti į Flagship         |

**Pass test:** jei sutrumpinu 30 %, ar vis tiek gaunu tinkamą rezultatą _šiai_ skaidrei?

## Inventorius + M13P-TRIM verdiktai (2026-08-04)

| ID            | Klasė                  | TRIM verdiktas      | Pastaba                                                               |
| ------------- | ---------------------- | ------------------- | --------------------------------------------------------------------- |
| **13.1**      | Micro                  | **trim**            | A/E/C brief → ≤4 eil. (buvo ~10 eil. overrun)                         |
| **13.2**      | Stage                  | **keep**            | Lean; −30 % nuimtų stilius/proporcijos laukus                         |
| **13.3**      | Micro / Stage          | **keep**            | Lean; −30 % fail = teaching fields                                    |
| 13.32         | Shell / Micro pointer  | —                   | Be JSON copyable – Stage lock persikėlė į 13.325 lab                  |
| **13.325**    | Lab                    | **keep**            | Drift ×4 + fresh; nekelti į Flagship; ne TRIM sprintas                |
| 13.33         | Stage                  | park                | Optional; ne named TRIM list                                          |
| **13.35**     | Flagship               | **kiss**            | MASTER: merge Apšvietimas+Spalvos; Ready ×3 **keep**                  |
| **13.4**      | Stage ×2               | **trim** / keep     | Klipas **keep**; grandinė vaizdas→video **trim** (~−30 %)             |
| **13.6**      | Stage dual + EN MASTER | **keep** / **trim** | bed + VO **keep**; EN MASTER **trim** (≤7 eil., license intent lieka) |
| 13.12         | Stage checklist        | **park**            | Ilgiausias JSON copyable – **ne** šio TRIM sprinto                    |
| 13.37 / 13.47 | Generator              | —                   | In-app build – ne JSON copyable siena                                 |

### 13.325 Lab artefaktų inventorizacija (L)

| Mode                            | Artefaktas                                                         |
| ------------------------------- | ------------------------------------------------------------------ |
| inflate / color / label / style | Fix cue + Stage reference lock taisyklė (+ missing refs jei &lt;3) |
| fresh                           | Fresh generate šablonas be lock                                    |

## Iteracijos

| ID            | Turinys                                                                    | Statusas            |
| ------------- | -------------------------------------------------------------------------- | ------------------- |
| **M13P-TRIM** | keep/trim map + 13.4 chain + 13.6 EN MASTER + 13.35 kiss + 13.1 Micro + EN | **done 2026-08-04** |

**Freeze:** po done – keisti copyable tik paste-run failure / kalbos klaidą. Ne painioti su learner plain.

## Susiję

- **Learner chrome / plain:** [`M13_MATURITY_PLAN.md`](M13_MATURITY_PLAN.md) — done 2026-08-04.
- Journey intake: [`intake/M13_M15_JOURNEY_UX_INTAKE_2026-07.md`](intake/M13_M15_JOURNEY_UX_INTAKE_2026-07.md)
- AGENTS.md – M13P eilutė
