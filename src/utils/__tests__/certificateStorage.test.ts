/**
 * Unit testai sertifikato vardo saugojimui (certificateStorage.ts).
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getCertificateName, setCertificateName } from '../certificateStorage';

const STORAGE_KEY = 'prompt-anatomy-certificate-name';

describe('certificateStorage', () => {
  const storage: Record<string, string> = {};

  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage[key] ?? null,
      setItem: (key: string, value: string) => {
        storage[key] = value;
      },
      removeItem: (key: string) => {
        delete storage[key];
      },
    });
    vi.stubGlobal('window', { localStorage: storage });
    delete storage[STORAGE_KEY];
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns empty string when nothing stored', () => {
    expect(getCertificateName()).toBe('');
  });

  it('returns trimmed value after set', () => {
    setCertificateName('  Jonas  ');
    expect(getCertificateName()).toBe('Jonas');
  });

  it('removeItem when setting empty string', () => {
    setCertificateName('Jonas');
    setCertificateName('');
    expect(getCertificateName()).toBe('');
    expect(storage[STORAGE_KEY]).toBeUndefined();
  });

  it('persists across get/set', () => {
    setCertificateName('Ana');
    expect(getCertificateName()).toBe('Ana');
  });
});
