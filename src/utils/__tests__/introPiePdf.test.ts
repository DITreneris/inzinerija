/**
 * Unit testai PDF atsisiuntimo funkcijai (introPiePdf.ts).
 * jsPDF mock – nevykdomas tikras doc.save(); tikrinamas elgesys (save filename, brand/segment text, 7 segmentų smoke).
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { IntroActionPiePdfSegment } from '../../types/modules';
import type { ToolInfo, GlossaryTermInfo } from '../introPiePdf';
import { downloadIntroPiePdf, ensurePdfFont } from '../introPiePdf';
import introPiePdfContentJson from '../../data/introPiePdfContent.json';
import toolsJson from '../../data/tools.json';
import glossaryJson from '../../data/glossary.json';

const mockSave = vi.fn();
const mockText = vi.fn();
const mockSetFontSize = vi.fn();
const mockSetFont = vi.fn();
const mockSetTextColor = vi.fn();
const mockSetFillColor = vi.fn();
const mockRect = vi.fn();
const mockFill = vi.fn();
const mockAddFileToVFS = vi.fn();
const mockAddFont = vi.fn();
const mockAddPage = vi.fn();
const mockSplitTextToSize = vi.fn((text: string) => [text]);

function createMockDoc() {
  return {
    save: mockSave,
    text: mockText,
    setFontSize: mockSetFontSize,
    setFont: mockSetFont,
    setTextColor: mockSetTextColor,
    setFillColor: mockSetFillColor,
    rect: mockRect,
    fill: mockFill,
    addFileToVFS: mockAddFileToVFS,
    addFont: mockAddFont,
    addPage: mockAddPage,
    splitTextToSize: mockSplitTextToSize,
  };
}

vi.mock('jspdf', () => ({
  jsPDF: vi.fn().mockImplementation(() => createMockDoc()),
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockSplitTextToSize.mockImplementation((text: string) => [text]);
});

describe('introPiePdf', () => {
  describe('downloadIntroPiePdf', () => {
    const minimalSegment: IntroActionPiePdfSegment = {
      title: 'Test segment',
      top5Tips: ['Tip 1'],
      mainToolName: 'ToolA',
      additionalToolNames: [],
      workflowSteps: ['Step 1'],
      glossaryTermNames: ['Term1'],
      systemPrompt: 'You are helpful.',
      motivationWish: 'Good luck.',
    };

    const emptyTools = new Map<string, ToolInfo>();
    const emptyGlossary = new Map<string, GlossaryTermInfo>();

    it('calls doc.save once with filename containing segment title', () => {
      downloadIntroPiePdf(minimalSegment, emptyTools, emptyGlossary);
      expect(mockSave).toHaveBeenCalledTimes(1);
      const filename = mockSave.mock.calls[0][0];
      expect(filename).toMatch(/Promptu_anatomija/);
      expect(filename).toMatch(/Test segment/);
      expect(filename).toMatch(/\.pdf$/);
    });

    it('uses custom filename when provided', () => {
      downloadIntroPiePdf(minimalSegment, emptyTools, emptyGlossary, 'Custom.pdf');
      expect(mockSave).toHaveBeenCalledWith('Custom.pdf');
    });

    it('writes brand title and segment title to doc', () => {
      downloadIntroPiePdf(minimalSegment, emptyTools, emptyGlossary);
      const textCalls = mockText.mock.calls.map((c: unknown[]) => c[0]);
      const flatTexts = textCalls.flat() as string[];
      expect(flatTexts.some((t) => t === 'Promptų anatomija' || (Array.isArray(t) && t.includes('Promptų anatomija')))).toBe(true);
      expect(flatTexts.some((t) => t === minimalSegment.title || (Array.isArray(t) && t.includes(minimalSegment.title)))).toBe(true);
    });
  });

  describe('ensurePdfFont', () => {
    it('does not throw when fetch fails', async () => {
      const origFetch = globalThis.fetch;
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
      await expect(ensurePdfFont()).resolves.toBeUndefined();
      globalThis.fetch = origFetch;
    });

    it('when fetch succeeds, next downloadIntroPiePdf uses font (addFileToVFS called)', async () => {
      const origFetch = globalThis.fetch;
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
      });
      await ensurePdfFont();
      const minimalSegment: IntroActionPiePdfSegment = {
        title: 'Font test',
        top5Tips: ['A'],
        mainToolName: 'X',
        additionalToolNames: [],
        workflowSteps: ['S'],
        glossaryTermNames: ['T'],
        systemPrompt: 'P',
        motivationWish: 'W',
      };
      downloadIntroPiePdf(minimalSegment, new Map(), new Map());
      expect(mockAddFileToVFS).toHaveBeenCalled();
      globalThis.fetch = origFetch;
    });
  });

  describe('7 segments smoke', () => {
    it('generates PDF for all 7 segments without throwing', () => {
      const introPiePdfContent = introPiePdfContentJson as { segments: IntroActionPiePdfSegment[] };
      const toolsData = toolsJson as { tools: { name: string; url?: string; description?: string }[] };
      const glossaryData = glossaryJson as { terms: { term: string; definition?: string }[] };

      const toolsByName = new Map<string, ToolInfo>();
      for (const t of toolsData.tools || []) {
        toolsByName.set(t.name, { name: t.name, url: t.url || '', description: t.description || '' });
      }
      const glossaryByTerm = new Map<string, GlossaryTermInfo>();
      for (const g of glossaryData.terms || []) {
        glossaryByTerm.set(g.term, { term: g.term, definition: g.definition || '' });
      }

      const segments = introPiePdfContent.segments;
      expect(segments.length).toBe(7);

      for (let i = 0; i < segments.length; i++) {
        expect(() => {
          downloadIntroPiePdf(segments[i], toolsByName, glossaryByTerm);
        }).not.toThrow();
      }
      expect(mockSave).toHaveBeenCalledTimes(7);
    });
  });
});
