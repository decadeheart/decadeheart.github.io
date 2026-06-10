// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://decadeheart.github.io',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  build: {
    format: 'directory',
  },
  vite: {
    server: {
      fs: { strict: false },
    },
  },
});
