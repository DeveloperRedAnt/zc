import { Button } from '@/components/button/button';
import { ArrowRight } from '@icon-park/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Zycasmaxlogo from './../../../../public/assets/images/zycasmax-logo.svg';
import { CancelSubsModal } from './popup-cancel-subscription';

export default function PackageSubsSelection() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
      {/* Orange Left Border */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-b from-orange-400 to-red-500" />

      <div className="flex flex-col md:flex-row md:items-center">
        {/* Left Section - Package Info */}
        <div className="flex-1 p-6 pl-8">
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Paket Enterprise</p>
            <div className="w-[120px] h-[40px] flex items-center">
              <Image
                src={Zycasmaxlogo}
                alt="ZYCAS Plus Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-lg font-semibold text-gray-800">
              Rp 280.000 <span className="font-semibold">per Bulan</span>
            </p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-20 bg-gray-200" />

        {/* Middle Section - Expiration */}
        <div className="flex flex-1 flex-col items-center justify-between h-full p-6 gap-5">
          <div className="text-center gap-4">
            <p className="text-sm text-gray-600">Akan berakhir:</p>
            <p className="text-base font-medium text-gray-800">11 Desember 2025</p>
          </div>
          <div className="text-center gap-4">
            <p className="text-sm text-gray-600">Penagihan selanjutnya:</p>
            <p className="text-base font-medium text-gray-800">07 Desember 2025</p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-20 bg-gray-200" />

        {/* Right Section - Cancel */}
        <div className="flex-1 text-center p-6">
          <Button
            variant="outline"
            className=" text-sm"
            onClick={() => router.push('/dashboard/packages')}
          >
            Manajemen Langganan
            <ArrowRight />
          </Button>
        </div>
        <CancelSubsModal open={isPopUpOpen} onOpenChange={setIsPopUpOpen} />
      </div>
    </div>
  );
}
