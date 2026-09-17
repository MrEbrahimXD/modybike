import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * ModyBike build config.
 *
 * GitHub Pages (project site, e.g. user.github.io/modybike) needs `base: '/modybike/'`.
 * Cloudflare Pages and custom domains keep `base: '/'`.
 * Set it once here; the prerenderer and sitemap read it from `SITE.baseUrl`.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = process.env.VITE_SITE_URL || env.VITE_SITE_URL || 'http://localhost:5173';
  const base = `${new URL(siteUrl).pathname.replace(/\/+$/, '')}/`;
  return {
  base,
  plugins: [react()],
  build: {
    target: 'es2018', // wide support for older Android WebViews / Chrome 70+
    cssTarget: 'chrome70',
    assetsInlineLimit: 2048,
    reportCompressedSize: false,
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            // Blog bodies are loaded on demand — never in the main bundle.
            if (id.includes('/src/content/posts/')) return undefined;
            if (id.includes('/src/data/products')) return 'data-catalog';
            return undefined;
          }
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
            return 'vendor-motion';
          }
          if (id.includes('react-router') || id.includes('@remix-run')) return 'vendor-router';
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('scheduler')) {
            return 'vendor-react';
          }
          return 'vendor';
        },
      },
    },
  },
  server: { port: 5173, host: true },
  preview: { port: 4173, host: true },
  };
});
