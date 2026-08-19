# Teaching Elements Registry (master)

> **Statusas:** aktyvus kontraktas (TE-0…TE-5, 2026-07-24).
> **Ticketai:** `TODO.md` §1.0g (`TE-0…5`).
> **Overlay (Pattern / Shell / maturity):** [`teaching-elements-overlay.json`](teaching-elements-overlay.json).
> **Audit:** `npm run audit:teaching-elements` (`--json`, `--strict`).
> **Skaitinės sekcijos generuojamos:** `npm run audit:teaching-elements:docs`; CI vartai – `npm run audit:governance` (`--check-docs`).

## Tikslas

Viena vieta stebėti **visus mokymo interaktyvus**: schemas/diagramas, ChoiceControl labus, embeds, lenteles, skaidrių tipus ir off-renderer chrome. Brandą matuoti 0–4 skale pagal realius duomenis (`modules.json` + `diagramRenderers`), ne pagal spėliones.

## Kind enum

| `kind`           | Kas                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| `diagram`        | `sections[].image` → `diagramRenderers` (procesas / iliustracija)                                 |
| `lab`            | Pattern `interactive-control-lab` (ChoiceControl ar copy juosta; Shell = Ne)                      |
| `off-renderer`   | Live diagrama **be** `sections[].image` (pipelineDiagram, slide tipas, Test chrome, portal beats) |
| `orphaned`       | Komponentai repo, bet **neprijungti** prie JSON (pvz. Schema3, ContextFlow)                       |
| `embed`          | `content.*` micro-check / pratimas (`recognitionExercise`, `toolChoiceBar`, …)                    |
| `table`          | `sections[].table`                                                                                |
| `slide-type`     | `SlideType` katalogo eilutė (agreguota, ne kiekviena skaidrė)                                     |
| `renderer-alias` | Legacy `diagramRenderers` key be live JSON image                                                  |

## Brandos rubrika (0–4)

| Lygis | Reikalavimas                                                                 |
| ----: | ---------------------------------------------------------------------------- |
|     0 | Yra runtime (JSON/UI), nėra master/overlay eilutės                           |
|     1 | Overlay: Pattern + Shell Y/N/n/a + render kelias                             |
|     2 | Content/layout SOT atskirtas + LT/EN kelias dokumentuotas                    |
|     3 | Automatizuoti testai (localization / model / geometry) + dark/a11y pastebėti |
|     4 | Type Etalon **arba** aiškus „brother of etalon“ + Feature Doc pilnas         |

**Papildomai:** labams – GOLDEN §3.1b/c; lentelėms – `LENTELIU_STANDARTAS.md`; embeds – GOLDEN §3.8.

## Feature Doc Contract (plėtra)

Prieš „done“ naujam mokymo elementui ([`DOCS_MAINTENANCE.md`](DOCS_MAINTENANCE.md) §1b):

1. Curriculum SOT + skaidrių eilė (jei nauja skaidrė).
2. **Master overlay** eilutė (`elementId`, Pattern, Shell, render) **+** satelitas (jei `diagram` / `lab` / `off-renderer`).
3. UI primityvas → GOLDEN + `src/components/ui/README.md`.
4. Owner agent docs; `docs/development/lessons/<agentas>.md` jei naujas pitfall.
5. `CHANGELOG`; prieš release – `DOCS_SYNC` + `audit:teaching-elements --strict`.

**Blokuojantis drift:** naujas `image` key / off-renderer / lab be overlay Pattern + Shell.

## Satelitų hierarchija

