import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import * as React from 'react';
import type { AspectRatioVariants } from './aspect-ratio.css';
import { aspectRatioStyles } from './aspect-ratio.css';

const AspectRatio = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> &
  AspectRatioVariants & {
    ref?: React.RefObject<React.ComponentRef<typeof AspectRatioPrimitive.Root> | null>;
  }) => {
  return (
    <AspectRatioPrimitive.Root ref={ref} className={aspectRatioStyles({ className })} {...props} />
  );
};

AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
