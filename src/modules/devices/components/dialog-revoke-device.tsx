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
  DialogTrigger,
} from '@/components/dialog/dialog';
import { toast } from '@/components/toast/toast';
import * as Lucide from 'lucide-react';

const DialogRevokeDevice = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost-destructive">
          <Lucide.Link />
          Lepas Tautan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#F08181]">Anda akan melepas device</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin akan melepas tautan dari device ini?
          </DialogDescription>
        </DialogHeader>
        <p className="pb-4 text-[#F08181]">
          Anda harus menautkan ulang pada fitur “lock device” dari ZYCAS app jika akan menggunakan
          device tersebut kembali
        </p>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Tidak</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              variant="ghost-destructive"
              onClick={() => {
                toast.error('Gagal!', {
                  description: 'Terjadi kesalahan.',
                });
              }}
            >
              Ya, Saya Yakin
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRevokeDevice;
