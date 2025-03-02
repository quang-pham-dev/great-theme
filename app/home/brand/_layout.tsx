import { Stack, useRouter } from 'expo-router'

import { BackButton } from '@/components/common/BackButton'
import { IconCircleButton } from '@/components/common/IconCircleButton'
import { HeaderBrandLogo } from '@/components/home/HeaderBrandLogo'
import { useTheme } from '@/hooks/useTheme'

export default function BrandStackLayout() {
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
        name="[id]"
        options={({ navigation, route }) => {
          const params = route.params as { logoUrl: string }
          const brandLogo = params?.logoUrl

          return {
            headerShadowVisible: false,
            headerLeft: () => {
              return navigation.canGoBack() && <BackButton />
            },
            headerBackVisible: false,
            headerTitle: () => <HeaderBrandLogo url={brandLogo} />,
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
