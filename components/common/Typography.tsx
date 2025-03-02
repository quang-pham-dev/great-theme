import {
  type StyleProp,
  Text,
  type TextProps,
  type TextStyle,
} from 'react-native'

import { useStyleUtils } from '@/hooks/useStyleUtils'
import { useTheme } from '@/hooks/useTheme'

import type { Theme } from '@/theme/theme'

/**
 * Available variants for Typography components
 */
export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'title'
  | 'subtitle'
  | 'subtitle1'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'
  | 'link'
  | 'error'

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold'

/**
 * Props for Typography components
 */
export interface TypographyProps extends TextStyle, Omit<TextProps, 'style'> {
  /**
   * Font weight for the text
   * @default 'regular'
   */
  weight?: FontWeight
  /**
   * Number of lines to show
   * @default undefined (show all lines)
   */
  numberOfLines?: number
  /**
   * Typography variant
   * @default 'body1'
   */
  variant?: TypographyVariant

  /**
   * Whether to center the text
   * @default false
   */
  center?: boolean

  /**
   * Custom color from theme
   */
  color?: keyof Theme['colors']

  /**
   * Text Alignment
   */
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined

  /**
   * Custom style to override default styles
   */
  style?: StyleProp<TextStyle>
}

/**
 * Typography Component
 *
 * A themed text component with various typography styles.
 *
 * @example
 * ```tsx
 * Basic usage
 * <Typography>Default body text</Typography>
 *
 * Heading
 * <Typography variant="h1">Large Title</Typography>
 *
 * Centered subtitle with custom color
 * <Typography
 *   variant="subtitle1"
 *   center
 *   color="primary"
 * >
 *   Centered Subtitle
 * </Typography>
 * ```
 */
export function Typography({
  variant = 'body1',
  center,
  color,
  style,
  weight = 'regular',
  numberOfLines,
  children,
  ...props
}: TypographyProps): JSX.Element {
  const { theme } = useTheme()
  const styleUtils = useStyleUtils()
  const weightStyles = styleUtils.createThemedStyle((theme: Theme) => ({
    regular: {
      fontWeight: theme.typography.weights.regular,
    },
    medium: {
      fontWeight: theme.typography.weights.medium,
    },
    semibold: {
      fontWeight: theme.typography.weights.semibold,
    },
    bold: {
      fontWeight: theme.typography.weights.bold,
    },
  }))

  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    base: {
      color: theme.colors.text,
    },
    h1: {
      fontSize: theme.typography.sizes.xxxl,
      fontWeight: theme.typography.weights.bold,
      lineHeight: theme.typography.sizes.xxxl * 1.2,
    },
    h2: {
      fontSize: theme.typography.sizes.xxl,
      fontWeight: theme.typography.weights.bold,
      lineHeight: theme.typography.sizes.xxl * 1.2,
    },
    h3: {
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.semibold,
      lineHeight: theme.typography.sizes.xl * 1.2,
    },
    h4: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.semibold,
      lineHeight: theme.typography.sizes.lg * 1.2,
    },
    title: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.bold,
      lineHeight: theme.typography.sizes.md * 1.5,
    },
    subtitle: {
      fontSize: theme.typography.sizes.md,
      color: theme.colors.textSecondary,
      fontWeight: theme.typography.weights.medium,
      lineHeight: theme.typography.sizes.md * 1.5,
    },
    subtitle1: {
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium,
      lineHeight: theme.typography.sizes.sm * 1.5,
    },
    body1: {
      fontSize: theme.typography.sizes.md,
      lineHeight: theme.typography.sizes.md * 1.5,
    },
    body2: {
      fontSize: theme.typography.sizes.sm,
      lineHeight: theme.typography.sizes.sm * 1.5,
    },
    caption: {
      fontSize: theme.typography.sizes.xs,
      lineHeight: theme.typography.sizes.xs * 1.5,
    },
    overline: {
      fontSize: theme.typography.sizes.xs,
      fontWeight: theme.typography.weights.medium,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    link: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.medium,
      color: theme.colors.primary,
    },
    error: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.medium,
      color: theme.colors.error,
      lineHeight: theme.typography.sizes.sm * 1.5,
    },
  }))

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles.base,
        styles[variant],
        weightStyles[weight],
        center && { textAlign: 'center' },
        color && { color: theme.colors[color] },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  )
}

/**
 * Convenience components for common typography variants
 */
export const H1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" {...props} />
)

export const H2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" {...props} />
)

export const H3 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" {...props} />
)

export const H4 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h4" {...props} />
)

export const Title = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="title" {...props} />
)

export const Subtitle = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="subtitle" {...props} />
)

export const Subtitle1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="subtitle1" {...props} />
)

export const Body1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body1" {...props} />
)

export const Body2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body2" {...props} />
)

export const Caption = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="caption" {...props} />
)

export const Overline = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="overline" {...props} />
)

export const TextError = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="error" {...props} />
)
