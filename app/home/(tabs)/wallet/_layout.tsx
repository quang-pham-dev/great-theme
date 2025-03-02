import { Stack, useRouter } from 'expo-router'

import { BackButton } from '@/components/common/BackButton'
import { IconCircleButton } from '@/components/common/IconCircleButton'
import { useTheme } from '@/hooks/useTheme'

export default function WalletStackLayout() {
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
