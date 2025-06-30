import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';
import { sliderStyles } from './slider.css';

const Slider = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  ref?: React.RefObject<React.ComponentRef<typeof SliderPrimitive.Root> | null>;
}) => {
  const styles = sliderStyles();
  return (
    <SliderPrimitive.Root ref={ref} className={styles.base({ className })} {...props}>
      <SliderPrimitive.Track className={styles.track()}>
        <SliderPrimitive.Range className={styles.range()} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={styles.thumb()} />
    </SliderPrimitive.Root>
  );
};

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
