import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useAuth } from '@/hooks/useAuth'
import { isAndroid } from '@/utils/platform'

const ANDROID_CHANNEL_ID = 'default'
const ANDROID_VIBRATION_PATTERN = [0, 250, 250, 250]
const ANDROID_LIGHT_COLOR = '#FF231F7C'

// Setup notification handler
const notificationHandler = {
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
}

Notifications.setNotificationHandler(notificationHandler)

const setupAndroidChannel = async () => {
  if (isAndroid) {
    await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
      name: ANDROID_CHANNEL_ID,
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: ANDROID_VIBRATION_PATTERN,
      lightColor: ANDROID_LIGHT_COLOR,
    })
  }
}

const getProjectId = () =>
  Constants?.expoConfig?.extra?.eas?.projectId ??
  Constants?.easConfig?.projectId

const checkPermissionStatus = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  if (existingStatus === 'granted') return existingStatus

  const { status } = await Notifications.requestPermissionsAsync()
  return status
}

// Types
interface NotificationContextType {
  expoPushToken: string | null
  notification: Notifications.Notification | null
  requestPermissions: () => Promise<boolean>
  sendLocalNotification: (
    content: Notifications.NotificationContentInput,
  ) => Promise<void>
  scheduleNotification: (
    content: Notifications.NotificationContentInput,
    trigger: Notifications.NotificationTriggerInput,
  ) => Promise<string>
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined)

export function NotificationProvider({ children }: PropsWithChildren) {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null)
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null)
  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()
  const { isAuthenticated } = useAuth()

  const requestPermissions = async () => {
    if (!Device.isDevice) return false

    await setupAndroidChannel()
    const finalStatus = await checkPermissionStatus()

    if (finalStatus !== 'granted') return false

    const projectId = getProjectId()
    const token = await Notifications.getExpoPushTokenAsync({ projectId })
    setExpoPushToken(token.data)
    return true
  }

  const sendLocalNotification = async (
    content: Notifications.NotificationContentInput,
  ) => {
    await Notifications.scheduleNotificationAsync({
      content,
      trigger: null,
    })
  }

  const scheduleNotification = async (
    content: Notifications.NotificationContentInput,
    trigger: Notifications.NotificationTriggerInput,
  ) => {
    return await Notifications.scheduleNotificationAsync({
      content,
      trigger,
    })
  }

  const setupNotificationListeners = () => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification =>
        setNotification(notification),
      )

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response =>
        console.log(response),
      )
  }

  const cleanupNotificationListeners = () => {
    if (notificationListener.current) {
      Notifications.removeNotificationSubscription(notificationListener.current)
    }
    if (responseListener.current) {
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isAuthenticated) {
      requestPermissions()
    }

    setupNotificationListeners()
    return cleanupNotificationListeners
  }, [isAuthenticated])

  return (
    <NotificationContext.Provider
      value={{
        expoPushToken,
        notification,
        requestPermissions,
        sendLocalNotification,
        scheduleNotification,
      }}>
      {children}
    </NotificationContext.Provider>
  )
}
