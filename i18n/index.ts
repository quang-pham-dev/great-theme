import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Localization from 'expo-localization'
import i18n, { type LanguageDetectorAsyncModule } from 'i18next'
import { initReactI18next } from 'react-i18next'

import { StorageKeys } from '@/constants/factory-key'
import { logError } from '@/utils/error'

import en from './locales/en'
import vi from './locales/vi'

const LANGUAGES = {
  en,
  vi,
} as const

const LANG_CODES = Object.keys(LANGUAGES)

const LANGUAGE_DETECTOR: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: async (
    callback: (lng: string | readonly string[] | undefined) => void,
  ) => {
    try {
      const savedLanguage = await AsyncStorage.getItem(StorageKeys.APP_LANGUAGE)
      if (savedLanguage && LANG_CODES.includes(savedLanguage)) {
        callback(savedLanguage)
        return savedLanguage
      }

      const deviceLanguage = Localization.locale.split('-')[0]
      const detectedLanguage = LANG_CODES.includes(deviceLanguage)
        ? deviceLanguage
        : 'en'
      callback(detectedLanguage)
      return detectedLanguage
    } catch (error) {
      callback('en')
      logError(error, 'EN - LANGUAGE_DETECTOR')
      return 'en'
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      if (LANG_CODES.includes(lng)) {
        await AsyncStorage.setItem(StorageKeys.APP_LANGUAGE, lng)
      }
    } catch (error) {
      logError(error, 'Error caching language')
    }
  },
}

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4' as const,
    resources: LANGUAGES,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    load: 'languageOnly',
    lowerCaseLng: true,
    cleanCode: true,
  })

export default i18n
