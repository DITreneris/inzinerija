/** Training app brand tokens – mirror tailwind.config.js + news-portal light shell */
export const brand = {
  name: 'Promptų anatomija',
  portalBrand: 'Next Level AI',
  colors: {
    pageBg: '#f5f4f0',
    cardBg: '#ffffff',
    ink: '#111827',
    inkMuted: '#4b5563',
    inkSubtle: '#9ca3af',
    border: '#e5e7eb',
    brand: '#627d98',
    brandLight: '#d9e2ec',
    brandDark: '#486581',
    accent: '#d4a520',
    accentLight: '#fef3c7',
    violet: '#7c3aed',
    violetLight: '#ede9fe',
    emerald: '#059669',
    emeraldLight: '#ecfdf5',
  },
};

export const accentByKey = {
  brand: { main: brand.colors.brand, light: brand.colors.brandLight },
  accent: { main: brand.colors.accent, light: brand.colors.accentLight },
  violet: { main: brand.colors.violet, light: brand.colors.violetLight },
  emerald: { main: brand.colors.emerald, light: brand.colors.emeraldLight },
};

export const sizes = {
  beatWidth: 1280,
  beatHeight: 720,
};
