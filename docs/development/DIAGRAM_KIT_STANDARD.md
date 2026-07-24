# Diagram kit standard

> Scope: reusable interactive React diagrams in learner slides (M7–M15 process schemas + M1–6 kit diagrams).

## Required pattern

New step-based diagrams should follow the same chain:

1. Labels and explanations live in a locale content helper (`m7DiagramContent.ts`, `m9DataWorkflowContent.ts`, or module-specific equivalent).
2. Geometry lives in constants or a layout helper (`verticalFlowGeometry.ts` when the diagram is a vertical flow; `diagramLayoutMath.ts` for centering / shaft floors).
3. The SVG component renders only the diagram view.
4. The block component wraps it with `EnlargeableDiagram` and `InteractiveDiagramShell`.
5. `diagramRenderers.tsx` maps the JSON `sections[].image` key to the React block.

## Shell density (LMS polish)

- `InteractiveDiagramShell` accepts `density="default" | "hero"`.
- **Process diagrams default to `hero`:** lighter status, secondary step nav, explanation as `border-l` (no heavy card).
- **`default`:** full badge + card explanation (legacy / dense optional slides only).
- Nav 1–N **always** remains (keyboard path). Do not remove for “premium” looks.
- `stepOfLabel` („Žingsnis N iš T“ + title pill) is **opt-in** per Block (pilot: AgentWorkflow).
- Cycle-feedback checklist: `SCHEME_AGENT.md` §3.7; LMS targets: [`LMS_DIAGRAM_POLISH_10_2.md`](LMS_DIAGRAM_POLISH_10_2.md).

## Tokens and dark mode (LMS floors – DS promote)

Canonical [`diagramTokens.ts`](../../src/components/slides/shared/diagramTokens.ts):

| Token                                     | LMS floor                                        |
| ----------------------------------------- | ------------------------------------------------ |
| `opacity.inactive` / `inactiveSoft`       | ≥ **0.88** (no grey wash)                        |
| `stroke.flow` / `flowStrong` / `feedback` | ≥ **3.5**                                        |
| `arrow.markerUnits`                       | **`userSpaceOnUse`** (required with flow stroke) |
| `arrow.processTipLen`                     | **10** (LMS process tip; use with `refX=0`)      |
| `arrow.markerLen`                         | **6** = **legacy** only (not process tip)        |
| `typography.title.desktop`                | **17**                                           |
| `typography.titleWeight`                  | **700**                                          |
| `typography.edgeLabel`                    | **12 / 500**                                     |

- Prefer these over hardcoded `0.45` / `strokeWidth="2"`.
- Process `<marker>` + `stroke.flow`: always set `markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}` so tip size stays in user units (default `strokeWidth` scaling swallows the shaft).
- LMS forward tips: `DIAGRAM_TOKENS.arrow.processTipLen` + [`processArrowMarker.ts`](../../src/components/slides/shared/processArrowMarker.ts) (`getProcessArrowMarkerGeom`, `refX=0`). **Do not** change global `markerLen` to 10; never assert `processTipLen === markerLen`.
- `DIAGRAM_TOKENS.lmsCycle` is a **deprecated alias** of the same floors (W1 call sites).
- Use `useDiagramPalette()` for SVG background, border, flow colors.
- Keep local semantic tone gradients (`DIAGRAM_TONE_COLORS`) only where tone carries meaning.
- **Do not** copy AgentWorkflow `BOX` / viewBox sizes into other types.

## Layout helpers

- `centerAxisStart(viewBox, content)` – equal side margins (SCHEME §2).
- `buildVerticalColumnOrigin({ viewBoxW, colW })` – centered `colsX` + `cx` for vertical spines (Type Etalon W2).
- `verticalColumnMarginsEqual` – L/R margin guard for tests.
- `visibleShaftLen` / `visibleShaftMeetsFloor` – shaft floor (default tip = `processTipLen`).
- `getProcessArrowMarkerGeom` / `processArrowEndInset` – LMS process marker + line-end inset.
- Vertical spines: `verticalFlowGeometry.ts` + linear etalon `M7DaPipelineDiagram`.
- Cycle-feedback: `cycleFeedbackGeometry.ts` – `horizontalRowBoxes`, `feedbackUPath` (Type Etalon W1).
- Funnel/stack: `funnelStackGeometry.ts` – `funnelStageWidths` / `funnelStageRects` / `stackColumnRects` (Type Etalon W3). Stack GAP etalon **18** (no connectors).

## Type etalons (uniqueness)

