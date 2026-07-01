# Diagram kit standard

> Scope: reusable interactive React diagrams in learner slides, especially M7–M9 data analysis diagrams.

## Required pattern

New step-based diagrams should follow the same chain:

1. Labels and explanations live in a locale content helper (`m7DiagramContent.ts`, `m9DataWorkflowContent.ts`, or module-specific equivalent).
2. Geometry lives in constants or a layout helper (`verticalFlowGeometry.ts` when the diagram is a vertical flow).
3. The SVG component renders only the diagram view.
4. The block component wraps it with `EnlargeableDiagram` and `InteractiveDiagramShell`.
5. `diagramRenderers.tsx` maps the JSON `sections[].image` key to the React block.

## Interaction and accessibility

- Use `DiagramStepNav` as the keyboard path. It owns focus rings, `aria-current`, and numbered step buttons.
- Use `DiagramStepHitArea` for pointer-only SVG hit zones. Do not add `role="button"` or `tabIndex={0}` inside SVG hit rectangles.
- Keep the selected step visible through `DiagramStatusBadge` and the explanation block below the diagram.

## Tokens and dark mode

- Use `DIAGRAM_TOKENS.typography` for SVG text sizes.
- Use `DIAGRAM_TOKENS.radius`, `stroke`, and `arrow.markerPath` instead of hardcoded repeated SVG values.
- Use `useDiagramPalette()` for SVG background, border, flow lines, and dark/light text colors.
- Keep local semantic tone gradients (`DIAGRAM_TONE_COLORS`) only for step boxes where the tone carries meaning.

## Tests

Every migrated diagram should have tests that verify:

- LT/EN visible labels render from the locale helper.
- The number of `nav button` elements matches the number of steps.
- Dark mode uses the dark SVG background palette.
- SVG internals do not expose duplicate keyboard buttons (`svg [role="button"]`, `svg [tabindex="0"]`).
