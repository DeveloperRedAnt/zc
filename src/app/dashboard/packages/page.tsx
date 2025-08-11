'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SubscriptionDashboard = dynamic(
  () => import('@/modules/packages/components/subscription-dashboard'),
  {
    loading: () => (
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="space-y-8">
          {/* Current Package Section Skeleton */}
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

          {/* Add-On Cards Skeleton */}
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

          {/* Package Selection Skeleton */}
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
                            key={`cell-${j}`}
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

          {/* Add-On Section Skeleton */}
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

          {/* History Section Skeleton */}
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
        </div>
      </div>
    ),
    ssr: false,
  }
);

export default function Index() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 py-6">
          <div className="space-y-8">
            {/* Current Package Section Skeleton */}
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

            {/* Add-On Cards Skeleton */}
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

            {/* Package Selection Skeleton */}
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
                              key={`cell-${j}`}
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
          </div>
        </div>
      }
    >
      <SubscriptionDashboard />
    </Suspense>
  );
}
