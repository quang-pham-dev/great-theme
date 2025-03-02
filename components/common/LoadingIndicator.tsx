import {
  ActivityIndicator,
  type ActivityIndicatorProps,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native'

import { useStyleUtils } from '@/hooks/useStyleUtils'
import { useTheme } from '@/hooks/useTheme'

import { ThemedText } from '../ThemedText'

import type { Theme } from '@/theme/theme'

/**
 * Available variants for the LoadingIndicator
 */
type LoadingVariant = 'primary' | 'secondary'

/**
 * Props for the LoadingIndicator component
 * Extends ActivityIndicator props excluding color (handled by variant)
 */
export interface LoadingIndicatorProps
  extends Omit<ActivityIndicatorProps, 'color'> {
  /**
   * Text to display below the loading indicator
   * @example "Loading..."
   */
  text?: string

  /**
   * The variant of the loading indicator
   * @default 'primary'
   */
  variant?: LoadingVariant

  /**
   * If true, shows the loading indicator in a centered overlay
   * @default false
   */
  overlay?: boolean

  /**
   * Size of the indicator.
   * Small has a height of 20, large has a height of 36.
   *
   * enum('small', 'large')
   */
  size?: number | 'small' | 'large' | undefined

  /**
   * Style for the container
   */
  containerStyle?: StyleProp<ViewStyle>
}

/**
 * LoadingIndicator Component
 *
 * A themed loading indicator component with optional text and overlay support.
 *
 * @example
 * ```tsx
 * Basic usage
 * <LoadingIndicator />
 *
 * With text
 * <LoadingIndicator
 *   text="Loading data..."
 *   variant="secondary"
 * />
 *
 * As overlay
 * <LoadingIndicator
 *   overlay
 *   text="Please wait"
 *   size="large"
 * />
 * ```
 */
export function LoadingIndicator({
  text,
  variant = 'primary',
  overlay = false,
  style,
  size,
  containerStyle,
  ...props
}: LoadingIndicatorProps): JSX.Element {
  const { theme } = useTheme()
  const styleUtils = useStyleUtils()

  /**
   * Gets the appropriate color based on variant
   */
  const getColor = (): string => {
    switch (variant) {
      case 'secondary':
        return theme.colors.textSecondary
      default:
        return theme.colors.primary
    }
  }
  /**
   * Hook for creating LoadingIndicator styles with theme integration
   * Uses the theme system to generate consistent styling
   */
  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      marginTop: theme.spacing.sm,
      fontSize: theme.typography.sizes.sm,
      textAlign: 'center',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.overlay,
    },
    overlayContent: {
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
  }))

  /**
   * Renders the main loading content
   */
  const renderContent = () => (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator size={size} color={getColor()} {...props} />
      {text && (
        <ThemedText
          style={[styles.text, { color: getColor() }, style as TextStyle]}
          numberOfLines={2}>
          {text}
        </ThemedText>
      )}
    </View>
  )

  if (overlay) {
    return (
      <View
        style={styles.overlay}
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={text || 'Loading'}>
        <View
          style={[
            styles.overlayContent,
            { backgroundColor: theme.colors.surface },
          ]}>
          {renderContent()}
        </View>
      </View>
    )
  }

  return renderContent()
}
