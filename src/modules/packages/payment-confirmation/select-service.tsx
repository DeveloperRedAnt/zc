import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/button/button';
import { CloseSmall as DeleteIcon, EfferentThree, CheckCorrect } from '@icon-park/react';
import { Card } from '@/components/card/card';
import ZycasPlusLogo from './../../../../public/assets/images/zycas-plus-logo.svg';
import ZycasMaxLogo from './../../../../public/assets/images/zycasmax-logo.svg';
import { Stepper as NumberStepper } from '@/components/number-stepper/number-stepper';
import { useSearchParams } from 'next/navigation';

export default function SelectService() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const type = searchParams.get('type');

  const [selectedPackage, setSelectedPackage] = useState<'zycas+' | 'zycas-max'>('zycas+');
  const [userCount, setUserCount] = useState(2);
  const [storeCount, setStoreCount] = useState(0);
  const [expiredActive, setExpiredActive] = useState(true);

  const renderPackageCard = (pkg: 'zycas+' | 'zycas-max') => {
    const isSelected = selectedPackage === pkg;
    const isMax = pkg === 'zycas-max';

    return (
      <Card
        key={pkg}
        className={`relative p-4 ${isSelected ? 'border-blue-400' : 'border-gray-300'}`}
      >
        {isMax && isSelected && (
          <span className="absolute top-2 right-2 flex text-white text-xs border bg-[#75BF85] border-[#75BF85] px-2 py-0.5 rounded-md w-fit z-10">
            <CheckCorrect theme="filled" size="14" className="mr-1" />
            Best Deal
          </span>
        )}
        <div className="flex items-center justify-between pt-5">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm">{pkg === 'zycas+' ? 'Paket Bisnis' : 'Paket Enterprise'}</p>
            </div>
            <Image
              src={pkg === 'zycas+' ? ZycasPlusLogo : ZycasMaxLogo}
              alt={pkg}
              width={80}
              height={20}
            />
          </div>
          <div className="flex flex-col gap-2 items-center">
            {!isSelected && isMax && (
              <span className="absolute top-2 right-2 flex text-white text-xs border bg-[#75BF85] border-[#75BF85] px-2 py-0.5 rounded-md w-fit">
                <CheckCorrect theme="filled" size="14" className="mr-1" />
                Best Deal
              </span>
            )}
            <p className="text-sm">
              {pkg === 'zycas+' ? 'Rp 150.000 per Bulan' : 'Rp 280.000 per Bulan'}
            </p>
            {isSelected ? (
              <span className="text-gray-600 text-sm font-medium text-center">Dipilih</span>
            ) : (
              <Button variant="outline" onClick={() => setSelectedPackage(pkg)}>
                Pilih Paket
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  };

  const renderAddonBanner = () => {
    if (mode !== 'addon') return null;

    if (type === 'basic') {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-b from-[#F9F9F9] to-[#F9F9F9]" />
          <div className="flex items-center justify-between px-4 py-6 h-full">
            <span className="text-sm text-gray-600 pl-2">Paket yang Aktif:</span>
            <div className="text-center">
              <p className="text-sm font-medium">Paket Gratis</p>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'plus') {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-b from-[#B2EBF2] to-[#00BCD4]" />
          <div className="flex items-center justify-between px-4 py-6 h-full">
            <span className="text-sm text-gray-600 pl-2">Paket yang Aktif:</span>
            <div className="text-center">
              <p className="text-sm font-medium">Paket Bisnis</p>
              <div className="text-white font-bold text-xs px-3 py-1 rounded-md w-fit mt-1 mx-auto">
                <Image src={ZycasPlusLogo} alt="Paket Bisnis" width={80} height={20} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'max') {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-b from-orange-400 to-red-500" />
          <div className="flex items-center justify-between px-4 py-6 h-full">
            <span className="text-sm text-gray-600 pl-2">Paket yang Aktif:</span>
            <div className="text-center">
              <p className="text-sm font-medium">Paket Enterprise</p>
              <div className="text-white font-bold text-xs px-3 py-1 rounded-md w-fit mt-1 mx-auto">
                <Image src={ZycasMaxLogo} alt="Paket Enterprise" width={80} height={20} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderTitlePackage = () => {
    if (mode !== 'package') return null;

    if (mode === 'package') {
      return (
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium">Paket</span>
          <Button variant="outline" className="text-sm flex items-center gap-1">
            Cek Perbandingan Fitur
            <EfferentThree theme="filled" size="16" fill="#333" />
          </Button>
        </div>
      );
    }

    return null;
  };

  const showPackage = mode === 'package';
  const showSingleAddon = mode === 'addon' && type && ['basic', 'max', 'plus'].includes(type);

  return (
    <>
      <div className="rounded-md p-4 mb-6">
        {showPackage && <>{renderTitlePackage()}</>}

        <div className="flex flex-col gap-4">
          {showPackage && (
            <>
              {renderPackageCard('zycas+')}
              {renderPackageCard('zycas-max')}
            </>
          )}
          {showSingleAddon && <>{renderAddonBanner()}</>}
        </div>
      </div>

      <div className="rounded-md p-4 mb-6">
        <h3 className="font-semibold mb-3">Add-On</h3>
        <div className="grid grid-cols-2 gap-2">
          <Card className="p-4 h-[21.5625rem] flex flex-col space-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#0FA6C1]">Tambah Kasir</p>
              <p className="text-sm mb-2">Tambah jumlah user kasir Anda</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-4">Rp 20.000 per User</p>
              <NumberStepper min={0} value={userCount} onChange={setUserCount} />
            </div>
          </Card>

          <Card className="p-4 h-[21.5625rem] flex flex-col space-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#0FA6C1]">Produk Kedaluwarsa</p>
              <p className="text-sm mb-2">
                Anda dapat menambahkan tanggal kedaluwarsa dan notifikasi sebelum produk Anda
                kedaluwarsa
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-4">Rp 60.000</p>
              {expiredActive && (
                <Button
                  variant="ghost"
                  className="w-full text-[#F08181]"
                  onClick={() => setExpiredActive(false)}
                >
                  <DeleteIcon theme="outline" size="16" />
                  Hapus Pilihan
                </Button>
              )}
            </div>
          </Card>

          <Card className="p-4 h-[21.5625rem] flex flex-col space-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#0FA6C1]">Produk Paduan</p>
              <p className="text-sm mb-2">
                Fitur untuk memadukan dua atau lebih produk menjadi satu produk baru atau memecah
                produk lama menjadi produk eceran
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-4">Rp 60.000</p>
              <Button variant="outline" className="w-full">
                Pasang Add On
              </Button>
            </div>
          </Card>

          <Card className="p-4 h-[21.5625rem] flex flex-col space-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#0FA6C1]">Produk Varian</p>
              <p className="text-sm mb-2">
                Fitur untuk menambahkan berbagai macam varian untuk produk Anda
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-4">Rp 60.000</p>
              <Button variant="outline" className="w-full">
                Pasang Add On
              </Button>
            </div>
          </Card>

          <Card className="p-4 h-[21.5625rem] flex flex-col space-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#0FA6C1]">Tambah Toko</p>
              <p className="text-sm mb-2">Tambah jumlah toko yang dapat Anda kelola</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-4">Rp 60.000 per Toko</p>
              <NumberStepper min={0} value={storeCount} onChange={setStoreCount} />
            </div>
          </Card>

          <Card className="p-4 h-[21.5625rem] flex flex-col space-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#0FA6C1]">Tambah Organisasi</p>
              <p className="text-sm mb-2">Tambah jumlah organisasi yang dapat Anda kelola</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-4">Rp 60.000 per Organisasi</p>
              <p className="text-xs">
                Harus memilih paket{' '}
                <span className="inline-block px-1">
                  <Image src={ZycasMaxLogo} alt="zycas-max" width={80} height={20} />
                </span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
