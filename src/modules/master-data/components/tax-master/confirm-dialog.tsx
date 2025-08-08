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

interface TaxMasterConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isUpdating?: boolean;
  hasNPWP: boolean;
  setHasNPWP: (value: boolean) => void;
}

const TaxMasterConfirmDialog: React.FC<TaxMasterConfirmDialogProps> = ({
  isOpen,
  onOpenChange,
  onCancel,
  onConfirm,
  isUpdating = false,
  hasNPWP,
  setHasNPWP: _,
}) => {
  return !hasNPWP ? (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="tax-master-dialog-description">
        <DialogHeader>
          <DialogTitle>Anda akan menyimpan Master Pajak</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin akan menyimpan data Pajak tersebut?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" onClick={onCancel} disabled={isUpdating}>
              Tidak
            </Button>
          </DialogClose>
          <Button variant="info" onClick={onConfirm} disabled={isUpdating}>
            {isUpdating ? 'Menyimpan...' : 'Ya, Saya Yakin'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-[#F08181]"> NPWP Belum Diisi </DialogTitle>
          <DialogDescription className="pt-4">
            Organisasi Anda terdeteksi tidak memiliki NPWP, silahkan hubungi owner Anda untuk
            mengisikan pada Edit Organisasi terlebih dahulu
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="text-[#F08181]">
              {' '}
              Ok, Saya Mengerti{' '}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaxMasterConfirmDialog;
