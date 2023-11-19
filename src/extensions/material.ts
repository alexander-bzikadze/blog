import type { Config as TailwindConfig } from 'tailwindcss';
import * as mcu from '@material/material-color-utilities';
import { kebabize } from './kebabize.ts';
import { argbToRGB } from './colors.ts';

const COLOR_TONES = [
  0,
  10,
  20,
  25,
  30,
  35,
  40,
  50,
  60,
  70,
  80,
  90,
  95,
  98,
  99,
  100,
];

export class MaterialColors {
  constructor(colors: mcu.CorePaletteColors) {
    this.palette = mcu.CorePalette.fromColors(colors);
    this.light = mcu.Scheme.lightFromCorePalette(this.palette);
    this.dark = mcu.Scheme.darkFromCorePalette(this.palette);
  }

  public readonly palette: mcu.CorePalette;
  public readonly light: mcu.Scheme;
  public readonly dark: mcu.Scheme;

  private get paletteIter(): [string, mcu.TonalPalette][] {
    return [
      ['primary', this.palette.a1],
      ['secondary', this.palette.a2],
      ['tertiary', this.palette.a3],
      ['error', this.palette.error],
      ['neutral', this.palette.n1],
      ['neutral-variant', this.palette.n2],
    ];
  }

  private get schemeIter(): ['light' | 'dark', mcu.Scheme][] {
    return [['light', this.light], ['dark', this.dark]];
  }

  private to(
    paletteFM: (colorname: string, tone: number, color: string) => void,
    schemeFM: (schemename: string, colorname: string, color: string) => void,
  ): void {
    this.paletteIter.forEach(([colorname, color]) => {
      COLOR_TONES.forEach((tone) => paletteFM(colorname, tone, argbToRGB(color.tone(tone))));
    });

    this.schemeIter.forEach(([schemename, scheme]) => {
      Object.entries(scheme.toJSON()).forEach(([colorname, color]) =>
        schemeFM(schemename, colorname, argbToRGB(color))
      );
    });
  }

  public toTokens(): string[] {
    const result: string[] = [];

    this.to(
      (colorname, tone, color) => {
        result.push(`--md-ref-palette-${colorname}${tone}: ${color}`);
      },
      (schemename, colorname, color) => {
        result.push(`--md-sys-color-${kebabize(colorname)}-${schemename}: ${color}`);
      },
    );

    return result;
  }

  public toTailwind(theme: TailwindConfig['theme']): TailwindConfig['theme'] {
    theme.colors = theme.colors ?? {};

    this.to(
      (colorname, tone, color) => {
        theme.colors[`${colorname}-${tone}`] = color;
      },
      (schemename, colorname, color) => {
        theme.colors[`${kebabize(colorname)}-${schemename}`] = color;
      },
    );

    return theme;
  }
}

export class MaterialTypeface {
  constructor(
    public readonly brand: string,
    public readonly plain: string,
  ) {}

  public toTokens(): string[] {
    return [
      `--md-ref-typeface-brand: '${this.brand}'`,
      `--md-ref-typeface-plain: '${this.plain}'`,
    ];
  }

  public toTailwind(theme: TailwindConfig['theme']): TailwindConfig['theme'] {
    theme.fontFamily = theme.fontFamily ?? {};
    theme.fontFamily['brand'] = this.brand;
    theme.fontFamily['plain'] = this.plain;
    return theme;
  }
}

type Style = {
  font: string;
  weight: number;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
};

type Role = {
  large: Style;
  medium: Style;
  small: Style;
};

export class MaterialTypescale {
  public readonly display: Role;
  public readonly headline: Role;
  public readonly title: Role;
  public readonly body: Role;
  public readonly label: Role;

  constructor(
    init: { display: Role; headline: Role; title: Role; body: Role; label: Role },
  ) {
    this.display = init.display;
    this.headline = init.headline;
    this.title = init.title;
    this.body = init.body;
    this.label = init.label;
  }

  private get roleIter(): [string, Role][] {
    return [
      ['display', this.display],
      ['headline', this.headline],
      ['title', this.title],
      ['body', this.body],
      ['label', this.label],
    ];
  }

  private to(styleFM: (rolename: string, stylename: string, style: Style) => void): void {
    this.roleIter.forEach(([rolename, role]) =>
      Object.entries(role).forEach(([stylename, style]) => styleFM(rolename, stylename, style))
    );
  }

  public toTokens(): string[] {
    const result: string[] = [];

    this.to((rolename, stylename, style) => {
      result.push(`--md-sys-typescale-${rolename}-${stylename}-font: ${style.font}`);
      result.push(`--md-sys-typescale-${rolename}-${stylename}-weight: ${style.weight}`);
      result.push(`--md-sys-typescale-${rolename}-${stylename}-size: ${style.fontSize}`);
      result.push(`--md-sys-typescale-${rolename}-${stylename}-line-height: ${style.lineHeight}`);
      result.push(`--md-sys-typescale-${rolename}-${stylename}-letter-spacing: ${style.letterSpacing}`);
    });

    return result;
  }

  public toTailwind(theme: TailwindConfig['theme']): TailwindConfig['theme'] {
    theme.fontFamily = theme.fontFamily ?? {};
    theme.fontWeight = theme.fontWeight ?? {};
    theme.fontSize = theme.fontSize ?? {};
    theme.lineHeight = theme.lineHeight ?? {};
    theme.letterSpacing = theme.letterSpacing ?? {};

    this.to((rolename, stylename, style) => {
      const name = `${rolename}-${stylename}`;
      theme.fontFamily[name] = style.font;
      theme.fontWeight[name] = style.weight.toString();
      theme.fontSize[name] = style.fontSize;
      theme.lineHeight[name] = style.lineHeight;
      theme.letterSpacing[name] = style.letterSpacing;
    });

    return theme;
  }
}
