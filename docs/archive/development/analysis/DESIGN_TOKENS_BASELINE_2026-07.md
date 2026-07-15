# Design tokens baseline – 2026-07

> Scope: readonly baseline for the Design System Revision Plan. This document records the state before the July repair pass; it is not a release approval.

## Summary

Source command:

```bash
node scripts/audit-design-tokens.mjs --json --top=20
```

Result:

| Metric                            | Count |
| --------------------------------- | ----: |
| Scanned files                     |   194 |
| Hex literals                      |   346 |
| Inline style findings             |    13 |
| SVG fill/stroke literals          |   100 |
| Tailwind arbitrary class findings |    80 |
| Total findings                    |   539 |

`scripts/audit-design-tokens.mjs` is already wired as `npm run audit:design-tokens` and remains warn-only.

## Current Trend After Leftovers Pass

Source command:

```bash
npm run audit:design-tokens
```

Result after targeted `ContentSlides.tsx` arbitrary-class cleanup:

| Metric                            | Count |
| --------------------------------- | ----: |
| Scanned files                     |   194 |
| Hex literals                      |   343 |
| Inline style findings             |    12 |
| SVG fill/stroke literals          |   100 |
| Tailwind arbitrary class findings |    66 |
| Total findings                    |   521 |

Trend: total findings `539 → 521`; arbitrary class findings `80 → 66`; inline style findings `13 → 12`. `diagramTokens.ts` remains the top file by count because it intentionally centralizes diagram palette literals.

## DS Hardening Stamp (2026-07-08)

Phase 0–5 pilot complete. Regression gate: `npm run audit:design-tokens:gate` now tracks the DS Next Waves W7–W10 baseline (total **417**, arbitrary **59**). **Post-wave run (2026-07-08):** total **417** (hex 295, inline 12, svg 51, arbitrary **59**) — gate PASS. Primitive adoption: `<Banner>` production usages ≥35, `<CTAButton>` ≥30. Ongoing backlog: optional ContentSlides `border-l-4` batch (W7d), plus specialized out-of-scope controls such as `HandoutDownloadButton`.

## Main Drift Categories

| Category                | Evidence                                                                                                                                                                                                              | Risk                                                                                                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Diagram token literals  | `src/components/slides/shared/diagramTokens.ts` is the top source by count, but many values are intentional SVG palette tokens.                                                                                       | Low when centralized; high if copied into individual diagrams.                                             |
| Legacy diagram palettes | Multiple `src/components/slides/shared/*Diagram*.tsx` files still carry local hex or SVG color literals.                                                                                                              | Dark mode drift and inconsistent brand semantics.                                                          |
| JSX arbitrary styling   | `audit-design-tokens` now counts arbitrary Tailwind classes such as `shadow-[...]`, `min-w-[...]`, and `text-[...]`. The 2026-07 repair removed the section-break badge hotspot (`border-[#DCE3EA]`, `bg-[#F5F7FA]`). | Harder to audit and easy to diverge from GOLDEN_STANDARD; reduce by targeted hotspots, not broad rewrites. |
| Inline style colors     | 13 findings, mostly places where runtime values or SVG/chart code need special handling.                                                                                                                              | Accept only with documented exception.                                                                     |

## Sticky Offset Baseline

Expected pattern after AppNav: `top-[var(--app-nav-height,4rem)]`.

| File                                                          | Current finding                                                       | Action                                              |
| ------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------- |
| `src/components/AppNav.tsx`                                   | `sticky top-0 z-40` + `surfaceGlass.shell`                            | OK. AppNav owns the top layer.                      |
| `src/components/ModuleView.tsx`                               | `sticky top-[var(--app-nav-height,4rem)] z-20` + `surfaceGlass.shell` | OK. Reference implementation.                       |
| `src/components/GlossaryPage.tsx`                             | `stickyClasses.belowAppNavLow`                                        | OK. Fixed 2026-07 (DS Phase 1).                     |
| `src/components/slides/types/TestPracticeSlides.tsx`          | `stickyClasses.belowAppNavLow` + `surfaceGlass.shell`                 | OK. Fixed 2026-07 (DS Phase 1).                     |
| `src/components/slides/types/content/IntroActionPieSlide.tsx` | modal-local `sticky top-0`                                            | Keep. It is inside a modal panel, not under AppNav. |

## SVG Keyboard Baseline

New kit standard: HTML `DiagramStepNav` owns keyboard focus; SVG hit areas should be pointer-only through `DiagramStepHitArea`.

Representative legacy files with SVG `role="button"` and/or `tabIndex`:

- `src/components/slides/shared/RlProcessDiagram.tsx`
- `src/components/slides/shared/DiPrezentacijosWorkflowDiagram.tsx`
- `src/components/slides/shared/TurinioWorkflowDiagram.tsx`
- `src/components/slides/shared/LlmAutoregressiveDiagram.tsx`
- `src/components/slides/shared/M10ToolDecisionTreeDiagram.tsx`
- `src/components/slides/shared/AgentWorkflowDiagram.tsx`
- `src/components/slides/shared/ContextEngineeringPipelineDiagram.tsx`
- `src/components/slides/shared/WorkflowComparisonDiagram.tsx`
- `src/components/slides/shared/RagDuomenuRuosimasDiagram.tsx`
- `src/components/slides/shared/Schema3InteractiveDiagram.tsx`
- `src/components/slides/shared/CustomGptProcessDiagram.tsx`

These are not all P0 fixes. They become migration targets only when the paired block has an HTML keyboard path through `InteractiveDiagramShell`.

2026-07 follow-up classification:

- Migrated to pointer-only SVG hit areas: `RlProcessDiagram.tsx`, `DiPrezentacijosWorkflowDiagram.tsx`, `TurinioWorkflowDiagram.tsx`, `AgentWorkflowDiagram.tsx`, `CustomGptProcessDiagram.tsx`, plus M7–M9 DiagramKit diagrams guarded in `DiagramLocalization.test.tsx`.
- Deferred with explicit risk: `WorkflowComparisonDiagram.tsx` and `ContextEngineeringPipelineDiagram.tsx`, because they combine spatial click targets with comparison/mode/hover behavior and need dedicated keyboard-path review.
- Archived exception: `Schema3InteractiveDiagram.tsx` is marked deprecated / not wired to learner slides; do not refactor unless it is reactivated.
- M10+ follow-up: `M10ToolDecisionTreeDiagram.tsx` remains a P0 item in `M10PLUS_DIAGRAM_VISUAL_BACKLOG_2026-07.md` because its spatial tree selection needs a specific a11y decision.

## Baseline Rules

- Do not treat centralized token files as equal severity to component-local hardcoded values.
- New hardcoded hex in React component JSX should require a documented exception.
- Diagram migration should reduce local palette usage and must not add duplicate SVG keyboard paths.
- Phase 1 should reduce sticky and touch/focus risk before broader token refactors.
