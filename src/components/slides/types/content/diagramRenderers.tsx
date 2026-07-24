import type { ReactNode } from 'react';
import {
  DiagramImageFrame,
  DiPrezentacijosWorkflowBlock,
  AgentWorkflowBlock,
  LlmArchDiagramBlock,
  LlmAutoregressiveBlock,
  M10AgentTaxonomyBlock,
  M10IncidentPlaybookBlock,
  M10HumanControlSimulatorBlock,
  M10LearningLoopBlock,
  M10OrchestratorBlock,
  M10ThreeAStrategyBlock,
  M10ToolDecisionTreeBlock,
  M10TriggerFlowBlock,
  M10WorkflowSpecBlock,
  M12MultiAgentSchemaBlock,
  M12ThreeLabsBlock,
  M13AecFunnelBlock,
  M13ConsistencyLockBlock,
  M13MediaPipelineBlock,
  M13PostprodBlock,
  M13PromptStackBlock,
  M13RuleOfThirdsBlock,
  M15PracticeLoopBlock,
  TurinioWorkflowBlock,
  M7AnalysisTypesBlock,
  M7BiSchemaBlock,
  M7DaPipelineBlock,
  M7DataPrepWorkflowBlock,
  M7DataStoryCycleBlock,
  M7ThreeAgentsBlock,
  M9DataWorkflowBlock,
  M9WorkflowStepCopyBlock,
  ProcessStepper,
  RagDuomenuRuosimasBlock,
  RlProcessBlock,
  StrukturuotasProcesasBlock,
} from '../../shared';
import { renderBodyWithBold } from '../shared';

type BodyPlacement = 'before' | 'after' | 'none';

interface DiagramRenderContext {
  moduleId?: number;
  slideId?: number;
  imageAlt?: string;
}

interface DiagramRenderer {
  key: string;
  bodyPlacement: BodyPlacement;
  render: (context: DiagramRenderContext) => ReactNode;
}