```text
TEACHING_ELEMENTS_REGISTRY.md          ← master (šis failas)
teaching-elements-overlay.json         ← curated Pattern / Shell / maturity
  ├─ DIAGRAMU_M7_M12_REGISTRY.md       ← image-key detalės M7–12
  ├─ DIAGRAMU_M13_M15_REGISTRY.md      ← image-key detalės M13–15
  ├─ DIAGRAMU_M16_M18_REGISTRY.md      ← image-key detalės M16–18 (TE-M1618-M4; prieš JSON keys)
  ├─ DIAGRAMU_M1_M9_AUDITAS.md         ← rubrika + istorinis M1–9 smoke (ne primary)
  ├─ GOLDEN_STANDARD.md §3.8           ← ritmas + embed katalogas
  ├─ LENTELIU_STANDARTAS.md            ← lentelių UX
  ├─ archive/…/SLIDE_UX_INTERACTIVITY_* ← istorinis rollout (ritmas = GOLDEN §3.8)
  ├─ M1_M3_PROMPT_MATURITY.md          ← M1–3 copyable fit-for-purpose + freeze (ne UI registry)
  ├─ M4_PROMPT_MATURITY.md             ← M4 copyable fit-for-purpose (ne UI registry)
  ├─ M7_PROMPT_MATURITY.md             ← M7 copyable F/S/R/L + journey (ne UI registry)
  └─ M16_M18_PROMPT_MATURITY.md        ← M16–18 copyable klasės (TE-M1618-S4 ✅)
```

**Neįtraukti į master lentelę** (tik nuoroda): `M79_PATCH_REGISTRY`, `completionArtifacts.json`, `src/icons/registry`.

## Faktinė bazė (audito baseline)

Žemiau esantys blokai **generuojami** – `npm run audit:teaching-elements:docs`. Ranka neredaguoti: CI vartai (`audit:teaching-elements:check-docs`) fail'ina, jei skaičiai atsilieka nuo live `modules.json`.

<!-- AUTO:te-baseline:start -->

| Bucket                         |                N |
| ------------------------------ | ---------------: |
| Skaidrės                       |              338 |
| Naudoti SlideType              |               42 |
| Live `sections[].image` unique |               49 |
| Live `sections[].image` fields |               51 |
| `diagramRenderers` keys        |               51 |
| Off-renderer live šeimos       |                5 |
| Orphaned                       |                2 |
| ChoiceControl labai (audit)    |                7 |
| Embed katalogas                |               48 |
| `section.table`                | 51 / 45 skaidrių |
| Inventory / overlay elements   |        203 / 203 |

_Šaltinis: `modules.json` + `diagramRenderers`; overlay `updatedAt`: **2026-08-01**._

<!-- AUTO:te-baseline:end -->

## Diagramos, labai ir off-renderer (TE-2)

