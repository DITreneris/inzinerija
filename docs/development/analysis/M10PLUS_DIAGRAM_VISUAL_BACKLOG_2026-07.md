# M10+ Diagram Visual Backlog – 2026-07

> Scope: read-only visual backlog for M10+ React diagrams after the M1–M9 design-system repair pass. This is not an implementation plan for the current sprint.

## Summary

M10+ diagram routing is already guarded through `diagramRenderers.tsx`, and the active blocks use `EnlargeableDiagram` with `mobileBehavior="reflow"`. The remaining risk is visual quality, not routing correctness.

**Automated gates (2026-07-05):** `validate:schema`, `lint`, 48 diagram tests (`diagramRenderers` + `DiagramLocalization`), `audit:en-coverage-m10-12`, `typecheck` – PASS. **Rankinė browser smoke** (10.2, 10.45, 10.49, 10.65, 120.5; LT/EN; light/dark; modal) – Release QA #6, neblokuoja commit.

## Premium SaaS Rubric

| Area         | Check                                                                                   |
| ------------ | --------------------------------------------------------------------------------------- |
| Readability  | Labels readable in slide view and full-size modal without zoom.                         |
| Active state | Interactive diagrams have a selected state beyond color alone.                          |
| Shell        | Diagram sits in a deliberate panel/chrome, not as a loose SVG.                          |
| Dark mode    | SVG background, text, and strokes remain readable in dark mode.                         |
| Token drift  | Local hex/arbitrary classes are reduced only when they are not diagram-specific tokens. |

## Backlog Matrix

| Priority | Diagram                                                         | Current status                                                                       | Next action                                                                                                        |
| -------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Done     | `M10ToolDecisionTreeDiagram.tsx`                                | SVG interaction kept as a spatial exception; selected state and keyboard path exist. | Focus-visible equivalent added with a separate gold dashed outline so keyboard focus is visible before activation. |
| Done     | `M10AgentTaxonomyDiagram.tsx`                                   | Layout SOT added; role edges now use directed marker arrows and palette chrome.      | Manual light/dark smoke before release.                                                                            |
| Done     | `M10WorkflowSpecDiagram.tsx` + `M10IncidentPlaybookDiagram.tsx` | Former dense spec/incident combination split into two readable diagrams.             | Manual light/dark smoke before release.                                                                            |
| Done     | `M10LearningLoopDiagram.tsx`                                    | Layout SOT + 4-step `InteractiveDiagramShell`; dark-mode chrome via palette.         | 9-node step nav remains deferred in `TODO.md`.                                                                     |
| Done     | `M12MultiAgentSchemaDiagram.tsx`                                | Output box widened; 6-step `InteractiveDiagramShell`; SVG hit zones pointer-only.    | Evaluator feedback loop remains deferred in `TODO.md`.                                                             |
| Done     | `M10TriggerFlowDiagram.tsx`                                     | Static workflow chain; title/box chrome now uses palette.                            | Optional webhook polygon remains deferred in `TODO.md`.                                                            |
| P2       | `M10ThreeAStrategyDiagram.tsx`                                  | Static strategy layout; likely safe visual-only polish.                              | Check 80/15/5 label hierarchy and mobile reflow.                                                                   |
| P2       | `M12ThreeLabsDiagram.tsx`                                       | Static three-part model.                                                             | Verify full-size modal readability and dark mode.                                                                  |
| P2       | `M13AecFunnelDiagram.tsx`                                       | Static funnel.                                                                       | Check small label contrast and funnel segment spacing.                                                             |
| P2       | `M13PromptStackDiagram.tsx`                                     | Static stack.                                                                        | Check text density and whether `diagramTokens` can replace local palette.                                          |
| P2       | `M13RuleOfThirdsDiagram.tsx`                                    | Static grid.                                                                         | Check grid line contrast in dark mode.                                                                             |
| P2       | `M15PracticeLoopDiagram.tsx`                                    | Static loop.                                                                         | Check cycle arrows, active emphasis, and mobile readability.                                                       |

## Guardrails

- Do not mix M10+ visual polish with M1–M9 a11y migrations in one change.
- Do not change `modules.json` copy for this track.
- Treat local diagram palettes as acceptable until a specific visual or dark-mode issue is confirmed.
- Run targeted diagram tests and a manual browser smoke before promoting any P1/P2 item to implementation.