| Type                                        | Etalon                                                        | Preserve                                                                                                                                   | Wave             |
| ------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| cycle-feedback                              | `agent_workflow_diagram` (M10.2) + `cycleFeedbackGeometry`    | N + U feedback topology; own BOX sizes                                                                                                     | ✅ W1            |
| linear-process (vertical)                   | `m7_da_pipeline` + `buildVerticalColumnOrigin`                | Vertical spine; no U loop; own BOX                                                                                                         | ✅ W2            |
| linear-process (HTML horizontal cards)      | `strukturuotas_procesas` / `StrukturuotasProcesasDiagram`     | 3-step IPO cards + bullets; Shell = Taip; **not** vertical spine helpers                                                                   | ✅ HTML          |
| linear-process (HTML icon-chain + autoplay) | `hallucination-pipeline` / `HallucinationPipelineBlock`       | 5 icon cards + captions; `useAutoplaySteps` (pause-on-pin); Shell = Taip; explanation = caption only; **not** SVG spine                    | ✅ HTML autoplay |
| funnel / stack                              | `m13_aec_funnel` / `m13_prompt_stack` + `funnelStackGeometry` | Funnel narrowing / stack depth                                                                                                             | ✅ W3            |
| dual-taxonomy (superseded)                  | ~~`m10_agent_taxonomy` Shell~~ → lab hybrid                   | **Superseded 2026-07-24:** Pattern `interactive-control-lab` (Shell=Ne) – `M10DepthRolesLabBlock` + static mini SVG; ne 8-step Shell spine | ⛔ W5 archived   |
| multi-agent-flow                            | `m10_agent_orchestrator` + `orchestratorRetryPath.ts`         | Hub + specialists + state/tools dashed + left retry U; Shell walkthrough; own BOX; M12 tokens brother only                                 | ✅ W7            |

Sibling (same HTML card family, more steps): M9 `m9_data_workflow` / `M9DataWorkflowDiagram` (registry: HTML cards – not SVG spine).

### Cycle-feedback checklist (new / polish)

1. Desktop row via `horizontalRowBoxes` (or documented non-row topology).
2. U return via `feedbackUPath` when geometry matches AgentWorkflow/DataStory/RlProcess.
3. Canonical LMS tokens – do not add `lmsCycle.*` call sites.
4. Do **not** copy AgentWorkflow `188×88` / `1100×248` into brothers.
5. Geometry test: equal margins + path helper (see `lmsCyclePolish.test.ts`).

### Linear-process (vertical) checklist (new / polish)

1. Column via `buildVerticalColumnOrigin` / `centerAxisStart` (or documented non-column topology).
2. Connectors via `getVerticalFlowConnector` + GAP ≥ `VERTICAL_FLOW_MIN_GAP` (24) when using the spine.
3. Canonical LMS tokens – title `typography.titleWeight` (no raw `800`); strokes from `DIAGRAM_TOKENS.stroke.*`.
4. Do **not** copy da_pipeline or AgentWorkflow BOX / viewBox into brothers.
5. Geometry test: center + stem floor (see `verticalFlowGeometry.test.ts` / `lmsLinearPolish.test.ts`).

### Linear-process (HTML horizontal cards) checklist (new / polish)

1. **One chrome layer** – Shell (`density="hero"`) owns frame/status/nav; diagram has **no** outer border/shadow card.
2. Step panels only (brand tint + number badge); active = `ring-inset`; inactive ≥ `DIAGRAM_TOKENS.opacity.inactive` (0.88).
3. Desktop connectors: brand/flow color; stroke ~`DIAGRAM_TOKENS.stroke.inactive` (1.5) — **HTML exception** (do not force SVG `stroke.flow` 3.5 between cards).
4. `InteractiveDiagramShell` + `EnlargeableDiagram`; labels/explanations in locale helper (e.g. `strukturuotasProcesasStepExplanations.ts`).
5. **No** required `*Layout.ts` / `verticalFlowGeometry` — do not migrate to SVG spine unless product asks for one visual language.

### Linear-process (HTML icon-chain + autoplay) checklist (new / polish)

1. Shell (`density="hero"`) + `EnlargeableDiagram`; slide type may stay `hallucination-pipeline` (thin wrapper → Block).
2. Labels in locale helper (`hallucinationPipelineContent.ts`) – **label + caption only** (no long body / copyable on this slide).
3. Autoplay via `useAutoplaySteps`: play cycles steps; **pin** (card click or Shell nav) pauses; Play resumes; `prefers-reduced-motion` = no interval / no particles.
4. Cards: pointer activate + `tabIndex={-1}` / `aria-hidden` (Shell nav = keyboard primary); active = accent `ring-inset`; inactive ≥ `opacity.inactive` (0.88).
5. Particles only while `isPlaying && !reducedMotion`. Do **not** migrate to SVG spine / `verticalFlowGeometry`.

### Funnel / stack checklist (new / polish)

