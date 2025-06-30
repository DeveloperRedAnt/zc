'use client';

import { Card, CardContent } from '@/components';
import { Button } from '@/components/button/button';
import { Stepper } from '@/components/number-stepper/number-stepper';
import { toast } from '@/components/toast/toast';
import { CircleCheck, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ZycasPlusLogo from './../../../../public/assets/images/zycas-plus-logo.svg';
import AlertDialogAddOn from './alert-dialog-add-on';
import PopUpAddOn from './popup-add-on';

export default function AddOnSection() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handlePay = () => {
    setIsAlertOpen(true);
  };

  const handleConfirmPayment = () => {
    setIsAlertOpen(false);
    setIsPopUpOpen(false);
    toast.custom(() => (
      <div className="flex items-center gap-3 bg-[#6fcf97] text-white p-4 rounded-md shadow-md w-[520px]">
        <div className="flex items-center justify-center">
          <CircleCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-semibold text-white">Add On Dihentikan!</div>
          <div className="text-sm text-white/90">
            Add On Anda telah berhasil dihentikan, silahkan cek kembali pada aplikasi Anda
          </div>
        </div>
      </div>
    ));
  };
  return (
    <div className="w-full px-4 md:px-6 mb-8">
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          {/* Left Section - Title and Price */}
          <div className="flex-shrink-0 text-center lg:text-left">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Tambah Add On</h3>
            <p className="text-sm text-gray-500 mb-1">mulai dari</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900">Rp 20.000</p>
          </div>

          {/* Vertical Divider - Hidden on mobile */}
          <div className="hidden lg:block w-px h-20 bg-gray-200 mx-8 xl:mx-12" />

          {/* Center Section - Features */}
          <div className="flex-1 max-w-none lg:max-w-md">
            <div className="text-center mb-4 md:mb-6">
              <p className="text-sm md:text-base text-gray-700 font-medium">
                Add On berlaku hingga <span className="font-semibold">30 Hari</span>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-3 md:gap-y-4">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                  <Plus className="w-3 h-3 text-gray-400" />
                </div>
                <span className="text-sm text-gray-700">Tambah Kasir</span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                  <Plus className="w-3 h-3 text-gray-400" />
                </div>
                <span className="text-sm text-gray-700">Produk Kedaluwarsa</span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                  <Plus className="w-3 h-3 text-gray-400" />
                </div>
                <span className="text-sm text-gray-700">Produk Paduan</span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                  <Plus className="w-3 h-3 text-gray-400" />
                </div>
                <span className="text-sm text-gray-700">dan masih banyak lagi!</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-px h-20 bg-gray-200 mx-8 xl:mx-12" />
          <div className="flex-shrink-0 flex justify-center lg:justify-end">
            <Button
              variant="outline"
              onClick={() => setIsPopUpOpen(true)}
              className="bg-white text-[#555555] border-gray-300 hover:bg-gray-50 font-semibold px-6 md:px-8 py-2 md:py-3 rounded-lg w-full sm:w-auto max-w-xs"
              style={{ height: '48px', minWidth: '184px' }}
            >
              Pilih Add On
            </Button>
          </div>
        </div>
      </div>
      <AlertDialogAddOn
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title={
          <span className="text-[#F08181] text-sm font-semibold">
            Anda akan menghentikan Add On
          </span>
        }
        description={
          <div className="space-y-1 text-xs">
            <div className="text-gray-700">
              Apakah Anda yakin menghentikan Add On
              <span className="font-semibold">Produk Kedaluwarsa</span> Anda? Penghentian Add On
              sebelum waktu habis tidak mengembalikan dana yang telah dibayarkan.
            </div>
            <div className="text-[#F08181]">
              Add On tersebut akan langsung dihentikan sejak konfirmasi
            </div>
          </div>
        }
        onAction={handleConfirmPayment}
        cancelLabel="Tidak"
        actionLabel="Ya, Saya Yakin"
        cancelButtonVariant="ghost"
        actionButtonVariant="ghost"
        cancelButtonType="button"
        actionButtonType="submit"
        actionButtonClassName="text-[#F08181] hover:text-[#F08181] font-normal"
      />
      <PopUpAddOn
        title="Pilih Add On"
        open={isPopUpOpen}
        onOpenChange={setIsPopUpOpen}
        total={50000}
        onPay={handlePay}
      >
        <div className="mt-3">
          <h6>
            Add On yang dapat Anda pilih dengan <span className="font-bold">Paket Gratis </span>{' '}
            (berlaku 30 Hari sejak pembayaran)
          </h6>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 space-y-2 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-sm font-semibold text-[#0FA6C1] mb-2 mt-2">Tambah Kasir</h3>
                <p className="text-sm text-muted-foreground">Tambah jumlah user kasir Anda</p>
              </div>
              <div className="flex flex-col justify-between items-start mt-4">
                <div className="text-sm font-semibold">Rp 20.000 per User</div>
                <div className="mt-3 mb-3">
                  <Stepper label="" value={5} min={1} max={20} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 space-y-2 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-sm font-semibold text-[#0FA6C1] mb-2 mt-2">
                  Produk Kedaluwarsa
                </h3>
                <p className="text-sm text-muted-foreground">
                  Anda dapat menambahkan tanggal kedaluwarsa dan mendapatkan notifikasi sebelum
                  produk Anda kedaluwarsa
                </p>
              </div>
              <div className="flex flex-col justify-between items-start mt-4">
                <div className="text-sm font-medium">Berakhir 14 Sep 2025</div>
                <div>
                  <Button variant="ghost" className="text-red-500 px-0 h-auto">
                    Hentikan Add On
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Produk Paduan */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <h3 className="text-sm font-semibold text-[#0FA6C1] mb-2 mt-2">Produk Paduan</h3>
              <p className="text-sm text-muted-foreground">
                Fitur untuk memadukan dua atau lebih produk yang sudah ada menjadi satu produk baru
                atau untuk memecah produk lama menjadi produk eceran
              </p>
              <div className="flex flex-col justify-between items-start mt-4">
                <div className="text-sm">
                  <p className="text-sm font-semibold">Rp 60.000</p>
                </div>
                <div className="text-center">
                  <Button variant="outline" className="mt-2 mb-2 w-[183px]">
                    Tambah Add On
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Produk Varian */}
          <Card>
            <CardContent className="p-4 space-y-2 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-sm font-semibold text-[#0FA6C1] mb-2 mt-2">Produk Varian</h3>
                <p className="text-sm text-muted-foreground">
                  Fitur untuk menambahkan berbagai macam varian untuk produk Anda
                </p>
              </div>
              <div className="flex flex-col justify-between items-start mt-4">
                <div className="text-sm">
                  <p className="text-sm font-semibold">Rp 60.000</p>
                </div>
                <div className="text-sm">
                  <Button variant="outline" className="mt-2 mb-2 w-[183px]">
                    Tambah Add On
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="my-4 border-t border-gray-200" />

        <div className="flex items-center gap-2 mt-1 mb-1">
          <span>Anda harus memiliki Paket</span>
          <Image src={ZycasPlusLogo} alt="ZYCAS Plus Logo" className="w-auto h-5 object-contain" />
          <span>
            untuk dapat menambahkan Add On berikut (berlaku mengikuti masa berlaku paket utama):
          </span>
        </div>
        <div>
          <Card className="mt-1">
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <div>
                <h3 className="text-sm font-semibold text-[#0FA6C1] mb-2 mt-2">Tambah Toko</h3>
                <p className="text-sm text-muted-foreground">
                  Tambah jumlah toko yang dapat Anda kelola
                </p>
              </div>
              <div>
                <div className="flex flex-col justify-between items-start mt-4">
                  <div className="text-sm font-semibold">Rp 20.000 per Toko</div>
                  <div className="mt-3 mb-3">
                    <Stepper value={5} min={1} max={20} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PopUpAddOn>
    </div>
  );
}
