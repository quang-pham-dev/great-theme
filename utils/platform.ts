import { Platform, StatusBar } from 'react-native'

import { screen } from '@/theme/dimensions'

import type { EdgeInsets } from 'react-native-safe-area-context'

const { height: SCREEN_HEIGHT } = screen

export const isIOS = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'

export const ANDROID_STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0
export const ANDROID_NAVIGATION_BAR_HEIGHT = 44

export function getBottomSpace(insets: EdgeInsets): number {
  if (isIOS) {
    return insets.bottom
  }

  // On Android, we need to account for the navigation bar height
  return ANDROID_NAVIGATION_BAR_HEIGHT
}

export function getTopSpace(insets: EdgeInsets): number {
  if (isIOS) {
    return insets.top
  }

  return ANDROID_STATUS_BAR_HEIGHT
}

export function getSafeAreaInsets(insets: EdgeInsets): EdgeInsets {
  if (isIOS) {
    return insets
  }

  return {
    ...insets,
    top: ANDROID_STATUS_BAR_HEIGHT,
    bottom: ANDROID_NAVIGATION_BAR_HEIGHT,
  }
}

export function getDeviceSpecificSpacing(value: number): number {
  // Adjust spacing based on device type if needed
  return isAndroid ? Math.round(value * 1.1) : value
}

export const hasNotch = (): boolean => {
  if (isIOS) {
    return SCREEN_HEIGHT >= 812 // iPhone X and newer
  }

  return false // For Android, we handle this differently
}
