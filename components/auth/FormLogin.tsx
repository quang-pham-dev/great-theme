import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'expo-router'
import { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Box } from '@/components/common/Box'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Switch } from '@/components/common/Switch'
import { Typography } from '@/components/common/Typography'
import { useTheme } from '@/hooks/useTheme'

import { Flex } from '../common/Flex'
import { Icon } from '../common/Icon'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
})

export type LoginFormData = z.infer<typeof loginSchema>

interface FormLoginProps {
  error?: string | null
  onSubmit: (data: LoginFormData) => Promise<void>
  isLoading?: boolean
}

export function FormLogin({ error, isLoading, onSubmit }: FormLoginProps) {
  const { theme } = useTheme()
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  })

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [])

  const handleFormSubmit = useCallback(
    async (data: LoginFormData) => {
      await onSubmit(data)
    },
    [onSubmit],
  )

  return (
    <Box justify="space-between" style={{ flex: 1 }}>
      <Box gap="xl">
        {error && (
          <Box bg="errorLight" p="sm" borderRadius="sm" mb="md">
            <Typography variant="error" center>
              {error}
            </Typography>
          </Box>
        )}

        <Box gap="xl">
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Username"
                value={value}
                keyboardType="default"
                autoCapitalize="none"
                placeholder="Esther Howard"
                onChangeText={onChange}
                error={errors.username?.message}
                rightIcon={
                  value ? (
                    <Icon
                      name="checkmark"
                      size={24}
                      color={theme.colors.success}
                    />
                  ) : null
                }
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Password"
                value={value}
                placeholder="Enter your password"
                onChangeText={onChange}
                rightIcon={
                  <Icon
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={24}
                    color={theme.colors.textSecondary}
                    onPress={togglePasswordVisibility}
                  />
                }
                secureTextEntry={!showPassword}
                error={errors.password?.message}
              />
            )}
          />
        </Box>

        <Flex flex={0} align="flex-end">
          <Link href="/auth/login">
            <Typography variant="error">Forgot password?</Typography>
          </Link>
        </Flex>

        <Flex flex={0} direction="row" justify="space-between" align="center">
          <Typography variant="body2">Remember me</Typography>
          <Controller
            control={control}
            name="rememberMe"
            render={({ field: { onChange, value } }) => (
              <Switch value={value} onValueChange={onChange} />
            )}
          />
        </Flex>
      </Box>

      <Box gap="xl">
        <Typography variant="body2" color="textSecondary" center>
          By connecting your account confirm that you agree with our{' '}
          <Link href="/auth/login">
            <Typography variant="link">Terms and Conditions</Typography>
          </Link>
        </Typography>

        <Button
          variant="primary"
          onPress={handleSubmit(handleFormSubmit)}
          loading={isLoading}>
          Login
        </Button>
      </Box>
    </Box>
  )
}
