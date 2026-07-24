/**
 * Autoregressive LLM layout – shaft floor + inter-row feedback grammar.
 */
import { describe, expect, it } from 'vitest';
import { DIAGRAM_TOKENS } from '../diagramTokens';
import { visibleShaftMeetsFloor, visibleShaftLen } from '../diagramLayoutMath';
import {
  GAP,
  ARROW_MARKER_LEN,
  FEEDBACK,
  FB_GAP_BEFORE_BLOCK,
  FB_TIP_H,
  FB_TIP_W,
  FB_CORNER_R,
  ROW_N,
  ROW_N1,
} from '../llmAutoregressiveLayout';

describe('llmAutoregressiveLayout arrow shaft', () => {
  it('keeps LMS stroke.flow floor (≥ 3.5)', () => {
    expect(DIAGRAM_TOKENS.stroke.flow).toBeGreaterThanOrEqual(3.5);
  });

  it('requires userSpaceOnUse: strokeWidth-scaled tip would swallow the shaft', () => {
    const shaft = visibleShaftLen(GAP, ARROW_MARKER_LEN);
    const scaledTip = ARROW_MARKER_LEN * DIAGRAM_TOKENS.stroke.flow;
    expect(scaledTip).toBeGreaterThan(shaft);
    expect(DIAGRAM_TOKENS.arrow.markerUnits).toBe('userSpaceOnUse');
  });

  it('visible shaft meets verticalFlow.minStem floor with user-space markerLen', () => {
    expect(visibleShaftMeetsFloor(GAP, ARROW_MARKER_LEN)).toBe(true);
  });

  it('forward tip is large enough vs stroke.flow (not a faint V under the shaft)', () => {
    expect(ARROW_MARKER_LEN).toBeGreaterThanOrEqual(10);
    expect(ARROW_MARKER_LEN).toBeGreaterThan(DIAGRAM_TOKENS.stroke.flow * 2);
    expect(visibleShaftLen(GAP, ARROW_MARKER_LEN)).toBeGreaterThanOrEqual(
      DIAGRAM_TOKENS.verticalFlow.minStem
    );
  });
});

describe('llmAutoregressiveLayout feedback inter-row U', () => {
  it('keeps tip close above Įvestis N+1 frame (air ~3px, not floating)', () => {
    const inputTop = ROW_N1.input[1];
    expect(FB_GAP_BEFORE_BLOCK).toBe(3);
    expect(inputTop - FEEDBACK.tipY).toBe(FB_GAP_BEFORE_BLOCK);
    expect(FEEDBACK.tipY).toBe(inputTop - FB_GAP_BEFORE_BLOCK);
    expect(FEEDBACK.baseY).toBe(FEEDBACK.tipY - FB_TIP_H);
    expect(FEEDBACK.baseY).toBeLessThan(FEEDBACK.tipY);
  });

  it('keeps start node outside Pasirinkta N (on path origin)', () => {
    const pasirinktaBottom = ROW_N.pasirinkta[1] + ROW_N.pasirinkta[3];
    expect(FEEDBACK.startCircle.cy).toBeGreaterThan(pasirinktaBottom);
    expect(
      FEEDBACK.pathD
        .trimStart()
        .startsWith(`M ${FEEDBACK.startCircle.cx} ${FEEDBACK.startCircle.cy}`)
    ).toBe(true);
  });

  it('uses trough above tip (horizontal segment, not diagonal Q-only)', () => {
    expect(FEEDBACK.troughY).toBeLessThan(FEEDBACK.baseY);
    expect(FEEDBACK.troughY).toBeLessThan(FEEDBACK.tipY);
    expect(FEEDBACK.troughY).toBeGreaterThanOrEqual(
      FEEDBACK.startCircle.cy + FB_CORNER_R
    );
    const qCount = (FEEDBACK.pathD.match(/Q /g) ?? []).length;
    expect(qCount).toBe(2);
    expect(FEEDBACK.pathD).toContain(` ${FEEDBACK.troughY}`);
  });

  it('places label below trough (not above – would bleed into N-row boxes)', () => {
    expect(FEEDBACK.labelY).toBe(FEEDBACK.troughY + 12);
    expect(FEEDBACK.labelY).toBeGreaterThan(FEEDBACK.troughY);
  });

  it('matches RlProcess tip size and LMS feedback stroke floor', () => {
    expect(FB_TIP_H).toBe(12);
    expect(FB_TIP_W).toBe(8);
    expect(FB_CORNER_R).toBe(16);
    expect(FEEDBACK.tipW).toBe(FB_TIP_W);
    expect(DIAGRAM_TOKENS.stroke.feedback).toBeGreaterThanOrEqual(3.5);
  });

  it('ends path at tip Y (polygon and path share tip)', () => {
    expect(FEEDBACK.pathEnd.y).toBe(FEEDBACK.tipY);
    expect(FEEDBACK.pathD).toContain(String(FEEDBACK.tipY));
  });
});
