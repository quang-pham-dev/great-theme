import { useMemo } from 'react'

import { useTheme } from '@/hooks/useTheme'

import type { Theme } from '@/theme/theme'

type VariantFunction<T> = (theme: Theme) => T
type Variants<T> = {
  [key: string]: VariantFunction<T>
  default: VariantFunction<T>
}

export function useThemeVariant<T>(
  variants: Variants<T>,
  variant: keyof typeof variants,
): T {
  const { theme } = useTheme()

  return useMemo(() => {
    const variantFn = variants[variant] || variants.default
    return variantFn(theme)
  }, [variant, variants, theme])
}

// Usage example:
/*
const buttonVariants = {
  primary: (theme: Theme) => ({
    backgroundColor: theme.colors.primary,
    color: theme.colors.textInverse,
  }),
  secondary: (theme: Theme) => ({
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
  }),
  default: (theme: Theme) => ({
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
  }),
}

// In your component:
const styles = useThemeVariant(buttonVariants, 'primary')
*/
