'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const AddOnSection = dynamic(() => import('./add-on-section'), {
  loading: () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-4">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`addon-${i}`} className="border rounded-lg p-4">
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
});

const CardAddOn = dynamic(() => import('./card-add-on'), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={`card-${i}`} className="bg-white rounded-lg shadow-sm p-4">
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  ),
});

const CurrentPackageSection = dynamic(() => import('./current-package-section'), {
  loading: () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-4">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
          <div className="h-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  ),
});

const PackageSelectionSection = dynamic(() => import('./package-selection-section'), {
  loading: () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-4">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`item-${i}`} className="border rounded-lg p-4">
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={`feature-${j}`} className="h-3 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
});

const SubscriptionHistorySection = dynamic(() => import('./subscription-history-section'), {
  loading: () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-4">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`item-${i}`} className="grid grid-cols-4 gap-4 p-3 border-b">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
});

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
        <Suspense
          fallback={
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  </div>
                  <div className="h-32 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          }
        >
          <CurrentPackageSection />
        </Suspense>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={`item-${i}`} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="space-y-3">
                    <div className="h-5 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <CardAddOn cards={cardData} />
        </Suspense>

        <Suspense
          fallback={
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={`item-${i}`} className="border rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="h-5 bg-gray-200 rounded animate-pulse" />
                        <div className="h-8 bg-gray-200 rounded animate-pulse" />
                        <div className="space-y-2">
                          {Array.from({ length: 4 }).map((_, j) => (
                            <div
                              key={`feature-${j}`}
                              className="h-3 bg-gray-200 rounded animate-pulse"
                            />
                          ))}
                        </div>
                        <div className="h-10 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <PackageSelectionSection />
        </Suspense>

        <Suspense
          fallback={
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={`item-${i}`} className="border rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="h-5 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                        <div className="h-8 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <AddOnSection />
        </Suspense>

        <Suspense
          fallback={
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`item-${i}`} className="grid grid-cols-4 gap-4 p-3 border-b">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <SubscriptionHistorySection />
        </Suspense>
      </div>
    </div>
  );
}
