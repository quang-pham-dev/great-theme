import { MaterialIcons } from '@expo/vector-icons'
import { Pressable } from 'react-native'

import { Images } from '@/assets'
import { Box } from '@/components/common/Box'
import { Image } from '@/components/common/Image'
import { Typography } from '@/components/common/Typography'
import { useStyleUtils } from '@/hooks/useStyleUtils'
import { useTheme } from '@/hooks/useTheme'

import type { Theme } from '@/theme/theme'
import type React from 'react'

interface UserProfileProps {
  /**
   * User's display name
   */
  name: string
  /**
   * Number of orders the user has made
   */
  ordersCount: number
  /**
   * Optional URL for the user's profile image
   */
  imageUrl?: string
  /**
   * Whether the user is verified
   */
  isVerified?: boolean
  /**
   * Optional callback when profile is pressed
   */
  onPress?: () => void
}

export function UserProfile({
  name,
  ordersCount,
  imageUrl,
  isVerified,
  onPress,
}: UserProfileProps) {
  const { theme } = useTheme()
  const styleUtils = useStyleUtils()

  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    container: {
      marginBottom: theme.spacing.xl,
    },
    profileImage: {
      width: 45,
      height: 45,
      borderRadius: 30,
      backgroundColor: theme.colors.surface,
    },
  }))

  const defaultImage = Images.avatar

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed && onPress ? 0.7 : 1 },
      ]}
      onPress={onPress}>
      <Box direction="row" center gap="sm">
        <Image
          source={imageUrl ? { uri: imageUrl } : defaultImage}
          style={styles.profileImage}
          contentFit="cover"
          transition={200}
        />
        <Box flex={1} direction="row" align="center" justify="space-between">
          <Box>
            <Typography variant="title" weight="semibold" color="text">
              {name}
            </Typography>
            <Box direction="row" center>
              <Typography variant="caption" color="textSecondary">
                Verified Profile
              </Typography>
              <MaterialIcons
                name="verified"
                size={12}
                color={
                  isVerified ? theme.colors.success : theme.colors.textSecondary
                }
              />
            </Box>
          </Box>

          <Box bg="surface" p="sm" borderRadius="md">
            <Typography variant="body2" color="textSecondary">
              {ordersCount} Orders
            </Typography>
          </Box>
        </Box>
      </Box>
    </Pressable>
  )
}
