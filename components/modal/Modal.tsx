import { useCallback, useEffect } from 'react'
import {
  Dimensions,
  type ImageStyle,
  Pressable,
  Modal as RNModal,
  type ModalProps as RNModalProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import Animated, {
  type AnimatedStyle,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type WithSpringConfig,
  withTiming,
  type WithTimingConfig,
} from 'react-native-reanimated'

import { useTheme } from '@/hooks/useTheme'
import { createComponentStyles } from '@/theme/styles'

import type { Theme } from '@/theme/theme'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

// Animation configurations
const SPRING_CONFIG: WithSpringConfig = {
  damping: 20,
  stiffness: 90,
  mass: 1,
}

const TIMING_CONFIG: WithTimingConfig = {
  duration: 200,
}

// Explicit type definitions
type ModalPosition = 'center' | 'bottom'
type ModalAnimation = 'slide' | 'fade' | 'scale'

type DefaultStyle = ViewStyle | ImageStyle | TextStyle

type AnimatedStyleType = {
  opacity?: number
  transform?: {
    scale?: number
    translateY?: number
  }[]
}

interface ModalBaseProps {
  position?: ModalPosition
  animation?: ModalAnimation
  closeOnOverlayPress?: boolean
  contentStyle?: StyleProp<ViewStyle>
  overlayStyle?: StyleProp<ViewStyle>
}

export interface ModalProps
  extends ModalBaseProps,
    Omit<RNModalProps, 'animationType'> {
  visible: boolean
  onRequestClose?: () => void
  children?: React.ReactNode
}

const useStyles = createComponentStyles((theme: Theme) => ({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  } as const,
  content: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    width: '90%',
    maxWidth: 500,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    } as const,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  } as const,
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  } as const,
}))

export function Modal({
  visible,
  onRequestClose,
  position = 'center',
  animation = 'slide',
  closeOnOverlayPress = true,
  children,
  style,
  contentStyle,
  overlayStyle,
  ...props
}: ModalProps): JSX.Element {
  const { theme } = useTheme()
  const styles = useStyles(theme)

  // Animated values with explicit types
  const opacity = useSharedValue<number>(0)
  const scale = useSharedValue<number>(0.8)
  const translateY = useSharedValue<number>(
    position === 'bottom' ? SCREEN_HEIGHT : 0,
  )

  const handleClose = useCallback((): void => {
    onRequestClose?.()
  }, [onRequestClose])

  useEffect((): void => {
    if (visible) {
      opacity.value = withTiming(1, TIMING_CONFIG)
      scale.value = withSpring(1, SPRING_CONFIG)
      translateY.value = withSpring(0, SPRING_CONFIG)
    } else {
      opacity.value = withTiming(0, TIMING_CONFIG)
      scale.value = withSpring(0.8, SPRING_CONFIG)
      translateY.value = withSpring(
        position === 'bottom' ? SCREEN_HEIGHT : 0,
        SPRING_CONFIG,
      )
    }
  }, [visible, position, opacity, scale, translateY])

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  })) as AnimatedStyle<ViewStyle>

  const contentAnimatedStyle = useAnimatedStyle((): DefaultStyle => {
    const style: AnimatedStyleType = {
      opacity: opacity.value,
      transform: [],
    }

    switch (animation) {
      case 'scale':
        style.transform = [{ scale: scale.value }]
        break
      case 'slide':
        style.transform = [{ translateY: translateY.value }]
        break
      case 'fade':
        style.opacity = opacity.value
        break
      default:
        break
    }

    return style as DefaultStyle
  })

  return (
    <RNModal
      transparent
      visible={visible}
      onRequestClose={handleClose}
      {...props}>
      <Animated.View
        style={[styles.overlay, overlayAnimatedStyle, overlayStyle]}>
        <Pressable
          style={{ flex: 1, width: '100%' }}
          onPress={() => {
            if (closeOnOverlayPress) {
              handleClose()
            }
          }}>
          <Animated.View
            style={[
              styles.content,
              position === 'bottom' && styles.bottomContent,
              contentAnimatedStyle as ViewStyle,
              contentStyle,
              style,
            ]}>
            {children}
          </Animated.View>
        </Pressable>
      </Animated.View>
    </RNModal>
  )
}

// Convenience components with explicit types
export const CenterModal = (
  props: Omit<ModalProps, 'position'>,
): JSX.Element => <Modal position="center" {...props} />

export const BottomModal = (
  props: Omit<ModalProps, 'position'>,
): JSX.Element => <Modal position="bottom" {...props} />
