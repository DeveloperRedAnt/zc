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

interface ProductVariantConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ProductVariantConfirmDialog: React.FC<ProductVariantConfirmDialogProps> = ({
  isOpen,
  onOpenChange,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="variant-dialog-description">
        <DialogHeader>
          <DialogTitle> Anda akan menyimpan Varian Produk </DialogTitle>
          <DialogDescription>
            Apakah Anda yakin akan menyimpan Varian Produk tersebut?
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

export default ProductVariantConfirmDialog;
