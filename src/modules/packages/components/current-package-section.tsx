import { Button } from '@/components/button/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Zycasmaxlogo from './../../../../public/assets/images/zycasmax-logo.svg';

export default function CurrentPackageSection() {
  return (
    <div className="w-full px-4 md:px-6 mb-8">
      <h1 className="text-base font-semibold text-gray-700 mb-6 ml-[23px]">Paket Anda Saat Ini</h1>
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
          <div className="flex-1 text-center p-6">
            <p className="text-sm text-gray-600 mb-1">Akan berakhir:</p>
            <p className="text-base font-medium text-gray-800 mb-4">11 Desember 2025</p>
            <Button variant="outline" className="px-4 py-2 text-sm border-gray-300">
              Langganan Lagi
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px h-20 bg-gray-200" />

          {/* Right Section - Cancel */}
          <div className="flex-1 text-center p-6">
            <Button variant="link" className="text-red-400 hover:text-red-500 p-0 text-sm">
              Batalkan Langganan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
