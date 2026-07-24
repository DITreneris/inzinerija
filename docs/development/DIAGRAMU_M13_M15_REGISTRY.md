# M13–M15 schemų registry

> Tikslas: viena prižiūrima vieta Turinio inžinerijos kelio (M13–15) schemų routing, interaktyvumo, layout SOT ir testų būsenai.
> M7–12 etalonas: [DIAGRAMU_M7_M12_REGISTRY.md](DIAGRAMU_M7_M12_REGISTRY.md). Kit: [DIAGRAM_KIT_STANDARD.md](DIAGRAM_KIT_STANDARD.md).

## Semantinis skirtumas (be dublio)

| Skaidrė    | Image key              | Mokymo fokusas                                                                 |
| ---------- | ---------------------- | ------------------------------------------------------------------------------ |
| **13.12**  | `m13_media_pipeline`   | **Techninė** medijos grandinė: brief → stills → refs → I2V → garsas/edit → QA. |
| **13.11**  | `turinio_workflow`     | **Verslo** ciklas: brief → prompt → variantai → A/B → optimizacija.            |
| **13.32**  | `m13_consistency_lock` | **Reference lock:** refs → taisyklė → generate → QA.                           |
| **13.52**  | `m13_postprod_steps`   | **Post-prod:** Cut → Grade → Mix → Export.                                     |
| **150.25** | `m15_practice_loop`    | **Projekto kelias:** greitas vs optional pilnas.                               |

M14 – schemų nėra.

## Registry

| Modulis / skaidrė | Image key              | Pattern             | Shell | Content / layout SOT                                                         | Testai               | Būsena               |
| ----------------- | ---------------------- | ------------------- | ----- | ---------------------------------------------------------------------------- | -------------------- | -------------------- |
| M13 / 13.1        | `m13_aec_funnel`       | comparison / funnel | Taip  | `m13DiagramContent.ts`, `funnelStackGeometry.ts`                             | nav ×3 + dark        | Type Etalon W3       |
| M13 / 13.2        | `m13_prompt_stack`     | stack               | Taip  | `m13DiagramContent.ts`, `funnelStackGeometry.ts`                             | nav ×3 + dark        | Type Etalon W3       |
| M13 / 13.33       | `m13_rule_of_thirds`   | illustration        | Ne    | `m13DiagramContent.ts`                                                       | LT/EN + dark         | OK                   |
| M13 / 13.12       | `m13_media_pipeline`   | linear-process      | Taip  | `m13MediaPipelineContent.ts`, `verticalFlowGeometry`, `diagramLayoutMath`    | nav ×6               | Type Etalon W2 spine |
| M13 / 13.32       | `m13_consistency_lock` | linear-process      | Taip  | `m13ConsistencyLockContent.ts`, `diagramLayoutMath`                          | nav ×4               | Type Etalon W2 spine |
| M13 / 13.52       | `m13_postprod_steps`   | linear-process      | Taip  | `m13PostprodContent.ts`, `diagramLayoutMath`                                 | nav ×4               | Type Etalon W2 spine |
| M13 / 13.11       | `turinio_workflow`     | linear-process      | Taip  | `m13BusinessWorkflowContent.ts`, `verticalFlowGeometry`, `diagramLayoutMath` | nav ×7               | Type Etalon W2 spine |
| M15 / 150.25      | `m15_practice_loop`    | dual-path           | Taip  | `m15PracticeLoopContent.ts`, `m15PracticeLoopLayout.ts`                      | nav ×5 + layout test | OK                   |

## Priėmimo vartai

1. Naujas `image` raktas → registry prieš JSON.
2. Procesinė schema → `InteractiveDiagramShell` + `DiagramStepHitArea`.
3. LT + EN overlay; core m1-m6/m1-m9 neliečiama.
4. Dark via `useDiagramPalette` frame.
