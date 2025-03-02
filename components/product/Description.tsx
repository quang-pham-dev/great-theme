import { Box } from '../common/Box'
import { ReadMore } from '../common/ReadMore'
import { Typography } from '../common/Typography'

interface DescriptionProps {
  description: string
}
export default function Description({ description }: DescriptionProps) {
  return (
    <Box gap="md" mb="xl">
      <Typography variant="h4" weight="semibold">
        Description
      </Typography>
      <ReadMore
        textVariant="body1"
        text={description}
        maxLength={150}
        textColor="textSecondary"
      />
    </Box>
  )
}
