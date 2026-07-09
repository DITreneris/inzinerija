import { beforeEach, describe, expect, it, vi } from 'vitest';
import { downloadM4HandoutPdf, type M4HandoutContent } from '../m4HandoutPdf';
import { clearPdfUnicodeFontCache } from '../pdfNotoFont';
import m4Content from '../../data/m4HandoutContent.json';
import m4ContentEn from '../../data/m4HandoutContent-en.json';

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

const minimal: M4HandoutContent = {
  title: 'M4 title',
  subtitle: 'Sub',
  coreTopics: [{ title: 'RAG', meaning: 'Meaning' }],
  checklist: ['Checklist'],
  starterPrompt: 'Starter',
  footerText: 'Footer',
};

describe('m4HandoutPdf', () => {
  it('calls doc.save with filename containing Modulio4', async () => {
    await downloadM4HandoutPdf(minimal);
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave.mock.calls[0][0]).toMatch(/Modulio4/);
  });

  it('uses custom filename when provided', async () => {
    await downloadM4HandoutPdf(minimal, 'Custom.pdf');
    expect(mockSave).toHaveBeenCalledWith('Custom.pdf');
  });

  it('writes brand title without outbound links', async () => {
    await downloadM4HandoutPdf(minimal);
    const allText = mockText.mock.calls.map((c: unknown[]) => c[0]).flat();
    expect(allText).toContain('Promptų anatomija');
    expect(mockTextWithLink).not.toHaveBeenCalled();
  });

  it('generates PDF from real m4HandoutContent.json without throwing', async () => {
    await expect(
      downloadM4HandoutPdf(m4Content as M4HandoutContent)
    ).resolves.toBeUndefined();
    expect(mockSave).toHaveBeenCalledTimes(1);
  });

  it('generates English PDF from real m4HandoutContent-en.json', async () => {
    await expect(
      downloadM4HandoutPdf(m4ContentEn as M4HandoutContent, undefined, 'en')
    ).resolves.toBeUndefined();
    expect(mockSave).toHaveBeenCalledWith(
      expect.stringContaining('Module4_handout')
    );
  });
});
