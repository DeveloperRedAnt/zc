import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';
import type { RadioGroupVariants } from './radio-group.css';
import { radioGroupStyles } from './radio-group.css';

export type RadioGroupProps = {} & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> &
  RadioGroupVariants;

const RadioGroup = ({
  ref,
  className,
  orientation,
  ...props
}: RadioGroupProps & {
  ref?: React.RefObject<React.ComponentRef<typeof RadioGroupPrimitive.Root> | null>;
}) => {
  const styles = radioGroupStyles({ orientation });
  return <RadioGroupPrimitive.Root className={styles.root({ className })} {...props} ref={ref} />;
};

const RadioGroupItem = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
  ref?: React.RefObject<React.ComponentRef<typeof RadioGroupPrimitive.Item> | null>;
}) => {
  const styles = radioGroupStyles();
  return (
    <RadioGroupPrimitive.Item ref={ref} className={styles.item({ className })} {...props}>
      <RadioGroupPrimitive.Indicator className={styles.indicator()}>
        <div className="w-2 h-2 rounded-full bg-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
};

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
