import { Drawer } from 'expo-router/drawer'

import { DrawerMenu } from '@/components/menu/DrawerMenu'
import { useTheme } from '@/hooks/useTheme'

export default function HomeStackLayout() {
  const { theme } = useTheme()

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
      drawerContent={props => <DrawerMenu {...props} />}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Product',
          title: 'Home',
        }}
      />

      <Drawer.Screen
        name="product"
        options={{
          drawerLabel: 'Product',
          title: 'Product',
        }}
      />

      <Drawer.Screen
        name="brand"
        options={{
          drawerLabel: 'Brand',
          title: 'Brand',
        }}
      />
      <Drawer.Screen
        name="notification-test"
        options={{
          drawerLabel: 'Notification Test',
          title: 'Notification',
        }}
      />
    </Drawer>
  )
}
