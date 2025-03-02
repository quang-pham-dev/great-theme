import {
  type Animated,
  type FlexAlignType,
  type StyleProp,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native'

import { useStyleUtils } from '@/hooks/useStyleUtils'
import { useTheme } from '@/hooks/useTheme'

import type { Theme } from '@/theme/theme'

/**
 * Type for spacing properties that can be applied to the Box
 * Uses theme spacing values for consistent layout
 */
type SpacingKeys = keyof Theme['spacing']
type GapKeys = keyof Theme['gap']

/**
 * Type for all possible spacing style properties
 * @internal
 */
type SpacingStyle = {
  padding?: number
  paddingHorizontal?: number
  paddingVertical?: number
  paddingTop?: number
  paddingRight?: number
  paddingBottom?: number
  paddingLeft?: number
  margin?: number
  marginHorizontal?: number
  marginVertical?: number
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
  gap?: number
  columnGap?: number
  rowGap?: number
}

/**
 * Type for alignment style properties
 * @internal
 */
type AlignmentStyle = {
  alignItems?: FlexAlignType
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined
}

export type DimensionValue =
  | number
  | 'auto'
  | `${number}%`
  | Animated.AnimatedNode
  | null

/**
 * Props interface for the Box component
 * Extends ViewProps with additional theme-aware styling options
 */
export interface BoxProps extends ViewProps {
  /** Padding for all sides */
  p?: SpacingKeys
  /** Padding horizontal */
  px?: SpacingKeys
  /** Padding vertical */
  py?: SpacingKeys
  /** Padding top */
  pt?: SpacingKeys
  /** Padding right */
  pr?: SpacingKeys
  /** Padding bottom */
  pb?: SpacingKeys
  /** Padding left */
  pl?: SpacingKeys
  /** Margin for all sides */
  m?: SpacingKeys
  /** Margin horizontal */
  mx?: SpacingKeys
  /** Margin vertical */
  my?: SpacingKeys
  /** Margin top */
  mt?: SpacingKeys
  /** Margin right */
  mr?: SpacingKeys
  /** Margin bottom */
  mb?: SpacingKeys
  /** Margin left */
  ml?: SpacingKeys
  /** Border radius from theme */
  borderRadius?: keyof Theme['borderRadius']
  /** Background color from theme */
  bg?: keyof Theme['colors']
  /** Width of the box */
  width?: ViewStyle['width']
  /** Height of the box */
  height?: ViewStyle['height']
  /** Max Width of the box */
  maxWidth?: ViewStyle['maxWidth']
  /** Max Height of the box */
  maxHeight?: ViewStyle['maxHeight']
  /** min Width of the box */
  minWidth?: ViewStyle['minWidth']
  /** min Height of the box */
  minHeight?: ViewStyle['minHeight']
  /** Center items horizontally */
  centerX?: boolean
  /** Center items vertically */
  centerY?: boolean
  /** Center items both horizontally and vertically */
  center?: boolean
  /** Opacity of the box */
  opacity?: number
  /** Gap between children */
  gap?: GapKeys
  /** Horizontal gap between children */
  columnGap?: GapKeys
  /** Vertical gap between children */
  rowGap?: GapKeys
  /** Flex value */
  flex?: 0 | 1 | 2 | 3 | 4 | 5
  /** Flex direction */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  /** Justify content */
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  /** Align items */
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  /** Align self */
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline'
  /** Flex wrap */
  wrap?: boolean
  /** Flex grow */
  grow?: 0 | 1 | 2 | 3 | 4
  /** Flex shrink */
  shrink?: 0 | 1 | 2
  /** Flex basis */
  basis?: DimensionValue
  onPress?: () => void
  /**
   * Container style for the image wrapper
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Box Component
 *
 * A foundational layout component that provides theme-aware spacing, alignment, and styling.
 * Uses the theme system for consistent spacing and colors across the application.
 *
 * @example
 * ```tsx
 * Basic usage
 * <Box p="md" bg="surface">
 *   <Text>Content</Text>
 * </Box>
 *
 * With multiple props
 * <Box
 *   px="lg"
 *   py="md"
 *   bg="primary"
 *   borderRadius="lg"
 *   center
 * >
 *   <Text>Centered Content</Text>
 * </Box>
 * ```
 */
export function Box({
  style,
  flex,
  direction,
  justify,
  align,
  alignSelf,
  wrap,
  grow,
  shrink,
  basis,
  gap,
  columnGap,
  rowGap,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  borderRadius,
  bg,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  centerX,
  centerY,
  center,
  ...props
}: BoxProps): JSX.Element {
  const { theme } = useTheme()
  const styleUtils = useStyleUtils()

  /**
   * Generates spacing styles based on provided props
   * @returns {SpacingStyle} Combined spacing styles
   */
  const getSpacingStyle = (): SpacingStyle => ({
    padding: p !== undefined ? theme.spacing[p] : undefined,
    paddingHorizontal: px !== undefined ? theme.spacing[px] : undefined,
    paddingVertical: py !== undefined ? theme.spacing[py] : undefined,
    paddingTop: pt !== undefined ? theme.spacing[pt] : undefined,
    paddingRight: pr !== undefined ? theme.spacing[pr] : undefined,
    paddingBottom: pb !== undefined ? theme.spacing[pb] : undefined,
    paddingLeft: pl !== undefined ? theme.spacing[pl] : undefined,
    margin: m !== undefined ? theme.spacing[m] : undefined,
    marginHorizontal: mx !== undefined ? theme.spacing[mx] : undefined,
    marginVertical: my !== undefined ? theme.spacing[my] : undefined,
    marginTop: mt !== undefined ? theme.spacing[mt] : undefined,
    marginRight: mr !== undefined ? theme.spacing[mr] : undefined,
    marginBottom: mb !== undefined ? theme.spacing[mb] : undefined,
    marginLeft: ml !== undefined ? theme.spacing[ml] : undefined,
    gap: gap !== undefined ? theme.gap[gap] : undefined,
    columnGap: columnGap !== undefined ? theme.gap[columnGap] : undefined,
    rowGap: rowGap !== undefined ? theme.gap[rowGap] : undefined,
  })

  /**
   * Generates alignment styles based on provided props
   * @returns {AlignmentStyle} Combined alignment styles
   */
  const getAlignmentStyle = (): AlignmentStyle => {
    if (center) {
      return {
        alignItems: 'center',
        justifyContent: 'center',
      }
    }

    return {
      alignItems: align || (centerX ? 'center' : undefined),
      justifyContent: justify || (centerY ? 'center' : undefined),
    }
  }

  /**
   * Generates flex styles based on provided props
   */
  const getFlexStyle = (): ViewStyle => ({
    flex: flex,
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : undefined,
    flexGrow: grow,
    flexShrink: shrink,
    flexBasis: basis,
    alignSelf: alignSelf,
  })

  /**
   * Hook for creating Box styles
   * Uses the theme system to generate consistent styling
   */
  const styles = styleUtils.createThemedStyle(() => ({
    base: {
      flexDirection: 'column',
    },
  }))

  return (
    <View
      style={[
        styles.base,
        getSpacingStyle(),
        getFlexStyle(),
        getAlignmentStyle(),
        {
          borderRadius: borderRadius
            ? theme.borderRadius[borderRadius]
            : undefined,
          backgroundColor: bg ? theme.colors[bg] : undefined, // Fix: Add backgroundColor directly
          width,
          height,
          minWidth,
          minHeight,
          maxWidth,
          maxHeight,
        } as ViewStyle,
        style,
      ]}
      {...props}
    />
  )
}
