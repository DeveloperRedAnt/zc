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

interface DeleteDialogProps {
  onRemove: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading?: boolean;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  onRemove,
  title = 'Anda akan menghapus Opsi Harga',
  description = 'Apakah Anda yakin akan menghapus opsi harga tersebut?',
  buttonText = 'Ya, Saya Yakin',
  open,
  onOpenChange,
  loading = false,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="w-auto min-w-0 max-w-full">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription className="pt-4">{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Tidak</Button>
        </DialogClose>
        <Button
          variant="ghost"
          className="bg-primary text-white"
          onClick={onRemove}
          disabled={loading}
        >
          {loading ? 'Memproses...' : buttonText}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
