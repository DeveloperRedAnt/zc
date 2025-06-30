import { Slot } from 'radix-ui';
import * as React from 'react';
import type { HeadingVariants } from './heading.css';
import { headingStyles } from './heading.css';

export type HeadingProps = {
  asChild?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement> &
  HeadingVariants;

const Heading = ({
  ref,
  className,
  level,
  weight,
  align,
  asChild = false,
  ...props
}: HeadingProps & { ref?: React.RefObject<HTMLHeadingElement | null> }) => {
  const Comp = asChild ? Slot.Root : 'h2';
  return (
    <Comp ref={ref} className={headingStyles({ level, weight, align, className })} {...props} />
  );
};

Heading.displayName = 'Heading';

export { Heading };
