import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 1024;
const COMPACT_WIDTH = 640;
const COMPACT_HEIGHT = 540;
const COMPACT_NAV_HEIGHT = 500;

export interface CompactViewportFlags {
  isMobile: boolean;
  isLandscape: boolean;
  isCompactDiagram: boolean;
  isCompactNav: boolean;
}

export function getCompactViewportFlags(
  width: number,
  height: number
): CompactViewportFlags {
  const isMobile = width < MOBILE_BREAKPOINT;
  const isLandscape = width > height;
  const isCompactHeight = height < COMPACT_HEIGHT;

  return {
    isMobile,
    isLandscape,
    isCompactDiagram:
      isMobile && (width < COMPACT_WIDTH || isCompactHeight || isLandscape),
    isCompactNav: isMobile && (height < COMPACT_NAV_HEIGHT || isLandscape),
  };
}

function readViewportFlags(): CompactViewportFlags {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isLandscape: false,
      isCompactDiagram: false,
      isCompactNav: false,
    };
  }

  return getCompactViewportFlags(window.innerWidth, window.innerHeight);
}

/**
 * Shared mobile viewport flags for diagram compaction and low-height nav layouts.
 */
export function useCompactViewport() {
  const [flags, setFlags] = useState<CompactViewportFlags>(readViewportFlags);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateFlags = () => setFlags(readViewportFlags());
    updateFlags();
    window.addEventListener('resize', updateFlags);
    window.addEventListener('orientationchange', updateFlags);

    return () => {
      window.removeEventListener('resize', updateFlags);
      window.removeEventListener('orientationchange', updateFlags);
    };
  }, []);

  return flags;
}
