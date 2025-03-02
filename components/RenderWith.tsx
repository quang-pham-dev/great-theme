import type { PropsWithChildren } from 'react'

interface RenderWithProps extends PropsWithChildren {
  isTrue?: boolean
}

export default function RenderWith({
  children,
  isTrue = true,
}: RenderWithProps) {
  return isTrue ? children : null
}
