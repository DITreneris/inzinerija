# M10+ Diagram Visual Backlog – 2026-07

> Scope: read-only visual backlog for M10+ React diagrams after the M1–M9 design-system repair pass. This is not an implementation plan for the current sprint.

## Summary

M10+ diagram routing is already guarded through `diagramRenderers.tsx`, and the active blocks use `EnlargeableDiagram` with `mobileBehavior="reflow"`. The remaining risk is visual quality, not routing correctness.

## Premium SaaS Rubric

| Area         | Check                                                                                   |
| ------------ | --------------------------------------------------------------------------------------- |
| Readability  | Labels readable in slide view and full-size modal without zoom.                         |
| Active state | Interactive diagrams have a selected state beyond color alone.                          |
| Shell        | Diagram sits in a deliberate panel/chrome, not as a loose SVG.                          |
| Dark mode    | SVG background, text, and strokes remain readable in dark mode.                         |
| Token drift  | Local hex/arbitrary classes are reduced only when they are not diagram-specific tokens. |

## Backlog Matrix

| Priority | Diagram                          | Current status                                                                             | Next action                                                                                                                         |
| -------- | -------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| P0       | `M10ToolDecisionTreeDiagram.tsx` | Interactive selected state and SVG keyboard path exist; needs a11y decision before polish. | Decide whether to migrate to HTML nav + pointer-only hit zones or document as an exception because tree leaves are spatial choices. |
| P1       | `M10AgentTaxonomyDiagram.tsx`    | Highest M10+ token count in current audit; likely local palette-heavy.                     | Token/readability pass after M1–M9 keyboard work is stable.                                                                         |
| P1       | `M10SpecIncidentDiagram.tsx`     | Workflow/playbook comparison can become dense in slide view.                               | Screenshot-level font/contrast audit in light and dark modes.                                                                       |
| P1       | `M10TriggerFlowDiagram.tsx`      | Static workflow chain; lower a11y risk, still local SVG palette.                           | Align frame/background/stroke with `diagramTokens` if visual parity holds.                                                          |
| P2       | `M10ThreeAStrategyDiagram.tsx`   | Static strategy layout; likely safe visual-only polish.                                    | Check 80/15/5 label hierarchy and mobile reflow.                                                                                    |
| P2       | `M12ThreeLabsDiagram.tsx`        | Static three-part model.                                                                   | Verify full-size modal readability and dark mode.                                                                                   |
| P2       | `M13AecFunnelDiagram.tsx`        | Static funnel.                                                                             | Check small label contrast and funnel segment spacing.                                                                              |
| P2       | `M13PromptStackDiagram.tsx`      | Static stack.                                                                              | Check text density and whether `diagramTokens` can replace local palette.                                                           |
| P2       | `M13RuleOfThirdsDiagram.tsx`     | Static grid.                                                                               | Check grid line contrast in dark mode.                                                                                              |
| P2       | `M15PracticeLoopDiagram.tsx`     | Static loop.                                                                               | Check cycle arrows, active emphasis, and mobile readability.                                                                        |

## Guardrails

- Do not mix M10+ visual polish with M1–M9 a11y migrations in one change.
- Do not change `modules.json` copy for this track.
- Treat local diagram palettes as acceptable until a specific visual or dark-mode issue is confirmed.
- Run targeted diagram tests and a manual browser smoke before promoting any P1/P2 item to implementation.
