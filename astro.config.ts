import type { AstroIntegration } from 'astro'
import { defineConfig } from 'astro/config';
import relativeLinks from "astro-relative-links";
import svelte from '@astrojs/svelte'
import tailwind from "@astrojs/tailwind"

export default defineConfig({
    build: {
        format: 'file',
    },
    compressHTML: true,
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    relativeLinks() as AstroIntegration,
    svelte({
      preprocess: [],
    }),
    tailwind({
      configFile: 'tailwind.config.ts'
    }),
  ],
});
