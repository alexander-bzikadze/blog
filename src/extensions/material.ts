import type { Config as TailwindConfig } from 'tailwindcss'
import * as mcu from '@material/material-color-utilities'
import { kebabize } from './kebabize.ts'
import { argbToRGB } from './colors.ts'

type TailwindConfigThemeConfig = NonNullable<TailwindConfig['theme']>

const COLOR_TONES = [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100]

export class MaterialColors {
  constructor(colors: mcu.CorePaletteColors) {
    this.palette = mcu.CorePalette.fromColors(colors)
    this.light = mcu.Scheme.lightFromCorePalette(this.palette)
    this.dark = mcu.Scheme.darkFromCorePalette(this.palette)
  }

  public readonly palette: mcu.CorePalette

  public readonly light: mcu.Scheme

  public readonly dark: mcu.Scheme

  private get paletteIter(): [string, mcu.TonalPalette][] {
    return [
      ['primary', this.palette.a1],
      ['secondary', this.palette.a2],
      ['tertiary', this.palette.a3],
      ['error', this.palette.error],
      ['neutral', this.palette.n1],
      ['neutral-variant', this.palette.n2],
    ]
  }

  private get schemeIter(): ['dark' | 'light', mcu.Scheme][] {
    return [
      ['light', this.light],
      ['dark', this.dark],
    ]
  }

  private to(
    paletteFM: (colorname: string, tone: number, color: string) => void,
    schemeFM: (schemename: string, colorname: string, color: string) => void,
  ): void {
    this.paletteIter.forEach(([colorname, color]) => {
      COLOR_TONES.forEach(tone => {
        paletteFM(colorname, tone, argbToRGB(color.tone(tone)))
      })
    })

    this.schemeIter.forEach(([schemename, scheme]) => {
      Object.entries(scheme.toJSON()).forEach(([colorname, color]) => {
        schemeFM(schemename, colorname, argbToRGB(color as number))
      })
    })
  }

  public toTokens(): string[] {
    const result: string[] = []

    this.to(
      (colorname, tone, color) => {
        result.push(`--md-ref-palette-${colorname}${tone}: ${color}`)
      },
      (schemename, colorname, color) => {
        result.push(`--md-sys-color-${kebabize(colorname)}-${schemename}: ${color}`)
      },
    )

    return result
  }

  public toTailwind(theme: TailwindConfigThemeConfig): TailwindConfigThemeConfig {
    const colors: Record<string, string> = {}

    this.to(
      (colorname, tone, color) => {
        colors[`${colorname}-${tone}`] = color
      },
      (schemename, colorname, color) => {
        colors[`${kebabize(colorname)}-${schemename}`] = color
      },
    )

    theme.colors = { ...theme.colors, ...colors }
    return theme
  }

  public toStarlight(theme: TailwindConfigThemeConfig): TailwindConfigThemeConfig {
    const accent = Object.fromEntries(
      COLOR_TONES.map(tone => [(100 - tone) * 10, argbToRGB(this.palette.a1.tone(tone))]),
    )
    const gray = Object.fromEntries(COLOR_TONES.map(tone => [(100 - tone) * 10, argbToRGB(this.palette.n1.tone(tone))]))

    theme.colors = { ...theme.colors, accent, gray }
    return theme
  }
}

export class MaterialTypeface {
  constructor(
    public readonly brand: string,
    public readonly plain: string,
  ) {}

  public toTokens(): string[] {
    return [`--md-ref-typeface-brand: '${this.brand}'`, `--md-ref-typeface-plain: '${this.plain}'`]
  }

  public toTailwind(theme: TailwindConfigThemeConfig): TailwindConfigThemeConfig {
    const fontFamily: Record<string, string> = {}

    fontFamily['brand'] = this.brand
    fontFamily['plain'] = this.plain

    theme.fontFamily = { ...theme.fontFamily, ...fontFamily }
    return theme
  }
}

interface Style {
  font: string
  weight: number
  fontSize: string
  lineHeight: string
  letterSpacing: string
}

interface Role {
  large: Style
  medium: Style
  small: Style
}

export class MaterialTypescale {
  public readonly display: Role

  public readonly headline: Role

  public readonly title: Role

  public readonly body: Role

  public readonly label: Role

  constructor(init: { display: Role; headline: Role; title: Role; body: Role; label: Role }) {
    this.display = init.display
    this.headline = init.headline
    this.title = init.title
    this.body = init.body
    this.label = init.label
  }

  private get roleIter(): [string, Role][] {
    return [
      ['display', this.display],
      ['headline', this.headline],
      ['title', this.title],
      ['body', this.body],
      ['label', this.label],
    ]
  }

  private to(styleFM: (rolename: string, stylename: string, style: Style) => void): void {
    this.roleIter.forEach(([rolename, role]) => {
      Object.entries(role).forEach(([stylename, style]) => {
        styleFM(rolename, stylename, style)
      })
    })
  }

  public toTokens(): string[] {
    const result: string[] = []

    this.to((rolename, stylename, style) => {
      result.push(`--md-sys-typescale-${rolename}-${stylename}-font: ${style.font}`)
      result.push(`--md-sys-typescale-${rolename}-${stylename}-weight: ${style.weight}`)
      result.push(`--md-sys-typescale-${rolename}-${stylename}-size: ${style.fontSize}`)
      result.push(`--md-sys-typescale-${rolename}-${stylename}-line-height: ${style.lineHeight}`)
      result.push(`--md-sys-typescale-${rolename}-${stylename}-letter-spacing: ${style.letterSpacing}`)
    })

    return result
  }

  public toTailwind(theme: TailwindConfigThemeConfig): TailwindConfigThemeConfig {
    const fontFamily: Record<string, string> = {}
    const fontWeight: Record<string, string> = {}
    const fontSize: Record<string, string> = {}
    const lineHeight: Record<string, string> = {}
    const letterSpacing: Record<string, string> = {}

    this.to((rolename, stylename, style) => {
      const name = `${rolename}-${stylename}`
      fontFamily[name] = style.font
      fontWeight[name] = style.weight.toString()
      fontSize[name] = style.fontSize
      lineHeight[name] = style.lineHeight
      letterSpacing[name] = style.letterSpacing
    })

    theme.fontFamily = { ...theme.fontFamily, ...fontFamily }
    theme.fontWeight = { ...theme.fontWeight, ...fontWeight }
    theme.fontSize = { ...theme.fontSize, ...fontSize }
    theme.lineHeight = { ...theme.lineHeight, ...lineHeight }
    theme.letterSpacing = { ...theme.letterSpacing, ...letterSpacing }

    return theme
  }
}
