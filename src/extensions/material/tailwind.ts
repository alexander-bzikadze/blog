import type { Config as TailwindConfig } from 'tailwindcss'
import type { CorePaletteColors, TonalPalette } from '@material/material-color-utilities'
import type { MaterialTypescale, MaterialTypeface, MaterialRole, MaterialStyle } from './theme.ts'
import { CorePalette, Scheme } from '@material/material-color-utilities'
import plugin from 'tailwindcss/plugin.js'
import { argbToRGB } from '../colors.ts'
import { kebabize } from '../kebabize.ts'

const COLOR_TONES = [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100]

type Config = {
  colors: CorePaletteColors
  typeface: MaterialTypeface
  typescale: MaterialTypescale
}

export const material = (config: Config) => {
  const theme: NonNullable<TailwindConfig['theme']> = {}

  const palette = CorePalette.fromColors(config.colors)
  theme.colors = {
    primary: colortones(palette.a1),
    secondary: colortones(palette.a2),
    tertiary: colortones(palette.a3),
    error: colortones(palette.error),
    neutral: colortones(palette.n1),
    'neutral-variant': colortones(palette.n2),
  }

  theme.fontFamily = config.typeface

  return plugin(
    ({ addBase, addUtilities, theme }) => {
      const light = Scheme.lightFromCorePalette(palette)
      const dark = Scheme.darkFromCorePalette(palette)

      addUtilities({
        ...colorUtilities(light),
        ...typographyUtilities(config.typescale),
      })

      addBase({
        ':root': {
          ...systemColorTokens('light', light),
          ...systemColorTokens('dark', dark),
          '@media (prefers-color-scheme: light)': {
            ...systemThemedColorTokens('light', light),
          },
          '@media (prefers-color-scheme: dark)': {
            ...systemThemedColorTokens('dark', dark),
          },

          ...systemTypescaleTokens(config.typescale, 'body'),
          ...systemTypescaleTokens(config.typescale, 'display'),
          ...systemTypescaleTokens(config.typescale, 'headline'),
          ...systemTypescaleTokens(config.typescale, 'label'),
          ...systemTypescaleTokens(config.typescale, 'title'),
        },
        ':root[data-theme="light"][data-theme="light"]': {
          '--sl-color-white': theme('colors.neutral.10'),
          '--sl-color-gray-1': theme('colors.neutral.20'),
          '--sl-color-gray-2': theme('colors.neutral.30'),
          '--sl-color-gray-3': theme('colors.neutral.50'),
          '--sl-color-gray-4': theme('colors.neutral.60'),
          '--sl-color-gray-5': theme('colors.neutral.70'),
          '--sl-color-gray-6': theme('colors.neutral.80'),
          '--sl-color-gray-7': theme('colors.neutral.90'),
          '--sl-color-black': theme('colors.neutral.100'),
          '--sl-color-accent-low': theme('colors.primary.80'),
          '--sl-color-accent': theme('colors.primary.40'),
          '--sl-color-accent-high': theme('colors.primary.10'),
        },
        ':root[data-theme="dark"][data-theme="dark"]': {
          '--sl-color-white': theme('colors.neutral.100'),
          '--sl-color-gray-1': theme('colors.neutral.80'),
          '--sl-color-gray-2': theme('colors.neutral.70'),
          '--sl-color-gray-3': theme('colors.neutral.60'),
          '--sl-color-gray-4': theme('colors.neutral.40'),
          '--sl-color-gray-5': theme('colors.neutral.30'),
          '--sl-color-gray-6': theme('colors.neutral.20'),
          '--sl-color-black': theme('colors.gray.10'),
          '--sl-color-accent-low': theme('colors.primary.10'),
          '--sl-color-accent': theme('colors.primary.40'),
          '--sl-color-accent-high': theme('colors.primary.80'),
        },
      })
    },
    { theme },
  )
}

function colortones(tonalPalette: TonalPalette) {
  return Object.fromEntries(COLOR_TONES.map(tone => [tone, argbToRGB(tonalPalette.tone(tone))]))
}

function systemColorTokens(schemename: 'light' | 'dark', scheme: Scheme) {
  return Object.fromEntries(
    Object.entries(scheme.toJSON()).map(([colorname, color]) => [
      `--md-sys-color-${kebabize(colorname)}-${schemename}`,
      argbToRGB(color),
    ]),
  )
}

function systemThemedColorTokens(schemename: 'light' | 'dark', scheme: Scheme) {
  return Object.fromEntries(
    Object.entries(scheme.toJSON()).map(([colorname]) => [
      `--md-sys-color-${kebabize(colorname)}`,
      `var(--md-sys-color-${kebabize(colorname)}-${schemename})`,
    ]),
  )
}

// Only keys are used from the scheme
// Replacement for `colors.module.css`
function colorUtilities(scheme: Scheme) {
  return Object.entries(scheme.toJSON())
    .map(([colorname]) => ({
      [`.${kebabize(colorname)}`]: {
        '--tw-bg-opacity': '1',
        'background-color': `rgb(var(--md-sys-color-${kebabize(colorname)}), var(--tw-bg-opacity))`,
      },
      [`.${kebabize(colorname)}-text`]: {
        '--tw-bg-opacity': '1',
        color: `rgb(var(--md-sys-color-${kebabize(colorname)}), var(--tw-bg-opacity))`,
      },
    }))
    .reduce((pr, cu) => ({ ...pr, ...cu }), {})
}

function systemTypescaleTokens(typescale: MaterialTypescale, role: keyof MaterialTypescale) {
  return Object.entries(typescale[role])
    .map(([stylename, style]: [string, MaterialStyle]) => {
      return {
        [`--md-sys-typescale-${role}-${stylename}-font`]: style.font,
        [`--md-sys-typescale-${role}-${stylename}-weight`]: style.weight.toString(),
        [`--md-sys-typescale-${role}-${stylename}-size`]: style.fontSize,
        [`--md-sys-typescale-${role}-${stylename}-line-height`]: style.lineHeight,
        [`--md-sys-typescale-${role}-${stylename}-letter-spacing`]: style.letterSpacing,
      }
    })
    .reduce((pr, cu) => ({ ...pr, ...cu }), {})
}

// Only keys are used from typescale
// Replacement for `typography.module.css`
function typographyUtilities(typescale: MaterialTypescale) {
  return Object.entries(typescale)
    .flatMap(([rolename, role]: [string, MaterialRole]) =>
      Object.entries(role).map(([stylename]) => ({
        [`.${rolename}-${stylename}`]: {
          'font-family': `var(--md-sys-typescale-${rolename}-${stylename}-font)`,
          'font-weight': `var(--md-sys-typescale-${rolename}-${stylename}-weight)`,
          'font-size': `var(--md-sys-typescale-${rolename}-${stylename}-size)`,
          'letter-spacing': `var(--md-sys-typescale-${rolename}-${stylename}-tracking)`,
          'line-height': `var(--md-sys-typescale-${rolename}-${stylename}-line-height)`,
        },
      })),
    )
    .reduce((pr, cu) => ({ ...pr, ...cu }), {})
}
