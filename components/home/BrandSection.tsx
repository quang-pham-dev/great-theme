import { useCallback, useMemo } from 'react'
import { FlatList, type ListRenderItemInfo } from 'react-native'

import { Box } from '@/components/common/Box'
import { Title, Typography } from '@/components/common/Typography'
import { BrandCard } from '@/components/home/BrandCard'

import { TextLink } from '../common/TextLink'

import type { Brand } from '@/interfaces'

interface BrandSectionProps {
  brands?: Brand[]
  onBrandSelect?: (id: string) => void
  onViewAll?: () => void
}

export function BrandSection({
  brands,
  onViewAll,
  onBrandSelect,
}: BrandSectionProps) {
  const handleBrandSelect = useCallback(
    (id: string) => {
      onBrandSelect?.(id)
    },
    [onBrandSelect],
  )

  const renderItem = useCallback(
    ({ item: brand, index }: ListRenderItemInfo<Brand>) => (
      <BrandCard brand={brand} index={index} onPress={handleBrandSelect} />
    ),
    [handleBrandSelect],
  )

  const renderListHeaderComponent = useMemo(() => <Box width={0} />, [])

  const getKeyExtractor = useCallback((item: Brand) => item.id, [])

  const renderListEmptyComponent = useCallback(
    () => (
      <Box flex={1} justify="center" align="center" p="lg">
        <Typography variant="body1" color="textSecondary">
          No brands found
        </Typography>
      </Box>
    ),
    [],
  )

  return (
    <Box mb="md" gap="md">
      <Box direction="row" justify="space-between" align="center">
        <Title weight="semibold">Choose Brand</Title>
        <TextLink onPress={onViewAll}>View All</TextLink>
      </Box>

      <FlatList
        horizontal
        data={brands}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={getKeyExtractor}
        ListHeaderComponent={renderListHeaderComponent}
        ListEmptyComponent={renderListEmptyComponent}
      />
    </Box>
  )
}
