import { Box } from '@/components/common/Box'
import { Button } from '@/components/common/Button'
import { Image } from '@/components/common/Image'
import { Typography } from '@/components/common/Typography'
import { useStyleUtils } from '@/hooks/useStyleUtils'

import type { Theme } from '@/theme/theme'
import type { ImageSourcePropType } from 'react-native'

interface ErrorScreenProps {
  /**
   * Error message to display
   * @default 'Something went wrong'
   */
  message?: string
  /**
   * Callback function when retry button is pressed
   */
  onRetry?: () => void
  /**
   * Custom image source for error illustration
   */
  imageSource?: ImageSourcePropType
}

export function ErrorScreen({
  message = 'Something went wrong',
  onRetry,
  imageSource,
}: ErrorScreenProps) {
  const styleUtils = useStyleUtils()

  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.xl,
      backgroundColor: theme.colors.background,
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: theme.spacing.xl,
    },
    messageContainer: {
      alignItems: 'center',
      gap: theme.spacing.md,
    },
  }))

  return (
    <Box style={styles.container}>
      {!!imageSource && (
        <Image source={imageSource} style={styles.image} contentFit="contain" />
      )}

      <Box style={styles.messageContainer}>
        <Typography variant="h4" weight="semibold" center>
          Oops!
        </Typography>

        <Typography variant="body1" color="textSecondary" center>
          {message}
        </Typography>

        {onRetry && (
          <Button variant="primary" onPress={onRetry}>
            Try Again
          </Button>
        )}
      </Box>
    </Box>
  )
}
