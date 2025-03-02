import {
  SafeAreaView as RNSafeAreaView,
  StyleSheet,
  type ViewStyle,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useThemeColor } from '@/hooks/useThemeColor'

import type React from 'react'

export const SafeAreaView = ({
  children,
  style,
  lightColor,
  darkColor,
}: {
  children: React.ReactNode
  style?: ViewStyle
  lightColor?: string
  darkColor?: string
}) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  )
  const inset = useSafeAreaInsets()

  return (
    <RNSafeAreaView
      style={[
        styles.container,
        { marginTop: inset.top },
        { backgroundColor },
        style,
      ]}>
      {children}
    </RNSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
