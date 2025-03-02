import { type PropsWithChildren, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  type StyleProp,
  TouchableWithoutFeedback,
  type ViewProps,
  type ViewStyle,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useStyleUtils } from '@/hooks/useStyleUtils'
import { useTheme } from '@/hooks/useTheme'
import { getSafeAreaInsets } from '@/utils/platform'

import { Box } from './Box'

import type { Theme } from '@/theme/theme'

/**
 * Base props for Layout components
 */
export interface LayoutProps extends ViewProps {
  /**
   * Remove default horizontal padding
   * @default false
   */
  noPadding?: boolean

  /**
   * Additional container styles
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * Enable scroll view
   * @default false
   */
  scrollable?: boolean

  /**
   * Enable pull to refresh
   * @default false
   */
  refreshable?: boolean

  /**
   * Callback when pull to refresh
   */
  onRefresh?: () => Promise<void>

  /**
   * Hide status bar
   * @default false
   */
  hideStatusBar?: boolean

  /**
   * Status bar style
   * @default 'auto'
   */
  statusBarStyle?: 'light' | 'dark' | 'auto'

  /**
   * Ignore safe area insets
   * @default false
   */
  ignoreSafeArea?: boolean

  /**
   * Center content vertically
   * @default false
   */
  centerContent?: boolean

  /**
   * Background color override
   * Uses theme.colors.background by default
   */
  backgroundColor?: string
}

export function MainLayout({
  children,
  style,
  noPadding = false,
  containerStyle,
  scrollable = false,
  refreshable = false,
  hideStatusBar = false,
  statusBarStyle = 'auto',
  ignoreSafeArea = false,
  centerContent = false,
  backgroundColor,
  onRefresh,
  ...props
}: PropsWithChildren<LayoutProps>): JSX.Element {
  const { theme } = useTheme()
  const styleUtils = useStyleUtils()
  const insets = useSafeAreaInsets()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const safeAreaInsets = getSafeAreaInsets(insets)

  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    container: {
      flex: 1,
      backgroundColor: backgroundColor || theme.colors.background,
      paddingTop: ignoreSafeArea ? 0 : safeAreaInsets.top,
      paddingBottom: ignoreSafeArea ? 0 : safeAreaInsets.bottom,
      ...(centerContent && {
        justifyContent: 'center',
        alignItems: 'center',
      }),
    },
    content: {
      flexGrow: 1,
    },
  }))

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true)
      await onRefresh()
      setIsRefreshing(false)
    }
  }

  const renderContent = () => {
    const content = (
      <Box
        style={[styles.container, containerStyle, style]}
        px={noPadding ? undefined : 'md'}
        {...props}>
        {children}
      </Box>
    )

    if (scrollable) {
      return (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            refreshable ? (
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            ) : undefined
          }>
          {content}
        </ScrollView>
      )
    }

    return content
  }

  return (
    <>
      <StatusBar
        hidden={hideStatusBar}
        barStyle={
          statusBarStyle === 'auto'
            ? theme.mode === 'dark'
              ? 'light-content'
              : 'dark-content'
            : `${statusBarStyle}-content`
        }
      />
      {renderContent()}
    </>
  )
}

/**
 * KeyboardDismissLayout Component
 *
 * A layout component that handles keyboard behavior and dismissal.
 * Automatically adjusts content when keyboard appears and dismisses keyboard on outside touch.
 *
 * @example
 * ```tsx
 * <KeyboardDismissLayout>
 *   <TextInput placeholder="Type here..." />
 *   <Button title="Submit" />
 * </KeyboardDismissLayout>
 * ```
 */
export function KeyboardDismissLayout({
  children,
  style,
  containerStyle,
  ...props
}: PropsWithChildren<LayoutProps>): JSX.Element {
  const styleUtils = useStyleUtils()
  const insets = useSafeAreaInsets()
  const safeAreaInsets = getSafeAreaInsets(insets)

  /**
   * Platform-specific keyboard behavior
   */
  type KeyboardBehavior = 'padding' | 'height' | 'position' | undefined
  const keyboardBehavior: KeyboardBehavior = Platform.select({
    ios: 'padding',
    android: 'height',
  })

  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    keyboardAvoidingView: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      paddingTop: 10,
      paddingBottom: safeAreaInsets.bottom,
    },
  }))

  return (
    <KeyboardAvoidingView
      behavior={keyboardBehavior}
      style={[styles.keyboardAvoidingView, containerStyle]}
      {...props}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible
        accessibilityRole="button"
        accessibilityLabel="Dismiss keyboard">
        <Box style={[styles.container, style]}>{children}</Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
