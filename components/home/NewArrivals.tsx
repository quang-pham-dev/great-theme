import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { memo, useCallback, useMemo } from 'react'
import {
  FlatList,
  type ListRenderItem,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  RefreshControl,
} from 'react-native'

import { Box } from '@/components/common/Box'
import { Title, Typography } from '@/components/common/Typography'
import { BrandSection } from '@/components/home/BrandSection'
import { Header } from '@/components/home/Header'
import { SearchBar } from '@/components/home/SearchBar'
import { useStyleUtils } from '@/hooks/useStyleUtils'
import { useTheme } from '@/hooks/useTheme'

import { ProductCard } from './ProductCard'
import { TextLink } from '../common/TextLink'

import type { Brand, Product } from '@/interfaces'

const MemoizedProductCard = memo(ProductCard)

interface NewArrivalsProps {
  products: Product[]
  brands: Brand[]
  favorites: Set<string>
  refreshing: boolean
  onProductPress: (product: Product) => void
  onFavoritePress: (product: Product) => void
  onViewAll: () => void
  scrollHandler?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onSearch: (text: string) => void
  onBrandSelect: (id: string) => void
  onViewAllBrands: () => void
  onRefresh: () => void
}

export function NewArrivalsList({
  brands,
  products,
  favorites,
  refreshing,
  onSearch,
  onViewAll,
  onRefresh,
  onBrandSelect,
  scrollHandler,
  onProductPress,
  onFavoritePress,
  onViewAllBrands,
}: NewArrivalsProps) {
  const tabBarHeight = useBottomTabBarHeight()
  const { theme } = useTheme()
  const styleUtils = useStyleUtils()

  const handlePressProduct = useCallback(
    (product: Product) => {
      onProductPress?.(product)
    },
    [onProductPress],
  )

  const handlePressBrand = useCallback(
    (id: string) => {
      onBrandSelect?.(id)
    },
    [onBrandSelect],
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

  const keyExtractor = useCallback((item: Product) => item.id, [])

  const renderListHeaderComponent = useMemo(
    () => (
      <>
        <Header />
        <SearchBar onChangeText={onSearch} />
        <BrandSection
          brands={brands}
          onBrandSelect={handlePressBrand}
          onViewAll={onViewAllBrands}
        />

        <Box direction="row" justify="space-between" align="center" pb="sm">
          <Title weight="semibold">New Arrival</Title>
          <TextLink onPress={onViewAll}>View All</TextLink>
        </Box>
      </>
    ),
    [brands, onSearch, onViewAll, onViewAllBrands, handlePressBrand],
  )

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

  const styles = styleUtils.createThemedStyle(theme => ({
    newArrivalListStyles: {
      flex: 1,
      paddingTop: 20,
      paddingBottom: tabBarHeight + 10,
    },
    columnWrapperStyle: {
      gap: theme.spacing.sm,
      justifyContent: 'space-between',
    },
  }))

  return (
    <Box style={styles.newArrivalListStyles}>
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
        automaticallyAdjustContentInsets
        contentInsetAdjustmentBehavior="automatic"
        onScroll={scrollHandler}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        columnWrapperStyle={styles.columnWrapperStyle}
        ListHeaderComponent={renderListHeaderComponent}
        ListEmptyComponent={renderListEmptyComponent}
      />
    </Box>
  )
}
