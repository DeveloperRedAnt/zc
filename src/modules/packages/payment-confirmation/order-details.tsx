import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import CustomInput from '@/components/input/custom-input';
import { Check, FolderSearchOne, TicketOne } from '@icon-park/react';
import React, { useState } from 'react';

export default function OrderDetails() {
  const [isVoucherDialogOpen, setIsVoucherDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVoucher = () => {
    setIsVoucherDialogOpen(true);
  };

  const handlePayNow = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleCheckVoucher = async () => {
    setIsLoading(true);

    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
      setIsVoucherDialogOpen(false);
    }, 2000);
  };

  const handleConfirmPayment = () => {
    setIsConfirmDialogOpen(false);
  };

  const handleCancelPayment = () => {
    setIsConfirmDialogOpen(false);
  };

  const handleCancelVoucher = () => {
    setIsVoucherDialogOpen(false);
    setIsLoading(false);
  };

  return (
    <>
      <div className="overflow-hidden">
        <div className="flex justify-between px-4 py-3 border-b">
          <span>Paket Bisnis ZYCAS+</span>
          <span className="font-medium">Rp 150.000</span>
        </div>
        <div className="px-4 py-3 border-b">
          <div className="flex justify-between items-center">
            {/* Keterangan Kasir */}
            <div>
              <div>Tambah Kasir</div>
              <div className="text-xs text-gray-500">@ Rp 20.000</div>
            </div>

            {/* x 2 di tengah */}
            <div className="text-gray-500 text-sm mx-4 whitespace-nowrap">x 2</div>

            {/* Harga */}
            <div className="font-medium whitespace-nowrap">Rp 40.000</div>
          </div>
        </div>

        <div className="flex justify-between px-4 py-3 border-b">
          <span>Produk Kedaluwarsa</span>
          <span className="font-medium">Rp 60.000</span>
        </div>
        {/* Rincian harga */}
        <div className="flex justify-between px-4 py-3">
          <span className="text-gray-600">Sub-Total</span>
          <span className="font-medium">Rp 250.000</span>
        </div>
        <div className="flex justify-between px-4 py-3">
          <span className="text-gray-600">Pajak (12%)</span>
          <span className="font-medium">Rp 25.000</span>
        </div>
        <div className="flex justify-between border-t pt-2 font-semibold px-4 py-3">
          <span>Total Tagihan</span>
          <span>Rp 275.000</span>
        </div>
        {/* Info tagihan */}
        <div className="flex justify-between border-t pt-2 px-4 py-3">
          <p className="mt-4 text-xs text-gray-500">
            Akan ditagihkan pada tanggal:
            <span className="font-semibold text-black ml-1">07 Desember 2025</span>
          </p>
        </div>
        <div className="pt-2 px-4 py-3 flex justify-between items-center">
          <Button
            className="bg-[#555555] text-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleVoucher();
            }}
          >
            <TicketOne theme="outline" size="24" fill="#FFFFFF" />
            Voucher
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" className="w-fit">
              Batal
            </Button>
            <Button variant="success" onClick={handlePayNow}>
              Bayar Sekarang
              <Check theme="outline" size="24" fill="#FFFFFF" />
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog Voucher */}
      <Dialog open={isVoucherDialogOpen} onOpenChange={setIsVoucherDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Voucher</DialogTitle>
          </DialogHeader>
          <CustomInput
            className="border-[#C2C7D0] h-10"
            placeholder="cth: AA112233"
            label="Masukkan Kode Voucher"
            isWidthFull
            // onChange={(e) => setNoteNumber(e.target.value)}
          />
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleCancelVoucher} disabled={isLoading}>
              Batal
            </Button>
            <Button
              variant={isLoading ? 'loading' : 'success'}
              onClick={handleCheckVoucher}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  Check Voucher
                  <FolderSearchOne theme="filled" size="24" fill="#FFFFFF" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Payment Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Anda akan membayar Pembelian Layanan</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin akan membayarkan pembelian Anda sekarang?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="ghost" onClick={handleCancelPayment}>
              Tidak
            </Button>
            <Button variant="info" onClick={handleConfirmPayment}>
              Ya, Saya Yakin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
