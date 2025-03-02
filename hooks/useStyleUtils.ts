import { useContext } from 'react'

import { ThemeStylesContext } from '@/contexts/ThemeStylesContext'

export const useStyleUtils = () => {
  const themeStylesContext = useContext(ThemeStylesContext)

  if (!themeStylesContext) {
    throw new Error('useThemeStyles must be used within a ThemeStylesProvider')
  }

  return themeStylesContext.StyleUtils
}
