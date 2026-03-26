import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://victorbertram.com',
  integrations: [react(), mdx()],

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  adapter: cloudflare()
});