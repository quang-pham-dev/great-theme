import { useStyleUtils } from '@/hooks/useStyleUtils'

import { Box } from './Box'

import type { FlexStyle, ViewProps, ViewStyle } from 'react-native'

/**
 * Props interface for the Flex component
 * Extends BoxProps with flexible layout options
 */
export interface FlexProps extends ViewProps {
  /**
   * Flex direction - determines the main axis of layout
   * @default 'column'
   */
  direction?: FlexStyle['flexDirection']

  /**
   * Flex wrap - controls how items wrap when there's not enough space
   * @default 'nowrap'
   */
  wrap?: FlexStyle['flexWrap']

  /**
   * Flex basis - sets the initial main size of a flex item
   * @see https://reactnative.dev/docs/layout-props#flexbasis
   */
  basis?: FlexStyle['flexBasis']

  /**
   * Flex grow - determines how much the item will grow relative to other items
   * @see https://reactnative.dev/docs/layout-props#flexgrow
   */
  grow?: FlexStyle['flexGrow']

  /**
   * Flex shrink - determines how much the item will shrink relative to other items
   * @see https://reactnative.dev/docs/layout-props#flexshrink
   */
  shrink?: FlexStyle['flexShrink']

  /**
   * Align items - controls alignment along the cross axis
   * @default 'stretch'
   * @see https://reactnative.dev/docs/layout-props#alignitems
   */
  align?: FlexStyle['alignItems']

  /**
   * Justify content - controls alignment along the main axis
   * @default 'flex-start'
   * @see https://reactnative.dev/docs/layout-props#justifycontent
   */
  justify?: FlexStyle['justifyContent']

  /**
   * Gap between items (shorthand for both row and column gap)
   * @default 0
   */
  gap?: number

  /**
   * Gap between rows
   * @see https://reactnative.dev/docs/layout-props#rowgap
   */
  rowGap?: number

  /**
   * Gap between columns
   * @see https://reactnative.dev/docs/layout-props#columngap
   */
  columnGap?: number

  /**
   * Flex value (shorthand for flex: n)
   * Combines grow, shrink, and basis into a single value
   * @see https://reactnative.dev/docs/layout-props#flex
   */
  flex?: number
}

/**
 * Flex Component
 *
 * A flexible layout component that extends Box with additional flex layout capabilities.
 * Provides a convenient API for creating flex containers with various alignment and spacing options.
 *
 * @example
 * ```tsx
 * Basic row layout
 * <Flex direction="row" gap={8}>
 *   <View />
 *   <View />
 * </Flex>
 *
 * Centered content with wrapping
 * <Flex
 *   align="center"
 *   justify="center"
 *   wrap="wrap"
 *   gap={16}
 * >
 *   <View />
 *   <View />
 * </Flex>
 * ```
 */
export function Flex({
  style,
  direction = 'column',
  wrap = 'nowrap',
  basis,
  grow,
  shrink,
  align = 'stretch',
  justify = 'flex-start',
  gap = 0,
  rowGap,
  columnGap,
  flex = 1,
  ...props
}: FlexProps): JSX.Element {
  const styleUtils = useStyleUtils()

  /**
   * Hook for creating Flex styles with theme integration
   * Uses the theme system to generate consistent styling
   */
  const styles = styleUtils.createThemedStyle(() => ({
    base: {
      display: 'flex',
    },
  }))

  /**
   * Combines all flex-related styles into a single style object
   */
  const flexStyle: ViewStyle = {
    flexDirection: direction,
    flexWrap: wrap,
    flexBasis: basis,
    flexGrow: grow,
    flexShrink: shrink,
    alignItems: align,
    justifyContent: justify,
    gap,
    rowGap,
    columnGap,
    flex,
  }

  return <Box style={[styles.base, flexStyle, style]} {...props} />
}
