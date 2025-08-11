export default function ProfileLoading() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header Skeleton */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-6">
          <div className="h-24 w-24 bg-gray-200 rounded-full animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-48" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-64" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-40" />
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Profile Content Skeleton */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Tab Navigation */}
        <div className="flex border-b">
          {['Informasi Pribadi', 'Keamanan', 'Notifikasi', 'Preferensi'].map((_, i) => (
            <div
              key={`tab-${i}`}
              className="h-12 w-32 bg-gray-200 rounded-t animate-pulse mr-2 mb-[-1px]"
            />
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Form Fields */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`form-${i}`} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings Skeleton */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-40" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`security-${i}`}
                className="flex justify-between items-center p-4 border rounded"
              >
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-48" />
                </div>
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
