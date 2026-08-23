import React, { type ComponentType, type ReactNode } from 'react';

type ProviderComponent = ComponentType<{ children: ReactNode }>;

export function composeProviders(
  providers: ProviderComponent[],
): ProviderComponent {
  return function ComposedProviders({ children }: { children: ReactNode }) {
    return providers.reduceRight<ReactNode>(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children,
    );
  };
}
