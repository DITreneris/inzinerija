import { describe, it, expect } from 'vitest';
import {
  findJourneyChoiceByStored,
  isM7JourneyChoiceId,
  migrateModuleJourneyFocusLabelsToIds,
  normalizeModuleJourneyFocusId,
} from '../moduleJourneyFocus';
import type { JourneyChoice } from '../../types/modules';

describe('moduleJourneyFocus', () => {
  it('normalizes legacy LT labels to choice ids', () => {
    expect(normalizeModuleJourneyFocusId('Pardavimai')).toBe('pardavimai');
    expect(normalizeModuleJourneyFocusId('pardavimai')).toBe('pardavimai');
  });

  it('isM7JourneyChoiceId recognizes stable ids', () => {
    expect(isM7JourneyChoiceId('kita')).toBe(true);
    expect(isM7JourneyChoiceId('Pardavimai')).toBe(false);
  });

  it('findJourneyChoiceByStored resolves by id across locale labels', () => {
    const enChoices: JourneyChoice[] = [
      {
        id: 'pardavimai',
        branchIds: ['viz'],
        label: 'Sales',
        subtitle: 'EN',
        icon: 'TrendingUp',
      },
    ];
    expect(findJourneyChoiceByStored(enChoices, 'pardavimai')?.label).toBe(
      'Sales'
    );
    expect(findJourneyChoiceByStored(enChoices, 'Pardavimai')?.label).toBe(
      'Sales'
    );
  });

  it('migrateModuleJourneyFocusLabelsToIds converts module 7 legacy values', () => {
    const migrated = migrateModuleJourneyFocusLabelsToIds({
      7: 'Rinkodara',
    });
    expect(migrated).toEqual({ 7: 'rinkodara' });
  });
});
