import {
  impactAsync,
  ImpactFeedbackStyle,
  notificationAsync,
  NotificationFeedbackType,
  selectionAsync,
} from 'expo-haptics'

export const useHaptics = () => {
  const lightImpact = () => impactAsync(ImpactFeedbackStyle.Light)
  const mediumImpact = () => impactAsync(ImpactFeedbackStyle.Medium)
  const heavyImpact = () => impactAsync(ImpactFeedbackStyle.Heavy)

  const success = () => notificationAsync(NotificationFeedbackType.Success)
  const warning = () => notificationAsync(NotificationFeedbackType.Warning)
  const error = () => notificationAsync(NotificationFeedbackType.Error)

  const selection = () => selectionAsync()

  return {
    lightImpact,
    mediumImpact,
    heavyImpact,
    success,
    warning,
    error,
    selection,
  }
}
