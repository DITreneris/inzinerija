export const DIAGRAM_TOKENS = {
  font: "'Plus Jakarta Sans', system-ui, sans-serif",
  colors: {
    bgStart: '#f0f4f8',
    bgEnd: '#f8fafc',
    border: '#bcccdc',
    brand: '#334e68',
    brandTop: '#486581',
    brandDark: '#102a43',
    flow: '#627d98',
    muted: '#334e68',
    whiteText: 'rgba(255,255,255,0.92)',
    emerald: '#0f766e',
    amber: '#b8860b',
    slate: '#475569',
  },
  palette: {
    light: {
      bgStart: '#f0f4f8',
      bgEnd: '#f8fafc',
      border: '#bcccdc',
      brand: '#334e68',
      brandTop: '#486581',
      brandDark: '#102a43',
      flow: '#627d98',
      muted: '#334e68',
      whiteText: 'rgba(255,255,255,0.92)',
    },
    dark: {
      bgStart: '#1e293b',
      bgEnd: '#0f172a',
      border: '#475569',
      brand: '#627d98',
      brandTop: '#829ab1',
      brandDark: '#e2e8f0',
      flow: '#9fb3c8',
      muted: '#cbd5e1',
      whiteText: 'rgba(255,255,255,0.94)',
    },
  },
  typography: {
    title: {
      desktop: 16,
      compact: 14,
    },
    subtitle: {
      desktop: 10,
      compact: 9,
    },
    stepLabel: {
      desktop: 12,
      compact: 10,
    },
    stepSub: {
      desktop: 10,
      compact: 8,
    },
    rolesHub: {
      title: {
        desktop: 18,
        compact: 15,
      },
      subtitle: {
        desktop: 11,
        compact: 10,
      },
      label: {
        desktop: 14,
        compact: 12,
      },
      sub: {
        desktop: 12,
        compact: 10,
      },
    },
  },
  stroke: {
    border: 1,
    flow: 2,
    flowStrong: 2.5,
    inactive: 1.5,
    active: 2.5,
  },
  opacity: {
    active: 1,
    inactive: 0.48,
    inactiveSoft: 0.58,
    selectableInactive: 0.82,
  },
  radius: {
    frame: 12,
    box: 10,
  },
  arrow: {
    markerLen: 6,
    markerWidth: 8,
    markerHeight: 6,
    markerPath: 'M0 0 L6 3 L0 6 Z',
  },
} as const;

export type DiagramPalette = Record<
  keyof typeof DIAGRAM_TOKENS.palette.light,
  string
>;

export function getDiagramPalette(isDark: boolean): DiagramPalette {
  return isDark ? DIAGRAM_TOKENS.palette.dark : DIAGRAM_TOKENS.palette.light;
}

export type DiagramTone = 'brand' | 'emerald' | 'amber' | 'slate';

export const DIAGRAM_TONE_COLORS: Record<
  DiagramTone,
  { top: string; bottom: string; stroke: string; text: string; soft: string }
> = {
  brand: {
    top: '#486581',
    bottom: '#334e68',
    stroke: '#334e68',
    text: '#ffffff',
    soft: '#e6eef7',
  },
  emerald: {
    top: '#2f9f88',
    bottom: '#0f766e',
    stroke: '#0f766e',
    text: '#ffffff',
    soft: '#dff5ef',
  },
  amber: {
    top: '#d4a520',
    bottom: '#a66f00',
    stroke: '#9a6500',
    text: '#ffffff',
    soft: '#fff2cc',
  },
  slate: {
    top: '#64748b',
    bottom: '#475569',
    stroke: '#475569',
    text: '#ffffff',
    soft: '#e5e7eb',
  },
};

export const DIAGRAM_TONE_COLORS_DARK: Record<
  DiagramTone,
  { top: string; bottom: string; stroke: string; text: string; soft: string }
> = {
  brand: {
    top: '#829ab1',
    bottom: '#486581',
    stroke: '#9fb3c8',
    text: '#ffffff',
    soft: '#1e293b',
  },
  emerald: {
    top: '#34d399',
    bottom: '#0f766e',
    stroke: '#5eead4',
    text: '#ffffff',
    soft: '#0f2f2a',
  },
  amber: {
    top: '#f3cc30',
    bottom: '#b8860b',
    stroke: '#f3cc30',
    text: '#ffffff',
    soft: '#33260a',
  },
  slate: {
    top: '#94a3b8',
    bottom: '#475569',
    stroke: '#cbd5e1',
    text: '#ffffff',
    soft: '#1e293b',
  },
};

export function getDiagramToneColors(isDark: boolean) {
  return isDark ? DIAGRAM_TONE_COLORS_DARK : DIAGRAM_TONE_COLORS;
}

/** M4 sk. 53.5 portal beat SVG fills — re-exports diagram palette (SCHEME_AGENT SOT). */
export const PORTAL_BEAT_COLORS = {
  brand: DIAGRAM_TOKENS.colors.flow,
  accent: DIAGRAM_TONE_COLORS.amber.top,
  // v0.2 — portal beat only; consolidate in v0.3 diagram tone palette
  violet: '#7c3aed',
  emerald: DIAGRAM_TONE_COLORS.emerald.bottom,
} as const;
