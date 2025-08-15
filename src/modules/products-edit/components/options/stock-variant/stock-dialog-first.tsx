import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import React from 'react';

interface DialogStockFirstProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string | React.ReactNode;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'info';
}

export function DialogStockFirst({
  open,
  onOpenChange,
  title = 'Anda akan menyimpan Produk',
  description = 'Apakah Anda yakin akan menyimpan produk tersebut?',
  confirmText = 'Ya, Saya Yakin ✨',
  cancelText = 'Tidak',
  onConfirm,
  onCancel,
  isLoading = false,
  disabled = false,
  variant = 'info',
}: DialogStockFirstProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-[1rem] font-[500]">{title}</DialogTitle>
          <DialogDescription className="pt-4 text-[12px]">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-4 pt-4">
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="min-w-[80px]"
              onClick={handleCancel}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
          </DialogClose>
          <Button
            variant={variant}
            className="min-w-[120px]"
            onClick={handleConfirm}
            disabled={disabled || isLoading}
          >
            {isLoading ? 'Menyimpan...' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
