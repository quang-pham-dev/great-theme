import { Box } from '@/components/common/Box'
import { Typography } from '@/components/common/Typography'
import { useAuth } from '@/contexts/AuthContext'

export function Header() {
  const { user } = useAuth()

  return (
    <Box flex={1} gap="xs">
      <Typography variant="h3" weight="bold">
        Hello {user?.name}
      </Typography>
      <Typography variant="subtitle" color="textSecondary">
        Welcome to Laza.
      </Typography>
    </Box>
  )
}
