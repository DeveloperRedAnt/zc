'use client';

import { useUnlinkDevice } from '@/__generated__/api/hooks';
import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import { useToast } from '@/components/toast/toast';

interface DialogRevokeDeviceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deviceId: number;
  onSuccess?: () => void;
}

const DialogRevokeDevice = ({
  open,
  onOpenChange,
  deviceId,
  onSuccess,
}: DialogRevokeDeviceProps) => {
  const toast = useToast();

  const unlinkMutation = useUnlinkDevice({
    onSuccess: () => {
      toast.showSuccess('Berhasil!', 'Device berhasil dilepas tautan.');
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast.showError('Gagal!', error instanceof Error ? error.message : 'Terjadi kesalahan.');
    },
  });

  const handleUnlink = () => {
    unlinkMutation.mutate({ id: deviceId });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#F08181]">Anda akan melepas device</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin akan melepas tautan dari device ini?
          </DialogDescription>
        </DialogHeader>
        <p className="pb-4 text-[#F08181]">
          Anda harus menautkan ulang pada fitur "lock device" dari ZYCAS app jika akan menggunakan
          device tersebut kembali
        </p>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Tidak
          </Button>
          <Button
            type="submit"
            variant="ghost-destructive"
            onClick={handleUnlink}
            disabled={unlinkMutation.isPending}
          >
            {unlinkMutation.isPending ? 'Memproses...' : 'Ya, Saya Yakin'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRevokeDevice;
