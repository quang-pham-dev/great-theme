import { useNavigation, useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Box } from '@/components/common/Box'
import { Button } from '@/components/common/Button'
import { MainLayout } from '@/components/common/Layout'
import Description from '@/components/product/Description'
import ImagesPreview from '@/components/product/ImagesPreview'
import { ProductHeader } from '@/components/product/ProductHeader'
import { ProductImages } from '@/components/product/ProductImages'
import { ReviewsSection } from '@/components/product/ReviewsSection'
import { SizeSelector } from '@/components/product/SizeSelector'
import TotalPrice from '@/components/product/TotalPrice'

import type { Product } from '@/interfaces'

interface ProductDetailScreenProps {
  product: Product
}

export default function ProductDetailScreen({
  product,
}: ProductDetailScreenProps) {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const router = useRouter()

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const {
    source,
    sizes = [],
    name: productName = '',
    title = '',
    price = 0,
    imagesPreview = [],
    description = '',
    reviewers = [],
    rating = 0,
  } = product || {}

  const handleGoBack = (): void => {
    navigation.goBack()
  }

  const handleAddToCart = (): void => {
    router.push('/home/(tabs)/bag')
  }

  const handlePressBagIcon = () => {
    router.navigate('/home/(tabs)/bag')
  }

  const handlePressViewAllReviews = useCallback(() => {}, [])

  return (
    <>
      <MainLayout ignoreSafeArea noPadding scrollable>
        <ProductImages
          image={source}
          title={title}
          onPressBackIcon={handleGoBack}
          onPressBagIcon={handlePressBagIcon}
        />
        <Box flex={1} bg="background" pt="lg" px="md" gap="lg">
          <ProductHeader name={productName} title={title} price={price} />
          <ImagesPreview imagesPreview={imagesPreview} />
          <SizeSelector
            sizes={sizes}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />
          <Description description={description} />
          <ReviewsSection
            reviewers={reviewers}
            rating={rating}
            onPressViewAll={handlePressViewAllReviews}
          />

          <TotalPrice price={price} />
        </Box>
      </MainLayout>
      <Box px="md" gap="xl" style={{ paddingBottom: insets.bottom }}>
        <Button variant="primary" onPress={handleAddToCart}>
          Add to cart
        </Button>
      </Box>
    </>
  )
}
