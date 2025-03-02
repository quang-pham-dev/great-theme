import { type AVPlaybackStatus, ResizeMode, Video } from 'expo-av'
import { useEffect, useRef, useState } from 'react'
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native'

import { useStyleUtils } from '@/hooks/useStyleUtils'
import { useTheme } from '@/hooks/useTheme'

import { Icon } from '../common/Icon'
import { Typography } from '../common/Typography'

import type { Theme } from '@/theme/theme'

/**
 * Props for the VideoPlayer component
 */
export interface VideoPlayerProps extends ViewProps {
  /**
   * URI of the video to play
   */
  source: string

  /**
   * Whether to autoplay the video
   * @default false
   */
  autoplay?: boolean

  /**
   * Whether to loop the video
   * @default false
   */
  loop?: boolean

  /**
   * Whether to show controls
   * @default true
   */
  showControls?: boolean

  /**
   * Whether to mute the video
   * @default false
   */
  muted?: boolean

  /**
   * Poster image to show before video loads
   */
  poster?: string

  /**
   * Additional style for the container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * Callback when video playback ends
   */
  onEnd?: () => void
}

/**
 * Format time in seconds to mm:ss
 */
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * VideoPlayer Component
 *
 * A customizable video player component with controls and progress tracking.
 *
 * @example
 * ```tsx
 * Basic usage
 * <VideoPlayer source="https://example.com/video.mp4" />
 *
 * With autoplay and loop
 * <VideoPlayer
 *   source="https://example.com/video.mp4"
 *   autoplay
 *   loop
 * />
 *
 * With poster image
 * <VideoPlayer
 *   source="https://example.com/video.mp4"
 *   poster="https://example.com/poster.jpg"
 * />
 * ```
 */
export function VideoPlayer({
  source,
  autoplay = false,
  loop = false,
  showControls = true,
  muted = false,
  poster,
  style,
  containerStyle,
  onEnd,
  ...props
}: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<Video>(null)
  const { theme } = useTheme()
  const styleUtils = useStyleUtils()

  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [duration, setDuration] = useState(0)
  const [position, setPosition] = useState(0)
  const [showingControls, setShowingControls] = useState(true)
  const controlsTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current)
      }
    }
  }, [])

  const hideControlsWithDelay = () => {
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current)
    }
    controlsTimeout.current = setTimeout(() => {
      setShowingControls(false)
    }, 3000)
  }

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis ? status.durationMillis / 1000 : 0)
      setPosition(status.positionMillis / 1000)

      if (status.didJustFinish && !loop) {
        setIsPlaying(false)
        onEnd?.()
      }
    }
  }

  const togglePlayPause = async () => {
    if (!videoRef.current) return

    if (isPlaying) {
      await videoRef.current.pauseAsync()
    } else {
      await videoRef.current.playAsync()
    }
    setIsPlaying(!isPlaying)
    hideControlsWithDelay()
  }

  const handleVideoPress = () => {
    setShowingControls(true)
    hideControlsWithDelay()
  }

  const styles = styleUtils.createThemedStyle((theme: Theme) => ({
    container: {
      width: '100%',
      aspectRatio: 16 / 9,
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      overflow: 'hidden',
    },
    video: {
      flex: 1,
    },
    controls: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'center',
      alignItems: 'center',
    },
    controlsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.md,
    },
    progressContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: theme.spacing.sm,
    },
    progressBar: {
      height: 3,
      backgroundColor: theme.colors.surface,
      borderRadius: 1.5,
    },
    progressIndicator: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      backgroundColor: theme.colors.primary,
      borderRadius: 1.5,
    },
    timeText: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  }))

  return (
    <View style={[styles.container, containerStyle, style]} {...props}>
      <Video
        ref={videoRef}
        source={{ uri: source }}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        isLooping={loop}
        isMuted={muted}
        posterSource={poster ? { uri: poster } : undefined}
        usePoster={!!poster}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />

      <Pressable onPress={handleVideoPress} style={StyleSheet.absoluteFill}>
        {showControls && showingControls && (
          <View style={styles.controls}>
            <Pressable onPress={togglePlayPause} hitSlop={20}>
              <Icon
                name={isPlaying ? 'pause' : 'play'}
                size={48}
                color={theme.colors.surface}
              />
            </Pressable>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressIndicator,
                    { width: `${(position / duration) * 100}%` },
                  ]}
                />
              </View>
              <Typography
                variant="caption"
                style={styles.timeText}
                color="surface">
                {`${formatTime(position)} / ${formatTime(duration)}`}
              </Typography>
            </View>
          </View>
        )}
      </Pressable>
    </View>
  )
}
