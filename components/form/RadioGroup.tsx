import { useCallback } from 'react'
import {
  Pressable,
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
 * Available sizes for Radio buttons
 */
type RadioSize = 'small' | 'medium' | 'large'

/**
 * Size configurations for different radio variants
 */
const RADIO_SIZES: Record<RadioSize, { outer: number; inner: number }> = {
  small: { outer: 16, inner: 8 },
  medium: { outer: 20, inner: 10 },
  large: { outer: 24, inner: 12 },
}

/**
 * Props for individual Radio option
 */
export interface RadioOption<T> {
  label: string
  value: T
  disabled?: boolean
}

/**
 * Props for the RadioGroup component
 */
export interface RadioGroupProps<T> extends ViewProps {
  /**
   * Array of radio options
   */
  options: RadioOption<T>[]

  /**
   * Currently selected value
   */
  value: T | null

  /**
   * Callback when selection changes
   */
  onValueChange: (value: T) => void

  /**
   * Size variant of the radio buttons
   * @default 'medium'
   */
  size?: RadioSize

  /**
   * Layout direction of the radio group
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal'

  /**
   * Whether the entire group is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Color when radio is selected
   * Uses theme.colors.primary by default
   */
  activeColor?: string

  /**
   * Additional style for the container
   */
  containerStyle?: StyleProp<ViewStyle>
}

/**
 * Hook for creating radio styles with theme integration
 */
const useStyles = createComponentStyles((theme: Theme) => ({
  container: {
    width: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  vertical: {
    flexDirection: 'column',
    gap: theme.spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 999,
  },
  innerCircle: {
    borderRadius: 999,
  },
  label: {
    marginLeft: theme.spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
}))

/**
 * RadioGroup Component
 *
 * A customizable radio group component with smooth animations and theme integration.
 *
 * @example
 * ```tsx
 * Basic usage
 * const options = [
 *   { label: 'Option 1', value: '1' },
 *   { label: 'Option 2', value: '2' },
 * ];
 *
 * const [value, setValue] = useState(null);
 *
 * <RadioGroup
 *   options={options}
 *   value={value}
 *   onValueChange={setValue}
 * />
 *
 * Horizontal layout with custom size
 * <RadioGroup
 *   options={options}
 *   value={value}
 *   onValueChange={setValue}
 *   direction="horizontal"
 *   size="large"
 * />
 * ```
 */
export function RadioGroup<T>({
  options,
  value,
  size = 'medium',
  direction = 'vertical',
  disabled = false,
  activeColor,
  style,
  containerStyle,
  onValueChange,
  ...props
}: RadioGroupProps<T>): JSX.Element {
  const { theme } = useTheme()
  const styles = useStyles(theme)

  const { outer: outerSize, inner: innerSize } = RADIO_SIZES[size]
  const resolvedActiveColor = activeColor || theme.colors.primary

  const handlePress = useCallback(
    (optionValue: T) => {
      if (!disabled) {
        onValueChange(optionValue)
      }
    },
    [disabled, onValueChange],
  )

  return (
    <View
      style={[
        styles.container,
        styles[direction],
        disabled && styles.disabled,
        containerStyle,
        style,
      ]}
      {...props}>
      {options.map((option, index) => {
        const isSelected = value === option.value
        const isDisabled = disabled || option.disabled

        return (
          <Pressable
            key={index.toString()}
            onPress={() => handlePress(option.value)}
            disabled={isDisabled}
            style={styles.option}
            accessibilityRole="radio"
            accessibilityState={{
              checked: isSelected,
              disabled: isDisabled,
            }}>
            <View
              style={[
                styles.radio,
                {
                  width: outerSize,
                  height: outerSize,
                  borderColor: isSelected
                    ? resolvedActiveColor
                    : theme.colors.border,
                },
              ]}>
              {isSelected && (
                <View
                  style={[
                    styles.innerCircle,
                    {
                      width: innerSize,
                      height: innerSize,
                      backgroundColor: resolvedActiveColor,
                    },
                  ]}
                />
              )}
            </View>
            <Typography
              variant="body2"
              style={[
                styles.label,
                isDisabled && { color: theme.colors.textSecondary },
              ]}>
              {option.label}
            </Typography>
          </Pressable>
        )
      })}
    </View>
  )
}
