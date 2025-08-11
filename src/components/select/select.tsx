'use client';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as Lucide from 'lucide-react';
import * as React from 'react';
import { selectStyles } from './select.css';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

// Initialize styles once outside of components to prevent re-renders
const styles = selectStyles();

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    icon?: React.ReactNode;
  }
>(({ className, children, icon, ...props }, ref) => {
  const triggerClassName = React.useMemo(() => styles.trigger({ className }), [className]);

  const iconClassName = React.useMemo(() => styles.icon(), []);

  return (
    <SelectPrimitive.Trigger ref={ref} className={triggerClassName} {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        {icon || <Lucide.ChevronsUpDown className={iconClassName} strokeWidth={2} />}
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => {
  const scrollButtonClassName = React.useMemo(
    () => styles.scrollButton({ className }),
    [className]
  );

  return (
    <SelectPrimitive.ScrollUpButton ref={ref} className={scrollButtonClassName} {...props}>
      <Lucide.ChevronUp strokeWidth={2} />
    </SelectPrimitive.ScrollUpButton>
  );
});

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => {
  const scrollButtonClassName = React.useMemo(
    () => styles.scrollButton({ className }),
    [className]
  );

  return (
    <SelectPrimitive.ScrollDownButton ref={ref} className={scrollButtonClassName} {...props}>
      <Lucide.ChevronDown strokeWidth={2} />
    </SelectPrimitive.ScrollDownButton>
  );
});

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => {
  const contentClassName = React.useMemo(() => styles.content({ className }), [className]);

  const viewportClassName = React.useMemo(
    () => (position === 'popper' ? styles.viewportPopper() : styles.viewport()),
    [position]
  );

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={contentClassName}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className={viewportClassName}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => {
  const labelClassName = React.useMemo(() => styles.label({ className }), [className]);

  return <SelectPrimitive.Label ref={ref} className={labelClassName} {...props} />;
});

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  const itemClassName = React.useMemo(() => styles.item({ className }), [className]);

  return (
    <SelectPrimitive.Item ref={ref} className={itemClassName} {...props}>
      <SelectPrimitive.ItemIndicator className={styles.itemIndicator()}>
        <Lucide.Check className={styles.itemIndicatorIcon()} strokeWidth={2} />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => {
  const separatorClassName = React.useMemo(() => styles.separator({ className }), [className]);

  return <SelectPrimitive.Separator ref={ref} className={separatorClassName} {...props} />;
});

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
