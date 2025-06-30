import * as React from 'react';
import type { SkeletonVariants } from './skeleton.css';
import { skeletonStyles } from './skeleton.css';

export type SkeletonProps = {} & React.ComponentPropsWithoutRef<'div'> & SkeletonVariants;

const Skeleton = ({
  ref,
  className,
  ...props
}: SkeletonProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return <div ref={ref} className={skeletonStyles({ className })} {...props} />;
};

Skeleton.displayName = 'Skeleton';

export { Skeleton };
