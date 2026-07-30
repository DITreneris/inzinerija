import { describe, expect, it } from 'vitest';
import {
  getPrimaryReadinessGap,
  getWeakestReadinessDimensions,
  isTeamReadinessComplete,
  updateTeamReadinessSelection,
  type TeamReadinessSelections,
} from '../m10TeamReadinessModel';
import {
  formatTeamReadinessProfile,
  getTeamReadinessNextAction,
} from '../m10TeamReadinessContent';

describe('m10TeamReadinessModel', () => {
  it('requires all three dimensions before deriving a gap', () => {
    const partial: TeamReadinessSelections = {
      use: 'systematic',
      structure: 'fragmented',
    };

    expect(isTeamReadinessComplete(partial)).toBe(false);
    expect(getWeakestReadinessDimensions(partial)).toEqual([]);
    expect(getPrimaryReadinessGap(partial)).toBeNull();
  });

  it('uses the weakest dimension as the next-action driver', () => {
    const selections: TeamReadinessSelections = {
      use: 'systematic',
      structure: 'ad_hoc',
      learning: 'fragmented',
    };

    expect(isTeamReadinessComplete(selections)).toBe(true);
    expect(getWeakestReadinessDimensions(selections)).toEqual(['structure']);
    expect(getPrimaryReadinessGap(selections)).toBe('structure');
    expect(getTeamReadinessNextAction('lt', 'structure')).toMatch(
      /prompto šabloną/i
    );
  });

  it('uses a shared baseline when several dimensions tie', () => {
    const selections: TeamReadinessSelections = {
      use: 'ad_hoc',
      structure: 'ad_hoc',
      learning: 'systematic',
    };

    expect(getWeakestReadinessDimensions(selections)).toEqual([
      'use',
      'structure',
    ]);
    expect(getPrimaryReadinessGap(selections)).toBe('shared_baseline');
    expect(getTeamReadinessNextAction('en', 'shared_baseline')).toMatch(
      /shared process/i
    );
  });

  it('updates selections immutably and formats LT/EN profiles without a score', () => {
    const base: TeamReadinessSelections = { use: 'fragmented' };
    const next = updateTeamReadinessSelection(base, 'structure', 'systematic');
    expect(next).not.toBe(base);
    expect(next.structure).toBe('systematic');

    const complete: TeamReadinessSelections = {
      use: 'fragmented',
      structure: 'systematic',
      learning: 'ad_hoc',
    };
    const lt = formatTeamReadinessProfile('lt', complete);
    const en = formatTeamReadinessProfile('en', complete);

    expect(lt).toContain('Komandos pasirengimo profilis');
    expect(lt).toContain('Silpniausia dimensija');
    expect(en).toContain('Team readiness profile');
    expect(en).toContain('Weakest dimension');
    expect(`${lt}\n${en}`).not.toMatch(/\b\d+\s*\/\s*\d+\b/);
  });
});
