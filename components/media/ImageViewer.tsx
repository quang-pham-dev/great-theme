import { useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  type ImageSourcePropType,
  type LayoutChangeEvent,
  Modal,
  PanResponder,
  Pressable,
  View,
  type ViewProps,
} from 'react-native'

import { useTheme } from '@/hooks/useTheme'
import { createComponentStyles } from '@/theme/styles'

import { Icon } from '../common/Icon'

import type { Theme } from '@/theme/theme'

const SCREEN = Dimensions.get('window')
const MIN_SCALE = 1
const MAX_SCALE = 3

/**
 * Props for the ImageViewer component
 */
export interface ImageViewerProps extends ViewProps {
  /**
   * Image source to display
   */
  source: ImageSourcePropType

  /**
   * Whether the viewer is visible
   */
  visible: boolean

  /**
   * Callback when the viewer is closed
   */
  onClose: () => void

  /**
   * Initial scale of the image
   * @default 1
   */
  initialScale?: number

  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean
}

/**
 * Hook for creating image viewer styles with theme integration
 */
const useStyles = createComponentStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    zIndex: 1,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.overlay,
    borderRadius: 999,
  },
}))

/**
 * ImageViewer Component
 *
 * A modal image viewer with zoom and pan capabilities.
 *
 * @example
 * ```tsx
 * const [visible, setVisible] = useState(false);
 *
 * <ImageViewer
 *   source={{ uri: 'https://example.com/image.jpg' }}
 *   visible={visible}
 *   onClose={() => setVisible(false)}
 * />
 * ```
 */
export function ImageViewer({
  source,
  visible,
  initialScale = 1,
  showCloseButton = true,
  style,
  onClose,
  ...props
}: ImageViewerProps): JSX.Element {
  const { theme } = useTheme()
  const styles = useStyles(theme)

  const [scale] = useState(new Animated.Value(initialScale))
  const [translateX] = useState(new Animated.Value(0))
  const [translateY] = useState(new Animated.Value(0))
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  const lastTap = useRef(0)
  const lastScale = useRef(initialScale)
  const lastTranslateX = useRef(0)
  const lastTranslateY = useRef(0)

  const resetPosition = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: initialScale,
        useNativeDriver: true,
      }),
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start()

    lastScale.current = initialScale
    lastTranslateX.current = 0
    lastTranslateY.current = 0
  }

  const handleDoubleTap = () => {
    const now = Date.now()
    const DOUBLE_TAP_THRESHOLD = 300

    if (now - lastTap.current < DOUBLE_TAP_THRESHOLD) {
      if (lastScale.current > MIN_SCALE) {
        resetPosition()
      } else {
        Animated.spring(scale, {
          toValue: MAX_SCALE,
          useNativeDriver: true,
        }).start()
        lastScale.current = MAX_SCALE
      }
    }
    lastTap.current = now
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState
        return Math.abs(dx) > 2 || Math.abs(dy) > 2
      },
      onPanResponderGrant: () => {
        translateX.setOffset(lastTranslateX.current)
        translateY.setOffset(lastTranslateY.current)
        translateX.setValue(0)
        translateY.setValue(0)
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: translateX,
            dy: translateY,
          },
        ],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: (_, gestureState) => {
        translateX.flattenOffset()
        translateY.flattenOffset()

        const { dx, dy, vy } = gestureState
        lastTranslateX.current += dx
        lastTranslateY.current += dy

        if (Math.abs(vy) > 0.5) {
          onClose()
          resetPosition()
        } else {
          const maxTranslateX =
            (imageSize.width * lastScale.current - SCREEN.width) / 2
          const maxTranslateY =
            (imageSize.height * lastScale.current - SCREEN.height) / 2

          if (Math.abs(lastTranslateX.current) > maxTranslateX) {
            lastTranslateX.current =
              Math.sign(lastTranslateX.current) * maxTranslateX
          }
          if (Math.abs(lastTranslateY.current) > maxTranslateY) {
            lastTranslateY.current =
              Math.sign(lastTranslateY.current) * maxTranslateY
          }

          Animated.parallel([
            Animated.spring(translateX, {
              toValue: lastTranslateX.current,
              useNativeDriver: true,
            }),
            Animated.spring(translateY, {
              toValue: lastTranslateY.current,
              useNativeDriver: true,
            }),
          ]).start()
        }
      },
    }),
  ).current

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setImageSize({ width, height })
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={[styles.container, style]} {...props}>
        {showCloseButton && (
          <Pressable style={styles.closeButton} onPress={onClose} hitSlop={20}>
            <Icon name="close" size={24} color={theme.colors.surface} />
          </Pressable>
        )}

        <Animated.View
          style={styles.imageContainer}
          {...panResponder.panHandlers}>
          <Pressable onPress={handleDoubleTap}>
            <Animated.Image
              source={source}
              style={[
                styles.image,
                {
                  transform: [{ scale }, { translateX }, { translateY }],
                },
              ]}
              resizeMode="contain"
              onLayout={handleLayout}
            />
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  )
}
