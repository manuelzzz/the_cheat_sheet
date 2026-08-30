// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://manuelzzz.github.io',
  base: '/the_cheat_sheet',
  vite: {
    plugins: [tailwindcss()],
  },
});
