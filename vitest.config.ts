import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import os from 'os';

const isCoreBuild = process.env.VITE_MVP_MODE === '1';
const maxBuildModule = process.env.VITE_MAX_BUILD_MODULE;
const isCorporate9Build = !isCoreBuild && maxBuildModule === '9';
const isCorporate12Build = !isCoreBuild && maxBuildModule === '12';
const isCorporate15Build = !isCoreBuild && maxBuildModule === '15';
const isSlicedProductionBuild = isCorporate9Build || isCorporate12Build;

const resolvePath = (value: string) =>
  fileURLToPath(new URL(value, import.meta.url));

function dataAlias(
  core: string,
  corporate9: string,
  corporate12: string,
  corporate15: string,
  full: string
) {
  const relative = isCoreBuild
    ? core
    : isCorporate9Build
      ? corporate9
      : isCorporate12Build
        ? corporate12
        : isCorporate15Build
          ? corporate15
          : full;
  return resolvePath(relative);
}

export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure we're in the project root
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    testTimeout: 30_000,
    hookTimeout: 30_000,
    pool: 'forks',
    maxWorkers: Math.min(4, os.cpus().length || 2),
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
      '@': resolvePath('./src'),
      '@modules-data': dataAlias(
        './src/data/modules-m1-m6.json',
        './src/data/modules-m1-m9.json',
        './src/data/modules-m1-m12.json',
        './src/data/modules-m1-m15.json',
        './src/data/modules.json'
      ),
      '@glossary-data': dataAlias(
        './src/data/glossary-m1-m6.json',
        './src/data/glossary-m1-m9.json',
        './src/data/glossary-m1-m12.json',
        './src/data/glossary-m1-m15.json',
        './src/data/glossary.json'
      ),
      '@tools-data': dataAlias(
        './src/data/tools-m1-m6.json',
        './src/data/tools-m1-m9.json',
        './src/data/tools-m1-m12.json',
        './src/data/tools-m1-m15.json',
        './src/data/tools.json'
      ),
      '@tools-en-data': dataAlias(
        './src/data/tools-en-m1-m6.json',
        './src/data/tools-en-m1-m9.json',
        './src/data/tools-en-m1-m12.json',
        './src/data/tools-en-m1-m15.json',
        './src/data/tools-en.json'
      ),
      '@m9-characters-data': resolvePath(
        isCoreBuild
          ? './src/data/m9Characters-empty.json'
          : './src/data/m9Characters.json'
      ),
      '@ai-detectors-slide': resolvePath(
        isCoreBuild
          ? './src/components/stubs/UnavailableModuleSlide.tsx'
          : './src/components/AiDetectorsSlide.tsx'
      ),
      '@vaizdo-generatorius-slide': resolvePath(
        isCoreBuild || isSlicedProductionBuild
          ? './src/components/stubs/UnavailableModuleSlide.tsx'
          : './src/components/VaizdoGeneratoriusSlide.tsx'
      ),
      '@i2v-generatorius-slide': resolvePath(
        isCoreBuild || isSlicedProductionBuild
          ? './src/components/stubs/UnavailableModuleSlide.tsx'
          : './src/components/I2vGeneratoriusSlide.tsx'
      ),
    },
  },
});
