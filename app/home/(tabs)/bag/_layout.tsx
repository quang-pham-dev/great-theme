import { Stack } from 'expo-router'

import { BackButton } from '@/components/common/BackButton'
import { useTheme } from '@/hooks/useTheme'

export default function BagStackLayout() {
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
          return {
            headerShadowVisible: false,
            headerLeft: () => {
              return navigation.canGoBack() && <BackButton />
            },
            headerBackVisible: false,
            headerTitleAlign: 'center',
          }
        }}
      />
    </Stack>
  )
}
