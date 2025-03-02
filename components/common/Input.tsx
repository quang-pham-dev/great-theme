import { type ReactNode, useState } from 'react'
import {
  type NativeSyntheticEvent,
  type StyleProp,
  TextInput,
  type TextInputFocusEventData,
  type TextInputProps,
  View,
  type ViewStyle,
} from 'react-native'

import { useStyleUtils } from '@/hooks/useStyleUtils'
import { useTheme } from '@/hooks/useTheme'

import { ThemedText } from '../ThemedText'

import type { Theme } from '@/theme/theme'

/**
 * Available variants for the Input component
 */
type InputVariant = 'outlined' | 'filled'

/**
 * Props for the Input component
 * Extends React Native's TextInput props with additional functionality
 */
export interface InputProps
  extends Omit<TextInputProps, 'placeholderTextColor'> {
  /**
   * Label text to display above the input
   * @example "Email Address"
   */
  label?: string

  /**
   * Error message to display below the input
   * @example "Please enter a valid email"
   */
  error?: string

  /**
   * Helper text to display below the input
   * @example "We'll never share your email"
   */
  helperText?: string

  /**
   * Left icon component to display inside the input
   * @example <Icon name="mail" />
   */
  leftIcon?: ReactNode

  /**
   * Right icon component to display inside the input
   * @example <Icon name="eye" />
   */
  rightIcon?: ReactNode

  /**
   * If true, the input will be disabled
   * @default false
   */
  disabled?: boolean

  /**
   * The variant of the input
   * @default 'outlined'
   */
  variant?: InputVariant

  /**
   * Style for the input container
   */
  containerStyle?: StyleProp<ViewStyle>
}

/**
 * Input Component
 *
 * A themed text input component with support for labels, icons, and error states.
 *
 * @example
 * ```tsx
 * Basic usage
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 * />
 *
 * With validation
 * <Input
 *   label="Password"
 *   error="Password is required"
 *   secureTextEntry
 *   rightIcon={<Icon name="eye" />}
 * />
 *
 * Filled variant with helper text
 * <Input
 *   variant="filled"
 *   label="Username"
 *   helperText="Choose a unique username"
 *   leftIcon={<Icon name="user" />}
 * />
 * ```
 */
export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  disabled,
  variant = 'outlined',
  style,
  containerStyle,
  onFocus,
  onBlur,
  ...props
}: InputProps): JSX.Element {
  const { theme } = useTheme()
  const styleUtils = useStyleUtils()
  const [isFocused, setIsFocused] = useState(false)

  /**
   * Determines the background color based on component state
   */
  const getBackgroundColor = (): string => {
    if (disabled) return theme.colors.surfacePressed
    if (variant === 'filled') return theme.colors.surfaceHover
    return 'transparent'
  }

  /**
   * Determines the border color based on component state
   */
  const getBorderColor = (): string => {
    if (error) return theme.colors.error
    if (isFocused) return theme.colors.borderFocus
    return theme.colors.border
  }

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  /**
   * Hook for creating Input styles with theme integration
   * Uses the theme system to generate consistent styling
   */
  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    container: {
      width: '100%',
    },
    label: {
      marginBottom: theme.spacing.xs,
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.borderRadius.md,
      minHeight: 44,
      borderWidth: 1,
    },
    input: {
      flex: 1,
      fontSize: theme.typography.sizes.md,
      paddingVertical: theme.spacing.sm,
    },
    icon: {
      paddingHorizontal: theme.spacing.sm,
    },
    helperText: {
      marginTop: theme.spacing.xs,
      fontSize: theme.typography.sizes.xs,
    },
    disabled: {
      opacity: 0.6,
    },
  }))

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
            borderWidth: variant === 'outlined' ? 1 : 0,
          },
          disabled && styles.disabled,
        ]}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.text,
              paddingLeft: leftIcon ? 0 : theme.spacing.sm,
              paddingRight: rightIcon ? 0 : theme.spacing.sm,
            },
            style,
          ]}
          placeholderTextColor={theme.colors.textSecondary}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>
      {(error || helperText) && (
        <ThemedText
          style={[
            styles.helperText,
            { color: error ? theme.colors.error : theme.colors.textSecondary },
          ]}>
          {error || helperText}
        </ThemedText>
      )}
    </View>
  )
}
