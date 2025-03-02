import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { StorageKeys } from '@/constants/factory-key'
import { handleError, logError } from '@/utils/error'

import type { User } from '@/interfaces'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (userData: User) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = PropsWithChildren

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true)
      const userData = await AsyncStorage.getItem(StorageKeys.USER_INFO)

      if (!userData) {
        setIsAuthenticated(false)
        return
      }

      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setIsAuthenticated(true)
    } catch (error) {
      const { message } = handleError(error)
      logError(error, 'AuthContext.checkAuthStatus')
      setIsAuthenticated(false)
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const login = useCallback(async (userData: User) => {
    try {
      await AsyncStorage.setItem(
        StorageKeys.USER_INFO,
        JSON.stringify(userData),
      )
      setUser(userData)
      setIsAuthenticated(true)
      setError(null)
    } catch (error) {
      const { message } = handleError(error)
      logError(error, 'AuthContext.login')
      setError(message)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(StorageKeys.USER_INFO)
      setUser(null)
      setIsAuthenticated(false)
      setError(null)
    } catch (error) {
      const { message } = handleError(error)
      logError(error, 'AuthContext.logout')
      setError(message)
    }
  }, [])

  const contextValue = useMemo(() => {
    return {
      user,
      isAuthenticated,
      isLoading,
      error,
      login,
      logout,
    }
  }, [user, isAuthenticated, isLoading, error, login, logout])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

AuthProvider.displayName = 'AuthProvider'

/**
 * @deprecated Use useAuth instead
 * @returns {AuthContextType}
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
