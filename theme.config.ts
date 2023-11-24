import * as mcu from '@material/material-color-utilities'
import { MaterialTypeface, MaterialTypescale } from './src/extensions/material/theme.ts'

export const colors: Record<string, [number, number, number]> = {
  freedom: [59, 94, 104],
  perfect: [234, 236, 211],
  love: [255, 73, 108],
}
export const coreColors: mcu.CorePaletteColors = {
  primary: mcu.argbFromRgb(...colors.freedom),
  secondary: mcu.argbFromRgb(...colors.perfect),
  tertiary: mcu.argbFromRgb(...colors.love),
}

export const materialTypeface: MaterialTypeface = {
  brand: 'Open Sans',
  plain: 'system-ui',
}

export const materialTypescale: MaterialTypescale = {
  display: {
    large: {
      font: materialTypeface.brand,
      weight: 400,
      fontSize: '3.5rem',
      lineHeight: '4rem',
      letterSpacing: '-0.016rem',
    },
    medium: {
      font: materialTypeface.brand,
      weight: 400,
      fontSize: '2.875rem',
      lineHeight: '3.375rem',
      letterSpacing: '0rem',
    },
    small: {
      font: materialTypeface.brand,
      weight: 400,
      fontSize: '2.25rem',
      lineHeight: '2.75rem',
      letterSpacing: '0rem',
    },
  },
  headline: {
    large: {
      font: materialTypeface.brand,
      weight: 400,
      fontSize: '2rem',
      lineHeight: '2.5rem',
      letterSpacing: '0rem',
    },
    medium: {
      font: materialTypeface.brand,
      weight: 400,
      fontSize: '1.75rem',
      lineHeight: '2.25rem',
      letterSpacing: '0rem',
    },
    small: {
      font: materialTypeface.brand,
      weight: 400,
      fontSize: '1.5rem',
      lineHeight: '2rem',
      letterSpacing: '0rem',
    },
  },
  body: {
    large: {
      font: materialTypeface.plain,
      weight: 400,
      fontSize: '1.125rem',
      lineHeight: '1.625rem',
      letterSpacing: '0.032rem',
    },
    medium: {
      font: materialTypeface.plain,
      weight: 400,
      fontSize: '1rem',
      lineHeight: '1.375rem',
      letterSpacing: '0.016rem',
    },
    small: {
      font: materialTypeface.plain,
      weight: 400,
      fontSize: '0.875rem',
      lineHeight: '1.125rem',
      letterSpacing: '0.025rem',
    },
  },
  label: {
    large: {
      font: materialTypeface.plain,
      weight: 500,
      fontSize: '1rem',
      lineHeight: '1.5rem',
      letterSpacing: '0.006rem',
    },
    medium: {
      font: materialTypeface.plain,
      weight: 500,
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      letterSpacing: '0.032rem',
    },
    small: {
      font: materialTypeface.plain,
      weight: 500,
      fontSize: '0.75rem',
      lineHeight: '1rem',
      letterSpacing: '0.025rem',
    },
  },
  title: {
    large: {
      font: materialTypeface.plain,
      weight: 400,
      fontSize: '1.5rem',
      lineHeight: '1.875rem',
      letterSpacing: '0rem',
    },
    medium: {
      font: materialTypeface.plain,
      weight: 500,
      fontSize: '1.125rem',
      lineHeight: '1.5rem',
      letterSpacing: '0.009rem',
    },
    small: {
      font: materialTypeface.plain,
      weight: 500,
      fontSize: '1rem',
      lineHeight: '1.375rem',
      letterSpacing: '0.006rem',
    },
  },
}
