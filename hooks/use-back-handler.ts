import { useEffect } from 'react'
import { BackHandler } from 'react-native'

export function useBackHandler(
  onBackButtonPress: () => boolean | null | undefined,
) {
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackButtonPress,
    )

    return () => {
      subscription.remove()
    }
  }, [onBackButtonPress])
}
