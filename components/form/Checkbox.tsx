import { useCallback, useEffect, useRef } from 'react'
import {
  Animated,
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import { useTheme } from '@/hooks/useTheme'
import { createComponentStyles } from '@/theme/styles'

import { Icon } from '../common/Icon'

import type { Theme } from '@/theme/theme'

/**
 * Available sizes for the Checkbox
 */
type CheckboxSize = 'small' | 'medium' | 'large'

/**
 * Size configurations for different checkbox variants
 */
const CHECKBOX_SIZES: Record<CheckboxSize, number> = {
  small: 18,
  medium: 24,
  large: 32,
}

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps extends Omit<PressableProps, 'onPress'> {
  /**
   * Whether the checkbox is checked
   */
  checked: boolean

  /**
   * Callback when the checkbox state changes
   */
  onCheckedChange: (checked: boolean) => void

  /**
   * Size variant of the checkbox
   * @default 'medium'
   */
  size?: CheckboxSize

  /**
   * Whether the checkbox is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Color when the checkbox is checked
   * Uses theme.colors.primary by default
   */
  activeColor?: string

  /**
   * Additional style for the container
   */
  containerStyle?: StyleProp<ViewStyle>
}

/**
 * Hook for creating checkbox styles with theme integration
 */
const useStyles = createComponentStyles((theme: Theme) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: theme.borderRadius.sm,
  },
  disabled: {
    opacity: 0.5,
  },
}))

/**
 * Checkbox Component
 *
 * A customizable checkbox component with smooth animations and theme integration.
 *
 * @example
 * ```tsx
 * Basic usage
 * const [checked, setChecked] = useState(false);
 * <Checkbox checked={checked} onCheckedChange={setChecked} />
 *
 * Custom size and color
 * <Checkbox
 *   checked={checked}
 *   onCheckedChange={setChecked}
 *   size="large"
 *   activeColor="success"
 * />
 *
 * Disabled state
 * <Checkbox
 *   checked={true}
 *   onCheckedChange={() => {}}
 *   disabled
 * />
 * ```
 */
export function Checkbox({
  checked,
  onCheckedChange,
  size = 'medium',
  disabled = false,
  activeColor,
  style,
  containerStyle,
  ...props
}: CheckboxProps): JSX.Element {
  const { theme } = useTheme()
  const styles = useStyles(theme)

  // Animation value for scaling
  const scale = useRef(new Animated.Value(checked ? 1 : 0)).current

  // Get dimensions based on size
  const boxSize = CHECKBOX_SIZES[size]

  // Theme-aware colors
  const resolvedActiveColor = activeColor || theme.colors.primary

  useEffect(() => {
    Animated.spring(scale, {
      toValue: checked ? 1 : 0,
      useNativeDriver: true,
      bounciness: 4,
    }).start()
  }, [checked, scale])

  const handlePress = useCallback(() => {
    if (!disabled) {
      onCheckedChange(!checked)
    }
  }, [checked, disabled, onCheckedChange])

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={containerStyle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      {...props}>
      <Animated.View
        style={[
          styles.container,
          {
            width: boxSize,
            height: boxSize,
            borderColor: checked ? resolvedActiveColor : theme.colors.border,
            backgroundColor: checked
              ? resolvedActiveColor
              : theme.colors.transparent,
          },
          disabled && styles.disabled,
          style as ViewStyle,
        ]}>
        <Animated.View
          style={{
            transform: [{ scale }],
          }}>
          {checked && (
            <Icon
              name="checkmark"
              size={boxSize * 0.7}
              color={theme.colors.surface}
            />
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
  )
}
