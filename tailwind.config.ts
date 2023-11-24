import type { Config } from 'tailwindcss'
import { material } from './src/extensions/material/tailwind.ts'
import { coreColors, materialTypeface, materialTypescale } from './theme.config.ts'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [
    material({
      colors: coreColors,
      typeface: materialTypeface,
      typescale: materialTypescale,
    }),
  ],
} satisfies Config
