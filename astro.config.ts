import type { AstroIntegration, AstroUserConfig } from 'astro'
import svelte from '@astrojs/svelte'
import sveltepreprocess from 'svelte-preprocess'
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
    sveltepreprocess({
      tsconfigFile: true,
      reportDiagnostics: true,
    }),
  ],
})

const starlightIntegration: AstroIntegration = starlight({
  title: 'Alexander Bzikadze Personal Website',
  head: [],
  components: {
    Header: './src/lib/starlight/header/Header.astro',
    Sidebar: './src/lib/starlight/sidebar/Sidebar.astro',
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
  devToolbar: {
    enabled: false,
  },
} satisfies AstroUserConfig
