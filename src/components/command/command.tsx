import type { DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import * as Lucide from 'lucide-react';
import * as React from 'react';
import { Dialog, DialogContent } from '../dialog/dialog';
import { ScrollArea } from '../scroll-area/scroll-area';
import { commandStyles } from './command.css';

const Command = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
  ref?: React.RefObject<React.ComponentRef<typeof CommandPrimitive> | null>;
}) => {
  const styles = commandStyles();
  return <CommandPrimitive ref={ref} className={styles.root({ className })} {...props} />;
};

const CommandDialog = ({ children, ...props }: DialogProps) => {
  const styles = commandStyles();
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className={styles.dialog()}>{children}</Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
  ref?: React.RefObject<React.ComponentRef<typeof CommandPrimitive.Input> | null>;
}) => {
  const styles = commandStyles();
  return (
    <div className={styles.inputWrapper()} cmdk-input-wrapper="">
      <Lucide.Search className={styles.searchIcon()} strokeWidth={2} />
      <CommandPrimitive.Input ref={ref} className={styles.input({ className })} {...props} />
    </div>
  );
};

const CommandList = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> & {
  ref?: React.RefObject<React.ComponentRef<typeof CommandPrimitive.List> | null>;
}) => {
  const styles = commandStyles();
  return (
    <ScrollArea className={styles.list({ className })}>
      <CommandPrimitive.List className={styles.listInner()} ref={ref} {...props} />
    </ScrollArea>
  );
};

const CommandEmpty = ({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> & {
  ref?: React.RefObject<React.ComponentRef<typeof CommandPrimitive.Empty> | null>;
}) => {
  const styles = commandStyles();
  return <CommandPrimitive.Empty ref={ref} className={styles.empty()} {...props} />;
};

const CommandGroup = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> & {
  ref?: React.RefObject<React.ComponentRef<typeof CommandPrimitive.Group> | null>;
}) => {
  const styles = commandStyles();
  return <CommandPrimitive.Group ref={ref} className={styles.group({ className })} {...props} />;
};

const CommandSeparator = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> & {
  ref?: React.RefObject<React.ComponentRef<typeof CommandPrimitive.Separator> | null>;
}) => {
  const styles = commandStyles();
  return (
    <CommandPrimitive.Separator ref={ref} className={styles.separator({ className })} {...props} />
  );
};

const CommandItem = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
  ref?: React.RefObject<React.ComponentRef<typeof CommandPrimitive.Item> | null>;
}) => {
  const styles = commandStyles();
  return <CommandPrimitive.Item ref={ref} className={styles.item({ className })} {...props} />;
};

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  const styles = commandStyles();
  return <span className={styles.shortcut({ className })} {...props} />;
};

Command.displayName = CommandPrimitive.displayName;
CommandInput.displayName = CommandPrimitive.Input.displayName;
CommandList.displayName = CommandPrimitive.List.displayName;
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
CommandGroup.displayName = CommandPrimitive.Group.displayName;
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
CommandItem.displayName = CommandPrimitive.Item.displayName;
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
