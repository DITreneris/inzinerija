import { beforeEach, describe, expect, it, vi } from 'vitest';
import { downloadM1HandoutPdf, type M1HandoutContent } from '../m1HandoutPdf';
import { clearPdfUnicodeFontCache } from '../pdfNotoFont';
import m1Content from '../../data/m1HandoutContent.json';
import m1ContentEn from '../../data/m1HandoutContent-en.json';

const mockSave = vi.fn();
const mockText = vi.fn();
const mockTextWithLink = vi.fn();
const mockSetFontSize = vi.fn();
const mockSetFont = vi.fn();
const mockSetTextColor = vi.fn();
const mockSetFillColor = vi.fn();
const mockRect = vi.fn();
const mockFill = vi.fn();
const mockAddFileToVFS = vi.fn();
const mockAddFont = vi.fn();
const mockAddPage = vi.fn();
const mockSetPage = vi.fn();
const mockSplitTextToSize = vi.fn((text: string) => [text]);
const mockGetNumberOfPages = vi.fn(() => 1);

vi.mock('jspdf', () => ({
  jsPDF: vi.fn().mockImplementation(() => ({
    save: mockSave,
    text: mockText,
    textWithLink: mockTextWithLink,
    setFontSize: mockSetFontSize,
    setFont: mockSetFont,
    setTextColor: mockSetTextColor,
    setFillColor: mockSetFillColor,
    rect: mockRect,
    fill: mockFill,
    addFileToVFS: mockAddFileToVFS,
    addFont: mockAddFont,
    addPage: mockAddPage,
    setPage: mockSetPage,
    splitTextToSize: mockSplitTextToSize,
    internal: {
      getNumberOfPages: mockGetNumberOfPages,
    },
  })),
}));

beforeEach(() => {
  vi.clearAllMocks();
  clearPdfUnicodeFontCache();
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
  mockSplitTextToSize.mockImplementation((text: string) => [text]);
  mockGetNumberOfPages.mockReturnValue(1);
});

const minimal: M1HandoutContent = {
  title: 'M1 title',
  subtitle: 'Sub',
  coreBlocks: [{ label: 'META', meaning: 'Meaning' }],
  firstWinChecklist: ['Checklist'],
  starterPrompt: 'Starter',
  qualityCheck: ['Quality'],
  footerText: 'Footer',
};

describe('m1HandoutPdf', () => {
  it('calls doc.save with filename containing Modulio1', async () => {
    await downloadM1HandoutPdf(minimal);
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave.mock.calls[0][0]).toMatch(/Modulio1/);
  });

  it('uses custom filename when provided', async () => {
    await downloadM1HandoutPdf(minimal, 'Custom.pdf');
    expect(mockSave).toHaveBeenCalledWith('Custom.pdf');
  });

  it('writes brand title without outbound links', async () => {
    await downloadM1HandoutPdf(minimal);
    const allText = mockText.mock.calls.map((c: unknown[]) => c[0]).flat();
    expect(allText).toContain('Promptų anatomija');
    expect(mockTextWithLink).not.toHaveBeenCalled();
  });

  it('generates PDF from real m1HandoutContent.json without throwing', async () => {
    await expect(
      downloadM1HandoutPdf(m1Content as M1HandoutContent)
    ).resolves.toBeUndefined();
    expect(mockSave).toHaveBeenCalledTimes(1);
  });

  it('generates English PDF from real m1HandoutContent-en.json', async () => {
    await expect(
      downloadM1HandoutPdf(m1ContentEn as M1HandoutContent, undefined, 'en')
    ).resolves.toBeUndefined();
    expect(mockSave).toHaveBeenCalledWith(
      expect.stringContaining('Module1_handout')
    );
  });
});
