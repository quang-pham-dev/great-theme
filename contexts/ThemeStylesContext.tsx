import { createContext, type PropsWithChildren, useMemo } from 'react'

import { useTheme } from '@/hooks/useTheme'
import { styles, type ThemeStyles } from '@/theme/styles'
import { createStyleUtils, type StyleUtilsType } from '@/utils/create-styles'

interface ThemeStylesContextType {
  styles: ThemeStyles
  StyleUtils: StyleUtilsType
}

export const ThemeStylesContext = createContext<
  ThemeStylesContextType | undefined
>(undefined)

type ThemeStylesProviderProps = PropsWithChildren

function ThemeStylesProvider({ children }: ThemeStylesProviderProps) {
  const { theme } = useTheme()

  const themeStyles = useMemo(() => styles(theme), [theme])
  const StyleUtils = useMemo(
    () => createStyleUtils(theme, themeStyles),
    [theme, themeStyles],
  )
  const contextValue = useMemo(
    () => ({ styles: themeStyles, StyleUtils }),
    [themeStyles, StyleUtils],
  )

  return (
    <ThemeStylesContext.Provider value={contextValue}>
      {children}
    </ThemeStylesContext.Provider>
  )
}

ThemeStylesProvider.displayName = 'ThemeStylesProvider'

export default ThemeStylesProvider
