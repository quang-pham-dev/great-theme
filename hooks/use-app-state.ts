import { useEffect, useRef, useState } from 'react'
import { AppState, type AppStateStatus } from 'react-native'

type UseAppStateProps = {
  match: RegExp
  nextAppState: AppStateStatus
  callback: () => void
}

export function useAppState({
  match,
  nextAppState,
  callback,
}: UseAppStateProps) {
  const appState = useRef(AppState.currentState)
  const [_, setAppStateVisible] = useState(appState.current)

  useEffect(() => {
    // First time check (opening App from a killed state)
    if (appState.current === nextAppState) {
      callback()
    }

    // Set up event listener
    const subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange,
    )
    return () => {
      subscription.remove()
    }
  }, [])

  const _handleAppStateChange = (newAppState: AppStateStatus) => {
    // If the state we're coming from matches and
    // the next state is the desired one, fire callback
    if (appState.current.match(match) && newAppState === nextAppState) {
      callback()
    }

    appState.current = newAppState
    setAppStateVisible(appState.current)
  }
}
