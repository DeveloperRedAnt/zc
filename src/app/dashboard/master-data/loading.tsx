import { PageLayout } from '@/components/page-layout/page-layout';

export default function MasterDataLoading() {
  return (
    <PageLayout title="Master Data">
      <div className="space-y-4">
        {/* Tabs Skeleton */}
        <div className="flex border-b border-gray-200">
          {Array.from({ length: 9 }, () => (
            <div
              key={crypto.randomUUID()}
              className="h-12 w-28 bg-gray-200 rounded-t animate-pulse mr-2 mb-[-1px]"
            />
          ))}
        </div>

        {/* Content Area Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Search/Filter Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }, () => (
                <div key={crypto.randomUUID()} className="h-10 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>

            {/* Main Content */}
            <div className="space-y-4">
              {/* Table/Form Skeleton */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b">
                  <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: 4 }, () => (
                      <div
                        key={crypto.randomUUID()}
                        className="h-4 bg-gray-200 rounded animate-pulse"
                      />
                    ))}
                  </div>
                </div>
                {Array.from({ length: 6 }, () => (
                  <div key={crypto.randomUUID()} className="px-6 py-3 border-b last:border-b-0">
                    <div className="grid grid-cols-4 gap-4">
                      {Array.from({ length: 4 }, () => (
                        <div
                          key={crypto.randomUUID()}
                          className="h-4 bg-gray-200 rounded animate-pulse"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-between items-center pt-4">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="flex gap-2">
                {Array.from({ length: 3 }, () => (
                  <div
                    key={crypto.randomUUID()}
                    className="h-8 w-8 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
