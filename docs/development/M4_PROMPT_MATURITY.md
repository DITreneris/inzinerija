# M4 copyable promptų branda (M4P)

> **Statusas:** aktyvus kontraktas (2026-07-25).  
> **Etalonas:** [`M7_PROMPT_MATURITY.md`](M7_PROMPT_MATURITY.md) (F/S/R/L) – čia **be** journey ×6.  
> **Turinio SOT:** [`turinio_pletra_moduliai_4_5_6.md`](../turinio_pletra_moduliai_4_5_6.md).  
> **Eilė:** [`MODULIO_4_SKAIDRIU_EILES.md`](../MODULIO_4_SKAIDRIU_EILES.md).  
> **Ilgis:** [`CONTENT_AGENT.md`](CONTENT_AGENT.md) §3.4 (~6–8 eil. tipiniam copyable).

## Tikslas

Kelti praktinių copyable užduočių brandą **be** naujų skaidrių ir **be** „ilgesnis = brandesnis“.  
**Maturity = fit-for-purpose:** klasė + ilgis seka skaidrės darbą (pedagogika + praktinė paste-and-run vertė).

## Fit-for-purpose juostos

| Skaidrės darbas                                                 | Ilgis                | Struktūra                                                                                | Draudžiama                                           |
| --------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Micro** – viena technika / chip                               | 1–3 eil.             | Placeholder + aiškus rezultatas (+ Formatas cue)                                         | META/INPUT/OUTPUT siena                              |
| **Stage** – vienas kartojamas žingsnis                          | 3–6 eil.             | Duomenys/Padaryk/Formatas _arba_ ROLE+TASK+OUTPUT; `Nežinau` tik kai šaltiniai/duomenys  | Viena sakinio meta-komanda; pilnas MASTER            |
| **Flagship** – pagrindinė praktika / vertintojas / generatorius | ~6–10 eil. (cap ~12) | META/INPUT/OUTPUT _arba_ ROLE/TASK/CONTEXT/OUTPUT; `[įklijuok]`/`[X]`; numeruotas OUTPUT | 6 blokų REASONING/QUALITY/ADVANCED (_išskyrus_ 54.5) |
| **Curriculum 6-block** – System/Master mokymas (54.5)           | Pilni 6 blokai       | Pamokos esmė                                                                             | „Subrendinti“ ištrinant 6 blokus                     |
| **Lab / fixture** – blogas→geras, simulatorius                  | Trumpas fixture      | Kontrastas; Patikra moko                                                                 | Kelti lab tekstą į Flagship                          |

**Pass test:** „Jei sutrumpinu 30 %, ar dalyvis vis tiek gauna tinkamą rezultatą _šiai_ skaidrei?“ – taip → trumpinti.

## Inventorius (po M4P)

| ID    | Klasė                  | Laukas                      | Verdiktas      | Pastaba                                  |
| ----- | ---------------------- | --------------------------- | -------------- | ---------------------------------------- |
| 39    | Flagship               | sections copyable           | keep           | DI hierarchija – mokymo F                |
| 44    | Micro                  | copyable                    | keep           | 1 min kontekstas                         |
| 45    | Flagship               | copyable (vertintojas)      | keep           | GOLDEN §3.2b; kompaktiškas               |
| 54.5  | Curriculum 6-block     | copyable ×2 + practicalTask | keep           | **Išimtis** – 6 blokai lieka             |
| 55    | Flagship + Stage×3     | primary + 3 collapsible     | trim / upgrade | Primary sutrumpintas; pavyzdžiai → Stage |
| 43    | Flagship               | copyable                    | trim           | RULES sutraukti                          |
| 54    | Lab (+ optional Micro) | collapsible copyable ×2     | keep           | Lab taisyklė; šablonai optional          |
| 46.5  | Flagship generator     | copyable                    | keep           | Ilgesnis generatorius OK                 |
| 49    | Flagship + Lab         | copyable + solutionCopyable | trim / keep    | Vertintojas sutrumpintas; solution = Lab |
| 48    | Stage (demo)           | copyable ×2                 | upgrade        | Formatas cue; be META                    |
| 50    | Flagship-short         | practiceCopyable            | keep           | OUTPUT skenuojamas                       |
| 56    | Stage (etalonas)       | copyable                    | keep           | Nežinau + citata                         |
| 59    | Stage                  | hero + mini ×2              | keep / upgrade | Hero OK; mini → Stage skeletas           |
| 60    | Stage                  | copyable                    | upgrade        | Šaltiniai → išvados + Nežinau            |
| 61    | Stage                  | starter copyable            | keep           | Optional įrankiai                        |
| 63    | Micro ×4               | copyable ×4                 | upgrade        | Formatas cue; **ne** 4× MASTER           |
| 64    | Flagship + Stage       | main + Quick win            | keep / upgrade | Quick win = tyrimo starteris             |
| 65    | Stage                  | universalus                 | upgrade        | seka/CoT/ToT + Formatas                  |
| 65.5  | Flagship (2-step)      | copyable                    | keep           | RAG → Deep research                      |
| 66.6  | Flagship               | copyable                    | trim           | Dual OUTPUT pedagoginis                  |
| 66.97 | Ritual / reflection    | copyable                    | keep           | 3 klausimai sau                          |
| 62    | —                      | —                           | —              | Be copyable (diagrama)                   |
| 63.7  | Flagship               | practicalTask COMBO         | keep           | Generatorius M6 tiltui                   |

**Out of scope:** 51/52 (M2 bonus); 67.x etika (M7); naujos skaidrės; journey overlay.

## Iteracijos

| ID    | Turinys                                                      | Statusas        |
| ----- | ------------------------------------------------------------ | --------------- |
| M4P-0 | Šis kontraktas + inventorius                                 | done 2026-07-25 |
| M4P-1 | Flagship balansas (trim 49/55/43/66.6; keep 45/54.5/64/65.5) | done            |
| M4P-2 | Stage/Micro (60, 64 QW, 65, 63, 59 mini, 48, 55 examples)    | done            |
| M4P-3 | Chrome Trumpai/Daryk kur trūko                               | done            |
| M4P-4 | Paste-run / Patikra↔OUTPUT sutikrinimas                      | done            |
| M4P-5 | EN m4–m6 + `generate:core-data` + CHANGELOG + lessons        | done            |

## Invariantai

- Full SOT: `src/data/modules.json`; EN: `modules-en-m4-m6.json`; core: `generate:core-data`.
- Evaluator pedagogika (45, 49): vienas promptas vertina kitą – `practicalTask` = žingsniai, ne dubliuotas tekstas.
- `Nežinau` / citata – tik kai užduotis remiasi šaltiniais ar įklijuotais duomenimis.

## Nedaryti

Naujų skaidrių; force-META ant Micro/Stage; ilginimas „dėl brandos“; 6 blokų šalinimas nuo 54.5; 67.x auditas po M4; M7 journey mechanikos kopijavimas.
