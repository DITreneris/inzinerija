import { useState, useEffect } from 'react';

const LG_BREAKPOINT = 1024;

/**
 * Returns true when viewport is below the lg breakpoint (1024px).
 * Aligns with the project's Tailwind lg: desktop/mobile split.
 */
export function useIsMobile() {
  const [mobile, setMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < LG_BREAKPOINT : false,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(`(max-width: ${LG_BREAKPOINT - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    setMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return mobile;
}
