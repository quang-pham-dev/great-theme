import { useMemo } from 'react'
import {
  Image,
  type ImageSourcePropType,
  type StyleProp,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native'

import { useTheme } from '@/hooks/useTheme'
import { createComponentStyles } from '@/theme/styles'

import { Typography } from '../common/Typography'

import type { Theme } from '@/theme/theme'

/**
 * Available sizes for Avatar
 */
type AvatarSize = 'tiny' | 'small' | 'medium' | 'large' | 'xlarge'

/**
 * Size configurations for different avatar variants
 */
const AVATAR_SIZES: Record<AvatarSize, number> = {
  tiny: 24,
  small: 32,
  medium: 40,
  large: 48,
  xlarge: 56,
}

/**
 * Props for the Avatar component
 */
export interface AvatarProps extends ViewProps {
  /**
   * Image source for the avatar
   */
  source?: ImageSourcePropType

  /**
   * Text to display when image fails or isn't provided
   */
  fallbackText?: string

  /**
   * Size variant of the avatar
   * @default 'medium'
   */
  size?: AvatarSize

  /**
   * Custom size in pixels (overrides size prop)
   */
  customSize?: number

  /**
   * Shape of the avatar
   * @default 'circle'
   */
  shape?: 'circle' | 'square'

  /**
   * Background color from theme
   */
  backgroundColor?: keyof Theme['colors']

  /**
   * Additional style for the container
   */
  containerStyle?: StyleProp<ViewStyle>
}

/**
 * Hook for creating avatar styles with theme integration
 */
const useStyles = createComponentStyles((theme: Theme) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

/**
 * Get initials from text
 */
const getInitials = (text?: string): string => {
  if (!text) return ''
  return text
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Avatar Component
 *
 * A versatile avatar component that displays user images with fallback support.
 *
 * @example
 * ```tsx
 * Basic usage with image
 * <Avatar source={{ uri: 'https://example.com/avatar.jpg' }} />
 *
 * With fallback text
 * <Avatar fallbackText="John Doe" size="large" />
 *
 * // Custom styling
 * <Avatar
 *   source={require('./avatar.png')}
 *   size="xlarge"
 *   shape="square"
 *   backgroundColor="primary"
 * />
 * ```
 */
export function Avatar({
  source,
  fallbackText,
  size = 'medium',
  customSize,
  shape = 'circle',
  backgroundColor,
  style,
  containerStyle,
  ...props
}: AvatarProps): JSX.Element {
  const { theme } = useTheme()
  const styles = useStyles(theme)

  const dimensions = useMemo(() => {
    const sizeValue = customSize || AVATAR_SIZES[size]
    return {
      width: sizeValue,
      height: sizeValue,
      borderRadius: shape === 'circle' ? sizeValue / 2 : theme.borderRadius.md,
    }
  }, [size, customSize, shape, theme.borderRadius.md])

  const getFallbackFontSize = (): number => {
    const baseSize = customSize || AVATAR_SIZES[size]
    return Math.floor(baseSize * 0.4)
  }

  return (
    <View
      style={[
        styles.container,
        dimensions,
        backgroundColor && { backgroundColor: theme.colors[backgroundColor] },
        containerStyle,
        style,
      ]}
      {...props}>
      {source ? (
        <Image source={source} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.fallback, dimensions]}>
          <Typography
            style={{ fontSize: getFallbackFontSize() }}
            color="textSecondary">
            {getInitials(fallbackText)}
          </Typography>
        </View>
      )}
    </View>
  )
}

/**
 * Convenience components for common avatar sizes
 */
export const TinyAvatar = (props: Omit<AvatarProps, 'size'>) => (
  <Avatar size="tiny" {...props} />
)

export const SmallAvatar = (props: Omit<AvatarProps, 'size'>) => (
  <Avatar size="small" {...props} />
)

export const MediumAvatar = (props: Omit<AvatarProps, 'size'>) => (
  <Avatar size="medium" {...props} />
)

export const LargeAvatar = (props: Omit<AvatarProps, 'size'>) => (
  <Avatar size="large" {...props} />
)

export const XLargeAvatar = (props: Omit<AvatarProps, 'size'>) => (
  <Avatar size="xlarge" {...props} />
)
