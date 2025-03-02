import { Box } from '@/components/common/Box'
import { Image } from '@/components/common/Image'

interface HeaderBrandLogoProps {
  url?: string
}

export function HeaderBrandLogo({ url }: HeaderBrandLogoProps) {
  return (
    <Box
      width={80}
      height={45}
      center
      px="md"
      py="sm"
      bg="surfaceHover"
      borderRadius="lg">
      <Image
        source={{ uri: url }}
        alt="Brand Logo"
        style={{
          width: '100%',
          height: '100%',
          maxHeight: 40,
          maxWidth: 60,
        }}
        contentFit="contain"
        fallbackText="Logo"
        transition={300}
      />
    </Box>
  )
}
