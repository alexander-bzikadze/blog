import type { Config } from 'tailwindcss'
import starlight from '@astrojs/starlight-tailwind'
import { materialColors, materialTypeface, materialTypescale } from './theme.config.ts'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: (() => {
    let theme: Config['theme'] = {}
    theme = materialColors.toTailwind(theme)
    theme = materialTypeface.toTailwind(theme)
    theme = materialTypescale.toTailwind(theme)
    theme = materialColors.toStarlight(theme)

    return theme
  })(),
  plugins: [starlight()],
} satisfies Config
