import { SchedulableTriggerInputTypes } from 'expo-notifications'

import type * as Notifications from 'expo-notifications'

export const createNotification = (
  title: string,
  body: string,
  data?: Record<string, unknown>,
): Notifications.NotificationContentInput => ({
  title,
  body,
  data,
})

export const createScheduleTrigger = (
  seconds: number,
): Notifications.NotificationTriggerInput => ({
  type: SchedulableTriggerInputTypes.TIME_INTERVAL,
  seconds,
  repeats: false,
})

export const createCalendarTrigger = (
  dateTime: Date,
): Notifications.NotificationTriggerInput => ({
  type: SchedulableTriggerInputTypes.CALENDAR,
  day: dateTime.getDate(),
  month: dateTime.getMonth() + 1, // getMonth() returns 0-11
  year: dateTime.getFullYear(),
  hour: dateTime.getHours(),
  minute: dateTime.getMinutes(),
  second: dateTime.getSeconds(),
  repeats: false,
})
