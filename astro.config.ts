import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte'
import relativeLinks from "astro-relative-links";

export default defineConfig({
    build: {
        format: 'file',
    },
    compressHTML: true,
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    relativeLinks(),
    svelte({
      preprocess: [],
    }),
  ],
});
