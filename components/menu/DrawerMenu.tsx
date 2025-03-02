import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import { usePathname, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Box } from '@/components/common/Box'
import { IconCircleButton } from '@/components/common/IconCircleButton'
import { Switch } from '@/components/common/Switch'
import { useAuth } from '@/contexts/AuthContext'
import { useStyleUtils } from '@/hooks/useStyleUtils'
import { useTheme } from '@/hooks/useTheme'
import { isIOS } from '@/utils/platform'

import { MenuItem } from './MenuItem'
import { UserProfile } from './UserProfile'

import type { Ionicons } from '@expo/vector-icons'
import type React from 'react'

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  onPress?: () => void
  isLogout?: boolean
  path?: string
}

type DrawerMenuProps = DrawerContentComponentProps

export function DrawerMenu(props: DrawerMenuProps) {
  const insets = useSafeAreaInsets()
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme, isDark } = useTheme()
  const { user, logout } = useAuth()
  const styleUtils = useStyleUtils()

  const mainMenuItems: MenuItemProps[] = [
    {
      icon: 'sunny-outline',
      label: 'Dark Mode',
      onPress: toggleTheme,
      path: 'dark-mode',
    },
    {
      icon: 'information-circle-outline',
      label: 'Account Information',
      path: '/account',
      onPress: () => {},
    },
    {
      icon: 'lock-closed-outline',
      label: 'Password',
      path: '/password',
      onPress: () => {},
    },
    {
      icon: 'bag-outline',
      label: 'Order',
      path: '/bag',
      onPress: () => {
        router.push('/home/(tabs)/bag')
      },
    },
    {
      icon: 'heart-outline',
      label: 'Wishlist',
      path: '/favorite',
      onPress: () => {
        router.push('/home/(tabs)/favorite')
      },
    },
    {
      icon: 'card-outline',
      label: 'My Cards',
      path: '/wallet',
      onPress: () => {
        router.push('/home/(tabs)/wallet')
      },
    },
    {
      icon: 'settings-outline',
      label: 'Settings',
      path: '/settings',
      onPress: () => {},
    },
  ] as const

  const logoutItem: MenuItemProps = {
    icon: 'log-out-outline',
    label: 'Logout',
    isLogout: true,
    onPress: logout,
  } as const

  const notification: MenuItemProps = {
    icon: 'notifications-outline',
    label: 'Notification',
    onPress: () => router.push('/home/notification-test'),
  } as const

  const styles = styleUtils.createThemedStyle(() => ({
    container: {
      flex: 1,
      paddingTop: isIOS ? insets.top : insets.top + 6,
    },
    darkModeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }))

  const isActiveRoute = (path: string) => {
    if (!path) return false
    // Remove the leading slash for consistency
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path
    return pathname.includes(normalizedPath)
  }
  const renderMenuItem = (item: MenuItemProps, index: number) => {
    const isActive = item.path ? isActiveRoute(item.path) : false
    if (item.label === 'Dark Mode') {
      return (
        <Box key={index} style={styles.darkModeContainer}>
          <MenuItem {...item} isActive={isActive} />
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            inactiveColor={theme.colors.border}
            activeColor={theme.colors.primary}
            thumbColor={theme.colors.background}
          />
        </Box>
      )
    }

    return <MenuItem key={index} {...item} isActive={isActive} />
  }

  const HandlePressOpenDrawer = () => {
    if (props.navigation) {
      props.navigation.closeDrawer()
    }
  }

  return (
    <DrawerContentScrollView
      scrollEnabled={false}
      contentContainerStyle={styles.container}
      {...props}>
      <Box flex={1} px="sm">
        <Box flex={2} gap="xs">
          <Box gap="xl">
            <IconCircleButton
              name="menu-outline"
              rotate={90}
              onPress={HandlePressOpenDrawer}
            />

            <UserProfile
              name={user?.name || 'Guest'}
              ordersCount={user?.ordersCount || 0}
              imageUrl={user?.avatarUrl}
              isVerified={user?.isVerified}
              onPress={() => {}}
            />
          </Box>

          {mainMenuItems.map(renderMenuItem)}
          <MenuItem {...notification} />
        </Box>

        <Box flex={1}>
          <MenuItem {...logoutItem} />
        </Box>
      </Box>
    </DrawerContentScrollView>
  )
}
