'use client';

import { Card, CardContent } from '@/components/card/card';
import dynamic from 'next/dynamic';
import { ComponentType, Suspense } from 'react';

interface FeatureChunkWrapperProps {
  feature: 'products' | 'users' | 'stores' | 'organizations' | 'members' | 'vouchers';
  fallbackHeight?: 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
}

const getFallbackHeight = (height: string) => {
  switch (height) {
    case 'sm':
      return 'h-32';
    case 'md':
      return 'h-48';
    case 'lg':
      return 'h-64';
    case 'xl':
      return 'h-96';
    default:
      return 'h-48';
  }
};

const getFeatureComponent = (feature: string): ComponentType => {
  return dynamic(() => import(`@/app/dashboard/${feature}/page`), {
    loading: () => (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Filters skeleton */}
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`filter-${i}`} className="h-10 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content skeleton */}
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="h-96 bg-gray-200 rounded animate-pulse" />
          </CardContent>
        </Card>
      </div>
    ),
    ssr: false,
  });
};

export default function FeatureChunkWrapper({
  feature,
  fallbackHeight = 'md',
  children,
}: FeatureChunkWrapperProps) {
  const FeatureComponent = getFeatureComponent(feature);
  const heightClass = getFallbackHeight(fallbackHeight);

  return (
    <Suspense
      fallback={
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className={`${heightClass} bg-gray-200 rounded animate-pulse`} />
          </CardContent>
        </Card>
      }
    >
      {children || <FeatureComponent />}
    </Suspense>
  );
}
