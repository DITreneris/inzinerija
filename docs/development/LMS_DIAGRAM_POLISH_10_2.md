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

Wired spine: `m7_da_pipeline` (etalon), DataPrep, MediaPipeline, ConsistencyLock, Postprod, TurinioWorkflow. Tokens-only: M10 trigger/spec/incident.

**W2 etalon 1A (2026-07-24):** `M7DaPipelineDiagram` – flat step fills (no box gradient); `BOX_H` 58; desktop 600×440 / compact 340×280; `max-w-3xl`; **local** arrow tip 10 + `refX=0` (do **not** change global `arrow.markerLen`); local stepLabel 15 / stepSub 12; shell `stepOfLabel` + enlarge `top-right`.

**W2 etalon 1A+ micro (2026-07-24):** inactive soft ≠ frame bg; Enlargeable nested inside shell (SVG only); short verb `desc`; visible clickHint; caption „Analizės eiga“ / „Analysis path“; `startY` 44 / `viewBoxH` 520.

**W2 DataPrep 1A parity ✅ (2026-07-24):** `M7DataPrepWorkflowDiagram` – same flat/soft + tip10 + BOX_H 58 + `max-w-3xl` + verb `desc` + shell chrome as DA; `viewBoxH` 448 (5 steps); tests in `lmsLinearPolish`. Remaining brothers (Media/Consistency/Postprod/Turinio) may still have the pre-1A gap.

## Type Etalon Wave 3 – funnel / stack ✅

Helpers: `funnelStackGeometry.ts` (`funnelStageWidths`, `funnelStageRects`, `stackColumnRects`, `funnelWidthsNarrowing`). Stack GAP etalon **18** (no connectors).

| Check     | Pass criteria                                        |
| --------- | ---------------------------------------------------- |
| Center    | Stage/stack `x` via `centerAxisStart` inside helpers |
| Funnel    | Widths strictly narrowing; own viewBox 360×300       |
| Stack     | Equal-width Y rhythm; own viewBox 320×300; GAP 18    |
| Tokens    | `opacity.inactive` / box stroke / `titleWeight`      |
| Own sizes | Never copy AgentWorkflow / da_pipeline BOX           |
| No shafts | Type has no flow U / vertical connectors             |

Wired: `m13_aec_funnel`, `m13_prompt_stack`. Tokens-only: `m13_rule_of_thirds` titleWeight.

**Type-etalon waves:** W1–W3 closed; **W5 dual-taxonomy** etalon (`m10_agent_taxonomy`); **W6 comparison-mode-architecture** etalon (`llm_arch`). Other roles-hub/comparison remain C4 token inherit.

## Wave 6 – comparison-mode-architecture type etalon ✅

Pilot: `llm_arch` (M4 sk. 56). Pattern `comparison-mode-architecture`. Shell = **Ne** (own mode tabs + architecture cards).

| Check       | Rule                                                                                     |
| ----------- | ---------------------------------------------------------------------------------------- |
| Modes       | Bazinis · RAG · Agentinis (EN: Basic · RAG · Agent); mode id `tool` stays                |
| Active      | One brand-blue signal: tab + active card + status badge                                  |
| Mode-absent | Dashed placeholder + „Neaktyvu“ / Inactive — not ghost `opacity-0.4`                     |
| Topology    | Horizontal Input→LLM→Output; vertical LLM→Tools→DB; return RAG from DB, Agent from Tools |
| Return path | `llmArchReturnPath.ts` pure helper + ResizeObserver enhance                              |
| Tokens      | `stroke.flow` / `feedback` ≥ 3.5; LLM flat brand (no CTA glow)                           |
| Chrome      | `llm_arch` in `PREMIUM_DIAGRAM_IMAGE_KEYS` (no emerald section frame)                    |
| Tests       | `LlmArchModeStates.test.tsx`, `llmArchReturnPath.test.ts`, localization                  |

## Wave 4 – residual caption tokens ✅

Not a type etalon. Sweep SVG diagram **titles** to `DIAGRAM_TOKENS.typography.titleWeight` (700); near-caption sizes → `title.compact` / `title.desktop`. Leave step/badge `800` alone.

## Wave 5 – dual-taxonomy type etalon

Pilot: `m10_agent_taxonomy` (10.45). Pattern `dual-taxonomy`. Shell = Taip (8 steps, decision spine).

| Check             | Rule                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Topology          | Left L0–L3 ladder (38%) + right L2 team hierarchy (62%), gap ≥ 32                                                 |
| Steps             | L0→L1→L2→L3→router→coordinator→specialist→evaluator                                                               |
| Header            | Reserved `HEADER_H` ≥ 60; title + subtitle only                                                                   |
| L2 link           | Solid arrow L2→Coord + pill when hub live; ghost hub + „pasirink L2“ when L0/L1/L3                                |
| State truth       | `isHubLive` – right panel live only for L2/role steps                                                             |
| Ghost hard (P4)   | `HUB_GHOST_OPACITY` 0.2; when `!isHubLive` – silhouettes only (no edges / L2 bridge / pills)                      |
| Role palette (P4) | Shared slate-family fills; Coord violet only (L2 echo); roles ≠ L0–L3 ladder tones                                |
| Edges (P4 KISS)   | `nukreipia` / `deleguoja` / `pateikia` + single dashed `grąžina`; no dual Coord↔Eval shafts                       |
| Label air (P6)    | viewBox H≥500; COL_GAP≥40; Spec/Eval ±120; staged edge pills by shell step; hand anchors (clean space > midpoint) |
| Subs              | All level bars ≥ `M10_TAXONOMY_MIN_LEVEL_HEIGHT`; quiet inactive ladder (~0.58 local)                             |
| Tokens            | Flow shafts ≥ 3.5; node strokes 1.5–2; equal role `r=48`                                                          |
| Layout SOT        | `m10TaxonomyLayout.ts` only                                                                                       |

**Maintenance:** tokens inherit for remaining non-spine patterns (roles-hub siblings, comparison, decision-tree).

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
