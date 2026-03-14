/**
 * MVP Analytics – anonymous event tracking for completion/drop-off funnel.
 * Events: slide_view, slide_complete, practice_start, practice_complete, cta_click, collapse_open.
 * Dedupe per session where specified. Optional PostHog backend via env.
 * @see docs/development/ANALYTICS_EVENT_TAXONOMY.md
 */

const ANON_ID_KEY = 'prompt-anatomy-anon-id';
const SESSION_ID_KEY = 'prompt-anatomy-session-id';
const SESSION_START_KEY = 'prompt-anatomy-session-start';

/** 30 min inactivity = new session (ms) */
const SESSION_INACTIVITY_MS = 30 * 60 * 1000;

export type AnalyticsEventName =
  | 'slide_view'
  | 'slide_complete'
  | 'practice_start'
  | 'practice_complete'
  | 'cta_click'
  | 'collapse_open'
  | 'rl_step_click';

export interface AnalyticsProperties {
  module_id: number;
  slide_id?: number;
  slide_index?: number;
  slide_type?: string;
  practice_id?: number;
  cta_id?: string;
  cta_label?: string;
  destination?: 'internal' | 'external' | 'spin-off' | 'download';
  section_index?: number;
  step_index?: number;
  session_id: string;
  anon_id: string;
  time_on_slide_sec?: number;
  time_to_complete_sec?: number;
  utm_source?: string;
  utm_medium?: string;
  timestamp: string;
}

/** Dedupe: 1x per session per (module_id, slide_id) or (module_id, practice_id), etc. */
const dedupeKeysSeen = new Set<string>();

function generateUuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getOrCreateAnonId(): string {
  if (typeof localStorage === 'undefined') return 'ssr';
  let id = localStorage.getItem(ANON_ID_KEY);
  if (!id) {
    id = 'anon_' + generateUuid();
    localStorage.setItem(ANON_ID_KEY, id);
  }
  return id;
}

function getOrCreateSessionId(): string {
  if (typeof localStorage === 'undefined') return 'ssr';
  const now = Date.now();
  const startRaw = localStorage.getItem(SESSION_START_KEY);
  const start = startRaw ? parseInt(startRaw, 10) : 0;
  if (!startRaw || now - start > SESSION_INACTIVITY_MS) {
    const newId = 'sess_' + now + '_' + Math.random().toString(36).slice(2, 9);
    localStorage.setItem(SESSION_ID_KEY, newId);
    localStorage.setItem(SESSION_START_KEY, String(now));
    return newId;
  }
  return localStorage.getItem(SESSION_ID_KEY) ?? 'sess_' + now;
}

function getUtmParams(): { utm_source?: string; utm_medium?: string } {
  if (typeof window === 'undefined' || !window.location?.search) return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get('utm_source') ?? undefined,
    utm_medium: p.get('utm_medium') ?? undefined,
  };
}

/** Build dedupe key for 1x-per-session events */
function dedupeKey(eventName: string, props: Record<string, unknown>): string | null {
  if (eventName === 'slide_view' || eventName === 'slide_complete') {
    const mid = props.module_id;
    const sid = props.slide_id ?? props.slide_index;
    return sid != null && mid != null ? `${eventName}:${mid}:${sid}` : null;
  }
  if (eventName === 'practice_start' || eventName === 'practice_complete') {
    const mid = props.module_id;
    const pid = props.practice_id;
    return pid != null && mid != null ? `${eventName}:${mid}:${pid}` : null;
  }
  if (eventName === 'collapse_open') {
    const mid = props.module_id;
    const sid = props.slide_id ?? props.slide_index;
    const sec = props.section_index;
    return mid != null && sid != null && sec != null
      ? `${eventName}:${mid}:${sid}:${sec}`
      : null;
  }
  return null;
}

/** Whether we should skip this event (already sent this session) */
function shouldDedupe(eventName: string, props: Record<string, unknown>): boolean {
  const key = dedupeKey(eventName, props);
  if (!key) return false;
  if (dedupeKeysSeen.has(key)) return true;
  dedupeKeysSeen.add(key);
  return false;
}

/** Send to PostHog if configured (anonymous) */
function sendToPostHog(eventName: string, properties: Record<string, unknown>): void {
  const key = typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env?.VITE_POSTHOG_KEY;
  if (!key || typeof window === 'undefined' || !(window as unknown as { posthog?: { capture: (e: string, p?: Record<string, unknown>) => void } }).posthog) {
    return;
  }
  const posthog = (window as unknown as { posthog?: { capture: (e: string, p?: Record<string, unknown>) => void } }).posthog;
  if (posthog) {
    posthog.capture(eventName, { ...properties, $process_person_profile: false });
  }
}

/**
 * Track an analytics event. Dedupe applied for slide_view, slide_complete, practice_start, practice_complete, collapse_open.
 */
export function track(
  eventName: AnalyticsEventName,
  properties: Omit<AnalyticsProperties, 'session_id' | 'anon_id' | 'timestamp'>
): void {
  if (typeof window === 'undefined') return;

  const anon_id = getOrCreateAnonId();
  const session_id = getOrCreateSessionId();
  const timestamp = new Date().toISOString();
  const utm = getUtmParams();

  const full: AnalyticsProperties & Record<string, unknown> = {
    ...properties,
    session_id,
    anon_id,
    timestamp,
    ...utm,
  };

  if (shouldDedupe(eventName, full)) return;

  sendToPostHog(eventName, full);

  if (typeof window !== 'undefined' && (window as unknown as { __DEBUG_ANALYTICS?: boolean }).__DEBUG_ANALYTICS) {
    console.debug('[analytics]', eventName, full);
  }
}

/** Get current anon_id (e.g. for export or debugging). */
export function getAnonId(): string {
  return getOrCreateAnonId();
}

/** Get current session_id. */
export function getSessionId(): string {
  return getOrCreateSessionId();
}
