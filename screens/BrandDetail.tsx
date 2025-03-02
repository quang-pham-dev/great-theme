import { memo, useCallback } from 'react'
import { FlatList, type ListRenderItem, RefreshControl } from 'react-native'

import { Box } from '@/components/common/Box'
import { Icon } from '@/components/common/Icon'
import { MainLayout } from '@/components/common/Layout'
import { Typography } from '@/components/common/Typography'
import { ProductCard } from '@/components/home/ProductCard'
import { useTheme } from '@/hooks/useTheme'

import type { Product } from '@/interfaces'

interface BrandDetailScreenProps {
  products: Product[]
  favorites: Set<string>
  refreshing: boolean
  onRefresh: () => void
  onProductPress: (product: Product) => void
  onFavoritePress: (product: Product) => void
}

const MemoizedProductCard = memo(ProductCard)

export default function BrandDetailScreen({
  products,
  favorites,
  refreshing,
  onRefresh,
  onProductPress,
  onFavoritePress,
}: BrandDetailScreenProps) {
  const { theme } = useTheme()

  const handlePressProduct = useCallback(
    (product: Product) => {
      onProductPress?.(product)
    },
    [onProductPress],
  )

  const handlePressFavorite = useCallback(
    (product: Product) => {
      onFavoritePress?.(product)
    },
    [onFavoritePress],
  )

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item, index }) => (
      <MemoizedProductCard
        product={item}
        index={index}
        isFavorite={favorites.has(item.id)}
        onPress={handlePressProduct}
        onFavoritePress={handlePressFavorite}
      />
    ),
    [favorites, handlePressProduct, handlePressFavorite],
  )

  const renderListHeaderComponent = useCallback(() => {
    return (
      <Box direction="row" justify="space-between" mb="lg">
        <Box>
          <Typography variant="h4" weight="semibold">
            {products?.length} Items
          </Typography>
          <Typography variant="subtitle">Available in stock</Typography>
        </Box>
        <Box
          direction="row"
          center
          px="md"
          py="xs"
          gap="sm"
          bg="surfaceHover"
          borderRadius="md">
          <Icon name="filter-outline" size={20} color="textSecondary" />
          <Typography variant="body1" color="textSecondary">
            Sort
          </Typography>
        </Box>
      </Box>
    )
  }, [products?.length])

  const keyExtractor = useCallback((item: Product) => item.id, [])

  const renderListEmptyComponent = useCallback(
    () => (
      <Box flex={1} justify="center" align="center" p="lg">
        <Typography variant="body1" color="textSecondary">
          No products found
        </Typography>
      </Box>
    ),
    [],
  )

  return (
    <MainLayout ignoreSafeArea style={{ marginTop: 25 }}>
      <FlatList
        data={products}
        windowSize={6}
        numColumns={2}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.5}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        columnWrapperStyle={{ gap: 16 }}
        ListHeaderComponent={renderListHeaderComponent}
        ListEmptyComponent={renderListEmptyComponent}
      />
    </MainLayout>
  )
}
