import { lazy, type ComponentType } from 'react';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1500;
const RELOAD_FLAG = 'chunk-reload-attempted';

/**
 * Wraps a dynamic import with retry logic for resilient chunk loading
 * on unreliable mobile networks. On chunk 404 (stale deploy) auto-reloads
 * the page once to fetch fresh index.html with correct chunk references.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic must accept any props for SlideContent lazy registry
export function lazyWithRetry<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return lazy(() => retryImport(importFn));
}

function isChunkLoadError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const msg = err.message.toLowerCase();
  return (
    msg.includes('failed to fetch dynamically imported module') ||
    msg.includes('loading chunk') ||
    msg.includes('loading css chunk') ||
    err.name === 'ChunkLoadError'
  );
}

async function retryImport<T>(
  importFn: () => Promise<T>,
  retries = MAX_RETRIES
): Promise<T> {
  try {
    return await importFn();
  } catch (err) {
    if (retries <= 0) {
      if (isChunkLoadError(err) && !sessionStorage.getItem(RELOAD_FLAG)) {
        sessionStorage.setItem(RELOAD_FLAG, '1');
        window.location.reload();
      }
      throw err;
    }
    await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
    return retryImport(importFn, retries - 1);
  }
}

/** Clear the reload guard after a successful page load (called from main.tsx). */
export function clearChunkReloadFlag(): void {
  try {
    sessionStorage.removeItem(RELOAD_FLAG);
  } catch {
    // sessionStorage unavailable (private mode, etc.)
  }
}
