/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Optimized safelist - only classes actually used in SlideContent.tsx
  // This reduces CSS bundle size significantly
  safelist: [
    // Background colors - only specific shades used
    'bg-rose-50', 'bg-rose-50/80', 'bg-rose-100', 'bg-rose-500', 'dark:bg-rose-900/10', 'dark:bg-rose-900/20', 'dark:bg-rose-900/30',
    'bg-orange-50', 'bg-orange-50/80', 'bg-orange-100', 'bg-orange-500', 'dark:bg-orange-900/20', 'dark:bg-orange-900/30',
    'bg-amber-100', 'bg-amber-500', 'dark:bg-amber-900/30', 'bg-amber-50/80', 'dark:bg-amber-900/20',
    'bg-emerald-50', 'bg-emerald-50/80', 'bg-emerald-100', 'bg-emerald-500', 'bg-emerald-600', 'bg-emerald-700', 'bg-emerald-800', 'dark:bg-emerald-400', 'dark:bg-emerald-800/50', 'dark:bg-emerald-900', 'dark:bg-emerald-900/10', 'dark:bg-emerald-900/20', 'dark:bg-emerald-900/30', 'dark:bg-emerald-900/40',
    'bg-brand-50', 'bg-brand-50/50', 'bg-brand-50/80', 'bg-brand-100', 'bg-brand-200', 'bg-brand-500', 'dark:bg-brand-900/10', 'dark:bg-brand-900/20', 'dark:bg-brand-900/30', 'dark:bg-brand-900/40',
    'bg-violet-50', 'bg-violet-50/80', 'bg-violet-100', 'bg-violet-500', 'bg-violet-600', 'bg-violet-700', 'bg-violet-800', 'dark:bg-violet-400', 'dark:bg-violet-800/50', 'dark:bg-violet-900', 'dark:bg-violet-900/20', 'dark:bg-violet-900/30', 'dark:bg-violet-900/40',
    'bg-cyan-50', 'dark:bg-cyan-900/20',
    'bg-fuchsia-50', 'dark:bg-fuchsia-900/20',
    'bg-accent-50', 'bg-accent-100', 'dark:bg-accent-900/20', 'dark:bg-accent-900/30',
    'bg-slate-50', 'bg-slate-100', 'bg-slate-200', 'dark:bg-slate-800/50', 'dark:bg-slate-800/60', 'border-slate-200', 'border-slate-400', 'dark:border-slate-600', 'dark:border-slate-700',
    // Text colors - only specific shades used
    'text-rose-300', 'text-rose-400', 'text-rose-500', 'text-rose-600', 'text-rose-700', 'text-rose-800', 'text-rose-900', 'dark:text-rose-100', 'dark:text-rose-200', 'dark:text-rose-300', 'dark:text-rose-400',
    'text-orange-300', 'text-orange-500', 'text-orange-700', 'text-orange-900', 'dark:text-orange-100', 'dark:text-orange-300',
    'text-amber-300', 'text-amber-500', 'text-amber-700', 'dark:text-amber-300',
    'text-emerald-300', 'text-emerald-400', 'text-emerald-600', 'text-emerald-700', 'text-emerald-800', 'dark:text-emerald-100', 'dark:text-emerald-300', 'dark:text-emerald-400',
    'text-brand-300', 'text-brand-500', 'text-brand-700', 'text-brand-900', 'dark:text-brand-100', 'dark:text-brand-300',
    'text-violet-300', 'text-violet-500', 'text-violet-600', 'text-violet-700', 'text-violet-800', 'dark:text-violet-100', 'dark:text-violet-200', 'dark:text-violet-300', 'dark:text-violet-400',
    'text-cyan-300', 'text-cyan-700', 'dark:text-cyan-300',
    'text-fuchsia-300', 'text-fuchsia-700', 'dark:text-fuchsia-300',
    // Border colors - only specific shades used
    'border-rose-200', 'border-rose-300', 'border-rose-500', 'border-rose-800',
    'border-orange-200', 'border-orange-500', 'dark:border-orange-800',
    'border-amber-200', 'border-amber-500', 'dark:border-amber-800',
    'border-emerald-200', 'border-emerald-300', 'border-emerald-500', 'border-emerald-600', 'border-emerald-700', 'border-emerald-800', 'dark:border-emerald-600', 'dark:border-emerald-800',
    'border-brand-200', 'border-brand-300', 'border-brand-500', 'border-brand-700', 'border-brand-800',
    'border-l-brand-500', 'border-l-brand-800',
    'border-violet-200', 'border-violet-300', 'border-violet-500', 'border-violet-600', 'border-violet-700', 'border-violet-800', 'dark:border-violet-600', 'dark:border-violet-800',
    'border-cyan-300', 'border-cyan-700',
    'border-fuchsia-300', 'border-fuchsia-700',
    'border-accent-200', 'border-accent-500', 'border-accent-800',
    'text-accent-700', 'dark:text-accent-300', 'text-accent-900', 'dark:text-accent-100',
    'text-slate-700', 'text-slate-800', 'dark:text-slate-200', 'dark:text-slate-300',
    // DI Visata hierarchijos spalvos
    'bg-di-visata-bg-top', 'from-di-visata-bg-top', 'to-di-visata-bg-bottom',
    'bg-di-visata-dante-paper', 'border-t-di-visata-dante-accent',
    'bg-di-visata-ai-cool', 'bg-di-visata-ai-cool/80', 'border-t-di-visata-ai-accent', 'border-l-di-visata-ai-accent',
    'text-di-visata-text-muted',
    // Shadow colors (Workflow Samprata premium polish)
    'shadow-emerald-200/50', 'dark:shadow-emerald-900/30', 'shadow-emerald-200/30', 'dark:shadow-emerald-900/20',
    'shadow-gray-200/50', 'dark:shadow-none', 'shadow-gray-200/40', 'dark:shadow-gray-900/50',
    'shadow-accent-200/30', 'dark:shadow-accent-900/20', 'shadow-gray-200/30', 'dark:shadow-gray-900/30',
  ],
  theme: {
    extend: {
      colors: {
        // Navy blue - trust, expertise, professionalism (like consulting firms)
        brand: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
          950: '#0a1929',
        },
        // Gold - achievement, premium, success (like business awards)
        accent: {
          50: '#fdfaf3',
          100: '#faf0d7',
          200: '#f5e1ae',
          300: '#efd07c',
          400: '#e6bc4a',
          500: '#d4a520',
          600: '#b8860b',
          700: '#966d09',
          800: '#7a5807',
          900: '#644806',
          950: '#3d2c04',
        },
        // Slate for neutral UI elements
        // DI Visata slide – hierarchijos spalvinė logika (metafora vs sistema)
        'di-visata': {
          'bg-top': '#F6F8FB',
          'bg-bottom': '#EEF2F7',
          'dante-paper': '#F9F6F1',
          'dante-accent': '#C9B27C',
          'ai-cool': '#F1F5FB',
          'ai-accent': '#5B7CFA',
          'ai-accent-alt': '#6B8CFF',
          'text-muted': '#4a5568',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'celebrate': 'celebrate 0.6s ease-out',
        'confetti': 'confetti 1s ease-out forwards',
        'check-pop': 'checkPop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'progress-fill': 'progressFill 1s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        celebrate: {
          '0%': { transform: 'scale(0) rotate(-45deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(10deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) rotate(720deg)', opacity: '0' },
        },
        checkPop: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        progressFill: {
          '0%': { strokeDashoffset: '226' },
          '100%': { strokeDashoffset: 'var(--progress-offset)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
