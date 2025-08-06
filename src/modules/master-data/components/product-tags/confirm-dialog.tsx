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

interface ProductTagConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ProductTagConfirmDialog: React.FC<ProductTagConfirmDialogProps> = ({
  isOpen,
  onOpenChange,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="tag-dialog-description">
        <DialogHeader>
          <DialogTitle> Anda akan menyimpan Tag Produk </DialogTitle>
          <DialogDescription>
            Apakah Anda yakin akan menyimpan Tag Produk tersebut?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" onClick={onCancel}>
              Tidak
            </Button>
          </DialogClose>
          <Button variant="info" onClick={onConfirm}>
            Ya, Saya Yakin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductTagConfirmDialog;
