import React from 'react'

import { Box } from '../common/Box'
import { Typography } from '../common/Typography'

interface TotalPriceProps {
  price: number
}

export default function TotalPrice({ price = 0 }: TotalPriceProps) {
  const totalPrice = price * 1.1

  return (
    <Box direction="row" justify="space-between" centerX>
      <Box gap="xs">
        <Typography variant="body1" weight="semibold">
          Total Price
        </Typography>
        <Typography variant="caption" color="textSecondary">
          with VAT,SD
        </Typography>
      </Box>
      <Typography variant="h4" weight="bold">
        {totalPrice.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </Typography>
    </Box>
  )
}
