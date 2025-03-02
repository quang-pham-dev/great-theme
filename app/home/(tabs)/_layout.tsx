import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

import { Icon } from '@/components/common/Icon'
import { HapticTab } from '@/components/HapticTab'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useTheme } from '@/hooks/useTheme'

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const { theme } = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          colorScheme === 'dark' ? theme.colors.primary : theme.colors.text,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            paddingTop: 10,
            bottom: 0,
            backgroundColor: theme.colors.background,
          },
          default: {
            // Use a semi-transparent background on Android to show the blur effect
          },
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => {
            return (
              <Icon
                name="home"
                size={24}
                color={focused ? theme.colors.primary : color}
              />
            )
          },
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Favorite',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="heart-outline"
              size={24}
              color={focused ? theme.colors.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bag"
        options={{
          title: 'Bag',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="bag-outline"
              size={24}
              color={focused ? theme.colors.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="wallet-outline"
              size={24}
              color={focused ? theme.colors.primary : color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
