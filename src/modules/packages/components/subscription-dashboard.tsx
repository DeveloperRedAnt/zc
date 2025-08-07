'use client';
import AddOnSection from './add-on-section';
import CardAddOn from './card-add-on';
import CurrentPackageSection from './current-package-section';
import PackageSelectionSection from './package-selection-section';
import SubscriptionHistorySection from './subscription-history-section';

// CardData interface is already defined in card-add-on.tsx
type CardData = {
  title: string;
  quantity: string;
  buttonText: string;
  buttonColor?: 'red' | 'blue' | 'gray';
};

export default function SubscriptionDashboard() {
  const cardData: CardData[] = [
    {
      title: 'Tambah Kasir',
      quantity: 'x 10',
      buttonText: 'Lepas Add On',
      buttonColor: 'red',
    },
    {
      title: 'Produk Kedaluwarsa',
      quantity: '',
      buttonText: 'Lepas Add On',
      buttonColor: 'red',
    },
    {
      title: 'Tambah Organisasi',
      quantity: 'x 2',
      buttonText: 'Lepas Add On',
      buttonColor: 'red',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="space-y-8">
        <CurrentPackageSection />
        <CardAddOn cards={cardData} />
        <PackageSelectionSection />
        <AddOnSection />
        <SubscriptionHistorySection />
      </div>
    </div>
  );
}
