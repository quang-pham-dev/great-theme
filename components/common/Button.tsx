import {
  Pressable,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'

import { useStyleUtils } from '@/hooks/useStyleUtils'
import { useThemeVariant } from '@/hooks/useThemeVariant'

import { ThemedText } from '../ThemedText'
import { LoadingIndicator } from './LoadingIndicator'

import type { Theme } from '@/theme/theme'
import type { ReactNode } from 'react'

/**
 * Available visual variants for the Button component
 * @typedef {'primary' | 'secondary' | 'outline' | 'ghost'} ButtonVariant
 * @description
 * - primary: Main call-to-action button with brand color
 * - secondary: Alternative button style with surface color
 * - outline: Bordered button with transparent background
 * - ghost: Text-only button without background or border
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

/**
 * Predefined size options for the Button component
 * @typedef {'small' | 'medium' | 'large'} ButtonSize
 * @description
 * - small: Compact button for tight spaces (padding: sm, fontSize: 14)
 * - medium: Standard button size (padding: md, fontSize: 16)
 * - large: Prominent button size (padding: lg, fontSize: 18)
 */
type ButtonSize = 'small' | 'medium' | 'large'

/**
 * Type definitions for theme variant system
 * @template T The type of style object that the variant function returns
 */
type VariantFunction<T> = (theme: Theme) => T
type Variants<T> = {
  [key: string]: VariantFunction<T>
  default: VariantFunction<T>
}

/**
 * Button variant styles configuration
 * Defines the visual appearance for different button states
 * @type {Variants<ViewStyle>}
 */
const buttonVariants: Variants<ViewStyle> = {
  primary: (theme: Theme) => ({
    backgroundColor: theme.colors.primary,
    borderColor: 'transparent',
    borderWidth: 0,
  }),
  secondary: (theme: Theme) => ({
    backgroundColor: theme.colors.surface,
    borderColor: 'transparent',
    borderWidth: 0,
  }),
  outline: (theme: Theme) => ({
    backgroundColor: 'transparent',
    borderColor: theme.colors.border,
    borderWidth: 1,
  }),
  ghost: () => ({
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
  }),
  default: (theme: Theme) => buttonVariants.primary(theme),
}

/**
 * Text variant styles configuration
 * Defines the text color for different button states
 * @type {Variants<TextStyle>}
 * @description
 * - primary: Inverse text color for primary buttons
 * - secondary: Default text color for light backgrounds
 * - outline: Default text color for bordered buttons
 * - ghost: Default text color for transparent buttons
 */
const textVariants: Variants<TextStyle> = {
  primary: (theme: Theme) => ({
    color: theme.colors.textInverse,
  }),
  secondary: (theme: Theme) => ({
    color: theme.colors.text,
  }),
  outline: (theme: Theme) => ({
    color: theme.colors.text,
  }),
  ghost: (theme: Theme) => ({
    color: theme.colors.text,
  }),
  default: (theme: Theme) => textVariants.primary(theme),
}

/**
 * Interface for size-specific style properties
 * @interface SizeStyle
 * @property {number} padding - The padding value for the button
 * @property {number} fontSize - The font size for the button text
 */
interface SizeStyle {
  padding: number
  fontSize: number
}

/**
 * Size variant configuration
 * Defines different size presets for the button
 * @type {Variants<SizeStyle>}
 */
const sizeVariants: Variants<SizeStyle> = {
  small: (theme: Theme) => ({
    padding: theme.spacing.sm,
    fontSize: 14,
  }),
  medium: (theme: Theme) => ({
    padding: theme.spacing.md,
    fontSize: 16,
  }),
  large: (theme: Theme) => ({
    padding: theme.spacing.lg,
    fontSize: 18,
  }),
  default: (theme: Theme) => sizeVariants.medium(theme),
}

/**
 * Type definition for button style array
 * Combines ViewStyle and StyleProp for flexible style application
 * @typedef {ViewStyle | StyleProp<ViewStyle>} ButtonStyle
 */
type ButtonStyle = ViewStyle | StyleProp<ViewStyle>

export type BaseButtonProps = {
  /**
   * The title of the button
   * @default undefined
   */
  title?: string
  /**
   * The variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant
  /**
   * The size of the button
   * @default 'medium'
   */
  size?: ButtonSize
  /**
   * If true, the button will show a loading spinner
   * @default false
   */
  loading?: boolean
  /**
   * Text style of the button
   * @default undefined
   */
  textStyle?: StyleProp<TextStyle>

  /**
   * Container style for the image wrapper
   */
  style?: StyleProp<ViewStyle>

  /**
   * Children of the button
   * @default undefined
   */
  children?: ReactNode
} & Omit<PressableProps, 'children'>

export type TitleButtonProps = BaseButtonProps & {
  title: string
  children?: never
}

export type ChildrenButtonProps = BaseButtonProps & {
  title?: never
  children: ReactNode
}

export type ButtonProps = TitleButtonProps | ChildrenButtonProps

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled,
  style,
  textStyle,
  children,
  ...props
}: ButtonProps) {
  const buttonStyle = useThemeVariant(buttonVariants, variant)
  const textStyleVariant = useThemeVariant(textVariants, variant)
  const sizeStyle = useThemeVariant(sizeVariants, size)
  const styleUtils = useStyleUtils()

  /**
   * Hook for creating base button styles
   * Uses the theme system to generate consistent styling
   * @param {Theme} theme - The current theme object
   * @returns {StyleSheet} A StyleSheet object with base button styles
   */
  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    button: {
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: theme.spacing.xs,
    },
    text: {
      fontWeight: theme.typography.weights.semibold,
    },
    disabled: {
      backgroundColor: theme.colors.primaryDisabled,
      borderColor: theme.colors.border,
    },
    disabledText: {
      color: theme.colors.textDisabled,
    },
  }))

  const getButtonStyle = ({
    pressed,
  }: PressableStateCallbackType): ButtonStyle[] =>
    [
      styles.button,
      buttonStyle,
      sizeStyle,
      disabled && styles.disabled,
      { opacity: pressed ? 0.8 : 1 },
      style as ViewStyle,
    ].filter(Boolean)

  const content = title || children

  return (
    <Pressable
      disabled={disabled || loading}
      style={getButtonStyle}
      accessibilityRole="button"
      accessibilityLabel={title}
      {...props}>
      {loading ? (
        <LoadingIndicator variant="primary" />
      ) : (
        <ThemedText
          style={[
            styles.text,
            textStyleVariant,
            { fontSize: sizeStyle.fontSize },
            disabled && styles.disabledText,
            textStyle,
          ].filter(Boolean)}>
          {content}
        </ThemedText>
      )}
    </Pressable>
  )
}
