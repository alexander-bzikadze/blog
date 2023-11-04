import type { AstroUserConfig, AstroIntegration } from 'astro'
import type { MermaidConfig, RunOptions as MermaidRunOptions } from "mermaid"
import svelte from '@astrojs/svelte'
import { typescript } from 'svelte-preprocess'
import tailwind from "@astrojs/tailwind"
import starlight from '@astrojs/starlight';
import mermaid from "./src/plugins/mermaid"
import "./.polyfill/process"


const base: string | undefined = process.env.ASTRO_BASE_URL
const site: string | undefined = process.env.ASTRO_SITE

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
    { label: "Architecture Description", link: "/architecture/" },
    { 
      label: 'Stakeholders', 
      autogenerate: { directory: 'architecture/stakeholders/' } 
    },
  ]
}

const mermaidConfig: MermaidConfig = { 
  startOnLoad: false,
}
const mermaidRuntimeConfig: MermaidRunOptions = {
  querySelector: ".mermaid"
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
  },
  // TODO: move to a proper component
  // TODO: fix dark theme and theme switching
  content: `import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10.6.0/dist/mermaid.esm.min.mjs";` +
    `mermaid.initialize({ ...${JSON.stringify(mermaidConfig)},darkMode});` +
    `await mermaid.run(${JSON.stringify(mermaidRuntimeConfig)});`
}

const starlightIntegration: AstroIntegration = starlight({
  title: "Alexander Bzikadze Personal Website",
  sidebar: [architectureSidebar],
  head: [mermaidScriptLoad]
})

export default {
  base,
  site,
  build: {
    format: 'directory',
  },
  vite: excludeSharpFix,
  compressHTML: true,
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [mermaid]
  },
  integrations: [
    svelteIntegration,
    tailwind({
      configFile: 'tailwind.config.ts'
    })  as AstroIntegration,
    starlightIntegration,
  ],
} satisfies AstroUserConfig
