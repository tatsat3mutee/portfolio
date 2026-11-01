// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output only: `dist/` can be served by Render, Caddy, S3 or any host.
export default defineConfig({
  site: 'https://tatsatpandey.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', assets: 'assets' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
