import type { AstroIntegration } from 'astro'
import { defineConfig } from 'astro/config';
import relativeLinks from "astro-relative-links";
import svelte from '@astrojs/svelte'
import { typescript } from 'svelte-preprocess'
import tailwind from "@astrojs/tailwind"
import starlight from '@astrojs/starlight';

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
      preprocess: [
        typescript({
          tsconfigFile: true,
          reportDiagnostics: true,
        }),
      ],
    }),
    tailwind({
      configFile: 'tailwind.config.ts'
    }),
    starlight({
      title: "Alexander Bzikadze Personal Website",
    })
  ],
});
