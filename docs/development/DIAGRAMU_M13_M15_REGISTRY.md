# M13–M15 schemų registry

> Tikslas: viena prižiūrima vieta Turinio inžinerijos kelio (M13–15) schemų routing, interaktyvumo, layout SOT ir testų būsenai.
> Kokybės auditas / ROI eilė: [M13_M15_SCHEME_AUDIT.md](M13_M15_SCHEME_AUDIT.md).
> **Master:** [TEACHING_ELEMENTS_REGISTRY.md](TEACHING_ELEMENTS_REGISTRY.md). M7–12: [DIAGRAMU_M7_M12_REGISTRY.md](DIAGRAMU_M7_M12_REGISTRY.md). Kit: [DIAGRAM_KIT_STANDARD.md](DIAGRAM_KIT_STANDARD.md).

## Semantinis skirtumas (be dublio)

| Skaidrė    | Image key              | Mokymo fokusas                                                                                            | Visual metaphor (I6 target)                        |
| ---------- | ---------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **13.12**  | `m13_media_pipeline`   | **Techninė** medijos grandinė: brief → kadrai → referencai → I2V → garsas/montažas → patikra (+ DI žyma). | **Linear pipeline** (etalon; forma = darbas)       |
| **13.11**  | `turinio_workflow`     | **Verslo** ciklas: brief → prompt → variantai → A/B → optimizacija.                                       | **Cycle / loop-back** į brief (ne aukštesnis twin) |
| **13.32**  | `m13_consistency_lock` | **Reference lock:** refs → taisyklė → generate → QA.                                                      | **Lock / frozen-ref artifact** ant spine           |
| **13.325** | `m13_consistency_lab`  | **Lab:** Drift + Ref checklist (ChoiceControl ×5; Shell=Ne).                                              | Lab surface (ne process twin)                      |
| **13.52**  | `m13_postprod_steps`   | **Post-prod:** Cut → Grade → Mix → Export.                                                                | **Timeline / strip** (laiko metafora)              |
| **150.25** | `m15_practice_loop`    | **Projekto kelias:** greitas vs optional pilnas.                                                          | Dual-path (jau atskira)                            |

> **S4-INDIV (2026-07-30):** sibling keys su skirtingais labeliais, bet ta pačia vertical-stack forma = clone debt. DoD = mokinys atskiria schemas be step text. `VerticalFlowDiagram` pixel-parity extract **nėra** epic DoD. Auditas: [M13_M15_SCHEME_AUDIT.md](M13_M15_SCHEME_AUDIT.md).

M14 – schemų nėra.

## Content tones (GOLDEN §6b)

> Token SOT: `contentTrackTokens.ts`. SoftRose = SVG bg end; step fills = `DiagramTone` (ne rose boxes).

| Image key              | SoftRose bg                                                       | Step tones (index order)                            |
| ---------------------- | ----------------------------------------------------------------- | --------------------------------------------------- |
| `m13_aec_funnel`       | Taip                                                              | brand, amber, emerald                               |
| `m13_prompt_stack`     | Taip                                                              | slate, brand, amber (bottom→top)                    |
| `m13_media_pipeline`   | Taip                                                              | brand, slate, amber, amber, slate, emerald          |
| `turinio_workflow`     | Taip                                                              | brand, amber, amber, slate, slate, emerald, emerald |
| `m13_consistency_lock` | Taip                                                              | amber, brand, amber, emerald                        |
| `m13_postprod_steps`   | Taip                                                              | brand, amber, slate, emerald                        |
| `m13_rule_of_thirds`   | Taip                                                              | — (amber focal dots lieka)                          |
| `m15_practice_loop`    | Taip                                                              | path emerald/amber **neliečiami**                   |
| `m13_consistency_lab`  | Lab soft shell + Drift Before/After (Before muted; After emerald) | Choice = brand-only                                 |

## Registry

| Modulis / skaidrė | Image key              | Pattern                 | Shell | Content / layout SOT                                                      | Testai                     | Būsena                   |
| ----------------- | ---------------------- | ----------------------- | ----- | ------------------------------------------------------------------------- | -------------------------- | ------------------------ |
| M13 / 13.1        | `m13_aec_funnel`       | comparison / funnel     | Taip  | `m13DiagramContent.ts`, `funnelStackGeometry.ts`, `m13AecFunnelMotifs.ts` | nav ×3 + dark; wow P1–P4   | Type Etalon W3 + tones   |
| M13 / 13.2        | `m13_prompt_stack`     | stack                   | Taip  | `m13DiagramContent.ts`, `funnelStackGeometry.ts`                          | nav ×3 + dark              | Type Etalon W3 + tones   |
| M13 / 13.33       | `m13_rule_of_thirds`   | illustration            | Ne    | `m13DiagramContent.ts`                                                    | LT/EN + dark; S5-THIRDS    | OK + subject-focus-right |
| M13 / 13.12       | `m13_media_pipeline`   | linear-process          | Taip  | `m13MediaPipelineContent.ts`; metaphor **linear**                         | nav ×6; S4 etalon          | linear + tones           |
| M13 / 13.32       | `m13_consistency_lock` | linear-process          | Taip  | `m13ConsistencyLockContent.ts`; metaphor **lock-artifact**                | nav ×4; S4 done            | lock-artifact + tones    |
| M13 / 13.325      | `m13_consistency_lab`  | interactive-control-lab | Ne    | `m13ConsistencyLabContent.ts`; Feature Doc `M13_CONSISTENCY_LOCK_LAB.md`  | Ref + Drift + Before/After | OK + track soft          |
| M13 / 13.52       | `m13_postprod_steps`   | linear-process          | Taip  | `m13PostprodContent.ts`; metaphor **timeline** (horizontal)               | nav ×4; S4 done            | timeline + tones         |
| M13 / 13.11       | `turinio_workflow`     | linear-process          | Taip  | `m13BusinessWorkflowContent.ts`; metaphor **cycle** + return path         | nav ×7; S4 done            | cycle + tones            |
| M13 / 13.37       | _(slide-type)_         | special                 | Ne    | `VaizdoGeneratoriusSlide` (+ palette swatches)                            | quality N/9 + swatches     | OK                       |
| M13 / 13.47       | _(slide-type)_         | special                 | Ne    | `I2vGeneratoriusSlide` (+ palette swatches); `M13_I2V_CLIP_BUILDER.md`    | readiness N/4              | OK                       |
| M15 / 150.25      | `m15_practice_loop`    | dual-path               | Taip  | `m15PracticeLoopContent.ts`, `m15PracticeLoopLayout.ts`                   | nav ×5 + layout test       | OK + softRose bg         |

## Priėmimo vartai

1. Naujas `image` raktas → registry prieš JSON.
2. Procesinė schema → `InteractiveDiagramShell` + `DiagramStepHitArea`.
3. LT + EN overlay; core m1-m6/m1-m9 neliečiama.
4. Dark via `useDiagramPalette` frame (+ `getContentTrackColors` softRose).
5. Content tones maps match registry table (GOLDEN §6b).
6. M13–15 scheme ROI: I0–I5 + **S5-THIRDS** + **S4-INDIV** done (linear / lock-artifact / timeline / cycle). Content dens 13.3/13.4 = **`M1315-DENS` done** 2026-07-31. Žr. `M13_M15_SCHEME_AUDIT.md`.
