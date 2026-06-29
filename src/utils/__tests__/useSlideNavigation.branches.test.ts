import { describe, it, expect } from 'vitest';
import {
  isSlideHiddenForNav,
  getAdjacentVisibleIndex,
  resolveVisibleIndex,
  countVisibleSlides,
  getVisiblePosition,
} from '../useSlideNavigation';
import type { Slide } from '../../types/modules';

function slide(id: number, opts: Partial<Slide> = {}): Slide {
  return {
    id,
    title: `S${id}`,
    subtitle: '',
    type: 'content-block',
    ...opts,
  };
}

describe('isSlideHiddenForNav (Lygis B – M7 šakos)', () => {
  it('core skaidrė (be pathBranch) visada matoma', () => {
    expect(isSlideHiddenForNav(slide(1), { activeBranchIds: ['viz'] })).toBe(
      false
    );
    expect(isSlideHiddenForNav(slide(1), { activeBranchIds: [] })).toBe(false);
    expect(isSlideHiddenForNav(slide(1), { activeBranchIds: null })).toBe(
      false
    );
  });

  it('šakos skaidrė matoma tik kai sutampa fokusas', () => {
    const s = slide(2, { pathBranch: ['viz'] });
    expect(isSlideHiddenForNav(s, { activeBranchIds: ['viz'] })).toBe(false);
    expect(isSlideHiddenForNav(s, { activeBranchIds: ['technika'] })).toBe(
      true
    );
    expect(isSlideHiddenForNav(s, { activeBranchIds: [] })).toBe(true);
  });

  it('fokusas nepasirinktas (null) – visos šakos matomos', () => {
    const s = slide(2, { pathBranch: ['viz'] });
    expect(isSlideHiddenForNav(s, { activeBranchIds: null })).toBe(false);
    expect(isSlideHiddenForNav(s, {})).toBe(false);
  });

  it('Fast track paslepia optional nepriklausomai nuo šakų', () => {
    const s = slide(3, { optional: true });
    expect(isSlideHiddenForNav(s, { skipOptional: true })).toBe(true);
    expect(isSlideHiddenForNav(s, { skipOptional: false })).toBe(false);
  });

  it('skaidrė su keliomis šakomis matoma kai sutampa bent viena', () => {
    const s = slide(4, { pathBranch: ['technika', 'etika-plus'] });
    expect(isSlideHiddenForNav(s, { activeBranchIds: ['etika-plus'] })).toBe(
      false
    );
    expect(isSlideHiddenForNav(s, { activeBranchIds: ['strategija'] })).toBe(
      true
    );
  });
});

describe('getAdjacentVisibleIndex (šakų filtras)', () => {
  const slides = [
    slide(1), // core
    slide(2, { pathBranch: ['viz'] }),
    slide(3, { pathBranch: ['technika'] }),
    slide(4), // core
  ];

  it('praleidžia nesutampančias šakas pirmyn', () => {
    expect(
      getAdjacentVisibleIndex(slides, 0, true, { activeBranchIds: ['viz'] })
    ).toBe(1);
    expect(
      getAdjacentVisibleIndex(slides, 0, true, {
        activeBranchIds: ['technika'],
      })
    ).toBe(2);
    expect(
      getAdjacentVisibleIndex(slides, 0, true, { activeBranchIds: [] })
    ).toBe(3);
  });

  it('grąžina -1 kai tolesnės matomos skaidrės nėra', () => {
    expect(
      getAdjacentVisibleIndex(slides, 3, true, { activeBranchIds: [] })
    ).toBe(-1);
    expect(
      getAdjacentVisibleIndex(slides, 0, false, { activeBranchIds: [] })
    ).toBe(-1);
  });

  it('praleidžia atgal', () => {
    expect(
      getAdjacentVisibleIndex(slides, 3, false, { activeBranchIds: ['viz'] })
    ).toBe(1);
    expect(
      getAdjacentVisibleIndex(slides, 3, false, { activeBranchIds: [] })
    ).toBe(0);
  });
});

describe('resolveVisibleIndex', () => {
  const slides = [slide(1), slide(2, { pathBranch: ['viz'] }), slide(3)];

  it('palieka matomą indeksą', () => {
    expect(resolveVisibleIndex(slides, 0, { activeBranchIds: [] })).toBe(0);
    expect(resolveVisibleIndex(slides, 2, { activeBranchIds: [] })).toBe(2);
  });

  it('paslėptą indeksą perkelia į artimiausią matomą (pirmyn)', () => {
    expect(resolveVisibleIndex(slides, 1, { activeBranchIds: [] })).toBe(2);
  });

  it('jei pirmyn nėra – atgal', () => {
    const s = [slide(1), slide(2, { pathBranch: ['viz'] })];
    expect(resolveVisibleIndex(s, 1, { activeBranchIds: [] })).toBe(0);
  });
});

describe('countVisibleSlides ir getVisiblePosition', () => {
  const slides = [
    slide(1),
    slide(2, { pathBranch: ['viz'] }),
    slide(3, { pathBranch: ['technika'] }),
    slide(4),
  ];

  it('skaičiuoja matomas pagal fokusą', () => {
    expect(countVisibleSlides(slides, { activeBranchIds: [] })).toBe(2);
    expect(countVisibleSlides(slides, { activeBranchIds: ['viz'] })).toBe(3);
    expect(countVisibleSlides(slides, { activeBranchIds: null })).toBe(4);
  });

  it('pozicija tarp matomų skaidrių (1-based)', () => {
    expect(getVisiblePosition(slides, 3, { activeBranchIds: [] })).toBe(2);
    expect(getVisiblePosition(slides, 1, { activeBranchIds: ['viz'] })).toBe(2);
  });
});
