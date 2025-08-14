import { Button } from '@/components/button/button';
import { ArrowRight } from '@icon-park/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ZycasPlusLogo from './../../../../public/assets/images/zycas-plus-logo.svg';
import Zycasmaxlogo from './../../../../public/assets/images/zycasmax-logo.svg';
import { CancelSubsModal } from './popup-cancel-subscription';

type Package = {
  id: number | string;
  name: string;
  amount?: string;
  price?: string;
  end_date?: string;
  next_renewal_at?: string;
  renewal_status?: string;
  badge_link?: string | null;
  strip_link?: string;
  description?: string[];
};

interface CurrentPackageSectionProps {
  packageData?: Package;
}

export default function PackageSubsSelection({ packageData }: CurrentPackageSectionProps) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const router = useRouter();

  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Get package logo based on package name
  const getPackageLogo = (packageName?: string) => {
    if (packageName?.toLowerCase().includes('enterprise')) {
      return Zycasmaxlogo;
    }
    return ZycasPlusLogo;
  };

  // Fallback data if no API data
  const displayData: Package = packageData || {
    id: 'enterprise',
    name: 'Paket Enterprise',
    amount: 'Rp 280.000',
    end_date: '2025-12-11',
    next_renewal_at: '2025-12-07',
    badge_link: null,
    strip_link: undefined,
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
      {/* Left Border with strip_link or default gradient */}
      {displayData.strip_link ? (
        <div className="absolute left-0 top-0 bottom-0 w-4 flex items-center justify-center">
          <img
            src={displayData.strip_link}
            alt="Package Strip"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-b from-orange-400 to-red-500" />
      )}

      <div className="flex flex-col md:flex-row md:items-center">
        {/* Left Section - Package Info */}
        <div className="flex-1 p-6 pl-8">
          <div className="space-y-3">
            <p className="text-sm text-gray-600"> {displayData.name} </p>
            <div className="w-[120px] h-[40px] flex items-center">
              {displayData.badge_link ? (
                <img
                  src={displayData.badge_link}
                  alt={`${displayData.name} Logo`}
                  className="w-auto h-full object-contain"
                />
              ) : (
                <Image
                  src={getPackageLogo(displayData.name)}
                  alt={`${displayData.name} Logo`}
                  className="w-auto h-full object-contain"
                />
              )}
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {displayData.amount} <span className="font-semibold">per Bulan</span>
            </p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-20 bg-gray-200" />

        {/* Middle Section - Expiration */}
        <div className="flex flex-1 flex-col items-center justify-between h-full p-6 gap-5">
          <div className="text-center gap-4">
            <p className="text-sm text-gray-600">Akan berakhir:</p>
            <p className="text-base font-medium text-gray-800">
              {formatDate(displayData.end_date)}
            </p>
          </div>
          <div className="text-center gap-4">
            <p className="text-sm text-gray-600">Penagihan selanjutnya:</p>
            <p className="text-base font-medium text-gray-800">
              {formatDate(displayData.next_renewal_at)}
            </p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-20 bg-gray-200" />

        {/* Right Section - Cancel */}
        <div className="flex-1 text-center p-6">
          <Button
            variant="outline"
            className=" text-sm"
            onClick={() => router.push('/dashboard/management-subscription')}
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
