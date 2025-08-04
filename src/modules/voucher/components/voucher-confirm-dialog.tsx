'use client';
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

interface VoucherConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const VoucherConfirmDialog: React.FC<VoucherConfirmDialogProps> = ({
  isOpen,
  onOpenChange,
  isEditMode,
  onCancel,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="voucher-dialog-description">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Anda akan mengupdate Voucher' : 'Anda akan menyimpan Voucher'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Apakah Anda yakin akan mengupdate Voucher tersebut?'
              : 'Apakah Anda yakin akan menyimpan Voucher tersebut?'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" onClick={onCancel}>
              Tidak
            </Button>
          </DialogClose>
          <Button variant="info" onClick={handleConfirm}>
            Ya, Saya Yakin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VoucherConfirmDialog;
