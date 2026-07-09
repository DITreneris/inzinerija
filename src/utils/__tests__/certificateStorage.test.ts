import { beforeEach, describe, expect, it } from 'vitest';
import {
  getCertificateName,
  getOrCreateCertificateSerial,
  setCertificateName,
} from '../certificateStorage';

const nameStorageKey = 'prompt-anatomy-certificate-name';
const serialsStorageKey = 'prompt-anatomy-certificate-serials';

describe('certificateStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and clears the certificate name', () => {
    setCertificateName(' Vardenis Pavardenis ');
    expect(localStorage.getItem(nameStorageKey)).toBe('Vardenis Pavardenis');
    expect(getCertificateName()).toBe('Vardenis Pavardenis');

    setCertificateName('   ');
    expect(localStorage.getItem(nameStorageKey)).toBeNull();
  });

  it('returns the same serial for repeated downloads of the same tier', () => {
    const first = getOrCreateCertificateSerial(1);
    const second = getOrCreateCertificateSerial(1);

    expect(first).toBe(second);
    expect(first).toMatch(/^#PA-2026-[A-Z0-9]{8}$/);
  });

  it('stores serials separately by tier', () => {
    const tier1 = getOrCreateCertificateSerial(1);
    const tier2 = getOrCreateCertificateSerial(2);
    const stored = JSON.parse(localStorage.getItem(serialsStorageKey) ?? '{}');

    expect(stored['1']).toBe(tier1);
    expect(stored['2']).toBe(tier2);
    expect(stored['1']).not.toBe(stored['2']);
  });

  it('recovers from invalid serial storage data', () => {
    localStorage.setItem(serialsStorageKey, 'not-json');

    expect(getOrCreateCertificateSerial(3)).toMatch(/^#PA-2026-[A-Z0-9]{8}$/);
  });
});
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
