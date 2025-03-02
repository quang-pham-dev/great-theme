import { useCallback } from 'react'

import { Box } from '@/components/common/Box'
import { IconButton } from '@/components/common/IconButton'
import { Input } from '@/components/common/Input'
import { useTheme } from '@/hooks/useTheme'

import { Icon } from '../common/Icon'

import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputProps,
} from 'react-native'

interface SearchBarProps extends Omit<TextInputProps, 'onChange'> {
  onSearch?: (text: string) => void
  onVoicePress?: () => void
}

export function SearchBar({
  onSearch,
  onVoicePress,
  ...inputProps
}: SearchBarProps) {
  const { theme } = useTheme()

  const handleChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onSearch?.(e.nativeEvent.text)
    },
    [onSearch],
  )

  return (
    <Box direction="row" my="lg" center gap="lg">
      <Box
        flex={1}
        direction="row"
        center
        bg="surfaceHover"
        borderRadius="md"
        px="md"
        height={theme.spacing.xxxl}>
        <Icon name="search" size={20} color={theme.colors.textSecondary} />
        <Input
          containerStyle={{ height: 'auto' }}
          variant="filled"
          placeholder="Search..."
          placeholderTextColor={theme.colors.textSecondary}
          onChange={handleChange}
          {...inputProps}
        />
      </Box>
      <IconButton
        variant="primary"
        size="large"
        borderRadius="lg"
        name="mic"
        onPress={onVoicePress}
      />
    </Box>
  )
}
