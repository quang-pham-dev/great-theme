import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Appearance } from 'react-native'

import { StorageKeys } from '@/constants/factory-key'
import {
  darkTheme,
  lightTheme,
  type Theme,
  type ThemeMode,
} from '@/theme/theme'
import { logError } from '@/utils/error'

const { THEME_STORAGE_KEY } = StorageKeys

interface ThemeContextType {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
  setThemeMode: (mode: ThemeMode | 'system') => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

type ThemeProviderProps = PropsWithChildren

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(
    () => Appearance.getColorScheme() === 'dark',
  )
  const [themeMode, setThemeMode] = useState<ThemeMode | 'system'>('system')

  const currentTheme = useMemo<Theme>(
    () => ({
      ...(isDark ? darkTheme : lightTheme),
      mode: isDark ? 'dark' : 'light',
    }),
    [isDark],
  )

  const handleThemeModeChange = useCallback(
    async (mode: ThemeMode | 'system') => {
      try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, mode)
        setThemeMode(mode)

        if (mode === 'system') {
          setIsDark(Appearance.getColorScheme() === 'dark')
        } else {
          setIsDark(mode === 'dark')
        }
      } catch (error) {
        logError(error, 'ThemeContext.handleThemeModeChange')
      }
    },
    [],
  )

  const toggleTheme = useCallback(() => {
    const newMode = isDark ? 'light' : 'dark'
    handleThemeModeChange(newMode)
  }, [isDark, handleThemeModeChange])

  // Load saved theme only once on mount
  useEffect(() => {
    let mounted = true

    const loadSavedTheme = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY)
        if (mounted && savedMode) {
          handleThemeModeChange(savedMode as ThemeMode | 'system')
        }
      } catch (error) {
        logError(error, 'ThemeContext.loadSavedTheme')
      }
    }

    loadSavedTheme()

    return () => {
      mounted = false
    }
  }, [handleThemeModeChange])

  useEffect(() => {
    if (themeMode !== 'system') return

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === 'dark')
    })

    return () => subscription.remove()
  }, [themeMode])

  const contextValue = useMemo(
    () => ({
      theme: currentTheme,
      isDark,
      toggleTheme,
      setThemeMode: handleThemeModeChange,
    }),
    [currentTheme, isDark, toggleTheme, handleThemeModeChange],
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.displayName = 'ThemeProvider'
