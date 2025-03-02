import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'

const IS_FIRST_TIME = 'IS_FIRST_TIME'

export const useIsFirstTime = () => {
  const [isFirstTime, setIsFirstTime] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const value = await SecureStore.getItemAsync(IS_FIRST_TIME)
        setIsFirstTime(value === null)
      } catch (error) {
        console.warn('Error checking first time status:', error)
        setIsFirstTime(true)
      }
    }

    checkFirstTime()
  }, [])

  const setIsFirstTimeValue = async (value: boolean) => {
    try {
      if (!value) {
        await SecureStore.setItemAsync(IS_FIRST_TIME, 'false')
      }
      setIsFirstTime(value)
    } catch (error) {
      console.warn('Error setting first time status:', error)
    }
  }

  return [isFirstTime ?? true, setIsFirstTimeValue] as const
}
