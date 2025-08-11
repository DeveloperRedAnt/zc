'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const OrderDetails = dynamic(
  () => import('@/modules/packages/payment-confirmation/order-details'),
  {
    loading: () => (
      <div className="space-y-4">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="border rounded-lg p-4">
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={`item-${i}`} className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
              </div>
            ))}
            <div className="border-t pt-3">
              <div className="flex justify-between font-bold">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-1/4" />
                <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
      </div>
    ),
  }
);

const SelectService = dynamic(
  () => import('@/modules/packages/payment-confirmation/select-service'),
  {
    loading: () => (
      <div className="space-y-6">
        {/* Service Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`item-${i}`} className="border rounded-lg p-4">
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={`cell-${j}`} className="h-3 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Package Options */}
        <div className="space-y-4">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="grid grid-cols-1 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`item-${i}`} className="border rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-48" />
                  </div>
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  }
);

// Using the imported Member type from '@/modules/member/types/member'

export default function PaymentConfirmationPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <PageLayout title="Pilih Layanan">
        <Suspense
          fallback={
            <div className="space-y-6">
              {/* Service Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={`item-${i}`} className="border rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="h-5 bg-gray-200 rounded animate-pulse" />
                      <div className="h-8 bg-gray-200 rounded animate-pulse" />
                      <div className="space-y-2">
                        {Array.from({ length: 3 }).map((_, j) => (
                          <div
                            key={`cell-${j}`}
                            className="h-3 bg-gray-200 rounded animate-pulse"
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        >
          <SelectService />
        </Suspense>
      </PageLayout>

      <PageLayout className="h-fit" title="Detail Pemesanan">
        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="border rounded-lg p-4">
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`item-${i}`} className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                    </div>
                  ))}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold">
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-1/4" />
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-12 bg-gray-200 rounded animate-pulse" />
            </div>
          }
        >
          <OrderDetails />
        </Suspense>
      </PageLayout>
    </div>
  );
}
