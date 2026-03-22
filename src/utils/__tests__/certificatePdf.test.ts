/**
 * Unit testai sertifikatų PDF (certificatePdf.ts).
 * jsPDF mock – tikrinamas doc.save filename, serijinis numeris, tier turinys, nauja teksto struktūra.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { CertificateTierContent } from '../certificatePdf';
import {
  downloadCertificatePdf,
  generateSerialNumber,
} from '../certificatePdf';
import { clearPdfUnicodeFontCache } from '../pdfNotoFont';

const mockSave = vi.fn();
const mockText = vi.fn();
const mockSetFontSize = vi.fn();
const mockSetFont = vi.fn();
const mockSetTextColor = vi.fn();
const mockSetDrawColor = vi.fn();
const mockSetLineWidth = vi.fn();
const mockLine = vi.fn();
const mockRect = vi.fn();
const mockAddFileToVFS = vi.fn();
const mockAddFont = vi.fn();
const mockSplitTextToSize = vi.fn((text: string) => [text]);
const mockGetTextWidth = vi.fn(() => 40);
const mockTextWithLink = vi.fn();

function createMockDoc() {
  return {
    save: mockSave,
    text: mockText,
    setFontSize: mockSetFontSize,
    setFont: mockSetFont,
    setTextColor: mockSetTextColor,
    setDrawColor: mockSetDrawColor,
    setLineWidth: mockSetLineWidth,
    line: mockLine,
    rect: mockRect,
    addFileToVFS: mockAddFileToVFS,
    addFont: mockAddFont,
    splitTextToSize: mockSplitTextToSize,
    getTextWidth: mockGetTextWidth,
    textWithLink: mockTextWithLink,
  };
}

vi.mock('jspdf', () => ({
  jsPDF: vi.fn().mockImplementation(() => createMockDoc()),
}));

beforeEach(() => {
  vi.clearAllMocks();
  clearPdfUnicodeFontCache();
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
});

const tier1Content: CertificateTierContent = {
  tier: 1,
  introLine: 'Šiuo dokumentu patvirtinama, kad',
  completionLine: 'sėkmingai baigė mokymų programos „Promptų anatomija“ dalį',
  programName: '6 blokų sistema – 6 blokai, testas, praktika',
  label: '6 blokų sistema',
  footerText:
    'Promptų anatomija – promptų struktūros mokymas. © Kurso medžiaga.',
};

describe('certificatePdf', () => {
  describe('generateSerialNumber', () => {
    it('returns string starting with #PA-2026- and 8 chars', () => {
      const serial = generateSerialNumber();
      expect(serial).toMatch(/^#PA-2026-[A-Z0-9]{8}$/);
    });

    it('produces different values on multiple calls', () => {
      const a = generateSerialNumber();
      const b = generateSerialNumber();
      expect(a).not.toBe(b);
    });
  });

  describe('downloadCertificatePdf', () => {
    it('calls doc.save once with filename containing tier and learner name', async () => {
      await downloadCertificatePdf(1, tier1Content, 'Jonas Jonaitis');
      expect(mockSave).toHaveBeenCalledTimes(1);
      const filename = mockSave.mock.calls[0][0];
      expect(filename).toMatch(/Promptu_anatomija_Sertifikatas_Lygis_1/);
      expect(filename).toMatch(/Jonas Jonaitis/);
      expect(filename).toMatch(/\.pdf$/);
    });

    it('displays serial as Sertifikato Nr. PA-2026-XXX (no #)', async () => {
      await downloadCertificatePdf(1, tier1Content, 'Test', {
        serialNumber: '#PA-2026-CUSTOM01',
      });
      expect(mockText).toHaveBeenCalledWith(
        'Sertifikato Nr. PA-2026-CUSTOM01',
        expect.any(Number),
        expect.any(Number),
        { align: 'center' }
      );
    });

    it('calls doc.text with content and default programTitle/certificateLabel when no options', async () => {
      await downloadCertificatePdf(1, tier1Content, 'Vardas');
      const textCalls = mockText.mock.calls.map((c: unknown[]) => c[0]);
      const flatTexts = textCalls.flat();
      expect(flatTexts).toContain('Promptų anatomija');
      expect(flatTexts).toContain('SERTIFIKATAS');
      expect(flatTexts).toContain(tier1Content.introLine);
      expect(flatTexts).toContain('Vardas');
      expect(flatTexts).toContain(tier1Content.completionLine);
      expect(
        flatTexts.some((t) => String(t).includes(tier1Content.programName))
      ).toBe(true);
      expect(flatTexts).toContain(tier1Content.footerText);
    });

    it('uses options.programTitle and options.certificateLabel when provided', async () => {
      await downloadCertificatePdf(1, tier1Content, 'John', {
        programTitle: 'Prompt Anatomy',
        certificateLabel: 'CERTIFICATE',
      });
      const textCalls = mockText.mock.calls.map((c: unknown[]) => c[0]);
      const flatTexts = textCalls.flat();
      expect(flatTexts).toContain('Prompt Anatomy');
      expect(flatTexts).toContain('CERTIFICATE');
    });

    it('with locale en uses EN filename and serialLabel', async () => {
      await downloadCertificatePdf(1, tier1Content, 'Jane Doe', {
        locale: 'en',
        serialLabel: 'Certificate No.',
        serialNumber: '#PA-2026-ABC12345',
      });
      expect(mockSave).toHaveBeenCalledTimes(1);
      const filename = mockSave.mock.calls[0][0];
      expect(filename).toMatch(/^Prompt_Anatomy_Certificate_Tier_1_.*\.pdf$/);
      expect(filename).toContain('Jane Doe');
      expect(mockText).toHaveBeenCalledWith(
        'Certificate No. PA-2026-ABC12345',
        expect.any(Number),
        expect.any(Number),
        { align: 'center' }
      );
    });

    it('with locale en formats date with en-GB', async () => {
      await downloadCertificatePdf(1, tier1Content, 'Test', {
        locale: 'en',
        date: new Date('2026-03-09T12:00:00Z'),
      });
      const textCalls = mockText.mock.calls.map((c: unknown[]) => c[0]);
      const flatTexts = textCalls.flat();
      expect(
        flatTexts.some(
          (t) => String(t).includes('March') && String(t).includes('2026')
        )
      ).toBe(true);
    });

    it('draws border rect and accent lines', async () => {
      await downloadCertificatePdf(1, tier1Content, 'Vardas');
      expect(mockRect).toHaveBeenCalled();
      expect(mockLine).toHaveBeenCalled();
      expect(mockSetLineWidth).toHaveBeenCalled();
    });
  });
});
