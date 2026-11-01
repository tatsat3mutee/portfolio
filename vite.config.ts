import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Two real pages so /khwaab works on any static host without rewrites.
// `vite build --ssr src/entry-server.tsx` builds the pre-renderer used by scripts/postbuild.mjs.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  define: {
    // Resume buttons show only when public/resume.pdf exists.
    __HAS_RESUME__: JSON.stringify(existsSync(resolve(__dirname, 'public/resume.pdf'))),
  },
  build: isSsrBuild
    ? { outDir: 'dist-ssr', emptyOutDir: true }
    : {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
            khwaab: resolve(__dirname, 'khwaab/index.html'),
          },
        },
      },
}));
