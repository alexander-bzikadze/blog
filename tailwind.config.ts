import type { Config } from 'tailwindcss'
import { material } from './src/extensions/material/tailwind.ts'
import flowbite from 'flowbite/plugin'
import { coreColors, materialTypeface, materialTypescale } from './theme.config.ts'

export default {
  darkMode: 'media',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './node_modules/flowbite/**/*.js'],
  theme: {
    fontFamily: {
      sans: 'Open Sans',
    },
  },
  plugins: [
    flowbite,
    material({
      colors: coreColors,
      typeface: materialTypeface,
      typescale: materialTypescale,
    }),
  ],
} satisfies Config
