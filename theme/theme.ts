import {
  borderRadius,
  gap,
  palette,
  shadows,
  spacing,
  typography,
} from './tokens'

export type ThemeMode = 'light' | 'dark'

export interface Theme {
  mode: ThemeMode
  colors: {
    // Base colors
    white: string
    black: string
    transparent: string
    // Background colors
    background: string
    surface: string
    surfaceHover: string
    surfacePressed: string

    // Text colors
    text: string
    textSecondary: string
    textDisabled: string
    textInverse: string

    // Border colors
    border: string
    borderFocus: string

    // Action colors
    primary: string
    primaryLight: string
    primaryPressed: string
    primaryDisabled: string
    // secondary: string // TODO: add secondary color

    // Status colors
    success: string
    warning: string
    error: string
    errorLight: string
    info: string

    // Component specific
    card: string
    cardPressed: string
    overlay: string

    // Shadow colors
    shadow: string
    // Semantic colors
    // semantic: SemanticColors
  }
  spacing: typeof spacing
  gap: typeof gap
  typography: typeof typography
  borderRadius: typeof borderRadius
  shadows: typeof shadows
}

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    // Base colors
    white: palette.white,
    black: palette.black,
    transparent: palette.transparent,
    // Background colors
    background: palette.white,
    surface: palette.gray50,
    surfaceHover: palette.gray100,
    surfacePressed: palette.gray200,

    // Text colors
    text: palette.gray900,
    textSecondary: palette.gray600,
    textDisabled: palette.gray400,
    textInverse: palette.white,

    // Border colors
    border: palette.gray200,
    borderFocus: palette.primary,

    // Action colors
    primary: palette.primary,
    primaryLight: palette.primaryLight,
    primaryPressed: palette.primaryDark,
    primaryDisabled: palette.primaryLight,

    // Status colors
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    errorLight: palette.errorLight,
    info: palette.info,

    // Component specific
    card: palette.white,
    cardPressed: palette.gray50,
    overlay: palette.overlay,
    shadow: palette.shadow,
    // semantic: {
    //   primary: palette.primary,
    //   secondary: palette.secondary,
    //   success: palette.success,
    //   warning: palette.warning,
    //   error: palette.error,
    //   info: palette.info,
    // },
  },
  spacing,
  gap,
  typography,
  borderRadius,
  shadows,
}

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    // Base colors
    white: palette.white,
    black: palette.black,
    transparent: palette.transparent,
    // Background colors
    background: palette.gray900,
    surface: palette.gray800,
    surfaceHover: palette.gray700,
    surfacePressed: palette.gray600,

    // Text colors
    text: palette.gray50,
    textSecondary: palette.gray300,
    textDisabled: palette.gray500,
    textInverse: palette.gray900,

    // Border colors
    border: palette.gray700,
    borderFocus: palette.primary,

    // Action colors
    primary: palette.primary,
    primaryLight: palette.primaryLight,
    primaryPressed: palette.primaryDark,
    primaryDisabled: palette.primaryLight,

    // Status colors
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    errorLight: palette.errorLight,
    info: palette.info,

    // Component specific
    card: palette.gray800,
    cardPressed: palette.gray700,
    overlay: palette.overlay,
    shadow: palette.shadow,
    // semantic: {
    //   primary: palette.primary,
    //   secondary: palette.secondary,
    //   success: palette.success,
    //   warning: palette.warning,
    //   error: palette.error,
    //   info: palette.info,
    // },
  },
  spacing,
  gap,
  typography,
  borderRadius,
  shadows,
}
