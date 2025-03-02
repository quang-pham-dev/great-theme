import { ScrollView } from 'react-native'

import { Image } from '@/components/common/Image'
import { useStyleUtils } from '@/hooks/useStyleUtils'

import type { ImageReviewer } from '@/interfaces'

interface ImagesPreviewProps {
  imagesPreview: ImageReviewer[]
}

export default function ImagesPreview({ imagesPreview }: ImagesPreviewProps) {
  const styleUtils = useStyleUtils()
  const styles = styleUtils.createThemedStyle(() => ({
    imageStyle: {
      width: 84,
      height: 84,
      borderRadius: 8,
      marginRight: 12,
    },
  }))
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {imagesPreview?.map((imagePreview, index) => (
        <Image
          key={`thumb-${imagePreview.id}`}
          source={imagePreview.image}
          style={styles.imageStyle}
          contentFit="cover"
          accessibilityLabel={`Product thumbnail ${index + 1}`}
        />
      ))}
    </ScrollView>
  )
}
