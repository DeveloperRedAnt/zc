import { Button } from '@/components/button/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/card/card';
import { CheckCorrect } from '@icon-park/react';
import { Check, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ZycasPlusLogo from './../../../../public/assets/images/zycas-plus-logo.svg';
import Zycasmaxlogo from './../../../../public/assets/images/zycasmax-logo.svg';
import { FeatureComparisonModal } from './popup-feature-comparison';

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

interface PackageSelectionSectionProps {
  availablePackages?: Package[];
}

export default function PackageSelectionSection({
  availablePackages,
}: PackageSelectionSectionProps) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const router = useRouter();

  const handleChoosePackage = (type: string) => {
    const packageType = type === 'paket bisnis' ? 'plus' : 'max';

    router.push(
      `/dashboard/management-subscription/payment-confirmation?mode=package&type=${packageType}`
    );
  };

  // Format price helper
  const formatPrice = (price?: string) => {
    if (!price) return 'Gratis';
    return price.replace('Rp', 'Rp ');
  };

  // Get package logo
  const getPackageLogo = (packageName: string) => {
    if (packageName.toLowerCase().includes('enterprise')) {
      return Zycasmaxlogo;
    }
    if (packageName.toLowerCase().includes('bisnis')) {
      return ZycasPlusLogo;
    }
    return null;
  };

  const packages = availablePackages || [];

  const renderPackageCard = (pkg: Package) => {
    const isEnterprise = pkg.name.toLowerCase().includes('enterprise');
    const isFree = pkg.name.toLowerCase().includes('gratis') || pkg.price === 'Rp 0';
    const packageLogo = pkg.badge_link || getPackageLogo(pkg.name);

    if (isFree) {
      return (
        <Card key={pkg.id} className="border-2 border-blue-300 rounded-lg flex flex-col bg-white">
          <CardHeader className="pb-4">
            <div className="h-32 flex flex-col justify-start">
              <CardTitle className="text-[1.5rem] font-semibold text-black uppercase">
                {pkg.name}
              </CardTitle>
            </div>
            <div className="border-t border-gray-300 mb-6" />
            <p className="text-base text-black">Hanya mendapatkan:</p>
          </CardHeader>
          <CardContent className="space-y-3 flex-grow">
            {pkg.description?.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#555555] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-black capitalize">{feature}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      );
    }

    return (
      <Card
        key={pkg.id}
        className={`border-2 border-blue-300 rounded-lg ${
          isEnterprise ? 'relative' : ''
        } flex flex-col`}
      >
        <CardHeader className="pb-4">
          <div className="h-32 flex flex-col justify-start">
            <div className={isEnterprise ? 'flex justify-between items-start' : ''}>
              <p className="font-semibold text-black capitalize mb-2">{pkg.name}</p>
              {isEnterprise && (
                <div className="flex items-center gap-1 bg-[#75BF85] text-white px-3 py-1 text-xs font-medium rounded self-center mt-1">
                  <span className="flex items-center">
                    <CheckCorrect className="w-4 h-4" />
                  </span>
                  <span className="flex items-center mt-[-3px]">Best Deal</span>
                </div>
              )}
            </div>

            {packageLogo && (
              <div className="w-[120px] h-[40px] flex">
                <img
                  src={packageLogo}
                  alt={`${pkg.name} Logo`}
                  className="w-auto h-full object-contain"
                />
              </div>
            )}

            <div className="mt-5">
              <div className="flex items-baseline gap-2">
                <span className="text-[1.5rem] font-semibold text-black">
                  {formatPrice(pkg.price)}
                </span>
                {pkg.price !== 'Rp 0' && (
                  <span className="text-black font-semibold text-[0.8rem]">per Bulan</span>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 mb-6" />
          <p className="text-base text-black">Fitur yang Didapatkan:</p>
        </CardHeader>

        <CardContent className="space-y-3 flex-grow">
          {pkg.description?.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm text-black capitalize">{feature}</span>
            </div>
          ))}
          <span className="text-sm text-black">dan masih banyak lagi!</span>
        </CardContent>

        <CardFooter className="pt-6 mt-auto">
          <Button
            variant="outline"
            className="w-full text-black border-gray-300"
            onClick={() => handleChoosePackage(pkg.name)}
          >
            Pilih Paket
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="w-full px-4 md:px-6 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-base font-semibold text-black ml-[23px]">
          Pilihan Paket yang Kami Sediakan
        </h2>
        <Button
          variant="outline"
          className="gap-2 text-black border-gray-300 text-sm"
          onClick={() => setIsPopUpOpen(true)}
        >
          Cek Perbandingan Fitur
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => renderPackageCard(pkg))}
      </div>

      <FeatureComparisonModal
        title="Perbandingan Fitur"
        open={isPopUpOpen}
        onOpenChange={setIsPopUpOpen}
        packages={packages}
      />
    </div>
  );
}
