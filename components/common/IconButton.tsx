import { Pressable, type PressableProps } from 'react-native'

import { Box } from '@/components/common/Box'
import { LoadingIndicator } from '@/components/common/LoadingIndicator'
import { useTheme } from '@/hooks/useTheme'

import { Icon } from './Icon'

import type { Theme } from '@/theme/theme'
import type { Ionicons } from '@expo/vector-icons'

type IconSize = 'small' | 'medium' | 'large'
type IconVariant = 'primary' | 'secondary' | 'surface' | 'error' | 'transparent'

const ICON_SIZES: Record<IconSize, number> = {
  small: 16,
  medium: 24,
  large: 32,
}

const BUTTON_SIZES: Record<IconSize, number> = {
  small: 32,
  medium: 40,
  large: 48,
}

interface IconButtonProps extends Omit<PressableProps, 'style'> {
  /**
   * Icon name from Ionicons
   */
  name: React.ComponentProps<typeof Ionicons>['name']

  /**
   * Size variant of the button
   * @default 'medium'
   */
  size?: IconSize

  /**
   * Visual variant of the button
   * @default 'surface'
   */
  variant?: IconVariant

  /**
   * Custom color for the icon
   * Overrides the color from variant
   */
  iconColor?: string

  /**
   * Custom background color
   * Overrides the background from variant
   */
  backgroundColor?: string

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Whether to show loading state
   * @default false
   */
  loading?: boolean

  /**
   * Custom size for the icon
   * Overrides the size from size prop
   */
  customIconSize?: number

  /**
   * Whether to show the ripple effect on Android
   * @default true
   */
  enableRipple?: boolean
  /**
   * Border radius from theme
   * @default 'pill'
   */
  borderRadius?: keyof Theme['borderRadius']
}

export function IconButton({
  name,
  size = 'medium',
  variant = 'surface',
  iconColor,
  backgroundColor,
  disabled = false,
  loading = false,
  customIconSize,
  enableRipple = true,
  borderRadius = 'pill',
  onPress,
  ...pressableProps
}: IconButtonProps): JSX.Element {
  const { theme } = useTheme()

  const getVariantStyles = (variant: IconVariant) => {
    const styles = {
      primary: {
        background: 'primary' as keyof Theme['colors'],
        icon: 'surface' as keyof Theme['colors'],
      },
      secondary: {
        background: 'secondary' as keyof Theme['colors'],
        icon: 'surface' as keyof Theme['colors'],
      },
      surface: {
        background: 'surface' as keyof Theme['colors'],
        icon: 'text' as keyof Theme['colors'],
      },
      error: {
        background: 'error' as keyof Theme['colors'],
        icon: 'surface' as keyof Theme['colors'],
      },
      transparent: {
        background: 'transparent' as keyof Theme['colors'],
        icon: 'text' as keyof Theme['colors'],
      },
    } satisfies Record<
      IconVariant,
      {
        background: keyof Theme['colors']
        icon: keyof Theme['colors']
      }
    >

    return {
      backgroundColor:
        backgroundColor || theme.colors[styles[variant].background],
      iconColor: iconColor || theme.colors[styles[variant].icon],
    }
  }

  const { backgroundColor: bg, iconColor: color } = getVariantStyles(variant)
  const buttonSize = BUTTON_SIZES[size]
  const iconSize = customIconSize || ICON_SIZES[size]

  return (
    <Box
      width={buttonSize}
      height={buttonSize}
      borderRadius={borderRadius}
      bg={backgroundColor ? undefined : (variant as keyof Theme['colors'])}
      style={backgroundColor ? { backgroundColor: bg } : undefined}
      opacity={disabled ? 0.5 : 1}
      center
      android_ripple={
        enableRipple
          ? {
              color: theme.colors.primary,
              borderless: true,
              radius: buttonSize / 2,
            }
          : null
      }
      {...pressableProps}>
      <Pressable onPress={onPress}>
        {loading ? (
          <LoadingIndicator variant="primary" size={iconSize * 0.75} />
        ) : (
          <Icon name={name} size={iconSize} color={color} />
        )}
      </Pressable>
    </Box>
  )
}
