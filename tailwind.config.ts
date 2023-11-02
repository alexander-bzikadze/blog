import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: "Open Sans"
    },
    extend: {
      colors: {
        freedom: "#3B5E68",
        perfect: "#EAECD3",
        love: "#FF496C",
      }
    },
  },
  plugins: [],
} satisfies Config
