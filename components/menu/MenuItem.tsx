import { Pressable, type PressableProps } from 'react-native'

import { Typography } from '@/components/common/Typography'
import { useStyleUtils } from '@/hooks/useStyleUtils'
import { useTheme } from '@/hooks/useTheme'

import { Icon } from '../common/Icon'

import type { Theme } from '@/theme/theme'
import type { Ionicons } from '@expo/vector-icons'
import type React from 'react'

interface MenuItemProps extends Pick<PressableProps, 'onPress'> {
  /**
   * Icon name from MaterialIcons
   */
  icon: keyof typeof Ionicons.glyphMap
  /**
   * Label text for the menu item
   */
  label: string
  /**
   * Whether this is a logout item (affects styling)
   */
  isLogout?: boolean
  /**
   * Whether the item is active/selected
   */
  isActive?: boolean
  /**
   * Optional custom icon color
   */
  iconColor?: string
  /**
   * Optional custom text color
   */
  textColor?: string
}

export function MenuItem({
  icon,
  label,
  isLogout,
  isActive,
  iconColor,
  textColor,
  onPress,
}: MenuItemProps) {
  const { theme } = useTheme()
  const styleUtils = useStyleUtils()

  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.sm,
      gap: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      backgroundColor: isActive ? theme.colors.primaryLight : 'transparent',
    },
    icon: {
      color:
        iconColor ||
        (isLogout
          ? theme.colors.error
          : isActive
            ? theme.colors.primary
            : theme.colors.text),
    },
    text: {
      color:
        textColor ||
        (isLogout
          ? theme.colors.error
          : isActive
            ? theme.colors.primary
            : theme.colors.text),
    },
  }))

  return (
    <Pressable
      style={({ pressed }) => [styles.menuItem, { opacity: pressed ? 0.7 : 1 }]}
      onPress={onPress}
      android_ripple={{
        color: theme.colors.primaryLight,
      }}>
      <Icon name={icon} size={24} style={styles.icon} />
      <Typography
        variant="body1"
        style={styles.text}
        weight={isActive ? 'semibold' : 'regular'}>
        {label}
      </Typography>
    </Pressable>
  )
}
