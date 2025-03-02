import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

import { StorageKeys } from '@/constants/factory-key'
import i18n from '@/i18n'

type SupportedLanguages = 'en' | 'vi'

interface LanguageContextType {
  language: SupportedLanguages
  changeLanguage: (lang: SupportedLanguages) => Promise<void>
  isInitialized: boolean
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

export function LanguageProvider({ children }: PropsWithChildren) {
  const [isInitialized, setIsInitialized] = useState(false)
  const { i18n: i18nInstance } = useTranslation()

  useEffect(() => {
    const initI18n = async () => {
      await i18n.init()
      setIsInitialized(true)
    }
    initI18n()
  }, [])

  const changeLanguage = useCallback(
    async (lang: SupportedLanguages) => {
      try {
        await i18nInstance.changeLanguage(lang)
        await AsyncStorage.setItem(StorageKeys.APP_LANGUAGE, lang)
      } catch (error) {
        console.error('Error changing language:', error)
      }
    },
    [i18nInstance],
  )

  const contextValue = useMemo(
    () => ({
      language: i18nInstance.language as SupportedLanguages,
      changeLanguage,
      isInitialized,
    }),
    [i18nInstance.language, changeLanguage, isInitialized],
  )

  if (!isInitialized) {
    return null // or a loading component
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}
