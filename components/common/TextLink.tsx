import { type Href, Link } from 'expo-router'
import { memo } from 'react'
import { Pressable, type PressableProps } from 'react-native'

import { useStyleUtils } from '@/hooks/useStyleUtils'

import { Typography, type TypographyProps } from './Typography'

import type { Theme } from '@/theme/theme'

interface TextLinkProps extends Omit<PressableProps, 'style'> {
  /**
   * The text content to be displayed
   */
  children: string
  /**
   * Optional color from theme
   * @default 'primary'
   */
  color?: keyof Theme['colors']
  /**
   * Optional variant for text styling
   * @default 'body2'
   */
  variant?: TypographyProps['variant']
  /**
   * Optional font weight
   * @default 'medium'
   */
  weight?: TypographyProps['weight']
  /**
   * Whether to underline the text
   * @default false
   */
  underline?: boolean
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean
  /**
   * Custom typography props
   */
  textProps?: Omit<TypographyProps, 'variant' | 'color' | 'weight'>
  /**
   * Optional href for navigation
   * If provided, will use Link component
   */
  href?: Href
}

export const TextLink = memo(
  ({
    onPress,
    children,
    href,
    color = 'primary',
    variant = 'body2',
    weight = 'medium',
    underline = false,
    disabled = false,
    textProps,
    ...pressableProps
  }: TextLinkProps) => {
    const styleUtils = useStyleUtils()

    const styles = styleUtils.createThemedStyle(() => ({
      text: {
        textDecorationLine: underline ? 'underline' : 'none',
        opacity: disabled ? 0.5 : 1,
      },
    }))

    if (href) {
      return (
        <Link href={href} asChild>
          <Pressable>
            <Typography
              variant={variant}
              color={color}
              weight={weight}
              style={styles.text}>
              {children}
            </Typography>
          </Pressable>
        </Link>
      )
    }

    return (
      <Pressable
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        accessibilityRole="link"
        accessibilityState={{ disabled }}
        {...pressableProps}>
        {({ pressed }) => (
          <Typography
            variant={variant}
            color={color}
            weight={weight}
            style={[styles.text, pressed && { opacity: 0.7 }]}
            {...textProps}>
            {children}
          </Typography>
        )}
      </Pressable>
    )
  },
)

TextLink.displayName = 'TextLink'
