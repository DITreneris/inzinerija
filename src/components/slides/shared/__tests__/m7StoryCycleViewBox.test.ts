import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(
  join(__dirname, '../M7DataStoryCycleDiagram.tsx'),
  'utf8'
);

describe('M7DataStoryCycleDiagram viewBox (M79-S3/S4)', () => {
  it('keeps compact viewBox tall enough for 5-box stack + cycle cue', () => {
    const compactH = Number(
      src.match(/COMPACT_VIEWBOX_H\s*=\s*(\d+)/)?.[1] ?? 0
    );
    const startY = Number(src.match(/COMPACT_START_Y\s*=\s*(\d+)/)?.[1] ?? 0);
    const boxH = Number(src.match(/COMPACT_BOX_H\s*=\s*(\d+)/)?.[1] ?? 0);
    const gap = Number(src.match(/COMPACT_GAP\s*=\s*(\d+)/)?.[1] ?? 0);
    const stackBottom = startY + 4 * (boxH + gap) + boxH;
    expect(compactH).toBeGreaterThanOrEqual(stackBottom);
    expect(compactH).toBeGreaterThanOrEqual(432);
  });

  it('crops desktop dead air below former 268 height', () => {
    const desktopH = Number(
      src.match(/DESKTOP_VIEWBOX_H\s*=\s*(\d+)/)?.[1] ?? 0
    );
    expect(desktopH).toBeLessThan(268);
    expect(desktopH).toBeGreaterThanOrEqual(200);
  });
});
