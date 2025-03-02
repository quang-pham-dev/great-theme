import {
  type ImageStyle,
  StyleSheet,
  type TextStyle,
  type ViewStyle,
} from 'react-native'

import { flex, spacing } from './tokens'

import type { Theme } from './theme'

type StyleObject = Record<string, ViewStyle | TextStyle | ImageStyle>

// Improve cache key generation and type safety
// Fix 1: Remove dependency on theme.id and make cache key more reliable
const getCacheKey = (theme: Theme, styles: StyleObject): string => {
  return JSON.stringify({
    // Use theme values instead of id for more reliable caching
    colors: theme.colors,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    styles,
  })
}

// Improve cache type safety
const styleCache = new WeakMap<Theme, Map<string, StyleObject>>()
/**
 * @deprecated Use `createThemedStyle` from `@/utils/create-styles` instead.
 * This function will be removed in future versions.
 *
 * Example migration:
 * ```tsx
 * Before
 * const useStyles = createComponentStyles((theme) => ({...}))
 *
 * After
 * const StyleUtils = useStyleUtils()
 * const styles = StyleUtils.createThemedStyle((theme) => ({...}))
 * ```
 *
 * Creates styles for a component with theme support but without caching.
 * For better performance and caching support, use createThemedStyle.
 *
 * @param styleCreator - Function that creates styles using theme
 * @returns Function that creates styles with theme
 */
export const createComponentStyles = <T extends StyleObject>(
  styleCreator: (theme: Theme) => T,
) => {
  return (theme: Theme): T => {
    if (!theme) {
      throw new Error('Theme is required for creating styles')
    }

    // Get or create theme-specific cache
    if (!styleCache.has(theme)) {
      styleCache.set(theme, new Map())
    }

    const themeCache = styleCache.get(theme)
    if (!themeCache) {
      throw new Error('Failed to initialize theme cache')
    }

    const styles = styleCreator(theme)
    const cacheKey = getCacheKey(theme, styles)

    if (!themeCache.has(cacheKey)) {
      const compiledStyles = StyleSheet.create(styles)
      themeCache.set(cacheKey, compiledStyles)
    }

    const cachedStyles = themeCache.get(cacheKey)
    if (!cachedStyles) {
      throw new Error('Failed to retrieve cached styles')
    }

    return cachedStyles as T
  }
}

// Improve type definitions
type BaseStyle = ViewStyle | TextStyle | ImageStyle
type StyleValue = BaseStyle | null | undefined
type StyleFunction = (
  ...args: (string | number | boolean | undefined)[]
) => StyleValue

// More specific custom style keys
type LayoutStyleKeys = 'fill' | 'container' | 'row' | 'column'
type TextAlignmentKeys = 'textAlignLeft' | 'textAlignRight' | 'textAlignCenter'
type CustomStyleKeys = LayoutStyleKeys | TextAlignmentKeys

type StylePropertyValue = StyleValue | StyleFunction | number

// More specific type for styles
type ThemeStyles = {
  [K in
    | keyof typeof spacing
    | keyof typeof flex
    | CustomStyleKeys]: StylePropertyValue
}

export const styles = (theme: Theme): ThemeStyles => ({
  ...spacing,
  ...flex,

  // Layout styles
  fill: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },

  // Text alignment styles
  textAlignLeft: {
    textAlign: 'left',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
})

export type { ThemeStyles, StyleObject, StyleValue, StyleFunction }
