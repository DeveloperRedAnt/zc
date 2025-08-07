import { Button } from '@/components/button/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/card/card';
import { CheckCorrect } from '@icon-park/react';
import { Check, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import enterprisePacket from './../../../../public/assets/images/enterprise-packet.svg';
import ZycasPlusLogo from './../../../../public/assets/images/zycas-plus-logo.svg';
import { FeatureComparisonModal } from './popup-feature-comparison';

const freePackageFeatures = [
  'Laporan Standard',
  '1 Akun Owner',
  'Manajemen Member',
  'Manajemen Hutang',
  'Transaksi Offline',
];
const businessPackageFeatures = [
  'Seluruh fitur ZYCAS Gratis',
  'Laporan Advance',
  '5 Akun (include Owner)',
  'Promosi / CRM',
  'Varian Produk & Expired Produk',
  'Produk Multisatuan',
];

const enterprisePackageFeatures = [
  'Seluruh fitur Paket ZYCAS+',
  'Laporan Lengkap',
  '10 akun (include Owner)',
  'Assembly Produk',
];

export default function PackageSelectionSection() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const router = useRouter();

  const handleChoosePackage = () => {
    router.push('/dashboard/packages/payment-confirmation?mode=package&type=null');
  };

  return (
    <div className="w-full px-4 md:px-6 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-base font-semibold text-gray-800 ml-[23px]">
          Pilihan Paket yang Kami Sediakan
        </h2>
        <Button
          variant="outline"
          className="gap-2 text-gray-600 border-gray-300 text-sm"
          onClick={() => setIsPopUpOpen(true)}
        >
          Cek Perbandingan Fitur
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Package */}
        <Card className="border-2 border-blue-300 rounded-lg flex flex-col bg-white">
          <CardHeader className="pb-4">
            {/* Fixed height container for header content */}
            <div className="h-32 flex flex-col justify-start">
              <CardTitle className="text-3xl font-bold text-gray-700">GRATIS</CardTitle>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 mb-6" />

            <p className="text-base text-gray-600 mb-2">Hanya mendapatkan:</p>
          </CardHeader>

          <CardContent className="space-y-3 flex-grow">
            {freePackageFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Business Package */}
        <Card className="border-2 border-blue-300 rounded-lg flex flex-col">
          <CardHeader className="pb-4">
            {/* Fixed height container for header content */}
            <div className="h-32 flex flex-col justify-start space-y-3">
              <div>
                <p className="text-base text-gray-600 mb-3">Paket Bisnis</p>
                <div className="w-[120px] h-[40px] flex items-center">
                  <Image
                    src={ZycasPlusLogo}
                    alt="ZycasPlusLogo"
                    className="w-full h-full object-contain ml-[-12px]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-800">Rp 150.000</span>
                  <span className="text-base text-gray-600 font-semibold">per Bulan</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 mb-6" />

            <p className="text-base text-gray-600 mb-2">Fitur yang Didapatkan:</p>
          </CardHeader>

          <CardContent className="space-y-3 flex-grow">
            {businessPackageFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-base text-gray-700">{feature}</span>
              </div>
            ))}
            <span className="text-base text-gray-700">dan masih banyak lagi!</span>
          </CardContent>
          <CardFooter className="pt-6 mt-auto">
            <Button
              variant="outline"
              className="w-full text-gray-700 border-gray-300"
              onClick={handleChoosePackage}
            >
              Pilih Paket
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Package */}
        <Card className="border-2 border-blue-300 rounded-lg relative flex flex-col">
          <CardHeader className="pb-4">
            {/* Fixed height container for header content */}
            <div className="h-32 flex flex-col justify-start space-y-3">
              <div className="flex justify-between items-start">
                <p className="text-base text-gray-600">Paket Enterprise</p>
                <div className="flex items-center gap-1 bg-[#75BF85] text-white px-3 py-1 text-xs font-medium rounded self-center mt-1">
                  <span className="flex items-center">
                    <CheckCorrect className="w-4 h-4" />
                  </span>
                  <span className="flex items-center mt-[-3px]">Best Deal</span>
                </div>
              </div>
              <div className="w-[120px] h-[43px] flex items-center">
                <Image
                  src={enterprisePacket}
                  alt="ZycasPlusLogo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-800">Rp 280.000</span>
                  <span className="text-base text-gray-600 font-semibold">per Bulan</span>
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="border-t border-gray-300 mb-6" />

            <p className="text-base text-gray-600 mb-2">Fitur yang Didapatkan:</p>
          </CardHeader>
          <CardContent className="space-y-3 flex-grow">
            {enterprisePackageFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-base text-gray-700">{feature}</span>
              </div>
            ))}
            <span className="text-base text-gray-700">dan masih banyak lagi!</span>
          </CardContent>
          <CardFooter className="pt-6 mt-auto">
            <Button
              variant="outline"
              className="w-full text-gray-700 border-gray-300"
              onClick={handleChoosePackage}
            >
              Pilih Paket
            </Button>
          </CardFooter>
        </Card>

        <FeatureComparisonModal
          title="Perbandingan Fitur"
          open={isPopUpOpen}
          onOpenChange={setIsPopUpOpen}
        />
      </div>
    </div>
  );
}
