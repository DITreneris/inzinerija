# M7 copyable promptų branda (M7P)

> **Statusas:** aktyvus kontraktas (2026-07-24).  
> **Ticketai:** `TODO.md` §1.0f (`M7P-0…5`).  
> **Journey SOT:** [`M7_JOURNEY_COPY_REGISTRY.md`](M7_JOURNEY_COPY_REGISTRY.md).  
> **Turinio SOT:** [`turinio_pletra_moduliai_7_8_9.md`](../turinio_pletra_moduliai_7_8_9.md) §5.

## Tikslas

Kelti praktinių copyable užduočių brandą **be** naujų skaidrių ir **be** prievartinio META/INPUT/OUTPUT visiems promptams. Kontekstas lemia klasę.

## Klasės (DoD)

| Klasė            | Kada                                                              | Minimalus DoD                                                                                                                 | Draudžiama                                             |
| ---------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **F – Flagship** | Vienas pagrindinis paste-and-run; M8/M9 taikinys; path-step       | ROLE/TASK/CONTEXT/OUTPUT **arba** META/INPUT/OUTPUT; `[X]` / `[įklijuok]`; 1 patikimumo eilutė (`Nežinau`); numeruotas OUTPUT | 6 blokų REASONING/QUALITY/ADVANCED                     |
| **S – Stage**    | Pipeline / EDA / algoritmo etapas (`toolChoiceBar` / collapsible) | 3–6 eilutės: **Duomenys:** + **Padaryk:** + **Formatas:** (META nebūtina); kelio žodynas tame pačiame skelete                 | Viena sakinio komanda; pilnas MASTER kiekvienam etapui |
| **R – Ritual**   | Rolės aktyvavimas (83)                                            | 3 eilutės: rolė + mąstymo taisyklė + duomenų grindys                                                                          | Primesti INPUT/OUTPUT                                  |
| **L – Lab**      | 67 blogas/geras kontrastas                                        | Trumpas fixture; Patikra moko                                                                                                 | „Pagerinti“ į F                                        |

## Kelio unifikacija (skeletas + slotai)

1. Identiškas eilučių skaičius ir antraštės tarp 6 `journeyId` (skiriasi tik daiktavardžiai).
2. `kita` = tas pats skeletas su `[X]`, ne plonesnė versija.
3. `modules.json` bazė = `pardavimai` tekstas.
4. Multi-copy branduolio skaidrėse: overlay turi **visus** sibling fieldKeys (ne 1 iš N).
5. North Star OUTPUT (registry): pardavimai→KPI/forecast; rinkodara→sentimentas/kanalai; IT→schema/ETL; personalas→retention; vadyba→executive/rizika; kita→`[X]`.

### Slotų žodynas (orientyras)

| Slotas    | pardavimai           | rinkodara               | it-inzinerija       | personalas      | vadyba                 | kita                      |
| --------- | -------------------- | ----------------------- | ------------------- | --------------- | ---------------------- | ------------------------- |
| rolė      | pardavimų analitikas | rinkodaros analitikas   | duomenų inžinierius | HR analitikas   | strateginis analitikas | verslo analitikas / `[X]` |
| šaltiniai | CRM, ERP, e-commerce | kampanijos, social, web | DB, API, logai      | HRIS, apklausos | KPI, finansai          | `[X]`                     |
| metrikos  | pajamos, kiekiai     | CTR, konversija         | vėlavimas, klaidos  | tenure, eNPS    | marža, tikslų %        | `[X]`                     |

## Inventorius (skaidrė → klasė → fieldKeys)

| ID                      | Klasė        | Journey fieldKeys (po M7P)                                                                          |
| ----------------------- | ------------ | --------------------------------------------------------------------------------------------------- |
| 71                      | F (etalonas) | — (be overlay)                                                                                      |
| 74                      | F            | `master-prompt`                                                                                     |
| 71.1–71.5               | F            | `step-task`                                                                                         |
| 732                     | F            | `sentiment-prompt`                                                                                  |
| 734                     | F            | `filter-*` ×4                                                                                       |
| 733                     | F            | `template-*` ×3                                                                                     |
| 78 / 78.5               | F            | `di-role-prompt` / `excel-clean-prompt`                                                             |
| 84 / 86 / 87 / 891 / 92 | F            | po 1 primary (+ struktūra)                                                                          |
| 83                      | R            | `role-activation`                                                                                   |
| 731                     | S×4          | `types-*` ×4                                                                                        |
| 73                      | S×5          | `pipeline-overview` (rinkimas), `pipeline-prep`, `pipeline-eda`, `pipeline-viz`, `pipeline-publish` |
| 89                      | S×5          | `algo-sources`, `algo-structure`, `algo-collect`, `algo-clean`, `algo-export`                       |
| 90                      | S×4          | `eda-stats`, `eda-corr`, `eda-anomaly`, `eda-hypotheses`                                            |
| 67                      | L            | —                                                                                                   |
| 75                      | F            | `reflection`, `first-action-24h`                                                                    |
| 103 / 106 / 861         | F            | — (viz šaka; Patikra/Nežinau)                                                                       |

## Iteracijos

| ID    | Iteracija | Turinys                                                       |
| ----- | --------- | ------------------------------------------------------------- |
| M7P-0 | I0        | Šis kontraktas + TODO/registry/SOT nuorodos — done 2026-07-24 |
| M7P-1 | I1        | MASTER + path-step F + Nežinau (732/92) — done                |
| M7P-2 | I2        | 73/90/89/731 Type S + full journey fields — done              |
| M7P-3 | I3        | Branduolio Trumpai / Daryk dabar — done                       |
| M7P-4 | I4        | Mid F deep-diff + viz Patikra/Nežinau — done                  |
| M7P-5 | I5        | EN/core/audit/CHANGELOG — done                                |

## Invariantai

- M8 `relatedSlideId`: 73, 74, 86, 92, 731, 732, 733, 891
- `pathBranch`, warm-up, `toolChoiceBar` mechanika
- Vartai: `audit:m7-journey-coverage` (+ `:en`), `audit:m7-journey-indices`, `generate:core-data`

## Nedaryti

Naujų skaidrių; 6 blokų sistemos M7; M8 klausimų keitimo; force-META ant S/R/L; viz prieš branduolį; `toolChoiceBar` redesign.
