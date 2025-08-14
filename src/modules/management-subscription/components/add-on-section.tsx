'use client';

import { Button } from '@/components/button/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

type AvailableAddOn = {
  name: string;
};

interface AddOnSectionProps {
  availableAddOns?: {
    start_from: number;
    data: AvailableAddOn[];
  };
}

export default function AddOnSection({ availableAddOns }: AddOnSectionProps) {
  const router = useRouter();

  const handleChooseAddon = () => {
    router.push('/dashboard/management-subscription/payment-confirmation?mode=addon&type=null');
  };

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace('IDR', 'Rp');
  };

  // Default data if no API data
  const defaultAddOns = {
    start_from: 20000,
    data: [{ name: 'Tambah Kasir' }, { name: 'Produk Kedaluwarsa' }, { name: 'Produk Paduan' }],
  };

  const addOnData = availableAddOns || defaultAddOns;

  // Show first 3 add-ons plus "dan masih banyak lagi" if there are more
  const displayAddOns = addOnData.data.slice(0, 3);
  const hasMore = addOnData.data.length > 3;

  return (
    <div className="w-full px-4 md:px-6 mb-8">
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-8 shadow-sm flex items-center justify-between">
        <div className="flex flex-row gap-4 w-full items-center justify-between">
          {/* Left Section - Title and Price */}
          <div className="flex-shrink-0 text-center lg:text-left">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Pasang Add On</h3>
            <p className="text-sm text-gray-500 mb-1">mulai dari</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900">
              {formatPrice(addOnData.start_from)}
            </p>
          </div>

          {/* Vertical Divider - Hidden on mobile */}
          <div className="hidden lg:block w-px h-20 bg-gray-200 mx-8 xl:mx-12" />

          {/* Center Section - Features */}
          <div className="flex-1 max-w-none lg:max-w-md">
            <div className="mb-4 md:mb-6">
              <p className="text-sm md:text-base text-gray-700 font-medium">
                Add On berlaku hingga <span className="font-semibold">30 Hari</span>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-2 md:gap-y-3">
              {displayAddOns.map((addOn) => (
                <div
                  key={addOn.name}
                  className="flex items-center gap-3 justify-center sm:justify-start"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                    <Plus className="w-3 h-3 text-gray-400" />
                  </div>
                  <span className="text-sm text-gray-700">{addOn.name}</span>
                </div>
              ))}
              {hasMore && (
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                    <Plus className="w-3 h-3 text-gray-400" />
                  </div>
                  <span className="text-sm text-gray-700">dan masih banyak lagi!</span>
                </div>
              )}
            </div>
          </div>
          <div className="hidden lg:block w-px h-20 bg-gray-200 mx-8 xl:mx-12" />
          <div className="flex-shrink-0 flex justify-center lg:justify-end">
            <Button
              variant="outline"
              onClick={handleChooseAddon}
              className="bg-white text-[#555555] border-gray-300 hover:bg-gray-50 font-semibold px-6 md:px-8 py-2 md:py-3 rounded-lg w-full sm:w-auto max-w-xs"
              style={{ height: '48px', minWidth: '184px' }}
            >
              Pasang Add On
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
