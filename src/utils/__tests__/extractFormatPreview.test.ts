import { describe, expect, it } from 'vitest';
import { extractFormatPreview } from '../extractFormatPreview';

describe('extractFormatPreview', () => {
  it('extracts LT Formatas line', () => {
    expect(
      extractFormatPreview(
        'Duomenys: x\nPadaryk: y\nFormatas: metrika | vidurkis | mediana'
      )
    ).toBe('metrika | vidurkis | mediana');
  });

  it('extracts EN Format line', () => {
    expect(
      extractFormatPreview('Data: x\nDo: y\nFormat: metric | mean | median')
    ).toBe('metric | mean | median');
  });

  it('returns null when missing', () => {
    expect(extractFormatPreview('Duomenys: x\nPadaryk: y')).toBeNull();
    expect(extractFormatPreview(undefined)).toBeNull();
  });
});
