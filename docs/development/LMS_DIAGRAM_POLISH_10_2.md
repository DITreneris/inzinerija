# LMS Diagram Polish – 10.2 Agentų ciklas (pilot) → DS promote

> Ambicija **1A:** LMS polish (ne premium SaaS redesign).  
> Riedėjimas: pilot 10.2 → W1 cycle brothers → **DS DiagramKit promote (A→B→C)**.  
> DS sluoksnis: `diagramTokens.ts` + `diagramLayoutMath.ts` + `InteractiveDiagramShell` (ne Card / module identity ant SVG).

## Rubrika (LMS)

| Area     | Check                                                      |
| -------- | ---------------------------------------------------------- |
| Hero     | Diagrama dominuoja viewport’e; mazgai skaitomi be zoom.    |
| Chrome   | `density="hero"` process shells; nav 1–N lieka (a11y).     |
| Rodyklės | SCHEME §3.7 / §5; token stroke ≥ 3.5; feedback tip kur U.  |
| Copy     | Prose žingsnių skaičius = diagramos žingsniai.             |
| Progress | Modulio „N/M“; diagramos 1/N shell (opt-in `stepOfLabel`). |

## Etalonų mapa

| Poreikis        | Šaltinis                                                        |
| --------------- | --------------------------------------------------------------- |
| cycle-feedback  | M10.2 `agent_workflow` + W1 brothers                            |
| linear vertical | `m7_da_pipeline` + `verticalFlowGeometry` / `diagramLayoutMath` |
| funnel / stack  | `m13_aec_funnel`, `m13_prompt_stack`                            |
| multi-agent     | M10.482 `m10_agent_orchestrator` + `orchestratorRetryPath` (W7) |
| shell UX        | DiagramKit `density=hero`                                       |
| token floors    | `DIAGRAM_TOKENS` (LMS promoted)                                 |

## Canonical LMS floors (`diagramTokens`)

| Matas              | Legacy | LMS        |
| ------------------ | ------ | ---------- |
| `opacity.inactive` | 0.48   | **0.88**   |
| `stroke.flow`      | 2      | **3.5**    |
| title              | 16/800 | **17/700** |
| edge label         | ad hoc | **12/500** |

`lmsCycle` = deprecated alias of the same numbers.

## Platform track (A→B→C)

| Phase | Fokusas                                                | Status         |
| ----- | ------------------------------------------------------ | -------------- |
| A     | Canonical token promote + sweep 0.45 / thin strokes    | ✅             |
| B     | `diagramLayoutMath` + hero on remaining process Blocks | ✅             |
| C1–C2 | Vertical linear etalon `m7_da_pipeline` (+ inherit)    | ✅             |
| C3    | Funnel/stack breathing mini                            | ✅             |
| C4    | roles/comparison – token inherit only                  | ✅ skip layout |

**Supersedes** Wave 2–6 schema-by-schema polish backlog.

## Type Etalon Wave 1 – cycle-feedback ✅

Helpers: `cycleFeedbackGeometry.ts` (`horizontalRowBoxes`, `feedbackUPath`, `horizontalRowMarginsEqual`).

| Check               | Pass criteria                                                                     |
| ------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Shared row math     | Desktop equal boxes via `horizontalRowBoxes` – **not** copied AgentWorkflow BOX/W |
| Center              | Equal L/R margins (`horizontalRowMarginsEqual` / `centerAxisStart`)               |
| Feedback U          | Unidirectional path via `feedbackUPath` (diagram owns Y offsets)                  |
| Tokens              | Canonical `opacity.inactive` / `stroke.flow                                       | feedback`/`typography.\*`(no new`lmsCycle` call sites) |
| Topology uniqueness | LearningLoop 4-macro + M12 multi-agent keep own layouts (tokens only)             |
| Stroke / inactive   | ≥ 3.5 flow/feedback; inactive ≥ 0.85                                              |
| Title / edges       | Caption title 17/700; edge labels ~12/500; verbs where process edges              |

