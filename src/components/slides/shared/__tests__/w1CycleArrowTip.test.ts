/**
 * W1 cycle forward tip contract: local tip≥10, not locked to legacy global markerLen (6).
 */
import { describe, expect, it } from 'vitest';
import { AGENT_WORKFLOW_ARROW } from '../agentWorkflowLayout';
import { DIAGRAM_TOKENS } from '../diagramTokens';
import { M7_DATA_STORY_ARROW_TIP } from '../M7DataStoryCycleDiagram';
import { M10_LEARNING_LOOP_ARROW_TIP } from '../m10LearningLoopLayout';
import { RL_PROCESS_GEOMETRY } from '../RlProcessDiagram';

describe('W1 cycle arrow tip contract', () => {
  const tips = [
    ['AgentWorkflow', AGENT_WORKFLOW_ARROW.markerLen],
    ['RlProcess', RL_PROCESS_GEOMETRY.arrowMarkerLen],
    ['M7DataStory', M7_DATA_STORY_ARROW_TIP],
    ['M10LearningLoop', M10_LEARNING_LOOP_ARROW_TIP],
  ] as const;

  it.each(tips)(
    '%s uses processTipLen (not legacy markerLen)',
    (_name, tip) => {
      expect(tip).toBe(DIAGRAM_TOKENS.arrow.processTipLen);
      expect(tip).toBeGreaterThan(DIAGRAM_TOKENS.arrow.markerLen);
    }
  );
});
