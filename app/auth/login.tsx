import { lazy } from 'react'

const LazyLoginScreen = lazy(() => import('@/screens/Login'))

export default function LoginRoute() {
  return <LazyLoginScreen />
}
