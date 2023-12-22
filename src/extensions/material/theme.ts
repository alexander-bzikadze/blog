export type MaterialTypeface = {
  readonly brand: string
  readonly plain: string
}

export interface MaterialStyle {
  font: string
  weight: number
  fontSize: string
  lineHeight: string
  letterSpacing: string
}

export interface MaterialRole {
  large: MaterialStyle
  medium: MaterialStyle
  small: MaterialStyle
}

export type MaterialTypescale = {
  readonly display: MaterialRole
  readonly headline: MaterialRole
  readonly title: MaterialRole
  readonly body: MaterialRole
  readonly label: MaterialRole
}

// light -> 40, 100, 90, 10
// dark -> 80, 20, 30, 90
