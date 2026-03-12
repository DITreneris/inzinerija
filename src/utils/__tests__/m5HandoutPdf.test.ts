import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadM5HandoutPdf, type M5HandoutContent } from '../m5HandoutPdf';
import m5Content from '../../data/m5HandoutContent.json';

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
  mockSplitTextToSize.mockImplementation((text: string) => [text]);
});

const minimal: M5HandoutContent = {
  title: 'Test title',
  subtitle: 'Sub',
  toolsIntro: 'Tools intro',
  toolsBullets: ['Bullet 1'],
  structure8: '1. Slide\n2. Slide',
  masterPrompt: 'Master prompt',
  fullPromptPrinciple: 'Principle',
  sequenceSteps: ['Step 1'],
  briefDefinition: 'Brief def',
  qualityCheckPoints: ['QC 1'],
  thresholdsExplanation: 'Thresh',
  footerText: 'Footer',
};

describe('m5HandoutPdf', () => {
  it('calls doc.save with filename containing Modulio5', async () => {
    await downloadM5HandoutPdf(minimal);
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave.mock.calls[0][0]).toMatch(/Modulio5/);
  });

  it('uses custom filename when provided', async () => {
    await downloadM5HandoutPdf(minimal, 'Custom.pdf');
    expect(mockSave).toHaveBeenCalledWith('Custom.pdf');
  });

  it('writes brand title to doc', async () => {
    await downloadM5HandoutPdf(minimal);
    const allText = mockText.mock.calls.map((c: unknown[]) => c[0]).flat();
    expect(allText).toContain('Promptų anatomija');
  });

  it('generates PDF from real m5HandoutContent.json without throwing', async () => {
    await expect(downloadM5HandoutPdf(m5Content as M5HandoutContent)).resolves.toBeUndefined();
    expect(mockSave).toHaveBeenCalledTimes(1);
  });
});