Wired: AgentWorkflow (etalon), DataStory, RlProcess. Brothers LearningLoop / M12: token migrate only.

**AgentWorkflow caption air (2026-07-24):** po I3c crop – `rowY` 62 / `titleY` 22 / fb trough +36 (RL parity); H lieka 248; edge−title ≥18.

## Type Etalon Wave 2 – linear vertical ✅

Helpers: `diagramLayoutMath.ts` (`buildVerticalColumnOrigin`, `verticalColumnMarginsEqual`) + `verticalFlowGeometry.ts` (`getVerticalFlowConnector`, GAP ≥ 24).

| Check               | Pass criteria                                                         |
| ------------------- | --------------------------------------------------------------------- | -------------------------------------------- |
| Column center       | `colsX` / `cx` via `buildVerticalColumnOrigin` – not hand-coded drift |
| Connectors          | `getVerticalFlowConnector` + GAP ≥ `VERTICAL_FLOW_MIN_GAP` (24)       |
| Tokens              | `opacity.inactive` / `stroke.flow                                     | flowStrong`/`typography.title`+`titleWeight` |
| Own BOX / viewBox   | Never copy da_pipeline or AgentWorkflow sizes                         |
| Topology uniqueness | BiSchema hybrid, M9 HTML cards, M10 horizontal/snake – tokens only    |
| Title               | Caption **17/700** (no raw `800`)                                     |

Wired spine: `m7_da_pipeline` (etalon), DataPrep, MediaPipeline, ConsistencyLock, Postprod, TurinioWorkflow. Tokens-only: M10 spec/incident. **10.15** is the `process-config-hierarchy` sibling etalon (`hierarchyDropGeometry` — not a W8 wave; Pattern stays `linear-process`).

**W2 etalon 1A (2026-07-24):** `M7DaPipelineDiagram` – flat step fills (no box gradient); `BOX_H` 58; desktop 600×440 / compact 340×280; `max-w-3xl`; arrow tip = `arrow.processTipLen` + `refX=0` (do **not** change legacy `arrow.markerLen`); local stepLabel 15 / stepSub 12; shell `stepOfLabel` + enlarge `top-right`.

**W2 etalon 1A+ micro (2026-07-24):** inactive soft ≠ frame bg; Enlargeable nested inside shell (SVG only); short verb `desc`; visible clickHint; caption „Analizės eiga“ / „Analysis path“; `startY` 44 / `viewBoxH` 520.

**W2 DataPrep 1A parity ✅ (2026-07-24):** `M7DataPrepWorkflowDiagram` – same flat/soft + tip10 + BOX_H 58 + `max-w-3xl` + verb `desc` + shell chrome as DA; `viewBoxH` 448 (5 steps); tests in `lmsLinearPolish`. Remaining brothers (Media/Consistency/Postprod/Turinio) may still have the pre-1A gap.

## Type Etalon Wave 3 – funnel / stack ✅

Helpers: `funnelStackGeometry.ts` (`funnelStageWidths`, `funnelStageRects`, `funnelStageTrapezoids`, `funnelHairlineYs`, `funnelOuterOutlinePath`, `stackColumnRects`, `funnelWidthsNarrowing`). Stack GAP etalon **18** (no connectors).

| Check      | Pass criteria                                                                     |
| ---------- | --------------------------------------------------------------------------------- |
| Center     | Stage/stack `x` via `centerAxisStart` inside helpers                              |
| Funnel     | Widths strictly narrowing; own viewBox 360×280                                    |
| Silhouette | AEC = continuous trapezoids (`gapY=0`) + hairlines + outer outline; title + motif |
| Wow        | Brand depth ladder + active inset ring + inline motifs (eye/pointer/target)       |
| Stack      | Equal-width Y rhythm; own viewBox 320×300; GAP 18                                 |
| Tokens     | `opacity.inactive` / box stroke / `titleWeight`                                   |
| Own sizes  | Never copy AgentWorkflow / da_pipeline BOX                                        |
| No shafts  | Type has no flow U / vertical connectors                                          |

