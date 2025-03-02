import { lazy } from 'react'

const LazyLetsGetStartedScreen = lazy(() => import('@/screens/LetsGetStarted'))

export default function LetsGetStartedRoute() {
  return <LazyLetsGetStartedScreen />
}
