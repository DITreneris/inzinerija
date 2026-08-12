import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadM1618HandoutPdf } from '../m1618HandoutPdf';
import { clearPdfUnicodeFontCache } from '../pdfNotoFont';
import m1618Content from '../../data/m1618HandoutContent.json';
import m1618ContentEn from '../../data/m1618HandoutContent-en.json';
import type { M1618HandoutContent } from '../../data/handoutContentLoader';

const mockSave = vi.fn();
const mockText = vi.fn();
const mockLink = vi.fn();
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
  jsPDF: vi.fn().mockImplementation(function () {
    return {
      save: mockSave,
      text: mockText,
      link: mockLink,
      setDrawColor: vi.fn(),
      setLineWidth: vi.fn(),
      line: vi.fn(),
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
    };
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
  clearPdfUnicodeFontCache();
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
  mockSplitTextToSize.mockImplementation((text: string) => [text]);
  mockGetNumberOfPages.mockReturnValue(2);
});

const minimal: M1618HandoutContent = {
  title: 'Test M1618',
  subtitle: 'Sub',
  briefSteps: ['Brief'],
  packetChecklist: ['Packet'],
  softDodChecks: ['Soft'],
  promptPatterns: ['Prompt'],
  starterPrompt: 'Starter',
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

describe('m1618HandoutPdf', () => {
  it('calls doc.save with filename containing Kodo_kelio', async () => {
    await downloadM1618HandoutPdf(minimal, { locale: 'lt' });
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave.mock.calls[0][0]).toMatch(/Kodo_kelio/);
  });

  it('uses custom filename when provided', async () => {
    await downloadM1618HandoutPdf(minimal, { locale: 'lt' }, 'Custom.pdf');
    expect(mockSave).toHaveBeenCalledWith('Custom.pdf');
  });

  it('writes brand title and linked ecosystem CTAs', async () => {
    await downloadM1618HandoutPdf(minimal, { locale: 'lt' });
    const allText = mockText.mock.calls.map((c: unknown[]) => c[0]).flat();
    expect(allText).toContain('Promptų anatomija');
    expect(mockLink).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.objectContaining({
        url: expect.stringContaining('utm_medium=handout'),
      })
    );
    expect(mockLink).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.objectContaining({
        url: expect.stringContaining('utm_campaign=m18_handout'),
      })
    );
  });

  it('generates PDF from real m1618HandoutContent.json without throwing', async () => {
    await expect(
      downloadM1618HandoutPdf(m1618Content as M1618HandoutContent, {
        locale: 'lt',
      })
    ).resolves.toBeUndefined();
    expect(mockSave).toHaveBeenCalledTimes(1);
  });

  it('generates English PDF from real m1618HandoutContent-en.json', async () => {
    await expect(
      downloadM1618HandoutPdf(m1618ContentEn as M1618HandoutContent, {
        locale: 'en',
      })
    ).resolves.toBeUndefined();
    expect(mockSave).toHaveBeenCalledWith(
      expect.stringContaining('Code_engineering_path_handout')
    );
  });
});
