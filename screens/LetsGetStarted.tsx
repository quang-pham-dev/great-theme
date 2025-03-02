import { Link } from 'expo-router'

import { SocialAuthButton } from '@/components/auth/SocialAuthButton'
import { Box } from '@/components/common/Box'
import { Button } from '@/components/common/Button'
import { Flex } from '@/components/common/Flex'
import { MainLayout } from '@/components/common/Layout'
import { Typography } from '@/components/common/Typography'
import { useTheme } from '@/hooks/useTheme'

export default function LetsGetStartedScreen() {
  const { theme } = useTheme()

  return (
    <MainLayout>
      <Flex align="center">
        <Typography variant="h1">Let&apos;s Get Started</Typography>
      </Flex>

      <Flex gap={theme.spacing.md}>
        <SocialAuthButton provider="facebook">Facebook</SocialAuthButton>
        <SocialAuthButton provider="twitter">Twitter</SocialAuthButton>
        <SocialAuthButton provider="google">Google</SocialAuthButton>
      </Flex>

      <Box justify="flex-end" gap="md">
        <Box centerX>
          <Typography>
            Already have an account?{' '}
            <Link href="/auth/login">
              <Typography variant="link">Sign in</Typography>
            </Link>
          </Typography>
        </Box>

        <Button variant="primary">Create an Account</Button>
      </Box>
    </MainLayout>
  )
}