| elementId                           | M/slide                | Pattern                        | Shell | Maturity | Render                                           |
| ----------------------------------- | ---------------------- | ------------------------------ | ----- | -------: | ------------------------------------------------ |
| `diagram:agent_workflow_diagram`    | M10/10.2               | `cycle-feedback`               | Taip  |        4 | AgentWorkflowBlock                               |
| `diagram:custom_gpt_process`        | M4/46                  | `linear-process`               | Ne    |        3 | ProcessStepper                                   |
| `diagram:da_schema_entity_example`  | M7/95                  | `illustration`                 | Ne    |        2 | DiagramImageFrame                                |
| `diagram:di_prezentacijos_workflow` | M5/47                  | `linear-process`               | Taip  |        3 | DiPrezentacijosWorkflowBlock                     |
| `diagram:llm_arch`                  | M4/56                  | `comparison-mode-architecture` | Ne    |        4 | LlmArchDiagramBlock                              |
| `diagram:llm_autoregressive`        | M4/44                  | `cycle-feedback`               | Taip  |        3 | LlmAutoregressiveBlock                           |
| `diagram:m10_agent_orchestrator`    | M10/10.482             | `multi-agent-flow`             | Taip  |        4 | M10OrchestratorBlock                             |
| `diagram:m10_incident_playbook`     | M10/10.655             | `linear-process`               | Taip  |        3 | M10IncidentPlaybookBlock                         |
| `diagram:m10_learning_loop`         | M10/10.49              | `cycle-feedback`               | Taip  |        3 | M10LearningLoopBlock                             |
| `diagram:m10_three_a_strategy`      | M10/10.25              | `comparison`                   | Taip  |        3 | M10ThreeAStrategyBlock                           |
| `diagram:m10_tool_decision_tree`    | M10/10.35              | `decision-tree`                | Taip  |        3 | M10ToolDecisionTreeBlock                         |
| `diagram:m10_trigger_flow`          | M10/10.15              | `linear-process`               | Taip  |        3 | M10TriggerFlowBlock                              |
| `diagram:m10_workflow_spec`         | M10/10.65              | `linear-process`               | Taip  |        3 | M10WorkflowSpecBlock                             |
| `diagram:m12_multi_agent_schema`    | M12/120.5              | `multi-agent-flow`             | Taip  |        4 | M12MultiAgentSchemaBlock                         |
| `diagram:m12_three_labs`            | M12/120.25             | `comparison`                   | Taip  |        3 | M12ThreeLabsBlock                                |
| `diagram:m13_aec_funnel`            | M13/13.1               | `funnel`                       | Taip  |        4 | M13AecFunnelBlock                                |
| `diagram:m13_consistency_lock`      | M13/13.32              | `linear-process`               | Taip  |        4 | M13ConsistencyLockBlock                          |
| `lab:m13_consistency_lab`           | M13/13.325             | `interactive-control-lab`      | Ne    |        3 | M13ConsistencyLockLabBlock (Drift + Ref)         |
| `lab:m16_direction_picker`          | M16/16.15              | `interactive-control-lab`      | Ne    |        3 | M16DirectionPickerLabBlock (A/B/C + score)       |
| `diagram:m18_launch_gates`          | M18/18.19              | `linear-process`               | Taip  |        3 | M18LaunchGatesBlock (tollgate barriers)          |
| `diagram:m13_media_pipeline`        | M13/13.12              | `linear-process`               | Taip  |        4 | M13MediaPipelineBlock                            |
| `diagram:m13_postprod_steps`        | M13/13.52              | `linear-process`               | Taip  |        4 | M13PostprodBlock                                 |
| `diagram:m13_still_workflow`        | M13/13.35              | `linear-process`               | Taip  |        3 | M13StillWorkflowBlock (desk stations)            |
| `diagram:m13_prompt_stack`          | M13/13.2               | `stack`                        | Taip  |        4 | M13PromptStackBlock                              |
| `diagram:m13_rule_of_thirds`        | M13/13.33              | `illustration`                 | Ne    |        2 | M13RuleOfThirdsBlock                             |
| `diagram:m15_practice_loop`         | M15/150.25             | `dual-path`                    | Taip  |        3 | M15PracticeLoopBlock                             |
| `diagram:m7_analysis_types`         | M7/731                 | `roles-hub`                    | Taip  |        3 | M7AnalysisTypesBlock                             |
| `diagram:m7_bi_schema`              | M7/92                  | `linear-process`               | Taip  |        3 | M7BiSchemaBlock                                  |
| `diagram:m7_macro_path_map`         | M7/71                  | `linear-process`               | Ne    |        3 | M7PathMapBlock                                   |
| `diagram:m7_da_pipeline`            | M7/73                  | `linear-process`               | Taip  |        4 | M7DaPipelineBlock                                |
| `diagram:m7_data_prep_workflow`     | M7/89                  | `linear-process`               | Taip  |        3 | M7DataPrepWorkflowBlock                          |
| `diagram:m7_data_story_cycle`       | M7/100                 | `cycle-feedback`               | Taip  |        4 | M7DataStoryCycleBlock                            |
| `diagram:m7_master_workflow`        | M7/74                  | `linear-process`               | Taip  |        3 | M9DataWorkflowBlock context=m7_master            |
| `diagram:m7_three_agents_flow`      | M7/94                  | `roles-hub`                    | Taip  |        3 | M7ThreeAgentsBlock                               |
| `diagram:m9_data_workflow`          | M9/93                  | `linear-process`               | Taip  |        3 | M9DataWorkflowBlock                              |
| `diagram:rag_duomenu_ruosimas`      | M4/62                  | `linear-process`               | Ne    |        3 | RagDuomenuRuosimasBlock                          |
| `diagram:rl_process_diagram`        | M4/48                  | `cycle-feedback`               | Taip  |        3 | RlProcessBlock                                   |
| `diagram:strukturuotas_procesas`    | M4/43                  | `linear-process`               | Ne    |        3 | StrukturuotasProcesasBlock                       |
| `diagram:turinio_workflow`          | M13/13.11              | `linear-process`               | Taip  |        4 | TurinioWorkflowBlock                             |
| `lab:m10_agent_taxonomy`            | M10/10.45              | `interactive-control-lab`      | Ne    |        3 | M10DepthRolesLabBlock + M10DepthRolesMiniDiagram |
| `lab:m10_human_control_simulator`   | M10/10.26              | `interactive-control-lab`      | Ne    |        4 | M10HumanControlSimulatorBlock                    |
| `lab:m10_team_readiness_lab`        | M10/10.255             | `interactive-control-lab`      | Ne    |        3 | M10TeamReadinessLabBlock                         |
| `lab:m4_prompt_mode_simulator`      | M4/54                  | `interactive-control-lab`      | Ne    |        3 | M4PromptModeSimulatorBlock                       |
| `slide-type:practice-quest-intro`   | M9/90                  | `interactive-control-lab`      | Ne    |        2 | PracticeQuestIntroSlide                          |
| `slide-type:i2v-generatorius`       | M13/13.47              | `special`                      | Ne    |        2 | I2vGeneratoriusSlide                             |
| `lab:m9_workflow_step_prompts`      | M9/93                  | `interactive-control-lab`      | Ne    |        3 | M9WorkflowStepCopyBlock                          |
| `off:hallucination-pipeline`        | M7/67.7                | `linear-process`               | Taip  |        3 | HallucinationPipelineBlock                       |
| `off:pipeline-context-engineering`  | M4/45                  | `comparison+linear-process`    | Ne    |        2 | ContextEngineeringPipelineDiagram                |
| `off:portal-beat`                   | M4/53.5                | `portal-beat`                  | Ne    |        3 | PortalBeatDiagram                                |
| `off:test-knowledge-scope`          | M8/80 (+M11/M14 intro) | `test-scope`                   | Ne    |        3 | TestKnowledgeScopeDiagram                        |
| `off:workflow-comparison`           | M1/15                  | `comparison`                   | Ne    |        3 | WorkflowComparisonInteractiveBlock               |