1. Funnel stages via `funnelStageWidths` + `funnelStageRects` (centered, narrowing).
2. Stack via `stackColumnRects` (equal width, Y rhythm); GAP etalon 18 — not linear 24.
3. Canonical LMS tokens – titleWeight / inactive / box strokes.
4. Do **not** copy AgentWorkflow or da_pipeline BOX / viewBox.
5. Geometry test: `lmsFunnelStackPolish.test.ts` (narrowing + margins + token floors).

### Dual-taxonomy checklist (new / polish) – Wave 5

1. Decision-spine step order: L0→L1→L2→L3→roles (Shell + HitArea; 8 steps on etalon).
2. L2 step group-highlights the role hub; soft bridge from L2 bar toward hub.
3. All ladder bars tall enough for level subtitles (`M10_TAXONOMY_MIN_LEVEL_HEIGHT`).
4. Canonical LMS tokens – `stroke.flow` / `feedback`, `opacity.inactive`, `typography.title*` / `edgeLabel`.
5. Do **not** flatten onto funnel / linear / cycle helpers; keep own `m10TaxonomyLayout.ts`.
6. Geometry test: `lmsDualTaxonomyPolish.test.ts` (step count, min heights, stroke floors).

### Non-spine / residual (Wave 4)

- Roles-hub, comparison, decision-tree, dual-path: **tokens inherit only** (no shared geometry wave) — except **comparison-mode-architecture** (W6 `llm_arch` below) and **multi-agent-flow** (W7 `m10_agent_orchestrator` below). **W5 dual-taxonomy Shell** superseded by `interactive-control-lab` hybrid (`m10_agent_taxonomy` / 10.45).
- SVG diagram **title** captions use `typography.titleWeight` (not raw `800`); caption size via `title.compact` / `title.desktop` when near scale.
- Step/badge labels may keep local weight.
- **Comparison mode-absent steps (exception to `opacity.inactive` ≥0.88):** when a step is _not part of_ the active mode path (e.g. M4 sk. 45 Prompt: nodes 3/5; LlmArch basic: Tools/DB), do **not** use ghost-filled boxes at low opacity — use dashed **placeholder slots** (outline + short label / „Neaktyvu“, opacity 1). LMS inactive floor still applies to dimming _within_ an active path.

### Multi-agent-flow checklist (new / polish) – Wave 7

1. Shell = **Taip** (`density="hero"`) + guided walkthrough; opt-in `stepOfLabel`.
2. Topology: hub orchestrator + side state + specialist row + tools dashed + evaluator → output + **left retry U** (not cycle `feedbackUPath`).
3. Retry geometry via `orchestratorRetryPath.ts` (tip outside hub); `arrow.processTipLen` + `refX=0` / `getProcessArrowMarkerGeom` (do **not** change legacy `arrow.markerLen`).
4. Role bands: hub violet; specialists teal; gates amber; infra slate; state brand — no Control/Execution/Data layer frames.
5. Staged verb edge labels (`shouldShowEdgeLabel`); Title Case agents band (no ALL CAPS); inactive ≥ `opacity.inactive`.
6. Do **not** unify BOX/viewBox with M12; brother `m12_multi_agent_schema` = tokens + tip/refX parity only.
7. Geometry test: `lmsMultiAgentPolish.test.ts`.

### Type Etalon – comparison-mode-architecture (W6)

Pilot: `llm_arch` (`LlmArchDiagramBlock` / `LlmArchDiagramDiagram` / `llmArchLayout.ts` / `llmArchReturnPath.ts`).

1. Shell = **Ne** — mode tabs + status badge are own chrome (do **not** wrap in `InteractiveDiagramShell`).
2. One mode axis: tab label = status = architecture card title (Bazinis / RAG / Agentinis).
3. Active = brand blue (tab + card); emerald only for Output; amber only for Tools type hint.
4. Mode-absent = dashed placeholder + readable text (not `opacity-0.4` wash).
5. Return path via testable helper; ResizeObserver optional enhance.
6. Flow/feedback strokes ≥ 3.5; no LLM CTA glow / hover-lift on frame.
7. Tests: mode states + return path + LT/EN tabs.

## Tests

Every migrated diagram should have tests that verify:

- LT/EN visible labels render from the locale helper.
- The number of `nav button` elements matches the number of steps.
- Dark mode uses the dark SVG background palette.
- SVG internals do not expose duplicate keyboard buttons (`svg [role="button"]`, `svg [tabindex="0"]`).
- Token / geometry floors: `lmsCyclePolish.test.ts`, `lmsLinearPolish.test.ts`, `lmsFunnelStackPolish.test.ts`, `lmsDualTaxonomyPolish.test.ts`, `lmsCaptionTokenPolish.test.ts`, `verticalFlowGeometry.test.ts`.
