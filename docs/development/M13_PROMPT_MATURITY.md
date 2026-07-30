# M13 copyable promptų branda (M13P)

> **Statusas:** aktyvus kontraktas (2026-07-28).  
> **Etalonas:** [`M4_PROMPT_MATURITY.md`](M4_PROMPT_MATURITY.md) (Micro / Stage / Flagship).  
> **Turinio SOT:** [`turinio_pletra_moduliai_13_14_15.md`](../turinio_pletra_moduliai_13_14_15.md).  
> **Eilė:** [`MODULIO_13_SKAIDRIU_EILES.md`](../MODULIO_13_SKAIDRIU_EILES.md).  
> **Lab:** [`M13_CONSISTENCY_LOCK_LAB.md`](M13_CONSISTENCY_LOCK_LAB.md) – Drift Lab artefaktas ≠ Flagship siena.

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

## Inventorius (pradinis map)

| ID            | Klasė                 | Pastaba                                                                                   |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------- |
| 13.1          | Micro                 | A/E/C tikslų brief (ne generatoriaus promptas)                                            |
| 13.2          | Stage                 | Prompt stack šablonas                                                                     |
| 13.3          | Micro / Stage         | Stilius + proporcijos                                                                     |
| 13.32         | Shell / Micro pointer | Be JSON copyable – Stage lock persikėlė į 13.325 lab                                      |
| **13.325**    | Lab                   | Drift ×4 + fresh: Fix + Stage lock skeleton; fresh = Lab fixture; optional „Trūksta refs“ |
| 13.33         | Stage                 | Kompozicija + kadras                                                                      |
| 13.35         | Flagship              | MASTER + ready prompts (optional)                                                         |
| 13.4          | Stage ×2              | Klipas + image→video grandinė                                                             |
| 13.37 / 13.47 | Generator             | In-app build – ne JSON copyable siena                                                     |

### 13.325 Lab artefaktų inventorizacija (L)

| Mode                            | Artefaktas                                                         |
| ------------------------------- | ------------------------------------------------------------------ |
| inflate / color / label / style | Fix cue + Stage reference lock taisyklė (+ missing refs jei &lt;3) |
| fresh                           | Fresh generate šablonas be lock                                    |

## Backlog (ne I6 DoD)

- Pilnas trim audit visiems M13 copyables pagal Micro/Stage/Flagship
- EN twin alignment spot-check po turinio batch

## Susiję

- Journey intake: [`intake/M13_M15_JOURNEY_UX_INTAKE_2026-07.md`](intake/M13_M15_JOURNEY_UX_INTAKE_2026-07.md)
- AGENTS.md – M13P eilutė
