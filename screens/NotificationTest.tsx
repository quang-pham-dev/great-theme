import React, { useEffect, useState } from 'react'
import { Alert, Linking } from 'react-native'

import { Box } from '@/components/common/Box'
import { Button } from '@/components/common/Button'
import { MainLayout } from '@/components/common/Layout'
import { Typography } from '@/components/common/Typography'
import { useNotification } from '@/hooks/useNotification'
import {
  createCalendarTrigger,
  createNotification,
  createScheduleTrigger,
} from '@/utils/notification'

export function NotificationTest() {
  const {
    sendLocalNotification,
    scheduleNotification,
    expoPushToken,
    requestPermissions,
  } = useNotification()
  const [hasPermission, setHasPermission] = useState(false)
  console.log('expoPushToken', expoPushToken)
  useEffect(() => {
    checkPermissions()
  }, [])

  const checkPermissions = async () => {
    const permission = await requestPermissions()
    setHasPermission(permission)
  }

  const handleImmediateNotification = async () => {
    try {
      if (!hasPermission) {
        const granted = await requestPermissions()
        if (!granted) {
          Alert.alert('Need notification permissions to send notifications')
          return
        }
      }

      await sendLocalNotification(
        createNotification(
          'Immediate Notification',
          'This is a test notification that appears immediately',
          { data: 'test' },
        ),
      )
    } catch (error) {
      console.error('Error sending notification:', error)
      Alert.alert('Failed to send notification')
    }
  }

  const handleScheduledNotification = async () => {
    console.log('handleScheduledNotification')
    await scheduleNotification(
      createNotification(
        'Scheduled Notification',
        'This notification appears after 5 seconds',
      ),
      createScheduleTrigger(5),
    )
  }

  const handleFutureNotification = async () => {
    console.log('handleFutureNotification')
    const futureDate = new Date()
    futureDate.setMinutes(futureDate.getMinutes() + 1) // Schedule for 1 minute later

    await scheduleNotification(
      createNotification(
        'Future Notification',
        'This notification was scheduled for a specific time',
      ),
      createCalendarTrigger(futureDate),
    )
  }

  const openSettings = () => {
    Linking.openSettings()
  }

  return (
    <MainLayout>
      <Box flex={1} p="lg" gap="md">
        <Typography variant="h4">Notification Test</Typography>

        {!hasPermission && (
          <Box p="md" bg="error" borderRadius="md" gap="sm">
            <Typography color="white">
              Notification permissions not granted
            </Typography>
            <Button variant="secondary" onPress={openSettings}>
              Open Settings
            </Button>
          </Box>
        )}

        {/* Rest of the UI remains the same */}

        <Box gap="sm">
          <Button onPress={handleImmediateNotification}>
            Send Immediate Notification
          </Button>

          <Button onPress={handleScheduledNotification}>
            Schedule in 5 seconds
          </Button>

          <Button onPress={handleFutureNotification}>
            Schedule in 1 minute
          </Button>
        </Box>

        <Box p="md" bg="surfaceHover" borderRadius="md">
          <Typography variant="caption">Push Token:</Typography>
          <Typography variant="body2" wordWrap="break-word">
            {expoPushToken || 'No token available'}
          </Typography>
        </Box>
      </Box>
    </MainLayout>
  )
}
