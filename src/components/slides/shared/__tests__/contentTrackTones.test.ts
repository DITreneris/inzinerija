import { describe, expect, it } from 'vitest';
import {
  CONTENT_TRACK_TONE_SET,
  M13_AEC_TONES,
  M13_CONSISTENCY_LOCK_TONES,
  M13_MEDIA_PIPELINE_TONES,
  M13_POSTPROD_TONES,
  M13_PROMPT_STACK_TONES,
  M13_STILL_WORKFLOW_TONES,
  M13_TURINIO_WORKFLOW_TONES,
} from '../contentTrackDiagramTones';
import {
  getContentTrackColors,
  isContentTrackAccent,
} from '../contentTrackTokens';
import {
  DIAGRAM_TONE_COLORS,
  DIAGRAM_TONE_COLORS_DARK,
} from '../diagramTokens';

describe('contentTrack tones (GOLDEN §6b)', () => {
  it('maps have expected lengths and only DiagramTone values', () => {
    expect(M13_AEC_TONES).toEqual(['brand', 'amber', 'emerald']);
    expect(M13_PROMPT_STACK_TONES).toEqual(['amber', 'brand', 'slate']);
    expect(M13_MEDIA_PIPELINE_TONES).toHaveLength(6);
    expect(M13_TURINIO_WORKFLOW_TONES).toHaveLength(7);
    expect(M13_CONSISTENCY_LOCK_TONES).toEqual([
      'amber',
      'brand',
      'amber',
      'emerald',
    ]);
    expect(M13_POSTPROD_TONES).toEqual(['brand', 'amber', 'slate', 'emerald']);
    expect(M13_STILL_WORKFLOW_TONES).toEqual([
      'brand',
      'amber',
      'slate',
      'amber',
      'emerald',
    ]);

    for (const tone of [
      ...M13_AEC_TONES,
      ...M13_PROMPT_STACK_TONES,
      ...M13_MEDIA_PIPELINE_TONES,
      ...M13_TURINIO_WORKFLOW_TONES,
      ...M13_CONSISTENCY_LOCK_TONES,
      ...M13_POSTPROD_TONES,
      ...M13_STILL_WORKFLOW_TONES,
    ]) {
      expect(CONTENT_TRACK_TONE_SET.has(tone)).toBe(true);
      expect(DIAGRAM_TONE_COLORS[tone].bottom).toMatch(/^#/);
      expect(DIAGRAM_TONE_COLORS_DARK[tone].bottom).toMatch(/^#/);
    }
  });

  it('softRose differs from default palette bgEnd (light + dark)', () => {
    const light = getContentTrackColors(false);
    const dark = getContentTrackColors(true);
    expect(light.softRose).toBe('#fff1f2');
    expect(dark.softRose).toBe('#3f1d2e');
    expect(light.mutedDrift).not.toBe(light.vibrantLock);
  });

  it('isContentTrackAccent only for rose', () => {
    expect(isContentTrackAccent('rose')).toBe(true);
    expect(isContentTrackAccent('sky')).toBe(false);
    expect(isContentTrackAccent(undefined)).toBe(false);
  });
});
