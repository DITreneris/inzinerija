import { describe, expect, it } from 'vitest';
import modulesData from '../modules.json';
import type { Module } from '../../types/modules';

const modules = modulesData.modules as Module[];

describe('M10 slide order', () => {
  it('keeps the human control simulator between 3A and system prompt', () => {
    const m10 = modules.find((module) => module.id === 10);
    const ids = m10?.slides.map((slide) => slide.id) ?? [];

    expect(ids.indexOf(10.25)).toBeGreaterThanOrEqual(0);
    expect(ids.indexOf(10.26)).toBe(ids.indexOf(10.25) + 1);
    expect(ids.indexOf(10.3)).toBe(ids.indexOf(10.26) + 1);
  });
});
