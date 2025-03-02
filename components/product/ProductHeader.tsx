import { Box } from '@/components/common/Box'
import { Typography } from '@/components/common/Typography'

interface ProductHeaderProps {
  name: string
  title: string
  price: number
}

export function ProductHeader({ name, title, price }: ProductHeaderProps) {
  return (
    <Box direction="row" gap="xs" justify="space-between" wrap>
      <Box flex={1} gap="sm" align="flex-start" minWidth="60%">
        <Typography variant="body2" color="textSecondary">
          {name}
        </Typography>
        <Typography variant="h2" weight="bold" numberOfLines={2}>
          {title}
        </Typography>
      </Box>

      <Box flex={1} gap="sm" align="flex-end">
        <Typography variant="body2" color="textSecondary">
          Price
        </Typography>

        <Typography
          variant="h2"
          weight="bold"
          textAlign="right"
          numberOfLines={2}>
          $
          {price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      </Box>
    </Box>
  )
}
