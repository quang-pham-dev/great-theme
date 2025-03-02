import {
  Button,
  type ChildrenButtonProps,
  type TitleButtonProps,
} from '@/components/common/Button'
import { useStyleUtils } from '@/hooks/useStyleUtils'

import type { Theme } from '@/theme/theme'

type BaseSocialAuthProps = {
  provider: 'facebook' | 'twitter' | 'google'
}

type SocialAuthTitleProps = BaseSocialAuthProps &
  Omit<TitleButtonProps, keyof BaseSocialAuthProps>
type SocialAuthChildrenProps = BaseSocialAuthProps &
  Omit<ChildrenButtonProps, keyof BaseSocialAuthProps>

type SocialAuthButtonProps = SocialAuthTitleProps | SocialAuthChildrenProps

const PROVIDER_COLORS = {
  facebook: '#4267B2',
  twitter: '#1DA1F2',
  google: '#DB4437',
}

export function SocialAuthButton({
  provider,
  ...props
}: SocialAuthButtonProps) {
  const styleUtils = useStyleUtils()

  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    button: {
      width: '100%',
      height: 56,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: PROVIDER_COLORS[provider],
      borderWidth: 0,
    },
    text: {
      color: theme.colors.textInverse,
    },
  }))

  return (
    <Button
      variant="outline"
      style={styles.button}
      textStyle={styles.text}
      {...props}
    />
  )
}
