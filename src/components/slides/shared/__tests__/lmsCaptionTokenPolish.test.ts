import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { DIAGRAM_TOKENS } from '../diagramTokens';

/**
 * Wave 4 residual caption floor – SVG diagram titles use titleWeight.
 * Wave 4b – M10/M15 residual size ladder (no raw 800 / title 14).
 * @see docs/development/DIAGRAM_KIT_STANDARD.md §Non-spine / residual
 * @see docs/development/LMS_DIAGRAM_POLISH_10_2.md Wave 4b
 */
const SHARED_DIR = join(dirname(fileURLToPath(import.meta.url)), '..');

const WAVE_4B_FILES = [
  'M10WorkflowSpecDiagram.tsx',
  'M10IncidentPlaybookDiagram.tsx',
  'M10ToolDecisionTreeDiagram.tsx',
  'M10LearningLoopDiagram.tsx',
  'M10DepthRolesMiniDiagram.tsx',
  'M15PracticeLoopDiagram.tsx',
  'M10OrchestratorDiagram.tsx',
] as const;

describe('lmsCaptionTokenPolish (Wave 4)', () => {
  it('keeps LMS SVG caption title weight floor', () => {
    expect(DIAGRAM_TOKENS.typography.titleWeight).toBe(700);
    expect(DIAGRAM_TOKENS.typography.title.desktop).toBe(17);
    expect(DIAGRAM_TOKENS.typography.title.compact).toBe(15);
  });
});

describe('lmsCaptionTokenPolish (Wave 4b residual size ladder)', () => {
  it('keeps step / sub / edge typography floors', () => {
    expect(DIAGRAM_TOKENS.typography.stepLabel.desktop).toBe(12);
    expect(DIAGRAM_TOKENS.typography.stepLabel.compact).toBe(10);
    expect(DIAGRAM_TOKENS.typography.stepSub.desktop).toBe(10);
    expect(DIAGRAM_TOKENS.typography.edgeLabel.size).toBe(12);
    expect(DIAGRAM_TOKENS.typography.edgeLabel.weight).toBe(500);
  });

  it('in-scope residual diagrams avoid raw 800 and title fontSize 14', () => {
    for (const file of WAVE_4B_FILES) {
      const src = readFileSync(join(SHARED_DIR, file), 'utf8');
      expect(src, file).not.toMatch(/fontWeight=["']800["']/);
      expect(src, file).not.toMatch(/fontWeight=\{800\}/);
      expect(src, file).not.toMatch(/fontSize=["']14["']/);
      expect(src, file).toContain('DIAGRAM_TOKENS.typography');
    }
  });
});
