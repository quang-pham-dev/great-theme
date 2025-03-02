import { Platform, type ViewStyle } from 'react-native'

import {
  isSmallDevice,
  navBar,
  screen,
  statusBar,
  window,
} from '@/theme/dimensions'

export const palette = {
  // Base colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  // Primary colors
  primary: '#3D93F8',
  primaryDark: '#0596c7',
  primaryLight: '#e6f6fb',

  // Secondary colors
  secondary: '#F97316',
  secondaryDark: '#ea580c',
  secondaryLight: '#fef3c7',

  // Neutral colors
  gray: '#F5F5F5',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Semantic colors
  success: '#10B981',
  warning: '#FBBF24',
  error: '#EA4335',
  errorLight: '#FEF2F2',
  info: '#3B82F6',

  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Shadow colors
  shadow: '#000000', // TODO
}

/**
 * Spacing scale for external spacing
 * Used for padding and margin - defines the space between elements and their containers
 * or the space between sibling elements
 */
export const spacing = {
  // Negative values
  '-xxxl': -48,
  '-xxl': -40,
  '-xl': -32,
  '-lg': -24,
  '-md': -16,
  '-sm': -8,
  '-xs': -4,
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
} as const

/**
 * Gap scale for internal spacing
 * Used exclusively for defining consistent spacing between child elements
 * within a container using the gap property
 */
export const gap = {
  none: 0,
  xs: 4, // For tight layouts
  sm: 8, // For compact components
  md: 12, // Default component spacing
  lg: 16, // For spacious layouts
  xl: 24, // For section separation
  xxl: 32, // For major section breaks
} as const

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  families: {
    primary: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    mono: Platform.select({
      ios: 'Courier',
      android: 'monospace',
      default: 'monospace',
    }),
  },
} as const

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 9999,
} as const

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: Platform.select({
    ios: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }),
  md: Platform.select({
    ios: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
    default: {},
  }),
  lg: Platform.select({
    ios: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
    default: {},
  }),
} as const

export const flex = {
  flexReset: {
    flex: undefined,
  },

  flex0: {
    flex: 0,
  },

  flex1: {
    flex: 1,
  },

  flex2: {
    flex: 2,
  },

  flex3: {
    flex: 3,
  },

  flex4: {
    flex: 4,
  },

  flex5: {
    flex: 5,
  },

  flexRow: {
    flexDirection: 'row',
  },

  flexColumn: {
    flexDirection: 'column',
  },

  flexColumnReverse: {
    flexDirection: 'column-reverse',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },

  justifyContentStart: {
    justifyContent: 'flex-start',
  },

  justifyContentEnd: {
    justifyContent: 'flex-end',
  },

  justifyContentBetween: {
    justifyContent: 'space-between',
  },

  justifyContentAround: {
    justifyContent: 'space-around',
  },

  alignSelfStretch: {
    alignSelf: 'stretch',
  },

  alignSelfCenter: {
    alignSelf: 'center',
  },

  alignSelfStart: {
    alignSelf: 'flex-start',
  },

  alignSelfEnd: {
    alignSelf: 'flex-end',
  },

  alignItemsStart: {
    alignItems: 'flex-start',
  },

  alignItemsCenter: {
    alignItems: 'center',
  },

  alignItemsEnd: {
    alignItems: 'flex-end',
  },

  alignItemsBaseline: {
    alignItems: 'baseline',
  },

  alignItemsStretch: {
    alignItems: 'stretch',
  },

  flexWrap: {
    flexWrap: 'wrap',
  },

  flexGrow0: {
    flexGrow: 0,
  },

  flexGrow1: {
    flexGrow: 1,
  },

  flexGrow2: {
    flexGrow: 2,
  },

  flexGrow4: {
    flexGrow: 4,
  },

  flexShrink2: {
    flexShrink: 2,
  },

  flexShrink1: {
    flexShrink: 1,
  },

  flexShrink0: {
    flexShrink: 0,
  },

  flexBasisAuto: {
    flexBasis: 'auto',
  },

  flexBasis100: {
    flexBasis: '100%',
  },

  flexBasis0: {
    flexBasis: 0,
  },
} satisfies Record<string, ViewStyle>

export type SemanticColors = {
  primary: string
  secondary: string
  success: string
  warning: string
  error: string
  info: string
}
export type SpacingScale = typeof spacing
export type TypographyScale = typeof typography
export type RadiusScale = typeof borderRadius
export type ShadowScale = typeof shadows
export type Flex = typeof flex

export const presets = {
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  // ... other presets
} as const

export const layout = {
  window,
  screen,
  statusBar,
  navBar,
  isSmallDevice,
} as const

// Add type
export type LayoutScale = typeof layout
