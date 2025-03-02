import { useMemo } from 'react'

import { useTheme } from '@/hooks/useTheme'

import type { Theme } from '@/theme/theme'

export const useThemeValue = <T>(selector: (theme: Theme) => T): T => {
  const { theme } = useTheme()
  return useMemo(() => selector(theme), [selector, theme])
}
