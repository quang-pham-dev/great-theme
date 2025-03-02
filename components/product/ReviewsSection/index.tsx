import React, { memo } from 'react'

import { Box } from '@/components/common/Box'
import { Typography } from '@/components/common/Typography'

import { ReviewItem } from './ReviewItem'

import type { Reviewer } from '@/interfaces'

interface ReviewsSectionProps {
  reviewers: Reviewer[]
  rating: string | number
  onPressViewAll?: () => void
}

export const ReviewsSection = memo(
  ({ reviewers, onPressViewAll }: ReviewsSectionProps) => {
    if (!reviewers.length) return null

    return (
      <Box gap="lg">
        <Box direction="row" justify="space-between" align="center">
          <Typography variant="h4" weight="semibold">
            Reviews
          </Typography>
          <Typography
            variant="body1"
            color="primary"
            weight="medium"
            onPress={onPressViewAll}>
            View All
          </Typography>
        </Box>

        <Box gap="xl">
          {reviewers.slice(0, 2).map(reviewer => (
            <ReviewItem key={reviewer.id} reviewer={reviewer} />
          ))}
        </Box>
      </Box>
    )
  },
)

ReviewsSection.displayName = 'ReviewsSection'
