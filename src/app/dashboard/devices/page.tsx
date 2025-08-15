'use client';

import { useGetDeviceListInfinite } from '@/__generated__/api/hooks';
import { Card, CardContent } from '@/components/card/card';
import { Skeleton } from '@/components/skeleton/skeleton';
import { Text } from '@/components/text/text';
import { formatDate } from '@/libs/utils';
import { Unlink } from '@icon-park/react';
import dynamic from 'next/dynamic';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';

const DialogRevokeDevice = dynamic(
  () => import('@/modules/devices/components/dialog-revoke-device'),
  {
    loading: () => <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />,
    ssr: false,
  }
);

const DeviceCardSkeleton = () => (
  <Card className="m-4">
    <CardContent className="py-4">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <Skeleton className="h-6 w-8 mb-2" />
          <Skeleton className="h-5 w-24 mb-1" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex items-center gap-2 text-red-500">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </div>
    </CardContent>
  </Card>
);

import type { DeviceData } from '@/__generated__/api/dto';

const DeviceCard = ({ device, onUnlink }: { device: DeviceData; onUnlink?: () => void }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card className="m-4">
      <CardContent className="py-6 px-6">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <Text weight="bold" className="text-primary text-sm mb-1">
              {device.name}
            </Text>
            <Text className="text-sm mb-1">{device.model}</Text>
            <Text className="text-xs text-gray-400 mt-2">
              Tanggal ditautkan: {formatDate(device.created_at)}
            </Text>
          </div>

          <div
            className="flex items-center gap-2 text-danger cursor-pointer hover:text-red-600"
            onClick={() => setIsDialogOpen(true)}
          >
            <Unlink size={20} />
            <Text className="text-md text-danger">Lepas Tautan</Text>
          </div>
        </div>
      </CardContent>

      <Suspense fallback={null}>
        <DialogRevokeDevice
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          deviceId={device.id}
          onSuccess={onUnlink}
        />
      </Suspense>
    </Card>
  );
};

export default function DevicesPage() {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } =
    useGetDeviceListInfinite({ per_page: 10 });

  const handleDeviceUnlinked = () => {
    refetch();
  };

  // Intersection Observer for infinite scroll
  const handleIntersection = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          handleIntersection();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleIntersection]);

  // Get all devices from all pages
  // biome-ignore lint/suspicious/noExplicitAny: Temporary fix for infinite query type
  const allDevices = (data as any)?.pages?.flatMap((page: any) => page.data.data) || [];

  if (error) {
    return (
      <div className="p-4">
        <div className="text-center py-12">
          <Text className="text-red-600 mb-2">Error loading devices</Text>
          <Text className="text-gray-500 text-sm">
            {error instanceof Error ? error.message : 'Failed to load devices'}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        <Text weight="semibold" className="text-base">
          List Device Tertaut
        </Text>
      </div>

      {/* Initial loading state */}
      {isLoading && allDevices.length === 0 && (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <DeviceCardSkeleton key={`initial-skeleton-${i}`} />
          ))}
        </>
      )}

      {/* Device list */}
      {allDevices.length > 0 && (
        <>
          {allDevices.map((device) => (
            <DeviceCard key={device.id} device={device} onUnlink={handleDeviceUnlinked} />
          ))}
        </>
      )}

      {/* Loading more skeleton */}
      {isFetchingNextPage && (
        <>
          {Array.from({ length: 2 }).map((_, i) => (
            <DeviceCardSkeleton key={`loading-skeleton-${i}`} />
          ))}
        </>
      )}

      {/* Empty state */}
      {!isLoading && allDevices.length === 0 && (
        <div className="p-4">
          <div className="text-center py-12">
            <Text className="text-gray-500">No devices found</Text>
          </div>
        </div>
      )}

      {/* Intersection observer sentinel */}
      <div ref={sentinelRef} className="h-4 w-full" />

      {/* End message */}
      {!hasNextPage && allDevices.length > 0 && (
        <div className="p-4">
          <div className="text-center py-4">
            <Text className="text-gray-500 text-sm">All devices loaded</Text>
          </div>
        </div>
      )}
    </>
  );
}
