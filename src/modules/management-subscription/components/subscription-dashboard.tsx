'use client';
import { useSubscriptionOverview } from '@/__generated__/api/hooks/management-subscription/management-subscription.hooks';
import SkeletonCardContent from '@/components/card/skeleton-card-content';
import AddOnSection from './add-on-section';
import CardAddOn from './card-add-on';
import CurrentPackageSection from './current-package-section';
import PackageSelectionSection from './package-selection-section';
import SubscriptionHistorySection from './subscription-history-section';

type CardData = {
  id: number;
  title: string;
  quantity: string;
  buttonText: string;
  buttonColor?: 'red' | 'blue' | 'gray';
};

export default function SubscriptionDashboard() {
  const { data: subscriptionData, isLoading, error } = useSubscriptionOverview();

  const cardData: CardData[] =
    subscriptionData?.active.add_on.map((addOn) => ({
      id: addOn.id,
      title: addOn.add_on_name,
      quantity: addOn.quantity > 0 ? `x ${addOn.quantity}` : '',
      buttonText: 'Batalkan Add On',
      buttonColor: 'red' as const,
    })) || [];

  if (isLoading) {
    return (
      <>
        <SkeletonCardContent className="w-full" />
      </>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 flex items-center justify-center">
        <div className="text-center text-red-500"> Error loading subscription data </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="space-y-8">
        <CurrentPackageSection packageData={subscriptionData?.active.package} />
        <CardAddOn cards={cardData} />
        <PackageSelectionSection availablePackages={subscriptionData?.available.packages} />
        <AddOnSection availableAddOns={subscriptionData?.available.add_ons} />
        <SubscriptionHistorySection />
      </div>
    </div>
  );
}