> Pilnas overlay: `teaching-elements-overlay.json`. Audit: `npm run audit:teaching-elements --strict`.

## SlideType katalogas (TE-3)

| Tipas                     | Count | Klasė      | Unused |
| ------------------------- | ----: | ---------- | ------ |
| `action-intro`            |     0 | chrome     |        |
| `action-intro-journey`    |     0 | chrome     |        |
| `advanced`                |     0 | stuburas   |        |
| `advanced-2`              |     0 | stuburas   |        |
| `ai-detectors`            |     0 | stuburas   |        |
| `ai-workflow`             |     0 | stuburas   |        |
| `comparison`              |     0 | stuburas   |        |
| `content-block`           |     0 | stuburas   |        |
| `definitions`             |     0 | stuburas   |        |
| `di-modalities`           |     0 | stuburas   |        |
| `evaluator-prompt-block`  |     0 | stuburas   |        |
| `full-example`            |     0 | stuburas   |        |
| `glossary`                |     0 | chrome     |        |
| `hallucination-dashboard` |     0 | special    |        |
| `hallucination-pipeline`  |     0 | special    |        |
| `hierarchy`               |     0 | stuburas   |        |
| `infographic`             |     0 | special    |        |
| `input`                   |     0 | stuburas   |        |
| `intro`                   |     0 | stuburas   |        |
| `intro-action-pie`        |     0 | special    |        |
| `meta`                    |     0 | stuburas   |        |
| `module-intro`            |     0 | chrome     |        |
| `output`                  |     0 | stuburas   |        |
| `path-step`               |     0 | chrome     |        |
| `pie-chart`               |     0 | stuburas   |        |
| `practice-intro`          |     0 | assessment |        |
| `practice-quest-intro`    |     1 | assessment |        |
| `practice-scenario`       |     0 | assessment |        |
| `practice-scenario-hub`   |     0 | assessment |        |
| `practice-summary`        |     0 | assessment |        |
| `prompt-techniques`       |     0 | stuburas   |        |
| `prompt-template`         |     0 | stuburas   |        |
| `prompt-types`            |     0 | stuburas   |        |
| `quality`                 |     0 | stuburas   |        |
| `reasoning`               |     0 | stuburas   |        |
| `reasoning-models`        |     0 | stuburas   |        |
| `section-break`           |     0 | chrome     |        |
| `summary`                 |     0 | chrome     |        |
| `test-intro`              |     0 | assessment |        |
| `test-results`            |     0 | assessment |        |
| `test-section`            |     0 | assessment |        |
| `transition-3-to-6`       |     0 | stuburas   |        |
| `vaizdo-generatorius`     |     1 | special    |        |
| `i2v-generatorius`        |     1 | special    |        |
| `warm-up-quiz`            |     0 | assessment |        |
| `workflow-summary`        |     0 | special    |        |

