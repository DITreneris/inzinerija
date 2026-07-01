import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const indexHtmlPath = resolve('index.html');
const indexCssPath = resolve('src/index.css');

describe('startup flicker guards', () => {
  it('applies dark mode before the React module boots', () => {
    const html = readFileSync(indexHtmlPath, 'utf8');
    const themeScriptIndex = html.indexOf("classList.add('dark')");
    const reactModuleIndex = html.indexOf('<script type="module"');

    expect(themeScriptIndex).toBeGreaterThan(-1);
    expect(reactModuleIndex).toBeGreaterThan(-1);
    expect(themeScriptIndex).toBeLessThan(reactModuleIndex);
  });

  it('keeps the startup layout stable while fonts and scrollbars load', () => {
    const html = readFileSync(indexHtmlPath, 'utf8');
    const css = readFileSync(indexCssPath, 'utf8');

    expect(css).toContain('scrollbar-gutter: stable');
    expect(css).not.toContain('@import url(');
    expect(html).toContain('display=optional');
    expect(html).toContain('rel="preload"');
  });
});
