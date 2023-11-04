import type { AstroUserConfig, AstroIntegration } from 'astro'
import relativeLinks from "astro-relative-links";
import svelte from '@astrojs/svelte'
import { typescript } from 'svelte-preprocess'
import tailwind from "@astrojs/tailwind"
import starlight from '@astrojs/starlight';
import mermaid from "./src/plugins/mermaid"


/**
 * @description Excludes sharp as it is not possible to use with Deno at the moment.
 */
const excludeSharpFix: AstroUserConfig['vite'] = {
  build: {
    rollupOptions: {
      external: [
        'sharp',
      ]
    }
  }
}

const svelteIntegration: AstroIntegration = svelte({
  preprocess: [
    typescript({
      tsconfigFile: true,
      reportDiagnostics: true,
    }),
  ],
})

/**
 * @description Sidebar navigation for architecture description, implemented with starlight.
 *              Required as currently starlight [does not support index pages](https://github.com/withastro/starlight/issues/370).
 */
const architectureSidebar: NonNullable<Parameters<typeof starlight>[0]['sidebar']>[0] = {
  label: 'Architecture Description',
  items: [
    { label: "Architecture Description", link: "/architecture" },
    { 
      label: 'Stakeholders', 
      autogenerate: { directory: 'architecture/stakeholders' } 
    },
  ]
}

/**
 * @description Include [Mermaid library](https://mermaid.js.org/config/usage.html) 
 *              on each page starlight page
 *              in order to render mermaid code blocks into diagrams.
 */
const mermaidScriptLoad: NonNullable<Parameters<typeof starlight>[0]['head']>[0] = {
  tag: "script",
  attrs: {
    type: "module",
    src: "https://cdn.jsdelivr.net/npm/mermaid@10.6.0/dist/mermaid.esm.min.mjs"
  }
}

const starlightIntegration: AstroIntegration = starlight({
  title: "Alexander Bzikadze Personal Website",
  sidebar: [architectureSidebar],
  head: [mermaidScriptLoad]
})

export default {
  build: {
    format: 'file',
  },
  vite: excludeSharpFix,
  compressHTML: true,
  output: 'static',
  trailingSlash: 'ignore',
  markdown: {
    remarkPlugins: [mermaid]
  },
  integrations: [
    relativeLinks() as AstroIntegration,
    svelteIntegration,
    tailwind({
      configFile: 'tailwind.config.ts'
    })  as AstroIntegration,
    starlightIntegration,
  ],
} satisfies AstroUserConfig
