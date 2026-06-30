import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadM79HandoutPdf } from '../m79HandoutPdf';
import { clearPdfUnicodeFontCache } from '../pdfNotoFont';
import m79Content from '../../data/m79HandoutContent.json';
import m79ContentEn from '../../data/m79HandoutContent-en.json';
import type { M79HandoutContent } from '../../data/handoutContentLoader';

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
const mockGetNumberOfPages = vi.fn(() => 2);

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
    getTextWidth: vi.fn((text: string) => text.length),
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
  mockGetNumberOfPages.mockReturnValue(2);
});

const minimal: M79HandoutContent = {
  title: 'Test M79',
  subtitle: 'Sub',
  pipelineSteps: ['Pipeline'],
  masterPromptSteps: ['Master'],
  workflowSteps: ['Workflow'],
  reflectionSummary: 'Reflect',
  nextPageHeading: 'Next',
  nextPageIntro: 'Intro',
  primaryCtaLabel: 'Primary',
  secondaryCtaLabels: {
    decide: 'Decide',
    map: 'Map',
  },
  websiteUrl: 'https://www.promptanatomy.app/',
  websiteCta: 'Hub',
  footerText: 'Footer',
};

describe('m79HandoutPdf', () => {
  it('calls doc.save with filename containing DA_kelio', async () => {
    await downloadM79HandoutPdf(minimal, { locale: 'lt' });
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave.mock.calls[0][0]).toMatch(/DA_kelio/);
  });

  it('uses custom filename when provided', async () => {
    await downloadM79HandoutPdf(minimal, { locale: 'lt' }, 'Custom.pdf');
    expect(mockSave).toHaveBeenCalledWith('Custom.pdf');
  });

  it('writes brand title and linked ecosystem CTAs', async () => {
    await downloadM79HandoutPdf(minimal, { locale: 'lt' });
    const allText = mockText.mock.calls.map((c: unknown[]) => c[0]).flat();
    expect(allText).toContain('Promptų anatomija');
    expect(mockTextWithLink).toHaveBeenCalledWith(
      'Primary',
      expect.any(Number),
      expect.any(Number),
      expect.objectContaining({
        url: expect.stringContaining('utm_medium=handout'),
      })
    );
    expect(mockTextWithLink).toHaveBeenCalledWith(
      'Primary',
      expect.any(Number),
      expect.any(Number),
      expect.objectContaining({
        url: expect.stringContaining('utm_campaign=m9_handout'),
      })
    );
  });

  it('generates PDF from real m79HandoutContent.json without throwing', async () => {
    await expect(
      downloadM79HandoutPdf(m79Content as M79HandoutContent, { locale: 'lt' })
    ).resolves.toBeUndefined();
    expect(mockSave).toHaveBeenCalledTimes(1);
  });

  it('generates English PDF from real m79HandoutContent-en.json', async () => {
    await expect(
      downloadM79HandoutPdf(m79ContentEn as M79HandoutContent, {
        locale: 'en',
      })
    ).resolves.toBeUndefined();
    expect(mockSave).toHaveBeenCalledWith(
      expect.stringContaining('Data_Analytics_path_handout')
    );
  });
});
