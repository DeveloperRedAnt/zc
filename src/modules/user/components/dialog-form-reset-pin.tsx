'use client';

import { ErrorResponseSchema } from '@/__generated__/api/dto';
import { useResetEmployeePin } from '@/__generated__/api/hooks';
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
import { toast } from '@/components/toast/toast';
import React from 'react';

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  selectedUserId: number | null;
  onResetSuccess: () => void;
};

export default function DialogFormResetPin({
  open,
  onOpenChange,
  selectedUserId,
  onResetSuccess,
}: Props) {
  const resetPinMutation = useResetEmployeePin();

  const handleSubmitResetPin = () => {
    if (!selectedUserId) return;

    resetPinMutation.mutate(
      {
        body: {
          id_employee: selectedUserId,
        },
      },
      {
        onSuccess: () => {
          toast.success('Tersimpan!', {
            description: 'PIN berhasil direset!',
          });
          onResetSuccess();
        },
        onError: (err: ErrorResponseSchema) => {
          toast.error('Gagal mereset PIN', {
            description: err?.message || 'Terjadi kesalahan.',
          });
        },
      }
    );
  };
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-red"> Anda akan mereset PIN User </DialogTitle>
            <DialogDescription className="pt-4">
              Apakah Anda yakin akan mereset PIN dari user tersebut?
            </DialogDescription>
          </DialogHeader>
          <div className="pb-2">
            <p className="text-red"> Aksi tidak dapat dikembalikan </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost"> Tidak </Button>
            </DialogClose>
            <Button variant="ghost" className="text-red" onClick={handleSubmitResetPin}>
              {resetPinMutation.isPending ? 'Memproses...' : 'Ya, Saya Yakin'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
