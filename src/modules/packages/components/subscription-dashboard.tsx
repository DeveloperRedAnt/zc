'use client';
import AddOnSection from './add-on-section';
import CurrentPackageSection from './current-package-section';
import PackageSelectionSection from './package-selection-section';
import SubscriptionHistorySection from './subscription-history-section';

export default function SubscriptionDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="space-y-8">
        <CurrentPackageSection />
        <PackageSelectionSection />
        <AddOnSection />
        <SubscriptionHistorySection />
      </div>
    </div>
  );
}
