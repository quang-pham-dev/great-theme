import React, { useCallback, useMemo, useState } from 'react'

import { Typography, type TypographyVariant } from './Typography'

import type { Theme } from '@/theme/theme'

interface ReadMoreProps {
  text: string
  maxLength?: number
  textVariant?: TypographyVariant
  textColor?: keyof Theme['colors']
  readMoreLabel?: string
  readLessLabel?: string
  readMoreColor?: keyof Theme['colors']
}

const ReadMoreText = React.memo(
  ({
    text,
    variant,
    color,
  }: {
    text: string
    isExpanded: boolean
    variant: TypographyVariant
    color: keyof Theme['colors']
  }) => (
    <Typography variant={variant} color={color}>
      {text}
    </Typography>
  ),
)

const ToggleButton = React.memo(
  ({
    onPress,
    label,
    variant,
    color,
  }: {
    onPress: () => void
    isExpanded: boolean
    label: string
    variant: TypographyVariant
    color: keyof Theme['colors']
  }) => (
    <Typography
      variant={variant}
      color={color}
      weight="medium"
      onPress={onPress}>
      {label}
    </Typography>
  ),
)

export const ReadMore = React.memo(
  ({
    text,
    maxLength = 150,
    textVariant = 'body2',
    textColor = 'textSecondary',
    readMoreLabel = 'Read More ...',
    readLessLabel = 'Read Less...',
    readMoreColor = 'text',
  }: ReadMoreProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleReadMore = useCallback(() => {
      setIsExpanded(prev => !prev)
    }, [])

    const { displayText, shouldShowReadMore } = useMemo(
      () => ({
        displayText: isExpanded ? text : text.slice(0, maxLength),
        shouldShowReadMore: text.length > maxLength,
      }),
      [text, maxLength, isExpanded],
    )

    const toggleLabel = useMemo(
      () => (isExpanded ? readLessLabel : readMoreLabel),
      [isExpanded, readLessLabel, readMoreLabel],
    )

    if (!shouldShowReadMore) {
      return (
        <ReadMoreText
          text={text}
          isExpanded={isExpanded}
          variant={textVariant}
          color={textColor}
        />
      )
    }

    return (
      <Typography variant={textVariant} color={textColor}>
        {displayText} {!isExpanded}
        <ToggleButton
          onPress={toggleReadMore}
          isExpanded={isExpanded}
          label={toggleLabel}
          variant={textVariant}
          color={readMoreColor}
        />
      </Typography>
    )
  },
)

ReadMore.displayName = 'ReadMore'
ReadMoreText.displayName = 'ReadMoreText'
ToggleButton.displayName = 'ToggleButton'
