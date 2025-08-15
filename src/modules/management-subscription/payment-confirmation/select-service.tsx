import {
  ApiAddOnForAddonMode,
  // ApiActivePackage
} from '@/__generated__/api/dto/management-subscription/add-on-confirmation.dto';
import {
  ApiAddOn,
  ApiPackage,
} from '@/__generated__/api/dto/management-subscription/package-confirmation.dto';
import { useGetAddOnConfirmation } from '@/__generated__/api/hooks/management-subscription/add-on-confirmation.hooks';
import { useSubscriptionOverview } from '@/__generated__/api/hooks/management-subscription/management-subscription.hooks';
import { useGetManagementSubscription } from '@/__generated__/api/hooks/management-subscription/package-confirmation.hooks';
import { Button } from '@/components/button/button';
import { Card } from '@/components/card/card';
import { Stepper as NumberStepper } from '@/components/number-stepper/number-stepper';
import { Skeleton } from '@/components/skeleton/skeleton'; // Add this import
import { CheckCorrect, CloseSmall as DeleteIcon, EfferentThree } from '@icon-park/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
// select-service.tsx
import React, {
  useState,
  useEffect,
  // useCallback,
  useRef,
} from 'react';
import { FeatureComparisonModal } from '../components/popup-feature-comparison';
import ZycasPlusLogo from './../../../../public/assets/images/zycas-plus-logo.svg';
import ZycasMaxLogo from './../../../../public/assets/images/zycasmax-logo.svg';