Wired: `m13_aec_funnel`, `m13_prompt_stack`. Tokens-only: `m13_rule_of_thirds` titleWeight.

**Type-etalon waves:** W1–W3 closed; **W5** (`m10_agent_taxonomy`) – dual-taxonomy Shell superseded (2026-07-24) by interactive-control-lab hybrid (mini static SVG + ChoiceControl); **W6 comparison-mode-architecture** etalon (`llm_arch`); **W7 multi-agent-flow** etalon (`m10_agent_orchestrator`). Other roles-hub/comparison remain C4 token inherit.

## Wave 7 – multi-agent-flow type etalon ✅

Pilot: `m10_agent_orchestrator` (10.482). Pattern `multi-agent-flow`. Shell = Taip (6-step guided walkthrough). Brother: `m12_multi_agent_schema` (W7 **layout** brother – own business topology; fan-out/fan-in + full-map focus + staged verbs; not tokens-only).

| Check                | Rule                                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| Topology             | Hub + state + specialists + tools dashed + evaluator/output + left retry U                                     |
| Process graph (P3)   | Fan-out trunk/bus + fan-in collect→Vertintojas→Rezultatas; roles parallel (not linear agents)                  |
| Align                | `state.centerY === orch.centerY`; `eval`/`output` same y+h (true horizontals)                                  |
| Error step (v06)     | Step 4: cull `eval-output`; dim !active; validate amber+rose stroke/`!`; soft-rose fan-in 2.5                  |
| Micro chrome (v06.1) | Full-map: all nodes always; `!active` orphan dim; LT box widths; `kviečia` +4; HITL +16                        |
| Retry helper         | tools/eval gutter U always on (dim→full steps 4–5); `Kartoti`/`Retry` label 4–5 only                           |
| Tips                 | `arrow.processTipLen` + `refX=0` via `getProcessArrowMarkerGeom` (`markerLen` legacy)                          |
| Role bands           | Hub violet; specialists teal; gates amber; infra slate; state brandTop (soft)                                  |
| Edges                | Always-on topology + focus/map emphasis; staged verbs only; no hide-until-live / edge cull                     |
| Chrome               | `density=hero` + opt-in `stepOfLabel`; Title Case lane header; inactive ≥ 0.88                                 |
| Brother              | M12 own BOX/viewBox; orthogonal fan-out/fan-in; orphan dim; staged edge verbs; `lmsMultiAgentPolish` M12 suite |
| Tests                | `lmsMultiAgentPolish.test.ts` (orch + M12 brother) + DiagramLocalization (6 nav)                               |

## Wave 6 – comparison-mode-architecture type etalon ✅

Pilot: `llm_arch` (M4 sk. 56). Pattern `comparison-mode-architecture`. Shell = **Ne** (own mode tabs + architecture cards).

| Check       | Rule                                                                                                                                                                    |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Modes       | Bazinis · RAG · Agentinis (EN: Basic · RAG · Agent); mode id `tool` stays                                                                                               |
| Active      | One brand-blue signal: tab + active card + status badge                                                                                                                 |
| Mode-absent | Dashed placeholder + „Neaktyvu“ / Inactive — not ghost `opacity-0.4`                                                                                                    |
| Topology    | **lg+:** Horizontal Input→LLM→Output; vertical LLM→Tools→DB. **&lt;lg:** spine stacks vertically (same nodes); Tools/DB under LLM. Return RAG from DB, Agent from Tools |
| Return path | `llmArchReturnPath.ts` pure helper + ResizeObserver; compact `routePad=24` when container width &lt; 640                                                                |
| Tokens      | `stroke.flow` / `feedback` ≥ 3.5; LLM flat brand (no CTA glow)                                                                                                          |
| Chrome      | `llm_arch` in `PREMIUM_DIAGRAM_IMAGE_KEYS`; Block `mobileBehavior="reflow"` (enlarge OFF)                                                                               |
| Tests       | `LlmArchModeStates.test.tsx`, `llmArchReturnPath.test.ts`, localization                                                                                                 |

