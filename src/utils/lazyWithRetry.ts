import { lazy, type ComponentType } from 'react';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1500;

/**
 * Wraps a dynamic import with retry logic for resilient chunk loading
 * on unreliable mobile networks. Falls back to standard lazy() semantics
 * after all retries are exhausted.
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
): React.LazyExoticComponent<T> {
  return lazy(() => retryImport(importFn));
}

async function retryImport<T>(
  importFn: () => Promise<T>,
  retries = MAX_RETRIES,
): Promise<T> {
  try {
    return await importFn();
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
    return retryImport(importFn, retries - 1);
  }
}