interface SelectedAddon {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface SelectServiceProps {
  onSelectedItemsChange?: (items: {
    selectedPackage: ApiPackage | null;
    selectedAddOns: SelectedAddon[];
    totalPrice: number;
  }) => void;
}

export default function SelectService({ onSelectedItemsChange }: SelectServiceProps) {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const type = searchParams.get('type');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState<string>('paket bisnis');
  const [selectedPackageData, setSelectedPackageData] = useState<ApiPackage | null>(null);
  const [addOnQuantities, setAddOnQuantities] = useState<Record<number, number>>({});
  const [selectedAddOns, setSelectedAddOns] = useState<Set<number>>(new Set());

  const { data: subscriptionData } = useSubscriptionOverview();

  // Use ref to track if we should call the callback to prevent infinite loops
  const lastResultRef = useRef<string>('');

  // API calls - conditional based on mode
  const {
    data: packageData,
    isLoading: packageLoading,
    error: packageError,
  } = useGetManagementSubscription({ body: {} }, { enabled: mode === 'package' });

  const {
    data: addonData,
    isLoading: addonLoading,
    error: addonError,
  } = useGetAddOnConfirmation({ body: {} }, { enabled: mode === 'addon' });

  const isLoading = packageLoading || addonLoading;
  const error = packageError || addonError;

  const currentData = mode === 'addon' ? addonData : packageData;
  const availableAddOns =
    mode === 'addon' ? addonData?.available_add_ons : packageData?.available_add_ons;
  const packages = packageData?.packages;
  const activePackage = addonData?.active_package;

  // Initialize selected package from query params
  useEffect(() => {
    if (mode === 'package' && packages) {
      if (type === 'plus') {
        setSelectedPackage('paket bisnis');
        const pkg = packages.find((p) => p.name === 'paket bisnis');
        setSelectedPackageData(pkg || null);
      } else if (type === 'max') {
        setSelectedPackage('paket enterprise');
        const pkg = packages.find((p) => p.name === 'paket enterprise');
        setSelectedPackageData(pkg || null);
      }
    }
  }, [mode, type, packages]);

  // Initialize add-on quantities
  useEffect(() => {
    if (availableAddOns) {
      const initialQuantities: Record<number, number> = {};
      availableAddOns.forEach((addon) => {
        if ('is_quantity_editable' in addon && addon.is_quantity_editable === 1) {
          initialQuantities[addon.id] = addon.id === 1 ? 2 : 0;
        }
      });
      setAddOnQuantities(initialQuantities);

      // Initialize some selected add-ons
      setSelectedAddOns(new Set([2]));
    }
  }, [availableAddOns]);

  // Calculate selected items and notify parent - FIXED to prevent infinite loop
  useEffect(() => {
    if (!availableAddOns || !onSelectedItemsChange) return;

    const selectedAddonsList: SelectedAddon[] = [];
    let totalPrice = selectedPackageData?.price || 0;

    availableAddOns.forEach((addon) => {
      if ('is_quantity_editable' in addon) {
        const quantity =
          addon.is_quantity_editable === 1
            ? addOnQuantities[addon.id] || 0
            : selectedAddOns.has(addon.id)
              ? 1
              : 0;

        if (quantity > 0) {
          selectedAddonsList.push({
            id: addon.id,
            name: addon.name,
            price: addon.price,
            quantity,
          });
          totalPrice += addon.price * quantity;
        }
      }
    });

    const result = {
      selectedPackage: selectedPackageData,
      selectedAddOns: selectedAddonsList,
      totalPrice,
    };

    // Create a hash of the result to check if it actually changed
    const resultHash = JSON.stringify({
      packageId: selectedPackageData?.id,
      addons: selectedAddonsList.map((a) => ({ id: a.id, quantity: a.quantity })),
      total: totalPrice,
    });

    // Only call the callback if the result actually changed
    if (lastResultRef.current !== resultHash) {
      lastResultRef.current = resultHash;
      onSelectedItemsChange(result);
    }
  }, [selectedPackageData, addOnQuantities, selectedAddOns, availableAddOns]); // Removed onSelectedItemsChange from dependencies

  const handleAddOnQuantityChange = (addOnId: number, quantity: number) => {
    setAddOnQuantities((prev) => ({
      ...prev,
      [addOnId]: quantity,
    }));
  };

  const toggleAddOn = (addOnId: number) => {
    setSelectedAddOns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(addOnId)) {
        newSet.delete(addOnId);
      } else {
        newSet.add(addOnId);
      }
      return newSet;
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPackageDisplayName = (packageName: string) => {
    switch (packageName.toLowerCase()) {
      case 'paket bisnis':
        return 'Paket Bisnis';
      case 'paket enterprise':
        return 'Paket Enterprise';
      default:
        return packageName;
    }
  };

  const getPackageLogo = (packageName: string) => {
    switch (packageName.toLowerCase()) {
      case 'paket bisnis':
        return ZycasPlusLogo;
      case 'paket enterprise':
        return ZycasMaxLogo;
      default:
        return ZycasPlusLogo;
    }
  };

  // Skeleton Loading Components
  const renderPackageSkeletons = () => {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(2)].map((_, index) => (
          <Card key={index} className="relative p-4">
            <div className="flex items-center justify-between pt-5">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-[20px] w-[80px]" />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-[36px] w-[100px] rounded-md" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderAddonBannerSkeleton = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gray-200" />
        <div className="flex items-center justify-between px-4 py-6 h-full">
          <Skeleton className="h-4 w-[120px] ml-2" />
          <div className="text-center space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-[20px] w-[80px] mx-auto" />
          </div>
        </div>
      </div>
    );
  };

  const renderAddOnSkeletons = () => {
    return (
      <div className="grid grid-cols-2 gap-2">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="p-4 h-[21.5625rem] flex flex-col justify-between gap-4">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-[80%]" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-[90%]" />
                <Skeleton className="h-3 w-[75%]" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-[36px] w-full rounded-md" />
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderPackageCard = (pkg: ApiPackage) => {
    const isSelected = selectedPackage === pkg.name;
    const isEnterprise = pkg.name.toLowerCase() === 'paket enterprise';

    return (
      <Card
        key={pkg.id}
        className={`relative p-4 ${isSelected ? 'border-blue-400' : 'border-gray-300'}`}
      >
        {isEnterprise && isSelected && (
          <span className="absolute top-2 right-2 flex text-white text-xs border bg-[#75BF85] border-[#75BF85] px-2 py-0.5 rounded-md w-fit z-10">
            <CheckCorrect theme="filled" size="14" className="mr-1" />
            Best Deal
          </span>
        )}
        <div className="flex items-center justify-between pt-5">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm">{getPackageDisplayName(pkg.name)}</p>
            </div>
            <Image src={getPackageLogo(pkg.name)} alt={pkg.name} width={80} height={20} />
          </div>
          <div className="flex flex-col gap-2 items-center">
            {!isSelected && isEnterprise && (
              <span className="absolute top-2 right-2 flex text-white text-xs border bg-[#75BF85] border-[#75BF85] px-2 py-0.5 rounded-md w-fit">
                <CheckCorrect theme="filled" size="14" className="mr-1" />
                Best Deal
              </span>
            )}
            <p className="text-sm">{formatPrice(pkg.price)} per Bulan</p>
            {isSelected ? (
              <span className="text-gray-600 text-sm font-medium text-center">Dipilih</span>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedPackage(pkg.name);
                  setSelectedPackageData(pkg);
                }}
              >
                Pilih Paket
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  };

  const renderAddonBanner = () => {
    if (mode !== 'addon' || !activePackage) return null;

    const getGradientColors = (packageName: string) => {
      switch (packageName.toLowerCase()) {
        case 'paket bisnis':
          return 'from-[#B2EBF2] to-[#00BCD4]';
        case 'paket enterprise':
          return 'from-orange-400 to-red-500';
        default:
          return 'from-[#F9F9F9] to-[#F9F9F9]';
      }
    };

    const getPackageLogo = (badgeLink: string) => {
      if (badgeLink.includes('plus')) return ZycasPlusLogo;
      if (badgeLink.includes('max')) return ZycasMaxLogo;
      return ZycasPlusLogo;
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
        <div
          className={`absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-b ${getGradientColors(
            activePackage.name
          )}`}
        />
        <div className="flex items-center justify-between px-4 py-6 h-full">
          <span className="text-sm text-gray-600 pl-2">Paket yang Aktif:</span>
          <div className="text-center">
            <p className="text-sm font-medium">{getPackageDisplayName(activePackage.name)}</p>
            <div className="text-white font-bold text-xs px-3 py-1 rounded-md w-fit mt-1 mx-auto">
              <Image
                src={getPackageLogo(activePackage.badge_link)}
                alt={activePackage.name}
                width={80}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTitlePackage = () => {
    if (mode !== 'package') return null;

    return (
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium">Paket</span>
        <Button
          variant="outline"
          className="text-sm flex items-center gap-1"
          onClick={() => setIsPopUpOpen(true)}
        >
          Cek Perbandingan Fitur
          <EfferentThree theme="filled" size="16" fill="#333" />
        </Button>
      </div>
    );
  };

  const renderAddOnCard = (addon: ApiAddOn | ApiAddOnForAddonMode) => {
    const isQuantityEditable =
      'is_quantity_editable' in addon ? addon.is_quantity_editable === 1 : false;
    const currentQuantity = addOnQuantities[addon.id] || 0;
    const isSelected = selectedAddOns.has(addon.id);
    const requiresMinimumPackage = addon.minimum_package_badge_link !== null;

    let isAvailableForCurrentPackage = true;

    if (mode === 'package' && 'availability_in_package' in addon) {
      // For package mode, check availability in package array
      const availabilityArray = addon.availability_in_package;
      // Type guard to ensure it's an array
      if (Array.isArray(availabilityArray)) {
        const currentPackageAvailability = availabilityArray.find(
          (pkg) => pkg.name.toLowerCase() === selectedPackage.toLowerCase()
        );
        isAvailableForCurrentPackage = currentPackageAvailability?.is_available ?? true;
      }
    } else if (mode === 'addon' && 'availability_in_package' in addon) {
      // For addon mode, it's a boolean
      isAvailableForCurrentPackage = addon.availability_in_package as boolean;
    }

    const isDisabled = !isAvailableForCurrentPackage;

    // Get pricing text
    const getPriceText = () => {
      if (addon.name.toLowerCase().includes('kasir')) {
        return `${formatPrice(addon.price)} per User`;
      }
      if (addon.name.toLowerCase().includes('toko')) {
        return `${formatPrice(addon.price)} per Toko`;
      }
      if (addon.name.toLowerCase().includes('organisasi')) {
        return `${formatPrice(addon.price)} per Organisasi`;
      }
      return formatPrice(addon.price);
    };

    const renderActionButton = () => {
      if (requiresMinimumPackage && !isAvailableForCurrentPackage) {
        return (
          <p className="text-xs text-gray-500">
            Harus memilih paket{' '}
            <span className="inline-block px-1">
              <Image
                src={
                  addon.minimum_package_badge_link?.includes('max') ? ZycasMaxLogo : ZycasPlusLogo
                }
                alt="minimum package"
                width={80}
                height={20}
              />
            </span>
          </p>
        );
      }

      if (isQuantityEditable) {
        return (
          <NumberStepper
            min={0}
            value={currentQuantity}
            onChange={(value) => handleAddOnQuantityChange(addon.id, value)}
            readOnly={isDisabled}
          />
        );
      }

      if (isSelected) {
        return (
          <Button
            variant="ghost"
            className="w-full text-[#F08181]"
            onClick={() => toggleAddOn(addon.id)}
            disabled={isDisabled}
          >
            <DeleteIcon theme="outline" size="16" />
            Hapus Pilihan
          </Button>
        );
      }

      return (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => toggleAddOn(addon.id)}
          disabled={isDisabled}
        >
          Pasang Add On
        </Button>
      );
    };

    return (
      <Card
        key={addon.id}
        className={`p-4 h-[21.5625rem] flex flex-col space-between gap-4 ${
          isDisabled ? 'opacity-50 bg-gray-50' : ''
        }`}
      >
        <div className="flex-1">
          <p className={`text-sm font-semibold ${isDisabled ? 'text-gray-400' : 'text-[#0FA6C1]'}`}>
            {addon.name}
          </p>
          <p className={`text-sm mb-2 ${isDisabled ? 'text-gray-400' : ''}`}>{addon.description}</p>
        </div>
        <div>
          <p className={`font-semibold text-sm mb-4 ${isDisabled ? 'text-gray-400' : ''}`}>
            {getPriceText()}
          </p>
          {renderActionButton()}
        </div>
      </Card>
    );
  };

  if (error) {
    return <div className="p-4 text-red-500">Error loading subscription data</div>;
  }

  // Show skeletons while loading
  if (isLoading) {
    const showPackage = mode === 'package' && type && ['max', 'plus'].includes(type);
    const showSingleAddon = mode === 'addon';

    return (
      <>
        <div className="rounded-md p-4 mb-6">
          {showPackage && (
            <>
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-[36px] w-[180px] rounded-md" />
              </div>
              {renderPackageSkeletons()}
            </>
          )}
          {showSingleAddon && (
            <div className="flex flex-col gap-4">{renderAddonBannerSkeleton()}</div>
          )}
        </div>

        <div className="rounded-md p-4 mb-6">
          <div className="flex items-center mb-3">
            <Skeleton className="h-5 w-[80px]" />
          </div>
          {renderAddOnSkeletons()}
        </div>
      </>
    );
  }

  if (!currentData) {
    return <div className="p-4">No subscription data available</div>;
  }

  const showPackage = mode === 'package' && type && ['max', 'plus'].includes(type);
  const showSingleAddon = mode === 'addon';

  return (
    <>
      <div className="rounded-md p-4 mb-6">
        {showPackage && <>{renderTitlePackage()}</>}

        <div className="flex flex-col gap-4">
          {showPackage && packages && (
            <>
              {packages
                .filter((pkg) => pkg.is_active || showPackage)
                .map((pkg) => renderPackageCard(pkg))}
            </>
          )}
          {showSingleAddon && <>{renderAddonBanner()}</>}
        </div>
      </div>

      <div className="rounded-md p-4 mb-6">
        <h3 className="font-semibold mb-3">Add-On</h3>
        <div className="grid grid-cols-2 gap-2">
          {availableAddOns?.map((addon) => renderAddOnCard(addon))}
        </div>
      </div>
      <FeatureComparisonModal
        title="Perbandingan Fitur"
        open={isPopUpOpen}
        onOpenChange={setIsPopUpOpen}
        packages={subscriptionData?.available.packages}
      />
    </>
  );
}
