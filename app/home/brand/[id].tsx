import { useLocalSearchParams, useRouter } from 'expo-router'
import { lazy, Suspense, useCallback, useState } from 'react'

import { ErrorScreen } from '@/components/common/ErrorScreen'
import { LoadingIndicator } from '@/components/common/LoadingIndicator'
import { useProducts } from '@/hooks/queries/useProducts'
import { logError } from '@/utils/error'

import type { Product } from '@/interfaces'

const LazyBrandDetailScreen = lazy(() => import('@/screens/BrandDetail'))

export default function BrandDetailRoute() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useProducts({ brandId: id })

  const handleFavoritePress = useCallback((product: Product) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(product.id)) {
        newFavorites.delete(product.id)
      } else {
        newFavorites.add(product.id)
      }
      return newFavorites
    })
  }, [])

  const handleProductPress = useCallback((product: Product) => {
    router.push({
      pathname: '/home/product/[id]',
      params: { id: product.id },
    })
  }, [])

  const handleProductsRefresh = useCallback(async () => {
    try {
      await refetch()
    } catch (error) {
      logError(error, 'HomeScreen.handleProductsRefresh')
    }
  }, [refetch])

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
      <LazyBrandDetailScreen
        products={products}
        favorites={favorites}
        refreshing={false}
        onProductPress={handleProductPress}
        onFavoritePress={handleFavoritePress}
        onRefresh={handleProductsRefresh}
      />
    </Suspense>
  )
}
