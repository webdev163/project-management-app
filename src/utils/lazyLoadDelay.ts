import { ComponentType, lazy } from 'react';

export const lazyLoadDelay = <T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
  minLoadTimeMs = 1000,
) =>
  lazy(() =>
    Promise.all([factory(), new Promise(resolve => setTimeout(resolve, minLoadTimeMs))]).then(
      ([moduleExports]) => moduleExports,
    ),
  );
