import { useEffect } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

interface EntryAnimationConfig {
  delay?: number
  duration?: number
  type?: 'slide' | 'fade' | 'both'
}

export function useEntryAnimation({
  delay = 0,
  duration = 500,
  type = 'both',
}: EntryAnimationConfig = {}) {
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(50)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    )

    translateY.value = withDelay(
      delay,
      withSpring(0, {
        damping: 15,
        stiffness: 100,
      }),
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    if (type === 'fade') {
      return {
        opacity: opacity.value,
      }
    }

    if (type === 'slide') {
      return {
        transform: [{ translateY: translateY.value }],
      }
    }

    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    }
  })

  return animatedStyle
}
