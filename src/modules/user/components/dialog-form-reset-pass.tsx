'use client';

import { ErrorResponseSchema } from '@/__generated__/api/dto';
import { useResetEmployeePassword } from '@/__generated__/api/hooks';
import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog/dialog';
import { Input } from '@/components/input/input';
import { Label } from '@/components/label/label';
import { toast } from '@/components/toast/toast';
import { Check } from '@icon-park/react';
import React from 'react';

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  selectedUserId: number | null;
  onResetSuccess: () => void;
};

export default function DialogFormResetPass({
  open,
  onOpenChange,
  selectedUserId,
  onResetSuccess,
}: Props) {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const resetPasswordMutation = useResetEmployeePassword();

  const isValidResetPass =
    password.length >= 6 && confirmPassword.length >= 6 && password === confirmPassword;

  const handleSubmitResetPass = () => {
    if (!isValidResetPass || !selectedUserId) return;

    resetPasswordMutation.mutate(
      {
        'x-device-id': '1',
        'x-store-id': '1',
        'x-organization-id': '1',
        body: {
          id_employee: selectedUserId,
          password,
          password_confirmation: confirmPassword,
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          onResetSuccess();
          setPassword('');
          setConfirmPassword('');
          toast.success('Tersimpan!', {
            description: 'Reset Password telah berhasil disimpan',
          });
        },
        onError: (err: ErrorResponseSchema) => {
          toast.error('Gagal mereset password', {
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
            <DialogTitle> Reset Password </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-black">
              Password Baru <span className="text-red">*</span>
            </Label>
            <Input
              type="password"
              className="pr-10 mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-black"> Minimal 6 karakter </p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-black">
              Verifikasi Password Baru <span className="text-red">*</span>
            </Label>
            <Input
              type="password"
              className="pr-10 mt-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className="text-xs text-black"> Harus diisi sama dengan Password </p>
          </div>
          <DialogFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="success" disabled={!isValidResetPass}>
                  Reset Password
                  <Check />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle> Anda akan mereset Password </DialogTitle>
                  <DialogDescription className="pt-4">
                    Apakah Anda yakin akan mereset password tersebut?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost"> Tidak </Button>
                  </DialogClose>
                  <Button
                    variant="info"
                    onClick={handleSubmitResetPass}
                    disabled={!isValidResetPass || resetPasswordMutation.isPending}
                  >
                    {resetPasswordMutation.isPending ? 'Memproses...' : 'Ya, Saya Yakin'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
