import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'

import { ErrorScreen } from '@/components/common/ErrorScreen'
import { MainLayout } from '@/components/common/Layout'
import { LoadingIndicator } from '@/components/common/LoadingIndicator'
import { NewArrivalsList } from '@/components/home'
import { useBrands } from '@/hooks/queries/useBrands'
import { useProducts } from '@/hooks/queries/useProducts'
import { logError } from '@/utils/error'

import type { Product } from '@/interfaces'

export function HomeScreen() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const {
    data: products = [],
    isLoading,
    isError: isProductsError,
    error: productsError,
    refetch: refetchProducts,
    isRefetching: isRefetchingProducts,
  } = useProducts()

  const {
    data: brands = [],
    isLoading: isBrandsLoading,
    isError: isBrandsError,
    error: brandsError,
    refetch: refetchBrands,
    isRefetching: isRefetchingBrands,
  } = useBrands()

  const handleSearch = useCallback(() => {}, [])

  const handleBrandSelect = useCallback(
    (id: string) => {
      const brand = brands.find(b => b.id === id)

      router.push({
        pathname: '/home/brand/[id]',
        params: {
          id: id,
          logoUrl: brand?.source,
        },
      })
    },
    [brands],
  )

  const handleViewAllBrands = useCallback(() => {
    console.log('handleViewAllBrands')
  }, [])

  const handleProductPress = useCallback((product: Product) => {
    router.push({
      pathname: '/home/product/[id]',
      params: { id: product.id },
    })
  }, [])

  const handleViewAllProducts = useCallback(() => {
    console.log('handleViewAllProducts')
  }, [])

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

  const handleProductsRefresh = useCallback(async () => {
    try {
      await refetchProducts()
    } catch (error) {
      logError(error, 'HomeScreen.handleProductsRefresh')
    }
  }, [refetchProducts])

  if (isLoading || isBrandsLoading) {
    return <LoadingIndicator size="large" containerStyle={{ flex: 1 }} />
  }

  if (isProductsError || isBrandsError) {
    return (
      <ErrorScreen
        message={
          isProductsError && isBrandsError
            ? 'Failed to load products and brands'
            : isProductsError
              ? productsError.message
              : brandsError?.message
        }
        onRetry={() => {
          refetchProducts()
          refetchBrands()
        }}
      />
    )
  }

  return (
    <MainLayout ignoreSafeArea>
      <NewArrivalsList
        products={products}
        brands={brands}
        favorites={favorites}
        refreshing={isRefetchingProducts || isRefetchingBrands}
        onSearch={handleSearch}
        onViewAll={handleViewAllProducts}
        onBrandSelect={handleBrandSelect}
        onRefresh={handleProductsRefresh}
        onProductPress={handleProductPress}
        onViewAllBrands={handleViewAllBrands}
        onFavoritePress={handleFavoritePress}
      />
    </MainLayout>
  )
}
