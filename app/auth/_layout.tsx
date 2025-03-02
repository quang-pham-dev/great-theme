import { Stack } from 'expo-router'

import { BackButton } from '@/components/common/BackButton'
import { useTheme } from '@/hooks/useTheme'

export default function AuthLayout() {
  const { theme } = useTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white',
        },
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
      }}>
      <Stack.Screen
        name="lets-get-started"
        options={() => {
          return {
            headerShown: true,
            headerBackVisible: false,
          }
        }}
      />
      <Stack.Screen
        name="login"
        options={({ navigation }) => {
          return {
            headerShown: true,
            headerLeft: () => {
              return navigation.canGoBack() && <BackButton />
            },
            headerBackVisible: false,
          }
        }}
      />
    </Stack>
  )
}
