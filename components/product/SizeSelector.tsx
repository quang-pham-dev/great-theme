import { TouchableOpacity } from 'react-native'

import { Box } from '@/components/common/Box'
import { Typography } from '@/components/common/Typography'
import { useStyleUtils } from '@/hooks/useStyleUtils'

import type { ProductSize } from '@/interfaces'
import type { Theme } from '@/theme/theme'

interface SizeSelectorProps {
  sizes: ProductSize[]
  selectedSize: string | null
  onSizeSelect: (size: string) => void
  onPressGuide?: () => void
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSizeSelect,
  onPressGuide,
}: SizeSelectorProps) {
  const styleUtils = useStyleUtils()

  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    sizeButton: {
      width: 60,
      height: 60,
      borderRadius: theme.borderRadius.sm,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    selectedSizeButton: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
  }))

  return (
    <Box gap="md">
      <Box direction="row" justify="space-between" align="center">
        <Typography variant="h4" weight="semibold">
          Size
        </Typography>
        <TouchableOpacity onPress={onPressGuide}>
          <Typography variant="body1" color="primary">
            Size Guide
          </Typography>
        </TouchableOpacity>
      </Box>
      <Box direction="row" gap="sm" wrap>
        {sizes?.map(productSize => (
          <TouchableOpacity
            key={productSize.id}
            style={[
              styles.sizeButton,
              selectedSize === productSize.size && styles.selectedSizeButton,
            ]}
            onPress={() => onSizeSelect(productSize.size)}
            accessibilityLabel={`Size ${productSize.size}`}
            accessibilityState={{
              selected: selectedSize === productSize.size,
            }}>
            <Typography
              variant="body1"
              weight="semibold"
              color={
                selectedSize === productSize.size ? 'textInverse' : 'text'
              }>
              {productSize.size}
            </Typography>
          </TouchableOpacity>
        ))}
      </Box>
    </Box>
  )
}
