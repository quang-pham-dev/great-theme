import {
  type ImageStyle,
  StyleSheet,
  type TextStyle,
  type ViewStyle,
} from 'react-native'

import type { ThemeStyles } from '@/theme/styles'
import type { Theme } from '@/theme/theme'

type StyleObject = Record<string, ViewStyle | TextStyle | ImageStyle>
type StyleType = ViewStyle | TextStyle | ImageStyle | StyleObject
type NamedStyles<T> = { [P in keyof T]: StyleType }

/**
 * Creates utility functions for managing themed styles with caching
 *
 * @param theme - The current theme object
 * @param styles - Global theme styles
 * @returns Object containing style utility functions
 *
 * @example
 * ```tsx
 * const utils = createStyleUtils(theme, styles)
 *
 * Create cached themed styles
 * const useStyles = () => {
 *   return utils.createThemedStyle((theme) => ({
 *     container: {
 *       backgroundColor: theme.colors.background
 *     }
 *   }))
 * }
 * ```
 */

// Define cache value type
type CachedStyleSheet = NamedStyles<{
  [key: string]: StyleType
}>

export const createStyleUtils = (theme: Theme, styles: ThemeStyles) => {
  /**
   * Cache for storing created StyleSheet objects
   * Key: Stringified style object
   * Value: Created StyleSheet object with proper typing
   */
  const styleCache = new Map<string, CachedStyleSheet>()

  return {
    getFullscreenCenteredContentStyles: () => [
      StyleSheet.absoluteFill,
      { backgroundColor: theme.colors.background },
      styles.justifyContentCenter,
      styles.alignItemsCenter,
    ],
    /**
     * Creates and caches themed styles
     *
     * @param styleCreator - Function that creates styles using theme
     * @returns Cached StyleSheet object
     *
     * @description
     * - Creates styles using the provided theme
     * - Caches results to prevent unnecessary recreations
     * - Uses JSON.stringify for cache key generation
     * - Returns cached styles if available
     *
     * @example
     * ```tsx
     * const styles = createThemedStyle((theme) => ({
     *   text: {
     *     color: theme.colors.text
     *   }
     * }))
     * ```
     */
    createThemedStyle: <T extends StyleObject>(
      styleCreator: (theme: Theme) => T,
    ): T => {
      // Generate cache key from style definition
      const cacheKey = JSON.stringify(styleCreator(theme))

      // Return cached styles if available
      if (!styleCache.has(cacheKey)) {
        const styles = StyleSheet.create(styleCreator(theme))
        styleCache.set(cacheKey, styles)
      }

      return styleCache.get(cacheKey) as T
    },
  }
}

export type StyleUtilsType = ReturnType<typeof createStyleUtils>
