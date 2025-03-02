import { useLocalSearchParams } from 'expo-router'
import { lazy, Suspense } from 'react'

import { ErrorScreen } from '@/components/common/ErrorScreen'
import { LoadingIndicator } from '@/components/common/LoadingIndicator'
import { useProduct } from '@/hooks/queries/useProduct'

import type { Product } from '@/interfaces'

const LazyProductDetailScreen = lazy(() => import('@/screens/ProductDetail'))

export default function ProductDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: product, isLoading, isError, error, refetch } = useProduct(id)

  if (isLoading) {
    return <LoadingIndicator size="large" containerStyle={{ flex: 1 }} />
  }

  if (isError) {
    return (
      <ErrorScreen
        message={error?.message || 'Failed to load products'}
        onRetry={refetch}
      />
    )
  }

  return (
    <Suspense
      fallback={<LoadingIndicator size="large" containerStyle={{ flex: 1 }} />}>
      <LazyProductDetailScreen product={product as Product} />
    </Suspense>
  )
}
