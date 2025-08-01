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

interface OrganizationConfirmDialogProps {
  isOpen: boolean;
  isEditMode: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}

export const OrganizationConfirmDialog: React.FC<OrganizationConfirmDialogProps> = ({
  isOpen,
  isEditMode,
  isLoading,
  onCancel,
  onConfirm,
  onOpenChange,
}) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {isEditMode ? 'Anda akan mengupdate Organisasi' : 'Anda akan menyimpan Organisasi'}
        </DialogTitle>
        <DialogDescription>
          {isEditMode
            ? 'Apakah Anda yakin akan mengupdate organisasi tersebut?'
            : 'Apakah Anda yakin akan menyimpan organisasi tersebut?'}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost" onClick={onCancel}>
            Tidak
          </Button>
        </DialogClose>
        <Button variant="info" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Ya, Saya Yakin'}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default OrganizationConfirmDialog;
