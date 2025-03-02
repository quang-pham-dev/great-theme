import { Pressable } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { Box } from '@/components/common/Box'
import { Image } from '@/components/common/Image'
import { Typography } from '@/components/common/Typography'
import { useEntryAnimation } from '@/hooks/useEntryAnimation'
import { useStyleUtils } from '@/hooks/useStyleUtils'
import { useTheme } from '@/hooks/useTheme'

import { Icon } from '../common/Icon'

import type { Product } from '@/interfaces'
import type { Theme } from '@/theme/theme'

interface ProductCardProps {
  product: Product
  isFavorite?: boolean
  index?: number
  onPress?: (product: Product) => void
  onFavoritePress?: (product: Product) => void
}

export function ProductCard({
  product,
  isFavorite,
  index = 0,
  onPress,
  onFavoritePress,
}: ProductCardProps) {
  const { theme } = useTheme()
  const styleUtils = useStyleUtils()
  const entryAnimation = useEntryAnimation({
    delay: index * 300,
    type: 'both',
  })
  const scale = useSharedValue(1)

  const pressAnimation = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePressIn = () => {
    scale.value = withSpring(0.95)
  }

  const handlePressOut = () => {
    scale.value = withSpring(1)
  }

  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      overflow: 'hidden',
      marginBottom: theme.spacing.md,
    },
    imageContainer: {
      width: '100%',
      aspectRatio: 1,
      backgroundColor: theme.colors.background,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    favoriteButton: {
      position: 'absolute',
      right: theme.spacing.sm,
      top: theme.spacing.sm,
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.pill,
      padding: theme.spacing.sm,
    },
    details: {
      padding: theme.spacing.sm,
      gap: theme.spacing.sm,
    },
  }))

  return (
    <Animated.View style={[{ width: '48%' }, entryAnimation, pressAnimation]}>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          { opacity: pressed ? 0.8 : 1 },
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress?.(product)}>
        <Box style={styles.imageContainer}>
          <Image
            source={product.source}
            style={styles.image}
            contentFit="cover"
            showLoadingIndicator
            fallbackText="Could not load product image"
          />
          <Pressable
            style={({ pressed }) => [
              styles.favoriteButton,
              { opacity: pressed ? 0.8 : 1 },
            ]}
            onPress={() => onFavoritePress?.(product)}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={
                isFavorite ? theme.colors.primary : theme.colors.textSecondary
              }
            />
          </Pressable>
        </Box>

        <Animated.View style={styles.details}>
          <Typography variant="body1" weight="medium" numberOfLines={2}>
            {product.title}
          </Typography>
          <Typography variant="body2" weight="bold">
            ${product.price}
          </Typography>
        </Animated.View>
      </Pressable>
    </Animated.View>
  )
}
