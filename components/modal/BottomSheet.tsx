import BottomSheetCore, {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'
import { useCallback, useEffect, useRef } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'

import { useTheme } from '@/hooks/useTheme'
import { createComponentStyles } from '@/theme/styles'

import type { Theme } from '@/theme/theme'

export interface BottomSheetProps {
  /**
   * Whether the bottom sheet is visible
   */
  visible: boolean

  /**
   * Callback when the bottom sheet is closed
   */
  onClose: () => void

  /**
   * Initial snap point index
   * @default 0
   */
  initialIndex?: number

  /**
   * Snap points array in percentage or points
   * @default ['50%']
   */
  snapPoints?: (string | number)[]

  /**
   * Whether to enable pan gesture
   * @default true
   */
  enablePanGesture?: boolean

  /**
   * Whether to close on backdrop press
   * @default true
   */
  closeOnBackdropPress?: boolean

  /**
   * Additional style for the container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * Additional style for the content
   */
  contentStyle?: StyleProp<ViewStyle>

  /**
   * Children components
   */
  children: React.ReactNode
}

const useStyles = createComponentStyles((theme: Theme) => ({
  container: {
    flex: 1,
  } as const,
  contentContainer: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  } as const,
  handle: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
  } as const,
  backdrop: {
    backgroundColor: theme.colors.overlay,
  } as const,
}))

export function BottomSheet({
  visible,
  onClose,
  initialIndex = 0,
  snapPoints = ['50%'],
  enablePanGesture = true,
  closeOnBackdropPress = true,
  containerStyle,
  contentStyle,
  children,
}: BottomSheetProps): JSX.Element | null {
  const { theme } = useTheme()
  const styles = useStyles(theme)
  const bottomSheetRef = useRef<BottomSheetCore>(null)

  useEffect(() => {
    if (!visible && bottomSheetRef.current) {
      bottomSheetRef.current.close()
    }
  }, [visible])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={closeOnBackdropPress ? 'close' : 'none'}
        style={styles.backdrop}
      />
    ),
    [closeOnBackdropPress, styles.backdrop],
  )

  const handleChange = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose()
      }
    },
    [onClose],
  )

  if (!visible) return null

  return (
    <Portal>
      <View style={[styles.container, containerStyle]}>
        <BottomSheetCore
          ref={bottomSheetRef}
          index={initialIndex}
          snapPoints={snapPoints}
          enablePanDownToClose
          enableHandlePanningGesture={enablePanGesture}
          handleStyle={styles.handle}
          backdropComponent={renderBackdrop}
          onChange={handleChange}
          style={contentStyle}>
          {children}
        </BottomSheetCore>
      </View>
    </Portal>
  )
}

// Convenience components with explicit types
export const StandardBottomSheet = (
  props: Omit<BottomSheetProps, 'snapPoints'>,
): JSX.Element => <BottomSheet snapPoints={['50%']} {...props} />

export const LargeBottomSheet = (
  props: Omit<BottomSheetProps, 'snapPoints'>,
): JSX.Element => <BottomSheet snapPoints={['75%']} {...props} />

export const FullBottomSheet = (
  props: Omit<BottomSheetProps, 'snapPoints'>,
): JSX.Element => <BottomSheet snapPoints={['100%']} {...props} />
