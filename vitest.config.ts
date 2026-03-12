import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

const isCoreBuild = process.env.VITE_MVP_MODE === '1';

export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure we're in the project root
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    // Only include tests in the src directory (relative to project root)
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.idea/**',
      '**/.git/**',
      '**/.cache/**',
      '**/.cursor/**',
      '**/.vscode/**',
      // Exclude Cursor/VS Code extension directories (inside project)
      '**/.cursor/extensions/**',
      '**/.vscode/extensions/**',
      // NB: Nenaudoti **/Desktop/** – projektas gali būti Desktop kataloge; include jau riboja į src/**
      '**/../**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/',
        '**/coverage/',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@modules-data': path.resolve(__dirname, isCoreBuild ? './src/data/modules-m1-m6.json' : './src/data/modules.json'),
      '@glossary-data': path.resolve(__dirname, isCoreBuild ? './src/data/glossary-m1-m6.json' : './src/data/glossary.json'),
      '@tools-data': path.resolve(__dirname, isCoreBuild ? './src/data/tools-m1-m6.json' : './src/data/tools.json'),
      '@tools-en-data': path.resolve(__dirname, isCoreBuild ? './src/data/tools-en-m1-m6.json' : './src/data/tools-en.json'),
      '@m9-characters-data': path.resolve(__dirname, isCoreBuild ? './src/data/m9Characters-empty.json' : './src/data/m9Characters.json'),
      '@ai-detectors-slide': path.resolve(__dirname, isCoreBuild ? './src/components/stubs/UnavailableModuleSlide.tsx' : './src/components/AiDetectorsSlide.tsx'),
      '@vaizdo-generatorius-slide': path.resolve(__dirname, isCoreBuild ? './src/components/stubs/UnavailableModuleSlide.tsx' : './src/components/VaizdoGeneratoriusSlide.tsx'),
    },
  },
});