const DIAGRAM_RENDERERS: DiagramRenderer[] = [
  {
    key: 'm7_da_pipeline',
    bodyPlacement: 'after',
    render: () => <M7DaPipelineBlock />,
  },
  {
    key: 'm7_bi_schema',
    bodyPlacement: 'after',
    render: () => <M7BiSchemaBlock />,
  },
  {
    key: 'da_pipeline_6',
    bodyPlacement: 'after',
    render: () => <M7DaPipelineBlock />,
  },
  {
    key: 'da_bi_schema_4',
    bodyPlacement: 'after',
    render: () => <M7BiSchemaBlock />,
  },
  {
    key: 'rl_process_diagram',
    bodyPlacement: 'after',
    render: ({ moduleId, slideId }) => (
      <RlProcessBlock moduleId={moduleId} slideId={slideId} showHero={false} />
    ),
  },
  {
    key: 'di_prezentacijos_workflow',
    bodyPlacement: 'after',
    render: () => <DiPrezentacijosWorkflowBlock />,
  },
  {
    key: 'm7_analysis_types',
    bodyPlacement: 'after',
    render: () => <M7AnalysisTypesBlock />,
  },
  {
    key: 'm7_data_prep_workflow',
    bodyPlacement: 'after',
    render: () => <M7DataPrepWorkflowBlock />,
  },
  {
    key: 'm7_data_story_cycle',
    bodyPlacement: 'after',
    render: () => <M7DataStoryCycleBlock />,
  },
  {
    key: 'm7_three_agents_flow',
    bodyPlacement: 'after',
    render: () => <M7ThreeAgentsBlock />,
  },
  {
    key: 'm7_master_workflow',
    bodyPlacement: 'after',
    render: () => <M9DataWorkflowBlock context="m7_master" />,
  },
  {
    key: 'm9_data_workflow',
    bodyPlacement: 'after',
    render: () => <M9DataWorkflowBlock />,
  },
  {
    key: 'm9_workflow_step_prompts',
    bodyPlacement: 'after',
    render: () => <M9WorkflowStepCopyBlock />,
  },
  {
    key: 'rag_duomenu_ruosimas',
    bodyPlacement: 'after',
    render: () => <RagDuomenuRuosimasBlock />,
  },
  {
    key: 'custom_gpt_process',
    bodyPlacement: 'none',
    render: () => <ProcessStepper />,
  },
  {
    key: 'strukturuotas_procesas',
    bodyPlacement: 'before',
    render: () => <StrukturuotasProcesasBlock />,
  },
  {
    key: 'llm_arch',
    bodyPlacement: 'before',
    render: () => <LlmArchDiagramBlock />,
  },
  {
    key: 'llm_autoregressive',
    bodyPlacement: 'after',
    render: () => <LlmAutoregressiveBlock />,
  },
  {
    key: 'agent_workflow_diagram',
    bodyPlacement: 'after',
    render: () => <AgentWorkflowBlock />,
  },
  {
    key: 'm10_trigger_flow',
    bodyPlacement: 'after',
    render: () => <M10TriggerFlowBlock />,
  },
  {
    key: 'm10_three_a_strategy',
    bodyPlacement: 'after',
    render: () => <M10ThreeAStrategyBlock />,
  },
  {
    key: 'm10_agent_taxonomy',
    bodyPlacement: 'after',
    render: () => <M10AgentTaxonomyBlock />,
  },
  {
    key: 'm10_learning_loop',
    bodyPlacement: 'after',
    render: () => <M10LearningLoopBlock />,
  },
  {
    key: 'm10_agent_orchestrator',
    bodyPlacement: 'after',
    render: () => <M10OrchestratorBlock />,
  },
  {
    key: 'm10_human_control_simulator',
    bodyPlacement: 'after',
    render: () => <M10HumanControlSimulatorBlock />,
  },
  {
    key: 'm10_tool_decision_tree',
    bodyPlacement: 'after',
    render: () => <M10ToolDecisionTreeBlock />,
  },
  {
    key: 'm10_workflow_spec',
    bodyPlacement: 'after',
    render: () => <M10WorkflowSpecBlock />,
  },
  {
    key: 'm10_incident_playbook',
    bodyPlacement: 'after',
    render: () => <M10IncidentPlaybookBlock />,
  },
  {
    key: 'm12_three_labs',
    bodyPlacement: 'after',
    render: () => <M12ThreeLabsBlock />,
  },
  {
    key: 'm12_multi_agent_schema',
    bodyPlacement: 'after',
    render: () => <M12MultiAgentSchemaBlock />,
  },
  {
    key: 'm13_aec_funnel',
    bodyPlacement: 'after',
    render: () => <M13AecFunnelBlock />,
  },
  {
    key: 'm13_consistency_lock',
    bodyPlacement: 'after',
    render: () => <M13ConsistencyLockBlock />,
  },
  {
    key: 'm13_media_pipeline',
    bodyPlacement: 'after',
    render: () => <M13MediaPipelineBlock />,
  },
  {
    key: 'm13_postprod_steps',
    bodyPlacement: 'after',
    render: () => <M13PostprodBlock />,
  },
  {
    key: 'm13_prompt_stack',
    bodyPlacement: 'after',
    render: () => <M13PromptStackBlock />,
  },
  {
    key: 'm13_rule_of_thirds',
    bodyPlacement: 'after',
    render: () => <M13RuleOfThirdsBlock />,
  },
  {
    key: 'turinio_workflow',
    bodyPlacement: 'after',
    render: () => <TurinioWorkflowBlock />,
  },
  {
    key: 'm15_practice_loop',
    bodyPlacement: 'after',
    render: () => <M15PracticeLoopBlock />,
  },
  {
    key: 'da_schema_entity_example',
    bodyPlacement: 'after',
    render: ({ imageAlt }) => (
      <DiagramImageFrame
        src="/da_schema_entity_example.svg"
        alt={imageAlt ?? 'Duomenų schemos pavyzdys'}
      />
    ),
  },
];

function normalizeImageKey(image: string) {
  return image.replace(/^\//, '').toLowerCase();
}

function imageKeyMatches(normalizedImage: string, rendererKey: string) {
  return (
    normalizedImage === rendererKey ||
    normalizedImage === `${rendererKey}.svg` ||
    normalizedImage.endsWith(`/${rendererKey}`) ||
    normalizedImage.endsWith(`/${rendererKey}.svg`)
  );
}

export function getDiagramRendererKeys() {
  return DIAGRAM_RENDERERS.map(({ key }) => key);
}

export function renderDiagramSection(
  image: string | undefined,
  body: string | undefined,
  context: DiagramRenderContext
): ReactNode | null {
  if (!image) return null;

  const normalized = normalizeImageKey(image);
  const renderer = DIAGRAM_RENDERERS.find(({ key }) =>
    imageKeyMatches(normalized, key)
  );
  if (!renderer) return null;

  const bodyNode = body ? (
    <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
      {renderBodyWithBold(body)}
    </p>
  ) : null;

  return (
    <div className="my-4">
      {renderer.bodyPlacement === 'before' && bodyNode ? (
        <div className="mb-3 text-base text-gray-600 dark:text-gray-400">
          {renderBodyWithBold(body)}
        </div>
      ) : null}
      {renderer.render(context)}
      {renderer.bodyPlacement === 'after' ? bodyNode : null}
    </div>
  );
}
