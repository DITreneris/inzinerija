import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HelpCircle, Repeat, Workflow } from 'lucide-react';
import { resolveIcon, resolveLucideIcon } from '../resolveIcon';

describe('resolveIcon', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('maps Workflow and Repeat to distinct Lucide icons in summary context', () => {
    expect(resolveLucideIcon('Workflow', 'summary')).toBe(Workflow);
    expect(resolveLucideIcon('Repeat', 'summary')).toBe(Repeat);
    expect(resolveLucideIcon('Workflow', 'summary')).not.toBe(Repeat);
  });

  it('returns HelpCircle for unknown introPie keys when fallback enabled', () => {
    expect(resolveLucideIcon('NotARealIcon', 'introPie')).toBe(HelpCircle);
  });

  it('returns undefined for emoji keys (legacy)', () => {
    expect(
      resolveLucideIcon('✍️', 'introPie', { fallback: false })
    ).toBeUndefined();
    expect(
      resolveLucideIcon('🎯', 'summary', { fallback: false })
    ).toBeUndefined();
  });

  it('resolves portal kebab-case keys', () => {
    const kpi = resolveIcon('trending-up', 'portalKpi');
    const tool = resolveIcon('shield', 'portalTool');
    expect(kpi).toBeDefined();
    expect(tool).toBeDefined();
  });

  it('resolves journey and summary keys from allowlist', () => {
    expect(resolveLucideIcon('Briefcase', 'journey')).toBeDefined();
    expect(resolveLucideIcon('Database', 'journey')).toBeDefined();
    expect(resolveLucideIcon('Users', 'summary')).toBeDefined();
  });
});
