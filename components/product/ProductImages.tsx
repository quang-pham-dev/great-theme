import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Box } from '@/components/common/Box'
import { Image } from '@/components/common/Image'
import { useStyleUtils } from '@/hooks/useStyleUtils'
import { window } from '@/theme/dimensions'

import { BackButton } from '../common/BackButton'
import { IconCircleButton } from '../common/IconCircleButton'

import type { Theme } from '@/theme/theme'

interface ProductImagesProps {
  image: string
  title: string
  onPressBackIcon: () => void
  onPressBagIcon: () => void
}

export function ProductImages({
  title,
  image,
  onPressBackIcon,
  onPressBagIcon,
}: ProductImagesProps) {
  const insets = useSafeAreaInsets()
  const styleUtils = useStyleUtils()

  const IMAGE_HEIGHT = window.height * 0.5

  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    container: {
      height: IMAGE_HEIGHT,
    },
    imageContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    headerContainer: {
      paddingTop: insets.top,
      paddingHorizontal: theme.spacing.md,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
    },
  }))

  return (
    <Box style={styles.container}>
      <Box style={styles.imageContainer}>
        <Image
          source={image}
          style={styles.image}
          contentFit="cover"
          accessibilityLabel={`${title} main image`}
        />
        <Box style={styles.overlay} />
      </Box>

      <Box
        direction="row"
        justify="space-between"
        style={styles.headerContainer}>
        <BackButton onPress={onPressBackIcon} />
        <IconCircleButton name="bag-outline" onPress={onPressBagIcon} />
      </Box>
    </Box>
  )
}
