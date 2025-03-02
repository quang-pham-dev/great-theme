import { useCallback, useEffect, useRef } from 'react'
import {
  Animated,
  Pressable,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import { useStyleUtils } from '@/hooks/useStyleUtils'
import { useTheme } from '@/hooks/useTheme'

import type { Theme } from '@/theme/theme'

/**
 * Available sizes for the Switch component
 */
type SwitchSize = 'small' | 'medium' | 'large'

/**
 * Size configurations for different switch variants
 */
const SWITCH_SIZES: Record<
  SwitchSize,
  { width: number; height: number; thumbSize: number }
> = {
  small: { width: 36, height: 20, thumbSize: 16 },
  medium: { width: 44, height: 24, thumbSize: 20 },
  large: { width: 56, height: 32, thumbSize: 28 },
}

/**
 * Type definition for switch style array
 * Combines ViewStyle and StyleProp for flexible style application
 * @typedef {ViewStyle | StyleProp<ViewStyle>} SwitchStyle
 */
type SwitchStyle = ViewStyle | StyleProp<ViewStyle>

/**
 * Props for the Switch component
 */
export interface SwitchProps extends Omit<PressableProps, 'onPress'> {
  /**
   * Current value of the switch
   */
  value: boolean

  /**
   * Callback when the switch value changes
   */
  onValueChange: (value: boolean) => void

  /**
   * Size variant of the switch
   * @default 'medium'
   */
  size?: SwitchSize

  /**
   * Whether the switch is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Color when the switch is active (on)
   * Uses theme.colors.primary by default
   */
  activeColor?: string

  /**
   * Color when the switch is inactive (off)
   * Uses theme.colors.border by default
   */
  inactiveColor?: string

  /**
   * Color of the thumb (knob)
   * Uses theme.colors.surface by default
   */
  thumbColor?: string

  /**
   * Additional style for the container
   */
  containerStyle?: StyleProp<ViewStyle>
}

/**
 * Switch Component
 *
 * A customizable switch component with smooth animations and theme integration.
 *
 * @example
 * ```tsx
 * Basic usage
 * <Switch value={isEnabled} onValueChange={setIsEnabled} />
 *
 * Custom size and colors
 * <Switch
 *   value={isEnabled}
 *   onValueChange={setIsEnabled}
 *   size="large"
 *   activeColor="primary"
 * />
 *
 * Disabled state
 * <Switch
 *   value={true}
 *   onValueChange={() => {}}
 *   disabled
 * />
 * ```
 */
export function Switch({
  value,
  onValueChange,
  size = 'medium',
  disabled = false,
  activeColor,
  inactiveColor,
  thumbColor,
  style,
  containerStyle,
  ...props
}: SwitchProps): JSX.Element {
  const { theme } = useTheme()
  const styleUtils = useStyleUtils()

  // Animation values
  const translateX = useRef(new Animated.Value(value ? 1 : 0)).current
  const backgroundColor = useRef(new Animated.Value(value ? 1 : 0)).current

  // Get dimensions based on size
  const dimensions = SWITCH_SIZES[size]
  const { width, height, thumbSize } = dimensions
  const trackPadding = (height - thumbSize) / 2
  const translateXValue = width - thumbSize - trackPadding * 2

  // Theme-aware colors
  const resolvedActiveColor = activeColor || theme.colors.primary
  const resolvedInactiveColor = inactiveColor || theme.colors.border
  const resolvedThumbColor = thumbColor || theme.colors.surface

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.spring(translateX, {
        toValue: value ? 1 : 0,
        useNativeDriver: true,
        bounciness: 0,
      }),
      Animated.timing(backgroundColor, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ])

    animation.start()

    return () => {
      animation.stop()
      translateX.setValue(value ? 1 : 0)
      backgroundColor.setValue(value ? 1 : 0)
    }
  }, [value]) // Only depend on value changes

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [resolvedInactiveColor, resolvedActiveColor],
  })

  const interpolatedTranslateX = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [trackPadding, translateXValue],
  })

  const handlePress = useCallback(() => {
    if (!disabled) {
      onValueChange(!value)
    }
  }, [disabled, value, onValueChange])

  const getSwitchStyle = ({
    pressed,
  }: PressableStateCallbackType): SwitchStyle[] =>
    [
      containerStyle,
      { opacity: disabled ? 0.5 : pressed ? 0.8 : 1 },
      style as ViewStyle,
    ].filter(Boolean)

  /**
   * Hook for creating Switch styles with theme integration
   * Uses the theme system to generate consistent styling
   */
  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    track: {
      justifyContent: 'center',
    },
    thumb: {
      position: 'absolute',
      // boxShadow: 'none',
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  }))

  return (
    <Pressable
      hitSlop={{
        top: 8,
        bottom: 8,
        left: 8,
        right: 8,
      }}
      onPress={handlePress}
      disabled={disabled}
      style={getSwitchStyle}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      {...props}>
      <Animated.View
        style={[
          styles.track,
          {
            width,
            height,
            borderRadius: height / 2,
            backgroundColor: interpolatedBackgroundColor,
          },
          style as ViewStyle,
        ]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: resolvedThumbColor,
              transform: [{ translateX: interpolatedTranslateX }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  )
}
