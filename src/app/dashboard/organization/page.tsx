'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const OrganizationDashboard = dynamic(
  () => import('@/modules/organization/components/organization-dashboard'),
  {
    loading: () => (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Search/Filter Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`item-${i}`} className="h-10 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>

        {/* Organization Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`item-${i}`} className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                {/* Organization Logo */}
                <div className="h-16 w-16 bg-gray-200 rounded animate-pulse" />
                {/* Organization Name */}
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                {/* Organization Details */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center">
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={`item-${i}`} className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
            ))}
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
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Search/Filter Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`item-${i}`} className="h-10 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>

          {/* Organization Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`item-${i}`} className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-4">
                  {/* Organization Logo */}
                  <div className="h-16 w-16 bg-gray-200 rounded animate-pulse" />
                  {/* Organization Name */}
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  {/* Organization Details */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center">
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`item-${i}`} className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <OrganizationDashboard />
    </Suspense>
  );
}