## Embeds (TE-3)

| elementId                              | Key                                                 | M/slide             |
| -------------------------------------- | --------------------------------------------------- | ------------------- |
| `embed:briefCheckBlock:m2:51`          | `briefCheckBlock`                                   | M2/51               |
| `embed:briefCheckBlock:m5:510`         | `briefCheckBlock`                                   | M5/510              |
| `embed:correctPromptPractice:m4:49`    | `correctPromptPractice`                             | M4/49               |
| `embed:correctPromptPractice:m6:68`    | `correctPromptPractice`                             | M6/68               |
| `embed:instructGptQuality:m4:44`       | `instructGptQuality`                                | M4/44               |
| `embed:interactivePipeline:m4:45`      | `interactivePipeline`                               | M4/45               |
| `embed:pipelineDiagram:m4:45`          | `pipelineDiagram:context-engineering`               | M4/45               |
| `embed:preCopyCheckBlock:m4:59`        | `preCopyCheckBlock`                                 | M4/59               |
| `embed:preCopyCheckBlock:m4:60`        | `preCopyCheckBlock`                                 | M4/60               |
| `embed:preCopyCheckBlock:m5:47`        | `preCopyCheckBlock`                                 | M5/47               |
| `embed:preCopyCheckBlock:m6:68`        | `preCopyCheckBlock`                                 | M6/68               |
| `embed:preCopyCheckBlock:m7:67`        | `preCopyCheckBlock`                                 | M7/67               |
| `embed:preCopyCheckBlock:m7:67.8`      | `preCopyCheckBlock`                                 | M7/67.8             |
| `embed:preCopyCheckBlock:m7:732`       | `preCopyCheckBlock`                                 | M7/732              |
| `embed:presentationToolsBlock:m5:47.5` | `presentationToolsBlock`                            | M5/47.5             |
| `embed:recognitionExercise:m13:13.34`  | `recognitionExercise`                               | M13/13.34           |
| `embed:recognitionExercise:m4:39.5`    | `recognitionExercise`                               | M4/39.5             |
| `embed:toolChoiceBar:m4:53:s3`         | `sections[3].toolChoiceBar`                         | M4/53               |
| `embed:toolChoiceBar:m4:61:s1`         | `sections[1].toolChoiceBar`                         | M4/61               |
| `embed:toolChoiceBar:m7:71.35:s1`      | `sections[1].toolChoiceBar`                         | M7/71.35            |
| `embed:toolChoiceBar:m7:67:s1`         | `sections[1].toolChoiceBar` (manipulation-contrast) | M7/67               |
| `embed:toolChoiceBar:m7:731:s2`        | `sections[2].toolChoiceBar`                         | M7/731              |
| `embed:toolChoiceBar:m7:733:s1`        | `sections[1].toolChoiceBar`                         | M7/733              |
| `embed:toolChoiceBar:m7:734:s1`        | `sections[1].toolChoiceBar`                         | M7/734              |
| `embed:toolChoiceBar:m7:76:s1`         | `sections[1].toolChoiceBar`                         | M7/76               |
| `embed:toolChoiceBar:m7:77:s1`         | `sections[1].toolChoiceBar`                         | M7/77               |
| `embed:toolChoiceBar:m7:861:s1`        | `sections[1].toolChoiceBar`                         | M7/861              |
| `embed:toolChoiceBar:m7:88:s1`         | `sections[1].toolChoiceBar`                         | M7/88               |
| `embed:toolChoiceBar:m7:90:s1`         | `sections[1].toolChoiceBar`                         | M7/90 (prompt-tool) |
| `embed:toolChoiceBar:m7:84:s1`         | `sections[1].toolChoiceBar`                         | M7/84               |
| `embed:toolChoiceBar:m10:10.48:s1`     | `sections[1].toolChoiceBar`                         | M10/10.48           |
| `embed:toolChoiceBar:m13:13.5:s1`      | `sections[1].toolChoiceBar`                         | M13/13.5            |
| `embed:toolChoiceBar:m10:10.35:s2`     | `sections[2].toolChoiceBar`                         | M10/10.35           |
| `embed:toolChoiceBar:m10:10.36:s3`     | `sections[3].toolChoiceBar`                         | M10/10.36           |
| `embed:toolChoiceBar:m10:10.37:s2`     | `sections[2].toolChoiceBar`                         | M10/10.37           |
| `embed:preCopyCheckBlock:m10:10.36`    | `preCopyCheckBlock`                                 | M10/10.36           |
| `embed:toolChoiceBar:m12:120.25:s2`    | `sections[2].toolChoiceBar`                         | M12/120.25          |
| `embed:preCopyCheckBlock:m12:120.25`   | `preCopyCheckBlock`                                 | M12/120.25          |

