'use client';

import { useGetDeviceList } from '@/__generated__/api/hooks';
import { Badge } from '@/components/badge/badge';
import { Card, CardContent } from '@/components/card/card';
import { Heading } from '@/components/heading/heading';
import { Text } from '@/components/text/text';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DialogRevokeDevice = dynamic(
  () => import('@/modules/devices/components/dialog-revoke-device'),
  {
    loading: () => <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />,
    ssr: false,
  }
);

const DeviceCardSkeleton = () => (
  <Card className="m-4">
    <CardContent className="pt-6 flex justify-between items-center">
      <div className="flex-1">
        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-3 w-40 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
    </CardContent>
  </Card>
);

import type { DeviceData } from '@/__generated__/api/dto';

const DeviceCard = ({ device }: { device: DeviceData }) => (
  <Card className="m-4">
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Text weight="bold" className="text-[#0FA6C1]">
              {device.code}
            </Text>
            <Badge variant="outline" className="text-xs">
              ID: {device.id}
            </Badge>
          </div>
          <Text weight="medium" className="text-lg mb-1">
            {device.name}
          </Text>
          <Text className="text-sm text-gray-600 mb-1">{device.model}</Text>
          <Text className="text-xs text-gray-500 mb-3">SN: {device.serial_number}</Text>
        </div>
        <div>
          <Suspense fallback={<div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />}>
            <DialogRevokeDevice />
          </Suspense>
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Text className="text-xs font-medium text-gray-500 uppercase tracking-wide">Store</Text>
            <Text className="text-sm mt-1">{device.store.name}</Text>
            <Text className="text-xs text-gray-500">{device.store.type}</Text>
          </div>
          <div>
            <Text className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Organization
            </Text>
            <Text className="text-sm mt-1">{device.organization.name}</Text>
            <Text className="text-xs text-gray-500">{device.organization.owner.name}</Text>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function DevicesPage() {
  const { data: devicesResponse, isLoading, error } = useGetDeviceList();

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
        <Heading level="h4" weight="semibold" className="text-base">
          List Device Tertaut
        </Heading>
        {devicesResponse && (
          <Text className="text-sm text-gray-500 mt-1">
            {devicesResponse.data.length} device(s) found
          </Text>
        )}
      </div>

      {isLoading ? (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <DeviceCardSkeleton key={`device-skeleton-${i}`} />
          ))}
        </>
      ) : devicesResponse?.data.length ? (
        devicesResponse.data.map((device) => <DeviceCard key={device.id} device={device} />)
      ) : (
        <div className="p-4">
          <div className="text-center py-12">
            <Text className="text-gray-500">No devices found</Text>
          </div>
        </div>
      )}
    </>
  );
}
