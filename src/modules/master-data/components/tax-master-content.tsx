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
import { InformationText } from '@/components/information-text/information-text';
import CustomInput from '@/components/input/custom-input';
import { toast } from '@/components/toast/toast';
import { Check, Edit, Refresh } from '@icon-park/react';
import { useState } from 'react';

export default function Index() {
  const [taxPercent, setTaxPercent] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <div className="box-border flex flex-col gap-6 items-start w-full text-[#555555]">
        <div className="flex-row flex justify-between items-start w-full">
          <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0">
            <div className="flex flex-col font-['Poppins:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#555555] text-[16px] text-left text-nowrap">
              <p className="block leading-[24px] whitespace-pre font-semibold"> Master Pajak </p>
            </div>
          </div>
          <div>
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" type="button" onClick={() => setIsEditOpen(true)}>
                  <Edit />
                  Edit Pajak
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle> Master Pajak </DialogTitle>
                </DialogHeader>
                <div className="w-full gap-4 py-4">
                  <CustomInput
                    required
                    isWidthFull
                    className="mb-2"
                    placeholder="12.0"
                    label="Persen Pajak"
                    inputNumber
                    maxDecimalDigits={1}
                    maxValue={100}
                    appendIcon="Percentage"
                    value={taxPercent}
                    onChange={(e) => setTaxPercent(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button variant="ghost" type="button" onClick={() => setTaxPercent('')}>
                    <Refresh />
                    Reset
                  </Button>
                  <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        variant="success"
                        disabled={taxPercent.trim() === ''}
                        onClick={() => setIsConfirmOpen(false)}
                      >
                        Simpan Pajak
                        <Check />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                      <DialogHeader>
                        <DialogTitle> Anda akan menyimpan Master Pajak </DialogTitle>
                        <DialogDescription className="pt-4">
                          Apakah Anda yakin akan menyimpan data Pajak tersebut?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="ghost"> Tidak </Button>
                        </DialogClose>
                        <Button
                          variant="info"
                          onClick={() => {
                            toast.success('Tersimpan!', {
                              description: 'Master Pajak Anda telah berhasil tersimpan',
                            });
                            setIsConfirmOpen(false); // Tutup konfirmasi
                            setIsEditOpen(false); // Tutup form utama
                          }}
                        >
                          Ya, Saya Yakin
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                    {/* <DialogContent className="sm:max-w-sm">
                      <DialogHeader>
                        <DialogTitle className='text-[#F08181]'> NPWP Belum Diisi </DialogTitle>
                        <DialogDescription className="pt-4">
                          Organisasi Anda terdeteksi tidak memiliki NPWP, silahkan hubungi owner Anda untuk mengisikan pada 
                          Edit Organisasi terlebih dahulu 
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="ghost" className='text-[#F08181]'> Ok, Saya Mengerti </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent> */}
                  </Dialog>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-col gap-2 p-2 relative shrink-0 w-full">
          <InformationText text="Penentuan pajak yang akan diterapkan saat Checkout transaksi" />
          <div className="text-[14px] mt-4">
            <p className="font-semibold font-['Poppins:SemiBold',_sans-serif] mb-2">
              {' '}
              Persen Pajak:{' '}
            </p>
            <p> 12.0 % </p>
          </div>
        </div>
      </div>
    </>
  );
}
