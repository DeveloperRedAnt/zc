'use client';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as Lucide from 'lucide-react';
import * as React from 'react';
import { selectStyles } from './select.css';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = ({
  ref,
  className,
  children,
  icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
  ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.Trigger> | null>;
  icon?: React.ReactNode;
}) => {
  const styles = selectStyles();

  const DefaultIcon = <Lucide.ChevronsUpDown className={styles.icon()} strokeWidth={2} />;

  return (
    <SelectPrimitive.Trigger ref={ref} className={styles.trigger({ className })} {...props}>
      {children}
      <SelectPrimitive.Icon asChild>{icon ?? DefaultIcon}</SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

const SelectScrollUpButton = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> & {
  ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.ScrollUpButton> | null>;
}) => {
  const styles = selectStyles();
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={styles.scrollButton({ className })}
      {...props}
    >
      <Lucide.ChevronUp strokeWidth={2} />
    </SelectPrimitive.ScrollUpButton>
  );
};

const SelectScrollDownButton = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> & {
  ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.ScrollDownButton> | null>;
}) => {
  const styles = selectStyles();
  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={styles.scrollButton({ className })}
      {...props}
    >
      <Lucide.ChevronDown strokeWidth={2} />
    </SelectPrimitive.ScrollDownButton>
  );
};

const SelectContent = ({
  ref,
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
  ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.Content> | null>;
}) => {
  const styles = selectStyles();
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={styles.content({ className })}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={position === 'popper' ? styles.viewportPopper() : styles.viewport()}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

const SelectLabel = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & {
  ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.Label> | null>;
}) => {
  const styles = selectStyles();
  return <SelectPrimitive.Label ref={ref} className={styles.label({ className })} {...props} />;
};

const SelectItem = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
  ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.Item> | null>;
}) => {
  const styles = selectStyles();
  return (
    <SelectPrimitive.Item ref={ref} className={styles.item({ className })} {...props}>
      <SelectPrimitive.ItemIndicator className={styles.itemIndicator()}>
        <Lucide.Check className={styles.itemIndicatorIcon()} strokeWidth={2} />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

const SelectSeparator = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & {
  ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.Separator> | null>;
}) => {
  const styles = selectStyles();
  return (
    <SelectPrimitive.Separator ref={ref} className={styles.separator({ className })} {...props} />
  );
};

Select.displayName = SelectPrimitive.Root.displayName;
SelectGroup.displayName = SelectPrimitive.Group.displayName;
SelectValue.displayName = SelectPrimitive.Value.displayName;
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
SelectContent.displayName = SelectPrimitive.Content.displayName;
SelectLabel.displayName = SelectPrimitive.Label.displayName;
SelectItem.displayName = SelectPrimitive.Item.displayName;
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