## Wave 4 – residual caption tokens ✅

Not a type etalon. Sweep SVG diagram **titles** to `DIAGRAM_TOKENS.typography.titleWeight` (700); near-caption sizes → `title.compact` / `title.desktop`.

> **Superseded for M10 residual primary labels (Wave 4b):** do **not** leave step/badge raw `800`. Lab `font-mono` artefacts remain OK.

## Wave 4b – residual size ladder ✅

Not a type etalon. Align M10 residual (+ M15 practice loop) SVG **size/weight roles** to `DIAGRAM_TOKENS.typography` so schemas do not read as 3–4 font families (still one family: Plus Jakarta Sans).

| Role                  | Token                                             |
| --------------------- | ------------------------------------------------- |
| Caption               | `title.desktop` / `title.compact` + `titleWeight` |
| Box / leaf primary    | `stepLabel.*` + `titleWeight`                     |
| Box secondary / micro | `stepSub.*` (+ `edgeLabel.weight` when secondary) |
| Edge verb             | `edgeLabel`                                       |
| Depth/roles hub       | `rolesHub.*`                                      |

**In scope:** `M10WorkflowSpecDiagram`, `M10IncidentPlaybookDiagram`, `M10ToolDecisionTreeDiagram`, `M10LearningLoopDiagram` (NodeBox), `M10DepthRolesMiniDiagram`, `M15PracticeLoopDiagram`; light touch `M10OrchestratorDiagram` error badge.

**Forbidden:** `fontSize="14"` captions, raw `fontWeight` 800.

**Tests:** `lmsCaptionTokenPolish.test.ts` (Wave 4b source-scan).

## Wave 5 – dual-taxonomy type etalon (SUPERSEDED 2026-07-24)

> **Status: SUPERSEDED — do not implement.** Archived 8-step Shell dual-taxonomy (`m10TaxonomyLayout.ts`, `lmsDualTaxonomyPolish`) **deleted**. Live 10.45 = Pattern `interactive-control-lab`, Shell = Ne. Žr. `DIAGRAM_KIT_STANDARD.md` „Depth/roles lab checklist“ + `TEACHING_ELEMENTS_REGISTRY.md`.

| Check (live) | Rule                                                                                          |
| ------------ | --------------------------------------------------------------------------------------------- |
| Pattern      | `interactive-control-lab` – ChoiceControl + Copy lab; no Shell walkthrough                    |
| Mini schema  | Static `M10DepthRolesMiniDiagram` – 4 depth pills + L2 role strip                             |
| Layout SOT   | `m10DepthRolesLayout.ts` only (not `m10TaxonomyLayout.ts`)                                    |
| Process tips | `getProcessArrowMarkerGeom()` / `processTipLen`; connectors under boxes; edge verbs in gutter |
| Tests        | `m10DepthRolesLayout.test.ts`, `m10DepthRolesModel.test.ts`, `M10DepthRolesLabBlock.test.tsx` |

**Maintenance:** tokens inherit for remaining non-spine patterns (roles-hub siblings, comparison, decision-tree). Multi-agent-flow → Wave 7.

## Kas nedaroma

- Premium paletė / animacijų sistema / išmesti 1–5 nav.
- Module identity ant SVG (DS B8).
- Big-bang visoms schemoms į AgentWorkflow BOX.
- Global `stepOfLabel` default.
- Flatten LearningLoop / M12 onto `horizontalRowBoxes`.
- Flatten BiSchema / M9 / M10 onto vertical spine.
- Force all linear viewBox H = da_pipeline 480.
- Force stack GAP to linear `VERTICAL_FLOW_MIN_GAP` 24.
- Flatten comparison / taxonomy / dual-path onto funnel helpers.
- Invent type helpers for singleton patterns (dual-path / roles / decision-tree).