**Pastaba:** `audit:embed-catalog` EMBED_KEYS = 6 top-level; master taip pat skaičiuoja `toolChoiceBar`, `pipelineDiagram`, `presentationToolsBlock`.

## Lentelės (TE-3)

| elementId            | M/slide   | comparisonStyle | Heading                                                            |
| -------------------- | --------- | --------------- | ------------------------------------------------------------------ |
| `table:m4:54.5:s7`   | M4/54.5   | ne              | Sisteminis promptas ir Master promptas: skirtumai                  |
| `table:m4:55:s9`     | M4/55     | ne              | Proceso promptas: savo darbo eigos sudarymas                       |
| `table:m4:48:s3`     | M4/48     | ne              | Kas yra paskatinamasis mokymas (RL / RLHF)?                        |
| `table:m4:53:s3`     | M4/53     | ne              | Svarbiausi DI įrankiai                                             |
| `table:m4:59:s5`     | M4/59     | ne              | Atviros duomenų bazės ir RAG                                       |
| `table:m4:60:s6`     | M4/60     | ne              | Darbas su RAG: atmintis, išoriniai šaltiniai ir duomenų paruošimas |
| `table:m4:61:s1`     | M4/61     | ne              | Kada ką? (solutionMatrixStyle + toolChoiceBar)                     |
| `table:m4:61:s2`     | M4/61     | ne              | Tipinė eiga (30–45 min)                                            |
| `table:m7:71.35:s1`  | M7/71.35  | ne              | Kada ką? (sync M4/61)                                              |
| `table:m7:71.35:s2`  | M7/71.35  | ne              | Tipinė eiga (30–45 min) (sync M4/61)                               |
| `table:m4:66:s5`     | M4/66     | ne              | Tokenų ekonomika                                                   |
| `table:m4:66.25:s3`  | M4/66.25  | ne              | Konteksto degradacija: kodėl modeliai „pamiršta“?                  |
| `table:m4:66.6:s5`   | M4/66.6   | ne              | Neigiami promptai (ko vengti)                                      |
| `table:m5:47.2:s2`   | M5/47.2   | taip            | Tema-antraštė vs teiginys-antraštė                                 |
| `table:m6:68:s3`     | M6/68     | ne              | Praktika: Vieno puslapio tinklalapio kūrimas (HTML)                |
| `table:m7:734:s1`    | M7/734    | ne              | Sprendimų filtrai                                                  |
| `table:m7:76:s10`    | M7/76     | ne              | Verslo duomenų išplėtimas                                          |
| `table:m7:78:s1`     | M7/78     | ne              | DI vaidmuo verslo analizėje                                        |
| `table:m7:84:s1`     | M7/84     | ne              | Kur laikyti duomenis: DB įrankiai (situacijos chip’ai)             |
| `table:m7:67.8:s2`   | M7/67.8   | taip            | FAKTAI vs SPĖJIMAI                                                 |
| `table:m7:67.8:s3`   | M7/67.8   | ne              | Kodėl DI daro haliucinacijas?                                      |
| `table:m7:67.8:s4`   | M7/67.8   | ne              | Keturi kontrolės lygiai                                            |
| `table:m7:104:s1`    | M7/104    | ne              | Papildoma: istorijos modelis ir geri dashboard'ai                  |
| `table:m7:106:s6`    | M7/106    | ne              | Papildoma: DI pagalba + super promptas + alternatyvos              |
| `table:m10:10.36:s1` | M10/10.36 | ne              | Kur paleisti – keturi sluoksniai                                   |
| `table:m10:10.36:s2` | M10/10.36 | ne              | Kur paleisti – orientacija (Railway / Render / Fly.io)             |
| `table:m10:10.37:s1` | M10/10.37 | ne              | GitHub kaip kodo šaltinis                                          |
| `table:m10:10.65:s5` | M10/10.65 | ne              | Gilesnė eigos specifikacija: 10 scenarijų (collapsible)            |

