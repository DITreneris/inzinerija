import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadM6HandoutPdf, type M6HandoutContent } from '../m6HandoutPdf';
import { clearPdfUnicodeFontCache } from '../pdfNotoFont';
import m6Content from '../../data/m6HandoutContent.json';

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

vi.mock('jspdf', () => ({
  jsPDF: vi.fn().mockImplementation(() => ({
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
  })),
}));

beforeEach(() => {
  vi.clearAllMocks();
  clearPdfUnicodeFontCache();
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
  mockSplitTextToSize.mockImplementation((text: string) => [text]);
});

const minimal: M6HandoutContent = {
  title: 'Test M6',
  subtitle: 'Sub',
  projectSteps: ['Step 1'],
  dataManagementPoints: [{ title: 'DM1', practicalMeaning: 'Meaning' }],
  reflectionSummary: 'Reflect',
  footerText: 'Footer',
};

describe('m6HandoutPdf', () => {
  it('calls doc.save with filename containing Modulio6', async () => {
    await downloadM6HandoutPdf(minimal);
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave.mock.calls[0][0]).toMatch(/Modulio6/);
  });

  it('uses custom filename when provided', async () => {
    await downloadM6HandoutPdf(minimal, 'Custom.pdf');
    expect(mockSave).toHaveBeenCalledWith('Custom.pdf');
  });

  it('writes brand title to doc', async () => {
    await downloadM6HandoutPdf(minimal);
    const allText = mockText.mock.calls.map((c: unknown[]) => c[0]).flat();
    expect(allText).toContain('Promptų anatomija');
  });

  it('generates PDF from real m6HandoutContent.json without throwing', async () => {
    await expect(
      downloadM6HandoutPdf(m6Content as M6HandoutContent)
    ).resolves.toBeUndefined();
    expect(mockSave).toHaveBeenCalledTimes(1);
  });
});
