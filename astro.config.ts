import type { AstroIntegration, AstroUserConfig } from 'astro'
import svelte from '@astrojs/svelte'
import { typescript } from 'svelte-preprocess'
import tailwind from '@astrojs/tailwind'
import starlight from '@astrojs/starlight'
import mermaid from './src/extensions/mermaid.ts'

const base: string | undefined = process.env.ASTRO_BASE_URL
const site: string | undefined = process.env.ASTRO_SITE

const excludeSharpFix: AstroUserConfig['vite'] = {
  build: {
    rollupOptions: {
      external: [],
    },
  },
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
    { label: 'Architecture Description', link: '/architecture/' },
    {
      label: 'Stakeholders',
      autogenerate: { directory: '/architecture/stakeholders/' },
      collapsed: true,
    },
    {
      label: 'Concerns',
      autogenerate: { directory: '/architecture/concerns/' },
      collapsed: true,
    },
    {
      label: 'Architecture Decision Records',
      autogenerate: { directory: '/architecture/decisions/' },
      collapsed: true,
    },
  ],
}

const starlightIntegration: AstroIntegration = starlight({
  title: 'Alexander Bzikadze Personal Website',
  sidebar: [architectureSidebar],
  head: [],
  components: {
    Header: './src/lib/starlight/header/Header.astro',
  },
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
    remarkPlugins: [mermaid],
  },
  integrations: [
    svelteIntegration,
    tailwind({
      configFile: 'tailwind.config.ts',
    }),
    starlightIntegration,
  ],
} satisfies AstroUserConfig
