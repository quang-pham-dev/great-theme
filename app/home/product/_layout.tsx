import { Stack } from 'expo-router'

import { useTheme } from '@/hooks/useTheme'
export default function ProductStackLayout() {
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
        headerShown: false,
      }}>
      <Stack.Screen
        name="[id]"
        options={() => {
          return {
            headerShown: false,
          }
        }}
      />
    </Stack>
  )
}
