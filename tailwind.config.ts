import type { Config } from 'tailwindcss';
import { materialColors, materialTypeface, materialTypescale } from './theme.config.ts';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: (() => {
    let theme = {};
    theme = materialColors.toTailwind(theme);
    theme = materialTypeface.toTailwind(theme);
    theme = materialTypescale.toTailwind(theme);
    return theme;
  })(),
  plugins: [],
} satisfies Config;