## Kind × maturity scorecard (TE-4)

<!-- AUTO:te-scorecard:start -->

| Kind             |   N | Avg maturity | Maturity ≤1 |
| ---------------- | --: | -----------: | ----------: |
| `diagram`        |  42 |         3.24 |           0 |
| `embed`          |  48 |         2.10 |           0 |
| `lab`            |   7 |         3.14 |           0 |
| `off-renderer`   |   5 |         2.80 |           0 |
| `orphaned`       |   2 |         1.00 |           2 |
| `renderer-alias` |   2 |         1.00 |           2 |
| `slide-type`     |  46 |         2.00 |           0 |
| `table`          |  51 |         1.88 |           5 |

**P0 (diagram/lab/off-renderer, maturity ≤1):** _nėra_.

<!-- AUTO:te-scorecard:end -->

## Nedaryti

- Redaguoti `<!-- AUTO:… -->` blokų turinį ranka (baseline / scorecard) – jie generuojami, o CI fail'ina drift'ą.
- Merginti patch / completion / icon registry į šią lentelę.
- Trinti orphaned Schema3 / ContextFlow be atskiro cleanup ticketo.
- Force-META / M4P–M7P copy klases čia (lieka `M4_PROMPT_MATURITY.md`, `M7_PROMPT_MATURITY.md`).
- Kurti naują UI „kad registry būtų pilnesnis“ – tik registruoti esamą.
