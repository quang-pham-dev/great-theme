import { AntDesign } from '@expo/vector-icons'
import { memo, useCallback } from 'react'

import { Box } from '@/components/common/Box'
import { Image } from '@/components/common/Image'
import { Typography } from '@/components/common/Typography'
import { useStyleUtils } from '@/hooks/useStyleUtils'

import type { Reviewer } from '@/interfaces'

interface ReviewItemProps {
  reviewer: Reviewer
}

export const ReviewItem = memo(({ reviewer }: ReviewItemProps) => {
  const styleUtils = useStyleUtils()
  const styles = styleUtils.createThemedStyle(() => ({
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },

    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
  }))

  const renderStars = useCallback((rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <AntDesign
        key={index.toString()}
        name={index < Math.floor(rating) ? 'star' : 'staro'}
        size={14}
        color="#FFA41C"
      />
    ))
  }, [])

  return (
    <Box gap="md">
      <Box flex={1} direction="row" gap="xs" justify="space-between">
        <Box direction="row" gap="sm" center>
          <Image
            source={{ uri: reviewer.avatar }}
            style={styles.avatar}
            contentFit="cover"
          />
          <Box justify="space-between" align="center">
            <Typography variant="body1" weight="semibold">
              {reviewer.name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {reviewer.date}
            </Typography>
          </Box>
        </Box>

        <Box center>
          <Box direction="row" center>
            <Typography variant="body1" color="text" weight="bold">
              {reviewer.rating.toFixed(1)}{' '}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {reviewer.rating === 1 ? 'rating' : 'ratings'}
            </Typography>
          </Box>
          <Box direction="row" justify="space-between">
            {renderStars(reviewer.rating)}
          </Box>
        </Box>
      </Box>

      <Typography variant="body1" color="textSecondary">
        {reviewer.comment}
      </Typography>
    </Box>
  )
})

ReviewItem.displayName = 'ReviewItem'
