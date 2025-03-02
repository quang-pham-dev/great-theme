import type { ComponentType, PropsWithChildren, ReactNode } from 'react'

type ComposeProvidersProps = PropsWithChildren & {
  components: ComponentType<PropsWithChildren>[]
}

export function ComposeProviders(props: ComposeProvidersProps): ReactNode {
  return props.components.reduceRight(
    (memo, Component, index) => (
      <Component key={`compose-provider-${index.toString()}`}>{memo}</Component>
    ),
    props.children,
  )
}

ComposeProviders.displayName = 'ComposeProviders'
