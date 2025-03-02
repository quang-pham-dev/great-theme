import { PortalProvider } from '@gorhom/portal'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as Linking from 'expo-linking'
import * as Notifications from 'expo-notifications'
import { Redirect, Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { type ComponentType, Suspense, useCallback, useEffect } from 'react'
import 'react-native-reanimated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'

import { LoadingIndicator } from '@/components/common/LoadingIndicator'
import { ComposeProviders } from '@/components/ComposeProviders'
import { ReactQueryProvider } from '@/components/ReactQueryProvider'
import { ThemedText } from '@/components/ThemedText'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { NotificationProvider } from '@/contexts/NotificationContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ThemeStylesProvider from '@/contexts/ThemeStylesContext'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useTheme } from '@/hooks/useTheme'

const prefix = Linking.createURL('/')
const getInitialURL = async () => {
  const url = await Linking.getInitialURL()

  if (url !== null) {
    return parseSupabaseUrl(url)
  }

  return url
}

const parseSupabaseUrl = (url: string) => {
  const parsedUrl = new URL(url)
  const pathname = parsedUrl.pathname
  const pathSegments = pathname.split('/')
  const id = pathSegments[pathSegments.length - 1]
  return id
}
export const unstable_settings = {
  initialRouteName: 'auth',
}

export const linking = {
  prefixes: [prefix, 'judi://', 'https://quangpham.dev', 'exp://'],
  config: {
    screens: {
      auth: {
        path: 'auth',
        screens: {
          login: 'login',
          'lets-get-started': 'lets-get-started',
        },
      },
      home: {
        path: 'home',
        screens: {
          '(tabs)': {
            screens: {
              home: 'home',
              bag: 'bag',
              favorite: 'favorite',
              wallet: 'wallet',
            },
          },
          'brand/[id]': 'brand/:id',
          'product/[id]': 'product/:id',
        },
      },
    },
  },
  getInitialURL,
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const fill = {
  flex: 1,
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export default function RootLayout() {
  const handleDeepLink = useCallback((event: { url: string }) => {
    // Handle the deep link here
    console.log('Deep link received:', Linking.parse(event.url))
  }, [])

  useEffect(() => {
    const subscription = Linking.addEventListener('url', handleDeepLink)

    return () => {
      subscription.remove()
    }
  }, [handleDeepLink])

  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <RNThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={fill}>
          <Suspense fallback={<ThemedText>Loading...</ThemedText>}>
            <ComposeProviders
              components={[
                ReactQueryProvider,
                LanguageProvider,
                AuthProvider,
                NotificationProvider,
                ThemeProvider,
                ThemeStylesProvider,
                PortalProvider as unknown as ComponentType,
              ]}>
              <Slot />
              <RootNavigationContent />
            </ComposeProviders>
          </Suspense>
        </GestureHandlerRootView>
      </RNThemeProvider>
    </SafeAreaProvider>
  )
}

function RootNavigationContent() {
  const { isDark } = useTheme()
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingIndicator size="large" />
  }

  return (
    <>
      {isAuthenticated ? (
        <Redirect href="/home/(tabs)/home" />
      ) : (
        <Redirect href="/auth/lets-get-started" />
      )}
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  )
}
