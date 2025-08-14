'use client';

import { ApiPackage } from '@/__generated__/api/dto/management-subscription/package-confirmation.dto';
import { PageLayout } from '@/components/page-layout/page-layout';
import OrderDetails from '@/modules/management-subscription/payment-confirmation/order-details';
import SelectService from '@/modules/management-subscription/payment-confirmation/select-service';
import { useState } from 'react';

interface SelectedAddon {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function PaymentConfirmationPage() {
  const [selectedItems, setSelectedItems] = useState<{
    selectedPackage: ApiPackage | null;
    selectedAddOns: SelectedAddon[];
    totalPrice: number;
  }>({
    selectedPackage: null,
    selectedAddOns: [],
    totalPrice: 0,
  });

  const handleSelectedItemsChange = (items: {
    selectedPackage: ApiPackage | null;
    selectedAddOns: SelectedAddon[];
    totalPrice: number;
  }) => {
    setSelectedItems(items);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <PageLayout title="Pilih Layanan">
        <SelectService onSelectedItemsChange={handleSelectedItemsChange} />
      </PageLayout>
      <PageLayout className="h-fit" title="Detail Pemesanan">
        <OrderDetails
          selectedPackage={selectedItems.selectedPackage}
          selectedAddOns={selectedItems.selectedAddOns}
          // totalPrice={selectedItems.totalPrice}
        />
      </PageLayout>
    </div>
  );
}
