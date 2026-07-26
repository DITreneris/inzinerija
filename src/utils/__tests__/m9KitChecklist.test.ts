import { beforeEach, describe, expect, it } from 'vitest';
import {
  hasM9DataReadyBadge,
  isM9KitComplete,
  loadM9KitChecklist,
  saveM9KitChecklist,
} from '../m9KitChecklist';

describe('m9KitChecklist', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('persists checklist state including reliability', () => {
    saveM9KitChecklist({
      catalog: true,
      csv: false,
      summary: true,
      reliability: true,
    });
    expect(loadM9KitChecklist()).toEqual({
      catalog: true,
      csv: false,
      summary: true,
      reliability: true,
    });
  });

  it('isM9KitComplete requires all four items', () => {
    expect(
      isM9KitComplete({
        catalog: true,
        csv: true,
        summary: true,
        reliability: false,
      })
    ).toBe(false);
    expect(
      isM9KitComplete({
        catalog: true,
        csv: true,
        summary: true,
        reliability: true,
      })
    ).toBe(true);
  });

  it('hasM9DataReadyBadge needs 93.1 and 93.2', () => {
    expect(hasM9DataReadyBadge([93.1])).toBe(false);
    expect(hasM9DataReadyBadge([93.1, 93.2])).toBe(true);
  });

  it('defaults missing reliability to false on load', () => {
    localStorage.setItem(
      'm9_kit_checklist_v1',
      JSON.stringify({ catalog: true, csv: true, summary: true })
    );
    expect(loadM9KitChecklist().reliability).toBe(false);
  });
});
