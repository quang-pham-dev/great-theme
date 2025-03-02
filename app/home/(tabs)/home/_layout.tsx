import { DrawerActions } from '@react-navigation/native'
import { Stack, useRouter } from 'expo-router'

import { IconCircleButton } from '@/components/common/IconCircleButton'
import { useTheme } from '@/hooks/useTheme'

export default function HomeTabStackLayout() {
  const router = useRouter()
  const { theme } = useTheme()

  return (
    <Stack
      screenOptions={{
        headerBackTitle: '',
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitle: '',
        headerShadowVisible: false,
        headerShown: true,
      }}>
      <Stack.Screen
        name="index"
        options={({ navigation }) => {
          const handlePressOpenDrawer = () => {
            navigation.dispatch(DrawerActions.openDrawer())
          }

          return {
            headerShadowVisible: false,
            headerLeft: () => {
              return (
                <IconCircleButton
                  name="menu-outline"
                  onPress={handlePressOpenDrawer}
                />
              )
            },
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerRight: () => {
              const handlePressBagIcon = () => {
                router.navigate('/home/(tabs)/bag')
              }
              return (
                <IconCircleButton
                  name="bag-outline"
                  onPress={handlePressBagIcon}
                />
              )
            },
          }
        }}
      />
    </Stack>
  )
}
