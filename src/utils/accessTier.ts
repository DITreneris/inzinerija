import { VALID_MAX_MODULE_IDS } from '../constants/pricing';
import { getIsMvpMode } from './mvpMode';

type ValidMaxModuleId = (typeof VALID_MAX_MODULE_IDS)[number];

/** sessionStorage key for verified access tier (set after magic link token verification). */
export const VERIFIED_ACCESS_TIER_KEY = 'verified_access_tier';
const MAGIC_LINK_PARAMS = ['token', 'expires', 'access_tier', 'max_module'] as const;

function parseAndValidateMaxModuleId(value: string | null): ValidMaxModuleId | null {
  if (value === null || value === '') return null;
  const n = Number(value);
  if (!Number.isInteger(n)) return null;
  if ((VALID_MAX_MODULE_IDS as readonly number[]).includes(n)) return n as ValidMaxModuleId;
  return null;
}

/** In core production profile, cap access at 6 so runtime matches the 1–6-only build. */
function capForMvp(value: ValidMaxModuleId): ValidMaxModuleId {
  if (getIsMvpMode() && value > 6) return 6;
  return value;
}

/**
 * True if the current URL has a `token` query param (magic link); tier must be verified via API before trusting.
 */
export function hasAccessTokenInUrl(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('token') !== null && params.get('token') !== '';
}

/**
 * Removes temporary magic-link params while preserving unrelated query params.
 */
export function stripMagicLinkSearchParams(search: string): string {
  const params = new URLSearchParams(search);
  for (const key of MAGIC_LINK_PARAMS) {
    params.delete(key);
  }
  const next = params.toString();
  return next ? `?${next}` : '';
}

/**
 * Grąžina maksimalų atrakintą modulio ID (0 | 3 | 6 | 9 | 12).
 * 0 = niekas neįsigyta; 3 = 1–3, 6 = 1–6, 9 = 1–9, 12 = 1–12.
 * Šaltinio eilė: DEV (visi atrakinti) → sessionStorage (patikrintas) → env → VITE_MVP_MODE=1 → 6 (core 1–6 build).
 * URL query param fallback productione nenaudojamas, kad neteisingas magic-link srautas
 * negalėtų atrakinti prieigos vien per `access_tier`.
 */
export function getMaxAccessibleModuleId(): ValidMaxModuleId {
  if (import.meta.env.DEV) return 12;

  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem(VERIFIED_ACCESS_TIER_KEY);
    const fromStorage = parseAndValidateMaxModuleId(stored);
    if (fromStorage !== null) return capForMvp(fromStorage);
  }

  const envVal = import.meta.env.VITE_MAX_ACCESSIBLE_MODULE;
  if (envVal !== undefined && envVal !== '') {
    const fromEnv = parseAndValidateMaxModuleId(String(envVal));
    if (fromEnv !== null) return capForMvp(fromEnv);
  }

  if (import.meta.env.VITE_MVP_MODE === '1') return 6;

  return 0;
}
