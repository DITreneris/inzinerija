# Design System Revision – 2026-07

> Purpose: execution target for the July design-system repair pass. This is a consolidation and risk-reduction effort, not a redesign.

## Scope

This revision continues the existing `DESIGN_SYSTEM_V0_2.md` / v0.3 direction:

- keep `GOLDEN_STANDARD.md` as the non-breaking product standard;
- reduce a11y and sticky regressions first;
- improve token ownership and primitive adoption through small pilots;
- migrate diagrams in batches through `DIAGRAM_KIT_STANDARD.md`;
- avoid learner-content edits.

## Non-goals

- No new product palette.
- No broad `ContentSlides.tsx` rewrite.
- No complete `.btn-*` / `.card` removal.
- No `modules.json` copy changes.
- No `LlmArchDiagramDiagram.tsx` migration in the shared diagram stream.

## Baseline

Current metrics live in `docs/archive/development/analysis/DESIGN_TOKENS_BASELINE_2026-07.md`.

Key starting points:

- `npm run audit:design-tokens` is present and warn-only.
- `ModuleView.tsx` is the sticky offset reference.
- `diagramKit.tsx` is the interactive diagram reference.
- Legacy SVG keyboard paths remain migration targets, not all-at-once fixes.

## Execution Rule

Prefer one small, verifiable change per pass:

1. P0 a11y and sticky fixes.
2. Token helper adoption pilots.
3. UI primitive adoption pilots.
4. Diagram shell/palette migrations.
5. CSS arbitrary-value cleanup.
6. QA gates and documentation.

Each pass should state which `GOLDEN_STANDARD.md` / `UI_UX_AGENT.md` rule it improves.
