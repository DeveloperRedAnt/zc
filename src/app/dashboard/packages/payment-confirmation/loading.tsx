import { PageLayout } from '@/components/page-layout/page-layout';

export default function PaymentConfirmationLoading() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <PageLayout title="Pilih Layanan">
        <div className="space-y-6">
          {/* Service Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`service-${i}`} className="border rounded-lg p-4">
                <div className="space-y-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div
                        key={`service-feature-${j}`}
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

          {/* Package Options */}
          <div className="space-y-4">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="grid grid-cols-1 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={`package-${i}`} className="border rounded-lg p-3">
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

          {/* Add-On Section */}
          <div className="space-y-4">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`addon-${i}`} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-28" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
                    </div>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageLayout>

      <PageLayout className="h-fit" title="Detail Pemesanan">
        <div className="space-y-4">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />

          {/* Order Summary */}
          <div className="border rounded-lg p-4">
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`summary-${i}`} className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                </div>
              ))}

              {/* Divider */}
              <div className="border-t my-3" />

              {/* Total */}
              <div className="flex justify-between font-bold">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-1/4" />
                <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3" />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`payment-${i}`} className="border rounded-lg p-3">
                  <div className="flex items-center justify-center h-12">
                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
