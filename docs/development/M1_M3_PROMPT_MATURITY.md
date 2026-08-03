# M1–M3 copyable promptų branda (M1P)

> **Statusas:** aktyvus kontraktas + **freeze** po M1P (2026-07-26).  
> **Etalonas:** [`M4_PROMPT_MATURITY.md`](M4_PROMPT_MATURITY.md) (fit-for-purpose) – branduolys be journey.  
> **Turinio SOT:** `turinio_pletra.md` (M1–M3).  
> **Ilgis:** [`CONTENT_AGENT.md`](CONTENT_AGENT.md) §3.4.

## Tikslas

Pakelti branduolio **paste-and-run aiškumą** be naujų skaidrių ir be „ilgesnis = brandesnis“.  
Po M1P – **freeze:** keisti tik paste-run failure / kalbos klaidą; ne „gražiau“.

## Fit-for-purpose juostos

| Skaidrės darbas                   | Ilgis           | Struktūra                                          | Draudžiama                                        |
| --------------------------------- | --------------- | -------------------------------------------------- | ------------------------------------------------- |
| **Micro** – stiliaus chip (M2.51) | 1–3 eil.        | Priedas prie užduoties; be API jargon              | Vienas chip kaip „pilnas paleidimas“ be konteksto |
| **Stage** – 3 blokų micro-win     | 3–6 eil.        | META/INPUT/OUTPUT; vienas Copy = vienas paleidimas | Label „6 blokų“ ant 3-block paste                 |
| **Curriculum 6-block** – M3.31–36 | Pilni 6 blokai  | Pamokos esmė; ADVANCED = tonas+formatas            | Temperature skaičiai chat UI; packed multi-prompt |
| **Lab** – intro blogas→geras      | Trumpas fixture | CTA sako 3 blokus / struktūrą                      | Force-6-block ant pirmo bandymo                   |
| **Ritual** – summary reflection   | Trumpas         | Keep                                               | Perrašymas „dėl brandos“                          |

## Inventorius (po M1P)

| ID      | Modulis | Klasė              | Laukas                        | Verdiktas              | Pastaba                                                            |
| ------- | ------- | ------------------ | ----------------------------- | ---------------------- | ------------------------------------------------------------------ |
| 1       | M1      | Lab                | unstructured/structuredPrompt | keep labels            | CTA = META·INPUT·OUTPUT, ne „6 blokų bandymas“                     |
| 1.1     | M1      | Stage              | sections copyable             | keep text / fix labels | 3 blokų micro-win                                                  |
| 51      | M2      | Micro ×4           | sections copyable             | upgrade                | Priedai; be `max_tokens`                                           |
| 52      | M2      | Stage ×6           | sections copyable             | split                  | Vienas promptas = vienas Copy                                      |
| 30.5    | M3      | Stage              | copyable                      | keep                   | Warm-up OK                                                         |
| 31–36   | M3      | Curriculum 6-block | practicalTask.template        | polish                 | ADVANCED tonas; CoT → žingsnis po žingsnio; 31 grammar + LT OUTPUT |
| summary | M1/M3   | Ritual             | reflectionPrompt              | keep                   | Out of this pass                                                   |

**Out of scope:** M1 Advanced `Temperature`/`Reasoning` mokymo `copyText`; M2 quiz / `questionPool`; PC-4.1; M4+.

## Iteracijos

| ID    | Turinys                                                        | Statusas        |
| ----- | -------------------------------------------------------------- | --------------- |
| M1P-0 | Šis kontraktas + inventorius + docs wire                       | done 2026-07-26 |
| M1P-1 | M1 intro CTA + footer + sk. 1.1 labels                         | done            |
| M1P-2 | M2.51 Micro + M2.52 split ×6                                   | done            |
| M1P-3 | M3.31–36 ADVANCED/CoT/grammar/LT-first                         | done            |
| M1P-4 | EN + us-overrides + `generate:core-data` + CHANGELOG + lessons | done            |

## Invariantai

- Full SOT: `src/data/modules.json`; EN: `modules-en.json` (M1–3); core: `generate:core-data`.
- US locale: `modules-en-us-overrides.json` kai dubliuoja M3 templates.
- Script: `scripts/archive/patches/patch-m1p-prompt-maturity.mjs`.

## Freeze

Po M1P-done branduolio copyable / `practicalTask.template` keičiami **tik** jei:

1. paste-run failure (promptas neveikia kaip mokoma), arba
2. kalbos / gramatikos klaida.

Ne: antras „maturity rewrite“, force-META, ilginimas dėl brandos.

## Nedaryti

Naujų skaidrių; force-6-block ant micro-win; packed multi-prompt Copy; `max_tokens` branduolio chip’uose; M3 6-block → Stage perrašymas; M1 Advanced parametro mokymo išėmimas.
