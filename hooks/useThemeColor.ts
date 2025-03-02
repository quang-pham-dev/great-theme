/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useTheme } from '@/hooks/useTheme'

import type { Theme } from '@/theme/theme'

type ThemeColorProps = {
  light?: string
  dark?: string
}

export function useThemeColor(
  props: ThemeColorProps,
  colorName: keyof Theme['colors'],
) {
  const { isDark, theme } = useTheme()
  const colorFromProps = isDark ? props.dark : props.light

  if (colorFromProps) {
    return colorFromProps
  }
  return theme.colors[colorName]
}
