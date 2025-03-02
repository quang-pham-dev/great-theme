import { type ReactNode, useCallback, useState } from 'react'
import {
  Modal,
  Pressable,
  ScrollView,
  type StyleProp,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native'

import { useTheme } from '@/hooks/useTheme'
import { createComponentStyles } from '@/theme/styles'

import { Icon } from '../common/Icon'
import { Typography } from '../common/Typography'

import type { Theme } from '@/theme/theme'

/**
 * Option type for Select items
 */
export interface SelectOption<T> {
  label: string
  value: T
  disabled?: boolean
  icon?: ReactNode
}

/**
 * Props for the Select component
 */
export interface SelectProps<T> extends ViewProps {
  /**
   * Array of select options
   */
  options: SelectOption<T>[]

  /**
   * Currently selected value
   */
  value: T | null

  /**
   * Callback when selection changes
   */
  onValueChange: (value: T) => void

  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string

  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Custom trigger component
   */
  triggerComponent?: ReactNode

  /**
   * Maximum height of the dropdown
   * @default 300
   */
  maxHeight?: number

  /**
   * Additional style for the container
   */
  containerStyle?: StyleProp<ViewStyle>
}

/**
 * Hook for creating select styles with theme integration
 */
const useStyles = createComponentStyles((theme: Theme) => ({
  container: {
    width: '100%',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
  },
  triggerText: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  modal: {
    margin: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  optionsList: {
    paddingVertical: theme.spacing.xs,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  optionIcon: {
    marginRight: theme.spacing.sm,
  },
  selectedOption: {
    backgroundColor: theme.colors.surfaceHover,
  },
  disabled: {
    opacity: 0.5,
  },
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
  },
}))

/**
 * Select Component
 *
 * A customizable select/dropdown component with theme integration.
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
 * <Select
 *   options={options}
 *   value={value}
 *   onValueChange={setValue}
 *   placeholder="Select an option"
 * />
 *
 * With icons
 * const optionsWithIcons = [
 *   {
 *     label: 'Settings',
 *     value: 'settings',
 *     icon: <Icon name="settings" />
 *   },
 * ];
 *
 * <Select
 *   options={optionsWithIcons}
 *   value={value}
 *   onValueChange={setValue}
 * />
 * ```
 */
export function Select<T>({
  options,
  value,
  onValueChange,
  placeholder = 'Select an option',
  disabled = false,
  triggerComponent,
  maxHeight = 300,
  style,
  containerStyle,
  ...props
}: SelectProps<T>): JSX.Element {
  const { theme } = useTheme()
  const styles = useStyles(theme)
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = options.find(option => option.value === value)

  const handleOpen = useCallback(() => {
    if (!disabled) {
      setIsOpen(true)
    }
  }, [disabled])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleSelect = useCallback(
    (optionValue: T) => {
      onValueChange(optionValue)
      handleClose()
    },
    [onValueChange, handleClose],
  )

  const renderTrigger = () => {
    if (triggerComponent) return triggerComponent

    return (
      <View style={[styles.trigger, disabled && styles.disabled]}>
        <Typography
          style={styles.triggerText}
          color={selectedOption ? 'text' : 'textSecondary'}
          numberOfLines={1}>
          {selectedOption?.label || placeholder}
        </Typography>
        <Icon
          name="chevron-down"
          size={20}
          color={theme.colors.textSecondary}
        />
      </View>
    )
  }

  return (
    <View style={[styles.container, containerStyle, style]} {...props}>
      <Pressable
        onPress={handleOpen}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen, disabled }}>
        {renderTrigger()}
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={handleClose}>
        <Pressable style={styles.overlay} onPress={handleClose}>
          <View style={styles.modal}>
            <ScrollView
              style={{ maxHeight }}
              contentContainerStyle={styles.optionsList}>
              {options.map((option, index) => (
                <Pressable
                  key={index.toString()}
                  style={[
                    styles.option,
                    value === option.value && styles.selectedOption,
                    option.disabled && styles.disabled,
                  ]}
                  onPress={() => handleSelect(option.value)}
                  disabled={option.disabled}
                  accessibilityRole="menuitem"
                  accessibilityState={{
                    selected: value === option.value,
                    disabled: option.disabled,
                  }}>
                  {option.icon && (
                    <View style={styles.optionIcon}>{option.icon}</View>
                  )}
                  <Typography>{option.label}</Typography>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}
