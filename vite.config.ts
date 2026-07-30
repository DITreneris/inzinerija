import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolvePublicAppUrlsForBuild } from './src/utils/publicSiteMeta';

const isCoreBuild = process.env.VITE_MVP_MODE === '1';
// Production ladder (be VITE_MVP_MODE): 9 = M1–9, 12 = M1–12, 15 = M1–15. Full = authoring M1–15 (same as 15 until M16).
// Slice build'ai 9/12 neįtraukia aukštesnių modulių (nėra client-side exposure).
const maxBuildModule = process.env.VITE_MAX_BUILD_MODULE;
const isCorporate9Build = !isCoreBuild && maxBuildModule === '9';
const isCorporate12Build = !isCoreBuild && maxBuildModule === '12';
const isCorporate15Build = !isCoreBuild && maxBuildModule === '15';
/** True when shipping a capped production slice that stubs M15 generators (9 | 12). */
const isSlicedProductionBuild = isCorporate9Build || isCorporate12Build;

const resolvePath = (value: string) =>
  fileURLToPath(new URL(value, import.meta.url));

const dataAlias = (
  core: string,
  corporate9: string,
  corporate12: string,
  corporate15: string,
  full: string
) =>
  resolvePath(
    isCoreBuild
      ? core
      : isCorporate9Build
        ? corporate9
        : isCorporate12Build
          ? corporate12
          : isCorporate15Build
            ? corporate15
            : full
  );

function seoIndexHtmlPlugin() {
  return {
    name: 'seo-index-html',
    transformIndexHtml(html: string) {
      const { appUrl, ogImageUrl } = resolvePublicAppUrlsForBuild({
        publicSiteUrl: process.env.VITE_PUBLIC_SITE_URL,
        basePath: process.env.VITE_BASE_PATH,
        nodeEnv: process.env.NODE_ENV,
      });
      return html
        .replace(/%VITE_OG_URL%/g, appUrl)
        .replace(/%VITE_OG_IMAGE%/g, ogImageUrl);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    seoIndexHtmlPlugin(),
    ...(process.env.ANALYZE
      ? [visualizer({ open: true, gzipSize: true, filename: 'stats.html' })]
      : []),
    // Dev: nekešinti modules.json, kad po serverio perkrovimo matytum naują turinį
    {
      name: 'no-cache-modules-json',
      configureServer(server) {
        const noCache = (
          _req: import('node:http').IncomingMessage,
          res: import('node:http').ServerResponse,
          next: () => void
        ) => {
          if (_req.url?.includes('modules.json')) {
            res.setHeader(
              'Cache-Control',
              'no-store, no-cache, must-revalidate'
            );
            res.setHeader('Pragma', 'no-cache');
          }
          next();
        };
        server.middlewares.stack.unshift({ route: '', handle: noCache });
      },
    },
  ],
  resolve: {
    alias: {
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
      // M9 veikėjai reikalingi korporatyviniam (1–9/1–12/1–15) ir full build'ams; tušti tik core 1–6.
      '@m9-characters-data': resolvePath(
        isCoreBuild
          ? './src/data/m9Characters-empty.json'
          : './src/data/m9Characters.json'
      ),
      // AI detektorių skaidrė (M7, id 201) reikalinga korporatyviniam build'ui; stub tik core 1–6.
      '@ai-detectors-slide': resolvePath(
        isCoreBuild
          ? './src/components/stubs/UnavailableModuleSlide.tsx'
          : './src/components/AiDetectorsSlide.tsx'
      ),
      // Vaizdo / I2V generatorius – M15; stub core + corporate 9/12 slice (corporate15 + full = live).
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
  base:
    process.env.VITE_BASE_PATH ??
    (process.env.NODE_ENV === 'production' ? '/inzinerija/' : '/'),
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
    headers: {
      // Dev only: Vite HMR uses eval(); Cursor/Chrome strict CSP blocks it.
      'Content-Security-Policy':
        "script-src 'self' 'unsafe-eval' 'unsafe-inline'; object-src 'self'",
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true, // Enable CSS code splitting
    minify: 'esbuild', // Use esbuild (faster, already included)
    cssMinify: true, // Minify CSS
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
          helmet: ['react-helmet-async'],
        },
        // Optimize chunk size
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
});
