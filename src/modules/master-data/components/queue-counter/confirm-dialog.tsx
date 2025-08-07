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

interface QueueCounterConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  onConfirm: () => void;
}

const QueueCounterConfirmDialog: React.FC<QueueCounterConfirmDialogProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="queue-counter-dialog-description">
        <DialogHeader>
          <DialogTitle> Anda akan menyimpan No. Urut Nota </DialogTitle>
          <DialogDescription>
            {' '}
            Apakah Anda yakin akan menyimpan No. Urut Nota tersebut?{' '}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Tidak</Button>
          </DialogClose>
          <Button variant="info" onClick={onConfirm}>
            Ya, Saya Yakin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QueueCounterConfirmDialog;
