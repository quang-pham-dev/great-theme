import { Ionicons } from '@expo/vector-icons'

import { useTheme } from '@/hooks/useTheme'

import type { Theme } from '@/theme/theme'
import type { ComponentProps } from 'react'

/**
 * Type for available icon names from Ionicons
 * @internal
 */
type IconName = keyof typeof Ionicons.glyphMap

/**
 * Props for the Icon component
 * Extends Ionicons props with custom theme integration
 */
export interface IconProps
  extends Omit<ComponentProps<typeof Ionicons>, 'name'> {
  /**
   * Name of the icon from Ionicons library
   * @see https://icons.expo.fyi
   */
  name: IconName

  /**
   * Size of the icon in pixels
   * @default 24
   */
  size?: number

  /**
   * Color of the icon
   * Can be a custom color or a theme color key
   * @default theme.colors.text
   */
  color?: string | keyof Theme['colors']
}

/**
 * Icon Component
 *
 * A themed wrapper around Expo's Ionicons component.
 * Automatically integrates with the app's theme system for consistent styling.
 *
 * @example
 * ```tsx
 * Basic usage
 * <Icon name="heart" />
 *
 * Custom size and color
 * <Icon name="star" size={32} color="primary" />
 *
 * With custom color
 * <Icon name="settings" color="#FF0000" />
 * ```
 */
export function Icon({
  name,
  size = 24,
  color,
  ...props
}: IconProps): JSX.Element {
  const { theme } = useTheme()

  /**
   * Resolves the color value from either a theme key or direct color value
   */
  const resolveColor = (colorProp?: string | keyof Theme['colors']): string => {
    if (!colorProp) return theme.colors.text
    return theme.colors[colorProp as keyof Theme['colors']] || colorProp
  }

  return (
    <Ionicons name={name} size={size} color={resolveColor(color)} {...props} />
  )
}
