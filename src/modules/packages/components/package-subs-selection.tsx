import { useGetOverviewPackage } from '@/__generated__/api/hooks/package.hooks';
import { Button } from '@/components/button/button';
import { getStringWithDefault } from '@/utils/basic';
import { formatDateWithDefault } from '@/utils/date-time';
import { ArrowRight } from '@icon-park/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { CancelSubsModal } from './popup-cancel-subscription';

// Package subscription skeleton component
const PackageSubsSelectionSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-b from-orange-400 to-red-500" />

      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex-1 p-6 pl-8">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
            <div className="w-[120px] h-[40px] bg-gray-200 rounded animate-pulse" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-48" />
          </div>
        </div>

        <div className="hidden md:block w-px h-20 bg-gray-200" />

        <div className="flex flex-1 flex-col items-center justify-between h-full p-6 gap-5">
          <div className="text-center gap-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mx-auto mb-2" />
            <div className="h-5 bg-gray-200 rounded animate-pulse w-32 mx-auto" />
          </div>
          <div className="text-center gap-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-36 mx-auto mb-2" />
            {/* Next renewal date skeleton */}
            <div className="h-5 bg-gray-200 rounded animate-pulse w-32 mx-auto" />
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-20 bg-gray-200" />

        {/* Right Section - Button Skeleton */}
        <div className="flex-1 text-center p-6">
          <div className="h-10 bg-gray-200 rounded animate-pulse w-48 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default function PackageSubsSelection() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const router = useRouter();

  const { data, isLoading } = useGetOverviewPackage();
  if (isLoading) {
    return <PackageSubsSelectionSkeleton />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
      {data.active.package.strip_link ? (
        <img
          src={getStringWithDefault(data.active.package.strip_link, '')}
          alt="ZYCAS Plus Logo"
          className="w-[16px] h-full absolute top-0 left-0 object-cover"
          width={16}
        />
      ) : null}

      <div className="flex flex-col md:flex-row md:items-center">
        {/* Left Section - Package Info */}
        <div className="flex-1 p-6 pl-8">
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              {getStringWithDefault(data.active.package.name, '-')}
            </p>
            <div className="w-[120px] h-[40px] flex items-center">
              {data.active.package.badge_link ? (
                <Image
                  src={data.active.package.badge_link}
                  alt="ZYCAS Plus Logo"
                  className="w-full h-full object-contain"
                />
              ) : null}
            </div>
            <p className="text-lg font-semibold text-gray-800">
              Rp {getStringWithDefault(data.active.package.price, '0')}{' '}
              <span className="font-semibold">per Bulan</span>
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
              {formatDateWithDefault(data.active.package.end_date, '-')}
            </p>
          </div>
          <div className="text-center gap-4">
            <p className="text-sm text-gray-600">Penagihan selanjutnya:</p>
            <p className="text-base font-medium text-gray-800">
              {formatDateWithDefault(data.active.package.next_renewal_at, '-')}
            </p>
          </div>
        </div>

        <div className="hidden md:block w-px h-20 bg-gray-200" />
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
