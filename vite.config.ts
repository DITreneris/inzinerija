import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

const isCoreBuild = process.env.VITE_MVP_MODE === '1'
const resolvePath = (value: string) => fileURLToPath(new URL(value, import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ...(process.env.ANALYZE ? [visualizer({ open: true, gzipSize: true, filename: 'stats.html' })] : []),
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
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')
            res.setHeader('Pragma', 'no-cache')
          }
          next()
        }
        server.middlewares.stack.unshift({ route: '', handle: noCache })
      },
    },
  ],
  resolve: {
    alias: {
      '@modules-data': resolvePath(isCoreBuild ? './src/data/modules-m1-m6.json' : './src/data/modules.json'),
      '@glossary-data': resolvePath(isCoreBuild ? './src/data/glossary-m1-m6.json' : './src/data/glossary.json'),
      '@tools-data': resolvePath(isCoreBuild ? './src/data/tools-m1-m6.json' : './src/data/tools.json'),
      '@tools-en-data': resolvePath(isCoreBuild ? './src/data/tools-en-m1-m6.json' : './src/data/tools-en.json'),
      '@m9-characters-data': resolvePath(isCoreBuild ? './src/data/m9Characters-empty.json' : './src/data/m9Characters.json'),
      '@ai-detectors-slide': resolvePath(isCoreBuild ? './src/components/stubs/UnavailableModuleSlide.tsx' : './src/components/AiDetectorsSlide.tsx'),
      '@vaizdo-generatorius-slide': resolvePath(isCoreBuild ? './src/components/stubs/UnavailableModuleSlide.tsx' : './src/components/VaizdoGeneratoriusSlide.tsx'),
    },
  },
  base: process.env.VITE_BASE_PATH ?? (process.env.NODE_ENV === 'production' ? '/inzinerija/' : '/'),
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
    headers: {
      // Dev only: Vite HMR uses eval(); Cursor/Chrome strict CSP blocks it.
      'Content-Security-Policy': "script-src 'self' 'unsafe-eval' 'unsafe-inline'; object-src 'self'",
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
          helmet: ['react-helmet-async']
        },
        // Optimize chunk size
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      }
    }
  }
})
