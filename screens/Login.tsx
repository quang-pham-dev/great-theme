import { router } from 'expo-router'
import { useCallback } from 'react'

import { FormLogin, type LoginFormData } from '@/components/auth/FormLogin'
import { Box } from '@/components/common/Box'
import { Flex } from '@/components/common/Flex'
import { KeyboardDismissLayout } from '@/components/common/Layout'
import { Typography } from '@/components/common/Typography'
import { useAuth } from '@/contexts/AuthContext'

import type { User } from '@/interfaces'

export default function LoginScreen() {
  const { isLoading, error, login } = useAuth()

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      await login({
        id: '1',
        name: data.username,
        email: `${data.username.toLowerCase()}@example.com`,
      } as User)

      router.replace('/home/(tabs)/home')
    },
    [login],
  )

  return (
    <KeyboardDismissLayout>
      <Box px="md" style={{ flex: 1, justifyContent: 'space-between' }}>
        <Flex flex={1 / 3}>
          <Typography variant="h1" center>
            Welcome Back
          </Typography>
          <Typography variant="subtitle" center>
            Please enter your credentials to continue
          </Typography>
        </Flex>

        <Flex flex={2 / 3}>
          <FormLogin
            error={error}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </Flex>
      </Box>
    </KeyboardDismissLayout>
  )
}
