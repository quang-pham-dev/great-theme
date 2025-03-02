import { Pressable } from 'react-native'
import Animated from 'react-native-reanimated'

import { Box } from '@/components/common/Box'
import { Image } from '@/components/common/Image'
import { Typography } from '@/components/common/Typography'
import { useEntryAnimation } from '@/hooks/useEntryAnimation'
import { useStyleUtils } from '@/hooks/useStyleUtils'

import type { Brand } from '@/interfaces'
import type { Theme } from '@/theme/theme'

interface BrandCardProps {
  brand: Brand
  onPress?: (id: string) => void
  index?: number
}

export function BrandCard({ brand, onPress, index = 0 }: BrandCardProps) {
  const styleUtils = useStyleUtils()
  const entryAnimation = useEntryAnimation({
    delay: index * 500,
    type: 'fade',
  })

  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    brandCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.md,
      gap: theme.spacing.md,
      padding: theme.spacing.sm,
      marginRight: theme.spacing.sm,
      backgroundColor: theme.colors.surfaceHover,
      minWidth: 120,
    },
    brandCardImage: {
      width: 20,
      height: 20,
    },
  }))

  return (
    <Animated.View style={entryAnimation}>
      <Pressable
        onPress={() => onPress?.(brand.id)}
        style={({ pressed }) => [
          styles.brandCard,
          { opacity: pressed ? 0.7 : 1 },
        ]}>
        <Box p="sm" borderRadius="sm" bg="white">
          <Image
            source={brand.source}
            style={styles.brandCardImage}
            contentFit="contain"
            showLoadingIndicator
            fallbackText="Could not load brand logo"
          />
        </Box>
        <Typography>{brand.name}</Typography>
      </Pressable>
    </Animated.View>
  )
}
