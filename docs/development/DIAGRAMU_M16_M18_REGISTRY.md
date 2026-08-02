# M16–M18 schemų registry (Kodo inžinerija)

> Tikslas: viena prižiūrima vieta Kodo inžinerijos kelio (M16–18) signature schemų routing, metaforų ir TE būsenai.  
> **Master:** [TEACHING_ELEMENTS_REGISTRY.md](TEACHING_ELEMENTS_REGISTRY.md) + [teaching-elements-overlay.json](teaching-elements-overlay.json).  
> **Open tickets:** [`TODO.md`](../../TODO.md) §1.2g `TE-M1618-*`. SOT: [`turinio_pletra_moduliai_16_17_18.md`](../turinio_pletra_moduliai_16_17_18.md) §5. Eilė: [`MODULIO_16_SKAIDRIU_EILES.md`](../MODULIO_16_SKAIDRIU_EILES.md).  
> **Kit:** [DIAGRAM_KIT_STANDARD.md](DIAGRAM_KIT_STANDARD.md). Enlarge: default OFF (SCHEME §3.11).

## Semantinis skirtumas (S4-INDIV)

| Skaidrė              | Image key            | Mokymo fokusas                                         | Visual metaphor                       |
| -------------------- | -------------------- | ------------------------------------------------------ | ------------------------------------- |
| **16.3**             | `m16_delivery_gates` | Delivery kelias iki brief/testo (ne Cursor build)      | Checkpoint **gates** corridor         |
| **16.101**           | `m16_vsr_maturity`   | Vibe → Skeleton → Refinement (brief fazės)             | 3-phase **maturity ladder**           |
| **16.16** / **18.3** | `m16_user_cycle`     | Naudotojo ciklas Triggeris→…→Kitas (shared key)        | **Cycle** with return                 |
| **18.12**            | `m18_packet_stack`   | BUILD PACKET failų sluoksniai                          | **Packet stack** layers               |
| **18.201**           | `m18_diff_ritual`    | Git sauga: status→**diff**→smoke→commit→push           | Process + **diff magnifier** emphasis |
| **18.19**            | `m18_launch_gates`   | Paleidimo vartai VEIKIA→…→STEBIMA (APSAUGOTA pabrėžta) | Horizontal **tollgate barriers**      |

> **S4-INDIV:** sibling keys su swapped labeliais ant tos pačios VerticalFlow formos = clone debt. DoD = mokinys atskiria schemas be step text. Ne 8–10 thin process Shell.

M17 – Path Test shell only (be diagram `image` keys).

## WON’T (schemos)

| Draudžiama                                          | Kodėl                                  |
| --------------------------------------------------- | -------------------------------------- |
| 8–10 thin process Shell su swapped labeliais        | M13 pre-S4 clone debt                  |
| Live Cursor / IDE-in-app                            | SOT WON’T                              |
| ChoiceControl lab prieš Must lenteles + 4–5 schemas | Feature Doc disciplina (`TE-M1618-S1`) |
| Naujas `SlideType` kiekvienam artefaktui            | Prefer embed / diagram / lab           |
| Desktop „Išskleisti schemą“ ant interactive Shell   | `showEnlargeControl` default false     |

## Registry

| Modulis / skaidrė        | Image key            | Pattern        | Shell | Content / layout SOT                                                | Testai        | Būsena         |
| ------------------------ | -------------------- | -------------- | ----- | ------------------------------------------------------------------- | ------------- | -------------- |
| M16 / 16.3               | `m16_delivery_gates` | linear-process | Taip  | `m16M18DiagramContent.ts` + `M16DeliveryGatesDiagram` (gates posts) | nav ×6 + dark | ✅ implemented |
| M16 / 16.101             | `m16_vsr_maturity`   | stack          | Taip  | `m16M18DiagramContent.ts` + `M16VsrMaturityDiagram` (ladder)        | nav ×3 + dark | ✅ implemented |
| M16 / 16.16 · M18 / 18.3 | `m16_user_cycle`     | cycle-feedback | Taip  | `m16M18DiagramContent.ts` + `M16UserCycleDiagram` (return U)        | nav ×5 + dark | ✅ implemented |
| M18 / 18.12              | `m18_packet_stack`   | stack          | Taip  | `m16M18DiagramContent.ts` + `M18PacketStackDiagram` (file tabs)     | nav ×5 + dark | ✅ implemented |
| M18 / 18.201             | `m18_diff_ritual`    | linear-process | Taip  | `m16M18DiagramContent.ts` + `M18DiffRitualDiagram` (magnifier)      | nav ×5 + dark | ✅ implemented |
| M18 / 18.19              | `m18_launch_gates`   | linear-process | Taip  | `m16M18DiagramContent.ts` + `M18LaunchGatesDiagram` (tollgates)     | nav ×5 + dark | ✅ implemented |

### Tables (Shell Ne)

| Skaidrė   | elementId            | Notes                                         |
| --------- | -------------------- | --------------------------------------------- |
| **16.25** | `table:m16:16.25:s1` | Stack map roles (Cursor-first; not tool fair) |

### Should / Could (ne Must)

| Elementas                      | elementId / key                    | Pattern                       | Shell | Status                                                                                  |
| ------------------------------ | ---------------------------------- | ----------------------------- | ----- | --------------------------------------------------------------------------------------- |
| Direction picker (16.14–16.15) | `lab:m16_direction_picker`         | interactive-control-lab       | Ne    | Should S1 ✅ — `M16DirectionPickerLabBlock` + Feature Doc `M16_DIRECTION_PICKER_LAB.md` |
| Launch gates (18.19)           | `diagram:m18_launch_gates`         | linear-process                | Taip  | Should S2 ✅ — tollgate barriers (≠ delivery corridor)                                  |
| Chaos\|Control (18.1)          | comparison table / static          | content-block                 | Ne    | Should S3 ✅                                                                            |
| Mini entities (18.4)           | static                             | illustration                  | Ne    | Should S3 ✅                                                                            |
| `.env` contrast (18.17)        | `embed:toolChoiceBar:m18:18.17:s1` | embed (manipulation-contrast) | Ne    | Could C2 ✅ — M7/67 brother                                                             |
| PACKET desk                    | `lab:m18_packet_desk`              | interactive-control-lab       | Ne    | Could C1 — Feature Doc (parked / sales gate)                                            |

## Priėmimo vartai

1. Naujas `image` raktas → šis registry **+** master overlay **prieš** JSON.
2. Procesinė schema → `InteractiveDiagramShell` + `DiagramStepHitArea`; enlarge default OFF.
3. LT `modules.json` + EN `modules-en-m16-m18` (`build:modules-en-m16-m18`); **ne** `generate:core-data`.
4. Dark via `useDiagramPalette`.
5. `npm run audit:teaching-elements -- --strict` po overlay eilučių.
6. Metaforos unikalios (gates / ladder / cycle / stack / magnifier / tollgates) — ne VerticalFlow facades.

## Sinchronas

| Etapas                   | Būsena                                                        |
| ------------------------ | ------------------------------------------------------------- |
| TE-M1618-0 intake freeze | ✅ 2026-08-01 (šis failas)                                    |
| Must schemas I3          | ✅ 2026-08-01                                                 |
| Overlay + audit M4       | ✅ `audit:teaching-elements:strict` green                     |
| Prompt maturity S4       | ✅ [`M16_M18_PROMPT_MATURITY.md`](M16_M18_PROMPT_MATURITY.md) |
