'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/alert-dialog/alert-dialog';
import { Button } from '@/components/button/button';

type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'ghost'
  | 'ghost-destructive'
  | 'outline'
  | 'link';
type ButtonType = 'button' | 'submit' | 'reset';

interface AlertDialogAddOnProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  cancelLabel?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionButtonType?: ButtonType;
  cancelButtonType?: ButtonType;
  actionButtonVariant?: ButtonVariant;
  cancelButtonVariant?: ButtonVariant;
  actionButtonClassName?: string;
  cancelButtonClassName?: string;
}

export default function AlertDialogAddOn({
  open,
  onOpenChange,
  title = '',
  description = '',
  cancelLabel = '',
  actionLabel = '',
  onAction,
  actionButtonType = 'button',
  cancelButtonType = 'button',
  actionButtonVariant = 'outline',
  cancelButtonVariant = 'outline',
  actionButtonClassName = '',
  cancelButtonClassName = '',
}: AlertDialogAddOnProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            type={cancelButtonType}
            variant={cancelButtonVariant}
            className={cancelButtonClassName}
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>
          <Button
            type={actionButtonType}
            variant={actionButtonVariant}
            className={actionButtonClassName}
            onClick={() => {
              onAction?.();
              onOpenChange(false);
            }}
          >
            {actionLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
