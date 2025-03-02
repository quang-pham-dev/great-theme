import { useRouter } from 'expo-router'

import { IconCircleButton } from '@/components/common/IconCircleButton'
import { useTheme } from '@/hooks/useTheme'

import { Icon } from './Icon'

import type { PressableProps } from 'react-native'

/**
 * Props for the BackButton component
 * @interface BackButtonProps
 * @extends {Omit<PressableProps, 'onPress'>}
 */
export interface BackButtonProps extends Omit<PressableProps, 'onPress'> {
  /**
   * Optional callback to be called when the button is pressed
   * If not provided, defaults to router.back()
   */
  onPress?: () => void
  /**
   * Icon size for the chevron
   * @default 20
   */
  iconSize?: number
}

/**
 * BackButton Component
 *
 * A themed back button that integrates with expo-router for navigation.
 * Can be customized with a custom onPress handler and size options.
 *
 * @example
 * ```tsx
 * Basic usage
 * <BackButton />
 *
 * Custom size and handler
 * <BackButton size={48} iconSize={24} onPress={() => console.log('Custom back')} />
 * ```
 */
export function BackButton({ onPress, iconSize = 20 }: BackButtonProps) {
  const router = useRouter()
  const { theme } = useTheme()

  const handlePress = () => {
    if (onPress) {
      onPress()
    } else {
      router.back()
    }
  }

  return (
    <IconCircleButton onPress={handlePress}>
      <Icon name="chevron-back" size={iconSize} color={theme.colors.text} />
    </IconCircleButton>
  )
}
