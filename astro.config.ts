import type { AstroIntegration, RemarkPlugins } from 'astro'
import { defineConfig } from 'astro/config';
import relativeLinks from "astro-relative-links";
import svelte from '@astrojs/svelte'
import { typescript } from 'svelte-preprocess'
import tailwind from "@astrojs/tailwind"
import starlight from '@astrojs/starlight';
import mermaid from "./src/plugins/mermaid"

export default defineConfig({
  build: {
    format: 'file',
  },
  vite: {
    build: {
      rollupOptions: {
        external: [
          "sharp"
        ]
      }
    }
  },
  compressHTML: true,
  output: 'static',
  trailingSlash: 'ignore',
  markdown: {
    remarkPlugins: [mermaid]
  },
  integrations: [
    relativeLinks() as AstroIntegration,
    svelte({
      preprocess: [
        typescript({
          tsconfigFile: true,
          reportDiagnostics: true,
        }),
      ],
    }) as AstroIntegration,
    tailwind({
      configFile: 'tailwind.config.ts'
    })  as AstroIntegration,
    starlight({
      title: "Alexander Bzikadze Personal Website",
      sidebar: [
        {
          label: 'Architecture Description',
          items: [
            { label: "Architecture Description", link: "/architecture" },
            { 
              label: 'Stakeholders', 
              autogenerate: { directory: 'architecture/stakeholders' } 
            },
          ]
        },
      ],
      head: [
        // Include [Mermaid library](https://mermaid.js.org/config/usage.html) on each page
        // in order to render mermaid code blocks into diagrams.
        {
          tag: "script",
          attrs: {
            type: "module",
            src: "https://cdn.jsdelivr.net/npm/mermaid@10.6.0/dist/mermaid.esm.min.mjs"
          }
        }
      ]
    })
  ],
});
