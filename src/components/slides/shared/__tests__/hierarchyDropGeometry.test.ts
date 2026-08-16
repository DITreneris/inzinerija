import { describe, expect, it } from 'vitest';
import { DIAGRAM_TOKENS } from '../diagramTokens';
import {
  getHierarchyDropStroke,
  getHierarchyShelfStroke,
} from '../hierarchyDropGeometry';

describe('getHierarchyDropStroke', () => {
  const stroke = getHierarchyDropStroke({
    parentCx: 242,
    parentBottomY: 82,
    headerTopY: 113,
  });

  it('drops downward and stops before the header', () => {
    expect(stroke.x1).toBe(242);
    expect(stroke.x2).toBe(242);
    expect(stroke.y1).toBeLessThan(stroke.y2);
    expect(stroke.y2).toBeLessThan(113);
    expect(stroke.strokeWidth).toBe(DIAGRAM_TOKENS.stroke.inactive);
  });

  it('is a shaft only — no process tip / marker fields', () => {
    expect(stroke).not.toHaveProperty('tipLen');
    expect(stroke).not.toHaveProperty('markerLen');
    expect(stroke).not.toHaveProperty('markerEnd');
  });
});

describe('getHierarchyShelfStroke', () => {
  const shelf = getHierarchyShelfStroke({
    parentCx: 242,
    shelfY: 132,
    shelfX1: 68,
    shelfX2: 416,
  });

  it('is a horizontal T-shelf with no process tip / marker fields', () => {
    expect(shelf.y1).toBe(shelf.y2);
    expect(shelf.y1).toBe(132);
    expect(shelf.x1).toBe(68);
    expect(shelf.x2).toBe(416);
    expect(shelf.strokeWidth).toBe(DIAGRAM_TOKENS.stroke.inactive);
    expect(shelf).not.toHaveProperty('tipLen');
    expect(shelf).not.toHaveProperty('markerLen');
    expect(shelf).not.toHaveProperty('markerEnd');
  });
});
